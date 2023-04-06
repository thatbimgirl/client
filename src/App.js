/*
import React, {useRef, useState} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import {softShadows, MeshWobbleMaterial, OrbitControls} from "drei";
import {useSpring, a } from "react-spring/three";

import "./App.css";

softShadows();
*/
///*
import React, { Component, useMemo, useRef, useState} from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
//import Cylinder3d from "./component/Cylinder3d";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Hud, Environment, OrthographicCamera,OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";
//import Hull from "./convexHull.js";
import Form from "./Form.js";
//import Child from "./Form copy";
//import { Button } from "./button";
//import { ListComponent } from "./listcomponent";
import { BufferAttribute } from "three";
import convexHull from "./convexPoints.js";
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from "./demo.tsx";
import Tooltip from "./Tooltip";
import { Typography} from '@mui/material';





THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


function Viewcube({ matrix = new THREE.Matrix4() }) {
  const mesh = useRef(null)

  const [hover, set] = useState(null)
  const [click, sett] = useState(null)


  return (

      <mesh
        ref={mesh}
        //position={[-5.1, -1, 0.07]}
        position={[-0.91,-0.15,-2.6588]}
        scale={0.402}
        //onClick={() => alert('Hellooo')}
        onPointerOut={(e) => set(null)}
        //onClick={(e) => sett(e.face.materialIndex)}
        //onClick={(e) => console.log(e.face.materialIndex)}
        onClick={whatever()}
        onPointerMove={(e) => set(e.face.materialIndex)}>
        {[...Array(6)].map((_, index) => (

          <meshLambertMaterial 
          attach={`material-${index}`} 
          key={index} 
          transparent = {true}
          opacity={hover === index ? 0.6 : 0}
          color={click === index ? 'hotpink' : 'white'} 
          />
          

        ))}
          <boxGeometry args={[14.25, 6.7, 3.44]} />

      </mesh>

  )
}
/*
function BufferPoints({count = 1000}) {

  const myMesh = React.useRef();
  const [hovered, setHover] = useState(false)
  const points = useMemo(() => {
    //const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5);
    const p = convexHull();  
    console.log(p);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);

  return (

    <mesh  scale={0.41}  
    position={[-5.1, -1, 0.07]} 
    onPointerOver={(e)=> setHover(true)} 
    onPointerOut={(e) => setHover(false)} 
    //onClick={(e)=>xx(e)}
    onClick={(e) => console.log(e.faceIndex)}  
    onWheel={(e) => console.log("wheel spins")}>
  
      <bufferGeometry >
        <bufferAttribute attach={"attributes-position"} {...points} />
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
      opacity= {hovered ? 0.6 : 0}
      //sizeAttenuation={true}

    />
    </mesh>

  );
}
*/
/*
function Viewcube({ renderPriority = 1, matrix = new THREE.Matrix4() }) {
  const mesh = useRef(null)
  const { camera, size } = useThree()
  const [hover, set] = useState(null)

  useFrame(() => {
    // Spin mesh to the inverse of the default cameras matrix
    matrix.copy(camera.matrix).invert()
    mesh.current.quaternion.setFromRotationMatrix(matrix)
  })

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 100]} />
      <mesh
        ref={mesh}
        position={[size.width / 2 - 120, size.height / 2 - 120, 0]}
        onPointerOut={(e) => set(null)}
        onPointerMove={(e) => set(e.face.materialIndex)}>
        {[...Array(6)].map((_, index) => (
          <meshLambertMaterial attach={`material-${index}`} key={index} color={hover === index ? 'lightblue' : 'white'} />
        ))}
        <boxGeometry args={[80, 80, 80]} />
      </mesh>
      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
  )
}
*/

const Scene = () => {
  const materials = useLoader(MTLLoader, "Building.mtl");
  const obj = useLoader(OBJLoader, "Building.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
    
  });
  console.log(obj);
  return <primitive object={obj} scale={0.4} position={[-5, -1, 0]} />;

};

function whatever(){
  //this.setState({hi: true});
  console.log("b");
};

function Labels({visibility}) {
  const [state, setState] = useState({
      visible: visibility,
      positions: {
        "Facade 1": [-3.8, 0.2, -2.6],
        //"Facade 1": position1,
        "Facade 2": [-1, 0.2, -1.9],
        "Facade 3": [-1, 0.2, -3.3],
        "Facade 4": [2, 0.2, -2.6],
      },
    });

  if (state && state.visible) {
    return (
      <React.Fragment>
        {Object.entries(state.positions).map((item, index) => {
          return (
            <Html key={index} position={item[1]} center >
              <Typography style={{ color: 'White' }}>{item[0]}</Typography>
            </Html>
          );
        })}
      </React.Fragment>
    );
  } else {
    return null;
  }
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {opacity : 0.7,
        hi: false};

    }

    callAPI() {
        fetch("http://localhost:9000/convexhull")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);

    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
      function firstButton()
      {
        document.getElementById("firstButton").style.zIndex = "-2";
        document.getElementById("secondForm").style.zIndex = "1";
        document.getElementById("secondButton").style.zIndex = "1";
      }

      function secondButton()
      {
        document.getElementById("secondButton").style.zIndex = "-2";
        document.getElementById("thirdForm").style.zIndex = "1";
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
                  <Viewcube />
                  <Labels visibility={true} />
                  <Environment files="./img/kloppenheim.hdr" background blur={0.7} />
              </Suspense>

              </Canvas>

              </>
              </div>
              
              <div class = "righthalf">

                <Form id="1" title = "Option 1" /> 

              </div>

              <div class = "firstButton" id="firstButton">
                  <button class="circle-btn" id="plusbuttons" onClick={firstButton}>
                    <span id="test">+</span>
                    <span class="hover-text">Add Option</span>
                  </button>
              </div>

              <div class = "secondForm" id="secondForm">
              <Form id ="2" title = "Option 2"/>
              </div>

              <div class = "secondButton" id="secondButton">
              <button class="circle-btn" id="plusbuttons" onClick={secondButton}>
                    <span id="test">+</span>
                    <span class="hover-text">Add Option</span>
                  </button>
              </div>

              <div class = "thirdForm" id="thirdForm">
              <Form id ="3" title = "Option 3"/>
              </div>
              <div class = "librarybutton">
              <StyledEngineProvider injectFirst>
                <Demo />
              </StyledEngineProvider>
              </div>


            </div>

        );
    }
}

export default App;
//*/
