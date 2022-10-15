import * as React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { AiFillFolder, AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { LabeledIcon } from "./LabeledIcon";
import "../../css/RecordNav.scss";
import { GiShare } from "react-icons/gi";

type Props = {};
type State = {};

export class RecordNav extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Nav
          className="flex-column justify-content-start"
          variant="dark"
        >
          <Nav.Item>
            <Nav.Link as={NavLink} to="/record">
              <LabeledIcon text="Alle Dateien" icon={AiFillFolder} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/record/newest">
              <LabeledIcon text="Neu" icon={BiTime} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/record/marked">
              <LabeledIcon text="Markiert" icon={AiFillStar} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/record/shared">
              <LabeledIcon text="Geteilt" icon={GiShare} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Outlet />
      </>
    );
  };
}