/**
 * Multi-Thumbnail Menu System
 * Handles 4 separate dropdown menus: Exercises, Muscles, Equipment, Information
 */

class ThumbnailDropdownMenu {
    constructor(menuType) {
        this.menuType = menuType;
        this.isOpen = false;
        this.allExercises = []; // All exercise data from JSON
        this.filteredData = []; // Filtered data for current menu
        this.scrollAmount = 200;
        
        // Virtualized scrolling properties
        this.itemHeight = 230; // Height of each thumbnail item (200px + 30px margin)
        this.containerHeight = 400; // Height of visible container
        this.visibleItems = Math.ceil(this.containerHeight / this.itemHeight) + 4; // More buffer items
        this.startIndex = 0;
        this.endIndex = this.visibleItems;
        
        // Infinite loop properties
        this.loopMultiplier = 3; // Show content 3 times for smooth looping
        this.isLooping = false;
        
        // Smooth rendering
        this.renderBuffer = 2; // Extra items above/below visible area
        this.lastRenderedStart = -1;
        this.lastRenderedEnd = -1;
        
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
        this.hasDragged = false;
        
        // Scroll interaction delay
        this.scrollInteractionDelay = 1500; // 1.5 second delay after scrolling
        this.lastScrollInteraction = 0;
        
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
        this.loadExerciseData();
    }
    
    initializeElements() {
        this.toggleBtn = document.getElementById(`${this.menuType}Toggle`);
        this.dropdown = document.getElementById(`${this.menuType}Dropdown`);
        this.scrollContainer = document.getElementById(`${this.menuType}Container`);
        this.thumbnailGrid = document.getElementById(`${this.menuType}Grid`);
        this.scrollUpBtn = document.getElementById(`${this.menuType}ScrollUp`);
        this.scrollDownBtn = document.getElementById(`${this.menuType}ScrollDown`);
    }
    
    async loadExerciseData() {
        try {
            const response = await fetch('./data/exercises.json');
            this.allExercises = await response.json();
            this.filterDataForMenu();
            this.setupEventListeners();
            
            // Apply initial styles
            setTimeout(() => {
                this.updateStyles();
                this.updateGlowStyles();
                this.updateThumbnailGlowStyles();
            }, 100);
        } catch (error) {
            console.error('Failed to load exercise data:', error);
            this.generateFallbackData();
        }
    }

    filterDataForMenu() {
        switch (this.menuType) {
            case 'exercises':
                this.filteredData = this.allExercises;
                break;
                
            case 'muscles':
                // Get unique muscle groups
                const muscleSet = new Set();
                this.allExercises.forEach(exercise => {
                    exercise.muscleGroup.forEach(muscle => muscleSet.add(muscle));
                });
                this.filteredData = Array.from(muscleSet).map((muscle, index) => ({
                    id: `muscle_${index}`,
                    name: muscle,
                    thumbnailUrl: `https://picsum.photos/200/200?random=${100 + index}`,
                    type: 'muscle',
                    relatedExercises: this.allExercises.filter(ex => 
                        ex.muscleGroup.includes(muscle)
                    )
                }));
                break;
                
            case 'equipment':
                // Get unique equipment
                const equipmentSet = new Set();
                this.allExercises.forEach(exercise => {
                    exercise.equipment.forEach(eq => equipmentSet.add(eq));
                });
                this.filteredData = Array.from(equipmentSet).map((equipment, index) => ({
                    id: `equipment_${index}`,
                    name: equipment,
                    thumbnailUrl: `https://picsum.photos/200/200?random=${200 + index}`,
                    type: 'equipment',
                    relatedExercises: this.allExercises.filter(ex => 
                        ex.equipment.includes(equipment)
                    )
                }));
                break;
                
            case 'information':
                // Create information categories
                this.filteredData = [
                    {
                        id: 'difficulty_guide',
                        name: 'Difficulty Guide',
                        thumbnailUrl: 'https://picsum.photos/200/200?random=300',
                        type: 'information'
                    },
                    {
                        id: 'movement_types',
                        name: 'Movement Types',
                        thumbnailUrl: 'https://picsum.photos/200/200?random=301',
                        type: 'information'
                    },
                    {
                        id: 'form_tips',
                        name: 'Form Tips',
                        thumbnailUrl: 'https://picsum.photos/200/200?random=302',
                        type: 'information'
                    }
                ];
                break;
        }
        
        this.renderVirtualizedGrid();
    }

    generateFallbackData() {
        // Fallback data in case JSON loading fails
        this.filteredData = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `${this.menuType} ${i + 1}`,
            thumbnailUrl: `https://picsum.photos/200/200?random=${i + 1}`
        }));
        this.renderVirtualizedGrid();
    }

    renderVirtualizedGrid() {
        if (!this.thumbnailGrid) return;

        // Create container for virtualized content
        this.thumbnailGrid.innerHTML = '';
        
        // Create spacer divs for virtualization
        this.topSpacer = document.createElement('div');
        this.bottomSpacer = document.createElement('div');
        this.visibleContainer = document.createElement('div');
        
        this.thumbnailGrid.appendChild(this.topSpacer);
        this.thumbnailGrid.appendChild(this.visibleContainer);
        this.thumbnailGrid.appendChild(this.bottomSpacer);
        
        this.updateVirtualizedContent();
    }

    updateVirtualizedContent() {
        if (!this.visibleContainer || !this.filteredData.length) return;

        // Simple approach - just show items based on scroll position without infinite loop for now
        const scrollTop = this.scrollContainer.scrollTop;
        const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.renderBuffer);
        const endIndex = Math.min(
            startIndex + this.visibleItems + (this.renderBuffer * 2),
            this.filteredData.length
        );

        this.startIndex = startIndex;
        this.endIndex = endIndex;

        // Update spacer heights
        this.topSpacer.style.height = `${this.startIndex * this.itemHeight}px`;
        this.bottomSpacer.style.height = `${
            (this.filteredData.length - this.endIndex) * this.itemHeight
        }px`;

        // Render visible items with smooth transitions
        const currentItems = new Set();
        const fragment = document.createDocumentFragment();
        
        for (let i = this.startIndex; i < this.endIndex; i++) {
            const item = this.filteredData[i];
            if (!item) continue;

            currentItems.add(item.id);
            
            // Check if item already exists
            let thumbnailElement = this.visibleContainer.querySelector(`[data-id="${item.id}"]`);
            
            if (!thumbnailElement) {
                // Create new element
                thumbnailElement = document.createElement('div');
                thumbnailElement.className = 'thumbnail-item';
                thumbnailElement.dataset.id = item.id;
                
                thumbnailElement.innerHTML = `
                    <img src="${item.thumbnailUrl}" alt="${item.name}" loading="lazy">
                    <div class="thumbnail-label">${item.name}</div>
                `;
                
                // Add click event listener
                thumbnailElement.addEventListener('click', (e) => {
                    if (this.recentlyDragged && this.hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    this.selectThumbnail(item);
                });

                fragment.appendChild(thumbnailElement);
            }
        }

        // Add new items
        if (fragment.children.length > 0) {
            this.visibleContainer.appendChild(fragment);
        }

        // Remove items that are no longer visible
        const existingItems = this.visibleContainer.querySelectorAll('.thumbnail-item');
        existingItems.forEach(el => {
            const id = el.dataset.id;
            if (!currentItems.has(id)) {
                el.remove();
            }
        });

        // Apply thumbnail radius styling to newly rendered thumbnails
        setTimeout(() => {
            this.updateStyles();
            this.updateThumbnailGlowStyles();
        }, 50);
    }
    
    selectThumbnail(item) {
        console.log(`Selected ${this.menuType}:`, item.name, item);
        
        // Add visual feedback for selection
        const thumbnailElements = this.visibleContainer.querySelectorAll('.thumbnail-item');
        thumbnailElements.forEach(el => el.classList.remove('selected'));
        
        const selectedElement = this.visibleContainer.querySelector(`[data-id="${item.id}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
        
        // Menu stays open after thumbnail selection - only closes when clicking outside
        
        // Emit custom event for other components to listen to
        const event = new CustomEvent(`${this.menuType}Selected`, { 
            detail: { item, menuType: this.menuType } 
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
            
            // Mark scroll interaction time
            this.lastScrollInteraction = Date.now();
            
            if (!this.isScrolling) {
                this.startMomentumScroll();
            }
        });

        // Update virtualized content on scroll (always update for smooth experience)
        this.scrollContainer.addEventListener('scroll', () => {
            this.updateVirtualizedContent();
            this.updateScrollButtons();
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

        // Update virtualized content during momentum scrolling
        this.updateVirtualizedContent();

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
        this.hasDragged = false;
        
        // Stop any existing momentum
        this.isScrolling = false;
        this.scrollVelocity = 0;
        
        // Add dragging class for visual feedback
        this.scrollContainer.style.cursor = 'grabbing';
    }
    
    handleDrag(clientY) {
        if (!this.isDragging) return;
        
        const deltaY = this.startY - clientY;
        
        // Only consider it dragging if moved more than 5px
        if (Math.abs(deltaY) > 5) {
            this.hasDragged = true;
        }
        
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
        
        // Set flag to prevent immediate clicks only if we actually dragged
        if (this.hasDragged) {
            this.recentlyDragged = true;
            this.lastScrollInteraction = Date.now(); // Mark scroll interaction time
            setTimeout(() => {
                this.recentlyDragged = false;
                this.hasDragged = false;
            }, 100);
        }
        
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

    // Check if menu should remain visible due to recent scroll interaction
    hasRecentScrollInteraction() {
        return Date.now() - this.lastScrollInteraction < this.scrollInteractionDelay;
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
        // For infinite scroll, buttons are never disabled since you can always scroll
        this.scrollUpBtn.style.opacity = '1';
        this.scrollDownBtn.style.opacity = '1';
        
        this.scrollUpBtn.disabled = false;
        this.scrollDownBtn.disabled = false;
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
        
        // Keep menu container visible when dropdown is open
        const gridContainer = document.querySelector('.thumbnail-grid-container');
        if (gridContainer) {
            gridContainer.classList.add('menu-active');
        }
        
        setTimeout(() => {
            this.updateScrollButtons();
        }, 100);
    }

    closeMenu() {
        this.dropdown.classList.remove('show');
        this.toggleBtn.classList.remove('active');
        this.isOpen = false;
        
        // Check if any other menus are open, if not, remove menu-active class
        const anyMenuOpen = window.menuManager && 
            Object.values(window.menuManager.menus).some(menu => menu.isOpen);
        
        if (!anyMenuOpen) {
            const gridContainer = document.querySelector('.thumbnail-grid-container');
            if (gridContainer) {
                gridContainer.classList.remove('menu-active');
            }
        }
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
        
        // Handle menu slide-out visibility
        const menuContainer = document.querySelector('.thumbnail-grid-container');
        if (menuContainer) {
            // Show menu on hover and keep it visible
            menuContainer.addEventListener('mouseenter', () => {
                menuContainer.classList.add('menu-visible');
            });
            
            // Make hint tab clickable to toggle menu
            const hintTab = menuContainer.querySelector('.menu-hint-tab');
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
                // Check if any menu has recent scroll interaction
                const hasRecentScroll = Object.values(this.menus).some(menu => 
                    menu.hasRecentScrollInteraction && menu.hasRecentScrollInteraction()
                );
                
                // Don't close if there's recent scroll interaction
                if (hasRecentScroll) {
                    return;
                }
                
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
            menu.updateGlowStyles();
            menu.updateThumbnailGlowStyles();
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