import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'lil-gui'; // Import lil-gui for GUI controls

// ---------------------------------------------
// 1. Imports: Three.js core and extensions
// ---------------------------------------------
// Removed dat.GUI import; using only lil-gui
// Postprocessing imports for vignette

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


// ---------------------------------------------
// 0. Default scene settings (move to top for early use)
// ---------------------------------------------
const defaultSettings = {
    "background": {
        "gradientTop": "#121212",
        "gradientBottom": "#000000",
        "gradientAlpha": 1
    },
    "ground": {
        "color": "rgb(0,0,0)",
        "roughness": 1,
        "metalness": 0,
        "receiveShadow": true,
        "castShadow": false,
        "visible": false
    },
    "light": {
        "intensity": 2,
        "color": "rgb(255,255,255)",
        "position": {
            "x": 1.64,
            "y": 1.15,
            "z": 1.15
        },
        "castShadow": true,
        "shadowBias": 0,
        "shadowBlur": 1,
        "shadowMapWidth": 1024,
        "shadowMapHeight": 1024
    },
    "camera": {
        "position": [
            0.009368396563673052,
            0.6425210707182568,
            -0.8064969252089942
        ],
        "target": [
            -0.008387952832804671,
            0.3485219413752002,
            0.09583339795394356
        ]
    }
};

// GUI parameters for gradient background
const params = {
    gradientTop: defaultSettings.background.gradientTop,
    gradientBottom: defaultSettings.background.gradientBottom,
    gradientAlpha: defaultSettings.background.gradientAlpha
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
// ---------------------------------------------
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


// ---------------------------------------------
// 11. Renderer & Postprocessing (Vignette)
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
// 12. Camera Setup
// ---------------------------------------------
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// Set camera position from defaultSettings (do NOT set rotation)
camera.position.set(
    defaultSettings.camera.position[0],
    defaultSettings.camera.position[1],
    defaultSettings.camera.position[2]
);
// Do not set camera.rotation here; OrbitControls will handle it
scene.add(camera);

// --- Vignette Postprocessing --- (moved after camera creation)
let composer, renderPass, vignettePass;
const vignetteParams = {
    enabled: false,
    strength: 0.5,
    color: '#000000'
};

composer = new EffectComposer(renderer);
renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const VignetteShader = {
    uniforms: {
        tDiffuse: { value: null },
        strength: { value: vignetteParams.strength },
        color: { value: new THREE.Color(vignetteParams.color) }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float strength;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            float dist = distance(vUv, vec2(0.5, 0.5));
            float vignette = smoothstep(0.6, 0.9, dist) * strength;
            texel.rgb = mix(texel.rgb, color, vignette);
            gl_FragColor = texel;
        }
    `
};
vignettePass = new ShaderPass(VignetteShader);
composer.addPass(vignettePass);

// GUI for vignette
const vignetteFolder = gui.addFolder('Vignette');
vignetteFolder.add(vignetteParams, 'enabled').name('Enable Vignette');
vignetteFolder.add(vignetteParams, 'strength', 0, 1, 0.01).name('Strength').onChange((v) => {
    vignettePass.uniforms.strength.value = v;
});
vignetteFolder.addColor(vignetteParams, 'color').name('Color').onChange((v) => {
    vignettePass.uniforms.color.value.set(v);
});
vignetteFolder.open();

// ---------------------------------------------
// 13. Controls: OrbitControls for user interaction
// ---------------------------------------------
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;
// Set controls target from defaultSettings
controls.target.set(
    defaultSettings.camera.target[0],
    defaultSettings.camera.target[1],
    defaultSettings.camera.target[2]
);
controls.update();

let cameraLogTimeout = null;

// Removed all console logs

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
// 14. Animation Loop: Updates and renders the scene (with vignette)
// ---------------------------------------------
const tick = () => {
    controls.update();
    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }
    if (vignetteParams.enabled) {
        vignettePass.uniforms.strength.value = vignetteParams.strength;
        vignettePass.uniforms.color.value.set(vignetteParams.color);
        composer.render();
    } else {
        renderer.render(scene, camera);
    }
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



// --- Ground: Shadow Catcher and Circle Toggle ---
const groundRadius = 5;
const groundSegments = 64;
// Shadow catcher material
const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
const shadowCatcher = new THREE.Mesh(new THREE.PlaneGeometry(groundRadius * 2, groundRadius * 2), shadowMaterial);
shadowCatcher.rotation.x = -Math.PI / 2;
shadowCatcher.position.y = -0.011;
shadowCatcher.receiveShadow = true;
shadowCatcher.visible = false;
scene.add(shadowCatcher);

// Colored circle material
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1, metalness: 0, transparent: true });
const ground = new THREE.Mesh(new THREE.CircleGeometry(groundRadius, groundSegments), groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
ground.receiveShadow = true;
ground.castShadow = false;
ground.visible = true;
scene.add(ground);

// Create a radial alpha map for fade towards the edges
function createRadialAlphaMap(size = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
}
const radialAlphaMap = createRadialAlphaMap();
groundMaterial.alphaMap = radialAlphaMap;
groundMaterial.alphaMap.needsUpdate = true;
groundMaterial.transparent = true;

// GUI is visible by default; toggle with 'h' key
let guiVisible = true;

const groundFolder = gui.addFolder('Ground Plane');
const groundGuiParams = {
    mode: 'Circle', // or 'Shadow Catcher'
    color: '#000000',
    roughness: 1,
    metalness: 0,
    transparent: true,
    opacity: 1,
    fade: true,
    shadowOpacity: 0.4,
    visible: true
};
groundFolder.add(groundGuiParams, 'mode', ['Circle', 'Shadow Catcher']).name('Ground Mode').onChange((mode) => {
    if (mode === 'Circle') {
        ground.visible = true;
        shadowCatcher.visible = false;
    } else {
        ground.visible = false;
        shadowCatcher.visible = true;
    }
});
groundFolder.addColor(groundGuiParams, 'color').name('Color').onChange((value) => {
    ground.material.color.set(value);
});
groundFolder.add(ground.material, 'roughness', 0, 1, 0.01).name('Roughness');
groundFolder.add(ground.material, 'metalness', 0, 1, 0.01).name('Metalness');
groundFolder.add(ground.material, 'opacity', 0, 1, 0.01).name('Opacity').onChange((value) => {
    ground.material.opacity = value;
    ground.material.transparent = value < 1 || groundGuiParams.fade;
});
groundFolder.add(groundGuiParams, 'fade').name('Fade Edges').onChange((fade) => {
    ground.material.alphaMap = fade ? radialAlphaMap : null;
    ground.material.transparent = fade || ground.material.opacity < 1;
    ground.material.needsUpdate = true;
});
groundFolder.add(groundGuiParams, 'shadowOpacity', 0, 1, 0.01).name('Shadow Opacity').onChange((value) => {
    shadowMaterial.opacity = value;
});
groundFolder.add(ground, 'receiveShadow').name('Receive Shadow');
groundFolder.add(ground, 'castShadow').name('Cast Shadow');
groundFolder.add(ground, 'visible').name('Visible').onChange((v) => {
    if (groundGuiParams.mode === 'Circle') ground.visible = v;
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



// Add Universal Copy All GUI Settings to Clipboard button
const copyAllGuiSettingsToClipboard = () => {
    const allSettings = {
        background: {
            gradientTop: params.gradientTop,
            gradientBottom: params.gradientBottom,
            gradientAlpha: params.gradientAlpha
        },
        ground: {
            color: ground.material.color.getStyle(),
            roughness: ground.material.roughness,
            metalness: ground.material.metalness,
            receiveShadow: ground.receiveShadow,
            castShadow: ground.castShadow,
            visible: ground.visible
        },
        light: {
            intensity: directionalLight.intensity,
            color: directionalLight.color.getStyle(),
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
            target: controls.target.toArray()
        }
    };
    const allStr = JSON.stringify(allSettings, null, 2);
    navigator.clipboard.writeText(allStr).then(() => {
        alert('All GUI settings copied to clipboard!');
    }, () => {
        alert('Failed to copy GUI settings to clipboard.');
    });
};

gui.add({ copyAllGuiSettingsToClipboard }, 'copyAllGuiSettingsToClipboard').name('Copy ALL GUI Settings to Clipboard');


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

// Camera and controls are now initialized above from defaultSettings

