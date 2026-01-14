/**
 * Three.js 3D Viewer - Main Application
 * Organized modular architecture for better maintainability
 */

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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
        
        // Setup quality toggle button after DOM is ready
        setTimeout(() => {
            this.setupQualityToggle();
        }, 100);
        
        // Initialize thumbnail menu
        this.multiThumbnailMenuSystem = new MultiThumbnailMenuSystem();
        
        // Initialize right side menu
        this.rightMenuSystem = new RightMenuSystem();
        
        // Make it globally accessible for information tab updates
        window.menuManager = this.multiThumbnailMenuSystem;
        window.rightMenuManager = this.rightMenuSystem;
        
        // Listen for thumbnail selection events
        document.addEventListener('thumbnailSelected', (e) => {
            console.log('Thumbnail selected:', e.detail.thumbnail);
            // Add your thumbnail selection logic here
        });
        
        // Listen for exercise selection to load config
        document.addEventListener('exercisesSelected', async (e) => {
            const exercise = e.detail.item;
            this.currentExerciseName = exercise.name;
            console.log('Exercise selected, loading config:', exercise.name);
            
            if (exercise.configUrl) {
                try {
                    // Add cache busting to force fresh config fetch
                    const cacheBuster = `?t=${Date.now()}`;
                    const configUrlWithCache = exercise.configUrl + cacheBuster;
                    const response = await fetch(configUrlWithCache);
                    const config = await response.json();
                    console.log('Exercise config loaded:', config);
                    console.log('📋 Config customTextures:', config.customTextures);
                    
                    // Store full config for quality switching
                    this.currentConfig = config;
                    
                    // Store config temporarily to apply after model loads
                    this.pendingModelConfig = config.model;
                    
                    // Store model quality URLs
                    this.modelUrlSQ = config.modelUrl || config.modelUrlSQ;
                    this.modelUrlHQ = config.modelUrlHQ;
                    this.currentModelQuality = 'SQ';
                    
                    // Update quality toggle button visibility
                    this.updateQualityButtonVisibility();
                    
                    // Load the 3D model if URL is provided
                    if (this.modelUrlSQ) {
                        console.log('Loading SQ model from config:', this.modelUrlSQ);
                        await this.loadModel(this.modelUrlSQ);
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
                    
                    // Update right menu tabs with config data
                    if (config.rightMenuTabs && window.rightMenuManager) {
                        window.rightMenuManager.updateFromConfig(config.rightMenuTabs);
                    }
                } catch (error) {
                    console.error('Failed to load exercise config:', error);
                }
            }
        });
        
        // Make animation player visible from the start
        this.animationPlayer.setVisibility(true);
        
        // Apply initial player styling after short delay to ensure DOM is ready
        setTimeout(() => {
            this.initializePlayerStyling();
        }, 100);
        
        // Apply initial player styling after short delay to ensure DOM is ready
        setTimeout(() => {
            this.initializePlayerStyling();
        }, 100);
        
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
        this.loadModel();
        this.setupEventListeners();

        // Apply initial background
        this.sceneManager.updateGradientBackground(this.backgroundParams);

        // Wait for default settings to load, then apply them
        await this.waitForDefaultSettings();
        this.settingsManager.applyDefaultSettings();
        
        // Update GUI to reflect default settings
        setTimeout(() => this.updateAllGUIControls(), 500);

        // Start render loop
        // Initialize animation player with visible state
        this.animationPlayer.setVisibility(true);
        
        this.animate();
    }

    async waitForDefaultSettings() {
        // Wait for settings manager to load default settings
        while (!this.settingsManager.getDefaultSettings()) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.sceneManager.getCanvas(),
            antialias: true
        });
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

        // Hide all spinners
        const allSpinners = loader.querySelectorAll('.spinner-box');
        allSpinners.forEach(spinner => spinner.style.display = 'none');

        // Show selected spinner
        const selectedSpinner = loader.querySelector(`[data-spinner="${this.loaderParams.spinnerStyle}"]`);
        if (selectedSpinner) {
            selectedSpinner.style.display = 'flex';
        }
    }

    initializePlayerStyling() {
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
        const fadeTexture = this.textureLoader.load('./textures/gradients/3.jpg');
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
        // Gather only settings relevant to the model presentation
        return {
            model: window.model ? {
                position: window.model.position.toArray(),
                rotation: [window.model.rotation.x, window.model.rotation.y, window.model.rotation.z],
                scale: window.model.scale.toArray()
            } : { position: [0, -0.02, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
            camera: this.cameraManager.getSettings(),
            lighting: this.lightingSystem.getSettings(),
            ground: this.groundParams,
            background: this.backgroundParams,
            dustParticles: this.particleSystem.getSettings(),
            playerStyling: this.playerStyleParams,
            loader: this.loaderParams
        };
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
        `;
        
        if (!document.head.querySelector('style[data-gui-styles]')) {
            style.setAttribute('data-gui-styles', 'true');
            document.head.appendChild(style);
        }
    }

    setupGUIControls() {
        // Add expand/collapse all controls at the top
        const controlsFolder = this.gui.addFolder('🎛️ GUI Controls');
        
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
        
        controlsFolder.add(guiActions, 'expandAll').name('📂 Expand All');
        controlsFolder.add(guiActions, 'collapseAll').name('📁 Collapse All');
        
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
        this.setupGUIControls();
        
        // Screenshot controls - at the top
        this.setupSimpleScreenshotGUI();
        
        // Save/Import controls with enhanced functionality
        this.gui.add({ 
            saveSettings: async () => {
                await this.settingsManager.saveSettingsToClipboard();
                console.log('All settings saved:', this.settingsManager.gatherAllSettings());
            }
        }, 'saveSettings').name('💾 Save All Settings');
        
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
        }, 'saveModelSettings').name('🎯 Save Model Settings');
        
        this.gui.add({ 
            importSettings: async () => {
                await this.settingsManager.importSettingsFromClipboard();
                // Force update all GUI controls after import
                setTimeout(() => this.updateAllGUIControls(), 100);
            }
        }, 'importSettings').name('📥 Import Settings');

        // Additional save/load options
        this.gui.add({
            exportFile: () => this.settingsManager.exportAsFile('scene-settings.json')
        }, 'exportFile').name('📁 Export to File');

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
        }, 'importFile').name('📂 Import from File');

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

        const presetFolder = this.trackFolder(this.gui.addFolder('🎬 Scene Presets'));
        presetFolder.add(scenePresets, 'Cinematic Blue').name('🎭 Cinematic Blue');
        presetFolder.add(scenePresets, 'Reset to Default').name('🔄 Reset to Default');
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
        dofFolder.add(dofPresets, 'Portrait DOF').name('📷 Portrait DOF');
        dofFolder.add(dofPresets, 'Macro DOF').name('🔍 Macro DOF');
        dofFolder.add(dofPresets, 'Cinematic DOF').name('🎬 Cinematic DOF');
        dofFolder.add(dofPresets, 'No DOF').name('❌ Disable DOF');

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
        presetFolder.add(particlePresets, 'Light Dust').name('✨ Light Dust');
        presetFolder.add(particlePresets, 'Heavy Dust').name('🌪️ Heavy Dust');
        presetFolder.add(particlePresets, 'Magical Sparkles').name('⭐ Magical Sparkles');
        presetFolder.add(particlePresets, 'Reset Dust').name('🔄 Reset Dust');

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
        const cameraFolder = this.trackFolder(this.gui.addFolder('📷 Camera Controls'));
        const camera = this.cameraManager.getCamera();
        const controls = this.cameraManager.getControls();
        
        // Zoom Range Controls
        const zoomFolder = this.trackFolder(cameraFolder.addFolder('Zoom Range'));
        
        zoomFolder.add(controls, 'minDistance', 0.001, 1, 0.001).name('Min Zoom Distance')
            .onChange(() => console.log('Min distance:', controls.minDistance));
        
        zoomFolder.add(controls, 'maxDistance', 10, 500, 1).name('Max Zoom Distance')
            .onChange(() => console.log('Max distance:', controls.maxDistance));
        
        zoomFolder.add(controls, 'zoomSpeed', 0.1, 2, 0.1).name('Zoom Speed')
            .onChange(() => console.log('Zoom speed:', controls.zoomSpeed));
        
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
        }, 'copyCameraSettings').name('📋 Copy Camera Settings');
        
        // Copy all GUI settings button
        fovFolder.add({
            copyAllSettings: () => {
                this.cameraManager.copyAllSettingsToClipboard(this.settingsManager);
            }
        }, 'copyAllSettings').name('📋 Copy ALL GUI Settings');
        
        // Zoom Momentum Controls
        const momentumFolder = this.trackFolder(cameraFolder.addFolder('Zoom Momentum'));
        const cameraParams = this.cameraManager;
        
        momentumFolder.add(cameraParams, 'zoomDecay', 0.8, 0.99, 0.01).name('Momentum Decay')
            .onChange(() => console.log('Zoom decay:', cameraParams.zoomDecay));
        
        momentumFolder.add(cameraParams, 'zoomMomentumThreshold', 0.001, 0.1, 0.001).name('Momentum Threshold')
            .onChange(() => console.log('Momentum threshold:', cameraParams.zoomMomentumThreshold));
        
        // Add a velocity multiplier for testing
        const velocityMultiplier = { value: 1.0 };
        momentumFolder.add(velocityMultiplier, 'value', 0.1, 5, 0.1).name('Velocity Multiplier')
            .onChange((value) => {
                // Store the multiplier for use in trackZoomMomentum
                cameraParams.velocityMultiplier = value;
                console.log('Velocity multiplier:', value);
            });
        
        // Reset button
        cameraFolder.add({
            resetCamera: () => {
                this.cameraManager.resetCamera();
                console.log('Camera fully reset to defaults');
            }
        }, 'resetCamera').name('🔄 Reset Camera');
        
        // Test momentum button
        cameraFolder.add({
            testMomentum: () => {
                console.log('Testing momentum...');
                cameraParams.zoomMomentum = 0.2; // Set positive momentum
                cameraParams.momentumActive = true;
                console.log('Momentum set to:', cameraParams.zoomMomentum);
            }
        }, 'testMomentum').name('🧪 Test Momentum');
        
        // Clear momentum button
        cameraFolder.add({
            clearMomentum: () => {
                cameraParams.zoomMomentum = 0;
                cameraParams.momentumActive = false;
                console.log('Momentum cleared');
            }
        }, 'clearMomentum').name('❌ Clear Momentum');
        
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
        
        // Axis Helper Section
        const axisFolder = this.trackFolder(cameraFolder.addFolder('🎯 Rotation Center Helper'));
        
        axisFolder.add({
            showAxis: this.cameraManager.axisHelperVisible
        }, 'showAxis').name('Show Axis Helper')
            .onChange((value) => {
                this.cameraManager.toggleAxisHelper(value);
            });
        
        axisFolder.add({
            axisSize: this.cameraManager.axisHelperSize
        }, 'axisSize', 0.1, 2, 0.1).name('Axis Size')
            .onChange((value) => {
                this.cameraManager.setAxisHelperSize(value);
            });
        
        // Coordinates Section
        const coordsFolder = this.trackFolder(cameraFolder.addFolder('📍 Coordinates'));
        
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
        }, 'copyCoords').name('📋 Copy Coordinates');
        
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
        const animationFolder = this.trackFolder(cameraFolder.addFolder('🎬 Animation Player'));
        
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
        const playerStyleFolder = this.trackFolder(animationFolder.addFolder('🎨 Player Styling'));
        
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
        if (this.animationPlayer && this.animationPlayer.container) {
            this.animationPlayer.container.style.backgroundColor = color;
        }
    }

    updatePlayerBackgroundOpacity(opacity) {
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
        if (this.animationPlayer && this.animationPlayer.container) {
            const buttons = this.animationPlayer.container.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.backgroundColor = color;
            });
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

    setupQualityToggle() {
        const qualityBtn = document.getElementById('quality-toggle-btn');
        if (qualityBtn) {
            qualityBtn.addEventListener('click', () => {
                this.switchModelQuality();
            });
        }
    }
    
    updateQualityButtonVisibility() {
        const qualityBtn = document.getElementById('quality-toggle-btn');
        const qualityText = document.getElementById('quality-text');
        
        if (qualityBtn) {
            // Show button only if both SQ and HQ models exist
            if (this.modelUrlSQ && this.modelUrlHQ) {
                qualityBtn.style.display = 'flex';
                if (qualityText) {
                    // Show the quality you'll switch TO, not what's currently loaded
                    const nextQuality = this.currentModelQuality === 'SQ' ? 'HQ' : 'SQ';
                    qualityText.textContent = nextQuality;
                }
                
                // Start pulsate animation only when HQ is available to switch to
                this.startQualityButtonPulsate();
            } else {
                qualityBtn.style.display = 'none';
                this.stopQualityButtonPulsate();
            }
        }
    }
    
    startQualityButtonPulsate() {
        // Clear existing interval if any
        this.stopQualityButtonPulsate();
        
        const qualityBtn = document.getElementById('quality-toggle-btn');
        const qualityText = document.getElementById('quality-text');
        
        // Function to trigger pulsate
        const triggerPulsate = () => {
            // Only pulsate when showing HQ (meaning SQ is currently loaded)
            if (qualityBtn && qualityText && qualityText.textContent === 'HQ') {
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
    
    async switchModelQuality() {
        if (!this.modelUrlSQ || !this.modelUrlHQ) return;
        
        // Toggle quality
        this.currentModelQuality = this.currentModelQuality === 'SQ' ? 'HQ' : 'SQ';
        const modelUrl = this.currentModelQuality === 'SQ' ? this.modelUrlSQ : this.modelUrlHQ;
        
        console.log('Switching to', this.currentModelQuality, 'model:', modelUrl);
        
        // Update button text to show the NEXT quality you can switch to
        const qualityText = document.getElementById('quality-text');
        if (qualityText) {
            const nextQuality = this.currentModelQuality === 'SQ' ? 'HQ' : 'SQ';
            qualityText.textContent = nextQuality;
        }
        
        // Restart pulsate animation with new quality
        this.startQualityButtonPulsate();
        
        // Get quality-specific settings if available
        if (this.currentModelQuality === 'HQ' && this.currentConfig?.modelHQ) {
            const hqSettings = this.currentConfig.modelHQ;
            
            // Set pending model config for HQ
            if (hqSettings.model) {
                this.pendingModelConfig = hqSettings.model;
            }
            
            // Reload model with HQ settings
            await this.loadModel(modelUrl);
            
            // Apply HQ camera settings
            if (hqSettings.camera) {
                const camera = this.cameraManager.getCamera();
                if (hqSettings.camera.position) {
                    camera.position.set(...hqSettings.camera.position);
                }
                if (hqSettings.camera.rotation) {
                    camera.rotation.set(...hqSettings.camera.rotation);
                }
                if (hqSettings.camera.target) {
                    this.cameraManager.getControls().target.set(...hqSettings.camera.target);
                }
                this.cameraManager.getControls().update();
                
                // Update original state for spacebar reset
                this.cameraManager.updateOriginalState(
                    hqSettings.camera.position,
                    hqSettings.camera.rotation,
                    hqSettings.camera.target
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
    }
    
    loadModel(modelUrl = './models/exercise.glb') {
        // Show loading spinner
        const loader = document.getElementById('model-loader');
        if (loader) {
            this.updateLoaderSpinner();
            loader.style.display = 'flex';
        }
        
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
        
        console.log('Loading model from:', modelUrl);
        
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
                                    console.log('Found material:', mat.name);
                                    
                                    // Convert MUSCLE materials to MeshPhysicalMaterial for sheen support
                                    if (mat.name.includes('MUSCLE') && mat.type !== 'MeshPhysicalMaterial') {
                                        // Check if we already converted this material
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial for sheen support`);
                                            
                                            // Create new MeshPhysicalMaterial with default MUSCLE settings
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
                                                transparent: true,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                // Sheen settings for realistic muscle appearance
                                                sheen: 0.3,
                                                sheenRoughness: 0.45,
                                                sheenColor: new THREE.Color(0xeb0a0a)
                                            });
                                            
                                            // Copy the name
                                            physicalMat.name = mat.name;
                                            
                                            // Apply bump map from color texture with default scale
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 10.2;
                                            }
                                            
                                            // Store the converted material
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
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0x006eff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                roughness: 0.51,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                emissiveMap: mat.emissiveMap,
                                                opacity: 0.53,
                                                transparent: true,
                                                side: THREE.FrontSide,
                                                depthWrite: false,
                                                depthTest: true,
                                                blending: THREE.CustomBlending,
                                                alphaTest: 0,
                                                // Refraction/transmission properties
                                                transmission: 0.8,
                                                thickness: 0,
                                                ior: 1.45,
                                                envMapIntensity: 2.29
                                            });
                                            
                                            // Copy the name
                                            physicalMat.name = mat.name;
                                            
                                            // Apply bump map from color texture
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 1;
                                            }
                                            
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
                                    else if (mat.name.includes('SKELETON') && mat.type !== 'MeshPhysicalMaterial') {
                                        // Check if we already converted this material
                                        if (convertedMaterials.has(mat.name)) {
                                            newMats.push(convertedMaterials.get(mat.name));
                                        } else {
                                            console.log(`Converting ${mat.name} to MeshPhysicalMaterial`);
                                            
                                            // Create new MeshPhysicalMaterial with custom settings
                                            const physicalMat = new THREE.MeshPhysicalMaterial({
                                                color: new THREE.Color(0xffffff),
                                                map: mat.map,
                                                normalMap: mat.normalMap,
                                                roughness: 0.9875603442970008,
                                                metalness: 0,
                                                emissive: new THREE.Color(0x000000),
                                                emissiveIntensity: 1,
                                                emissiveMap: mat.emissiveMap,
                                                opacity: 1,
                                                transparent: true,
                                                side: THREE.DoubleSide,
                                                depthWrite: true,
                                                depthTest: true,
                                                blending: THREE.NormalBlending,
                                                alphaTest: 0,
                                                envMapIntensity: 1
                                            });
                                            
                                            // Copy the name
                                            physicalMat.name = mat.name;
                                            
                                            // Apply bump map from color texture
                                            if (mat.map) {
                                                physicalMat.bumpMap = mat.map;
                                                physicalMat.bumpScale = 1;
                                            }
                                            
                                            // Store the converted material
                                            convertedMaterials.set(mat.name, physicalMat);
                                            newMats.push(physicalMat);
                                        }
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
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the GLB model:', error);
                
                // Hide loading spinner on error
                const loader = document.getElementById('model-loader');
                if (loader) {
                    loader.style.display = 'none';
                }
            }
        );
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
            this.materialsFolder = this.trackFolder(this.gui.addFolder('🎨 Material Colors'));
            
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
            
            materials.forEach((material, name) => {
                const matFolder = this.trackFolder(this.materialsFolder.addFolder(name));
                // Ensure sub-folders are closed by default
                matFolder.close();
                
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
                        .name('🎯 Edge Threshold (Fix Fringe)')
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
                            // If material has a map texture, remove it so pure color shows
                            if (material.map) {
                                material.map = null;
                            }
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
                            .name('✨ Sheen Intensity')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'sheenRoughness', 0, 1, 0.01)
                            .name('✨ Sheen Roughness')
                            .onChange(() => material.needsUpdate = true);
                        
                        // Sheen color control
                        const sheenParams = {
                            sheenColor: material.sheenColor ? material.sheenColor.getHex() : 0xffffff
                        };
                        matFolder.addColor(sheenParams, 'sheenColor')
                            .name('✨ Sheen Color')
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
                            .name('🏔️ Bump Scale')
                            .onChange(() => material.needsUpdate = true);
                    }
                }
                
                // Extensive transparency controls for SKIN materials
                if (name.includes('SKIN')) {
                    // Side rendering options
                    const sideOptions = { 'Front (Single)': THREE.FrontSide, 'Back': THREE.BackSide, 'Double': THREE.DoubleSide };
                    matFolder.add(material, 'side', sideOptions)
                        .name('🔄 Face Culling')
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
                        .name('🎨 Blending Mode')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Depth controls (critical for transparency)
                    matFolder.add(material, 'depthWrite')
                        .name('✍️ Depth Write')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'depthTest')
                        .name('👁️ Depth Test')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Transparency controls
                    matFolder.add(material, 'opacity', 0, 1, 0.01)
                        .name('👻 Opacity')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'transparent')
                        .name('🌫️ Transparent')
                        .onChange(() => material.needsUpdate = true);
                    
                    matFolder.add(material, 'alphaTest', 0, 1, 0.01)
                        .name('🔍 Alpha Test')
                        .onChange(() => material.needsUpdate = true);
                    
                    // Glass-like transmission (if MeshPhysicalMaterial)
                    if (material.transmission !== undefined) {
                        matFolder.add(material, 'transmission', 0, 1, 0.01)
                            .name('🪟 Transmission (Glass)')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'thickness', 0, 5, 0.01)
                            .name('📏 Thickness')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'ior', 1, 2.333, 0.01)
                            .name('💎 IOR (Refraction)')
                            .onChange(() => material.needsUpdate = true);
                        
                        matFolder.add(material, 'envMapIntensity', 0, 3, 0.01)
                            .name('🌍 Env Map Intensity')
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
                        .name('☀️ Cast Shadows')
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
                        .name('☀️ Shadow Blur')
                        .onChange((value) => shadowBlurParams.setShadowBlur(value));
                }
                
                // Add "Copy Settings" button at the bottom of each material folder
                const copyParams = {
                    copySettings: () => {
                        // Build the settings string
                        let settingsText = `Can you please use these material settings as the default material settings whenever a model loads in with this specific material name:\n\n`;
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
                        
                        // Shadow casting (for meshes using this material)
                        if (name.includes('SKIN')) {
                            settingsText += `- Cast Shadows: true/false (adjust as needed)\n`;
                            settingsText += `- Shadow Opacity: 1.0 (adjust as needed)\n`;
                        }
                        
                        // Copy to clipboard
                        navigator.clipboard.writeText(settingsText).then(() => {
                            console.log('Material settings copied to clipboard for:', name);
                        });
                    }
                };
                
                matFolder.add(copyParams, 'copySettings').name('📋 Copy Settings');
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

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;
            
            this.cameraManager.handleResize();
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
        const screenshotFolder = this.trackFolder(this.gui.addFolder('📸 Screenshot'));
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
        
        screenshotFolder.add(quickActions, 'quickShot').name('📷 Take Screenshot');
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
        
        commonFolder.add(quickPresets, 'hd').name('📱 HD (720p)');
        commonFolder.add(quickPresets, 'fhd').name('🖥️ Full HD (1080p)');
        commonFolder.add(quickPresets, 'qhd').name('🖨️ 2K (1440p)');
        commonFolder.add(quickPresets, 'uhd').name('📺 4K (2160p)');
        commonFolder.add(quickPresets, 'square').name('📷 Square (1:1)');
        commonFolder.add(quickPresets, 'story').name('📱 Story (9:16)');
        
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
        
        advancedFolder.add(advancedActions, 'currentViewport').name('📐 Use Current Viewport');
        advancedFolder.add(advancedActions, 'copySettings').name('📋 Copy Screenshot Settings');
        
        // Initialize display
        updateResolutionDisplay();
        
        // Start collapsed - remove all open() calls
        // settingsFolder.open();
        // resolutionFolder.open();
        // screenshotFolder.open();
    }
    
    setupMultiThumbnailMenuGUI() {
        const thumbnailFolder = this.trackFolder(this.gui.addFolder('🖼️ Multi-Thumbnail Menu'));
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
        const glowFolder = thumbnailFolder.addFolder('✨ Active Button Glow');
        
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
        }, 'copySettings').name('📋 Copy Settings');
        
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
        }, 'copyRightMenuSettings').name('📋 Copy Right Menu Settings');
        
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
        const screenshotFolder = this.trackFolder(this.gui.addFolder('📸 Screenshot'));
        
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
        customFolder.add(customSettings, 'showFrame').name('📐 Show Frame Preview')
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
        }, 'customShot').name('📸 Take Custom Screenshot');

        // Start collapsed
        // customFolder.open();
        // screenshotFolder.open();
    }
}

// Initialize the application
const app = new ThreeJSApp();