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
     * The logo stays fixed in camera view (like a HUD element)
     * @param {Object} params - Logo parameters
     * @param {string} params.url - Logo image URL
     * @param {number} params.size - Size of logo in scene units (default: 2)
     * @param {number} params.opacity - Opacity 0-1 (default: 0.15)
     * @param {THREE.Camera} params.camera - The camera to attach the logo to
     */
    updateBackgroundLogo(params) {
        console.log('[SceneManager] updateBackgroundLogo called with:', params);
        
        // Remove existing logo sprite if any
        if (this.bgLogoSprite) {
            console.log('[SceneManager] Removing existing logo sprite');
            // Remove from wherever it was attached (camera or scene)
            if (this.bgLogoSprite.parent) {
                this.bgLogoSprite.parent.remove(this.bgLogoSprite);
            }
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
        
        // Store camera reference for attaching sprite
        const camera = params.camera;
        if (!camera) {
            console.error('[SceneManager] No camera provided for background logo');
            return;
        }

        console.log('[SceneManager] Loading background logo texture from:', params.url);
        
        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = 'anonymous';
        
        textureLoader.load(params.url, (texture) => {
            console.log('[SceneManager] Texture loaded successfully!');
            console.log('[SceneManager] Texture image dimensions:', texture.image.width, 'x', texture.image.height);
            
            const aspect = texture.image.width / texture.image.height;
            console.log('[SceneManager] Calculated aspect ratio:', aspect);
            
            // Create sprite material
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: params.opacity || 0.15,
                depthTest: false,
                depthWrite: false,
                sizeAttenuation: false // Size in screen units
            });
            
            console.log('[SceneManager] Created SpriteMaterial with opacity:', params.opacity);

            // Create sprite
            this.bgLogoSprite = new THREE.Sprite(material);
            
            // With sizeAttenuation=false, scale is in clip/screen space
            // Values around 0.5-1.0 are visible on screen
            const baseSize = params.size || 2;
            const size = baseSize * 0.2; // Convert to reasonable screen size
            this.bgLogoSprite.scale.set(size * aspect, size, 1);
            console.log('[SceneManager] Sprite scale set to:', size * aspect, size, 1);
            
            // Position in front of camera (negative Z in camera's local space)
            // With sizeAttenuation=false, the Z distance affects clipping but not size
            const yOffset = (params.yPosition !== undefined ? params.yPosition : 1.5) * 0.1;
            this.bgLogoSprite.position.set(0, yOffset, -1); // Close to camera
            console.log('[SceneManager] Sprite local position (camera space):', 0, yOffset, -1);
            
            // Render behind everything else
            this.bgLogoSprite.renderOrder = -1000;
            
            // ADD TO CAMERA (not scene) - this makes it follow the camera
            camera.add(this.bgLogoSprite);
            
            console.log('[SceneManager] Sprite added as child of camera');
            console.log('[SceneManager] Background logo watermark added:', params.url);
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