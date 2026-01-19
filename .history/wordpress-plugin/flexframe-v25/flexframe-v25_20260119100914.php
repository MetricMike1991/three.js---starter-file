<?php
/**
 * Plugin Name: FlexFrame v25
 * Plugin URI: https://flexframe.com
 * Description: 3D interactive exercise viewer with customizable logo and materials
 * Version: 1.25.0
 * Author: FlexFrame
 * Author URI: https://flexframe.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: flexframe-viewer
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Enable debugging for FlexFrame plugin
define('FLEXFRAME_DEBUG', true);

// Debug logging function - logs to wp-content/debug.log if WP_DEBUG_LOG is enabled
function flexframe_log($message, $data = null) {
    if (!defined('FLEXFRAME_DEBUG') || !FLEXFRAME_DEBUG) return;
    
    $log_message = '[FlexFrame Debug] ' . $message;
    if ($data !== null) {
        $log_message .= ' | Data: ' . print_r($data, true);
    }
    
    // Log to PHP error log (appears in wp-content/debug.log if WP_DEBUG_LOG is true)
    error_log($log_message);
}

// Define plugin constants
define('FLEXFRAME_VERSION', '1.25.0');
define('FLEXFRAME_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLEXFRAME_PLUGIN_URL', plugin_dir_url(__FILE__));

// Log plugin initialization
flexframe_log('Plugin loaded', array('version' => '1.10.0', 'plugin_url' => plugin_dir_url(__FILE__)));

// Include admin settings
require_once FLEXFRAME_PLUGIN_DIR . 'admin/settings-page.php';

/**
 * Enqueue plugin assets
 */
function flexframe_enqueue_assets() {
    // Only load on pages with the shortcode
    global $post;
    
    flexframe_log('flexframe_enqueue_assets called', array('post_id' => $post ? $post->ID : 'null'));
    
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'flexframe_viewer')) {
        
        flexframe_log('Shortcode detected - loading assets');
        
        // Enqueue CSS
        wp_enqueue_style(
            'flexframe-viewer-style',
            FLEXFRAME_PLUGIN_URL . 'assets/css/style.css',
            array(),
            FLEXFRAME_VERSION
        );
        
        // Check if this is a dedicated FlexFrame viewer page (hide all WP elements)
        $is_viewer_page = get_post_meta($post->ID, '_flexframe_viewer_page', true);
        
        // Add inline CSS for WordPress theme isolation
        $isolation_css = '
            /* FlexFrame CSS Isolation from WordPress Theme */
            #flexframe-viewer-container * {
                box-sizing: border-box;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            #flexframe-viewer-container button,
            #flexframe-viewer-container input {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            }
            
            /* Prevent WordPress from breaking lil-gui elements */
            .lil-gui input[type="range"] {
                -webkit-appearance: slider-horizontal !important;
                height: auto !important;
                padding: 0 !important;
                margin: 0 !important;
                border: none !important;
                background: transparent !important;
            }
            .lil-gui select {
                height: auto !important;
                padding: 0 0 0 4px !important;
                margin: 0 !important;
                line-height: normal !important;
            }
            .lil-gui input[type="text"],
            .lil-gui input[type="number"] {
                height: auto !important;
                padding: 4px !important;
                margin: 0 !important;
                line-height: normal !important;
                border-radius: 0 !important;
            }
            .lil-gui button {
                height: auto !important;
                padding: 4px !important;
                margin: 0 !important;
                line-height: normal !important;
                border: 0 !important;
                border-radius: 0 !important;
                text-transform: none !important;
                letter-spacing: normal !important;
            }
            
            /* FlexFrame menu system - ensure visibility and clickability */
            #flexframe-viewer-container .thumbnail-grid-container {
                position: fixed !important;
                left: -260px !important; /* Start hidden, slides in on hover */
                z-index: 9999 !important;
                pointer-events: auto !important;
                transition: left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            #flexframe-viewer-container .thumbnail-grid-container:hover,
            #flexframe-viewer-container .thumbnail-grid-container.menu-visible,
            #flexframe-viewer-container .thumbnail-grid-container.menu-active {
                left: 20px !important;
            }
            /* Ensure the hover trigger area works */
            #flexframe-viewer-container .thumbnail-grid-container::before {
                content: \"\" !important;
                position: absolute !important;
                top: 0 !important;
                right: -30px !important;
                width: 30px !important;
                height: 100% !important;
                background: transparent !important;
                pointer-events: auto !important;
            }
            #flexframe-viewer-container .thumbnail-menu-toggle {
                pointer-events: auto !important;
                cursor: pointer !important;
                position: relative !important;
                z-index: 10000 !important;
                background: rgba(0, 0, 0, 0.8) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
            }
            /* Block WordPress theme hover effects */
            #flexframe-viewer-container .thumbnail-menu-toggle:hover,
            #flexframe-viewer-container .thumbnail-menu-toggle:focus,
            #flexframe-viewer-container .thumbnail-menu-toggle:active {
                background: rgba(74, 158, 255, 0.3) !important;
                border-color: rgba(74, 158, 255, 0.5) !important;
                outline: none !important;
                box-shadow: none !important;
                color: white !important;
            }
            
            /* Search input styling - override WordPress theme */
            #flexframe-viewer-container .search-input,
            #flexframe-viewer-container input.search-input,
            #flexframe-viewer-container #searchInput,
            #flexframe-viewer-container input#searchInput,
            .thumbnail-dropdown .search-input,
            .search-header .search-input {
                width: 100% !important;
                padding: 8px 40px 8px 12px !important;
                background: rgba(30, 30, 30, 0.95) !important;
                border: 2px solid rgba(74, 158, 255, 0.3) !important;
                border-radius: 6px !important;
                color: #fff !important;
                font-size: 14px !important;
                font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif !important;
                outline: none !important;
                box-sizing: border-box !important;
                height: auto !important;
                line-height: 1.4 !important;
                margin: 0 !important;
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
            }
            #flexframe-viewer-container .search-input::placeholder,
            #flexframe-viewer-container input.search-input::placeholder,
            #flexframe-viewer-container #searchInput::placeholder {
                color: rgba(255, 255, 255, 0.4) !important;
                opacity: 1 !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container input.search-input:focus,
            #flexframe-viewer-container #searchInput:focus {
                border-color: rgba(74, 158, 255, 0.6) !important;
                background: rgba(40, 40, 40, 0.98) !important;
                box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.1) !important;
                outline: none !important;
                color: #fff !important;
            }
            /* Search header container */
            #flexframe-viewer-container .search-header,
            .thumbnail-dropdown .search-header {
                padding: 10px 15px !important;
                background: linear-gradient(180deg, rgba(74, 158, 255, 0.15), rgba(0, 0, 0, 0.1)) !important;
                border-bottom: 1px solid rgba(74, 158, 255, 0.3) !important;
                margin: -15px -15px 10px !important;
                border-radius: 12px 12px 0 0 !important;
            }
            /* Search input wrapper */
            #flexframe-viewer-container .search-input-wrapper,
            .thumbnail-dropdown .search-input-wrapper {
                position: relative !important;
                display: flex !important;
                align-items: center !important;
            }
            /* Search action button */
            #flexframe-viewer-container .search-action-btn,
            .thumbnail-dropdown .search-action-btn {
                position: absolute !important;
                right: 4px !important;
                background: rgba(74, 158, 255, 0.2) !important;
                border: none !important;
                border-radius: 4px !important;
                width: 32px !important;
                height: 32px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                color: rgba(74, 158, 255, 0.9) !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            #flexframe-viewer-container .search-action-btn:hover {
                background: rgba(74, 158, 255, 0.35) !important;
                color: #4a9eff !important;
            }
            #flexframe-viewer-container .search-action-btn svg {
                width: 18px !important;
                height: 18px !important;
                fill: currentColor !important;
            }
            /* Search suggestions dropdown */
            #flexframe-viewer-container .search-suggestions,
            .thumbnail-dropdown .search-suggestions {
                position: absolute !important;
                top: calc(100% + 4px) !important;
                left: 0 !important;
                right: 0 !important;
                background: rgba(30, 30, 30, 0.98) !important;
                border: 2px solid rgba(74, 158, 255, 0.4) !important;
                border-radius: 6px !important;
                overflow-y: auto !important;
                max-height: 300px !important;
                z-index: 10002 !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
            }
            #flexframe-viewer-container .search-suggestion-item {
                padding: 10px 12px !important;
                color: rgba(255, 255, 255, 0.85) !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                font-size: 13px !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                background: transparent !important;
            }
            #flexframe-viewer-container .search-suggestion-item:hover {
                background: rgba(74, 158, 255, 0.2) !important;
                color: #fff !important;
            }
            #flexframe-viewer-container .search-suggestion-category {
                padding: 8px 12px !important;
                font-size: 11px !important;
                font-weight: 600 !important;
                color: rgba(74, 158, 255, 0.8) !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                background: rgba(74, 158, 255, 0.1) !important;
                border-bottom: 1px solid rgba(74, 158, 255, 0.2) !important;
            }
            
            #flexframe-viewer-container .thumbnail-dropdown {
                pointer-events: auto !important;
                display: none !important;
            }
            /* Force dropdown visibility when .show class is present - multiple selectors for specificity */
            #flexframe-viewer-container .thumbnail-dropdown.show,
            #flexframe-viewer-container .thumbnail-menu-wrapper .thumbnail-dropdown.show,
            .thumbnail-grid-container .thumbnail-dropdown.show,
            div.thumbnail-dropdown.show {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: auto !important;
                overflow: visible !important;
                position: fixed !important;
                top: 150px !important;
                left: 20px !important;
                z-index: 10001 !important;
            }
            
            /* Right side menu system */
            #flexframe-viewer-container .thumbnail-grid-container-right {
                position: fixed !important;
                right: -260px !important;
                z-index: 9999 !important;
                pointer-events: auto !important;
                transition: right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            #flexframe-viewer-container .thumbnail-grid-container-right:hover,
            #flexframe-viewer-container .thumbnail-grid-container-right.menu-visible,
            #flexframe-viewer-container .thumbnail-grid-container-right.menu-active {
                right: 20px !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right {
                pointer-events: auto !important;
                display: none !important;
            }
            /* Force right dropdown visibility when .show class is present */
            #flexframe-viewer-container .thumbnail-dropdown-right.show,
            #flexframe-viewer-container .thumbnail-menu-wrapper .thumbnail-dropdown-right.show,
            .thumbnail-grid-container-right .thumbnail-dropdown-right.show,
            div.thumbnail-dropdown-right.show {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: auto !important;
                overflow: visible !important;
                position: fixed !important;
                top: 150px !important;
                right: 20px !important;
                z-index: 10001 !important;
            }
            
            /* Hide ANY menu containers that are NOT inside #flexframe-viewer-container */
            .thumbnail-grid-container {
                display: none !important;
            }
            .thumbnail-grid-container-right {
                display: none !important;
            }
            /* Only show the ones inside our container */
            #flexframe-viewer-container .thumbnail-grid-container {
                display: grid !important;
            }
            #flexframe-viewer-container .thumbnail-grid-container-right {
                display: grid !important;
            }
        ';
        
        // If this is a dedicated FlexFrame viewer page, hide all WordPress theme elements
        if ($is_viewer_page) {
            $isolation_css .= '
            /* Full-screen FlexFrame viewer - hide all WordPress elements */
            html {
                overflow: hidden !important;
                height: 100vh !important;
                width: 100vw !important;
            }
            body, body.page {
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                height: 100vh !important;
                width: 100vw !important;
                min-height: 100vh !important;
                max-height: 100vh !important;
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
            /* Make content area full screen */
            main, .site-main, .site-content, .content-area,
            .entry-content, article, .page, .type-page,
            .wp-block-group, .wp-site-blocks,
            .is-layout-constrained, .is-layout-flow {
                width: 100vw !important;
                max-width: 100vw !important;
                height: 100vh !important;
                max-height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                position: relative !important;
            }
            /* Ensure FlexFrame container is full screen */
            #flexframe-viewer-container {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 9999 !important;
                overflow: visible !important;
            }
            /* Animation player is appended to body, not container - ensure proper positioning */
            body > .animation-player,
            .animation-player {
                position: fixed !important;
                bottom: 0 !important;
                left: 2.5% !important;
                right: 2.5% !important;
                width: 95% !important;
                z-index: 100000 !important;
                visibility: visible !important;
                display: block !important;
                /* Default hidden state - let JS control visibility via .visible class */
                transform: translateY(100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease-in-out !important;
            }
            /* Visible state - controlled by JavaScript */
            body > .animation-player.visible,
            .animation-player.visible {
                transform: translateY(0) !important;
                opacity: 1 !important;
                pointer-events: all !important;
            }
            /* Always visible mode - overrides auto-hide */
            body > .animation-player.always-visible,
            .animation-player.always-visible {
                transform: translateY(0) !important;
                opacity: 1 !important;
                pointer-events: all !important;
                transition: none !important;
            }
            body > .animation-player-trigger,
            .animation-player-trigger {
                z-index: 99999 !important;
            }
            ';
        }
        
        wp_add_inline_style('flexframe-viewer-style', $isolation_css);
        
        // Add UI settings dynamic CSS
        $spinner_color = esc_attr(get_option('flexframe_spinner_color', '#4a9eff'));
        $use_logo_loader = get_option('flexframe_use_logo_loader', false);
        $logo_loader_animation = esc_attr(get_option('flexframe_logo_loader_animation', 'pulse'));
        $logo_loader_size = absint(get_option('flexframe_logo_loader_size', 80));
        $player_bg_color = esc_attr(get_option('flexframe_player_bg_color', '#000000'));
        $player_bg_opacity = floatval(get_option('flexframe_player_bg_opacity', 0.8));
        $player_button_bg_color = esc_attr(get_option('flexframe_player_button_bg_color', '#ffffff'));
        $player_button_bg_opacity = floatval(get_option('flexframe_player_button_bg_opacity', 0.1));
        $player_icon_color = esc_attr(get_option('flexframe_player_icon_color', '#ffffff'));
        $player_accent_color = esc_attr(get_option('flexframe_player_accent_color', '#00bcd4'));
        $player_always_visible = get_option('flexframe_player_always_visible', 'no') === 'yes';
        $menu_bg_color = esc_attr(get_option('flexframe_menu_bg_color', '#000000'));
        $menu_bg_opacity = floatval(get_option('flexframe_menu_bg_opacity', 0.9));
        $menu_text_color = esc_attr(get_option('flexframe_menu_text_color', '#ffffff'));
        $menu_accent_color = esc_attr(get_option('flexframe_menu_accent_color', '#4a9eff'));
        
        // Convert hex to RGB for rgba usage
        $player_bg_rgb = sscanf($player_bg_color, "#%02x%02x%02x");
        $player_button_bg_rgb = sscanf($player_button_bg_color, "#%02x%02x%02x");
        $menu_bg_rgb = sscanf($menu_bg_color, "#%02x%02x%02x");
        
        $ui_css = '
            /* FlexFrame UI Settings - Loading Spinner */
            .flexframe-loading-spinner,
            .loading-spinner,
            .spinner,
            #flexframe-viewer-container .loading-indicator {
                border-top-color: ' . $spinner_color . ' !important;
            }
            .flexframe-loading-spinner::after,
            .loading-spinner::after {
                border-color: ' . $spinner_color . ' transparent transparent transparent !important;
            }
            
            /* FlexFrame UI Settings - Animation Player Background */
            .animation-player {
                background-color: rgba(' . $player_bg_rgb[0] . ', ' . $player_bg_rgb[1] . ', ' . $player_bg_rgb[2] . ', ' . $player_bg_opacity . ') !important;
            }
            
            /* Button Background Color */
            .animation-player button,
            .animation-player .player-btn,
            .animation-player .play-pause-btn,
            .animation-player .speed-btn {
                background-color: rgba(' . $player_button_bg_rgb[0] . ', ' . $player_button_bg_rgb[1] . ', ' . $player_button_bg_rgb[2] . ', ' . $player_button_bg_opacity . ') !important;
            }
            
            /* Icon & Text Color */
            .animation-player button,
            .animation-player .player-btn,
            .animation-player .play-pause-btn,
            .animation-player .speed-btn {
                color: ' . $player_icon_color . ' !important;
            }
            .animation-player button svg,
            .animation-player .play-pause-btn svg,
            .animation-player .speed-btn svg {
                fill: ' . $player_icon_color . ' !important;
            }
            .animation-player .speed-btn span,
            .animation-player #speed-text {
                color: ' . $player_icon_color . ' !important;
            }
            .animation-player .current-time,
            .animation-player .duration,
            .animation-player .time-display {
                color: ' . $player_icon_color . ' !important;
            }
            
            /* Progress bar / scrubber accent color */
            .animation-player .progress-bar,
            .animation-player .timeline-fill,
            .animation-player input[type="range"]::-webkit-slider-thumb {
                background-color: ' . $player_accent_color . ' !important;
            }
            .animation-player input[type="range"]::-moz-range-thumb {
                background-color: ' . $player_accent_color . ' !important;
            }
            .animation-player .timeline-slider {
                accent-color: ' . $player_accent_color . ' !important;
            }
            
            /* FlexFrame Logo Loader Animations */
            .logo-loader-container {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .logo-loader-img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            .logo-loader-img.pulse {
                animation: flexframePulse 1.5s ease-in-out infinite;
            }
            .logo-loader-img.spin {
                animation: flexframeSpin 2s linear infinite;
            }
            .logo-loader-img.fade {
                animation: flexframeFade 1.5s ease-in-out infinite;
            }
            .logo-loader-img.bounce {
                animation: flexframeBounce 1s ease-in-out infinite;
            }
            @keyframes flexframePulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }
            @keyframes flexframeSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes flexframeFade {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            @keyframes flexframeBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        ';
        
        // Note: Always-visible mode is controlled by JavaScript adding the .always-visible class
        // The CSS for that class is already defined in the isolation CSS above
        
        $ui_css .= '
            /* FlexFrame UI Settings - Menus */
            /* Keep the main container transparent */
            .thumbnail-grid-container {
                background-color: transparent !important;
            }
            /* Apply background to dropdowns and title buttons */
            .thumbnail-dropdown,
            .thumbnail-menu-toggle,
            .exercise-menu,
            .menu-panel,
            .side-menu,
            .right-menu {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
            }
            /* ALL DROPDOWN BORDERS - use accent color */
            #flexframe-viewer-container .thumbnail-dropdown,
            #flexframe-viewer-container #searchDropdown,
            #flexframe-viewer-container #exercisesDropdown,
            #flexframe-viewer-container #musclesDropdown,
            #flexframe-viewer-container #equipmentDropdown,
            .thumbnail-dropdown,
            #searchDropdown,
            #exercisesDropdown,
            #musclesDropdown,
            #equipmentDropdown {
                border: 2px solid ' . $menu_accent_color . ' !important;
                outline: none !important;
            }
            .thumbnail-grid-container *,
            .exercise-menu *,
            .menu-panel *,
            .side-menu *,
            .thumbnail-dropdown *,
            .right-menu * {
                color: ' . $menu_text_color . ' !important;
            }
            
            /* ===== MENU TITLE BUTTONS (Exercises, Muscles, Equipment, Search) ===== */
            #flexframe-viewer-container .thumbnail-menu-toggle:hover,
            #flexframe-viewer-container .thumbnail-menu-toggle.active,
            #flexframe-viewer-container .thumbnail-menu-toggle:focus,
            .thumbnail-grid-container .thumbnail-menu-toggle:hover,
            .thumbnail-grid-container .thumbnail-menu-toggle.active,
            .thumbnail-grid-container .thumbnail-menu-toggle:focus,
            button.thumbnail-menu-toggle:hover,
            button.thumbnail-menu-toggle.active {
                background-color: ' . $menu_accent_color . ' !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== SLIDE IN/OUT TAB BUTTON ===== */
            #flexframe-viewer-container .menu-hint-tab,
            .thumbnail-grid-container .menu-hint-tab,
            .menu-hint-tab {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .menu-hint-tab:hover,
            .thumbnail-grid-container .menu-hint-tab:hover,
            .menu-hint-tab:hover {
                background-color: ' . $menu_accent_color . 'cc !important;
            }
            
            /* ===== SCROLL BUTTONS ===== */
            .scroll-btn:hover,
            .thumbnail-scroll-controls button:hover {
                background-color: ' . $menu_accent_color . '33 !important;
                color: ' . $menu_accent_color . ' !important;
            }
            .scroll-btn:hover svg,
            .thumbnail-scroll-controls button:hover svg {
                fill: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== SEARCH BUTTON/ICON ===== */
            #flexframe-viewer-container .search-action-btn,
            #flexframe-viewer-container .search-btn,
            #flexframe-viewer-container #searchActionBtn,
            .thumbnail-dropdown .search-action-btn,
            .search-action-btn,
            .search-btn,
            #searchActionBtn,
            .search-input-wrapper button,
            .search-header button {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-action-btn:hover,
            #flexframe-viewer-container .search-btn:hover,
            #flexframe-viewer-container #searchActionBtn:hover,
            .search-action-btn:hover,
            .search-btn:hover,
            #searchActionBtn:hover,
            .search-input-wrapper button:hover,
            .search-header button:hover {
                background-color: ' . $menu_accent_color . 'cc !important;
            }
            
            /* ===== SEARCH INPUT - ALL STATES ===== */
            #flexframe-viewer-container .search-input,
            #flexframe-viewer-container #searchInput,
            #flexframe-viewer-container .search-input-wrapper input,
            #flexframe-viewer-container input.search-input,
            #searchDropdown .search-input,
            #searchDropdown #searchInput,
            #searchDropdown input,
            .thumbnail-dropdown .search-input,
            .thumbnail-dropdown #searchInput,
            .search-header .search-input,
            .search-header input,
            .search-input-wrapper .search-input,
            .search-input,
            #searchInput,
            input.search-input {
                border-color: ' . $menu_accent_color . ' !important;
                outline: none !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container #searchInput:focus,
            #flexframe-viewer-container .search-input-wrapper input:focus,
            #flexframe-viewer-container input.search-input:focus,
            #searchDropdown .search-input:focus,
            #searchDropdown #searchInput:focus,
            #searchDropdown input:focus,
            .thumbnail-dropdown .search-input:focus,
            .thumbnail-dropdown #searchInput:focus,
            .search-header .search-input:focus,
            .search-header input:focus,
            .search-input-wrapper .search-input:focus,
            .search-input:focus,
            #searchInput:focus,
            input.search-input:focus {
                border-color: ' . $menu_accent_color . ' !important;
                outline: 2px solid ' . $menu_accent_color . ' !important;
                outline-offset: -2px !important;
                box-shadow: 0 0 0 3px ' . $menu_accent_color . '33 !important;
            }
            
            /* ===== SEARCH DROPDOWN CONTAINER & SUGGESTIONS ===== */
            #flexframe-viewer-container #searchDropdown,
            #flexframe-viewer-container .search-dropdown,
            #searchDropdown,
            .search-dropdown {
                border-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container #searchDropdown.show,
            #flexframe-viewer-container .search-dropdown.show,
            #searchDropdown.show,
            .search-dropdown.show {
                border-color: ' . $menu_accent_color . ' !important;
                outline: 2px solid ' . $menu_accent_color . ' !important;
            }
            /* Search suggestions dropdown */
            #flexframe-viewer-container .search-suggestions,
            #flexframe-viewer-container #searchSuggestions,
            #flexframe-viewer-container .autocomplete-suggestions,
            #searchSuggestions,
            .search-suggestions,
            .autocomplete-suggestions {
                border-color: ' . $menu_accent_color . ' !important;
            }
            /* Search suggestions hover - all possible item classes */
            #flexframe-viewer-container .search-suggestions .suggestion-item:hover,
            #flexframe-viewer-container .search-suggestions .search-suggestion-item:hover,
            #flexframe-viewer-container .search-suggestions > div:hover,
            #flexframe-viewer-container #searchSuggestions .suggestion-item:hover,
            #flexframe-viewer-container #searchSuggestions .search-suggestion-item:hover,
            #flexframe-viewer-container #searchSuggestions > div:hover,
            #searchSuggestions .suggestion-item:hover,
            #searchSuggestions .search-suggestion-item:hover,
            #searchSuggestions > div:not(.search-suggestion-category):hover,
            .search-suggestions .suggestion-item:hover,
            .search-suggestions .search-suggestion-item:hover,
            .search-suggestions > div:not(.search-suggestion-category):hover,
            .autocomplete-suggestions .suggestion-item:hover,
            .autocomplete-suggestions > div:hover {
                background-color: ' . $menu_accent_color . '33 !important;
            }
            /* Search suggestions scrollbar - webkit */
            #flexframe-viewer-container .search-suggestions::-webkit-scrollbar-thumb,
            #flexframe-viewer-container #searchSuggestions::-webkit-scrollbar-thumb,
            #searchSuggestions::-webkit-scrollbar-thumb,
            .search-suggestions::-webkit-scrollbar-thumb,
            .autocomplete-suggestions::-webkit-scrollbar-thumb {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-suggestions::-webkit-scrollbar-thumb:hover,
            #flexframe-viewer-container #searchSuggestions::-webkit-scrollbar-thumb:hover,
            #searchSuggestions::-webkit-scrollbar-thumb:hover,
            .search-suggestions::-webkit-scrollbar-thumb:hover,
            .autocomplete-suggestions::-webkit-scrollbar-thumb:hover {
                background-color: ' . $menu_accent_color . 'cc !important;
            }
            #flexframe-viewer-container .search-suggestions::-webkit-scrollbar-track,
            #flexframe-viewer-container #searchSuggestions::-webkit-scrollbar-track,
            #searchSuggestions::-webkit-scrollbar-track,
            .search-suggestions::-webkit-scrollbar-track,
            .autocomplete-suggestions::-webkit-scrollbar-track {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            /* Search suggestions scrollbar - Firefox */
            #flexframe-viewer-container .search-suggestions,
            #flexframe-viewer-container #searchSuggestions,
            #searchSuggestions,
            .search-suggestions,
            .autocomplete-suggestions {
                scrollbar-color: ' . $menu_accent_color . ' rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            /* Search input wrapper */
            #flexframe-viewer-container .search-input-wrapper,
            #flexframe-viewer-container .search-header,
            .search-input-wrapper,
            .search-header {
                border-color: ' . $menu_accent_color . ' !important;
            }
            /* Focused search area highlight */
            #flexframe-viewer-container .search-input-wrapper:focus-within,
            #flexframe-viewer-container .search-header:focus-within,
            .search-input-wrapper:focus-within,
            .search-header:focus-within {
                border-color: ' . $menu_accent_color . ' !important;
                box-shadow: 0 0 0 2px ' . $menu_accent_color . '33 !important;
            }
            
            /* ===== SECTION HEADERS (Menus - not search suggestions) ===== */
            #flexframe-viewer-container .section-header,
            #flexframe-viewer-container .menu-section-header,
            #flexframe-viewer-container .category-header,
            #flexframe-viewer-container .group-header,
            #flexframe-viewer-container .exercise-category,
            #flexframe-viewer-container .muscle-group-header,
            .thumbnail-dropdown .section-header,
            .thumbnail-dropdown .menu-section-header,
            .thumbnail-dropdown .category-header,
            .thumbnail-dropdown [class*="header"]:not(.search-header):not(.search-suggestion-category),
            .thumbnail-dropdown [class*="category"]:not(.search-suggestion-category),
            .thumbnail-dropdown [class*="group-title"],
            .section-header,
            .menu-section-header,
            .category-header,
            .group-header,
            .exercise-category,
            .muscle-group-header {
                color: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== SEARCH SUGGESTION CATEGORY HEADERS (POPULAR EXERCISES, MUSCLE GROUPS) ===== */
            /* Background = accent color, Font = white */
            #flexframe-viewer-container .search-suggestion-category,
            #flexframe-viewer-container #searchSuggestions .search-suggestion-category,
            #searchDropdown .search-suggestion-category,
            #searchSuggestions .search-suggestion-category,
            .search-suggestions .search-suggestion-category,
            .search-suggestion-category {
                background-color: ' . $menu_accent_color . ' !important;
                color: #ffffff !important;
                padding: 6px 10px !important;
                margin: 0 !important;
                font-weight: 600 !important;
            }
            
            /* ===== SCROLLBAR STYLING ===== */
            #flexframe-viewer-container .thumbnail-dropdown::-webkit-scrollbar-thumb,
            #flexframe-viewer-container .thumbnail-scroll-container::-webkit-scrollbar-thumb,
            #flexframe-viewer-container .thumbnail-grid::-webkit-scrollbar-thumb,
            #searchDropdown::-webkit-scrollbar-thumb,
            #exercisesDropdown::-webkit-scrollbar-thumb,
            #musclesDropdown::-webkit-scrollbar-thumb,
            #equipmentDropdown::-webkit-scrollbar-thumb,
            .thumbnail-dropdown::-webkit-scrollbar-thumb,
            .thumbnail-scroll-container::-webkit-scrollbar-thumb,
            .thumbnail-grid::-webkit-scrollbar-thumb {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown::-webkit-scrollbar-thumb:hover,
            #flexframe-viewer-container .thumbnail-scroll-container::-webkit-scrollbar-thumb:hover,
            .thumbnail-dropdown::-webkit-scrollbar-thumb:hover,
            .thumbnail-scroll-container::-webkit-scrollbar-thumb:hover {
                background-color: ' . $menu_accent_color . 'cc !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown::-webkit-scrollbar-track,
            #flexframe-viewer-container .thumbnail-scroll-container::-webkit-scrollbar-track,
            .thumbnail-dropdown::-webkit-scrollbar-track,
            .thumbnail-scroll-container::-webkit-scrollbar-track {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            /* Firefox scrollbar */
            #flexframe-viewer-container .thumbnail-dropdown,
            #flexframe-viewer-container .thumbnail-scroll-container,
            .thumbnail-dropdown,
            .thumbnail-scroll-container {
                scrollbar-color: ' . $menu_accent_color . ' rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            
            /* ===== EXERCISE LIST ITEM ICONS ===== */
            #flexframe-viewer-container .exercise-item::before,
            #flexframe-viewer-container .menu-item::before,
            #flexframe-viewer-container .exercise-list-item::before,
            .exercise-item::before,
            .menu-item::before,
            .exercise-list-item::before {
                color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .exercise-icon,
            #flexframe-viewer-container .item-icon,
            #flexframe-viewer-container .exercise-item svg,
            #flexframe-viewer-container .menu-item svg,
            .thumbnail-dropdown .exercise-icon,
            .thumbnail-dropdown .item-icon,
            .thumbnail-dropdown svg.exercise-icon,
            .exercise-icon,
            .item-icon,
            .exercise-item svg,
            .menu-item svg {
                fill: ' . $menu_accent_color . ' !important;
                color: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== THUMBNAIL ITEMS HOVER/ACTIVE ===== */
            .thumbnail-item.active,
            .thumbnail-item:hover,
            .menu-item.active,
            .menu-item:hover,
            .exercise-item.active,
            .exercise-item:hover {
                background-color: ' . $menu_accent_color . '33 !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            .thumbnail-item.active *,
            .menu-item.active * {
                color: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== LINKS HOVER ===== */
            .thumbnail-grid-container a:hover,
            .thumbnail-dropdown a:hover,
            .menu-panel a:hover {
                color: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== OVERRIDE ANY HARDCODED BLUE (#4a9eff) ===== */
            #flexframe-viewer-container [style*="background-color: #4a9eff"],
            #flexframe-viewer-container [style*="background-color: rgb(74, 158, 255)"],
            #flexframe-viewer-container [style*="background:#4a9eff"],
            .thumbnail-dropdown [style*="background-color: #4a9eff"],
            .thumbnail-dropdown [style*="background:#4a9eff"] {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container [style*="color: #4a9eff"],
            #flexframe-viewer-container [style*="color: rgb(74, 158, 255)"],
            #flexframe-viewer-container [style*="color:#4a9eff"],
            .thumbnail-dropdown [style*="color: #4a9eff"],
            .thumbnail-dropdown [style*="color:#4a9eff"] {
                color: ' . $menu_accent_color . ' !important;
            }
        ';
        
        wp_add_inline_style('flexframe-viewer-style', $ui_css);
        
        // Register JavaScript bundle (must register before localizing)
        wp_register_script(
            'flexframe-viewer-script',
            FLEXFRAME_PLUGIN_URL . 'viewer/assets/index-C1y8x1_3.js',
            array(),
            FLEXFRAME_VERSION,
            true
        );
        
        // Pass WordPress settings to JavaScript (must be after register, before enqueue)
        $primary_color_mode = get_option('flexframe_primary_color_mode', 'default');
        $primary_color = get_option('flexframe_primary_color', '#ff0000');
        $logo_url = get_option('flexframe_logo_url', '');
        $logo_threshold = get_option('flexframe_logo_threshold', 0.95);
        $material_mode = get_option('flexframe_material_mode', 'preset');
        $material_preset = get_option('flexframe_material_preset', 'preset1');
        
        // Custom SKIN settings
        $skin_settings = array(
            'color' => get_option('flexframe_skin_color', '#ccdef5'),
            'opacity' => floatval(get_option('flexframe_skin_opacity', 1)),
            'roughness' => floatval(get_option('flexframe_skin_roughness', 0)),
            'metalness' => floatval(get_option('flexframe_skin_metalness', 0)),
            'transmission' => floatval(get_option('flexframe_skin_transmission', 1)),
            'thickness' => floatval(get_option('flexframe_skin_thickness', 0)),
            'ior' => floatval(get_option('flexframe_skin_ior', 1)),
            'envMapIntensity' => floatval(get_option('flexframe_skin_env_intensity', 2.29))
        );
        
        // Get hidden exercises
        $hidden_exercises_json = get_option('flexframe_hidden_exercises', '[]');
        $hidden_exercises = json_decode($hidden_exercises_json, true);
        if (!is_array($hidden_exercises)) {
            $hidden_exercises = array();
        }
        
        // Get UI settings
        $ui_settings = array(
            'spinnerColor' => get_option('flexframe_spinner_color', '#4a9eff'),
            'player' => array(
                'bgColor' => get_option('flexframe_player_bg_color', '#000000'),
                'bgOpacity' => floatval(get_option('flexframe_player_bg_opacity', 0.8)),
                'buttonColor' => get_option('flexframe_player_button_color', '#ffffff'),
                'accentColor' => get_option('flexframe_player_accent_color', '#00bcd4'),
                'alwaysVisible' => get_option('flexframe_player_always_visible', 'no') === 'yes'
            ),
            'menu' => array(
                'bgColor' => get_option('flexframe_menu_bg_color', '#000000'),
                'bgOpacity' => floatval(get_option('flexframe_menu_bg_opacity', 0.9)),
                'textColor' => get_option('flexframe_menu_text_color', '#ffffff'),
                'accentColor' => get_option('flexframe_menu_accent_color', '#4a9eff')
            )
        );
        
        $settings_data = array(
            'primaryColorMode' => $primary_color_mode,
            'primaryColor' => $primary_color,
            'logoUrl' => $logo_url,
            'logoThreshold' => $logo_threshold,
            'materialMode' => $material_mode,
            'materialPreset' => $material_preset,
            'skinSettings' => $skin_settings,
            'hiddenExercises' => $hidden_exercises,
            'uiSettings' => $ui_settings,
            'pluginUrl' => FLEXFRAME_PLUGIN_URL,
            'debug' => FLEXFRAME_DEBUG,
            'version' => FLEXFRAME_VERSION
        );
        
        flexframe_log('Passing settings to JavaScript', $settings_data);
        
        wp_localize_script('flexframe-viewer-script', 'flexframeSettings', $settings_data);
        
        // Add inline debug script
        if (FLEXFRAME_DEBUG) {
            $debug_js = "
                console.log('%c[FlexFrame Debug] Plugin v" . FLEXFRAME_VERSION . " loaded', 'color: #4a9eff; font-weight: bold;');
                console.log('[FlexFrame Debug] Settings:', window.flexframeSettings);
                document.addEventListener('DOMContentLoaded', function() {
                    console.log('[FlexFrame Debug] DOM Ready - checking elements...');
                    var container = document.getElementById('flexframe-viewer-container');
                    var menuContainer = document.querySelector('.thumbnail-grid-container');
                    var dropdowns = document.querySelectorAll('.thumbnail-dropdown');
                    console.log('[FlexFrame Debug] Container:', container);
                    console.log('[FlexFrame Debug] Menu Container:', menuContainer);
                    console.log('[FlexFrame Debug] Dropdowns found:', dropdowns.length);
                });
            ";
            wp_add_inline_script('flexframe-viewer-script', $debug_js, 'before');
        }
        
        // Now enqueue the script
        wp_enqueue_script('flexframe-viewer-script');
    }
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_assets');

/**
 * Register shortcode [flexframe_viewer]
 */
function flexframe_viewer_shortcode($atts) {
    // Prevent duplicate rendering using global flag (more reliable than static)
    global $flexframe_rendered;
    if (isset($flexframe_rendered) && $flexframe_rendered === true) {
        flexframe_log('WARNING: Shortcode already rendered, skipping duplicate');
        return '<!-- FlexFrame: Duplicate shortcode prevented -->';
    }
    $flexframe_rendered = true;
    
    flexframe_log('Shortcode render started (first and only render)', $atts);
    
    // Auto-detect and save the viewer page URL (the page where shortcode is embedded)
    $current_url = home_url(add_query_arg(array(), $GLOBALS['wp']->request));
    // Clean URL - remove any query params, just get the base page URL
    $current_url = strtok($current_url, '?');
    // Ensure trailing slash for consistency
    $current_url = trailingslashit($current_url);
    
    $saved_url = get_option('flexframe_viewer_page_url', '');
    if (empty($saved_url) || $saved_url !== $current_url) {
        update_option('flexframe_viewer_page_url', $current_url);
        flexframe_log('Auto-saved viewer page URL', $current_url);
    }
    
    // Parse shortcode attributes
    $atts = shortcode_atts(array(
        'height' => '100vh',
        'width' => '100%'
    ), $atts);
    
    flexframe_log('Shortcode attributes parsed', $atts);
    
    ob_start();
    // Get logo loader settings for shortcode
    $use_logo_loader = get_option('flexframe_use_logo_loader', false);
    $logo_loader_animation = esc_attr(get_option('flexframe_logo_loader_animation', 'pulse'));
    $logo_loader_size = absint(get_option('flexframe_logo_loader_size', 80));
    $logo_url = get_option('flexframe_logo_url', '');
    
    ?>
    <div id="flexframe-viewer-container" style="width: <?php echo esc_attr($atts['width']); ?>; height: <?php echo esc_attr($atts['height']); ?>; position: relative;">
        <!-- Model Loader -->
        <div id="model-loader" class="model-loader" style="display: none;">
            <?php if ($use_logo_loader && !empty($logo_url)) : ?>
                <!-- Logo Loader -->
                <div class="logo-loader-container" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: <?php echo esc_attr($logo_loader_size); ?>px;">
                    <img src="<?php echo esc_url($logo_url); ?>" alt="Loading" class="logo-loader-img <?php echo esc_attr($logo_loader_animation); ?>" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: auto;" />
                </div>
            <?php else : ?>
                <!-- Default Spinner -->
                <div class="spinner-box" data-spinner="cool">
                    <div class="loader-spinner"></div>
                </div>
            <?php endif; ?>
            <div class="loader-text">Loading Model...</div>
        </div>
        
        <!-- Left Side Menu System -->
        <div class="thumbnail-grid-container">
            <div class="menu-hint-tab"></div>
            
            <!-- Exercises Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="exercisesToggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                    <span>Exercises</span>
                </button>
                <div class="thumbnail-dropdown" id="exercisesDropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="exercisesScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="exercisesScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="exercisesContainer">
                        <div class="thumbnail-grid" id="exercisesGrid"></div>
                    </div>
                </div>
            </div>
            
            <!-- Muscles Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="musclesToggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                    <span>Muscles</span>
                </button>
                <div class="thumbnail-dropdown" id="musclesDropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="musclesScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="musclesScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="musclesContainer">
                        <div class="thumbnail-grid" id="musclesGrid"></div>
                    </div>
                </div>
            </div>
            
            <!-- Equipment Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="equipmentToggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                    <span>Equipment</span>
                </button>
                <div class="thumbnail-dropdown" id="equipmentDropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="equipmentScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="equipmentScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="equipmentContainer">
                        <div class="thumbnail-grid" id="equipmentGrid"></div>
                    </div>
                </div>
            </div>
            
            <!-- Search Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="searchToggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <span>Search</span>
                </button>
                <div class="thumbnail-dropdown" id="searchDropdown">
                    <div class="search-header">
                        <div class="search-input-wrapper">
                            <input type="text" id="searchInput" class="search-input" placeholder="Search exercises...">
                            <button class="search-action-btn" id="searchActionBtn">
                                <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                                <svg class="clear-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                            </button>
                            <div class="search-suggestions" id="searchSuggestions" style="display: none;"></div>
                        </div>
                    </div>
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="searchScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="searchScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="searchContainer">
                        <div class="thumbnail-grid" id="searchGrid"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Right Side Menu System -->
        <div class="thumbnail-grid-container-right">
            <div class="menu-hint-tab-right"></div>
            
            <!-- Info1 Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="info1Toggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <span>How To Guide</span>
                </button>
                <div class="thumbnail-dropdown-right" id="info1Dropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="info1ScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="info1ScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="info1Container">
                        <div class="thumbnail-grid" id="info1Grid"></div>
                    </div>
                </div>
            </div>
            
            <!-- Info2 Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="info2Toggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <span>Exercise Information</span>
                </button>
                <div class="thumbnail-dropdown-right" id="info2Dropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="info2ScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="info2ScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="info2Container">
                        <div class="thumbnail-grid" id="info2Grid"></div>
                    </div>
                </div>
            </div>
            
            <!-- Info3 Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="info3Toggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <span>Exercise Tips</span>
                </button>
                <div class="thumbnail-dropdown-right" id="info3Dropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="info3ScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="info3ScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="info3Container">
                        <div class="thumbnail-grid" id="info3Grid"></div>
                    </div>
                </div>
            </div>
            
            <!-- Info4 Menu -->
            <div class="thumbnail-menu-wrapper">
                <button class="thumbnail-menu-toggle" id="info4Toggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <span>Alternative Exercises</span>
                </button>
                <div class="thumbnail-dropdown-right" id="info4Dropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="info4ScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="info4ScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="info4Container">
                        <div class="thumbnail-grid" id="info4Grid"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Canvas element -->
        <canvas class="webgl"></canvas>
        
        <!-- Model Quality Toggle Button (Standalone) -->
        <button id="quality-toggle-btn" class="standalone-quality-btn" title="Switch Model Quality" style="display: none;">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span id="quality-text">SQ</span>
        </button>
        
        <!-- Animation Player -->
        <div id="animation-player" class="animation-player" style="display: none;">
            <div class="player-controls">
                <button id="play-pause-btn" class="control-btn play-btn" title="Play/Pause">
                    <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </button>
                <div class="time-display"><span id="current-time">0:00</span></div>
                <div class="timeline-container">
                    <input type="range" id="timeline-slider" class="timeline-slider" min="0" max="100" value="0">
                    <div class="timeline-progress"></div>
                </div>
                <div class="time-display"><span id="total-time">0:00</span></div>
                <div class="speed-controls">
                    <button id="speed-btn" class="control-btn speed-btn" title="Playback Speed"><span id="speed-text">1x</span></button>
                    <div id="speed-menu" class="speed-menu">
                        <button class="speed-option" data-speed="0.25">0.25x</button>
                        <button class="speed-option" data-speed="0.5">0.5x</button>
                        <button class="speed-option active" data-speed="1">1x</button>
                        <button class="speed-option" data-speed="1.5">1.5x</button>
                        <button class="speed-option" data-speed="2">2x</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('flexframe_viewer', 'flexframe_viewer_shortcode');

/**
 * Add settings link to plugins page
 */
function flexframe_add_settings_link($links) {
    $settings_link = '<a href="admin.php?page=flexframe-settings">' . __('Settings', 'flexframe-viewer') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'flexframe_add_settings_link');

/**
 * Plugin activation
 */
function flexframe_activate() {
    // Set default options
    add_option('flexframe_logo_url', '');
    add_option('flexframe_logo_threshold', 0.95);
    
    // Logo loader options
    add_option('flexframe_use_logo_loader', false);
    add_option('flexframe_logo_loader_animation', 'pulse');
    add_option('flexframe_logo_loader_size', 80);
}
register_activation_hook(__FILE__, 'flexframe_activate');

/**
 * Plugin deactivation
 */
function flexframe_deactivate() {
    // Cleanup if needed
}
register_deactivation_hook(__FILE__, 'flexframe_deactivate');
