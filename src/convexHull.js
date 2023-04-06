import React, { Component, useMemo, useRef, useState} from "react";
//import logo from "./logo.svg";
import "./App.css";
import convexHull from "./convexPoints";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { BufferAttribute } from "three";

function xx(){
  const points = useMemo(() => {
    //const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5);

    const p = convexHull();  
    console.log(p);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);
}



class Hull extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        opacity: 0.5
      }
      this.handleChange = this.handleChange.bind(this);
      
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

  handleChange(event) {
    this.setState({opacity : 1});
  }
  points(){
    const p = convexHull();  
    console.log(p);
    return new BufferAttribute(new Float32Array(p), 3);
  }


  render({count = 1000}) {
    return (
            <mesh  scale={0.4}  position={[-5, -1, 0]} onClick={this.handleChange} onPointerOver={(e) => console.log("over")}  onWheel={(e) => console.log("wheel spins")}>
      <bufferGeometry >
        <bufferAttribute attach={"attributes-position"} {...points()} />
      </bufferGeometry>

      <meshBasicMaterial
      //opacity={active ? 0.2: 0.4}
      //onClick={() => setActive(!active)}
      //onClick={() => console.log("click")}

      //size={0.1}
      //threshold={0.1}
      color={0xffffff}
      //color={hover === index ? 'lightblue' : 'white'}
      transparent={true}
      opacity= {this.state.opacity}
      //sizeAttenuation={true}
    />
    </mesh>
    );
  }
}   

export default Hull;