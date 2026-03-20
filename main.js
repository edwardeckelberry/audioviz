import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//every screen needs a renderer (and its size), a body, scene, and camera
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//grid lines, can change size (30) and square amounts (not there just default)
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(15);
scene.add(axesHelper);

//orbit is what allows the camera angle to be set with the mouse
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10,30,30);
//this updates the position of the camera
orbit.update();

//every element needs a geometry (shape), material (skin), 
// and mesh (combo of both), then added to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  //needs side or else only exists on one side
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
//moves plane 90 degrees
plane.rotation.x = -0.5 * Math.PI;

//first no. is size, then the other is the amount of x and y segments
const sphereGeometry = new THREE.SphereGeometry(4, 40, 40);
//MeshStandardMaterial needs light to show up, basic doesn't need it
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xFF00FF,
  //this shows the frame of the sphere
  wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10,0,0);

//can control colors of any object (in this case, the sphere)
const gui = new dat.GUI();

//can make properties using inherent properties on object
//using lambda functions
const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
  sphere.material.wireframe = e;
});

//0 is min speed, 0.1 is max speed
gui.add(options, 'speed', 0, 0.1);

let step = 0;
let speed = 0.01;

function animate(time) {

  cube.rotation.x = time /1000;
  cube.rotation.y = time /1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render( scene, camera );

}

renderer.setAnimationLoop(animate);