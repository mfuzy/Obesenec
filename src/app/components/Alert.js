import React from "react";

export class Alert extends React.Component {
  render() {
    return (
      <div className="podklad">
        <div className="alert">
          <h3>{this.props.text}</h3>

          <button name={this.props.namex} onClick={this.props.onclx}>
            OK
          </button>
        </div>
      </div>
    );
  }
}
