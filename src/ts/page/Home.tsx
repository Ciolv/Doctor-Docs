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
            Edit <code>src/ts/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}
