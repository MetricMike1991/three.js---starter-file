/**
 * Multi-Thumbnail Menu System
 * Handles 4 separate dropdown menus: Exercises, Muscles, Equipment, Information
 */

class ThumbnailDropdownMenu {
        // Setup search input listener for search menu
        setupSearchListener() {
            if (this.menuType !== 'search') return;
            
            const searchInput = document.getElementById('searchInput');
            const searchActionBtn = document.getElementById('searchActionBtn');
            const searchIcon = searchActionBtn?.querySelector('.search-icon');
            const clearIcon = searchActionBtn?.querySelector('.clear-icon');
            const suggestionsBox = document.getElementById('searchSuggestions');
            
            if (!searchInput || !searchActionBtn) return;
            
            // Generate suggestions based on exercise data
            const generateSuggestions = () => {
                if (!this.allExercises || this.allExercises.length === 0) return;
                
                const suggestions = [];
                
                // Get unique muscle groups (limit to 5)
                const muscleSet = new Set();
                this.allExercises.forEach(ex => {
                    ex.muscleGroup.forEach(m => muscleSet.add(m));
                });
                const muscles = Array.from(muscleSet).slice(0, 5);
                
                // Get unique equipment (limit to 4)
                const equipmentSet = new Set();
                this.allExercises.forEach(ex => {
                    ex.equipment.forEach(e => equipmentSet.add(e));
                });
                const equipment = Array.from(equipmentSet).slice(0, 4);
                
                // Get some popular exercises (first 6)
                const popularExercises = this.allExercises.slice(0, 6);
                
                return { muscles, equipment, popularExercises };
            };
            
            // Show suggestions
            const showSuggestions = () => {
                if (!suggestionsBox || this.searchQuery.length > 0) return;
                
                const data = generateSuggestions();
                if (!data) return;
                
                let html = '';
                
                // Popular Exercises
                if (data.popularExercises.length > 0) {
                    html += '<div class="search-suggestion-category">Popular Exercises</div>';
                    data.popularExercises.forEach(ex => {
                        html += `
                            <div class="search-suggestion-item" data-value="${ex.name}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                                </svg>
                                <span class="search-suggestion-text">${ex.name}</span>
                            </div>
                        `;
                    });
                }
                
                // Muscle Groups
                if (data.muscles.length > 0) {
                    html += '<div class="search-suggestion-category">Muscle Groups</div>';
                    data.muscles.forEach(muscle => {
                        html += `
                            <div class="search-suggestion-item" data-value="${muscle}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                                <span class="search-suggestion-text">${muscle}</span>
                            </div>
                        `;
                    });
                }
                
                // Equipment
                if (data.equipment.length > 0) {
                    html += '<div class="search-suggestion-category">Equipment</div>';
                    data.equipment.forEach(eq => {
                        html += `
                            <div class="search-suggestion-item" data-value="${eq}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                                </svg>
                                <span class="search-suggestion-text">${eq}</span>
                            </div>
                        `;
                    });
                }
                
                suggestionsBox.innerHTML = html;
                suggestionsBox.style.display = 'block';
                
                // Add click handlers to suggestion items
                suggestionsBox.querySelectorAll('.search-suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const value = item.getAttribute('data-value');
                        searchInput.value = value;
                        this.searchQuery = value.toLowerCase().trim();
                        updateButtonIcon();
                        hideSuggestions();
                        this.filterDataForMenu();
                        this.renderVirtualizedGrid();
                    });
                });
            };
            
            // Hide suggestions
            const hideSuggestions = () => {
                if (suggestionsBox) {
                    suggestionsBox.style.display = 'none';
                }
            };
            
            // Update button icon based on search state
            const updateButtonIcon = () => {
                if (this.searchQuery && this.searchQuery.length > 0) {
                    searchIcon.style.display = 'none';
                    clearIcon.style.display = 'block';
                } else {
                    searchIcon.style.display = 'block';
                    clearIcon.style.display = 'none';
                }
            };
            
            // Handle input focus
            searchInput.addEventListener('focus', () => {
                if (!this.searchQuery || this.searchQuery.length === 0) {
                    showSuggestions();
                }
            });
            
            // Handle input blur (with delay to allow clicking suggestions)
            searchInput.addEventListener('blur', () => {
                setTimeout(() => hideSuggestions(), 200);
            });
            
            // Handle input changes
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                updateButtonIcon();
                
                if (this.searchQuery.length === 0) {
                    showSuggestions();
                } else {
                    hideSuggestions();
                }
                
                this.filterDataForMenu();
                this.renderVirtualizedGrid();
            });
            
            // Handle Enter key
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.searchQuery = searchInput.value.toLowerCase().trim();
                    updateButtonIcon();
                    hideSuggestions();
                    this.filterDataForMenu();
                    this.renderVirtualizedGrid();
                } else if (e.key === 'Escape') {
                    hideSuggestions();
                }
            });
            
            // Handle button click (search or clear)
            searchActionBtn.addEventListener('click', () => {
                if (this.searchQuery && this.searchQuery.length > 0) {
                    // Clear search
                    searchInput.value = '';
                    this.searchQuery = '';
                    updateButtonIcon();
                    hideSuggestions();
                    this.filterDataForMenu();
                    this.renderVirtualizedGrid();
                    searchInput.focus();
                } else {
                    // Perform search
                    this.searchQuery = searchInput.value.toLowerCase().trim();
                    updateButtonIcon();
                    hideSuggestions();
                    this.filterDataForMenu();
                    this.renderVirtualizedGrid();
                }
            });
            
            // Focus search input when menu opens
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => {
                    if (this.menuType === 'search' && this.isOpen) {
                        setTimeout(() => {
                            searchInput.focus();
                            updateButtonIcon();
                        }, 150);
                    }
                });
            }
        }
    constructor(menuType) {
        this.menuType = menuType;
        this.isOpen = false;
        this.allExercises = []; // All exercise data from JSON
        this.filteredData = []; // Filtered data for current menu
        this.searchQuery = ''; // For search menu
        this.scrollAmount = 200;
        this.selectedId = null; // Track selected item in this menu
        
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
        updateTitle(title) {
        const titleHeader = document.getElementById(`${this.menuType}TitleHeader`);
        if (titleHeader) {
            titleHeader.textContent = title;
        }
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
                this.setupSearchListener();
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
                // Filter by selected muscle group if one is selected
                if (window.menuManager && window.menuManager.selectedMuscle) {
                    const selectedMuscle = window.menuManager.selectedMuscle;
                    this.filteredData = this.allExercises.filter(exercise => {
                        const isPrimary = exercise.information?.primaryMuscle === selectedMuscle;
                        const isSecondary = exercise.information?.secondaryMuscles?.includes(selectedMuscle);
                        return isPrimary || isSecondary;
                    });
                    
                    // Sort so primary muscle matches come first
                    this.filteredData.sort((a, b) => {
                        const aIsPrimary = a.information?.primaryMuscle === selectedMuscle;
                        const bIsPrimary = b.information?.primaryMuscle === selectedMuscle;
                        if (aIsPrimary && !bIsPrimary) return -1;
                        if (!aIsPrimary && bIsPrimary) return 1;
                        return 0;
                    });
                    
                    console.log(`Filtering exercises by muscle: ${selectedMuscle}, found ${this.filteredData.length} exercises`);
                }
                // Filter by selected equipment if one is selected
                else if (window.menuManager && window.menuManager.selectedEquipment) {
                    this.filteredData = this.allExercises.filter(exercise => 
                        exercise.equipment.includes(window.menuManager.selectedEquipment)
                    );
                    console.log(`Filtering exercises by equipment: ${window.menuManager.selectedEquipment}, found ${this.filteredData.length} exercises`);
                }
                // Show all exercises if no filter is active
                else {
                    this.filteredData = this.allExercises;
                }
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
                
            case 'search':
                // Filter exercises by search query with match metadata
                if (this.searchQuery) {
                    this.filteredData = this.allExercises.map(exercise => {
                        const nameMatch = exercise.name.toLowerCase().includes(this.searchQuery);
                        const muscleMatch = exercise.muscleGroup.some(m => m.toLowerCase().includes(this.searchQuery));
                        const equipmentMatch = exercise.equipment.some(e => e.toLowerCase().includes(this.searchQuery));
                        const primaryMuscleMatch = exercise.information?.primaryMuscle?.toLowerCase().includes(this.searchQuery);
                        const secondaryMuscleMatch = exercise.information?.secondaryMuscles?.some(m => m.toLowerCase().includes(this.searchQuery));
                        
                        // Determine match details
                        let matchType = '';
                        let matchText = '';
                        
                        if (nameMatch) {
                            matchType = 'Exercise Name';
                            matchText = exercise.name;
                        } else if (primaryMuscleMatch) {
                            matchType = 'Primary Muscle';
                            matchText = exercise.information.primaryMuscle;
                        } else if (secondaryMuscleMatch) {
                            matchType = 'Secondary Muscles';
                            const matched = exercise.information.secondaryMuscles.find(m => m.toLowerCase().includes(this.searchQuery));
                            matchText = matched || exercise.information.secondaryMuscles.join(', ');
                        } else if (muscleMatch) {
                            matchType = 'Muscle Group';
                            const matched = exercise.muscleGroup.find(m => m.toLowerCase().includes(this.searchQuery));
                            matchText = matched || exercise.muscleGroup.join(', ');
                        } else if (equipmentMatch) {
                            matchType = 'Equipment';
                            const matched = exercise.equipment.find(e => e.toLowerCase().includes(this.searchQuery));
                            matchText = matched || exercise.equipment.join(', ');
                        }
                        
                        return {
                            ...exercise,
                            searchMatch: {
                                type: matchType,
                                text: matchText
                            }
                        };
                    }).filter(exercise => exercise.searchMatch.type !== '');
                    
                    console.log(`Search found ${this.filteredData.length} exercises for: "${this.searchQuery}"`);
                } else {
                    // Show all exercises when search is empty
                    this.filteredData = this.allExercises;
                }
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

        // Default thumbnail grid rendering for all tabs
        this.thumbnailGrid.innerHTML = '';
        // Create spacer divs for virtualization
        this.topSpacer = document.createElement('div');
        this.bottomSpacer = document.createElement('div');
        this.visibleContainer = document.createElement('div');
        this.thumbnailGrid.appendChild(this.topSpacer);
        this.thumbnailGrid.appendChild(this.visibleContainer);
        this.thumbnailGrid.appendChild(this.bottomSpacer);
        
        // For search menu, don't use infinite scroll - show each result once
        const useInfiniteScroll = this.menuType !== 'search';
        const multiplier = useInfiniteScroll ? this.loopMultiplier : 1;
        
        // Set up total virtual height
        const totalVirtualHeight = this.filteredData.length * this.itemHeight * multiplier;
        this.bottomSpacer.style.height = `${totalVirtualHeight}px`;
        
        // Start in the middle section for infinite scroll, or at top for search
        setTimeout(() => {
            this.scrollContainer.scrollTop = useInfiniteScroll ? this.filteredData.length * this.itemHeight : 0;
            this.updateVirtualizedContent();
        }, 50);
    }

    updateVirtualizedContent() {
        if (!this.visibleContainer || !this.filteredData.length) return;

        // Skip updates during active dragging to prevent jitter
        if (this.isDragging) return;

        const scrollTop = this.scrollContainer.scrollTop;
        const dataLength = this.filteredData.length;
        
        // For search menu, don't use infinite scroll
        const useInfiniteScroll = this.menuType !== 'search';
        const loopMultiplier = useInfiniteScroll ? this.loopMultiplier : 1;
        const totalVirtualHeight = dataLength * this.itemHeight * loopMultiplier;
        
        // Handle infinite loop by wrapping scroll position (only for non-search menus)
        let adjustedScrollTop = scrollTop;
        const sectionHeight = dataLength * this.itemHeight;
        
        // If we're near the boundaries, handle infinite wrapping (only for infinite scroll menus)
        if (useInfiniteScroll && scrollTop < sectionHeight * 0.1) {
            // Near top - jump to second copy
            this.scrollContainer.scrollTop = scrollTop + sectionHeight;
            adjustedScrollTop = this.scrollContainer.scrollTop;
        } else if (useInfiniteScroll && scrollTop > sectionHeight * 2.9) {
            // Near bottom - jump to second copy
            this.scrollContainer.scrollTop = scrollTop - sectionHeight;
            adjustedScrollTop = this.scrollContainer.scrollTop;
        }
        
        // Calculate which items to show with infinite wrapping
        const virtualStartIndex = Math.floor(adjustedScrollTop / this.itemHeight);
        const itemsToShow = this.visibleItems + (this.renderBuffer * 2);
        
        this.startIndex = virtualStartIndex;
        this.endIndex = virtualStartIndex + itemsToShow;

        // Create spacer heights for infinite scroll
        const currentScrollTop = this.scrollContainer.scrollTop;
        const currentSectionHeight = this.filteredData.length * this.itemHeight;
        const virtualTopHeight = Math.floor(currentScrollTop / this.itemHeight) * this.itemHeight;
        
        this.topSpacer.style.height = `${virtualTopHeight}px`;
        this.bottomSpacer.style.height = `${
            (currentSectionHeight * loopMultiplier) - virtualTopHeight - (this.endIndex - this.startIndex) * this.itemHeight
        }px`;

        // Render visible items
        const currentItems = new Set();
        let prevNode = null;
        for (let virtualIndex = this.startIndex; virtualIndex < this.endIndex; virtualIndex++) {
            const dataLength = this.filteredData.length;
            
            // For search menu, don't wrap - just show each item once
            let dataIndex;
            if (useInfiniteScroll) {
                dataIndex = ((virtualIndex % dataLength) + dataLength) % dataLength;
            } else {
                dataIndex = virtualIndex;
                if (dataIndex >= dataLength) continue; // Don't render beyond the data
            }
            
            const item = this.filteredData[dataIndex];
            if (!item) continue;

            const positionId = `${item.id}_pos_${virtualIndex}`;
            currentItems.add(positionId);

            let thumbnailElement = this.visibleContainer.querySelector(`[data-position-id="${positionId}"]`);
            
            // Build search match info for search menu
            let searchMatchHTML = '';
            if (this.menuType === 'search') {
                console.log(`Item: ${item.name}, hasSearchMatch: ${!!item.searchMatch}, searchQuery: "${this.searchQuery}", filteredDataLength: ${this.filteredData.length}`);
            }
            if (this.menuType === 'search' && item.searchMatch && this.searchQuery) {
                const highlightText = (text) => {
                    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
                    return text.replace(regex, '<mark>$1</mark>');
                };
                
                searchMatchHTML = `
                    <div class="thumbnail-search-match">
                        <div class="search-match-type">${item.searchMatch.type}</div>
                        <div class="search-match-text">${highlightText(item.searchMatch.text)}</div>
                    </div>
                `;
                console.log(`Generated searchMatchHTML for ${item.name}:`, searchMatchHTML);
            }
            
            // Build muscle info text for exercises
            let muscleInfoHTML = '';
            if (this.menuType === 'exercises' && item.information) {
                const primaryMuscle = item.information.primaryMuscle || '';
                const secondaryMuscles = item.information.secondaryMuscles || [];
                muscleInfoHTML = `
                    <div class="thumbnail-muscle-info">
                        ${primaryMuscle ? `<div class="primary-muscle"><strong>Primary:</strong> ${primaryMuscle}</div>` : ''}
                        ${secondaryMuscles.length > 0 ? `<div class="secondary-muscles"><strong>Secondary:</strong> ${secondaryMuscles.join(', ')}</div>` : ''}
                    </div>
                `;
            }
            
            const thumbnailHTML = `
                <img src="${item.thumbnailUrl}" alt="${item.name}" loading="lazy">
                <div class="thumbnail-label">${item.name}</div>
                ${searchMatchHTML}
                ${muscleInfoHTML}
            `;
            
            if (!thumbnailElement) {
                thumbnailElement = document.createElement('div');
                thumbnailElement.className = 'thumbnail-item';
                thumbnailElement.dataset.id = item.id;
                thumbnailElement.dataset.positionId = positionId;
                thumbnailElement.innerHTML = thumbnailHTML;
                
                thumbnailElement.addEventListener('click', (e) => {
                    if (this.recentlyDragged && this.hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    this.selectThumbnail(item);
                });
                if (prevNode && prevNode.nextSibling) {
                    this.visibleContainer.insertBefore(thumbnailElement, prevNode.nextSibling);
                } else if (!prevNode && this.visibleContainer.firstChild) {
                    this.visibleContainer.insertBefore(thumbnailElement, this.visibleContainer.firstChild);
                } else {
                    this.visibleContainer.appendChild(thumbnailElement);
                }
            } else {
                // Update existing element's HTML to reflect current data (e.g., search matches)
                const wasSelected = thumbnailElement.classList.contains('selected');
                thumbnailElement.innerHTML = thumbnailHTML;
                // Restore selected class if it was selected
                if (wasSelected) {
                    thumbnailElement.classList.add('selected');
                }
            }
            prevNode = thumbnailElement;
        }
        // Remove only items that are truly out of the visible range
        const existingItems = Array.from(this.visibleContainer.querySelectorAll('.thumbnail-item'));
        for (const el of existingItems) {
            const positionId = el.dataset.positionId;
            if (!currentItems.has(positionId)) {
                this.visibleContainer.removeChild(el);
            }
        }

        // Apply thumbnail radius styling to newly rendered thumbnails
        setTimeout(() => {
            this.updateStyles();
            this.updateThumbnailGlowStyles();
            // Restore selection if item was selected
            if (this.selectedId) {
                const selectedElement = this.visibleContainer.querySelector(`[data-id="${this.selectedId}"]`);
                if (selectedElement) {
                    selectedElement.classList.add('selected');
                }
            }
        }, 50);
    }
    
    selectThumbnail(item) {
        console.log(`Selected ${this.menuType}:`, item.name, item);
        
        // Track selected item ID
        this.selectedId = item.id;
        
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
        
        // Update virtualized content after drag ends to catch up
        setTimeout(() => {
            this.updateVirtualizedContent();
        }, 50);
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
        // For infinite scroll, buttons are never disabled
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
        // Set isOpen flag first to prevent this menu from being closed by the closeAll event
        this.isOpen = true;
        
        // Close other menus first
        document.dispatchEvent(new CustomEvent('closeAllThumbnailMenus', { 
            detail: { except: this.menuType } 
        }));

        // For search tab, focus the input and refresh results
        if (this.menuType === 'search') {
            this.filterDataForMenu();
            this.renderVirtualizedGrid();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 150);
            }
        }

        this.dropdown.classList.add('show');
        this.toggleBtn.classList.add('active');

        // Set cursor to grab for scroll container
        if (this.scrollContainer) {
            this.scrollContainer.style.cursor = 'grab';
        }

        // Keep menu container visible when dropdown is open
        const gridContainer = document.querySelector('.thumbnail-grid-container');
        if (gridContainer) {
            gridContainer.classList.add('menu-active');
        }

        // Ensure content is rendered when menu opens (especially for first open)
        setTimeout(() => {
            if (this.visibleContainer) {
                this.updateVirtualizedContent();
            }
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
        this.selectedMuscle = null; // Track selected muscle for filtering
        this.selectedEquipment = null; // Track selected equipment for filtering
        this.selectedExerciseId = null; // Track selected exercise to preserve selection
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
        this.menus.search = new ThumbnailDropdownMenu('search');
    }
    
    setupGlobalListeners() {
        // Listen for exercise selection to track it
        document.addEventListener('exercisesSelected', (e) => {
            this.selectedExerciseId = e.detail.item.id;
            console.log('Exercise selected and tracked:', e.detail.item.name, 'ID:', this.selectedExerciseId);
        });
        
        // Listen for search selection to make corresponding selections in other tabs
        document.addEventListener('searchSelected', (e) => {
            console.log('Search selection made, selecting corresponding items in other tabs');
            const selectedExercise = e.detail.item;
            
            // Select the exercise in the exercises tab
            if (this.menus.exercises && selectedExercise.id) {
                this.menus.exercises.selectedId = selectedExercise.id;
                this.selectedExerciseId = selectedExercise.id;
                
                setTimeout(() => {
                    if (this.menus.exercises.visibleContainer) {
                        const exerciseThumbnails = this.menus.exercises.visibleContainer.querySelectorAll('.thumbnail-item');
                        exerciseThumbnails.forEach(el => el.classList.remove('selected'));
                        const exerciseElement = this.menus.exercises.visibleContainer.querySelector(`[data-id="${selectedExercise.id}"]`);
                        if (exerciseElement) {
                            exerciseElement.classList.add('selected');
                        }
                    }
                }, 100);
            }
            
            // Select the primary muscle in the muscles tab
            if (this.menus.muscles && selectedExercise.information?.primaryMuscle) {
                const primaryMuscle = selectedExercise.information.primaryMuscle;
                this.selectedMuscle = primaryMuscle;
                
                // Find the muscle ID from the filtered data
                const muscleItem = this.menus.muscles.filteredData.find(m => m.name === primaryMuscle);
                if (muscleItem) {
                    this.menus.muscles.selectedId = muscleItem.id;
                    
                    setTimeout(() => {
                        if (this.menus.muscles.visibleContainer) {
                            const muscleThumbnails = this.menus.muscles.visibleContainer.querySelectorAll('.thumbnail-item');
                            muscleThumbnails.forEach(el => el.classList.remove('selected'));
                            const muscleElement = this.menus.muscles.visibleContainer.querySelector(`[data-id="${muscleItem.id}"]`);
                            if (muscleElement) {
                                muscleElement.classList.add('selected');
                            }
                        }
                    }, 100);
                }
            }
            
            // Select the first equipment in the equipment tab
            if (this.menus.equipment && selectedExercise.equipment && selectedExercise.equipment.length > 0) {
                const equipmentName = selectedExercise.equipment[0];
                this.selectedEquipment = equipmentName;
                
                // Find the equipment ID from the filtered data
                const equipmentItem = this.menus.equipment.filteredData.find(eq => eq.name === equipmentName);
                if (equipmentItem) {
                    this.menus.equipment.selectedId = equipmentItem.id;
                    
                    setTimeout(() => {
                        if (this.menus.equipment.visibleContainer) {
                            const equipmentThumbnails = this.menus.equipment.visibleContainer.querySelectorAll('.thumbnail-item');
                            equipmentThumbnails.forEach(el => el.classList.remove('selected'));
                            const equipmentElement = this.menus.equipment.visibleContainer.querySelector(`[data-id="${equipmentItem.id}"]`);
                            if (equipmentElement) {
                                equipmentElement.classList.add('selected');
                            }
                        }
                    }, 100);
                }
            }
        });
        
        // Listen for muscle selection to filter exercises
        document.addEventListener('musclesSelected', (e) => {
            this.selectedMuscle = e.detail.item.name;
            console.log('Muscle selected:', this.selectedMuscle);
            // Refresh exercises menu to show filtered results
            if (this.menus.exercises) {
                this.menus.exercises.filterDataForMenu();
                // Restore exercise selection after re-render (multiple attempts to ensure it sticks)
                setTimeout(() => this.restoreExerciseSelection(), 200);
                setTimeout(() => this.restoreExerciseSelection(), 400);
            }
        });
        
        // Listen for equipment selection to filter exercises
        document.addEventListener('equipmentSelected', (e) => {
            this.selectedEquipment = e.detail.item.name;
            console.log('Equipment selected:', this.selectedEquipment);
            // Refresh exercises menu to show filtered results
            if (this.menus.exercises) {
                this.menus.exercises.filterDataForMenu();
                // Restore exercise selection after re-render (multiple attempts to ensure it sticks)
                setTimeout(() => this.restoreExerciseSelection(), 200);
                setTimeout(() => this.restoreExerciseSelection(), 400);
            }
        });
        
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
    
    restoreExerciseSelection() {
        // Restore the selected exercise after re-rendering
        if (this.selectedExerciseId && this.menus.exercises && this.menus.exercises.visibleContainer) {
            const selectedElement = this.menus.exercises.visibleContainer.querySelector(`[data-id="${this.selectedExerciseId}"]`);
            if (selectedElement) {
                selectedElement.classList.add('selected');
                console.log('Restored exercise selection:', this.selectedExerciseId);
            } else {
                console.log('Could not restore - element not found:', this.selectedExerciseId);
            }
        }
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