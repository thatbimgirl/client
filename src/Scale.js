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

const Scale = ({id, slider_width, slider_offset, min, ecvalue, real_ecvalue, max, standard_ec, real_max}) => {

  document.getElementById("myRange").style.width=slider_width;
  document.getElementById("myRange").style.marginLeft= slider_offset;
  document.getElementById("left").innerHTML = min;
  document.getElementById("middle").innerHTML = ecvalue;
  document.getElementById("middle").style.marginLeft = `${real_ecvalue-10}px`;
  document.getElementById("right").innerHTML = max.toFixed(2);
  document.getElementById("market_standard_pointer").style.cx = `${standard_ec/max * real_max}`;

  return(
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
  );
};

export default Scale; 