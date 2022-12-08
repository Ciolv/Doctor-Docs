// @flow
import * as React from "react";
import { AlignType } from "react-bootstrap/types";
import "../../css/LabeledIcon.css";

type Props = {
  alignText?: AlignType;
  text: string;
  icon: React.ElementType;
};

type State = {
  alignment: string;
};

export class LabeledIcon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      alignment: props.alignText === "start" ? "start" : "end",
    };
  }

  render() {
    return (
      <div className="labeled-icon">
        {this.state.alignment === "end" && <this.props.icon />}
        <span className={`icon-text-${this.state.alignment}`}>{this.props.text}</span>
        {this.state.alignment === "start" && <this.props.icon />}
      </div>
    );
  }
}
