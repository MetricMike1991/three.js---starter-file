/**
 * Exercise Dropdown Menu
 * Handles the exercise selection interface with scrollable grid
 */

export class ExerciseMenu {
    constructor() {
        this.isOpen = false;
        this.exercises = [];
        this.scrollAmount = 200; // Pixels to scroll per button click
        
        this.initializeElements();
        this.generateExercises();
        this.setupEventListeners();
    }

    initializeElements() {
        this.toggleBtn = document.getElementById('exerciseToggle');
        this.dropdown = document.getElementById('exerciseDropdown');
        this.scrollContainer = document.getElementById('exerciseContainer');
        this.exerciseGrid = document.getElementById('exerciseGrid');
        this.scrollUpBtn = document.getElementById('scrollUp');
        this.scrollDownBtn = document.getElementById('scrollDown');
    }

    generateExercises() {
        // Create 20 placeholder exercises
        for (let i = 1; i <= 20; i++) {
            const exerciseData = {
                id: i,
                name: `Exercise ${i}`,
                // Using placeholder image service for now
                image: `https://picsum.photos/200/200?random=${i}`
            };
            this.exercises.push(exerciseData);
        }
        
        this.renderExercises();
    }

    renderExercises() {
        this.exerciseGrid.innerHTML = '';
        
        this.exercises.forEach((exercise) => {
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'exercise-item';
            exerciseElement.dataset.id = exercise.id;
            
            exerciseElement.innerHTML = `
                <img src="${exercise.image}" alt="${exercise.name}" loading="lazy">
                <div class="exercise-label">${exercise.name}</div>
            `;
            
            // Add click handler for exercise selection
            exerciseElement.addEventListener('click', () => {
                this.selectExercise(exercise);
            });
            
            this.exerciseGrid.appendChild(exerciseElement);
        });
    }

    selectExercise(exercise) {
        console.log(`Selected exercise: ${exercise.name}`, exercise);
        // Add visual feedback for selection
        const exerciseElements = this.exerciseGrid.querySelectorAll('.exercise-item');
        exerciseElements.forEach(el => el.classList.remove('selected'));
        
        const selectedElement = this.exerciseGrid.querySelector(`[data-id="${exercise.id}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
        
        // Close menu after selection
        this.closeMenu();
        
        // Emit custom event for other components to listen to
        const event = new CustomEvent('exerciseSelected', { 
            detail: { exercise } 
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

    // Method to add custom exercises
    addExercise(exerciseData) {
        this.exercises.push(exerciseData);
        this.renderExercises();
    }

    // Method to clear all exercises
    clearExercises() {
        this.exercises = [];
        this.renderExercises();
    }
}