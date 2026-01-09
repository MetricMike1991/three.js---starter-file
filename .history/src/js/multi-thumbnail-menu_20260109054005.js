/**
 * Multi-Thumbnail Menu System
 * Handles 4 separate dropdown menus: Exercises, Muscles, Equipment, Information
 */

class ThumbnailDropdownMenu {
    constructor(menuType) {
        this.menuType = menuType;
        this.isOpen = false;
        this.thumbnails = [];
        this.scrollAmount = 200;
        
        // Momentum scrolling properties
        this.scrollVelocity = 0;
        this.scrollDecay = 0.90;
        this.maxVelocity = 35;
        this.isScrolling = false;
        
        // Drag scrolling properties
        this.isDragging = false;
        this.startY = 0;
        this.startScrollTop = 0;
        this.lastY = 0;
        this.lastTime = 0;
        this.velocityTracker = [];
        this.recentlyDragged = false;
        
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
        this.generateThumbnails();
        this.setupEventListeners();
        
        // Apply initial styles
        setTimeout(() => {
            this.updateStyles();
            this.updateGlowStyles();
            this.updateThumbnailGlowStyles();
        }, 100);
    }
    
    initializeElements() {
        this.toggleBtn = document.getElementById(`${this.menuType}Toggle`);
        this.dropdown = document.getElementById(`${this.menuType}Dropdown`);
        this.scrollContainer = document.getElementById(`${this.menuType}Container`);
        this.thumbnailGrid = document.getElementById(`${this.menuType}Grid`);
        this.scrollUpBtn = document.getElementById(`${this.menuType}ScrollUp`);
        this.scrollDownBtn = document.getElementById(`${this.menuType}ScrollDown`);
    }
    
    generateThumbnails() {
        this.thumbnails = [];
        
        switch (this.menuType) {
            case 'exercises':
                for (let i = 1; i <= 20; i++) {
                    this.thumbnails.push({
                        id: i,
                        name: `Exercise ${i}`,
                        image: `https://picsum.photos/200/200?random=${i}`
                    });
                }
                break;
                
            case 'muscles':
                const muscles = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core', 'Quads', 'Hamstrings', 'Glutes', 'Calves'];
                muscles.forEach((muscle, i) => {
                    this.thumbnails.push({
                        id: i + 1,
                        name: muscle,
                        image: `https://picsum.photos/200/200?random=${i + 100}`
                    });
                });
                break;
                
            case 'equipment':
                const equipment = ['Dumbbells', 'Barbell', 'Resistance Bands', 'Kettlebell', 'Cable Machine', 'Pull-up Bar', 'Medicine Ball', 'Foam Roller'];
                equipment.forEach((item, i) => {
                    this.thumbnails.push({
                        id: i + 1,
                        name: item,
                        image: `https://picsum.photos/200/200?random=${i + 200}`
                    });
                });
                break;
                
            case 'information':
                const info = ['Nutrition Tips', 'Form Guide', 'Recovery', 'Warm-up', 'Cool-down', 'Safety', 'Progress Tracking', 'Motivation'];
                info.forEach((item, i) => {
                    this.thumbnails.push({
                        id: i + 1,
                        name: item,
                        image: `https://picsum.photos/200/200?random=${i + 300}`
                    });
                });
                break;
        }
        
        this.renderThumbnails();
    }
    
    renderThumbnails() {
        if (!this.thumbnailGrid) return;
        
        this.thumbnailGrid.innerHTML = '';
        
        this.thumbnails.forEach((thumbnail) => {
            const thumbnailElement = document.createElement('div');
            thumbnailElement.className = 'thumbnail-item';
            thumbnailElement.dataset.id = thumbnail.id;
            
            thumbnailElement.innerHTML = `
                <img src="${thumbnail.image}" alt="${thumbnail.name}" loading="lazy">
                <div class="thumbnail-label">${thumbnail.name}</div>
            `;
            
            thumbnailElement.addEventListener('click', (e) => {
                // Prevent click if we just finished dragging
                if (this.recentlyDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.selectThumbnail(thumbnail);
            });
            
            this.thumbnailGrid.appendChild(thumbnailElement);
        });
        
        // Apply thumbnail radius styling to newly rendered thumbnails
        setTimeout(() => {
            this.updateStyles();
            this.updateThumbnailGlowStyles();
        }, 50);
    }
    
    selectThumbnail(thumbnail) {
        console.log(`Selected ${this.menuType}:`, thumbnail.name, thumbnail);
        
        // Add visual feedback for selection
        const thumbnailElements = this.thumbnailGrid.querySelectorAll('.thumbnail-item');
        thumbnailElements.forEach(el => el.classList.remove('selected'));
        
        const selectedElement = this.thumbnailGrid.querySelector(`[data-id="${thumbnail.id}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
        
        // Close menu after selection (unless keepOpen is enabled)
        if (!this.settings.keepOpen) {
            this.closeMenu();
        }
        
        // Emit custom event for other components to listen to
        const event = new CustomEvent(`${this.menuType}Selected`, { 
            detail: { thumbnail, menuType: this.menuType } 
        });
        document.dispatchEvent(event);
    }
    
    setupEventListeners() {
        // Toggle menu
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Menus stay open until another button is pressed (no click outside to close)
        // Removed click outside listener to prevent accidental closing during drag operations

        // Scroll buttons
        this.scrollUpBtn.addEventListener('click', () => {
            this.scrollContainer.scrollBy({ top: -this.scrollAmount, behavior: 'smooth' });
        });

        this.scrollDownBtn.addEventListener('click', () => {
            this.scrollContainer.scrollBy({ top: this.scrollAmount, behavior: 'smooth' });
        });

        // Mouse wheel scrolling with momentum
        this.scrollContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY * 3.5;
            
            this.scrollVelocity += delta * 0.2;
            this.scrollVelocity = Math.max(-this.maxVelocity, Math.min(this.maxVelocity, this.scrollVelocity));
            
            if (!this.isScrolling) {
                this.startMomentumScroll();
            }
        });

        // Touch and mouse drag scrolling
        this.scrollContainer.addEventListener('mousedown', (e) => {
            this.startDrag(e.clientY);
            e.preventDefault();
        });
        
        this.scrollContainer.addEventListener('touchstart', (e) => {
            this.startDrag(e.touches[0].clientY);
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.handleDrag(e.clientY);
                e.preventDefault();
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                this.handleDrag(e.touches[0].clientY);
                e.preventDefault();
            }
        }, { passive: false });
        
        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.endDrag();
            }
        });
        
        document.addEventListener('touchend', () => {
            if (this.isDragging) {
                this.endDrag();
            }
        });

        // Prevent text selection during drag
        this.scrollContainer.addEventListener('selectstart', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            if (e.key === 'Escape') {
                if (!this.settings.keepOpen) {
                    this.closeMenu();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.scrollContainer.scrollBy({ top: -this.scrollAmount, behavior: 'smooth' });
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.scrollContainer.scrollBy({ top: this.scrollAmount, behavior: 'smooth' });
            }
        });

        // Update scroll button states
        this.scrollContainer.addEventListener('scroll', () => {
            this.updateScrollButtons();
        });
    }    
    updateThumbnailGlowStyles() {
        const hex = this.settings.glowColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const glowColor = `rgba(${r}, ${g}, ${b}, ${this.settings.glowIntensity * 0.8})`;
        
        // Create dynamic CSS rule for selected thumbnails
        const styleId = `thumbnail-glow-${this.menuType}`;
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${glowColor};
            }
            #${this.menuType}Grid .thumbnail-item.selected::before {
                background: ${this.settings.glowColor};
                box-shadow: 0 0 ${Math.floor(this.settings.glowSize * 0.5)}px ${glowColor};
            }
        `;
    }    
    startMomentumScroll() {
        this.isScrolling = true;
        this.momentumScrollFrame();
    }

    momentumScrollFrame() {
        if (Math.abs(this.scrollVelocity) < 0.1) {
            this.isScrolling = false;
            this.scrollVelocity = 0;
            return;
        }

        this.scrollContainer.scrollBy({ 
            top: this.scrollVelocity, 
            behavior: 'auto'
        });

        this.scrollVelocity *= this.scrollDecay;
        requestAnimationFrame(() => this.momentumScrollFrame());
    }
    
    startDrag(clientY) {
        this.isDragging = true;
        this.startY = clientY;
        this.startScrollTop = this.scrollContainer.scrollTop;
        this.lastY = clientY;
        this.lastTime = Date.now();
        this.velocityTracker = [];
        
        // Stop any existing momentum
        this.isScrolling = false;
        this.scrollVelocity = 0;
        
        // Add dragging class for visual feedback
        this.scrollContainer.style.cursor = 'grabbing';
    }
    
    handleDrag(clientY) {
        if (!this.isDragging) return;
        
        const deltaY = this.startY - clientY;
        const newScrollTop = this.startScrollTop + deltaY;
        
        this.scrollContainer.scrollTop = newScrollTop;
        
        // Track velocity for momentum
        const currentTime = Date.now();
        const timeDelta = currentTime - this.lastTime;
        const yDelta = clientY - this.lastY;
        
        if (timeDelta > 0) {
            const velocity = yDelta / timeDelta;
            this.velocityTracker.push({ velocity, time: currentTime });
            
            // Keep only recent velocity data
            this.velocityTracker = this.velocityTracker.filter(v => 
                currentTime - v.time < 100
            );
        }
        
        this.lastY = clientY;
        this.lastTime = currentTime;
    }
    
    endDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.scrollContainer.style.cursor = 'grab';
        
        // Set flag to prevent immediate clicks after dragging
        this.recentlyDragged = true;
        setTimeout(() => {
            this.recentlyDragged = false;
        }, 100);
        
        // Calculate momentum from recent velocity data
        if (this.velocityTracker.length > 0) {
            const avgVelocity = this.velocityTracker.reduce((sum, v) => 
                sum + v.velocity, 0) / this.velocityTracker.length;
            
            // Convert to scroll velocity (negative because drag up should scroll up)
            this.scrollVelocity = -avgVelocity * 15;
            this.scrollVelocity = Math.max(-this.maxVelocity, 
                Math.min(this.maxVelocity, this.scrollVelocity));
            
            if (Math.abs(this.scrollVelocity) > 1) {
                this.startMomentumScroll();
            }
        }
        
        this.velocityTracker = [];
    }

    momentumScrollFrame() {
        if (Math.abs(this.scrollVelocity) < 0.1) {
            this.isScrolling = false;
            this.scrollVelocity = 0;
            return;
        }

        this.scrollContainer.scrollBy({ 
            top: this.scrollVelocity, 
            behavior: 'auto'
        });

        this.scrollVelocity *= this.scrollDecay;
        requestAnimationFrame(() => this.momentumScrollFrame());
    }

    updateScrollButtons() {
        const container = this.scrollContainer;
        const isAtTop = container.scrollTop <= 10;
        const isAtBottom = container.scrollTop >= container.scrollHeight - container.clientHeight - 10;
        
        this.scrollUpBtn.style.opacity = isAtTop ? '0.5' : '1';
        this.scrollDownBtn.style.opacity = isAtBottom ? '0.5' : '1';
        
        this.scrollUpBtn.disabled = isAtTop;
        this.scrollDownBtn.disabled = isAtBottom;
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
        document.dispatchEvent(new CustomEvent('closeAllThumbnailMenus', { 
            detail: { except: this.menuType } 
        }));
        
        this.dropdown.classList.add('show');
        this.toggleBtn.classList.add('active');
        this.isOpen = true;
        
        setTimeout(() => {
            this.updateScrollButtons();
        }, 100);
    }

    closeMenu() {
        this.dropdown.classList.remove('show');
        this.toggleBtn.classList.remove('active');
        this.isOpen = false;
    }
    
    updateStyles() {
        if (!this.dropdown) return;
        
        const hex = this.settings.backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Fixed dropdown width to match grid container
        this.dropdown.style.width = '250px';
        this.dropdown.style.background = `rgba(${r}, ${g}, ${b}, ${this.settings.backgroundOpacity})`;
        this.dropdown.style.borderRadius = `${this.settings.borderRadius}px`;
    }
    
    updateGlowStyles() {
        if (!this.toggleBtn) return;
        
        const hex = this.settings.glowColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const glowColor = `rgba(${r}, ${g}, ${b}, ${this.settings.glowIntensity})`;
        const outerGlow = `rgba(${r}, ${g}, ${b}, ${this.settings.glowIntensity * 0.5})`;
        
        // Create dynamic CSS rule for this menu's glow
        const styleId = `glow-${this.menuType}`;
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            #${this.menuType}Toggle.active {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${glowColor}, 0 0 ${this.settings.glowSize * 2}px ${outerGlow};
            }
            #${this.menuType}Toggle.active:hover {
                box-shadow: 0 0 ${this.settings.glowSize * 1.25}px ${glowColor.replace(this.settings.glowIntensity, this.settings.glowIntensity + 0.2)}, 0 0 ${this.settings.glowSize * 2.5}px ${outerGlow.replace(this.settings.glowIntensity * 0.5, this.settings.glowIntensity * 0.7)};
            }
        `;
    }
    
    updateThumbnailGlowStyles() {
        const hex = this.settings.glowColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const glowColor = `rgba(${r}, ${g}, ${b}, ${this.settings.glowIntensity})`;
        const innerGlow = `rgba(${r}, ${g}, ${b}, ${this.settings.glowIntensity * 0.5})`;
        
        // Create dynamic CSS rule for selected thumbnails
        const styleId = `thumbnail-glow-${this.menuType}`;
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${glowColor};
            }
            #${this.menuType}Grid .thumbnail-item.selected img {
                border: 3px solid ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${innerGlow};
            }
        `;
    }
    
    // Settings management methods
    getSettings() {
        return { ...this.settings };
    }

    applySettings(settings) {
        this.settings = { ...this.settings, ...settings };
        this.updateStyles();
        this.updateGlowStyles();
        this.updateThumbnailGlowStyles();
    }
}

export class MultiThumbnailMenuSystem {
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
        this.menus.exercises = new ThumbnailDropdownMenu('exercises');
        this.menus.muscles = new ThumbnailDropdownMenu('muscles');
        this.menus.equipment = new ThumbnailDropdownMenu('equipment');
        this.menus.information = new ThumbnailDropdownMenu('information');
    }
    
    setupGlobalListeners() {
        // Listen for close all menus event
        document.addEventListener('closeAllThumbnailMenus', (e) => {
            const exceptMenu = e.detail?.except;
            Object.entries(this.menus).forEach(([type, menu]) => {
                if (type !== exceptMenu) {
                    menu.closeMenu();
                }
            });
        });
    }
    
    // Global settings management
    updateAllSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        Object.values(this.menus).forEach(menu => {
            menu.applySettings(this.settings);
            menu.updateGlowStyles();
        });
    }
    
    getSettings() {
        return { ...this.settings };
    }

    applySettings(settings) {
        this.updateAllSettings(settings);
    }

    async copySettingsToClipboard() {
        const settingsStr = JSON.stringify(this.settings, null, 2);
        try {
            await navigator.clipboard.writeText(settingsStr);
            alert('Multi-thumbnail menu settings copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert('Failed to copy settings to clipboard.');
        }
    }
}