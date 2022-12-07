import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../css/Security.scss";

type Props = {};
type State = {};

export class Security extends React.Component<Props, State> {
  render() {
    // skipcq:  JS-0105
    return (
      <Container className="security">
        <Row>
          <Col xs={3} />
          <Col xs={6} className="user-form">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicInsurancePolicyNumber">
                <Form.Check type="checkbox" label="Jede Dateifreigabe mit zweitem Faktor bestätigen" />
              </Form.Group>
              <Button variant="primary" type="button">
                Speichern
              </Button>
            </Form>
          </Col>
          <Col xs={3} />
        </Row>
      </Container>
    );
  }
}
