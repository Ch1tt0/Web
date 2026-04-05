import * as THREE from "three";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function createScene() {
  const scene = new THREE.Scene();
  scene.name = "Main Scene";

  // Setup enviroment texture
  const hdrLoader = new HDRLoader();
  Promise.all([hdrLoader.loadAsync("/files/hdri/PureSky.hdr")])
    .then(([envMap]) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envMap;
      scene.environmentIntensity = 0.1;
    })
    .finally(() => {
      console.log("Loaded enviroment texture!");
    });

  // Setup lights
  const ambientLight = new THREE.AmbientLight(0x8dc1de, 1.5);
  ambientLight.position.set(2, 1, 1);
  ambientLight.name = "Ambient Light";
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  directionalLight.position.set(-5, 25, -1);
  directionalLight.castShadow = true;
  directionalLight.name = "Directional Light";
  directionalLight.shadow.camera.near = 0.01;
  directionalLight.shadow.camera.far = 40;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.left = -30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -30;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 4;
  directionalLight.shadow.bias = -0.00005;
  scene.add(directionalLight);
  //   const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
  //   scene.add(helper);

  // Setup world
  const gltfLoader = new GLTFLoader();
  gltfLoader.setPath("/files/models/");
  Promise.all([gltfLoader.loadAsync("collision-world.glb")])
    .then(([world]) => {
      scene.add(world.scene);
      world.scene.name = "World Scene";

      let index = 1;
      world.scene.traverse((child) => {
        if (child.isMesh) {
          child.name = "World Mesh " + index;
          child.castShadow = true;
          child.receiveShadow = true;

          index++;
        }
      });
    })
    .finally(() => {
      console.log("Loaded world!");
    });

  scene.background = new THREE.Color(0x88ccee);

  return scene;
}

export { createScene };
