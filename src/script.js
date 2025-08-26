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
let button7Mesh = null;
let button7OriginalMaterial = null;
let button7Action = null;
let allClickableMeshes = [];

gltfLoader.load(
    '/models/calculator.glb',
    (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                allClickableMeshes.push(child);
                if (child.name === 'button-7') {
                    button7Mesh = child;
                    button7OriginalMaterial = child.material.clone();
                }
            }
        });
        model.position.set(0, -1.5, 0);
        model.rotateX(-Math.PI / 4);
        scene.add(model);

        if (Array.isArray(gltf.animations) && gltf.animations.length > 0) {
            console.log('Available animation clips:');
            gltf.animations.forEach((clip) => {
                console.log(clip.name);
            });
            mixer = new THREE.AnimationMixer(model);
            // Use the animation clip named 'press' for button-7
            const button7Clip = gltf.animations.find(clip => clip.name.toLowerCase() === 'press');
            if (button7Clip) {
                button7Action = mixer.clipAction(button7Clip);
                button7Action.setLoop(THREE.LoopOnce, 1);
                button7Action.setEffectiveTimeScale(5);
                button7Action.clampWhenFinished = true;
                button7Action.paused = true;
            }
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


// Minimal click event: toggle button-7 color and log mesh name/material
canvas.addEventListener('pointerdown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allClickableMeshes, true);
    if (intersects.length > 0) {
        const mesh = intersects[0].object;
        if (mesh.name === 'button-7' && button7Mesh) {
            // Toggle between red and original material
            if (button7Mesh.material.color.getHex() !== 0xff0000) {
                button7Mesh.material.color.set(0xff0000);
            } else {
                button7Mesh.material.copy(button7OriginalMaterial);
            }
            // Play the animation for button-7 if available
            if (button7Action) {
                button7Action.reset();
                button7Action.paused = false;
                button7Action.play();
            }
        }
        // Log mesh name and material
        console.log('Clicked mesh name:', mesh.name, '| Material:', mesh.material);
    }
});


// Ok so what you need to do to select a part of the model is to identify it using the mesh name. 
// Which is essential the object properties name in Blender 
// You can use raycaster and console logs to help you identify the current material names.

// You can trigger an animation using the Ray Caster also but the Animation has to be named in the action editor in blender and specifically called in JS.
