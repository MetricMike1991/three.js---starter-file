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
        console.log('[SceneManager] updateBackgroundLogo called with:', params);
        
        // Remove existing logo sprite if any
        if (this.bgLogoSprite) {
            console.log('[SceneManager] Removing existing logo sprite');
            this.scene.remove(this.bgLogoSprite);
            if (this.bgLogoSprite.material.map) {
                this.bgLogoSprite.material.map.dispose();
            }
            this.bgLogoSprite.material.dispose();
            this.bgLogoSprite = null;
        }

        // If no URL or disabled, exit
        if (!params || !params.url || !params.enabled) {
            console.log('[SceneManager] Background logo disabled or no URL');
            return;
        }

        console.log('[SceneManager] Loading background logo texture from:', params.url);
        
        const textureLoader = new THREE.TextureLoader();
        // Set crossOrigin to handle CORS for external URLs
        textureLoader.crossOrigin = 'anonymous';
        
        textureLoader.load(params.url, (texture) => {
            console.log('[SceneManager] Texture loaded successfully!');
            console.log('[SceneManager] Texture image dimensions:', texture.image.width, 'x', texture.image.height);
            
            // Calculate aspect ratio
            const aspect = texture.image.width / texture.image.height;
            console.log('[SceneManager] Calculated aspect ratio:', aspect);
            
            // Create sprite material with transparency
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: params.opacity || 0.15,
                depthTest: false,  // Don't test depth - always render
                depthWrite: false,
                sizeAttenuation: true
            });
            
            console.log('[SceneManager] Created SpriteMaterial with opacity:', params.opacity);

            // Create sprite
            this.bgLogoSprite = new THREE.Sprite(material);
            
            // Scale based on size param and aspect ratio - larger for visibility
            const size = params.size || 2;
            this.bgLogoSprite.scale.set(size * aspect, size, 1);
            console.log('[SceneManager] Sprite scale set to:', size * aspect, size, 1);
            
            // Position behind the model but still visible
            // Models are typically at origin (0,0,0), camera is at negative Z looking toward positive
            // So we need positive Z to be behind the model from camera's perspective
            const yPos = params.yPosition !== undefined ? params.yPosition : 0.5;
            this.bgLogoSprite.position.set(0, yPos, 2);
            console.log('[SceneManager] Sprite position set to:', 0, yPos, 2);
            
            // NEGATIVE render order = render FIRST (appears behind other objects)
            // This works with depthTest:false to make sprite appear behind model
            this.bgLogoSprite.renderOrder = -1000;
            
            // Add to scene
            this.scene.add(this.bgLogoSprite);
            
            // Verify sprite is in scene
            console.log('[SceneManager] Sprite added to scene. Scene children count:', this.scene.children.length);
            console.log('[SceneManager] Sprite visible:', this.bgLogoSprite.visible);
            console.log('[SceneManager] Sprite in scene children:', this.scene.children.includes(this.bgLogoSprite));
            console.log('[SceneManager] Sprite material opacity:', this.bgLogoSprite.material.opacity);
            console.log('[SceneManager] Sprite material visible:', this.bgLogoSprite.material.visible);
            
            console.log('[SceneManager] Background logo watermark added:', params.url, 'size:', size, 'opacity:', params.opacity, 'position:', this.bgLogoSprite.position);
        }, 
        (progress) => {
            console.log('[SceneManager] Texture loading progress:', progress);
        },
        (error) => {
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