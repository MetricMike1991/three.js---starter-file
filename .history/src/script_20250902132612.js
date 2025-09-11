// ---------------------------------------------
// 1. Imports: Three.js core and extensions
// ---------------------------------------------
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Removed dat.GUI import; using only lil-gui
import GUI from 'lil-gui'; // Import lil-gui for GUI controls

// ---------------------------------------------
// 2. Canvas & Scene Setup
// ---------------------------------------------
// Select the canvas element from the HTML (should have class 'webgl')
const canvas = document.querySelector('canvas.webgl');
// Create the main Three.js scene
const scene = new THREE.Scene();

/**
 * GUI Controls
 *
 * Adds a GUI to control the scene background color.
 */
const gui = new GUI();

// GUI parameters for gradient background
const params = {
    gradientTop: '#ff0000',    // Red at top
    gradientBottom: '#0000ff', // Blue at bottom
    gradientAlpha: 1.0         // Fully opaque
};

// Function to update the gradient background
let bgTexture = null;
function updateGradientBackground() {
    const width = 512, height = 512;
    const canvasBg = document.createElement('canvas');
    canvasBg.width = width;
    canvasBg.height = height;
    const ctx = canvasBg.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, params.gradientTop);
    gradient.addColorStop(1, params.gradientBottom);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = params.gradientAlpha;
    ctx.fillRect(0, 0, width, height);
    bgTexture = new THREE.CanvasTexture(canvasBg);
    scene.background = bgTexture;
    scene._originalBackgroundTexture = bgTexture;
}

// Add GUI controls for gradient
gui.addColor(params, 'gradientTop').name('Gradient Top').onChange(updateGradientBackground);
gui.addColor(params, 'gradientBottom').name('Gradient Bottom').onChange(updateGradientBackground);
gui.add(params, 'gradientAlpha', 0, 1, 0.01).name('Gradient Alpha').onChange(updateGradientBackground);

// Initial gradient background
updateGradientBackground();

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
    // Only use HDRI for lighting, not for background
    scene.environment = environmentMap;
    // The gradient background is handled by updateGradientBackground()
});

// ---------------------------------------------
// 5. Lighting: Ambient and Directional
// ---------------------------------------------
// AmbientLight: Soft, global illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
// DirectionalLight: Simulates sunlight, can cast shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.43);
directionalLight.position.set(1.35, 1.57, 0.9);
directionalLight.castShadow = true;
directionalLight.shadow.bias = 0;
directionalLight.shadow.radius = 1;
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

// // Example: Add axes helper for orientation
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
let sceneAction = null;
let allClickableMeshes = [];

let modelFolder; // Declare at the top level for GUI folder
let loose20kgMesh = null;
let loose20kgOriginalMaterial = null;
let loose20kgGlowActive = true;

gltfLoader.load(
    '/models/exercise.glb',
    (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                allClickableMeshes.push(child);
                if (child.name === 'button-7') {
                    button7Mesh = child;
                    button7OriginalMaterial = child.material.clone();
                }
                if (child.name === 'Loose_20kg013_COLOR_1_0') {
                    loose20kgMesh = child;
                    loose20kgOriginalMaterial = child.material.clone();
                }
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        model.position.set(0, 0, 0);
        scene.add(model);

        // Add dat.GUI controls for model transform
        modelFolder = gui.addFolder('Model Transform');
        const pos = model.position;
        const rot = model.rotation;
        const scl = model.scale;
        modelFolder.add(pos, 'x', -1, 1, 0.002).name('Position X');
        modelFolder.add(pos, 'y', -1, 1, 0.002).name('Position Y');
        modelFolder.add(pos, 'z', -1, 1, 0.002).name('Position Z');
        modelFolder.add(rot, 'x', -1, 1, 0.002).name('Rotation X');
        modelFolder.add(rot, 'y', -1, 1, 0.002).name('Rotation Y');
        modelFolder.add(rot, 'z', -1, 1, 0.002).name('Rotation Z');
        modelFolder.add(scl, 'x', 0.01, 1, 0.001).name('Scale X');
        modelFolder.add(scl, 'y', 0.01, 1, 0.001).name('Scale Y');
        modelFolder.add(scl, 'z', 0.01, 1, 0.001).name('Scale Z');
        modelFolder.open();

        // Smooth, continuous pulse for Loose_20kg013_COLOR_1_0 until clicked
        if (loose20kgMesh) {
            const originalEmissive = loose20kgMesh.material.emissive ? loose20kgMesh.material.emissive.clone() : new THREE.Color(0x000000);
            const originalEmissiveIntensity = loose20kgMesh.material.emissiveIntensity !== undefined ? loose20kgMesh.material.emissiveIntensity : 1;
            const flashColor = new THREE.Color(0xff0000); // bright red
            let startTime = null;
            // Pulse duration is 50% slower (original: 2000/3 ~666ms, now ~1000ms per pulse)
            const pulseDuration = (2000 / 3) * 1.5; // ~1000ms per pulse
            function animatePulse(time) {
                if (!loose20kgGlowActive) {
                    // Restore original
                    loose20kgMesh.material.emissive = originalEmissive;
                    loose20kgMesh.material.emissiveIntensity = originalEmissiveIntensity;
                    loose20kgMesh.material.needsUpdate = true;
                    return;
                }
                if (!startTime) startTime = time;
                const elapsed = (time - startTime) % pulseDuration;
                // Ease in/out using sine
                const t = elapsed / pulseDuration;
                const ease = 0.2 * (0.5 - 0.5 * Math.cos(Math.PI * 2 * t)); // 0 to 0.2 smoothly
                loose20kgMesh.material.emissive = flashColor;
                loose20kgMesh.material.emissiveIntensity = ease;
                loose20kgMesh.material.needsUpdate = true;
                requestAnimationFrame(animatePulse);
            }
            requestAnimationFrame(animatePulse);
        }

        if (Array.isArray(gltf.animations) && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            // Find the animation clip named 'Scene'
            const sceneClip = gltf.animations.find(clip => clip.name === 'Scene');
            if (sceneClip) {
                sceneAction = mixer.clipAction(sceneClip);
                sceneAction.setLoop(THREE.LoopOnce, 1);
                sceneAction.clampWhenFinished = true;
                sceneAction.paused = true;
            }
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
camera.position.set(0.6497189477206843, 0.6200658000436491, -0.3267521547833198);
camera.rotation.set(-2.4803932140328504, 1.062666120524773, 2.544601201517163, 'XYZ');
scene.add(camera);

// ---------------------------------------------
// 11. Controls: OrbitControls for user interaction
// ---------------------------------------------
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;
controls.target.set(-0.040782704096354615, 0.38393067967272315, -0.02324773811580094);
controls.update();

let cameraLogTimeout = null;

controls.addEventListener('change', () => {
    if (cameraLogTimeout) clearTimeout(cameraLogTimeout);
    cameraLogTimeout = setTimeout(() => {
        console.log('Camera position:', camera.position);
        console.log('Camera rotation (radians):', camera.rotation);
        console.log('Controls target:', controls.target);
    }, 2000);
});

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
        // Log all object properties for the clicked mesh
        console.log('Clicked mesh properties:', mesh);
        // Stop glow on first click of Loose_20kg013_COLOR_1_0
        if (mesh.name === 'Loose_20kg013_COLOR_1_0') {
            loose20kgGlowActive = false;
        }
        // Trigger animation if this is the target mesh
        if (mesh.name === 'Loose_20kg013_COLOR_1_0' && sceneAction) {
            sceneAction.reset();
            sceneAction.paused = false;
            sceneAction.play();
        }
    }
});

// Ok so what you need to do to select a part of the model is to identify it using the mesh name. 
// Which is essential the object properties name in Blender 
// You can use raycaster and console logs to help you identify the current material names.

// You can trigger an animation using the Ray Caster also but the Animation has to be named in the action editor in blender and specifically called in JS.


// --- Infinite Canvas (Cast Shadow Material) & Solid Ground Toggle ---
const fadeTexture = textureLoader.load('./textures/gradients/3.jpg');
fadeTexture.wrapS = THREE.ClampToEdgeWrapping;
fadeTexture.wrapT = THREE.ClampToEdgeWrapping;
fadeTexture.needsUpdate = true;


// Geometry and material for ground (switchable)
const circleRadius = 5;
const circleSegments = 64;
const circleGeometry = new THREE.CircleGeometry(circleRadius, circleSegments);
const planeGeometry = new THREE.PlaneGeometry(30, 30);

const solidGroundMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 1, metalness: 0 }); // Solid color, no alpha map
const shadowGroundMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
shadowGroundMaterial.alphaMap = fadeTexture;
shadowGroundMaterial.transparent = true;
shadowGroundMaterial.alphaMap.needsUpdate = true;

const ground = new THREE.Mesh(circleGeometry, solidGroundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
ground.receiveShadow = true;
ground.castShadow = false;
ground.visible = true;
scene.add(ground);

let useShadowMaterial = false;

let guiVisible = true;
const groundFolder = gui.addFolder('Ground Plane');
const groundParams = {
    mode: 'Solid', // or 'Infinite Canvas',
    color: '#222222',
    roughness: 1,
    metalness: 0,
    shadowOpacity: 0.4,
    receiveShadow: true,
    castShadow: false,
    visible: true
};

groundFolder.add(groundParams, 'mode', ['Solid', 'Infinite Canvas']).name('Type').onChange((val) => {
    useShadowMaterial = (val === 'Infinite Canvas');
    if (useShadowMaterial) {
        ground.geometry = planeGeometry;
        ground.material = shadowGroundMaterial;
        ground.receiveShadow = true;
        ground.castShadow = false;
    } else {
        ground.geometry = circleGeometry;
        ground.material = solidGroundMaterial;
        ground.receiveShadow = groundParams.receiveShadow;
        ground.castShadow = groundParams.castShadow;
    }
    ground.material.needsUpdate = true;
    ground.geometry.computeBoundingSphere();
});
groundFolder.addColor(groundParams, 'color').name('Color').onChange((value) => {
    solidGroundMaterial.color.set(value);
    groundParams.color = value;
});
groundFolder.add(groundParams, 'roughness', 0, 1, 0.01).name('Roughness').onChange((v) => {
    solidGroundMaterial.roughness = v;
});
groundFolder.add(groundParams, 'metalness', 0, 1, 0.01).name('Metalness').onChange((v) => {
    solidGroundMaterial.metalness = v;
});
groundFolder.add(groundParams, 'shadowOpacity', 0, 1, 0.01).name('Shadow Opacity').onChange((v) => {
    shadowGroundMaterial.opacity = v;
});
groundFolder.add(groundParams, 'receiveShadow').name('Receive Shadow').onChange((v) => {
    ground.receiveShadow = v;
    groundParams.receiveShadow = v;
});
groundFolder.add(groundParams, 'castShadow').name('Cast Shadow').onChange((v) => {
    ground.castShadow = v;
    groundParams.castShadow = v;
});
groundFolder.add(groundParams, 'visible').name('Visible').onChange((v) => {
    ground.visible = v;
});
groundFolder.open();

// dat.GUI controls for main directional light
const lightFolder = gui.addFolder('Directional Light');
lightFolder.add(directionalLight, 'intensity', 0, 2, 0.01).name('Intensity');
lightFolder.addColor({ color: '#ffffff' }, 'color').name('Color').onChange((value) => {
    directionalLight.color.set(value);
});
lightFolder.add(directionalLight.position, 'x', -10, 10, 0.01).name('Position X');
lightFolder.add(directionalLight.position, 'y', -10, 10, 0.01).name('Position Y');
lightFolder.add(directionalLight.position, 'z', -10, 10, 0.01).name('Position Z');
lightFolder.add(directionalLight, 'castShadow').name('Cast Shadow');
lightFolder.open();

// Keyboard event to toggle GUI visibility with 'h'
window.addEventListener('keydown', (event) => {
    if (event.key === 'h' || event.key === 'H') {
        guiVisible = !guiVisible;
        gui.domElement.style.display = guiVisible ? 'block' : 'none';
    }
});

// Inject CSS to ensure dat.GUI is always visible
const guiStyle = document.createElement('style');
guiStyle.innerHTML = `
  .dg.ac {
    z-index: 9999 !important;
    top: 10px !important;
    right: 10px !important;
    left: auto !important;
    display: block !important;
  }
`;
document.head.appendChild(guiStyle);

// Function to enable shadow casting for all meshes in a model
function enableAllMeshShadows(model) {
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true; // Optional: also enable receiveShadow
        }
    });
}

// Add Copy Settings to Clipboard button to dat.GUI
const copySettingsToClipboard = () => {
    const settings = {
        ground: {
            color: '#' + ground.material.color.getHexString(),
            roughness: ground.material.roughness,
            metalness: ground.material.metalness,
            receiveShadow: ground.receiveShadow,
            castShadow: ground.castShadow,
            visible: ground.visible
        },
        light: {
            intensity: directionalLight.intensity,
            color: '#' + directionalLight.color.getHexString(),
            position: {
                x: directionalLight.position.x,
                y: directionalLight.position.y,
                z: directionalLight.position.z
            },
            castShadow: directionalLight.castShadow,
            shadowBias: directionalLight.shadow.bias,
            shadowBlur: directionalLight.shadow.radius,
            shadowMapWidth: directionalLight.shadow.mapSize.width,
            shadowMapHeight: directionalLight.shadow.mapSize.height
        },
        camera: {
            position: camera.position.toArray(),
            rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            target: controls.target.toArray()
        }
    };
    const settingsStr = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsStr).then(() => {
        alert('Settings copied to clipboard!');
    }, () => {
        alert('Failed to copy settings to clipboard.');
    });
};

gui.add({ copySettingsToClipboard }, 'copySettingsToClipboard').name('Copy Settings to Clipboard');

// Default scene settings
const defaultSettings = {
    "ground": {
        "color": "#000000",
        "receiveShadow": true,
        "castShadow": false,
        "visible": true
    },
    "light": {
        "intensity": 1.43,
        "color": "#ffffff",
        "position": {
            "x": 1.35,
            "y": 1.37,
            "z": 0.9
        },
        "castShadow": true,
        "shadowBias": 0,
        "shadowBlur": 1,
        "shadowMapWidth": 1024,
        "shadowMapHeight": 1024
    },
    "camera": {
        "position": [
            0.625737818439388,
            0.7241210283450388,
            -0.45128152301841995
        ],
        "rotation": [
            -2.5855085303493848,
            0.8274261497936801,
            2.7124787366885714
        ],
        "target": [
            0.027881915242729722,
            0.4340056326460965,
            0.015511329466392413
        ]
    }
};

// Apply default settings to ground, light, and camera
ground.material.color.set(defaultSettings.ground.color);
ground.material.roughness = defaultSettings.ground.roughness;
ground.material.metalness = defaultSettings.ground.metalness;
ground.receiveShadow = defaultSettings.ground.receiveShadow;
ground.castShadow = defaultSettings.ground.castShadow;
ground.visible = defaultSettings.ground.visible;

directionalLight.intensity = defaultSettings.light.intensity;
directionalLight.color.set(defaultSettings.light.color);
directionalLight.position.set(
    defaultSettings.light.position.x,
    defaultSettings.light.position.y,
    defaultSettings.light.position.z
);
directionalLight.castShadow = defaultSettings.light.castShadow;
directionalLight.shadow.bias = defaultSettings.light.shadowBias;
directionalLight.shadow.radius = defaultSettings.light.shadowBlur;
directionalLight.shadow.mapSize.width = defaultSettings.light.shadowMapWidth;
directionalLight.shadow.mapSize.height = defaultSettings.light.shadowMapHeight;

camera.position.set(
    defaultSettings.camera.position[0],
    defaultSettings.camera.position[1],
    defaultSettings.camera.position[2]
);
camera.rotation.set(
    defaultSettings.camera.rotation[0],
    defaultSettings.camera.rotation[1],
    defaultSettings.camera.rotation[2]
);
controls.target.set(
    defaultSettings.camera.target[0],
    defaultSettings.camera.target[1],
    defaultSettings.camera.target[2]
);
controls.update();
