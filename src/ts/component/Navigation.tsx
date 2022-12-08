import * as React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

import Heartbeat from "../../img/Heartbeat.svg";
import "../../css/Navigation.scss";
import { LabeledIcon } from "./LabeledIcon";
import { FaBox } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";

type Props = {
  authenticated?: boolean;
};
type State = {};

const msalConfig = {
  auth: {
    clientId: "49e6fa71-9a2c-465e-a3bc-8ba2f15bad61",
    redirectUri: "http://localhost:3000/home",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export class Navigation extends React.Component<Props, State> {
  async signOutClickHandler() {
    const accounts = msalInstance.getAllAccounts();
    const account: AccountInfo = accounts[0];
    const homeAccountId = account.homeAccountId;

    const logoutRequest = {
      account: msalInstance.getAccountByHomeId(homeAccountId),
      postLogoutRedirectUri: "http://localhost:3000/login",
      mainWindowRedirectUri: "http://localhost:3000/login",
    };
    await msalInstance.logoutPopup(logoutRequest);
  }

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
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary" onClick={() => this.signOutClickHandler()}>
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
