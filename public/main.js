import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { 
  Scene,
  BufferGeometryLoader,
	FileLoader,
	Loader,
	Object3D,
	MeshStandardMaterial,
	Mesh,
	Color,
	Points,
	PointsMaterial,
	Line,
	LineBasicMaterial,
	Matrix4,
	DirectionalLight,
	PointLight,
	SpotLight,
	RectAreaLight,
	Sprite,
	SpriteMaterial,
	CanvasTexture,
	LinearFilter,
	ClampToEdgeWrapping,
	RepeatWrapping,
	TextureLoader
} from 'three';
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';
import { ConvexHull} from 'three/examples/jsm/math/ConvexHull.js';
import {ConvexGeometry} from 'three/examples/jsm/geometries/ConvexGeometry.js';

/* 
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
SET UP SCENE
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/ 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth*0.5, window.innerHeight*0.5);
//back and forth
camera.position.setZ(20);
//left and right
camera.position.setX(0);
//up and down
camera.position.setY(15);
renderer.render(scene, camera);
// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30, 5, -5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;



/* 
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
ADD GEOMETRY 
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/ 

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);

//Building
const boxgeometry = new THREE.BoxGeometry ( 50,10,20);
const buildingmaterial = new THREE.MeshStandardMaterial ({color: 0xC3C1B4});
const building = new THREE.Mesh(boxgeometry, buildingmaterial );
building.position.y = 5;
building.position.z = -20;
scene.add(building);

// Avatar
const jeffTexture = new THREE.TextureLoader().load('jacqui.png');
const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
//scene.add(jeff);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
//scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;


/* 
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
FUNCTIONS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/ 

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
//Array(200).fill().forEach(addStar);

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
//document.body.onscroll = moveCamera;
//moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;
  //torus.position.z += 0.01;
  //moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();



 
/* 
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
RHINO LOADER
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/ 
// Instantiate a loader
const loader = new Rhino3dmLoader();
// Specify path to a folder containing WASM/JS libraries or a CDN.
//loader.setLibraryPath( '/path_to_library/rhino3dm/' );
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );
// Load a 3DM file
//loader.load('Elm_Tree_2.3dm',
loader.load('simple_cube.3dm',
	// called when the resource is loaded
	(object) => {
    scene.add(object);
    //renderer.render(scene, camera);
  },
	// called as loading progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);
//object.position.z = -100000000000000000000; 





/* 
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
CONVEX HULL
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/ 
/*
var convexHull = new THREE.ConvexHull.setFromObject(loader)
convexHull.compute();
console.log(convexHull.assigned);

 var spGroup;
 // the mesh
 var hullMesh;

 generatePoints();

 // setup the control gui
 var controlss = new function () {
     // we need the first child, since it's a multimaterial

     this.redraw = function () {
         scene.remove(spGroup);
         scene.remove(hullMesh);
         generatePoints();

     };

 };

 var gui = new dat.GUI();
 gui.add(controlss, 'redraw');


 render();

 function generatePoints() {
     // add 10 random spheres
     var points = [];
     for (var i = 0; i < 20; i++) {
         var randomX = -15 + Math.round(Math.random() * 30);
         var randomY = -15 + Math.round(Math.random() * 30);
         var randomZ = -15 + Math.round(Math.random() * 30);

         points.push(new THREE.Vector3(randomX, randomY, randomZ));
     }

     spGroup = new THREE.Object3D();
     var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false});
     points.forEach(function (point) {

         var spGeom = new THREE.SphereGeometry(0.2);
         var spMesh = new THREE.Mesh(spGeom, material);
         spMesh.position.copy(point);
         spGroup.add(spMesh);
     });
     // add the points as a group to the scene
     scene.add(spGroup);

     // use the same points to create a convexgeometry
     var hullGeometry = new THREE.ConvexGeometry(points);
     hullMesh = createMesh(hullGeometry);
     scene.add(hullMesh);
 }

 function createMesh(geom) {

     // assign two materials
     var meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
     meshMaterial.side = THREE.DoubleSide;
     var wireFrameMat = new THREE.MeshBasicMaterial();
     wireFrameMat.wireframe = true;

     // create a multimaterial
     var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

     return mesh;
 }

 function render() {
     stats.update();

     spGroup.rotation.y = step;
     hullMesh.rotation.y = step += 0.01;

     // render using requestAnimationFrame
     requestAnimationFrame(render);
     webGLRenderer.render(scene, camera);
 }

 function initStats() {

     var stats = new Stats();
     stats.setMode(0); // 0: fps, 1: ms

     // Align top-left
     stats.domElement.style.position = 'absolute';
     stats.domElement.style.left = '0px';
     stats.domElement.style.top = '0px';

     document.getElementById("Stats-output").appendChild(stats.domElement);

     return stats;

 }
*/


//Return
/*$(window).load(function(){
  $(document).ready(function(){
    function getName(){
      return "test";
    }
$("#privacy_text").val(getName());
});
});
*/

const a = new THREE.Vector3( 0, 1, 0 );

//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3( );

const d = a.distanceTo( b );
console.log(d);






