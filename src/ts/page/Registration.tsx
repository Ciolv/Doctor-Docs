import * as React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../css/Registration.scss";
import { User } from "../models/User";
import axios from "axios";

type Props = {
  identityToken: string;
  onChange?: () => void;
  registrationCompleted?: boolean;
};

type State = User & {
  redirect: boolean
}

export class Registration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      city: "",
      first_name: "",
      id: props.identityToken,
      insurance: "",
      insurance_number: "",
      last_name: "",
      number: 0,
      postcode: 0,
      street: "",
      redirect: false
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/users/${this.props.identityToken}`).then((response) => {
      if (response.status === 204) {
        return;
      }
      if (response.data !== null && response.data !== undefined) {
        this.setState(response.data);
      }
    });
  }

  render() {
    return (
      <Container className="registration">
        {this.props.registrationCompleted && <Alert className={"alert-danger"}>Ihre Registrierung ist erfolgreich abgeschlossen!</Alert>}
        <Row>
          <Col xs={3} />
          <Col xs={6} className="user-form">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicGivenName">
                <Form.Label>Vorname</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Vorname"
                  value={this.state.first_name}
                  onChange={(e) => this.handleFirstNameChange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Nachname"
                  value={this.state.last_name}
                  onChange={(e) => this.handleLastNameChange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStreet">
                <Form.Label>Straße</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Segitzdamm"
                  value={this.state.street}
                  onChange={(e) => this.handleStreetChange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStreetNumber">
                <Form.Label>Hausnummer</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="20"
                  value={this.state.number}
                  onChange={(e) => this.handleStreetNumberChange(e.target.value as unknown as number)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPostalCode">
                <Form.Label>Postleitzahl</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="10969"
                  value={this.state.postcode}
                  onChange={(e) => this.handlePostcodeChange(e.target.value as unknown as number)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Stadt</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Berlin"
                  value={this.state.city}
                  onChange={(e) => this.handleCityChange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicInsurance">
                <Form.Label>Versicherung</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="AOK"
                  value={this.state.insurance}
                  onChange={(e) => this.handleInsuranceChange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicInsurancePolicyNumber">
                <Form.Label>Versicherungsnummer</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="S123456789"
                  value={this.state.insurance_number}
                  onChange={(e) => this.handleInsuranceNumberChange(e.target.value)}
                />
              </Form.Group>
              <Button className="btn btn-primary" onClick={() => this.handleSubmit()}>
                Speichern
              </Button>
            </Form>
          </Col>
          <Col xs={3} />
        </Row>
      </Container>
    );
  }

  handleInsuranceNumberChange(value: string) {
    this.setState({
        insurance_number: value
    });
  }

  handleInsuranceChange(value: string) {
    this.setState({
                    insurance: value
                  });
  }

  handleCityChange(value: string) {
    this.setState({
        city: value
    });
  }

  handlePostcodeChange(value: number) {
    this.setState({
      postcode: value
    });
  }

  handleStreetNumberChange(value: number) {
    this.setState({
        number: value
    });
  }

  handleStreetChange(value: string) {
    this.setState({
        street: value
    });
  }

  handleFirstNameChange(value: string) {
    this.setState({
        first_name: value,
    });
  }

  handleLastNameChange(value: string) {
    this.setState({
        last_name: value
    });
  }

  handleSubmit() {
    const user: User = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      street: this.state.street,
      number: this.state.number,
      postcode: this.state.postcode,
      city: this.state.city,
      insurance_number: this.state.insurance_number,
      insurance: this.state.insurance,
    };
    try {
      axios.post("http://localhost:8080/users/registration", user).then(() => {
        if (this.props.onChange !== undefined) {
          this.props.onChange();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
