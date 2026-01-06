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
            visible: true
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

        // Create material
        this.dustMaterial = new THREE.PointsMaterial({
            color: this.params.color,
            size: this.params.size,
            transparent: true,
            opacity: this.params.opacity,
            sizeAttenuation: true,
            alphaTest: 0.01
        });

        // Create particles
        this.dustParticles = new THREE.Points(this.dustGeometry, this.dustMaterial);
        this.dustParticles.visible = this.params.visible;
        this.scene.add(this.dustParticles);
    }

    update(deltaTime) {
        if (!this.dustParticles || !this.params.visible) return;

        const positions = this.dustGeometry.attributes.position.array;
        
        for (let i = 0; i < this.params.count; i++) {
            const i3 = i * 3;
            
            // Update positions with velocities and speed multiplier
            positions[i3] += this.dustVelocities[i3] * this.params.speed * deltaTime * 1000;
            positions[i3 + 1] += this.dustVelocities[i3 + 1] * this.params.speed * deltaTime * 1000;
            positions[i3 + 2] += this.dustVelocities[i3 + 2] * this.params.speed * deltaTime * 1000;
            
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