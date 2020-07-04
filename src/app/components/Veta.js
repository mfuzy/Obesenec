import React from "react";
import { Pismeno } from "./Pismeno";

export class Veta extends React.Component {
  render() {
    const pismena = this.props.pismena.map((i, k) => {
      return <Pismeno key={k} hodnota={i} />;
    });

    return <div id="veta">{pismena}</div>;
  }
}
