import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../css/RecordList.scss";
import { AiFillStar, AiOutlineInfoCircle, AiOutlineStar } from "react-icons/ai";
import { ThumbnailMock } from "../utils/MockData";
import ShareModal from "./ShareModal";
import { File } from "../models/File";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  view: string;
};
type State = {
  files: File[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockData = [
  {
    id: 1,
    thumbnail: ThumbnailMock,
    fileName: "Doctor.svg",
    fileSize: 0.207,
    modifyDate: new Date(2022, 10, 13),
  },
  {
    id: 2,
    thumbnail: ThumbnailMock,
    fileName: "Doc.svg",
    fileSize: 0.217,
    modifyDate: new Date(2022, 10, 1),
  },
];

export class RecordList extends React.Component<Props, State> {
  private static userId = "637201eed818997609ef5915";

  constructor(props: Props) {
    super(props);

    this.state = {
      files: []
    };
  }

  private static downloadFile(fileId: string | null, fileName: string | null) {
    console.log("File");
    if (fileId === null) {
      return;
    }
    axios({
            url: `http://localhost:8080/files/${fileId}?userId=${RecordList.userId}`,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
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
    });
  }

  componentDidMount() {
    this.getFiles();
  }

  async getFiles() {
    const getAllFilesURI = `http://localhost:8080/files?userId=${RecordList.userId}`;
    const result = await axios.get(getAllFilesURI);

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

  render() {
    const files: File[] = [];
    this.state.files.forEach((file) => {
      if (
        (this.props.view === "record") ||
        (this.props.view === "shared") ||
        ((this.props.view === "marked") && file.marked) ||
        ((this.props.view === "newest") && (file.lastUpdateTime.getDate() > new Date().getDate()-8))
      ) {
        files.push(file);
      }
    })

    return (
      <Container fluid className="record-list">
        <Row className="file-record file-record-headline">
          <Col className="file-thumbnail" xs={"1"}></Col>
          <Col className="file-name" xs={"7"}>
            Name
          </Col>
          <Col className="file-options" xs={"1"}></Col>
          <Col className="file-size" xs={"1"}>
            Größe
          </Col>
          <Col className="file-modify-date" xs={"2"}>
            Geändert
          </Col>
          <Col className="file-info" xs={"1"}></Col>
        </Row>

        {files.map((file) => (
          <Row className="file-record" key={file.id} id={file.id.toString()}>
            <Col className="file-thumbnail" xs={"1"}>
              IMG
            </Col>
            <Col className="file-name" xs={"6"} onClick={this.handleDownloadClick}>
              {file.name}
            </Col>
            <Col className="file-options" xs={"1"}>
              <div>
                <button value={String(file.marked)} onClick={(e) => this.updateMarked(e)}
                        style={{ background: "none", border: "none" }}>
                  {(file.marked
                  ) ? <AiFillStar className={"star yellow"}/> : <AiOutlineStar className={"star"}/>}
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <ShareModal/>
              </div>
            </Col>
            <Col className="file-size" xs={"1"}>
              {file.getFileSize()}
            </Col>
            <Col className="file-modify-date" xs={"2"}>
              {file.lastUpdateTime.toDateString()}
            </Col>
            <Col className="file-info" xs={"1"}>
              <AiOutlineInfoCircle/>
            </Col>
          </Row>
        ))}
      </Container>
    );
  }

  private handleDownloadClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    RecordList.downloadFile(
      (e.currentTarget.parentNode as HTMLElement
      ).getAttribute("id"),
      (e.currentTarget as HTMLElement
      ).innerText
    );
  }

  private updateMarked(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // Send UPDATE request to backend for the specified file
    const id = (e.currentTarget.parentNode?.parentNode?.parentNode as HTMLElement).getAttribute("id")
    const value = (e.currentTarget as HTMLElement).getAttribute("value") === "true";

    axios({
            url: `http://localhost:8080/files/mark/${id}?value=${!(value)}`,
            method: "GET",
            responseType: "json",
          });

    const file = this.state.files.find((element) => element.id === id);
    const files_mod = this.state.files;

    if (file) {
      this.state.files.indexOf(file)
      files_mod[this.state.files.indexOf(file)] = new File(file.id, file.name, file.content, file.parentId, file.ownerId, file.users, file.size, !value, file.lastUpdateTime);
      this.setState({files: files_mod});
    }



  }
}
