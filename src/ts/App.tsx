import React from "react";
import "../css/App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Login } from "./page/Login";

type Props = {};

type State = {
  authenticated: boolean;
};

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  render() {
    if (!this.state?.authenticated) {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      );
    }

    return (
      <Login />
    );
  }
}