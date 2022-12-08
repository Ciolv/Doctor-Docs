import * as React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { RecordNav } from "../component/RecordNav";
import "../../css/Record.scss";
import { RecordList } from "../component/RecordList";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";
import { User } from "../models/User";
import { getIdToken } from "../utils/AuthHelper";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  userId: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type State = {
  rerender: boolean;
  showAlert?: boolean;
  role: "PATIENT" | "DOCTOR_UNVERIFIED" | "DOCTOR";
};

export class Record extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rerender: false,
      role: "PATIENT",
    };
  }

  componentDidMount() {
    this.getRole();
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
            {this.state.role === "DOCTOR_UNVERIFIED" ? (
              <Alert
                show={this.state.showAlert}
                className={"alert"}
                dismissible
                onClick={() => {
                  this.setState({ showAlert: false });
                }}
              >
                Da Ihre Verifizierung noch aussteht, können Sie noch keine Dokumente mit Patient:innen teilen.
              </Alert>
            ) : (
              ""
            )}

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

  private async getRole() {
    const uri = "http://localhost:8080/users/";
    const body = { jwt: await getIdToken() };
    const result = await axios.post<User>(uri, body);
    const userData = result.data;

    if (userData.approbation !== "") {
      if (userData.verified === true) {
        this.setState({ role: "DOCTOR" });
      } else {
        this.setState({ role: "DOCTOR_UNVERIFIED" });
      }
    } else {
      this.setState({ role: "PATIENT" });
    }
  }

  private async postFile(inputFiles: FileList | null) {
    if (inputFiles !== null) {
      if (inputFiles.length !== 0) {
        const file = inputFiles[0];
        const jwt = await getIdToken();
        const formData = new FormData();
        formData.set("file", file);
        formData.set("jwt", jwt ?? "");
        const url = "http://localhost:8080/files/upload";
        axios.post(url, formData);
      }
    }
  }
}
