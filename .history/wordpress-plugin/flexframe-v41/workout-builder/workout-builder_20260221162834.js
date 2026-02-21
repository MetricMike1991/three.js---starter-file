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
    let shareModal;
    let likeBtn;

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
        initBrowseExercisesLink();
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
        likeBtn = root.querySelector('.ffwb-btn-like');

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

        // Calculate hue rotation so thumbnails match the primary colour
        // Base exercise images are red (~0°), so rotation = target hue
        const rN = r / 255, gN = g / 255, bN = b / 255;
        const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN), delta = max - min;
        let hue = 0;
        if (delta !== 0) {
            if (max === rN)      hue = ((gN - bN) / delta) % 6;
            else if (max === gN) hue = (bN - rN) / delta + 2;
            else                 hue = (rN - gN) / delta + 4;
            hue = Math.round(hue * 60);
            if (hue < 0) hue += 360;
        }
        root.style.setProperty('--ffwb-hue-rotation', `${hue}deg`);
    }

    function initBrowseExercisesLink() {
        const viewerUrl = (SETTINGS.viewerPageUrl || '').replace(/\/$/, '');
        if (!viewerUrl) return;
        const link = root.querySelector('.ffwb-browse-exercises-link');
        if (!link) return;
        link.href = viewerUrl;
        link.style.display = '';
    }

    // ─── Exercise Catalogue ──────────────────────────────────
    async function loadExerciseCatalogue() {
        try {
            const res = await fetch(SETTINGS.exercisesCdn);
            exerciseCatalogue = await res.json();
            console.log(`[Workout Builder] Loaded ${exerciseCatalogue.length} exercises from catalogue`);
            initFinder();
            
            // Check for add_exercise URL parameter (from Exercise Viewer "Add to Workout" button)
            checkAutoAddExercise();
        } catch (err) {
            console.error('[Workout Builder] Failed to load exercise catalogue:', err);
        }
    }
    
    /**
     * Auto-add an exercise from URL parameter (e.g. ?add_exercise=barbell_back_squat)
     */
    function checkAutoAddExercise() {
        const params = new URLSearchParams(window.location.search);
        const exerciseId = params.get('add_exercise');
        if (!exerciseId) return;
        
        const exercise = exerciseCatalogue.find(c => c.id === exerciseId);
        if (exercise) {
            addExercise(exercise);

            // Build a toast with a "Back to Exercises" link
            const viewerUrl = (SETTINGS.viewerPageUrl || '').replace(/\/$/, '');
            const backLink = viewerUrl
                ? ` <a href="${viewerUrl}" class="ffwb-toast-link">Browse Exercises →</a>`
                : '';
            showToast(`Added "${exercise.name}" to workout${backLink}`, 6000);
            
            // Clean the URL parameter without reloading
            const url = new URL(window.location);
            url.searchParams.delete('add_exercise');
            window.history.replaceState({}, '', url);
        } else {
            console.warn(`[Workout Builder] Exercise "${exerciseId}" not found in catalogue`);
            showToast(`Exercise not found in catalogue`);
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
        root.querySelector('.ffwb-btn-share')?.addEventListener('click', () => saveWorkout('public'));
        bindTap(root.querySelector('.ffwb-btn-reset'), resetWorkout);

        // Share modal
        shareModal?.querySelector('.ffwb-modal-backdrop')?.addEventListener('click', closeShareModal);
        shareModal?.querySelector('.ffwb-modal-close')?.addEventListener('click', closeShareModal);
        shareModal?.querySelector('.ffwb-btn-copy-link')?.addEventListener('click', copyShareLink);
        shareModal?.querySelector('.ffwb-btn-modal-pdf')?.addEventListener('click', downloadWorkoutPDF);
        bindShareModalEvents();

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
    const FILTER_THUMBNAILS = {
        'abs': 'data:image/jpeg;base64,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',
        'back': 'data:image/jpeg;base64,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',
        'barbell': 'data:image/jpeg;base64,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',
        'biceps': 'data:image/jpeg;base64,/9j/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDA4NDQ4MEQ8SExQTEg8YGBoaGBgjIiIiIycnJycnJycnJycBCQgICQoJCwkJCw4LDQsOEQ4ODg4REw0NDg0NExgRDw8PDxEYFhcUFBQXFhoaGBgaGiEhICEhJycnJycnJycnJ//dAAQABv/uAA5BZG9iZQBkwAAAAAH/wAARCABaAFoDACIAAREBAhEB/8QAjwAAAgMBAQEBAAAAAAAAAAAAAAcEBQYDAQIIAQEBAAMBAAAAAAAAAAAAAAAAAQIDBAUQAAIBAwIEBAMFBwMFAAAAAAECAwAEEQUSBhMhMSJBUWEycYEHFBUjQjNDUmJykaEWU7FjkrLB0REAAgIBAgUEAwAAAAAAAAAAAAECEQMEEgUTITFBIlFicTJhof/aAAwDAAABEQIRAD8AdPEWpy6RpE91bKr3bFYbONuzTSsI4x74JyfYVjb/AFi04YvYOHbWK61TXpYTdtHDGHlndzmWVmzhDnvuxge1X17cjVuJIbKNs2ek5muT3UzkfD6eBTj5t7VA4RtkueK+I9ZlGboci0Vz3CndK6/+I+gqFInD3C3Fl1q17qvFVysFldOpXR4pDMGjQeGOYYEQGerbc57Zx3YYwBgeVVt3r+k2dybKW4D3YG428StLIB/MsYbb9aizcSw81Le1hkMsn7ydHiiX5lhlj/KoqkLwnAzRmqz7wGYI0u+RfFIxG1V9FValNcYRP4nGAPfG6gO+8ZAz3OK+6pry4O5Y0PQZAY9iy9SKjzazLZwC6iH3iEdJLd8iRWHdUfGP+7+9AWeq6bHqlo1uXMMynfa3SAGSCUDwyx7vMZ+o6UtbKy424LF7FqqPrejyStMl/bM006BhlzNDL49vT9JIFb2LinTZIVmaO6iUjLCS2lBX+rCn/FWNjqNjqcAubCdLiLOCyHsfRh3B9jQGF07WbM22l8Z6NK34dfSrZamjjCtGzFI5yvdWic9M/pJph0v9D0yARcR8PQoEtluphDF2ALHmqB8w22uEfGXEdpGlobETmBREZ2IBfYNu8jd3bGahWf/QZfBkamyWaZ+ZJclpppT1Lksep/qYlqzmqa1qugatdaXo6RC41vmzG8lb9hyW5WUTHiYhxjJ/vVnpt4ugwLa3WUwivbn+JG8S4+XasPxCdY4h1iO/0SAy/hytGoJ2NLJKwL8kt0bZgbvMVqyuSxycL3eK6s7NBDDPVYoahxWNt7nJ7Y/i6t9PNF3YcVJwaDDrVgHjYmSa4t3LTsx7yTRv4nz7HNbS11W04ks45rSRILa4AZXDBnZD/CB8JPrSB4ttNYto3biKcRTsNwsoW5kgH8U7rkKB6ZyasPsy4kOnTS6WA5sQ4aKOX41Vzt3j2L9CPLNY4Oa4t5ffp71+zbxNaKOWMdE7Sj62m3j3fDdb/p+iYrOJVG3c/uzEn/JrhNI0VzHH3Uh2KP1GVUsrDPYiuWnavatEpD7h7HJ/tUHV9TtBeW5jId2WYgAHOEiZmJHsK3HAXrwo6ZbLg9ck4/xVVd28cbCWKYxOjB9rMSjYGMMCfQ1Piv7U2qYcE7QfD18vU1juKNdt7OB3j/Mk7KgOepOBn5mgO2u/aHouiFLS8geS7mB5CW7K27Hclj0Ue5rNJrXEENz/AKm022trdGGJIuYzpMn+3M4wN3oQOnl7pu+1FNV16W6vWmeUycuKSHqAi5zyxn9JyR61t7fSeMG08pYlL/TLgBDdQuFAB/343wyEe4rm1Dzpp41arwutns8Jx8MyRlHVyjHJu75JOOPl/Fxa9X2Nngq4/Fbe41uaPkNqyLecrO7lu5IChsLnAUdcVKkhsmkdnjG9mJb5k9ayvCGrfg+mw6PfnZNYoLd2GdrIpPLlQnujDsfOrCTXIy7EKxBJwdp9a6F2R48klKSXa3Xnp9n/0dNxI3F9wiabeaE819bqEt72wBkt5B23DIyucdVYjFcLPSftJKAWlilkeVyFLvFGsaE7m2KrOwZj54pv0VKLYs7f7J4tQsrtuJZ1uL25heO3SLdyreRuomLHDSSBsdSMe1KAaJJYXy6fNJ9zvbJp4WuXJReZjpEzYbGdp+IbWFfqulZ9q3DMEaxcV2hMc/Nht9QjxuSVCdkbsvqDhD6g+1AZ/QtB1d7aK4utXFvbhhFdQW8RSeGUjcI5o5mKruHwsuQaYGnWWi6aY59NWe7vnxHNNIzzvyT4pFBYbFHTso61n7eVzaWNzChkkiPhiwGle3xjlxy/vo427BvEnbtWhn1XWbmG2htdLuF2yK/MmCQoQuTtUs2SzdlFClHxDpOlxKzaJfXNi5ztgVjJHnyRYZuq59jSx4l0/WrO4ltbzUIHCKVu54d45blc/dmlbd+YfNE6+4pr8UanqN3b8oabdW8zgqssiKoTPTeXDEDb3zWC4uUTpZWNqFUM0cVmqqUiBciNniT4nMrnxSv38ulAQPs14DtuJNbimv4SdL0yMPcQnKh5MFYkJXt18X096YU3A/FegXQn4Vu47mEHwJO2yQIOojl6bJB5Z6VtuF+G7PhbSY9MtPG2TJczn4pZm+Nz/wAAeQxVzVoxsS11pnGsIgS+0aae3gLdYdksgRiWKK0bMSuT2xVpHr+vxRrHHwlqBRAFQiEdQBgd1pq0VKLZ/9J/UUUUAVlftCIfhx7Tbua8nhhUeni5hP0CGtVWL+0KWSWHTNLtJFivp7gzwSSAsirAh3BwvXD79v1oCql0zkaZZz2cvJ+8SowRz+VHdhSu7+UTDKv5Zwa+9WuuMILO1DaYqxi4iAdJlmy2fCAqdQGPTd5VzkubiXSLizuY+VIsa3Kqp3oyZBE8D/qUHv5jsalW2s3S28RVzgYJGegIqGRA4ibiOeMjV7aOztBjnMJlldwT0hiVepLnw1X8QaX+G32m3s2ZryO5hvL5364Csu2FfIJGMhQPSp+oXcmoarp0EhMn5yyuG6jweJc+wIz9KrOJLnUtUV7m1CpaZZzczEhp44DmRbdB1IPw7z0yemaAcffqKKj2F3Df2Nte2/7G4iSWMegZQwH0qRVMQooooD//039RRRQBS74vM91xAUtlPNtLZQHHaON23zv/AFFcKtMTOOp7Csvb2X3i7up5B4rx2Eh/6YGMf8ChURb+SNLMKQFaPN1akDpsJCXEPyIbJHp8qrYrXloYwvhHw+fTyq41LTTc28duCVYK2xx+khe//o1FsFL2qJINs0XglX0Yf/e9QpTG13XaK3gE7C3MhOCEbrLt9PAME1M4iL3dpDNYxKTM0a2sGNo+7IG/KPoHTJ9uleXNlJf6ikS55FujtNj9RK9I/l61oBY81YpMeKFCyfPbtoD3gaZZOHbeJM7Ldnhj3fEEDbkDe4VgK0dZzh63NjfXkKjbDc4mUfzDv/g1o6piFFFFAf/Uf1FFFAeMMqR6jFR0t1Q5A7VJooCI9uCxYjyIH171Dj0mJrxp3HRkIYdgT+k/SrY0DzoCpsdNFsu3GT1LE9yT3zU6KAIu36D5V38zX1QEaO2VJRIB1GcfKpNFFAFFFFAf/9k=',
        'bodyweight': 'data:image/jpeg;base64,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',
        'cables': 'data:image/jpeg;base64,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',
        'calves': 'data:image/jpeg;base64,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',
        'chest': 'data:image/jpeg;base64,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',
        'dumbbell': 'data:image/jpeg;base64,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',
        'glutes': 'data:image/jpeg;base64,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',
        'hamstring': 'data:image/jpeg;base64,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',
        'kettlebell': 'data:image/jpeg;base64,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',
        'machine': 'data:image/jpeg;base64,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',
        'quads': 'data:image/jpeg;base64,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',
        'shoulders': 'data:image/jpeg;base64,/9j/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDA4NDQ4MEQ8SExQTEg8YGBoaGBgjIiIiIycnJycnJycnJycBCQgICQoJCwkJCw4LDQsOEQ4ODg4REw0NDg0NExgRDw8PDxEYFhcUFBQXFhoaGBgaGiEhICEhJycnJycnJycnJ//dAAQABv/uAA5BZG9iZQBkwAAAAAH/wAARCABaAFoDACIAAREBAhEB/8QAmAAAAgIDAQEAAAAAAAAAAAAABgcABQEDBAIIAQEBAAMBAQAAAAAAAAAAAAAAAQIDBAUGEAACAQIEAwYDBgUDBQAAAAABAgMEEQAFBhITITEiQVFhcYEHFDIjQlKRobEVFiQzYpKiwSVygsLwEQACAgEDAwAIBwAAAAAAAAAAAQIDEQQFEiExQRMiM0JRYZGhUmJxcoHB8P/aAAwDAAABEQIRAD8AfxxMQ4q8+1BlunKL53MpCqk7YokG6SR/wovf+wwbSWX0SLGMpSUYpylJ4SSy232SRaY8SzRU8ZlnkWONfqdyFA9zhZ1fxPzgXalyQLG63j4sl5B/kUAUcvX3x407qeLOK8JXyySZqoaVYaqO4CoLt8uYi0KeV13X78ao31SfFTTf0O23atdVW7bKJKCWW01LivzcW8fyX+qK8ZictpIoC1H8zHVSyyiwdISGULG3aKliLsQB4XwK5/oLTiHMjNTsghvUUbU6gtskG8JYkXUNceWDRqeor5HnniKtINoJv2VHRRcX8/XGvNKaWtdYImtKY5IiOZIjI3KzC3c1xjacQiqDJDlm3PadLSU9Sr0bNzJanIkYelxtJx9F5VqOhzOCCRr0s1QodIZrDdcD+2/0v17jfywK1GkXdKeOPaYKRQkCKb3UAdo2HNmbcW9cZSB6OjfLp4lWlVXkBmUvGioC7IVC9r/ADnfAuM9EMDEwm6PX+ZUE+3JxLmWX2O2OpXag5cjCzO8yqPBr+2CHLfijFx4oNQUJoI5jZKyNuLCCem/lcDz52xqWopb4qaz9vqds9o3CEHZLTzSSy+3LH7M8vsMPExhWV1V0YMjAFWBuCDzBBGM42nAf/9B/YQOutSNW65rIZz/T5Tanp4+4NYM7+pY/th/E25nkMfNOpcjzXUXxArUyOncpmjGqp6iUbIeCpELzF/w7x069MaNTGUq+MfLR6my3UUaz0t+MRhLDfhv+8ZCvLtW0TwfIvTpJNPaNXPdccj7ftzPma6XybLcuiZ6VN9ROd1TVsPtJD3AfhQdyjCn1d8Psy0DlVNqQZuK6eCVfmqJYtkZjbkxRixY287YMdJa4paqliaZ+CDZVZgGjJIuNrdeY8cSilwSc8OS7fJGW57jC+Uq9KpV0yack37Sa7Nr8K8L/ACayRgJy/TFBmsn/AFGljBII4p6EG3Da49D346Ys+p2h3b4yviCAMDOY5+k2dwUlD9vMIqiZoYzvKxpEdzm3QXNvM46Dyg8W0kKuOdwOnTFVmEabSSLEf/eONNBqXLqqhilp6iOVHUFW3C1rYpc91PSUsbF6iNB5WY+2ABusqcp05Wy10cC7JbmWnt9nv75E/AfG3LvtgYzzUVJmSSIEVY3v2Ryse4+R/wCcUWrc9qs5r4MnpLxz1ky08byWDC7WZyq/dXBBqP4O53kuX/P5TmYzdEQGSB4+DMbDmY7Myv5DkfXHHqNPKXWvCXdr5/FH0O07vTW+Os5SksRhY3n1V7sv08MP/g3ns2babnoqhi75VOaeNz3xMokQf+NyPTDFwofgOywZVXwTxvDU1sgrYBILcSADg708g4I54b2OqtNQin3wjxNXKEtTdKvCjKcmsdur8H//0XlnDmPKa+RfqWmmYeoRjhfaTriyUQm5LT0qJGDy+8zMfc4MNW1bw5V8nCwWozJ1ooj4CS/Ee3ftjDYAPiC/8otl9TRRngGnFK+wE9pNzo5t0J5jAqKv4v50+Y0P8HpQZqio7EcSAsxPViAtz2VBJwvdP5DXFJYqaYR0qlGvKOLChlACszKd0cbtyEg5X5Nzw1vhXkP8ambW+ZtxmPFp6KFgbIecUtw3gLp+eB7UOm30ZqVRShRQ1N3pC/8AbeMkrJTTfdsNwB9jgDtyrRUdNUxRarr2SKVOLBBSSFIZUvY/bk7rqfqUAYPaeHS2RLCNP0iwPK6rM9OrGR0F2O+TmzAdeZwL0ueUGV1UAkhkhopVu1JWDetJVL9UcZkv2JEsym/ocXeYa0o5kpI6OUOwmR2WHntRblidvlgU5NU5LoqpR6iGIUNU92M9KxpyWPPcyfQ3uuFbnGnM3pKekrTURyw15tQCRGepkBO1GFOpsd5HZ5+fTDS1HrPJ56dgXhnNuSkKxPlY4X2d1QfK4pljlOYTArV185ISn3fTR0YNgCI7biPHuwIL6np66kzunzaYPNJSzF5m5NtiiFnNk5bY79ojsjpj6Zy/PIswyVCXDdj/AI5HA/8AC/QVNDlVVnObQh5M6gkgjhI5LSTfUbN04oty8LeOAjN5q3QOcVGmxI1TEEEtLZWJ4chIjBtf6tv74AM9J1ckmsMti6LHTVUIPigZnT8rYbGFqKAabyjINRWtUULWrr9XjqGImv5rvJ9sMoEMAym4PMEd4wDP/9Jn63SZqrJ2iF+HK8n5bb29r449TzRVAyuSTnsnjJv3gAsb/lgrzajFSsElrtA+4e4tgI1xTVMdLGKNC8zErCg/E/YUD1ZsCotfhrJxMjq3H0HMKlkP/cwdv95OOT4oUa19JlECWFT85uia17II24l/LmL4JdK5L/L2QUWUswkmhS9RKPvzOTJK3+pjgb1pVcDUeULMfsDBNtv03l0v72wHkolqVymSkaritFCDRV1PKA6wt/dhZd97xOCdh7umLrMdRZbHBR/KrDHedCRCqjsi+69u62PWbS0jTZdXlFlBDUlSHAZHiPbQMD3qwNsd0uXaenSn4FNFSOsis8kKKCVsQ0Z5c1YdcCg9qzUmUx07vTwU8lSR9kI40Llj0sbE4BdR5dUzZdTrcypl8aQ1UxPYErfazRQ+LLu7beOD/VpyeipnbK6CmgqmBCTLGtwSOo5cscOoRQUGnKTLo+S08CoFY3ZnPakdv8mcnADTpOD8pB8uAIOGnCA6bNo229sLTUjRtqPP45eUhhoynjsjswt/qfBro15pNKZO85JkNJFcnrbby/TAzr3I6gZrQ6go+aSJ8jXR+IJLQyH0JK+4wMTGtZXk0+tHANxIFx3bVN2J9sGmUtOcroS47Xy8W6/jsW+KN8t+boEQi/FVRz6geH54Ko0EcaRr0QBR6AWwKz//036wDCxxxz0Ec9RBLIL8Fg49V5j9cdpxMATCw1akGe6jqaSpTiw0NPtp0BIPHW0rdLHne3thnEhQWY2A5k+Qwq6d5JM9fMyOb1MrKe67Akf7bDAqNtbQPSUcVIk7SxVSifLJpPq4kYEnAkPe203VvvDzGM08zyQxkMVI7vDyx2Z5E9Ll0FPJ24A6z0jd6BSRLB7K91Ph6Y5ooWILpzv1Pn44hSjzR1nrY0nfZSQfbVUjdAkfbt7kDGzN8j+dNLV5qz/1IMqUoO0QxKnEXififmm7uW9sYrqZGqIopT2XlQvfptU7mZvRQbYIc4iqGpKmurBZqyBhFT90MJJdIz4s3It+XdgC2+G9c9TpqKlmN5qB2p2HeF+tAfQNb2wUVdOlVTyQSC6uP1BuP1GAP4dM9JV1+XyDbvVJLN13oLH81YX9MMLFMTRDAsaItvp6Y34mJgD/1H8cTEOJgDmrywo5gv1MpUe/LAtFk+ynjVRzilEz+huv/tfBbUf2j645kA2vy7mwAO57l5r6SOluVs6lWHUEXF/1xXZdE4pwkotInYceY5HBTKBZeXcf2xTSi1TJblexNsClDNlL19eTzEUIDMB94lhZfyucEma0b19MsA+uQhQfU88bctVbObC5Y3Pj1xZxAb4uX3Sf0wBS0VEKfN46+Mbd3Zf37J/fBbissOIOXeMWeBCYmJiYA//Z',
        'triceps': 'data:image/jpeg;base64,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'
    };

    function getFilterThumbnailKey(filterName) {
        const mapping = { 'hamstrings': 'hamstring', 'body weight': 'bodyweight', 'machines': 'machine' };
        const lowerName = filterName.toLowerCase();
        return mapping[lowerName] || lowerName;
    }

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

            if (filterType === 'type') {
                // Type filters are text-only (matching 3D viewer)
                const icon = item === 'Strength' ? '🏋️' : '🏃';
                card.innerHTML = `<span class="ffwb-filter-icon">${icon}</span><span class="ffwb-filter-label">${item}</span>`;
            } else {
                // Muscle & equipment filters use image thumbnails
                const thumbnailKey = getFilterThumbnailKey(item);
                const thumbSrc = FILTER_THUMBNAILS[thumbnailKey];
                if (thumbSrc) {
                    const img = document.createElement('img');
                    img.src = thumbSrc;
                    img.alt = item;
                    img.className = 'ffwb-filter-thumb-img';
                    img.draggable = false;
                    card.appendChild(img);
                }
                const label = document.createElement('span');
                label.className = 'ffwb-filter-label';
                label.textContent = item;
                card.appendChild(label);
            }

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

        // Remove any unassigned (empty) exercise cards before saving
        workoutExercises = workoutExercises.filter(e => e.exerciseId);
        if (workoutExercises.length === 0) {
            showToast('Add at least one exercise');
            return;
        }
        renderExerciseList();
        updateStats();

        if (!SETTINGS.isLoggedIn && visibility === 'private') {
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
            if (!SETTINGS.isLoggedIn && visibility === 'public') {
                // Anonymous share — use public endpoint
                res = await fetch(SETTINGS.restUrl + 'workouts/share', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else if (workoutId) {
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
                showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Workout saved!');
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

            // Shared workouts load as editable by default
            workoutNameInput.value = data.name;
            workoutId = null;
            workoutHash = null;

            // Show like button for shared workouts
            initLikeButton(hash, data.likeCount || 0);

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

    // ─── Like / Heart ──────────────────────────────────────────
    function initLikeButton(hash, likeCount) {
        if (!likeBtn) return;
        likeBtn.style.display = 'inline-flex';

        const countEl = likeBtn.querySelector('.ffwb-like-count');
        if (countEl) countEl.textContent = likeCount > 0 ? likeCount : '';

        // Check localStorage for previous like
        const likedWorkouts = JSON.parse(localStorage.getItem('ffwb_liked_workouts') || '[]');
        if (likedWorkouts.includes(hash)) {
            likeBtn.classList.add('liked');
        }

        likeBtn.addEventListener('click', async function handleLike() {
            if (likeBtn.classList.contains('liked')) return; // Already liked

            likeBtn.classList.add('liked');

            try {
                const res = await fetch(SETTINGS.restUrl + 'workouts/like/' + hash, { method: 'POST' });
                if (!res.ok) throw new Error('Like failed');
                const data = await res.json();

                if (countEl) countEl.textContent = data.likeCount > 0 ? data.likeCount : '';

                // Remember in localStorage
                const stored = JSON.parse(localStorage.getItem('ffwb_liked_workouts') || '[]');
                if (!stored.includes(hash)) {
                    stored.push(hash);
                    localStorage.setItem('ffwb_liked_workouts', JSON.stringify(stored));
                }
            } catch (err) {
                console.error('[Workout Builder] Like error:', err);
                likeBtn.classList.remove('liked');
            }
        });
    }

    // ─── Reset Workout ─────────────────────────────────────────
    function resetWorkout() {
        if (workoutExercises.length === 0) {
            showToast('Workout is already empty');
            return;
        }
        showConfirmModal(
            'Start Fresh?',
            'This will erase all exercises from the current workout. This cannot be undone.',
            'Clear Workout',
            () => {
                workoutExercises = [];
                workoutId = null;
                workoutNameInput.value = '';
                localStorage.removeItem(AUTOSAVE_KEY);
                renderExerciseList();
                updateStats();
                renderFinderResults();   // clear "in-workout" highlights in finder
                showToast('Workout cleared');
            }
        );
    }

    function showConfirmModal(title, message, confirmLabel, onConfirm) {
        // Remove any existing confirm modal
        root.querySelector('.ffwb-confirm-modal')?.remove();

        const modal = document.createElement('div');
        modal.className = 'ffwb-confirm-modal';
        modal.innerHTML = `
            <div class="ffwb-confirm-backdrop"></div>
            <div class="ffwb-confirm-box">
                <div class="ffwb-confirm-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </div>
                <h3 class="ffwb-confirm-title">${title}</h3>
                <p class="ffwb-confirm-message">${message}</p>
                <div class="ffwb-confirm-actions">
                    <button class="ffwb-btn ffwb-confirm-cancel" type="button">Cancel</button>
                    <button class="ffwb-btn ffwb-confirm-ok" type="button">${confirmLabel}</button>
                </div>
            </div>
        `;
        root.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => modal.classList.add('ffwb-confirm-visible'));

        const close = () => modal.remove();
        bindTap(modal.querySelector('.ffwb-confirm-backdrop'), close);
        bindTap(modal.querySelector('.ffwb-confirm-cancel'), close);
        bindTap(modal.querySelector('.ffwb-confirm-ok'), () => {
            close();
            onConfirm();
        });
    }

    /**
     * Universal tap helper – works in WebViews (Gmail, Facebook, etc.)
     * Uses both click and touchend to ensure the callback fires reliably.
     */
    function bindTap(el, fn) {
        if (!el) return;
        let touchMoved = false;
        el.addEventListener('touchstart', () => { touchMoved = false; }, { passive: true });
        el.addEventListener('touchmove', () => { touchMoved = true; }, { passive: true });
        el.addEventListener('touchend', (e) => {
            if (touchMoved) return;
            e.preventDefault(); // prevent ghost click
            fn(e);
        });
        el.addEventListener('click', (e) => {
            fn(e);
        });
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
                workoutNameInput.value = data.name || '';
                workoutExercises = data.exercises.map(e => ({ ...e, uid: e.uid || generateUid() }));
                renderExerciseList();
                updateStats();
            }
        } catch (err) {
            localStorage.removeItem(AUTOSAVE_KEY);
        }
    }

    // ─── PDF Download ──────────────────────────────────────────
    async function downloadWorkoutPDF() {
        if (typeof window.jspdf === 'undefined') {
            showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg> PDF library not loaded. Please refresh.');
            return;
        }

        showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg> Generating PDF…');

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

        function imgToBase64(url, applyHue) {
            if (!url) return Promise.resolve(null);
            return new Promise(resolve => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    try {
                        const c = document.createElement('canvas');
                        c.width = img.naturalWidth;
                        c.height = img.naturalHeight;
                        const ctx = c.getContext('2d');
                        ctx.drawImage(img, 0, 0);

                        if (applyHue) {
                            const hueStr = getComputedStyle(root).getPropertyValue('--ffwb-hue-rotation').trim();
                            const angle = parseFloat(hueStr) || 0;
                            if (angle !== 0) {
                                try {
                                    const imageData = ctx.getImageData(0, 0, c.width, c.height);
                                    const d = imageData.data;
                                    const rad = angle * Math.PI / 180;
                                    const cos = Math.cos(rad), sin = Math.sin(rad);
                                    const m00 = 0.213 + 0.787 * cos - 0.213 * sin;
                                    const m01 = 0.715 - 0.715 * cos - 0.715 * sin;
                                    const m02 = 0.072 - 0.072 * cos + 0.928 * sin;
                                    const m10 = 0.213 - 0.213 * cos + 0.143 * sin;
                                    const m11 = 0.715 + 0.285 * cos + 0.140 * sin;
                                    const m12 = 0.072 - 0.072 * cos - 0.283 * sin;
                                    const m20 = 0.213 - 0.213 * cos - 0.787 * sin;
                                    const m21 = 0.715 - 0.715 * cos + 0.715 * sin;
                                    const m22 = 0.072 + 0.928 * cos + 0.072 * sin;
                                    for (let i = 0; i < d.length; i += 4) {
                                        const r = d[i], g = d[i+1], b = d[i+2];
                                        d[i]   = Math.min(255, Math.max(0, r*m00 + g*m01 + b*m02));
                                        d[i+1] = Math.min(255, Math.max(0, r*m10 + g*m11 + b*m12));
                                        d[i+2] = Math.min(255, Math.max(0, r*m20 + g*m21 + b*m22));
                                    }
                                    ctx.putImageData(imageData, 0, 0);
                                } catch (hueErr) {
                                    // CORS may block getImageData — fall back to ctx.filter
                                    console.warn('[PDF] getImageData blocked by CORS, trying ctx.filter fallback', hueErr);
                                    const c2 = document.createElement('canvas');
                                    c2.width = img.naturalWidth;
                                    c2.height = img.naturalHeight;
                                    const ctx2 = c2.getContext('2d');
                                    ctx2.filter = 'hue-rotate(' + angle + 'deg)';
                                    ctx2.drawImage(img, 0, 0);
                                    resolve(c2.toDataURL('image/png'));
                                    return;
                                }
                            }
                        }

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
            if (ex.thumbnailUrl) imageJobs['thumb_' + ex.uid] = imgToBase64(ex.thumbnailUrl, true);
            if (ex.exerciseId && viewerBase) {
                const sep = viewerBase.indexOf('?') !== -1 ? '&' : '?';
                const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='
                    + encodeURIComponent(viewerBase + sep + 'exercise=' + ex.exerciseId);
                imageJobs['qr_' + ex.uid] = imgToBase64(qrUrl);
            }
        });

        // Workout share QR — use the pendingShareUrl if available
        const workoutShareUrl = pendingShareUrl || '';
        if (workoutShareUrl) {
            const shareQrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='
                + encodeURIComponent(workoutShareUrl);
            imageJobs['workoutShareQr'] = imgToBase64(shareQrUrl);
        }

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

        // ── SHARE THIS WORKOUT (QR + URL) ──
        if (workoutShareUrl) {
            needsPage(55);
            y += 6;
            doc.setDrawColor(180);
            doc.setLineWidth(0.1);
            doc.line(m, y, pw - m, y);
            y += 8;

            const shareQrSize = 30;
            const shareQrX = m;
            const shareTextX = m + shareQrSize + 8;

            // QR code
            if (img.workoutShareQr) {
                try {
                    doc.addImage(img.workoutShareQr, 'PNG', shareQrX, y, shareQrSize, shareQrSize);
                    doc.link(shareQrX, y, shareQrSize, shareQrSize, { url: workoutShareUrl });
                } catch {}
            }

            // Text next to QR
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0);
            doc.text('Share This Workout', shareTextX, y + 6);

            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80);
            doc.text('Scan the QR code or visit the link below to', shareTextX, y + 13);
            doc.text('load this workout on any device.', shareTextX, y + 18);

            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 100, 200);
            // Truncate URL for display if needed, but keep full link
            const displayUrl = workoutShareUrl.length > 60
                ? workoutShareUrl.substring(0, 57) + '...'
                : workoutShareUrl;
            doc.text(displayUrl, shareTextX, y + 25);
            const urlW = doc.getTextWidth(displayUrl);
            doc.link(shareTextX, y + 22, urlW, 4, { url: workoutShareUrl });
            doc.setTextColor(0);

            y += shareQrSize + 6;
        }

        // ── SAVE ──
        const filename = (workoutNameInput.value || 'workout')
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '_') + '.pdf';
        doc.save(filename);
        showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> PDF downloaded!');
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
    let pendingShareUrl = '';

    function showShareModal(shareUrl) {
        if (!shareModal) return;
        pendingShareUrl = shareUrl;

        const stepEmail = shareModal.querySelector('.ffwb-share-step-email');
        const stepLink  = shareModal.querySelector('.ffwb-share-step-link');

        // Logged-in users skip the email capture — go straight to link
        if (SETTINGS.isLoggedIn) {
            stepEmail.style.display = 'none';
            stepLink.style.display  = 'block';
            stepLink.querySelector('.ffwb-share-link-input').value = pendingShareUrl;
            shareModal.style.display = 'flex';
            return;
        }

        // Non-logged-in users: show email step
        stepEmail.style.display = 'block';
        stepLink.style.display  = 'none';

        // Clear previous inputs
        const emailInput = shareModal.querySelector('.ffwb-share-email-input');
        const consentBox = shareModal.querySelector('.ffwb-share-consent-check');
        const dayPassBox = shareModal.querySelector('.ffwb-share-daypass-check');
        const getBtn     = shareModal.querySelector('.ffwb-btn-get-link');
        const errSpan    = shareModal.querySelector('.ffwb-share-email-error');
        emailInput.value = '';
        consentBox.checked = false;
        if (dayPassBox) dayPassBox.checked = false;
        getBtn.disabled = true;
        errSpan.style.display = 'none';

        shareModal.style.display = 'flex';
    }

    function closeShareModal() {
        if (shareModal) shareModal.style.display = 'none';
    }

    function validateShareForm() {
        const emailInput = shareModal.querySelector('.ffwb-share-email-input');
        const consentBox = shareModal.querySelector('.ffwb-share-consent-check');
        const getBtn     = shareModal.querySelector('.ffwb-btn-get-link');

        const emailValid = emailInput.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        getBtn.disabled = !(emailValid && consentBox.checked);
    }

    function bindShareModalEvents() {
        if (!shareModal) return;

        const emailInput = shareModal.querySelector('.ffwb-share-email-input');
        const consentBox = shareModal.querySelector('.ffwb-share-consent-check');
        const getBtn     = shareModal.querySelector('.ffwb-btn-get-link');

        emailInput?.addEventListener('input', validateShareForm);
        consentBox?.addEventListener('change', validateShareForm);

        getBtn?.addEventListener('click', async () => {
            const email   = emailInput.value.trim();
            const consent = consentBox.checked;
            const dayPassBox = shareModal.querySelector('.ffwb-share-daypass-check');
            const dayPass = dayPassBox ? dayPassBox.checked : false;
            const errSpan = shareModal.querySelector('.ffwb-share-email-error');

            getBtn.disabled = true;
            getBtn.textContent = 'Submitting…';

            try {
                const res = await fetch(SETTINGS.restUrl + 'email-capture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        marketingConsent: consent,
                        dayPassRequested: dayPass,
                        workoutName: workoutNameInput.value || 'Untitled Workout',
                        workoutHash: workoutHash || '',
                    }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed');

                // Switch to link step
                shareModal.querySelector('.ffwb-share-step-email').style.display = 'none';
                const stepLink = shareModal.querySelector('.ffwb-share-step-link');
                stepLink.style.display = 'block';
                stepLink.querySelector('.ffwb-share-link-input').value = pendingShareUrl;

            } catch (err) {
                errSpan.textContent = err.message || 'Something went wrong';
                errSpan.style.display = 'block';
                getBtn.disabled = false;
            }

            getBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg> Get Share Link';
        });
    }

    function copyShareLink() {
        const input = shareModal.querySelector('.ffwb-share-link-input');
        navigator.clipboard.writeText(input.value).then(() => {
            showToast('Link copied!');
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

    function showToast(message, duration = 3000) {
        let toast = root.querySelector('.ffwb-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'ffwb-toast';
            root.appendChild(toast);
        }
        toast.innerHTML = message;
        toast.classList.add('ffwb-toast-show');
        setTimeout(() => toast.classList.remove('ffwb-toast-show'), duration);
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
