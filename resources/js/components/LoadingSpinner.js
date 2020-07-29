import React, { Component } from "react";
import { Spinner } from "reactstrap";
export class LoadingSpinner extends Component {
  render() {
    return (
      <div className="container">
        <div className="mt-auto mb-auto ml-auto mr-auto">
          <Spinner
            className="ml-auto mr-auto"
            style={{ width: "3.5rem", height: "3.5rem" }}
          />
          <h3 className="d-block">LOADING...</h3>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
