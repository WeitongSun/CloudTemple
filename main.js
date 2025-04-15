import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

// 创建场景、相机、渲染器
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-canvas'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 添加柔光
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

// DOM 元素
const prayButton = document.getElementById('prayButton');
const bellSound = document.getElementById('bellSound');
const prayCount = document.getElementById('prayCount');

let count = 0;

let model; // 佛像模型（稍后赋值）

// 加载佛像
const loader = new GLTFLoader();
loader.load('./assets/buddha.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(1.5, 1.5, 1.5);
  model.position.set(0, -1, 0);
  scene.add(model);
  animate();
}, 
(xhr) => {
  console.log(`模型加载中: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
}, 
(error) => {
  console.error('❌ 模型加载失败：', error);
});

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.002;
  renderer.render(scene, camera);
}

// 拜佛交互
prayButton.addEventListener('click', () => {
  if (!model) return;

  // 播放钟声
  bellSound.currentTime = 0;
  bellSound.play();

  // 缩放动画
  model.scale.set(1.7, 1.7, 1.7);
  setTimeout(() => {
    model.scale.set(1.5, 1.5, 1.5);
  }, 200);

  // 更新计数
  count += 1;
  prayCount.textContent = `已拜：${count} 次`;
});
