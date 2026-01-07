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
        }
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
        this.controls.update();
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
}

export default CameraManager;