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
        const width = 512, height = 512;
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