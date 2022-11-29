import React from "react";
import "../css/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Login } from "./page/Login";
import { Navigation } from "./component/Navigation";
import { Record } from "./page/Record";
import { Registration } from "./page/Registration";
import { Security } from "./page/Security";
import * as msal from "@azure/msal-browser";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type State = {
  accessToken: string;
  identityToken: string;
};

export default class App extends React.Component<Props, State> {
  private readonly handleLogin: (tokenResponse: msal.AuthenticationResult) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: "",
      identityToken: "",
    };

    this.handleLogin = async (tokenResponse: msal.AuthenticationResult) => {
      this.setState({
        identityToken: tokenResponse.idToken,
        accessToken: tokenResponse.accessToken,
      });
    };
  }

  authenticated() {
    return (
      this.state.accessToken !== null &&
      this.state.accessToken !== "" &&
      this.state.identityToken !== null &&
      this.state.identityToken !== ""
    );
  }

  render() {
    if (this.authenticated()) {
      return (
        <div>
          <Navigation authenticated={this.authenticated()} />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/record">
              <Route index element={<Record />} />
              <Route path="newest" element={<Record />} />
              <Route path="marked" element={<Record />} />
              <Route path="shared" element={<Record />} />
            </Route>
            <Route path="/for-me" element={<Registration />} />
            <Route path="/security" element={<Security />} />
            <Route path="/registration" element={<Registration />} />
            <Route path={"/login"} element={<Login onLogin={this.handleLogin} />} />
          </Routes>
        </div>
      );
    }

    return (
      <Routes>
        <Route path="*" element={<Login onLogin={this.handleLogin} />} />
      </Routes>
    );
  }
}
