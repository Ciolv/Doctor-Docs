import * as React from "react";
import * as msal from "@azure/msal-browser";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  onLogin: (authToken: msal.AuthenticationResult) => void;
};
type State = {
  loginRedirect: boolean;
  loginError: boolean;
};

const msalConfig = {
  auth: {
    clientId: "49e6fa71-9a2c-465e-a3bc-8ba2f15bad61",
    redirectUri: "http://localhost:3000/home",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      this.testSilentLogin(accounts[0]);
    }
    this.state = {
      loginRedirect: false,
      loginError: false,
    };
  }

  async testSilentLogin(account: msal.AccountInfo) {
    const request = { scopes: ["user.read"], account: account, forceRefresh: false };
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent(request);
      this.props.onLogin(tokenResponse);
      return true;
    } catch {
      console.log("Silent login not possible");
      return false;
    }
  }

  async loginPopup() {
    const request = { scopes: ["user.read"] };
    console.log("popup fallback");
    // fallback to interaction when silent call fails
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
        <button className={"login-button"} onClick={() => this.loginPopup()}></button>
      </div>
    ) : (
      <div>
        <button className={"login-button"} onClick={() => this.loginPopup()}></button>
      </div>
    );
  }
}
