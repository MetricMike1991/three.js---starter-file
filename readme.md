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
