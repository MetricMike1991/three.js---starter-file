/**
 * Geometry Particle System Module
 * Separate system for creating line connections between background particles
 */
import * as THREE from 'three';

class GeometryParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = null;
        this.particleGeometry = null;
        this.particleMaterial = null;
        this.particlePositions = null;
        this.particleVelocities = null;
        
        // Connection system
        this.connections = null;
        this.connectionGeometry = null;
        this.connectionMaterial = null;
        this.connectionIndices = [];
        this.connectionAnimationOffset = 0;
        
        // Default parameters
        this.params = {
            // Particle settings
            count: 300,
            size: 0.002,
            color: '#ffffff',
            opacity: 0.08,
            speed: 0.1,
            horizontalRange: 4,
            verticalRange: 3,
            verticalOffset: 0.5,
            visible: true,
            depthOffset: -1, // Background positioning
            
            // Connection system
            connectionsEnabled: true,
            connectionCount: 150,
            connectionDensity: 0.4,
            connectionDistance: 2.0,
            connectionOpacity: 0.06,
            connectionColor: '#ffffff',
            connectionPattern: 'random', // 'random', 'nearest', 'dna', 'chemical'
            connectionSpeed: 0.15,
            connectionWidth: 1
        };
        
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        // Dispose existing particles
        if (this.particles) {
            this.scene.remove(this.particles);
            this.particleGeometry?.dispose();
            this.particleMaterial?.dispose();
        }

        // Create geometry
        this.particleGeometry = new THREE.BufferGeometry();
        this.particlePositions = new Float32Array(this.params.count * 3);
        this.particleVelocities = new Float32Array(this.params.count * 3);

        // Initialize particle positions and velocities
        for (let i = 0; i < this.params.count; i++) {
            const i3 = i * 3;
            
            // Random positions within range
            this.particlePositions[i3] = (Math.random() - 0.5) * this.params.horizontalRange * 2;
            this.particlePositions[i3 + 1] = Math.random() * this.params.verticalRange + this.params.verticalOffset;
            this.particlePositions[i3 + 2] = (Math.random() - 0.5) * this.params.horizontalRange * 2 + this.params.depthOffset;
            
            // Random velocities (slower than main particles)
            this.particleVelocities[i3] = (Math.random() - 0.5) * 0.0005;
            this.particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.0003;
            this.particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.0005;
        }

        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

        // Create material (more subtle than main particles)
        this.particleMaterial = new THREE.PointsMaterial({
            color: this.params.color,
            size: this.params.size,
            transparent: true,
            opacity: this.params.opacity,
            sizeAttenuation: true,
            alphaTest: 0.01
        });

        // Create particles
        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial);
        this.particles.visible = this.params.visible;
        this.particles.renderOrder = -1; // Render behind main particles
        this.scene.add(this.particles);
        
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

        // Generate connection indices
        this.generateConnectionPattern();
        
        if (this.connectionIndices.length === 0) return;

        // Create connection geometry
        this.connectionGeometry = new THREE.BufferGeometry();
        const connectionPositions = new Float32Array(this.connectionIndices.length * 6);
        
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
        this.connections.renderOrder = -1; // Render behind main particles
        this.scene.add(this.connections);
    }

    generateConnectionPattern() {
        this.connectionIndices = [];
        
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
        const connectionsPerParticle = Math.ceil(this.params.connectionDensity * 4);
        
        for (let i = 0; i < this.params.count; i++) {
            const nearestParticles = this.findNearestParticles(i, connectionsPerParticle);
            for (const j of nearestParticles) {
                this.connectionIndices.push(i, j);
            }
        }
    }

    generateDNAConnections() {
        const helixConnections = Math.floor(this.params.count * this.params.connectionDensity);
        const helixTurns = 2;
        
        for (let i = 0; i < helixConnections; i++) {
            const t = (i / helixConnections) * helixTurns * Math.PI * 2;
            const y = (i / helixConnections) * this.params.verticalRange;
            
            const helixX = Math.cos(t) * this.params.horizontalRange * 0.4;
            const helixZ = Math.sin(t) * this.params.horizontalRange * 0.4 + this.params.depthOffset;
            
            const particleA = this.findNearestParticleToPosition(helixX, y + this.params.verticalOffset, helixZ);
            const particleB = this.findNearestParticleToPosition(-helixX, y + this.params.verticalOffset, helixZ + 0.5);
            
            if (particleA !== -1 && particleB !== -1 && particleA !== particleB) {
                this.connectionIndices.push(particleA, particleB);
            }
        }
    }

    generateChemicalConnections() {
        const bondLength = this.params.connectionDistance * 0.7;
        const usedParticles = new Set();
        
        for (let i = 0; i < this.params.count; i++) {
            if (usedParticles.has(i)) continue;
            
            const bondCount = Math.random() < this.params.connectionDensity ? 
                (Math.random() < 0.8 ? 1 : Math.random() < 0.95 ? 2 : 3) : 0;
            
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
            const dx = this.particlePositions[i * 3] - x;
            const dy = this.particlePositions[i * 3 + 1] - y;
            const dz = this.particlePositions[i * 3 + 2] - z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = i;
            }
        }
        
        return minDistance < this.params.connectionDistance ? nearest : -1;
    }

    getParticleDistance(indexA, indexB) {
        const ax = this.particlePositions[indexA * 3];
        const ay = this.particlePositions[indexA * 3 + 1];
        const az = this.particlePositions[indexA * 3 + 2];
        const bx = this.particlePositions[indexB * 3];
        const by = this.particlePositions[indexB * 3 + 1];
        const bz = this.particlePositions[indexB * 3 + 2];
        
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
            connectionPositions[posIndex] = this.particlePositions[particleA * 3];
            connectionPositions[posIndex + 1] = this.particlePositions[particleA * 3 + 1];
            connectionPositions[posIndex + 2] = this.particlePositions[particleA * 3 + 2];
            
            // Particle B position
            connectionPositions[posIndex + 3] = this.particlePositions[particleB * 3];
            connectionPositions[posIndex + 4] = this.particlePositions[particleB * 3 + 1];
            connectionPositions[posIndex + 5] = this.particlePositions[particleB * 3 + 2];
        }
    }

    update(deltaTime) {
        if (!this.particles || !this.params.visible) return;

        const positions = this.particleGeometry.attributes.position.array;
        
        for (let i = 0; i < this.params.count; i++) {
            const i3 = i * 3;
            
            // Update positions with velocities
            positions[i3] += this.particleVelocities[i3] * this.params.speed * deltaTime * 1000;
            positions[i3 + 1] += this.particleVelocities[i3 + 1] * this.params.speed * deltaTime * 1000;
            positions[i3 + 2] += this.particleVelocities[i3 + 2] * this.params.speed * deltaTime * 1000;
            
            // Wrap around boundaries
            if (positions[i3] > this.params.horizontalRange) positions[i3] = -this.params.horizontalRange;
            if (positions[i3] < -this.params.horizontalRange) positions[i3] = this.params.horizontalRange;
            if (positions[i3 + 2] > this.params.horizontalRange + this.params.depthOffset) {
                positions[i3 + 2] = -this.params.horizontalRange + this.params.depthOffset;
            }
            if (positions[i3 + 2] < -this.params.horizontalRange + this.params.depthOffset) {
                positions[i3 + 2] = this.params.horizontalRange + this.params.depthOffset;
            }
            
            // Reset particles that fall too low or go too high
            if (positions[i3 + 1] < this.params.verticalOffset - 0.5 || 
                positions[i3 + 1] > this.params.verticalOffset + this.params.verticalRange + 0.5) {
                positions[i3 + 1] = Math.random() * this.params.verticalRange + this.params.verticalOffset;
            }
        }
        
        this.particleGeometry.attributes.position.needsUpdate = true;
        this.updateConnections(deltaTime);
    }
    
    updateConnections(deltaTime) {
        if (!this.connections || !this.params.connectionsEnabled) return;
        
        this.connectionAnimationOffset += deltaTime * this.params.connectionSpeed;
        
        const connectionPositions = this.connectionGeometry.attributes.position.array;
        this.updateConnectionPositions(connectionPositions);
        
        // Subtle animation
        const animatedOpacity = this.params.connectionOpacity * (0.7 + 0.3 * Math.sin(this.connectionAnimationOffset));
        this.connectionMaterial.opacity = animatedOpacity;
        
        this.connectionGeometry.attributes.position.needsUpdate = true;
    }

    // Control methods
    setVisible(visible) {
        this.params.visible = visible;
        if (this.particles) this.particles.visible = visible;
        if (this.connections) this.connections.visible = visible && this.params.connectionsEnabled;
    }

    toggleConnections(enabled) {
        this.params.connectionsEnabled = enabled;
        if (this.connections) this.connections.visible = enabled && this.params.visible;
        if (enabled) this.createConnections();
    }

    updateConnectionPattern(pattern) {
        this.params.connectionPattern = pattern;
        this.createConnections();
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
        if (this.connectionMaterial) this.connectionMaterial.opacity = opacity;
    }

    updateConnectionColor(color) {
        this.params.connectionColor = color;
        if (this.connectionMaterial) this.connectionMaterial.color.set(color);
    }

    updateConnectionSpeed(speed) {
        this.params.connectionSpeed = speed;
    }

    updateParticleCount(count) {
        this.params.count = count;
        this.createParticles();
    }

    updateParticleColor(color) {
        this.params.color = color;
        if (this.particleMaterial) this.particleMaterial.color.set(color);
    }

    updateParticleOpacity(opacity) {
        this.params.opacity = opacity;
        if (this.particleMaterial) this.particleMaterial.opacity = opacity;
    }

    updateParticleSize(size) {
        this.params.size = size;
        if (this.particleMaterial) this.particleMaterial.size = size;
    }

    updateSpeed(speed) {
        this.params.speed = speed;
    }

    // Apply settings from configuration
    applySettings(settings) {
        if (settings) {
            Object.assign(this.params, settings);
            this.createParticles();
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
        if (this.particles) {
            this.scene.remove(this.particles);
            this.particleGeometry?.dispose();
            this.particleMaterial?.dispose();
        }
        if (this.connections) {
            this.scene.remove(this.connections);
            this.connectionGeometry?.dispose();
            this.connectionMaterial?.dispose();
        }
    }
}

export default GeometryParticleSystem;