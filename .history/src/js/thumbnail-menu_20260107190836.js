/**
 * Thumbnail Dropdown Menu
 * Handles the thumbnail selection interface with scrollable grid
 */

export class ThumbnailMenu {
    constructor() {
        this.isOpen = false;
        this.thumbnails = [];
        this.scrollAmount = 200; // Pixels to scroll per button click
        
        // Momentum scrolling properties
        this.scrollVelocity = 0;
        this.scrollDecay = 0.90; // Faster decay for responsive feel
        this.maxVelocity = 35; // Slightly higher max velocity
        this.isScrolling = false;
        
        // Style settings
        this.settings = {
            widthPercentage: 90,
            backgroundColor: '#000000',
            backgroundOpacity: 0.9,
            borderRadius: 12,
            keepOpen: false
        };
        
        this.initializeElements();
        this.generateThumbnails();
        this.setupEventListeners();
        
        // Apply initial styles
        setTimeout(() => this.updateStyles(), 100);
    }

    initializeElements() {
        this.toggleBtn = document.getElementById('thumbnailToggle');
        this.dropdown = document.getElementById('thumbnailDropdown');
        this.scrollContainer = document.getElementById('thumbnailContainer');
        this.thumbnailGrid = document.getElementById('thumbnailGrid');
        this.scrollUpBtn = document.getElementById('scrollUp');
        this.scrollDownBtn = document.getElementById('scrollDown');
    }

    generateThumbnails() {
        // Create 20 placeholder thumbnails
        for (let i = 1; i <= 20; i++) {
            const thumbnailData = {
                id: i,
                name: `Thumbnail ${i}`,
                // Using placeholder image service for now
                image: `https://picsum.photos/200/200?random=${i}`
            };
            this.thumbnails.push(thumbnailData);
        }
        
        this.renderThumbnails();
    }

    renderThumbnails() {
        this.thumbnailGrid.innerHTML = '';
        
        this.thumbnails.forEach((thumbnail) => {
            const thumbnailElement = document.createElement('div');
            thumbnailElement.className = 'thumbnail-item';
            thumbnailElement.dataset.id = thumbnail.id;
            
            thumbnailElement.innerHTML = `
                <img src="${thumbnail.image}" alt="${thumbnail.name}" loading="lazy">
                <div class="thumbnail-label">${thumbnail.name}</div>
            `;
            
            // Add click handler for thumbnail selection
            thumbnailElement.addEventListener('click', () => {
                this.selectThumbnail(thumbnail);
            });
            
            this.thumbnailGrid.appendChild(thumbnailElement);
        });
    }

    selectThumbnail(thumbnail) {
        console.log(`Selected thumbnail: ${thumbnail.name}`, thumbnail);
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
        const event = new CustomEvent('thumbnailSelected', { 
            detail: { thumbnail } 
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
            const delta = e.deltaY * 3.5; // Higher sensitivity (3.5x)
            
            // Add to velocity for momentum
            this.scrollVelocity += delta * 0.2; // Slightly more momentum buildup
            this.scrollVelocity = Math.max(-this.maxVelocity, Math.min(this.maxVelocity, this.scrollVelocity));
            
            // Start momentum scrolling if not already running
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
        this.dropdown.classList.add('show');
        this.isOpen = true;
        
        // Update scroll button states after opening
        setTimeout(() => {
            this.updateScrollButtons();
        }, 100);
    }

    closeMenu() {
        this.dropdown.classList.remove('show');
        this.isOpen = false;
    }

    // Momentum scrolling implementation
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

        // Apply scroll
        this.scrollContainer.scrollBy({ 
            top: this.scrollVelocity, 
            behavior: 'auto' // Use auto for smooth momentum
        });

        // Apply decay
        this.scrollVelocity *= this.scrollDecay;

        // Continue animation
        requestAnimationFrame(() => this.momentumScrollFrame());
    }

    // Method to add custom thumbnails
    addThumbnail(thumbnailData) {
        this.thumbnails.push(thumbnailData);
        this.renderThumbnails();
    }

    // Method to clear all thumbnails
    clearThumbnails() {
        this.thumbnails = [];
        this.renderThumbnails();
    }

    // Settings management methods
    updateStyles() {
        if (!this.dropdown) return;
        
        // Convert hex color to RGB for rgba
        const hex = this.settings.backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        this.dropdown.style.width = `min(${this.settings.widthPercentage}vw, 300px)`;
        this.dropdown.style.background = `rgba(${r}, ${g}, ${b}, ${this.settings.backgroundOpacity})`;
        this.dropdown.style.borderRadius = `${this.settings.borderRadius}px`;
    }

    getSettings() {
        return { ...this.settings };
    }

    applySettings(settings) {
        this.settings = { ...this.settings, ...settings };
        this.updateStyles();
    }

    // Copy thumbnail settings to clipboard
    async copySettingsToClipboard() {
        const settingsStr = JSON.stringify(this.settings, null, 2);
        try {
            await navigator.clipboard.writeText(settingsStr);
            alert('Thumbnail menu settings copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert('Failed to copy settings to clipboard.');
        }
    }
}