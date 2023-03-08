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



THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
  const materials = useLoader(MTLLoader, "Building.mtl");
  const obj = useLoader(OBJLoader, "Building.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log(obj);
  return <primitive object={obj} scale={0.4} position={[-5, 0, 0]}/>;
};

const Text = () =>(
  <div className="overlaytext">Hi Jacquiiii
  how are you today</div>
 
)



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
      var a = this.state.apiResponse;
      a= a.substring(1, a.length-1)
      if (this.state.value === 'concrete'){
        var ec = a * 0.5;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + ec + " t CO2e";
      } else if (this.state.value === 'steel'){
        ec = a * 0.4;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + ec + " t CO2e";
      } else if (this.state.value === 'wood'){
        ec = a * -0.4;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + ec + " t CO2e";
      }
      else if (this.state.value === 'masonry'){
        ec = a * 0.3;
        document.getElementById("demo").innerHTML = "Embodied carbon: " + ec + " t CO2e";
      }
      else {
        document.getElementById("demo").innerHTML = "Embodied carbon: undetermined";
      }
      event.preventDefault();
    }

    render() {

        console.log(this.state.apiResponse);
        return (
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                            
                <>    
                <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color="white" position={[-5, 4, 5]} />
                <Suspense fallback={null}>
                    <Scene />
                    <OrbitControls />
                    <Environment preset="dawn" background blur={0.5} />
                </Suspense>

                </Canvas>

                </>


                <div>
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
            </div>

        );
    }
}

export default App;
//*/
