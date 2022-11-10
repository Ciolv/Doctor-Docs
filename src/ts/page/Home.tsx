import React from "react";
import doctor from "../../img/Doctor.svg";
import "../../css/App.css";

export class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={doctor} className="App-logo" alt="logo" />
          <p>
            <b>Doctor Docs</b><br/>
            Wo sind denn meine Zähne?
          </p>
        </header>
      </div>
    )
  }
}
