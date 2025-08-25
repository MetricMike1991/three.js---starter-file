// ---------------------------------------------
// 1. Imports: Three.js core and extensions
// ---------------------------------------------
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ---------------------------------------------
// 2. Canvas & Scene Setup
// ---------------------------------------------
// Select the canvas element from the HTML (should have class 'webgl')
const canvas = document.querySelector('canvas.webgl');
// Create the main Three.js scene
const scene = new THREE.Scene();

// ---------------------------------------------
// 3. Loaders: For textures, HDRIs, and models
// ---------------------------------------------
const textureLoader = new THREE.TextureLoader(); // For standard textures
const rgbeLoader = new RGBELoader(); // For HDR environment maps
const gltfLoader = new GLTFLoader(); // For GLTF/GLB models

// ---------------------------------------------
// 4. Environment Map (HDRI background & lighting)
// ---------------------------------------------
// Loads an HDR environment map and applies it to the scene for realistic lighting and reflections
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
});

// ---------------------------------------------
// 5. Lighting: Ambient and Directional
// ---------------------------------------------
// AmbientLight: Soft, global illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
// DirectionalLight: Simulates sunlight, can cast shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 2, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// ---------------------------------------------
// 6. Materials: Default for demo objects
// ---------------------------------------------
const defaultMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,      // Red color
    roughness: 0.4,      // Surface roughness
    metalness: 0.1       // Metalness factor
});

// ---------------------------------------------
// 7. Demo Objects: (Commented out, for reference)
// ---------------------------------------------
// Example: Add a cube to the scene
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cube = new THREE.Mesh(cubeGeometry, defaultMaterial);
// cube.position.set(0, 0, 0);
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add(cube);

// Example: Add axes helper for orientation
// const axesHelper = new THREE.AxesHelper(2); // size 2 units
// scene.add(axesHelper);

// ---------------------------------------------
// 8. Load and Animate GLB Model
// ---------------------------------------------
// Animation mixer and clock for model animations
let mixer = null;
const clock = new THREE.Clock();

gltfLoader.load(
    '/models/monkey-animation.glb',
    (gltf) => {
        // Extract the model from the loaded GLB
        const model = gltf.scene;
        // Enable shadows for all meshes in the model
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        // Position the model in the scene
        model.position.set(0, -1.5, 0);
        scene.add(model);

        // If the model contains animations, set up the mixer and play all clips
        if (Array.isArray(gltf.animations) && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }
    },
    undefined,
    (error) => {
        console.error('An error happened while loading the GLB model:', error);
    }
);

// ---------------------------------------------
// 9. Responsive Sizing
// ---------------------------------------------
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera aspect and projection
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update renderer size and pixel ratio
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ---------------------------------------------
// 10. Camera Setup
// ---------------------------------------------
// Perspective camera for 3D view
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(3, 3, 3); // Move camera back and up
scene.add(camera);

// ---------------------------------------------
// 11. Controls: OrbitControls for user interaction
// ---------------------------------------------
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;

// Optional: Double-click to focus camera on clicked object
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
canvas.addEventListener('dblclick', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const target = intersects[0].point;
        controls.target.copy(target);
        controls.update();
    }
});

// ---------------------------------------------
// 12. Renderer: WebGLRenderer setup
// ---------------------------------------------
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true // Smooths jagged edges
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true; // Enable shadow rendering
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadow edges
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Realistic color mapping
renderer.toneMappingExposure = 1.0;

// ---------------------------------------------
// 13. Animation Loop: Updates and renders the scene
// ---------------------------------------------
const tick = () => {
    // Update controls for smooth camera movement
    controls.update();
    // Update animation mixer if present (for model animations)
    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }
    // Render the scene from the camera's perspective
    renderer.render(scene, camera);
    // Request the next frame
    requestAnimationFrame(tick);
};

tick();