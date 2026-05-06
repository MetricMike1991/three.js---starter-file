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

// Cubic ease-in-out: slow start, full speed at midpoint, slow end
const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const getSupportedVideoMimeType = () => {
    if (typeof MediaRecorder === 'undefined') return '';

    const types = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
    ];

    return types.find(type => MediaRecorder.isTypeSupported(type)) || '';
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
        // Frame cropping - when provided, adjusts camera to capture only what's in the frame
        frameWidth: null,
        frameHeight: null,
        containerWidth: null,
        containerHeight: null,
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
        
        // If frame dimensions are provided, adjust FOV to capture what's visible in the frame
        if (settings.frameWidth && settings.frameHeight && 
            settings.containerWidth && settings.containerHeight) {
            
            const containerAspect = settings.containerWidth / settings.containerHeight;
            const targetAspect = settings.width / settings.height;
            
            // Calculate how much of the view the frame covers
            // The frame is centered and scaled to fit 80% of the container while maintaining aspect ratio
            let frameWidthRatio, frameHeightRatio;
            
            if (targetAspect > containerAspect) {
                // Frame is width-limited
                frameWidthRatio = settings.frameWidth / settings.containerWidth;
                frameHeightRatio = settings.frameHeight / settings.containerHeight;
            } else {
                // Frame is height-limited
                frameWidthRatio = settings.frameWidth / settings.containerWidth;
                frameHeightRatio = settings.frameHeight / settings.containerHeight;
            }
            
            // The vertical extent of the frame relative to the container determines the FOV adjustment
            // If the frame is smaller than the container (which it usually is), we need to zoom in
            const fovScale = frameHeightRatio;
            
            // Adjust the FOV to capture only what's in the frame
            // Smaller frame = need to zoom in = smaller FOV
            const originalFov = camera.fov;
            tempCamera.fov = originalFov * fovScale;
            
            console.log(`📸 Frame crop: frame ${settings.frameWidth}x${settings.frameHeight}, ` +
                       `container ${settings.containerWidth}x${settings.containerHeight}, ` +
                       `fovScale: ${fovScale.toFixed(3)}, FOV: ${originalFov} -> ${tempCamera.fov.toFixed(1)}`);
        }
        
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

const recordTimelineVideo = async (renderer, scene, camera, animationPlayer, mixer, options = {}) => {
    const settings = {
        width: 1920,
        height: 1080,
        filename: 'video',
        fps: 30,
        quality: 'high',
        loops: 1,
        cameraAngles: [],
        videoBitsPerSecond: null,
        addTimestamp: true,
        frameWidth: null,
        frameHeight: null,
        containerWidth: null,
        containerHeight: null,
        showFloorShadow: null,
        ground: null,
        overlayLogoUrl: null,
        overlayExerciseName: null,
        ...options
    };

    if (typeof MediaRecorder === 'undefined') {
        return { success: false, error: 'Video recording is not supported in this browser.' };
    }

    if (!HTMLCanvasElement.prototype.captureStream) {
        return { success: false, error: 'Canvas video capture is not supported in this browser.' };
    }

    if (!animationPlayer?.currentAction || !mixer) {
        return { success: false, error: 'No animation is loaded to record.' };
    }

    const mimeType = getSupportedVideoMimeType();
    if (!mimeType) {
        return { success: false, error: 'WebM recording is not supported in this browser.' };
    }

    const action = animationPlayer.currentAction;
    const duration = animationPlayer.duration || action.getClip()?.duration || 0;
    if (!duration) {
        return { success: false, error: 'Animation duration is unavailable.' };
    }

    const loops = Math.max(1, Math.min(10, Math.floor(settings.loops) || 1));
    const totalDuration = duration * loops;

    const qualityMultipliers = {
        low: 0.12,
        high: 0.28,
        ultra: 0.45
    };
    const qualityMultiplier = qualityMultipliers[settings.quality] || qualityMultipliers.high;
    const videoBitsPerSecond = settings.videoBitsPerSecond || Math.round(settings.width * settings.height * settings.fps * qualityMultiplier);

    const canvas = document.createElement('canvas');
    canvas.width = settings.width;
    canvas.height = settings.height;

    // Pre-load overlay logo if needed
    let overlayLogoImg = null;
    if (settings.overlayLogoUrl) {
        try {
            overlayLogoImg = await new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
                img.src = settings.overlayLogoUrl;
            });
        } catch (_) { overlayLogoImg = null; }
    }

    const tempRenderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: false
    });

    tempRenderer.setSize(settings.width, settings.height);
    tempRenderer.setPixelRatio(1);
    tempRenderer.shadowMap.enabled = renderer.shadowMap.enabled;
    tempRenderer.shadowMap.type = renderer.shadowMap.type;
    tempRenderer.toneMapping = renderer.toneMapping;
    tempRenderer.toneMappingExposure = renderer.toneMappingExposure;

    const clearColor = renderer.getClearColor(new THREE.Color());
    const clearAlpha = renderer.getClearAlpha();
    tempRenderer.setClearColor(clearColor, clearAlpha);

    const tempCamera = camera.clone();
    tempCamera.aspect = settings.width / settings.height;

    let fovScale = 1;
    if (settings.frameWidth && settings.frameHeight && settings.containerWidth && settings.containerHeight) {
        fovScale = settings.frameHeight / settings.containerHeight;
        tempCamera.fov = camera.fov * fovScale;
    }
    tempCamera.updateProjectionMatrix();

    const originalTime = action.time;
    const originalPlaying = animationPlayer.isPlaying;
    const originalPaused = action.paused;
    const originalGroundVisible = settings.ground ? settings.ground.visible : null;
    const playbackSpeed = animationPlayer.playbackSpeed || 1;

    if (settings.ground && settings.showFloorShadow !== null) {
        settings.ground.visible = settings.showFloorShadow;
    }

    animationPlayer.isPlaying = false;
    action.paused = true;
    if (animationPlayer.updatePlayPauseIcon) {
        animationPlayer.updatePlayPauseIcon();
    }

    const stream = canvas.captureStream(settings.fps);
    const chunks = [];
    const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond
    });

    const stopped = new Promise((resolve, reject) => {
        recorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                chunks.push(event.data);
            }
        };
        recorder.onstop = resolve;
        recorder.onerror = () => reject(new Error('Video recorder failed.'));
    });

    let startTime = null;

    // Multi-angle setup: build segments as [...captured angles, angle[0] repeated]
    // Each segment is a hard cut — no transitions. Each slot can have its own loop count.
    const angles = settings.cameraAngles || [];
    const isMultiAngle = angles.length >= 2;

    // Build per-segment durations (per-slot loops override global)
    let segments = null;
    let segDurations = null;
    let segStarts = null;
    let effectiveTotalDuration;

    if (isMultiAngle) {
        // Append first angle at the end so the video loops back seamlessly
        segments = [...angles, angles[0]];
        segDurations = segments.map(a => duration * Math.max(1, a.loops || loops));
        segStarts = [];
        let t = 0;
        for (const d of segDurations) { segStarts.push(t); t += d; }
        effectiveTotalDuration = t;
    } else {
        const singleLoops = (angles.length === 1 && angles[0].loops) ? angles[0].loops : loops;
        effectiveTotalDuration = duration * singleLoops;
    }

    // Snap camera to first angle (or single angle) before first frame
    if (angles.length >= 1) {
        const a = angles[0];
        tempCamera.up.set(0, 1, 0);
        tempCamera.position.copy(a.position);
        tempCamera.fov = a.fov * fovScale;
        tempCamera.lookAt(a.target);
        tempCamera.updateProjectionMatrix();
    }

    const renderFrame = (timestamp) => {
        if (startTime === null) startTime = timestamp;

        const elapsedSeconds = ((timestamp - startTime) / 1000) * playbackSpeed;

        // Update camera: hard-cut to segment, then apply orbital pan if configured
        if (angles.length >= 1) {
            let a, segProgress;
            if (isMultiAngle && segments) {
                // Find current segment via cumulative start times
                let segIdx = segments.length - 1;
                for (let i = 0; i < segStarts.length - 1; i++) {
                    if (elapsedSeconds < segStarts[i + 1]) { segIdx = i; break; }
                }
                a = segments[segIdx];
                const segDur = segDurations[segIdx];
                const segStart = segStarts[segIdx];
                segProgress = segDur > 0 ? Math.min((elapsedSeconds - segStart) / segDur, 1) : 1;
            } else {
                a = angles[0];
                segProgress = effectiveTotalDuration > 0 ? Math.min(elapsedSeconds / effectiveTotalDuration, 1) : 1;
            }
            tempCamera.up.set(0, 1, 0);
            tempCamera.fov = a.fov * fovScale;
            if (a.panDegrees && a.panDegrees > 0) {
                const panRad = THREE.MathUtils.degToRad(a.panDegrees * (a.panDirection || 1) * easeInOut(segProgress));
                const offset = a.position.clone().sub(a.target);
                offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), panRad);
                tempCamera.position.copy(a.target).add(offset);
            } else {
                tempCamera.position.copy(a.position);
            }
            tempCamera.lookAt(a.target);
            tempCamera.updateProjectionMatrix();
        }

        const animationTime = elapsedSeconds < effectiveTotalDuration
            ? (elapsedSeconds % duration)
            : duration;

        action.time = animationTime;
        mixer.update(0);
        animationPlayer.currentTime = animationTime;
        animationPlayer.updateTimeDisplay();
        animationPlayer.updateSliderPosition();
        tempRenderer.render(scene, tempCamera);

        // Draw 2D overlays on top of the WebGL frame
        if (overlayLogoImg || settings.overlayExerciseName) {
            const ctx = canvas.getContext('2d');
            const W = settings.width;
            const H = settings.height;
            const pad = Math.round(W * 0.025);

            if (overlayLogoImg) {
                const maxW = Math.round(W * 0.15);
                const scale = Math.min(maxW / overlayLogoImg.naturalWidth, maxW / overlayLogoImg.naturalHeight, 1);
                const lw = Math.round(overlayLogoImg.naturalWidth * scale);
                const lh = Math.round(overlayLogoImg.naturalHeight * scale);
                // Subtle dark shadow for legibility on any background
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.55)';
                ctx.shadowBlur = Math.round(W * 0.008);
                ctx.drawImage(overlayLogoImg, pad, pad, lw, lh);
                ctx.restore();
            }

            if (settings.overlayExerciseName) {
                const fontSize = Math.round(H * 0.038);
                ctx.save();
                ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                const text = settings.overlayExerciseName;
                const tw = ctx.measureText(text).width;
                const tx = W / 2;
                const ty = pad;
                // Pill background
                const pillPad = Math.round(fontSize * 0.35);
                const pillH = fontSize + pillPad * 2;
                const pillW = tw + pillPad * 3;
                const pillX = tx - pillW / 2;
                ctx.fillStyle = 'rgba(0,0,0,0.45)';
                const r = pillH / 2;
                ctx.beginPath();
                ctx.moveTo(pillX + r, ty - pillPad);
                ctx.arcTo(pillX + pillW, ty - pillPad, pillX + pillW, ty - pillPad + pillH, r);
                ctx.arcTo(pillX + pillW, ty - pillPad + pillH, pillX, ty - pillPad + pillH, r);
                ctx.arcTo(pillX, ty - pillPad + pillH, pillX, ty - pillPad, r);
                ctx.arcTo(pillX, ty - pillPad, pillX + pillW, ty - pillPad, r);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(0,0,0,0.6)';
                ctx.shadowBlur = Math.round(fontSize * 0.2);
                ctx.fillText(text, tx, ty);
                ctx.restore();
            }
        }

        if (elapsedSeconds < effectiveTotalDuration) {
            requestAnimationFrame(renderFrame);
        } else {
            recorder.stop();
        }
    };

    try {
        action.reset();
        action.play();
        action.paused = true;
        action.time = 0;
        mixer.update(0);
        tempRenderer.render(scene, tempCamera);

        recorder.start();
        requestAnimationFrame(renderFrame);
        await stopped;

        let filename = settings.filename;
        if (settings.addTimestamp) {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
            filename += '_' + timestamp;
        }
        filename += '.webm';

        const blob = new Blob(chunks, { type: mimeType });
        downloadBlob(blob, filename);

        const fileSize = formatFileSize(blob.size);
        console.log(`🎥 Video saved: ${filename} (${settings.width}×${settings.height}, ${fileSize}, ${Math.round(videoBitsPerSecond / 1000000)} Mbps)`);

        return { success: true, filename, size: fileSize, bitrate: videoBitsPerSecond };
    } catch (error) {
        console.error('Video recording failed:', error);
        return { success: false, error: error.message };
    } finally {
        action.time = originalTime;
        action.paused = originalPaused;
        animationPlayer.currentTime = originalTime;
        animationPlayer.isPlaying = originalPlaying;

        if (originalPlaying) {
            action.play();
            action.paused = false;
        }

        mixer.update(0);
        animationPlayer.updateTimeDisplay();
        animationPlayer.updateSliderPosition();
        if (animationPlayer.updatePlayPauseIcon) {
            animationPlayer.updatePlayPauseIcon();
        }

        if (settings.ground && originalGroundVisible !== null) {
            settings.ground.visible = originalGroundVisible;
        }

        stream.getTracks().forEach(track => track.stop());
        tempRenderer.dispose();
    }
};

export const ScreenshotUtils = {
    // Main screenshot function
    takeScreenshot,

    // Record one full animation play-through as WebM
    recordTimelineVideo,

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