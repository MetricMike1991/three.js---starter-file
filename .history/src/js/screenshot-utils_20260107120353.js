/**
 * Simple Screenshot Utility
 * Lightweight screenshot functionality that won't break the app
 */

import * as THREE from 'three';

// Helper functions
const canvasToBlob = (canvas, format, quality) => {
    return new Promise((resolve) => {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 
                       format === 'webp' ? 'image/webp' : 'image/png';
        const qualityValue = format === 'png' ? undefined : quality;
        canvas.toBlob(resolve, mimeType, qualityValue);
    });
};

const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Camera flash effect
const showCameraFlash = () => {
    const flash = document.createElement('div');
    flash.className = 'camera-flash';
    document.body.appendChild(flash);
    
    // Remove flash element after animation completes
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 300);
};

// Main screenshot function
const takeScreenshot = async (renderer, scene, camera, options = {}) => {
    const settings = {
        transparent: false,
        format: 'png',
        quality: 1.0,
        filename: 'screenshot',
        width: 1920,
        height: 1080,
        addTimestamp: true,
        ...options
    };

    try {
        console.log('Taking screenshot with settings:', settings);
        
        // Show camera flash effect
        showCameraFlash();

        // Store original settings
        const originalSize = renderer.getSize(new THREE.Vector2());
        const originalAspect = camera.aspect;

        // Create temporary canvas
        const canvas = document.createElement('canvas');
        canvas.width = settings.width;
        canvas.height = settings.height;

        // Create temporary renderer
        const tempRenderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: settings.transparent
        });

        // Configure renderer
        tempRenderer.setSize(settings.width, settings.height);
        tempRenderer.setPixelRatio(1);
        tempRenderer.shadowMap.enabled = renderer.shadowMap.enabled;
        tempRenderer.shadowMap.type = renderer.shadowMap.type;
        tempRenderer.toneMapping = renderer.toneMapping;
        tempRenderer.toneMappingExposure = renderer.toneMappingExposure;

        if (settings.transparent) {
            tempRenderer.setClearColor(0x000000, 0);
        } else {
            const clearColor = renderer.getClearColor(new THREE.Color());
            const clearAlpha = renderer.getClearAlpha();
            tempRenderer.setClearColor(clearColor, clearAlpha);
        }

        // Create a temporary camera clone instead of modifying the original
        const tempCamera = camera.clone();
        tempCamera.aspect = settings.width / settings.height;
        tempCamera.updateProjectionMatrix();

        // Store original scene background for transparent screenshots
        let originalBackground = null;
        if (settings.transparent && scene.background) {
            originalBackground = scene.background;
            scene.background = null;
        }

        // Render with the temporary camera (original camera unchanged)
        tempRenderer.render(scene, tempCamera);

        // Restore original scene background
        if (originalBackground !== null) {
            scene.background = originalBackground;
        }

        // Generate filename
        let filename = settings.filename;
        if (settings.addTimestamp) {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
            filename += '_' + timestamp;
        }
        filename += '.' + settings.format;

        // Convert to blob and download
        const blob = await canvasToBlob(canvas, settings.format, settings.quality);
        downloadBlob(blob, filename);

        // Cleanup
        tempRenderer.dispose();

        const fileSize = formatFileSize(blob.size);
        console.log(`📸 Screenshot saved: ${filename} (${settings.width}×${settings.height}, ${fileSize})`);

        return { success: true, filename, size: fileSize };
    } catch (error) {
        console.error('Screenshot failed:', error);
        return { success: false, error: error.message };
    }
};

export const ScreenshotUtils = {
    // Main screenshot function
    takeScreenshot,

    // Quick screenshot with defaults
    quickScreenshot: (renderer, scene, camera) => {
        return takeScreenshot(renderer, scene, camera);
    },

    // Transparent screenshot
    transparentScreenshot: (renderer, scene, camera) => {
        return takeScreenshot(renderer, scene, camera, { transparent: true });
    },

    // HD screenshot
    hdScreenshot: (renderer, scene, camera) => {
        return takeScreenshot(renderer, scene, camera, { width: 1280, height: 720 });
    },

    // 4K screenshot
    uhd4kScreenshot: (renderer, scene, camera) => {
        return takeScreenshot(renderer, scene, camera, { width: 3840, height: 2160 });
    },

    // Thumbnail screenshot
    thumbnailScreenshot: (renderer, scene, camera) => {
        return takeScreenshot(renderer, scene, camera, { 
            width: 400, 
            height: 300, 
            filename: 'thumbnail' 
        });
    }
};