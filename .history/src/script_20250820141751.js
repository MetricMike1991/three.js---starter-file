
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * 1. Base
 */
// 1.1 Canvas
const canvas = document.querySelector('canvas.webgl')

// 1.2 Scene
const scene = new THREE.Scene()

/**
 * 2. Loaders
 */
const textureLoader = new THREE.TextureLoader()
const rgbeLoader = new RGBELoader()

/**
 * 3. Environment
 */
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * 4. Lighting
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(1, 2, 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

/**
 * 5. Materials
 */
const defaultMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    metalness: 0.1
})

/**
 * 6. Objects (Demo - replace with your own models)
 */
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(cubeGeometry, defaultMaterial)
cube.position.set(0, 0, 0)
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)


/**
 * 7. Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // 7.1 Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // 7.2 Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // 7.3 Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * 8. Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 3, 3)
scene.add(camera)

/**
 * 9. Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
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
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0

/**
 * 11. Animation Loop
 */
const tick = () => {
    // 11.1 Update controls
    controls.update()

    // 11.2 Render
    renderer.render(scene, camera)

    // 11.3 Continue loop
    requestAnimationFrame(tick)
}

tick()