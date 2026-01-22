/**
 * Scene Management Module
 * Handles Three.js scene creation and basic setup
 */
import * as THREE from 'three';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.canvas = null;
        this.bgTexture = null;
        this.bgLogoSprite = null;
        this.init();
    }

    init() {
        this.canvas = document.querySelector('canvas.webgl');
        if (!this.canvas) {
            console.error('Canvas element with class "webgl" not found');
            return;
        }
    }

    // Background gradient management
    updateGradientBackground(params) {
        // Use higher resolution for smoother gradients
        const width = 2, height = 2048;
        const canvasBg = document.createElement('canvas');
        canvasBg.width = width;
        canvasBg.height = height;
        const ctx = canvasBg.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, params.gradientTop);
        gradient.addColorStop(1, params.gradientBottom);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = params.gradientAlpha;
        ctx.fillRect(0, 0, width, height);
        
        this.bgTexture = new THREE.CanvasTexture(canvasBg);
        // Enable linear filtering for smoother interpolation
        this.bgTexture.minFilter = THREE.LinearFilter;
        this.bgTexture.magFilter = THREE.LinearFilter;
        // Use LinearSRGBColorSpace to bypass tone mapping for backgrounds
        // This ensures white (#ffffff) stays white, not gray
        this.bgTexture.colorSpace = THREE.LinearSRGBColorSpace;
        this.scene.background = this.bgTexture;
        this.scene._originalBackgroundTexture = this.bgTexture;
    }

    /**
     * Add or update background logo watermark
     * @param {Object} params - Logo parameters
     * @param {string} params.url - Logo image URL
     * @param {number} params.size - Size of logo in scene units (default: 2)
     * @param {number} params.opacity - Opacity 0-1 (default: 0.15)
     * @param {number} params.yPosition - Y position offset (default: 1.5 for upper area)
     */
    updateBackgroundLogo(params) {
        // Remove existing logo sprite if any
        if (this.bgLogoSprite) {
            this.scene.remove(this.bgLogoSprite);
            if (this.bgLogoSprite.material.map) {
                this.bgLogoSprite.material.map.dispose();
            }
            this.bgLogoSprite.material.dispose();
            this.bgLogoSprite = null;
        }

        // If no URL or disabled, exit
        if (!params || !params.url || !params.enabled) {
            return;
        }

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(params.url, (texture) => {
            // Calculate aspect ratio
            const aspect = texture.image.width / texture.image.height;
            
            // Create sprite material with transparency
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: params.opacity || 0.15,
                depthTest: false, // Always render behind 3D objects
                depthWrite: false
            });

            // Create sprite
            this.bgLogoSprite = new THREE.Sprite(material);
            
            // Scale based on size param and aspect ratio
            const size = params.size || 2;
            this.bgLogoSprite.scale.set(size * aspect, size, 1);
            
            // Position in the background - far back on Z axis, upper area
            const yPos = params.yPosition !== undefined ? params.yPosition : 1.5;
            this.bgLogoSprite.position.set(0, yPos, -10);
            
            // Set render order to be behind everything
            this.bgLogoSprite.renderOrder = -1000;
            
            // Add to scene
            this.scene.add(this.bgLogoSprite);
            
            console.log('[SceneManager] Background logo watermark added:', params.url);
        }, undefined, (error) => {
            console.error('[SceneManager] Failed to load background logo:', error);
        });
    }

    /**
     * Remove background logo
     */
    removeBackgroundLogo() {
        if (this.bgLogoSprite) {
            this.scene.remove(this.bgLogoSprite);
            if (this.bgLogoSprite.material.map) {
                this.bgLogoSprite.material.map.dispose();
            }
            this.bgLogoSprite.material.dispose();
            this.bgLogoSprite = null;
        }
    }

    getScene() {
        return this.scene;
    }

    getCanvas() {
        return this.canvas;
    }

    // Cleanup
    dispose() {
        if (this.bgTexture) {
            this.bgTexture.dispose();
        }
        this.removeBackgroundLogo();
    }
}

export default SceneManager;