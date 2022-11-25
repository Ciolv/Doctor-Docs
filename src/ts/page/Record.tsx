import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RecordNav } from "../component/RecordNav";
import "../../css/Record.scss";
import { RecordList } from "../component/RecordList";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
// eslint-disable-next-line @typescript-eslint/ban-types
type State = {};

export class Record extends React.Component<Props, State> {
  private static postFile(inputFiles: FileList | null) {
    if (inputFiles !== null) {
      if (inputFiles.length !== 0) {
        const file = inputFiles[0];
        const formData = new FormData();
        formData.set("file", file);
        axios.post("http://localhost:8080/files/upload", formData).then((res) => {
          console.log(res);
        });
      }
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col id="navigation-pane" xs={2}>
            <RecordNav />
          </Col>
          <Col id="main-content" xs={10}>
            <div className={"input-bar"}>
              <input id="fileInput" type="file" onChange={this.pFile} hidden />
              <label id="fileInputLabel" htmlFor="fileInput">
                <IoAddCircle />
              </label>
            </div>
            <RecordList />
          </Col>
        </Row>
      </Container>
    );
  }

  pFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = (e.target as EventTarget & HTMLInputElement).files;
    Record.postFile(files);
  }
}
