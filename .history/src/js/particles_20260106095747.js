/**
 * Dust Particle System Module
 * Handles particle creation, animation and management
 */
import * as THREE from 'three';

class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.dustParticles = null;
        this.dustGeometry = null;
        this.dustMaterial = null;
        this.dustPositions = null;
        this.dustVelocities = null;
        this.dustSizes = null;
        
        // Default parameters
        this.params = {
            count: 500,
            size: 0.005,
            sizeRandomness: 0.5,
            color: '#ffffff',
            opacity: 0.3,
            speed: 0.5,
            horizontalRange: 3,
            verticalRange: 2,
            verticalOffset: 1,
            visible: true,
            blur: 0,
            depthBlur: false,
            depthBlurStrength: 0.5,
            depthFocusDistance: 2.0,
            depthFocusRange: 1.0
        };
        
        this.init();
    }

    init() {
        this.createDustParticles();
    }

    createDustParticles() {
        // Dispose existing particles
        if (this.dustParticles) {
            this.scene.remove(this.dustParticles);
            this.dustGeometry?.dispose();
            this.dustMaterial?.dispose();
        }

        // Create geometry
        this.dustGeometry = new THREE.BufferGeometry();
        this.dustPositions = new Float32Array(this.params.count * 3);
        this.dustVelocities = new Float32Array(this.params.count * 3);
        this.dustSizes = new Float32Array(this.params.count);

        // Initialize particle positions, velocities, and sizes
        for (let i = 0; i < this.params.count; i++) {
            const i3 = i * 3;
            
            // Random positions within horizontal and vertical range
            this.dustPositions[i3] = (Math.random() - 0.5) * this.params.horizontalRange * 2;
            this.dustPositions[i3 + 1] = Math.random() * this.params.verticalRange + this.params.verticalOffset;
            this.dustPositions[i3 + 2] = (Math.random() - 0.5) * this.params.horizontalRange * 2;
            
            // Random velocities (very slow floating motion)
            this.dustVelocities[i3] = (Math.random() - 0.5) * 0.001;
            this.dustVelocities[i3 + 1] = (Math.random() - 0.5) * 0.0005;
            this.dustVelocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
            
            // Random sizes
            this.dustSizes[i] = this.params.size * (1 + (Math.random() - 0.5) * this.params.sizeRandomness);
        }

        this.dustGeometry.setAttribute('position', new THREE.BufferAttribute(this.dustPositions, 3));
        this.dustGeometry.setAttribute('size', new THREE.BufferAttribute(this.dustSizes, 1));

        // Create material with blur effects
        let materialConfig = {
            color: this.params.color,
            size: this.params.size,
            transparent: true,
            opacity: this.params.opacity,
            sizeAttenuation: true,
            alphaTest: 0.01
        };

        // Add blur texture if blur > 0
        if (this.params.blur > 0) {
            materialConfig.map = this.createBlurTexture(this.params.blur);
        }

        this.dustMaterial = new THREE.PointsMaterial(materialConfig);

        // Create particles
        this.dustParticles = new THREE.Points(this.dustGeometry, this.dustMaterial);
        this.dustParticles.visible = this.params.visible;
        this.scene.add(this.dustParticles);
    }

    // Create blur texture for particles
    createBlurTexture(blurAmount) {
        const size = 32;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Create radial gradient for blur effect
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2;
        
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - blurAmount})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${(1 - blurAmount) * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    update(deltaTime) {
        if (!this.dustParticles || !this.params.visible) return;

        const positions = this.dustGeometry.attributes.position.array;
        const sizes = this.dustGeometry.attributes.size.array;
        
        for (let i = 0; i < this.params.count; i++) {
            const i3 = i * 3;
            
            // Update positions with velocities and speed multiplier
            positions[i3] += this.dustVelocities[i3] * this.params.speed * deltaTime * 1000;
            positions[i3 + 1] += this.dustVelocities[i3 + 1] * this.params.speed * deltaTime * 1000;
            positions[i3 + 2] += this.dustVelocities[i3 + 2] * this.params.speed * deltaTime * 1000;
            
            // Apply depth blur effect
            if (this.params.depthBlur && window.camera) {
                const particlePos = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
                const cameraPos = window.camera.position;
                const distance = particlePos.distanceTo(cameraPos);
                
                // Calculate depth-based size modification
                const focusDistance = this.params.depthFocusDistance;
                const focusRange = this.params.depthFocusRange;
                const distanceFromFocus = Math.abs(distance - focusDistance);
                
                let depthFactor = 1;
                if (distanceFromFocus > focusRange) {
                    depthFactor = 1 - (Math.min(distanceFromFocus - focusRange, 2) / 2) * this.params.depthBlurStrength;
                }
                
                // Apply depth-based size scaling
                sizes[i] = this.dustSizes[i] * depthFactor;
            }
            
            // Wrap around boundaries
            if (positions[i3] > this.params.horizontalRange) positions[i3] = -this.params.horizontalRange;
            if (positions[i3] < -this.params.horizontalRange) positions[i3] = this.params.horizontalRange;
            if (positions[i3 + 2] > this.params.horizontalRange) positions[i3 + 2] = -this.params.horizontalRange;
            if (positions[i3 + 2] < -this.params.horizontalRange) positions[i3 + 2] = this.params.horizontalRange;
            
            // Reset particles that fall too low or go too high
            if (positions[i3 + 1] < this.params.verticalOffset - 0.5 || 
                positions[i3 + 1] > this.params.verticalOffset + this.params.verticalRange + 0.5) {
                positions[i3 + 1] = Math.random() * this.params.verticalRange + this.params.verticalOffset;
            }
        }
        
        this.dustGeometry.attributes.position.needsUpdate = true;
        if (this.params.depthBlur) {
            this.dustGeometry.attributes.size.needsUpdate = true;
        }
    }

    // Parameter update methods
    updateCount(count) {
        this.params.count = count;
        this.createDustParticles();
    }

    updateSize(size) {
        this.params.size = size;
        this.dustMaterial.size = size;
        // Update individual particle sizes
        if (this.dustSizes) {
            for (let i = 0; i < this.params.count; i++) {
                this.dustSizes[i] = size * (1 + (Math.random() - 0.5) * this.params.sizeRandomness);
            }
            this.dustGeometry.attributes.size.needsUpdate = true;
        }
    }

    updateSizeRandomness(randomness) {
        this.params.sizeRandomness = randomness;
        this.createDustParticles();
    }

    updateColor(color) {
        this.params.color = color;
        this.dustMaterial.color.set(color);
    }

    updateOpacity(opacity) {
        this.params.opacity = opacity;
        this.dustMaterial.opacity = opacity;
    }

    updateSpeed(speed) {
        this.params.speed = speed;
    }

    updateBlur(blur) {
        this.params.blur = blur;
        if (blur > 0) {
            this.dustMaterial.map = this.createBlurTexture(blur);
        } else {
            this.dustMaterial.map = null;
        }
        this.dustMaterial.needsUpdate = true;
    }

    updateDepthBlur(enabled) {
        this.params.depthBlur = enabled;
    }

    updateDepthBlurStrength(strength) {
        this.params.depthBlurStrength = strength;
    }

    updateDepthFocus(distance, range) {
        this.params.depthFocusDistance = distance;
        this.params.depthFocusRange = range;
    }

    updateRange(horizontal, vertical) {
        this.params.horizontalRange = horizontal;
        this.params.verticalRange = vertical;
        this.createDustParticles();
    }

    updateOffset(offset) {
        this.params.verticalOffset = offset;
        this.createDustParticles();
    }

    setVisible(visible) {
        this.params.visible = visible;
        this.dustParticles.visible = visible;
    }

    // Preset configurations
    applyPreset(presetName) {
        switch (presetName) {
            case 'Light Dust':
                Object.assign(this.params, {
                    count: 300,
                    size: 0.003,
                    opacity: 0.2,
                    speed: 0.3,
                    color: '#ffffff'
                });
                break;
            case 'Heavy Dust':
                Object.assign(this.params, {
                    count: 800,
                    size: 0.008,
                    opacity: 0.4,
                    speed: 0.8,
                    color: '#d4c4a8'
                });
                break;
            case 'Magical Sparkles':
                Object.assign(this.params, {
                    count: 150,
                    size: 0.01,
                    opacity: 0.6,
                    speed: 0.2,
                    color: '#ffd700'
                });
                break;
            case 'Reset Dust':
            default:
                Object.assign(this.params, {
                    count: 500,
                    size: 0.005,
                    opacity: 0.3,
                    speed: 0.5,
                    color: '#ffffff'
                });
                break;
        }
        this.createDustParticles();
    }

    // Apply settings from configuration
    applySettings(settings) {
        if (settings) {
            Object.assign(this.params, settings);
            this.createDustParticles();
            
            // Apply blur settings specifically
            if (settings.blur !== undefined) {
                this.updateBlur(settings.blur);
            }
            if (settings.depthBlur !== undefined) {
                this.updateDepthBlur(settings.depthBlur);
            }
            if (settings.depthBlurStrength !== undefined) {
                this.updateDepthBlurStrength(settings.depthBlurStrength);
            }
            if (settings.depthFocusDistance !== undefined && settings.depthFocusRange !== undefined) {
                this.updateDepthFocus(settings.depthFocusDistance, settings.depthFocusRange);
            }
        }
    }

    // Get current settings for saving
    getSettings() {
        return { ...this.params };
    }

    // Get parameters for GUI
    getParams() {
        return this.params;
    }

    // Cleanup
    dispose() {
        if (this.dustParticles) {
            this.scene.remove(this.dustParticles);
            this.dustGeometry?.dispose();
            this.dustMaterial?.dispose();
        }
    }
}

export default ParticleSystem;