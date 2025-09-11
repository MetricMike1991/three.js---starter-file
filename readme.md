# Three.js Player Setup Notes

This README documents all the key adjustments and features added to this player project, so you can replicate the same setup in any future Three.js + Vite project.

---

## Step 1: OrbitControls Setup
- Import and initialize `OrbitControls` from `three/examples/jsm/controls/OrbitControls.js`.
- Controls are attached to the camera and canvas.
- Damping is enabled for smooth movement (`enableDamping: true`, `dampingFactor: 0.05`).
- The camera position and controls target are loaded from a `defaultSettings` object for easy export/import.
- Do NOT set camera.rotation directly; only set position and controls.target for exact view restoration.
- Double-click event focuses the camera on the clicked object.

---

## Step 2: Animation Playback & Model Loading
- GLTFLoader is used to load `.glb` models.
- AnimationMixer is set up for model animations.
- Animations can be triggered by clicking on specific meshes (using Raycaster and mesh names).
- Example: Clicking 'Loose_20kg013_COLOR_1_0' triggers a specific animation and disables its glow effect.

---

## Step 3: GUI Controls (lil-gui)
- All GUI controls use `lil-gui` (no dat.GUI).
- GUI is visible by default and can be toggled with the 'h' key.
- Main GUI folders and controls:
    - **Gradient Background**
        - Top color (color picker)
        - Bottom color (color picker)
        - Alpha (opacity slider)
    - **Model Transform**
        - Position (x, y, z)
        - Rotation (x, y, z)
        - Scale (x, y, z)
    - **Ground Plane**
        - Color
        - Roughness
        - Metalness
        - Receive Shadow
        - Cast Shadow
        - Visible
    - **Directional Light**
        - Intensity
        - Color
        - Position (x, y, z)
        - Cast Shadow
    - **Camera/Target Export**
        - Button to copy current camera position and controls target to clipboard as JSON

---

## Step 4: Environment & Lighting
- HDR environment map is loaded for realistic lighting (scene.environment), but not used as the background.
- Ambient and Directional lights are set up, with GUI controls for the main directional light.
- Ground plane uses a gradient alpha map for fade effect.

---

## Step 5: Responsive Sizing
- Window resize events update camera aspect, renderer size, and pixel ratio.

---

## Step 6: Default Settings Object
- All key scene, camera, light, and ground settings are stored in a `defaultSettings` object for easy export/import and reproducibility.
- Example camera/target JSON:
    ```json
    {
        "camera": {
            "position": [0.7314944442358781, 0.6311726457890414, -0.3278833862321068],
            "target": [-0.09703484786776982, 0.34513821268810024, 0.04266681146329818]
        }
    }
    ```

---

## Step 7: Miscellaneous
- All console logs and dat.GUI code have been removed for cleanliness.
- Helper functions are included for enabling mesh shadows and copying camera/target to clipboard.
- Custom CSS ensures the GUI is always visible and styled above the canvas.

---

## How to Replicate in a New Project
1. Set up Vite and Three.js as usual.
2. Copy the `defaultSettings` pattern and OrbitControls initialization.
3. Add lil-gui and replicate the GUI folder structure above.
4. Use the provided event handlers for double-click, pointerdown, and window resize.
5. Use the camera/target export button to save and restore views.
6. Follow the folder structure for static assets (textures, models, etc).

---

Feel free to copy-paste or adapt any code or settings from this README to bootstrap your next Three.js player project!
# Three.js 3D Viewer Template

A clean, minimal Three.js template for creating Sketchfab-style 3D model viewers. Perfect as a starting point for your Three.js projects.

## Features

- ✨ Clean, minimal setup
- 🎮 Orbit controls (mouse/touch navigation)
- 🌍 HDR environment mapping
- 💡 Professional lighting setup
- 📱 Mobile-friendly responsive design
- 🖱️ Double-click to focus on objects
- 🎨 Modern renderer with tone mapping
- 📦 Ready for model loading (GLTF/GLB)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── index.html          # Main HTML file
├── script.js           # Three.js application code
└── style.css           # Basic CSS styles
static/
└── textures/
    └── environmentMap/
        └── 2k.hdr       # HDR environment map
```

## Usage

### Loading Your Own 3D Models

Replace the demo cube with your own models using GLTFLoader:

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()

gltfLoader.load('./models/your-model.glb', (gltf) => {
    const model = gltf.scene
    model.castShadow = true
    model.receiveShadow = true
    scene.add(model)
    
    // Optionally center and scale the model
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)
})
```

### Customizing Materials

The template includes a basic StandardMaterial. Customize it or replace with your own:

```javascript
const customMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b6b,
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 1.5
})
```

### Adding Animation

Add animations in the tick function:

```javascript
const tick = () => {
    // Your animations here
    if (yourModel) {
        yourModel.rotation.y += 0.01
    }
    
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}
```

## Controls

- **Left Mouse / Touch**: Rotate camera
- **Right Mouse / Two-finger**: Pan camera  
- **Scroll / Pinch**: Zoom in/out
- **Double-click**: Focus camera on clicked object

## Customization Tips

1. **Change Environment**: Replace `2k.hdr` with your own environment map
2. **Adjust Lighting**: Modify the directional and ambient light settings
3. **Camera Position**: Change initial camera position in the camera setup
4. **Add Post-processing**: Import and add Three.js post-processing effects
5. **Loading Screen**: Add a loading screen while models load

## Dependencies

- **Three.js**: 3D graphics library
- **Vite**: Fast build tool and dev server

## Browser Support

Works in all modern browsers that support WebGL.

---

Built with ❤️ using Three.js


1. Orbit Control Settings 
2. Target 