import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../css/Registration.scss";

type Props = {};
type State = {};

export class Registration extends React.Component<Props, State> {
  render() {
    return (
      <Container className="registration">
        <Row>
          <Col xs={3} />
          <Col xs={6} className="user-form">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicGivenName">
                <Form.Label>Vorname</Form.Label>
                <Form.Control type="Text" placeholder="Vorname" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control type="Text" placeholder="Nachname" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStreet">
                <Form.Label>Straße</Form.Label>
                <Form.Control type="Text" placeholder="Segitzdamm" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStreetNumber">
                <Form.Label>Hausnummer</Form.Label>
                <Form.Control type="Number" placeholder="20" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPostalCode">
                <Form.Label>Postleitzahl</Form.Label>
                <Form.Control type="Number" placeholder="10969" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Stadt</Form.Label>
                <Form.Control type="Text" placeholder="Berlin" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicInsurancePolicyNumber">
                <Form.Label>Versicherungsnummer</Form.Label>
                <Form.Control type="Text" placeholder="Berlin" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Speichern
              </Button>
            </Form>
          </Col>
          <Col xs={3} />
        </Row>

      </Container>
    );
  };
}