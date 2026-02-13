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
        this.stickyHeader = null; // Dynamic header for mobile info menu
        this.currentSectionTitle = ''; // Track current section
        this.sectionBoundaries = []; // Track section start positions for mobile
        
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

        console.log(`[RightMenu DEBUG] initializeElements for ${this.menuType}:`);
        console.log(`[RightMenu DEBUG] toggleBtn:`, this.toggleBtn);
        console.log(`[RightMenu DEBUG] toggleBtn innerHTML:`, this.toggleBtn ? this.toggleBtn.innerHTML : 'N/A');
        
        if (!this.toggleBtn || !this.dropdown) {
            console.error(`Failed to initialize ${this.menuType} menu elements`);
        }
        
        // Create sticky header for mobile info menu
        if (this.menuType === 'info' && this.dropdown) {
            this.createStickyHeader();
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

    /**
     * Formats plain text content into structured HTML.
     * Recognizes patterns like:
     *   - Numbered lists: "1. text\n2. text"
     *   - Bullet lists: "- text\n- text"
     *   - Label:value pairs: "Primary: Glutes, Quads"
     *   - Paragraphs separated by \n\n
     *   - Simple line breaks: \n
     *   - Flat sentence lists: "Benefit one. Benefit two. Benefit three." (auto-bulleted)
     *   - Inline label pairs: "Primary: X, Y. Secondary: A, B." (auto-split)
     */
    formatContent(text) {
        if (!text) return '';
        
        // Pre-process: if text has no \n at all, try to intelligently add structure
        if (!text.includes('\n')) {
            text = this._autoStructure(text);
        }
        
        // Split into lines
        const lines = text.split('\n');
        let html = '';
        let inOL = false;
        let inUL = false;
        
        const closeLists = () => {
            if (inOL) { html += '</ol>'; inOL = false; }
            if (inUL) { html += '</ul>'; inUL = false; }
        };
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) {
                closeLists();
                return; // skip empty lines (they act as paragraph breaks)
            }
            
            // Numbered list item: "1. text", "2. text", etc.
            const olMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
            if (olMatch) {
                if (!inOL) {
                    closeLists();
                    html += '<ol class="info-formatted-ol">';
                    inOL = true;
                }
                html += `<li>${olMatch[2]}</li>`;
                return;
            }
            
            // Bullet list item: "- text" or "• text"
            const ulMatch = trimmed.match(/^[-•]\s+(.+)/);
            if (ulMatch) {
                if (!inUL) {
                    closeLists();
                    html += '<ul class="info-formatted-ul">';
                    inUL = true;
                }
                html += `<li>${ulMatch[1]}</li>`;
                return;
            }
            
            // If we were in a list but this line isn't a list item, close the list
            closeLists();
            
            // Label: Value pattern (e.g., "Primary: Glutes, Quads")
            const labelMatch = trimmed.match(/^([A-Za-z][A-Za-z\s&\/]+):\s+(.+)/);
            if (labelMatch && labelMatch[1].length < 30) {
                html += `<p class="info-formatted-label"><strong>${labelMatch[1]}:</strong> ${labelMatch[2]}</p>`;
                return;
            }
            
            // Regular paragraph line
            html += `<p class="info-formatted-p">${trimmed}</p>`;
        });
        
        closeLists();
        return html;
    }
    
    /**
     * Auto-structures flat text that has no \n markers.
     * Detects patterns like:
     *   - Multiple "Label: value" pairs separated by periods → split onto separate lines
     *   - 3+ sentences that look like a list of benefits → bullet list
     *   - Long paragraph → break into readable chunks
     */
    _autoStructure(text) {
        // Pattern 1: Multiple "Label: stuff." inline (e.g. "Primary: X, Y. Secondary: A, B.")
        // Check if text contains 2+ "Word: " patterns
        const labelParts = text.match(/[A-Z][a-zA-Z\s&\/]+:\s+[^.]+\./g);
        if (labelParts && labelParts.length >= 2) {
            return labelParts.map(p => p.trim().replace(/\.$/, '')).join('\n\n');
        }
        
        // Pattern 2: Sentences that look like a list of short benefits/points
        // Split on ". " but keep periods that are part of abbreviations (e.g., "lbs.")
        const sentences = text.split(/\.\s+/).filter(s => s.trim().length > 0);
        
        if (sentences.length >= 3) {
            // Check if sentences are short enough to be list items (avg < 100 chars)
            const avgLen = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
            if (avgLen < 100) {
                // Convert to bullet list
                return sentences.map(s => {
                    const clean = s.trim().replace(/\.$/, '');
                    return `- ${clean}`;
                }).join('\n');
            }
        }
        
        // Pattern 3: Long paragraph — break into chunks at sentence boundaries
        if (text.length > 150 && sentences.length >= 2) {
            return sentences.map(s => {
                const clean = s.trim();
                // Re-add period if it was removed by split (except last which may not have had one)
                return clean.endsWith('.') ? clean : clean + '.';
            }).join('\n\n');
        }
        
        // No transformation needed
        return text;
    }

    /**
     * Renders clickable exercise suggestion cards at the top of the grid.
     * Looks up exercises from the loaded catalogue via the menu system.
     */
    renderSuggestedExercises(exerciseIds) {
        if (!this.grid || !exerciseIds || exerciseIds.length === 0) return;
        
        // Get the loaded exercises from the menu system
        const allExercises = this._getExerciseCatalogue();
        if (!allExercises || allExercises.length === 0) {
            console.warn('[RightMenu] No exercise catalogue available for suggestions');
            return;
        }
        
        // Look up each suggested exercise
        const foundExercises = exerciseIds
            .map(id => allExercises.find(ex => ex.id === id))
            .filter(Boolean);
        
        if (foundExercises.length === 0) return;
        
        // Create the suggestions container
        const container = document.createElement('div');
        container.className = 'info-suggested-exercises';
        
        const heading = document.createElement('div');
        heading.className = 'info-suggested-heading';
        heading.textContent = 'Try These Exercises';
        container.appendChild(heading);
        
        const cardsRow = document.createElement('div');
        cardsRow.className = 'info-suggested-cards';
        
        foundExercises.forEach(exercise => {
            const card = document.createElement('div');
            card.className = 'info-suggested-card';
            card.dataset.exerciseId = exercise.id;
            
            // Thumbnail image (with fallback)
            const thumbUrl = exercise.thumbnailUrl || '';
            const imgHTML = thumbUrl 
                ? `<img src="${thumbUrl}" alt="${exercise.name}" loading="lazy">`
                : `<div class="info-suggested-placeholder"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg></div>`;
            
            card.innerHTML = `
                <div class="info-suggested-thumb">${imgHTML}</div>
                <div class="info-suggested-name">${exercise.name}</div>
            `;
            
            // Click handler - dispatch the same event the thumbnail menu uses
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this._loadSuggestedExercise(exercise);
            });
            
            cardsRow.appendChild(card);
        });
        
        container.appendChild(cardsRow);
        this.grid.appendChild(container);
    }
    
    /**
     * Gets the exercise catalogue from the loaded menu system.
     */
    _getExerciseCatalogue() {
        // Try the multi-thumbnail menu system first
        if (window.menuManager && window.menuManager.menus) {
            const exercisesMenu = window.menuManager.menus.exercises;
            if (exercisesMenu && exercisesMenu.allExercises) {
                return exercisesMenu.allExercises;
            }
            // Also check search menu which loads the same data
            const searchMenu = window.menuManager.menus.search;
            if (searchMenu && searchMenu.allExercises) {
                return searchMenu.allExercises;
            }
        }
        return null;
    }
    
    /**
     * Dispatches the exercise selection event to load the exercise.
     */
    _loadSuggestedExercise(exercise) {
        console.log('[RightMenu] Loading suggested exercise:', exercise.name);
        
        // Dispatch the same event that the thumbnail menu uses
        const event = new CustomEvent('exercisesSelected', {
            detail: { item: exercise, menuType: 'suggested' }
        });
        document.dispatchEvent(event);
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
                <div class="info-step-text">${this.formatContent(item.text)}</div>
            `;
            this.grid.appendChild(itemDiv);
        });
    }

    createStickyHeader() {
        // Create sticky header element
        this.stickyHeader = document.createElement('div');
        this.stickyHeader.className = 'info-sticky-header';
        this.stickyHeader.textContent = 'Exercise Information';
        this.currentSectionTitle = 'Exercise Information';
        
        // Insert before scroll container
        if (this.dropdown && this.scrollContainer) {
            this.dropdown.insertBefore(this.stickyHeader, this.scrollContainer);
        }
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
        
        // Setup scroll detection for mobile info menu sticky header
        if (this.menuType === 'info' && this.scrollContainer) {
            this.scrollContainer.addEventListener('scroll', () => {
                this.updateStickyHeader();
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
        if (!this.dropdown || !this.toggleBtn) return;

        // If theme editor has menus locked, don't close
        if (window._themeEditorLockMenus) return;
        
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
            console.log('=== updateTitle DEBUG ===');
            console.log('Button ID:', this.toggleBtn.id);
            console.log('New title:', newTitle);
            console.log('Button innerHTML BEFORE:', this.toggleBtn.innerHTML);
            
            // Check if there's a span element (preferred structure)
            const span = this.toggleBtn.querySelector('span');
            if (span) {
                console.log('Found span, updating text only');
                // Just update the span text content
                span.textContent = newTitle;
            } else {
                console.log('No span found, checking for SVG');
                // Preserve SVG icon if it exists (mobile info button)
                const svg = this.toggleBtn.querySelector('svg');
                if (svg) {
                    console.log('Found SVG, rebuilding structure');
                    // Clone the SVG to preserve it
                    const svgClone = svg.cloneNode(true);
                    // Clear button and rebuild with proper structure
                    this.toggleBtn.innerHTML = '';
                    this.toggleBtn.appendChild(svgClone);
                    const newSpan = document.createElement('span');
                    newSpan.textContent = newTitle;
                    this.toggleBtn.appendChild(newSpan);
                } else {
                    console.log('No SVG found, just updating text');
                    // No SVG, just update text
                    this.toggleBtn.textContent = newTitle;
                }
            }
            
            console.log('Button innerHTML AFTER:', this.toggleBtn.innerHTML);
            console.log('=========================');
        }
    }
    
    updateStickyHeader() {
        if (!this.stickyHeader || !this.scrollContainer || !this.grid) return;
        
        // Get all items with section data attributes
        const items = this.grid.querySelectorAll('[data-section]');
        if (items.length === 0) return;
        
        const containerTop = this.scrollContainer.getBoundingClientRect().top;
        
        // Find which section is currently in view (first item at or past the sticky header)
        let currentSection = items[0].getAttribute('data-section') || 'Exercise Information';
        
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemTop = rect.top - containerTop;
            
            // If item is at or past the sticky header position (allowing some offset)
            if (itemTop <= 80) {
                const section = item.getAttribute('data-section');
                if (section) {
                    currentSection = section;
                }
            }
        });
        
        // Update sticky header if section changed
        if (currentSection !== this.currentSectionTitle) {
            this.currentSectionTitle = currentSection;
            this.stickyHeader.textContent = currentSection;
        }
    }
    
    updateContent(sections, suggestedExerciseIds = null) {
        // Update grid with new content sections
        if (!this.grid) return;
        
        this.grid.innerHTML = '';
        
        if (!sections || sections.length === 0) {
            this.grid.innerHTML = '<div class="info-step-empty">No information available.</div>';
            return;
        }
        
        // Render suggested exercise thumbnails at the top if provided
        if (suggestedExerciseIds && suggestedExerciseIds.length > 0) {
            this.renderSuggestedExercises(suggestedExerciseIds);
        }
        
        // Track section boundaries for mobile sticky header
        let currentSectionTitle = '';
        
        sections.forEach(section => {
            const itemDiv = document.createElement('div');
            
            // Check if this is a header section
            if (section.type === 'header') {
                // Track section title for mobile
                currentSectionTitle = section.title;
                
                // Skip header sections on mobile consolidated menu (we have sticky header instead)
                if (this.menuType === 'info') {
                    return;
                }
                itemDiv.className = 'info-section-header';
                itemDiv.setAttribute('data-section-title', section.title);
                itemDiv.innerHTML = `<div class="info-section-title">${section.title}</div>`;
            } else {
                itemDiv.className = 'info-step-item';
                itemDiv.innerHTML = `
                    <div class="info-step-title">${section.heading || ''}</div>
                    <div class="info-step-text">${this.formatContent(section.content)}</div>
                `;
                
                // For mobile, mark the element with its section
                if (this.menuType === 'info' && currentSectionTitle) {
                    itemDiv.setAttribute('data-section', currentSectionTitle);
                }
            }
            
            this.grid.appendChild(itemDiv);
        });
        
        // Set up scroll detection for mobile menu to update button text
        if (this.menuType === 'info' && this.scrollContainer) {
            this.setupScrollDetection();
        }
    }
    
    setupScrollDetection() {
        if (!this.scrollContainer) return;
        
        // Debounce scroll handler
        let scrollTimeout;
        this.scrollContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateButtonTextBasedOnScroll();
            }, 100);
        });
    }
    
    updateButtonTextBasedOnScroll() {
        if (!this.scrollContainer || !this.toggleBtn) return;
        
        const headers = this.grid.querySelectorAll('.info-section-header');
        if (headers.length === 0) return;
        
        const containerTop = this.scrollContainer.getBoundingClientRect().top;
        let currentSection = 'Exercise Info';
        
        // Find which section is currently in view
        headers.forEach(header => {
            const headerRect = header.getBoundingClientRect();
            // If header is above or near the top of the container
            if (headerRect.top <= containerTop + 100) {
                const sectionTitle = header.getAttribute('data-section-title');
                if (sectionTitle) {
                    currentSection = sectionTitle;
                }
            }
        });
        
        // Update button text (only update the span, keep the SVG)
        const span = this.toggleBtn.querySelector('span');
        if (span && span.textContent !== currentSection) {
            span.textContent = currentSection;
        }
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
                // (but not when theme editor has menus locked)
                if (!window._themeEditorLockMenus) {
                    const leftMenuContainer = document.querySelector('.thumbnail-grid-container');
                    if (leftMenuContainer) {
                        leftMenuContainer.classList.remove('menu-visible', 'menu-active');
                        // Also close any open left menus
                        document.dispatchEvent(new CustomEvent('closeAllThumbnailMenus', { 
                            detail: { except: null } 
                        }));
                    }
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
            // Don't close menus while theme editor is open
            if (window._themeEditorLockMenus) return;

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
        console.log('Updating right menu from config:', configTabs);
        
        // Update desktop menus (4 separate menus)
        const tabMapping = {
            'exerciseInformation': 'info2',
            'howToGuide': 'info1',
            'setupGuide': 'info3',
            'alternativeExercises': 'info4'
        };
        
        // Update each desktop tab with config data
        Object.entries(configTabs).forEach(([tabKey, tabData]) => {
            const menuId = tabMapping[tabKey];
            if (menuId && this.menus[menuId]) {
                // Update the title
                if (tabData.title) {
                    this.menus[menuId].updateTitle(tabData.title);
                }
                
                // Update the content (pass suggestedExercises for alternativeExercises tab)
                if (tabData.sections && Array.isArray(tabData.sections)) {
                    const suggested = tabData.suggestedExercises || null;
                    this.menus[menuId].updateContent(tabData.sections, suggested);
                }
            }
        });
        
        // Update mobile consolidated menu
        const consolidatedSections = [];
        
        // Order: Exercise Information, Setup Guide, How To Guide, Alternative Exercises
        const tabOrder = [
            { key: 'exerciseInformation', title: 'Exercise Information' },
            { key: 'setupGuide', title: 'Exercise Tips' },
            { key: 'howToGuide', title: 'How To Guide' },
            { key: 'alternativeExercises', title: 'Alternative Exercises' }
        ];
        
        // Track suggested exercises for the alternatives section in mobile menu
        let mobileSuggestedExercises = null;
        
        tabOrder.forEach(({ key, title }) => {
            const tabData = configTabs[key];
            if (tabData && tabData.sections && Array.isArray(tabData.sections)) {
                // Add a title section to separate different categories
                consolidatedSections.push({
                    title: tabData.title || title,
                    type: 'header',
                    content: ''
                });
                // For alternative exercises, inject a marker for suggested exercises
                if (key === 'alternativeExercises' && tabData.suggestedExercises) {
                    mobileSuggestedExercises = tabData.suggestedExercises;
                    consolidatedSections.push({
                        type: 'suggestedExercises',
                        exerciseIds: tabData.suggestedExercises
                    });
                }
                // Add all sections from this tab
                consolidatedSections.push(...tabData.sections);
            }
        });
        
        // Update the mobile consolidated menu
        if (this.menus.info) {
            this.menus.info.updateTitle('Exercise Info');
            this.menus.info.updateContent(consolidatedSections, mobileSuggestedExercises);
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
