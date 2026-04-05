import * as THREE from "three";

import { createScene } from "components/createScene.js";

const displayContainer = document.body;
const scene = createScene();

let displayWidth = displayContainer.clientWidth;
let displayHeight = displayContainer.clientHeight;
let deltaTime = 0;
let prevTime = 0;
let fps = 0;
let prevFps = 0;
let aspectRatio = displayWidth / displayHeight; // Aspect ratio
let fieldOfView = 75; // Field of view

const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, 0.1, 1000);
camera.name = "Main Camera";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(displayWidth, displayHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.shadowMap.type = THREE.PCFShadowMap;
displayContainer.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
cube.name = "Rotating Cube Mesh";
scene.add(cube);

camera.position.z = 5;

const player = new THREE.Group();
player.name = "Player Group";
scene.add(player);

// Update aspect ratio and canvas size on resize.
addEventListener("resize", () => {
  displayWidth = displayContainer.clientWidth;
  displayHeight = displayContainer.clientHeight;
  aspectRatio = displayWidth / displayHeight;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(displayWidth, displayHeight);
});

// Info display functions
// Update fps display.
function updateFpsCounter(frames) {
  const fpsCounter = document.getElementById("fpsCounter");
  fpsCounter.innerText = frames.toFixed(0);

  if (frames > prevFps) {
    fpsCounter.style.color = "var(--theme-green)";
  } else if (frames < prevFps) {
    fpsCounter.style.color = "var(--theme-red)";
  } else {
    fpsCounter.style.color = "var(--theme-text)";
  }
}
// Update player position display.
function updatePositionDisplay(x, y, z) {
  const positionDisplayX = document.getElementById("positionDisplayX");
  const positionDisplayY = document.getElementById("positionDisplayY");
  const positionDisplayZ = document.getElementById("positionDisplayZ");

  positionDisplayX.innerText = "X: " + x;
  positionDisplayY.innerText = "Y: " + y;
  positionDisplayZ.innerText = "Z: " + z;
}

function calculateMetrics(time) {
  deltaTime = time - prevTime; // Calculate delta time.
  fps = 1000 / deltaTime; // Calculate frames per second.
}

function animate(time) {
  updateFpsCounter(fps);
  calculateMetrics(time);

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  updatePositionDisplay(
    player.position.x,
    player.position.y,
    player.position.z,
  );
  renderer.render(scene, camera);
  prevTime = time; // Update previous time variable after all is done.
  prevFps = fps; // Update previous fps variable after all is done.
  //   console.log(fps);
}
renderer.setAnimationLoop(animate);
