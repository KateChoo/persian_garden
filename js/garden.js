let container;
let camera;
let renderer;
let scene;
let garden;

function init() {
  container = document.querySelector(".scene");
  //=============scene, camera ===============//
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 45, 1000);
  //=============scene, camera END================//

  //=============light================//
  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 5);
  light.position.set(50, 50, 100);
  scene.add(light);
  //=============light END================//

  //=============renderer================//
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  //=============renderer END================//

  //==============GLTF ================//
  let loader = new THREE.GLTFLoader();
  loader.load("./persian_garden/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    garden = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  //garden.rotation.x += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
