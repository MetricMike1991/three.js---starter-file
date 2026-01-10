/**
 * Right Side Menu System
 * Handles 4 information menus on the right side
 */

class RightMenuDropdown {
    constructor(menuType) {
        this.menuType = menuType;
        this.isOpen = false;
        this.scrollAmount = 200;
        this.infoData = []; // Store information items
        this.selectedExercise = null; // Store selected exercise
        
        // Style settings (shared across all menus)
        this.settings = {
            widthPercentage: 90,
            backgroundColor: '#000000',
            backgroundOpacity: 0.9,
            borderRadius: 12,
            keepOpen: false,
            glowColor: '#4a9eff',
            glowIntensity: 0.6,
            glowSize: 20
        };
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadInfoData();
        this.listenForExerciseSelection();
    }
    
    initializeElements() {
        this.toggleBtn = document.getElementById(`${this.menuType}Toggle`);
        this.dropdown = document.querySelector(`.thumbnail-dropdown-right#${this.menuType}Dropdown`);
        this.scrollContainer = document.getElementById(`${this.menuType}Container`);
        this.grid = document.getElementById(`${this.menuType}Grid`);
        this.scrollUpBtn = document.getElementById(`${this.menuType}ScrollUp`);
        this.scrollDownBtn = document.getElementById(`${this.menuType}ScrollDown`);
        this.titleElement = document.getElementById(`${this.menuType}Title`);

        if (!this.toggleBtn || !this.dropdown) {
            console.error(`Failed to initialize ${this.menuType} menu elements`);
        }
    }

    async loadInfoData() {
        try {
            const response = await fetch('./data/right-menu-info.json');
            const allData = await response.json();
            
            // Get data for this specific menu
            if (allData[this.menuType]) {
                this.infoData = allData[this.menuType].items || [];
                this.renderInfoItems();
            } else {
                console.warn(`No data found for ${this.menuType}`);
                this.infoData = [];
            }
        } catch (error) {
            console.error('Error loading right menu info data:', error);
            this.infoData = [];
        }
    }

    renderInfoItems() {
        if (!this.grid) return;

        this.grid.innerHTML = '';
        
        if (this.infoData.length === 0) {
            this.grid.innerHTML = '<div class="info-step-empty">No information available.</div>';
            return;
        }

        this.infoData.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'info-step-item';
            itemDiv.innerHTML = `
                <div class="info-step-title">${item.name}</div>
                <div class="info-step-text">${item.text || ''}</div>
            `;
            this.grid.appendChild(itemDiv);
        });
    }

    setupEventListeners() {
        if (!this.toggleBtn) return;

        // Toggle menu
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Scroll buttons
        if (this.scrollUpBtn && this.scrollDownBtn) {
            this.scrollUpBtn.addEventListener('click', () => {
                this.scrollContainer.scrollBy({ top: -this.scrollAmount, behavior: 'smooth' });
            });

            this.scrollDownBtn.addEventListener('click', () => {
                this.scrollContainer.scrollBy({ top: this.scrollAmount, behavior: 'smooth' });
            });
        }
    }

    listenForExerciseSelection() {
        // Listen for exercise selection events
        document.addEventListener('exercisesSelected', (e) => {
            if (e.detail && e.detail.item) {
                this.selectedExercise = e.detail.item;
                this.updateTitle();
            }
        });
    }

    updateTitle() {
        if (this.titleElement) {
            if (this.selectedExercise) {
                this.titleElement.textContent = this.selectedExercise.name;
            } else {
                this.titleElement.textContent = 'Select an Exercise';
            }
        }
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        // Close other menus first
        document.dispatchEvent(new CustomEvent('closeAllRightMenus', { 
            detail: { except: this.menuType } 
        }));

        this.dropdown.classList.add('show');
        this.toggleBtn.classList.add('active');
        this.isOpen = true;

        // Update container state
        const container = document.querySelector('.thumbnail-grid-container-right');
        if (container) {
            container.classList.add('menu-active');
        }
    }

    closeMenu() {
        this.dropdown.classList.remove('show');
        this.toggleBtn.classList.remove('active');
        this.isOpen = false;

        // Check if any other menus are still open
        const container = document.querySelector('.thumbnail-grid-container-right');
        if (container) {
            const anyMenuOpen = document.querySelectorAll('.thumbnail-dropdown-right.show').length > 0;
            if (!anyMenuOpen) {
                container.classList.remove('menu-active');
            }
        }
    }

    updateStyles() {
        if (!this.dropdown) return;

        const width = `${this.settings.widthPercentage}%`;
        const bgColor = this.settings.backgroundColor;
        const opacity = this.settings.backgroundOpacity;
        const borderRadius = `${this.settings.borderRadius}px`;

        this.dropdown.style.width = width;
        this.dropdown.style.maxWidth = width;
        this.dropdown.style.backgroundColor = `${bgColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        this.dropdown.style.borderRadius = borderRadius;
    }

    getSettings() {
        return { ...this.settings };
    }

    applySettings(settings) {
        this.settings = { ...this.settings, ...settings };
        this.updateStyles();
    }
}

class RightMenuSystem {
    constructor() {
        this.menus = {};
        this.settings = {
            widthPercentage: 90,
            backgroundColor: '#000000',
            backgroundOpacity: 0.9,
            borderRadius: 12,
            keepOpen: false,
            glowColor: '#4a9eff',
            glowIntensity: 0.6,
            glowSize: 20
        };
        
        this.initializeMenus();
        this.setupGlobalListeners();
    }
    
    initializeMenus() {
        // Create all menu instances
        this.menus.info1 = new RightMenuDropdown('info1');
        this.menus.info2 = new RightMenuDropdown('info2');
        this.menus.info3 = new RightMenuDropdown('info3');
        this.menus.info4 = new RightMenuDropdown('info4');
    }
    
    setupGlobalListeners() {
        // Listen for close all menus event
        document.addEventListener('closeAllRightMenus', (e) => {
            const exceptMenu = e.detail?.except;
            Object.entries(this.menus).forEach(([type, menu]) => {
                if (type !== exceptMenu) {
                    menu.closeMenu();
                }
            });
        });
        
        // Handle menu slide-out visibility
        const menuContainer = document.querySelector('.thumbnail-grid-container-right');
        if (menuContainer) {
            // Show menu on hover and keep it visible
            menuContainer.addEventListener('mouseenter', () => {
                menuContainer.classList.add('menu-visible');
            });
            
            // Make hint tab clickable to toggle menu
            const hintTab = menuContainer.querySelector('.menu-hint-tab-right');
            if (hintTab) {
                hintTab.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    
                    // Toggle menu visibility
                    if (menuContainer.classList.contains('menu-visible') || 
                        menuContainer.classList.contains('menu-active')) {
                        // Close all menus and hide the menu container
                        Object.values(this.menus).forEach(menu => {
                            if (menu.isOpen) {
                                menu.closeMenu();
                            }
                        });
                        menuContainer.classList.remove('menu-visible');
                    } else {
                        // Show menu
                        menuContainer.classList.add('menu-visible');
                    }
                });
            }
        }
        
        // Close menus when clicking outside the menu area
        document.addEventListener('click', (e) => {
            if (menuContainer && !menuContainer.contains(e.target)) {
                // Remove menu visibility and close all open menus
                menuContainer.classList.remove('menu-visible');
                
                // Check if any menu is currently open
                const anyMenuOpen = Object.values(this.menus).some(menu => menu.isOpen);
                if (anyMenuOpen) {
                    // Close all open menus
                    Object.values(this.menus).forEach(menu => {
                        if (menu.isOpen) {
                            menu.closeMenu();
                        }
                    });
                }
            }
        });
    }
    
    // Global settings management
    updateAllSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        Object.values(this.menus).forEach(menu => {
            menu.applySettings(this.settings);
        });
    }

    getSettings() {
        return { ...this.settings };
    }

    // Copy settings to clipboard
    copySettingsToClipboard() {
        const settingsString = JSON.stringify(this.settings, null, 2);
        navigator.clipboard.writeText(settingsString).then(() => {
            console.log('Right menu settings copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy settings:', err);
        });
    }
    
    // Show/hide specific number of tabs
    setVisibleTabCount(count) {
        const menuWrappers = document.querySelectorAll('.thumbnail-grid-container-right .thumbnail-menu-wrapper');
        menuWrappers.forEach((wrapper, index) => {
            if (index < count) {
                wrapper.style.display = 'block';
            } else {
                wrapper.style.display = 'none';
                // Close the menu if it was open
                const menuType = ['info1', 'info2', 'info3', 'info4'][index];
                if (this.menus[menuType] && this.menus[menuType].isOpen) {
                    this.menus[menuType].closeMenu();
                }
            }
        });
    }
    
    // Toggle right menu visibility
    setMenuVisibility(visible) {
        const menuContainer = document.querySelector('.thumbnail-grid-container-right');
        if (menuContainer) {
            if (visible) {
                menuContainer.classList.remove('hidden');
            } else {
                menuContainer.classList.add('hidden');
                // Close all menus when hiding
                Object.values(this.menus).forEach(menu => {
                    if (menu.isOpen) {
                        menu.closeMenu();
                    }
                });
            }
        }
    }
}

// Settings Panel Controller
class RightMenuSettingsController {
    constructor(rightMenuSystem) {
        this.rightMenuSystem = rightMenuSystem;
        this.isOpen = false;
        this.visibleTabCount = 4;
        this.menuVisible = true;
        
        this.initializeElements();
        this.setupEventListeners();
    }
    
    initializeElements() {
        this.settingsToggle = document.getElementById('rightMenuSettingsToggle');
        this.settingsContent = document.getElementById('rightMenuSettingsContent');
        this.tabCountButtons = document.querySelectorAll('.tab-count-btn');
        this.hideMenuToggle = document.getElementById('hideRightMenuToggle');
        this.exportButton = document.getElementById('exportRightMenuSettings');
    }
    
    setupEventListeners() {
        // Toggle settings panel
        this.settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettings();
        });
        
        // Close settings when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.querySelector('.right-menu-settings-panel');
            if (this.isOpen && panel && !panel.contains(e.target)) {
                this.closeSettings();
            }
        });
        
        // Tab count buttons
        this.tabCountButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const count = parseInt(btn.dataset.count);
                this.setTabCount(count);
            });
        });
        
        // Hide/show menu toggle
        this.hideMenuToggle.addEventListener('change', (e) => {
            this.menuVisible = e.target.checked;
            this.rightMenuSystem.setMenuVisibility(this.menuVisible);
        });
        
        // Export settings
        this.exportButton.addEventListener('click', () => {
            this.exportSettings();
        });
    }
    
    toggleSettings() {
        if (this.isOpen) {
            this.closeSettings();
        } else {
            this.openSettings();
        }
    }
    
    openSettings() {
        this.isOpen = true;
        this.settingsContent.classList.add('show');
        this.settingsToggle.classList.add('active');
    }
    
    closeSettings() {
        this.isOpen = false;
        this.settingsContent.classList.remove('show');
        this.settingsToggle.classList.remove('active');
    }
    
    setTabCount(count) {
        this.visibleTabCount = count;
        
        // Update button active state
        this.tabCountButtons.forEach(btn => {
            if (parseInt(btn.dataset.count) === count) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update visible tabs
        this.rightMenuSystem.setVisibleTabCount(count);
    }
    
    exportSettings() {
        const settings = {
            visibleTabCount: this.visibleTabCount,
            menuVisible: this.menuVisible,
            menuSettings: this.rightMenuSystem.getSettings()
        };
        
        const settingsString = JSON.stringify(settings, null, 2);
        
        // Copy to clipboard
        navigator.clipboard.writeText(settingsString).then(() => {
            // Visual feedback
            const originalText = this.exportButton.innerHTML;
            this.exportButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Copied!
            `;
            
            setTimeout(() => {
                this.exportButton.innerHTML = originalText;
            }, 2000);
            
            console.log('Right menu settings exported:', settings);
        }).catch(err => {
            console.error('Failed to export settings:', err);
            alert('Failed to copy settings to clipboard');
        });
    }
}

export { RightMenuSystem, RightMenuSettingsController };