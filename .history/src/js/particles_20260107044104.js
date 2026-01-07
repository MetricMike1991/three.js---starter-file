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
        
        // Connection system
        this.connections = null;
        this.connectionGeometry = null;
        this.connectionMaterial = null;
        this.connectionIndices = [];
        this.connectionAnimationOffset = 0;
        
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
            depthFocusRange: 1.0,
            // Connection system
            connectionsEnabled: true,
            connectionCount: 200,
            connectionDensity: 0.3,
            connectionDistance: 1.5,
            connectionOpacity: 0.15,
            connectionColor: '#ffffff',
            connectionPattern: 'random', // 'random', 'nearest', 'dna', 'chemical'
            connectionSpeed: 0.2,
            connectionWidth: 1
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
        
        // Create connections
        this.createConnections();
    }

    createConnections() {
        if (!this.params.connectionsEnabled) {
            if (this.connections) {
                this.scene.remove(this.connections);
                this.connectionGeometry?.dispose();
                this.connectionMaterial?.dispose();
                this.connections = null;
            }
            return;
        }

        // Dispose existing connections
        if (this.connections) {
            this.scene.remove(this.connections);
            this.connectionGeometry?.dispose();
            this.connectionMaterial?.dispose();
        }

        // Generate connection indices based on pattern
        this.generateConnectionPattern();
        
        if (this.connectionIndices.length === 0) return;

        // Create connection geometry
        this.connectionGeometry = new THREE.BufferGeometry();
        const connectionPositions = new Float32Array(this.connectionIndices.length * 6); // 2 points per connection, 3 coords each
        
        // Set initial positions
        this.updateConnectionPositions(connectionPositions);
        
        this.connectionGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));

        // Create connection material
        this.connectionMaterial = new THREE.LineBasicMaterial({
            color: this.params.connectionColor,
            opacity: this.params.connectionOpacity,
            transparent: true,
            linewidth: this.params.connectionWidth
        });

        // Create connections
        this.connections = new THREE.LineSegments(this.connectionGeometry, this.connectionMaterial);
        this.connections.visible = this.params.connectionsEnabled && this.params.visible;
        this.scene.add(this.connections);
    }

    generateConnectionPattern() {
        this.connectionIndices = [];
        const positions = this.dustPositions;
        
        switch (this.params.connectionPattern) {
            case 'random':
                this.generateRandomConnections();
                break;
            case 'nearest':
                this.generateNearestConnections();
                break;
            case 'dna':
                this.generateDNAConnections();
                break;
            case 'chemical':
                this.generateChemicalConnections();
                break;
            default:
                this.generateRandomConnections();
        }
    }

    generateRandomConnections() {
        const maxConnections = Math.min(this.params.connectionCount, this.params.count * this.params.connectionDensity);
        const usedPairs = new Set();
        
        for (let i = 0; i < maxConnections; i++) {
            const a = Math.floor(Math.random() * this.params.count);
            const b = Math.floor(Math.random() * this.params.count);
            
            if (a !== b) {
                const pair = a < b ? `${a}-${b}` : `${b}-${a}`;
                if (!usedPairs.has(pair)) {
                    const distance = this.getParticleDistance(a, b);
                    if (distance < this.params.connectionDistance) {
                        this.connectionIndices.push(a, b);
                        usedPairs.add(pair);
                    }
                }
            }
        }
    }

    generateNearestConnections() {
        const connectionsPerParticle = Math.ceil(this.params.connectionDensity * 5);
        
        for (let i = 0; i < this.params.count; i++) {
            const nearestParticles = this.findNearestParticles(i, connectionsPerParticle);
            for (const j of nearestParticles) {
                this.connectionIndices.push(i, j);
            }
        }
    }

    generateDNAConnections() {
        // Create helix-like patterns
        const helixConnections = Math.floor(this.params.count * this.params.connectionDensity);
        const helixTurns = 3;
        
        for (let i = 0; i < helixConnections; i++) {
            const t = (i / helixConnections) * helixTurns * Math.PI * 2;
            const y = (i / helixConnections) * this.params.verticalRange;
            
            // Find particles near helix path
            const helixX = Math.cos(t) * this.params.horizontalRange * 0.5;
            const helixZ = Math.sin(t) * this.params.horizontalRange * 0.5;
            
            const particleA = this.findNearestParticleToPosition(helixX, y + this.params.verticalOffset, helixZ);
            const particleB = this.findNearestParticleToPosition(-helixX, y + this.params.verticalOffset, -helixZ);
            
            if (particleA !== -1 && particleB !== -1 && particleA !== particleB) {
                this.connectionIndices.push(particleA, particleB);
            }
        }
    }

    generateChemicalConnections() {
        // Create molecular bond-like patterns
        const bondLength = this.params.connectionDistance * 0.8;
        const usedParticles = new Set();
        
        for (let i = 0; i < this.params.count; i++) {
            if (usedParticles.has(i)) continue;
            
            const bondCount = Math.random() < this.params.connectionDensity ? 
                (Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3) : 0;
            
            if (bondCount > 0) {
                const nearestParticles = this.findNearestParticles(i, bondCount, bondLength);
                for (const j of nearestParticles) {
                    if (!usedParticles.has(j)) {
                        this.connectionIndices.push(i, j);
                        usedParticles.add(j);
                    }
                }
                usedParticles.add(i);
            }
        }
    }

    findNearestParticles(particleIndex, count, maxDistance = this.params.connectionDistance) {
        const distances = [];
        const px = this.dustPositions[particleIndex * 3];
        const py = this.dustPositions[particleIndex * 3 + 1];
        const pz = this.dustPositions[particleIndex * 3 + 2];
        
        for (let i = 0; i < this.params.count; i++) {
            if (i === particleIndex) continue;
            
            const distance = this.getParticleDistance(particleIndex, i);
            if (distance < maxDistance) {
                distances.push({ index: i, distance });
            }
        }
        
        distances.sort((a, b) => a.distance - b.distance);
        return distances.slice(0, count).map(d => d.index);
    }

    findNearestParticleToPosition(x, y, z) {
        let nearest = -1;
        let minDistance = Infinity;
        
        for (let i = 0; i < this.params.count; i++) {
            const dx = this.dustPositions[i * 3] - x;
            const dy = this.dustPositions[i * 3 + 1] - y;
            const dz = this.dustPositions[i * 3 + 2] - z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = i;
            }
        }
        
        return minDistance < this.params.connectionDistance ? nearest : -1;
    }

    getParticleDistance(indexA, indexB) {
        const ax = this.dustPositions[indexA * 3];
        const ay = this.dustPositions[indexA * 3 + 1];
        const az = this.dustPositions[indexA * 3 + 2];
        const bx = this.dustPositions[indexB * 3];
        const by = this.dustPositions[indexB * 3 + 1];
        const bz = this.dustPositions[indexB * 3 + 2];
        
        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    updateConnectionPositions(connectionPositions) {
        for (let i = 0; i < this.connectionIndices.length; i += 2) {
            const particleA = this.connectionIndices[i];
            const particleB = this.connectionIndices[i + 1];
            
            const posIndex = (i / 2) * 6;
            
            // Particle A position
            connectionPositions[posIndex] = this.dustPositions[particleA * 3];
            connectionPositions[posIndex + 1] = this.dustPositions[particleA * 3 + 1];
            connectionPositions[posIndex + 2] = this.dustPositions[particleA * 3 + 2];
            
            // Particle B position
            connectionPositions[posIndex + 3] = this.dustPositions[particleB * 3];
            connectionPositions[posIndex + 4] = this.dustPositions[particleB * 3 + 1];
            connectionPositions[posIndex + 5] = this.dustPositions[particleB * 3 + 2];
        }
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
        
        // Update connections
        this.updateConnections(deltaTime);
    }
    
    updateConnections(deltaTime) {
        if (!this.connections || !this.params.connectionsEnabled) return;
        
        // Animate connection opacity
        this.connectionAnimationOffset += deltaTime * this.params.connectionSpeed;
        
        const connectionPositions = this.connectionGeometry.attributes.position.array;
        this.updateConnectionPositions(connectionPositions);
        
        // Add subtle animation to connection opacity
        const animatedOpacity = this.params.connectionOpacity * (0.8 + 0.2 * Math.sin(this.connectionAnimationOffset));
        this.connectionMaterial.opacity = animatedOpacity;
        
        this.connectionGeometry.attributes.position.needsUpdate = true;
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

    // Connection control methods
    toggleConnections(enabled) {
        this.params.connectionsEnabled = enabled;
        if (this.connections) {
            this.connections.visible = enabled && this.params.visible;
        }
        if (enabled) {
            this.createConnections();
        }
    }

    updateConnectionCount(count) {
        this.params.connectionCount = count;
        this.createConnections();
    }

    updateConnectionDensity(density) {
        this.params.connectionDensity = density;
        this.createConnections();
    }

    updateConnectionDistance(distance) {
        this.params.connectionDistance = distance;
        this.createConnections();
    }

    updateConnectionOpacity(opacity) {
        this.params.connectionOpacity = opacity;
        if (this.connectionMaterial) {
            this.connectionMaterial.opacity = opacity;
        }
    }

    updateConnectionColor(color) {
        this.params.connectionColor = color;
        if (this.connectionMaterial) {
            this.connectionMaterial.color.set(color);
        }
    }

    updateConnectionPattern(pattern) {
        this.params.connectionPattern = pattern;
        this.createConnections();
    }

    updateConnectionSpeed(speed) {
        this.params.connectionSpeed = speed;
    }

    updateConnectionWidth(width) {
        this.params.connectionWidth = width;
        if (this.connectionMaterial) {
            this.connectionMaterial.linewidth = width;
        }
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
        if (this.connections) {
            this.connections.visible = visible && this.params.connectionsEnabled;
        }
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
        if (this.connections) {
            this.scene.remove(this.connections);
            this.connectionGeometry?.dispose();
            this.connectionMaterial?.dispose();
        }
    }
}

export default ParticleSystem;