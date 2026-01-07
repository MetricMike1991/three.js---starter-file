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

        // Background parameters
        this.backgroundParams = {
            gradientTop: '#3865ad',
            gradientBottom: '#6262cb',
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
        // Initialize animation player with hidden state
        this.animationPlayer.setVisibility(false);
        
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

    setupGUI() {
        this.gui = new GUI();
        this.allFolders = []; // Track all folders for expand/collapse all
        this.setupGUIStyles();
        this.setupGUIControls();
        
        // Save/Import controls with enhanced functionality
        this.gui.add({ 
            saveSettings: async () => {
                await this.settingsManager.saveSettingsToClipboard();
                console.log('All settings saved:', this.settingsManager.gatherAllSettings());
            }
        }, 'saveSettings').name('💾 Save All Settings');
        
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

        const presetFolder = this.gui.addFolder('🎬 Scene Presets');
        presetFolder.add(scenePresets, 'Cinematic Blue').name('🎭 Cinematic Blue');
        presetFolder.add(scenePresets, 'Reset to Default').name('🔄 Reset to Default');
        presetFolder.open();

        // Background controls
        this.setupBackgroundGUI();
        
        // Ground controls
        this.setupGroundGUI();
        
        // Dust particles controls
        this.setupParticlesGUI();
        
        // Lighting controls
        this.setupLightingGUI();
        
        // Camera controls
        this.setupCameraGUI();

        // Screenshot controls
        this.setupSimpleScreenshotGUI();

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
        const groundFolder = this.gui.addFolder('Ground Plane');
        
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
        
        groundFolder.open();
    }

    setupParticlesGUI() {
        const dustFolder = this.gui.addFolder('Dust Particles');
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
        const blurFolder = dustFolder.addFolder('Blur Effects');
        
        blurFolder.add(dustParams, 'blur', 0, 1, 0.01).name('Particle Blur')
            .onChange((value) => this.particleSystem.updateBlur(value));

        // Depth of Field Section
        const dofFolder = dustFolder.addFolder('Depth of Field');
        
        dofFolder.add(dustParams, 'depthBlur').name('Enable Depth Blur')
            .onChange((value) => this.particleSystem.updateDepthBlur(value));

        dofFolder.add(dustParams, 'depthBlurStrength', 0, 1, 0.01).name('Blur Strength')
            .onChange((value) => this.particleSystem.updateDepthBlurStrength(value));

        dofFolder.add(dustParams, 'depthFocusDistance', 0.5, 10, 0.1).name('Focus Distance')
            .onChange((value) => this.particleSystem.updateDepthFocus(value, dustParams.depthFocusRange));

        dofFolder.add(dustParams, 'depthFocusRange', 0.1, 5, 0.1).name('Focus Range')
            .onChange((value) => this.particleSystem.updateDepthFocus(dustParams.depthFocusDistance, value));

        // Position and Range Controls
        const positionFolder = dustFolder.addFolder('Position & Range');
        
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
        const presetFolder = dustFolder.addFolder('Particle Presets');
        presetFolder.add(particlePresets, 'Light Dust').name('✨ Light Dust');
        presetFolder.add(particlePresets, 'Heavy Dust').name('🌪️ Heavy Dust');
        presetFolder.add(particlePresets, 'Magical Sparkles').name('⭐ Magical Sparkles');
        presetFolder.add(particlePresets, 'Reset Dust').name('🔄 Reset Dust');

        // Open important folders by default
        blurFolder.open();
        dofFolder.open();
        dustFolder.open();
    }

    setupLightingGUI() {
        const lightsFolder = this.gui.addFolder('Lights');
        const lights = this.lightingSystem.getLights();
        const lightSettings = this.lightingSystem.getSettings();

        // Directional Light
        const dirFolder = lightsFolder.addFolder('Directional Light');
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
        
        dirFolder.open();

        // Ambient Light
        const ambFolder = lightsFolder.addFolder('Ambient Light');
        const ambParams = lightSettings.ambientLight;

        ambFolder.add(ambParams, 'intensity', 0, 2, 0.01).name('Intensity')
            .onChange(v => lights.ambient.intensity = v);
        
        ambFolder.addColor(ambParams, 'color').name('Color')
            .onChange(v => lights.ambient.color.set(v));
        
        ambFolder.open();
        lightsFolder.open();
    }

    setupCameraGUI() {
        const cameraFolder = this.gui.addFolder('📷 Camera Controls');
        const camera = this.cameraManager.getCamera();
        const controls = this.cameraManager.getControls();
        
        // Zoom Range Controls
        const zoomFolder = cameraFolder.addFolder('Zoom Range');
        
        zoomFolder.add(controls, 'minDistance', 0.001, 1, 0.001).name('Min Zoom Distance')
            .onChange(() => console.log('Min distance:', controls.minDistance));
        
        zoomFolder.add(controls, 'maxDistance', 10, 500, 1).name('Max Zoom Distance')
            .onChange(() => console.log('Max distance:', controls.maxDistance));
        
        zoomFolder.add(controls, 'zoomSpeed', 0.1, 2, 0.1).name('Zoom Speed')
            .onChange(() => console.log('Zoom speed:', controls.zoomSpeed));
        
        // Field of View Control
        const fovFolder = cameraFolder.addFolder('Field of View');
        
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
        const momentumFolder = cameraFolder.addFolder('Zoom Momentum');
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
        const debugFolder = cameraFolder.addFolder('Debug Info');
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
        
        momentumFolder.open();
        zoomFolder.open();
        fovFolder.open();
        
        // Axis Helper Section
        const axisFolder = cameraFolder.addFolder('🎯 Rotation Center Helper');
        
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
        const coordsFolder = cameraFolder.addFolder('📍 Coordinates');
        
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
        const manualFolder = coordsFolder.addFolder('Manual Control');
        
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
        
        axisFolder.open();
        coordsFolder.open();
        manualFolder.open();
        
        // Animation Player Controls
        const animationFolder = cameraFolder.addFolder('🎬 Animation Player');
        
        const animationSettings = {
            showPlayer: this.animationPlayer ? this.animationPlayer.isVisible : false,
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
        
        animationFolder.open();
    }

    setupGUIVisibilityToggle() {
        let guiVisible = true;
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

    loadModel() {
        this.gltfLoader.load(
            './models/exercise.glb',
            (gltf) => {
                window.model = gltf.scene;
                const model = window.model;
                
                model.traverse((child) => {
                    if (child.isMesh) {
                        this.allClickableMeshes.push(child);
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                model.position.set(0, -0.02, 0);
                this.sceneManager.getScene().add(model);
                
                // Set clickable meshes for camera double-click functionality
                this.cameraManager.setClickableMeshes(this.allClickableMeshes);

                // Setup animations if available
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(model);
                    
                    // Setup animation player with mixer and animations
                    this.animationPlayer.setMixer(this.mixer, gltf.animations);
                    
                    // Set up all animations (optionally auto-start first one)
                    gltf.animations.forEach((clip, index) => {
                        const action = this.mixer.clipAction(clip);
                        action.setLoop(THREE.LoopRepeat);
                        
                        // Auto-start first animation if desired
                        if (index === 0) {
                            // action.play(); // Uncomment to auto-play
                        }
                    });
                }

                // Add model GUI controls
                this.setupModelGUI(model);
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the GLB model:', error);
            }
        );
    }

    setupModelGUI(model) {
        const modelFolder = this.gui.addFolder('Model Transform');
        const pos = model.position;
        const rot = model.rotation;
        const scl = model.scale;
        
        modelFolder.add(pos, 'x', -1, 1, 0.002).name('Position X');
        modelFolder.add(pos, 'y', -1, 1, 0.002).name('Position Y');
        modelFolder.add(pos, 'z', -1, 1, 0.002).name('Position Z');
        modelFolder.add(rot, 'x', -1, 1, 0.002).name('Rotation X');
        modelFolder.add(rot, 'y', -1, 1, 0.002).name('Rotation Y');
        modelFolder.add(rot, 'z', -1, 1, 0.002).name('Rotation Z');
        modelFolder.add(scl, 'x', 0.01, 1, 0.001).name('Scale X');
        modelFolder.add(scl, 'y', 0.01, 1, 0.001).name('Scale Y');
        modelFolder.add(scl, 'z', 0.01, 1, 0.001).name('Scale Z');
        
        modelFolder.open();
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
            // Add your click interaction logic here
            console.log('Canvas clicked');
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
        
        // Update animations
        if (this.mixer) {
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
            width: 1920,
            height: 1080,
            transparent: false,
            format: 'png',
            filename: 'screenshot',
            showFrame: false
        };

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
        customFolder.add(customSettings, 'filename').name('Filename');

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