import React from "react";

export class Vstup extends React.Component {
  render() {
    return (
      <div id="vstup">
        <label htmlFor="inp">Zadaj znak: </label>
        <input
          type="text"
          value={this.props.val}
          onChange={this.props.onch}
          autoFocus
        />
      </div>
    );
  }
}
