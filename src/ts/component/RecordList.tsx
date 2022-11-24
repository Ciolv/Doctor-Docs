import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../css/RecordList.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ThumbnailMock } from "../utils/MockData";
import { GiShare } from "react-icons/gi";
import { File } from "../models/File";
import axios from "axios";

type Props = {};
type State = {
  files: File[];
};

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
  userId = "637201eed818997609ef5915";

  constructor(props: Props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    this.getFiles();
  }

  async getFiles() {
    const getAllFilesURI = "http://localhost:8080/files?userId=" + this.userId;
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
            new Date(Date.parse(file.lastUpdateTime))
          )
        );
      }

      this.setState({
                      files: files,
                    });
    }
  }

  async downloadFile(fileId: string | null) {
    if (fileId == null) {
      return;
    }
    const getAllFilesURI = `http://localhost:8080/files/${fileId}?userId=${this.userId}`;
    const result = await axios.get(getAllFilesURI);
    const dataUrl = URL.createObjectURL(new Blob(result.data.content));
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = result.data.name;
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(dataUrl);

    return result.data.content;
  }

  render() {
    return (
      <Container fluid className="record-list">
        <Row className="file-record file-record-headline">
          <Col className="file-thumbnail" xs={"1"}></Col>
          <Col className="file-name" xs={"7"}>
            Name
          </Col>
          <Col className="file-size" xs={"1"}>
            Größe
          </Col>
          <Col className="file-modify-date" xs={"2"}>
            Geändert
          </Col>
          <Col className="file-info" xs={"1"}></Col>
        </Row>

        {this.state !== null ? (
          this.state.files.map((file) => (
            <Row className="file-record" key={file.id} id={file.id.toString()}>
              <Col className="file-thumbnail" xs={"1"}>
                IMG
              </Col>
              <Col
                className="file-name"
                xs={"6"}
                // onClick={(e) => this.downloadFile((e.currentTarget.parentNode as HTMLElement).getAttribute("id"))}
              >
                {/*{file.name}*/}
                <a href={`http://localhost:8080/files/${file.id}?userId=${this.userId}`} download={file.name}>
                  {file.name}
                </a>
              </Col>
              <Col className="file-options" xs={"1"}>
                <div>
                  <GiShare/>
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
          ))
        ) : (
          <></>
        )}
      </Container>
    );
  }
}
