import React from "react";

export class Pismeno extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          className="pismeno"
          value={this.props.hodnota}
          readOnly
        />
      </React.Fragment>
    );
  }
}
