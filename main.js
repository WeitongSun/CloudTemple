// ✅ 使用浏览器兼容的方式导入 Three.js 和 GLTFLoader
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

// ✅ 创建场景、相机和渲染器
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-canvas'),
  alpha: true // 透明背景
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ✅ 添加环境光（柔和）
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

// ✅ 加载 GLB 格式的佛像模型
const loader = new GLTFLoader();
loader.load('./assets/buddha.glb', (gltf) => {
  const model = gltf.scene;

  model.scale.set(1.5, 1.5, 1.5);     // 缩放大小
  model.position.set(0, -1, 0);       // 微微下移，让底部更贴近视线

  scene.add(model);

  // ✅ 动画循环：缓慢旋转佛像
  function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.002; // 缓慢旋转
    renderer.render(scene, camera);
  }

  animate();
}, 
// 加载进度和错误提示
(xhr) => {
  console.log(`模型加载中: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
}, 
(error) => {
  console.error('❌ 模型加载失败：', error);
});
