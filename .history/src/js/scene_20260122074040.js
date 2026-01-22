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
    }
}

export default SceneManager;