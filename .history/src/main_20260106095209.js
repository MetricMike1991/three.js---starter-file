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

        // Make camera available globally for depth blur calculations
        window.camera = this.cameraManager.getCamera();

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

        // Start render loop
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

    setupGUI() {
        this.gui = new GUI();
        
        // Save/Import controls
        this.gui.add({ 
            saveSettings: () => this.settingsManager.saveSettingsToClipboard() 
        }, 'saveSettings').name('Save Settings to Clipboard');
        
        this.gui.add({ 
            importSettings: () => this.settingsManager.importSettingsFromClipboard() 
        }, 'importSettings').name('Import Settings from Clipboard');

        // Background controls
        this.setupBackgroundGUI();
        
        // Ground controls
        this.setupGroundGUI();
        
        // Dust particles controls
        this.setupParticlesGUI();
        
        // Lighting controls
        this.setupLightingGUI();

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

                // Setup animations if available
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(model);
                    // Setup your animations here
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
        
        // Update particles
        this.particleSystem.update(deltaTime);
        
        // Update animations
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
        
        // Render
        this.renderer.render(this.sceneManager.getScene(), this.cameraManager.getCamera());
        
        // Continue loop
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the application
const app = new ThreeJSApp();