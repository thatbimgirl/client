/*
import React, {useRef, useState} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import {softShadows, MeshWobbleMaterial, OrbitControls} from "drei";
import {useSpring, a } from "react-spring/three";

import "./App.css";

softShadows();

const SpinningMesh = ({ position, color, speed, args}) => {
    const mesh = useRef();
}

export default function App (){
    return (
        <Canvas>
            camer
        </Canvas>
    );
}
*/
///*
import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";


class Form extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        value: 'concrete',
        slider_width : 0,
        slider_offset: 0,
        min: 0,
        ecvalue: 0,
        real_ecvalue: 0,
        max: 0,
        standard_ec: 0,
        real_max: 0,
        cx: 247.5,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
      
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
    var footprint_from_api = this.state.apiResponse;
    var material = this.state.value;
    footprint_from_api= footprint_from_api.substring(1, footprint_from_api.length-1);
    if (material === 'concrete'){
      var embodied_carbon = footprint_from_api * 0.5;
      var uncertainty = 12;
      this.setState({ecvalue: embodied_carbon});
    } else if (material === 'steel'){
      embodied_carbon = footprint_from_api * 0.4;
      uncertainty = 5;
      this.setState({ecvalue: embodied_carbon});
    } else if (material === 'wood'){
      embodied_carbon = footprint_from_api * 0.1;
      uncertainty = 3;
      this.setState({ecvalue: embodied_carbon});
    }
    else if (material === 'masonry'){
      embodied_carbon = footprint_from_api * 0.3;
      uncertainty = 2;
      this.setState({ecvalue: embodied_carbon});
    }
    else {
      this.setState({ecvalue: "undetermined"});
    }
    event.preventDefault();

    
    const standard_ec = footprint_from_api * 0.5;
    const ecvalue = embodied_carbon;
    const min = 0;
    const max = Math.max(embodied_carbon, embodied_carbon+uncertainty, standard_ec)*1.2;
    const real_max = 500;
    const real_ecvalue = (ecvalue / max)*real_max;
    const real_uncertainty = (uncertainty / max)*real_max;
    const real_margin = real_ecvalue - (0.5* real_max);
    const slider_offset = `${real_margin*2}px`;
    const slider_width = `${real_uncertainty*2}px`;



    this.setState({slider_width: slider_width});
    this.setState({slider_offset: slider_offset});
    this.setState({min: min});
    this.setState({ecvalue:ecvalue});
    this.setState({real_ecvalue:real_ecvalue-10+ "px" })
    this.setState({max: max.toFixed(2)});
    this.setState({cx:standard_ec/max *real_max })

    /*
    console.log(max, embodied_carbon, slider_offset, slider_width);
    console.log(document.getElementById("myRange").style.width,  document.getElementById("myRange").style.marginLeft)
    */
  }


  render() {

      const material = this.state.value;
      return (
            <div>
              <h1>{this.props.title}</h1>
              <div>
                <form class= "dropdown"onSubmit={this.handleSubmit}>
                  <label>
                  Choose structural system: 
                  <select value= {material} onChange={this.handleChange}>
                      <option value="concrete">Reinforced Concrete</option>
                      <option value="steel">Steel system</option>
                      <option value="wood">Wood frame</option>
                      <option value="masonry">Masonry</option>
                  </select>
                  </label>
                  <input type="submit" value="Submit" />
              </form>


              <p id="demo">Embodied carbon: {this.state.ecvalue} t CO2e</p>
              </div>

              <div class = "container_row">
                <div class="layer1">
                  <div class="slidecontainer" id ="slider1" >
                  <input type="range" min="1" max="100" value="50" class="slider" id="myRange" style={{width: this.state.slider_width, marginLeft: this.state.slider_offset}}/>
                  </div>  
                </div>
                <div class = "layer2">
                  <svg class = "rect" width="500px" height="20">
                  <rect  width="100%" height= "100%"/>
                  <circle id="market_standard_pointer" class="standardpointer"  style={{cx: this.state.cx}} cy="10" r="10" fill="hotpink"  />
                  <text class="hover-text">Add Option</text>
                  </svg>

                </div>
                <text class = "scale_left" id={this.props.id} >{this.state.min}</text>
                <text class = "scale_middle" id = "middle" style={{marginLeft:this.state.real_ecvalue}}>{this.state.ecvalue}</text>
                <text class = "scale_middle" id = "standard">0</text>
                <text class = "scale_right" id="right">{this.state.max}</text>
              </div>

          </div>

      );
  }
}

export default Form;
//*/