import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Home } from "./Home";
import { RecordNav } from "../component/RecordNav";
import "../../css/Record.css";

type Props = {};
type State = {};

export class Record extends React.Component<Props, State> {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col id="navigation-pane" xs={4}>
            <RecordNav />
          </Col>
          <Col id="main-content" xs={8}>
            <Home />
          </Col>
        </Row>
      </Container>
    );
  };
}