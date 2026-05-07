/**
 * Three.js 3D Viewer - Main Application
 * Organized modular architecture for better maintainability
 */

const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__;
const BUILD_NUMBER = __BUILD_NUMBER__;
console.log('[FlexFrame Build] main.js v28.4 loaded - AR Support - Build #' + BUILD_NUMBER + ' - ' + BUILD_TIMESTAMP);

// Samsung Internet detection (user-agent contains "SamsungBrowser")
const IS_SAMSUNG_INTERNET = /SamsungBrowser/i.test(navigator.userAgent);
if (IS_SAMSUNG_INTERNET) console.log('📱 Samsung Internet detected');

// Keyboard shortcut to check build timestamp (Press 'L')
document.addEventListener('keydown', (e) => {
    if (e.key === 'l' || e.key === 'L') {
        // Don't trigger if typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        console.log('%c═══════════════════════════════════════════════════════', 'color: #4CAF50; font-weight: bold;');
        console.log('%c🔍 FLEXFRAME BUILD INFO', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
        console.log('%c═══════════════════════════════════════════════════════', 'color: #4CAF50; font-weight: bold;');
        console.log('%c📦 Version:', 'color: #2196F3; font-weight: bold;', 'v28.4 - AR Support');
        console.log('%c🔢 Build Number:', 'color: #2196F3; font-weight: bold;', '#' + BUILD_NUMBER);
        console.log('%c🕒 Build Timestamp:', 'color: #2196F3; font-weight: bold;', BUILD_TIMESTAMP);
        console.log('%c📅 Build Date:', 'color: #2196F3; font-weight: bold;', new Date(BUILD_TIMESTAMP).toLocaleString());
        console.log('%c⏱️  Time Ago:', 'color: #2196F3; font-weight: bold;', getTimeAgo(BUILD_TIMESTAMP));
        if (window.flexframeSettings && window.flexframeSettings.pluginUrl) {
            console.log('%c🔗 Plugin URL:', 'color: #2196F3; font-weight: bold;', window.flexframeSettings.pluginUrl);
            console.log('%c📂 Plugin Version:', 'color: #2196F3; font-weight: bold;', window.flexframeSettings.pluginVersion || 'N/A');
        }
        console.log('%c═══════════════════════════════════════════════════════', 'color: #4CAF50; font-weight: bold;');
    }
});

// Helper function to calculate time ago
function getTimeAgo(timestamp) {
    const now = new Date();
    const buildDate = new Date(timestamp);
    const diffMs = now - buildDate;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
}


// Helper function to resolve asset paths for WordPress plugin
export function getAssetUrl(path) {
    // Check if running in WordPress plugin context
    if (window.flexframeSettings && window.flexframeSettings.pluginUrl) {
        // If path starts with http:// or https://, it's a CDN URL - return as-is
        if (path.startsWith('http://') || path.startsWith('https://')) {
            // Upgrade any http:// to https:// to avoid mixed-content warnings
            return path.replace(/^http:\/\//, 'https://');
        }
        // For relative paths, prepend plugin URL (already HTTPS from PHP)
        const base = window.flexframeSettings.pluginUrl.replace(/^http:\/\//, 'https://');
        return base + 'assets/' + path;
    }
    // For standalone mode, use relative path
    return path;
}

// Import modules
import * as THREE from 'three';
import GUI from 'lil-gui';
import SceneManager from './js/scene.js';
import CameraManager from './js/camera.js';
import LightingSystem from './js/lighting.js';
import ParticleSystem from './js/particles.js';
import SettingsManager from './js/settings.js';
import AnimationPlayer from './js/animation-player.js';
import { ScreenshotUtils } from './js/screenshot-utils.js';
import { MultiThumbnailMenuSystem } from './js/multi-thumbnail-menu.js';
import { RightMenuSystem } from './js/right-menu-system.js';
import { arHandler } from './js/ar-handler.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ThemeEditor from './js/theme-editor.js';

/**
 * Application Class
 * Main application controller that orchestrates all systems
 */
class ThreeJSApp {
    constructor() {
        // Core systems
        this.sceneManager = null;
        this.cameraManager = null;
        this.lightingSystem = null;
        this.particleSystem = null;
        this.settingsManager = null;
        this.renderer = null;
        this.gui = null;

        // Application state
        this.sizes = { width: window.innerWidth, height: window.innerHeight };
        this.clock = new THREE.Clock();
        this.textureLoader = new THREE.TextureLoader();
        this.gltfLoader = new GLTFLoader();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // Model and animation
        this.mixer = null;
        this.allClickableMeshes = [];

        // Ground system
        this.ground = null;
        this.circleGeometry = null;
        this.planeGeometry = null;
        this.shadowGroundMaterial = null;
        this.solidGroundMaterial = null;
        this.useShadowMaterial = false;

        // Background parameters (Custom blue preset as default)
        this.backgroundParams = {
            gradientTop: '#3865ad',
            gradientBottom: '#0101bc',
            gradientAlpha: 1
        };

        // Ground parameters
        this.groundParams = {
            mode: 'Infinite Canvas',
            color: '#222222',
            roughness: 1,
            metalness: 0,
            shadowOpacity: 0.4,
            receiveShadow: true,
            castShadow: false,
            visible: true
        };

        // Animation Player Styling Parameters (using custom defaults)
        this.playerStyleParams = {
            // Background
            backgroundColor: '#1f1f1f',
            backgroundOpacity: 0,
            // Dimensions  
            playerWidth: 95, // percentage of screen width
            // Display options
            showTimeDisplay: true,
            // Button colors
            buttonColor: '#c20e1d',
            buttonOpacity: 1,
            // Timeline scrubber
            scrubberColor: '#c20e1d',
            scrubberOpacity: 0.7,
            // Text colors
            textColor: '#dedede',
            textOpacity: 1
        };

        // Loader parameters
        this.loaderParams = {
            spinnerStyle: 'cool'
        };

        this.init();
    }

    async init() {
        // Initialize core systems
        this.sceneManager = new SceneManager();
        this.cameraManager = new CameraManager(this.sceneManager.getCanvas(), this.sizes);
        this.lightingSystem = new LightingSystem(this.sceneManager.getScene());
        this.particleSystem = new ParticleSystem(this.sceneManager.getScene());
        this.settingsManager = new SettingsManager();
        this.animationPlayer = new AnimationPlayer();
        
        // Initialize Theme Editor (press T to open)
        this.themeEditor = new ThemeEditor(this);
        
        // Setup screenshot button callback
        this.setupScreenshotButton();
        
        // Setup AR branding from WordPress settings
        this.setupARBranding();
        
        // Setup quality toggle button after DOM is ready
        setTimeout(() => {
            this.setupQualityToggle();
        }, 100);
        
        // Initialize thumbnail menu
        console.log('🚀 CREATING MultiThumbnailMenuSystem...');
        this.multiThumbnailMenuSystem = new MultiThumbnailMenuSystem();
        console.log('✅ MultiThumbnailMenuSystem created:', this.multiThumbnailMenuSystem);
        
        // Initialize right side menu
        this.rightMenuSystem = new RightMenuSystem();
        
        // Make it globally accessible for information tab updates
        window.menuManager = this.multiThumbnailMenuSystem;
        console.log('✅ window.menuManager set:', window.menuManager);
        window.rightMenuManager = this.rightMenuSystem;
        
        // Setup mobile search close button
        this.setupMobileSearchCloseButton();
        
        // Setup mobile fullscreen button
        this.setupFullscreenButton();
        
        // Listen for thumbnail selection events
        document.addEventListener('thumbnailSelected', (e) => {
            console.log('Thumbnail selected:', e.detail.thumbnail);
            // Add your thumbnail selection logic here
        });
        
        // Listen for exercise selection to load config
        document.addEventListener('exercisesSelected', async (e) => {
            const exercise = e.detail.item;
            this.currentExerciseName = exercise.name;
            this.currentExerciseId = exercise.id || '';
            
            // Show "Add to Workout" button if workout page is configured
            this.showAddToWorkoutButton(exercise);
            
            // Update screenshot panel filename if it exists
            if (this.screenshotPanel) {
                const filenameInput = this.screenshotPanel.querySelector('#ss-filename');
                if (filenameInput) {
                    filenameInput.value = exercise.name;
                }
            }
            
            // ── Custom YouTube exercise ──
            if (exercise.source === 'custom' && exercise.youtubeUrl) {
                // Clean up any active 3D model before showing YouTube
                if (this.mixer) {
                    this.mixer.stopAllAction();
                    this.mixer = null;
                }
                if (window.model) {
                    this.sceneManager.getScene().remove(window.model);
                    window.model = null;
                }
                
                this.showYouTubeViewer(exercise.youtubeUrl, exercise.id, exercise.name);
                this.animationPlayer.setVisibility(false);
                
                // Hide or show right info menu based on showInfo setting
                if (exercise.showInfo && exercise.information && window.rightMenuManager) {
                    const info = exercise.information;
                    const sections = [];
                    if (info.step1) sections.push({ heading: 'Step 1', content: info.step1 });
                    if (info.step2) sections.push({ heading: 'Step 2', content: info.step2 });
                    if (info.step3) sections.push({ heading: 'Step 3', content: info.step3 });
                    if (info.step4) sections.push({ heading: 'Step 4', content: info.step4 });
                    
                    const rightMenuTabs = {
                        exerciseInformation: {
                            title: exercise.name,
                            sections: [{ heading: exercise.name, content: 'Custom exercise' }]
                        },
                        howToGuide: { title: 'How To', sections: sections },
                        setupGuide: { title: 'Tips', sections: [] },
                        alternativeExercises: { title: 'Alternatives', sections: [] }
                    };
                    window.rightMenuManager.updateFromConfig(rightMenuTabs, exercise);
                    // Ensure right menu container is visible
                    const rightContainer = document.querySelector('#flexframe-viewer-container .thumbnail-grid-container-right');
                    if (rightContainer) rightContainer.classList.remove('ffx-yt-hide');
                } else {
                    // Hide right info menu entirely when showInfo is off
                    const rightContainer = document.querySelector('#flexframe-viewer-container .thumbnail-grid-container-right');
                    if (rightContainer) rightContainer.classList.add('ffx-yt-hide');
                }
                return; // Skip 3D model loading
            }
            
            // ── Standard 3D exercise ── hide YouTube viewer if visible
            this.hideYouTubeViewer();
            // console.log('Exercise selected, loading config:', exercise.name);
            
            if (exercise.configUrl) {
                try {
                    // Add cache busting to force fresh config fetch
                    const cacheBuster = `?t=${Date.now()}`;
                    // Use getAssetUrl to resolve the config path correctly for WordPress
                    const resolvedConfigUrl = getAssetUrl(exercise.configUrl.replace('./', ''));
                    const configUrlWithCache = resolvedConfigUrl + cacheBuster;
                    const response = await fetch(configUrlWithCache);
                    if (!response.ok) throw new Error(`Config fetch failed: ${response.status}`);
                    const config = await response.json();
                    // console.log('Exercise config loaded:', config);
                    // console.log('📋 Config customTextures:', config.customTextures);
                    
                    // Store full config for quality switching
                    this.currentConfig = config;
                    
                    // Update AR handler with new config + thumbnail
                    arHandler.updateConfig(config, exercise.thumbnailUrl);
                    
                    // Store config temporarily to apply after model loads
                    this.pendingModelConfig = config.model;
                    
                    // Store model quality URLs
                    this.modelUrlSQ = config.modelUrl || config.modelUrlSQ;
                    this.modelUrlHQ = config.modelUrlHQ;
                    this.currentModelQuality = 'SQ';
                    this.isQualitySwitching = false; // Reset quality switch lock
                    this.isModelLoading = false; // Reset model loading lock
                    
                    // Update quality toggle button visibility
                    this.updateQualityButtonVisibility();
                    
                    // Load the 3D model if URL is provided
                    if (this.modelUrlSQ || this.modelUrlHQ) {
                        // If test model is active, override the model URL
                        const ws = window.flexframeSettings;
                        if (ws?.testModelUrl && ws?.testModelEnabled) {
                            console.log('🧪 [Model Tester] Overriding exercise model with test model');
                            this._isTestModel = true;
                            await this.loadModel(ws.testModelUrl);
                        } else if (ws?.embedHDModel && this.modelUrlHQ) {
                            // Embed mode: load HD model when requested
                            console.log('🎬 [Embed] Loading HD model');
                            this.currentModelQuality = 'HQ';
                            await this.loadModel(this.modelUrlHQ);
                        } else if (this.modelUrlSQ) {
                            await this.loadModel(this.modelUrlSQ);
                        } else {
                            // Fallback: no SD URL, load HD instead
                            console.log('[FlexFrame] No SD model URL, falling back to HD');
                            this.currentModelQuality = 'HQ';
                            await this.loadModel(this.modelUrlHQ);
                        }
                    }
                    
                    // Apply camera settings
                    if (config.camera) {
                        const camera = this.cameraManager.getCamera();
                        if (config.camera.position) {
                            camera.position.set(...config.camera.position);
                        }
                        if (config.camera.rotation) {
                            camera.rotation.set(...config.camera.rotation);
                        }
                        // Update controls target if provided
                        if (config.camera.target) {
                            this.cameraManager.getControls().target.set(...config.camera.target);
                        }
                        this.cameraManager.getControls().update();
                        
                        // Update original state so spacebar resets to this position
                        this.cameraManager.updateOriginalState(
                            config.camera.position,
                            config.camera.rotation,
                            config.camera.target
                        );
                    }
                    
                    // Override with embed camera position if provided
                    const ws = window.flexframeSettings;
                    if (ws?.embedCameraPosition) {
                        const cam = ws.embedCameraPosition;
                        const camera = this.cameraManager.getCamera();
                        const controls = this.cameraManager.getControls();
                        
                        if (cam.position) {
                            camera.position.set(cam.position.x, cam.position.y, cam.position.z);
                        }
                        if (cam.target) {
                            controls.target.set(cam.target.x, cam.target.y, cam.target.z);
                        }
                        controls.update();
                        
                        // Update original state so spacebar resets to embed camera position
                        this.cameraManager.updateOriginalState(
                            cam.position ? [cam.position.x, cam.position.y, cam.position.z] : null,
                            null,
                            cam.target ? [cam.target.x, cam.target.y, cam.target.z] : null
                        );
                        console.log('[FlexFrame Embed] Applied custom camera position:', cam);
                    }
                    
                    // Update right menu tabs with config data
                    if (config.rightMenuTabs && window.rightMenuManager) {
                        window.rightMenuManager.updateFromConfig(config.rightMenuTabs, exercise);
                    }
                } catch (error) {
                    console.error('Failed to load exercise config:', error);
                }
            }
        });
        
        // Make animation player visible from the start
        this.animationPlayer.setVisibility(true);
        
        // Apply WordPress UI settings if available
        this.applyWordPressUISettings();
        
        // Apply WordPress scene settings (background, lighting, particles)
        this.applyWordPressSceneSettings();
        
        // Apply initial player styling after short delay to ensure DOM is ready
        setTimeout(() => {
            this.initializePlayerStyling();
        }, 100);
        
        // Setup canvas click listener for showing animation player
        this.setupCanvasInteraction();
        
        // Screenshot manager disabled for now
        this.screenshotManager = null;
        
        // Set scene reference for camera raycasting
        this.cameraManager.setScene(this.sceneManager.getScene());

        // Make camera available globally for depth blur calculations
        window.camera = this.cameraManager.getCamera();
        // Make app instance available globally for GUI updates
        window.app = this;

        // Register managers with settings system
        this.settingsManager.registerManager('background', {
            getSettings: () => this.backgroundParams,
            applySettings: (settings) => {
                Object.assign(this.backgroundParams, settings);
                this.sceneManager.updateGradientBackground(this.backgroundParams);
            }
        });
        this.settingsManager.registerManager('ground', {
            getSettings: () => this.groundParams,
            applySettings: (settings) => this.applyGroundSettings(settings)
        });
        this.settingsManager.registerManager('camera', this.cameraManager);
        this.settingsManager.registerManager('lighting', this.lightingSystem);
        this.settingsManager.registerManager('dustParticles', this.particleSystem);
        this.settingsManager.registerManager('animationPlayer', this.animationPlayer);
        this.settingsManager.registerManager('multiThumbnailMenuSystem', this.multiThumbnailMenuSystem);
        this.settingsManager.registerManager('rightMenuSystem', this.rightMenuSystem);
        this.settingsManager.registerManager('playerStyling', {
            getSettings: () => this.playerStyleParams,
            applySettings: (settings) => {
                Object.assign(this.playerStyleParams, settings);
                // Apply all styling changes after loading settings
                setTimeout(() => {
                    this.initializePlayerStyling();
                    if (this.gui && typeof this.gui.updateDisplay === 'function') {
                        this.gui.updateDisplay();
                    }
                }, 200);
            }
        });

        this.settingsManager.registerManager('loader', {
            getSettings: () => this.loaderParams,
            applySettings: (settings) => {
                Object.assign(this.loaderParams, settings);
                this.updateLoaderSpinner();
            }
        });

        // Setup components
        this.setupRenderer();
        this.setupGround();
        this.setupGUI();
        // Don't load a default model - wait for user to select an exercise
        // this.loadModel();
        this.setupEventListeners();

        // In embed transparent background mode, hide particles and ground
        if (window.flexframeSettings?.embedTransparentBg === true) {
            this.particleSystem.params.visible = false;
            if (this.particleSystem.dustParticles) {
                this.particleSystem.dustParticles.visible = false;
            }
            if (this.ground) {
                this.ground.visible = false;
            }
        }

        // In embed mode, hide logo watermark when requested
        if (window.flexframeSettings?.embedHideWatermark === true) {
            const wmWrap = document.getElementById('flexframe-watermark-wrap');
            if (wmWrap) wmWrap.style.setProperty('display', 'none', 'important');
        }

        // In embed mode, hide particles when requested
        if (window.flexframeSettings?.embedHideParticles === true) {
            this.particleSystem.params.visible = false;
            if (this.particleSystem.dustParticles) {
                this.particleSystem.dustParticles.visible = false;
            }
        }

        // Apply initial background
        this.sceneManager.updateGradientBackground(this.backgroundParams);

        // Wait for default settings to load, then apply them
        await this.waitForDefaultSettings();
        this.settingsManager.applyDefaultSettings();
        
        // Apply WordPress scene settings AFTER default settings are applied
        // This ensures WordPress settings override the JSON defaults
        this.applyWordPressSceneSettings();
        
        // Update GUI to reflect default settings
        setTimeout(() => this.updateAllGUIControls(), 500);

        // Start render loop
        // Initialize animation player with visible state
        this.animationPlayer.setVisibility(true);
        
        // Check for exercise in URL and auto-select it
        this.checkUrlForExercise();
        
        // Check for test model from WordPress settings
        this.checkForTestModel();
        
        // Listen for postMessage requests from parent (embed customizer)
        this.setupPostMessageListener();
        
        this.animate();
    }
    
    /**
     * Setup postMessage listener for embed customizer communication
     * Allows the parent admin page to request camera position from the preview iframe
     */
    setupPostMessageListener() {
        window.addEventListener('message', (event) => {
            if (!event.data || !event.data.type) return;
            
            if (event.data.type === 'flexframe-get-camera') {
                // Return current camera position and target
                const camera = this.cameraManager.getCamera();
                const controls = this.cameraManager.getControls();
                
                const response = {
                    type: 'flexframe-camera-data',
                    position: {
                        x: parseFloat(camera.position.x.toFixed(4)),
                        y: parseFloat(camera.position.y.toFixed(4)),
                        z: parseFloat(camera.position.z.toFixed(4))
                    },
                    target: {
                        x: parseFloat(controls.target.x.toFixed(4)),
                        y: parseFloat(controls.target.y.toFixed(4)),
                        z: parseFloat(controls.target.z.toFixed(4))
                    }
                };
                
                // Send back to parent
                if (event.source) {
                    event.source.postMessage(response, '*');
                }
                console.log('[FlexFrame] Camera data sent to parent:', response);
            }
        });
    }
    
    /**
     * Check URL for exercise parameter and auto-select it
     * Supports multiple formats:
     * - Query param: ?exercise=sumo_deadlift or ?exercise=Sumo%20Deadlift
     * - Hash: #sumo_deadlift or #sumo-deadlift
     */
    checkUrlForExercise() {
        // Get exercise from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        let exerciseSlug = urlParams.get('exercise');
        
        // If not in query, check hash
        if (!exerciseSlug && window.location.hash) {
            exerciseSlug = window.location.hash.substring(1); // Remove the #
        }
        
        if (!exerciseSlug) return;
        
        console.log('🔗 URL exercise parameter found:', exerciseSlug);
        
        // Normalize the slug for matching (handle both underscores and hyphens)
        const normalizedSlug = exerciseSlug.toLowerCase()
            .replace(/-/g, '_')  // Convert hyphens to underscores
            .replace(/%20/g, '_') // Convert URL-encoded spaces to underscores
            .replace(/ /g, '_');  // Convert spaces to underscores
        
        // Wait for menu system to load exercises, then select
        this.waitForExercisesAndSelect(normalizedSlug, exerciseSlug);
    }
    
    async waitForExercisesAndSelect(normalizedSlug, originalSlug) {
        // Wait for menu manager to be available
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max
        
        while (attempts < maxAttempts) {
            const menuManager = window.menuManager;
            
            // Check if search menu has exercises loaded
            if (menuManager?.menus?.search?.allExercises?.length > 0) {
                const exercises = menuManager.menus.search.allExercises;
                
                // Find exercise by ID, name, or normalized name
                const exercise = exercises.find(ex => {
                    const exIdNorm = ex.id?.toLowerCase().replace(/-/g, '_');
                    const exNameNorm = ex.name?.toLowerCase().replace(/ /g, '_').replace(/-/g, '_');
                    
                    return exIdNorm === normalizedSlug || 
                           exNameNorm === normalizedSlug ||
                           ex.id?.toLowerCase() === originalSlug.toLowerCase() ||
                           ex.name?.toLowerCase() === originalSlug.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ');
                });
                
                if (exercise) {
                    console.log('✅ Found exercise from URL:', exercise.name);
                    
                    // Dispatch the exercise selection event (same as clicking a thumbnail)
                    const event = new CustomEvent('exercisesSelected', { 
                        detail: { item: exercise, menuType: 'url-preload' } 
                    });
                    document.dispatchEvent(event);
                    
                    // Also update the search menu's selected state if possible
                    if (menuManager.menus.search) {
                        menuManager.menus.search.selectedId = exercise.id;
                    }
                    
                    return;
                } else {
                    console.warn('⚠️ Exercise not found for URL slug:', originalSlug);
                    console.log('Available exercise IDs:', exercises.map(ex => ex.id).slice(0, 10));
                    return;
                }
            }
            
            // Wait 100ms before trying again
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.warn('⚠️ Timed out waiting for exercises to load for URL preload');
    }

    /**
     * Check if a test model URL is set from WordPress and load it
     */
    async checkForTestModel() {
        const ws = window.flexframeSettings;
        if (!ws?.testModelUrl || !ws?.testModelEnabled) return;
        
        console.log('🧪 [Model Tester] Test model URL detected:', ws.testModelUrl);
        
        // Mark the next load as a test model so the inspector shows
        this._isTestModel = true;
        this._testModelUrl = ws.testModelUrl;
        
        // Load the test model directly
        try {
            await this.loadModel(ws.testModelUrl);
        } catch (error) {
            console.error('🧪 [Model Tester] Failed to load test model:', error);
            this._isTestModel = false;
        }
    }

    /**
     * Show the Model Inspector panel with material analysis
     */
    showModelInspector(model, modelUrl) {
        console.log('[Model Inspector] Analyzing model...');
        
        // Collect all mesh and material data
        const meshes = [];
        const materialsMap = new Map();
        let totalVertices = 0;
        let totalTriangles = 0;
        
        // Known material names that get theme mapping
        const themeMappedNames = {
            'MUSCLE': { section: 'Preset Only' },
            'SKIN': { section: 'Skin Material' },
            'SKELETON': { section: 'Preset Only' },
            'BARBELL': { section: 'Barbell Material' },
            'BUMPER': { section: 'Bumper Plates' },
            'CABLE': { section: 'Cable Material' },
            'CHROME': { section: 'Chrome Material' },
            'COLOR_1': { section: 'Brand Color' },
            'COLOR1': { section: 'Brand Color' },
            'METAL': { section: 'Metal Material' },
            'PAD': { section: 'Pad / Cushion' },
            'PLASTIC': { section: 'Plastic Material' },
            'RUBBER': { section: 'Rubber Material' },
            'XCLOTHES': { section: 'HD Clothes (Primary Color)' },
            'AIBODYGIRL': { section: 'HD Body (Primary Color)' },
            'XMUSCLE': { section: 'HD Muscle (= MUSCLE)' },
            'XSKELETON': { section: 'HD Skeleton (= SKELETON)' },
            'XCOLOR': { section: 'HD Color (= COLOR_1)' },
            'XMETAL': { section: 'HD Metal (= METAL)' },
            'XRUBBER': { section: 'HD Rubber (= RUBBER)' },
            'XBUMPER': { section: 'HD Bumper (= BUMPER)' },
            'XCLEAR': { section: 'HD Clear (= SKIN transmission)' },
            'XBODY': { section: 'HD Body (depthWrite ON)' },
            'XPLASTIC': { section: 'HD Plastic (= PLASTIC)' },
            'XPAD': { section: 'HD Pad (= PAD)' },
            'XCABLE': { section: 'HD Cable (= CABLE)' },
            'XCHROME': { section: 'HD Chrome (= CHROME)' },
            'XBARBELL': { section: 'HD Barbell (= BARBELL)' },
            'LOGO': { section: 'Logo (Step 2)' }
        };
        
        model.traverse((child) => {
            if (child.isMesh) {
                const geo = child.geometry;
                const vCount = geo.attributes.position ? geo.attributes.position.count : 0;
                const tCount = geo.index ? geo.index.count / 3 : vCount / 3;
                totalVertices += vCount;
                totalTriangles += Math.floor(tCount);
                
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach(mat => {
                    if (mat) {
                        const name = mat.name || 'Unnamed';
                        if (!materialsMap.has(name)) {
                            materialsMap.set(name, {
                                material: mat,
                                meshCount: 0,
                                vertices: 0
                            });
                        }
                        const entry = materialsMap.get(name);
                        entry.meshCount++;
                        entry.vertices += vCount;
                    }
                });
                
                meshes.push({
                    name: child.name || 'Unnamed Mesh',
                    materialName: mats.map(m => m?.name || 'Unnamed').join(', '),
                    vertices: vCount,
                    triangles: Math.floor(tCount)
                });
            }
        });
        
        // Remove existing inspector if any
        const existing = document.getElementById('flexframe-model-inspector');
        if (existing) existing.remove();
        
        // Build the inspector panel
        const panel = document.createElement('div');
        panel.id = 'flexframe-model-inspector';
        panel.innerHTML = `
            <div class="fmi-header">
                <div class="fmi-title">
                    <span>Model Inspector</span>
                    <span class="fmi-badge">TEST MODE</span>
                </div>
                <div class="fmi-header-actions">
                    <button class="fmi-btn fmi-copy-btn" title="Copy report to clipboard">Copy</button>
                    <button class="fmi-btn fmi-minimize-btn" title="Minimize">−</button>
                    <button class="fmi-btn fmi-close-btn" title="Close">X</button>
                </div>
            </div>
            <div class="fmi-body">
                <div class="fmi-section">
                    <div class="fmi-section-title">Model Overview</div>
                    <div class="fmi-stats-grid">
                        <div class="fmi-stat">
                            <span class="fmi-stat-value">${meshes.length}</span>
                            <span class="fmi-stat-label">Meshes</span>
                        </div>
                        <div class="fmi-stat">
                            <span class="fmi-stat-value">${materialsMap.size}</span>
                            <span class="fmi-stat-label">Materials</span>
                        </div>
                        <div class="fmi-stat">
                            <span class="fmi-stat-value">${totalVertices.toLocaleString()}</span>
                            <span class="fmi-stat-label">Vertices</span>
                        </div>
                        <div class="fmi-stat">
                            <span class="fmi-stat-value">${totalTriangles.toLocaleString()}</span>
                            <span class="fmi-stat-label">Triangles</span>
                        </div>
                    </div>
                    <div class="fmi-url-row">
                        <span class="fmi-url-label">Source:</span>
                        <code class="fmi-url">${modelUrl}</code>
                    </div>
                </div>
                
                <div class="fmi-section">
                    <div class="fmi-section-title">Materials (${materialsMap.size})</div>
                    <div class="fmi-materials-list">
                        ${Array.from(materialsMap.entries()).map(([name, data]) => {
                            const upperName = name.toUpperCase();
                            const themeMatch = themeMappedNames[upperName];
                            const colorHex = data.material.color ? '#' + data.material.color.getHexString() : 'N/A';
                            const matType = data.material.type || 'Unknown';
                            
                            return `
                                <div class="fmi-material-card ${themeMatch ? 'fmi-mapped' : 'fmi-unmapped'}" data-material-name="${name}">
                                    <div class="fmi-mat-header">
                                        <div class="fmi-mat-name-row">
                                            <code class="fmi-mat-name">${name}</code>
                                            ${themeMatch ? `<span class="fmi-mat-badge fmi-badge-mapped">→ ${themeMatch.section}</span>` : '<span class="fmi-mat-badge fmi-badge-default">Default GLB</span>'}
                                        </div>
                                    </div>
                                    <div class="fmi-mat-details">
                                        <div class="fmi-mat-detail">
                                            <span class="fmi-color-swatch" style="background:${colorHex}"></span>
                                            <span>Color: ${colorHex}</span>
                                        </div>
                                        <span class="fmi-mat-detail">Type: ${matType.replace('Mesh', '').replace('Material', '')}</span>
                                        <span class="fmi-mat-detail">Meshes: ${data.meshCount}</span>
                                        <span class="fmi-mat-detail">Verts: ${data.vertices.toLocaleString()}</span>
                                        ${data.material.roughness !== undefined ? `<span class="fmi-mat-detail">Rough: ${data.material.roughness.toFixed(2)}</span>` : ''}
                                        ${data.material.metalness !== undefined ? `<span class="fmi-mat-detail">Metal: ${data.material.metalness.toFixed(2)}</span>` : ''}
                                        ${data.material.transmission ? `<span class="fmi-mat-detail">Trans: ${data.material.transmission.toFixed(2)}</span>` : ''}
                                        ${data.material.opacity < 1 ? `<span class="fmi-mat-detail">Opacity: ${data.material.opacity.toFixed(2)}</span>` : ''}
                                        ${data.material.map ? '<span class="fmi-mat-detail fmi-has-texture">ColorMap</span>' : ''}
                                        ${data.material.normalMap ? '<span class="fmi-mat-detail fmi-has-texture">NormalMap</span>' : ''}
                                        ${data.material.bumpMap ? '<span class="fmi-mat-detail fmi-has-texture">BumpMap</span>' : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="fmi-section fmi-meshes-section">
                    <div class="fmi-section-title fmi-meshes-toggle">Meshes (${meshes.length}) <span class="fmi-toggle-hint">click to expand</span></div>
                    <div class="fmi-meshes-list" style="display:none;">
                        ${meshes.map(m => `
                            <div class="fmi-mesh-row">
                                <span class="fmi-mesh-name">${m.name}</span>
                                <span class="fmi-mesh-mat">${m.materialName}</span>
                                <span class="fmi-mesh-stat">${m.vertices.toLocaleString()} v / ${m.triangles.toLocaleString()} t</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.id = 'flexframe-model-inspector-styles';
        style.textContent = `
            #flexframe-model-inspector {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 380px;
                max-height: 85vh;
                background: rgba(15, 15, 20, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(74, 158, 255, 0.3);
                border-radius: 12px;
                color: #e0e0e0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 12px;
                z-index: 10000;
                box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            #flexframe-model-inspector.fmi-minimized .fmi-body { display: none; }
            #flexframe-model-inspector.fmi-minimized { max-height: none; }
            
            .fmi-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 14px;
                background: rgba(74, 158, 255, 0.1);
                border-bottom: 1px solid rgba(74, 158, 255, 0.2);
                cursor: move;
                flex-shrink: 0;
            }
            .fmi-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
                font-size: 13px;
                color: #fff;
            }

            .fmi-badge {
                font-size: 9px;
                padding: 2px 6px;
                background: rgba(255, 165, 0, 0.2);
                color: #ffa500;
                border: 1px solid rgba(255, 165, 0, 0.3);
                border-radius: 4px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            .fmi-header-actions { display: flex; gap: 4px; }
            .fmi-btn {
                background: rgba(255,255,255,0.1);
                border: none;
                color: #999;
                min-width: 26px;
                height: 26px;
                padding: 0 6px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.15s;
            }
            .fmi-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
            
            .fmi-body {
                overflow-y: auto;
                padding: 0;
                flex: 1;
            }
            .fmi-body::-webkit-scrollbar { width: 6px; }
            .fmi-body::-webkit-scrollbar-track { background: transparent; }
            .fmi-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
            
            .fmi-section {
                padding: 12px 14px;
                border-bottom: 1px solid rgba(255,255,255,0.06);
            }
            .fmi-section:last-child { border-bottom: none; }
            .fmi-section-title {
                font-weight: 600;
                font-size: 12px;
                color: #aaa;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .fmi-stats-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
                margin-bottom: 10px;
            }
            .fmi-stat {
                text-align: center;
                padding: 8px 4px;
                background: rgba(255,255,255,0.04);
                border-radius: 8px;
                border: 1px solid rgba(255,255,255,0.06);
            }
            .fmi-stat-value {
                display: block;
                font-size: 16px;
                font-weight: 700;
                color: #4a9eff;
            }
            .fmi-stat-label {
                display: block;
                font-size: 10px;
                color: #777;
                margin-top: 2px;
            }
            .fmi-url-row {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 11px;
            }
            .fmi-url-label { color: #777; flex-shrink: 0; }
            .fmi-url {
                background: rgba(255,255,255,0.05);
                padding: 3px 8px;
                border-radius: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #888;
                font-size: 10px;
                flex: 1;
                min-width: 0;
            }
            
            .fmi-materials-list { display: flex; flex-direction: column; gap: 6px; }
            .fmi-material-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 8px;
                padding: 8px 10px;
                transition: border-color 0.15s, background 0.15s;
                cursor: pointer;
                user-select: none;
            }
            .fmi-material-card:hover {
                background: rgba(255,255,255,0.06);
            }
            .fmi-material-card.fmi-selected {
                background: rgba(74, 158, 255, 0.12);
                border-color: rgba(74, 158, 255, 0.6);
                box-shadow: 0 0 8px rgba(74, 158, 255, 0.15);
            }
            .fmi-material-card.fmi-mapped {
                border-left: 3px solid rgba(74, 158, 255, 0.5);
            }
            .fmi-material-card.fmi-unmapped {
                border-left: 3px solid rgba(255,255,255,0.1);
            }
            .fmi-mat-header { margin-bottom: 6px; }
            .fmi-mat-name-row {
                display: flex;
                align-items: center;
                gap: 6px;
                flex-wrap: wrap;
            }

            .fmi-mat-name {
                font-weight: 600;
                font-size: 12px;
                color: #fff;
                background: rgba(255,255,255,0.08);
                padding: 2px 8px;
                border-radius: 4px;
            }
            .fmi-mat-badge {
                font-size: 10px;
                padding: 1px 6px;
                border-radius: 4px;
                font-weight: 500;
            }
            .fmi-badge-mapped {
                background: rgba(74, 158, 255, 0.15);
                color: #4a9eff;
                border: 1px solid rgba(74, 158, 255, 0.25);
            }
            .fmi-badge-default {
                background: rgba(255,255,255,0.05);
                color: #666;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .fmi-mat-details {
                display: flex;
                flex-wrap: wrap;
                gap: 6px 10px;
            }
            .fmi-mat-detail {
                font-size: 11px;
                color: #888;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .fmi-has-texture { color: #6bc46b; }
            .fmi-color-swatch {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 3px;
                border: 1px solid rgba(255,255,255,0.2);
                flex-shrink: 0;
            }
            
            .fmi-meshes-toggle { cursor: pointer; }
            .fmi-meshes-toggle:hover { color: #ccc; }
            .fmi-toggle-hint { font-size: 10px; color: #555; font-weight: 400; text-transform: none; letter-spacing: 0; }
            .fmi-meshes-list { display: flex; flex-direction: column; gap: 2px; margin-top: 8px; }
            .fmi-mesh-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 8px;
                padding: 4px 8px;
                background: rgba(255,255,255,0.02);
                border-radius: 4px;
                font-size: 11px;
            }
            .fmi-mesh-name { color: #ccc; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .fmi-mesh-mat { color: #666; font-size: 10px; }
            .fmi-mesh-stat { color: #555; font-size: 10px; flex-shrink: 0; }
            
            @media (max-width: 500px) {
                #flexframe-model-inspector {
                    width: calc(100% - 20px);
                    top: 5px;
                    right: 10px;
                    max-height: 60vh;
                }
                .fmi-stats-grid { grid-template-columns: repeat(2, 1fr); }
            }
        `;
        
        // Remove old styles if any
        const oldStyle = document.getElementById('flexframe-model-inspector-styles');
        if (oldStyle) oldStyle.remove();
        
        document.head.appendChild(style);
        document.body.appendChild(panel);
        
        // Event handlers
        
        // --- Material highlight state ---
        let selectedMaterialName = null;
        const originalMaterialStates = new Map();
        
        // Store original material properties for every mesh
        model.traverse((child) => {
            if (child.isMesh) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach(mat => {
                    if (mat && !originalMaterialStates.has(mat)) {
                        originalMaterialStates.set(mat, {
                            emissive: mat.emissive ? mat.emissive.clone() : null,
                            opacity: mat.opacity,
                            transparent: mat.transparent,
                            depthWrite: mat.depthWrite
                        });
                    }
                });
            }
        });
        
        const restoreAllMaterials = () => {
            originalMaterialStates.forEach((orig, mat) => {
                if (orig.emissive) mat.emissive.copy(orig.emissive);
                mat.opacity = orig.opacity;
                mat.transparent = orig.transparent;
                mat.depthWrite = orig.depthWrite;
                mat.needsUpdate = true;
            });
        };
        
        const highlightMaterial = (materialName) => {
            // First restore everything
            restoreAllMaterials();
            
            if (materialName === selectedMaterialName) {
                // Deselect — already restored above
                selectedMaterialName = null;
                panel.querySelectorAll('.fmi-material-card').forEach(c => c.classList.remove('fmi-selected'));
                return;
            }
            
            selectedMaterialName = materialName;
            
            // Update card selection UI
            panel.querySelectorAll('.fmi-material-card').forEach(c => {
                c.classList.toggle('fmi-selected', c.dataset.materialName === materialName);
            });
            
            // Dim all materials, then brighten the selected one
            model.traverse((child) => {
                if (child.isMesh) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(mat => {
                        if (!mat) return;
                        const name = mat.name || 'Unnamed';
                        if (name === materialName) {
                            // Highlight: add emissive glow
                            if (mat.emissive) {
                                mat.emissive.setRGB(0.15, 0.35, 0.65);
                            }
                            mat.opacity = 1;
                            mat.transparent = false;
                            mat.depthWrite = true;
                        } else {
                            // Dim: make semi-transparent
                            mat.opacity = 0.15;
                            mat.transparent = true;
                            mat.depthWrite = false;
                        }
                        mat.needsUpdate = true;
                    });
                }
            });
        };
        
        // Add click handlers to material cards
        panel.querySelectorAll('.fmi-material-card').forEach(card => {
            card.addEventListener('click', () => {
                highlightMaterial(card.dataset.materialName);
            });
        });
        
        panel.querySelector('.fmi-close-btn').addEventListener('click', () => {
            restoreAllMaterials();
            panel.remove();
            style.remove();
        });
        
        panel.querySelector('.fmi-minimize-btn').addEventListener('click', () => {
            panel.classList.toggle('fmi-minimized');
            const btn = panel.querySelector('.fmi-minimize-btn');
            btn.textContent = panel.classList.contains('fmi-minimized') ? '+' : '−';
        });
        
        // Copy report
        panel.querySelector('.fmi-copy-btn').addEventListener('click', () => {
            let report = `MODEL INSPECTOR REPORT\n`;
            report += `======================\n`;
            report += `Source: ${modelUrl}\n`;
            report += `Meshes: ${meshes.length}\n`;
            report += `Materials: ${materialsMap.size}\n`;
            report += `Vertices: ${totalVertices.toLocaleString()}\n`;
            report += `Triangles: ${totalTriangles.toLocaleString()}\n\n`;
            report += `MATERIALS:\n`;
            report += `----------\n`;
            materialsMap.forEach((data, name) => {
                const upperName = name.toUpperCase();
                const themeMatch = themeMappedNames[upperName];
                const colorHex = data.material.color ? '#' + data.material.color.getHexString() : 'N/A';
                report += `• ${name}`;
                if (themeMatch) report += ` → ${themeMatch.section}`;
                else report += ` (default GLB)`;
                report += `\n  Color: ${colorHex} | Type: ${data.material.type} | Meshes: ${data.meshCount} | Verts: ${data.vertices.toLocaleString()}`;
                if (data.material.roughness !== undefined) report += ` | Rough: ${data.material.roughness.toFixed(2)}`;
                if (data.material.metalness !== undefined) report += ` | Metal: ${data.material.metalness.toFixed(2)}`;
                report += `\n`;
            });
            report += `\nMESHES:\n`;
            report += `-------\n`;
            meshes.forEach(m => {
                report += `• ${m.name} — ${m.materialName} (${m.vertices} v / ${m.triangles} t)\n`;
            });
            
            navigator.clipboard.writeText(report).then(() => {
                const btn = panel.querySelector('.fmi-copy-btn');
                btn.textContent = 'Done';
                setTimeout(() => btn.textContent = 'Copy', 1500);
            });
        });
        
        // Mesh list toggle
        panel.querySelector('.fmi-meshes-toggle').addEventListener('click', () => {
            const list = panel.querySelector('.fmi-meshes-list');
            const hint = panel.querySelector('.fmi-toggle-hint');
            if (list.style.display === 'none') {
                list.style.display = '';
                hint.textContent = 'click to collapse';
            } else {
                list.style.display = 'none';
                hint.textContent = 'click to expand';
            }
        });
        
        // Draggable header
        let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
        const header = panel.querySelector('.fmi-header');
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.fmi-btn')) return;
            isDragging = true;
            const rect = panel.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            panel.style.transition = 'none';
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            panel.style.left = (e.clientX - dragOffsetX) + 'px';
            panel.style.top = (e.clientY - dragOffsetY) + 'px';
            panel.style.right = 'auto';
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            panel.style.transition = '';
        });
        
        console.log('[Model Inspector] Panel created with', materialsMap.size, 'materials and', meshes.length, 'meshes');
    }

    async waitForDefaultSettings() {
        // Wait for settings manager to load default settings
        while (!this.settingsManager.getDefaultSettings()) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    setupRenderer() {
        const isTransparentEmbed = window.flexframeSettings?.embedTransparentBg === true;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.sceneManager.getCanvas(),
            antialias: true,
            alpha: isTransparentEmbed
        });
        if (isTransparentEmbed) {
            this.renderer.setClearColor(0x000000, 0);
        }
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
    }

    updateLoaderSpinner() {
        const loader = document.getElementById('model-loader');
        if (!loader) return;

        const ws = window.flexframeSettings || {};
        const useLogoLoader = ws.uiSettings?.useLogoLoader ?? false;
        const logoWrapper = loader.querySelector('.logo-loader-wrapper');
        const allSpinners = loader.querySelectorAll('.spinner-box');

        if (useLogoLoader && logoWrapper) {
            // Logo loader mode - hide all spinners, show logo
            allSpinners.forEach(spinner => spinner.style.display = 'none');
            logoWrapper.style.display = '';
        } else {
            // Spinner mode - hide logo, show selected spinner
            if (logoWrapper) logoWrapper.style.display = 'none';
            allSpinners.forEach(spinner => spinner.style.display = 'none');
            const selectedSpinner = loader.querySelector(`[data-spinner="${this.loaderParams.spinnerStyle}"]`);
            if (selectedSpinner) {
                selectedSpinner.style.display = 'flex';
            }
        }
    }

    updateLoadProgress(percent) {
        // Update progress bar and text
        const progressBar = document.getElementById('logo-progress-bar');
        const progressText = document.getElementById('logo-progress-text');
        
        if (percent === -1) {
            // Indeterminate progress - server didn't provide content length
            if (progressBar) {
                progressBar.style.width = '100%';
                progressBar.style.animation = 'indeterminateProgress 1.5s ease-in-out infinite';
            }
            if (progressText) {
                progressText.textContent = 'Loading...';
            }
        } else {
            // Determinate progress - accurate percentage
            if (progressBar) {
                progressBar.style.animation = 'none';
                progressBar.style.width = `${percent}%`;
            }
            if (progressText) {
                progressText.textContent = `${percent}%`;
            }
        }
    }

    applyWordPressUISettings() {
        // Check if WordPress UI settings are available
        if (!window.flexframeSettings || !window.flexframeSettings.uiSettings) {
            console.log('[FlexFrame UI] No WordPress UI settings found, using defaults');
            return;
        }
        
        const uiSettings = window.flexframeSettings.uiSettings;
        console.log('[FlexFrame UI] Applying WordPress UI settings:', uiSettings);
        
        // Apply player settings
        if (uiSettings.player) {
            // Apply always visible setting - but disable on mobile
            const isMobile = window.innerWidth <= 768;
            const alwaysVisible = isMobile ? false : (uiSettings.player.alwaysVisible === true);
            console.log('[FlexFrame UI] Player always visible setting:', alwaysVisible, 'isMobile:', isMobile);
            
            if (this.animationPlayer) {
                this.animationPlayer.setAlwaysVisible(alwaysVisible);
                console.log('[FlexFrame UI] Applied alwaysVisible to animation player');
            }
            
            // Override player style params with WordPress settings
            if (uiSettings.player.bgColor) {
                this.playerStyleParams.backgroundColor = uiSettings.player.bgColor;
            }
            if (uiSettings.player.bgOpacity !== undefined) {
                this.playerStyleParams.backgroundOpacity = uiSettings.player.bgOpacity;
            }
            if (uiSettings.player.buttonColor) {
                this.playerStyleParams.buttonColor = uiSettings.player.buttonColor;
            }
            if (uiSettings.player.accentColor) {
                this.playerStyleParams.scrubberColor = uiSettings.player.accentColor;
            }
        }
        
        // Apply spinner color - use primary color as the default
        const primaryColor = window.flexframeSettings?.primaryColor || '#4a9eff';
        const spinnerColor = uiSettings.spinnerColor || primaryColor;
        this.updateSpinnerColor(spinnerColor);
        
        // Always update progress bar with primary color (not spinner color)
        this.updateProgressBarColor(primaryColor);
        
        console.log('[FlexFrame UI] Spinner color:', spinnerColor, ', Progress bar color (primary):', primaryColor);
    }
    
    applyWordPressSceneSettings() {
        // Apply Background Settings from WordPress
        if (window.flexframeSettings?.backgroundSettings) {
            const bgSettings = window.flexframeSettings.backgroundSettings;
            console.log('[FlexFrame Scene] Applying WordPress background settings:', bgSettings);
            
            this.backgroundParams.gradientTop = bgSettings.gradientTop || '#3865ad';
            this.backgroundParams.gradientBottom = bgSettings.gradientBottom || '#0101bc';
            this.backgroundParams.gradientAlpha = bgSettings.gradientAlpha ?? 1;
            
            // Update the background
            if (this.sceneManager) {
                this.sceneManager.updateGradientBackground(this.backgroundParams);
            }
        }
        
        // Apply Lighting Settings from WordPress - directly set only defined properties
        if (window.flexframeSettings?.lightingSettings && this.lightingSystem) {
            const lightSettings = window.flexframeSettings.lightingSettings;
            console.log('[FlexFrame Scene] Applying WordPress lighting settings:', lightSettings);
            
            // Apply ambient light settings
            if (lightSettings.ambientLight) {
                if (lightSettings.ambientLight.intensity !== undefined) {
                    this.lightingSystem.ambientLight.intensity = lightSettings.ambientLight.intensity;
                }
                if (lightSettings.ambientLight.color) {
                    this.lightingSystem.ambientLight.color.set(lightSettings.ambientLight.color);
                }
            }
            
            // Apply directional light settings
            if (lightSettings.directionalLight) {
                if (lightSettings.directionalLight.intensity !== undefined) {
                    this.lightingSystem.directionalLight.intensity = lightSettings.directionalLight.intensity;
                }
                if (lightSettings.directionalLight.color) {
                    this.lightingSystem.directionalLight.color.set(lightSettings.directionalLight.color);
                }
                if (lightSettings.directionalLight.position) {
                    const pos = lightSettings.directionalLight.position;
                    if (pos.x !== undefined) this.lightingSystem.directionalLight.position.x = pos.x;
                    if (pos.y !== undefined) this.lightingSystem.directionalLight.position.y = pos.y;
                    if (pos.z !== undefined) this.lightingSystem.directionalLight.position.z = pos.z;
                }
            }
        }
        
        // Apply Particle Settings from WordPress
        if (window.flexframeSettings?.particleSettings && this.particleSystem) {
            const particleSettings = window.flexframeSettings.particleSettings;
            console.log('[FlexFrame Scene] Applying WordPress particle settings:', particleSettings);
            
            // Update particle parameters
            if (particleSettings.visible !== undefined) {
                this.particleSystem.params.visible = particleSettings.visible;
            }
            
            // Embed mode: force particles off if hideParticles or transparentBg is set
            const ws = window.flexframeSettings;
            if (ws?.embedHideParticles === true || ws?.embedTransparentBg === true) {
                this.particleSystem.params.visible = false;
            }
            if (particleSettings.count !== undefined) {
                this.particleSystem.params.count = particleSettings.count;
            }
            if (particleSettings.size !== undefined) {
                this.particleSystem.params.size = particleSettings.size;
            }
            
            // Use primary color for particles
            const primaryColor = window.flexframeSettings?.primaryColor;
            if (primaryColor) {
                this.particleSystem.params.color = primaryColor;
                console.log('[FlexFrame Scene] Using primary color for particles:', primaryColor);
            } else if (particleSettings.color) {
                this.particleSystem.params.color = particleSettings.color;
            }
            
            if (particleSettings.opacity !== undefined) {
                this.particleSystem.params.opacity = particleSettings.opacity;
            }
            if (particleSettings.speed !== undefined) {
                this.particleSystem.params.speed = particleSettings.speed;
            }
            
            // Recreate particles with new settings
            this.particleSystem.createDustParticles();
        }
    }
    
    updateSpinnerColor(color) {
        // Update CSS for all spinner types in the model-loader
        const style = document.createElement('style');
        style.id = 'flexframe-spinner-color';
        
        // Generate rgba versions for gradients
        const hexToRgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        
        style.textContent = `
            /* COOL SPINNER (original) */
            #model-loader .loader-spinner {
                background: conic-gradient(
                    from 0deg,
                    transparent 0%,
                    ${hexToRgba(color, 0.3)} 30%,
                    ${hexToRgba(color, 0.8)} 60%,
                    ${color} 80%,
                    ${color} 100%
                ) !important;
            }
            #model-loader .loader-spinner::before {
                box-shadow: inset 0 0 10px ${hexToRgba(color, 0.3)} !important;
            }
            
            /* GRADIENT SPINNER (circle-border) */
            #model-loader .circle-border {
                background: linear-gradient(0deg, ${hexToRgba(color, 0.1)} 33%, ${color} 100%) !important;
            }
            
            /* GRADIENT CIRCLE PLANES (leo-border) */
            #model-loader .leo-border-1 {
                background: linear-gradient(0deg, ${hexToRgba(color, 0.1)} 33%, ${color} 100%) !important;
            }
            #model-loader .leo-border-2 {
                background: linear-gradient(0deg, ${hexToRgba(color, 0.1)} 33%, ${color} 100%) !important;
            }
            
            /* SPINNING SQUARES (configure-border) */
            #model-loader .configure-border-1 {
                background: ${color} !important;
            }
            #model-loader .configure-border-2 {
                background: ${color} !important;
            }
            
            /* LOADING DOTS (pulse-bubble) */
            #model-loader .pulse-bubble {
                background-color: ${color} !important;
            }
            
            /* SOLAR SYSTEM (planets) */
            #model-loader .planet {
                background-color: ${color} !important;
            }
            #model-loader .sun {
                background-color: ${color} !important;
            }
            
            /* SPINNER ORBITS */
            #model-loader .blue-orbit {
                border-color: ${hexToRgba(color, 0.65)} !important;
            }
            #model-loader .green-orbit {
                border-color: ${hexToRgba(color, 0.65)} !important;
            }
            #model-loader .red-orbit {
                border-color: ${hexToRgba(color, 0.65)} !important;
            }
            
            /* THREE QUARTER SPINNER */
            #model-loader .three-quarter-spinner {
                border-color: ${color} !important;
                border-top-color: transparent !important;
            }
            
            /* Loader text color */
            #model-loader .loader-text {
                color: ${color} !important;
            }
        `;
        
        // Remove existing style if present
        const existing = document.getElementById('flexframe-spinner-color');
        if (existing) existing.remove();
        
        document.head.appendChild(style);
        console.log('[FlexFrame] Spinner color updated to:', color);
    }
    
    updateProgressBarColor(color) {
        // Update progress bar and loading text with primary color
        const style = document.createElement('style');
        style.id = 'flexframe-progress-color';
        
        // Generate rgba versions for gradients
        const hexToRgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        
        style.textContent = `
            /* LOGO LOADER - Progress bar and text */
            .logo-progress-bar {
                background: linear-gradient(90deg, ${hexToRgba(color, 0.5)}, ${color}) !important;
            }
            .logo-progress-text {
                color: ${color} !important;
            }
            
            /* Indeterminate progress animation */
            @keyframes indeterminateProgress {
                0% { 
                    width: 30%;
                    margin-left: 0%;
                    background: linear-gradient(90deg, ${hexToRgba(color, 0.3)}, ${color});
                }
                50% { 
                    width: 50%;
                    margin-left: 25%;
                    background: linear-gradient(90deg, ${color}, ${hexToRgba(color, 0.3)});
                }
                100% { 
                    width: 30%;
                    margin-left: 70%;
                    background: linear-gradient(90deg, ${hexToRgba(color, 0.3)}, ${color});
                }
            }
        `;
        
        // Remove existing style if present
        const existing = document.getElementById('flexframe-progress-color');
        if (existing) existing.remove();
        
        document.head.appendChild(style);
        console.log('[FlexFrame] Progress bar color updated to:', color);
    }
    
    setupCanvasInteraction() {
        // Get the canvas element
        const canvas = this.sceneManager.getCanvas();
        if (!canvas) {
            console.warn('[FlexFrame] Canvas not found for interaction setup');
            return;
        }
        
        // Show animation player when canvas is clicked
        canvas.addEventListener('click', () => {
            if (this.animationPlayer) {
                this.animationPlayer.onCanvasInteraction();
            }
        });
        
        // Also show on mouse movement over canvas (optional - for better UX)
        let moveTimeout = null;
        canvas.addEventListener('mousemove', () => {
            // Debounce to avoid excessive calls
            if (moveTimeout) return;
            
            moveTimeout = setTimeout(() => {
                moveTimeout = null;
            }, 100);
            
            if (this.animationPlayer) {
                this.animationPlayer.onCanvasInteraction();
            }
        });
    }

    initializePlayerStyling() {
        console.log('[FlexFrame UI] initializePlayerStyling called with params:', this.playerStyleParams);
        // Apply all current styling parameters to maintain exact current appearance
        this.updatePlayerBackgroundColor(this.playerStyleParams.backgroundColor);
        this.updatePlayerBackgroundOpacity(this.playerStyleParams.backgroundOpacity);
        // Remove problematic width setting - let CSS handle responsive width
        this.updatePlayerTimeDisplay(this.playerStyleParams.showTimeDisplay);
        this.updatePlayerButtonColor(this.playerStyleParams.buttonColor);
        this.updatePlayerButtonOpacity(this.playerStyleParams.buttonOpacity);
        this.updatePlayerScrubberColor(this.playerStyleParams.scrubberColor);
        this.updatePlayerScrubberOpacity(this.playerStyleParams.scrubberOpacity);
        this.updatePlayerTextColor(this.playerStyleParams.textColor);
        this.updatePlayerTextOpacity(this.playerStyleParams.textOpacity);
        
        // Initialize scrubber width styling
        this.initializeScrubberWidth();
    }

    initializeScrubberWidth() {
        // Add CSS to make scrubber take full available width inside the player
        const scrubberWidthStyle = document.createElement('style');
        scrubberWidthStyle.id = 'scrubber-width-style';
        scrubberWidthStyle.textContent = `
            .animation-player .player-controls {
                display: flex !important;
                align-items: center !important;
                width: 100% !important;
            }
            .animation-player .player-center {
                flex: 1 !important;
                margin: 0 10px !important;
                display: flex !important;
                align-items: center !important;
            }
            .animation-player .timeline-slider {
                width: 100% !important;
                flex: 1 !important;
            }
            .animation-player .player-left,
            .animation-player .player-right {
                flex-shrink: 0 !important;
            }
        `;
        
        // Remove existing if it exists
        const existing = document.getElementById('scrubber-width-style');
        if (existing) {
            existing.remove();
        }
        
        document.head.appendChild(scrubberWidthStyle);
    }

    setupGround() {
        // Textures
        const fadeTexture = this.textureLoader.load(
            getAssetUrl('textures/gradients/3.jpg'),
            undefined,
            undefined,
            (err) => console.warn('[Ground] Gradient texture failed to load:', err)
        );
        fadeTexture.wrapS = THREE.ClampToEdgeWrapping;
        fadeTexture.wrapT = THREE.ClampToEdgeWrapping;
        fadeTexture.needsUpdate = true;

        // Geometries
        this.circleGeometry = new THREE.CircleGeometry(5, 64);
        this.planeGeometry = new THREE.PlaneGeometry(30, 30);

        // Materials
        this.shadowGroundMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
        this.solidGroundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x222222, 
            roughness: 1, 
            metalness: 0 
        });

        // Create ground
        this.ground = new THREE.Mesh(this.circleGeometry, this.shadowGroundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.position.y = -0.01;
        this.ground.receiveShadow = true;
        this.ground.castShadow = false;
        this.ground.visible = true;
        this.sceneManager.getScene().add(this.ground);
    }

    // Update all GUI controls to reflect current values
    updateAllGUIControls() {
        if (this.gui) {
            // Update all controllers recursively
            this.gui.controllersRecursive().forEach(controller => {
                controller.updateDisplay();
            });
        }
    }
    
    gatherModelSpecificSettings() {
        // Gather simplified config - ONLY model orientation, scale, position and camera data
        // This is used to copy position/camera settings to clipboard for config files
        const config = {};
        
        // Add exerciseId if available from current config
        if (this.currentConfig && this.currentConfig.exerciseId) {
            config.exerciseId = this.currentConfig.exerciseId;
        }
        
        // Add model URL if available
        if (this.currentConfig) {
            if (this.currentConfig.modelUrlSQ) {
                config.modelUrlSQ = this.currentConfig.modelUrlSQ;
            }
            if (this.currentConfig.modelUrlHQ) {
                config.modelUrlHQ = this.currentConfig.modelUrlHQ;
            }
            if (this.currentConfig.modelUrl && !config.modelUrlSQ) {
                config.modelUrl = this.currentConfig.modelUrl;
            }
        }
        
        // Model transform (position, rotation, scale)
        config.model = window.model ? {
            position: window.model.position.toArray(),
            rotation: [window.model.rotation.x, window.model.rotation.y, window.model.rotation.z],
            scale: window.model.scale.toArray()
        } : { position: [0, -0.02, 0], rotation: [0, 0, 0], scale: [1, 1, 1] };
        
        // Camera settings (position, rotation, target for viewing angle)
        config.camera = this.cameraManager.getSettings();
        
        // NOTE: customTextures and rightMenuTabs are intentionally NOT included
        // This config is meant only for model positioning and camera data
        
        return config;
    }

    setupGUIStyles() {
        // Add custom styles for GUI folders
        const style = document.createElement('style');
        style.textContent = `
            .lil-gui .lil-gui .title {
                background: rgba(220, 53, 69, 0.15) !important;
                border-bottom: 1px solid rgba(220, 53, 69, 0.3) !important;
                color: #dc3545 !important;
                font-weight: 600 !important;
            }
            .lil-gui .title {
                background: rgba(220, 53, 69, 0.2) !important;
                border-bottom: 1px solid rgba(220, 53, 69, 0.4) !important;
                color: #dc3545 !important;
                font-weight: 700 !important;
            }
            
            /* Material Colors main folder - Blue theme */
            .materials-folder-main > .title {
                background: rgba(74, 158, 255, 0.25) !important;
                border-bottom: 1px solid rgba(74, 158, 255, 0.5) !important;
                color: #4a9eff !important;
                font-weight: 700 !important;
            }
            
            /* Material sub-folders - Lighter blue */
            .materials-folder-main .lil-gui .title {
                background: rgba(74, 158, 255, 0.15) !important;
                border-bottom: 1px solid rgba(74, 158, 255, 0.3) !important;
                color: #6bb3ff !important;
                font-weight: 600 !important;
            }
            
            .gui-controls {
                margin-bottom: 10px;
                padding: 5px;
                background: rgba(0,0,0,0.1);
                border-radius: 3px;
            }
            
            /* Hide any emoji/icon pseudo-elements */
            .lil-gui .title::before,
            .lil-gui .title::after {
                display: none !important;
                content: '' !important;
            }
        `;
        
        if (!document.head.querySelector('style[data-gui-styles]')) {
            style.setAttribute('data-gui-styles', 'true');
            document.head.appendChild(style);
        }
    }

    setupGUIControls() {
        // Add expand/collapse all controls at the top
        const controlsFolder = this.gui.addFolder('GUI Controls');
        
        const guiActions = {
            expandAll: () => {
                this.allFolders.forEach(folder => folder.open());
                console.log('📂 All GUI folders expanded');
            },
            collapseAll: () => {
                this.allFolders.forEach(folder => folder.close());
                console.log('📁 All GUI folders collapsed');
            }
        };
        
        controlsFolder.add(guiActions, 'expandAll').name('Expand All');
        controlsFolder.add(guiActions, 'collapseAll').name('Collapse All');
        
        // Keep controls folder open and don't track it
        controlsFolder.open();
    }

    trackFolder(folder) {
        // Helper method to track folders for expand/collapse all
        this.allFolders.push(folder);
        return folder;
    }

    setupGUI() {
        this.gui = new GUI();
        this.allFolders = []; // Track all folders for expand/collapse all
        this.setupGUIStyles();
        
        // === TOP CONTROLS (before everything else) ===
        const topFolder = this.gui.addFolder('⚡ Quick Actions');
        topFolder.open();
        
        // Combined Save button - saves ALL settings + model config to clipboard
        topFolder.add({
            saveAll: async () => {
                try {
                    const allSettings = this.settingsManager.gatherAllSettings();
                    const modelSettings = this.gatherModelSpecificSettings();
                    
                    const combined = {
                        allSettings: allSettings,
                        modelConfig: modelSettings
                    };
                    await navigator.clipboard.writeText(JSON.stringify(combined, null, 2));
                    
                    alert('All Settings + Model Config copied to clipboard!');
                    console.log('Combined save - All Settings:', allSettings);
                    console.log('Combined save - Model Config:', modelSettings);
                } catch (error) {
                    console.error('Failed to save:', error);
                    alert('Failed to copy settings to clipboard.');
                }
            }
        }, 'saveAll').name('💾 Save All + Model Config');
        
        // Axis Helper toggle
        topFolder.add({
            showAxis: false
        }, 'showAxis').name('Show Axis Helper')
            .onChange((value) => {
                this.cameraManager.toggleAxisHelper(value);
            });
        
        // AR Test - Upload local GLB and test AR function
        topFolder.add({
            testAR: () => {
                // Create a hidden file input to pick a local GLB
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.glb';
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);

                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (!file) {
                        document.body.removeChild(fileInput);
                        return;
                    }

                    // Create a local blob URL for the selected GLB
                    const blobUrl = URL.createObjectURL(file);
                    console.log('🧪 [AR Test] Local GLB loaded:', file.name, 'Blob URL:', blobUrl);

                    // Build a temporary AR config using the blob URL
                    const testArConfig = {
                        exerciseId: file.name.replace('.glb', ''),
                        ar: {
                            glb: blobUrl,
                            usdz: null
                        },
                        modelUrlSQ: blobUrl
                    };

                    // Feed the test config into the AR handler and launch
                    arHandler.updateConfig(testArConfig, null);
                    arHandler.launchAR();

                    console.log('🧪 [AR Test] AR launched with local GLB:', file.name);
                    document.body.removeChild(fileInput);
                });

                fileInput.click();
            }
        }, 'testAR').name('📱 Test AR (Local GLB)');
        
        this.setupGUIControls();
        
        // Screenshot controls - at the top
        this.setupSimpleScreenshotGUI();
        
        // Save/Import controls with enhanced functionality
        this.gui.add({ 
            saveSettings: async () => {
                await this.settingsManager.saveSettingsToClipboard();
                console.log('All settings saved:', this.settingsManager.gatherAllSettings());
            }
        }, 'saveSettings').name('Save All Settings');
        
        this.gui.add({ 
            saveModelSettings: async () => {
                const modelSettings = this.gatherModelSpecificSettings();
                const settingsStr = JSON.stringify(modelSettings, null, 2);
                try {
                    await navigator.clipboard.writeText(settingsStr);
                    alert('Model-specific settings copied to clipboard!');
                    console.log('Model settings saved:', modelSettings);
                } catch (error) {
                    console.error('Failed to copy to clipboard:', error);
                    alert('Failed to copy settings to clipboard.');
                }
            }
        }, 'saveModelSettings').name('Save Model Settings');
        
        this.gui.add({ 
            importSettings: async () => {
                await this.settingsManager.importSettingsFromClipboard();
                // Force update all GUI controls after import
                setTimeout(() => this.updateAllGUIControls(), 100);
            }
        }, 'importSettings').name('Import Settings');

        // Additional save/load options
        this.gui.add({
            exportFile: () => this.settingsManager.exportAsFile('scene-settings.json')
        }, 'exportFile').name('Export to File');

        this.gui.add({
            importFile: async () => {
                try {
                    await this.settingsManager.importFromFile();
                    setTimeout(() => this.updateAllGUIControls(), 100);
                    alert('Settings imported from file!');
                } catch (error) {
                    alert('Failed to import file: ' + error.message);
                }
            }
        }, 'importFile').name('Import from File');

        // Scene Presets
        const scenePresets = {
            'Cinematic Blue': () => {
                const cinematicSettings = {
                    "background": {
                        "gradientTop": "#3865ad",
                        "gradientBottom": "#030391",
                        "gradientAlpha": 1
                    },
                    "ground": {
                        "mode": "Infinite Canvas",
                        "color": "#222222",
                        "roughness": 1,
                        "metalness": 0,
                        "shadowOpacity": 0.4,
                        "receiveShadow": true,
                        "castShadow": false,
                        "visible": true
                    },
                    "camera": {
                        "position": [
                            0.6497189477206844,
                            0.620065800043649,
                            -0.3267521547833202
                        ],
                        "rotation": [
                            -2.480393214032852,
                            1.0626661205247725,
                            2.5446012015171644
                        ],
                        "target": [
                            -0.04078270409635462,
                            0.38393067967272315,
                            -0.023247738115800942
                        ]
                    },
                    "lighting": {
                        "directionalLight": {
                            "intensity": 1.43,
                            "color": "#ffffff",
                            "castShadow": true,
                            "shadowBias": 0,
                            "shadowBlur": 1,
                            "shadowMapWidth": 1024,
                            "shadowMapHeight": 1024,
                            "posX": 1.35,
                            "posY": 1.57,
                            "posZ": 0.9,
                            "showHelper": false,
                            "position": {
                                "x": 1.35,
                                "y": 1.57,
                                "z": 0.9
                            }
                        },
                        "ambientLight": {
                            "intensity": 0.4,
                            "color": "#ffffff"
                        }
                    },
                    "dustParticles": {
                        "count": 1210,
                        "size": 0.02,
                        "sizeRandomness": 1.2,
                        "color": "#0d14d3",
                        "opacity": 0.11,
                        "speed": 0.5,
                        "horizontalRange": 3,
                        "verticalRange": 2,
                        "verticalOffset": 1,
                        "visible": true,
                        "blur": 0.3,
                        "depthBlur": true,
                        "depthBlurStrength": 0.5,
                        "depthFocusDistance": 3,
                        "depthFocusRange": 1.5
                    },
                    "model": {
                        "position": [0, -0.02, 0],
                        "rotation": [0, 0, 0],
                        "scale": [1, 1, 1]
                    }
                };
                this.settingsManager.applyAllSettings(cinematicSettings);
                setTimeout(() => this.updateAllGUIControls(), 100);
            },
            'Reset to Default': () => {
                this.settingsManager.applyDefaultSettings();
                setTimeout(() => this.updateAllGUIControls(), 100);
            }
        };

        const presetFolder = this.trackFolder(this.gui.addFolder('Scene Presets'));
        presetFolder.add(scenePresets, 'Cinematic Blue').name('Cinematic Blue');
        presetFolder.add(scenePresets, 'Reset to Default').name('Reset to Default');
        // presetFolder.open();

        // Background controls
        this.setupBackgroundGUI();
        
        // Ground controls
        this.setupGroundGUI();
        
        // Dust particles controls
        this.setupParticlesGUI();
        
        // Loading spinner controls
        this.setupLoaderGUI();
        
        // Lighting controls
        this.setupLightingGUI();
        
        // Camera controls
        this.setupCameraGUI();

        // Thumbnail menu controls
        this.setupMultiThumbnailMenuGUI();

        // Keyboard shortcut to hide/show GUI
        this.setupGUIVisibilityToggle();
    }

    setupBackgroundGUI() {
        this.gui.addColor(this.backgroundParams, 'gradientTop').name('Gradient Top')
            .onChange(() => this.sceneManager.updateGradientBackground(this.backgroundParams));
        this.gui.addColor(this.backgroundParams, 'gradientBottom').name('Gradient Bottom')
            .onChange(() => this.sceneManager.updateGradientBackground(this.backgroundParams));
        this.gui.add(this.backgroundParams, 'gradientAlpha', 0, 1, 0.01).name('Gradient Alpha')
            .onChange(() => this.sceneManager.updateGradientBackground(this.backgroundParams));
    }

    setupGroundGUI() {
        const groundFolder = this.trackFolder(this.gui.addFolder('Ground Plane'));
        
        groundFolder.add(this.groundParams, 'mode', ['Solid', 'Infinite Canvas']).name('Type')
            .onChange((val) => this.updateGroundMode(val));
        
        groundFolder.addColor(this.groundParams, 'color').name('Color')
            .onChange((value) => this.solidGroundMaterial.color.set(value));
        
        groundFolder.add(this.groundParams, 'roughness', 0, 1, 0.01).name('Roughness')
            .onChange((v) => this.solidGroundMaterial.roughness = v);
        
        groundFolder.add(this.groundParams, 'metalness', 0, 1, 0.01).name('Metalness')
            .onChange((v) => this.solidGroundMaterial.metalness = v);
        
        groundFolder.add(this.groundParams, 'shadowOpacity', 0, 1, 0.01).name('Shadow Opacity')
            .onChange((v) => this.shadowGroundMaterial.opacity = v);
        
        groundFolder.add(this.groundParams, 'receiveShadow').name('Receive Shadow')
            .onChange((v) => this.ground.receiveShadow = v);
        
        groundFolder.add(this.groundParams, 'castShadow').name('Cast Shadow')
            .onChange((v) => this.ground.castShadow = v);
        
        groundFolder.add(this.groundParams, 'visible').name('Visible')
            .onChange((v) => this.ground.visible = v);
        
        // groundFolder.open();
    }

    setupLoaderGUI() {
        const loaderFolder = this.trackFolder(this.gui.addFolder('Loading Spinner'));
        
        const spinnerOptions = {
            'Cool Gradient': 'cool',
            'Simple Gradient': 'gradient',
            '3D Orbits': 'orbits',
            'Gradient Planes': 'planes',
            'Spinning Squares': 'squares',
            'Pulse Dots': 'dots',
            'Solar System': 'solar',
            'Three Quarter': 'quarter'
        };
        
        loaderFolder.add(this.loaderParams, 'spinnerStyle', spinnerOptions).name('Spinner Style')
            .onChange(() => this.updateLoaderSpinner());
    }

    setupParticlesGUI() {
        const dustFolder = this.trackFolder(this.gui.addFolder('Dust Particles'));
        const dustParams = this.particleSystem.getParams();

        // Basic Particle Controls
        dustFolder.add(dustParams, 'count', 50, 2000, 10).name('Count')
            .onChange((value) => this.particleSystem.updateCount(value));

        dustFolder.add(dustParams, 'size', 0.001, 0.02, 0.0001).name('Size')
            .onChange((value) => this.particleSystem.updateSize(value));

        dustFolder.add(dustParams, 'sizeRandomness', 0, 2, 0.1).name('Size Variation')
            .onChange((value) => this.particleSystem.updateSizeRandomness(value));

        dustFolder.addColor(dustParams, 'color').name('Color')
            .onChange((value) => this.particleSystem.updateColor(value));

        dustFolder.add(dustParams, 'opacity', 0, 1, 0.01).name('Opacity')
            .onChange((value) => this.particleSystem.updateOpacity(value));

        dustFolder.add(dustParams, 'speed', 0, 3, 0.1).name('Float Speed');

        dustFolder.add(dustParams, 'visible').name('Visible')
            .onChange((value) => this.particleSystem.setVisible(value));

        // Blur Effects Section
        const blurFolder = this.trackFolder(dustFolder.addFolder('Blur Effects'));
        
        blurFolder.add(dustParams, 'blur', 0, 1, 0.01).name('Particle Blur')
            .onChange((value) => this.particleSystem.updateBlur(value));

        // Depth of Field Section
        const dofFolder = this.trackFolder(dustFolder.addFolder('Depth of Field'));
        
        dofFolder.add(dustParams, 'depthBlur').name('Enable Depth Blur')
            .onChange((value) => this.particleSystem.updateDepthBlur(value));

        dofFolder.add(dustParams, 'depthBlurStrength', 0, 1, 0.01).name('Blur Strength')
            .onChange((value) => this.particleSystem.updateDepthBlurStrength(value));

        dofFolder.add(dustParams, 'depthFocusDistance', 0.5, 10, 0.1).name('Focus Distance')
            .onChange((value) => this.particleSystem.updateDepthFocus(value, dustParams.depthFocusRange));

        dofFolder.add(dustParams, 'depthFocusRange', 0.1, 5, 0.1).name('Focus Range')
            .onChange((value) => this.particleSystem.updateDepthFocus(dustParams.depthFocusDistance, value));

        // Position and Range Controls
        const positionFolder = this.trackFolder(dustFolder.addFolder('Position & Range'));
        
        positionFolder.add(dustParams, 'horizontalRange', 0.5, 10, 0.1).name('Horizontal Range')
            .onChange(() => this.particleSystem.updateRange(dustParams.horizontalRange, dustParams.verticalRange));

        positionFolder.add(dustParams, 'verticalRange', 0.5, 5, 0.1).name('Vertical Range')
            .onChange(() => this.particleSystem.updateRange(dustParams.horizontalRange, dustParams.verticalRange));

        positionFolder.add(dustParams, 'verticalOffset', -2, 3, 0.1).name('Height Offset')
            .onChange((value) => this.particleSystem.updateOffset(value));

        // Depth of Field Presets
        const dofPresets = {
            'Portrait DOF': () => {
                dustParams.depthBlur = true;
                dustParams.depthBlurStrength = 0.7;
                dustParams.depthFocusDistance = 2.0;
                dustParams.depthFocusRange = 0.5;
                dustParams.blur = 0.2;
                this.particleSystem.updateDepthBlur(true);
                this.particleSystem.updateDepthBlurStrength(0.7);
                this.particleSystem.updateDepthFocus(2.0, 0.5);
                this.particleSystem.updateBlur(0.2);
                dofFolder.controllersRecursive().forEach(c => c.updateDisplay());
                blurFolder.controllersRecursive().forEach(c => c.updateDisplay());
            },
            'Macro DOF': () => {
                dustParams.depthBlur = true;
                dustParams.depthBlurStrength = 0.9;
                dustParams.depthFocusDistance = 1.0;
                dustParams.depthFocusRange = 0.2;
                dustParams.blur = 0.4;
                this.particleSystem.updateDepthBlur(true);
                this.particleSystem.updateDepthBlurStrength(0.9);
                this.particleSystem.updateDepthFocus(1.0, 0.2);
                this.particleSystem.updateBlur(0.4);
                dofFolder.controllersRecursive().forEach(c => c.updateDisplay());
                blurFolder.controllersRecursive().forEach(c => c.updateDisplay());
            },
            'Cinematic DOF': () => {
                dustParams.depthBlur = true;
                dustParams.depthBlurStrength = 0.5;
                dustParams.depthFocusDistance = 3.0;
                dustParams.depthFocusRange = 1.5;
                dustParams.blur = 0.3;
                this.particleSystem.updateDepthBlur(true);
                this.particleSystem.updateDepthBlurStrength(0.5);
                this.particleSystem.updateDepthFocus(3.0, 1.5);
                this.particleSystem.updateBlur(0.3);
                dofFolder.controllersRecursive().forEach(c => c.updateDisplay());
                blurFolder.controllersRecursive().forEach(c => c.updateDisplay());
            },
            'No DOF': () => {
                dustParams.depthBlur = false;
                dustParams.blur = 0;
                this.particleSystem.updateDepthBlur(false);
                this.particleSystem.updateBlur(0);
                dofFolder.controllersRecursive().forEach(c => c.updateDisplay());
                blurFolder.controllersRecursive().forEach(c => c.updateDisplay());
            }
        };

        // DOF Preset Buttons
        dofFolder.add(dofPresets, 'Portrait DOF').name('Portrait DOF');
        dofFolder.add(dofPresets, 'Macro DOF').name('Macro DOF');
        dofFolder.add(dofPresets, 'Cinematic DOF').name('Cinematic DOF');
        dofFolder.add(dofPresets, 'No DOF').name('Disable DOF');

        // Particle Preset Buttons (existing ones)
        const particlePresets = {
            'Light Dust': () => {
                this.particleSystem.applyPreset('Light Dust');
                dustFolder.controllersRecursive().forEach(c => c.updateDisplay());
            },
            'Heavy Dust': () => {
                this.particleSystem.applyPreset('Heavy Dust');
                dustFolder.controllersRecursive().forEach(c => c.updateDisplay());
            },
            'Magical Sparkles': () => {
                this.particleSystem.applyPreset('Magical Sparkles');
                dustFolder.controllersRecursive().forEach(c => c.updateDisplay());
            },
            'Reset Dust': () => {
                this.particleSystem.applyPreset('Reset Dust');
                dustFolder.controllersRecursive().forEach(c => c.updateDisplay());
            }
        };

        // Particle Preset Buttons
        const presetFolder = this.trackFolder(dustFolder.addFolder('Particle Presets'));
        presetFolder.add(particlePresets, 'Light Dust').name('Light Dust');
        presetFolder.add(particlePresets, 'Heavy Dust').name('Heavy Dust');
        presetFolder.add(particlePresets, 'Magical Sparkles').name('Magical Sparkles');
        presetFolder.add(particlePresets, 'Reset Dust').name('Reset Dust');

        // Open important folders by default
        // blurFolder.open();
        // dofFolder.open();
        // dustFolder.open();
    }

    setupLightingGUI() {
        const lightsFolder = this.trackFolder(this.gui.addFolder('Lights'));
        const lights = this.lightingSystem.getLights();
        const lightSettings = this.lightingSystem.getSettings();

        // Directional Light
        const dirFolder = this.trackFolder(lightsFolder.addFolder('Directional Light'));
        const dirParams = lightSettings.directionalLight;

        dirFolder.add(dirParams, 'intensity', 0, 5, 0.01).name('Intensity')
            .onChange(v => lights.directional.intensity = v);
        
        dirFolder.addColor(dirParams, 'color').name('Color')
            .onChange(v => lights.directional.color.set(v));
        
        dirFolder.add(dirParams, 'castShadow').name('Cast Shadow')
            .onChange(v => lights.directional.castShadow = v);

        dirFolder.add(dirParams, 'shadowBias', -0.05, 0.05, 0.0001).name('Shadow Bias')
            .onChange(v => lights.directional.shadow.bias = v);

        dirFolder.add(dirParams, 'shadowBlur', 0, 10, 0.1).name('Shadow Blur')
            .onChange(v => lights.directional.shadow.radius = v);

        dirFolder.add(dirParams, 'shadowMapWidth', 256, 4096, 1).name('Shadow Map Width')
            .onChange(v => {
                lights.directional.shadow.mapSize.width = v;
                if (lights.directional.shadow.map) lights.directional.shadow.map.dispose();
            });

        dirFolder.add(dirParams, 'shadowMapHeight', 256, 4096, 1).name('Shadow Map Height')
            .onChange(v => {
                lights.directional.shadow.mapSize.height = v;
                if (lights.directional.shadow.map) lights.directional.shadow.map.dispose();
            });
        
        dirFolder.add(dirParams, 'posX', -10, 10, 0.01).name('Position X')
            .onChange(v => lights.directional.position.x = v);
        
        dirFolder.add(dirParams, 'posY', -10, 10, 0.01).name('Position Y')
            .onChange(v => lights.directional.position.y = v);
        
        dirFolder.add(dirParams, 'posZ', -10, 10, 0.01).name('Position Z')
            .onChange(v => lights.directional.position.z = v);
        
        dirFolder.add(dirParams, 'showHelper').name('Show Helper')
            .onChange(v => lights.directionalHelper.visible = v);
        
        // dirFolder.open();

        // Ambient Light
        const ambFolder = this.trackFolder(lightsFolder.addFolder('Ambient Light'));
        const ambParams = lightSettings.ambientLight;

        ambFolder.add(ambParams, 'intensity', 0, 2, 0.01).name('Intensity')
            .onChange(v => lights.ambient.intensity = v);
        
        ambFolder.addColor(ambParams, 'color').name('Color')
            .onChange(v => lights.ambient.color.set(v));
        
        // ambFolder.open();
        // lightsFolder.open();
    }

    setupCameraGUI() {
        const cameraFolder = this.trackFolder(this.gui.addFolder('Camera Controls'));
        const camera = this.cameraManager.getCamera();
        const controls = this.cameraManager.getControls();
        
        // Zoom Range Controls
        const zoomFolder = this.trackFolder(cameraFolder.addFolder('Zoom Range'));
        
        zoomFolder.add(controls, 'minDistance', 0.001, 1, 0.001).name('Min Zoom Distance');
            // .onChange(() => console.log('Min distance:', controls.minDistance));
        
        zoomFolder.add(controls, 'maxDistance', 10, 500, 1).name('Max Zoom Distance');
            // .onChange(() => console.log('Max distance:', controls.maxDistance));
        
        zoomFolder.add(controls, 'zoomSpeed', 0.1, 2, 0.1).name('Zoom Speed');
            // .onChange(() => console.log('Zoom speed:', controls.zoomSpeed));
        
        // Field of View Control
        const fovFolder = this.trackFolder(cameraFolder.addFolder('Field of View'));
        
        fovFolder.add({ fov: camera.fov }, 'fov', 10, 150, 1).name('FOV (degrees)')
            .onChange((value) => {
                this.cameraManager.setFOV(value);
            });
        
        // Copy camera settings button
        fovFolder.add({
            copyCameraSettings: () => {
                this.cameraManager.copyCameraSettingsToClipboard();
            }
        }, 'copyCameraSettings').name('Copy Camera Settings');
        
        // Copy all GUI settings button
        fovFolder.add({
            copyAllSettings: () => {
                this.cameraManager.copyAllSettingsToClipboard(this.settingsManager);
            }
        }, 'copyAllSettings').name('Copy ALL GUI Settings');
        
        // Zoom Momentum Controls
        const momentumFolder = this.trackFolder(cameraFolder.addFolder('Zoom Momentum'));
        const cameraParams = this.cameraManager;
        
        momentumFolder.add(cameraParams, 'zoomDecay', 0.8, 0.99, 0.01).name('Momentum Decay');
            // .onChange(() => console.log('Zoom decay:', cameraParams.zoomDecay));
        
        momentumFolder.add(cameraParams, 'zoomMomentumThreshold', 0.001, 0.1, 0.001).name('Momentum Threshold');
            // .onChange(() => console.log('Momentum threshold:', cameraParams.zoomMomentumThreshold));
        
        // Add a velocity multiplier for testing
        const velocityMultiplier = { value: 1.0 };
        momentumFolder.add(velocityMultiplier, 'value', 0.1, 5, 0.1).name('Velocity Multiplier')
            .onChange((value) => {
                // Store the multiplier for use in trackZoomMomentum
                cameraParams.velocityMultiplier = value;
                // console.log('Velocity multiplier:', value);
            });
        
        // Reset button
        cameraFolder.add({
            resetCamera: () => {
                this.cameraManager.resetCamera();
                console.log('Camera fully reset to defaults');
            }
        }, 'resetCamera').name('Reset Camera');
        
        // Test momentum button
        cameraFolder.add({
            testMomentum: () => {
                console.log('Testing momentum...');
                cameraParams.zoomMomentum = 0.2; // Set positive momentum
                cameraParams.momentumActive = true;
                console.log('Momentum set to:', cameraParams.zoomMomentum);
            }
        }, 'testMomentum').name('Test Momentum');
        
        // Clear momentum button
        cameraFolder.add({
            clearMomentum: () => {
                cameraParams.zoomMomentum = 0;
                cameraParams.momentumActive = false;
                console.log('Momentum cleared');
            }
        }, 'clearMomentum').name('Clear Momentum');
        
        // Debug info
        const debugFolder = this.trackFolder(cameraFolder.addFolder('Debug Info'));
        const debugInfo = {
            currentDistance: 0,
            momentum: 0,
            targetX: 0,
            targetY: 0,
            targetZ: 0
        };
        
        const distanceController = debugFolder.add(debugInfo, 'currentDistance').name('Distance').listen();
        const momentumController = debugFolder.add(debugInfo, 'momentum').name('Momentum').listen();
        const targetXController = debugFolder.add(debugInfo, 'targetX').name('Target X').listen();
        const targetYController = debugFolder.add(debugInfo, 'targetY').name('Target Y').listen();
        const targetZController = debugFolder.add(debugInfo, 'targetZ').name('Target Z').listen();
        
        // Update debug info in animation loop
        const updateDebugInfo = () => {
            debugInfo.currentDistance = camera.position.distanceTo(controls.target);
            debugInfo.momentum = cameraParams.zoomMomentum || 0;
            debugInfo.targetX = controls.target.x;
            debugInfo.targetY = controls.target.y;
            debugInfo.targetZ = controls.target.z;
        };
        
        // Store update function for animation loop
        this.updateCameraDebug = updateDebugInfo;
        
        // Initialize velocity multiplier with user's preferred setting
        cameraParams.velocityMultiplier = 0.4;
        
        // momentumFolder.open();
        // zoomFolder.open();
        // fovFolder.open();

        
        // Coordinates Section
        const coordsFolder = this.trackFolder(cameraFolder.addFolder('Coordinates'));
        
        // Live coordinate display
        const coordDisplay = {
            x: 0,
            y: 0, 
            z: 0
        };
        
        const xController = coordsFolder.add(coordDisplay, 'x').name('Center X').listen();
        const yController = coordsFolder.add(coordDisplay, 'y').name('Center Y').listen();
        const zController = coordsFolder.add(coordDisplay, 'z').name('Center Z').listen();
        
        // Manual control sliders
        const manualFolder = this.trackFolder(coordsFolder.addFolder('Manual Control'));
        
        const manualControls = {
            x: this.cameraManager.getRotationCenter().x,
            y: this.cameraManager.getRotationCenter().y,
            z: this.cameraManager.getRotationCenter().z
        };
        
        manualFolder.add(manualControls, 'x', -5, 5, 0.001).name('Set X Position')
            .onChange((value) => {
                this.cameraManager.setRotationCenterX(value);
            })
            .listen();
            
        manualFolder.add(manualControls, 'y', -5, 5, 0.001).name('Set Y Position')
            .onChange((value) => {
                this.cameraManager.setRotationCenterY(value);
            })
            .listen();
            
        manualFolder.add(manualControls, 'z', -5, 5, 0.001).name('Set Z Position')
            .onChange((value) => {
                this.cameraManager.setRotationCenterZ(value);
            })
            .listen();
        
        // Copy coordinates button
        coordsFolder.add({
            copyCoords: () => {
                this.cameraManager.copyCoordinatesToClipboard();
            }
        }, 'copyCoords').name('Copy Coordinates');
        
        // Update coordinate display in the debug update function
        const originalUpdateDebugInfo = this.updateCameraDebug;
        this.updateCameraDebug = () => {
            // Call original debug update
            if (originalUpdateDebugInfo) {
                originalUpdateDebugInfo();
            }
            
            // Update coordinate display and manual controls
            const coords = this.cameraManager.getRotationCenter();
            coordDisplay.x = parseFloat(coords.x.toFixed(6));
            coordDisplay.y = parseFloat(coords.y.toFixed(6));
            coordDisplay.z = parseFloat(coords.z.toFixed(6));
            
            // Update manual control sliders to match current position
            manualControls.x = coords.x;
            manualControls.y = coords.y;
            manualControls.z = coords.z;
        };
        
        // axisFolder.open();
        // coordsFolder.open();
        // manualFolder.open();
        
        // Animation Player Controls
        const animationFolder = this.trackFolder(cameraFolder.addFolder('Animation Player'));
        
        const animationSettings = {
            showPlayer: this.animationPlayer ? this.animationPlayer.isVisible : true,
            alwaysVisible: this.animationPlayer ? this.animationPlayer.alwaysVisible : false
        };
        
        animationFolder.add(animationSettings, 'showPlayer').name('Show Animation Player')
            .onChange((value) => {
                if (this.animationPlayer) {
                    this.animationPlayer.setVisibility(value);
                    animationSettings.showPlayer = value;
                }
            });
            
        animationFolder.add(animationSettings, 'alwaysVisible').name('Always Visible (No Auto-Hide)')
            .onChange((value) => {
                if (this.animationPlayer) {
                    this.animationPlayer.setAlwaysVisible(value);
                    animationSettings.alwaysVisible = value;
                }
            });
        
        
        // Player Styling Controls
        const playerStyleFolder = this.trackFolder(animationFolder.addFolder('Player Styling'));
        
        // Background Settings
        const backgroundFolder = this.trackFolder(playerStyleFolder.addFolder('Background'));
        backgroundFolder.addColor(this.playerStyleParams, 'backgroundColor').name('Background Color')
            .onChange((value) => {
                this.updatePlayerBackgroundColor(value);
            });
        backgroundFolder.add(this.playerStyleParams, 'backgroundOpacity', 0, 1, 0.1).name('Background Opacity')
            .onChange((value) => {
                this.updatePlayerBackgroundOpacity(value);
            });
        
        // Dimensions
        const dimensionsFolder = this.trackFolder(playerStyleFolder.addFolder('Dimensions'));
        dimensionsFolder.add(this.playerStyleParams, 'playerWidth', 20, 100, 1).name('Player Width (%)')
            .onChange((value) => {
                // Width is now handled by CSS - this GUI control can be removed if not needed
            });
        
        // Display Options
        const displayFolder = this.trackFolder(playerStyleFolder.addFolder('Display'));
        displayFolder.add(this.playerStyleParams, 'showTimeDisplay').name('Show Time Display')
            .onChange((value) => {
                this.updatePlayerTimeDisplay(value);
            });
        
        // Button Colors
        const buttonFolder = this.trackFolder(playerStyleFolder.addFolder('Buttons'));
        buttonFolder.addColor(this.playerStyleParams, 'buttonColor').name('Button Color')
            .onChange((value) => {
                this.updatePlayerButtonColor(value);
            });
        buttonFolder.add(this.playerStyleParams, 'buttonOpacity', 0, 1, 0.1).name('Button Opacity')
            .onChange((value) => {
                this.updatePlayerButtonOpacity(value);
            });
        
        // Timeline Scrubber
        const scrubberFolder = this.trackFolder(playerStyleFolder.addFolder('Timeline'));
        scrubberFolder.addColor(this.playerStyleParams, 'scrubberColor').name('Scrubber Color')
            .onChange((value) => {
                this.updatePlayerScrubberColor(value);
            });
        scrubberFolder.add(this.playerStyleParams, 'scrubberOpacity', 0, 1, 0.1).name('Scrubber Opacity')
            .onChange((value) => {
                this.updatePlayerScrubberOpacity(value);
            });
        
        // Text Colors
        const textFolder = this.trackFolder(playerStyleFolder.addFolder('Text'));
        textFolder.addColor(this.playerStyleParams, 'textColor').name('Text Color')
            .onChange((value) => {
                this.updatePlayerTextColor(value);
            });
        textFolder.add(this.playerStyleParams, 'textOpacity', 0, 1, 0.1).name('Text Opacity')
            .onChange((value) => {
                this.updatePlayerTextOpacity(value);
            });
        
        animationFolder.open();
    }

    // Animation Player Styling Methods
    updatePlayerBackgroundColor(color) {
        // Skip if WordPress is handling styling via CSS
        if (window.flexframeSettings && window.flexframeSettings.uiSettings) {
            return;
        }
        if (this.animationPlayer && this.animationPlayer.container) {
            this.animationPlayer.container.style.backgroundColor = color;
        }
    }

    updatePlayerBackgroundOpacity(opacity) {
        // Skip if WordPress is handling styling via CSS
        if (window.flexframeSettings && window.flexframeSettings.uiSettings) {
            return;
        }
        if (this.animationPlayer && this.animationPlayer.container) {
            const currentBg = this.playerStyleParams.backgroundColor;
            // Convert hex to rgba with opacity
            const r = parseInt(currentBg.slice(1, 3), 16);
            const g = parseInt(currentBg.slice(3, 5), 16);
            const b = parseInt(currentBg.slice(5, 7), 16);
            this.animationPlayer.container.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
    }

    updatePlayerTimeDisplay(show) {
        if (this.animationPlayer && this.animationPlayer.container) {
            const timeDisplay = this.animationPlayer.container.querySelector('.time-display');
            if (timeDisplay) {
                timeDisplay.style.display = show ? 'inline-block' : 'none';
            }
        }
    }

    updatePlayerButtonColor(color) {
        console.log('[FlexFrame UI] updatePlayerButtonColor called with:', color);
        
        // Skip if WordPress is handling styling via CSS (to avoid conflicts with !important rules)
        if (window.flexframeSettings && window.flexframeSettings.uiSettings) {
            console.log('[FlexFrame UI] Skipping JS button color - WordPress CSS will handle it');
            return;
        }
        
        if (this.animationPlayer && this.animationPlayer.container) {
            const buttons = this.animationPlayer.container.querySelectorAll('button');
            buttons.forEach(button => {
                // Set text/icon color (for SVG icons that use currentColor)
                button.style.color = color;
                // Also set fill for any direct SVG children
                const svgs = button.querySelectorAll('svg');
                svgs.forEach(svg => {
                    svg.style.fill = color;
                });
            });
            console.log('[FlexFrame UI] Applied button color to', buttons.length, 'buttons');
        }
    }

    updatePlayerButtonOpacity(opacity) {
        if (this.animationPlayer && this.animationPlayer.container) {
            const buttons = this.animationPlayer.container.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.opacity = opacity;
            });
        }
    }

    updatePlayerScrubberColor(color) {
        // Skip if WordPress is handling styling via CSS
        if (window.flexframeSettings && window.flexframeSettings.uiSettings) {
            return;
        }
        if (this.animationPlayer && this.animationPlayer.container) {
            const scrubber = this.animationPlayer.container.querySelector('.timeline-slider');
            if (scrubber) {
                // Use both accent-color and direct styling for better browser support
                scrubber.style.accentColor = color;
                
                // Also target the slider thumb directly with CSS
                const style = document.createElement('style');
                style.textContent = `
                    .timeline-slider::-webkit-slider-thumb {
                        background-color: ${color} !important;
                    }
                    .timeline-slider::-moz-range-thumb {
                        background-color: ${color} !important;
                    }
                    .timeline-slider {
                        width: 100% !important;
                        flex: 1 !important;
                    }
                    .player-center {
                        flex: 1 !important;
                        margin: 0 10px !important;
                    }
                `;
                
                // Remove existing scrubber style if it exists
                const existingScrubberStyle = document.getElementById('scrubber-color-style');
                if (existingScrubberStyle) {
                    existingScrubberStyle.remove();
                }
                
                style.id = 'scrubber-color-style';
                document.head.appendChild(style);
            }
        }
    }

    updatePlayerScrubberOpacity(opacity) {
        if (this.animationPlayer && this.animationPlayer.container) {
            const scrubber = this.animationPlayer.container.querySelector('.timeline-slider');
            if (scrubber) {
                scrubber.style.opacity = opacity;
            }
        }
    }

    updatePlayerTextColor(color) {
        if (this.animationPlayer && this.animationPlayer.container) {
            const textElements = this.animationPlayer.container.querySelectorAll('.time-display, .speed-menu');
            textElements.forEach(element => {
                element.style.color = color;
            });
        }
    }

    updatePlayerTextOpacity(opacity) {
        if (this.animationPlayer && this.animationPlayer.container) {
            const textElements = this.animationPlayer.container.querySelectorAll('.time-display, .speed-menu');
            textElements.forEach(element => {
                element.style.opacity = opacity;
            });
        }
    }

    setupGUIVisibilityToggle() {
        let guiVisible = false; // Start with GUI hidden
        this.gui.domElement.style.display = 'none'; // Hide immediately
        
        window.addEventListener('keydown', (event) => {
            if (event.key === 'h' || event.key === 'H') {
                // Don't trigger if typing in an input
                if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
                guiVisible = !guiVisible;
                this.gui.domElement.style.display = guiVisible ? 'block' : 'none';
            }
        });

        // CSS to ensure GUI is properly positioned
        const guiStyle = document.createElement('style');
        guiStyle.innerHTML = `
            .dg.ac {
                z-index: 9999 !important;
                top: 10px !important;
                right: 10px !important;
                left: auto !important;
                display: block !important;
            }
        `;
        document.head.appendChild(guiStyle);

    }

    updateGroundMode(mode) {
        this.groundParams.mode = mode;
        this.useShadowMaterial = (mode === 'Infinite Canvas');
        
        if (this.useShadowMaterial) {
            this.ground.geometry = this.planeGeometry;
            this.ground.material = this.shadowGroundMaterial;
            this.ground.receiveShadow = true;
            this.ground.castShadow = false;
        } else {
            this.ground.geometry = this.circleGeometry;
            this.ground.material = this.solidGroundMaterial;
            this.ground.receiveShadow = this.groundParams.receiveShadow;
            this.ground.castShadow = this.groundParams.castShadow;
        }
        
        this.ground.material.needsUpdate = true;
        this.ground.geometry.computeBoundingSphere();
    }

    applyGroundSettings(settings) {
        Object.assign(this.groundParams, settings);
        
        // Apply mode
        this.updateGroundMode(this.groundParams.mode);
        
        // Apply other properties
        this.solidGroundMaterial.color.set(this.groundParams.color);
        this.solidGroundMaterial.roughness = this.groundParams.roughness;
        this.solidGroundMaterial.metalness = this.groundParams.metalness;
        this.shadowGroundMaterial.opacity = this.groundParams.shadowOpacity;
        this.ground.receiveShadow = this.groundParams.receiveShadow;
        this.ground.castShadow = this.groundParams.castShadow;
        this.ground.visible = this.groundParams.visible;
    }

    /**
     * Setup screenshot button in animation player
     */
    setupScreenshotButton() {
        // Create the screenshot panel first (always)
        this.createScreenshotPanel();
        
        if (this.animationPlayer) {
            // Set the screenshot callback to toggle the screenshot panel
            this.animationPlayer.setScreenshotCallback(() => {
                this.toggleScreenshotPanel();
            });
            
            // Check WordPress settings for screenshot button visibility
            const showScreenshotButton = window.flexframeSettings?.showScreenshotButton !== false;
            this.animationPlayer.setScreenshotButtonVisible(showScreenshotButton);
        }
    }
    
    /**
     * Create the screenshot panel UI
     */
    createScreenshotPanel() {
        // Remove existing panel if any
        const existing = document.querySelector('.screenshot-panel');
        if (existing) existing.remove();
        
        // Create panel container
        const panel = document.createElement('div');
        panel.className = 'screenshot-panel';
        panel.innerHTML = `
            <div class="screenshot-panel-header">
                <span>Screenshot Settings</span>
            </div>
            <div class="screenshot-panel-content">
                <div class="ss-tabs">
                    <button class="ss-tab active" data-tab="screenshot">Screenshot</button>
                    <button class="ss-tab" data-tab="video">Video</button>
                    <button class="ss-tab" data-tab="ai" style="display:none">A.I Image</button>
                </div>
                <div class="ss-tab-panel" data-panel="screenshot">
                    <div class="screenshot-presets">
                        <button class="ss-preset-btn" id="ss-preset-thumbnail">Thumbnail</button>
                        <button class="ss-preset-btn" id="ss-preset-hd">HD</button>
                    </div>
                    <div class="screenshot-row">
                        <label>Width</label>
                        <input type="number" id="ss-width" value="800" min="100" max="4096">
                    </div>
                    <div class="screenshot-row">
                        <label>Height</label>
                        <input type="number" id="ss-height" value="800" min="100" max="4096">
                    </div>
                    <div class="screenshot-row">
                        <label>Format</label>
                        <select id="ss-format">
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                            <option value="webp">WebP</option>
                        </select>
                    </div>
                    <div class="screenshot-row checkbox-row">
                        <label>Transparent Background</label>
                        <input type="checkbox" id="ss-transparent">
                    </div>
                    <div class="screenshot-row checkbox-row">
                        <label>Show Floor Shadow</label>
                        <input type="checkbox" id="ss-floor-shadow">
                    </div>
                    <div class="screenshot-row">
                        <label>Filename</label>
                        <input type="text" id="ss-filename" value="screenshot">
                    </div>
                    <div class="screenshot-buttons">
                        <button class="ss-btn ss-custom">Take Screenshot</button>
                    </div>
                </div>
                <div class="ss-tab-panel" data-panel="video" style="display:none">
                    <!-- Preset buttons -->
                    <div class="vid-preset-row">
                        <input type="hidden" id="vid-logo-position" value="top-left">
                        <button class="vid-preset-btn" data-preset="vertical">
                            <span class="vid-preset-thumb vid-preset-thumb--vertical"></span>
                            <span class="vid-preset-name">Vertical Video</span>
                            <span class="vid-preset-ratio">9:16</span>
                        </button>
                        <button class="vid-preset-btn" data-preset="square">
                            <span class="vid-preset-thumb vid-preset-thumb--square"></span>
                            <span class="vid-preset-name">Square Video</span>
                            <span class="vid-preset-ratio">1:1</span>
                        </button>
                    </div>
                    <!-- Vertical preset panel -->
                    <div class="vid-preset-panel" id="vid-preset-vertical" style="display:none">
                        <div class="vid-preset-info">
                            <span class="vid-preset-info-label">Story / Reels</span>
                            <span class="vid-preset-info-dim">1080 × 1920</span>
                        </div>
                    </div>
                    <!-- Square preset panel -->
                    <div class="vid-preset-panel" id="vid-preset-square" style="display:none">
                        <div class="vid-preset-info">
                            <span class="vid-preset-info-label">Square Post</span>
                            <span class="vid-preset-info-dim">1080 × 1080</span>
                        </div>
                    </div>
                    <!-- Custom settings collapsible -->
                    <details class="vid-custom-details">
                        <summary class="vid-custom-summary">&#9662; Custom Video Settings</summary>
                        <div class="vid-custom-body">
                    <div class="screenshot-row">
                        <label>Width</label>
                        <input type="number" id="vid-width" value="2500" min="100" max="4096">
                    </div>
                    <div class="screenshot-row">
                        <label>Height</label>
                        <input type="number" id="vid-height" value="2500" min="100" max="4096">
                    </div>
                    <div class="screenshot-row">
                        <label>Quality</label>
                        <select id="vid-quality">
                            <option value="low">Low</option>
                            <option value="high">High</option>
                            <option value="ultra" selected>Ultra</option>
                        </select>
                    </div>
                    <div class="screenshot-row">
                        <label>Playback Loops</label>
                        <select id="vid-loops">
                            <option value="1" selected>1&times; (full play)</option>
                            <option value="2">2&times;</option>
                            <option value="3">3&times;</option>
                            <option value="4">4&times;</option>
                            <option value="5">5&times;</option>
                            <option value="6">6&times;</option>
                            <option value="7">7&times;</option>
                            <option value="8">8&times;</option>
                            <option value="9">9&times;</option>
                            <option value="10">10&times;</option>
                        </select>
                    </div>
                    <div class="screenshot-row checkbox-row">
                        <label>Show Floor Shadow</label>
                        <input type="checkbox" id="vid-floor-shadow">
                    </div>
                    <div class="screenshot-row checkbox-row">
                        <label>Overlay Logo</label>
                        <input type="checkbox" id="vid-overlay-logo">
                    </div>
                    <div class="screenshot-row checkbox-row">
                        <label>Overlay Exercise Name</label>
                        <input type="checkbox" id="vid-overlay-name">
                    </div>
                    <div class="screenshot-row">
                        <label>Filename</label>
                        <input type="text" id="vid-filename" value="video">
                    </div>
                    <div class="ss-angles-section">
                        <div class="ss-angles-header">
                            <span class="ss-angles-label">Camera Angles</span>
                            <button class="ss-angles-clear-all">Clear All</button>
                        </div>
                        <div class="ss-angles-strip">
                            <div class="ss-vid-angle-slot" data-slot="0">
                                <div class="ss-vid-angle-preview">
                                    <span class="ss-vid-angle-num">1</span>
                                    <button class="ss-vid-clear-btn" data-slot="0">&times;</button>
                                </div>
                                <button class="ss-vid-capture-btn" data-slot="0">Capture 1</button>
                                <details class="ss-vid-adv">
                                    <summary class="ss-vid-adv-toggle">&#9662; Advanced</summary>
                                    <div class="ss-vid-adv-body">
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Pan</span>
                                            <select class="ss-vid-pan-deg" data-slot="0">
                                                <option value="0">None</option>
                                                <option value="15">15°</option>
                                                <option value="30">30°</option>
                                                <option value="45">45°</option>
                                                <option value="90">90°</option>
                                                <option value="180">180°</option>
                                                <option value="360">360°</option>
                                            </select>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Dir</span>
                                            <div class="ss-vid-dir-toggle">
                                                <button type="button" class="ss-vid-dir-btn active" data-dir="left" data-slot="0">◀ L</button>
                                                <button type="button" class="ss-vid-dir-btn" data-dir="right" data-slot="0">R ▶</button>
                                            </div>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Loops</span>
                                            <select class="ss-vid-loop-count" data-slot="0">
                                                <option value="">Global</option>
                                                <option value="1">1×</option>
                                                <option value="2">2×</option>
                                                <option value="3">3×</option>
                                                <option value="4">4×</option>
                                                <option value="5">5×</option>
                                            </select>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div class="ss-vid-angle-slot" data-slot="1">
                                <div class="ss-vid-angle-preview">
                                    <span class="ss-vid-angle-num">2</span>
                                    <button class="ss-vid-clear-btn" data-slot="1">&times;</button>
                                </div>
                                <button class="ss-vid-capture-btn" data-slot="1">Capture 2</button>
                                <details class="ss-vid-adv">
                                    <summary class="ss-vid-adv-toggle">&#9662; Advanced</summary>
                                    <div class="ss-vid-adv-body">
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Pan</span>
                                            <select class="ss-vid-pan-deg" data-slot="1">
                                                <option value="0">None</option>
                                                <option value="15">15°</option>
                                                <option value="30">30°</option>
                                                <option value="45">45°</option>
                                                <option value="90">90°</option>
                                                <option value="180">180°</option>
                                                <option value="360">360°</option>
                                            </select>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Dir</span>
                                            <div class="ss-vid-dir-toggle">
                                                <button type="button" class="ss-vid-dir-btn active" data-dir="left" data-slot="1">◀ L</button>
                                                <button type="button" class="ss-vid-dir-btn" data-dir="right" data-slot="1">R ▶</button>
                                            </div>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Loops</span>
                                            <select class="ss-vid-loop-count" data-slot="1">
                                                <option value="">Global</option>
                                                <option value="1">1×</option>
                                                <option value="2">2×</option>
                                                <option value="3">3×</option>
                                                <option value="4">4×</option>
                                                <option value="5">5×</option>
                                            </select>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div class="ss-vid-angle-slot" data-slot="2">
                                <div class="ss-vid-angle-preview">
                                    <span class="ss-vid-angle-num">3</span>
                                    <button class="ss-vid-clear-btn" data-slot="2">&times;</button>
                                </div>
                                <button class="ss-vid-capture-btn" data-slot="2">Capture 3</button>
                                <details class="ss-vid-adv">
                                    <summary class="ss-vid-adv-toggle">&#9662; Advanced</summary>
                                    <div class="ss-vid-adv-body">
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Pan</span>
                                            <select class="ss-vid-pan-deg" data-slot="2">
                                                <option value="0">None</option>
                                                <option value="15">15°</option>
                                                <option value="30">30°</option>
                                                <option value="45">45°</option>
                                                <option value="90">90°</option>
                                                <option value="180">180°</option>
                                                <option value="360">360°</option>
                                            </select>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Dir</span>
                                            <div class="ss-vid-dir-toggle">
                                                <button type="button" class="ss-vid-dir-btn active" data-dir="left" data-slot="2">◀ L</button>
                                                <button type="button" class="ss-vid-dir-btn" data-dir="right" data-slot="2">R ▶</button>
                                            </div>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Loops</span>
                                            <select class="ss-vid-loop-count" data-slot="2">
                                                <option value="">Global</option>
                                                <option value="1">1×</option>
                                                <option value="2">2×</option>
                                                <option value="3">3×</option>
                                                <option value="4">4×</option>
                                                <option value="5">5×</option>
                                            </select>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div class="ss-vid-angle-slot" data-slot="3">
                                <div class="ss-vid-angle-preview">
                                    <span class="ss-vid-angle-num">4</span>
                                    <button class="ss-vid-clear-btn" data-slot="3">&times;</button>
                                </div>
                                <button class="ss-vid-capture-btn" data-slot="3">Capture 4</button>
                                <details class="ss-vid-adv">
                                    <summary class="ss-vid-adv-toggle">&#9662; Advanced</summary>
                                    <div class="ss-vid-adv-body">
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Pan</span>
                                            <select class="ss-vid-pan-deg" data-slot="3">
                                                <option value="0">None</option>
                                                <option value="15">15°</option>
                                                <option value="30">30°</option>
                                                <option value="45">45°</option>
                                                <option value="90">90°</option>
                                                <option value="180">180°</option>
                                                <option value="360">360°</option>
                                            </select>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Dir</span>
                                            <div class="ss-vid-dir-toggle">
                                                <button type="button" class="ss-vid-dir-btn active" data-dir="left" data-slot="3">◀ L</button>
                                                <button type="button" class="ss-vid-dir-btn" data-dir="right" data-slot="3">R ▶</button>
                                            </div>
                                        </div>
                                        <div class="ss-vid-adv-row">
                                            <span class="ss-vid-adv-label">Loops</span>
                                            <select class="ss-vid-loop-count" data-slot="3">
                                                <option value="">Global</option>
                                                <option value="1">1×</option>
                                                <option value="2">2×</option>
                                                <option value="3">3×</option>
                                                <option value="4">4×</option>
                                                <option value="5">5×</option>
                                            </select>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                        <p class="ss-angles-hint">Set up to 4 camera angles. Each angle records a full clip in sequence. Recording with no angles uses the current view.</p>
                    </div>
                        </div><!-- /vid-custom-body -->
                    </details><!-- /vid-custom-details -->
                    <div class="screenshot-buttons">
                        <button class="ss-btn ss-video">Record Video</button>
                    </div>
                    <div class="ss-video-status" id="ss-video-status"></div>
                </div>
                <div class="ss-tab-panel" data-panel="ai" style="display:none">
                        <input type="hidden" class="ss-ai-provider" value="openai" />
                        <div class="ss-ai-style-row">
                            <label class="ss-ai-style-label">Figure style</label>
                            <div class="ss-ai-style-toggle">
                                <button type="button" class="ss-ai-style-btn" data-style="glass">Anatomy</button>
                                <button type="button" class="ss-ai-style-btn active" data-style="male">Male</button>
                                <button type="button" class="ss-ai-style-btn" data-style="female">Female</button>
                            </div>
                        </div>
                        <div class="ss-ai-angles-row">
                            <div class="ss-ai-angles-header">
                                <label class="ss-ai-style-label">Captured angles (optional, max 2)</label>
                                <button type="button" class="ss-ai-angles-clear" title="Clear captured angles">Clear</button>
                            </div>
                            <div class="ss-ai-angles-strip">
                                <div class="ss-ai-angle-slot" data-slot="0">
                                    <span class="ss-ai-angle-empty">Angle 1</span>
                                </div>
                                <div class="ss-ai-angle-slot" data-slot="1">
                                    <span class="ss-ai-angle-empty">Angle 2</span>
                                </div>
                            </div>
                            <button type="button" class="ss-btn ss-ai-capture-angle">Capture Current View</button>
                            <p class="ss-ai-angles-hint">Tip: You can Generate An AI Instagram Post from any angle and position in the timeline. Capture One OR Two images and press "Generate" to experiment with image generations. When you are done Generate yourself a caption to share on Instagram.</p>
                        </div>
                        <button class="ss-btn ss-ai-generate">Generate AI Post</button>
                        <div class="ss-ai-status"></div>
                </div>
            </div>
            <button class="screenshot-panel-close">✕ Close</button>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .screenshot-panel {
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(30, 30, 30, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 0;
                width: 320px;
                max-width: calc(100vw - 20px);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #fff;
                display: none;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            }
            .screenshot-panel.visible {
                display: block;
            }
            .screenshot-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px 12px 0 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                font-weight: 600;
            }
            .screenshot-panel-close {
                display: block;
                width: auto;
                margin: 0 auto 12px;
                padding: 5px 20px;
                background: rgba(255, 255, 255, 0.07);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: 20px;
                color: rgba(255,255,255,0.5);
                font-size: 11px;
                cursor: pointer;
                text-align: center;
                letter-spacing: 0.05em;
            }
            .screenshot-panel-close:hover {
                background: rgba(255, 60, 60, 0.25);
                border-color: rgba(255, 80, 80, 0.45);
                color: rgba(255,255,255,0.9);
            }
            .screenshot-panel-content {
                padding: 16px;
            }
            .ss-tabs {
                display: flex;
                margin-bottom: 14px;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.15);
                background: rgba(255, 255, 255, 0.04);
            }
            .ss-tab {
                flex: 1;
                padding: 9px 12px;
                background: transparent;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s;
                letter-spacing: 0.3px;
            }
            .ss-tab + .ss-tab {
                border-left: 1px solid rgba(255, 255, 255, 0.15);
            }
            .ss-tab:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #fff;
            }
            .ss-tab.active {
                background: var(--ss-primary-color, #4a9eff);
                color: #fff;
                font-weight: 600;
            }
            .ss-tab-panel {
                padding-top: 4px;
            }
            .screenshot-presets {
                display: flex;
                gap: 8px;
                margin-bottom: 16px;
            }
            .ss-preset-btn {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }
            .ss-preset-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: var(--ss-primary-color, #4a9eff);
            }
            .ss-preset-btn.active {
                background: var(--ss-primary-color, #4a9eff);
                border-color: var(--ss-primary-color, #4a9eff);
            }
            .screenshot-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            .screenshot-row label {
                font-size: 13px;
                opacity: 0.9;
            }
            .screenshot-row input[type="number"],
            .screenshot-row input[type="text"],
            .screenshot-row select {
                width: 120px;
                padding: 6px 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                background: rgba(0, 0, 0, 0.3);
                color: #fff;
                font-size: 13px;
            }
            .screenshot-row input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: var(--ss-primary-color, #4a9eff);
            }
            .checkbox-row {
                flex-direction: row;
            }
            .screenshot-buttons {
                display: flex;
                gap: 10px;
                margin-top: 16px;
            }
            .ss-btn {
                flex: 1;
                padding: 10px 16px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.2s;
            }
            .ss-custom {
                background: var(--ss-primary-color, #4a9eff);
                color: #fff;
            }
            .ss-custom:hover {
                filter: brightness(1.1);
            }
            .ss-video {
                background: rgba(255, 255, 255, 0.12);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.22);
            }
            .ss-video:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .ss-video:disabled {
                opacity: 0.55;
                cursor: not-allowed;
            }
            .ss-video-status {
                margin-top: 8px;
                min-height: 14px;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.68);
            }
            .ss-video-status.error {
                color: #ff6b6b;
            }
            .ss-video-status.success {
                color: #4ade80;
            }
            @keyframes ss-spin {
                to { transform: rotate(360deg); }
            }
            .ss-video.recording {
                position: relative;
                color: transparent !important;
                pointer-events: none;
            }
            .ss-video.recording::after {
                content: '';
                position: absolute;
                inset: 0;
                margin: auto;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: #fff;
                border-radius: 50%;
                animation: ss-spin 0.7s linear infinite;
            }
            .ss-ai-tab-content {
                margin-top: 0;
            }
            .ss-group {
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 10px;
                background: rgba(255, 255, 255, 0.02);
            }
            .ss-group-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 12px;
                cursor: pointer;
                user-select: none;
                background: rgba(255, 255, 255, 0.04);
                transition: background 0.15s;
            }
            .ss-group-header:hover {
                background: rgba(255, 255, 255, 0.08);
            }
            .ss-group-title {
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                opacity: 0.9;
            }
            .ss-group-chevron {
                font-size: 12px;
                opacity: 0.7;
                transition: transform 0.2s;
            }
            .ss-group.collapsed .ss-group-chevron {
                transform: rotate(-90deg);
            }
            .ss-group-body {
                padding: 12px;
                display: block;
            }
            .ss-group.collapsed .ss-group-body {
                display: none;
            }
            .ss-ai-divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.15);
                margin-bottom: 12px;
            }
            .ss-ai-label {
                font-size: 12px;
                font-weight: 600;
                opacity: 0.85;
                margin-bottom: 8px;
                letter-spacing: 0.5px;
                text-transform: uppercase;
            }
            .ss-ai-provider-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                gap: 8px;
            }
            .ss-ai-provider-row label {
                font-size: 12px;
                opacity: 0.85;
            }
            .ss-ai-provider {
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 6px 8px;
                border-radius: 6px;
                font-size: 12px;
            }
            .ss-ai-provider option { background: #1e1e1e; color: #fff; }
            .ss-ai-style-row {
                display: flex; flex-direction: column; gap: 6px;
                margin-bottom: 8px;
            }
            .ss-ai-style-label {
                font-size: 11px; opacity: 0.85; color: #fff;
            }
            .ss-ai-style-toggle {
                display: flex; gap: 0;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px; overflow: hidden;
                background: rgba(255,255,255,0.05);
            }
            .ss-ai-style-btn {
                flex: 1; padding: 8px 10px;
                background: transparent; color: #fff;
                border: none; cursor: pointer;
                font-size: 12px; font-weight: 500;
                transition: background 0.15s;
            }
            .ss-ai-style-btn + .ss-ai-style-btn {
                border-left: 1px solid rgba(255,255,255,0.2);
            }
            .ss-ai-style-btn:hover { background: rgba(255,255,255,0.08); }
            .ss-ai-style-btn.active {
                background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
                color: #fff;
            }
            .ss-ai-angles-row {
                margin: 12px 0 8px 0;
                display: flex; flex-direction: column; gap: 8px;
            }
            .ss-ai-angles-header {
                display: flex; align-items: center; justify-content: space-between;
            }
            .ss-ai-angles-clear {
                background: transparent; color: #aaa;
                border: none; cursor: pointer;
                font-size: 11px; text-decoration: underline;
                padding: 2px 4px;
            }
            .ss-ai-angles-clear:hover { color: #fff; }
            .ss-ai-angles-strip {
                display: flex; flex-direction: row; gap: 8px;
                align-items: flex-start;
            }
            .ss-ai-angle-slot {
                width: 72px; height: 72px;
                border: 1px dashed rgba(255,255,255,0.25);
                border-radius: 6px;
                background: rgba(255,255,255,0.04);
                display: flex; align-items: center; justify-content: center;
                overflow: hidden;
                position: relative;
                flex: 0 0 auto;
            }
            .ss-ai-angle-slot.filled {
                border: 1px solid rgba(139,92,246,0.6);
                background: #000;
            }
            .ss-ai-angle-slot img {
                width: 100%; height: 100%; object-fit: cover;
            }
            .ss-ai-angle-empty {
                font-size: 11px; opacity: 0.5;
            }
            .ss-ai-capture-angle {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: #fff;
                font-size: 12px;
                padding: 8px 12px;
            }
            .ss-ai-capture-angle:hover {
                background: rgba(255,255,255,0.18);
            }
            .ss-ai-angles-hint {
                font-size: 10px; opacity: 0.6;
                margin: 0; line-height: 1.4;
            }
            .ss-ai-generate {
                width: 100%;
                padding: 10px 16px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 600;
                background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
                color: #fff;
                transition: all 0.2s;
            }
            .ss-ai-generate:hover {
                filter: brightness(1.1);
            }
            .ss-ai-generate:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            .ss-ai-status {
                margin-top: 8px;
                font-size: 11px;
                opacity: 0.8;
                min-height: 14px;
            }
            .ss-ai-status.error { color: #ff6b6b; }
            .ss-ai-status.success { color: #4ade80; }
            .ss-angles-section {
                margin: 14px 0 10px 0;
                border-top: 1px solid rgba(255,255,255,0.1);
                padding-top: 12px;
            }
            .ss-angles-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            .ss-angles-label {
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                opacity: 0.85;
            }
            .ss-angles-clear-all {
                background: transparent;
                border: none;
                color: rgba(255,255,255,0.5);
                font-size: 11px;
                cursor: pointer;
                text-decoration: underline;
                padding: 2px 4px;
            }
            .ss-angles-clear-all:hover { color: #fff; }
            .ss-angles-strip {
                display: flex;
                gap: 8px;
            }
            .ss-vid-angle-slot {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: center;
            }
            .ss-vid-angle-preview {
                width: 100%;
                aspect-ratio: 1;
                border: 1px dashed rgba(255,255,255,0.25);
                border-radius: 6px;
                background: rgba(255,255,255,0.04);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                position: relative;
            }
            .ss-vid-angle-preview.captured {
                border: 1px solid rgba(74,158,255,0.6);
            }
            .ss-vid-angle-preview img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
            .ss-vid-angle-num {
                font-size: 20px;
                opacity: 0.3;
                font-weight: 700;
            }
            .ss-vid-clear-btn {
                position: absolute;
                top: 3px;
                right: 3px;
                width: 18px;
                height: 18px;
                background: rgba(0,0,0,0.7);
                border: none;
                border-radius: 50%;
                color: #fff;
                font-size: 11px;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 0;
                line-height: 1;
            }
            .ss-vid-clear-btn:hover { background: rgba(200,50,50,0.85); }
            .ss-vid-angle-preview.captured .ss-vid-clear-btn {
                display: flex;
            }
            .ss-vid-capture-btn {
                width: 100%;
                padding: 5px 4px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 5px;
                color: #fff;
                font-size: 10px;
                cursor: pointer;
                transition: background 0.15s;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .ss-vid-capture-btn:hover { background: rgba(255,255,255,0.15); }
            .ss-angles-hint {
                font-size: 10px;
                opacity: 0.5;
                margin: 6px 0 0 0;
                line-height: 1.4;
            }
            /* Per-slot Advanced settings */
            .ss-vid-adv {
                width: 100%;
            }
            .ss-vid-adv-toggle {
                font-size: 8px;
                line-height: 1.2;
                opacity: 0.4;
                cursor: pointer;
                list-style: none;
                text-align: center;
                padding: 2px 0 1px;
                user-select: none;
                letter-spacing: 0.02em;
            }
            .ss-vid-adv-toggle::-webkit-details-marker { display: none; }
            .ss-vid-adv-toggle:hover { opacity: 0.8; }
            details[open] .ss-vid-adv-toggle { opacity: 0.7; }
            .ss-vid-adv-body {
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding: 5px 0 3px;
                border-top: 1px solid rgba(255,255,255,0.08);
                margin-top: 2px;
            }
            .ss-vid-adv-row {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .ss-vid-adv-label {
                font-size: 9px;
                opacity: 0.5;
                min-width: 18px;
            }
            .ss-vid-pan-deg,
            .ss-vid-loop-count {
                flex: 1;
                min-width: 0;
                background: rgba(255,255,255,0.07);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 4px;
                color: #fff;
                font-size: 9px;
                padding: 2px 3px;
                cursor: pointer;
            }
            .ss-vid-pan-deg option,
            .ss-vid-loop-count option { background: #1a1a2e; }
            .ss-vid-dir-toggle {
                display: flex;
                flex: 1;
                gap: 3px;
            }
            .ss-vid-dir-btn {
                flex: 1;
                padding: 3px 2px;
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 4px;
                color: rgba(255,255,255,0.45);
                font-size: 9px;
                cursor: pointer;
                transition: background 0.15s, color 0.15s, border-color 0.15s;
            }
            .ss-vid-dir-btn.active {
                background: rgba(74,158,255,0.2);
                border-color: rgba(74,158,255,0.55);
                color: #6ab4ff;
            }
            .ss-vid-dir-btn:hover:not(.active) { background: rgba(255,255,255,0.12); color: #fff; }
            /* Hide AI tab on mobile-sized viewports */
            @media (max-width: 768px) {
                .ss-tab[data-tab="ai"] { display: none !important; }
            }
            /* Video preset buttons */
            .vid-preset-row {
                display: flex;
                gap: 8px;
                margin-bottom: 10px;
            }
            .vid-preset-btn {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                padding: 10px 8px;
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 10px;
                color: #fff;
                cursor: pointer;
                transition: background 0.15s, border-color 0.15s;
            }
            .vid-preset-btn:hover {
                background: rgba(255,255,255,0.12);
                border-color: rgba(255,255,255,0.3);
            }
            .vid-preset-btn.active {
                background: rgba(74,158,255,0.15);
                border-color: rgba(74,158,255,0.5);
            }
            .vid-preset-thumb {
                display: block;
                border: 2px solid rgba(255,255,255,0.4);
                border-radius: 3px;
                background: rgba(255,255,255,0.08);
            }
            .vid-preset-thumb--vertical {
                width: 18px;
                height: 32px;
            }
            .vid-preset-thumb--square {
                width: 26px;
                height: 26px;
            }
            .vid-preset-name {
                font-size: 11px;
                font-weight: 600;
                text-align: center;
                line-height: 1.2;
            }
            .vid-preset-ratio {
                font-size: 10px;
                color: rgba(255,255,255,0.45);
            }
            /* Preset info panel */
            .vid-preset-panel {
                background: rgba(74,158,255,0.08);
                border: 1px solid rgba(74,158,255,0.25);
                border-radius: 8px;
                padding: 10px 12px;
                margin-bottom: 10px;
                font-size: 12px;
            }
            .vid-preset-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .vid-preset-info-label {
                color: rgba(255,255,255,0.7);
                font-weight: 500;
            }
            .vid-preset-info-dim {
                color: rgba(74,158,255,0.9);
                font-weight: 600;
                font-size: 11px;
            }
            /* Custom settings collapsible */
            .vid-custom-details {
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 8px;
                margin-bottom: 10px;
                overflow: hidden;
            }
            .vid-custom-summary {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 12px;
                background: rgba(255,255,255,0.06);
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                color: rgba(255,255,255,0.7);
                list-style: none;
                user-select: none;
            }
            .vid-custom-summary::-webkit-details-marker { display: none; }
            .vid-custom-summary:hover { color: #fff; background: rgba(255,255,255,0.1); }
            .vid-custom-body {
                padding: 10px 4px 4px;
            }
        `;
        
        // Get primary color from WordPress settings
        const primaryColor = window.flexframeSettings?.primaryColor || '#4a9eff';
        
        // Find the container
        const container = document.getElementById('flexframe-viewer-container') || document.body;
        
        // Set CSS variable for primary color
        container.style.setProperty('--ss-primary-color', primaryColor);
        
        container.appendChild(style);
        container.appendChild(panel);
        
        this.screenshotPanel = panel;
        
        // Create the screenshot frame for preview
        this.createScreenshotFrameForPanel();
        
        // Setup event listeners
        panel.querySelector('.screenshot-panel-close').addEventListener('click', () => {
            this.toggleScreenshotPanel(false);
        });

        // Tab switching
        panel.querySelectorAll('.ss-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                panel.querySelectorAll('.ss-tab').forEach(t => t.classList.remove('active'));
                panel.querySelectorAll('.ss-tab-panel').forEach(p => { p.style.display = 'none'; });
                tab.classList.add('active');
                panel.querySelector(`.ss-tab-panel[data-panel="${tab.dataset.tab}"]`).style.display = 'block';
                // Update frame overlay for the newly active tab's dimensions
                if (tab.dataset.tab === 'video') {
                    this.updateScreenshotFramePanel(
                        parseInt(panel.querySelector('#vid-width').value),
                        parseInt(panel.querySelector('#vid-height').value)
                    );
                } else if (tab.dataset.tab === 'screenshot') {
                    this.updateScreenshotFramePanel(
                        parseInt(panel.querySelector('#ss-width').value),
                        parseInt(panel.querySelector('#ss-height').value)
                    );
                }
            });
        });

        // Collapsible group headers (AI section)
        panel.querySelectorAll('.ss-group-header').forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('collapsed');
            });
        });
        
        // Update frame when dimensions change (frame is always visible)
        panel.querySelector('#ss-width').addEventListener('input', (e) => {
            this.updateScreenshotFramePanel(parseInt(e.target.value), parseInt(panel.querySelector('#ss-height').value));
        });
        panel.querySelector('#ss-height').addEventListener('input', (e) => {
            this.updateScreenshotFramePanel(parseInt(panel.querySelector('#ss-width').value), parseInt(e.target.value));
        });
        panel.querySelector('#vid-width').addEventListener('input', (e) => {
            this.updateScreenshotFramePanel(parseInt(e.target.value), parseInt(panel.querySelector('#vid-height').value));
        });
        panel.querySelector('#vid-height').addEventListener('input', (e) => {
            this.updateScreenshotFramePanel(parseInt(panel.querySelector('#vid-width').value), parseInt(e.target.value));
        });
        
        // Preset buttons
        panel.querySelector('#ss-preset-thumbnail').addEventListener('click', () => {
            panel.querySelector('#ss-width').value = 250;
            panel.querySelector('#ss-height').value = 250;
            panel.querySelector('#ss-format').value = 'webp';
            this.updateScreenshotFramePanel(250, 250);
            // Update active state
            panel.querySelectorAll('.ss-preset-btn').forEach(btn => btn.classList.remove('active'));
            panel.querySelector('#ss-preset-thumbnail').classList.add('active');
        });
        
        panel.querySelector('#ss-preset-hd').addEventListener('click', () => {
            panel.querySelector('#ss-width').value = 1920;
            panel.querySelector('#ss-height').value = 1080;
            panel.querySelector('#ss-format').value = 'png';
            this.updateScreenshotFramePanel(1920, 1080);
            // Update active state
            panel.querySelectorAll('.ss-preset-btn').forEach(btn => btn.classList.remove('active'));
            panel.querySelector('#ss-preset-hd').classList.add('active');
        });
        
        // Take screenshot button
        panel.querySelector('.ss-custom').addEventListener('click', () => {
            this.takeCustomScreenshot();
        });

        panel.querySelector('.ss-video').addEventListener('click', () => {
            this.recordCustomVideo();
        });

        // Video preset buttons — toggle their panel and apply dimensions
        const vidPresetConfigs = {
            vertical: { w: 1080, h: 1920 },
            square:   { w: 1080, h: 1080 },
        };
        panel.querySelectorAll('.vid-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.dataset.preset;
                const isActive = btn.classList.contains('active');
                // Deactivate all
                panel.querySelectorAll('.vid-preset-btn').forEach(b => b.classList.remove('active'));
                panel.querySelectorAll('.vid-preset-panel').forEach(p => { p.style.display = 'none'; });
                if (!isActive) {
                    btn.classList.add('active');
                    panel.querySelector(`#vid-preset-${preset}`).style.display = 'block';
                    // Apply dimensions to hidden inputs so Record Video uses them
                    const cfg = vidPresetConfigs[preset];
                    if (cfg) {
                        panel.querySelector('#vid-width').value = cfg.w;
                        panel.querySelector('#vid-height').value = cfg.h;
                        this.updateScreenshotFramePanel(cfg.w, cfg.h);
                    }
                }
            });
        });

        // Video angle capture/clear
        this._videoAngles = [null, null, null, null];
        panel.querySelectorAll('.ss-vid-capture-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const slot = parseInt(btn.dataset.slot);
                btn.textContent = 'Capturing...';
                btn.disabled = true;
                await this.captureVideoAngle(slot);
                btn.disabled = false;
            });
        });
        panel.querySelectorAll('.ss-vid-clear-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const slot = parseInt(btn.dataset.slot);
                this._videoAngles[slot] = null;
                this.updateVideoAngleSlot(slot);
            });
        });
        panel.querySelectorAll('.ss-vid-dir-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = btn.dataset.slot;
                panel.querySelectorAll(`.ss-vid-dir-btn[data-slot="${slot}"]`).forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        panel.querySelector('.ss-angles-clear-all').addEventListener('click', () => {
            this._videoAngles = [null, null, null, null];
            [0, 1, 2, 3].forEach(i => this.updateVideoAngleSlot(i));
        });

        // AI Post tab - only visible when server says AI is available
        const aiTabBtn = panel.querySelector('.ss-tab[data-tab="ai"]');
        const aiBtn = panel.querySelector('.ss-ai-generate');
        const isMobileViewport = () => window.matchMedia('(max-width: 768px)').matches;
        if (window.flexframeSettings?.aiRenderEnabled && aiTabBtn && aiBtn && !isMobileViewport()) {
            aiTabBtn.style.display = 'inline-block';

            // Style toggle: only one button can be active at a time.
            const styleButtons = panel.querySelectorAll('.ss-ai-style-btn');
            styleButtons.forEach(b => {
                b.addEventListener('click', () => {
                    styleButtons.forEach(x => x.classList.remove('active'));
                    b.classList.add('active');
                });
            });

            // Aspect ratio toggle: only one button can be active at a time.
            const aspectButtons = panel.querySelectorAll('.ss-ai-aspect-btn');
            aspectButtons.forEach(b => {
                b.addEventListener('click', () => {
                    aspectButtons.forEach(x => x.classList.remove('active'));
                    b.classList.add('active');
                });
            });

            // Captured angles state (up to 2 pre-captured screenshots).
            this._aiCapturedAngles = [];
            const renderAngleSlots = () => {
                const slots = panel.querySelectorAll('.ss-ai-angle-slot');
                slots.forEach((slot, i) => {
                    const dataUrl = this._aiCapturedAngles[i];
                    slot.innerHTML = '';
                    if (dataUrl) {
                        slot.classList.add('filled');
                        const img = document.createElement('img');
                        img.src = dataUrl;
                        slot.appendChild(img);
                    } else {
                        slot.classList.remove('filled');
                        const span = document.createElement('span');
                        span.className = 'ss-ai-angle-empty';
                        span.textContent = `Angle ${i + 1}`;
                        slot.appendChild(span);
                    }
                });
                const captureBtn = panel.querySelector('.ss-ai-capture-angle');
                if (captureBtn) {
                    if (this._aiCapturedAngles.length >= 2) {
                        captureBtn.disabled = true;
                        captureBtn.textContent = 'Both Angles Captured';
                    } else {
                        captureBtn.disabled = false;
                        captureBtn.textContent = `Capture ${this._aiCapturedAngles.length === 0 ? 'Angle 1' : 'Angle 2'}`;
                    }
                }
            };

            const captureAngleBtn = panel.querySelector('.ss-ai-capture-angle');
            if (captureAngleBtn) {
                captureAngleBtn.addEventListener('click', async () => {
                    if (this._aiCapturedAngles.length >= 2) return;
                    captureAngleBtn.disabled = true;
                    captureAngleBtn.textContent = 'Capturing...';
                    try {
                        const aspect = panel?.querySelector('.ss-ai-aspect-btn.active')?.dataset.aspect || 'square';
                        const dataUrl = await this.captureBlobForAi(1024, aspect);
                        this._aiCapturedAngles.push(dataUrl);
                    } catch (err) {
                        console.error('[FlexFrame AI] Capture failed:', err);
                    }
                    renderAngleSlots();
                });
            }

            const clearAnglesBtn = panel.querySelector('.ss-ai-angles-clear');
            if (clearAnglesBtn) {
                clearAnglesBtn.addEventListener('click', () => {
                    this._aiCapturedAngles = [];
                    renderAngleSlots();
                });
            }

            // Allow clicking a filled slot to remove just that one.
            panel.querySelectorAll('.ss-ai-angle-slot').forEach(slot => {
                slot.addEventListener('click', () => {
                    const idx = parseInt(slot.dataset.slot, 10);
                    if (!isNaN(idx) && this._aiCapturedAngles[idx]) {
                        this._aiCapturedAngles.splice(idx, 1);
                        renderAngleSlots();
                    }
                });
            });

            renderAngleSlots();

            aiBtn.addEventListener('click', () => {
                this.generateAiSocialPost();
            });
        }
        
        // Update filename when exercise changes
        document.addEventListener('exercisesSelected', () => {
            if (this.currentExerciseName) {
                panel.querySelector('#ss-filename').value = this.currentExerciseName;
                panel.querySelector('#vid-filename').value = this.currentExerciseName;
            }
        });
        
        // Set initial filename
        if (this.currentExerciseName) {
            panel.querySelector('#ss-filename').value = this.currentExerciseName;
            panel.querySelector('#vid-filename').value = this.currentExerciseName;
        }
    }
    
    /**
     * Create screenshot frame overlay for panel preview
     */
    createScreenshotFrameForPanel() {
        // Remove existing if any
        const existing = document.querySelector('.screenshot-frame-panel');
        if (existing) existing.remove();
        
        const frame = document.createElement('div');
        frame.className = 'screenshot-frame-panel';
        frame.innerHTML = `
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <div class="frame-info-panel"></div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .screenshot-frame-panel {
                position: fixed;
                pointer-events: none;
                border: 2px solid #4a9eff;
                background: rgba(74, 158, 255, 0.1);
                z-index: 9999;
                display: none;
                box-shadow: 0 0 20px rgba(74, 158, 255, 0.3);
            }
            .screenshot-frame-panel.visible {
                display: block;
            }
            .screenshot-frame-panel .frame-corner {
                position: absolute;
                width: 16px;
                height: 16px;
                border: 2px solid #4a9eff;
                background: rgba(74, 158, 255, 0.8);
            }
            .screenshot-frame-panel .frame-corner.top-left {
                top: -2px;
                left: -2px;
                border-right: none;
                border-bottom: none;
            }
            .screenshot-frame-panel .frame-corner.top-right {
                top: -2px;
                right: -2px;
                border-left: none;
                border-bottom: none;
            }
            .screenshot-frame-panel .frame-corner.bottom-left {
                bottom: -2px;
                left: -2px;
                border-right: none;
                border-top: none;
            }
            .screenshot-frame-panel .frame-corner.bottom-right {
                bottom: -2px;
                right: -2px;
                border-left: none;
                border-top: none;
            }
            .frame-info-panel {
                position: absolute;
                bottom: -28px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(74, 158, 255, 0.9);
                color: #fff;
                padding: 4px 10px;
                border-radius: 4px;
                font-size: 11px;
                font-family: monospace;
                white-space: nowrap;
            }
        `;
        
        const container = document.getElementById('flexframe-viewer-container') || document.body;
        container.appendChild(style);
        container.appendChild(frame);
        
        this.screenshotFramePanel = frame;
    }
    
    /**
     * Toggle screenshot frame panel visibility
     */
    toggleScreenshotFramePanel(visible) {
        if (this.screenshotFramePanel) {
            this.screenshotFramePanel.classList.toggle('visible', visible);
        }
    }
    
    /**
     * Update screenshot frame panel position and size
     */
    updateScreenshotFramePanel(width, height) {
        if (!this.screenshotFramePanel) return;
        
        // Use viewport dimensions (frame is position:fixed)
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // Calculate scale to fit frame in viewport while maintaining aspect ratio
        const targetAspect = width / height;
        const viewportAspect = vw / vh;
        
        let frameWidth, frameHeight;
        
        if (targetAspect > viewportAspect) {
            // Width limited
            frameWidth = Math.min(width, vw * 0.8);
            frameHeight = frameWidth / targetAspect;
        } else {
            // Height limited
            frameHeight = Math.min(height, vh * 0.8);
            frameWidth = frameHeight * targetAspect;
        }
        
        // Center the frame in the viewport
        const left = (vw - frameWidth) / 2;
        const top = (vh - frameHeight) / 2;
        
        this.screenshotFramePanel.style.width = `${frameWidth}px`;
        this.screenshotFramePanel.style.height = `${frameHeight}px`;
        this.screenshotFramePanel.style.left = `${left}px`;
        this.screenshotFramePanel.style.top = `${top}px`;
        
        // Update info label
        const infoLabel = this.screenshotFramePanel.querySelector('.frame-info-panel');
        if (infoLabel) {
            infoLabel.textContent = `${width} x ${height}`;
        }
    }
    
    /**
     * Toggle screenshot panel visibility
     */
    toggleScreenshotPanel(forceState) {
        if (!this.screenshotPanel) return;
        
        const isVisible = this.screenshotPanel.classList.contains('visible');
        const newState = forceState !== undefined ? forceState : !isVisible;
        
        this.screenshotPanel.classList.toggle('visible', newState);
        
        // Show/hide frame with panel (always on when panel is open)
        if (newState) {
            // Show frame and update it based on the active tab
            this.toggleScreenshotFramePanel(true);
            const activeTab = this.screenshotPanel.querySelector('.ss-tab.active')?.dataset.tab;
            let width, height;
            if (activeTab === 'video') {
                width = parseInt(this.screenshotPanel.querySelector('#vid-width').value);
                height = parseInt(this.screenshotPanel.querySelector('#vid-height').value);
            } else {
                width = parseInt(this.screenshotPanel.querySelector('#ss-width').value);
                height = parseInt(this.screenshotPanel.querySelector('#ss-height').value);
            }
            this.updateScreenshotFramePanel(width, height);
            
            // Update filename
            if (this.currentExerciseName) {
                this.screenshotPanel.querySelector('#ss-filename').value = this.currentExerciseName;
            }
        } else {
            // Hide frame when closing panel
            this.toggleScreenshotFramePanel(false);
        }
    }
    
    /**
     * Take a quick screenshot (viewport size, 2x resolution)
     */
    async takeQuickScreenshot() {
        const renderer = this.renderer;
        const scene = this.sceneManager.getScene();
        const camera = this.cameraManager.getCamera();
        const canvas = renderer.domElement;
        
        const filename = this.screenshotPanel?.querySelector('#ss-filename')?.value || 
                        (this.currentExerciseName ? this.currentExerciseName.replace(/\s+/g, '_') : 'flexframe_screenshot');
        const format = this.screenshotPanel?.querySelector('#ss-format')?.value || 'png';
        const transparent = this.screenshotPanel?.querySelector('#ss-transparent')?.checked || false;
        
        try {
            const result = await ScreenshotUtils.takeScreenshot(renderer, scene, camera, {
                width: canvas.clientWidth * 2,
                height: canvas.clientHeight * 2,
                filename: filename,
                format: format,
                transparent: transparent
            });
            
            if (result.success) {
                console.log(`📸 Quick screenshot saved: ${result.filename}`);
            } else {
                console.error('Screenshot failed:', result.error);
            }
        } catch (error) {
            console.error('Screenshot error:', error);
        }
    }
    
    /**
     * Take a custom screenshot with specified dimensions
     */
    async takeCustomScreenshot() {
        const renderer = this.renderer;
        const scene = this.sceneManager.getScene();
        const camera = this.cameraManager.getCamera();
        
        const width = parseInt(this.screenshotPanel?.querySelector('#ss-width')?.value) || 800;
        const height = parseInt(this.screenshotPanel?.querySelector('#ss-height')?.value) || 800;
        const baseFilename = this.screenshotPanel?.querySelector('#ss-filename')?.value || 'screenshot';
        const format = this.screenshotPanel?.querySelector('#ss-format')?.value || 'png';
        const transparent = this.screenshotPanel?.querySelector('#ss-transparent')?.checked || false;
        const showFloorShadow = this.screenshotPanel?.querySelector('#ss-floor-shadow')?.checked || false;
        
        // Add dimensions to filename
        const filename = `${baseFilename}_${width}x${height}`;
        
        // Store original ground visibility
        const originalGroundVisible = this.ground ? this.ground.visible : false;
        
        // Show/hide ground based on floor shadow setting
        if (this.ground) {
            this.ground.visible = showFloorShadow;
        }
        
        // Get frame dimensions to properly crop the screenshot
        let frameWidth = null, frameHeight = null;
        let containerWidth = null, containerHeight = null;
        
        if (this.screenshotFramePanel) {
            const container = document.getElementById('flexframe-viewer-container');
            if (container) {
                const containerRect = container.getBoundingClientRect();
                containerWidth = containerRect.width;
                containerHeight = containerRect.height;
                
                // Get the actual frame dimensions on screen
                frameWidth = parseFloat(this.screenshotFramePanel.style.width) || 0;
                frameHeight = parseFloat(this.screenshotFramePanel.style.height) || 0;
            }
        }
        
        try {
            const result = await ScreenshotUtils.takeScreenshot(renderer, scene, camera, {
                width: width,
                height: height,
                filename: filename,
                format: format,
                transparent: transparent,
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                containerWidth: containerWidth,
                containerHeight: containerHeight
            });
            
            if (result.success) {
                console.log(`📸 Custom screenshot saved: ${result.filename} (${width}x${height})`);
            } else {
                console.error('Screenshot failed:', result.error);
            }
        } catch (error) {
            console.error('Screenshot error:', error);
        } finally {
            // Restore original ground visibility
            if (this.ground) {
                this.ground.visible = originalGroundVisible;
            }
        }
    }

    /**
     * Record one full animation play-through as a WebM video.
     */
    async recordCustomVideo() {
        const renderer = this.renderer;
        const scene = this.sceneManager.getScene();
        const camera = this.cameraManager.getCamera();

        const width = parseInt(this.screenshotPanel?.querySelector('#vid-width')?.value) || 2500;
        const height = parseInt(this.screenshotPanel?.querySelector('#vid-height')?.value) || 2500;
        const baseFilename = this.screenshotPanel?.querySelector('#vid-filename')?.value || 'video';
        const showFloorShadow = this.screenshotPanel?.querySelector('#vid-floor-shadow')?.checked || false;
        const overlayLogo = this.screenshotPanel?.querySelector('#vid-overlay-logo')?.checked || false;
        const overlayName = this.screenshotPanel?.querySelector('#vid-overlay-name')?.checked || false;
        const overlayLogoPosition = this.screenshotPanel?.querySelector('#vid-logo-position')?.value || 'top-left';
        const videoQuality = this.screenshotPanel?.querySelector('#vid-quality')?.value || 'ultra';
        const videoLoops = parseInt(this.screenshotPanel?.querySelector('#vid-loops')?.value) || 1;
        const recordButton = this.screenshotPanel?.querySelector('.ss-video');
        const status = this.screenshotPanel?.querySelector('#ss-video-status');

        const filename = `${baseFilename}_${width}x${height}`;

        let frameWidth = null, frameHeight = null;
        let containerWidth = null, containerHeight = null;

        if (this.screenshotFramePanel) {
            const container = document.getElementById('flexframe-viewer-container');
            if (container) {
                const containerRect = container.getBoundingClientRect();
                containerWidth = containerRect.width;
                containerHeight = containerRect.height;
                frameWidth = parseFloat(this.screenshotFramePanel.style.width) || 0;
                frameHeight = parseFloat(this.screenshotFramePanel.style.height) || 0;
            }
        }

        if (recordButton) {
            recordButton.disabled = true;
            recordButton.classList.add('recording');
        }
        const capturedAngles = (this._videoAngles || []).map((a, i) => {
            if (!a) return null;
            const slotEl = this.screenshotPanel?.querySelector(`.ss-vid-angle-slot[data-slot="${i}"]`);
            const panDeg = parseFloat(slotEl?.querySelector('.ss-vid-pan-deg')?.value || '0') || 0;
            const activeDir = slotEl?.querySelector('.ss-vid-dir-btn.active');
            const panDir = activeDir?.dataset.dir === 'right' ? -1 : 1;
            const loopVal = slotEl?.querySelector('.ss-vid-loop-count')?.value;
            const perLoops = loopVal ? Math.max(1, parseInt(loopVal)) : null;
            return { ...a, panDegrees: panDeg, panDirection: panDir, loops: perLoops };
        }).filter(a => a !== null);
        if (status) {
            status.className = 'ss-video-status';
            const loopLabel = videoLoops === 1 ? '1 loop' : `${videoLoops} loops`;
            const angleLabel = capturedAngles.length >= 2 ? `, ${capturedAngles.length} angles` : '';
            status.textContent = `Recording ${loopLabel}${angleLabel} (${videoQuality} quality)...`;
        }

        try {
            const result = await ScreenshotUtils.recordTimelineVideo(renderer, scene, camera, this.animationPlayer, this.mixer, {
                width,
                height,
                filename,
                fps: 30,
                quality: videoQuality,
                loops: videoLoops,
                cameraAngles: capturedAngles,
                frameWidth,
                frameHeight,
                containerWidth,
                containerHeight,
                showFloorShadow,
                ground: this.ground,
                overlayLogoUrl: overlayLogo ? (window.flexframeSettings?.logoUrl || null) : null,
                overlayLogoPosition: overlayLogoPosition,
                overlayExerciseName: overlayName ? (this.currentExerciseName || null) : null
            });

            if (result.success) {
                console.log(`🎥 Video saved: ${result.filename} (${width}x${height})`);
                if (status) {
                    status.classList.add('success');
                    status.textContent = `Saved ${result.filename}`;
                }
            } else {
                console.error('Video recording failed:', result.error);
                if (status) {
                    status.classList.add('error');
                    status.textContent = result.error || 'Video recording failed.';
                }
            }
        } catch (error) {
            console.error('Video recording error:', error);
            if (status) {
                status.classList.add('error');
                status.textContent = error.message || 'Video recording failed.';
            }
        } finally {
            if (recordButton) {
                recordButton.disabled = false;
                recordButton.classList.remove('recording');
            }
        }
    }

    /**
     * Capture current camera position/target/fov as a video angle, render a thumbnail.
     */
    async captureVideoAngle(slotIndex) {
        const camera = this.cameraManager.getCamera();
        const controls = this.cameraManager.getControls();
        const scene = this.sceneManager.getScene();

        const position = camera.position.clone();
        const target = controls.target.clone();
        const fov = camera.fov;

        // Render small thumbnail from current view
        const THUMB = 96;
        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = THUMB;
        thumbCanvas.height = THUMB;
        const thumbRenderer = new THREE.WebGLRenderer({
            canvas: thumbCanvas,
            antialias: false,
            preserveDrawingBuffer: true,
            alpha: false
        });
        thumbRenderer.setSize(THUMB, THUMB);
        thumbRenderer.setPixelRatio(1);
        thumbRenderer.shadowMap.enabled = this.renderer.shadowMap.enabled;
        thumbRenderer.shadowMap.type = this.renderer.shadowMap.type;
        thumbRenderer.toneMapping = this.renderer.toneMapping;
        thumbRenderer.toneMappingExposure = this.renderer.toneMappingExposure;
        thumbRenderer.setClearColor(this.renderer.getClearColor(new THREE.Color()), this.renderer.getClearAlpha());

        const thumbCam = camera.clone();
        thumbCam.aspect = 1;
        thumbCam.updateProjectionMatrix();
        thumbRenderer.render(scene, thumbCam);
        const thumbnailUrl = thumbCanvas.toDataURL('image/jpeg', 0.8);
        thumbRenderer.dispose();

        if (!this._videoAngles) this._videoAngles = [null, null, null];
        this._videoAngles[slotIndex] = { position, target, fov, thumbnailUrl };
        this.updateVideoAngleSlot(slotIndex);
    }

    /**
     * Refresh a single angle slot's UI to reflect captured/empty state.
     */
    updateVideoAngleSlot(slotIndex) {
        if (!this.screenshotPanel) return;
        const slot = this.screenshotPanel.querySelector(`.ss-vid-angle-slot[data-slot="${slotIndex}"]`);
        if (!slot) return;

        const preview = slot.querySelector('.ss-vid-angle-preview');
        const numLabel = slot.querySelector('.ss-vid-angle-num');
        const capBtn = slot.querySelector('.ss-vid-capture-btn');
        const angleData = this._videoAngles?.[slotIndex];

        if (angleData) {
            preview.classList.add('captured');
            if (numLabel) numLabel.style.display = 'none';
            let img = preview.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                img.alt = `Angle ${slotIndex + 1}`;
                preview.insertBefore(img, preview.querySelector('.ss-vid-clear-btn'));
            }
            img.src = angleData.thumbnailUrl;
            if (capBtn) capBtn.textContent = `Recapture ${slotIndex + 1}`;
        } else {
            preview.classList.remove('captured');
            if (numLabel) numLabel.style.display = '';
            const img = preview.querySelector('img');
            if (img) img.remove();
            if (capBtn) capBtn.textContent = `Capture ${slotIndex + 1}`;
        }
    }

    /**
     * Take a screenshot for the end user (legacy method)
     */
    async takeUserScreenshot() {
        await this.takeQuickScreenshot();
    }

    /**
     * Capture the current viewer canvas at a target size and return a base64 data URL.
     * Used by the AI Social Post feature. Does NOT trigger a download.
     *
     * Renders against a flat neutral studio-gray backdrop instead of the live
     * gradient background. This gives the AI image model a much higher-contrast,
     * clean silhouette of the 3D model so it can identify the subject reliably.
     */
    async captureBlobForAi(size = 1024, aspect = 'square') {
        const renderer = this.renderer;
        const scene = this.sceneManager.getScene();
        const camera = this.cameraManager.getCamera();

        // Output dimensions: square (1:1) or story (9:16 portrait).
        const width  = (aspect === 'story') ? Math.round(size * 9 / 16) : size;
        const height = (aspect === 'story') ? size : size;

        // Use a temp canvas + temp renderer at the target dimensions.
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const tempRenderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: false
        });
        tempRenderer.setSize(width, height);
        tempRenderer.setPixelRatio(1);
        tempRenderer.shadowMap.enabled = renderer.shadowMap.enabled;
        tempRenderer.shadowMap.type = renderer.shadowMap.type;
        tempRenderer.toneMapping = renderer.toneMapping;
        tempRenderer.toneMappingExposure = renderer.toneMappingExposure;

        // Neutral studio backdrop: light gray gives strong contrast for the model
        // silhouette while staying friendly to AI image-to-image conditioning.
        const STUDIO_GRAY = 0xe5e5e5;
        tempRenderer.setClearColor(STUDIO_GRAY, 1);

        // Temporarily strip the scene's gradient/textured background so the
        // clear color shows through. Restore afterwards.
        const originalBackground = scene.background;
        scene.background = null;

        const tempCamera = camera.clone();
        tempCamera.aspect = width / height;
        tempCamera.updateProjectionMatrix();

        try {
            tempRenderer.render(scene, tempCamera);
            const dataUrl = canvas.toDataURL('image/png');
            return dataUrl;
        } finally {
            scene.background = originalBackground;
            tempRenderer.dispose();
        }
    }

    /**
     * AI Social Media Post (v1):
     * 1. Capture square screenshot of the current view.
     * 2. POST it to /wp-json/flexframe/v1/ai-render with the exercise name.
     * 3. Show the returned image in a modal preview with a download button.
     */
    async generateAiSocialPost() {
        const settings = window.flexframeSettings || {};
        if (!settings.aiRenderEnabled || !settings.restUrl) {
            console.error('[FlexFrame AI] AI render not enabled');
            return;
        }

        const panel = this.screenshotPanel;
        const btn = panel?.querySelector('.ss-ai-generate');
        const status = panel?.querySelector('.ss-ai-status');
        const setStatus = (msg, type = '') => {
            if (!status) return;
            status.textContent = msg;
            status.className = 'ss-ai-status' + (type ? ' ' + type : '');
        };

        if (btn) btn.disabled = true;
        setStatus('Capturing screenshot...');

        // Countdown timer state
        let countdownTimer = null;
        const startCountdown = (estimatedSeconds = 60) => {
            let remaining = estimatedSeconds;
            const tick = () => {
                if (remaining > 0) {
                    const m = Math.floor(remaining / 60);
                    const s = remaining % 60;
                    const mm = m.toString();
                    const ss = s.toString().padStart(2, '0');
                    setStatus(`Generating AI image... ${mm}:${ss} remaining`);
                    remaining--;
                } else {
                    setStatus('Almost there, just a few more seconds...');
                }
            };
            tick();
            countdownTimer = setInterval(tick, 1000);
        };
        const stopCountdown = () => {
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        };

        try {
            const aspectVal = panel?.querySelector('.ss-ai-aspect-btn.active')?.dataset.aspect || 'square';
            const captured = Array.isArray(this._aiCapturedAngles) ? this._aiCapturedAngles.filter(Boolean) : [];
            let screenshot;
            let extraAngle = null;
            if (captured.length >= 2) {
                screenshot = captured[0];
                extraAngle = captured[1];
                setStatus('Using 2 captured angles...');
            } else if (captured.length === 1) {
                screenshot = captured[0];
                setStatus('Using captured angle...');
            } else {
                screenshot = await this.captureBlobForAi(1024, aspectVal);
            }

            startCountdown(90);

            const exerciseName = this.currentExerciseName || 'Exercise';
            const provider = panel?.querySelector('.ss-ai-provider')?.value || '';
            const style = panel?.querySelector('.ss-ai-style-btn.active')?.dataset.style || 'male';
            const aspect = aspectVal;

            const response = await fetch(settings.restUrl + 'ai-render', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': settings.restNonce || ''
                },
                body: JSON.stringify({
                    screenshot,
                    screenshot2: extraAngle,
                    exerciseName,
                    provider,
                    style,
                    aspect
                })
            });

            const json = await response.json();
            stopCountdown();

            if (!response.ok || !json.success || !json.image) {
                const msg = json.message || json.code || 'AI render failed';
                console.error('[FlexFrame AI] Server error:', json);
                setStatus(msg, 'error');
                return;
            }

            setStatus('Done!', 'success');
            this.showAiResultModal(json.image, exerciseName);
        } catch (err) {
            stopCountdown();
            console.error('[FlexFrame AI] Request failed:', err);
            setStatus('Error: ' + (err.message || 'request failed'), 'error');
        } finally {
            stopCountdown();
            if (btn) btn.disabled = false;
        }
    }

    /**
     * Modal preview for an AI-rendered image with a download button.
     */
    showAiResultModal(imageDataUrl, exerciseName) {
        // Remove any existing modal
        const existing = document.querySelector('.ss-ai-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'ss-ai-modal';
        modal.innerHTML = `
            <div class="ss-ai-modal-backdrop"></div>
            <div class="ss-ai-modal-content">
                <div class="ss-ai-modal-header">
                    <span>AI Social Media Post</span>
                    <button class="ss-ai-modal-close">✕</button>
                </div>
                <div class="ss-ai-modal-body">
                    <img class="ss-ai-modal-image" src="${imageDataUrl}" alt="AI generated post" />
                </div>
                <div class="ss-ai-caption-section">
                    <div class="ss-ai-caption-controls">
                        <button class="ss-btn ss-ai-caption-generate">Generate Caption</button>
                        <span class="ss-ai-caption-status"></span>
                    </div>
                    <div class="ss-ai-caption-result" style="display:none;">
                        <textarea class="ss-ai-caption-text" rows="10" readonly></textarea>
                        <div class="ss-ai-caption-actions">
                            <button class="ss-btn ss-ai-caption-copy">Copy Caption</button>
                            <button class="ss-btn ss-ai-caption-regen">Regenerate</button>
                        </div>
                    </div>
                </div>
                <div class="ss-ai-modal-footer">
                    <button class="ss-btn ss-ai-modal-download">Download Image</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .ss-ai-modal {
                position: fixed; inset: 0; z-index: 20000;
                display: flex; align-items: center; justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .ss-ai-modal-backdrop {
                position: absolute; inset: 0;
                background: rgba(0, 0, 0, 0.75);
            }
            .ss-ai-modal-content {
                position: relative; background: #1e1e1e; color: #fff;
                border-radius: 12px; max-width: 90vw; max-height: 92vh;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                display: flex; flex-direction: column;
                width: 600px;
            }
            .ss-ai-modal-header {
                display: flex; justify-content: space-between; align-items: center;
                padding: 12px 16px; font-weight: 600;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .ss-ai-modal-close {
                background: none; border: none; color: #fff; font-size: 18px;
                cursor: pointer; opacity: 0.7;
            }
            .ss-ai-modal-close:hover { opacity: 1; }
            .ss-ai-modal-body {
                padding: 16px; display: flex; justify-content: center;
                overflow: auto;
            }
            .ss-ai-modal-image {
                max-width: 100%; max-height: 50vh;
                border-radius: 8px;
            }
            .ss-ai-caption-section {
                padding: 0 16px 12px 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                padding-top: 12px;
            }
            .ss-ai-caption-controls {
                display: flex; align-items: center; gap: 12px;
                margin-bottom: 8px;
            }
            .ss-ai-caption-generate,
            .ss-ai-caption-regen {
                background: linear-gradient(135deg, #4a9eff 0%, #8b5cf6 100%);
                color: #fff; padding: 8px 14px; border: none;
                border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;
            }
            .ss-ai-caption-generate:hover,
            .ss-ai-caption-regen:hover { filter: brightness(1.1); }
            .ss-ai-caption-generate:disabled,
            .ss-ai-caption-regen:disabled { opacity: 0.6; cursor: not-allowed; }
            .ss-ai-caption-status {
                font-size: 12px; opacity: 0.85;
            }
            .ss-ai-caption-status.error { color: #ff6b6b; }
            .ss-ai-caption-status.success { color: #4ade80; }
            .ss-ai-caption-text {
                width: 100%; box-sizing: border-box;
                background: rgba(255,255,255,0.06);
                color: #fff; border: 1px solid rgba(255,255,255,0.15);
                border-radius: 6px; padding: 10px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 13px; line-height: 1.5; resize: vertical;
            }
            .ss-ai-caption-actions {
                margin-top: 8px; display: flex; gap: 8px; justify-content: flex-end;
            }
            .ss-ai-caption-copy {
                background: rgba(255,255,255,0.12);
                color: #fff; padding: 6px 12px; border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px; cursor: pointer; font-size: 12px;
            }
            .ss-ai-caption-copy:hover { background: rgba(255,255,255,0.2); }
            .ss-ai-modal-footer {
                padding: 12px 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex; justify-content: flex-end;
            }
            .ss-ai-modal-download {
                background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
                color: #fff; padding: 10px 20px; border: none;
                border-radius: 8px; cursor: pointer; font-weight: 600;
            }
            .ss-ai-modal-download:hover { filter: brightness(1.1); }
        `;
        modal.appendChild(style);

        const close = () => modal.remove();
        modal.querySelector('.ss-ai-modal-close').addEventListener('click', close);
        modal.querySelector('.ss-ai-modal-backdrop').addEventListener('click', close);

        modal.querySelector('.ss-ai-modal-download').addEventListener('click', () => {
            const safeName = (exerciseName || 'exercise').replace(/[^a-z0-9]+/gi, '_').toLowerCase();
            const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const link = document.createElement('a');
            link.href = imageDataUrl;
            link.download = `${safeName}_ai_post_${ts}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Caption generation
        const captionBtn    = modal.querySelector('.ss-ai-caption-generate');
        const captionRegen  = modal.querySelector('.ss-ai-caption-regen');
        const captionStatus = modal.querySelector('.ss-ai-caption-status');
        const captionResult = modal.querySelector('.ss-ai-caption-result');
        const captionText   = modal.querySelector('.ss-ai-caption-text');
        const captionCopy   = modal.querySelector('.ss-ai-caption-copy');

        const runCaption = async () => {
            captionBtn.disabled = true;
            if (captionRegen) captionRegen.disabled = true;
            captionStatus.className = 'ss-ai-caption-status';
            captionStatus.textContent = 'Generating caption...';
            try {
                const text = await this.generateAiCaption(exerciseName);
                captionText.value = text;
                captionResult.style.display = 'block';
                captionStatus.textContent = 'Done';
                captionStatus.classList.add('success');
            } catch (err) {
                console.error('[FlexFrame AI] Caption failed:', err);
                captionStatus.textContent = 'Error: ' + (err.message || 'request failed');
                captionStatus.classList.add('error');
            } finally {
                captionBtn.disabled = false;
                if (captionRegen) captionRegen.disabled = false;
            }
        };

        captionBtn.addEventListener('click', runCaption);
        if (captionRegen) captionRegen.addEventListener('click', runCaption);

        captionCopy.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(captionText.value);
                captionCopy.textContent = 'Copied!';
                setTimeout(() => { captionCopy.textContent = 'Copy Caption'; }, 1500);
            } catch (err) {
                // Fallback: select the textarea
                captionText.removeAttribute('readonly');
                captionText.select();
                document.execCommand('copy');
                captionText.setAttribute('readonly', 'readonly');
                captionCopy.textContent = 'Copied!';
                setTimeout(() => { captionCopy.textContent = 'Copy Caption'; }, 1500);
            }
        });

        document.body.appendChild(modal);
    }

    /**
     * Request a social-media caption from the server for the given exercise.
     * Uses the same provider toggle as image generation.
     */
    async generateAiCaption(exerciseName) {
        const settings = window.flexframeSettings || {};
        if (!settings.restUrl) {
            throw new Error('REST URL not available');
        }
        const provider = this.screenshotPanel?.querySelector('.ss-ai-provider')?.value || '';
        const response = await fetch(settings.restUrl + 'ai-caption', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': settings.restNonce || ''
            },
            body: JSON.stringify({
                exerciseName: exerciseName || 'Exercise',
                provider
            })
        });
        const json = await response.json();
        if (!response.ok || !json.success || !json.caption) {
            throw new Error(json.message || json.code || 'Caption request failed');
        }
        return json.caption;
    }

    /**
     * Setup AR branding from WordPress settings
     * Uses the uploaded logo if available, otherwise uses default branding
     */
    setupARBranding() {
        const branding = {
            companyName: 'FlexFrame',
            callToAction: 'Visit FlexFrame',
            websiteUrl: window.location.origin
        };

        // Check if WordPress settings have a custom logo
        if (window.flexframeSettings) {
            // Use uploaded logo URL if available
            if (window.flexframeSettings.logoUrl) {
                let logoUrl = window.flexframeSettings.logoUrl;
                // Ensure HTTPS
                if (logoUrl.startsWith('http://')) {
                    logoUrl = logoUrl.replace('http://', 'https://');
                }
                branding.logoUrl = logoUrl;
                console.log('[FlexFrame AR] Using WordPress logo for AR branding:', logoUrl);
            }

            // Use site URL if available
            if (window.flexframeSettings.siteUrl) {
                branding.websiteUrl = window.flexframeSettings.siteUrl;
            }
        }

        // Apply branding to AR handler
        arHandler.setBranding(branding);
    }

    setupQualityToggle() {
        const qualityBtn = document.getElementById('quality-toggle-btn');
        console.log('[Quality Debug] setupQualityToggle called, button found:', !!qualityBtn);
        if (qualityBtn) {
            qualityBtn.addEventListener('click', () => {
                console.log('[Quality Debug] Quality button clicked!');
                this.switchModelQuality();
            });
        }
    }
    
    updateQualityButtonVisibility() {
        const qualityBtn = document.getElementById('quality-toggle-btn');
        const qualityText = document.getElementById('quality-text');
        
        console.log('[Quality Debug] updateQualityButtonVisibility called');
        console.log('[Quality Debug] Button found:', !!qualityBtn);
        console.log('[Quality Debug] modelUrlSQ:', this.modelUrlSQ);
        console.log('[Quality Debug] modelUrlHQ:', this.modelUrlHQ);
        
        // Check if WordPress admin has disabled the HD button
        const wpHDButtonEnabled = window.flexframeSettings?.showHDButton !== false;
        console.log('[Quality Debug] WordPress showHDButton setting:', wpHDButtonEnabled);
        
        if (qualityBtn) {
            // Show button only if both SQ and HQ models exist AND WordPress setting allows it
            if (this.modelUrlSQ && this.modelUrlHQ && wpHDButtonEnabled) {
                console.log('[Quality Debug] ✅ Both models exist, showing button');
                // Use setProperty with !important to override any PHP-injected CSS
                qualityBtn.style.setProperty('display', 'flex', 'important');
                if (qualityText) {
                    // Show the quality you'll switch TO, not what's currently loaded (HD/SD for button display)
                    const nextQuality = this.currentModelQuality === 'SQ' ? 'HD' : 'SD';
                    qualityText.textContent = nextQuality;
                    console.log('[Quality Debug] Set button text to:', nextQuality);
                }
                
                // Start pulsate animation only when HQ is available to switch to
                this.startQualityButtonPulsate();
            } else {
                console.log('[Quality Debug] ❌ Missing model URLs or WP disabled, hiding button');
                qualityBtn.style.setProperty('display', 'none', 'important');
                this.stopQualityButtonPulsate();
            }
        } else {
            console.log('[Quality Debug] ❌ Button element not found in DOM!');
        }
    }
    
    startQualityButtonPulsate() {
        // Clear existing interval if any
        this.stopQualityButtonPulsate();
        
        const qualityBtn = document.getElementById('quality-toggle-btn');
        const qualityText = document.getElementById('quality-text');
        
        // Function to trigger pulsate
        const triggerPulsate = () => {
            // Only pulsate when showing HD (meaning SD is currently loaded)
            if (qualityBtn && qualityText && qualityText.textContent === 'HD') {
                qualityBtn.classList.add('pulsate');
                // Remove class after animation completes (2 seconds)
                setTimeout(() => {
                    qualityBtn.classList.remove('pulsate');
                }, 5000);
            }
        };
        
        // Trigger immediately
        triggerPulsate();
        
        // Then repeat every 10 seconds
        this.qualityPulsateInterval = setInterval(triggerPulsate, 10000);
    }
    
    stopQualityButtonPulsate() {
        if (this.qualityPulsateInterval) {
            clearInterval(this.qualityPulsateInterval);
            this.qualityPulsateInterval = null;
        }
        
        const qualityBtn = document.getElementById('quality-toggle-btn');
        if (qualityBtn) {
            qualityBtn.classList.remove('pulsate');
        }
    }
    
    // ============================================
    // YouTube Viewer (for custom exercises)
    // ============================================
    
    /**
     * Extract YouTube video ID from various URL formats
     */
    extractYouTubeId(url) {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]{11})/);
        return match ? match[1] : null;
    }
    
    /**
     * Show YouTube iframe overlay inside the viewer container, hiding the 3D canvas
     */
    showYouTubeViewer(youtubeUrl, exerciseId, exerciseName) {
        const videoId = this.extractYouTubeId(youtubeUrl);
        if (!videoId) {
            console.error('[YouTube] Invalid YouTube URL:', youtubeUrl);
            return;
        }
        
        const container = document.getElementById('flexframe-viewer-container');
        if (!container) return;
        
        // Hide the 3D canvas
        const canvas = container.querySelector('canvas.webgl');
        if (canvas) canvas.style.display = 'none';
        
        // Hide the model loader if visible
        const loader = document.getElementById('model-loader');
        if (loader) loader.style.display = 'none';
        
        // Create or update YouTube overlay
        let overlay = document.getElementById('ffx-youtube-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'ffx-youtube-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: '2',
                background: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5%'
            });
            container.appendChild(overlay);
        }
        
        overlay.style.display = 'flex';
        overlay.innerHTML = `
            <div class="ffx-yt-wrapper">
                <div class="ffx-yt-video-box">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                        style="width:100%;height:100%;border:none;" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen></iframe>
                </div>
            </div>`;
        
        // Hide animation player controls (they don't apply to YouTube)
        // Use class with !important so touch/hover events can't re-show it
        const playerBar = document.querySelector('.animation-player');
        if (playerBar) playerBar.classList.add('ffx-yt-hide');
        
        // Also hide the trigger area that shows player on hover/touch
        const triggerArea = document.querySelector('.animation-player-trigger');
        if (triggerArea) triggerArea.classList.add('ffx-yt-hide');
        
        // Disable the animation player so it can't re-show itself
        this.animationPlayer.setVisibility(false);
        
        // Hide quality/AR/screenshot buttons that don't apply
        const controlsToHide = ['#quality-toggle-btn', '#ar-btn', '#screenshot-btn', '#speed-btn', '#fullscreen-btn'];
        controlsToHide.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.setProperty('display', 'none', 'important');
        });
        
        console.log(`🎬 Showing YouTube video: ${videoId}`);
    }
    
    /**
     * Hide YouTube overlay and restore 3D canvas
     */
    hideYouTubeViewer() {
        const overlay = document.getElementById('ffx-youtube-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.innerHTML = ''; // Stop video playback
        }
        
        // Show the 3D canvas again
        const container = document.getElementById('flexframe-viewer-container');
        if (container) {
            const canvas = container.querySelector('canvas.webgl');
            if (canvas) canvas.style.display = '';
        }
        
        // Restore animation player
        const playerBar = document.querySelector('.animation-player');
        if (playerBar) playerBar.classList.remove('ffx-yt-hide');
        
        // Restore trigger area
        const triggerArea = document.querySelector('.animation-player-trigger');
        if (triggerArea) triggerArea.classList.remove('ffx-yt-hide');
        
        this.animationPlayer.setVisibility(true);
        
        // Restore controls (re-apply original inline !important display)
        const controlsToShow = ['#quality-toggle-btn', '#ar-btn', '#screenshot-btn', '#speed-btn', '#fullscreen-btn'];
        controlsToShow.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.setProperty('display', 'flex', 'important');
        });
        
        // Restore right info menu (may have been hidden for a no-info custom exercise)
        const rightContainer = document.querySelector('#flexframe-viewer-container .thumbnail-grid-container-right');
        if (rightContainer) rightContainer.classList.remove('ffx-yt-hide');
    }
    
    /**
     * Show/update the "Add to Workout" floating button when an exercise is selected.
     */
    showAddToWorkoutButton(exercise) {
        const ws = window.flexframeSettings;
        const workoutUrl = ws?.workoutPageUrl;
        
        // Only show if workout page URL is configured
        if (!workoutUrl) return;
        
        // Get user's primary color
        const primaryColor = ws?.primaryColor || '#4a9eff';
        
        // Helper: hex to rgb components
        const hexToRgb = (hex) => {
            const h = hex.replace('#', '');
            return {
                r: parseInt(h.substring(0, 2), 16),
                g: parseInt(h.substring(2, 4), 16),
                b: parseInt(h.substring(4, 6), 16),
            };
        };
        const pc = hexToRgb(primaryColor);
        
        let btn = document.getElementById('ffx-add-to-workout-btn');
        
        if (!btn) {
            btn = document.createElement('a');
            btn.id = 'ffx-add-to-workout-btn';
            btn.setAttribute('title', 'Add Exercise to Workout');
            
            // Style the button
            Object.assign(btn.style, {
                position: 'fixed',
                bottom: '20px',
                left: '16px',
                zIndex: '100000',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(0, 0, 0, 0.65)',
                border: `1px solid ${primaryColor}`,
                borderRadius: '12px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                opacity: '0',
                transform: 'translateY(10px)',
                boxShadow: `0 4px 16px rgba(${pc.r},${pc.g},${pc.b},0.35)`,
                letterSpacing: '0.3px',
            });
            
            // SVG icon (plus in circle)
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <span>Add to Workout</span>
            `;
            
            // Hover effects
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.85)';
                btn.style.borderColor = primaryColor;
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = `0 6px 24px rgba(${pc.r},${pc.g},${pc.b},0.5)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.65)';
                btn.style.borderColor = primaryColor;
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = `0 4px 16px rgba(${pc.r},${pc.g},${pc.b},0.35)`;
            });
            
            // Append to the viewer container so it stays scoped
            const container = document.getElementById('flexframe-viewer-container') || document.body;
            container.appendChild(btn);
            
            // Animate in
            requestAnimationFrame(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            });
        }
        
        // Update the link with the current exercise ID
        const exerciseId = exercise.id || exercise.name?.toLowerCase().replace(/\s+/g, '_') || '';
        const separator = workoutUrl.includes('?') ? '&' : '?';
        btn.href = `${workoutUrl}${separator}add_exercise=${encodeURIComponent(exerciseId)}`;
        btn.target = '_blank';
        btn.rel = 'noopener';
    }
    
    async switchModelQuality() {
        if (!this.modelUrlSQ || !this.modelUrlHQ) return;
        
        // Prevent clicking while any model is loading or already switching
        if (this.isQualitySwitching || this.isModelLoading) {
            console.log('[Quality] Model loading or already switching, ignoring click');
            return;
        }
        
        // Set lock and disable button
        this.isQualitySwitching = true;
        const qualityBtn = document.getElementById('quality-toggle-btn');
        if (qualityBtn) {
            qualityBtn.disabled = true;
            qualityBtn.style.opacity = '0.5';
            qualityBtn.style.cursor = 'wait';
        }
        
        try {
            // Toggle quality
            this.currentModelQuality = this.currentModelQuality === 'SQ' ? 'HQ' : 'SQ';
            const modelUrl = this.currentModelQuality === 'SQ' ? this.modelUrlSQ : this.modelUrlHQ;
            
            console.log('Switching to', this.currentModelQuality, 'model:', modelUrl);
            
            // Update button text to show the NEXT quality you can switch to (HD/SD for button display)
            const qualityText = document.getElementById('quality-text');
            if (qualityText) {
                const nextQuality = this.currentModelQuality === 'SQ' ? 'HD' : 'SD';
                qualityText.textContent = nextQuality;
            }
            
            // Restart pulsate animation with new quality
            this.startQualityButtonPulsate();
            
            // Get quality-specific settings if available
            console.log('[HQ Debug] currentConfig:', this.currentConfig);
            console.log('[HQ Debug] Has cameraHQ?', !!this.currentConfig?.cameraHQ);
            console.log('[HQ Debug] cameraHQ value:', this.currentConfig?.cameraHQ);
            
            if (this.currentModelQuality === 'HQ' && (this.currentConfig?.modelHQ || this.currentConfig?.cameraHQ)) {
                console.log('[HQ Debug] ✅ Entering HQ branch');
                const hqModelSettings = this.currentConfig.modelHQ;
                const hqCameraSettings = this.currentConfig.cameraHQ || hqModelSettings?.camera;
                console.log('[HQ Debug] hqCameraSettings:', hqCameraSettings);
                
                // Set pending model config for HQ
                if (hqModelSettings?.model) {
                    this.pendingModelConfig = hqModelSettings.model;
                } else if (hqModelSettings?.position) {
                    this.pendingModelConfig = hqModelSettings;
                }
                
                // Reload model with HQ settings
                await this.loadModel(modelUrl);
                console.log('[HQ Debug] Model loaded, now applying camera settings');
                
                // Apply HQ camera settings (from cameraHQ or modelHQ.camera)
                if (hqCameraSettings) {
                    console.log('[HQ Debug] Applying HQ camera position:', hqCameraSettings.position);
                    const camera = this.cameraManager.getCamera();
                    if (hqCameraSettings.position) {
                        camera.position.set(...hqCameraSettings.position);
                    }
                    if (hqCameraSettings.rotation) {
                        camera.rotation.set(...hqCameraSettings.rotation);
                    }
                    if (hqCameraSettings.target) {
                        this.cameraManager.getControls().target.set(...hqCameraSettings.target);
                    }
                    this.cameraManager.getControls().update();
                    
                    // Update original state for spacebar reset
                    this.cameraManager.updateOriginalState(
                        hqCameraSettings.position,
                        hqCameraSettings.rotation,
                        hqCameraSettings.target
                    );
                }
            } else {
                // Use default/SQ settings
                if (this.currentConfig?.model) {
                    this.pendingModelConfig = this.currentConfig.model;
                }
                
                // Reload model
                await this.loadModel(modelUrl);
                
                // Apply default camera settings
                if (this.currentConfig?.camera) {
                    const camera = this.cameraManager.getCamera();
                if (this.currentConfig.camera.position) {
                    camera.position.set(...this.currentConfig.camera.position);
                }
                if (this.currentConfig.camera.rotation) {
                    camera.rotation.set(...this.currentConfig.camera.rotation);
                }
                if (this.currentConfig.camera.target) {
                    this.cameraManager.getControls().target.set(...this.currentConfig.camera.target);
                }
                this.cameraManager.getControls().update();
                
                // Update original state for spacebar reset
                this.cameraManager.updateOriginalState(
                    this.currentConfig.camera.position,
                    this.currentConfig.camera.rotation,
                    this.currentConfig.camera.target
                );
            }
        }
        } finally {
            // Release lock and re-enable button after a short delay
            setTimeout(() => {
                this.isQualitySwitching = false;
                const qualityBtn = document.getElementById('quality-toggle-btn');
                if (qualityBtn) {
                    qualityBtn.disabled = false;
                    qualityBtn.style.opacity = '1';
                    qualityBtn.style.cursor = 'pointer';
                }
            }, 500); // 500ms cooldown after model loads
        }
    }
    
    loadModel(modelUrl = getAssetUrl('models/exercise.glb')) {
        return new Promise((resolve, reject) => {
        // Show loading spinner
        const loader = document.getElementById('model-loader');
        if (loader) {
            this.updateLoaderSpinner();
            loader.style.display = 'flex';
        }
        
        // Set loading flag and disable quality button
        this.isModelLoading = true;
        this._setQualityButtonEnabled(false);
        
        // Clean up existing GUI folders
        if (this.modelFolder) {
            this.modelFolder.destroy();
            this.modelFolder = null;
        }
        if (this.materialsFolder) {
            this.materialsFolder.destroy();
            this.materialsFolder = null;
        }
        
        // Remove existing model if present
        if (window.model) {
            this.sceneManager.getScene().remove(window.model);
            window.model = null;
        }
        
        // Clear animation mixer
        if (this.mixer) {
            this.mixer.stopAllAction();
            this.mixer = null;
        }
        
        // Clear clickable meshes
        this.allClickableMeshes = [];
        
        // Clear Three.js cache to force fresh texture loads
        THREE.Cache.clear();
        
        // console.log('Loading model from:', modelUrl);
        
        // Reset progress indicators
        this.updateLoadProgress(0);
        
        this.gltfLoader.load(
            modelUrl,
            (gltf) => {
                window.model = gltf.scene;
                const model = window.model;
                
                // Track converted materials to ensure all meshes share the same material instance
                const convertedMaterials = new Map();
                
                model.traverse((child) => {
                    if (child.isMesh) {
                        this.allClickableMeshes.push(child);
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Log material names for debugging
                        if (child.material) {
                            const mats = Array.isArray(child.material) ? child.material : [child.material];
                            const newMats = [];
                            
                            mats.forEach(mat => {
                                if (mat.name) {
                                    // Normalize Blender-duplicate suffixes so e.g. "METAL.001",
                                    // "Metal.002", "COLOR1.003" all match their base material name.
                                    // Strips a trailing ".###" (1+ digits) added by Blender on export.
                                    const _stripped = mat.name.replace(/\.\d+$/, '');
                                    if (_stripped !== mat.name) {
                                        mat.name = _stripped;
                                    }
                                    // console.log('Found material:', mat.name);
                                    
                                    // Convert MUSCLE materials to MeshPhysicalMaterial for sheen support
                                    if (mat.name.toUpperCase() === 'MUSCLE' && mat.type !== 'MeshPhysicalMaterial') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial for sheen support`);
                                            
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                roughness: 0,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1.14,
                                                emissiveMap: mat.emissiveMap,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                sheen: 0.3,
                                                sheenRoughness: 0.45,
                                                sheenColor: new THREE.Color(0xeb0a0a)
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 10.2;
                                            }
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert XMUSCLE to MeshPhysicalMaterial (keeps GLB textures, HD-specific defaults)
                                    else if (mat.name.toUpperCase() === 'XMUSCLE' && mat.type !== 'MeshPhysicalMaterial') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial for sheen support`);
                                            
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                roughness: 0,
                                                metalness: 0,
                                                emissive: new THREE.Color(0xe91616),
                                                emissiveIntensity: 0,
                                                emissiveMap: mat.emissiveMap,
                                                opacity: 1,
                                                transparent: false,
                                                alphaTest: 0,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                envMapIntensity: 1,
                                                transmission: 0,
                                                thickness: 0,
                                                ior: 1.5,
                                                sheen: 0,
                                                sheenRoughness: 0.45,
                                                sheenColor: new THREE.Color(0xeb0a0a)
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 14.2;
                                            }
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert/Update SKIN materials to MeshPhysicalMaterial for advanced transparency
                                    else if (mat.name.includes('SKIN')) {
                                        // Check if we already converted this material
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting/Updating ${mat.name} to MeshPhysicalMaterial for advanced transparency`);
                                            
                                            // Create new MeshPhysicalMaterial with custom refraction settings
                                            // Default SKIN material: pure material, no texture maps
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xccdef5),
                                                // Remove all texture maps for pure material appearance
                                                map: null,
                                                normalMap: null,
                                                roughness: 0,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                emissiveMap: null,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.FrontSide,
                                                depthWrite: false,
                                                depthTest: true,
                                                blending: THREE.CustomBlending,
                                                alphaTest: 0,
                                                // Refraction/transmission properties
                                                transmission: 1,
                                                thickness: 0,
                                                ior: 1,
                                                envMapIntensity: 2.29,
                                                sheen: 0,
                                                sheenRoughness: 1,
                                                sheenColor: new THREE.Color(0x000000)
                                            });
                                            
                                            // Copy the name
                                            physicalMat.name = mat.name;
                                            
                                            // No bump map - pure material appearance
                                            physicalMat.bumpScale = 1;
                                            
                                            // Log the applied settings
                                            console.log(`✅ ${mat.name} Material Settings Applied:`, {
                                                color: '#' + physicalMat.color.getHexString(),
                                                opacity: physicalMat.opacity,
                                                transmission: physicalMat.transmission,
                                                ior: physicalMat.ior,
                                                roughness: physicalMat.roughness,
                                                metalness: physicalMat.metalness,
                                                envMapIntensity: physicalMat.envMapIntensity,
                                                side: physicalMat.side === THREE.DoubleSide ? 'DoubleSide' : physicalMat.side === THREE.FrontSide ? 'FrontSide' : 'BackSide',
                                                blending: physicalMat.blending,
                                                depthWrite: physicalMat.depthWrite,
                                                depthTest: physicalMat.depthTest,
                                                thickness: physicalMat.thickness,
                                                bumpScale: physicalMat.bumpScale
                                            });
                                            
                                            // Store the converted material
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert SKELETON materials to MeshPhysicalMaterial
                                    else if (mat.name.toUpperCase() === 'SKELETON' && mat.type !== 'MeshPhysicalMaterial') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial`);
                                            
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                roughness: 0.99,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                emissiveMap: mat.emissiveMap,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                alphaTest: 0,
                                                envMapIntensity: 1,
                                                transmission: 0,
                                                thickness: 0,
                                                ior: 1.5,
                                                sheen: 0,
                                                sheenRoughness: 1,
                                                sheenColor: new THREE.Color(0x000000)
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 1;
                                            }
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert XSKELETON to MeshPhysicalMaterial (keeps GLB textures, HD-specific defaults)
                                    else if (mat.name.toUpperCase() === 'XSKELETON' && mat.type !== 'MeshPhysicalMaterial') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial`);
                                            
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                roughness: 0.99,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                emissiveMap: mat.emissiveMap,
                                                opacity: 0.93,
                                                transparent: false,
                                                alphaTest: 0,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                envMapIntensity: 1,
                                                transmission: 0,
                                                thickness: 0,
                                                ior: 1.5,
                                                sheen: 0,
                                                sheenRoughness: 1,
                                                sheenColor: new THREE.Color(0x000000)
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 1;
                                            }
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert CHROME materials to MeshPhysicalMaterial
                                    else if (mat.name.includes('CHROME')) {
                                        // Check if we already converted this material
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial with chrome settings`);
                                            
                                            // Create new MeshPhysicalMaterial with chrome settings (no texture maps for pure chrome)
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                roughness: 0.07,
                                                metalness: 0.82,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                alphaTest: 0,
                                                envMapIntensity: 1,
                                                sheen: 0,
                                                sheenRoughness: 1,
                                                sheenColor: new THREE.Color(0x000000),
                                                transmission: 0,
                                                thickness: 0,
                                                ior: 1.5
                                            });
                                            
                                            // Copy the name
                                            physicalMat.name = mat.name;
                                            
                                            // Log the applied settings
                                            console.log(`✅ ${mat.name} Material Settings Applied (pure chrome - no textures):`, {
                                                color: '#' + physicalMat.color.getHexString(),
                                                opacity: physicalMat.opacity,
                                                transparent: physicalMat.transparent,
                                                roughness: physicalMat.roughness,
                                                metalness: physicalMat.metalness,
                                                envMapIntensity: physicalMat.envMapIntensity,
                                                side: physicalMat.side === THREE.DoubleSide ? 'DoubleSide' : physicalMat.side === THREE.FrontSide ? 'FrontSide' : 'BackSide'
                                            });
                                            
                                            // Store the converted material
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert XCLEAR to MeshPhysicalMaterial (keeps GLB map, HD-specific defaults)
                                    else if (mat.name.toUpperCase() === 'XCLEAR') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial (HD Clear)`);
                                            
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                alphaMap: mat.alphaMap || null,
                                                roughness: 0.42,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 0,
                                                opacity: 1,
                                                transparent: true,
                                                alphaTest: 0,
                                                side: THREE.FrontSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                transmission: 0,
                                                thickness: 0.85,
                                                ior: 1.06,
                                                envMapIntensity: 2.29,
                                                sheen: 0,
                                                sheenRoughness: 0,
                                                sheenColor: new THREE.Color(0x000000),
                                                clearcoat: 0.28,
                                                clearcoatRoughness: 0.14,
                                                specularIntensity: 0.61,
                                                specularColor: new THREE.Color(0xffffff),
                                                attenuationDistance: 90,
                                                attenuationColor: new THREE.Color(0xffffff)
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert XCOLOR materials to MeshPhysicalMaterial (same as COLOR_1)
                                    else if (mat.name.toUpperCase() === 'XCOLOR') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial (HD Color = COLOR_1)`);
                                            
                                            const useCustomColor = window.flexframeSettings?.primaryColorMode === 'custom';
                                            const primaryColor = useCustomColor && window.flexframeSettings?.primaryColor 
                                                ? window.flexframeSettings.primaryColor 
                                                : '#ff0000';
                                            
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(primaryColor),
                                                map: mat.map || null,                 // Preserve color map from GLB
                                                normalMap: mat.normalMap || null,      // Preserve normal map from GLB
                                                roughnessMap: mat.roughnessMap || null, // Preserve roughness map from GLB
                                                roughness: mat.roughness !== undefined ? mat.roughness : 0.2152357035754776,
                                                metalness: mat.metalness !== undefined ? mat.metalness : 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                alphaTest: 0,
                                                envMapIntensity: 1,
                                                sheen: 0,
                                                sheenRoughness: 1,
                                                sheenColor: new THREE.Color(0x000000),
                                                transmission: 0,
                                                thickness: 0,
                                                ior: 1.5
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            
                                            // Preserve bump map from GLB if available
                                            if (mat.bumpMap) {
                                                physicalMat.bumpMap = mat.bumpMap;
                                                physicalMat.bumpScale = mat.bumpScale || 1;
                                            }
                                            
                                            console.log(`✅ ${mat.name} XCOLOR Material Applied (= COLOR_1):`, {
                                                color: '#' + physicalMat.color.getHexString(),
                                                roughness: physicalMat.roughness,
                                                metalness: physicalMat.metalness,
                                                hasMap: !!physicalMat.map,
                                                hasNormalMap: !!physicalMat.normalMap,
                                                hasRoughnessMap: !!physicalMat.roughnessMap,
                                                hasBumpMap: !!physicalMat.bumpMap
                                            });
                                            
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert XCLOTHES / aiBodyGirl materials to MeshPhysicalMaterial
                                    // Keeps GLB textures (roughness, normal/bump, grayscale color map)
                                    // Sets material color to primary color so white trim = primary, black = stays black
                                    else if (mat.name.toUpperCase() === 'XCLOTHES' || mat.name.toUpperCase() === 'AIBODYGIRL') {
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial (HD Clothes/Body)`);
                                            
                                            // AIBODYGIRL always defaults to white; XCLOTHES uses primary color
                                            const isBodyGirl = mat.name.toUpperCase() === 'AIBODYGIRL';
                                            const useCustomColor = window.flexframeSettings?.primaryColorMode === 'custom';
                                            const primaryColor = isBodyGirl
                                                ? '#ffffff'
                                                : (useCustomColor && window.flexframeSettings?.primaryColor 
                                                    ? window.flexframeSettings.primaryColor 
                                                    : '#ff0000');
                                            
                                            // Create MeshPhysicalMaterial — KEEP all texture maps from GLB
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(primaryColor), // Multiplied with grayscale texture: white->primary, black->black
                                                map: mat.map,                         // Grayscale color texture from GLB
                                                normalMap: mat.normalMap,             // Normal/bump map from GLB
                                                roughnessMap: mat.roughnessMap || null, // Roughness map from GLB
                                                roughness: mat.roughness !== undefined ? mat.roughness : 0.5,
                                                metalness: mat.metalness !== undefined ? mat.metalness : 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                alphaTest: 0,
                                                envMapIntensity: 1
                                            });
                                            
                                            physicalMat.name = mat.name;
                                            
                                            // Apply bump map from color texture if available
                                            if (mat.bumpMap) {
                                                physicalMat.bumpMap = mat.bumpMap;
                                                physicalMat.bumpScale = mat.bumpScale || 1;
                                            } else if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 1;
                                            }
                                            
                                            console.log(`✅ ${mat.name} HD Primary Color Material Applied:`, {
                                                color: '#' + physicalMat.color.getHexString(),
                                                hasMap: !!physicalMat.map,
                                                hasNormalMap: !!physicalMat.normalMap,
                                                hasRoughnessMap: !!physicalMat.roughnessMap,
                                                hasBumpMap: !!physicalMat.bumpMap,
                                                roughness: physicalMat.roughness,
                                                metalness: physicalMat.metalness
                                            });
                                            
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // Convert COLOR_1 materials to MeshPhysicalMaterial
                                    else if (mat.name.includes('COLOR_1')) {
                                        // Check if we already converted this material
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial with custom settings`);
                                            
                                            // Get primary color - only use custom if mode is 'custom', otherwise use default red
                                            const useCustomColor = window.flexframeSettings?.primaryColorMode === 'custom';
                                            const primaryColor = useCustomColor && window.flexframeSettings?.primaryColor 
                                                ? window.flexframeSettings.primaryColor 
                                                : '#ff0000';
                                            
                                            // Create new MeshPhysicalMaterial with COLOR_1 settings (preserve GLB texture maps)
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(primaryColor),
                                                map: mat.map || null,                 // Preserve color map from GLB
                                                normalMap: mat.normalMap || null,      // Preserve normal map from GLB
                                                roughnessMap: mat.roughnessMap || null, // Preserve roughness map from GLB
                                                roughness: mat.roughness !== undefined ? mat.roughness : 0.2152357035754776,
                                                metalness: mat.metalness !== undefined ? mat.metalness : 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                opacity: 1,
                                                transparent: false,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                alphaTest: 0,
                                                envMapIntensity: 1,
                                                sheen: 0,
                                                sheenRoughness: 1,
                                                sheenColor: new THREE.Color(0x000000),
                                                transmission: 0,
                                                thickness: 0,
                                                ior: 1.5
                                            });
                                            
                                            // Copy the name
                                            physicalMat.name = mat.name;
                                            
                                            // Preserve bump map from GLB if available
                                            if (mat.bumpMap) {
                                                physicalMat.bumpMap = mat.bumpMap;
                                                physicalMat.bumpScale = mat.bumpScale || 1;
                                            }
                                            
                                            // Log the applied settings
                                            console.log(`✅ ${mat.name} Material Settings Applied:`, {
                                                color: '#' + physicalMat.color.getHexString(),
                                                opacity: physicalMat.opacity,
                                                transparent: physicalMat.transparent,
                                                roughness: physicalMat.roughness,
                                                metalness: physicalMat.metalness,
                                                hasMap: !!physicalMat.map,
                                                hasNormalMap: !!physicalMat.normalMap,
                                                hasRoughnessMap: !!physicalMat.roughnessMap,
                                                hasBumpMap: !!physicalMat.bumpMap,
                                                side: physicalMat.side === THREE.DoubleSide ? 'DoubleSide' : physicalMat.side === THREE.FrontSide ? 'FrontSide' : 'BackSide'
                                            });
                                            
                                            // Store the converted material
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
                                    }
                                    // XBODY materials - force depthWrite on, preserve all textures on PC
                                    else if (mat.name.includes('XBODY')) {
                                        mat.depthWrite = true;
                                        if (IS_SAMSUNG_INTERNET) {
                                            mat.roughness = 0.5;
                                            if (mat.normalMap) { mat.normalMap = null; }
                                            if (mat.roughnessMap) { mat.roughnessMap = null; }
                                            mat.needsUpdate = true;
                                            console.log(`✅ ${mat.name} - depthWrite ON, roughness 0.5, normalMap+roughnessMap removed (Samsung Internet)`);
                                        } else {
                                            // PC: preserve all GLB textures including normalMap and roughnessMap
                                            console.log(`✅ ${mat.name} - depthWrite ON, ALL textures preserved:`, {
                                                hasMap: !!mat.map,
                                                hasNormalMap: !!mat.normalMap,
                                                hasRoughnessMap: !!mat.roughnessMap,
                                                hasBumpMap: !!mat.bumpMap,
                                                roughness: mat.roughness,
                                                metalness: mat.metalness,
                                                type: mat.type
                                            });
                                        }
                                        newMats.push(mat);
                                    }
                                    // XHEAD materials - Samsung Internet: remove normalMap + roughnessMap
                                    else if (mat.name.toUpperCase().includes('XHEAD')) {
                                        if (IS_SAMSUNG_INTERNET) {
                                            if (mat.normalMap) { mat.normalMap = null; }
                                            if (mat.roughnessMap) { mat.roughnessMap = null; }
                                            mat.needsUpdate = true;
                                            console.log(`✅ ${mat.name} - normalMap+roughnessMap removed (Samsung Internet)`);
                                        }
                                        newMats.push(mat);
                                    } else {
                                        newMats.push(mat);
                                    }
                                }
                            });
                            
                            // Apply the converted materials back to the mesh
                            if (newMats.length > 0) {
                                if (Array.isArray(child.material)) {
                                    child.material = newMats;
                                } else {
                                    child.material = newMats[0];
                                }
                            }
                        }
                    }
                });

                // Apply custom textures from config if available
                if (this.currentConfig && this.currentConfig.customTextures) {
                    this.applyCustomTextures(model, this.currentConfig.customTextures);
                }

                // Apply LOGO texture from WordPress settings if available
                if (window.flexframeSettings && window.flexframeSettings.logoUrl) {
                    // Ensure HTTPS to avoid mixed content warnings
                    let logoUrl = window.flexframeSettings.logoUrl;
                    if (logoUrl.startsWith('http://')) {
                        logoUrl = logoUrl.replace('http://', 'https://');
                    }
                    console.log('🎨 Applying LOGO texture from WordPress settings:', logoUrl);
                    const logoThreshold = window.flexframeSettings.logoThreshold || 0.95;
                    const logoBorderEnabled = window.flexframeSettings.logoBorderEnabled || false;
                    const logoBorderSize = window.flexframeSettings.logoBorderSize || 2;
                    const logoDisplaySize = window.flexframeSettings.logoDisplaySize || 100;
                    this.applyLogoTexture(model, logoUrl, logoThreshold, logoBorderEnabled, logoBorderSize, logoDisplaySize);
                }

                model.position.set(0, -0.02, 0);
                
                // Apply pending model config if available
                if (this.pendingModelConfig) {
                    if (this.pendingModelConfig.position) {
                        model.position.set(...this.pendingModelConfig.position);
                    }
                    if (this.pendingModelConfig.rotation) {
                        model.rotation.set(...this.pendingModelConfig.rotation);
                    }
                    if (this.pendingModelConfig.scale) {
                        model.scale.set(...this.pendingModelConfig.scale);
                    }
                    this.pendingModelConfig = null; // Clear after applying
                }
                
                // Apply material presets BEFORE adding to scene to prevent flash
                if (window.flexframeSettings) {
                    const mode = window.flexframeSettings.materialMode || 'preset';
                    const preset = window.flexframeSettings.materialPreset || 'default';
                    const isCustomTheme = preset.startsWith('custom:');
                    
                    if (mode === 'custom' && window.flexframeSettings.skinSettings) {
                        console.log('Pre-applying Custom SKIN settings...');
                        this.applyCustomSkinSettings(window.flexframeSettings.skinSettings);
                    } else if (isCustomTheme && window.flexframeSettings.skinSettings) {
                        // Custom theme preset — apply saved skin settings
                        console.log('Applying custom theme SKIN settings:', window.flexframeSettings.skinSettings);
                        this.applyCustomSkinSettings(window.flexframeSettings.skinSettings);
                    } else if (mode === 'preset') {
                        console.log('Material Preset setting:', preset);
                        
                        // Built-in themes use their own hardcoded skin settings
                        if (preset === 'default' || preset === 'dark' || preset === 'light' || preset === 'preset1') {
                            console.log('Pre-applying Default Material Preset...');
                            this.applyMaterialPreset1();
                        } else if (preset === 'wp_preset') {
                            console.log('Pre-applying WP Preset...');
                            this.applyWPPreset();
                        }
                    }
                    
                    // Apply equipment material settings if any are enabled
                    if (window.flexframeSettings.equipmentMaterials) {
                        console.log('Applying Equipment Material Settings...');
                        this.applyEquipmentMaterials(model, window.flexframeSettings.equipmentMaterials);
                    }
                }
                
                // DEBUG: Final texture audit for XBODY after ALL processing
                model.traverse((child) => {
                    if (child.isMesh && child.material) {
                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                        mats.forEach(mat => {
                            if (mat.name && mat.name.toUpperCase().includes('XBODY')) {
                                console.log(`🔍 FINAL AUDIT - ${mat.name}:`, {
                                    type: mat.type,
                                    hasMap: !!mat.map,
                                    hasNormalMap: !!mat.normalMap,
                                    hasRoughnessMap: !!mat.roughnessMap,
                                    hasBumpMap: !!mat.bumpMap,
                                    normalScale: mat.normalScale ? `${mat.normalScale.x}, ${mat.normalScale.y}` : 'N/A',
                                    roughness: mat.roughness,
                                    metalness: mat.metalness,
                                    color: '#' + mat.color.getHexString()
                                });
                            }
                        });
                    }
                });
                
                this.sceneManager.getScene().add(model);
                
                // Hide loading spinner
                const loader = document.getElementById('model-loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                
                // Set clickable meshes for camera double-click functionality
                this.cameraManager.setClickableMeshes(this.allClickableMeshes);

                // Setup animations if available
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(model);
                    
                    // Setup animation player with mixer and animations
                    this.animationPlayer.setMixer(this.mixer, gltf.animations);
                    
                    // Auto-play first animation
                    if (this.animationPlayer.actions && this.animationPlayer.actions.length > 0) {
                        this.animationPlayer.actions[0].play();
                        this.animationPlayer.isPlaying = true;
                        this.animationPlayer.updatePlayPauseIcon();
                    }
                }

                // Add model GUI controls
                this.setupModelGUI(model);
                
                // Add materials GUI controls
                this.setupMaterialsGUI(model);
                
                // Complete progress
                this.updateLoadProgress(100);
                
                // Show Model Inspector if this is a test model
                if (this._isTestModel) {
                    this.showModelInspector(model, modelUrl);
                    this._isTestModel = false;
                }
                
                // Clear loading flag and re-enable quality button
                this.isModelLoading = false;
                this._setQualityButtonEnabled(true);
                
                // Resolve the promise when model is fully loaded
                resolve(model);
            },
            (progress) => {
                // Progress callback
                if (progress.lengthComputable) {
                    const percent = Math.round((progress.loaded / progress.total) * 100);
                    this.updateLoadProgress(percent);
                } else {
                    // If length not computable, show indeterminate progress
                    this.updateLoadProgress(-1);
                }
            },
            (error) => {
                console.error('An error happened while loading the GLB model:', error);
                
                // Hide loading spinner on error
                const loader = document.getElementById('model-loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                // Clear loading flag and re-enable quality button
                this.isModelLoading = false;
                this._setQualityButtonEnabled(true);
                
                reject(error);
            }
        );
        }); // Close the Promise
    }
    
    _setQualityButtonEnabled(enabled) {
        const qualityBtn = document.getElementById('quality-toggle-btn');
        if (!qualityBtn) return;
        if (enabled) {
            qualityBtn.disabled = false;
            qualityBtn.style.opacity = '1';
            qualityBtn.style.cursor = 'pointer';
            qualityBtn.style.pointerEvents = 'auto';
        } else {
            qualityBtn.disabled = true;
            qualityBtn.style.opacity = '0.5';
            qualityBtn.style.cursor = 'wait';
            qualityBtn.style.pointerEvents = 'none';
        }
    }

    setupModelGUI(model) {
        this.modelFolder = this.trackFolder(this.gui.addFolder('Model Transform'));
        const pos = model.position;
        const rot = model.rotation;
        const scl = model.scale;
        
        this.modelFolder.add(pos, 'x', -1, 1, 0.002).name('Position X');
        this.modelFolder.add(pos, 'y', -1, 1, 0.002).name('Position Y');
        this.modelFolder.add(pos, 'z', -1, 1, 0.002).name('Position Z');
        this.modelFolder.add(rot, 'x', -1, 1, 0.002).name('Rotation X');
        this.modelFolder.add(rot, 'y', -1, 1, 0.002).name('Rotation Y');
        this.modelFolder.add(rot, 'z', -1, 1, 0.002).name('Rotation Z');
        this.modelFolder.add(scl, 'x', 0.01, 1, 0.001).name('Scale X');
        this.modelFolder.add(scl, 'y', 0.01, 1, 0.001).name('Scale Y');
        this.modelFolder.add(scl, 'z', 0.01, 1, 0.001).name('Scale Z');
        
        // Axis Helper Controls
        this.modelFolder.add({
            showAxis: this.cameraManager.axisHelperVisible
        }, 'showAxis').name('Show Axis Helper')
            .onChange((value) => {
                this.cameraManager.toggleAxisHelper(value);
            });
        
        this.modelFolder.add({
            axisSize: this.cameraManager.axisHelperSize
        }, 'axisSize', 0.1, 2, 0.1).name('Axis Size')
            .onChange((value) => {
                this.cameraManager.setAxisHelperSize(value);
            });
        
        // Save Model Config Button
        this.modelFolder.add({
            saveModelSettings: async () => {
                const modelSettings = this.gatherModelSpecificSettings();
                const settingsStr = JSON.stringify(modelSettings, null, 2);
                try {
                    await navigator.clipboard.writeText(settingsStr);
                    alert('Model config copied to clipboard!');
                    console.log('Model config saved:', modelSettings);
                } catch (error) {
                    console.error('Failed to copy to clipboard:', error);
                    alert('Failed to copy config to clipboard.');
                }
            }
        }, 'saveModelSettings').name('Save Model Config');
        
        // this.modelFolder.open();
    }

    setupMaterialsGUI(model) {
        // Collect all unique materials from the model
        const materials = new Map();
        
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                // Handle both single material and array of materials
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                
                mats.forEach((mat) => {
                    if (mat && mat.name && !materials.has(mat.name)) {
                        materials.set(mat.name, mat);
                    } else if (mat && !mat.name) {
                        // If material has no name, use a unique identifier
                        const uniqueName = `Material_${materials.size}`;
                        mat.name = uniqueName;
                        materials.set(uniqueName, mat);
                    }
                });
            }
        });
        
        // Only create folder if there are materials
        if (materials.size > 0) {
            // Insert materials folder at the top by creating it with a wrapper
            const tempDiv = document.createElement('div');
            this.materialsFolder = this.trackFolder(this.gui.addFolder('Material Colors'));
            
            // Move materials folder to the top of the GUI
            setTimeout(() => {
                const guiContainer = this.gui.domElement.querySelector('.children');
                const materialsElement = this.materialsFolder.domElement;
                
                if (guiContainer && materialsElement) {
                    // Move to the top
                    guiContainer.insertBefore(materialsElement, guiContainer.firstChild);
                    materialsElement.classList.add('materials-folder-main');
                }
            }, 10);
            
            // "Copy All HD Settings" button — copies XMUSCLE, XSKELETON, XCLEAR settings at once
            const hdMaterialNames = ['XMUSCLE', 'XSKELETON', 'XCLEAR'];
            const hasAnyHD = hdMaterialNames.some(n => materials.has(n));
            if (hasAnyHD) {
                const copyAllHD = {
                    copyAllHDSettings: () => {
                        let output = '';
                        hdMaterialNames.forEach(matName => {
                            const mat = materials.get(matName);
                            if (!mat) return;
                            
                            const hasTextures = mat.map || mat.normalMap || mat.emissiveMap || mat.bumpMap || mat.alphaMap;
                            
                            output += `Material Name: "${matName}"\n\n`;
                            output += `Settings:\n`;
                            if (mat.color) output += `- Color: #${mat.color.getHexString()}\n`;
                            if (mat.opacity !== undefined) output += `- Opacity: ${mat.opacity}\n`;
                            if (mat.transparent !== undefined) output += `- Transparent: ${mat.transparent}\n`;
                            if (mat.alphaTest !== undefined) output += `- Alpha Test: ${mat.alphaTest}\n`;
                            if (mat.side !== undefined) {
                                const sideNames = { 0: 'FrontSide', 1: 'BackSide', 2: 'DoubleSide' };
                                output += `- Side: ${sideNames[mat.side] || mat.side}\n`;
                            }
                            if (mat.depthWrite !== undefined) output += `- Depth Write: ${mat.depthWrite}\n`;
                            if (mat.metalness !== undefined) output += `- Metalness: ${mat.metalness}\n`;
                            if (mat.roughness !== undefined) output += `- Roughness: ${mat.roughness}\n`;
                            if (mat.emissive) output += `- Emissive: #${mat.emissive.getHexString()}\n`;
                            if (mat.emissiveIntensity !== undefined) output += `- Emissive Intensity: ${mat.emissiveIntensity}\n`;
                            if (mat.sheen !== undefined) output += `- Sheen: ${mat.sheen}\n`;
                            if (mat.sheenRoughness !== undefined) output += `- Sheen Roughness: ${mat.sheenRoughness}\n`;
                            if (mat.sheenColor) output += `- Sheen Color: #${mat.sheenColor.getHexString()}\n`;
                            if (mat.bumpScale !== undefined) output += `- Bump Scale: ${mat.bumpScale}\n`;
                            if (mat.transmission !== undefined) output += `- Transmission: ${mat.transmission}\n`;
                            if (mat.thickness !== undefined) output += `- Thickness: ${mat.thickness}\n`;
                            if (mat.ior !== undefined) output += `- IOR: ${mat.ior}\n`;
                            if (mat.envMapIntensity !== undefined) output += `- Env Map Intensity: ${mat.envMapIntensity}\n`;
                            if (mat.blending !== undefined) {
                                const blendingNames = { 0: 'NoBlending', 1: 'NormalBlending', 2: 'AdditiveBlending', 3: 'SubtractiveBlending', 4: 'MultiplyBlending', 5: 'CustomBlending' };
                                output += `- Blending: ${blendingNames[mat.blending] || mat.blending}\n`;
                            }
                            if (mat.depthTest !== undefined) output += `- Depth Test: ${mat.depthTest}\n`;
                            if (mat.clearcoat !== undefined && mat.clearcoat > 0) output += `- Clearcoat: ${mat.clearcoat}\n`;
                            if (mat.clearcoatRoughness !== undefined && mat.clearcoat > 0) output += `- Clearcoat Roughness: ${mat.clearcoatRoughness}\n`;
                            if (mat.specularIntensity !== undefined && mat.specularIntensity !== 1) output += `- Specular Intensity: ${mat.specularIntensity}\n`;
                            if (mat.specularColor) output += `- Specular Color: #${mat.specularColor.getHexString()}\n`;
                            if (mat.attenuationDistance !== undefined && isFinite(mat.attenuationDistance)) output += `- Attenuation Distance: ${mat.attenuationDistance}\n`;
                            if (mat.attenuationColor) output += `- Attenuation Color: #${mat.attenuationColor.getHexString()}\n`;
                            if (hasTextures) {
                                output += `\nNote: Has texture maps (`;
                                const maps = [];
                                if (mat.map) maps.push('map');
                                if (mat.normalMap) maps.push('normalMap');
                                if (mat.emissiveMap) maps.push('emissiveMap');
                                if (mat.bumpMap) maps.push('bumpMap');
                                if (mat.alphaMap) maps.push('alphaMap');
                                output += maps.join(', ') + `)\n`;
                            }
                            output += `\n---\n\n`;
                        });
                        
                        navigator.clipboard.writeText(output.trim()).then(() => {
                            console.log('📋 All HD material settings copied to clipboard (XMUSCLE, XSKELETON, XCLEAR)');
                        });
                    }
                };
                this.materialsFolder.add(copyAllHD, 'copyAllHDSettings').name('📋 Copy All HD Settings');
            }
            
            materials.forEach((material, name) => {
                const matFolder = this.trackFolder(this.materialsFolder.addFolder(name));
                // Ensure sub-folders are closed by default
                matFolder.close();
                
                // Material presets are now pre-applied before adding to scene
                // No need to apply again here
                
                // Add texture thumbnail and URL if custom texture exists for this material
                if (this.currentConfig?.customTextures && this.currentConfig.customTextures[name]) {
                    const textureUrl = this.currentConfig.customTextures[name];
                    
                    // Add clickable URL display in GUI with copy functionality
                    const urlParams = { textureUrl: textureUrl };
                    const urlController = matFolder.add(urlParams, 'textureUrl').name('Texture URL (click to copy)');
                    
                    // Make URL copyable on click
                    setTimeout(() => {
                        const urlInput = urlController.domElement.querySelector('input');
                        if (urlInput) {
                            urlInput.style.cursor = 'pointer';
                            urlInput.readOnly = true;
                            urlInput.addEventListener('click', () => {
                                navigator.clipboard.writeText(textureUrl).then(() => {
                                    console.log('Texture URL copied to clipboard:', textureUrl);
                                    // Briefly highlight the input
                                    urlInput.style.background = 'rgba(74, 158, 255, 0.3)';
                                    setTimeout(() => {
                                        urlInput.style.background = '';
                                    }, 300);
                                });
                            });
                        }
                    }, 0);
                    
                    setTimeout(() => {
                        const folderElement = matFolder.domElement;
                        if (folderElement) {
                            const thumbnailDiv = document.createElement('div');
                            thumbnailDiv.className = 'material-texture-thumbnail';
                            
                            const img = document.createElement('img');
                            img.src = textureUrl + (textureUrl.includes('?') ? '&' : '?') + `t=${Date.now()}`;
                            img.alt = `${name} texture`;
                            
                            thumbnailDiv.appendChild(img);
                            folderElement.appendChild(thumbnailDiv);
                        }
                    }, 0);
                }
                
                // PNG Edge Control - only show for materials with custom textures
                if (this.currentConfig?.customTextures && this.currentConfig.customTextures[name]) {
                    matFolder.add(material, 'alphaTest', 0, 1, 0.01)
                        .name('Edge Threshold (Fix Fringe)')
                        .onChange(() => material.needsUpdate = true);
                }
                
                // Color control
                if (material.color) {
                    const materialParams = {
                        color: '#' + material.color.getHexString()
                    };
                    
                    matFolder.addColor(materialParams, 'color')
                        .name('Color')
                        .onChange((value) => {
                            material.color.set(value);
                            material.needsUpdate = true;
                        });
                }
                
                // Opacity controls
                matFolder.add(material, 'opacity', 0, 1, 0.01)
                    .name('Opacity')
                    .onChange(() => material.needsUpdate = true);
                
                matFolder.add(material, 'transparent')
                    .name('Transparent')
                    .onChange(() => material.needsUpdate = true);
                
                // Alpha test (useful for alpha maps) - only show for non-custom textures
                if (!this.currentConfig?.customTextures || !this.currentConfig.customTextures[name]) {
                    matFolder.add(material, 'alphaTest', 0, 1, 0.01)
                        .name('Alpha Test')
                        .onChange(() => material.needsUpdate = true);
                }
                
                // Side rendering
                const sideOptions = { 'Front': THREE.FrontSide, 'Back': THREE.BackSide, 'Double': THREE.DoubleSide };
                matFolder.add(material, 'side', sideOptions)
                    .name('Side')
                    .onChange(() => material.needsUpdate = true);
                
                // Depth write (important for transparency)
                matFolder.add(material, 'depthWrite')
                    .name('Depth Write')
                    .onChange(() => material.needsUpdate = true);
                
                // Other common properties
                if (material.metalness !== undefined) {
                    matFolder.add(material, 'metalness', 0, 1, 0.01)
                        .name('Metalness')
                        .onChange(() => material.needsUpdate = true);
                }
                
                if (material.roughness !== undefined) {
                    matFolder.add(material, 'roughness', 0, 1, 0.01)
                        .name('Roughness')
                        .onChange(() => material.needsUpdate = true);
                }
                
                if (material.emissive) {
                    const emissiveParams = {
                        emissive: material.emissive.getHex()
                    };
                    matFolder.addColor(emissiveParams, 'emissive')
                        .name('Emissive')
                        .onChange((value) => {
                            material.emissive.setHex(value);
                        });
                }
                
                if (material.emissiveIntensity !== undefined) {
                    matFolder.add(material, 'emissiveIntensity', 0, 2, 0.01)
                        .name('Emissive Intensity')
                        .onChange(() => material.needsUpdate = true);
                }
                
                // Sheen and Bump Map controls for MUSCLE materials
                if (name.includes('MUSCLE')) {
                    // Sheen controls (velvet/skin-like appearance)
                    if (material.sheen !== undefined) {
                        matFolder.add(material, 'sheen', 0, 1, 0.01)
                            .name('Sheen Intensity')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'sheenRoughness', 0, 1, 0.01)
                            .name('Sheen Roughness')
                            .onChange(() => material.needsUpdate = true);
                        
                        // Sheen color control
                        const sheenParams = {
                            sheenColor: material.sheenColor ? material.sheenColor.getHex() : 0xffffff
                        };
                        matFolder.addColor(sheenParams, 'sheenColor')
                            .name('Sheen Color')
                            .onChange((value) => {
                                if (!material.sheenColor) {
                                    material.sheenColor = new THREE.Color();
                                }
                                material.sheenColor.setHex(value);
                                material.needsUpdate = true;
                            });
                    }
                    
                    // Bump map controls and preview
                    if (material.bumpScale !== undefined && material.bumpMap) {
                        // Add bump map thumbnail
                        setTimeout(() => {
                            const folderElement = matFolder.domElement;
                            if (folderElement) {
                                const bumpThumbnailDiv = document.createElement('div');
                                bumpThumbnailDiv.className = 'material-texture-thumbnail';
                                
                                const label = document.createElement('div');
                                label.textContent = 'Bump Map Texture:';
                                label.style.fontSize = '11px';
                                label.style.marginBottom = '4px';
                                label.style.color = '#aaa';
                                
                                const img = document.createElement('img');
                                // If the bump map has an image source, show it
                                if (material.bumpMap.image && material.bumpMap.image.src) {
                                    img.src = material.bumpMap.image.src;
                                } else if (material.bumpMap.source && material.bumpMap.source.data) {
                                    // For data textures, create a temporary canvas
                                    const canvas = document.createElement('canvas');
                                    canvas.width = 64;
                                    canvas.height = 64;
                                    const ctx = canvas.getContext('2d');
                                    if (material.bumpMap.image) {
                                        ctx.drawImage(material.bumpMap.image, 0, 0, 64, 64);
                                    }
                                    img.src = canvas.toDataURL();
                                }
                                img.alt = 'Bump map texture';
                                
                                bumpThumbnailDiv.appendChild(label);
                                bumpThumbnailDiv.appendChild(img);
                                folderElement.appendChild(bumpThumbnailDiv);
                            }
                        }, 100);
                        
                        matFolder.add(material, 'bumpScale', -20, 20, 0.1)
                            .name('Bump Scale')
                            .onChange(() => material.needsUpdate = true);
                    }
                }
                
                // Extensive transparency controls for SKIN materials
                if (name.includes('SKIN')) {
                    // Store original color map reference
                    if (!material._originalColorMap) {
                        material._originalColorMap = material.map;
                    }
                    
                    // Color Map Toggle - check if custom mode and remove by default
                    const isCustomMode = window.flexframeSettings && window.flexframeSettings.materialMode === 'custom';
                    const colorMapParams = {
                        useColorMap: isCustomMode ? false : !!material.map
                    };
                    
                    // Apply default state (remove color map if custom mode)
                    if (isCustomMode && material.map) {
                        material.map = null;
                        material.needsUpdate = true;
                    }
                    
                    matFolder.add(colorMapParams, 'useColorMap')
                        .name('🎨 Use Color Map')
                        .onChange((value) => {
                            if (value && material._originalColorMap) {
                                material.map = material._originalColorMap;
                            } else {
                                material.map = null;
                            }
                            material.needsUpdate = true;
                        });
                    
                    // Side rendering options
                    const sideOptions = { 'Front (Single)': THREE.FrontSide, 'Back': THREE.BackSide, 'Double': THREE.DoubleSide };
                    matFolder.add(material, 'side', sideOptions)
                        .name('Face Culling')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Blending modes
                    const blendingOptions = { 
                        'Normal': THREE.NormalBlending, 
                        'Additive': THREE.AdditiveBlending, 
                        'Subtractive': THREE.SubtractiveBlending,
                        'Multiply': THREE.MultiplyBlending,
                        'Custom': THREE.CustomBlending
                    };
                    matFolder.add(material, 'blending', blendingOptions)
                        .name('Blending Mode')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Depth controls (critical for transparency)
                    matFolder.add(material, 'depthWrite')
                        .name('Depth Write')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'depthTest')
                        .name('Depth Test')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Transparency controls
                    matFolder.add(material, 'opacity', 0, 1, 0.01)
                        .name('Opacity')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'transparent')
                        .name('Transparent')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'alphaTest', 0, 1, 0.01)
                        .name('Alpha Test')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Glass-like transmission (if MeshPhysicalMaterial)
                    if (material.transmission !== undefined) {
                        matFolder.add(material, 'transmission', 0, 1, 0.01)
                            .name('🪟 Transmission (Glass)')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'thickness', 0, 5, 0.01)
                            .name('Thickness')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'ior', 1, 2.333, 0.01)
                            .name('IOR (Refraction)')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'envMapIntensity', 0, 3, 0.01)
                            .name('Env Map Intensity')
                            .onChange(() => material.needsUpdate = true);
                    }
                    
                    // Cast shadows control (affects all meshes with this material)
                    const shadowParams = {
                        castShadow: true,
                        setCastShadow: (value) => {
                            // Update all meshes using this material
                            if (window.model) {
                                window.model.traverse((child) => {
                                    if (child.isMesh && child.material) {
                                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                                        if (mats.some(m => m.name === name)) {
                                            child.castShadow = value;
                                        }
                                    }
                                });
                            }
                        }
                    };
                    
                    matFolder.add(shadowParams, 'castShadow')
                        .name('Cast Shadows')
                        .onChange((value) => shadowParams.setCastShadow(value));
                    
                    // Shadow blur control (affects global directional light shadow softness)
                    const shadowBlurParams = {
                        shadowBlur: this.lighting?.directionalLight?.shadow?.radius || 1,
                        setShadowBlur: (value) => {
                            if (this.lighting?.directionalLight?.shadow) {
                                this.lighting.directionalLight.shadow.radius = value;
                                console.log(`Shadow blur set to: ${value}`);
                            }
                        }
                    };
                    
                    matFolder.add(shadowBlurParams, 'shadowBlur', 0, 10, 0.1)
                        .name('Shadow Blur')
                        .onChange((value) => shadowBlurParams.setShadowBlur(value));
                }
                
                // Extensive controls for XCLEAR materials (SKIN transmission + opacity mask)
                if (name.toUpperCase() === 'XCLEAR') {
                    // Show texture map info
                    const mapInfo = {
                        hasColorMap: !!material.map,
                        hasAlphaMap: !!material.alphaMap,
                        hasNormalMap: !!material.normalMap
                    };
                    
                    // Alpha Map toggle
                    if (!material._originalAlphaMap) {
                        material._originalAlphaMap = material.alphaMap;
                    }
                    if (!material._originalColorMap) {
                        material._originalColorMap = material.map;
                    }
                    
                    const xclearMapParams = {
                        useColorMap: !!material.map,
                        useAlphaMap: !!material.alphaMap
                    };
                    
                    matFolder.add(xclearMapParams, 'useColorMap')
                        .name('🎨 Color Map')
                        .onChange((value) => {
                            material.map = value ? material._originalColorMap : null;
                            material.needsUpdate = true;
                        });
                    
                    matFolder.add(xclearMapParams, 'useAlphaMap')
                        .name('🔲 Alpha/Opacity Map')
                        .onChange((value) => {
                            material.alphaMap = value ? material._originalAlphaMap : null;
                            material.needsUpdate = true;
                        });
                    
                    // Show alpha map thumbnail if available
                    const alphaSource = material.alphaMap || material._originalAlphaMap;
                    if (alphaSource) {
                        setTimeout(() => {
                            const folderElement = matFolder.domElement;
                            if (folderElement) {
                                const thumbDiv = document.createElement('div');
                                thumbDiv.className = 'material-texture-thumbnail';
                                
                                const label = document.createElement('div');
                                label.textContent = 'Alpha/Opacity Map:';
                                label.style.fontSize = '11px';
                                label.style.marginBottom = '4px';
                                label.style.color = '#aaa';
                                
                                const img = document.createElement('img');
                                if (alphaSource.image) {
                                    const canvas = document.createElement('canvas');
                                    canvas.width = 64;
                                    canvas.height = 64;
                                    const ctx = canvas.getContext('2d');
                                    ctx.drawImage(alphaSource.image, 0, 0, 64, 64);
                                    img.src = canvas.toDataURL();
                                }
                                img.alt = 'Alpha map texture';
                                
                                thumbDiv.appendChild(label);
                                thumbDiv.appendChild(img);
                                folderElement.appendChild(thumbDiv);
                            }
                        }, 100);
                    }
                    
                    // Show color map thumbnail if available
                    const colorSource = material.map || material._originalColorMap;
                    if (colorSource) {
                        setTimeout(() => {
                            const folderElement = matFolder.domElement;
                            if (folderElement) {
                                const thumbDiv = document.createElement('div');
                                thumbDiv.className = 'material-texture-thumbnail';
                                
                                const label = document.createElement('div');
                                label.textContent = 'Color Map:';
                                label.style.fontSize = '11px';
                                label.style.marginBottom = '4px';
                                label.style.color = '#aaa';
                                
                                const img = document.createElement('img');
                                if (colorSource.image) {
                                    const canvas = document.createElement('canvas');
                                    canvas.width = 64;
                                    canvas.height = 64;
                                    const ctx = canvas.getContext('2d');
                                    ctx.drawImage(colorSource.image, 0, 0, 64, 64);
                                    img.src = canvas.toDataURL();
                                }
                                img.alt = 'Color map texture';
                                
                                thumbDiv.appendChild(label);
                                thumbDiv.appendChild(img);
                                folderElement.appendChild(thumbDiv);
                            }
                        }, 100);
                    }
                    
                    // Side rendering 
                    const sideOptions = { 'Front': THREE.FrontSide, 'Back': THREE.BackSide, 'Double': THREE.DoubleSide };
                    matFolder.add(material, 'side', sideOptions)
                        .name('Face Culling')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Blending modes
                    const blendingOptions = { 
                        'Normal': THREE.NormalBlending, 
                        'Additive': THREE.AdditiveBlending, 
                        'Subtractive': THREE.SubtractiveBlending,
                        'Multiply': THREE.MultiplyBlending,
                        'Custom': THREE.CustomBlending
                    };
                    matFolder.add(material, 'blending', blendingOptions)
                        .name('Blending Mode')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Depth controls
                    matFolder.add(material, 'depthWrite')
                        .name('Depth Write')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'depthTest')
                        .name('Depth Test')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Transparency controls
                    matFolder.add(material, 'opacity', 0, 1, 0.01)
                        .name('Opacity')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'transparent')
                        .name('Transparent')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'alphaTest', 0, 1, 0.01)
                        .name('Alpha Test')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Transmission (glass) controls
                    if (material.transmission !== undefined) {
                        matFolder.add(material, 'transmission', 0, 1, 0.01)
                            .name('🪟 Transmission')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'thickness', 0, 5, 0.01)
                            .name('Thickness')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'ior', 1, 2.333, 0.01)
                            .name('IOR (Refraction)')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'envMapIntensity', 0, 5, 0.01)
                            .name('Env Map Intensity')
                            .onChange(() => material.needsUpdate = true);
                    }
                    
                    // Sheen controls
                    if (material.sheen !== undefined) {
                        matFolder.add(material, 'sheen', 0, 1, 0.01)
                            .name('Sheen')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'sheenRoughness', 0, 1, 0.01)
                            .name('Sheen Roughness')
                            .onChange(() => material.needsUpdate = true);
                        
                        const sheenColorParams = {
                            sheenColor: material.sheenColor ? material.sheenColor.getHex() : 0x000000
                        };
                        matFolder.addColor(sheenColorParams, 'sheenColor')
                            .name('Sheen Color')
                            .onChange((value) => {
                                if (!material.sheenColor) material.sheenColor = new THREE.Color();
                                material.sheenColor.setHex(value);
                                material.needsUpdate = true;
                            });
                    }
                    
                    // Clearcoat controls
                    if (material.clearcoat !== undefined) {
                        matFolder.add(material, 'clearcoat', 0, 1, 0.01)
                            .name('Clearcoat')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'clearcoatRoughness', 0, 1, 0.01)
                            .name('Clearcoat Roughness')
                            .onChange(() => material.needsUpdate = true);
                    }
                    
                    // Specular controls
                    if (material.specularIntensity !== undefined) {
                        matFolder.add(material, 'specularIntensity', 0, 2, 0.01)
                            .name('Specular Intensity')
                            .onChange(() => material.needsUpdate = true);
                        
                        const specColorParams = {
                            specularColor: material.specularColor ? material.specularColor.getHex() : 0xffffff
                        };
                        matFolder.addColor(specColorParams, 'specularColor')
                            .name('Specular Color')
                            .onChange((value) => {
                                if (!material.specularColor) material.specularColor = new THREE.Color();
                                material.specularColor.setHex(value);
                                material.needsUpdate = true;
                            });
                    }
                    
                    // Attenuation (colored glass absorption)
                    if (material.attenuationDistance !== undefined) {
                        matFolder.add(material, 'attenuationDistance', 0, 100, 0.1)
                            .name('Attenuation Dist')
                            .onChange(() => material.needsUpdate = true);
                        
                        const attenColorParams = {
                            attenuationColor: material.attenuationColor ? material.attenuationColor.getHex() : 0xffffff
                        };
                        matFolder.addColor(attenColorParams, 'attenuationColor')
                            .name('Attenuation Color')
                            .onChange((value) => {
                                if (!material.attenuationColor) material.attenuationColor = new THREE.Color();
                                material.attenuationColor.setHex(value);
                                material.needsUpdate = true;
                            });
                    }
                    
                    // Emissive controls
                    if (material.emissive) {
                        const emParams = { emissive: material.emissive.getHex() };
                        matFolder.addColor(emParams, 'emissive')
                            .name('Emissive Color')
                            .onChange((value) => {
                                material.emissive.setHex(value);
                                material.needsUpdate = true;
                            });
                        matFolder.add(material, 'emissiveIntensity', 0, 3, 0.01)
                            .name('Emissive Intensity')
                            .onChange(() => material.needsUpdate = true);
                    }
                    
                    // Alpha to coverage (MSAA-based — great for alpha masks)
                    matFolder.add(material, 'alphaToCoverage')
                        .name('Alpha To Coverage')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Premultiplied alpha
                    matFolder.add(material, 'premultipliedAlpha')
                        .name('Premultiplied Alpha')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Tone mapped
                    matFolder.add(material, 'toneMapped')
                        .name('Tone Mapped')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Wireframe (for debugging geometry/mask)
                    matFolder.add(material, 'wireframe')
                        .name('Wireframe')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Flat shading
                    matFolder.add(material, 'flatShading')
                        .name('Flat Shading')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Render order (controls transparency sort order)
                    const renderOrderParams = { renderOrder: 0 };
                    matFolder.add(renderOrderParams, 'renderOrder', -10, 10, 1)
                        .name('Render Order')
                        .onChange((value) => {
                            if (window.model) {
                                window.model.traverse((child) => {
                                    if (child.isMesh && child.material) {
                                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                                        if (mats.some(m => m.name === name)) {
                                            child.renderOrder = value;
                                        }
                                    }
                                });
                            }
                        });
                    
                    // Custom blending factors (only relevant when blending = CustomBlending)
                    const blendSrcOptions = {
                        'SrcAlpha': THREE.SrcAlphaFactor,
                        'One': THREE.OneFactor,
                        'Zero': THREE.ZeroFactor,
                        'DstColor': THREE.DstColorFactor,
                        'OneMinusSrcAlpha': THREE.OneMinusSrcAlphaFactor,
                        'SrcColor': THREE.SrcColorFactor,
                        'OneMinusDstColor': THREE.OneMinusDstColorFactor
                    };
                    const blendDstOptions = {
                        'OneMinusSrcAlpha': THREE.OneMinusSrcAlphaFactor,
                        'One': THREE.OneFactor,
                        'Zero': THREE.ZeroFactor,
                        'SrcColor': THREE.SrcColorFactor,
                        'SrcAlpha': THREE.SrcAlphaFactor,
                        'DstColor': THREE.DstColorFactor,
                        'OneMinusSrcColor': THREE.OneMinusSrcColorFactor
                    };
                    const blendEqOptions = {
                        'Add': THREE.AddEquation,
                        'Subtract': THREE.SubtractEquation,
                        'ReverseSubtract': THREE.ReverseSubtractEquation,
                        'Min': THREE.MinEquation,
                        'Max': THREE.MaxEquation
                    };
                    
                    matFolder.add(material, 'blendSrc', blendSrcOptions)
                        .name('Blend Src')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'blendDst', blendDstOptions)
                        .name('Blend Dst')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'blendEquation', blendEqOptions)
                        .name('Blend Equation')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Visible toggle
                    matFolder.add(material, 'visible')
                        .name('Visible')
                        .onChange(() => {});
                    
                    // Cast shadows
                    const xclearShadowParams = {
                        castShadow: true,
                        receiveShadow: true
                    };
                    matFolder.add(xclearShadowParams, 'castShadow')
                        .name('Cast Shadows')
                        .onChange((value) => {
                            if (window.model) {
                                window.model.traverse((child) => {
                                    if (child.isMesh && child.material) {
                                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                                        if (mats.some(m => m.name === name)) {
                                            child.castShadow = value;
                                        }
                                    }
                                });
                            }
                        });
                    matFolder.add(xclearShadowParams, 'receiveShadow')
                        .name('Receive Shadows')
                        .onChange((value) => {
                            if (window.model) {
                                window.model.traverse((child) => {
                                    if (child.isMesh && child.material) {
                                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                                        if (mats.some(m => m.name === name)) {
                                            child.receiveShadow = value;
                                        }
                                    }
                                });
                            }
                        });
                }
                
                // ─── Super-comprehensive XBODY debug controls ─────────
                if (name.toUpperCase().includes('XBODY') || name.toUpperCase() === 'XCLEAR' || name.toUpperCase().includes('XHEAD')) {

                    // ── 📋 Copy Current State for quick sharing ──
                    const xbodyCopy = {
                        copyState: () => {
                            const s = [];
                            s.push(`XBODY Material State (${new Date().toLocaleTimeString()})`);
                            s.push(`type: ${material.type}`);
                            if (material.color) s.push(`color: #${material.color.getHexString()}`);
                            s.push(`opacity: ${material.opacity}`);
                            s.push(`transparent: ${material.transparent}`);
                            s.push(`alphaTest: ${material.alphaTest}`);
                            s.push(`side: ${['Front','Back','Double'][material.side]}`);
                            s.push(`depthWrite: ${material.depthWrite}`);
                            s.push(`depthTest: ${material.depthTest}`);
                            s.push(`wireframe: ${material.wireframe}`);
                            s.push(`flatShading: ${material.flatShading}`);
                            if (material.metalness !== undefined) s.push(`metalness: ${material.metalness}`);
                            if (material.roughness !== undefined) s.push(`roughness: ${material.roughness}`);
                            s.push(`--- Maps ---`);
                            s.push(`map: ${!!material.map}`);
                            s.push(`normalMap: ${!!material.normalMap}`);
                            if (material.normalMap && material.normalScale) s.push(`normalScale: ${material.normalScale.x}, ${material.normalScale.y}`);
                            s.push(`normalMapType: ${material.normalMapType === 0 ? 'TangentSpace' : 'ObjectSpace'}`);
                            s.push(`bumpMap: ${!!material.bumpMap}`);
                            if (material.bumpMap) s.push(`bumpScale: ${material.bumpScale}`);
                            s.push(`aoMap: ${!!material.aoMap}`);
                            if (material.aoMap) s.push(`aoMapIntensity: ${material.aoMapIntensity}`);
                            s.push(`roughnessMap: ${!!material.roughnessMap}`);
                            s.push(`metalnessMap: ${!!material.metalnessMap}`);
                            s.push(`emissiveMap: ${!!material.emissiveMap}`);
                            s.push(`displacementMap: ${!!material.displacementMap}`);
                            if (material.displacementMap) {
                                s.push(`displacementScale: ${material.displacementScale}`);
                                s.push(`displacementBias: ${material.displacementBias}`);
                            }
                            s.push(`envMap: ${!!material.envMap}`);
                            if (material.envMapIntensity !== undefined) s.push(`envMapIntensity: ${material.envMapIntensity}`);
                            s.push(`--- UV ---`);
                            if (material.map) {
                                const t = material.map;
                                s.push(`map.flipY: ${t.flipY}`);
                                s.push(`map.offset: ${t.offset.x}, ${t.offset.y}`);
                                s.push(`map.repeat: ${t.repeat.x}, ${t.repeat.y}`);
                                s.push(`map.rotation: ${t.rotation}`);
                                s.push(`map.wrapS: ${t.wrapS} (1000=Repeat,1001=Clamp,1002=Mirror)`);
                                s.push(`map.wrapT: ${t.wrapT}`);
                                s.push(`map.colorSpace: ${t.colorSpace}`);
                                s.push(`map.channel: ${t.channel}`);
                            }
                            if (material.normalMap) {
                                const t = material.normalMap;
                                s.push(`normalMap.flipY: ${t.flipY}`);
                                s.push(`normalMap.offset: ${t.offset.x}, ${t.offset.y}`);
                                s.push(`normalMap.repeat: ${t.repeat.x}, ${t.repeat.y}`);
                                s.push(`normalMap.rotation: ${t.rotation}`);
                                s.push(`normalMap.wrapS: ${t.wrapS}`);
                                s.push(`normalMap.wrapT: ${t.wrapT}`);
                                s.push(`normalMap.colorSpace: ${t.colorSpace}`);
                                s.push(`normalMap.channel: ${t.channel}`);
                            }
                            if (material.transmission !== undefined) {
                                s.push(`--- Physical ---`);
                                s.push(`transmission: ${material.transmission}`);
                                s.push(`thickness: ${material.thickness}`);
                                s.push(`ior: ${material.ior}`);
                                s.push(`sheen: ${material.sheen}`);
                                s.push(`sheenRoughness: ${material.sheenRoughness}`);
                                s.push(`clearcoat: ${material.clearcoat}`);
                                s.push(`clearcoatRoughness: ${material.clearcoatRoughness}`);
                                s.push(`specularIntensity: ${material.specularIntensity}`);
                            }
                            const txt = s.join('\n');
                            navigator.clipboard.writeText(txt).then(() => {
                                console.log('📋 XBODY state copied:\n' + txt);
                            });
                        }
                    };
                    matFolder.add(xbodyCopy, 'copyState').name('📋 Copy Full State');

                    // ── Texture Map Toggles ──
                    if (!material._origMap) material._origMap = material.map;
                    if (!material._origNormalMap) material._origNormalMap = material.normalMap;
                    if (!material._origBumpMap) material._origBumpMap = material.bumpMap;
                    if (!material._origAoMap) material._origAoMap = material.aoMap;
                    if (!material._origRoughnessMap) material._origRoughnessMap = material.roughnessMap;
                    if (!material._origMetalnessMap) material._origMetalnessMap = material.metalnessMap;
                    if (!material._origEmissiveMap) material._origEmissiveMap = material.emissiveMap;
                    if (!material._origDisplacementMap) material._origDisplacementMap = material.displacementMap;
                    if (!material._origAlphaMap) material._origAlphaMap = material.alphaMap;

                    const mapToggles = {
                        colorMap: !!material.map,
                        normalMap: !!material.normalMap,
                        bumpMap: !!material.bumpMap,
                        aoMap: !!material.aoMap,
                        roughnessMap: !!material.roughnessMap,
                        metalnessMap: !!material.metalnessMap,
                        emissiveMap: !!material.emissiveMap,
                        displacementMap: !!material.displacementMap,
                        alphaMap: !!material.alphaMap
                    };
                    const mapSub = matFolder.addFolder('🗺️ Texture Maps');
                    const mapToggleHandler = (key, origKey) => (v) => {
                        material[key] = v ? material[origKey] : null;
                        material.needsUpdate = true;
                    };
                    mapSub.add(mapToggles, 'colorMap').name('Color Map').onChange(mapToggleHandler('map', '_origMap'));
                    mapSub.add(mapToggles, 'normalMap').name('Normal Map').onChange(mapToggleHandler('normalMap', '_origNormalMap'));
                    mapSub.add(mapToggles, 'bumpMap').name('Bump Map').onChange(mapToggleHandler('bumpMap', '_origBumpMap'));
                    mapSub.add(mapToggles, 'aoMap').name('AO Map').onChange(mapToggleHandler('aoMap', '_origAoMap'));
                    mapSub.add(mapToggles, 'roughnessMap').name('Roughness Map').onChange(mapToggleHandler('roughnessMap', '_origRoughnessMap'));
                    mapSub.add(mapToggles, 'metalnessMap').name('Metalness Map').onChange(mapToggleHandler('metalnessMap', '_origMetalnessMap'));
                    mapSub.add(mapToggles, 'emissiveMap').name('Emissive Map').onChange(mapToggleHandler('emissiveMap', '_origEmissiveMap'));
                    mapSub.add(mapToggles, 'displacementMap').name('Displacement Map').onChange(mapToggleHandler('displacementMap', '_origDisplacementMap'));
                    mapSub.add(mapToggles, 'alphaMap').name('Alpha Map').onChange(mapToggleHandler('alphaMap', '_origAlphaMap'));

                    // ── Texture Map Thumbnails ──
                    const mapNames = [
                        ['Color Map', material.map || material._origMap],
                        ['Normal Map', material.normalMap || material._origNormalMap],
                        ['Bump Map', material.bumpMap || material._origBumpMap],
                        ['AO Map', material.aoMap || material._origAoMap],
                        ['Roughness Map', material.roughnessMap || material._origRoughnessMap],
                        ['Metalness Map', material.metalnessMap || material._origMetalnessMap],
                        ['Emissive Map', material.emissiveMap || material._origEmissiveMap],
                        ['Displacement Map', material.displacementMap || material._origDisplacementMap],
                        ['Alpha Map', material.alphaMap || material._origAlphaMap]
                    ];
                    setTimeout(() => {
                        const el = mapSub.domElement;
                        if (!el) return;
                        mapNames.forEach(([label, tex]) => {
                            if (!tex || !tex.image) return;
                            const div = document.createElement('div');
                            div.className = 'material-texture-thumbnail';
                            const lbl = document.createElement('div');
                            lbl.textContent = label + ':';
                            lbl.style.cssText = 'font-size:11px;margin-bottom:4px;color:#aaa;';
                            const canvas = document.createElement('canvas');
                            canvas.width = 64; canvas.height = 64;
                            try {
                                const ctx = canvas.getContext('2d');
                                ctx.drawImage(tex.image, 0, 0, 64, 64);
                                const img = document.createElement('img');
                                img.src = canvas.toDataURL();
                                img.alt = label;
                                div.appendChild(lbl);
                                div.appendChild(img);
                                el.appendChild(div);
                            } catch(e) { /* cross-origin texture */ }
                        });
                    }, 200);

                    // ── Normal Map Controls ──
                    if (material.normalMap || material._origNormalMap) {
                        const normalSub = matFolder.addFolder('🧭 Normal Map');
                        
                        // Normal scale X and Y (independent axes)
                        if (material.normalScale) {
                            normalSub.add(material.normalScale, 'x', -5, 5, 0.01)
                                .name('Normal Scale X')
                                .onChange(() => material.needsUpdate = true);
                            normalSub.add(material.normalScale, 'y', -5, 5, 0.01)
                                .name('Normal Scale Y')
                                .onChange(() => material.needsUpdate = true);
                        }

                        // Normal map type
                        const normalTypeOptions = {
                            'Tangent Space': THREE.TangentSpaceNormalMap,
                            'Object Space': THREE.ObjectSpaceNormalMap
                        };
                        normalSub.add(material, 'normalMapType', normalTypeOptions)
                            .name('Normal Map Type')
                            .onChange(() => material.needsUpdate = true);

                        // Flip Y (common Samsung Internet issue)
                        const nTex = material.normalMap || material._origNormalMap;
                        if (nTex) {
                            normalSub.add(nTex, 'flipY')
                                .name('Flip Y')
                                .onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });
                            
                            // UV offset/repeat/rotation on the normal map
                            normalSub.add(nTex.offset, 'x', -2, 2, 0.01).name('UV Offset X').onChange(() => material.needsUpdate = true);
                            normalSub.add(nTex.offset, 'y', -2, 2, 0.01).name('UV Offset Y').onChange(() => material.needsUpdate = true);
                            normalSub.add(nTex.repeat, 'x', -4, 4, 0.01).name('UV Repeat X').onChange(() => material.needsUpdate = true);
                            normalSub.add(nTex.repeat, 'y', -4, 4, 0.01).name('UV Repeat Y').onChange(() => material.needsUpdate = true);
                            normalSub.add(nTex, 'rotation', -Math.PI, Math.PI, 0.01).name('UV Rotation').onChange(() => material.needsUpdate = true);

                            // UV channel
                            normalSub.add(nTex, 'channel', { 'UV0': 0, 'UV1': 1 })
                                .name('UV Channel')
                                .onChange(() => material.needsUpdate = true);

                            // Wrapping
                            const wrapOptions = { 'Repeat': THREE.RepeatWrapping, 'Clamp': THREE.ClampToEdgeWrapping, 'Mirror': THREE.MirroredRepeatWrapping };
                            normalSub.add(nTex, 'wrapS', wrapOptions).name('Wrap S').onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });
                            normalSub.add(nTex, 'wrapT', wrapOptions).name('Wrap T').onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });

                            // Color space (normal maps should be LinearSRGBColorSpace)
                            const csOptions = { 'Linear': THREE.LinearSRGBColorSpace, 'sRGB': THREE.SRGBColorSpace, 'None': '' };
                            normalSub.add(nTex, 'colorSpace', csOptions).name('Color Space')
                                .onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });

                            // Filtering
                            const filterOptions = { 'Linear': THREE.LinearFilter, 'Nearest': THREE.NearestFilter, 'LinearMipmap': THREE.LinearMipmapLinearFilter };
                            normalSub.add(nTex, 'minFilter', filterOptions).name('Min Filter').onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });
                            normalSub.add(nTex, 'magFilter', { 'Linear': THREE.LinearFilter, 'Nearest': THREE.NearestFilter }).name('Mag Filter').onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });
                            normalSub.add(nTex, 'generateMipmaps').name('Generate Mipmaps').onChange(() => { nTex.needsUpdate = true; material.needsUpdate = true; });
                        }
                    }

                    // ── Bump Map Controls ──
                    if (material.bumpMap || material._origBumpMap) {
                        const bumpSub = matFolder.addFolder('⛰️ Bump Map');
                        bumpSub.add(material, 'bumpScale', -5, 5, 0.01).name('Bump Scale').onChange(() => material.needsUpdate = true);
                        const bTex = material.bumpMap || material._origBumpMap;
                        if (bTex) {
                            bumpSub.add(bTex, 'flipY').name('Flip Y').onChange(() => { bTex.needsUpdate = true; material.needsUpdate = true; });
                            bumpSub.add(bTex.offset, 'x', -2, 2, 0.01).name('UV Offset X').onChange(() => material.needsUpdate = true);
                            bumpSub.add(bTex.offset, 'y', -2, 2, 0.01).name('UV Offset Y').onChange(() => material.needsUpdate = true);
                            bumpSub.add(bTex.repeat, 'x', -4, 4, 0.01).name('UV Repeat X').onChange(() => material.needsUpdate = true);
                            bumpSub.add(bTex.repeat, 'y', -4, 4, 0.01).name('UV Repeat Y').onChange(() => material.needsUpdate = true);
                        }
                    }

                    // ── Color Map UV Controls ──
                    if (material.map || material._origMap) {
                        const uvSub = matFolder.addFolder('🎨 Color Map UV');
                        const cTex = material.map || material._origMap;
                        if (cTex) {
                            uvSub.add(cTex, 'flipY').name('Flip Y').onChange(() => { cTex.needsUpdate = true; material.needsUpdate = true; });
                            uvSub.add(cTex.offset, 'x', -2, 2, 0.01).name('UV Offset X').onChange(() => material.needsUpdate = true);
                            uvSub.add(cTex.offset, 'y', -2, 2, 0.01).name('UV Offset Y').onChange(() => material.needsUpdate = true);
                            uvSub.add(cTex.repeat, 'x', -4, 4, 0.01).name('UV Repeat X').onChange(() => material.needsUpdate = true);
                            uvSub.add(cTex.repeat, 'y', -4, 4, 0.01).name('UV Repeat Y').onChange(() => material.needsUpdate = true);
                            uvSub.add(cTex, 'rotation', -Math.PI, Math.PI, 0.01).name('UV Rotation').onChange(() => material.needsUpdate = true);
                            uvSub.add(cTex, 'channel', { 'UV0': 0, 'UV1': 1 }).name('UV Channel').onChange(() => material.needsUpdate = true);
                            const csOpts = { 'Linear': THREE.LinearSRGBColorSpace, 'sRGB': THREE.SRGBColorSpace, 'None': '' };
                            uvSub.add(cTex, 'colorSpace', csOpts).name('Color Space').onChange(() => { cTex.needsUpdate = true; material.needsUpdate = true; });
                        }
                    }

                    // ── AO Map ──
                    if (material.aoMapIntensity !== undefined) {
                        matFolder.add(material, 'aoMapIntensity', 0, 5, 0.01).name('AO Intensity').onChange(() => material.needsUpdate = true);
                    }

                    // ── Displacement ──
                    if (material.displacementScale !== undefined) {
                        matFolder.add(material, 'displacementScale', -2, 2, 0.001).name('Displacement Scale').onChange(() => material.needsUpdate = true);
                        matFolder.add(material, 'displacementBias', -2, 2, 0.001).name('Displacement Bias').onChange(() => material.needsUpdate = true);
                    }

                    // ── Blending ──
                    const xbBlendOptions = {
                        'Normal': THREE.NormalBlending,
                        'Additive': THREE.AdditiveBlending,
                        'Subtractive': THREE.SubtractiveBlending,
                        'Multiply': THREE.MultiplyBlending,
                        'Custom': THREE.CustomBlending,
                        'No Blending': THREE.NoBlending
                    };
                    matFolder.add(material, 'blending', xbBlendOptions).name('Blending').onChange(() => material.needsUpdate = true);

                    // ── Depth ──
                    matFolder.add(material, 'depthTest').name('Depth Test').onChange(() => material.needsUpdate = true);

                    // ── Physical Material Properties (if applicable) ──
                    if (material.type === 'MeshPhysicalMaterial' || material.type === 'MeshStandardMaterial') {
                        const physSub = matFolder.addFolder('⚡ Physical');
                        if (material.envMapIntensity !== undefined) physSub.add(material, 'envMapIntensity', 0, 5, 0.01).name('Env Map Intensity').onChange(() => material.needsUpdate = true);
                        if (material.transmission !== undefined) physSub.add(material, 'transmission', 0, 1, 0.01).name('Transmission').onChange(() => material.needsUpdate = true);
                        if (material.thickness !== undefined) physSub.add(material, 'thickness', 0, 5, 0.01).name('Thickness').onChange(() => material.needsUpdate = true);
                        if (material.ior !== undefined) physSub.add(material, 'ior', 1, 2.5, 0.01).name('IOR').onChange(() => material.needsUpdate = true);
                        if (material.sheen !== undefined) physSub.add(material, 'sheen', 0, 1, 0.01).name('Sheen').onChange(() => material.needsUpdate = true);
                        if (material.sheenRoughness !== undefined) physSub.add(material, 'sheenRoughness', 0, 1, 0.01).name('Sheen Roughness').onChange(() => material.needsUpdate = true);
                        if (material.clearcoat !== undefined) physSub.add(material, 'clearcoat', 0, 1, 0.01).name('Clearcoat').onChange(() => material.needsUpdate = true);
                        if (material.clearcoatRoughness !== undefined) physSub.add(material, 'clearcoatRoughness', 0, 1, 0.01).name('Clearcoat Rough').onChange(() => material.needsUpdate = true);
                        if (material.specularIntensity !== undefined) physSub.add(material, 'specularIntensity', 0, 3, 0.01).name('Specular Int').onChange(() => material.needsUpdate = true);
                    }

                    // ── Wireframe / Debug ──
                    matFolder.add(material, 'wireframe').name('Wireframe').onChange(() => material.needsUpdate = true);
                    matFolder.add(material, 'flatShading').name('Flat Shading').onChange(() => { material.needsUpdate = true; });
                    matFolder.add(material, 'visible').name('Visible');
                    if (material.alphaToCoverage !== undefined) matFolder.add(material, 'alphaToCoverage').name('Alpha To Coverage').onChange(() => material.needsUpdate = true);
                    if (material.premultipliedAlpha !== undefined) matFolder.add(material, 'premultipliedAlpha').name('Premultiplied Alpha').onChange(() => material.needsUpdate = true);
                    matFolder.add(material, 'toneMapped').name('Tone Mapped').onChange(() => material.needsUpdate = true);

                    // ── Mesh-level controls (castShadow, receiveShadow, renderOrder) ──
                    const xbMesh = { castShadow: true, receiveShadow: true, renderOrder: 0 };
                    const xbApplyMesh = (prop, value) => {
                        if (!window.model) return;
                        window.model.traverse(c => {
                            if (c.isMesh && c.material) {
                                const ms = Array.isArray(c.material) ? c.material : [c.material];
                                if (ms.some(m => m.name === name)) c[prop] = value;
                            }
                        });
                    };
                    matFolder.add(xbMesh, 'castShadow').name('Cast Shadows').onChange(v => xbApplyMesh('castShadow', v));
                    matFolder.add(xbMesh, 'receiveShadow').name('Receive Shadows').onChange(v => xbApplyMesh('receiveShadow', v));
                    matFolder.add(xbMesh, 'renderOrder', -10, 10, 1).name('Render Order').onChange(v => xbApplyMesh('renderOrder', v));
                }
                
                // Add "Copy Settings" button at the bottom of each material folder
                const copyParams = {
                    copySettings: () => {
                        // Check if material has any texture maps
                        const hasTextures = material.map || material.normalMap || material.emissiveMap || material.bumpMap;
                        
                        // Build the settings string with template format
                        let settingsText = `Can you please use these material settings as the default material settings whenever a model loads in with this specific material name.`;
                        
                        if (hasTextures) {
                            settingsText += ` Do NOT preserve any texture maps - use pure material properties only:\n\n`;
                        } else {
                            settingsText += `\n\n`;
                        }
                        
                        settingsText += `Material Name: "${name}"\n\n`;
                        settingsText += `Settings:\n`;
                        
                        // Color
                        if (material.color) {
                            settingsText += `- Color: #${material.color.getHexString()}\n`;
                        }
                        
                        // Basic properties
                        if (material.opacity !== undefined) settingsText += `- Opacity: ${material.opacity}\n`;
                        if (material.transparent !== undefined) settingsText += `- Transparent: ${material.transparent}\n`;
                        if (material.alphaTest !== undefined) settingsText += `- Alpha Test: ${material.alphaTest}\n`;
                        if (material.side !== undefined) {
                            const sideNames = { 0: 'FrontSide', 1: 'BackSide', 2: 'DoubleSide' };
                            settingsText += `- Side: ${sideNames[material.side] || material.side}\n`;
                        }
                        if (material.depthWrite !== undefined) settingsText += `- Depth Write: ${material.depthWrite}\n`;
                        
                        // PBR properties
                        if (material.metalness !== undefined) settingsText += `- Metalness: ${material.metalness}\n`;
                        if (material.roughness !== undefined) settingsText += `- Roughness: ${material.roughness}\n`;
                        
                        // Emissive
                        if (material.emissive) {
                            settingsText += `- Emissive: #${material.emissive.getHexString()}\n`;
                        }
                        if (material.emissiveIntensity !== undefined) settingsText += `- Emissive Intensity: ${material.emissiveIntensity}\n`;
                        
                        // Sheen (for MUSCLE materials)
                        if (material.sheen !== undefined) settingsText += `- Sheen: ${material.sheen}\n`;
                        if (material.sheenRoughness !== undefined) settingsText += `- Sheen Roughness: ${material.sheenRoughness}\n`;
                        if (material.sheenColor) {
                            settingsText += `- Sheen Color: #${material.sheenColor.getHexString()}\n`;
                        }
                        
                        // Bump
                        if (material.bumpScale !== undefined) settingsText += `- Bump Scale: ${material.bumpScale}\n`;
                        
                        // Transmission/Glass properties (for SKIN materials)
                        if (material.transmission !== undefined) settingsText += `- Transmission: ${material.transmission}\n`;
                        if (material.thickness !== undefined) settingsText += `- Thickness: ${material.thickness}\n`;
                        if (material.ior !== undefined) settingsText += `- IOR: ${material.ior}\n`;
                        if (material.envMapIntensity !== undefined) settingsText += `- Env Map Intensity: ${material.envMapIntensity}\n`;
                        
                        // Blending
                        if (material.blending !== undefined) {
                            const blendingNames = { 0: 'NoBlending', 1: 'NormalBlending', 2: 'AdditiveBlending', 3: 'SubtractiveBlending', 4: 'MultiplyBlending', 5: 'CustomBlending' };
                            settingsText += `- Blending: ${blendingNames[material.blending] || material.blending}\n`;
                        }
                        if (material.depthTest !== undefined) settingsText += `- Depth Test: ${material.depthTest}\n`;
                        
                        // Add note about texture maps if they exist
                        if (hasTextures) {
                            settingsText += `\nNote: Remove all texture maps (map, normalMap, emissiveMap, bumpMap) for a pure material appearance.`;
                        }
                        
                        // Copy to clipboard
                        navigator.clipboard.writeText(settingsText).then(() => {
                            console.log('Material settings copied to clipboard for:', name);
                        });
                    }
                };
                
                matFolder.add(copyParams, 'copySettings').name('Copy Settings');
            });
            
            // this.materialsFolder.open();
        }
    }

    applyCustomTextures(model, customTextures) {
        // Apply custom textures to specific materials
        Object.keys(customTextures).forEach(materialName => {
            const textureUrl = customTextures[materialName];
            
            // Add cache-busting to texture URL
            const cacheBustedUrl = textureUrl + (textureUrl.includes('?') ? '&' : '?') + `t=${Date.now()}`;
            
            console.log(`🎨 Custom texture for ${materialName}: ${textureUrl}`);
            console.log(`🔄 Cache-busted URL: ${cacheBustedUrl}`);
            
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    
                    mats.forEach((mat) => {
                        if (mat.name === materialName) {
                            console.log(`✅ Found material "${materialName}" - applying texture...`);
                            
                            // Dispose old texture if exists
                            if (mat.map) {
                                mat.map.dispose();
                            }
                            
                            // Load the texture with cache-busting
                            this.textureLoader.load(cacheBustedUrl, (texture) => {
                                // Fix white fringe by setting proper color space and filtering
                                texture.colorSpace = THREE.SRGBColorSpace;
                                texture.premultiplyAlpha = false;
                                
                                // Use better filtering for transparent edges
                                texture.minFilter = THREE.LinearFilter;
                                texture.magFilter = THREE.LinearFilter;
                                texture.generateMipmaps = false;
                                
                                // Apply the texture as the main color map
                                mat.map = texture;
                                
                                // Enable transparency (PNG alpha channel will work automatically)
                                mat.transparent = true;
                                
                                // Higher alphaTest removes white fringe better (default: 0.95)
                                mat.alphaTest = 0.95;
                                
                                // Ensure proper depth writing for transparency
                                mat.depthWrite = false;
                                
                                mat.needsUpdate = true;
                                console.log(`✅ PNG texture with transparency applied to ${materialName}`);
                                console.log(`📷 Texture loaded from: ${cacheBustedUrl}`);
                            }, undefined, (error) => {
                                console.error(`❌ Error loading texture for ${materialName}:`, error);
                            });
                        }
                    });
                }
            });
        });
    }

    applyLogoTexture(model, logoUrl, threshold = 0.95, borderEnabled = false, borderSize = 2, displaySize = 100) {
        // Apply LOGO texture to material named "LOGO"
        const cacheBustedUrl = logoUrl + (logoUrl.includes('?') ? '&' : '?') + `t=${Date.now()}`;
        
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                
                mats.forEach((mat) => {
                    if (mat.name === 'LOGO') {
                        console.log('✅ Found LOGO material - hiding until texture loads...');
                        
                        // Hide material immediately to prevent flash of blank material
                        mat.visible = false;
                        
                        // Dispose old texture if exists
                        if (mat.map) {
                            mat.map.dispose();
                        }
                        
                        // Load the image first to process it
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = () => {
                            // Create canvas to process the image
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            
                            // Calculate size based on displaySize percentage
                            const scale = displaySize / 100;
                            const scaledWidth = img.width * scale;
                            const scaledHeight = img.height * scale;
                            
                            // Set canvas size to original image dimensions
                            canvas.width = img.width;
                            canvas.height = img.height;
                            
                            // Clear canvas
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
                            // Calculate centered position for scaled image
                            const offsetX = (canvas.width - scaledWidth) / 2;
                            const offsetY = (canvas.height - scaledHeight) / 2;
                            
                            // Add white border if enabled
                            if (borderEnabled && borderSize > 0) {
                                // Draw multiple offset versions for border effect
                                ctx.globalCompositeOperation = 'source-over';
                                
                                // Create a temporary canvas for the border
                                const tempCanvas = document.createElement('canvas');
                                const tempCtx = tempCanvas.getContext('2d');
                                tempCanvas.width = canvas.width;
                                tempCanvas.height = canvas.height;
                                
                                // Draw scaled image to temp canvas
                                tempCtx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
                                
                                // Get image data and create border
                                const borderPixels = parseInt(borderSize);
                                for (let angle = 0; angle < 360; angle += 15) {
                                    const rad = angle * Math.PI / 180;
                                    const dx = Math.cos(rad) * borderPixels;
                                    const dy = Math.sin(rad) * borderPixels;
                                    ctx.drawImage(tempCanvas, dx, dy);
                                }
                                
                                // Make the border white
                                ctx.globalCompositeOperation = 'source-in';
                                ctx.fillStyle = 'white';
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                
                                // Draw the original image on top
                                ctx.globalCompositeOperation = 'source-over';
                                ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
                            } else {
                                // Just draw scaled and centered
                                ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
                            }
                            
                            // Create texture from canvas
                            const texture = new THREE.CanvasTexture(canvas);
                            
                            // Fix white fringe by setting proper color space and filtering
                            texture.colorSpace = THREE.SRGBColorSpace;
                            texture.premultiplyAlpha = false;
                            
                            // Use better filtering for transparent edges
                            texture.minFilter = THREE.LinearFilter;
                            texture.magFilter = THREE.LinearFilter;
                            texture.generateMipmaps = false;
                            
                            // Apply the texture as the main color map
                            mat.map = texture;
                            
                            // Reset base material properties to ensure correct rendering
                            // (handles cases where GLB exports empty/black materials)
                            mat.color = new THREE.Color(0xffffff); // White base so texture shows at full brightness
                            mat.side = THREE.DoubleSide; // Ensure plane is visible from both sides
                            mat.metalness = 0;
                            mat.roughness = 1;
                            mat.emissive = new THREE.Color(0x000000);
                            mat.emissiveIntensity = 0;
                            
                            // Enable transparency
                            mat.transparent = true;
                            mat.alphaTest = parseFloat(threshold) || 0.95;
                            mat.depthWrite = false;
                            
                            mat.needsUpdate = true;
                            
                            // Show material now that texture is loaded
                            mat.visible = true;
                            
                            console.log('✅ LOGO texture applied successfully with border:', borderEnabled, 'size:', borderSize, 'displaySize:', displaySize);
                        };
                        img.onerror = (error) => {
                            console.error('❌ Error loading LOGO texture:', error);
                            // Show material even on error so it's not invisible forever
                            mat.visible = true;
                        };
                        img.src = cacheBustedUrl;
                    }
                });
            }
        });
    }
    
    applyMaterialPreset1() {
        if (!window.model) {
            console.log('No model loaded');
            return;
        }
        
        const presets = {
            'SKELETON': {
                color: '#ffffff',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0.99,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'SKIN': {
                color: '#ccdef5',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0,
                transmission: 1,
                thickness: 0,
                ior: 1,
                side: THREE.FrontSide,
                blending: THREE.CustomBlending,
                depthWrite: false,
                depthTest: true,
                envMapIntensity: 2.29
            },
            'MUSCLE': {
                color: '#ffffff',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'CHROME': {
                color: '#ffffff',
                opacity: 1,
                transparent: false,
                metalness: 0.82,
                roughness: 0.07,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'METAL': {
                color: '#151515',
                opacity: 1,
                transparent: false,
                metalness: 0.85,
                roughness: 0.36,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'PLASTIC': {
                color: '#000000',
                opacity: 0.8,
                transparent: true,
                metalness: 0,
                roughness: 0.82,
                transmission: 0.2,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: false,
                depthTest: true,
                envMapIntensity: 1
            },
            'COLOR_1': {
                color: (window.flexframeSettings?.primaryColorMode === 'custom' && window.flexframeSettings?.primaryColor) 
                    ? window.flexframeSettings.primaryColor 
                    : '#ff0000',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0.215,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XCLOTHES': {
                // Only color is applied from preset — textures are preserved from GLB
                color: (window.flexframeSettings?.primaryColorMode === 'custom' && window.flexframeSettings?.primaryColor) 
                    ? window.flexframeSettings.primaryColor 
                    : '#ff0000',
                _preserveTextures: true // Flag: do NOT clear maps for this material
            },
            'AIBODYGIRL': {
                // Default body color is white — no primary color tint
                color: '#ffffff',
                _preserveTextures: true
            },
            'XMUSCLE': {
                color: '#ffffff',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XSKELETON': {
                color: '#ffffff',
                opacity: 0.93,
                transparent: false,
                metalness: 0,
                roughness: 0.99,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XCOLOR': {
                color: (window.flexframeSettings?.primaryColorMode === 'custom' && window.flexframeSettings?.primaryColor) 
                    ? window.flexframeSettings.primaryColor 
                    : '#ff0000',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0.215,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XMETAL': {
                color: '#151515',
                opacity: 1,
                transparent: false,
                metalness: 0.85,
                roughness: 0.36,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XRUBBER': {
                color: '#1a1a1a',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0.95,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XBUMPER': {
                color: '#808080',
                opacity: 1,
                transparent: false,
                metalness: 0,
                roughness: 0.8,
                transmission: 0,
                thickness: 0,
                ior: 1.5,
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                depthWrite: true,
                depthTest: true,
                envMapIntensity: 1
            },
            'XCLEAR': {
                color: '#ffffff',
                opacity: 1,
                transparent: true,
                metalness: 0,
                roughness: 0.42,
                transmission: 0,
                thickness: 0.85,
                ior: 1.06,
                side: THREE.FrontSide,
                blending: THREE.NormalBlending,
                depthWrite: false,
                depthTest: true,
                envMapIntensity: 2.29,
                _preserveTextures: true // Keep GLB map texture
            },
            'XBODY': {
                depthWrite: true,
                roughness: 0.5,
                _preserveTextures: true
            }
        };
        
        let appliedCount = 0;
        
        window.model.traverse((child) => {
            if (child.isMesh && child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                
                mats.forEach(mat => {
                    if (mat.name && presets[mat.name.toUpperCase()]) {
                        const preset = presets[mat.name.toUpperCase()];
                        
                        // XCLOTHES / _preserveTextures: only apply color, keep all GLB textures & properties
                        if (preset._preserveTextures) {
                            if (preset.color && mat.color) mat.color.set(preset.color);
                            if (preset.depthWrite !== undefined) mat.depthWrite = preset.depthWrite;
                            if (preset.roughness !== undefined) mat.roughness = preset.roughness;
                            mat.needsUpdate = true;
                            appliedCount++;
                            return; // Skip full property override
                        }
                        
                        // Apply preset values
                        if (preset.color && mat.color) mat.color.set(preset.color);
                        mat.opacity = preset.opacity;
                        mat.transparent = preset.transparent;
                        mat.metalness = preset.metalness;
                        mat.roughness = preset.roughness;
                        mat.transmission = preset.transmission;
                        mat.thickness = preset.thickness;
                        mat.ior = preset.ior;
                        mat.side = preset.side;
                        mat.blending = preset.blending;
                        mat.depthWrite = preset.depthWrite;
                        mat.depthTest = preset.depthTest;
                        mat.envMapIntensity = preset.envMapIntensity;
                        
                        // Remove ALL texture maps for SKIN material - pure material appearance
                        if (mat.name.toUpperCase() === 'SKIN') {
                            mat.map = null;
                            mat.normalMap = null;
                            mat.emissiveMap = null;
                            mat.bumpMap = null;
                        }
                        
                        if (preset.attenuationDistance) {
                            mat.attenuationDistance = preset.attenuationDistance;
                        }
                        
                        mat.needsUpdate = true;
                        appliedCount++;
                    }
                });
            }
        });
        
        console.log(`✅ Applied Material Preset 1 to ${appliedCount} materials`);
        
        // Update GUI
        if (this.gui) {
            setTimeout(() => {
                this.gui.controllersRecursive().forEach(controller => {
                    controller.updateDisplay();
                });
            }, 100);
        }
    }

    applyCustomSkinSettings(skinSettings) {
        if (!window.model) {
            console.log('No model loaded for custom skin settings');
            return;
        }

        console.log('Applying custom SKIN settings:', skinSettings);

        window.model.traverse((child) => {
            if (child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                
                materials.forEach(mat => {
                    if (mat.name && mat.name.toUpperCase() === 'SKIN') {
                        // Apply custom settings from WordPress
                        if (skinSettings.color && mat.color) {
                            mat.color.set(skinSettings.color);
                        }
                        if (skinSettings.opacity !== undefined) {
                            mat.opacity = skinSettings.opacity;
                            mat.transparent = skinSettings.opacity < 1;
                        }
                        if (skinSettings.roughness !== undefined) {
                            mat.roughness = skinSettings.roughness;
                        }
                        if (skinSettings.metalness !== undefined) {
                            mat.metalness = skinSettings.metalness;
                        }
                        if (skinSettings.transmission !== undefined) {
                            mat.transmission = skinSettings.transmission;
                        }
                        if (skinSettings.thickness !== undefined) {
                            mat.thickness = skinSettings.thickness;
                        }
                        if (skinSettings.ior !== undefined) {
                            mat.ior = skinSettings.ior;
                        }
                        if (skinSettings.envMapIntensity !== undefined) {
                            mat.envMapIntensity = skinSettings.envMapIntensity;
                        }
                        
                        mat.needsUpdate = true;
                        console.log('✅ Custom SKIN settings applied to material:', mat.name);
                    }
                });
            }
        });

        // Update GUI
        if (this.gui) {
            setTimeout(() => {
                this.gui.controllersRecursive().forEach(controller => {
                    controller.updateDisplay();
                });
            }, 100);
        }
    }

    /**
     * Apply equipment material settings from WordPress admin
     * @param {Object} model - The loaded 3D model
     * @param {Object} equipmentMaterials - Settings object for each equipment material
     */
    applyEquipmentMaterials(model, equipmentMaterials) {
        if (!model || !equipmentMaterials) {
            console.log('No model or equipment materials to apply');
            return;
        }

        console.log('Equipment Materials from WordPress:', equipmentMaterials);

        // Map material names in the model to settings keys (PHP sends uppercase keys)
        const materialMapping = {
            'BARBELL': 'BARBELL',
            'BUMPER': 'COLOR1',
            'CABLE': 'CABLE',
            'CHROME': 'CHROME',
            'COLOR_1': 'COLOR1',
            'COLOR1': 'COLOR1',
            'METAL': 'METAL',
            'PAD': 'PAD',
            'PLASTIC': 'PLASTIC',
            'RUBBER': 'RUBBER',
            'XCLOTHES': 'XCLOTHES',
            'AIBODYGIRL': 'AIBODYGIRL',
            'XCOLOR': 'COLOR1',
            'XMETAL': 'METAL',
            'XRUBBER': 'RUBBER',
            'XBUMPER': 'COLOR1',
            'XCLEAR': 'XCLEAR',
            'XPLASTIC': 'PLASTIC',
            'XPAD': 'PAD',
            'XCABLE': 'CABLE',
            'XCHROME': 'CHROME',
            'XBARBELL': 'BARBELL'
        };

        model.traverse((child) => {
            if (child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                
                materials.forEach(mat => {
                    if (!mat.name) return;
                    
                    const matNameUpper = mat.name.toUpperCase();
                    const settingsKey = materialMapping[matNameUpper];
                    
                    if (settingsKey && equipmentMaterials[settingsKey]) {
                        const settings = equipmentMaterials[settingsKey];
                        
                        // Check if this material is enabled
                        if (!settings.enabled) {
                            console.log(`Equipment material ${matNameUpper} is disabled, skipping`);
                            return;
                        }

                        console.log(`Applying equipment settings to ${matNameUpper}:`, settings);

                        // Apply basic properties
                        if (settings.color && mat.color) {
                            mat.color.set(settings.color);
                        }

                        if (settings.opacity !== undefined && settings.opacity !== null) {
                            mat.opacity = parseFloat(settings.opacity);
                            mat.transparent = mat.opacity < 1;
                        }

                        if (settings.metalness !== undefined && settings.metalness !== null) {
                            mat.metalness = parseFloat(settings.metalness);
                        }

                        if (settings.roughness !== undefined && settings.roughness !== null) {
                            mat.roughness = parseFloat(settings.roughness);
                        }

                        // Clearcoat
                        if (settings.clearcoat !== undefined && settings.clearcoat !== null) {
                            mat.clearcoat = parseFloat(settings.clearcoat);
                        }

                        if (settings.clearcoatRoughness !== undefined && settings.clearcoatRoughness !== null) {
                            mat.clearcoatRoughness = parseFloat(settings.clearcoatRoughness);
                        }

                        // Emission
                        if (settings.emissiveColor && mat.emissive) {
                            mat.emissive.set(settings.emissiveColor);
                        }

                        if (settings.emissiveIntensity !== undefined && settings.emissiveIntensity !== null) {
                            mat.emissiveIntensity = parseFloat(settings.emissiveIntensity);
                        }

                        // Transmission (glass-like)
                        if (settings.transmission !== undefined && settings.transmission !== null) {
                            mat.transmission = parseFloat(settings.transmission);
                        }

                        if (settings.thickness !== undefined && settings.thickness !== null) {
                            mat.thickness = parseFloat(settings.thickness);
                        }

                        if (settings.ior !== undefined && settings.ior !== null) {
                            mat.ior = parseFloat(settings.ior);
                        }

                        // Sheen
                        if (settings.sheen !== undefined && settings.sheen !== null) {
                            mat.sheen = parseFloat(settings.sheen);
                        }

                        if (settings.sheenRoughness !== undefined && settings.sheenRoughness !== null) {
                            mat.sheenRoughness = parseFloat(settings.sheenRoughness);
                        }

                        if (settings.sheenColor && mat.sheenColor) {
                            mat.sheenColor.set(settings.sheenColor);
                        }

                        // Environment map intensity
                        if (settings.envMapIntensity !== undefined && settings.envMapIntensity !== null) {
                            mat.envMapIntensity = parseFloat(settings.envMapIntensity);
                        }

                        // Blending mode
                        if (settings.blending) {
                            switch (settings.blending) {
                                case 'normal':
                                    mat.blending = THREE.NormalBlending;
                                    break;
                                case 'additive':
                                    mat.blending = THREE.AdditiveBlending;
                                    break;
                                case 'subtractive':
                                    mat.blending = THREE.SubtractiveBlending;
                                    break;
                                case 'multiply':
                                    mat.blending = THREE.MultiplyBlending;
                                    break;
                            }
                        }

                        // Bump and normal map toggles
                        if (settings.bumpMapEnabled !== undefined && settings.bumpMapEnabled !== null) {
                            // If bump map is disabled, set bumpScale to 0
                            if (!settings.bumpMapEnabled && mat.bumpMap) {
                                mat.bumpScale = 0;
                            }
                        }

                        if (settings.normalMapEnabled !== undefined && settings.normalMapEnabled !== null) {
                            // If normal map is disabled, set normalScale to 0
                            if (!settings.normalMapEnabled && mat.normalMap && mat.normalScale) {
                                mat.normalScale.set(0, 0);
                            }
                        }

                        if (settings.colorMapEnabled !== undefined && settings.colorMapEnabled !== null) {
                            // If color map is disabled, remove it
                            if (!settings.colorMapEnabled && mat.map) {
                                mat.map = null;
                            }
                        }

                        mat.needsUpdate = true;
                        console.log(`✅ Equipment material settings applied to: ${matNameUpper}`);
                    }
                });
            }
        });
    }

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;
            
            this.cameraManager.handleResize();
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Disable always-visible on mobile, re-enable on desktop
            if (this.animationPlayer && this.uiSettings?.player) {
                const isMobile = window.innerWidth <= 768;
                const shouldBeAlwaysVisible = isMobile ? false : (this.uiSettings.player.alwaysVisible === true);
                this.animationPlayer.setAlwaysVisible(shouldBeAlwaysVisible);
            }
        });

        // Click interactions
        this.sceneManager.getCanvas().addEventListener('pointerdown', (event) => {
            // Calculate mouse position in normalized device coordinates
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Update raycaster
            this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());

            // Check for intersections with the model
            if (window.model) {
                const intersects = this.raycaster.intersectObject(window.model, true);
                
                if (intersects.length > 0) {
                    const clickedObject = intersects[0].object;
                    
                    if (clickedObject.isMesh && clickedObject.material) {
                        // Get material name(s)
                        const materials = Array.isArray(clickedObject.material) 
                            ? clickedObject.material 
                            : [clickedObject.material];
                        
                        // Log all material names
                        materials.forEach(mat => {
                            console.log('🎨 Material:', mat.name || 'Unnamed Material');
                        });
                    }
                }
            }
        });
    }

    animate() {
        const deltaTime = this.clock.getDelta();
        
        // Update camera
        this.cameraManager.update();
        
        // Update camera debug info if available
        if (this.updateCameraDebug) {
            this.updateCameraDebug();
        }
        
        // Update particles
        this.particleSystem.update(deltaTime);
        
        // Update animations only if playing
        if (this.mixer && this.animationPlayer.isPlaying) {
            this.mixer.update(deltaTime);
        }
        
        // Update animation player
        this.animationPlayer.update(deltaTime);
        
        // Render
        this.renderer.render(this.sceneManager.getScene(), this.cameraManager.getCamera());
        
        // Continue loop
        requestAnimationFrame(() => this.animate());
    }

    setupScreenshotGUI() {
        const screenshotFolder = this.trackFolder(this.gui.addFolder('Screenshot'));
        const settings = this.screenshotManager.settings;
        const presets = this.screenshotManager.getResolutionPresets();
        
        // Quick screenshot buttons
        const quickActions = {
            quickShot: () => {
                this.screenshotManager.quickScreenshot().then(result => {
                    if (result.success) {
                        console.log(`✅ Screenshot saved: ${result.filename} (${result.size})`);
                    } else {
                        console.error('❌ Screenshot failed:', result.error);
                    }
                });
            },
            transparentShot: () => {
                this.screenshotManager.transparentScreenshot().then(result => {
                    if (result.success) {
                        console.log(`✅ Transparent screenshot saved: ${result.filename} (${result.size})`);
                    } else {
                        console.error('❌ Screenshot failed:', result.error);
                    }
                });
            }
        };
        
        screenshotFolder.add(quickActions, 'quickShot').name('Take Screenshot');
        screenshotFolder.add(quickActions, 'transparentShot').name('🫥 Transparent Background');
        
        // Settings folder
        const settingsFolder = this.trackFolder(screenshotFolder.addFolder('Settings'));
        
        // Transparent background toggle
        settingsFolder.add(settings, 'transparent').name('Transparent Background')
            .onChange(value => {
                console.log('Transparent background:', value ? 'ON' : 'OFF');
            });
        
        // Format selection
        const formatOptions = { png: 'PNG', jpg: 'JPEG', webp: 'WebP' };
        settingsFolder.add(settings, 'format', formatOptions).name('Format')
            .onChange(value => {
                console.log('Format changed to:', value.toUpperCase());
                // Update quality visibility
                qualityController.domElement.style.display = value === 'png' ? 'none' : 'block';
            });
        
        // Quality slider (hidden for PNG)
        const qualityController = settingsFolder.add(settings, 'quality', 0.1, 1, 0.1).name('Quality (0.1-1.0)')
            .onChange(value => {
                console.log('Quality:', Math.round(value * 100) + '%');
            });
        
        // Initially hide quality for PNG
        if (settings.format === 'png') {
            qualityController.domElement.style.display = 'none';
        }
        
        // Filename
        settingsFolder.add(settings, 'filename').name('Filename')
            .onChange(value => {
                // Clean filename
                settings.filename = value.replace(/[^a-zA-Z0-9_-]/g, '');
            });
        
        settingsFolder.add(settings, 'addTimestamp').name('Add Timestamp');
        
        // Resolution folder
        const resolutionFolder = this.trackFolder(screenshotFolder.addFolder('Resolution'));
        
        // Resolution presets dropdown
        const resolutionOptions = {};
        Object.keys(presets).forEach(key => {
            resolutionOptions[key] = presets[key].name;
        });
        
        resolutionFolder.add(settings, 'resolution', resolutionOptions).name('Preset')
            .onChange(value => {
                this.screenshotManager.setResolution(value);
                updateResolutionDisplay();
                
                // Show/hide custom controls
                const isCustom = value === 'custom';
                customWidthController.domElement.style.display = isCustom ? 'block' : 'none';
                customHeightController.domElement.style.display = isCustom ? 'block' : 'none';
                
                console.log('Resolution preset:', presets[value].name);
            });
        
        // Custom dimensions
        const customWidthController = resolutionFolder.add(settings, 'customWidth', 1, 8192, 1).name('Custom Width')
            .onChange(value => {
                this.screenshotManager.setCustomDimensions(value, settings.customHeight);
                updateResolutionDisplay();
            });
            
        const customHeightController = resolutionFolder.add(settings, 'customHeight', 1, 8192, 1).name('Custom Height')
            .onChange(value => {
                this.screenshotManager.setCustomDimensions(settings.customWidth, value);
                updateResolutionDisplay();
            });
        
        // Resolution display
        const resolutionDisplay = { info: 'Loading...' };
        const displayController = resolutionFolder.add(resolutionDisplay, 'info').name('Current Resolution');
        displayController.domElement.querySelector('input').readOnly = true;
        displayController.domElement.querySelector('input').style.color = '#888';
        
        // Update resolution display function
        const updateResolutionDisplay = () => {
            const res = this.screenshotManager.getCurrentResolution();
            const megapixels = (res.width * res.height / 1000000).toFixed(1);
            const aspectRatio = this.calculateAspectRatio(res.width, res.height);
            resolutionDisplay.info = `${res.width}×${res.height} (${megapixels}MP, ${aspectRatio})`;
        };
        
        // Initially hide custom controls if not using custom
        const isCustomInitial = settings.resolution === 'custom';
        customWidthController.domElement.style.display = isCustomInitial ? 'block' : 'none';
        customHeightController.domElement.style.display = isCustomInitial ? 'block' : 'none';
        
        // Common resolution shortcuts
        const commonFolder = this.trackFolder(resolutionFolder.addFolder('Quick Presets'));
        
        const quickPresets = {
            hd: () => this.setQuickResolution('1280x720'),
            fhd: () => this.setQuickResolution('1920x1080'),
            qhd: () => this.setQuickResolution('2560x1440'),
            uhd: () => this.setQuickResolution('3840x2160'),
            square: () => this.setQuickResolution('1080x1080'),
            story: () => this.setQuickResolution('1080x1920')
        };
        
        commonFolder.add(quickPresets, 'hd').name('HD (720p)');
        commonFolder.add(quickPresets, 'fhd').name('Full HD (1080p)');
        commonFolder.add(quickPresets, 'qhd').name('2K (1440p)');
        commonFolder.add(quickPresets, 'uhd').name('4K (2160p)');
        commonFolder.add(quickPresets, 'square').name('Square (1:1)');
        commonFolder.add(quickPresets, 'story').name('Story (9:16)');
        
        // Advanced settings
        const advancedFolder = this.trackFolder(screenshotFolder.addFolder('Advanced'));
        
        const advancedActions = {
            currentViewport: () => {
                const canvas = this.sceneManager.getCanvas();
                this.screenshotManager.setCustomDimensions(canvas.width, canvas.height);
                settings.resolution = 'custom';
                updateResolutionDisplay();
                console.log(`Set to current viewport: ${canvas.width}×${canvas.height}`);
            },
            copySettings: () => {
                const screenshotSettings = this.screenshotManager.getSettings();
                navigator.clipboard.writeText(JSON.stringify(screenshotSettings, null, 2));
                console.log('📋 Screenshot settings copied to clipboard');
            }
        };
        
        advancedFolder.add(advancedActions, 'currentViewport').name('Use Current Viewport');
        advancedFolder.add(advancedActions, 'copySettings').name('Copy Screenshot Settings');
        
        // Initialize display
        updateResolutionDisplay();
        
        // Start collapsed - remove all open() calls
        // settingsFolder.open();
        // resolutionFolder.open();
        // screenshotFolder.open();
    }
    
    setupMultiThumbnailMenuGUI() {
        const thumbnailFolder = this.trackFolder(this.gui.addFolder('Multi-Thumbnail Menu'));
        const settings = this.multiThumbnailMenuSystem.settings;
        
        // Width percentage control
        thumbnailFolder.add(settings, 'widthPercentage', 20, 100, 5)
            .name('Width %')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ widthPercentage: value });
                console.log('Multi-thumbnail menu width:', value + '%');
            });
        
        // Background color
        thumbnailFolder.addColor(settings, 'backgroundColor')
            .name('Background Color')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ backgroundColor: value });
                console.log('Multi-thumbnail menu background color:', value);
            });
        
        // Background opacity
        thumbnailFolder.add(settings, 'backgroundOpacity', 0, 1, 0.1)
            .name('Background Opacity')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ backgroundOpacity: value });
                console.log('Multi-thumbnail menu opacity:', value);
            });
        
        // Border radius
        thumbnailFolder.add(settings, 'borderRadius', 0, 30, 1)
            .name('Corner Radius')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ borderRadius: value });
                console.log('Multi-thumbnail menu radius:', value + 'px');
            });
        
        // Keep menu open toggle
        thumbnailFolder.add(settings, 'keepOpen')
            .name('Keep Menu Open')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ keepOpen: value });
                console.log('Multi-thumbnail menu keep open:', value ? 'ON' : 'OFF');
            });

        // Glow controls folder
        const glowFolder = thumbnailFolder.addFolder('Active Button Glow');
        
        // Glow color
        glowFolder.addColor(settings, 'glowColor')
            .name('Glow Color')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ glowColor: value });
                console.log('Multi-thumbnail menu glow color:', value);
            });
        
        // Glow intensity
        glowFolder.add(settings, 'glowIntensity', 0, 1, 0.1)
            .name('Glow Intensity')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ glowIntensity: value });
                console.log('Multi-thumbnail menu glow intensity:', value);
            });
        
        // Glow size
        glowFolder.add(settings, 'glowSize', 5, 50, 5)
            .name('Glow Size')
            .onChange(value => {
                this.multiThumbnailMenuSystem.updateAllSettings({ glowSize: value });
                console.log('Multi-thumbnail menu glow size:', value + 'px');
            });
        
        // Copy settings button
        thumbnailFolder.add({
            copySettings: () => this.multiThumbnailMenuSystem.copySettingsToClipboard()
        }, 'copySettings').name('Copy Settings');
        
        // Right menu visibility toggle
        const rightMenuToggle = {
            hideRightMenu: false
        };
        thumbnailFolder.add(rightMenuToggle, 'hideRightMenu')
            .name('Hide Right Info Menu')
            .onChange(value => {
                const rightMenu = document.querySelector('.thumbnail-grid-container-right');
                if (rightMenu) {
                    rightMenu.style.display = value ? 'none' : 'grid';
                    console.log('Right info menu:', value ? 'HIDDEN' : 'VISIBLE');
                }
            });
        
        // Copy right menu settings button
        thumbnailFolder.add({
            copyRightMenuSettings: () => this.rightMenuSystem.copySettingsToClipboard()
        }, 'copyRightMenuSettings').name('Copy Right Menu Settings');
        
        // Apply initial styles
        setTimeout(() => this.multiThumbnailMenuSystem.updateAllSettings(settings), 100);
    }
    
    setQuickResolution(presetKey) {
        this.screenshotManager.setResolution(presetKey);
        this.screenshotManager.settings.resolution = presetKey;
        console.log('Quick preset:', this.screenshotManager.getResolutionPresets()[presetKey].name);
    }
    
    calculateAspectRatio(width, height) {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(width, height);
        const w = width / divisor;
        const h = height / divisor;
        
        // Common aspect ratios
        const ratios = {
            '16:9': [16, 9],
            '21:9': [21, 9],
            '4:3': [4, 3],
            '3:2': [3, 2],
            '1:1': [1, 1],
            '9:16': [9, 16],
            '2:1': [2, 1],
            '5:4': [5, 4]
        };
        
        for (const [ratio, [rw, rh]] of Object.entries(ratios)) {
            if (w === rw && h === rh) {
                return ratio;
            }
        }
        
        return `${w}:${h}`;
    }

    createScreenshotFrame() {
        if (this.screenshotFrame) {
            document.body.removeChild(this.screenshotFrame);
        }
        
        this.screenshotFrame = document.createElement('div');
        this.screenshotFrame.className = 'screenshot-frame';
        this.screenshotFrame.innerHTML = `
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <div class="frame-info"></div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .screenshot-frame {
                position: fixed;
                pointer-events: none;
                border: 2px solid #ff6b6b;
                background: rgba(255, 107, 107, 0.1);
                z-index: 1000;
                display: none;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
            }
            .screenshot-frame.visible {
                display: block;
            }
            .frame-corner {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 3px solid #ff6b6b;
                background: rgba(255, 107, 107, 0.8);
            }
            .frame-corner.top-left {
                top: -3px;
                left: -3px;
                border-right: none;
                border-bottom: none;
            }
            .frame-corner.top-right {
                top: -3px;
                right: -3px;
                border-left: none;
                border-bottom: none;
            }
            .frame-corner.bottom-left {
                bottom: -3px;
                left: -3px;
                border-right: none;
                border-top: none;
            }
            .frame-corner.bottom-right {
                bottom: -3px;
                right: -3px;
                border-left: none;
                border-top: none;
            }
            .frame-info {
                position: absolute;
                top: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 107, 107, 0.9);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
        `;
        
        if (!document.head.querySelector('style[data-screenshot-frame]')) {
            style.setAttribute('data-screenshot-frame', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(this.screenshotFrame);
    }
    
    updateScreenshotFrame(width, height) {
        if (!this.screenshotFrame) return;
        
        const canvas = this.renderer.domElement;
        const canvasRect = canvas.getBoundingClientRect();
        
        // Calculate aspect ratios
        const canvasAspect = canvasRect.width / canvasRect.height;
        const shotAspect = width / height;
        
        let frameWidth, frameHeight;
        
        if (shotAspect > canvasAspect) {
            // Screenshot is wider - fit to canvas width
            frameWidth = canvasRect.width * 0.8; // 80% of canvas width
            frameHeight = frameWidth / shotAspect;
        } else {
            // Screenshot is taller - fit to canvas height
            frameHeight = canvasRect.height * 0.8; // 80% of canvas height
            frameWidth = frameHeight * shotAspect;
        }
        
        // Center the frame on the canvas
        const frameLeft = canvasRect.left + (canvasRect.width - frameWidth) / 2;
        const frameTop = canvasRect.top + (canvasRect.height - frameHeight) / 2;
        
        // Update frame position and size
        this.screenshotFrame.style.left = frameLeft + 'px';
        this.screenshotFrame.style.top = frameTop + 'px';
        this.screenshotFrame.style.width = frameWidth + 'px';
        this.screenshotFrame.style.height = frameHeight + 'px';
        
        // Update info text
        const info = this.screenshotFrame.querySelector('.frame-info');
        info.textContent = `${width} × ${height} pixels`;
    }
    
    toggleScreenshotFrame(visible) {
        this.frameVisible = visible;
        if (this.screenshotFrame) {
            this.screenshotFrame.classList.toggle('visible', visible);
        }
    }

    setupSimpleScreenshotGUI() {
        const screenshotFolder = this.trackFolder(this.gui.addFolder('Screenshot'));
        
        // Custom screenshot settings
        const customFolder = this.trackFolder(screenshotFolder.addFolder('Custom Settings'));
        
        // Get renderer, scene, camera references
        const getScreenshotParams = () => ({
            renderer: this.renderer,
            scene: this.sceneManager.getScene(),
            camera: this.cameraManager.getCamera()
        });
        
        const customSettings = {
            width: 400,
            height: 400,
            transparent: false,
            format: 'png',
            filename: 'screenshot',
            showFrame: false
        };
        
        // Update filename when exercise changes
        const updateFilename = () => {
            if (this.currentExerciseName) {
                customSettings.filename = `${this.currentExerciseName} Thumbnail`;
            }
        };
        updateFilename();

        // Create screenshot frame
        this.createScreenshotFrame();

        customFolder.add(customSettings, 'width', 100, 4096, 1).name('Width')
            .onChange(value => {
                if (customSettings.showFrame) {
                    this.updateScreenshotFrame(value, customSettings.height);
                }
            });
        customFolder.add(customSettings, 'height', 100, 4096, 1).name('Height')
            .onChange(value => {
                if (customSettings.showFrame) {
                    this.updateScreenshotFrame(customSettings.width, value);
                }
            });
        customFolder.add(customSettings, 'showFrame').name('Show Frame Preview')
            .onChange(value => {
                this.toggleScreenshotFrame(value);
                if (value) {
                    this.updateScreenshotFrame(customSettings.width, customSettings.height);
                }
            });
        customFolder.add(customSettings, 'transparent').name('Transparent');
        customFolder.add(customSettings, 'format', ['png', 'jpg', 'webp']).name('Format');
        const filenameController = customFolder.add(customSettings, 'filename').name('Filename');
        
        // Listen for exercise changes to update filename
        document.addEventListener('exercisesSelected', () => {
            updateFilename();
            filenameController.updateDisplay();
        });

        customFolder.add({
            customShot: async () => {
                const params = getScreenshotParams();
                const result = await ScreenshotUtils.takeScreenshot(params.renderer, params.scene, params.camera, customSettings);
                if (result.success) {
                    console.log(`✅ Custom ${result.filename} saved (${result.size})`);
                } else {
                    console.error(`❌ Custom screenshot failed: ${result.error}`);
                }
            }
        }, 'customShot').name('Take Custom Screenshot');

        // Start collapsed
        // customFolder.open();
        // screenshotFolder.open();
    }
    
    setupMobileSearchCloseButton() {
        const searchCloseBtn = document.getElementById('searchCloseBtnMobile');
        const searchDropdown = document.getElementById('searchDropdown');
        const searchToggle = document.getElementById('searchToggle');
        
        if (!searchCloseBtn || !searchDropdown || !searchToggle) return;
        
        // Get menu background color from flexframeSettings
        const settings = window.flexframeSettings || {};
        const menuBg = settings.menuBackgroundColor || '#000000';
        const menuBgOpacity = settings.menuBackgroundOpacity || 0.9;
        
        // Convert hex to RGB
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : {r: 0, g: 0, b: 0};
        };
        
        const rgb = hexToRgb(menuBg);
        const bgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${menuBgOpacity})`;
        const bgColorHover = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(menuBgOpacity + 0.1, 1)})`;
        
        // Apply inline styles to override theme CSS
        searchCloseBtn.style.setProperty('background', bgColor, 'important');
        searchCloseBtn.style.setProperty('background-color', bgColor, 'important');
        
        // Add hover effect
        searchCloseBtn.addEventListener('mouseenter', () => {
            searchCloseBtn.style.setProperty('background', bgColorHover, 'important');
            searchCloseBtn.style.setProperty('background-color', bgColorHover, 'important');
        });
        searchCloseBtn.addEventListener('mouseleave', () => {
            searchCloseBtn.style.setProperty('background', bgColor, 'important');
            searchCloseBtn.style.setProperty('background-color', bgColor, 'important');
        });
        
        // Function to update close button position based on dropdown
        const updateCloseButtonPosition = () => {
            if (searchDropdown.classList.contains('show')) {
                const dropdownRect = searchDropdown.getBoundingClientRect();
                const bottom = dropdownRect.bottom;
                searchCloseBtn.style.top = `${bottom + 10}px`;
                searchCloseBtn.style.display = 'flex';
            } else {
                searchCloseBtn.style.display = 'none';
            }
        };
        
        // Observe dropdown state changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    updateCloseButtonPosition();
                }
            });
        });
        
        observer.observe(searchDropdown, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Close button click handler
        searchCloseBtn.addEventListener('click', () => {
            if (this.multiThumbnailMenuSystem && this.multiThumbnailMenuSystem.menus.search) {
                this.multiThumbnailMenuSystem.menus.search.closeMenu();
            }
        });
        
        // Initial check
        updateCloseButtonPosition();
    }
    
    // Setup mobile fullscreen button
    setupFullscreenButton() {
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (!fullscreenBtn) return;
        
        // Hide fullscreen button if embed settings say so (JS-level belt-and-suspenders)
        const ws = window.flexframeSettings;
        if (ws && (ws.embedHideFullscreen === true || ws.embedHideUI === true)) {
            fullscreenBtn.style.setProperty('display', 'none', 'important');
            return; // No need to set up events
        }
        
        const enterIcon = fullscreenBtn.querySelector('.fullscreen-enter-icon');
        const exitIcon = fullscreenBtn.querySelector('.fullscreen-exit-icon');
        
        const updateIcons = () => {
            const isFullscreen = document.fullscreenElement || 
                                 document.webkitFullscreenElement || 
                                 document.mozFullScreenElement ||
                                 document.msFullscreenElement;
            
            if (enterIcon && exitIcon) {
                enterIcon.style.display = isFullscreen ? 'none' : 'block';
                exitIcon.style.display = isFullscreen ? 'block' : 'none';
            }
        };
        
        const enterFullscreen = () => {
            const elem = document.documentElement;
            // Try with navigationUI option for better mobile support
            const options = { navigationUI: 'hide' };
            
            if (elem.requestFullscreen) {
                elem.requestFullscreen(options).catch(() => {
                    // Fallback without options
                    elem.requestFullscreen();
                });
            } else if (elem.webkitRequestFullscreen) {
                // iOS Safari doesn't support fullscreen API, but try anyway
                elem.webkitRequestFullscreen();
            } else if (elem.webkitEnterFullscreen) {
                // Alternative for iOS video elements
                elem.webkitEnterFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        };
        
        const exitFullscreen = () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        };
        
        fullscreenBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent auto-fullscreen from interfering
            if (!document.fullscreenElement && 
                !document.webkitFullscreenElement && 
                !document.mozFullScreenElement &&
                !document.msFullscreenElement) {
                enterFullscreen();
            } else {
                exitFullscreen();
            }
        });
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', updateIcons);
        document.addEventListener('webkitfullscreenchange', updateIcons);
        document.addEventListener('mozfullscreenchange', updateIcons);
        document.addEventListener('MSFullscreenChange', updateIcons);
        
        // Adjust fullscreen button position based on animation player visibility (desktop only)
        const updateButtonPosition = () => {
            const workoutBtn = document.getElementById('ffx-add-to-workout-btn');
            if (window.innerWidth > 768) {
                const animationPlayer = document.querySelector('.animation-player');
                const isPlayerVisible = animationPlayer && animationPlayer.classList.contains('visible');
                fullscreenBtn.style.bottom = isPlayerVisible ? '80px' : '20px';
                if (workoutBtn) workoutBtn.style.bottom = isPlayerVisible ? '80px' : '20px';
            } else {
                // On mobile, clear inline style to let CSS handle it (50px)
                fullscreenBtn.style.bottom = '';
                if (workoutBtn) workoutBtn.style.bottom = '';
            }
        };
        
        // Watch for animation player visibility changes
        const animationPlayer = document.querySelector('.animation-player');
        if (animationPlayer) {
            const observer = new MutationObserver(updateButtonPosition);
            observer.observe(animationPlayer, { attributes: true, attributeFilter: ['class'] });
        }
        
        // Also update on window resize
        window.addEventListener('resize', updateButtonPosition);
        
        // Initial position check
        updateButtonPosition();
        
        // Auto-enter fullscreen on first user interaction (required by browsers)
        // Browsers require a user gesture - we listen for ANY interaction
        // Check if WordPress setting enables auto-fullscreen
        if (window.flexframeSettings?.autoFullscreen) {
            const autoEnterFullscreen = (e) => {
                // Don't auto-fullscreen if clicking the fullscreen button itself
                if (e.target?.closest?.('#fullscreen-btn')) return;
                
                // Remove all listeners immediately to prevent multiple triggers
                document.removeEventListener('click', autoEnterFullscreen);
                document.removeEventListener('touchstart', autoEnterFullscreen);
                document.removeEventListener('touchend', autoEnterFullscreen);
                document.removeEventListener('keydown', autoEnterFullscreen);
                document.removeEventListener('pointerdown', autoEnterFullscreen);
                document.removeEventListener('mousedown', autoEnterFullscreen);
                
                // Delay fullscreen slightly so the original click action completes first
                setTimeout(() => {
                    enterFullscreen();
                }, 50);
            };
            // Listen for any user interaction
            document.addEventListener('click', autoEnterFullscreen);
            document.addEventListener('touchstart', autoEnterFullscreen, { passive: true });
            document.addEventListener('touchend', autoEnterFullscreen, { passive: true });
            document.addEventListener('keydown', autoEnterFullscreen);
            document.addEventListener('pointerdown', autoEnterFullscreen);
            document.addEventListener('mousedown', autoEnterFullscreen);
        }
    }
}

// Initialize the application - wait for canvas element to exist in DOM
function startApp() {
    const canvas = document.querySelector('canvas.webgl');
    if (canvas) {
        console.log('[FlexFrame] Canvas found, initializing app');
        const app = new ThreeJSApp();
        return;
    }
    // Canvas not found yet - poll until it appears (themes/page builders may inject content late)
    console.warn('[FlexFrame] Canvas not found yet, waiting for DOM...');
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max
    const interval = setInterval(() => {
        attempts++;
        if (document.querySelector('canvas.webgl')) {
            clearInterval(interval);
            console.log('[FlexFrame] Canvas found after ' + (attempts * 100) + 'ms, initializing app');
            const app = new ThreeJSApp();
        } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            console.error('[FlexFrame] Canvas element with class "webgl" not found after 10 seconds. Make sure the [flexframe_viewer] shortcode is on this page.');
        }
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}