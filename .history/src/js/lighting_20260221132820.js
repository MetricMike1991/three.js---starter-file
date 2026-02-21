/**
 * Lighting System Module
 * Handles all lighting setup and management
 */
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { getAssetUrl } from '../main.js';

class LightingSystem {
    constructor(scene) {
        this.scene = scene;
        this.ambientLight = null;
        this.directionalLight = null;
        this.dirLightHelper = null;
        this.rgbeLoader = new RGBELoader();
        
        this.init();
    }

    init() {
        this.setupAmbientLight();
        this.setupDirectionalLight();
        this.setupEnvironmentMap();
    }

    setupAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(this.ambientLight);
    }

    setupDirectionalLight() {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.43);
        this.directionalLight.position.set(1.35, 1.57, 0.9);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.bias = 0;
        this.directionalLight.shadow.radius = 1;
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(this.directionalLight);

        // Directional Light Helper
        this.dirLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 1.5, 0xff0000);
        this.dirLightHelper.visible = false;
        this.scene.add(this.dirLightHelper);
    }

    setupEnvironmentMap() {
        const hdriUrl = getAssetUrl('textures/environmentMap/2k.hdr');
        const attemptLoad = (url, retries = 1) => {
            this.rgbeLoader.load(
                url,
                (environmentMap) => {
                    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
                    // Only use HDRI for lighting, not for background
                    this.scene.environment = environmentMap;
                },
                undefined,
                (error) => {
                    console.warn('[Lighting] HDR environment map failed to load' + (retries > 0 ? ' – retrying…' : ''), error);
                    if (retries > 0) {
                        setTimeout(() => attemptLoad(url + (url.includes('?') ? '&' : '?') + 'retry=' + Date.now(), retries - 1), 1500);
                    }
                }
            );
        };
        attemptLoad(hdriUrl);
    }

    // Apply settings from configuration
    applySettings(settings) {
        if (settings.directionalLight) {
            const dirLight = settings.directionalLight;
            this.directionalLight.intensity = dirLight.intensity;
            this.directionalLight.color.set(dirLight.color);
            
            if (dirLight.position) {
                this.directionalLight.position.set(
                    dirLight.position.x,
                    dirLight.position.y,
                    dirLight.position.z
                );
            }
            
            this.directionalLight.castShadow = dirLight.castShadow;
            this.directionalLight.shadow.bias = dirLight.shadowBias;
            this.directionalLight.shadow.radius = dirLight.shadowBlur;
            this.directionalLight.shadow.mapSize.width = dirLight.shadowMapWidth;
            this.directionalLight.shadow.mapSize.height = dirLight.shadowMapHeight;
        }

        if (settings.ambientLight) {
            this.ambientLight.intensity = settings.ambientLight.intensity;
            this.ambientLight.color.set(settings.ambientLight.color);
        }
    }

    // Get current settings for saving
    getSettings() {
        return {
            directionalLight: {
                intensity: this.directionalLight.intensity,
                color: '#' + this.directionalLight.color.getHexString(),
                castShadow: this.directionalLight.castShadow,
                shadowBias: this.directionalLight.shadow.bias,
                shadowBlur: this.directionalLight.shadow.radius,
                shadowMapWidth: this.directionalLight.shadow.mapSize.width,
                shadowMapHeight: this.directionalLight.shadow.mapSize.height,
                posX: this.directionalLight.position.x,
                posY: this.directionalLight.position.y,
                posZ: this.directionalLight.position.z,
                showHelper: this.dirLightHelper.visible,
                position: {
                    x: this.directionalLight.position.x,
                    y: this.directionalLight.position.y,
                    z: this.directionalLight.position.z
                }
            },
            ambientLight: {
                intensity: this.ambientLight.intensity,
                color: '#' + this.ambientLight.color.getHexString()
            }
        };
    }

    // Get light objects for GUI control
    getLights() {
        return {
            ambient: this.ambientLight,
            directional: this.directionalLight,
            directionalHelper: this.dirLightHelper
        };
    }
}

export default LightingSystem;