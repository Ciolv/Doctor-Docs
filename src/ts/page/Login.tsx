import * as React from "react";
import * as msal from "@azure/msal-browser";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
// eslint-disable-next-line @typescript-eslint/ban-types
type State = {};

const msalConfig = {
  auth: {
    clientId: "49e6fa71-9a2c-465e-a3bc-8ba2f15bad61",
    redirectUri: "http://localhost:3000/home",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export class Login extends React.Component<Props, State> {
  async login_popup() {
    try {
      await msalInstance.loginPopup({ scopes: ["user.read"] });
    } catch (e) {
      console.log(`Login failed ${e}`);
    }
  }

  render() {
    return (
      <div>
        <button className={"login-button"} onClick={() => this.login_popup()}></button>
      </div>
    );
  }
}
