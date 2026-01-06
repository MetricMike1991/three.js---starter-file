/**
 * Settings Management Module
 * Handles save/load functionality for all scene settings
 */

class SettingsManager {
    constructor() {
        this.managers = {};
        this.defaultSettings = null;
        this.loadDefaultSettings();
    }

    async loadDefaultSettings() {
        try {
            const response = await fetch('./data/default-settings.json');
            this.defaultSettings = await response.json();
        } catch (error) {
            console.warn('Could not load default settings:', error);
            this.defaultSettings = this.getFallbackSettings();
        }
    }

    // Register managers that can save/load settings
    registerManager(name, manager) {
        this.managers[name] = manager;
    }

    // Save all settings to clipboard
    async saveSettingsToClipboard() {
        const settings = this.gatherAllSettings();
        const settingsStr = JSON.stringify(settings, null, 2);
        
        try {
            await navigator.clipboard.writeText(settingsStr);
            alert('Settings copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert('Failed to copy settings to clipboard.');
        }
    }

    // Import settings from clipboard
    async importSettingsFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            const settings = JSON.parse(text);
            this.applyAllSettings(settings);
            alert('Settings imported from clipboard!');
        } catch (error) {
            console.error('Failed to import settings:', error);
            alert('Failed to import settings: ' + error.message);
        }
    }

    // Gather settings from all registered managers
    gatherAllSettings() {
        const settings = {};
        
        for (const [name, manager] of Object.entries(this.managers)) {
            if (manager && typeof manager.getSettings === 'function') {
                settings[name] = manager.getSettings();
            }
        }

        // Add model transform if available
        if (window.model) {
            settings.model = {
                position: window.model.position.toArray(),
                rotation: [window.model.rotation.x, window.model.rotation.y, window.model.rotation.z],
                scale: window.model.scale.toArray()
            };
        }

        return settings;
    }

    // Apply settings to all registered managers
    applyAllSettings(settings) {
        for (const [name, manager] of Object.entries(this.managers)) {
            if (manager && typeof manager.applySettings === 'function' && settings[name]) {
                manager.applySettings(settings[name]);
            }
        }

        // Apply model transform if available
        if (settings.model && window.model) {
            if (settings.model.position) window.model.position.fromArray(settings.model.position);
            if (settings.model.rotation) window.model.rotation.set(
                settings.model.rotation[0],
                settings.model.rotation[1],
                settings.model.rotation[2]
            );
            if (settings.model.scale) window.model.scale.fromArray(settings.model.scale);
        }
    }

    // Apply default settings
    applyDefaultSettings() {
        if (this.defaultSettings) {
            this.applyAllSettings(this.defaultSettings);
        }
    }

    // Get default settings
    getDefaultSettings() {
        return this.defaultSettings;
    }

    // Fallback settings if loading fails
    getFallbackSettings() {
        return {
            background: {
                gradientTop: '#3865ad',
                gradientBottom: '#6262cb',
                gradientAlpha: 1
            },
            ground: {
                mode: 'Infinite Canvas',
                color: '#222222',
                roughness: 1,
                metalness: 0,
                shadowOpacity: 0.4,
                receiveShadow: true,
                castShadow: false,
                visible: true
            },
            dustParticles: {
                count: 500,
                size: 0.005,
                sizeRandomness: 0.5,
                color: '#ffffff',
                opacity: 0.3,
                speed: 0.5,
                horizontalRange: 3,
                verticalRange: 2,
                verticalOffset: 1,
                visible: true
            },
            directionalLight: {
                intensity: 1.43,
                color: '#ffffff',
                castShadow: true,
                shadowBias: 0,
                shadowBlur: 1,
                shadowMapWidth: 1024,
                shadowMapHeight: 1024,
                posX: 1.35,
                posY: 1.57,
                posZ: 0.9,
                showHelper: false,
                position: { x: 1.35, y: 1.57, z: 0.9 }
            },
            ambientLight: {
                intensity: 0.4,
                color: '#ffffff'
            },
            camera: {
                position: [0.571641187606234, 0.6054805751022576, -0.4710421975258844],
                rotation: [-2.6821474237876726, 0.8865063263260724, 2.775502273890531],
                target: [-0.04078270409635462, 0.38393067967272315, -0.023247738115800942]
            },
            model: {
                position: [0, -0.02, 0],
                rotation: [0, 0, 0],
                scale: [1, 1, 1]
            }
        };
    }

    // Save settings to local storage
    saveToLocalStorage(key = 'threeJsSettings') {
        const settings = this.gatherAllSettings();
        try {
            localStorage.setItem(key, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Failed to save to local storage:', error);
            return false;
        }
    }

    // Load settings from local storage
    loadFromLocalStorage(key = 'threeJsSettings') {
        try {
            const settingsStr = localStorage.getItem(key);
            if (settingsStr) {
                const settings = JSON.parse(settingsStr);
                this.applyAllSettings(settings);
                return true;
            }
        } catch (error) {
            console.error('Failed to load from local storage:', error);
        }
        return false;
    }

    // Export settings as JSON file
    exportAsFile(filename = 'three-scene-settings.json') {
        const settings = this.gatherAllSettings();
        const settingsStr = JSON.stringify(settings, null, 2);
        const blob = new Blob([settingsStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Import settings from file
    importFromFile() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const settings = JSON.parse(e.target.result);
                            this.applyAllSettings(settings);
                            resolve(settings);
                        } catch (error) {
                            reject(error);
                        }
                    };
                    reader.readAsText(file);
                } else {
                    reject(new Error('No file selected'));
                }
            };
            
            input.click();
        });
    }
}

export default SettingsManager;