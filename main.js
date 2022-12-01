import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.IcosahedronGeometry(7, 0);
const material = new THREE.MeshStandardMaterial( { color: 0x222222 } );
const icosahedron = new THREE.Mesh(geometry, material);

scene.add(icosahedron);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 8);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper, lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// function addStar() {
//   const geometry = new THREE.IcosahedronGeometry(1, 0);
//   const material = new THREE.MeshStandardMaterial( { color: 0x000088 } );
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); //座標生成
//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(50).fill().forEach(addStar)

var [rx, ry, rz] = [0, 0, 0];

function animate() {
  requestAnimationFrame(animate);
  const t = document.body.getBoundingClientRect().top;
  rx += 0.002;
  ry += 0.004;
  rz += 0.002;
  icosahedron.rotation.x = rx + 0.01 * t;
  icosahedron.rotation.y = ry;
  icosahedron.rotation.z = rz;
  
  // controls.update();
  
  renderer.render(scene, camera);
}

animate();
