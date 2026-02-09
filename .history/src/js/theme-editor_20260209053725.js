/**
 * Live Theme Editor Module v2.0
 * Opens with 'T' key to allow real-time theme customization
 * Saves custom themes to WordPress
 * Updated: 2026-01-25 - Save section moved to header
 */

class ThemeEditor {
    constructor(app) {
        console.log('[ThemeEditor v2.0] Constructor called - Save section in header');
        this.app = app;
        this.isOpen = false;
        this.panel = null;
        
        // Initialize with default settings (will be overwritten by loadCurrentSettings)
        this.currentSettings = {
            primaryColor: '#4a9eff',
            spinnerColor: '#00f510',
            playerBgColor: '#1f1f1f',
            playerBgOpacity: 0,
            playerButtonColor: '#c20e1d',
            playerButtonOpacity: 1,
            playerIconColor: '#ffffff',
            playerAccentColor: '#c20e1d',
            menuBgColor: '#000000',
            menuBgOpacity: 0.9,
            menuTextColor: '#ffffff',
            menuTextOpacity: 1,
            menuAccentColor: '#ff00f7',
            thumbnailLabelColor: '#000000',
            thumbnailLabelOpacity: 0.1,
            menuV2BgColor: '#1a1a1a',
            menuV2BgOpacity: 0.95,
            menuV2TextColor: '#ffffff',
            menuV2TextOpacity: 1,
            menuV2AccentColor: null, // null = use primary color
            menuV2ThumbnailLabelColor: '#ffffff',
            menuV2ThumbnailLabelOpacity: 0.9,
            hideInfoPanel: false,
            showScreenshotButton: true,
            bgGradientTop: '#3865ad',
            bgGradientBottom: '#0101bc',
            bgGradientOpacity: 1,
            ambientIntensity: 0.4,
            ambientColor: '#ffffff',
            directionalIntensity: 1.43,
            directionalColor: '#ffffff',
            particlesEnabled: true,
            particlesCount: 1150,
            particlesSize: 0.0095,
            particlesColor: '#0d529c',
            particlesOpacity: 1,
            particlesSpeed: 0.5
        };
        
        // Get WordPress AJAX settings
        const ws = window.flexframeSettings || {};
        this.ajaxUrl = ws.ajaxUrl || window.ajaxurl || '/wp-admin/admin-ajax.php';
        this.nonce = ws.nonce || '';
        
        this.init();
    }

    init() {
        console.log('[ThemeEditor v2.0] Initializing - Save section in header...');
        
        // Listen for 'T' key to toggle editor
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' || e.key === 'T') {
                // Don't trigger if typing in an input
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                this.toggle();
            }
        });

        // IMPORTANT: Create panel FIRST so elements exist
        this.createPanel();
        
        // Then load settings to populate the inputs
        this.loadCurrentSettings();
        
        // Check for URL parameter to auto-open
        const urlParams = new URLSearchParams(window.location.search);
        const shouldOpen = urlParams.get('openThemeEditor');
        console.log('[ThemeEditor] URL params:', window.location.search);
        console.log('[ThemeEditor] openThemeEditor param:', shouldOpen);
        
        if (shouldOpen === '1') {
            console.log('[ThemeEditor] Auto-opening in 1 second...');
            // Open after a short delay to ensure everything is loaded
            setTimeout(() => {
                console.log('[ThemeEditor] Opening now!');
                this.open();
            }, 1000);
        } else {
            console.log('[ThemeEditor] Not auto-opening (param not found or not "1")');
        }
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
        this.panel.classList.remove('hidden');
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
            this.panel.classList.add('hidden');
        }, 300);
    }

    loadCurrentSettings() {
        // Load current settings from the app
        const ws = window.flexframeSettings || {};
        
        this.currentSettings = {
            // Primary Color (Step 1)
            primaryColor: ws.primaryColor || '#4a9eff',
            
            // UI Settings
            spinnerColor: ws.uiSettings?.spinnerColor || '#00f510',
            playerBgColor: ws.uiSettings?.player?.bgColor || '#1f1f1f',
            playerBgOpacity: ws.uiSettings?.player?.bgOpacity ?? 0,
            playerButtonColor: ws.uiSettings?.player?.buttonBgColor || '#c20e1d',  // Button BACKGROUND color
            playerButtonOpacity: ws.uiSettings?.player?.buttonOpacity ?? 1,
            playerIconColor: ws.uiSettings?.player?.buttonColor || '#ffffff',  // Button icon/text color
            playerAccentColor: ws.uiSettings?.player?.accentColor || '#c20e1d',
            menuBgColor: ws.uiSettings?.menu?.bgColor || '#000000',
            menuBgOpacity: ws.uiSettings?.menu?.bgOpacity ?? 0.9,
            menuTextColor: ws.uiSettings?.menu?.textColor || '#ffffff',
            menuTextOpacity: ws.uiSettings?.menu?.textOpacity ?? 1,
            menuAccentColor: ws.uiSettings?.menu?.accentColor || '#ff00f7',
            thumbnailLabelColor: ws.uiSettings?.menu?.thumbnailLabelColor || '#000000',
            thumbnailLabelOpacity: ws.uiSettings?.menu?.thumbnailLabelOpacity ?? 0.1,
            menuV2BgColor: ws.uiSettings?.menuV2?.bgColor || '#1a1a1a',
            menuV2BgOpacity: ws.uiSettings?.menuV2?.bgOpacity ?? 0.95,
            menuV2TextColor: ws.uiSettings?.menuV2?.textColor || '#ffffff',
            menuV2TextOpacity: ws.uiSettings?.menuV2?.textOpacity ?? 1,
            menuV2AccentColor: ws.uiSettings?.menuV2?.accentColor || (ws.primaryColor || '#4a9eff'),
            menuV2ThumbnailLabelColor: ws.uiSettings?.menuV2?.thumbnailLabelColor || '#ffffff',
            menuV2ThumbnailLabelOpacity: ws.uiSettings?.menuV2?.thumbnailLabelOpacity ?? 0.9,
            hideInfoPanel: ws.uiSettings?.hideRightMenu ?? false,
            showScreenshotButton: ws.uiSettings?.showScreenshotButton ?? true,
            
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
            skinEnvIntensity: ws.materialSettings?.skinEnvIntensity ?? 1,
            
            // Equipment Material Settings
            barbellColor: ws.materialSettings?.barbellColor || '#808080',
            barbellOpacity: ws.materialSettings?.barbellOpacity ?? 1,
            barbellMetalness: ws.materialSettings?.barbellMetalness ?? 0.8,
            barbellRoughness: ws.materialSettings?.barbellRoughness ?? 0.3,
            
            bumperColor: ws.materialSettings?.bumperColor || '#808080',
            bumperOpacity: ws.materialSettings?.bumperOpacity ?? 1,
            bumperMetalness: ws.materialSettings?.bumperMetalness ?? 0,
            bumperRoughness: ws.materialSettings?.bumperRoughness ?? 0.8,
            
            cableColor: ws.materialSettings?.cableColor || '#808080',
            cableOpacity: ws.materialSettings?.cableOpacity ?? 1,
            cableMetalness: ws.materialSettings?.cableMetalness ?? 0.5,
            cableRoughness: ws.materialSettings?.cableRoughness ?? 0.4,
            
            chromeColor: ws.materialSettings?.chromeColor || '#cccccc',
            chromeOpacity: ws.materialSettings?.chromeOpacity ?? 1,
            chromeMetalness: ws.materialSettings?.chromeMetalness ?? 1,
            chromeRoughness: ws.materialSettings?.chromeRoughness ?? 0.1,
            
            color1Color: ws.materialSettings?.color1Color || ws.primaryColor || '#4a9eff',
            color1Opacity: ws.materialSettings?.color1Opacity ?? 1,
            color1Metalness: ws.materialSettings?.color1Metalness ?? 0.5,
            color1Roughness: ws.materialSettings?.color1Roughness ?? 0.5,
            
            metalColor: ws.materialSettings?.metalColor || '#b0b0b0',
            metalOpacity: ws.materialSettings?.metalOpacity ?? 1,
            metalMetalness: ws.materialSettings?.metalMetalness ?? 0.9,
            metalRoughness: ws.materialSettings?.metalRoughness ?? 0.3,
            
            padColor: ws.materialSettings?.padColor || '#1a1a1a',
            padOpacity: ws.materialSettings?.padOpacity ?? 1,
            padMetalness: ws.materialSettings?.padMetalness ?? 0,
            padRoughness: ws.materialSettings?.padRoughness ?? 0.9,
            
            plasticColor: ws.materialSettings?.plasticColor || '#808080',
            plasticOpacity: ws.materialSettings?.plasticOpacity ?? 1,
            plasticMetalness: ws.materialSettings?.plasticMetalness ?? 0,
            plasticRoughness: ws.materialSettings?.plasticRoughness ?? 0.6,
            
            rubberColor: ws.materialSettings?.rubberColor || '#1a1a1a',
            rubberOpacity: ws.materialSettings?.rubberOpacity ?? 1,
            rubberMetalness: ws.materialSettings?.rubberMetalness ?? 0,
            rubberRoughness: ws.materialSettings?.rubberRoughness ?? 0.95
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
                <div class="te-header-top">
                    <h2>Theme Editor</h2>
                    <span class="te-hint">Press T to close</span>
                    <button class="te-close-btn">&times;</button>
                </div>
                <div class="te-save-section">
                    <input type="text" id="te-theme-name" placeholder="Enter theme name..." />
                    <button id="te-save-btn" class="te-btn-primary">Save Theme</button>
                </div>
                <div id="te-save-message" class="te-message"></div>
            </div>
            
            <div class="te-content">
                <!-- Primary Color Section (Step 1) -->
                <div class="te-section te-primary-section">
                    <div class="te-section-header" data-section="primary">
                        <span>Primary Color</span>
                        <span class="te-toggle-icon">▼</span>
                    </div>
                    <div class="te-section-content te-section-open" id="section-primary">
                        <p class="te-section-desc">This is the main accent color used throughout the viewer for glows, highlights, and branding elements.</p>
                        <div class="te-control">
                            <label for="te-primaryColor">Primary Color</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="color" id="te-primaryColor" data-setting="primaryColor" value="${this.currentSettings.primaryColor}">
                                <button class="te-save-primary-btn" style="padding: 5px 15px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; white-space: nowrap;">Save & Apply</button>
                            </div>
                            <div style="font-size: 11px; color: #888; margin-top: 5px;">Click Save & Apply to update the primary color globally</div>
                        </div>
                    </div>
                </div>

                <!-- UI Settings Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="ui">
                        <span>UI Settings</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-ui">
                        
                        <!-- Loading Spinner -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-spinner">
                                <span>Loading Indicator</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-spinner">
                                ${this.createColorInput('spinnerColor', 'Spinner Color')}
                                <div style="background: rgba(255, 158, 74, 0.1); border-left: 3px solid #ff9e4a; padding: 10px; margin-top: 12px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.85);">
                                    <strong>Note:</strong> The loader type (Spinner vs Logo) and animation style are configured in the main WordPress settings. These settings control the initial page load indicator.
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Menu -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-player">
                                <span>Bottom Menu</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-player">
                                <button class="te-preview-toggle" data-preview="player" style="width: 100%; padding: 6px 10px; margin-bottom: 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;">
                                    Show Bottom Menu Preview
                                </button>
                                ${this.createColorInput('playerBgColor', 'Background')}
                                ${this.createRangeInput('playerBgOpacity', 'BG Opacity', 0, 1, 0.01)}
                                ${this.createColorInput('playerButtonColor', 'Button Color')}
                                ${this.createRangeInput('playerButtonOpacity', 'Button Opacity', 0, 1, 0.01)}
                                ${this.createColorInput('playerIconColor', 'Icon Color')}
                                ${this.createColorInput('playerAccentColor', 'Accent Color')}
                            </div>
                        </div>

                        <!-- Side Menus V2 -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-menu-v2">
                                <span>Side Menus V2</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-menu-v2">
                                <div style="background: rgba(74, 158, 255, 0.1); border-left: 3px solid #4a9eff; padding: 10px; margin-bottom: 12px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.85);">
                                    <strong>Tip:</strong> These settings control the new side menu system. The outline color and menu accents are controlled by the <strong>Primary Color</strong> field in the very first tab of the theme editor.
                                </div>
                                ${this.createColorInput('menuV2BgColor', 'Background Color')}
                                ${this.createRangeInput('menuV2BgOpacity', 'Background Opacity', 0, 1, 0.01)}
                                ${this.createColorInput('menuV2TextColor', 'Text Color')}
                                ${this.createRangeInput('menuV2TextOpacity', 'Text Opacity', 0, 1, 0.01)}
                                ${this.createColorInput('menuV2AccentColor', 'Accent Color')}
                                ${this.createColorInput('menuV2ThumbnailLabelColor', 'Thumbnail Label Color')}
                                ${this.createRangeInput('menuV2ThumbnailLabelOpacity', 'Thumbnail Label Opacity', 0, 1, 0.01)}
                                <button id="te-reset-menu-v2" style="
                                    width: 100%;
                                    margin-top: 12px;
                                    padding: 8px 16px;
                                    background: rgba(255, 255, 255, 0.08);
                                    border: 1px solid rgba(255, 255, 255, 0.2);
                                    border-radius: 6px;
                                    color: rgba(255, 255, 255, 0.8);
                                    font-size: 12px;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                ">↺ Reset to Defaults</button>
                            </div>
                        </div>

                        <!-- Side Menus (Legacy) -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-menu">
                                <span>Side Menus (Legacy)</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-menu">
                                <div style="background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; padding: 10px; margin-bottom: 12px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.85);">
                                    <strong>Note:</strong> These settings are for the old menu system and may not work with the new menus. Use Side Menus V2 instead.
                                </div>
                                ${this.createColorInput('menuBgColor', 'Background Color')}
                                ${this.createRangeInput('menuBgOpacity', 'Background Opacity', 0, 1, 0.01)}
                                ${this.createColorInput('menuTextColor', 'Text Color')}
                                ${this.createRangeInput('menuTextOpacity', 'Text Opacity', 0, 1, 0.01)}
                                ${this.createColorInput('menuAccentColor', 'Accent Color')}
                                ${this.createColorInput('thumbnailLabelColor', 'Thumbnail Label Color')}
                                ${this.createRangeInput('thumbnailLabelOpacity', 'Thumbnail Label Opacity', 0, 1, 0.01)}
                                ${this.createCheckboxInput('hideInfoPanel', 'Hide Info Panel')}
                                ${this.createCheckboxInput('showScreenshotButton', 'Show Screenshot Button')}
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Model Colors & Materials Section (Parent) -->
                <div class="te-section">
                    <div class="te-section-header" data-section="model-materials">
                        <span>Model Colors & Materials</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-model-materials">
                        
                        <!-- Skin Material -->
                        <div class="te-section te-nested">
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

                        <!-- Barbell Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="barbell">
                                <span>Barbell Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-barbell">
                                ${this.createColorInput('barbellColor', 'Color')}
                                ${this.createRangeInput('barbellOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('barbellMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('barbellRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Bumper Plates -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="bumper">
                                <span>Bumper Plates</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-bumper">
                                ${this.createColorInput('bumperColor', 'Color')}
                                ${this.createRangeInput('bumperOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('bumperMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('bumperRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Cable Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="cable">
                                <span>Cable Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-cable">
                                ${this.createColorInput('cableColor', 'Color')}
                                ${this.createRangeInput('cableOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('cableMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('cableRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Chrome Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="chrome">
                                <span>Chrome Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-chrome">
                                ${this.createColorInput('chromeColor', 'Color')}
                                ${this.createRangeInput('chromeOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('chromeMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('chromeRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Brand Color (COLOR1) -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="color1">
                                <span>Brand Color (COLOR1)</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-color1">
                                ${this.createColorInput('color1Color', 'Color')}
                                ${this.createRangeInput('color1Opacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('color1Metalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('color1Roughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Metal Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="metal">
                                <span>Metal Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-metal">
                                ${this.createColorInput('metalColor', 'Color')}
                                ${this.createRangeInput('metalOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('metalMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('metalRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Pad / Cushion -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="pad">
                                <span>Pad / Cushion</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-pad">
                                ${this.createColorInput('padColor', 'Color')}
                                ${this.createRangeInput('padOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('padMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('padRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Plastic Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="plastic">
                                <span>Plastic Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-plastic">
                                ${this.createColorInput('plasticColor', 'Color')}
                                ${this.createRangeInput('plasticOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('plasticMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('plasticRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

                        <!-- Rubber Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="rubber">
                                <span>Rubber Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-rubber">
                                ${this.createColorInput('rubberColor', 'Color')}
                                ${this.createRangeInput('rubberOpacity', 'Opacity', 0, 1, 0.01)}
                                ${this.createRangeInput('rubberMetalness', 'Metalness', 0, 1, 0.01)}
                                ${this.createRangeInput('rubberRoughness', 'Roughness', 0, 1, 0.01)}
                            </div>
                        </div>

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

        // Section toggles - ACCORDION behavior
        this.panel.querySelectorAll('.te-section-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent parent section from toggling when clicking nested
                
                const section = header.dataset.section;
                const content = this.panel.querySelector(`#section-${section}`);
                const icon = header.querySelector('.te-toggle-icon');
                const isNested = header.closest('.te-nested');
                
                // Check if THIS section is currently hidden
                const isHidden = window.getComputedStyle(content).display === 'none';
                
                if (isHidden) {
                    if (isNested) {
                        // Close only sibling nested sections (other materials)
                        const parentContent = header.closest('.te-section-content');
                        parentContent.querySelectorAll('.te-nested > .te-section-content').forEach(otherContent => {
                            if (otherContent !== content) {
                                otherContent.style.display = 'none';
                            }
                        });
                        parentContent.querySelectorAll('.te-nested .te-section-header .te-toggle-icon').forEach(otherIcon => {
                            if (otherIcon !== icon) {
                                otherIcon.textContent = '▶';
                            }
                        });
                    } else {
                        // Close ALL top-level sections (not nested ones)
                        const topLevelSections = this.panel.querySelectorAll('.te-content > .te-section > .te-section-content');
                        topLevelSections.forEach(otherContent => {
                            otherContent.style.display = 'none';
                        });
                        // Reset all top-level icons
                        const topLevelIcons = this.panel.querySelectorAll('.te-content > .te-section > .te-section-header .te-toggle-icon');
                        topLevelIcons.forEach(otherIcon => {
                            otherIcon.textContent = '▶';
                        });
                    }
                    
                    // Open clicked section
                    content.style.display = 'block';
                    icon.textContent = '▼';
                } else {
                    // Close clicked section
                    content.style.display = 'none';
                    icon.textContent = '▶';
                }
            });
        });

        // Preview toggle buttons
        this.panel.querySelectorAll('.te-preview-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const previewType = btn.dataset.preview;
                const isShowing = btn.classList.contains('active');
                
                if (previewType === 'player') {
                    // Try multiple selectors for the player
                    let player = document.querySelector('#animation-player');
                    if (!player) player = document.querySelector('.animation-player');
                    if (!player) player = document.querySelector('[class*="player"]');
                    if (!player) player = document.querySelector('.player-controls');
                    
                    console.log('[Theme Editor] Looking for player, found:', player);
                    
                    if (player) {
                        if (isShowing) {
                            player.style.cssText = '';
                            player.classList.remove('te-force-visible');
                            btn.textContent = 'Show Bottom Menu Preview';
                            btn.style.background = '#4CAF50';
                            btn.classList.remove('active');
                        } else {
                            // Remove any hide classes
                            player.classList.remove('hidden', 'hide', 'invisible', 'player-hidden');
                            
                            // Force all possible display overrides
                            player.style.cssText = `
                                display: flex !important;
                                opacity: 1 !important;
                                visibility: visible !important;
                                pointer-events: auto !important;
                                transform: translateY(0) !important;
                                transition: none !important;
                            `;
                            player.classList.add('te-force-visible');
                            btn.textContent = 'Hide Bottom Menu Preview';
                            btn.style.background = '#f44336';
                            btn.classList.add('active');
                            console.log('[Theme Editor] Player shown. Classes:', player.className, 'Style:', player.style.cssText);
                        }
                    } else {
                        console.warn('[Theme Editor] Player element not found! Available elements:', {
                            allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
                            allWithPlayer: Array.from(document.querySelectorAll('[class*="player"], [id*="player"]')).map(el => `${el.tagName}#${el.id}.${el.className}`)
                        });
                        btn.textContent = 'Player Not Found';
                        btn.style.background = '#ff9800';
                    }
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
                
                // Don't apply primary color live - wait for Save & Apply button
                if (key !== 'primaryColor') {
                    this.applySettingLive(key, value);
                }
            });
        });

        // Save button
        this.panel.querySelector('#te-save-btn').addEventListener('click', () => this.saveTheme());
        
        // Save & Apply button for Primary Color
        const savePrimaryBtn = this.panel.querySelector('.te-save-primary-btn');
        if (savePrimaryBtn) {
            savePrimaryBtn.addEventListener('click', () => {
                this.savePrimaryColor();
            });
        }

        // Reset Side Menus V2 to defaults
        const resetMenuV2Btn = this.panel.querySelector('#te-reset-menu-v2');
        if (resetMenuV2Btn) {
            resetMenuV2Btn.addEventListener('click', () => this.resetMenuV2Defaults());
            resetMenuV2Btn.addEventListener('mouseenter', () => {
                resetMenuV2Btn.style.background = 'rgba(255, 255, 255, 0.15)';
                resetMenuV2Btn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            });
            resetMenuV2Btn.addEventListener('mouseleave', () => {
                resetMenuV2Btn.style.background = 'rgba(255, 255, 255, 0.08)';
                resetMenuV2Btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });
        }
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
            console.log('Theme Editor: Updating player styling for', key, value);
            this.updatePlayerStyling();
        }
        
        // Menu styling
        if (key.startsWith('menu') || key.startsWith('thumbnail')) {
            console.log('Theme Editor: Updating menu styling for', key, value);
            this.updateMenuStyling();
        }
        
        // Hide/show info panel
        if (key === 'hideInfoPanel') {
            const rightMenu = document.querySelector('.thumbnail-grid-container-right');
            if (rightMenu) {
                rightMenu.style.display = value ? 'none' : '';
            }
        }
        
        // Show/hide screenshot button
        if (key === 'showScreenshotButton') {
            const screenshotBtn = document.querySelector('.screenshot-btn, #screenshot-btn');
            if (screenshotBtn) {
                screenshotBtn.style.display = value ? 'flex' : 'none';
            }
        }
        
        // Spinner color
        if (key === 'spinnerColor') {
            console.log('Theme Editor: Updating spinner color to', value);
            this.app.updateSpinnerColor(value);
        }
        
        // Primary color - no longer applied live, requires Save & Apply
        // (Removed to prevent real-time updates)
    }
    
    applyPrimaryColorToElements(color) {
        console.log('[ThemeEditor] Applying primary color to elements:', color);
        
        // Helper to convert hex to rgba
        const hexToRgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        
        // 1. Update Animation Player button background color and accent color via CSS injection
        // This overrides WordPress CSS with !important rules
        this.currentSettings.playerAccentColor = color;
        this.currentSettings.playerButtonColor = color;
        
        if (this.app.playerStyleParams) {
            this.app.playerStyleParams.scrubberColor = color;
            this.app.playerStyleParams.buttonColor = color;
        }
        
        // Create/update CSS style for animation player colors
        let playerColorStyle = document.getElementById('te-player-primary-color');
        if (!playerColorStyle) {
            playerColorStyle = document.createElement('style');
            playerColorStyle.id = 'te-player-primary-color';
            document.head.appendChild(playerColorStyle);
        }
        
        playerColorStyle.textContent = `
            /* Animation Player Button Background Color - from Primary Color */
            .animation-player .play-pause-btn,
            .animation-player .speed-btn,
            .animation-player .ar-btn,
            .animation-player .screenshot-btn,
            .animation-player .quality-btn {
                background-color: ${color} !important;
            }
            
            /* Animation Player Accent/Scrubber Color - from Primary Color */
            .animation-player .timeline-slider {
                accent-color: ${color} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-thumb {
                background-color: ${color} !important;
            }
            .animation-player .timeline-slider::-moz-range-thumb {
                background-color: ${color} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-runnable-track {
                background: linear-gradient(to right, ${color} var(--slider-progress, 0%), rgba(255,255,255,0.3) var(--slider-progress, 0%)) !important;
            }
        `;
        
        console.log('[ThemeEditor] Updated animation player colors via CSS');
        
        // 2. Update Spinner Color via CSS injection
        this.currentSettings.spinnerColor = color;
        
        let spinnerColorStyle = document.getElementById('te-spinner-primary-color');
        if (!spinnerColorStyle) {
            spinnerColorStyle = document.createElement('style');
            spinnerColorStyle.id = 'te-spinner-primary-color';
            document.head.appendChild(spinnerColorStyle);
        }
        
        spinnerColorStyle.textContent = `
            /* Spinner Color - from Primary Color */
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
            
            /* DOTS SPINNER */
            #model-loader .dots-loader span {
                background-color: ${color} !important;
            }
            
            /* PULSE SPINNER */
            #model-loader .pulse-loader {
                background-color: ${color} !important;
                box-shadow: 0 0 20px ${hexToRgba(color, 0.5)} !important;
            }
            
            /* RING SPINNER */
            #model-loader .ring-loader {
                border-color: ${hexToRgba(color, 0.2)} !important;
                border-top-color: ${color} !important;
            }
        `;
        
        console.log('[ThemeEditor] Updated spinner color via CSS');
        
        // 3. Update Directional Light Color
        if (this.app.lightingSystem && this.app.lightingSystem.directionalLight) {
            this.currentSettings.directionalColor = color;
            this.app.lightingSystem.directionalLight.color.set(color);
            console.log('[ThemeEditor] Updated directional light color');
        }
        
        // 4. Update the theme editor inputs to reflect these changes
        const spinnerInput = this.panel.querySelector('[data-setting="spinnerColor"]');
        if (spinnerInput) spinnerInput.value = color;
        
        const accentInput = this.panel.querySelector('[data-setting="playerAccentColor"]');
        if (accentInput) accentInput.value = color;
        
        const buttonInput = this.panel.querySelector('[data-setting="playerButtonColor"]');
        if (buttonInput) buttonInput.value = color;
        
        const lightInput = this.panel.querySelector('[data-setting="directionalColor"]');
        if (lightInput) lightInput.value = color;
        
        console.log('[ThemeEditor] Primary color applied to all elements');
    }
    
    savePrimaryColor() {
        const color = this.currentSettings.primaryColor;
        const btn = this.panel.querySelector('.te-save-primary-btn');
        
        if (!btn) return;
        
        // Apply color changes immediately to current session
        this.applyPrimaryColorToElements(color);
        
        // Update button to show saving state
        const originalText = btn.textContent;
        btn.textContent = 'Saving...';
        btn.disabled = true;
        
        // Prepare form data
        const formData = new FormData();
        formData.append('action', 'flexframe_save_primary_color');
        formData.append('nonce', this.nonce);
        formData.append('primary_color', color);
        
        // Send AJAX request
        fetch(this.ajaxUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                btn.textContent = 'Applying...';
                // Reload page with cache-busting to force fresh load
                setTimeout(() => {
                    window.location.href = window.location.href.split('?')[0] + '?t=' + Date.now();
                }, 500);
            } else {
                btn.textContent = 'Error!';
                btn.style.background = '#f44336';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#4CAF50';
                    btn.disabled = false;
                }, 2000);
                console.error('Failed to save primary color:', data);
            }
        })
        .catch(error => {
            btn.textContent = 'Error!';
            btn.style.background = '#f44336';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '#4CAF50';
                btn.disabled = false;
            }, 2000);
            console.error('Error saving primary color:', error);
        });
    }
    
    updatePrimaryColor(color) {
        // This function is no longer used for live updates
        // Primary color now requires Save & Apply to take effect
    }
    
    // Legacy function kept for backward compatibility
    updatePrimaryColorLegacy(color) {
        // Update global flexframeSettings
        if (window.flexframeSettings) {
            window.flexframeSettings.primaryColor = color;
        }
        
        // Update CSS custom properties
        document.documentElement.style.setProperty('--flexframe-primary-color', color);
        
        // Parse RGB values
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        document.documentElement.style.setProperty('--flexframe-primary-color-rgb', `${r}, ${g}, ${b}`);
        
        // Update progress bar color
        if (this.app.updateProgressBarColor) {
            this.app.updateProgressBarColor(color);
        }
        
        // Update spinner color to match primary color
        if (this.app.updateSpinnerColor) {
            this.app.updateSpinnerColor(color);
        }
        
        // Update menu glow colors if menu manager exists
        if (window.menuManager) {
            // Update glow settings for all menus
            if (window.menuManager.menus) {
                Object.values(window.menuManager.menus).forEach(menu => {
                    if (menu.settings) {
                        menu.settings.glowColor = color;
                    }
                });
            }
            // Update global glow settings
            if (window.menuManager.glowSettings) {
                window.menuManager.glowSettings.glowColor = color;
            }
        }
        
        // Update particle color to primary color
        if (this.app.particleSystem) {
            this.app.particleSystem.params.color = color;
            if (this.app.particleSystem.dustMaterial) {
                this.app.particleSystem.dustMaterial.color.set(color);
                this.app.particleSystem.dustMaterial.needsUpdate = true;
            }
        }
        
        // Inject CSS for elements that use primary color
        let styleEl = document.getElementById('te-primary-color-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'te-primary-color-style';
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = `
            /* Primary Color Overrides */
            :root {
                --flexframe-primary-color: ${color} !important;
                --flexframe-primary-color-rgb: ${r}, ${g}, ${b} !important;
                --ss-primary-color: ${color} !important;
            }
            
            /* Thumbnail glow effect */
            .thumbnail-item:hover img,
            .thumbnail-item.selected img {
                box-shadow: 0 0 20px ${color}, 0 0 40px ${color}80 !important;
            }
            
            /* Menu borders and accents */
            .thumbnail-dropdown,
            .thumbnail-dropdown-right {
                box-shadow: 0 0 20px ${color}40 !important;
                border-color: ${color} !important;
            }
            
            /* Menu toggle buttons hover */
            .thumbnail-menu-toggle:hover,
            .thumbnail-menu-toggle.active {
                background-color: ${color} !important;
                box-shadow: 0 0 15px ${color}80 !important;
            }
            
            /* Menu hint tabs */
            .menu-hint-tab,
            .menu-hint-tab-right {
                border-color: ${color} !important;
                background: linear-gradient(90deg, transparent, ${color}20) !important;
            }
            .menu-hint-tab:hover,
            .menu-hint-tab-right:hover {
                background: ${color}40 !important;
                box-shadow: 0 0 10px ${color}60 !important;
            }
            
            /* Loading spinner */
            .loading-spinner {
                border-top-color: ${color} !important;
            }
            
            /* Progress bar */
            .progress-bar-fill,
            #progress-bar-fill {
                background-color: ${color} !important;
            }
            
            /* AR button accents */
            .ar-cta-button {
                border-color: ${color} !important;
            }
            .ar-cta-icon path {
                fill: ${color} !important;
            }
        `;
        
        console.log('Theme Editor: Primary color applied', { color, r, g, b });
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
        if (!player) {
            console.log('Theme Editor: Player element not found');
            return;
        }
        
        const bgColor = this.currentSettings.playerBgColor;
        const bgOpacity = this.currentSettings.playerBgOpacity;
        const btnColor = this.currentSettings.playerButtonColor;
        const btnOpacity = this.currentSettings.playerButtonOpacity;
        const iconColor = this.currentSettings.playerIconColor;
        const accentColor = this.currentSettings.playerAccentColor;
        
        const bgRgba = this.hexToRgba(bgColor, bgOpacity);
        const btnRgba = this.hexToRgba(btnColor, btnOpacity);
        
        // Use injected CSS with !important to override WordPress styles
        let styleEl = document.getElementById('te-player-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'te-player-style';
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = `
            .animation-player {
                background-color: ${bgRgba} !important;
            }
            .animation-player .play-pause-btn,
            .animation-player .screenshot-btn,
            .animation-player .ar-btn,
            .animation-player .quality-btn,
            .animation-player .speed-btn,
            .animation-player .control-btn {
                background-color: ${btnRgba} !important;
            }
            .animation-player .play-pause-btn svg,
            .animation-player .screenshot-btn svg,
            .animation-player .ar-btn svg,
            .animation-player .quality-btn svg,
            .animation-player .speed-btn svg,
            .animation-player .control-btn svg {
                fill: ${iconColor} !important;
            }
            .animation-player .speed-btn span,
            .animation-player .ar-btn span,
            .animation-player .quality-btn span,
            .animation-player #quality-text,
            .animation-player #speed-text {
                color: ${iconColor} !important;
            }
            .animation-player .time-display,
            .animation-player .time-display span,
            .animation-player #current-time,
            .animation-player #total-time {
                color: ${iconColor} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-thumb {
                background: ${accentColor} !important;
            }
            .animation-player .timeline-slider::-moz-range-thumb {
                background: ${accentColor} !important;
            }
        `;
        
        console.log('Theme Editor: Player styles injected', { bgRgba, btnRgba, iconColor, accentColor });
    }

    updateMenuStyling() {
        // Use V2 settings (new system)
        const bgColor = this.currentSettings.menuV2BgColor || '#1a1a1a';
        const bgOpacity = this.currentSettings.menuV2BgOpacity ?? 0.95;
        const textColor = this.currentSettings.menuV2TextColor || '#ffffff';
        const textOpacity = this.currentSettings.menuV2TextOpacity ?? 1;
        const menuV2AccentColor = this.currentSettings.menuV2AccentColor;
        const accentColor = (menuV2AccentColor === 'USE_PRIMARY_COLOR' || !menuV2AccentColor) 
            ? (this.currentSettings.primaryColor || '#f50000')
            : menuV2AccentColor;
        const thumbnailLabelColor = this.currentSettings.menuV2ThumbnailLabelColor || '#ffffff';
        const thumbnailLabelOpacity = this.currentSettings.menuV2ThumbnailLabelOpacity ?? 0.9;
        const primaryColor = this.currentSettings.primaryColor || '#f50000';
        
        const bgRgba = this.hexToRgba(bgColor, bgOpacity);
        const textRgba = this.hexToRgba(textColor, textOpacity);
        const scrollBtnBg = this.hexToRgba(bgColor, Math.min(bgOpacity + 0.2, 1));
        const labelGradient = this.hexToRgba(thumbnailLabelColor, thumbnailLabelOpacity);
        const infoStepBg = this.hexToRgba(primaryColor, 0.35);
        const infoStepHoverBg = this.hexToRgba(primaryColor, 0.5);
        
        // Use injected CSS with !important to override WordPress styles
        // Match WordPress specificity with #flexframe-viewer-container
        let styleEl = document.getElementById('te-menu-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'te-menu-style';
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = `
            /* Left Menu - Match WordPress structure */
            /* Keep main container transparent */
            #flexframe-viewer-container .thumbnail-grid-container,
            .thumbnail-grid-container {
                background-color: transparent !important;
            }
            
            /* Apply background to ALL dropdowns by ID (high specificity to override PHP) */
            #flexframe-viewer-container #searchDropdown,
            #flexframe-viewer-container #exercisesDropdown,
            #flexframe-viewer-container #musclesDropdown,
            #flexframe-viewer-container #equipmentDropdown,
            #searchDropdown.thumbnail-dropdown,
            #exercisesDropdown.thumbnail-dropdown,
            #musclesDropdown.thumbnail-dropdown,
            #equipmentDropdown.thumbnail-dropdown,
            #flexframe-viewer-container .thumbnail-dropdown,
            .thumbnail-dropdown,
            .exercise-menu,
            .menu-panel,
            .side-menu {
                background-color: ${bgRgba} !important;
                backdrop-filter: blur(20px) !important;
            }
            
            /* ALL dropdown borders + box-shadow by ID (accent color) */
            #flexframe-viewer-container #searchDropdown,
            #flexframe-viewer-container #exercisesDropdown,
            #flexframe-viewer-container #musclesDropdown,
            #flexframe-viewer-container #equipmentDropdown,
            #searchDropdown.thumbnail-dropdown,
            #exercisesDropdown.thumbnail-dropdown,
            #musclesDropdown.thumbnail-dropdown,
            #equipmentDropdown.thumbnail-dropdown,
            #flexframe-viewer-container .thumbnail-dropdown,
            .thumbnail-dropdown {
                border: 2px solid ${accentColor} !important;
                box-shadow: 0 0 20px ${accentColor}66, 0 0 40px ${accentColor}33 !important;
            }
            
            /* Search dropdown .show state - ensure border stays */
            #flexframe-viewer-container #searchDropdown.show,
            #searchDropdown.thumbnail-dropdown.show {
                border-color: ${accentColor} !important;
                box-shadow: 0 0 20px ${accentColor}66, 0 0 40px ${accentColor}33 !important;
            }
            
            /* Search toggle button - accent border + box-shadow */
            #flexframe-viewer-container #searchToggle,
            button.thumbnail-menu-toggle#searchToggle {
                background-color: ${this.hexToRgba(bgColor, 0.5)} !important;
                border: 2px solid ${accentColor} !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px ${accentColor}4d !important;
            }
            #flexframe-viewer-container #searchToggle:hover {
                background-color: ${this.hexToRgba(bgColor, 0.65)} !important;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px ${accentColor}80 !important;
            }
            #flexframe-viewer-container #searchToggle svg {
                fill: ${textColor} !important;
                opacity: ${textOpacity} !important;
            }
            
            /* Menu toggle buttons */
            #flexframe-viewer-container .thumbnail-menu-toggle,
            .thumbnail-grid-container .thumbnail-menu-toggle,
            button.thumbnail-menu-toggle,
            .thumbnail-menu-toggle {
                background-color: ${bgRgba} !important;
                color: ${textRgba} !important;
            }
            
            /* Toggle button text and icons */
            #flexframe-viewer-container .thumbnail-menu-toggle span,
            .thumbnail-menu-toggle span {
                color: ${textRgba} !important;
            }
            #flexframe-viewer-container .thumbnail-menu-toggle svg,
            .thumbnail-menu-toggle svg {
                fill: ${textColor} !important;
                opacity: ${textOpacity} !important;
            }
            
            /* All menu content text */
            .thumbnail-grid-container *,
            .thumbnail-dropdown *,
            .exercise-menu *,
            .menu-panel * {
                color: ${textRgba} !important;
            }
            
            /* Thumbnail items */
            .thumbnail-item {
                color: ${textRgba} !important;
            }
            .thumbnail-label {
                color: ${textRgba} !important;
                background: linear-gradient(to top, ${labelGradient}, transparent) !important;
            }
            
            /* Right Menu */
            #flexframe-viewer-container .thumbnail-grid-container-right,
            .thumbnail-grid-container-right {
                background-color: transparent !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right,
            .thumbnail-dropdown-right {
                background-color: ${bgRgba} !important;
                border: 2px solid ${accentColor} !important;
            }
            .thumbnail-grid-container-right *,
            .thumbnail-dropdown-right * {
                color: ${textRgba} !important;
            }
            /* Info Step Items - use PRIMARY COLOR with 35% opacity and 50px blur */
            #flexframe-viewer-container .info-step-item,
            .thumbnail-dropdown-right .info-step-item,
            .info-step-item {
                background: ${infoStepBg} !important;
                backdrop-filter: blur(50px) !important;
                -webkit-backdrop-filter: blur(50px) !important;
                color: ${textRgba} !important;
            }
            .info-step-title {
                color: ${textRgba} !important;
            }
            .info-step-text {
                color: ${textRgba} !important;
            }
            
            /* Scroll buttons */
            .scroll-btn {
                background-color: ${scrollBtnBg} !important;
                color: ${textRgba} !important;
            }
            .scroll-btn svg {
                fill: ${textColor} !important;
                opacity: ${textOpacity} !important;
            }
            
            /* Hover states */
            #flexframe-viewer-container .thumbnail-menu-toggle:hover,
            #flexframe-viewer-container .thumbnail-menu-toggle.active,
            .thumbnail-menu-toggle:hover,
            .thumbnail-menu-toggle.active,
            .thumbnail-item:hover { 
                background-color: ${accentColor} !important; 
            }
            #flexframe-viewer-container .info-step-item:hover,
            .thumbnail-dropdown-right .info-step-item:hover,
            .info-step-item:hover {
                background: ${infoStepHoverBg} !important;
                border-color: ${accentColor} !important;
            }
            
            /* Menu hint tabs */
            #flexframe-viewer-container .menu-hint-tab,
            .menu-hint-tab,
            .menu-hint-tab-right {
                background-color: ${bgRgba} !important;
                border-color: ${accentColor} !important;
            }
            
            /* Search Input - use menu background color */
            #flexframe-viewer-container .search-input,
            #flexframe-viewer-container input.search-input,
            #flexframe-viewer-container #searchInput,
            .thumbnail-dropdown .search-input,
            .search-header .search-input {
                background-color: ${bgRgba} !important;
                color: ${textRgba} !important;
                border-color: ${accentColor}66 !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container #searchInput:focus,
            .thumbnail-dropdown .search-input:focus {
                background-color: ${bgRgba} !important;
                border-color: ${accentColor} !important;
            }
            #flexframe-viewer-container .search-input::placeholder,
            #flexframe-viewer-container #searchInput::placeholder {
                color: ${textRgba} !important;
                opacity: 0.6 !important;
            }
            
            /* Search Header - use menu background color */
            #flexframe-viewer-container .search-header,
            #flexframe-viewer-container #searchDropdown .search-header,
            .thumbnail-dropdown .search-header {
                background: linear-gradient(180deg, ${this.hexToRgba(bgColor, Math.min(bgOpacity + 0.1, 1))}, ${bgRgba}) !important;
                border-bottom-color: ${accentColor}66 !important;
            }
            
            /* Search action button */
            #flexframe-viewer-container .search-action-btn,
            .thumbnail-dropdown .search-action-btn {
                background-color: ${accentColor}33 !important;
                color: ${accentColor} !important;
            }
            #flexframe-viewer-container .search-action-btn:hover,
            .thumbnail-dropdown .search-action-btn:hover {
                background-color: ${accentColor}66 !important;
            }
            
            /* Search suggestions dropdown */
            #flexframe-viewer-container .search-suggestions,
            .thumbnail-dropdown .search-suggestions {
                background-color: ${bgRgba} !important;
                border-color: ${accentColor}66 !important;
            }
            .search-suggestion-item:hover {
                background-color: ${accentColor}33 !important;
            }
            
            /* Filter chips and tags - accent color */
            #flexframe-viewer-container .filter-chip,
            #flexframe-viewer-container .filter-tag,
            .filter-chip.active,
            .filter-tag.active {
                border-color: ${accentColor} !important;
            }
        `;
        
        console.log('Theme Editor: Menu styles injected', { bgRgba, textRgba, accentColor, labelGradient });
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
        
        console.log('[Theme Editor] Current settings at save:', this.currentSettings);
        
        // Format settings for WordPress
        const presetData = {
            // Primary Color (Step 1)
            primary_color: this.currentSettings.primaryColor,
            primary_color_mode: 'custom', // Always custom when saving from Theme Editor
            
            // UI Settings
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
            menu_text_opacity: this.currentSettings.menuTextOpacity,
            menu_accent_color: this.currentSettings.menuAccentColor,
            thumbnail_label_color: this.currentSettings.thumbnailLabelColor,
            thumbnail_label_opacity: this.currentSettings.thumbnailLabelOpacity,
            menu_v2_bg_color: this.currentSettings.menuV2BgColor,
            menu_v2_bg_opacity: this.currentSettings.menuV2BgOpacity,
            menu_v2_text_color: this.currentSettings.menuV2TextColor,
            menu_v2_text_opacity: this.currentSettings.menuV2TextOpacity,
            menu_v2_accent_color: this.currentSettings.menuV2AccentColor,
            menu_v2_thumbnail_label_color: this.currentSettings.menuV2ThumbnailLabelColor,
            menu_v2_thumbnail_label_opacity: this.currentSettings.menuV2ThumbnailLabelOpacity,
            hide_right_menu: this.currentSettings.hideInfoPanel,
            show_screenshot_button: this.currentSettings.showScreenshotButton,
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

        console.log('[Theme Editor] Saving theme with primary_color:', presetData.primary_color, 'mode:', presetData.primary_color_mode);

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
                opacity: 0;
                transform: translateX(100%);
                transition: opacity 0.3s ease, transform 0.3s ease;
                box-shadow: -5px 0 30px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
            }
            
            #theme-editor-panel.hidden {
                display: none;
            }
            
            .te-header {
                padding: 16px 20px;
                background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                flex-shrink: 0;
            }
            
            .te-header-top {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }
            
            .te-header-top h2 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                flex: 1;
            }
            
            .te-save-section {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            
            .te-save-section input {
                flex: 1;
                padding: 10px 14px;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                background: rgba(255,255,255,0.1);
                color: #fff;
                font-size: 13px;
                outline: none;
            }
            
            .te-save-section input:focus {
                border-color: #e94560;
            }
            
            .te-save-section input::placeholder {
                color: rgba(255,255,255,0.4);
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
                overflow-x: hidden;
                padding: 10px;
                padding-bottom: 80px;
                scroll-behavior: smooth;
            }
            
            /* Custom scrollbar for theme editor */
            .te-content::-webkit-scrollbar {
                width: 8px;
            }
            
            .te-content::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.2);
            }
            
            .te-content::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.3);
                border-radius: 4px;
            }
            
            .te-content::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.5);
            }
            
            .te-section {
                margin-bottom: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                overflow: hidden;
            }
            
            /* Nested sections inside parent */
            .te-section .te-section.te-nested {
                margin: 8px 0 0 0;
                background: rgba(0,0,0,0.2);
                border-radius: 6px;
            }
            
            .te-section .te-section.te-nested:first-child {
                margin-top: 0;
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
            
            .te-nested .te-section-header {
                padding: 10px 14px;
                background: rgba(255,255,255,0.05);
                font-size: 13px;
            }
            
            .te-section-header:hover {
                background: rgba(255,255,255,0.12);
            }
            
            .te-nested .te-section-header:hover {
                background: rgba(255,255,255,0.08);
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
            
            /* Primary color section - always open by default */
            .te-section-content.te-section-open {
                display: block;
            }
            
            .te-primary-section {
                background: linear-gradient(135deg, rgba(74, 158, 255, 0.15) 0%, rgba(74, 158, 255, 0.05) 100%);
                border: 1px solid rgba(74, 158, 255, 0.3);
            }
            
            .te-primary-section .te-section-header {
                background: rgba(74, 158, 255, 0.2);
            }
            
            .te-section-desc {
                font-size: 11px;
                color: rgba(255,255,255,0.6);
                margin: 0 0 12px 0;
                line-height: 1.4;
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
                background: transparent;
            }
            
            .te-color-input::-webkit-color-swatch {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            .te-color-input::-moz-color-swatch {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            /* Primary color input styling */
            #te-primaryColor {
                width: 60px;
                height: 32px;
                border: 2px solid rgba(74, 158, 255, 0.5);
                border-radius: 6px;
                cursor: pointer;
                padding: 0;
                background: #1a1a1a;
            }
            
            #te-primaryColor::-webkit-color-swatch-wrapper {
                padding: 3px;
                background: transparent;
            }
            
            #te-primaryColor::-webkit-color-swatch {
                border: none;
                border-radius: 4px;
            }
            
            #te-primaryColor::-moz-color-swatch {
                border: none;
                border-radius: 4px;
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
