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
import { Canvas } from "@react-three/fiber";
//import Cylinder3d from "./component/Cylinder3d";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";
import "./Form.js";
import Form from "./Form.js";


THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
  const materials = useLoader(MTLLoader, "Building.mtl");
  const obj = useLoader(OBJLoader, "Building.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log(obj);
  return <primitive object={obj} scale={0.4} position={[-5, -1, 0]}/>;
};

/*
const Text = () =>(
  <div className="overlaytext">Hi Jacquiiii
  how are you today</div>
 
)
*/




class App extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'concrete'};
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
      //alert('A name was submitted: ' + this.state.value);
      var footprint_from_api = this.state.apiResponse;
      footprint_from_api= footprint_from_api.substring(1, footprint_from_api.length-1)
      if (this.state.value === 'concrete'){
        var embodied_carbon = footprint_from_api * 0.5;
        var uncertainty = 12;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + embodied_carbon + " t CO2e";
      } else if (this.state.value === 'steel'){
        embodied_carbon = footprint_from_api * 0.4;
        uncertainty = 5;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + embodied_carbon + " t CO2e";
      } else if (this.state.value === 'wood'){
        embodied_carbon = footprint_from_api * 0.1;
        uncertainty = 3;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + embodied_carbon + " t CO2e";
      }
      else if (this.state.value === 'masonry'){
        embodied_carbon = footprint_from_api * 0.3;
        uncertainty = 2;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + embodied_carbon + " t CO2e";
      }
      else {
        document.getElementById("demo").innerHTML = "Embodied carbon: undetermined";
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


      document.getElementById("myRange").style.width=slider_width;
      document.getElementById("myRange").style.marginLeft= slider_offset;
      document.getElementById("left").innerHTML = min;
      document.getElementById("middle").innerHTML = ecvalue;
      document.getElementById("middle").style.marginLeft = `${real_ecvalue-10}px`;
      document.getElementById("right").innerHTML = max.toFixed(2);
      document.getElementById("market_standard_pointer").style.cx = `${standard_ec/max * real_max}`;
      
      
      console.log(max, embodied_carbon, slider_offset, slider_width);
      console.log(document.getElementById("myRange").style.width,  document.getElementById("myRange").style.marginLeft)
    }


    render() {

        console.log(this.state.apiResponse);
        return (
           <div className="App">
              <div class = "lefthalf"> 
              <>    
              <Canvas concurrent camera={{ position: [-6, 0, 3], fov: 70 }}>
              <ambientLight intensity={0.1} />
              <directionalLight color="white" position={[0, 4, 5]} />
              <Suspense fallback={null}>
                  <Scene />
                  <OrbitControls />
                  <Environment files="./img/kloppenheim.hdr" background blur={0.7} />
              </Suspense>
              </Canvas>
              </>
              </div>
              <div class = "righthalf">
                <Form /> 
                <Form />
                <h1>title</h1>
                <div>
                  <form class= "dropdown"onSubmit={this.handleSubmit}>
                    <label>
                    Choose structural system: 
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="concrete">Reinforced Concrete</option>
                        <option value="steel">Steel system</option>
                        <option value="wood">Wood frame</option>
                        <option value="masonry">Masonry</option>
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Choose structural system: 
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="concrete">Reinforced Concrete</option>
                        <option value="steel">Steel system</option>
                        <option value="wood">Wood frame</option>
                        <option value="masonry">Masonry</option>
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <p id="demo">Embodied carbon:</p>
                </div>

                <div class = "container_row">
                  <div class="layer1">
                    <div class="slidecontainer" id ="slider1" >
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                    </div>  
                  </div>
                  <div class = "layer2">
                    <svg class = "rect" width="500px" height="20">
                    <rect  width="100%" height= "100%"/>
                    <circle id="market_standard_pointer"  cx="247.5" cy="10" r="10" fill="hotpink" />
                    </svg>

                  </div>
                  <text class = "scale_left" id="left" >0</text>
                  <text class = "scale_middle" id = "middle">0</text>
                  <text class = "scale_middle" id = "standard">0</text>
                  <text class = "scale_right" id="right">0</text>
                </div>


                  </div>
             
                  <button class="circle-btn"  >
                    <span>+</span>
                    <span class="hover-text">Add Option</span>
                  </button>




                
            </div>

        );
    }
}

export default App;
//*/
