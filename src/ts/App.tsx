import React from "react";
import "../css/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Login } from "./page/Login";
import { Navigation } from "./component/Navigation";
import { Record } from "./page/Record";
import { Registration } from "./page/Registration";
import { Security } from "./page/Security";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type State = {
  authenticated: boolean;
};

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authenticated: true
    };
  }

  render() {
    if (this.state?.authenticated) {
      return (
        <div>
          <Navigation authenticated={this.state.authenticated} />
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
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </div>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }
}