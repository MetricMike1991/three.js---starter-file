/**
 * Right Side Menu System
 * Handles 4 information menus on the right side
 */

import { getAssetUrl } from '../main.js';

class RightMenuDropdown {
    constructor(menuType) {
        this.menuType = menuType;
        this.isOpen = false;
        this.scrollAmount = 200;
        this.infoData = []; // Store information items
        
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
    }
    
    initializeElements() {
        this.toggleBtn = document.getElementById(`${this.menuType}Toggle`);
        this.dropdown = document.querySelector(`.thumbnail-dropdown-right#${this.menuType}Dropdown`);
        this.scrollContainer = document.getElementById(`${this.menuType}Container`);
        this.grid = document.getElementById(`${this.menuType}Grid`);
        this.scrollUpBtn = document.getElementById(`${this.menuType}ScrollUp`);
        this.scrollDownBtn = document.getElementById(`${this.menuType}ScrollDown`);

        if (!this.toggleBtn || !this.dropdown) {
            console.error(`Failed to initialize ${this.menuType} menu elements`);
        }
    }

    async loadInfoData() {
        try {
            const response = await fetch(getAssetUrl('data/right-menu-info.json'));
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

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        // Close other right menus first
        document.dispatchEvent(new CustomEvent('closeAllRightMenus', { 
            detail: { except: this.menuType } 
        }));
        
        // Close all left menus when right menu opens
        document.dispatchEvent(new CustomEvent('closeAllThumbnailMenus', { 
            detail: { except: null } 
        }));
        
        // Hide the entire left menu container
        const leftMenuContainer = document.querySelector('.thumbnail-grid-container');
        if (leftMenuContainer) {
            leftMenuContainer.classList.remove('menu-visible', 'menu-active');
        }

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
    
    updateTitle(newTitle) {
        // Update the toggle button text
        if (this.toggleBtn) {
            this.toggleBtn.textContent = newTitle;
        }
    }
    
    updateContent(sections) {
        // Update grid with new content sections
        if (!this.grid) return;
        
        this.grid.innerHTML = '';
        
        if (!sections || sections.length === 0) {
            this.grid.innerHTML = '<div class="info-step-empty">No information available.</div>';
            return;
        }
        
        sections.forEach(section => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'info-step-item';
            itemDiv.innerHTML = `
                <div class="info-step-title">${section.heading || ''}</div>
                <div class="info-step-text">${section.content || ''}</div>
            `;
            this.grid.appendChild(itemDiv);
        });
    }
}

export class RightMenuSystem {
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
        // Create desktop menu instances (4 separate menus)
        this.menus.info1 = new RightMenuDropdown('info1');
        this.menus.info2 = new RightMenuDropdown('info2');
        this.menus.info3 = new RightMenuDropdown('info3');
        this.menus.info4 = new RightMenuDropdown('info4');
        
        // Create mobile consolidated menu instance
        this.menus.info = new RightMenuDropdown('info');
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
                
                // Hide the left menu container when right menu becomes visible
                const leftMenuContainer = document.querySelector('.thumbnail-grid-container');
                if (leftMenuContainer) {
                    leftMenuContainer.classList.remove('menu-visible', 'menu-active');
                    // Also close any open left menus
                    document.dispatchEvent(new CustomEvent('closeAllThumbnailMenus', { 
                        detail: { except: null } 
                    }));
                }
            });
            
            // Make hint tab clickable to toggle menu
            const hintTab = menuContainer.querySelector('.menu-hint-tab-right');
            if (hintTab) {
                hintTab.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    this.toggleRightMenu();
                });
            }
            
            // Create mobile toggle button
            this.createMobileToggleButton(menuContainer);
        }
        
        // Close menus when clicking outside the menu area
        document.addEventListener('click', (e) => {
            // Don't close if clicking on mobile toggle
            if (e.target.closest('.mobile-menu-toggle')) return;
            
            if (menuContainer && !menuContainer.contains(e.target)) {
                // Remove menu visibility and close all open menus
                menuContainer.classList.remove('menu-visible');
                
                // On mobile, also update toggle icon
                if (window.innerWidth <= 768) {
                    menuContainer.classList.remove('mobile-open');
                    menuContainer.style.right = '-130px';
                    this.updateMobileToggleIcon(false);
                }
                
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
    
    // Update menu content from exercise config
    updateFromConfig(configTabs) {
        console.log('Updating consolidated right menu from config:', configTabs);
        
        // Consolidate all sections from all tabs into one menu
        const consolidatedSections = [];
        
        // Order: Exercise Information, How To Guide, Exercise Tips, Alternative Exercises
        const tabOrder = [
            { key: 'exerciseInformation', title: 'Exercise Information' },
            { key: 'howToGuide', title: 'How To Guide' },
            { key: 'setupGuide', title: 'Exercise Tips' },
            { key: 'alternativeExercises', title: 'Alternative Exercises' }
        ];
        
        tabOrder.forEach(({ key, title }) => {
            const tabData = configTabs[key];
            if (tabData && tabData.sections && Array.isArray(tabData.sections)) {
                // Add a title section to separate different categories
                consolidatedSections.push({
                    title: tabData.title || title,
                    type: 'header',
                    content: ''
                });
                // Add all sections from this tab
                consolidatedSections.push(...tabData.sections);
            }
        });
        
        // Update the single consolidated menu
        if (this.menus.info) {
            this.menus.info.updateTitle('Exercise Info');
            this.menus.info.updateContent(consolidatedSections);
        }
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

    // Mobile toggle methods
    createMobileToggleButton(menuContainer) {
        // Mobile toggle buttons removed - menus accessed via top menu buttons
    }

    updateMobileToggleVisibility() {
        // Mobile toggle buttons removed
    }

    toggleRightMenu() {
        const menuContainer = document.querySelector('.thumbnail-grid-container-right');
        if (!menuContainer) return;
        
        const isOpen = menuContainer.classList.contains('mobile-open');
        
        if (isOpen) {
            // Close menu
            menuContainer.classList.remove('mobile-open');
            menuContainer.classList.remove('menu-visible');
            menuContainer.style.right = '-130px';
            this.updateMobileToggleIcon(false);
            
            // Close all submenus
            Object.values(this.menus).forEach(menu => {
                if (menu.isOpen) {
                    menu.closeMenu();
                }
            });
        } else {
            // Close left menu first
            const leftMenu = document.querySelector('.thumbnail-grid-container');
            if (leftMenu && leftMenu.classList.contains('mobile-open')) {
                leftMenu.classList.remove('mobile-open');
                leftMenu.style.left = '-130px';
                // Update left toggle icon
                const leftToggle = document.querySelector('.mobile-menu-toggle.left-toggle');
                if (leftToggle) leftToggle.innerHTML = '◀';
            }
            
            // Open right menu
            menuContainer.classList.add('mobile-open');
            menuContainer.classList.add('menu-visible');
            menuContainer.style.right = '0px';
            this.updateMobileToggleIcon(true);
        }
    }

    updateMobileToggleIcon(isOpen) {
        if (this.mobileToggleButton) {
            this.mobileToggleButton.innerHTML = isOpen ? '✕' : '▶';
        }
    }
}
