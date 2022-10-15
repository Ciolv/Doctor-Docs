import * as React from "react";
import { Button } from "react-bootstrap";

type Props = {};
type State = {};

export class Login extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Button>Login</Button>
      </div>
    );
  };
}