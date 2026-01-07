/**
 * Animation Player Module
 * Sketchfab-like animation controls for Three.js animations
 */

class AnimationPlayer {
    constructor() {
        this.mixer = null;
        this.actions = [];
        this.currentAction = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackSpeed = 1;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.playerElement = document.getElementById('animation-player');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.playIcon = this.playPauseBtn.querySelector('.play-icon');
        this.pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.totalTimeDisplay = document.getElementById('total-time');
        this.timelineSlider = document.getElementById('timeline-slider');
        this.speedBtn = document.getElementById('speed-btn');
        this.speedText = document.getElementById('speed-text');
        this.speedMenu = document.getElementById('speed-menu');
        
        // Initially hidden
        this.hide();
    }

    setupEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });

        // Timeline slider
        this.timelineSlider.addEventListener('input', (e) => {
            const progress = parseFloat(e.target.value) / 100;
            this.seekTo(progress);
        });

        // Speed control
        this.speedBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.speedMenu.classList.toggle('show');
        });

        // Speed options
        this.speedMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('speed-option')) {
                const speed = parseFloat(e.target.dataset.speed);
                this.setPlaybackSpeed(speed);
                
                // Update active state
                this.speedMenu.querySelectorAll('.speed-option').forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
                
                this.speedMenu.classList.remove('show');
            }
        });

        // Close speed menu when clicking outside
        document.addEventListener('click', () => {
            this.speedMenu.classList.remove('show');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!this.mixer || !this.currentAction) return;
            
            switch(e.code) {
                case 'Space':
                    if (e.target.tagName !== 'INPUT') {
                        e.preventDefault();
                        this.togglePlayPause();
                    }
                    break;
                case 'ArrowLeft':
                    this.seekRelative(-0.1);
                    break;
                case 'ArrowRight':
                    this.seekRelative(0.1);
                    break;
            }
        });
        
        // Hover events for auto-show/hide
        this.triggerArea.addEventListener('mouseenter', () => {
            if (this.isVisible && !this.alwaysVisible) {
                this.showPlayer();
            }
        });
        
        this.container.addEventListener('mouseenter', () => {
            if (this.isVisible && !this.alwaysVisible) {
                this.showPlayer();
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (this.isVisible && !this.alwaysVisible) {
                this.hidePlayer();
            }
        });
    }
    
    showPlayer() {
        this.container.classList.add('visible');
    }
    
    hidePlayer() {
        this.container.classList.remove('visible');
    }
    
    setVisibility(visible) {
        this.isVisible = visible;
        this.triggerArea.classList.toggle('active', visible);
        
        if (visible) {
            this.container.style.display = 'block';
            if (this.alwaysVisible) {
                this.container.classList.add('always-visible');
                this.showPlayer();
            } else {
                this.container.classList.remove('always-visible');
                this.hidePlayer();
            }
        } else {
            this.container.style.display = 'none';
            this.container.classList.remove('visible', 'always-visible');
        }
    }
    
    setAlwaysVisible(alwaysVisible) {
        this.alwaysVisible = alwaysVisible;
        if (this.isVisible) {
            this.setVisibility(true); // Refresh visibility state
        }
    }

    setMixer(mixer, animations) {
        this.mixer = mixer;
        this.actions = [];
        
        if (animations && animations.length > 0) {
            // Create actions for all animations
            animations.forEach(clip => {
                const action = mixer.clipAction(clip);
                this.actions.push(action);
            });
            
            // Use first animation as default
            if (this.actions.length > 0) {
                this.currentAction = this.actions[0];
                this.duration = this.currentAction.getClip().duration;
                this.updateTimeDisplay();
                this.show();
            }
        }
    }

    show() {
        if (this.playerElement) {
            this.playerElement.style.display = 'block';
            setTimeout(() => {
                this.playerElement.classList.add('show');
            }, 10);
        }
    }

    hide() {
        if (this.playerElement) {
            this.playerElement.classList.remove('show');
            setTimeout(() => {
                this.playerElement.style.display = 'none';
            }, 300);
        }
    }

    togglePlayPause() {
        if (!this.currentAction) return;

        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.currentAction.play();
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
        } else {
            this.currentAction.pause();
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
        }
    }

    seekTo(progress) {
        if (!this.currentAction) return;
        
        const time = progress * this.duration;
        this.currentAction.time = time;
        this.currentTime = time;
        this.updateTimeDisplay();
        
        // If paused, we need to manually update the mixer once
        if (!this.isPlaying) {
            this.mixer.update(0);
        }
    }

    seekRelative(deltaSeconds) {
        if (!this.currentAction) return;
        
        const newTime = Math.max(0, Math.min(this.duration, this.currentTime + deltaSeconds));
        const progress = newTime / this.duration;
        this.seekTo(progress);
        this.updateSliderPosition();
    }

    setPlaybackSpeed(speed) {
        this.playbackSpeed = speed;
        this.speedText.textContent = `${speed}x`;
        
        if (this.currentAction) {
            this.currentAction.setEffectiveTimeScale(speed);
        }
    }

    update(deltaTime) {
        if (!this.mixer || !this.currentAction || !this.isPlaying) return;
        
        this.currentTime = this.currentAction.time;
        
        // Loop animation
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
            this.currentAction.time = 0;
        }
        
        this.updateTimeDisplay();
        this.updateSliderPosition();
    }

    updateTimeDisplay() {
        this.currentTimeDisplay.textContent = this.formatTime(this.currentTime);
        this.totalTimeDisplay.textContent = this.formatTime(this.duration);
    }

    updateSliderPosition() {
        const progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
        this.timelineSlider.value = progress;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Get current settings for save/load
    getSettings() {
        return {
            isPlaying: this.isPlaying,
            currentTime: this.currentTime,
            playbackSpeed: this.playbackSpeed
        };
    }

    // Apply settings
    applySettings(settings) {
        if (settings.playbackSpeed !== undefined) {
            this.setPlaybackSpeed(settings.playbackSpeed);
        }
        if (settings.currentTime !== undefined) {
            const progress = this.duration > 0 ? settings.currentTime / this.duration : 0;
            this.seekTo(progress);
        }
        if (settings.isPlaying && this.currentAction) {
            this.togglePlayPause();
        }
    }
}

export default AnimationPlayer;