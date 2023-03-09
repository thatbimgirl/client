
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';

//import Battery from "./battery";
//import Form from './Form.js'
//import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
/*
import React from "react";
import ReactDOM from "react-dom";

import Battery from "./battery";

import "./styles.css";


let incoming = {
  date: 1597107474849,
  data: {
    pitch: "0",
    roll: "0",
    yaw: "0",
    vgx: "0",
    vgy: "0",
    vgz: "-8",
    templ: "66",
    temph: "69",
    tof: "30",
    h: "20",
    bat: "50",
    baro: "172.62",
    time: "0",
    agx: "-12.00",
    agy: "-8.00",
    agz: "-980.00",
    location: "32.942690,-96.994845"
  },
  type: "toy",
  drone_id: "drone1"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      battery: incoming.data.bat,
      baro: incoming.data.baro,
      pitch: incoming.data.pitch,
      roll: incoming.data.roll,
      yaw: incoming.data.yaw,
      vgx: incoming.data.vgx,
      vgy: incoming.data.vgy,
      vgz: incoming.data.vgz,
      agx: incoming.data.vgx,
      agy: incoming.data.vgy,
      agz: incoming.data.vgz,
      templ: incoming.data.templ,
      temph: incoming.data.temph,
      location: incoming.data.location
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="App">
        <div className="dials">
          barometer:
          <input
            type="text"
            value={this.state.baro}
            onChange={(e) => this.setState({ baro: e.currentTarget.value })}
          />
          lowestTemp:
          <input
            type="text"
            value={this.state.templ}
            onChange={(e) => this.setState({ templ: e.currentTarget.value })}
          />
          highestTemp:
          <input
            type="text"
            value={this.state.temph}
            onChange={(e) => this.setState({ temph: e.currentTarget.value })}
          />
          speedX:
          <input
            type="text"
            value={this.state.vgx}
            onChange={(e) => this.setState({ vgx: e.currentTarget.value })}
          />
          speedY:
          <input
            type="text"
            value={this.state.vgy}
            onChange={(e) => this.setState({ vgy: e.currentTarget.value })}
          />
          accelerationX:
          <input
            type="text"
            value={this.state.agx}
            onChange={(e) => this.setState({ agx: e.currentTarget.value })}
          />
          accelerationY:
          <input
            type="text"
            value={this.state.agy}
            onChange={(e) => this.setState({ agy: e.currentTarget.value })}
          />
        </div>
        <div className="title">Susan's Battery Gauge </div>
        <Battery percentage={this.state.battery} />
        <p>Move slider to see battery level change</p>
        <div className="slidecontainer">
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            class="slider"
            id="myRange"
            value={this.state.battery}
            onChange={(e) => this.setState({ battery: e.currentTarget.value })}
          />
        </div>
            <div className="App">
      <div class="slidecontainer">
      <p>Custom range slider:</p>
      <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
      </div>
      </div>
        </div>
        
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

*/