import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RecordNav } from "../component/RecordNav";
import "../../css/Record.scss";
import { RecordList } from "../component/RecordList";
import axios, { AxiosResponse } from "axios";
import { IoAddCircle } from "react-icons/io5";
import { User } from "../models/User";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  userId: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type State = {
  rerender: boolean,
  role: "PATIENT" | "DOCTOR_UNVERIFIED" | "DOCTOR"
};

export class Record extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rerender: false,
      role: "PATIENT"
    }
  }

  componentDidMount() {
    this.getRole();
  }

  private async getRole() {
    let userData: User;
    await axios.get(`http://localhost:8080/users/${this.props.identityToken}`).then(
      (result: AxiosResponse<User>) => {
        userData = result.data;
        if (userData.approbation !== "") {
          if (userData.verified === true) {
            this.setState({role: "DOCTOR"});
          }
          else {
            this.setState({role: "DOCTOR_UNVERIFIED"});
          }
        }
        else {
          this.setState({role: "PATIENT"});
        }

      });
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
              <input id="fileInput" type="file" onChange={(e) => this.handleFileUpload(e)} hidden />
              <label id="fileInputLabel" htmlFor="fileInput">
                <IoAddCircle />
              </label>
            </div>
            <RecordList
              toggleReRender={this.state.rerender}
              identityToken={this.props.userId}
              role={this.state.role}
              view={window.location.href.split("/").slice(-1)[0]}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = (e.target as EventTarget & HTMLInputElement).files;
    this.postFile(files);
    this.setState((prevState) => ({
      rerender: !prevState.rerender,
    }));
  }

  private postFile(inputFiles: FileList | null) {
    if (inputFiles !== null) {
      if (inputFiles.length !== 0) {
        const file = inputFiles[0];
        const formData = new FormData();
        formData.set("file", file);
        axios.post(`http://localhost:8080/files/upload?userId=${this.props.userId}`, formData);
      }
    }
  }
}
