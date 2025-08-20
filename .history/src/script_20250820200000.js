
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


/**
 * 1. Base
 *
 * This section sets up the basic elements required for a Three.js scene:
 * - Selects the canvas element from the HTML where the 3D scene will be rendered.
 * - Creates the main scene object that will hold all 3D objects, lights, and cameras.
 */
// 1.1 Canvas: Select the canvas element from the DOM
const canvas = document.querySelector('canvas.webgl')

// 1.2 Scene: Create the main Three.js scene
const scene = new THREE.Scene()


/**
 * 2. Loaders
 *
 * Loaders are used to import external assets such as textures and environment maps.
 * - TextureLoader: Loads standard image textures (JPG, PNG, etc.).
 * - RGBELoader: Loads HDR environment maps for realistic lighting and reflections.
 */
const textureLoader = new THREE.TextureLoader()
const rgbeLoader = new RGBELoader()


/**
 * 3. Environment
 *
 * Loads an HDR environment map and applies it to the scene for realistic lighting and reflections.
 * - The environment map is set as both the scene background and the environment for physically-based rendering.
 */
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})


/**
 * 4. Lighting
 *
 * Adds light sources to the scene:
 * - AmbientLight: Provides soft, global illumination.
 * - DirectionalLight: Simulates sunlight, casts shadows, and can be positioned.
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4) // Soft global light
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8) // Sunlight effect
directionalLight.position.set(1, 2, 1)
directionalLight.castShadow = true // Enable shadow casting
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)


/**
 * 5. Materials
 *
 * Defines the appearance of 3D objects using materials.
 * - MeshStandardMaterial: Supports physically-based rendering, reacts to lights and environment.
 */
const defaultMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,      // Red color
    roughness: 0.4,      // Surface roughness
    metalness: 0.1       // Metalness factor
})


/**
 * 6. Objects (Demo - replace with your own models)
 *
 * Adds 3D objects to the scene. Here, a simple cube is created as a placeholder.
 * - You can replace this with your own models or geometry.
 */
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(cubeGeometry, defaultMaterial)
cube.position.set(0, 0, 0)
cube.castShadow = true // Cube casts shadows
cube.receiveShadow = true // Cube receives shadows
scene.add(cube)



/**
 * 7. Sizes
 *
 * Handles responsive resizing:
 * - Stores the current window size.
 * - Updates camera and renderer when the window is resized to keep the scene fitting the viewport.
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // 7.1 Update sizes: Get new window dimensions
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // 7.2 Update camera: Adjust aspect ratio and projection
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // 7.3 Update renderer: Resize and adjust pixel ratio
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * 8. Camera
 *
 * Sets up the perspective camera:
 * - Field of view: 75 degrees
 * - Aspect ratio: matches window size
 * - Near/far clipping planes: 0.1 to 100
 * - Positioned to view the scene from an angle
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 3, 3)
scene.add(camera)


/**
 * 9. Controls
 *
 * Adds user controls for interacting with the scene:
 * - OrbitControls: Allows the user to rotate, zoom, and pan the camera with the mouse.
 * - Damping: Smooths camera movement for a more natural feel.
 * - Double-click: Optionally focuses the camera on a clicked object using raycasting.
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // Smooth camera movement
controls.dampingFactor = 0.05

// 9.1 Optional: Focus on model with double-click
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

canvas.addEventListener('dblclick', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
        const target = intersects[0].point
        controls.target.copy(target)
        controls.update()
    }
})


/**
 * 10. Renderer
 *
 * Sets up the WebGL renderer:
 * - Renders the scene to the selected canvas.
 * - Enables antialiasing for smoother edges.
 * - Sets size and pixel ratio for crisp visuals.
 * - Enables shadows and advanced tone mapping for realistic lighting.
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true // Smooths jagged edges
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true // Enable shadow rendering
renderer.shadowMap.type = THREE.PCFSoftShadowMap // Soft shadow edges
renderer.toneMapping = THREE.ACESFilmicToneMapping // Realistic color mapping
renderer.toneMappingExposure = 1.0


/**
 * 11. Animation Loop
 *
 * Continuously updates and renders the scene:
 * - Updates controls for smooth camera movement.
 * - Renders the scene from the camera's perspective.
 * - Uses requestAnimationFrame for efficient, smooth animation.
 */
const tick = () => {
    // 11.1 Update controls: Smooth camera movement
    controls.update()

    // 11.2 Render: Draw the scene
    renderer.render(scene, camera)

    // 11.3 Continue loop: Request the next frame
    requestAnimationFrame(tick)
}

tick()