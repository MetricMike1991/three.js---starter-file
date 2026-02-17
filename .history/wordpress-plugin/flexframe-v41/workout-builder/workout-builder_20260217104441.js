/**
 * FlexFrame Workout Builder v1.0
 * Drag-and-drop workout creation with exercise grouping, sharing, and print support
 */
(function() {
    'use strict';

    const SETTINGS = window.flexframeWorkoutSettings || {};
    const AUTOSAVE_KEY = 'ffwb_autosave';
    const AUTOSAVE_INTERVAL = 30000; // 30s

    // ─── State ───────────────────────────────────────────────
    let exerciseCatalogue = [];
    let workoutExercises = [];  // Array of exercise card data
    let workoutId = null;       // WP post ID if saved
    let workoutHash = null;     // Share hash
    let isReadOnly = false;
    let dragState = null;       // Current drag operation
    let groupCounter = 0;       // For generating group IDs
    let autosaveTimer = null;

    // Finder / filter state
    let finderOpen = false;
    let finderSearchQuery = '';
    let selectedTypeFilter = null;      // 'Strength' | 'Cardio' | null
    let selectedMuscleFilter = null;    // single select
    let selectedEquipmentFilter = null; // single select
    let finderFilteredResults = [];
    let finderTargetUid = null;   // Which card the finder is assigning to

    // ─── DOM References ──────────────────────────────────────
    let root, exerciseList, emptyState;
    let workoutNameInput, statExercises, statDuration;
    let shareModal, shareBanner;

    // Finder DOM refs
    let finderToggleBtn, finderPanel, finderSearchInput, finderSearchClear;
    let finderCloseBtn, finderResultsGrid, finderResultsCount;
    let finderNoResults, finderClearFiltersBtn;
    let finderTypeGrid, finderMusclesGrid, finderEquipmentGrid;

    // ─── Init ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        root = document.getElementById('flexframe-workout-builder');
        if (!root) return;

        cacheDom();
        applyPrimaryColor();
        bindEvents();
        loadExerciseCatalogue();

        // Check for shared workout
        const shareHash = root.dataset.shareHash || SETTINGS.shareHash;
        if (shareHash) {
            loadSharedWorkout(shareHash);
        } else {
            restoreAutosave();
        }

        startAutosave();
        bindKeyboardShortcuts();

        console.log('[FlexFrame Workout Builder] Initialized');
    }

    function cacheDom() {
        exerciseList = root.querySelector('.ffwb-exercise-list');
        emptyState = root.querySelector('.ffwb-empty-state');
        workoutNameInput = root.querySelector('.ffwb-workout-name');
        statExercises = root.querySelector('.ffwb-stat-exercises');
        statDuration = root.querySelector('.ffwb-stat-duration');
        shareModal = root.querySelector('.ffwb-modal-share');
        shareBanner = root.querySelector('.ffwb-share-banner');

        // Finder panel refs
        finderToggleBtn = root.querySelector('.ffwb-finder-toggle-btn');
        finderPanel = root.querySelector('.ffwb-finder-panel');
        finderSearchInput = root.querySelector('.ffwb-finder-search');
        finderSearchClear = root.querySelector('.ffwb-finder-search-clear');
        finderCloseBtn = root.querySelector('.ffwb-finder-close-btn');
        finderResultsGrid = root.querySelector('.ffwb-finder-results-grid');
        finderResultsCount = root.querySelector('.ffwb-finder-results-count');
        finderNoResults = root.querySelector('.ffwb-finder-no-results');
        finderClearFiltersBtn = root.querySelector('.ffwb-finder-clear-filters');
        finderTypeGrid = root.querySelector('.ffwb-filter-type-grid');
        finderMusclesGrid = root.querySelector('.ffwb-filter-muscles-grid');
        finderEquipmentGrid = root.querySelector('.ffwb-filter-equipment-grid');
    }

    function applyPrimaryColor() {
        const color = SETTINGS.primaryColor || '#ec2f2c';
        root.style.setProperty('--ffwb-primary', color);
        // Parse hex to RGB for rgba() usage
        const r = parseInt(color.slice(1,3), 16);
        const g = parseInt(color.slice(3,5), 16);
        const b = parseInt(color.slice(5,7), 16);
        root.style.setProperty('--ffwb-primary-rgb', `${r}, ${g}, ${b}`);
    }

    // ─── Exercise Catalogue ──────────────────────────────────
    async function loadExerciseCatalogue() {
        try {
            const res = await fetch(SETTINGS.exercisesCdn);
            exerciseCatalogue = await res.json();
            console.log(`[Workout Builder] Loaded ${exerciseCatalogue.length} exercises from catalogue`);
            initFinder();
        } catch (err) {
            console.error('[Workout Builder] Failed to load exercise catalogue:', err);
        }
    }

    // ─── Events ─────────────────────────────────────────────
    function bindEvents() {
        // Add Exercise button → creates empty card
        finderToggleBtn?.addEventListener('click', addEmptyExercise);
        finderCloseBtn?.addEventListener('click', () => closeFinder());
        finderSearchInput?.addEventListener('input', debounce(onFinderSearch, 200));
        finderSearchClear?.addEventListener('click', () => {
            finderSearchInput.value = '';
            finderSearchQuery = '';
            finderSearchClear.style.display = 'none';
            filterAndRenderResults();
        });
        finderClearFiltersBtn?.addEventListener('click', clearAllFilters);

        // Header buttons
        root.querySelector('.ffwb-btn-save')?.addEventListener('click', () => saveWorkout('private'));
        root.querySelector('.ffwb-btn-share')?.addEventListener('click', () => saveWorkout('public'));
        root.querySelectorAll('.ffwb-btn-print').forEach(btn => btn.addEventListener('click', printWorkout));

        // Share modal
        shareModal?.querySelector('.ffwb-modal-backdrop')?.addEventListener('click', closeShareModal);
        shareModal?.querySelector('.ffwb-modal-close')?.addEventListener('click', closeShareModal);
        shareModal?.querySelector('.ffwb-btn-copy-link')?.addEventListener('click', copyShareLink);
        shareModal?.querySelector('.ffwb-btn-modal-print')?.addEventListener('click', printWorkout);

        // Share banner actions
        shareBanner?.querySelector('.ffwb-btn-copy-workout')?.addEventListener('click', copyWorkoutToMine);

        // Click outside finder panel closes it
        document.addEventListener('click', (e) => {
            if (!finderOpen) return;
            // If click is inside finder panel or on the toggle button, ignore
            if (finderPanel?.contains(e.target)) return;
            if (finderToggleBtn?.contains(e.target)) return;
            // If click is on a card name (which opens finder), ignore
            if (e.target.closest('.ffwb-card-name-pick')) return;
            closeFinder();
        });
    }

    // ─── Exercise Finder Panel ────────────────────────────────
    const MUSCLES = ['Chest','Back','Shoulders','Biceps','Triceps','Abs','Quads','Glutes','Hamstrings','Calves'];
    const EQUIPMENT = ['Barbell','Dumbbell','Cables','Machines','Kettlebell','Body Weight'];
    const MUSCLE_ICONS = {Chest:'🫁',Back:'🔙',Shoulders:'🤷',Biceps:'💪',Triceps:'💪',Abs:'🎯',Quads:'🦵',Glutes:'🍑',Hamstrings:'🦵',Calves:'🦶'};
    const EQUIP_ICONS = {Barbell:'🏋️',Dumbbell:'🏋️',Cables:'⚡',Machines:'⚙️',Kettlebell:'🔔','Body Weight':'🤸'};
    const CARDIO_KEYWORDS = ['treadmill','bike','elliptical','rower','jump rope','stair','rowing','cardio','run','jog','sprint','cycle'];

    function addEmptyExercise() {
        const uid = generateUid();
        const card = {
            uid,
            exerciseId: null,
            name: '',
            thumbnailUrl: '',
            muscleGroup: [],
            configUrl: '',
            sets: 3,
            reps: '10',
            rest: 60,
            weight: '',
            notes: '',
            groupId: null,
            order: workoutExercises.length,
        };
        workoutExercises.push(card);
        renderExerciseList();
        updateStats();
        scrollToBottom();
    }

    function openFinderForCard(uid) {
        finderTargetUid = uid;
        // Highlight the target card
        exerciseList.querySelectorAll('.ffwb-card').forEach(c => c.classList.remove('ffwb-card-finder-target'));
        const targetCard = exerciseList.querySelector(`.ffwb-card[data-uid="${uid}"]`);
        if (targetCard) targetCard.classList.add('ffwb-card-finder-target');
        // Open finder panel
        finderOpen = true;
        finderPanel.style.display = 'flex';
        finderToggleBtn.classList.add('ffwb-finder-active');
        if (window.innerWidth > 768) {
            setTimeout(() => finderSearchInput.focus(), 150);
        }
    }

    function closeFinder() {
        finderOpen = false;
        finderPanel.style.display = 'none';
        finderToggleBtn.classList.remove('ffwb-finder-active');
        finderTargetUid = null;
        // Remove target highlight
        exerciseList.querySelectorAll('.ffwb-card-finder-target').forEach(c => c.classList.remove('ffwb-card-finder-target'));
    }

    function assignExerciseToCard(uid, catalogueExercise) {
        const card = workoutExercises.find(e => e.uid === uid);
        if (!card) return;
        card.exerciseId = catalogueExercise.id;
        card.name = catalogueExercise.name;
        card.thumbnailUrl = catalogueExercise.thumbnailUrl || '';
        card.muscleGroup = catalogueExercise.muscleGroup || [];
        card.configUrl = catalogueExercise.configUrl || '';
        closeFinder();
        renderExerciseList();
        showToast('✅ ' + catalogueExercise.name + ' assigned!');
    }

    function initFinder() {
        if (!finderTypeGrid) return;
        buildFilterSection(finderTypeGrid, ['Strength','Cardio'], 'type');
        buildFilterSection(finderMusclesGrid, MUSCLES, 'muscle');
        buildFilterSection(finderEquipmentGrid, EQUIPMENT, 'equipment');
        filterAndRenderResults();
    }

    function buildFilterSection(container, items, filterType) {
        container.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'ffwb-filter-card';
            card.dataset.value = item;
            card.dataset.filterType = filterType;

            let icon = '';
            if (filterType === 'type') icon = item === 'Strength' ? '🏋️' : '🏃';
            else if (filterType === 'muscle') icon = MUSCLE_ICONS[item] || '💪';
            else icon = EQUIP_ICONS[item] || '⚡';

            card.innerHTML = `<span class="ffwb-filter-icon">${icon}</span><span class="ffwb-filter-label">${item}</span>`;

            card.addEventListener('click', () => {
                handleFilterClick(card, item, filterType, container);
            });

            container.appendChild(card);
        });
    }

    function handleFilterClick(card, value, filterType, container) {
        const isSelected = card.classList.contains('ffwb-filter-selected');

        // Clear same-type selections (single select per category)
        container.querySelectorAll('.ffwb-filter-card').forEach(c => c.classList.remove('ffwb-filter-selected'));

        if (isSelected) {
            // Deselect
            if (filterType === 'type') selectedTypeFilter = null;
            else if (filterType === 'muscle') selectedMuscleFilter = null;
            else selectedEquipmentFilter = null;
        } else {
            // Select
            card.classList.add('ffwb-filter-selected');
            if (filterType === 'type') {
                selectedTypeFilter = value;
                // Cardio: clear muscle & equipment filters
                if (value === 'Cardio') {
                    selectedMuscleFilter = null;
                    selectedEquipmentFilter = null;
                    finderMusclesGrid.querySelectorAll('.ffwb-filter-card').forEach(c => c.classList.remove('ffwb-filter-selected'));
                    finderEquipmentGrid.querySelectorAll('.ffwb-filter-card').forEach(c => c.classList.remove('ffwb-filter-selected'));
                }
            }
            else if (filterType === 'muscle') selectedMuscleFilter = value;
            else selectedEquipmentFilter = value;
        }

        updateClearFiltersBtn();
        filterAndRenderResults();
    }

    function clearAllFilters() {
        selectedTypeFilter = null;
        selectedMuscleFilter = null;
        selectedEquipmentFilter = null;
        finderSearchQuery = '';
        if (finderSearchInput) finderSearchInput.value = '';
        if (finderSearchClear) finderSearchClear.style.display = 'none';
        root.querySelectorAll('.ffwb-filter-card').forEach(c => c.classList.remove('ffwb-filter-selected'));
        updateClearFiltersBtn();
        filterAndRenderResults();
    }

    function updateClearFiltersBtn() {
        const hasFilters = selectedTypeFilter || selectedMuscleFilter || selectedEquipmentFilter || finderSearchQuery;
        if (finderClearFiltersBtn) finderClearFiltersBtn.style.display = hasFilters ? 'inline-block' : 'none';
    }

    function onFinderSearch() {
        finderSearchQuery = finderSearchInput.value.trim().toLowerCase();
        finderSearchClear.style.display = finderSearchQuery ? 'block' : 'none';
        updateClearFiltersBtn();
        filterAndRenderResults();
    }

    function getExerciseType(exercise) {
        const isCardio = CARDIO_KEYWORDS.some(kw =>
            exercise.name.toLowerCase().includes(kw) ||
            (exercise.equipment || []).some(e => e.toLowerCase().includes(kw))
        );
        return isCardio ? 'Cardio' : 'Strength';
    }

    function filterAndRenderResults() {
        let results = exerciseCatalogue.slice();

        // Type filter
        if (selectedTypeFilter) {
            results = results.filter(ex => getExerciseType(ex) === selectedTypeFilter);
        }

        // Muscle filter
        if (selectedMuscleFilter) {
            results = results.filter(ex => {
                const muscles = new Set();
                (ex.muscleGroup || []).forEach(m => muscles.add(m));
                if (ex.information?.primaryMuscle) muscles.add(ex.information.primaryMuscle);
                (ex.information?.secondaryMuscles || []).forEach(m => muscles.add(m));
                return muscles.has(selectedMuscleFilter);
            });
        }

        // Equipment filter
        if (selectedEquipmentFilter) {
            results = results.filter(ex =>
                (ex.equipment || []).includes(selectedEquipmentFilter)
            );
        }

        // Text search
        if (finderSearchQuery && finderSearchQuery.length >= 2) {
            results = results.filter(ex =>
                ex.name.toLowerCase().includes(finderSearchQuery) ||
                (ex.muscleGroup || []).some(m => m.toLowerCase().includes(finderSearchQuery)) ||
                (ex.equipment || []).some(e => e.toLowerCase().includes(finderSearchQuery))
            );
        }

        finderFilteredResults = results;
        renderFinderResults();
    }

    function renderFinderResults() {
        if (!finderResultsGrid) return;
        const results = finderFilteredResults;

        // Count label
        const hasFilters = selectedTypeFilter || selectedMuscleFilter || selectedEquipmentFilter || finderSearchQuery;
        finderResultsCount.textContent = hasFilters 
            ? `${results.length} exercise${results.length !== 1 ? 's' : ''} found`
            : `All exercises (${results.length})`;

        if (results.length === 0) {
            finderResultsGrid.innerHTML = '';
            finderNoResults.style.display = 'flex';
            return;
        }
        finderNoResults.style.display = 'none';

        finderResultsGrid.innerHTML = results.map(ex => `
            <div class="ffwb-finder-item" data-exercise-id="${ex.id}">
                <div class="ffwb-finder-item-thumb">
                    ${ex.thumbnailUrl
                        ? `<img src="${ex.thumbnailUrl}" alt="${ex.name}" loading="lazy">`
                        : `<div class="ffwb-finder-item-placeholder">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>
                           </div>`
                    }
                </div>
                <div class="ffwb-finder-item-info">
                    <div class="ffwb-finder-item-name">${ex.name}</div>
                    <div class="ffwb-finder-item-meta">${(ex.muscleGroup || []).join(', ')}</div>
                </div>
            </div>
        `).join('');

        // Bind click to select
        finderResultsGrid.querySelectorAll('.ffwb-finder-item').forEach(el => {
            const exId = el.dataset.exerciseId;

            el.addEventListener('click', () => {
                const exercise = exerciseCatalogue.find(c => c.id === exId);
                if (!exercise) return;

                if (finderTargetUid) {
                    // Assign to the target card
                    el.classList.add('ffwb-finder-item-added');
                    setTimeout(() => assignExerciseToCard(finderTargetUid, exercise), 300);
                } else {
                    // Fallback: create new card with this exercise
                    addExercise(exercise);
                    el.classList.add('ffwb-finder-item-added');
                    setTimeout(() => el.classList.remove('ffwb-finder-item-added'), 600);
                    showToast('✅ ' + exercise.name + ' added!');
                }
            });
        });
    }

    // ─── Exercise Cards ──────────────────────────────────────
    function addExercise(catalogueExercise, options = {}) {
        const card = {
            uid: generateUid(),
            exerciseId: catalogueExercise.id,
            name: catalogueExercise.name,
            thumbnailUrl: catalogueExercise.thumbnailUrl || '',
            muscleGroup: catalogueExercise.muscleGroup || [],
            configUrl: catalogueExercise.configUrl || '',
            sets: options.sets || 3,
            reps: options.reps || '10',
            rest: options.rest || 60,
            weight: options.weight || '',
            notes: options.notes || '',
            groupId: options.groupId || null,
            order: workoutExercises.length,
        };

        workoutExercises.push(card);
        renderExerciseList();
        updateStats();
        scrollToBottom();
    }

    function duplicateExercise(uid) {
        const original = workoutExercises.find(e => e.uid === uid);
        if (!original) return;

        const idx = workoutExercises.indexOf(original);
        const duplicate = {
            ...original,
            uid: generateUid(),
            order: idx + 1,
        };

        workoutExercises.splice(idx + 1, 0, duplicate);
        reindexOrders();
        renderExerciseList();
        updateStats();
    }

    function removeExercise(uid) {
        workoutExercises = workoutExercises.filter(e => e.uid !== uid);
        reindexOrders();
        renderExerciseList();
        updateStats();
    }

    function renderExerciseList() {
        // Remove all cards (keep empty state)
        exerciseList.querySelectorAll('.ffwb-card, .ffwb-group-wrapper, .ffwb-link-zone').forEach(el => el.remove());

        if (workoutExercises.length === 0) {
            emptyState.style.display = 'flex';
            return;
        }
        emptyState.style.display = 'none';

        // Group exercises
        const groups = buildGroups();
        let exerciseNumber = 1;

        groups.forEach((group) => {
            if (group.length === 1 && !group[0].groupId) {
                // Standalone exercise
                const card = createCardElement(group[0], exerciseNumber, null, null);
                exerciseList.appendChild(card);
                // Link zone after card (for mobile linking)
                if (!isReadOnly) {
                    const linkZone = createLinkZone(group[0].uid);
                    exerciseList.appendChild(linkZone);
                }
                exerciseNumber++;
            } else {
                // Grouped exercises (superset/giant set)
                const wrapper = document.createElement('div');
                wrapper.className = 'ffwb-group-wrapper';
                wrapper.dataset.groupId = group[0].groupId;

                const groupLabel = group.length === 2 ? 'Superset' : group.length === 3 ? 'Triset' : 'Giant Set';
                const badge = document.createElement('div');
                badge.className = 'ffwb-group-badge';
                badge.textContent = groupLabel;
                wrapper.appendChild(badge);

                const bracket = document.createElement('div');
                bracket.className = 'ffwb-group-bracket';
                wrapper.appendChild(bracket);

                const cardsContainer = document.createElement('div');
                cardsContainer.className = 'ffwb-group-cards';

                group.forEach((ex, i) => {
                    const subLabel = String.fromCharCode(97 + i); // a, b, c...
                    const card = createCardElement(ex, exerciseNumber, subLabel, group[0].groupId);
                    cardsContainer.appendChild(card);
                });

                wrapper.appendChild(cardsContainer);
                exerciseList.appendChild(wrapper);

                // Link zone after group
                if (!isReadOnly) {
                    const linkZone = createLinkZone(group[group.length - 1].uid);
                    exerciseList.appendChild(linkZone);
                }
                exerciseNumber++;
            }
        });
    }

    function createCardElement(exercise, number, subLabel, groupId) {
        const card = document.createElement('div');
        card.className = 'ffwb-card' + (isReadOnly ? ' ffwb-card-readonly' : '');
        card.dataset.uid = exercise.uid;
        if (!isReadOnly) card.draggable = true;

        const label = subLabel ? `${number}${subLabel}` : `${number}`;
        const isUnassigned = !exercise.exerciseId;

        if (isUnassigned) card.classList.add('ffwb-card-unassigned');

        card.innerHTML = `
            <div class="ffwb-card-inner">
                <div class="ffwb-card-thumb-wrap">
                    <div class="ffwb-card-thumb ffwb-flip-container">
                        <div class="ffwb-flip-inner">
                            <div class="ffwb-flip-front">
                                ${isUnassigned
                                    ? `<div class="ffwb-thumb-placeholder ffwb-thumb-empty">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                                       </div>`
                                    : exercise.thumbnailUrl 
                                        ? `<img src="${exercise.thumbnailUrl}" alt="${exercise.name}" loading="lazy">`
                                        : `<div class="ffwb-thumb-placeholder">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>
                                           </div>`
                                }
                            </div>
                            <div class="ffwb-flip-back">
                                <canvas class="ffwb-qr-canvas" width="80" height="80"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="ffwb-card-number">${label}</div>
                </div>
                <div class="ffwb-card-body">
                    <div class="ffwb-card-header-row">
                        <span class="ffwb-card-name ffwb-card-name-pick" data-uid="${exercise.uid}" title="${isUnassigned ? 'Choose an exercise' : 'Click to change exercise'}">
                            ${isUnassigned 
                                ? `<svg class="ffwb-pick-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg> Choose Exercise…`
                                : exercise.name
                            }
                        </span>
                        ${!isReadOnly ? `
                        <div class="ffwb-card-actions">
                            <button class="ffwb-card-btn ffwb-card-btn-dup" title="Duplicate (Ctrl+D)">⧉</button>
                            <button class="ffwb-card-btn ffwb-card-btn-del" title="Remove">✕</button>
                            ${!isMobile() ? `<div class="ffwb-card-drag-handle" title="Drag to reorder">≡</div>` : ''}
                        </div>
                        ` : ''}
                    </div>
                    <div class="ffwb-card-stats">
                        <div class="ffwb-card-stat">
                            <label>Sets</label>
                            <input type="number" class="ffwb-input ffwb-input-sets" value="${exercise.sets}" min="1" max="20" ${isReadOnly ? 'readonly' : ''}>
                        </div>
                        <span class="ffwb-card-stat-x">×</span>
                        <div class="ffwb-card-stat">
                            <label>Reps</label>
                            <input type="text" class="ffwb-input ffwb-input-reps" value="${exercise.reps}" maxlength="10" ${isReadOnly ? 'readonly' : ''}>
                        </div>
                        <span class="ffwb-card-stat-divider">·</span>
                        <div class="ffwb-card-stat">
                            <label>Rest</label>
                            <div class="ffwb-rest-wrap">
                                <input type="number" class="ffwb-input ffwb-input-rest" value="${exercise.rest}" min="0" max="600" step="15" ${isReadOnly ? 'readonly' : ''}>
                                <span class="ffwb-rest-unit">s</span>
                            </div>
                        </div>
                        <span class="ffwb-card-stat-divider">·</span>
                        <div class="ffwb-card-stat">
                            <label>Weight</label>
                            <input type="text" class="ffwb-input ffwb-input-weight" value="${exercise.weight}" placeholder="—" maxlength="10" ${isReadOnly ? 'readonly' : ''}>
                        </div>
                    </div>
                    <div class="ffwb-card-expand-row">
                        <button class="ffwb-card-expand-btn">▼ More</button>
                    </div>
                    <div class="ffwb-card-expanded" style="display:none;">
                        <div class="ffwb-card-muscles">
                            <strong>Muscles:</strong> ${exercise.muscleGroup.join(', ') || 'N/A'}
                        </div>
                        <div class="ffwb-card-notes-wrap">
                            <label>Notes:</label>
                            <textarea class="ffwb-input ffwb-input-notes" placeholder="Add notes..." rows="2" ${isReadOnly ? 'readonly' : ''}>${exercise.notes}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Bind card events
        if (!isReadOnly) {
            // Clickable name to open finder
            card.querySelector('.ffwb-card-name-pick')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openFinderForCard(exercise.uid);
            });

            card.querySelector('.ffwb-card-btn-dup')?.addEventListener('click', (e) => {
                e.stopPropagation();
                duplicateExercise(exercise.uid);
            });
            card.querySelector('.ffwb-card-btn-del')?.addEventListener('click', (e) => {
                e.stopPropagation();
                removeExercise(exercise.uid);
            });

            // Inline editing - sync to state
            card.querySelectorAll('.ffwb-input').forEach(input => {
                input.addEventListener('change', () => syncCardToState(exercise.uid, card));
            });

            // Drag events (PC only)
            if (!isMobile()) {
                bindDragEvents(card, exercise.uid);
            }
        }

        // Expand/collapse
        card.querySelector('.ffwb-card-expand-btn')?.addEventListener('click', () => {
            const expanded = card.querySelector('.ffwb-card-expanded');
            const btn = card.querySelector('.ffwb-card-expand-btn');
            if (expanded.style.display === 'none') {
                expanded.style.display = 'block';
                btn.textContent = '▲ Less';
            } else {
                expanded.style.display = 'none';
                btn.textContent = '▼ More';
            }
        });

        // Flip thumbnail to QR
        card.querySelector('.ffwb-flip-container')?.addEventListener('click', () => {
            const inner = card.querySelector('.ffwb-flip-inner');
            inner.classList.toggle('ffwb-flipped');
            // Generate QR on first flip
            if (inner.classList.contains('ffwb-flipped')) {
                generateQRForCard(card, exercise);
            }
        });

        return card;
    }

    function createLinkZone(afterUid) {
        const zone = document.createElement('div');
        zone.className = 'ffwb-link-zone';
        zone.dataset.afterUid = afterUid;

        // Find the exercise after this one
        const idx = workoutExercises.findIndex(e => e.uid === afterUid);
        const nextEx = workoutExercises[idx + 1];
        if (!nextEx) return zone; // Last exercise, no link zone needed

        const currentEx = workoutExercises[idx];
        const areLinked = currentEx.groupId && currentEx.groupId === nextEx.groupId;

        if (isMobile()) {
            const btn = document.createElement('button');
            btn.className = 'ffwb-link-btn' + (areLinked ? ' ffwb-linked' : '');
            btn.innerHTML = areLinked 
                ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 17h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5zm1-6h8v2H8z"/></svg>'
                : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 17h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5z"/></svg>';
            btn.title = areLinked ? 'Unlink superset' : 'Link as superset';
            btn.addEventListener('click', () => toggleLink(afterUid));
            zone.appendChild(btn);
        }

        return zone;
    }

    // ─── Grouping / Linking ──────────────────────────────────
    function toggleLink(afterUid) {
        const idx = workoutExercises.findIndex(e => e.uid === afterUid);
        if (idx < 0 || idx >= workoutExercises.length - 1) return;

        const current = workoutExercises[idx];
        const next = workoutExercises[idx + 1];

        if (current.groupId && current.groupId === next.groupId) {
            // Unlink: split group at this point
            const oldGroupId = current.groupId;
            const groupMembers = workoutExercises.filter(e => e.groupId === oldGroupId);
            const splitIdx = groupMembers.indexOf(next);

            // Members after split point get a new group (or become standalone)
            const afterMembers = groupMembers.slice(splitIdx);
            if (afterMembers.length === 1) {
                afterMembers[0].groupId = null;
            } else {
                const newGroupId = 'group-' + (++groupCounter);
                afterMembers.forEach(m => m.groupId = newGroupId);
            }

            // Members before split point: if only 1, make standalone
            const beforeMembers = groupMembers.slice(0, splitIdx);
            if (beforeMembers.length === 1) {
                beforeMembers[0].groupId = null;
            }
        } else {
            // Link: merge into a group
            const groupId = current.groupId || next.groupId || 'group-' + (++groupCounter);
            
            // If current has a group, merge next into it
            if (current.groupId) {
                next.groupId = current.groupId;
                // If next had its own group, merge all of that group too
                if (next.groupId && next.groupId !== current.groupId) {
                    const oldId = next.groupId;
                    workoutExercises.filter(e => e.groupId === oldId).forEach(e => e.groupId = current.groupId);
                }
            } else if (next.groupId) {
                current.groupId = next.groupId;
            } else {
                current.groupId = groupId;
                next.groupId = groupId;
            }
        }

        renderExerciseList();
    }

    // ─── Drag & Drop (PC) ────────────────────────────────────
    function bindDragEvents(card, uid) {
        const handle = card.querySelector('.ffwb-card-drag-handle');
        
        card.addEventListener('dragstart', (e) => {
            // Only allow drag from handle
            if (handle && !handle.contains(e.target) && e.target !== handle) {
                e.preventDefault();
                return;
            }
            dragState = { uid };
            card.classList.add('ffwb-dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', uid);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('ffwb-dragging');
            clearDropIndicators();
            dragState = null;
        });

        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!dragState || dragState.uid === uid) return;

            const rect = card.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            const snapZone = 30;

            clearDropIndicators();

            if (e.clientY < midY) {
                card.classList.add('ffwb-drop-above');
            } else {
                card.classList.add('ffwb-drop-below');
            }

            // Snap zone detection for grouping
            const distFromEdge = Math.min(e.clientY - rect.top, rect.bottom - e.clientY);
            if (distFromEdge < snapZone) {
                card.classList.add('ffwb-snap-highlight');
            }
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('ffwb-drop-above', 'ffwb-drop-below', 'ffwb-snap-highlight');
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!dragState || dragState.uid === uid) return;

            const dragIdx = workoutExercises.findIndex(ex => ex.uid === dragState.uid);
            const dropIdx = workoutExercises.findIndex(ex => ex.uid === uid);
            if (dragIdx < 0 || dropIdx < 0) return;

            const rect = card.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            const snapZone = 30;
            const distFromEdge = Math.min(e.clientY - rect.top, rect.bottom - e.clientY);

            // Remove dragged from array
            const [dragged] = workoutExercises.splice(dragIdx, 1);
            
            // Recalc drop index after removal
            const newDropIdx = workoutExercises.findIndex(ex => ex.uid === uid);
            const insertIdx = e.clientY < midY ? newDropIdx : newDropIdx + 1;
            workoutExercises.splice(insertIdx, 0, dragged);

            // Snap grouping
            if (distFromEdge < snapZone) {
                const targetEx = workoutExercises.find(ex => ex.uid === uid);
                if (targetEx) {
                    const groupId = targetEx.groupId || 'group-' + (++groupCounter);
                    targetEx.groupId = groupId;
                    dragged.groupId = groupId;
                }
            } else {
                // Dropped into a gap — make standalone
                dragged.groupId = null;
            }

            reindexOrders();
            renderExerciseList();
            updateStats();
            clearDropIndicators();
            dragState = null;
        });
    }

    function clearDropIndicators() {
        exerciseList.querySelectorAll('.ffwb-drop-above, .ffwb-drop-below, .ffwb-snap-highlight').forEach(el => {
            el.classList.remove('ffwb-drop-above', 'ffwb-drop-below', 'ffwb-snap-highlight');
        });
    }

    // ─── Save / Load ─────────────────────────────────────────
    async function saveWorkout(visibility = 'private') {
        const name = workoutNameInput.value.trim();
        if (!name) {
            workoutNameInput.focus();
            workoutNameInput.classList.add('ffwb-input-error');
            setTimeout(() => workoutNameInput.classList.remove('ffwb-input-error'), 2000);
            return;
        }

        if (workoutExercises.length === 0) {
            showToast('Add at least one exercise');
            return;
        }

        // Check for unassigned cards
        const unassigned = workoutExercises.filter(e => !e.exerciseId);
        if (unassigned.length > 0) {
            showToast(`${unassigned.length} exercise${unassigned.length > 1 ? 's' : ''} still need to be assigned`);
            // Highlight the first unassigned card
            openFinderForCard(unassigned[0].uid);
            return;
        }

        if (!SETTINGS.isLoggedIn) {
            showToast('Please log in to save workouts');
            return;
        }

        const payload = {
            name,
            exercises: workoutExercises.map(e => ({
                exerciseId: e.exerciseId,
                name: e.name,
                thumbnailUrl: e.thumbnailUrl,
                sets: parseInt(e.sets) || 3,
                reps: e.reps,
                rest: parseInt(e.rest) || 60,
                weight: e.weight,
                notes: e.notes,
                groupId: e.groupId,
                order: e.order,
            })),
            tags: [],
            estimatedDuration: calculateDuration(),
            visibility,
        };

        try {
            let res;
            if (workoutId) {
                // Update existing
                res = await fetch(SETTINGS.restUrl + 'workouts/' + workoutId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': SETTINGS.nonce,
                    },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create new
                res = await fetch(SETTINGS.restUrl + 'workouts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': SETTINGS.nonce,
                    },
                    body: JSON.stringify(payload),
                });
            }

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Save failed');

            workoutId = data.id;
            workoutHash = data.hash;

            if (visibility === 'public') {
                showShareModal(data.shareUrl);
            } else {
                showToast('✅ Workout saved!');
            }

            // Clear autosave
            localStorage.removeItem(AUTOSAVE_KEY);

        } catch (err) {
            console.error('[Workout Builder] Save error:', err);
            showToast('Failed to save: ' + err.message);
        }
    }

    async function loadSharedWorkout(hash) {
        try {
            const res = await fetch(SETTINGS.restUrl + 'workouts/shared/' + hash);
            if (!res.ok) throw new Error('Workout not found');
            const data = await res.json();

            isReadOnly = data.readOnly || false;
            workoutNameInput.value = data.name;
            if (isReadOnly) {
                workoutNameInput.readOnly = true;
                root.querySelectorAll('.ffwb-btn-save, .ffwb-btn-share, .ffwb-finder').forEach(el => el.style.display = 'none');
            }

            // Show share banner
            shareBanner.style.display = 'flex';
            shareBanner.querySelector('.ffwb-share-banner-text').textContent = 
                `"${data.name}" shared by ${data.author}`;

            // Populate exercises
            if (data.exercises && data.exercises.length) {
                data.exercises.forEach(ex => {
                    const catalogueMatch = exerciseCatalogue.find(c => c.id === ex.exerciseId) || {};
                    workoutExercises.push({
                        uid: generateUid(),
                        exerciseId: ex.exerciseId,
                        name: ex.name || catalogueMatch.name || ex.exerciseId,
                        thumbnailUrl: ex.thumbnailUrl || catalogueMatch.thumbnailUrl || '',
                        muscleGroup: catalogueMatch.muscleGroup || [],
                        configUrl: catalogueMatch.configUrl || '',
                        sets: ex.sets,
                        reps: ex.reps,
                        rest: ex.rest,
                        weight: ex.weight || '',
                        notes: ex.notes || '',
                        groupId: ex.groupId || null,
                        order: ex.order,
                    });
                });

                renderExerciseList();
                updateStats();
            }
        } catch (err) {
            console.error('[Workout Builder] Failed to load shared workout:', err);
            showToast('Could not load this workout');
        }
    }

    async function copyWorkoutToMine() {
        if (!SETTINGS.isLoggedIn) {
            showToast('Please log in to copy workouts');
            return;
        }
        // Switch to edit mode with the loaded exercises
        isReadOnly = false;
        workoutId = null;
        workoutHash = null;
        workoutNameInput.readOnly = false;
        workoutNameInput.value += ' (Copy)';
        root.querySelectorAll('.ffwb-btn-save, .ffwb-btn-share, .ffwb-finder').forEach(el => el.style.display = '');
        shareBanner.style.display = 'none';
        renderExerciseList();
        showToast('Workout copied! You can now edit and save it.');
    }

    // ─── Autosave ────────────────────────────────────────────
    function startAutosave() {
        autosaveTimer = setInterval(() => {
            if (workoutExercises.length > 0 && !isReadOnly) {
                const data = {
                    name: workoutNameInput.value,
                    exercises: workoutExercises,
                    timestamp: Date.now(),
                };
                localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
            }
        }, AUTOSAVE_INTERVAL);
    }

    function restoreAutosave() {
        try {
            const saved = localStorage.getItem(AUTOSAVE_KEY);
            if (!saved) return;
            const data = JSON.parse(saved);
            
            // Only restore if less than 24 hours old
            if (Date.now() - data.timestamp > 86400000) {
                localStorage.removeItem(AUTOSAVE_KEY);
                return;
            }

            if (data.exercises && data.exercises.length > 0) {
                if (confirm('You have an unsaved workout. Resume editing?')) {
                    workoutNameInput.value = data.name || '';
                    workoutExercises = data.exercises.map(e => ({ ...e, uid: e.uid || generateUid() }));
                    renderExerciseList();
                    updateStats();
                } else {
                    localStorage.removeItem(AUTOSAVE_KEY);
                }
            }
        } catch (err) {
            localStorage.removeItem(AUTOSAVE_KEY);
        }
    }

    // ─── Print ───────────────────────────────────────────────
    function printWorkout() {
        const printLayout = document.getElementById('flexframe-workout-print');
        if (!printLayout) return;

        printLayout.style.display = 'block';

        // Build print header
        printLayout.querySelector('.ffwb-print-title').textContent = 
            workoutNameInput.value || 'Untitled Workout';

        // Build print exercises
        const container = printLayout.querySelector('.ffwb-print-exercises');
        container.innerHTML = '';

        const groups = buildGroups();
        let exerciseNumber = 1;

        groups.forEach(group => {
            if (group.length > 1) {
                const groupLabel = group.length === 2 ? 'SUPERSET' : group.length === 3 ? 'TRISET' : 'GIANT SET';
                const groupDiv = document.createElement('div');
                groupDiv.className = 'ffwb-print-group';
                groupDiv.innerHTML = `<div class="ffwb-print-group-label">── ${groupLabel} ──</div>`;

                group.forEach((ex, i) => {
                    const sub = String.fromCharCode(97 + i);
                    groupDiv.appendChild(createPrintExercise(ex, `${exerciseNumber}${sub}`));
                    if (i < group.length - 1) {
                        const arrow = document.createElement('div');
                        arrow.className = 'ffwb-print-arrow';
                        arrow.textContent = '→ straight into ↓';
                        groupDiv.appendChild(arrow);
                    }
                });

                const restLine = document.createElement('div');
                restLine.className = 'ffwb-print-rest';
                restLine.textContent = `Rest: ${group[group.length - 1].rest}s after ${groupLabel.toLowerCase()}`;
                groupDiv.appendChild(restLine);

                container.appendChild(groupDiv);
            } else {
                container.appendChild(createPrintExercise(group[0], `${exerciseNumber}`));
            }
            exerciseNumber++;
        });

        // Build print footer
        const notesLines = printLayout.querySelector('.ffwb-print-notes-lines');
        notesLines.innerHTML = Array(3).fill('<div class="ffwb-print-line"></div>').join('');

        // Trigger print
        setTimeout(() => {
            window.print();
            // Hide print layout after print dialog closes
            setTimeout(() => { printLayout.style.display = 'none'; }, 500);
        }, 200);
    }

    function createPrintExercise(exercise, label) {
        const div = document.createElement('div');
        div.className = 'ffwb-print-exercise';

        const sets = parseInt(exercise.sets) || 3;
        let rows = '';
        for (let i = 1; i <= sets; i++) {
            rows += `
                <tr>
                    <td class="ffwb-print-td-set">${i}</td>
                    <td class="ffwb-print-td-target">${exercise.reps}</td>
                    <td class="ffwb-print-td-actual"></td>
                    <td class="ffwb-print-td-weight">${exercise.weight || ''}</td>
                    <td class="ffwb-print-td-notes"></td>
                </tr>
            `;
        }

        div.innerHTML = `
            <div class="ffwb-print-exercise-header">
                <div class="ffwb-print-exercise-thumb">
                    ${exercise.thumbnailUrl 
                        ? `<img src="${exercise.thumbnailUrl}" alt="${exercise.name}">` 
                        : `<div class="ffwb-print-thumb-placeholder">${label}</div>`
                    }
                </div>
                <div class="ffwb-print-exercise-title">${label}. ${exercise.name || '(Unassigned)'}</div>
                <div class="ffwb-print-exercise-rest">Rest: ${exercise.rest}s</div>
            </div>
            <table class="ffwb-print-table">
                <thead>
                    <tr>
                        <th>Set</th>
                        <th>Target</th>
                        <th>Actual</th>
                        <th>Weight</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;

        return div;
    }

    // ─── Share Modal ─────────────────────────────────────────
    function showShareModal(shareUrl) {
        if (!shareModal) return;
        shareModal.style.display = 'flex';
        shareModal.querySelector('.ffwb-share-link-input').value = shareUrl;
    }

    function closeShareModal() {
        if (shareModal) shareModal.style.display = 'none';
    }

    function copyShareLink() {
        const input = shareModal.querySelector('.ffwb-share-link-input');
        navigator.clipboard.writeText(input.value).then(() => {
            showToast('📋 Link copied!');
        });
    }

    // ─── Keyboard Shortcuts ──────────────────────────────────
    function bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (isReadOnly) return;
            
            // Ctrl+N — add new exercise
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                addEmptyExercise();
            }
            // Ctrl+S — save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveWorkout('private');
            }
            // Ctrl+P — print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                printWorkout();
            }

            // Tab navigation through inputs
            if (e.key === 'Tab' && e.target.closest('.ffwb-card')) {
                // Let default tab behavior work through card inputs
            }
        });
    }

    // ─── Helpers ─────────────────────────────────────────────
    function buildGroups() {
        const groups = [];
        let currentGroup = [];
        let lastGroupId = null;

        workoutExercises.forEach(ex => {
            if (ex.groupId && ex.groupId === lastGroupId) {
                currentGroup.push(ex);
            } else {
                if (currentGroup.length > 0) groups.push(currentGroup);
                currentGroup = [ex];
                lastGroupId = ex.groupId;
            }
        });
        if (currentGroup.length > 0) groups.push(currentGroup);

        return groups;
    }

    function syncCardToState(uid, card) {
        const ex = workoutExercises.find(e => e.uid === uid);
        if (!ex) return;
        ex.sets = card.querySelector('.ffwb-input-sets')?.value || 3;
        ex.reps = card.querySelector('.ffwb-input-reps')?.value || '10';
        ex.rest = card.querySelector('.ffwb-input-rest')?.value || 60;
        ex.weight = card.querySelector('.ffwb-input-weight')?.value || '';
        ex.notes = card.querySelector('.ffwb-input-notes')?.value || '';
        updateStats();
    }

    function reindexOrders() {
        workoutExercises.forEach((ex, i) => ex.order = i);
    }

    function updateStats() {
        const count = workoutExercises.length;
        statExercises.textContent = `${count} exercise${count !== 1 ? 's' : ''}`;
        statDuration.textContent = `~${calculateDuration()} min`;
    }

    function calculateDuration() {
        let totalSeconds = 0;
        workoutExercises.forEach(ex => {
            const sets = parseInt(ex.sets) || 3;
            const rest = parseInt(ex.rest) || 60;
            const timePerSet = 40; // avg seconds per set
            totalSeconds += (sets * timePerSet) + ((sets - 1) * rest);
        });
        return Math.round(totalSeconds / 60);
    }

    function generateUid() {
        return 'ex_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    function isMobile() {
        return window.innerWidth <= 768 || ('ontouchstart' in window);
    }

    function scrollToBottom() {
        exerciseList.scrollTop = exerciseList.scrollHeight;
    }

    function showToast(message) {
        let toast = root.querySelector('.ffwb-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'ffwb-toast';
            root.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('ffwb-toast-show');
        setTimeout(() => toast.classList.remove('ffwb-toast-show'), 3000);
    }

    function generateQRForCard(card, exercise) {
        // Simple QR placeholder — in production use a QR library
        const canvas = card.querySelector('.ffwb-qr-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 80, 80);
        ctx.fillStyle = '#000';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('QR Code', 40, 35);
        ctx.fillText(exercise.name.substring(0, 15), 40, 50);
    }

    function debounce(fn, ms) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), ms);
        };
    }

})();
