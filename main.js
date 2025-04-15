import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 添加柔和光照 | Add soft ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 加载佛像模型 | Load Buddha model
const loader = new GLTFLoader();
loader.load('./assets/buddha.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1.5, 1.5, 1.5);
  scene.add(model);

  animate();

  function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.003; // 缓缓旋转佛像 | Slowly rotate Buddha
    renderer.render(scene, camera);
  }
}, undefined, (error) => {
  console.error('模型加载失败 | Failed to load model', error);
});
