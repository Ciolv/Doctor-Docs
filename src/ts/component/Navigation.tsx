import * as React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

import Heartbeat from "../../img/Heartbeat.svg";
import "../../css/Navigation.scss";
import { AiFillHome } from "react-icons/ai";
import { LabeledIcon } from "./LabeledIcon";
import { FaBox } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";

type Props = {
  authenticated?: boolean;
};
type State = {};

export class Navigation extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand as={NavLink} to="/">
            <img src={Heartbeat} alt="Heartbeat" className="logo" />
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/home">
                <LabeledIcon text="Start" icon={AiFillHome} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/record">
                <LabeledIcon text="Akte" icon={FaBox} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/for-me">
                <LabeledIcon text="Für mich" icon={IoMdPerson} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/security">
                <LabeledIcon text="Sicherheit" icon={BsFillShieldLockFill} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary">Logout</Button>
          </Navbar.Collapse>
        </Navbar>
        <Outlet />
      </>
    );
  }
}
