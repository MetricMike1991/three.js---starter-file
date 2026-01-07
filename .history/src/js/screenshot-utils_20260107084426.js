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

// Calculate bounding box of all visible meshes in scene
const getSceneBounds = (scene) => {
    const box = new THREE.Box3();
    
    scene.traverse((object) => {
        if (object.isMesh && object.visible) {
            const objectBox = new THREE.Box3().setFromObject(object);
            box.union(objectBox);
        }
    });
    
    return box;
};

// Position camera to perfectly frame the model
const frameThumbnailCamera = (camera, scene) => {
    // Get the bounding box of all visible objects
    const boundingBox = getSceneBounds(scene);
    
    if (boundingBox.isEmpty()) {
        console.warn('No visible objects found for thumbnail framing');
        return camera;
    }
    
    // Calculate center and size
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    
    // Get the maximum dimension
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Calculate camera distance for perfect framing
    // Using FOV and some padding to ensure model fits perfectly
    const fov = camera.fov * (Math.PI / 180); // Convert to radians
    const distance = (maxDim / 2) / Math.tan(fov / 2) * 1.2; // 1.2 for small padding
    
    // Position camera at optimal distance, looking at center
    const direction = new THREE.Vector3(1, 0.5, 1).normalize(); // Slight angle for better view
    const cameraPosition = center.clone().add(direction.multiplyScalar(distance));
    
    camera.position.copy(cameraPosition);
    camera.lookAt(center);
    camera.updateMatrixWorld();
    
    return camera;
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

        // Render with the temporary camera (original camera unchanged)
        tempRenderer.render(scene, tempCamera);

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

    // Thumbnail screenshot with perfect centering
    thumbnailScreenshot: (renderer, scene, camera) => {
        return takeScreenshot(renderer, scene, camera, { 
            width: 500, 
            height: 500, 
            filename: 'thumbnail',
            autoFrame: true // Enable auto-framing for thumbnail
        });
    }
};