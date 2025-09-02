// --- Save and Import Settings Functions (must be defined before GUI buttons) ---
const saveSettingsToClipboard = () => {
    // Gather all GUI and scene settings
    const settings = {
        background: {
            ...params
        },
        ground: {
            ...groundParams
        },
        directionalLight: {
            ...dirLightParams,
            position: {
                x: directionalLight.position.x,
                y: directionalLight.position.y,
                z: directionalLight.position.z
            }
        },
        ambientLight: {
            ...ambLightParams
        },
        camera: {
            position: camera.position.toArray(),
            rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            target: controls.target.toArray()
        }
    };
    // Add model transform if model is loaded (use global model reference)
    if (window.model) {
        settings.model = {
            position: window.model.position.toArray(),
            rotation: [window.model.rotation.x, window.model.rotation.y, window.model.rotation.z],
            scale: window.model.scale.toArray()
        };
    }
    const settingsStr = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsStr).then(() => {
        alert('Settings copied to clipboard!');
    }, () => {
        alert('Failed to copy settings to clipboard.');
    });
};

async function importSettingsFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        const settings = JSON.parse(text);

        if (settings.background) {
            if (settings.background.gradientTop) params.gradientTop = settings.background.gradientTop;
            if (settings.background.gradientBottom) params.gradientBottom = settings.background.gradientBottom;
            if (settings.background.gradientAlpha !== undefined) params.gradientAlpha = settings.background.gradientAlpha;
            updateGradientBackground();
        }
        // Ground
        if (settings.ground) {
            // Always set mode first and trigger GUI update
            if (settings.ground.mode) {
                groundParams.mode = settings.ground.mode;
                // Trigger mode change in GUI (dropdown)
                if (gui && gui.__folders && gui.__folders['Ground Plane'] && gui.__folders['Ground Plane'].__controllers[0]) {
                    gui.__folders['Ground Plane'].__controllers[0].setValue(settings.ground.mode);
                }
                // Also update geometry/material immediately in case GUI doesn't trigger
                // Always use solid ground and always receive shadows for reliability
                ground.geometry = circleGeometry;
                ground.material = solidGroundMaterial;
                ground.receiveShadow = true;
                ground.castShadow = false;
                ground.material.needsUpdate = true;
                ground.geometry.computeBoundingSphere();
            }
            if (settings.ground.color) {
                groundParams.color = settings.ground.color;
                solidGroundMaterial.color.set(settings.ground.color);
            }
            if (settings.ground.roughness !== undefined) {
                groundParams.roughness = settings.ground.roughness;
            }
        }
        // ... handle other settings as needed ...
    } catch (e) {
        alert('Failed to import settings: ' + e.message);
    }
}
// ...existing code...

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

// --- Smooth camera target transition on double-click ---
let targetLerpActive = false;
let targetLerpStart = null;
let targetLerpFrom = new THREE.Vector3();
let targetLerpTo = new THREE.Vector3();
let targetLerpDuration = 1.0; // seconds

canvas.addEventListener('dblclick', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const target = intersects[0].point;
        // Start lerp from current controls.target to new target
        targetLerpFrom.copy(controls.target);
        targetLerpTo.copy(target);
        targetLerpStart = performance.now();
        targetLerpActive = true;
    }
});

function updateTargetLerp() {
    if (targetLerpActive) {
        const now = performance.now();
        const elapsed = (now - targetLerpStart) / 1000;
        let t = Math.min(elapsed / targetLerpDuration, 1);
        // Ease in-out (smoothstep)
        t = t * t * (3 - 2 * t);
        controls.target.lerpVectors(targetLerpFrom, targetLerpTo, t);
        controls.update();
        if (t >= 1) {
            controls.target.copy(targetLerpTo);
            controls.update();
            targetLerpActive = false;
        }
    }
// ...existing code...
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
let tick = () => {
    // Update controls for smooth camera movement
    updateTargetLerp();
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




// Solid ground material for the ground (always needed)
const solidGroundMaterial = new THREE.MeshStandardMaterial({
    color: '#222222',
    roughness: 1,
    metalness: 0
});

// Use ShadowMaterial for a transparent ground that only shows the shadow
const shadowGroundMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });

const ground = new THREE.Mesh(circleGeometry, shadowGroundMaterial);
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

// -----------------------------
// Lights GUI Controls
// -----------------------------
const lightsFolder = gui.addFolder('Lights');

// Directional Light Controls
const dirLightParams = {
    intensity: directionalLight.intensity,
    color: '#' + directionalLight.color.getHexString(),
    castShadow: directionalLight.castShadow,
    shadowBias: directionalLight.shadow.bias,
    shadowBlur: directionalLight.shadow.radius,
    shadowMapWidth: directionalLight.shadow.mapSize.width,
    shadowMapHeight: directionalLight.shadow.mapSize.height,
    posX: directionalLight.position.x,
    posY: directionalLight.position.y,
    posZ: directionalLight.position.z,
    showHelper: false
};
const dirFolder = lightsFolder.addFolder('Directional Light');
dirFolder.add(dirLightParams, 'intensity', 0, 5, 0.01).name('Intensity').onChange(v => {
    directionalLight.intensity = v;
});
dirFolder.addColor(dirLightParams, 'color').name('Color').onChange(v => {
    directionalLight.color.set(v);
});
dirFolder.add(dirLightParams, 'castShadow').name('Cast Shadow').onChange(v => {
    directionalLight.castShadow = v;
});
dirFolder.add(dirLightParams, 'shadowBias', -0.05, 0.05, 0.0001).name('Shadow Bias').onChange(v => {
    directionalLight.shadow.bias = v;
});
dirFolder.add(dirLightParams, 'shadowBlur', 0, 10, 0.1).name('Shadow Blur').onChange(v => {
    directionalLight.shadow.radius = v;
});
dirFolder.add(dirLightParams, 'shadowMapWidth', 256, 4096, 1).name('Shadow Map Width').onChange(v => {
    directionalLight.shadow.mapSize.width = v;
    if (directionalLight.shadow.map) directionalLight.shadow.map.dispose();
});
dirFolder.add(dirLightParams, 'shadowMapHeight', 256, 4096, 1).name('Shadow Map Height').onChange(v => {
    directionalLight.shadow.mapSize.height = v;
    if (directionalLight.shadow.map) directionalLight.shadow.map.dispose();
});
dirFolder.add(dirLightParams, 'posX', -10, 10, 0.01).name('Position X').onChange(v => {
    directionalLight.position.x = v;
});
dirFolder.add(dirLightParams, 'posY', -10, 10, 0.01).name('Position Y').onChange(v => {
    directionalLight.position.y = v;
});
dirFolder.add(dirLightParams, 'posZ', -10, 10, 0.01).name('Position Z').onChange(v => {
    directionalLight.position.z = v;
});
dirFolder.add(dirLightParams, 'showHelper').name('Show Helper').onChange(v => {
    dirLightHelper.visible = v;
});
dirFolder.open();

// Ambient Light Controls
const ambLightParams = {
    intensity: ambientLight.intensity,
    color: '#' + ambientLight.color.getHexString()
};
const ambFolder = lightsFolder.addFolder('Ambient Light');
ambFolder.add(ambLightParams, 'intensity', 0, 2, 0.01).name('Intensity').onChange(v => {
    ambientLight.intensity = v;
});
ambFolder.addColor(ambLightParams, 'color').name('Color').onChange(v => {
    ambientLight.color.set(v);
});
ambFolder.open();

lightsFolder.open();



// Keyboard events
window.addEventListener('keydown', (event) => {
    if (event.key === 'h' || event.key === 'H') {
        guiVisible = !guiVisible;
        gui.domElement.style.display = guiVisible ? 'block' : 'none';
    }
    if (event.key === 'c' || event.key === 'C') {
        console.log('Camera position:', camera.position.toArray());
        console.log('Camera rotation (radians):', [camera.rotation.x, camera.rotation.y, camera.rotation.z]);
        console.log('Controls target:', controls.target.toArray());
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
// ...existing code...




// (Moved to top of GUI for visibility)


// Default scene settings (updated)
const defaultSettings = {
    "background": {
        "gradientTop": "#3865ad",
        "gradientBottom": "#6262cb",
        "gradientAlpha": 1
    },
    "ground": {
        "mode": "Infinite Canvas",
        "color": "#222222",
        "roughness": 1,
        "metalness": 0,
        "shadowOpacity": 0.4,
        "receiveShadow": true,
        "castShadow": false,
        "visible": true
    },
    "directionalLight": {
        "intensity": 1.43,
        "color": "#ffffff",
        "castShadow": true,
        "shadowBias": 0,
        "shadowBlur": 1,
        "shadowMapWidth": 1024,
        "shadowMapHeight": 1024,
        "posX": 1.35,
        "posY": 1.57,
        "posZ": 0.9,
        "showHelper": false,
        "position": {
            "x": 1.35,
            "y": 1.57,
            "z": 0.9
        }
    },
    "ambientLight": {
        "intensity": 0.4,
        "color": "#ffffff"
    },
            "camera": {
                "position": [
                    -0.9098738473205128,
                    0.7703823915221306,
                    1.3981905246967228
                ],
                "rotation": [
                    -0.25025460072691486,
                    -0.6114705633846517,
                    -0.14570055395616555
                ],
                "target": [
                    0.06947360176829247,
                    0.4244509273717727,
                    0.04485061060434801
                ]
            },
    "model": {
        "position": [0, -0.02, 0],
        "rotation": [0, 0, 0],
        "scale": [1, 1, 1]
    }
};


// Apply default settings to background, ground, light, and camera
if (defaultSettings.background) {
    params.gradientTop = defaultSettings.background.gradientTop;
    params.gradientBottom = defaultSettings.background.gradientBottom;
    params.gradientAlpha = defaultSettings.background.gradientAlpha;
    updateGradientBackground();
// ...existing code...
if (defaultSettings.ground) {
    groundParams.mode = defaultSettings.ground.mode || 'Solid';
    // Set mode in GUI if possible
    if (gui && gui.__folders && gui.__folders['Ground Plane'] && gui.__folders['Ground Plane'].__controllers[0]) {
        gui.__folders['Ground Plane'].__controllers[0].setValue(defaultSettings.ground.mode || 'Solid');
    }
    solidGroundMaterial.color.set(defaultSettings.ground.color);
    groundParams.color = defaultSettings.ground.color;
    if (defaultSettings.ground.roughness !== undefined) solidGroundMaterial.roughness = defaultSettings.ground.roughness;
    if (defaultSettings.ground.metalness !== undefined) solidGroundMaterial.metalness = defaultSettings.ground.metalness;
    if (defaultSettings.ground.shadowOpacity !== undefined) shadowGroundMaterial.opacity = defaultSettings.ground.shadowOpacity;
    ground.receiveShadow = defaultSettings.ground.receiveShadow;
    ground.castShadow = defaultSettings.ground.castShadow;
    ground.visible = defaultSettings.ground.visible;
    groundParams.receiveShadow = defaultSettings.ground.receiveShadow;
    groundParams.castShadow = defaultSettings.ground.castShadow;
    groundParams.visible = defaultSettings.ground.visible;
    groundParams.shadowOpacity = defaultSettings.ground.shadowOpacity;
    // Hide solid ground if Infinite Canvas is active
    if (defaultSettings.ground.mode === 'Infinite Canvas') {
        ground.geometry = planeGeometry;
        ground.material = shadowGroundMaterial;
        ground.receiveShadow = true;
        ground.castShadow = false;
        ground.visible = true;
    } else {
        ground.geometry = circleGeometry;
        ground.material = solidGroundMaterial;
        ground.visible = defaultSettings.ground.visible;
    }
    ground.material.needsUpdate = true;
    ground.geometry.computeBoundingSphere();
// ...existing code...
if (defaultSettings.light) {
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
}
if (defaultSettings.camera) {
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
}
