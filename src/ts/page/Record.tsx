import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RecordNav } from "../component/RecordNav";
import "../../css/Record.css";
import { RecordList } from "../component/RecordList";

type Props = {};
type State = {};

export class Record extends React.Component<Props, State> {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col id="navigation-pane" xs={2}>
            <RecordNav />
          </Col>
          <Col id="main-content" xs={10}>
            <RecordList />
          </Col>
        </Row>
      </Container>
    );
  };
}