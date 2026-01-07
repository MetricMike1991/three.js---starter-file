/**
 * Multi-Dropdown Menu System
 * Handles Exercise, Muscles, Equipment, and Search menus
 */

class DropdownMenu {
    constructor(menuType, options = {}) {
        this.menuType = menuType;
        this.isOpen = false;
        this.items = [];
        this.filteredItems = [];
        this.scrollAmount = 200;
        
        // Momentum scrolling properties
        this.scrollVelocity = 0;
        this.scrollDecay = 0.92;
        this.maxVelocity = 30;
        this.isScrolling = false;
        
        // Style settings
        this.settings = {
            widthPercentage: 90,
            backgroundColor: '#000000',
            backgroundOpacity: 0.9,
            borderRadius: 12,
            thumbnailRadius: 8,
            keepOpen: false,
            ...options
        };
        
        this.initializeElements();
        this.generateItems();
        this.setupEventListeners();
        
        // Apply initial styles
        setTimeout(() => this.updateStyles(), 100);
    }
    
    initializeElements() {
        this.toggleBtn = document.getElementById(`${this.menuType}Toggle`);
        this.dropdown = document.getElementById(`${this.menuType}Dropdown`);
        this.scrollContainer = document.getElementById(`${this.menuType}Container`);
        this.itemGrid = document.getElementById(`${this.menuType}Grid`);
        this.scrollUpBtn = document.getElementById(`${this.menuType}ScrollUp`);
        this.scrollDownBtn = document.getElementById(`${this.menuType}ScrollDown`);
        
        // Search-specific elements
        if (this.menuType === 'search') {
            this.searchInput = document.getElementById('searchInput');
            this.searchClear = document.getElementById('searchClear');
        }
    }
    
    generateItems() {
        this.items = [];
        
        switch (this.menuType) {
            case 'exercise':
                for (let i = 1; i <= 20; i++) {
                    this.items.push({
                        id: i,
                        name: `Exercise ${i}`,
                        image: `https://picsum.photos/200/200?random=${i}`
                    });
                }
                break;
                
            case 'muscles':
                const muscles = ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs', 'Glutes', 'Calves'];
                muscles.forEach((muscle, i) => {
                    this.items.push({
                        id: i + 1,
                        name: muscle,
                        image: `https://picsum.photos/200/200?random=${i + 100}`
                    });
                });
                break;
                
            case 'equipment':
                const equipment = ['Dumbbells', 'Barbell', 'Resistance Bands', 'Kettlebell', 'Cable Machine', 'Pull-up Bar'];
                equipment.forEach((item, i) => {
                    this.items.push({
                        id: i + 1,
                        name: item,
                        image: `https://picsum.photos/200/200?random=${i + 200}`
                    });
                });
                break;
                
            case 'search':
                // Search will populate dynamically
                this.filteredItems = [];
                break;
        }
        
        this.renderItems();
    }
    
    renderItems() {
        if (!this.itemGrid) return;
        
        this.itemGrid.innerHTML = '';
        const itemsToRender = this.menuType === 'search' ? this.filteredItems : this.items;
        
        itemsToRender.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="menu-label">${item.name}</div>
            `;
            
            itemElement.addEventListener('click', () => {
                this.selectItem(item);
            });
            
            this.itemGrid.appendChild(itemElement);
        });
        
        // Apply thumbnail radius styling to newly rendered items
        setTimeout(() => this.updateStyles(), 50);
    }
    
    selectItem(item) {
        console.log(`Selected ${this.menuType}:`, item.name, item);
        
        // Add visual feedback for selection
        const itemElements = this.itemGrid.querySelectorAll('.menu-item');
        itemElements.forEach(el => el.classList.remove('selected'));
        
        const selectedElement = this.itemGrid.querySelector(`[data-id="${item.id}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
        
        // Close menu after selection (unless keepOpen is enabled)
        if (!this.settings.keepOpen) {
            this.closeMenu();
        }
        
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

        // Close menu when clicking outside (unless keepOpen is enabled)
        document.addEventListener('click', (e) => {
            if (!this.settings.keepOpen && !this.dropdown.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

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
            const delta = e.deltaY * 3.0;
            
            this.scrollVelocity += delta * 0.15;
            this.scrollVelocity = Math.max(-this.maxVelocity, Math.min(this.maxVelocity, this.scrollVelocity));
            
            if (!this.isScrolling) {
                this.startMomentumScroll();
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
        
        // Search-specific event listeners
        if (this.menuType === 'search') {
            this.setupSearchListeners();
        }
    }
    
    setupSearchListeners() {
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
        this.searchClear.addEventListener('click', () => {
            this.searchInput.value = '';
            this.performSearch('');
        });
    }
    
    performSearch(query) {
        // Combine all items from other menus for search
        const allItems = [
            ...this.generateSearchItems('exercise', 20),
            ...this.generateSearchItems('muscles', 8),
            ...this.generateSearchItems('equipment', 6)
        ];
        
        if (!query.trim()) {
            this.filteredItems = allItems.slice(0, 10); // Show first 10 items by default
        } else {
            this.filteredItems = allItems.filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        this.renderItems();
    }
    
    generateSearchItems(type, count) {
        const items = [];
        for (let i = 1; i <= count; i++) {
            items.push({
                id: `${type}-${i}`,
                name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
                image: `https://picsum.photos/200/200?random=${type === 'exercise' ? i : type === 'muscles' ? i + 100 : i + 200}`,
                category: type
            });
        }
        return items;
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
        document.dispatchEvent(new CustomEvent('closeAllMenus', { detail: { except: this.menuType } }));
        
        this.dropdown.classList.add('show');
        this.isOpen = true;
        
        setTimeout(() => {
            this.updateScrollButtons();
            if (this.menuType === 'search') {
                this.searchInput.focus();
            }
        }, 100);
    }

    closeMenu() {
        this.dropdown.classList.remove('show');
        this.isOpen = false;
    }
    
    updateStyles() {
        if (!this.dropdown || !this.toggleBtn) return;
        
        const hex = this.settings.backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate dropdown width based on thumbnail size + padding
        const thumbnailWidth = Math.min(window.innerWidth * 0.25, 200);
        const dropdownWidth = thumbnailWidth + 40;
        
        this.dropdown.style.width = `${dropdownWidth}px`;
        this.dropdown.style.background = `rgba(${r}, ${g}, ${b}, ${this.settings.backgroundOpacity})`;
        this.dropdown.style.borderRadius = `${this.settings.borderRadius}px`;
        
        // Update toggle button to match width and styling
        this.toggleBtn.style.width = `${dropdownWidth}px`;
        this.toggleBtn.style.background = `rgba(${r}, ${g}, ${b}, ${this.settings.backgroundOpacity})`;
        this.toggleBtn.style.borderRadius = `${this.settings.borderRadius}px`;
        
        // Update item border radius
        const items = document.querySelectorAll('.menu-item');
        items.forEach(item => {
            item.style.borderRadius = `${this.settings.thumbnailRadius}px`;
        });
    }
    
    // Settings management methods
    getSettings() {
        return { ...this.settings };
    }

    applySettings(settings) {
        this.settings = { ...this.settings, ...settings };
        this.updateStyles();
    }

    async copySettingsToClipboard() {
        const settingsStr = JSON.stringify(this.settings, null, 2);
        try {
            await navigator.clipboard.writeText(settingsStr);
            alert(`${this.menuType} menu settings copied to clipboard!`);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert('Failed to copy settings to clipboard.');
        }
    }
}

export class MultiMenuSystem {
    constructor() {
        this.menus = {};
        this.settings = {
            widthPercentage: 90,
            backgroundColor: '#000000',
            backgroundOpacity: 0.9,
            borderRadius: 12,
            thumbnailRadius: 8,
            keepOpen: false
        };
        
        this.initializeMenus();
        this.setupGlobalListeners();
    }
    
    initializeMenus() {
        // Create all menu instances
        this.menus.exercise = new DropdownMenu('exercise', this.settings);
        this.menus.muscles = new DropdownMenu('muscles', this.settings);
        this.menus.equipment = new DropdownMenu('equipment', this.settings);
        this.menus.search = new DropdownMenu('search', this.settings);
    }
    
    setupGlobalListeners() {
        // Listen for close all menus event
        document.addEventListener('closeAllMenus', (e) => {
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
            alert('Multi-menu settings copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert('Failed to copy settings to clipboard.');
        }
    }
}