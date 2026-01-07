/**
 * Screenshot Utility
 * Professional screenshot system with multiple resolution and format options
 */

export class ScreenshotManager {
    constructor(renderer, scene, camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        
        // Screenshot settings
        this.settings = {
            transparent: false,
            format: 'png', // png, jpg, webp
            quality: 1.0, // 0.0 to 1.0 for jpg/webp
            filename: 'screenshot',
            resolution: '1920x1080',
            customWidth: 1920,
            customHeight: 1080,
            useCustom: false,
            addTimestamp: true
        };
        
        // Resolution presets
        this.resolutionPresets = {
            '1920x1080': { width: 1920, height: 1080, name: 'Full HD (1920×1080)' },
            '2560x1440': { width: 2560, height: 1440, name: '2K QHD (2560×1440)' },
            '3840x2160': { width: 3840, height: 2160, name: '4K UHD (3840×2160)' },
            '1280x720': { width: 1280, height: 720, name: 'HD (1280×720)' },
            '1366x768': { width: 1366, height: 768, name: 'WXGA (1366×768)' },
            '1600x900': { width: 1600, height: 900, name: 'HD+ (1600×900)' },
            '2048x1080': { width: 2048, height: 1080, name: 'Cinema 2K (2048×1080)' },
            '4096x2160': { width: 4096, height: 2160, name: 'Cinema 4K (4096×2160)' },
            '1080x1080': { width: 1080, height: 1080, name: 'Square Instagram (1080×1080)' },
            '1080x1920': { width: 1080, height: 1920, name: 'Vertical Story (1080×1920)' },
            'custom': { width: 1920, height: 1080, name: 'Custom Dimensions' }
        };
    }

    /**
     * Take a screenshot with current settings
     */
    async takeScreenshot() {
        const resolution = this.getCurrentResolution();
        const { width, height } = resolution;
        
        try {
            // Store original renderer settings
            const originalSize = this.renderer.getSize(new THREE.Vector2());
            const originalPixelRatio = this.renderer.getPixelRatio();
            const originalAlpha = this.renderer.getClearAlpha();
            const originalClearColor = this.renderer.getClearColor(new THREE.Color());
            const originalPreserveDrawingBuffer = this.renderer.preserveDrawingBuffer;
            
            // Create temporary canvas for high-res rendering
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            
            // Create temporary renderer
            const tempRenderer = new THREE.WebGLRenderer({
                canvas: tempCanvas,
                antialias: true,
                preserveDrawingBuffer: true,
                alpha: this.settings.transparent
            });
            
            // Configure temporary renderer
            tempRenderer.setSize(width, height);
            tempRenderer.setPixelRatio(1); // Use 1:1 pixel ratio for consistent output
            tempRenderer.shadowMap.enabled = this.renderer.shadowMap.enabled;
            tempRenderer.shadowMap.type = this.renderer.shadowMap.type;
            tempRenderer.toneMapping = this.renderer.toneMapping;
            tempRenderer.toneMappingExposure = this.renderer.toneMappingExposure;
            
            if (this.settings.transparent) {
                tempRenderer.setClearColor(0x000000, 0);
            } else {
                tempRenderer.setClearColor(originalClearColor, originalAlpha);
            }
            
            // Update camera aspect ratio for the screenshot
            const originalAspect = this.camera.aspect;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            
            // Render the scene
            tempRenderer.render(this.scene, this.camera);
            
            // Generate filename
            const filename = this.generateFilename();
            
            // Convert to blob and download
            const blob = await this.canvasToBlob(tempCanvas);
            this.downloadBlob(blob, filename);
            
            // Cleanup
            tempRenderer.dispose();
            
            // Restore original camera settings
            this.camera.aspect = originalAspect;
            this.camera.updateProjectionMatrix();
            
            console.log(`📸 Screenshot saved: ${filename} (${width}×${height})`);
            
            return {
                success: true,
                filename,
                width,
                height,
                size: this.formatFileSize(blob.size)
            };
            
        } catch (error) {
            console.error('Screenshot failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get current resolution based on settings
     */
    getCurrentResolution() {
        if (this.settings.useCustom) {
            return {
                width: this.settings.customWidth,
                height: this.settings.customHeight
            };
        }
        
        const preset = this.resolutionPresets[this.settings.resolution];
        return {
            width: preset.width,
            height: preset.height
        };
    }

    /**
     * Generate filename with timestamp if enabled
     */
    generateFilename() {
        let filename = this.settings.filename || 'screenshot';
        
        if (this.settings.addTimestamp) {
            const now = new Date();
            const timestamp = now.toISOString()
                .replace(/[:.]/g, '-')
                .replace('T', '_')
                .slice(0, -5); // Remove milliseconds
            filename += '_' + timestamp;
        }
        
        const extension = this.settings.format;
        return `${filename}.${extension}`;
    }

    /**
     * Convert canvas to blob with format and quality settings
     */
    canvasToBlob(canvas) {
        return new Promise((resolve) => {
            const mimeType = this.getMimeType();
            const quality = this.settings.format !== 'png' ? this.settings.quality : undefined;
            
            canvas.toBlob((blob) => {
                resolve(blob);
            }, mimeType, quality);
        });
    }

    /**
     * Get MIME type for current format
     */
    getMimeType() {
        switch (this.settings.format) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'webp':
                return 'image/webp';
            case 'png':
            default:
                return 'image/png';
        }
    }

    /**
     * Download blob as file
     */
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    /**
     * Format file size for display
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Get current settings for save/load
     */
    getSettings() {
        return { ...this.settings };
    }

    /**
     * Apply settings
     */
    applySettings(settings) {
        Object.assign(this.settings, settings);
    }

    /**
     * Get available resolution presets
     */
    getResolutionPresets() {
        return this.resolutionPresets;
    }

    /**
     * Set resolution preset
     */
    setResolution(key) {
        if (key === 'custom') {
            this.settings.useCustom = true;
        } else {
            this.settings.useCustom = false;
            this.settings.resolution = key;
        }
    }

    /**
     * Set custom dimensions
     */
    setCustomDimensions(width, height) {
        this.settings.customWidth = Math.max(1, Math.min(8192, width));
        this.settings.customHeight = Math.max(1, Math.min(8192, height));
    }

    /**
     * Quick screenshot with default settings
     */
    quickScreenshot() {
        return this.takeScreenshot();
    }

    /**
     * Screenshot with transparent background
     */
    transparentScreenshot() {
        const originalTransparent = this.settings.transparent;
        this.settings.transparent = true;
        
        return this.takeScreenshot().then(result => {
            this.settings.transparent = originalTransparent;
            return result;
        });
    }
}

export default ScreenshotManager;