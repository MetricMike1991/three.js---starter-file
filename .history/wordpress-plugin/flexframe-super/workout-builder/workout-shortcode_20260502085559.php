<?php
/**
 * FlexFrame Workout Builder - Shortcode & Script Enqueue
 * Usage: [flexframe_workout_builder]
 * Share page detects ?workout=HASH parameter automatically
 */

if (!defined('ABSPATH')) exit;

/**
 * Enqueue workout builder assets
 */
function flexframe_enqueue_workout_builder_assets() {
    global $post;
    
    // Only load on pages with our shortcode
    if (!is_a($post, 'WP_Post') || !has_shortcode($post->post_content, 'flexframe_workout_builder')) {
        return;
    }

    $plugin_url = FLEXFRAME_PLUGIN_URL . 'workout-builder/';

    // Main builder CSS
    wp_enqueue_style(
        'flexframe-workout-builder',
        $plugin_url . 'workout-builder.css',
        array(),
        FLEXFRAME_VERSION
    );

    // Print CSS (kept as fallback for browser Ctrl+P)
    wp_enqueue_style(
        'flexframe-workout-print',
        $plugin_url . 'workout-print.css',
        array('flexframe-workout-builder'),
        FLEXFRAME_VERSION,
        'print'
    );

    // jsPDF + AutoTable for PDF generation
    wp_enqueue_script(
        'jspdf',
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
        array(),
        '2.5.1',
        true
    );
    wp_enqueue_script(
        'jspdf-autotable',
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js',
        array('jspdf'),
        '3.8.2',
        true
    );

    // If this is a dedicated workout page, inject full-screen CSS to hide sidebars/header/footer
    $is_workout_page = get_post_meta($post->ID, '_flexframe_workout_page', true);
    if ($is_workout_page) {
        wp_add_inline_style('flexframe-workout-builder', flexframe_get_workout_fullscreen_css());
    }

    // Main builder JS
    wp_enqueue_script(
        'flexframe-workout-builder',
        $plugin_url . 'workout-builder.js',
        array('jspdf', 'jspdf-autotable'),
        FLEXFRAME_VERSION,
        true
    );

    // Pass settings to JS
    $primary_color = get_option('flexframe_primary_color', '#ec2f2c');
    $primary_color_mode = get_option('flexframe_primary_color_mode', 'default');
    $logo_url = get_option('flexframe_logo_url', '');
    // Fix mixed content: ensure logo URL uses HTTPS if site does
    if ($logo_url && is_ssl()) {
        $logo_url = str_replace('http://', 'https://', $logo_url);
    }
    $exercises_cdn = 'https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises.json';
    
    // Get custom exercises (YouTube-based)
    $custom_exercises_json = get_option('flexframe_custom_exercises', '[]');
    $custom_exercises = json_decode($custom_exercises_json, true);
    if (!is_array($custom_exercises)) {
        $custom_exercises = array();
    }

    wp_localize_script('flexframe-workout-builder', 'flexframeWorkoutSettings', array(
        'restUrl'       => esc_url_raw(rest_url('flexframe/v1/')),
        'nonce'         => wp_create_nonce('wp_rest'),
        'isLoggedIn'    => is_user_logged_in(),
        'userId'        => get_current_user_id(),
        'userName'      => is_user_logged_in() ? wp_get_current_user()->display_name : '',
        'primaryColor'  => ($primary_color_mode === 'custom' && $primary_color) ? $primary_color : '#ec2f2c',
        'logoUrl'       => $logo_url,
        'exercisesCdn'  => $exercises_cdn,
        'customExercises' => $custom_exercises,
        'siteUrl'       => home_url('/'),
        'shareHash'     => isset($_GET['workout']) ? sanitize_text_field($_GET['workout']) : '',
        'viewerPageUrl' => get_option('flexframe_viewer_page_url', ''),
        'privacyPolicyUrl' => get_option('flexframe_privacy_policy_url', ''),
    ));

    // ── AI Coach (logged-in users only, requires OpenAI key) ──
    $coach_enabled = is_user_logged_in()
        && defined('FLEXFRAME_OPENAI_KEY')
        && FLEXFRAME_OPENAI_KEY !== '';

    if ($coach_enabled) {
        wp_enqueue_style(
            'flexframe-ai-coach',
            $plugin_url . 'ai-coach.css',
            array('flexframe-workout-builder'),
            FLEXFRAME_VERSION
        );
        wp_enqueue_script(
            'flexframe-ai-coach',
            $plugin_url . 'ai-coach.js',
            array('flexframe-workout-builder'),
            FLEXFRAME_VERSION,
            true
        );
        wp_localize_script('flexframe-ai-coach', 'flexframeCoachSettings', array(
            'restUrl'    => esc_url_raw(rest_url('flexframe/v1/')),
            'nonce'      => wp_create_nonce('wp_rest'),
            'isLoggedIn' => true,
        ));
    }
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_workout_builder_assets');

/**
 * Workout Builder Shortcode
 */
function flexframe_workout_builder_shortcode($atts) {
    $atts = shortcode_atts(array(), $atts, 'flexframe_workout_builder');

    $settings = array(
        'primaryColor' => get_option('flexframe_primary_color_mode', 'default') === 'custom' 
            ? get_option('flexframe_primary_color', '#ec2f2c') 
            : '#ec2f2c',
        'logoUrl' => get_option('flexframe_logo_url', ''),
    );

    // Fix mixed content: ensure logo URL uses HTTPS if site does
    if ($settings['logoUrl'] && is_ssl()) {
        $settings['logoUrl'] = str_replace('http://', 'https://', $settings['logoUrl']);
    }

    ob_start();
    ?>
    <div id="flexframe-workout-builder" 
         class="ffwb" 
         style="--ffwb-primary: <?php echo esc_attr($settings['primaryColor']); ?>;"
         data-share-hash="<?php echo isset($_GET['workout']) ? esc_attr($_GET['workout']) : ''; ?>">
        
        <!-- Logo -->
        <?php if ($settings['logoUrl']): ?>
            <div class="ffwb-logo-wrap">
                <img src="<?php echo esc_url($settings['logoUrl']); ?>" alt="Logo" class="ffwb-logo">
            </div>
        <?php endif; ?>

        <!-- Header -->
        <div class="ffwb-header">
            <div class="ffwb-header-left">
                <div class="ffwb-title-area">
                    <input type="text" class="ffwb-workout-name" placeholder="Workout Name..." maxlength="100">
                    <span class="ffwb-author-label"></span>
                </div>
            </div>
            <div class="ffwb-header-right">
                <button class="ffwb-btn ffwb-btn-like" title="Like this workout" style="display:none;">
                    <svg class="ffwb-heart-outline" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <svg class="ffwb-heart-filled" width="22" height="22" viewBox="0 0 24 24" fill="#e74c3c" stroke="none" style="display:none;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span class="ffwb-like-count"></span>
                </button>
                <button class="ffwb-btn ffwb-btn-reset" title="Clear workout & start fresh">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                    <span class="ffwb-btn-reset-label">New</span>
                </button>
                <button class="ffwb-btn ffwb-btn-primary ffwb-btn-share" title="Save & Share">Save / Share</button>
            </div>
        </div>

        <!-- Exercise list (the builder area) -->
        <div class="ffwb-exercise-list"></div>

        <!-- Add Exercise ghost card (sits below the list) -->
        <div class="ffwb-finder">
            <div class="ffwb-add-card ffwb-finder-toggle-btn">
                <div class="ffwb-add-card-inner">
                    <div class="ffwb-add-card-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </div>
                    <span class="ffwb-add-card-label">Add Exercise</span>
                </div>
            </div>
            <div class="ffwb-finder-panel" style="display:none;">
                <div class="ffwb-finder-topbar">
                    <div class="ffwb-finder-search-wrap">
                        <svg class="ffwb-finder-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        <input type="text" class="ffwb-finder-search" placeholder="Search by name, muscle, or equipment...">
                        <button class="ffwb-finder-search-clear" title="Clear search" style="display:none;">&times;</button>
                    </div>
                    <button class="ffwb-finder-close-btn" title="Close">&times;</button>
                </div>
                <div class="ffwb-finder-body">
                    <div class="ffwb-finder-sidebar">
                        <div class="ffwb-filter-section">
                            <div class="ffwb-filter-title">Type</div>
                            <div class="ffwb-filter-grid ffwb-filter-type-grid"></div>
                        </div>
                        <div class="ffwb-filter-section">
                            <div class="ffwb-filter-title">Muscles</div>
                            <div class="ffwb-filter-grid ffwb-filter-muscles-grid"></div>
                        </div>
                        <div class="ffwb-filter-section">
                            <div class="ffwb-filter-title">Equipment</div>
                            <div class="ffwb-filter-grid ffwb-filter-equipment-grid"></div>
                        </div>
                    </div>
                    <div class="ffwb-finder-results">
                        <div class="ffwb-finder-results-header">
                            <span class="ffwb-finder-results-count">All exercises</span>
                            <button class="ffwb-btn ffwb-btn-small ffwb-finder-clear-filters" style="display:none;">Clear All</button>
                        </div>
                        <div class="ffwb-finder-results-scroll">
                            <div class="ffwb-finder-results-grid"></div>
                            <div class="ffwb-finder-no-results" style="display:none;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.3"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                                <p>No exercises match your filters</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer stats -->
        <div class="ffwb-footer">
            <span class="ffwb-stat ffwb-stat-exercises">0 exercises</span>
            <span class="ffwb-stat-divider">·</span>
            <span class="ffwb-stat ffwb-stat-duration">~0 min</span>
            <a class="ffwb-browse-exercises-link" href="#" style="display:none;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Browse Exercises
            </a>
        </div>

        <!-- Save/Share modal -->
        <div class="ffwb-modal ffwb-modal-share" style="display:none;">
            <div class="ffwb-modal-backdrop"></div>
            <div class="ffwb-modal-content">
                <button class="ffwb-modal-close">&times;</button>

                <!-- Step 1: Email capture -->
                <div class="ffwb-share-step ffwb-share-step-email">
                    <div class="ffwb-modal-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--ffwb-primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    </div>
                    <h3 class="ffwb-modal-title">Workout Saved!</h3>
                    <p class="ffwb-modal-subtitle">Enter your email to get a shareable link.</p>

                    <div class="ffwb-share-email-field">
                        <label for="ffwb-share-email">Email Address</label>
                        <input type="email" id="ffwb-share-email" class="ffwb-share-email-input" placeholder="you@example.com" autocomplete="email">
                        <span class="ffwb-share-email-error" style="display:none;"></span>
                    </div>

                    <label class="ffwb-share-consent">
                        <input type="checkbox" class="ffwb-share-consent-check">
                        <span>I agree to receive workout updates and marketing communications. You can unsubscribe at any time. By sharing, you also consent to your email being stored in accordance with our <a href="<?php echo esc_url(get_option('flexframe_privacy_policy_url', '#')); ?>" target="_blank" class="ffwb-privacy-link">privacy policy</a>.</span>
                    </label>

                    <label class="ffwb-share-consent ffwb-share-daypass">
                        <input type="checkbox" class="ffwb-share-daypass-check">
                        <span>I'd like to request a <strong>free day pass</strong> for the gym!</span>
                    </label>

                    <button class="ffwb-btn ffwb-btn-primary ffwb-btn-get-link" disabled>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
                        Get Share Link
                    </button>
                </div>

                <!-- Step 2: Share link (shown after email submitted) -->
                <div class="ffwb-share-step ffwb-share-step-link" style="display:none;">
                    <div class="ffwb-modal-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--ffwb-primary)"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
                    </div>
                    <h3 class="ffwb-modal-title">Your Share Link</h3>
                    <div class="ffwb-share-link-wrap">
                        <div class="ffwb-share-link-row">
                            <input type="text" class="ffwb-share-link-input" readonly>
                            <button class="ffwb-btn ffwb-btn-primary ffwb-btn-copy-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                                Copy
                            </button>
                        </div>
                    </div>
                    <div class="ffwb-modal-actions">
                        <button class="ffwb-btn ffwb-btn-secondary ffwb-btn-modal-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                            Save PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Print-only layout (hidden on screen, visible on print) -->
    <div id="flexframe-workout-print" class="ffwb-print-layout" style="display:none;">
        <div class="ffwb-print-header">
            <?php if ($settings['logoUrl']): ?>
                <img src="<?php echo esc_url($settings['logoUrl']); ?>" alt="Logo" class="ffwb-print-logo">
            <?php endif; ?>
            <div class="ffwb-print-title"></div>
            <div class="ffwb-print-date">Date: ___ / ___ / ___</div>
        </div>
        <div class="ffwb-print-exercises"></div>
        <div class="ffwb-print-footer">
            <div class="ffwb-print-notes">
                <strong>Notes:</strong>
                <div class="ffwb-print-notes-lines"></div>
            </div>
            <div class="ffwb-print-qr"></div>
        </div>
    </div>
    <?php
    // ── AI Coach floating chat (logged-in users only, requires API key) ──
    $coach_enabled = is_user_logged_in()
        && defined('FLEXFRAME_OPENAI_KEY')
        && FLEXFRAME_OPENAI_KEY !== '';
    if ($coach_enabled) :
    ?>
    <div id="flexframe-ai-coach" class="ffc-root">
        <button class="ffc-bubble" type="button" aria-label="Open FlexFrame Coach">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            <span class="ffc-bubble-dot"></span>
        </button>
        <div class="ffc-panel" role="dialog" aria-label="FlexFrame Coach chat">
            <div class="ffc-header">
                <div class="ffc-header-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z"/></svg>
                </div>
                <div class="ffc-header-text">
                    <div class="ffc-header-title">FlexFrame Coach</div>
                    <div class="ffc-header-sub">AI workout builder · beta</div>
                </div>
                <div class="ffc-header-actions">
                    <button class="ffc-header-btn ffc-header-reset" type="button" title="New chat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                    </button>
                    <button class="ffc-header-btn ffc-header-close" type="button" title="Close">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                </div>
            </div>
            <div class="ffc-messages"></div>
            <div class="ffc-chips">
                <button type="button" class="ffc-chip" data-prompt="Build me a 45-minute push day at the gym (intermediate, no injuries).">45-min push day</button>
                <button type="button" class="ffc-chip" data-prompt="I'm a beginner. Give me a full-body workout I can do at home with dumbbells in 30 minutes.">Beginner home (DBs)</button>
                <button type="button" class="ffc-chip" data-prompt="Hypertrophy leg day, 60 minutes, full gym access.">Leg hypertrophy</button>
                <button type="button" class="ffc-chip" data-prompt="Quick 20-minute fat-loss circuit with minimal equipment.">20-min fat loss</button>
            </div>
            <div class="ffc-input-bar">
                <textarea class="ffc-input" rows="1" placeholder="Tell me your goal, time, equipment…"></textarea>
                <button class="ffc-send" type="button" aria-label="Send">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        </div>
    </div>
    <?php endif; ?>
    <?php
    return ob_get_clean();
}
add_shortcode('flexframe_workout_builder', 'flexframe_workout_builder_shortcode');

/**
 * Generate full-screen CSS for dedicated workout builder pages.
 * Hides WordPress headers, footers, sidebars, and admin bar.
 */
function flexframe_get_workout_fullscreen_css() {
    return '
        /* ===== FlexFrame Workout Builder Full-Screen Mode ===== */
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            background: #1a1a1a !important;
        }
        /* Hide WordPress header, footer, sidebar, navigation, admin bar */
        header, footer, aside, nav,
        .site-header, .site-footer, .site-sidebar, .site-navigation,
        .wp-site-header, .wp-site-footer, .wp-site-navigation,
        #masthead, #colophon, #secondary, #site-navigation,
        .main-navigation, .footer-navigation,
        .widget-area, .sidebar, .site-info,
        .entry-header, .entry-footer, .entry-meta,
        .post-navigation, .comments-area,
        .page-header, .page-title, .entry-title,
        .wp-block-post-title, .wp-block-latest-posts,
        .wp-block-query, .wp-block-template-part,
        .has-global-padding > .wp-block-template-part,
        #wpadminbar,
        .breadcrumb, .breadcrumbs,
        .skip-link {
            display: none !important;
        }
        /* Make content area full width */
        main, .site-main, .site-content, .content-area,
        .entry-content, article, .page, .type-page,
        .wp-block-group, .wp-site-blocks,
        .is-layout-constrained, .is-layout-flow,
        .inside-article, .ast-article-single,
        .post-inner, .entry-content-wrap {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
        }
        /* Ensure workout builder fills the screen */
        #flexframe-workout-builder {
            min-height: 100vh !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
        }
    ';
}
