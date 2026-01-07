/**
 * Camera and Controls Module
 * Handles camera setup and orbit controls
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class CameraManager {
    constructor(canvas, sizes) {
        this.canvas = canvas;
        this.sizes = sizes;
        this.camera = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.scene = null;
        this.clickableMeshes = [];
        
        // Target lerp system
        this.targetLerpActive = false;
        this.targetLerpStart = null;
        this.targetLerpFrom = new THREE.Vector3();
        this.targetLerpTo = new THREE.Vector3();
        this.targetLerpDuration = 0.3;
        
        // Store original target for reset functionality
        this.originalTarget = new THREE.Vector3(-0.040782704096354615, 0.38393067967272315, -0.02324773811580094);
        
        // Zoom momentum system
        this.zoomVelocity = 0;
        this.zoomMomentum = 0;
        this.lastScrollTime = 0;
        this.zoomDecay = 0.96;  // User's preferred decay
        this.zoomMomentumThreshold = 0.015;  // User's preferred threshold
        this.momentumActive = false;
        
        // Store original camera state for full reset
        this.originalPosition = new THREE.Vector3(0.6497189477206843, 0.6200658000436491, -0.3267521547833198);
        this.originalRotation = { x: -2.4803932140328504, y: 1.062666120524773, z: 2.544601201517163 };
        
        // Axis helper system
        this.axisHelper = null;
        this.axisHelperVisible = false;
        this.axisHelperSize = 0.5;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Create perspective camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(0.6497189477206843, 0.6200658000436491, -0.3267521547833198);
        this.camera.rotation.set(-2.4803932140328504, 1.062666120524773, 2.544601201517163, 'XYZ');

        // Create orbit controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        // Smooth zoom settings with extended range
        this.controls.zoomSpeed = 0.9;
        this.controls.minDistance = 0.146;  // User's preferred close zoom
        this.controls.maxDistance = 19;     // User's preferred far zoom
        
        this.controls.target.set(-0.040782704096354615, 0.38393067967272315, -0.02324773811580094);
        this.controls.update();
    }

    setupEventListeners() {
        // Camera logging with delay
        let cameraLogTimeout = null;
        this.controls.addEventListener('change', () => {
            if (cameraLogTimeout) clearTimeout(cameraLogTimeout);
            cameraLogTimeout = setTimeout(() => {
                console.log('Camera position:', this.camera.position);
                console.log('Camera rotation (radians):', this.camera.rotation);
                console.log('Controls target:', this.controls.target);
            }, 2000);
        });

        // Double-click to focus on objects
        this.canvas.addEventListener('dblclick', (event) => {
            this.handleDoubleClick(event);
        });

        // Spacebar to reset camera completely
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !event.repeat) {
                event.preventDefault();
                this.resetCamera();
            }
        });
        
        // Track zoom momentum for smooth inertia
        this.canvas.addEventListener('wheel', (event) => {
            this.trackZoomMomentum(event);
        }, { passive: true });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleDoubleClick(event) {
        // Only proceed if we have scene and meshes references
        if (!this.scene || this.clickableMeshes.length === 0) {
            console.warn('Scene or clickable meshes not available for rotation center');
            return;
        }
        
        // Update mouse coordinates with higher precision
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Cast ray and find intersections with clickable meshes only
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickableMeshes, true);
        
        if (intersects.length > 0) {
            const target = intersects[0].point;
            console.log('New rotation center set at:', target);
            
            // Immediate controls damping adjustment for faster response
            const originalDamping = this.controls.dampingFactor;
            this.controls.dampingFactor = 0.15;
            
            // Start smooth lerp to new target
            this.targetLerpFrom.copy(this.controls.target);
            this.targetLerpTo.copy(target);
            this.targetLerpStart = performance.now();
            this.targetLerpActive = true;
            
            // Restore original damping after animation
            setTimeout(() => {
                this.controls.dampingFactor = originalDamping;
            }, this.targetLerpDuration * 1000 + 100);
            
            // Update axis helper position if visible
            if (this.axisHelperVisible) {
                setTimeout(() => {
                    this.updateAxisHelper();
                }, this.targetLerpDuration * 1000 + 150);
            }
        }
    }

    resetCamera() {
        console.log('Resetting camera to default position, orientation, and rotation center');
        
        // Clear any active momentum
        this.zoomMomentum = 0;
        this.momentumActive = false;
        
        // Stop any active target lerp
        this.targetLerpActive = false;
        
        // Immediate controls damping adjustment for faster response
        const originalDamping = this.controls.dampingFactor;
        this.controls.dampingFactor = 0.25;
        
        // Reset camera position
        this.camera.position.copy(this.originalPosition);
        
        // Reset camera rotation
        this.camera.rotation.set(
            this.originalRotation.x,
            this.originalRotation.y, 
            this.originalRotation.z,
            'XYZ'
        );
        
        // Reset target (rotation center)
        this.controls.target.copy(this.originalTarget);
        
        // Update controls immediately
        this.controls.update();
        
        // Restore original damping after a brief moment
        setTimeout(() => {
            this.controls.dampingFactor = originalDamping;
        }, 300);
        
        console.log('Camera reset complete - Position:', this.camera.position, 'Target:', this.controls.target);
    }

    createAxisHelper() {
        if (this.axisHelper) {
            this.scene.remove(this.axisHelper);
        }
        
        // Create axis helper at current rotation center
        this.axisHelper = new THREE.AxesHelper(this.axisHelperSize);
        this.axisHelper.position.copy(this.controls.target);
        this.scene.add(this.axisHelper);
        
        console.log('Axis helper created at:', this.controls.target);
    }

    updateAxisHelper() {
        if (this.axisHelper && this.axisHelperVisible) {
            this.axisHelper.position.copy(this.controls.target);
        }
    }

    toggleAxisHelper(visible) {
        this.axisHelperVisible = visible;
        
        if (visible && !this.axisHelper) {
            this.createAxisHelper();
        }
        
        if (this.axisHelper) {
            this.axisHelper.visible = visible;
            this.updateAxisHelper();
        }
    }

    setAxisHelperSize(size) {
        this.axisHelperSize = size;
        if (this.axisHelper) {
            this.createAxisHelper();
        }
    }

    getRotationCenter() {
        return {
            x: this.controls.target.x,
            y: this.controls.target.y,
            z: this.controls.target.z
        };
    }

    setRotationCenter(x, y, z) {
        this.controls.target.set(x, y, z);
        this.controls.update();
        this.updateAxisHelper();
        console.log('Rotation center set to:', x, y, z);
    }

    setRotationCenterX(x) {
        this.controls.target.x = x;
        this.controls.update();
        this.updateAxisHelper();
    }

    setRotationCenterY(y) {
        this.controls.target.y = y;
        this.controls.update();
        this.updateAxisHelper();
    }

    setRotationCenterZ(z) {
        this.controls.target.z = z;
        this.controls.update();
        this.updateAxisHelper();
    }

    copyCoordinatesToClipboard() {
        const coords = this.getRotationCenter();
        const coordsText = `x: ${coords.x.toFixed(6)}, y: ${coords.y.toFixed(6)}, z: ${coords.z.toFixed(6)}`;
        
        navigator.clipboard.writeText(coordsText).then(() => {
            console.log('Coordinates copied to clipboard:', coordsText);
            // You could add a visual feedback here
        }).catch(err => {
            console.error('Failed to copy coordinates:', err);
            // Fallback: log to console
            console.log('Coordinates (manual copy):', coordsText);
        });
    }

    handleResize() {
        // Update camera aspect and projection
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
    }

    updateTargetLerp() {
        if (this.targetLerpActive) {
            const now = performance.now();
            const elapsed = (now - this.targetLerpStart) / 1000;
            let t = Math.min(elapsed / this.targetLerpDuration, 1);
            
            // Smooth ease-in-out with back easing for professional feel
            if (t < 0.5) {
                // Ease in with slight acceleration
                t = 4 * t * t * t;
            } else {
                // Ease out with smooth deceleration and slight overshoot
                t = 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
            
            // Apply smooth interpolation
            this.controls.target.lerpVectors(this.targetLerpFrom, this.targetLerpTo, t);
            this.controls.update();
            
            if (elapsed / this.targetLerpDuration >= 1) {
                this.controls.target.copy(this.targetLerpTo);
                this.controls.update();
                this.targetLerpActive = false;
            }
        }
    }

    update() {
        this.updateTargetLerp();
        this.updateZoomMomentum();
        this.updateAxisHelper();
        this.controls.update();
    }

    trackZoomMomentum(event) {
        const now = performance.now();
        const deltaTime = Math.max(now - this.lastScrollTime, 1); // Prevent division by zero
        
        // Calculate zoom velocity based on scroll delta and time
        const scrollDelta = event.deltaY > 0 ? 1 : -1;
        const multiplier = this.velocityMultiplier || 1.0;
        
        // More responsive velocity calculation
        const baseVelocity = scrollDelta * 0.1 * multiplier;
        const timeBasedVelocity = Math.min(deltaTime / 16, 3); // Cap time factor
        
        this.zoomVelocity = baseVelocity * timeBasedVelocity;
        this.zoomMomentum = this.zoomVelocity;
        this.lastScrollTime = now;
        
        console.log('Zoom momentum set:', this.zoomMomentum, 'velocity:', this.zoomVelocity);
    }

    updateZoomMomentum() {
        if (Math.abs(this.zoomMomentum) > this.zoomMomentumThreshold) {
            // Calculate distance factor for momentum zoom
            const distance = this.camera.position.distanceTo(this.controls.target);
            
            // More aggressive momentum effect that's distance-dependent
            const momentumZoom = this.zoomMomentum * Math.max(distance * 0.05, 0.01);
            
            // Apply momentum zoom by moving camera towards/away from target
            const direction = new THREE.Vector3();
            direction.subVectors(this.camera.position, this.controls.target).normalize();
            
            // Calculate new distance with bounds checking
            const currentDistance = distance;
            const targetDistance = currentDistance + momentumZoom;
            const clampedDistance = Math.max(
                this.controls.minDistance,
                Math.min(this.controls.maxDistance, targetDistance)
            );
            
            // Only apply if there's a meaningful change
            if (Math.abs(clampedDistance - currentDistance) > 0.001) {
                this.camera.position.copy(this.controls.target).add(
                    direction.multiplyScalar(clampedDistance)
                );
                
                console.log('Applying momentum:', momentumZoom, 'new distance:', clampedDistance);
            }
            
            // Decay momentum
            this.zoomMomentum *= this.zoomDecay;
            
            // Force controls update
            this.controls.update();
        } else if (this.zoomMomentum !== 0) {
            console.log('Momentum stopped, was:', this.zoomMomentum);
            this.zoomMomentum = 0;
        }
    }

    getCamera() {
        return this.camera;
    }

    getControls() {
        return this.controls;
    }
    
    // Set scene reference for raycasting
    setScene(scene) {
        this.scene = scene;
    }
    
    // Set clickable meshes for double-click targeting
    setClickableMeshes(meshes) {
        this.clickableMeshes = meshes;
    }

    // Apply settings from configuration
    applySettings(settings) {
        if (settings.camera) {
            if (settings.camera.position) {
                this.camera.position.set(
                    settings.camera.position[0],
                    settings.camera.position[1],
                    settings.camera.position[2]
                );
            }
            if (settings.camera.rotation) {
                this.camera.rotation.set(
                    settings.camera.rotation[0],
                    settings.camera.rotation[1],
                    settings.camera.rotation[2]
                );
            }
            if (settings.camera.target) {
                this.controls.target.set(
                    settings.camera.target[0],
                    settings.camera.target[1],
                    settings.camera.target[2]
                );
            }
            this.controls.update();
        }
    }

    // Get current settings for saving
    getSettings() {
        return {
            position: this.camera.position.toArray(),
            rotation: [this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z],
            target: this.controls.target.toArray()
        };
    }
    
    // Cleanup
    dispose() {
        if (this.axisHelper) {
            this.scene.remove(this.axisHelper);
            this.axisHelper = null;
        }
    }
}

export default CameraManager;