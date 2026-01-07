/**
 * Animation Player Module
 * Sketchfab-like animation controls for Three.js animations
 */

export class AnimationPlayer {
    constructor() {
        this.mixer = null;
        this.actions = [];
        this.currentAction = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackSpeed = 1;
        this.isVisible = true;
        this.alwaysVisible = false;
        this.hideTimeout = null;
        
        this.createPlayerElements();
        this.setupEventListeners();
    }

    createPlayerElements() {
        // Create trigger area
        this.triggerArea = document.createElement('div');
        this.triggerArea.className = 'animation-player-trigger';
        document.body.appendChild(this.triggerArea);

        // Create main player container
        this.container = document.createElement('div');
        this.container.className = 'animation-player';
        this.container.innerHTML = `
            <div class="player-controls">
                <div class="player-left">
                    <button class="play-pause-btn" id="play-pause-btn">
                        <svg class="play-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        <svg class="pause-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    </button>
                    <span class="time-display">
                        <span id="current-time">0:00</span> / <span id="total-time">0:00</span>
                    </span>
                </div>
                
                <div class="player-center">
                    <input type="range" id="timeline-slider" min="0" max="100" value="0" class="timeline-slider">
                </div>
                
                <div class="player-right">
                    <button class="speed-btn" id="speed-btn">
                        <span id="speed-text">1x</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="speed-menu" id="speed-menu">
                        <div class="speed-option" data-speed="0.25">0.25x</div>
                        <div class="speed-option" data-speed="0.5">0.5x</div>
                        <div class="speed-option active" data-speed="1">1x</div>
                        <div class="speed-option" data-speed="1.25">1.25x</div>
                        <div class="speed-option" data-speed="1.5">1.5x</div>
                        <div class="speed-option" data-speed="2">2x</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.container);
        this.initializeElements();
    }

    initializeElements() {
        this.playPauseBtn = this.container.querySelector('#play-pause-btn');
        this.playIcon = this.container.querySelector('.play-icon');
        this.pauseIcon = this.container.querySelector('.pause-icon');
        this.currentTimeDisplay = this.container.querySelector('#current-time');
        this.totalTimeDisplay = this.container.querySelector('#total-time');
        this.timelineSlider = this.container.querySelector('#timeline-slider');
        this.speedBtn = this.container.querySelector('#speed-btn');
        this.speedText = this.container.querySelector('#speed-text');
        this.speedMenu = this.container.querySelector('#speed-menu');
        
        // Start hidden by default
        this.setVisibility(true); // Player is enabled but hidden until hover
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
                this.clearHideTimeout();
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (this.isVisible && !this.alwaysVisible) {
                this.scheduleHide();
            }
        });
    }
    
    showPlayer() {
        this.clearHideTimeout();
        this.container.classList.add('visible');
    }
    
    hidePlayer() {
        this.container.classList.remove('visible');
    }
    
    scheduleHide() {
        this.clearHideTimeout();
        this.hideTimeout = setTimeout(() => {
            this.hidePlayer();
        }, 500); // Wait 500ms before hiding
    }
    
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
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
                this.setVisibility(true); // Show player when animation is loaded
                
                // Auto-play the animation
                this.isPlaying = true;
                this.currentAction.play();
                this.playIcon.style.display = 'none';
                this.pauseIcon.style.display = 'block';
            }
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
            playbackSpeed: this.playbackSpeed,
            isVisible: this.isVisible,
            alwaysVisible: this.alwaysVisible
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
        if (settings.isVisible !== undefined) {
            this.setVisibility(settings.isVisible);
        }
        if (settings.alwaysVisible !== undefined) {
            this.setAlwaysVisible(settings.alwaysVisible);
        }
        if (settings.isPlaying && this.currentAction) {
            this.togglePlayPause();
        }
    }
}

export default AnimationPlayer;