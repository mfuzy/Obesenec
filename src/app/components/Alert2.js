import React from "react";

export class Alert2 extends React.Component {
  render() {
    var klasa = "alert2";

    switch (this.props.klasa) {
      case "vyhra":
        klasa += " vyhra";
        break;
      case "prehra":
        klasa += " prehra";
        break;
    }

    return (
      <div className="podklad">
        <div className={klasa}>
          <button name={this.props.namex} onClick={this.props.onclx}>
            &times;
          </button>

          <div>
            <h3>{this.props.text}</h3>

            <button onClick={this.props.onclb}>Nová hra</button>
          </div>
        </div>
      </div>
    );
  }
}
