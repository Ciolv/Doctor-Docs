import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../css/RecordList.scss";
import ShareModal from "./ShareModal";
import DeleteModal from "./DeleteModal";
import { File } from "../models/File";
import axios from "axios";
import { BsDownload, BsFileEarmarkText, BsStar, BsStarFill } from "react-icons/bs";
import { getIdToken, getUserAccountId } from "../utils/AuthHelper";
import { BackendEndpoint } from "../utils/Config";

type Props = {
  role: "PATIENT" | "DOCTOR" | "DOCTOR_UNVERIFIED";
  view: string;
  toggleReRender: boolean;
};
type State = {
  files: File[];
  userId: string;
};

export class RecordList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      files: [],
      userId: getUserAccountId(),
    };
  }

  private static async downloadFile(fileId: string | null, fileName: string | null) {
    if (fileId === null) {
      return;
    }

    const uri = `${BackendEndpoint}/files/get/${fileId}`;
    const body = { jwt: await getIdToken() };
    const response = await axios.post(uri, body, { responseType: "blob" });

    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    if (typeof fileName === "string") {
      link.setAttribute("download", fileName);
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  componentDidMount() {
    this.getFiles();
  }

  async getFiles() {
    const getAllFilesURI = `${BackendEndpoint}/files`;
    const body = { jwt: await getIdToken() };
    const result = await axios.post(getAllFilesURI, body);

    if (result.status === 200) {
      const files: File[] = [];
      for (const file of result.data) {
        files.push(
          new File(
            file._id,
            file.name,
            {},
            file.parentId,
            file.ownerId,
            file.users,
            file.size,
            file.marked,
            new Date(Date.parse(file.lastUpdateTime))
          )
        );
      }

      this.setState({
        files,
      });
    }
  }

  // skipcq: JS-0356
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: unknown): boolean {
    if (nextProps.toggleReRender !== this.props.toggleReRender) {
      this.getFiles();
      return false;
    }

    return true;
  }

  render() {
    const files: File[] = [];
    this.state.files.forEach((file) => {
      if (
        this.props.view === "record" ||
        (this.props.view === "shared" && file.users.length > 1) ||
        (this.props.view === "marked" && file.marked) ||
        (this.props.view === "newest" && file.lastUpdateTime.getDate() > new Date().getDate() - 8)
      ) {
        files.push(file);
      }
    });

    return (
      <div>
        <Container fluid className="record-list">
          <Row className="file-record file-record-headline">
            <Col className="file-thumbnail" xs={"1"}></Col>
            <Col className="file-name" xs={"8"}>
              Name
            </Col>
            <Col className="file-size" xs={"1"}>
              Größe
            </Col>
            <Col className="file-modify-date" xs={"2"}>
              Geändert
            </Col>
          </Row>

          {files.map((file) => (
            <Row className="file-record" key={file.id} id={file.id.toString()}>
              <Col className="file-thumbnail" xs={"1"}>
                <BsFileEarmarkText title={"File-Icon"} style={{ scale: "2" }}></BsFileEarmarkText>
              </Col>
              <Col className="file-name" xs={"6"}>
                {file.name}
              </Col>
              <Col className="file-options" xs={"2"}>
                <div>
                  <Button
                    title={"Markieren"}
                    value={String(file.marked)}
                    onClick={(e) => this.updateMarked(e)}
                    className={"btn-icon"}
                  >
                    {file.marked ? (
                      <BsStarFill title={"Markiert"} className={"star yellow"} />
                    ) : (
                      <BsStar title={"Markieren"} className={"star"} />
                    )}
                  </Button>
                  <Button title={"Herunterladen"} onClick={(e) => this.handleDownloadClick(e)} className={"btn-icon"}>
                    <BsDownload title={"Herunterladen"} className={"download"} />
                  </Button>
                  <DeleteModal
                    onSuccess={(id) => this.handleOnSuccess(id)}
                    id={file.id}
                    name={file.name}
                    owner={file.ownerId}
                  />

                  {this.props.role === "PATIENT" ||
                  (this.props.role === "DOCTOR" && file.ownerId === this.state.userId) ? (
                    <ShareModal
                      id={file.id}
                      name={file.name}
                      owner={file.ownerId}
                      identityToken={this.state.userId}
                      permissions={file.users}
                      role={this.props.role}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Col>
              <Col className="file-size" xs={"1"}>
                {file.getFileSize()}
              </Col>
              <Col className="file-modify-date" xs={"2"}>
                {file.lastUpdateTime.toDateString()}
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }

  private handleOnSuccess(fileId: string) {
    this.setState((prevState) => ({ files: prevState.files.filter((f) => f.id !== fileId) }));
  }

  private handleDownloadClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const documentNode = e.currentTarget.parentElement?.parentElement?.parentElement as HTMLElement;
    if (documentNode === null) {
      return;
    }
    RecordList.downloadFile(
      documentNode.getAttribute("id"),
      (documentNode.getElementsByClassName("file-name")[0] as HTMLElement).innerText
    ).then((_) => _);
  }

  private async updateMarked(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // Send UPDATE request to backend for the specified file
    const id = (e.currentTarget.parentNode?.parentNode?.parentNode as HTMLElement).getAttribute("id");
    if (id === null) {
      return;
    }
    const value = (e.currentTarget as HTMLElement).getAttribute("value") === "true";

    const uri = `${BackendEndpoint}/files/mark/${id}?value=${(!value).toString()}`;
    const body = { jwt: await getIdToken() };
    await axios.post(uri, body, { responseType: "json" });

    const file = this.state.files.find((element) => element.id === id);
    const files_mod = this.state.files;

    if (file) {
      files_mod[this.state.files.indexOf(file)] = new File(
        file.id,
        file.name,
        file.content,
        file.parentId,
        file.ownerId,
        file.users,
        file.size,
        !value,
        file.lastUpdateTime
      );
      this.setState({ files: files_mod });
    }
  }
}
