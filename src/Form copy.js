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

class Child extends Component{
  constructor(props){
    super(props);
    this.state = { apiResponse: this.props.dataParentToChild}
  }
  render (){
    const {apiResponse} = this.state;
    return(
      <div>
        {apiResponse}
      </div>
    )
  }
  
}
export default Child;
//*/