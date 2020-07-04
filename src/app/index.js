import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Vstup } from "./components/Vstup";
import { Veta } from "./components/Veta";
import { Alert } from "./components/Alert";
import { Alert2 } from "./components/Alert2";

class App extends React.Component {
  constructor(props) {
    var cakajte = "ČAKAJTE...".split("");

    super(props);

    this.state = {
      pismeno: "",
      pismena: cakajte,
      zadane: [],
      odkryte: 0,
      pocitadlo: 0,
      vstup: true,
      uzzadal: false,
      vyhra: false,
      prehra: false
    };

    this.onch = this.onch.bind(this);

    this.onclx = this.onclx.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then(response => {
        console.log(response.data.value);

        //vytvorenie pola vsetkych znakov z prisleho vtipoveho stringu plus toUpperCase
        //a priradenie do triednej premennej - kvoli zisteniu, ci uhadol pismeno - vid metoda onch
        this.veta_pole = response.data.value.toUpperCase().split("");

        //zistenie poctu pismen (bez medzier) - kvoli porovnaniu, ci uz vyhral - vid componentDidUpdate
        this.pocet_pismen = 0;

        for (let i = 0; i < this.veta_pole.length; i++) {
          if (this.veta_pole[i] != " ") {
            this.pocet_pismen++;
          }
        }

        const prazdne_pole = new Array(this.veta_pole.length).fill("");

        this.setState({ pismena: prazdne_pole });
      })
      .catch(err => {
        console.log(err);
      });

    //vytvorenie kontextu a priradenie do triednej premennej, aby som mohol kreslit
    //this.canvas je vytvoreny cez ref atribut na canvas elemente
    this.kontext = this.canvas.getContext("2d");
  }

  componentDidUpdate(prevProps, prevState) {
    //ok neuhadol pismeno
    if (prevState.pocitadlo < this.state.pocitadlo) {
      console.log("neuhadol si");
      this.obes();
      //prehra?
      if (this.state.pocitadlo === 14) {
        console.log("Prehra");
        this.setState({ prehra: true, vstup: false });
      }
    }
    //ak uhadol
    else {
      //vyhra?
      if (this.state.odkryte === this.pocet_pismen) {
        console.log("Vyhra");
        //odkryte na nulu, aby nevznikol nekonecny loop componentDidUpdate
        this.setState({ vyhra: true, vstup: false, odkryte: 0 });
      }
    }
  }

  onch(e) {
    const val = e.target.value.toUpperCase();

    //ak som zadal prazdny string, cize ked stlacim backspace
    if (val === "") {
      this.setState({ pismeno: val });
    } else {
      //ak som pismeno uz raz zadal
      if (this.state.zadane.indexOf(val) != -1) {
        console.log("uz si zadal " + val);

        this.setState({ pismeno: val, uzzadal: true, vstup: false });
      }
      //ak som ho zadal prvy krat
      else {
        //pole indexov vyskytu pismena v tajnicke
        let indexy = [];

        for (let i = 0; i < this.veta_pole.length; i++) {
          if (this.veta_pole[i] === val) {
            indexy.push(i);
          }
        }

        //ak uhadol pismeno
        if (indexy.length) {
          const newPismena = [...this.state.pismena];

          indexy.forEach(i => {
            newPismena[i] = val;
          });

          //pole pismen, ktore zadam
          const newZadane = [...this.state.zadane, val];

          //pocet odkrytych - aby som vedel, kedy vyhra - vid componentDidUpdate
          const odkryte = this.state.odkryte + indexy.length;

          this.setState({
            pismeno: val,
            pismena: newPismena,
            zadane: newZadane,
            odkryte: odkryte
          });
        }
        //ak neuhadol pismeno
        else {
          //pole pismen, ktore zadam
          const newZadane = [...this.state.zadane, val];

          //pocitadlo pre obesenca - aby som vedel, aku cast vykreslit a kedy prehra - pozri obes a componentDidUpdate
          const pocitadlo = this.state.pocitadlo + 1;

          this.setState({
            pismeno: val,
            zadane: newZadane,
            pocitadlo: pocitadlo
          });
        }
      }
    }
  }

  onclx(e) {
    const name = e.target.name;

    if (name === "uzzadal") {
      this.setState({ uzzadal: false, vstup: true });
    } else {
      this.setState({ [name]: false });
    }
  }

  onclb(e) {
    window.location.reload();
  }

  obes() {
    switch (this.state.pocitadlo) {
      case 1:
        this.ciara(20, 180, 380, 180);
        break;
      case 2:
        this.ciara(20, 180, 20, 20);
        break;
      case 3:
        this.ciara(20, 20, 190, 20);
        break;
      case 4:
        this.ciara(20, 60, 60, 20);
        break;
      case 5:
        this.ciara(190, 20, 190, 45);
        break;
      case 6:
        this.kruznica(190, 60, 15, 0, Math.PI * 2);
        break;
      case 7:
        this.kruznica(185, 57, 2, 0, Math.PI * 2, true, true);
        break;
      case 8:
        this.kruznica(195, 57, 2, 0, Math.PI * 2, true, true);
        break;
      case 9:
        this.kruznica(190, 68, 5, 0, Math.PI, true);
        break;
      case 10:
        this.ciara(190, 75, 190, 110);
        break;
      case 11:
        this.ciara(190, 90, 160, 77);
        break;
      case 12:
        this.ciara(190, 90, 220, 77);
        break;
      case 13:
        this.ciara(190, 110, 180, 160);
        break;
      case 14:
        this.ciara(190, 110, 200, 160);
        break;
    }
  }

  //vykresli na canvas ciaru
  ciara(movex, movey, linex, liney) {
    this.kontext.beginPath();
    this.kontext.moveTo(movex, movey);
    this.kontext.lineTo(linex, liney);
    this.kontext.closePath();
    this.kontext.stroke();
  }

  //vykresli na canvas kruznicu/kruh
  kruznica(x, y, polomer, zacuh, konuh, smer, vypln) {
    this.kontext.beginPath();
    this.kontext.arc(x, y, polomer, zacuh, konuh, smer);
    this.kontext.closePath();

    if (vypln) {
      this.kontext.fill();
    } else {
      this.kontext.stroke();
    }
  }

  render() {
    const vstup = this.state.vstup;
    const uzzadal = this.state.uzzadal;
    const vyhra = this.state.vyhra;
    const prehra = this.state.prehra;

    return (
      <React.Fragment>
        <h1>OBESENEC</h1>

        <Veta pismena={this.state.pismena} />

        <canvas
          height="200px"
          width="400px"
          ref={can => {
            this.canvas = can;
          }}
        />

        {vstup ? <Vstup val={this.state.pismeno} onch={this.onch} /> : ""}

        {uzzadal ? (
          <Alert
            namex="uzzadal"
            text={'Písmeno "' + this.state.pismeno + '" si už zadal.'}
            onclx={this.onclx}
          />
        ) : (
          ""
        )}

        {vyhra ? (
          <Alert2
            klasa="vyhra"
            namex="vyhra"
            text="Vyhral si!"
            onclx={this.onclx}
            onclb={this.onclb}
          />
        ) : (
          ""
        )}

        {prehra ? (
          <Alert2
            klasa="prehra"
            namex="prehra"
            text="Prehral si!"
            onclx={this.onclx}
            onclb={this.onclb}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

//=======================================================

ReactDOM.render(<App />, document.getElementById("root"));
