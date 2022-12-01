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
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type State = {
  accessToken: string;
  identityToken: string;
  registrationCompleted: boolean;
};

export default class App extends React.Component<Props, State> {
  private readonly handleLogin: (tokenResponse: msal.AuthenticationResult) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: "",
      identityToken: "",
      registrationCompleted: false,
    };

    this.handleLogin = async (tokenResponse: msal.AuthenticationResult) => {
      console.log(tokenResponse.account?.localAccountId);
      if (tokenResponse.account !== null) {
        this.setState({
          identityToken: tokenResponse.account?.localAccountId,
          accessToken: tokenResponse.accessToken,
        });
      }
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

  registrationCompleted() {
    console.log(`http://localhost:8080/users/registrationCompleted/${this.state.identityToken}`);
    axios.get(`http://localhost:8080/users/registrationCompleted/${this.state.identityToken}`).then((response) => {
      console.log(`registration completed: ${response.data.completed}`);
      if (response.data.completed !== this.state.registrationCompleted) {
        this.setState({ registrationCompleted: response.data.completed });
      }
    });
  }

  render() {
    this.registrationCompleted();

    if (this.authenticated()) {
      if (this.state.registrationCompleted) {
        return (
          <div>
            <Navigation authenticated={this.authenticated()} />
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/record">
                <Route index element={<Record identityToken={this.state.identityToken} />} />
                <Route path="newest" element={<Record identityToken={this.state.identityToken} />} />
                <Route path="marked" element={<Record identityToken={this.state.identityToken} />} />
                <Route path="shared" element={<Record identityToken={this.state.identityToken} />} />
              </Route>
              <Route path="/for-me" element={<Registration identityToken={this.state.identityToken} />} />
              <Route path="/security" element={<Security />} />
              <Route path={"/login"} element={<Login onLogin={this.handleLogin} />} />
            </Routes>
          </div>
        );
      }
      return (
        <div>
          <Navigation authenticated={this.authenticated()} />
          <Routes>
            <Route
              path="*"
              element={
                <Registration
                  identityToken={this.state.identityToken}
                  onChange={() => this.handleRegistrationChange()}
                  registrationCompleted={this.state.registrationCompleted}
                />
              }
            />
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

  handleRegistrationChange() {
    console.log("reload");
    this.registrationCompleted();
  }
}
