import * as React from "react";
import { AuthenticationResult, PublicClientApplication } from "@azure/msal-browser";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../../css/Login.css"
import { getTokenResponse, msalConfig } from "../utils/AuthHelper";
import mslogo from "../../img/microsoft.svg";
import doctor from "../../img/Doctor.svg";
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  onLogin: (authToken: AuthenticationResult) => void;
};
type State = {
  loginRedirect: boolean;
  loginError: boolean;
};

const msalInstance = new PublicClientApplication(msalConfig);

export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.testSilentLogin();
    this.state = {
      loginRedirect: false,
      loginError: false,
    };
  }

  async testSilentLogin() {
    // skipcq: JS-0240
    try {
      const tokenResponse = await getTokenResponse();
      if (tokenResponse) {
        this.props.onLogin(tokenResponse);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async loginPopup() {
    const request = { scopes: ["user.read"] };
    try {
      const tokenResponse = await msalInstance.acquireTokenPopup(request);
      this.props.onLogin(tokenResponse);
    } catch {
      this.setState({
        loginError: true,
      });
    }
  }

  render() {
    return this.state.loginRedirect ? (
      <Navigate to={"/home"} />
    ) : this.state.loginError ? (
      <div>
        <Alert className={"alert-danger"}>Your login attempt was unsuccessful. Please try it again.</Alert>
        <div className={"welcome-text-container"}>
          <h1 className={"main-heading"}>Herzlich Willkommen bei Doctor Docs</h1>
          <img className={"doctor"} alt={"Doctor Docs Logo"} src={doctor} />
          <p className={"welcome-text"}>Um sich bei der Anwendung anzumelden und Ihre Reise zum sicheren Speichern von Gesundeheitsdokumenten zu starten, drücken Sie bitte auf die Schaltfläche Login und folgen Sie den Anweisungen um sich mit Ihrem Microsoft-Konto anzumelden.</p>
        </div>
        <div className={"login-button-container"}>
          <button type={"button"} className={"login-button"} onClick={() => this.loginPopup()}>
            Login mit
            <img alt={"Microsoft Logo"} className={"microsoft-logo"} src={mslogo} />
          </button>
        </div>
      </div>
    ) : (
      <div>
        <div className={"welcome-text-container"}>
          <h1 className={"main-heading"}>Herzlich Willkommen bei Doctor Docs</h1>
          <div className={"doctor-container"}><img className={"doctor"} alt={"Doctor Docs Logo"} src={doctor} /></div>
          <p className={"welcome-text"}>Um sich bei der Anwendung anzumelden und Ihre Reise zum sicheren Speichern von Gesundeheitsdokumenten zu starten, drücken Sie bitte auf die Schaltfläche Login und folgen Sie den Anweisungen um sich mit Ihrem Microsoft-Konto anzumelden.</p>
        </div>
        <div className={"login-button-container"}>
          <button type={"button"} className={"login-button"} onClick={() => this.loginPopup()}>
            Login mit
            <img alt={"Microsoft Logo"} className={"microsoft-logo"} src={mslogo} />
          </button>
        </div>
      </div>
    );
  }
}
