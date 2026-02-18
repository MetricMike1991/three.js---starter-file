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
    let root, exerciseList;
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
        // emptyState removed — ghost card is the CTA
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
        root.querySelectorAll('.ffwb-btn-pdf').forEach(btn => btn.addEventListener('click', downloadWorkoutPDF));

        // Share modal
        shareModal?.querySelector('.ffwb-modal-backdrop')?.addEventListener('click', closeShareModal);
        shareModal?.querySelector('.ffwb-modal-close')?.addEventListener('click', closeShareModal);
        shareModal?.querySelector('.ffwb-btn-copy-link')?.addEventListener('click', copyShareLink);
        shareModal?.querySelector('.ffwb-btn-modal-pdf')?.addEventListener('click', downloadWorkoutPDF);

        // Share banner actions
        shareBanner?.querySelector('.ffwb-btn-edit-workout')?.addEventListener('click', editSharedWorkout);
        shareBanner?.querySelector('.ffwb-btn-copy-workout')?.addEventListener('click', copyWorkoutToMine);

        // Click outside finder panel closes it
        document.addEventListener('click', (e) => {
            if (!finderOpen) return;
            // If click is inside finder panel, ignore
            if (finderPanel?.contains(e.target)) return;
            if (finderToggleBtn?.contains(e.target)) return;
            if (e.target.closest('.ffwb-card-name-pick')) return;
            // If click is on the backdrop, close
            if (e.target.classList.contains('ffwb-finder-backdrop')) {
                closeFinder();
                return;
            }
            closeFinder();
        });

        // Escape key closes finder
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && finderOpen) closeFinder();
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
            rir: '2',
            notes: '',
            groupId: null,
            order: workoutExercises.length,
        };
        workoutExercises.push(card);
        renderExerciseList();
        updateStats();

        // Animate the newly added card
        const newCard = exerciseList.querySelector(`.ffwb-card[data-uid="${uid}"]`);
        if (newCard) {
            newCard.classList.add('ffwb-card-entering');
            newCard.addEventListener('animationend', () => {
                newCard.classList.remove('ffwb-card-entering');
            }, { once: true });
        }
        scrollToBottom();
    }

    function openFinderForCard(uid) {
        finderTargetUid = uid;
        // Highlight the target card
        exerciseList.querySelectorAll('.ffwb-card').forEach(c => c.classList.remove('ffwb-card-finder-target'));
        const targetCard = exerciseList.querySelector(`.ffwb-card[data-uid="${uid}"]`);
        if (targetCard) targetCard.classList.add('ffwb-card-finder-target');
        // Add backdrop
        let backdrop = document.querySelector('.ffwb-finder-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'ffwb-finder-backdrop';
            backdrop.addEventListener('click', () => closeFinder());
            document.body.appendChild(backdrop);
        }
        // Open finder panel
        finderOpen = true;
        finderPanel.style.display = 'flex';
        finderToggleBtn.classList.add('ffwb-finder-active');
        document.body.style.overflow = 'hidden';
        if (window.innerWidth > 768) {
            setTimeout(() => finderSearchInput.focus(), 150);
        }
    }

    function closeFinder() {
        finderOpen = false;
        finderPanel.style.display = 'none';
        finderToggleBtn.classList.remove('ffwb-finder-active');
        finderTargetUid = null;
        // Remove backdrop
        const backdrop = document.querySelector('.ffwb-finder-backdrop');
        if (backdrop) backdrop.remove();
        document.body.style.overflow = '';
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
                }
            });
        });
    }

    // ─── Exercise Cards ──────────────────────────────────────
    function addExercise(catalogueExercise, options = {}) {
        const uid = generateUid();
        const card = {
            uid,
            exerciseId: catalogueExercise.id,
            name: catalogueExercise.name,
            thumbnailUrl: catalogueExercise.thumbnailUrl || '',
            muscleGroup: catalogueExercise.muscleGroup || [],
            configUrl: catalogueExercise.configUrl || '',
            sets: options.sets || 3,
            reps: options.reps || '10',
            rest: options.rest || 60,
            weight: options.weight || '',
            rir: options.rir || '2',
            notes: options.notes || '',
            groupId: options.groupId || null,
            order: workoutExercises.length,
        };

        workoutExercises.push(card);
        renderExerciseList();
        updateStats();

        // Animate the newly added card
        const newCard = exerciseList.querySelector(`.ffwb-card[data-uid="${uid}"]`);
        if (newCard) {
            newCard.classList.add('ffwb-card-entering');
            newCard.addEventListener('animationend', () => {
                newCard.classList.remove('ffwb-card-entering');
            }, { once: true });
        }
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
        // Remove all cards
        exerciseList.querySelectorAll('.ffwb-card, .ffwb-group-wrapper, .ffwb-link-zone').forEach(el => el.remove());

        if (workoutExercises.length === 0) {
            return;
        }

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

                    // Add unlink button between grouped cards
                    if (i < group.length - 1 && !isReadOnly) {
                        const unlinkZone = document.createElement('div');
                        unlinkZone.className = 'ffwb-unlink-zone';
                        const unlinkBtn = document.createElement('button');
                        unlinkBtn.className = 'ffwb-link-btn ffwb-linked';
                        unlinkBtn.title = 'Unlink superset';
                        unlinkBtn.addEventListener('click', () => toggleLink(ex.uid));
                        unlinkZone.appendChild(unlinkBtn);
                        cardsContainer.appendChild(unlinkZone);
                    }
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
        card.className = 'ffwb-card' + (isReadOnly ? ' ffwb-card-readonly' : '') + (groupId ? ' ffwb-card-grouped' : '');
        card.dataset.uid = exercise.uid;
        // draggable is NOT set here – bindDragEvents enables it only on mousedown outside form fields

        const label = subLabel ? `${number}${subLabel}` : `${number}`;
        const isUnassigned = !exercise.exerciseId;

        if (isUnassigned) card.classList.add('ffwb-card-unassigned');

        card.innerHTML = `
            <div class="ffwb-swipe-actions">
                <button class="ffwb-swipe-btn ffwb-swipe-btn-dup" data-uid="${exercise.uid}" title="Duplicate">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                    <span>Duplicate</span>
                </button>
                <button class="ffwb-swipe-btn ffwb-swipe-btn-del" data-uid="${exercise.uid}" title="Delete">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    <span>Delete</span>
                </button>
            </div>
            <div class="ffwb-card-inner ffwb-swipe-content">
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
                                <img class="ffwb-qr-img" src="" alt="QR" style="width:100%;height:100%;object-fit:contain;display:none;">
                                <span class="ffwb-qr-loading" style="font-size:10px;color:#999;">Loading…</span>
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
                        </div>
                        ` : ''}
                    </div>
                    <div class="ffwb-card-stats">
                        <div class="ffwb-card-stat">
                            <label>Sets</label>
                            <select class="ffwb-input ffwb-input-sets" ${isReadOnly ? 'disabled' : ''}>
                                ${[1,2,3,4,5,6,7,8,9,10].map(v => `<option value="${v}" ${v == exercise.sets ? 'selected' : ''}>${v}</option>`).join('')}
                            </select>
                        </div>
                        <span class="ffwb-card-stat-x">×</span>
                        <div class="ffwb-card-stat">
                            <label>Reps</label>
                            <select class="ffwb-input ffwb-input-reps" ${isReadOnly ? 'disabled' : ''}>
                                ${[1,2,3,4,5,6,7,8,9,10,12,15,20,25,30,'AMRAP'].map(v => `<option value="${v}" ${v == exercise.reps ? 'selected' : ''}>${v}</option>`).join('')}
                            </select>
                        </div>
                        <span class="ffwb-card-stat-divider">·</span>
                        <div class="ffwb-card-stat">
                            <label>Rest</label>
                            <select class="ffwb-input ffwb-input-rest" ${isReadOnly ? 'disabled' : ''}>
                                ${[
                                    {v: 0, t: 'No Rest'},
                                    {v: 10, t: '10 Seconds'},
                                    {v: 20, t: '20 Seconds'},
                                    {v: 30, t: '30 Seconds'},
                                    {v: 45, t: '45 Seconds'},
                                    {v: 60, t: '60 Seconds'},
                                    {v: 90, t: '90 Seconds'},
                                    {v: 120, t: '2 Mins'},
                                    {v: 180, t: '3 Mins'},
                                    {v: 300, t: '5 Mins'},
                                    {v: 600, t: '10 Mins'}
                                ].map(o => `<option value="${o.v}" ${o.v == exercise.rest ? 'selected' : ''}>${o.t}</option>`).join('')}
                            </select>
                        </div>
                        <span class="ffwb-card-stat-divider ffwb-rir-inline">·</span>
                        <div class="ffwb-card-stat ffwb-rir-inline">
                            <label title="Reps In Reserve — how many reps you could still do. 'Train To Failure' = 0 reps left in the tank.">RIR ⓘ</label>
                            <select class="ffwb-input ffwb-input-rir" ${isReadOnly ? 'disabled' : ''} title="Reps In Reserve: how close to muscular failure you should train. Lower RIR = harder.">
                                ${[
                                    {v: '0', t: 'Train To Failure'},
                                    {v: '1', t: '1 RIR'},
                                    {v: '2', t: '2 RIR'},
                                    {v: '3', t: '3 RIR'},
                                    {v: '4', t: '4 RIR'},
                                    {v: '5', t: '5 RIR'}
                                ].map(o => `<option value="${o.v}" ${o.v == exercise.rir ? 'selected' : ''}>${o.t}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="ffwb-card-expand-row">
                        ${!isUnassigned && exercise.exerciseId ? `<a class="ffwb-btn-learn3d" href="#" data-exercise-id="${exercise.exerciseId}" target="_blank" rel="noopener noreferrer" title="Learn how to perform this exercise in 3D">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                            Learn in 3D
                        </a>` : ''}
                        <button class="ffwb-card-expand-btn">▼ More</button>
                    </div>
                    <div class="ffwb-card-expanded" style="display:none;">
                        <div class="ffwb-card-rir-mobile">
                            <label title="Reps In Reserve">RIR ⓘ</label>
                            <select class="ffwb-input ffwb-input-rir-mobile" ${isReadOnly ? 'disabled' : ''} title="Reps In Reserve">
                                ${[
                                    {v: '0', t: 'Train To Failure'},
                                    {v: '1', t: '1 RIR'},
                                    {v: '2', t: '2 RIR'},
                                    {v: '3', t: '3 RIR'},
                                    {v: '4', t: '4 RIR'},
                                    {v: '5', t: '5 RIR'}
                                ].map(o => `<option value="${o.v}" ${o.v == exercise.rir ? 'selected' : ''}>${o.t}</option>`).join('')}
                            </select>
                        </div>
                        <div class="ffwb-card-muscles">
                            <strong>Muscles:</strong> ${exercise.muscleGroup.join(', ') || 'N/A'}
                        </div>
                        <div class="ffwb-card-notes-wrap">
                            <label>Notes:</label>
                            <textarea class="ffwb-input ffwb-input-notes" placeholder="Add notes..." rows="2" ${isReadOnly ? 'readonly' : ''}>${exercise.notes}</textarea>
                        </div>
                    </div>
                </div>
                ${!isReadOnly && !groupId ? `
                <div class="ffwb-card-reorder">
                    <button class="ffwb-reorder-btn ffwb-reorder-up" data-uid="${exercise.uid}" title="Move up">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
                    </button>
                    <button class="ffwb-reorder-btn ffwb-reorder-down" data-uid="${exercise.uid}" title="Move down">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                    </button>
                </div>
                ` : ''}
            </div>
        `;

        // Bind card events
        if (!isReadOnly) {
            // Mobile reorder buttons
            card.querySelector('.ffwb-reorder-up')?.addEventListener('click', (e) => {
                e.stopPropagation();
                moveExercise(exercise.uid, -1);
            });
            card.querySelector('.ffwb-reorder-down')?.addEventListener('click', (e) => {
                e.stopPropagation();
                moveExercise(exercise.uid, 1);
            });

            // Clickable name to open finder
            card.querySelector('.ffwb-card-name-pick')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openFinderForCard(exercise.uid);
            });

            // Learn in 3D link
            card.querySelector('.ffwb-btn-learn3d')?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const exId = e.currentTarget.dataset.exerciseId;
                const viewerUrl = (window.flexframeWorkoutSettings?.viewerPageUrl || '').replace(/\/$/, '');
                if (viewerUrl && exId) {
                    const sep = viewerUrl.indexOf('?') !== -1 ? '&' : '?';
                    window.open(viewerUrl + sep + 'exercise=' + exId, '_blank');
                }
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

            // Sync inline RIR ↔ mobile RIR
            const rirInline = card.querySelector('.ffwb-input-rir');
            const rirMobile = card.querySelector('.ffwb-input-rir-mobile');
            if (rirInline && rirMobile) {
                rirInline.addEventListener('change', () => {
                    rirMobile.value = rirInline.value;
                    syncCardToState(exercise.uid, card);
                });
                rirMobile.addEventListener('change', () => {
                    rirInline.value = rirMobile.value;
                    syncCardToState(exercise.uid, card);
                });
            }

            // Drag events (only for ungrouped cards)
            if (!groupId) {
                bindDragEvents(card, exercise.uid);
            }

            // Swipe actions (mobile)
            card.querySelector('.ffwb-swipe-btn-dup')?.addEventListener('click', (e) => {
                e.stopPropagation();
                closeSwipe(card);
                duplicateExercise(exercise.uid);
            });
            card.querySelector('.ffwb-swipe-btn-del')?.addEventListener('click', (e) => {
                e.stopPropagation();
                closeSwipe(card);
                removeExercise(exercise.uid);
            });

            bindSwipeGesture(card);
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

        // Thumbnail click: open finder if unassigned, otherwise flip to QR
        card.querySelector('.ffwb-flip-container')?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!exercise.exerciseId) {
                openFinderForCard(exercise.uid);
                return;
            }
            const inner = card.querySelector('.ffwb-flip-inner');
            inner.classList.toggle('ffwb-flipped');
            // Generate QR on first flip
            if (inner.classList.contains('ffwb-flipped')) {
                generateQRForCard(card, exercise);
            }
        });

        // Also make the whole thumb-wrap clickable for unassigned cards
        if (!exercise.exerciseId) {
            card.querySelector('.ffwb-card-thumb-wrap')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openFinderForCard(exercise.uid);
            });
        }

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

        // Always show link button
        const btn = document.createElement('button');
        btn.className = 'ffwb-link-btn' + (areLinked ? ' ffwb-linked' : '');
        btn.title = areLinked ? 'Unlink superset' : 'Link as superset';
        btn.addEventListener('click', () => toggleLink(afterUid));
        zone.appendChild(btn);

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

    // ─── Drag & Drop (Reorder Only) ───────────────────────────
    function bindDragEvents(card, uid) {
        // Card starts NON-draggable. Only becomes draggable on mousedown
        // outside of form elements. This avoids the browser intercepting
        // clicks on <select>, <input>, etc.
        card.addEventListener('mousedown', (e) => {
            if (!e.target.closest('select, input, textarea, button, a, label')) {
                card.draggable = true;
            }
        });
        // Reset to non-draggable after interaction
        card.addEventListener('mouseup',  () => { card.draggable = false; });
        card.addEventListener('mouseleave', () => { card.draggable = false; });

        card.addEventListener('dragstart', (e) => {
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

            clearDropIndicators();

            if (e.clientY < midY) {
                card.classList.add('ffwb-drop-above');
            } else {
                card.classList.add('ffwb-drop-below');
            }
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('ffwb-drop-above', 'ffwb-drop-below');
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!dragState || dragState.uid === uid) return;

            const dragIdx = workoutExercises.findIndex(ex => ex.uid === dragState.uid);
            const dropIdx = workoutExercises.findIndex(ex => ex.uid === uid);
            if (dragIdx < 0 || dropIdx < 0) return;

            const rect = card.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;

            // Remove dragged from array
            const [dragged] = workoutExercises.splice(dragIdx, 1);
            
            // Recalc drop index after removal
            const newDropIdx = workoutExercises.findIndex(ex => ex.uid === uid);
            const insertIdx = e.clientY < midY ? newDropIdx : newDropIdx + 1;
            workoutExercises.splice(insertIdx, 0, dragged);

            reindexOrders();
            renderExerciseList();
            updateStats();
            clearDropIndicators();
            dragState = null;
        });

    }

    function clearDropIndicators() {
        exerciseList.querySelectorAll('.ffwb-drop-above, .ffwb-drop-below').forEach(el => {
            el.classList.remove('ffwb-drop-above', 'ffwb-drop-below');
        });
    }

    // ─── Mobile Reorder (Up / Down Buttons) ───────────────
    function moveExercise(uid, direction) {
        const idx = workoutExercises.findIndex(ex => ex.uid === uid);
        const newIdx = idx + direction;
        if (idx < 0 || newIdx < 0 || newIdx >= workoutExercises.length) return;

        // Get the two cards that will swap
        const cards = exerciseList.querySelectorAll('.ffwb-card');
        const cardA = cards[idx];   // the card being moved
        const cardB = cards[newIdx]; // the card in the target position
        if (!cardA || !cardB) return;

        // Measure positions before swap
        const rectA = cardA.getBoundingClientRect();
        const rectB = cardB.getBoundingClientRect();
        const deltaA = rectB.top - rectA.top;
        const deltaB = rectA.top - rectB.top;

        // Animate both cards simultaneously (FLIP technique)
        cardA.style.transition = 'none';
        cardB.style.transition = 'none';
        cardA.style.transform = `translateY(${deltaA}px)`;
        cardB.style.transform = `translateY(${deltaB}px)`;
        cardA.style.zIndex = '10';

        // Force reflow then animate to final position
        cardA.offsetHeight;
        const dur = '0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        cardA.style.transition = `transform ${dur}`;
        cardB.style.transition = `transform ${dur}`;
        cardA.style.transform = 'translateY(0)';
        cardB.style.transform = 'translateY(0)';

        // After animation, commit the swap in data and re-render
        setTimeout(() => {
            cardA.style.transition = '';
            cardA.style.transform = '';
            cardA.style.zIndex = '';
            cardB.style.transition = '';
            cardB.style.transform = '';

            // Preserve scroll position across re-render
            const scrollY = window.scrollY;

            // Swap in array
            [workoutExercises[idx], workoutExercises[newIdx]] = [workoutExercises[newIdx], workoutExercises[idx]];
            reindexOrders();
            renderExerciseList();
            updateStats();

            // Restore scroll position
            window.scrollTo(0, scrollY);
        }, 300);
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
                rir: e.rir || '2',
                weight: e.weight || '',
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
                        rir: ex.rir || '2',
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

    function editSharedWorkout() {
        // Switch to edit mode — anyone can edit locally
        isReadOnly = false;
        workoutId = null;
        workoutHash = null;
        workoutNameInput.readOnly = false;

        // Show save/share if logged in, hide if not
        if (SETTINGS.isLoggedIn) {
            root.querySelectorAll('.ffwb-btn-save, .ffwb-btn-share').forEach(el => el.style.display = '');
        }
        root.querySelector('.ffwb-finder').style.display = '';

        // Update banner to show editing state
        shareBanner.querySelector('.ffwb-share-banner-text').textContent = 'Editing workout — changes are local until you save.';
        shareBanner.querySelector('.ffwb-btn-edit-workout').style.display = 'none';
        shareBanner.querySelector('.ffwb-btn-copy-workout').style.display = 'none';

        renderExerciseList();
        showToast('✏️ Edit mode — make your changes!');
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

    // ─── PDF Download ──────────────────────────────────────────
    async function downloadWorkoutPDF() {
        if (typeof window.jspdf === 'undefined') {
            showToast('⚠️ PDF library not loaded. Please refresh.');
            return;
        }

        showToast('📄 Generating PDF…');

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const pw = 210, ph = 297, m = 15;
        const cw = pw - 2 * m;
        let y = m;

        // ── helpers ──
        function needsPage(h) {
            if (y + h > ph - m) { doc.addPage(); y = m; return true; }
            return false;
        }

        function imgToBase64(url) {
            if (!url) return Promise.resolve(null);
            return new Promise(resolve => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    try {
                        const c = document.createElement('canvas');
                        c.width = img.naturalWidth;
                        c.height = img.naturalHeight;
                        c.getContext('2d').drawImage(img, 0, 0);
                        resolve(c.toDataURL('image/png'));
                    } catch { resolve(null); }
                };
                img.onerror = () => resolve(null);
                img.src = url;
            });
        }

        // ── preload all images in parallel ──
        const viewerBase = (window.flexframeWorkoutSettings?.viewerPageUrl || '').replace(/\/$/, '');
        const logoUrl = window.flexframeWorkoutSettings?.logoUrl;
        const imageJobs = {};

        if (logoUrl) imageJobs.logo = imgToBase64(logoUrl);

        workoutExercises.forEach(ex => {
            if (ex.thumbnailUrl) imageJobs['thumb_' + ex.uid] = imgToBase64(ex.thumbnailUrl);
            if (ex.exerciseId && viewerBase) {
                const sep = viewerBase.indexOf('?') !== -1 ? '&' : '?';
                const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='
                    + encodeURIComponent(viewerBase + sep + 'exercise=' + ex.exerciseId);
                imageJobs['qr_' + ex.uid] = imgToBase64(qrUrl);
            }
        });

        const keys = Object.keys(imageJobs);
        const vals = await Promise.all(Object.values(imageJobs));
        const img = {};
        keys.forEach((k, i) => { img[k] = vals[i]; });

        // ── HEADER ──
        const title = (workoutNameInput.value || 'Untitled Workout').toUpperCase();
        let hx = m;
        if (img.logo) {
            try { doc.addImage(img.logo, 'PNG', m, y, 10, 10); hx = m + 14; } catch {}
        }

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(title, hx, y + 7);

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80);
        doc.text('Date: ___ / ___ / ___', pw - m, y + 7, { align: 'right' });
        doc.setTextColor(0);

        y += 14;
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(m, y, pw - m, y);
        y += 8;

        // ── EXERCISES ──
        const groups = buildGroups();
        let exNum = 1;

        for (const group of groups) {
            const isGroup = group.length > 1;
            const groupLabel = group.length === 2 ? 'SUPERSET'
                : group.length === 3 ? 'TRISET' : 'GIANT SET';

            if (isGroup) {
                needsPage(8);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(100);
                doc.text('── ' + groupLabel + ' ──', pw / 2, y, { align: 'center' });
                doc.setTextColor(0);
                y += 6;
            }

            for (let gi = 0; gi < group.length; gi++) {
                const exercise = group[gi];
                const label = isGroup
                    ? exNum + String.fromCharCode(97 + gi)
                    : '' + exNum;
                const sets = parseInt(exercise.sets) || 3;

                // estimate height and page-break if needed
                const estH = 18 + (sets + 1) * 7 + (exercise.notes ? 10 : 0) + 8;
                needsPage(estH);
                const exStartY = y;

                // thumbnail
                const thumbSize = 12;
                let textX = m;
                const thumbData = img['thumb_' + exercise.uid];
                if (thumbData) {
                    try { doc.addImage(thumbData, 'JPEG', m, y, thumbSize, thumbSize); textX = m + thumbSize + 3; } catch {}
                }

                // QR area
                const qrSize = 18;
                const qrData = img['qr_' + exercise.uid];
                const hasQR = !!qrData;
                const tableRight = m + (hasQR ? qrSize + 5 : 0);

                // exercise URL
                let exUrl = '';
                if (exercise.exerciseId && viewerBase) {
                    const sep = viewerBase.indexOf('?') !== -1 ? '&' : '?';
                    exUrl = viewerBase + sep + 'exercise=' + exercise.exerciseId;
                }

                // exercise name
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0);
                doc.text(label + '. ' + (exercise.name || '(Unassigned)'), textX, y + 5);

                // rest + RIR
                const rirLabel = exercise.rir == '0' ? 'Train To Failure' : exercise.rir + ' RIR';
                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(100);
                doc.text('Rest: ' + exercise.rest + 's · ' + rirLabel, textX, y + 10);
                doc.setTextColor(0);

                y += 14;

                // sets table via autoTable
                const tBody = [];
                for (let s = 1; s <= sets; s++) {
                    tBody.push(['' + s, exercise.reps || '', '', exercise.weight || '', '']);
                }

                doc.autoTable({
                    startY: y,
                    margin: { left: m, right: tableRight },
                    head: [['Set', 'Target', 'Actual', 'Weight', 'Notes']],
                    body: tBody,
                    styles: { fontSize: 9, cellPadding: 2, lineWidth: 0.1, lineColor: [180, 180, 180], textColor: [0, 0, 0] },
                    headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold', fontSize: 8 },
                    columnStyles: {
                        0: { halign: 'center', cellWidth: 12 },
                        1: { halign: 'center', cellWidth: 18 },
                        2: { cellWidth: 18 },
                        3: { cellWidth: 22 },
                    },
                    theme: 'grid',
                });

                y = doc.lastAutoTable.finalY;

                // QR code image (right-aligned alongside table)
                if (hasQR) {
                    try {
                        const qrX = pw - m - qrSize;
                        const qrY = exStartY;
                        doc.addImage(qrData, 'PNG', qrX, qrY, qrSize, qrSize);
                        if (exUrl) doc.link(qrX, qrY, qrSize, qrSize, { url: exUrl });
                    } catch {}
                }

                // clickable "Learn in 3D" link under QR (or at right if no QR)
                if (exUrl) {
                    const linkText = 'Learn in 3D \u2192';
                    doc.setFontSize(7);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(0, 128, 0);
                    const linkW = doc.getTextWidth(linkText);
                    if (hasQR) {
                        const linkX = pw - m - qrSize / 2 - linkW / 2;
                        const linkY = exStartY + qrSize + 3;
                        doc.text(linkText, linkX, linkY);
                        doc.link(linkX, linkY - 3, linkW, 4, { url: exUrl });
                    } else {
                        const linkX = pw - m - linkW;
                        doc.text(linkText, linkX, exStartY + 5);
                        doc.link(linkX, exStartY + 1, linkW, 5, { url: exUrl });
                    }
                    doc.setTextColor(0);
                }

                // exercise notes
                if (exercise.notes && exercise.notes.trim()) {
                    y += 3;
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'italic');
                    doc.setTextColor(80);
                    const noteLines = doc.splitTextToSize('Notes: ' + exercise.notes.trim(), cw - 4);
                    doc.text(noteLines, m + 2, y + 3);
                    y += noteLines.length * 4 + 3;
                    doc.setTextColor(0);
                    doc.setFont(undefined, 'normal');
                }

                y += 6;

                // arrow between grouped exercises
                if (isGroup && gi < group.length - 1) {
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'italic');
                    doc.setTextColor(130);
                    doc.text('\u2192 straight into \u2193', pw / 2, y, { align: 'center' });
                    doc.setTextColor(0);
                    doc.setFont(undefined, 'normal');
                    y += 5;
                }
            }

            // group rest line
            if (isGroup) {
                doc.setFontSize(8);
                doc.setFont(undefined, 'italic');
                doc.setTextColor(100);
                doc.text('Rest: ' + group[group.length - 1].rest + 's after ' + groupLabel.toLowerCase(),
                    pw / 2, y, { align: 'center' });
                doc.setTextColor(0);
                doc.setFont(undefined, 'normal');
                y += 6;
            }

            exNum++;
        }

        // ── FOOTER ──
        needsPage(30);
        y += 4;
        doc.setDrawColor(180);
        doc.setLineWidth(0.1);
        doc.line(m, y, pw - m, y);
        y += 6;

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0);
        doc.text('Notes:', m, y);
        y += 4;

        for (let i = 0; i < 3; i++) {
            y += 8;
            doc.setDrawColor(200);
            doc.setLineWidth(0.1);
            doc.line(m, y, pw - m, y);
        }

        // ── SAVE ──
        const filename = (workoutNameInput.value || 'workout')
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '_') + '.pdf';
        doc.save(filename);
        showToast('✅ PDF downloaded!');
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

        // Build QR code URL for this exercise
        let qrHtml = '';
        if (exercise.exerciseId) {
            const viewerBase = (window.flexframeWorkoutSettings?.viewerPageUrl || '').replace(/\/$/, '');
            if (viewerBase) {
                const sep = viewerBase.indexOf('?') !== -1 ? '&' : '?';
                const exUrl = viewerBase + sep + 'exercise=' + exercise.exerciseId;
                const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=' + encodeURIComponent(exUrl);
                qrHtml = `<div class="ffwb-print-exercise-qr"><img src="${qrSrc}" alt="QR"></div>`;
            }
        }

        // Build notes HTML if the exercise has notes
        let notesHtml = '';
        if (exercise.notes && exercise.notes.trim()) {
            notesHtml = `<div class="ffwb-print-exercise-notes"><strong>Notes:</strong> ${exercise.notes.trim()}</div>`;
        }

        // Build RIR label
        const rirLabel = exercise.rir == '0' ? 'Train To Failure' : `${exercise.rir} RIR`;

        div.innerHTML = `
            <div class="ffwb-print-exercise-header">
                <div class="ffwb-print-exercise-thumb">
                    ${exercise.thumbnailUrl 
                        ? `<img src="${exercise.thumbnailUrl}" alt="${exercise.name}">` 
                        : `<div class="ffwb-print-thumb-placeholder">${label}</div>`
                    }
                </div>
                <div class="ffwb-print-exercise-title">${label}. ${exercise.name || '(Unassigned)'}</div>
                <div class="ffwb-print-exercise-rest">Rest: ${exercise.rest}s · ${rirLabel}</div>
                ${qrHtml}
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
            ${notesHtml}
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
        ex.rir = card.querySelector('.ffwb-input-rir')?.value || card.querySelector('.ffwb-input-rir-mobile')?.value || '2';
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

    // ─── Swipe-to-Reveal (mobile) ─────────────────────────
    const SWIPE_THRESHOLD = 50;     // px to commit a swipe
    const SWIPE_REVEAL_WIDTH = 140; // px width of action panel
    let currentlySwipedCard = null;

    function bindSwipeGesture(card) {
        const content = card.querySelector('.ffwb-swipe-content');
        if (!content) return;

        let startX = 0, startY = 0, currentX = 0, swiping = false, dirLocked = false, isHorizontal = false;

        content.addEventListener('touchstart', (e) => {
            // Don't interfere with form elements (selects, inputs, textareas, buttons)
            const tag = e.target.tagName;
            if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A') {
                swiping = false;
                return;
            }
            // Close any other open card
            if (currentlySwipedCard && currentlySwipedCard !== card) {
                closeSwipe(currentlySwipedCard);
            }
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            currentX = 0;
            swiping = true;
            dirLocked = false;
            isHorizontal = false;
            content.style.transition = 'none';
        }, { passive: true });

        content.addEventListener('touchmove', (e) => {
            if (!swiping) return;
            const touch = e.touches[0];
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;

            if (!dirLocked) {
                if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
                    dirLocked = true;
                    isHorizontal = Math.abs(dx) > Math.abs(dy);
                }
                return;
            }

            if (!isHorizontal) {
                swiping = false;
                return;
            }

            e.preventDefault();

            // Already open: allow swiping back to close
            const isOpen = card.classList.contains('ffwb-swiped-open');
            if (isOpen) {
                currentX = Math.min(Math.max(dx, 0), SWIPE_REVEAL_WIDTH);
                content.style.transform = `translateX(${-SWIPE_REVEAL_WIDTH + currentX}px)`;
            } else {
                currentX = Math.min(0, Math.max(dx, -SWIPE_REVEAL_WIDTH));
                content.style.transform = `translateX(${currentX}px)`;
            }
        }, { passive: false });

        content.addEventListener('touchend', () => {
            if (!swiping || !dirLocked || !isHorizontal) {
                swiping = false;
                return;
            }
            swiping = false;
            content.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';

            const isOpen = card.classList.contains('ffwb-swiped-open');

            if (isOpen) {
                // Swiping right to close
                if (currentX > SWIPE_THRESHOLD) {
                    closeSwipe(card);
                } else {
                    content.style.transform = `translateX(${-SWIPE_REVEAL_WIDTH}px)`;
                }
            } else {
                // Swiping left to open
                if (Math.abs(currentX) > SWIPE_THRESHOLD) {
                    openSwipe(card);
                } else {
                    content.style.transform = 'translateX(0)';
                }
            }
        }, { passive: true });
    }

    function openSwipe(card) {
        const content = card.querySelector('.ffwb-swipe-content');
        if (!content) return;
        content.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
        content.style.transform = `translateX(${-SWIPE_REVEAL_WIDTH}px)`;
        card.classList.add('ffwb-swiped-open');
        currentlySwipedCard = card;
    }

    function closeSwipe(card) {
        const content = card.querySelector('.ffwb-swipe-content');
        if (!content) return;
        content.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
        content.style.transform = 'translateX(0)';
        card.classList.remove('ffwb-swiped-open');
        if (currentlySwipedCard === card) currentlySwipedCard = null;
    }

    // Close swiped card when tapping elsewhere
    document.addEventListener('touchstart', (e) => {
        if (currentlySwipedCard && !currentlySwipedCard.contains(e.target)) {
            closeSwipe(currentlySwipedCard);
        }
    }, { passive: true });

    function scrollToBottom() {
        // Scroll the page to the bottom of the exercise list (no internal scrollbar)
        const lastCard = exerciseList.querySelector('.ffwb-card:last-of-type');
        if (lastCard) {
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
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
        const img = card.querySelector('.ffwb-qr-img');
        const loadingLabel = card.querySelector('.ffwb-qr-loading');
        if (!img) return;
        // Don't regenerate if already loaded
        if (img.src && img.style.display !== 'none') return;

        const viewerUrl = (window.flexframeWorkoutSettings?.viewerPageUrl || '').replace(/\/$/, '');
        const exId = exercise.exerciseId;
        if (!viewerUrl || !exId) {
            if (loadingLabel) loadingLabel.textContent = 'No link';
            return;
        }
        const sep = viewerUrl.indexOf('?') !== -1 ? '&' : '?';
        const targetUrl = viewerUrl + sep + 'exercise=' + exId;
        const qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(targetUrl);

        img.onload = () => {
            img.style.display = 'block';
            if (loadingLabel) loadingLabel.style.display = 'none';
        };
        img.onerror = () => {
            if (loadingLabel) loadingLabel.textContent = 'QR failed';
        };
        img.src = qrApiUrl;
    }

    function debounce(fn, ms) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), ms);
        };
    }

})();
