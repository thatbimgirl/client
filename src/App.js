/*
import React, {useRef, useState} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import {softShadows, MeshWobbleMaterial, OrbitControls} from "drei";
import {useSpring, a } from "react-spring/three";

import "./App.css";

softShadows();
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
import Child from "./Form copy";



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


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { };

    }

/*

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }
*/



    render() {
      function myFunction(){
        document.getElementById("secondElement").innerHTML = "<button />";
      }

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
                <Form id="1" title = "Option 1" /> 
                <Form id ="2" title = "Option 2"/> 

              </div>

              <button class="circle-btn" id="plusbuttons" onClick={myFunction}>
                    <span id="test">+</span>
                    <span class="hover-text">Add Option</span>
                  </button>

            </div>

        );
    }
}

export default App;
//*/
