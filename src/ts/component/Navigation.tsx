import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

import Heartbeat from "../../img/Heartbeat.svg";
import "../../css/Navigation.scss";
import { LabeledIcon } from "./LabeledIcon";
import { FaBox } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { IoMdHelpCircle, IoMdPerson } from "react-icons/io";
import { signOutClickHandler } from "../utils/AuthHelper";

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
            <Nav.Item>
              <Nav.Link as={NavLink} to="/help">
                <LabeledIcon text="Hilfe" icon={IoMdHelpCircle} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary" onClick={() => signOutClickHandler()}>
              Logout
            </Button>
          </Navbar.Collapse>

          <div className={"security-button-div"}>
            <Button className={"security-button"}>
              <a
                className={"mailto-link"}
                href={"mailto:reanimated_nanosensors@simplelogin.com?subject=Sicherheitsvorfall%20bei%20Doctor%20Docs"}
              >
                Vorfall melden
              </a>
            </Button>
          </div>
        </Navbar>
        <Outlet />
      </>
    );
  }
}
