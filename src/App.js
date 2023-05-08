
import React, { Component, useMemo, useRef, useState, useEffect} from "react";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Hud, Environment, OrthographicCamera,OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";
import Form from "./Form.js";
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

        position={[-0.405, 0.2, -3.035]}
        scale={0.402}
        onPointerOut={(e) => set(null)}
        onPointerMove={(e) => set(e.face.materialIndex)}>
        {[...Array(6)].map((_, index) => (

          <meshLambertMaterial 
          attach={`material-${index}`} 
          key={index} 
          transparent = {true}
          opacity={hover === index ? 0.8 : 0}
          color={'darkgrey'} 
          />
        ))}
          <boxGeometry args={[13.07, 11.129, 6.115]} />
      </mesh>

  )
};


function Labels({visibility}) {
  
  const [state, setState] = useState({
      visible: visibility,
      positions: {
        "Facade 1": [-3, 0.5, -3],
        //"Facade 1": position1,
        "Facade 2": [-0.3, 0.5, -1.9],
        //"Facade 3": [-0.3, 0.5, -4.5],
        //"Facade 4": [2, 0.5, -3],
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

const Scene = () => {
  const materials = useLoader(MTLLoader, "BuildingSection.mtl");
  const obj = useLoader(OBJLoader, "BuildingSection.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
    
  });
  console.log(obj);
  return <primitive object={obj} scale={0.0004} position={[-3, -2, -4]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />;

};



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        opacity : 0.7,
        hi: false
      };

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
              <div class = "lefthalf" > 
              <>
              <Canvas concurrent camera={{ position: [-6, 0, 3], fov: 70 }}>
              <ambientLight intensity={0.1} />
              <directionalLight color="white" position={[0, 4, 5]} />
              <Suspense fallback={null}>
                  <Scene />
                  <OrbitControls />
                  <Viewcube />
                  <Labels visibility={false} />
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
