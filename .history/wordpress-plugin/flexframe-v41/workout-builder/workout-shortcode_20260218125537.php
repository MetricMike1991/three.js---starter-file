<?php
/**
 * FlexFrame Workout Builder - Shortcode & Script Enqueue
 * Usage: [flexframe_workout_builder]
 * Share page detects ?w=HASH parameter automatically
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

    // Print CSS
    wp_enqueue_style(
        'flexframe-workout-print',
        $plugin_url . 'workout-print.css',
        array('flexframe-workout-builder'),
        FLEXFRAME_VERSION,
        'print'
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
        array(),
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

    wp_localize_script('flexframe-workout-builder', 'flexframeWorkoutSettings', array(
        'restUrl'       => esc_url_raw(rest_url('flexframe/v1/')),
        'nonce'         => wp_create_nonce('wp_rest'),
        'isLoggedIn'    => is_user_logged_in(),
        'userId'        => get_current_user_id(),
        'userName'      => is_user_logged_in() ? wp_get_current_user()->display_name : '',
        'primaryColor'  => ($primary_color_mode === 'custom' && $primary_color) ? $primary_color : '#ec2f2c',
        'logoUrl'       => $logo_url,
        'exercisesCdn'  => $exercises_cdn,
        'siteUrl'       => home_url('/'),
        'shareHash'     => isset($_GET['w']) ? sanitize_text_field($_GET['w']) : '',
        'viewerPageUrl' => get_option('flexframe_viewer_page_url', ''),
    ));
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

    ob_start();
    ?>
    <div id="flexframe-workout-builder" 
         class="ffwb" 
         style="--ffwb-primary: <?php echo esc_attr($settings['primaryColor']); ?>;"
         data-share-hash="<?php echo isset($_GET['w']) ? esc_attr($_GET['w']) : ''; ?>">
        
        <!-- Header -->
        <div class="ffwb-header">
            <div class="ffwb-header-left">
                <?php if ($settings['logoUrl']): ?>
                    <img src="<?php echo esc_url($settings['logoUrl']); ?>" alt="Logo" class="ffwb-logo">
                <?php endif; ?>
                <div class="ffwb-title-area">
                    <input type="text" class="ffwb-workout-name" placeholder="Workout Name..." maxlength="100">
                    <span class="ffwb-author-label"></span>
                </div>
            </div>
            <div class="ffwb-header-right">
                <button class="ffwb-btn ffwb-btn-icon ffwb-btn-print" title="Print Workout">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                </button>
                <button class="ffwb-btn ffwb-btn-secondary ffwb-btn-save" title="Save Workout">Save</button>
                <button class="ffwb-btn ffwb-btn-primary ffwb-btn-share" title="Save & Share">Share</button>
            </div>
        </div>

        <!-- Share banner (shown when viewing a shared workout) -->
        <div class="ffwb-share-banner" style="display:none;">
            <span class="ffwb-share-banner-text"></span>
            <div class="ffwb-share-banner-actions">
                <button class="ffwb-btn ffwb-btn-small ffwb-btn-copy-workout">📋 Copy to My Workouts</button>
                <button class="ffwb-btn ffwb-btn-small ffwb-btn-print">🖨️ Print</button>
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
        </div>

        <!-- Save/Share modal -->
        <div class="ffwb-modal ffwb-modal-share" style="display:none;">
            <div class="ffwb-modal-backdrop"></div>
            <div class="ffwb-modal-content">
                <button class="ffwb-modal-close">&times;</button>
                <h3 class="ffwb-modal-title">✅ Workout Saved!</h3>
                <div class="ffwb-share-link-wrap">
                    <label>Share Link:</label>
                    <div class="ffwb-share-link-row">
                        <input type="text" class="ffwb-share-link-input" readonly>
                        <button class="ffwb-btn ffwb-btn-primary ffwb-btn-copy-link">📋 Copy</button>
                    </div>
                </div>
                <div class="ffwb-share-qr"></div>
                <div class="ffwb-modal-actions">
                    <button class="ffwb-btn ffwb-btn-secondary ffwb-btn-modal-print">🖨️ Print</button>
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
        .is-layout-constrained, .is-layout-flow {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        /* Ensure workout builder fills the screen */
        #flexframe-workout-builder {
            min-height: 100vh !important;
            width: 100% !important;
            max-width: 100% !important;
        }
    ';
}
