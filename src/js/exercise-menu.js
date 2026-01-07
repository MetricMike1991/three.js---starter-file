/**
 * Thumbnail Dropdown Menu
 * Handles the thumbnail selection interface with scrollable grid
 */

export class ThumbnailMenu {
    constructor() {
        this.isOpen = false;
        this.thumbnails = [];
        this.scrollAmount = 200; // Pixels to scroll per button click
        
        this.initializeElements();
        this.generateThumbnails();
        this.setupEventListeners();
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
        
        // Close menu after selection
        this.closeMenu();
        
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

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target) && !this.toggleBtn.contains(e.target)) {
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

        // Mouse wheel scrolling
        this.scrollContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY;
            this.scrollContainer.scrollBy({ top: delta, behavior: 'smooth' });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            if (e.key === 'Escape') {
                this.closeMenu();
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
}