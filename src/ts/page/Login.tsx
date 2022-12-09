import * as React from "react";
import { AuthenticationResult } from "@azure/msal-browser";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { getTokenResponse, msalInstance } from "../utils/AuthHelper";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  onLogin: (authToken: AuthenticationResult) => void;
};
type State = {
  loginRedirect: boolean;
  loginError: boolean;
};

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
        <button type={"button"} className={"login-button btn btn-primary"} onClick={() => this.loginPopup()}>
          Login
        </button>
      </div>
    ) : (
      <div>
        <button type={"button"} className={"login-button btn btn-primary"} onClick={() => this.loginPopup()}>
          Login
        </button>
      </div>
    );
  }
}
