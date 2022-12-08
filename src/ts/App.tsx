import React from "react";
import "../css/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./page/Login";
import { Navigation } from "./component/Navigation";
import { Record } from "./page/Record";
import { Registration } from "./page/Registration";
import { Security } from "./page/Security";
import { AuthenticationResult } from "@azure/msal-browser";
import axios from "axios";
import { getIdToken, getUserAccountId } from "./utils/AuthHelper";
import { Help } from "./page/Help";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type State = {
  accessToken: string;
  identityToken: string;
  registrationCompleted: boolean;
};

export default class App extends React.Component<Props, State> {
  private readonly handleLogin: (tokenResponse: AuthenticationResult) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: "",
      identityToken: "",
      registrationCompleted: false,
    };

    this.handleLogin = (tokenResponse: AuthenticationResult) => {
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

  async registrationCompleted() {
    const userId = getUserAccountId();
    if (userId) {
      const uri = "http://localhost:8080/users/registrationCompleted";
      const body = { jwt: await getIdToken() };
      const response = await axios.post(uri, body);

      if (response.status === 200) {
        if (response.data.completed !== this.state.registrationCompleted) {
          this.setState({ registrationCompleted: response.data.completed });
        }
      }
    }
  }

  componentDidMount() {
    this.registrationCompleted();
  }

  render() {
    if (this.authenticated()) {
      if (this.state.registrationCompleted) {
        return (
          <div>
            <Navigation authenticated={this.authenticated()} />
            <Routes>
              <Route path="/" element={<Navigate replace to="/record" />} />
              <Route path="/record">
                <Route index element={<Record userId={this.state.identityToken} />} />
                <Route path="newest" element={<Record userId={this.state.identityToken} />} />
                <Route path="marked" element={<Record userId={this.state.identityToken} />} />
                <Route path="shared" element={<Record userId={this.state.identityToken} />} />
              </Route>
              <Route
                path="/for-me"
                element={
                  <Registration
                    identityToken={this.state.identityToken}
                    registrationCompleted={this.state.registrationCompleted}
                  />
                }
              />
              <Route path="/security" element={<Security />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate replace to="/record" />} />
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
    this.registrationCompleted();
  }
}
