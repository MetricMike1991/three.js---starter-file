/**
 * Live Theme Editor Module
 * Opens with 'T' key to allow real-time theme customization
 * Saves custom themes to WordPress
 */

class ThemeEditor {
    constructor(app) {
        this.app = app;
        this.isOpen = false;
        this.panel = null;
        this.currentSettings = {};
        
        this.init();
    }

    init() {
        // Listen for 'T' key to toggle editor
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' || e.key === 'T') {
                // Don't trigger if typing in an input
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                this.toggle();
            }
        });

        // Create the panel (hidden initially)
        this.createPanel();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.panel.style.display = 'block';
        this.loadCurrentSettings();
        // Animate in
        setTimeout(() => {
            this.panel.style.opacity = '1';
            this.panel.style.transform = 'translateX(0)';
        }, 10);
    }

    close() {
        this.isOpen = false;
        this.panel.style.opacity = '0';
        this.panel.style.transform = 'translateX(100%)';
        setTimeout(() => {
            this.panel.style.display = 'none';
        }, 300);
    }

    loadCurrentSettings() {
        // Load current settings from the app
        const ws = window.flexframeSettings || {};
        
        this.currentSettings = {
            // UI Settings
            spinnerColor: ws.uiSettings?.spinnerColor || '#00f510',
            playerBgColor: ws.uiSettings?.player?.bgColor || '#1f1f1f',
            playerBgOpacity: ws.uiSettings?.player?.bgOpacity ?? 0,
            playerButtonColor: ws.uiSettings?.player?.buttonColor || '#c20e1d',
            playerButtonOpacity: ws.uiSettings?.player?.buttonOpacity ?? 1,
            playerIconColor: ws.uiSettings?.player?.iconColor || '#ffffff',
            playerAccentColor: ws.uiSettings?.player?.accentColor || '#c20e1d',
            menuBgColor: ws.uiSettings?.menu?.bgColor || '#000000',
            menuBgOpacity: ws.uiSettings?.menu?.bgOpacity ?? 0.9,
            menuTextColor: ws.uiSettings?.menu?.textColor || '#ffffff',
            menuAccentColor: ws.uiSettings?.menu?.accentColor || '#f50000',
            
            // Background Settings
            bgGradientTop: ws.backgroundSettings?.gradientTop || '#3865ad',
            bgGradientBottom: ws.backgroundSettings?.gradientBottom || '#0101bc',
            bgGradientOpacity: ws.backgroundSettings?.gradientAlpha ?? 1,
            
            // Lighting Settings
            ambientIntensity: ws.lightingSettings?.ambientLight?.intensity ?? 0.4,
            ambientColor: ws.lightingSettings?.ambientLight?.color || '#ffffff',
            directionalIntensity: ws.lightingSettings?.directionalLight?.intensity ?? 1.43,
            directionalColor: ws.lightingSettings?.directionalLight?.color || '#ffffff',
            
            // Particle Settings
            particlesEnabled: ws.particleSettings?.visible ?? true,
            particlesCount: ws.particleSettings?.count ?? 1150,
            particlesSize: ws.particleSettings?.size ?? 0.0095,
            particlesColor: ws.particleSettings?.color || '#0d529c',
            particlesOpacity: ws.particleSettings?.opacity ?? 1,
            particlesSpeed: ws.particleSettings?.speed ?? 0.5,
            
            // Skin Material Settings
            skinColor: ws.materialSettings?.skinColor || '#ffdbac',
            skinOpacity: ws.materialSettings?.skinOpacity ?? 0.4,
            skinRoughness: ws.materialSettings?.skinRoughness ?? 0.7,
            skinMetalness: ws.materialSettings?.skinMetalness ?? 0,
            skinTransmission: ws.materialSettings?.skinTransmission ?? 0,
            skinThickness: ws.materialSettings?.skinThickness ?? 0,
            skinIor: ws.materialSettings?.skinIor ?? 1.5,
            skinEnvIntensity: ws.materialSettings?.skinEnvIntensity ?? 1
        };

        // Update all inputs with current values
        this.updateInputs();
    }

    updateInputs() {
        Object.keys(this.currentSettings).forEach(key => {
            const input = this.panel.querySelector(`[data-setting="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = this.currentSettings[key];
                } else if (input.type === 'range') {
                    input.value = this.currentSettings[key];
                    const valueDisplay = input.nextElementSibling;
                    if (valueDisplay && valueDisplay.classList.contains('te-range-value')) {
                        valueDisplay.textContent = this.formatValue(key, this.currentSettings[key]);
                    }
                } else {
                    input.value = this.currentSettings[key];
                }
            }
        });
    }

    formatValue(key, value) {
        if (key.includes('Opacity') || key.includes('Roughness') || key.includes('Metalness') || key.includes('Transmission')) {
            return parseFloat(value).toFixed(2);
        }
        if (key.includes('Intensity') || key.includes('Speed')) {
            return parseFloat(value).toFixed(2);
        }
        if (key.includes('Count')) {
            return parseInt(value);
        }
        if (key.includes('Size') && key !== 'particlesSize') {
            return parseFloat(value).toFixed(3);
        }
        if (key === 'particlesSize') {
            return parseFloat(value).toFixed(4);
        }
        return value;
    }

    createPanel() {
        this.panel = document.createElement('div');
        this.panel.id = 'theme-editor-panel';
        this.panel.innerHTML = `
            <div class="te-header">
                <h2>Theme Editor</h2>
                <span class="te-hint">Press T to close</span>
                <button class="te-close-btn">&times;</button>
            </div>
            
            <div class="te-content">
                <!-- UI Settings Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="ui">
                        <span>UI Settings</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-ui">
                        <div class="te-subsection">
                            <h4>Loading Spinner</h4>
                            ${this.createColorInput('spinnerColor', 'Spinner Color')}
                        </div>
                        <div class="te-subsection">
                            <h4>Animation Player</h4>
                            ${this.createColorInput('playerBgColor', 'Background')}
                            ${this.createRangeInput('playerBgOpacity', 'BG Opacity', 0, 1, 0.01)}
                            ${this.createColorInput('playerButtonColor', 'Button Color')}
                            ${this.createRangeInput('playerButtonOpacity', 'Button Opacity', 0, 1, 0.01)}
                            ${this.createColorInput('playerIconColor', 'Icon Color')}
                            ${this.createColorInput('playerAccentColor', 'Accent Color')}
                        </div>
                        <div class="te-subsection">
                            <h4>Menu Styling</h4>
                            ${this.createColorInput('menuBgColor', 'Background')}
                            ${this.createRangeInput('menuBgOpacity', 'BG Opacity', 0, 1, 0.01)}
                            ${this.createColorInput('menuTextColor', 'Text Color')}
                            ${this.createColorInput('menuAccentColor', 'Accent Color')}
                        </div>
                    </div>
                </div>

                <!-- Material Settings Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="material">
                        <span>Skin Material</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-material">
                        ${this.createColorInput('skinColor', 'Skin Color')}
                        ${this.createRangeInput('skinOpacity', 'Opacity', 0, 1, 0.01)}
                        ${this.createRangeInput('skinRoughness', 'Roughness', 0, 1, 0.01)}
                        ${this.createRangeInput('skinMetalness', 'Metalness', 0, 1, 0.01)}
                        ${this.createRangeInput('skinTransmission', 'Transmission', 0, 1, 0.01)}
                        ${this.createRangeInput('skinThickness', 'Thickness', 0, 5, 0.1)}
                        ${this.createRangeInput('skinIor', 'IOR', 1, 2.5, 0.01)}
                        ${this.createRangeInput('skinEnvIntensity', 'Env Intensity', 0, 5, 0.1)}
                    </div>
                </div>

                <!-- Background Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="background">
                        <span>Background</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-background">
                        ${this.createColorInput('bgGradientTop', 'Gradient Top')}
                        ${this.createColorInput('bgGradientBottom', 'Gradient Bottom')}
                        ${this.createRangeInput('bgGradientOpacity', 'Opacity', 0, 1, 0.01)}
                    </div>
                </div>

                <!-- Lighting Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="lighting">
                        <span>Lighting</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-lighting">
                        <div class="te-subsection">
                            <h4>Ambient Light</h4>
                            ${this.createRangeInput('ambientIntensity', 'Intensity', 0, 2, 0.01)}
                            ${this.createColorInput('ambientColor', 'Color')}
                        </div>
                        <div class="te-subsection">
                            <h4>Directional Light</h4>
                            ${this.createRangeInput('directionalIntensity', 'Intensity', 0, 5, 0.01)}
                            ${this.createColorInput('directionalColor', 'Color')}
                        </div>
                    </div>
                </div>

                <!-- Particles Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="particles">
                        <span>Particles</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-particles">
                        ${this.createCheckboxInput('particlesEnabled', 'Enable Particles')}
                        ${this.createRangeInput('particlesCount', 'Count', 0, 5000, 50)}
                        ${this.createRangeInput('particlesSize', 'Size', 0.001, 0.05, 0.001)}
                        ${this.createColorInput('particlesColor', 'Color')}
                        ${this.createRangeInput('particlesOpacity', 'Opacity', 0, 1, 0.01)}
                        ${this.createRangeInput('particlesSpeed', 'Speed', 0, 2, 0.1)}
                    </div>
                </div>
            </div>

            <!-- Save Section -->
            <div class="te-footer">
                <div class="te-save-section">
                    <input type="text" id="te-theme-name" placeholder="Enter theme name..." />
                    <button id="te-save-btn" class="te-btn-primary">
                        Save Theme
                    </button>
                </div>
                <div id="te-save-message" class="te-message"></div>
            </div>
        `;

        // Add styles
        this.addStyles();

        // Add to document
        document.body.appendChild(this.panel);

        // Setup event listeners
        this.setupEventListeners();
    }

    createColorInput(key, label) {
        return `
            <div class="te-row">
                <label>${label}</label>
                <div class="te-color-wrapper">
                    <input type="color" data-setting="${key}" class="te-color-input" />
                    <span class="te-color-hex" data-hex-for="${key}"></span>
                </div>
            </div>
        `;
    }

    createRangeInput(key, label, min, max, step) {
        return `
            <div class="te-row">
                <label>${label}</label>
                <div class="te-range-wrapper">
                    <input type="range" data-setting="${key}" min="${min}" max="${max}" step="${step}" class="te-range-input" />
                    <span class="te-range-value">0</span>
                </div>
            </div>
        `;
    }

    createCheckboxInput(key, label) {
        return `
            <div class="te-row te-checkbox-row">
                <label>${label}</label>
                <label class="te-toggle">
                    <input type="checkbox" data-setting="${key}" />
                    <span class="te-toggle-slider"></span>
                </label>
            </div>
        `;
    }

    setupEventListeners() {
        // Close button
        this.panel.querySelector('.te-close-btn').addEventListener('click', () => this.close());

        // Section toggles
        this.panel.querySelectorAll('.te-section-header').forEach(header => {
            header.addEventListener('click', () => {
                const section = header.dataset.section;
                const content = this.panel.querySelector(`#section-${section}`);
                const icon = header.querySelector('.te-toggle-icon');
                
                // Use computed style to check visibility (handles CSS hidden state)
                const isHidden = window.getComputedStyle(content).display === 'none';
                
                if (isHidden) {
                    content.style.display = 'block';
                    icon.textContent = '▼';
                } else {
                    content.style.display = 'none';
                    icon.textContent = '▶';
                }
            });
        });

        // Input changes - live update
        this.panel.querySelectorAll('input[data-setting]').forEach(input => {
            input.addEventListener('input', (e) => {
                const key = e.target.dataset.setting;
                let value;
                
                if (e.target.type === 'checkbox') {
                    value = e.target.checked;
                } else if (e.target.type === 'range') {
                    value = parseFloat(e.target.value);
                    // Update value display
                    const valueDisplay = e.target.nextElementSibling;
                    if (valueDisplay) {
                        valueDisplay.textContent = this.formatValue(key, value);
                    }
                } else {
                    value = e.target.value;
                }
                
                // Update hex display for color inputs
                if (e.target.type === 'color') {
                    const hexDisplay = this.panel.querySelector(`[data-hex-for="${key}"]`);
                    if (hexDisplay) {
                        hexDisplay.textContent = value;
                    }
                }
                
                this.currentSettings[key] = value;
                this.applySettingLive(key, value);
            });
        });

        // Save button
        this.panel.querySelector('#te-save-btn').addEventListener('click', () => this.saveTheme());
    }

    applySettingLive(key, value) {
        // Apply changes in real-time to the scene
        
        // Background settings
        if (key.startsWith('bgGradient')) {
            if (this.app.sceneManager) {
                this.app.backgroundParams.gradientTop = this.currentSettings.bgGradientTop;
                this.app.backgroundParams.gradientBottom = this.currentSettings.bgGradientBottom;
                this.app.backgroundParams.gradientAlpha = this.currentSettings.bgGradientOpacity;
                this.app.sceneManager.updateGradientBackground(this.app.backgroundParams);
            }
        }
        
        // Lighting settings
        if (key === 'ambientIntensity' && this.app.lightingSystem) {
            this.app.lightingSystem.ambientLight.intensity = value;
        }
        if (key === 'ambientColor' && this.app.lightingSystem) {
            this.app.lightingSystem.ambientLight.color.set(value);
        }
        if (key === 'directionalIntensity' && this.app.lightingSystem) {
            this.app.lightingSystem.directionalLight.intensity = value;
        }
        if (key === 'directionalColor' && this.app.lightingSystem) {
            this.app.lightingSystem.directionalLight.color.set(value);
        }
        
        // Particle settings
        if (key.startsWith('particles') && this.app.particleSystem) {
            this.app.particleSystem.params.visible = this.currentSettings.particlesEnabled;
            this.app.particleSystem.params.count = this.currentSettings.particlesCount;
            this.app.particleSystem.params.size = this.currentSettings.particlesSize;
            this.app.particleSystem.params.color = this.currentSettings.particlesColor;
            this.app.particleSystem.params.opacity = this.currentSettings.particlesOpacity;
            this.app.particleSystem.params.speed = this.currentSettings.particlesSpeed;
            
            // Recreate particles when count changes or toggling visibility
            if (key === 'particlesCount' || key === 'particlesEnabled') {
                this.app.particleSystem.createDustParticles();
            } else {
                // Directly update the material properties
                const mat = this.app.particleSystem.dustMaterial;
                if (mat) {
                    mat.color.set(this.currentSettings.particlesColor);
                    mat.opacity = this.currentSettings.particlesOpacity;
                    mat.size = this.currentSettings.particlesSize;
                    mat.needsUpdate = true;
                }
                // Update visibility on the particles mesh
                if (this.app.particleSystem.dustParticles) {
                    this.app.particleSystem.dustParticles.visible = this.currentSettings.particlesEnabled;
                }
            }
        }
        
        // Skin material settings
        if (key.startsWith('skin') && window.model) {
            this.updateSkinMaterial();
        }
        
        // Player styling
        if (key.startsWith('player')) {
            this.updatePlayerStyling();
        }
        
        // Menu styling
        if (key.startsWith('menu')) {
            this.updateMenuStyling();
        }
        
        // Spinner color
        if (key === 'spinnerColor') {
            this.app.updateSpinnerColor(value);
        }
    }

    updateSkinMaterial() {
        if (!window.model) return;
        
        const skinColor = this.currentSettings.skinColor;
        const opacity = this.currentSettings.skinOpacity;
        const roughness = this.currentSettings.skinRoughness;
        const metalness = this.currentSettings.skinMetalness;
        const transmission = this.currentSettings.skinTransmission;
        const thickness = this.currentSettings.skinThickness;
        const ior = this.currentSettings.skinIor;
        const envIntensity = this.currentSettings.skinEnvIntensity;
        
        window.model.traverse((child) => {
            if (child.isMesh && child.material) {
                // Handle both single material and array of materials
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                
                materials.forEach(mat => {
                    // Check material name (case-insensitive match for 'SKIN')
                    if (mat.name && mat.name.toUpperCase() === 'SKIN') {
                        mat.color.set(skinColor);
                        mat.opacity = opacity;
                        mat.transparent = opacity < 1;
                        mat.roughness = roughness;
                        mat.metalness = metalness;
                        if (mat.transmission !== undefined) {
                            mat.transmission = transmission;
                        }
                        if (mat.thickness !== undefined) {
                            mat.thickness = thickness;
                        }
                        if (mat.ior !== undefined) {
                            mat.ior = ior;
                        }
                        if (mat.envMapIntensity !== undefined) {
                            mat.envMapIntensity = envIntensity;
                        }
                        mat.needsUpdate = true;
                    }
                });
            }
        });
    }

    updatePlayerStyling() {
        const player = document.querySelector('.animation-player');
        if (!player) return;
        
        // Background
        const bgColor = this.currentSettings.playerBgColor;
        const bgOpacity = this.currentSettings.playerBgOpacity;
        player.style.backgroundColor = this.hexToRgba(bgColor, bgOpacity);
        
        // Buttons
        const btnColor = this.currentSettings.playerButtonColor;
        const btnOpacity = this.currentSettings.playerButtonOpacity;
        player.querySelectorAll('.player-btn, .play-pause-btn').forEach(btn => {
            btn.style.backgroundColor = this.hexToRgba(btnColor, btnOpacity);
        });
        
        // Icons
        const iconColor = this.currentSettings.playerIconColor;
        player.querySelectorAll('.player-btn svg, .play-pause-btn svg').forEach(svg => {
            svg.style.fill = iconColor;
        });
        
        // Accent color (scrubber)
        const accentColor = this.currentSettings.playerAccentColor;
        const scrubber = player.querySelector('.scrubber-progress, .progress-fill');
        if (scrubber) {
            scrubber.style.backgroundColor = accentColor;
        }
    }

    updateMenuStyling() {
        // Update thumbnail menu
        const menu = document.querySelector('.multi-thumbnail-menu');
        if (menu) {
            const bgColor = this.currentSettings.menuBgColor;
            const bgOpacity = this.currentSettings.menuBgOpacity;
            menu.style.backgroundColor = this.hexToRgba(bgColor, bgOpacity);
            
            const textColor = this.currentSettings.menuTextColor;
            menu.style.color = textColor;
            menu.querySelectorAll('.thumbnail-label, .menu-label').forEach(el => {
                el.style.color = textColor;
            });
        }
        
        // Update right menu
        const rightMenu = document.querySelector('.right-menu, .info-menu');
        if (rightMenu) {
            const bgColor = this.currentSettings.menuBgColor;
            const bgOpacity = this.currentSettings.menuBgOpacity;
            rightMenu.style.backgroundColor = this.hexToRgba(bgColor, bgOpacity);
            
            const textColor = this.currentSettings.menuTextColor;
            rightMenu.style.color = textColor;
        }
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    async saveTheme() {
        const themeName = this.panel.querySelector('#te-theme-name').value.trim();
        
        if (!themeName) {
            this.showMessage('Please enter a theme name', 'error');
            return;
        }
        
        const saveBtn = this.panel.querySelector('#te-save-btn');
        saveBtn.disabled = true;
        saveBtn.innerHTML = 'Saving...';
        
        // Format settings for WordPress
        const presetData = {
            spinner_color: this.currentSettings.spinnerColor,
            use_logo_loader: false,
            logo_loader_animation: 'pulse',
            logo_loader_size: 100,
            player_bg_color: this.currentSettings.playerBgColor,
            player_bg_opacity: this.currentSettings.playerBgOpacity,
            player_button_bg_color: this.currentSettings.playerButtonColor,
            player_button_bg_opacity: this.currentSettings.playerButtonOpacity,
            player_icon_color: this.currentSettings.playerIconColor,
            player_accent_color: this.currentSettings.playerAccentColor,
            player_always_visible: 'no',
            menu_bg_color: this.currentSettings.menuBgColor,
            menu_bg_opacity: this.currentSettings.menuBgOpacity,
            menu_text_color: this.currentSettings.menuTextColor,
            menu_accent_color: this.currentSettings.menuAccentColor,
            hide_right_menu: false,
            skin_color: this.currentSettings.skinColor,
            skin_opacity: this.currentSettings.skinOpacity,
            skin_roughness: this.currentSettings.skinRoughness,
            skin_metalness: this.currentSettings.skinMetalness,
            skin_transmission: this.currentSettings.skinTransmission,
            skin_thickness: this.currentSettings.skinThickness,
            skin_ior: this.currentSettings.skinIor,
            skin_env_intensity: this.currentSettings.skinEnvIntensity,
            bg_gradient_top: this.currentSettings.bgGradientTop,
            bg_gradient_bottom: this.currentSettings.bgGradientBottom,
            bg_gradient_opacity: this.currentSettings.bgGradientOpacity,
            ambient_intensity: this.currentSettings.ambientIntensity,
            ambient_color: this.currentSettings.ambientColor,
            directional_intensity: this.currentSettings.directionalIntensity,
            directional_color: this.currentSettings.directionalColor,
            particles_enabled: this.currentSettings.particlesEnabled,
            particle_count: this.currentSettings.particlesCount,
            particle_size: this.currentSettings.particlesSize,
            particle_color: this.currentSettings.particlesColor,
            particle_opacity: this.currentSettings.particlesOpacity,
            particle_speed: this.currentSettings.particlesSpeed
        };

        try {
            // Check if we're in WordPress context
            if (window.flexframeSettings && window.flexframeSettings.ajaxUrl) {
                const response = await fetch(window.flexframeSettings.ajaxUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'flexframe_save_custom_preset',
                        preset_name: themeName,
                        preset_data: JSON.stringify(presetData),
                        nonce: window.flexframeSettings.nonce || ''
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showMessage(`Theme "${themeName}" saved! It will appear in Step 4 dropdown.`, 'success');
                    this.panel.querySelector('#te-theme-name').value = '';
                } else {
                    this.showMessage(result.data?.message || 'Error saving theme', 'error');
                }
            } else {
                // Standalone mode - save to localStorage
                const savedThemes = JSON.parse(localStorage.getItem('flexframe_themes') || '{}');
                savedThemes[themeName] = presetData;
                localStorage.setItem('flexframe_themes', JSON.stringify(savedThemes));
                this.showMessage(`Theme "${themeName}" saved locally!`, 'success');
                this.panel.querySelector('#te-theme-name').value = '';
            }
        } catch (error) {
            console.error('Error saving theme:', error);
            this.showMessage('Error saving theme: ' + error.message, 'error');
        }
        
        saveBtn.disabled = false;
        saveBtn.innerHTML = 'Save Theme';
    }

    showMessage(text, type) {
        const msg = this.panel.querySelector('#te-save-message');
        msg.textContent = text;
        msg.className = `te-message te-message-${type}`;
        msg.style.display = 'block';
        
        setTimeout(() => {
            msg.style.display = 'none';
        }, 4000);
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #theme-editor-panel {
                position: fixed;
                top: 0;
                right: 0;
                width: 320px;
                height: 100vh;
                background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
                color: #fff;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 13px;
                z-index: 10000;
                display: none;
                opacity: 0;
                transform: translateX(100%);
                transition: opacity 0.3s ease, transform 0.3s ease;
                box-shadow: -5px 0 30px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
            }
            
            .te-header {
                padding: 16px 20px;
                background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .te-header h2 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                flex: 1;
            }
            
            .te-hint {
                font-size: 11px;
                color: rgba(255,255,255,0.5);
            }
            
            .te-close-btn {
                background: none;
                border: none;
                color: #fff;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .te-close-btn:hover {
                opacity: 1;
            }
            
            .te-content {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
            }
            
            .te-section {
                margin-bottom: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                overflow: hidden;
            }
            
            .te-section-header {
                padding: 12px 16px;
                background: rgba(255,255,255,0.08);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background 0.2s;
            }
            
            .te-section-header:hover {
                background: rgba(255,255,255,0.12);
            }
            
            .te-toggle-icon {
                margin-left: auto;
                font-size: 10px;
                opacity: 0.6;
            }
            
            .te-section-content {
                padding: 12px 16px;
                display: none;
            }
            
            .te-subsection {
                margin-bottom: 16px;
                padding-bottom: 16px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .te-subsection:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }
            
            .te-subsection h4 {
                margin: 0 0 12px 0;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: rgba(255,255,255,0.5);
            }
            
            .te-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            
            .te-row:last-child {
                margin-bottom: 0;
            }
            
            .te-row label {
                font-size: 12px;
                color: rgba(255,255,255,0.8);
            }
            
            .te-color-wrapper {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .te-color-input {
                width: 36px;
                height: 24px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                padding: 0;
                background: none;
            }
            
            .te-color-input::-webkit-color-swatch-wrapper {
                padding: 2px;
            }
            
            .te-color-input::-webkit-color-swatch {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            .te-color-hex {
                font-size: 11px;
                font-family: monospace;
                color: rgba(255,255,255,0.6);
                min-width: 60px;
            }
            
            .te-range-wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
                max-width: 160px;
            }
            
            .te-range-input {
                flex: 1;
                height: 4px;
                -webkit-appearance: none;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
                outline: none;
            }
            
            .te-range-input::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 14px;
                height: 14px;
                background: #e94560;
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.2s;
            }
            
            .te-range-input::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }
            
            .te-range-value {
                font-size: 11px;
                font-family: monospace;
                color: rgba(255,255,255,0.6);
                min-width: 45px;
                text-align: right;
            }
            
            .te-checkbox-row {
                padding: 8px 0;
            }
            
            .te-toggle {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
            }
            
            .te-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .te-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255,255,255,0.2);
                transition: 0.3s;
                border-radius: 24px;
            }
            
            .te-toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }
            
            .te-toggle input:checked + .te-toggle-slider {
                background-color: #e94560;
            }
            
            .te-toggle input:checked + .te-toggle-slider:before {
                transform: translateX(20px);
            }
            
            .te-footer {
                padding: 16px 20px;
                background: rgba(0,0,0,0.3);
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .te-save-section {
                display: flex;
                gap: 10px;
            }
            
            #te-theme-name {
                flex: 1;
                padding: 10px 14px;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                background: rgba(255,255,255,0.1);
                color: #fff;
                font-size: 13px;
                outline: none;
                transition: border-color 0.2s;
            }
            
            #te-theme-name:focus {
                border-color: #e94560;
            }
            
            #te-theme-name::placeholder {
                color: rgba(255,255,255,0.4);
            }
            
            .te-btn-primary {
                padding: 10px 16px;
                background: linear-gradient(135deg, #e94560 0%, #c23a51 100%);
                border: none;
                border-radius: 6px;
                color: #fff;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: transform 0.2s, box-shadow 0.2s;
                white-space: nowrap;
            }
            
            .te-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
            }
            
            .te-btn-primary:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            
            .te-message {
                margin-top: 12px;
                padding: 10px 14px;
                border-radius: 6px;
                font-size: 12px;
                display: none;
            }
            
            .te-message-success {
                background: rgba(0, 200, 83, 0.2);
                border: 1px solid rgba(0, 200, 83, 0.4);
                color: #00c853;
            }
            
            .te-message-error {
                background: rgba(255, 82, 82, 0.2);
                border: 1px solid rgba(255, 82, 82, 0.4);
                color: #ff5252;
            }
            
            /* Scrollbar styling */
            .te-content::-webkit-scrollbar {
                width: 6px;
            }
            
            .te-content::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.05);
            }
            
            .te-content::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            .te-content::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(style);
    }
}

export default ThemeEditor;
