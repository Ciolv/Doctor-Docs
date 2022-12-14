import * as React from "react";
import { Alert, Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import "../../css/Registration.scss";
import { User } from "../models/User";
import axios from "axios";
import { getIdToken, getUserAccountId } from "../utils/AuthHelper";
import { BackendEndpoint } from "../utils/Config";
import {
  isCityName,
  isInsuranceName,
  isInsuranceNumber, isFirstName, isLastName,
  isPostcode, isStreetName,
  isStreetNumber
} from "../utils/Validation";

type Props = {
  onChange?: () => void;
  registrationCompleted?: boolean;
};

let city_valid = true;
let first_name_valid = true;
let insurance_valid = true;
let insurance_number_valid = true;
let approbation_valid = true;
let last_name_valid = true;
let postcode_valid = true;
let street_valid = true;
let street_number_valid = true;

export class Registration extends React.Component<Props, User> {
  constructor(props: Props) {
    super(props);
    this.state = {
      city: "",
      first_name: "",
      id: getUserAccountId(),
      insurance: "",
      insurance_number: "",
      approbation: "",
      last_name: "",
      number: "",
      postcode: "",
      street: "",
    };
  }



  componentDidMount() {
    getIdToken().then(async (jwt) => {
      const uri = `${BackendEndpoint}/users`;
      const body = {
        jwt,
      };
      const response = await axios.post(uri, body);
      if (response.status === 200 && response.data !== null && response.data !== undefined) {
        this.setState(response.data);
      }
    });
  }

  render() {
    const isPatient: boolean | undefined = this.props.registrationCompleted && this.state.approbation === "";
    const isDoctor: boolean | undefined = this.props.registrationCompleted && this.state.approbation !== "";

    return (
      <Tabs defaultActiveKey={isDoctor ? "doctors" : "patients"} id="uncontrolled-tab-example" className="mb-3" justify>
        <Tab eventKey="patients" title="Für Patient:innen" className={"tab"} disabled={isDoctor}>
          <Container className="registration">
            {this.props.registrationCompleted && (
              <Alert className={"alert-danger"}>Ihre Registrierung ist erfolgreich abgeschlossen!</Alert>
            )}
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
                    <div className={"invalid-msg"} style={{display: first_name_valid ? "none" : ""}}>Vorname ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Nachname"
                      value={this.state.last_name}
                      onChange={(e) => this.handleLastNameChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: last_name_valid ? "none" : ""}}>Nachname ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicStreet">
                    <Form.Label>Straße</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Segitzdamm"
                      value={this.state.street}
                      onChange={(e) => this.handleStreetChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: street_valid ? "none" : ""}}>Straße ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicStreetNumber">
                    <Form.Label>Hausnummer</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="20"
                      value={this.state.number}
                      onChange={(e) => this.handleStreetNumberChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: street_number_valid ? "none" : ""}}>Hausnummer ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPostalCode">
                    <Form.Label>Postleitzahl</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="10969"
                      value={this.state.postcode}
                      onChange={(e) => this.handlePostcodeChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: postcode_valid ? "none" : ""}}>Postleitzahl ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>Stadt</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Berlin"
                      value={this.state.city}
                      onChange={(e) => this.handleCityChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: city_valid ? "none" : ""}}>Stadt ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicInsurance">
                    <Form.Label>Versicherung</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="AOK"
                      value={this.state.insurance}
                      onChange={(e) => this.handleInsuranceChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: insurance_valid ? "none" : ""}}>Versicherung ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicInsurancePolicyNumber">
                    <Form.Label>Versicherungsnummer</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="S123456789"
                      value={this.state.insurance_number}
                      onChange={(e) => this.handleInsuranceNumberChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: insurance_number_valid ? "none" : ""}}>Versicherungsnummer ungültig</div>
                  </Form.Group>
                  <Button className="btn btn-primary" onClick={() => this.handleSubmit()}>
                    Speichern
                  </Button>
                </Form>
              </Col>
              <Col xs={3} />
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="doctors" className={"tab"} title="Für Behandler:innen" disabled={isPatient}>
          <Container className="registration">
            {this.props.registrationCompleted && (
              <Alert className={"alert-danger"}>Ihre Registrierung ist erfolgreich abgeschlossen!</Alert>
            )}
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
                    <div className={"invalid-msg"} style={{display: first_name_valid ? "none" : ""}}>Vorname ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Nachname"
                      value={this.state.last_name}
                      onChange={(e) => this.handleLastNameChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: last_name_valid ? "none" : ""}}>Nachname ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicStreet">
                    <Form.Label>Straße</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Segitzdamm"
                      value={this.state.street}
                      onChange={(e) => this.handleStreetChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: street_valid ? "none" : ""}}>Straße ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicStreetNumber">
                    <Form.Label>Hausnummer</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="20"
                      value={this.state.number}
                      onChange={(e) => this.handleStreetNumberChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: street_number_valid ? "none" : ""}}>Hausnummer ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPostalCode">
                    <Form.Label>Postleitzahl</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="10969"
                      value={this.state.postcode}
                      onChange={(e) => this.handlePostcodeChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: postcode_valid ? "none" : ""}}>Postleitzahl ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>Stadt</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Berlin"
                      value={this.state.city}
                      onChange={(e) => this.handleCityChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: city_valid ? "none" : ""}}>Stadt ungültig</div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicApprobation">
                    <Form.Label>Ausstellende Behörde der Approbation / Zulassung</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Regierungspräsidium Stuttgart"
                      value={this.state.approbation}
                      onChange={(e) => this.handleApprobationChange(e.target.value)}
                    />
                    <div className={"invalid-msg"} style={{display: approbation_valid ? "none" : ""}}>Approbation ungültig</div>
                  </Form.Group>
                  <Alert>
                    Beachten Sie bitte, dass wir Ihnen den Status als Behandler:in erst zuweisen können, nachdem wir
                    Ihre Daten manuell mit dem zuständigen Arztregister bzw. der zuständigen Behörde abgeglichen haben.
                    <b> Sie werden dann durch uns per E-Mail benachrichtigt.</b>
                  </Alert>
                  <Button className="btn btn-primary" onClick={() => this.handleSubmit()}>
                    Speichern
                  </Button>
                </Form>
              </Col>
              <Col xs={3} />
            </Row>
          </Container>
        </Tab>
      </Tabs>
    );
  }

  handleInsuranceNumberChange(value: string) {
    if (isInsuranceNumber(value)) {
      insurance_number_valid = true;
    } else {
      insurance_number_valid = false;
    }
    this.setState({ insurance_number: value })

    };

  handleInsuranceChange(value: string) {
    if (isInsuranceName(value)) {
      insurance_valid = true;
    }
    else {
      insurance_valid = false;
    }
    this.setState({
                    insurance: value
                  });

  }

  handleCityChange(value: string) {
    if (isCityName(value)) {
      city_valid = true;
    }
    else {
      city_valid = false;
    }
    this.setState({
                    city: value
                  });
  }

  handlePostcodeChange(value: string) {
    if (isPostcode(value)) {
      postcode_valid = true;
    }
    else {
      postcode_valid = false;
    }
    this.setState({
                    postcode: value
                  });
  }

  handleStreetNumberChange(value: string) {
    if (isStreetNumber(value)) {
      street_number_valid = true;
    }
    else {
      street_number_valid = false;
    }
    this.setState({
                    number: value
                  });
  }

  handleStreetChange(value: string) {
    if (isStreetName(value)) {
      street_valid = true;
    }
    else {
      street_valid = false;
    }
    this.setState({
                    street: value
                  });
  }

  handleFirstNameChange(value: string) {
    if (isFirstName(value)) {
      first_name_valid = true;
    }
    else {
      first_name_valid = false;
    }
    this.setState({
                    first_name: value,
                  });
  }

  handleLastNameChange(value: string) {
    if (isLastName(value)) {
      last_name_valid = true;
    }
    else {
      last_name_valid = false;
    }
    this.setState({
                    last_name: value
                  });
  };

  handleApprobationChange(value: string) {
    if (isCityName(value)) {
      approbation_valid = true;
    }
    else {
      approbation_valid = false;
    }
    this.setState({
                    approbation: value
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
      approbation: this.state.approbation,
    };
    try {
      axios.post(`${BackendEndpoint}/users/registration`, user).then(() => {
        if (this.props.onChange !== undefined) {
          this.props.onChange();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
