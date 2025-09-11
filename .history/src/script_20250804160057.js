import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//texture loader
const textureLoader = new THREE.TextureLoader()

const doorcolorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const metcapTexture = textureLoader.load('./textures/environmentMaps/0/metalCap.jpg')
const gradient

//objects
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const geometry2 = new THREE.SphereGeometry(0.5, 32, 32)
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const sphere = new THREE.Mesh(geometry2, material2)
sphere.position.x = 2
scene.add(sphere)  

const geometry3 = new THREE.ConeGeometry(0.5, 1, 32)
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const cone = new THREE.Mesh(geometry3, material3)
cone.position.x = -2
scene.add(cone) 



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = true
controls.panSpeed = 1.0
controls.screenSpacePanning = true
controls.enableZoom = false // Disable default zoom to implement custom
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.ROTATE
}
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
}

// Custom zoom with momentum
let zoomVelocity = 0
let zoomFriction = 0.9
let zoomSensitivity = 0.0005
let lastScrollTime = 0

canvas.addEventListener('wheel', (event) => {
    event.preventDefault()
    
    const currentTime = Date.now()
    const deltaTime = currentTime - lastScrollTime
    lastScrollTime = currentTime
    
    // Calculate velocity based on scroll delta and time
    let scrollDelta = event.deltaY * zoomSensitivity
    
    // Add acceleration based on how fast the user is scrolling
    if (deltaTime < 50) { // Fast scrolling
        scrollDelta *= 2.0 // Acceleration multiplier
    }
    
    // Add to velocity instead of direct zoom
    zoomVelocity += scrollDelta
    
    // Cap maximum velocity
    zoomVelocity = Math.max(-0.5, Math.min(0.5, zoomVelocity))
})

// Double-click to focus functionality
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// Animation variables for smooth transitions
let isAnimating = false
const animationDuration = 1.5 // seconds
let animationStartTime = 0
let startTarget = new THREE.Vector3()
let endTarget = new THREE.Vector3()

// Easing function (ease out cubic)
const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3)
}

canvas.addEventListener('dblclick', (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera)

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([cube, sphere, cone])

    if (intersects.length > 0) {
        // Get the first intersection point
        const intersectionPoint = intersects[0].point
        
        // Start smooth transition
        startTarget.copy(controls.target)
        endTarget.copy(intersectionPoint)
        animationStartTime = Date.now()
        isAnimating = true
        
        console.log('Transitioning to new focus point:', intersectionPoint)
    }
})

// Single click bounce animation
let bounceAnimations = new Map() // Track bounce animations for each object
let clickTimeout = null

canvas.addEventListener('click', (event) => {
    // Use timeout to differentiate single click from double click
    if (clickTimeout) {
        clearTimeout(clickTimeout)
        clickTimeout = null
        return // This is part of a double-click, ignore
    }
    
    clickTimeout = setTimeout(() => {
        clickTimeout = null
        
        // Calculate mouse position
        mouse.x = (event.clientX / sizes.width) * 2 - 1
        mouse.y = -(event.clientY / sizes.height) * 2 + 1

        // Update the raycaster
        raycaster.setFromCamera(mouse, camera)

        // Check for intersections
        const intersects = raycaster.intersectObjects([cube, sphere, cone])

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object
            
            // Start bounce animation for this object
            bounceAnimations.set(clickedObject, {
                startTime: Date.now(),
                originalY: clickedObject.userData.originalY || clickedObject.position.y,
                isActive: true
            })
            
            // Store original Y position if not already stored
            if (clickedObject.userData.originalY === undefined) {
                clickedObject.userData.originalY = clickedObject.position.y
            }
            
            console.log('Bouncing object:', clickedObject)
        }
    }, 200) // 200ms delay to detect double-click
})

// Spacebar to recenter camera on origin
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault() // Prevent page scroll
        
        // Start smooth transition to origin
        startTarget.copy(controls.target)
        endTarget.set(0, 0, 0) // Origin point
        animationStartTime = Date.now()
        isAnimating = true
        
        console.log('Recentering camera to origin (0,0,0)')
    }
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Handle smooth camera target transitions
    if (isAnimating) {
        const currentTime = Date.now()
        const progress = Math.min((currentTime - animationStartTime) / (animationDuration * 1000), 1)
        const easedProgress = easeOutCubic(progress)
        
        // Interpolate between start and end targets
        controls.target.lerpVectors(startTarget, endTarget, easedProgress)
        
        // Check if animation is complete
        if (progress >= 1) {
            isAnimating = false
            controls.target.copy(endTarget)
        }
        
        controls.update()
    }

    // Handle momentum-based zooming
    if (Math.abs(zoomVelocity) > 0.001) {
        // Apply zoom velocity to camera position
        const direction = new THREE.Vector3()
        direction.subVectors(camera.position, controls.target).normalize()
        
        // Move camera towards/away from target
        camera.position.addScaledVector(direction, zoomVelocity)
        
        // Apply friction to gradually slow down
        zoomVelocity *= zoomFriction
        
        // Stop when velocity is very small
        if (Math.abs(zoomVelocity) < 0.001) {
            zoomVelocity = 0
        }
    }

    // Handle bounce animations
    const currentTime = Date.now()
    bounceAnimations.forEach((animation, object) => {
        if (!animation.isActive) return
        
        const elapsed = (currentTime - animation.startTime) / 1000 // Convert to seconds
        const duration = 1.5 // Total bounce duration in seconds
        
        if (elapsed >= duration) {
            // Animation complete, reset to original position
            object.position.y = animation.originalY
            bounceAnimations.delete(object)
        } else {
            // Calculate bounce using a combination of sine and exponential decay
            const jumpHeight = 1.5 // How high the object jumps
            const bounceFreq = 8 // Bounce frequency
            const decay = Math.exp(-elapsed * 3) // Exponential decay for damping
            
            // Main jump arc (first 0.5 seconds)
            let yOffset = 0
            if (elapsed < 0.5) {
                yOffset = jumpHeight * Math.sin(elapsed * Math.PI * 2) * decay
            } else {
                // Bouncing phase
                const bouncePhase = elapsed - 0.5
                yOffset = Math.sin(bouncePhase * bounceFreq * Math.PI) * decay * 0.3
            }
            
            object.position.y = animation.originalY + Math.max(0, yOffset)
        }
    })

    // Update objects
    cube.rotation.y = elapsedTime * 0.5
    sphere.rotation.y = elapsedTime * 0.5
    cone.rotation.y = elapsedTime * 0.5

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()