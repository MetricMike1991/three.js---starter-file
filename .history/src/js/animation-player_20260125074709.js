/**
 * Animation Player Module
 * Sketchfab-like animation controls for Three.js animations
 * v28.3 - Button height fix with inline styles
 */

export class AnimationPlayer {
    constructor() {
        console.log('[FlexFrame Build] animation-player.js v28.3 - INLINE BUTTON STYLES - Build: 2026-01-20-0930');
        this.mixer = null;
        this.actions = [];
        this.currentAction = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackSpeed = 1;
        this.isVisible = false; // Start as not visible
        this.alwaysVisible = false;
        this.hideTimeout = null;
        this.hasPlayedOnce = false; // Track if play has been pressed for the first time        
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
                    <button class="screenshot-btn" id="screenshot-btn" title="Take Screenshot" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                        </svg>
                    </button>
                    <button class="ar-btn" id="ar-btn" title="View in AR" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                        <span>AR</span>
                    </button>
                    <button class="quality-btn" id="quality-toggle-btn" title="Switch Model Quality" style="display: none; height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; align-items: center !important; justify-content: center !important;">
                        <span id="quality-text">HD</span>
                    </button>
                    <button class="speed-btn" id="speed-btn" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
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
        this.screenshotBtn = this.container.querySelector('#screenshot-btn');
        
        // Screenshot callback - will be set by main.js
        this.onScreenshotRequest = null;
        
        // Ensure correct initial icon state (should show play icon when paused)
        // Add small delay to ensure DOM is ready
        setTimeout(() => {
            if (this.playIcon && this.pauseIcon) {
                this.updatePlayPauseIcon();
            }
        }, 10);
        
        // Start hidden by default
        this.setVisibility(true); // Player is enabled but hidden until hover
    }

    setupEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Screenshot button
        if (this.screenshotBtn) {
            this.screenshotBtn.addEventListener('click', () => {
                if (this.onScreenshotRequest) {
                    this.onScreenshotRequest();
                }
            });
        }

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
                this.clearHideTimeout(); // Cancel any pending hide
                this.container.classList.add('visible'); // Keep visible while hovering
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (this.isVisible && !this.alwaysVisible) {
                // Schedule hide after leaving the player
                this.scheduleHide();
            }
        });
    }
    
    showPlayer() {
        this.clearHideTimeout();
        this.container.classList.add('visible');
        
        // Schedule hide after 2 seconds of no interaction (unless always visible)
        if (!this.alwaysVisible) {
            this.scheduleHide();
        }
    }
    
    hidePlayer() {
        if (this.alwaysVisible) {
            return; // Don't hide if always visible
        }
        this.container.classList.remove('visible');
    }
    
    scheduleHide() {
        if (this.alwaysVisible) {
            return; // Don't schedule hide if always visible
        }
        
        this.clearHideTimeout();
        this.hideTimeout = setTimeout(() => {
            // Only hide if not being hovered and not always visible
            if (!this.container.matches(':hover') && !this.alwaysVisible) {
                this.hidePlayer();
            }
        }, 2000); // Wait 2 seconds before hiding
    }
    
    // Called when user clicks on the 3D canvas/model
    onCanvasInteraction() {
        if (this.isVisible && !this.alwaysVisible) {
            this.showPlayer();
        }
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
                this.container.classList.add('always-visible', 'visible');
                this.clearHideTimeout();
            } else {
                this.container.classList.remove('always-visible');
                // Show player and schedule auto-hide
                this.showPlayer();
            }
        } else {
            this.container.style.display = 'none';
            this.container.classList.remove('visible', 'always-visible');
            this.clearHideTimeout();
        }
    }
    
    setAlwaysVisible(alwaysVisible) {
        const wasAlwaysVisible = this.alwaysVisible;
        this.alwaysVisible = alwaysVisible;
        
        if (alwaysVisible) {
            this.container.classList.add('always-visible', 'visible');
            this.clearHideTimeout();
        } else {
            this.container.classList.remove('always-visible');
            // If switching from always-visible to auto-hide, start the countdown
            if (wasAlwaysVisible && this.isVisible) {
                this.scheduleHide();
            }
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
                // Ensure icon matches the current playing state
                this.updatePlayPauseIcon();
            }
        }
    }

    updatePlayPauseIcon() {
        // Check if elements exist
        if (!this.playIcon || !this.pauseIcon) {
            console.warn('Animation player icons not found');
            return;
        }
        
        // console.log('Updating icon - isPlaying:', this.isPlaying);
        
        if (this.isPlaying) {
            // Animation is playing, show pause icon (user can click to pause)
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            // console.log('Showing pause icon (animation is playing)');
        } else {
            // Animation is paused, show play icon (user can click to play)  
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            // console.log('Showing play icon (animation is paused)');
        }
    }

    togglePlayPause() {
        if (!this.currentAction) return;

        // console.log('Before toggle - isPlaying:', this.isPlaying);

        this.isPlaying = !this.isPlaying;
        
        // console.log('After toggle - isPlaying:', this.isPlaying);
        
        if (this.isPlaying) {
            this.currentAction.play();
            this.currentAction.paused = false;
            
            // If this is the first time play is pressed, start fade timer
            if (!this.hasPlayedOnce) {
                this.hasPlayedOnce = true;
                this.clearHideTimeout(); // Cancel startup fade
                this.startFirstPlayFade();
            }
        } else {
            this.currentAction.paused = true;
        }
        
        // Update icon to match current state
        this.updatePlayPauseIcon();
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
        if (settings.isPlaying !== undefined && this.currentAction) {
            // Only toggle if the state is different
            if (settings.isPlaying !== this.isPlaying) {
                this.togglePlayPause();
            } else {
                // Ensure icon matches current state
                this.updatePlayPauseIcon();
            }
        }
    }
    
    // Set screenshot callback
    setScreenshotCallback(callback) {
        this.onScreenshotRequest = callback;
    }
    
    // Show/hide screenshot button
    setScreenshotButtonVisible(visible) {
        if (this.screenshotBtn) {
            this.screenshotBtn.style.setProperty('display', visible ? 'flex' : 'none', 'important');
        }
    }
}

export default AnimationPlayer;