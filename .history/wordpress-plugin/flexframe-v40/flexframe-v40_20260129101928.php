<?php
/**
 * Plugin Name: FlexFrame v40
 * Plugin URI: https://flexframe.com
 * Description: 3D interactive exercise viewer with customizable logo and materials
 * Version: 1.40.130
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

// Enable debugging for FlexFrame plugin (set to false for production)
define('FLEXFRAME_DEBUG', false);

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
define('FLEXFRAME_VERSION', '1.40.129');
define('FLEXFRAME_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLEXFRAME_PLUGIN_URL', plugin_dir_url(__FILE__));

// Log plugin initialization
flexframe_log('Plugin loaded', array('version' => '1.40.0', 'plugin_url' => plugin_dir_url(__FILE__)));

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
        
        // Enqueue Vite-generated CSS
        wp_enqueue_style(
            'flexframe-viewer-style',
            FLEXFRAME_PLUGIN_URL . 'assets/assets/index-DR8RDQL0.css',
            array(),
            FLEXFRAME_VERSION
        );
        
        // Check if this is a dedicated FlexFrame viewer page (hide all WP elements)
        $is_viewer_page = get_post_meta($post->ID, '_flexframe_viewer_page', true);
        
        // Get theme color settings early for use in isolation CSS
        $menu_bg_color = esc_attr(get_option('flexframe_menu_bg_color', '#000000'));
        $menu_accent_color = esc_attr(get_option('flexframe_menu_accent_color', '#f50000'));
        $menu_bg_rgb = sscanf($menu_bg_color, "#%02x%02x%02x");
        
        // Add inline CSS for WordPress theme isolation
        $isolation_css = '
            /* CRITICAL: Prevent horizontal/vertical overflow on mobile */
            html, body {
                overflow: hidden !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
                max-width: 100% !important;
                max-height: 100% !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
            }
            
            /* WebGL canvas must fit exactly */
            canvas.webgl {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                display: block !important;
                border-radius: 0 !important;
            }
            
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
                left: -280px !important; /* Start hidden off-screen */
                z-index: 9999 !important;
                pointer-events: auto !important;
                transition: left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            /* Only show menu when menu-visible class is added via button click */
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
                padding: 10px 45px 10px 10px !important;
                background: rgba(30, 30, 30, 0.95) !important;
                border: 2px solid var(--flexframe-primary-color) !important;
                border-radius: 10px !important;
                color: #fff !important;
                font-size: 14px !important;
                font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif !important;
                outline: none !important;
                box-sizing: border-box !important;
                height: auto !important;
                line-height: 1.4 !important;
                margin: 10px 2px 2px 2px !important;
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
            #flexframe-viewer-container #searchDropdown .search-header,
            .thumbnail-dropdown .search-header,
            div#searchDropdown .search-header {
                padding: 12px 15px !important;
                background: rgb(20, 20, 20) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                margin: -15px -15px 10px !important;
                border-radius: 12px 12px 0 0 !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 1 !important;
            }
            /* Search input wrapper */
            #flexframe-viewer-container .search-input-wrapper,
            .thumbnail-dropdown .search-input-wrapper {
                position: relative !important;
                display: flex !important;
                align-items: center !important;
                overflow: hidden !important;
            }
            /* Search action button */
            #flexframe-viewer-container .search-action-btn,
            .thumbnail-dropdown .search-action-btn {
                position: absolute !important;
                right: 8px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                background: transparent !important;
                border: none !important;
                border-radius: 50% !important;
                width: 32px !important;
                height: 32px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                color: var(--flexframe-primary-color) !important;
                padding: 0 !important;
                margin: 3px 0px 0px 0px !important;
                transition: all 0.2s ease !important;
            }
            #flexframe-viewer-container .search-action-btn:hover {
                background: rgba(255, 255, 255, 0.1) !important;
                opacity: 1 !important;
                transform: translateY(-50%) scale(1.1) !important;
                color: var(--flexframe-primary-color) !important;
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
                position: fixed !important;
                z-index: 10001 !important;
            }
            
            /* Right side menu system */
            #flexframe-viewer-container .thumbnail-grid-container-right {
                position: fixed !important;
                right: -280px !important; /* Start hidden off-screen */
                z-index: 9999 !important;
                pointer-events: auto !important;
                transition: right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            /* Only show menu when menu-visible class is added via button click */
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
            
            /* Enable hover to show menus on desktop */
            #flexframe-viewer-container .thumbnail-grid-container:hover {
                left: 20px !important;
            }
            #flexframe-viewer-container .thumbnail-grid-container-right:hover {
                right: 20px !important;
            }
            
            /* ===== SCREENS ABOVE SMALL MOBILE (above 480px) - SEARCH ONLY ===== */
            @media screen and (min-width: 481px) {
                /* Left side menu container - keep visible but simplified */
                #flexframe-viewer-container .thumbnail-grid-container,
                .thumbnail-grid-container {
                    position: fixed !important;
                    left: 10px !important;
                    top: 10px !important;
                    width: auto !important;
                    background: transparent !important;
                    padding: 0 !important;
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    z-index: 99999 !important;
                }
                
                /* Hide hint tabs */
                #flexframe-viewer-container .menu-hint-tab,
                .menu-hint-tab,
                div.menu-hint-tab {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    width: 0 !important;
                    height: 0 !important;
                    pointer-events: none !important;
                    position: absolute !important;
                    left: -9999px !important;
                }
                
                /* Hide all menu wrappers EXCEPT search */
                #flexframe-viewer-container .thumbnail-menu-wrapper:not(:has(#searchToggle)),
                .thumbnail-menu-wrapper:not(:has(#searchToggle)) {
                    display: none !important;
                    visibility: hidden !important;
                    position: absolute !important;
                    left: -9999px !important;
                }
                
                /* Show search menu wrapper */
                #flexframe-viewer-container .thumbnail-menu-wrapper:has(#searchToggle),
                .thumbnail-menu-wrapper:has(#searchToggle) {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                
                /* Style search toggle button */
                #flexframe-viewer-container #searchToggle,
                button.thumbnail-menu-toggle#searchToggle {
                    width: 40px !important;
                    height: 40px !important;
                    padding: 0 !important;
                    font-size: 0 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background-color: rgba(0, 0, 0, 0.5) !important;
                    backdrop-filter: blur(20px) !important;
                    border: 2px solid var(--flexframe-primary-color, #4a9eff) !important;
                    border-radius: 50% !important;
                    color: #ffffff !important;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px var(--flexframe-primary-color, rgba(74, 158, 255, 0.3)) !important;
                    cursor: pointer !important;
                }
                #flexframe-viewer-container #searchToggle:hover {
                    background-color: rgba(0, 0, 0, 0.65) !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px var(--flexframe-primary-color, rgba(74, 158, 255, 0.5)) !important;
                }
                #flexframe-viewer-container #searchToggle span {
                    display: none !important;
                }
                #flexframe-viewer-container #searchToggle svg {
                    width: 20px !important;
                    height: 20px !important;
                }
                
                /* Search dropdown - left aligned, 400px width */
                #flexframe-viewer-container #searchDropdown,
                #searchDropdown.thumbnail-dropdown {
                    position: fixed !important;
                    top: 60px !important;
                    left: 10px !important;
                    right: auto !important;
                    transform: none !important;
                    width: 400px !important;
                    max-width: 400px !important;
                    max-height: 80vh !important;
                    z-index: 999999 !important;
                    background-color: rgba(30, 30, 30, 0.2) !important;
                    backdrop-filter: blur(20px) !important;
                    border-radius: 16px !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    box-shadow: 0 0 20px ' . $menu_accent_color . '66, 0 0 40px ' . $menu_accent_color . '33 !important;
                    display: none !important;
                }
                #flexframe-viewer-container #searchDropdown.show,
                #searchDropdown.thumbnail-dropdown.show {
                    display: block !important;
                }
                
                /* Search content wrapper */
                #flexframe-viewer-container #searchDropdown .search-content-wrapper,
                #searchDropdown .search-content-wrapper {
                    display: flex !important;
                    flex-direction: row !important;
                    height: 450px !important;
                    max-height: 75vh !important;
                }
                
                /* Filters panel */
                #flexframe-viewer-container #searchDropdown .search-filters-panel,
                #searchDropdown .search-filters-panel {
                    display: flex !important;
                    flex-direction: column !important;
                    width: 180px !important;
                    min-width: 180px !important;
                    border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
                    padding: 10px !important;
                    overflow-y: auto !important;
                    background: rgba(0, 0, 0, 0.2) !important;
                }
                
                /* Results panel */
                #flexframe-viewer-container #searchDropdown .search-results-panel,
                #searchDropdown .search-results-panel {
                    flex: 1 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    overflow: hidden !important;
                }
                
                /* Thumbnail scroll container */
                #flexframe-viewer-container #searchDropdown .thumbnail-scroll-container,
                #searchDropdown .thumbnail-scroll-container {
                    flex: 1 !important;
                    overflow-y: auto !important;
                    padding: 5px !important;
                }
                
                /* Thumbnail grid - SINGLE COLUMN centered */
                #flexframe-viewer-container #searchDropdown .thumbnail-grid,
                #searchDropdown .thumbnail-grid,
                #flexframe-viewer-container #searchGrid,
                #searchGrid {
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    gap: 15px !important;
                    width: 100% !important;
                    padding: 0 !important;
                }
                
                /* Thumbnail items - ABSOLUTE FIXED sizing */
                #flexframe-viewer-container #searchDropdown .thumbnail-item,
                #searchDropdown .thumbnail-item,
                #searchGrid .thumbnail-item,
                div.thumbnail-item {
                    width: 160px !important;
                    height: 160px !important;
                    min-width: 160px !important;
                    min-height: 160px !important;
                    max-width: 160px !important;
                    max-height: 160px !important;
                    padding: 1px !important;
                    margin-bottom: 10px !important;
                    box-sizing: border-box !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    border-radius: 8px !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    cursor: pointer !important;
                    flex-shrink: 0 !important;
                    flex-grow: 0 !important;
                    overflow: hidden !important;
                }
                #flexframe-viewer-container #searchDropdown .thumbnail-item:hover,
                #searchDropdown .thumbnail-item:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                }
                
                /* Thumbnail images - ABSOLUTE FIXED SQUARE 160x160 */
                #flexframe-viewer-container #searchDropdown .thumbnail-item img,
                #searchDropdown .thumbnail-item img,
                #searchGrid .thumbnail-item img,
                div.thumbnail-item img {
                    width: 160px !important;
                    height: 160px !important;
                    min-width: 160px !important;
                    min-height: 160px !important;
                    max-width: 160px !important;
                    max-height: 160px !important;
                    object-fit: cover !important;
                    border-radius: 6px !important;
                    margin-bottom: 0 !important;
                    flex-shrink: 0 !important;
                }
                
                /* Thumbnail labels */
                #flexframe-viewer-container #searchDropdown .thumbnail-label,
                #searchDropdown .thumbnail-label {
                    font-size: 12px !important;
                    text-align: center !important;
                    line-height: 1.3 !important;
                    color: white !important;
                }
                
                /* Close button */
                #flexframe-viewer-container .search-close-btn-mobile,
                #searchCloseBtnMobile {
                    display: none !important;
                }
                #flexframe-viewer-container .search-close-btn-mobile.show,
                #searchCloseBtnMobile.show {
                    display: flex !important;
                    position: fixed !important;
                    top: 70px !important;
                    left: 370px !important;
                    width: 32px !important;
                    height: 32px !important;
                    z-index: 9999999 !important;
                    background-color: rgba(255, 255, 255, 0.15) !important;
                    border: none !important;
                    border-radius: 50% !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    color: white !important;
                }
                
                /* Right side menu container - show info button */
                #flexframe-viewer-container .thumbnail-grid-container-right,
                .thumbnail-grid-container-right {
                    position: fixed !important;
                    right: 10px !important;
                    top: 10px !important;
                    width: auto !important;
                    background: transparent !important;
                    padding: 0 !important;
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    z-index: 99999 !important;
                }
                
                /* Hide right hint tab */
                #flexframe-viewer-container .menu-hint-tab-right,
                .menu-hint-tab-right {
                    display: none !important;
                    visibility: hidden !important;
                }
                
                /* Hide all right menu wrappers EXCEPT info */
                #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-wrapper:not(:has(#infoToggle)),
                .thumbnail-grid-container-right .thumbnail-menu-wrapper:not(:has(#infoToggle)),
                #flexframe-viewer-container .thumbnail-grid-container-right .desktop-only,
                .thumbnail-grid-container-right .desktop-only {
                    display: none !important;
                    visibility: hidden !important;
                    position: absolute !important;
                    left: -9999px !important;
                }
                
                /* Show info menu wrapper - override global mobile-only hide rule */
                #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-wrapper:has(#infoToggle),
                .thumbnail-grid-container-right .thumbnail-menu-wrapper:has(#infoToggle),
                #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-wrapper.mobile-only,
                .thumbnail-grid-container-right .thumbnail-menu-wrapper.mobile-only,
                #flexframe-viewer-container .thumbnail-grid-container-right div.thumbnail-menu-wrapper.mobile-only,
                .thumbnail-grid-container-right div.thumbnail-menu-wrapper.mobile-only {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    position: relative !important;
                    left: auto !important;
                    width: auto !important;
                    height: auto !important;
                    pointer-events: auto !important;
                }
                
                /* Style info toggle button for tablet/desktop */
                #flexframe-viewer-container #infoToggle,
                button.thumbnail-menu-toggle#infoToggle {
                    width: 40px !important;
                    height: 40px !important;
                    padding: 0 !important;
                    font-size: 0 !important;
                    display: block !important;
                    position: relative !important;
                    background-color: rgba(0, 0, 0, 0.5) !important;
                    backdrop-filter: blur(20px) !important;
                    border: 2px solid ' . $menu_accent_color . ' !important;
                    border-radius: 50% !important;
                    color: #ffffff !important;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px var(--flexframe-primary-color, rgba(74, 158, 255, 0.3)) !important;
                    cursor: pointer !important;
                    overflow: hidden !important;
                }
                #flexframe-viewer-container #infoToggle:hover,
                button.thumbnail-menu-toggle#infoToggle:hover {
                    background-color: rgba(0, 0, 0, 0.65) !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px var(--flexframe-primary-color, rgba(74, 158, 255, 0.5)) !important;
                }
                #flexframe-viewer-container #infoToggle span {
                    display: none !important;
                    visibility: hidden !important;
                    position: absolute !important;
                    width: 0 !important;
                    height: 0 !important;
                    overflow: hidden !important;
                }
                #flexframe-viewer-container #infoToggle svg,
                button.thumbnail-menu-toggle#infoToggle svg {
                    width: 20px !important;
                    height: 20px !important;
                    fill: #ffffff !important;
                    display: block !important;
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                }
                #flexframe-viewer-container #infoToggle svg path,
                button.thumbnail-menu-toggle#infoToggle svg path {
                    fill: #ffffff !important;
                }
                
                /* Info dropdown styling for tablet/desktop */
                #flexframe-viewer-container #infoDropdown,
                #infoDropdown.thumbnail-dropdown-right {
                    position: fixed !important;
                    top: 60px !important;
                    right: 10px !important;
                    left: auto !important;
                    transform: none !important;
                    width: 350px !important;
                    max-width: 350px !important;
                    max-height: 70vh !important;
                    z-index: 999999 !important;
                    background-color: rgba(30, 30, 30, 0.2) !important;
                    backdrop-filter: blur(20px) !important;
                    border-radius: 16px !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    box-shadow: 0 0 20px ' . $menu_accent_color . '66, 0 0 40px ' . $menu_accent_color . '33 !important;
                    display: none !important;
                }
                #flexframe-viewer-container #infoDropdown.show,
                #infoDropdown.thumbnail-dropdown-right.show {
                    display: block !important;
                }
                
                /* Info step items for tablet/desktop - right margin and no shadow */
                #flexframe-viewer-container .info-step-item,
                .thumbnail-dropdown-right .info-step-item,
                #infoDropdown .info-step-item,
                .info-step-item {
                    margin-right: 7px !important;
                    box-shadow: none !important;
                }
                
                /* Info grid right margin for tablet/desktop */
                #flexframe-viewer-container #infoGrid,
                #infoDropdown #infoGrid,
                #infoGrid.thumbnail-grid {
                    margin-right: 7px !important;
                }
                
                /* Info sticky header for tablet/desktop - border only, no background */
                #flexframe-viewer-container .info-sticky-header,
                .thumbnail-dropdown-right .info-sticky-header,
                #infoDropdown .info-sticky-header,
                .info-sticky-header {
                    background: transparent !important;
                    background-color: transparent !important;
                    border: 2px solid var(--flexframe-primary-color, ' . $menu_accent_color . ') !important;
                    border-radius: 8px !important;
                }
            }
            
            /* ===== SEARCH FILTERS PANEL ===== */
            .search-content-wrapper {
                display: flex;
                flex-direction: row;
                gap: 0;
                width: 100%;
                height: 400px;
                max-height: 70vh;
                overflow: hidden;
            }
            
            /* Hide filters on desktop/tablet - show only on mobile */
            .search-filters-panel {
                display: none;
            }
            
            .search-results-panel {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .filter-section {
                margin-bottom: 15px;
            }
            
            .filter-section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .filter-title {
                font-size: 11px;
                font-weight: bold;
                color: ' . $menu_accent_color . ';
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .filter-clear-btn {
                font-size: 9px;
                color: ' . $menu_accent_color . ' !important;
                background: transparent !important;
                border: 1px solid ' . $menu_accent_color . '66 !important;
                padding: 2px 6px !important;
                border-radius: 3px !important;
                cursor: pointer !important;
                transition: all 0.2s !important;
            }
            
            .filter-clear-btn:hover,
            .filter-clear-btn:active,
            .filter-clear-btn:focus {
                background: ' . $menu_accent_color . '33 !important;
                border-color: ' . $menu_accent_color . ' !important;
                color: ' . $menu_accent_color . ' !important;
                outline: none !important;
            }
            
            #flexframe-viewer-container .filter-clear-btn,
            #flexframe-viewer-container .filter-clear-btn:hover,
            #flexframe-viewer-container .filter-clear-btn:active,
            #flexframe-viewer-container .filter-clear-btn:focus {
                color: ' . $menu_accent_color . ' !important;
                background: transparent !important;
                border-color: ' . $menu_accent_color . '66 !important;
            }
            
            #flexframe-viewer-container .filter-clear-btn:hover {
                background: ' . $menu_accent_color . '33 !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            
            .filter-options {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            
            .filter-checkbox-label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 10px;
                cursor: pointer;
                padding: 6px 8px;
                border-radius: 4px;
                border: 1px solid transparent !important;
                transition: all 0.2s;
            }
            
            .filter-checkbox-label:hover {
                background-color: ' . $menu_accent_color . '22 !important;
                border: 1px solid ' . $menu_accent_color . '44 !important;
            }
            
            label.filter-checkbox-label.selected {
                background-color: ' . $menu_accent_color . '22 !important;
                border: 2px solid ' . $menu_accent_color . ' !important;
                border-style: solid !important;
                border-width: 2px !important;
                border-color: ' . $menu_accent_color . ' !important;
                box-shadow: 0 0 8px ' . $menu_accent_color . '66 !important;
            }
            
            .filter-checkbox {
                display: none !important;
            }
            
            .filter-checkbox-label span {
                flex: 1;
                user-select: none;
            }
            
            /* Hide scrollbar for filter panel */
            .search-filters-panel::-webkit-scrollbar {
                display: none;
            }
            
            .search-filters-panel {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            
            /* ==========================================
               MOBILE RESPONSIVE STYLES
               ========================================== */
            @media screen and (max-width: 480px) {
                /* Show search filters only on mobile */
                .search-filters-panel {
                    display: block !important;
                    width: 45%;
                    max-width: 200px;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 10px;
                    border-right: 1px solid ' . $menu_accent_color . '33;
                    direction: rtl;
                }
                
                .search-filters-panel > * {
                    direction: ltr;
                }
                
                .search-results-panel {
                    flex: 1;
                    padding: 0 5px;
                }
                
                .search-results-panel .thumbnail-grid {
                    padding: 0 !important;
                }
                
                /* Force filter label selected state on mobile */
                .filter-checkbox-label.selected,
                label.filter-checkbox-label.selected,
                .search-filters-panel .filter-checkbox-label.selected,
                #searchFiltersPanel .filter-checkbox-label.selected,
                #flexframe-viewer-container .filter-checkbox-label.selected {
                    background-color: ' . $menu_accent_color . '22 !important;
                    border: 2px solid ' . $menu_accent_color . ' !important;
                    box-shadow: 0 0 12px ' . $menu_accent_color . 'cc, 0 0 6px ' . $menu_accent_color . '88, inset 0 0 8px ' . $menu_accent_color . '33 !important;
                }
            }
            
            @media screen and (max-width: 768px) {
                /* Reposition thumbnail-grid-container to top left for search only */
                #flexframe-viewer-container .thumbnail-grid-container,
                .thumbnail-grid-container {
                    position: fixed !important;
                    left: 8px !important;
                    top: 8px !important;
                    width: auto !important;
                    gap: 0 !important;
                    display: flex !important;
                    flex-direction: row !important;
                }
                /* Hide all menu wrappers except search on mobile */
                .thumbnail-grid-container .thumbnail-menu-wrapper {
                    display: none !important;
                }
                .thumbnail-grid-container .thumbnail-menu-wrapper:has(#searchToggle) {
                    display: block !important;
                }
                /* Right side menu container - simplified for mobile */
                #flexframe-viewer-container .thumbnail-grid-container-right {
                    width: auto !important;
                    right: 8px !important;
                    top: 8px !important;
                    gap: 0 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    background: transparent !important;
                }
                #flexframe-viewer-container .thumbnail-grid-container-right:hover,
                #flexframe-viewer-container .thumbnail-grid-container-right.menu-visible,
                #flexframe-viewer-container .thumbnail-grid-container-right.menu-active {
                    right: 8px !important;
                    transform: none !important;
                }
                /* Hide hint tabs on mobile */
                .menu-hint-tab,
                .menu-hint-tab-right {
                    display: none !important;
                }
                /* Position and style Search button for mobile */
                #flexframe-viewer-container #searchToggle,
                #flexframe-viewer-container button#searchToggle,
                .thumbnail-grid-container #searchToggle,
                button.thumbnail-menu-toggle#searchToggle {
                    width: 32px !important;
                    height: 32px !important;
                    min-height: 32px !important;
                    max-height: 32px !important;
                    padding: 0 !important;
                    font-size: 0 !important;
                    font-weight: 700 !important;
                    line-height: 1 !important;
                    box-sizing: border-box !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 0 !important;
                    background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.25) !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    border: 1px solid ' . $menu_accent_color . ' !important;
                    border-radius: 50% !important;
                    color: #ffffff !important;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
                    box-shadow: 0 2px 10px var(--flexframe-primary-color, rgba(0, 0, 0, 0.3)), 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
                    transition: all 0.2s ease !important;
                }
                #flexframe-viewer-container #searchToggle:hover,
                #flexframe-viewer-container button#searchToggle:hover,
                .thumbnail-grid-container #searchToggle:hover,
                #flexframe-viewer-container #searchToggle:active,
                #flexframe-viewer-container button#searchToggle:active,
                .thumbnail-grid-container #searchToggle:active {
                    background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.35) !important;
                    border-color: rgba(255, 255, 255, 0.35) !important;
                    box-shadow: 0 4px 16px var(--flexframe-primary-color, rgba(0, 0, 0, 0.4)), 0 0 0 1px rgba(255, 255, 255, 0.15) inset !important;
                    transform: translateY(-1px) !important;
                }
                #flexframe-viewer-container #searchToggle span {
                    display: none !important;
                }
                #flexframe-viewer-container #searchToggle svg,
                button.thumbnail-menu-toggle#searchToggle svg {
                    width: 18px !important;
                    height: 18px !important;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4)) !important;
                }
                /* Position right menu container with single info button */
                .thumbnail-grid-container-right.mobile-only,
                #flexframe-viewer-container .thumbnail-grid-container-right.mobile-only {
                    position: fixed !important;
                    right: 8px !important;
                    top: 8px !important;
                    width: auto !important;
                    z-index: 99999 !important;
                }
                /* Position and style Info button for mobile (right side) */
                #flexframe-viewer-container #infoToggle,
                #flexframe-viewer-container button#infoToggle,
                .thumbnail-grid-container-right #infoToggle,
                button.thumbnail-menu-toggle#infoToggle {
                    width: 32px !important;
                    height: 32px !important;
                    min-height: 32px !important;
                    max-height: 32px !important;
                    padding: 0 !important;
                    font-size: 0 !important;
                    font-weight: 700 !important;
                    line-height: 1 !important;
                    box-sizing: border-box !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 0 !important;
                    background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.25) !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    border: 1px solid ' . $menu_accent_color . ' !important;
                    border-radius: 50% !important;
                    color: #ffffff !important;
                    fill: #ffffff !important;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
                    box-shadow: 0 2px 10px var(--flexframe-primary-color, rgba(0, 0, 0, 0.3)), 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
                    transition: all 0.2s ease !important;
                    z-index: 99999 !important;
                    position: relative !important;
                }
                #flexframe-viewer-container #infoToggle:hover,
                #flexframe-viewer-container button#infoToggle:hover,
                .thumbnail-grid-container-right #infoToggle:hover,
                #flexframe-viewer-container #infoToggle:active,
                #flexframe-viewer-container button#infoToggle:active,
                .thumbnail-grid-container-right #infoToggle:active,
                #flexframe-viewer-container #infoToggle.active,
                #flexframe-viewer-container button#infoToggle.active,
                .thumbnail-grid-container-right #infoToggle.active {
                    background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.35) !important;
                    border: 1px solid ' . $menu_accent_color . ' !important;
                    box-shadow: 0 4px 16px var(--flexframe-primary-color, rgba(0, 0, 0, 0.4)), 0 0 0 1px rgba(255, 255, 255, 0.15) inset !important;
                    transform: translateY(-1px) !important;
                    color: #ffffff !important;
                    fill: #ffffff !important;
                }
                #flexframe-viewer-container #infoToggle span,
                #flexframe-viewer-container #infoToggle.active span {
                    display: none !important;
                }
                #flexframe-viewer-container #infoToggle svg,
                button.thumbnail-menu-toggle#infoToggle svg,
                #flexframe-viewer-container #infoToggle:hover svg,
                #flexframe-viewer-container #infoToggle:active svg,
                #flexframe-viewer-container #infoToggle.active svg,
                #flexframe-viewer-container button#infoToggle.active svg,
                .thumbnail-grid-container-right #infoToggle.active svg {
                    width: 18px !important;
                    height: 18px !important;
                    fill: #ffffff !important;
                    color: #ffffff !important;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4)) !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                #flexframe-viewer-container #infoToggle svg path,
                button.thumbnail-menu-toggle#infoToggle svg path,
                #flexframe-viewer-container #infoToggle:hover svg path,
                #flexframe-viewer-container #infoToggle:active svg path,
                #flexframe-viewer-container #infoToggle.active svg path,
                #flexframe-viewer-container button#infoToggle.active svg path,
                .thumbnail-grid-container-right #infoToggle.active svg path {
                    fill: #ffffff !important;
                    color: #ffffff !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    display: block !important;
                }
                /* Hide desktop right menus on mobile, show mobile consolidated menu */
                #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-wrapper.desktop-only,
                .thumbnail-grid-container-right .thumbnail-menu-wrapper.desktop-only,
                #flexframe-viewer-container .thumbnail-grid-container-right .desktop-only,
                .thumbnail-grid-container-right .desktop-only {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-wrapper.mobile-only,
                .thumbnail-grid-container-right .thumbnail-menu-wrapper.mobile-only,
                #flexframe-viewer-container .thumbnail-grid-container-right .mobile-only,
                .thumbnail-grid-container-right .mobile-only {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                }
                /* Smaller menu buttons */
                .thumbnail-menu-toggle {
                    height: 38px !important;
                    padding: 4px !important;
                    font-size: 8px !important;
                }
                .thumbnail-menu-toggle svg {
                    width: 12px !important;
                    height: 12px !important;
                }
                /* Mobile dropdowns - closer to menu with always-on blur effect */
                #flexframe-viewer-container .thumbnail-dropdown,
                #flexframe-viewer-container .thumbnail-dropdown-right,
                .thumbnail-dropdown,
                .thumbnail-dropdown-right {
                    width: 160px !important;
                    max-width: 160px !important;
                    margin-top: 4px !important;
                    top: auto !important;
                    max-height: 75vh !important;
                    padding: 8px !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                .thumbnail-dropdown {
                    left: 8px !important;
                    right: auto !important;
                }
                .thumbnail-dropdown-right {
                    left: auto !important;
                    right: 8px !important;
                }
                /* Smaller fonts in dropdowns on mobile */
                .thumbnail-item {
                    font-size: 10px !important;
                    margin-left: 5px !important;
                }
                .thumbnail-label {
                    font-size: 9px !important;
                    line-height: 1.1 !important;
                }
                .search-header,
                .search-input,
                .filter-status-box {
                    font-size: 11px !important;
                }
                .thumbnail-scroll-controls {
                    font-size: 10px !important;
                }
                /* Smaller background logo on mobile */
                .flexframe-bg-watermark {
                    width: 120px !important;
                    max-width: 40vw !important;
                }
                /* Animation player always visible */
                .animation-player {
                    transform: translateY(0) !important;
                    opacity: 1 !important;
                    pointer-events: all !important;
                    padding: 6px 10px !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                }
                .player-controls {
                    gap: 4px !important;
                    width: 100% !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                }
                .player-left {
                    order: 1 !important;
                    flex: 0 0 auto !important;
                    min-width: auto !important;
                    gap: 3px !important;
                }
                .player-center {
                    order: 2 !important;
                    flex: 1 !important;
                    margin: 0 8px !important;
                }
                .player-right {
                    order: 3 !important;
                    flex: 0 0 auto !important;
                    min-width: auto !important;
                    gap: 3px !important;
                }
                .play-pause-btn,
                .speed-btn,
                .screenshot-btn,
                .ar-btn {
                    padding: 4px 6px !important;
                    font-size: 9px !important;
                    height: 28px !important;
                    min-height: 28px !important;
                }
                .play-pause-btn svg,
                .speed-btn svg,
                .screenshot-btn svg {
                    width: 14px !important;
                    height: 14px !important;
                }
                .time-display {
                    font-size: 9px !important;
                    display: none !important;
                }
                .speed-btn,
                .animation-player .speed-btn,
                button.speed-btn,
                .player-left .speed-btn,
                .animation-player .player-left .speed-btn,
                #flexframe-viewer-container .speed-btn,
                .screenshot-btn,
                .animation-player .screenshot-btn,
                button.screenshot-btn,
                .player-right .speed-btn,
                .player-right .screenshot-btn,
                .animation-player .player-right .speed-btn,
                .animation-player .player-right .screenshot-btn {
                    display: none !important;
                    visibility: hidden !important;
                    width: 0 !important;
                    height: 0 !important;
                    min-width: 0 !important;
                    min-height: 0 !important;
                    max-width: 0 !important;
                    max-height: 0 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    opacity: 0 !important;
                    border: none !important;
                    flex: 0 0 0 !important;
                }
                /* Mobile: Override fixed positioning for dropdowns */
                #flexframe-viewer-container .thumbnail-dropdown.show,
                #flexframe-viewer-container .thumbnail-dropdown-right.show,
                .thumbnail-dropdown.show,
                .thumbnail-dropdown-right.show,
                div.thumbnail-dropdown.show,
                div.thumbnail-dropdown-right.show {
                    position: fixed !important;
                    margin-top: 4px !important;
                }
                #flexframe-viewer-container .thumbnail-dropdown.show,
                .thumbnail-dropdown.show,
                div.thumbnail-dropdown.show {
                    top: 90px !important;
                    left: 10px !important;
                    right: auto !important;
                }
                #flexframe-viewer-container .thumbnail-dropdown-right.show,
                .thumbnail-dropdown-right.show,
                div.thumbnail-dropdown-right.show {
                    top: 90px !important;
                    left: auto !important;
                    right: 10px !important;
                }
                /* Mobile: Permanent hover effect on info-step-items (no hover needed) */
                #flexframe-viewer-container .info-step-item,
                .thumbnail-dropdown-right .info-step-item,
                .info-step-item {
                    background-color: #0516ff22 !important;
                    border-color: #0516ff !important;
                    border: 1px solid #0516ff !important;
                }
                /* Mobile: Reduce font sizes for info menu by 5px */
                #flexframe-viewer-container .info-sticky-header,
                .thumbnail-dropdown-right .info-sticky-header,
                .info-sticky-header {
                    font-size: clamp(4px, 3.43vw, 13px) !important;
                }
                #flexframe-viewer-container .info-step-title,
                .thumbnail-dropdown-right .info-step-title,
                .info-step-item .info-step-title,
                .info-step-title {
                    font-size: clamp(4px, 3.43vw, 13px) !important;
                }
                #flexframe-viewer-container .info-step-text,
                .thumbnail-dropdown-right .info-step-text,
                .info-step-item .info-step-text,
                .info-step-text {
                    font-size: clamp(3px, 2.86vw, 11px) !important;
                }
                /* Mobile search close button */
                #flexframe-viewer-container #searchCloseBtnMobile,
                #flexframe-viewer-container button#searchCloseBtnMobile,
                #searchCloseBtnMobile {
                    position: fixed !important;
                    right: 10px !important;
                    width: 32px !important;
                    height: 32px !important;
                    min-height: 32px !important;
                    max-height: 32px !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                    background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.25) !important;
                    border-radius: 50% !important;
                    color: #ffffff !important;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
                    box-shadow: 0 2px 10px var(--flexframe-primary-color, rgba(0, 0, 0, 0.3)), 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
                    transition: all 0.2s ease !important;
                    cursor: pointer !important;
                    z-index: 99998 !important;
                }
                #flexframe-viewer-container #searchCloseBtnMobile svg,
                #searchCloseBtnMobile svg {
                    width: 18px !important;
                    height: 18px !important;
                    fill: #ffffff !important;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4)) !important;
                }
                #flexframe-viewer-container #searchCloseBtnMobile:hover,
                #flexframe-viewer-container #searchCloseBtnMobile:active,
                #searchCloseBtnMobile:hover,
                #searchCloseBtnMobile:active {
                    background: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . min($menu_bg_opacity + 0.1, 1) . ') !important;
                    background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . min($menu_bg_opacity + 0.1, 1) . ') !important;
                    border-color: rgba(255, 255, 255, 0.35) !important;
                    box-shadow: 0 4px 16px var(--flexframe-primary-color, rgba(0, 0, 0, 0.4)), 0 0 0 1px rgba(255, 255, 255, 0.15) inset !important;
                    transform: translateY(-1px) !important;
                }
            }
            
            @media screen and (max-width: 480px) {
                #flexframe-viewer-container .thumbnail-grid-container {
                    width: 95px !important;
                    left: 10px !important;
                    top: 10px !important;
                    gap: 3px !important;
                }
                #flexframe-viewer-container .thumbnail-grid-container-right {
                    width: auto !important;
                    right: 10px !important;
                    top: 10px !important;
                    gap: 0 !important;
                }
                .thumbnail-menu-toggle {
                    height: 34px !important;
                    padding: 3px !important;
                    font-size: 7px !important;
                }
                .thumbnail-menu-toggle svg {
                    width: 10px !important;
                    height: 10px !important;
                }
                /* Even narrower dropdowns on small screens with blur */
                #flexframe-viewer-container .thumbnail-dropdown,
                #flexframe-viewer-container .thumbnail-dropdown-right,
                .thumbnail-dropdown,
                .thumbnail-dropdown-right {
                    width: 140px !important;
                    max-width: 140px !important;
                    margin-top: 4px !important;
                    top: auto !important;
                    max-height: 70vh !important;
                    padding: 6px !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                .thumbnail-dropdown {
                    left: 5px !important;
                }
                .thumbnail-dropdown-right {
                    right: 5px !important;
                }
                /* Even smaller fonts on small screens */
                .thumbnail-item {
                    font-size: 9px !important;
                    margin-left: 5px !important;
                }
                .thumbnail-label {
                    font-size: 8px !important;
                }
                .search-header,
                .search-input,
                .filter-status-box {
                    font-size: 10px !important;
                }
                .thumbnail-scroll-controls {
                    font-size: 9px !important;
                }
                /* Even smaller background logo on small screens */
                .flexframe-bg-watermark {
                    width: 100px !important;
                    max-width: 35vw !important;
                }
                .animation-player {
                    padding: 4px 6px !important;
                }
                .player-left {
                    min-width: 35px !important;
                    gap: 3px !important;
                }
                .play-pause-btn,
                .speed-btn,
                .screenshot-btn,
                .ar-btn {
                    padding: 3px 5px !important;
                    font-size: 8px !important;
                    height: 26px !important;
                    min-height: 26px !important;
                }
                .time-display {
                    font-size: 8px !important;
                    display: none !important;
                }
                .speed-btn,
                .animation-player .speed-btn,
                button.speed-btn,
                .player-left .speed-btn,
                .animation-player .player-left .speed-btn,
                #flexframe-viewer-container .speed-btn,
                .screenshot-btn,
                .animation-player .screenshot-btn,
                button.screenshot-btn,
                .player-right .speed-btn,
                .player-right .screenshot-btn,
                .animation-player .player-right .speed-btn,
                .animation-player .player-right .screenshot-btn {
                    display: none !important;
                    visibility: hidden !important;
                    width: 0 !important;
                    height: 0 !important;
                    min-width: 0 !important;
                    min-height: 0 !important;
                    max-width: 0 !important;
                    max-height: 0 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    opacity: 0 !important;
                    border: none !important;
                    flex: 0 0 0 !important;
                    width: 0 !important;
                    height: 0 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    opacity: 0 !important;
                }
                /* Mobile small: Override fixed positioning for dropdowns */
                #flexframe-viewer-container .thumbnail-dropdown.show,
                #flexframe-viewer-container .thumbnail-dropdown-right.show,
                .thumbnail-dropdown.show,
                .thumbnail-dropdown-right.show,
                div.thumbnail-dropdown.show,
                div.thumbnail-dropdown-right.show {
                    position: fixed !important;
                    margin-top: 4px !important;
                }
                #flexframe-viewer-container .thumbnail-dropdown.show,
                .thumbnail-dropdown.show,
                div.thumbnail-dropdown.show {
                    top: 90px !important;
                    left: 10px !important;
                    right: auto !important;
                }
                /* Mobile: Lower z-index of right menu */
                #flexframe-viewer-container .thumbnail-grid-container-right {
                    z-index: 999 !important;
                }
                /* Mobile: Center search dropdown at top */
                #flexframe-viewer-container #searchDropdown.show,
                #searchDropdown.thumbnail-dropdown.show,
                div#searchDropdown.show {
                    top: 5px !important;
                    left: 50% !important;
                    right: auto !important;
                    transform: translateX(-50%) !important;
                    width: min(98vw, 600px) !important;
                    max-width: 98vw !important;
                    z-index: 999999 !important;
                    margin: 0 !important;
                }
                #flexframe-viewer-container .thumbnail-dropdown-right.show,
                .thumbnail-dropdown-right.show,
                div.thumbnail-dropdown-right.show {
                    top: 90px !important;
                    left: auto !important;
                    right: 10px !important;
                }
                /* Mobile small: Permanent hover effect on info-step-items */
                #flexframe-viewer-container .info-step-item,
                .thumbnail-dropdown-right .info-step-item,
                .info-step-item {
                    background-color: #0516ff22 !important;
                    border-color: #0516ff !important;
                    border: 1px solid #0516ff !important;
                }
            }
            
            /* Desktop/Tablet: Remove margins from search input and button */
            @media screen and (min-width: 769px) {
                #flexframe-viewer-container .search-input,
                #flexframe-viewer-container input.search-input,
                #flexframe-viewer-container #searchInput,
                #flexframe-viewer-container input#searchInput,
                .thumbnail-dropdown .search-input,
                .search-header .search-input {
                    margin: 0 !important;
                }
                #flexframe-viewer-container .search-action-btn,
                .thumbnail-dropdown .search-action-btn {
                    margin: 0 !important;
                }
                
                /* FORCE same 160x160 thumbnails on large screens - same as mid tier */
                #flexframe-viewer-container #searchDropdown .thumbnail-item,
                #flexframe-viewer-container #searchDropdown div.thumbnail-item,
                #searchDropdown .thumbnail-item,
                div#searchGrid .thumbnail-item,
                .thumbnail-dropdown .thumbnail-item {
                    width: 160px !important;
                    height: 160px !important;
                    min-width: 160px !important;
                    min-height: 160px !important;
                    max-width: 160px !important;
                    max-height: 160px !important;
                    padding: 1px !important;
                    margin-bottom: 10px !important;
                    flex-shrink: 0 !important;
                    flex-grow: 0 !important;
                }
                
                #flexframe-viewer-container #searchDropdown .thumbnail-item img,
                #flexframe-viewer-container #searchDropdown div.thumbnail-item img,
                #searchDropdown .thumbnail-item img,
                div#searchGrid .thumbnail-item img,
                .thumbnail-dropdown .thumbnail-item img {
                    width: 160px !important;
                    height: 160px !important;
                    min-width: 160px !important;
                    min-height: 160px !important;
                    max-width: 160px !important;
                    max-height: 160px !important;
                    object-fit: cover !important;
                    flex-shrink: 0 !important;
                }
                
                /* Thumbnail scroll container - add left margin on large screens */
                #flexframe-viewer-container #searchDropdown .thumbnail-scroll-container,
                #searchDropdown .thumbnail-scroll-container,
                .thumbnail-scroll-container {
                    margin-left: 15px !important;
                }
            }
        ';
        
        // If this is a dedicated FlexFrame viewer page, hide all WordPress theme elements
        if ($is_viewer_page) {
            $isolation_css .= '
            /* Full-screen FlexFrame viewer - hide all WordPress elements */
            html {
                overflow: hidden !important;
                height: 100% !important;
                width: 100% !important;
                position: fixed !important;
            }
            body, body.page {
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                height: 100% !important;
                width: 100% !important;
                min-height: 100% !important;
                max-height: 100% !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
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
                width: 100% !important;
                max-width: 100% !important;
                height: 100% !important;
                max-height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
            }
            /* Ensure FlexFrame container is full screen */
            #flexframe-viewer-container {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: 9999 !important;
                overflow: hidden !important;
            }
            /* Animation player is appended to body, not container - ensure proper positioning */
            body > .animation-player,
            .animation-player {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100% !important;
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
        
        // Force clear option cache to get fresh values (especially after Theme Editor saves)
        wp_cache_delete('flexframe_primary_color', 'options');
        wp_cache_delete('flexframe_primary_color_mode', 'options');
        wp_cache_delete('alloptions', 'options');
        
        // Add UI settings dynamic CSS - defaults match recommended settings
        $spinner_color = esc_attr(get_option('flexframe_spinner_color', '#00f510'));
        $use_logo_loader = get_option('flexframe_use_logo_loader', true);
        $logo_loader_animation = esc_attr(get_option('flexframe_logo_loader_animation', 'pulse'));
        $logo_loader_size = absint(get_option('flexframe_logo_loader_size', 100));
        $player_bg_color = esc_attr(get_option('flexframe_player_bg_color', '#828282'));
        $player_bg_opacity = floatval(get_option('flexframe_player_bg_opacity', 0));
        $player_button_bg_color = esc_attr(get_option('flexframe_player_button_bg_color', '#f50000'));
        $player_button_bg_opacity = floatval(get_option('flexframe_player_button_bg_opacity', 0.8));
        $player_icon_color = esc_attr(get_option('flexframe_player_icon_color', '#ffffff'));
        $player_accent_color = esc_attr(get_option('flexframe_player_accent_color', '#f50000'));
        $player_always_visible = get_option('flexframe_player_always_visible', 'no') === 'yes';
        $menu_bg_color = esc_attr(get_option('flexframe_menu_bg_color', '#000000'));
        $menu_bg_opacity = floatval(get_option('flexframe_menu_bg_opacity', 0.9));
        $menu_text_color = esc_attr(get_option('flexframe_menu_text_color', '#ffffff'));
        $menu_text_opacity = floatval(get_option('flexframe_menu_text_opacity', 1));
        $menu_accent_color = esc_attr(get_option('flexframe_menu_accent_color', '#f50000'));
        $primary_color = esc_attr(get_option('flexframe_primary_color', '#f50000'));
        $hide_right_menu = get_option('flexframe_hide_right_menu', false);
        $thumbnail_label_color = esc_attr(get_option('flexframe_thumbnail_label_color', '#000000'));
        $thumbnail_label_opacity = floatval(get_option('flexframe_thumbnail_label_opacity', 0.1));
        
        // Convert hex to RGB for rgba usage
        $player_bg_rgb = sscanf($player_bg_color, "#%02x%02x%02x");
        $player_button_bg_rgb = sscanf($player_button_bg_color, "#%02x%02x%02x");
        $menu_bg_rgb = sscanf($menu_bg_color, "#%02x%02x%02x");
        $menu_text_rgb = sscanf($menu_text_color, "#%02x%02x%02x");
        $primary_rgb = sscanf($primary_color, "#%02x%02x%02x");
        $thumbnail_label_rgb = sscanf($thumbnail_label_color, "#%02x%02x%02x");
        
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
            .animation-player .speed-btn,
            .animation-player .quality-btn,
            #quality-toggle-btn {
                background-color: rgba(' . $player_button_bg_rgb[0] . ', ' . $player_button_bg_rgb[1] . ', ' . $player_button_bg_rgb[2] . ', ' . $player_button_bg_opacity . ') !important;
            }
            
            /* Quality button hover/focus states - use player accent color instead of blue */
            .animation-player .quality-btn:hover,
            .animation-player .quality-btn:focus,
            .animation-player .quality-btn:active,
            #quality-toggle-btn:hover,
            #quality-toggle-btn:focus,
            #quality-toggle-btn:active {
                background-color: rgba(' . $player_button_bg_rgb[0] . ', ' . $player_button_bg_rgb[1] . ', ' . $player_button_bg_rgb[2] . ', ' . min($player_button_bg_opacity + 0.15, 1) . ') !important;
                border-color: ' . $player_accent_color . ' !important;
                outline: none !important;
                box-shadow: 0 0 0 2px ' . $player_accent_color . '40 !important;
            }
            
            /* Icon & Text Color */
            .animation-player button,
            .animation-player .player-btn,
            .animation-player .play-pause-btn,
            .animation-player .speed-btn,
            .animation-player .quality-btn,
            #quality-toggle-btn {
                color: ' . $player_icon_color . ' !important;
            }
            .animation-player button svg,
            .animation-player .play-pause-btn svg,
            .animation-player .speed-btn svg,
            .animation-player .quality-btn svg,
            #quality-toggle-btn svg {
                fill: ' . $player_icon_color . ' !important;
            }
            .animation-player .speed-btn span,
            .animation-player #speed-text,
            .animation-player .quality-btn span,
            #quality-toggle-btn span,
            #quality-text {
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
            .logo-loader-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            .logo-loader-container {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            .logo-loader-img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            .logo-progress-bar-container {
                width: 80%;
                max-width: 150px;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
            }
            .logo-progress-bar {
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, <?php echo $primary_color; ?>80, <?php echo $primary_color; ?>);
                border-radius: 2px;
                transition: width 0.15s ease-out;
            }
            .logo-progress-text {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
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
            @keyframes indeterminateProgress {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
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
            /* Apply background to dropdowns */
            .thumbnail-dropdown,
            .exercise-menu,
            .menu-panel,
            .side-menu,
            .right-menu {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
            }
            /* Menu title buttons - use menu background color */
            #flexframe-viewer-container .thumbnail-menu-toggle,
            .thumbnail-grid-container .thumbnail-menu-toggle,
            button.thumbnail-menu-toggle,
            .thumbnail-menu-toggle {
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
            
            /* ===== SEARCH INPUT - USE MENU BACKGROUND COLOR ===== */
            #flexframe-viewer-container .search-input,
            #flexframe-viewer-container input.search-input,
            #flexframe-viewer-container #searchInput,
            .thumbnail-dropdown .search-input,
            .search-header .search-input {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                color: rgba(' . $menu_text_rgb[0] . ', ' . $menu_text_rgb[1] . ', ' . $menu_text_rgb[2] . ', ' . $menu_text_opacity . ') !important;
                border-color: ' . $menu_accent_color . '66 !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container #searchInput:focus,
            .thumbnail-dropdown .search-input:focus {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . min($menu_bg_opacity + 0.1, 1) . ') !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-input::placeholder,
            #flexframe-viewer-container #searchInput::placeholder {
                color: rgba(' . $menu_text_rgb[0] . ', ' . $menu_text_rgb[1] . ', ' . $menu_text_rgb[2] . ', 0.5) !important;
            }
            
            /* ===== SEARCH HEADER - USE MENU BACKGROUND COLOR ===== */
            #flexframe-viewer-container .search-header,
            .thumbnail-dropdown .search-header {
                background: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
            }
            
            /* ===== SEARCH ACTION BUTTON - USE ACCENT COLOR ===== */
            #flexframe-viewer-container .search-action-btn,
            .thumbnail-dropdown .search-action-btn {
                background-color: ' . $menu_accent_color . '33 !important;
                color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-action-btn:hover,
            .thumbnail-dropdown .search-action-btn:hover {
                background-color: ' . $menu_accent_color . '66 !important;
            }
            #flexframe-viewer-container .search-action-btn svg,
            .thumbnail-dropdown .search-action-btn svg {
                fill: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== SEARCH SUGGESTIONS - USE MENU BACKGROUND COLOR ===== */
            #flexframe-viewer-container .search-suggestions,
            .thumbnail-dropdown .search-suggestions {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . min($menu_bg_opacity + 0.1, 1) . ') !important;
                border-color: ' . $menu_accent_color . '66 !important;
            }
            .search-suggestion-item:hover {
                background-color: ' . $menu_accent_color . '33 !important;
            }
            .search-suggestion-category {
                color: ' . $menu_accent_color . ' !important;
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
                box-shadow: none !important;
            }
            
            /* ===== SLIDE IN/OUT TAB BUTTON (LEFT - CIRCULAR) ===== */
            #flexframe-viewer-container .menu-hint-tab,
            .thumbnail-grid-container .menu-hint-tab,
            .menu-hint-tab {
                position: absolute !important;
                top: 50% !important;
                right: -50px !important;
                width: 44px !important;
                height: 44px !important;
                border-radius: 50% !important;
                background: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                border: 2px solid ' . $menu_accent_color . ' !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 20px ' . $menu_accent_color . '33 !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                transform: translateY(-50%) !important;
                cursor: pointer !important;
                z-index: 10001 !important;
                pointer-events: auto !important;
                transition: all 0.3s ease !important;
            }
            #flexframe-viewer-container .menu-hint-tab::before,
            .thumbnail-grid-container .menu-hint-tab::before,
            .menu-hint-tab::before {
                content: none !important;
                display: none !important;
            }
            #flexframe-viewer-container .menu-hint-tab svg,
            .thumbnail-grid-container .menu-hint-tab svg,
            .menu-hint-tab svg {
                fill: ' . $menu_text_color . ' !important;
                width: 22px !important;
                height: 22px !important;
            }
            #flexframe-viewer-container .menu-hint-tab:hover,
            .thumbnail-grid-container .menu-hint-tab:hover,
            .menu-hint-tab:hover {
                background: ' . $menu_accent_color . ' !important;
                background-color: ' . $menu_accent_color . ' !important;
                transform: translateY(-50%) scale(1.1) !important;
            }
            #flexframe-viewer-container .menu-hint-tab:hover svg,
            .thumbnail-grid-container .menu-hint-tab:hover svg,
            .menu-hint-tab:hover svg {
                fill: #ffffff !important;
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
                background-color: transparent !important;
            }
            #flexframe-viewer-container .search-action-btn:hover,
            #flexframe-viewer-container .search-btn:hover,
            #flexframe-viewer-container #searchActionBtn:hover,
            .search-action-btn:hover,
            .search-btn:hover,
            #searchActionBtn:hover,
            .search-input-wrapper button:hover,
            .search-header button:hover {
                background-color: rgba(255, 255, 255, 0.1) !important;
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
            /* Keep search header solid on focus */
            #flexframe-viewer-container .search-header:focus-within,
            #flexframe-viewer-container #searchDropdown .search-header:focus-within,
            .thumbnail-dropdown .search-header:focus-within,
            div#searchDropdown .search-header:focus-within {
                background: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . min($menu_bg_opacity + 0.1, 1) . ') !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                opacity: 1 !important;
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
            .thumbnail-item.touch-active,
            .menu-item.active,
            .menu-item:hover,
            .exercise-item.active,
            .exercise-item:hover {
                background-color: ' . $menu_accent_color . '33 !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            .thumbnail-item.active *,
            .thumbnail-item.touch-active *,
            .menu-item.active * {
                color: ' . $menu_accent_color . ' !important;
            }
            
            /* ===== SELECTED EXERCISE ITEM & CHECKMARK ===== */
            #flexframe-viewer-container .thumbnail-item.selected,
            #flexframe-viewer-container .exercise-item.selected,
            #flexframe-viewer-container .menu-item.selected,
            .thumbnail-item.selected,
            .exercise-item.selected,
            .menu-item.selected {
                background-color: ' . $menu_accent_color . '44 !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            /* Selected checkmark icon */
            #flexframe-viewer-container .thumbnail-item.selected .selected-icon,
            #flexframe-viewer-container .thumbnail-item.selected .check-icon,
            #flexframe-viewer-container .thumbnail-item.selected .checkmark,
            #flexframe-viewer-container .thumbnail-item .selected-indicator,
            #flexframe-viewer-container .selected-icon,
            #flexframe-viewer-container .check-icon,
            #flexframe-viewer-container .checkmark,
            .thumbnail-item.selected .selected-icon,
            .thumbnail-item.selected .check-icon,
            .thumbnail-item.selected .checkmark,
            .thumbnail-item .selected-indicator,
            .selected-icon,
            .check-icon,
            .checkmark {
                background-color: ' . $menu_accent_color . ' !important;
                color: #ffffff !important;
            }
            #flexframe-viewer-container .thumbnail-item.selected .selected-icon svg,
            #flexframe-viewer-container .thumbnail-item.selected .check-icon svg,
            #flexframe-viewer-container .thumbnail-item.selected .checkmark svg,
            #flexframe-viewer-container .selected-icon svg,
            #flexframe-viewer-container .check-icon svg,
            .thumbnail-item.selected .selected-icon svg,
            .thumbnail-item.selected .check-icon svg,
            .thumbnail-item .selected-indicator svg,
            .selected-icon svg,
            .check-icon svg,
            .checkmark svg {
                fill: #ffffff !important;
            }
            
            /* ===== SELECTED THUMBNAIL GLOW & CHECKMARK - Uses Primary Color ===== */
            #flexframe-viewer-container .thumbnail-item.selected,
            .thumbnail-item.selected {
                border-color: ' . $primary_color . ' !important;
                box-shadow: 0 0 20px ' . $primary_color . '80 !important;
            }
            #flexframe-viewer-container .thumbnail-item.selected::before,
            .thumbnail-item.selected::before,
            .thumbnail-item.selected:before {
                background: ' . $primary_color . ' !important;
                background-color: ' . $primary_color . ' !important;
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
            
            /* ===== RIGHT SIDE MENU SYSTEM ===== */
            /* Desktop ONLY (769px+): show 4 separate menus, hide mobile consolidated menu */
            @media screen and (min-width: 769px) {
                .thumbnail-grid-container-right .desktop-only {
                    display: block !important;
                }
                .thumbnail-grid-container-right .mobile-only {
                    display: none !important;
                }
            }
            /* Tablet/Mid screens (481px-768px): show mobile info button, hide desktop menus */
            @media screen and (min-width: 481px) and (max-width: 768px) {
                .thumbnail-grid-container-right .desktop-only {
                    display: none !important;
                }
                .thumbnail-grid-container-right .mobile-only {
                    display: block !important;
                }
            }
            /* Right menu container */
            #flexframe-viewer-container .thumbnail-grid-container-right,
            .thumbnail-grid-container-right {
                background-color: transparent !important;
            }
            /* Right menu toggle buttons - background color (button only) */
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle,
            .thumbnail-grid-container-right .thumbnail-menu-toggle {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
            }
            /* Right menu toggle buttons - text color (button and children) */
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle,
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle *,
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle span,
            .thumbnail-grid-container-right .thumbnail-menu-toggle,
            .thumbnail-grid-container-right .thumbnail-menu-toggle *,
            .thumbnail-grid-container-right .thumbnail-menu-toggle span {
                color: ' . $menu_text_color . ' !important;
                background-color: transparent !important;
            }
            /* Re-apply background to button itself */
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle,
            .thumbnail-grid-container-right .thumbnail-menu-toggle {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
            }
            /* Right menu toggle button icons */
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle svg,
            .thumbnail-grid-container-right .thumbnail-menu-toggle svg {
                fill: ' . $menu_text_color . ' !important;
            }
            /* Right menu toggle button hover and active states */
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle:hover,
            #flexframe-viewer-container .thumbnail-grid-container-right .thumbnail-menu-toggle.active,
            .thumbnail-grid-container-right .thumbnail-menu-toggle:hover,
            .thumbnail-grid-container-right .thumbnail-menu-toggle.active {
                background-color: ' . $menu_accent_color . ' !important;
            }
            /* Right menu dropdowns - transparent container, items have their own backgrounds */
            #flexframe-viewer-container .thumbnail-dropdown-right,
            #flexframe-viewer-container #hintsDropdown,
            #flexframe-viewer-container #tipsDropdown,
            #flexframe-viewer-container #stepsDropdown,
            #flexframe-viewer-container #errorsDropdown,
            .thumbnail-dropdown-right,
            #hintsDropdown,
            #tipsDropdown,
            #stepsDropdown,
            #errorsDropdown {
                background: transparent !important;
                background-color: transparent !important;
                border: 2px solid ' . $menu_accent_color . ' !important;
            }
            /* Right menu text color */
            #flexframe-viewer-container .thumbnail-dropdown-right *,
            .thumbnail-dropdown-right * {
                color: ' . $menu_text_color . ' !important;
                opacity: 1 !important;
            }
            /* Remove focus/selection shadows from info items */
            #flexframe-viewer-container .info-step-item:focus,
            #flexframe-viewer-container .info-step-item:active,
            .thumbnail-dropdown-right .info-step-item:focus,
            .thumbnail-dropdown-right .info-step-item:active,
            .info-step-item:focus,
            .info-step-item:active {
                outline: none !important;
                box-shadow: none !important;
            }
            /* Right menu hint tab (CIRCULAR) */
            #flexframe-viewer-container .menu-hint-tab-right,
            .thumbnail-grid-container-right .menu-hint-tab-right,
            .menu-hint-tab-right {
                position: absolute !important;
                top: 50% !important;
                left: -50px !important;
                width: 44px !important;
                height: 44px !important;
                border-radius: 50% !important;
                background: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                border: 2px solid ' . $menu_accent_color . ' !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 20px ' . $menu_accent_color . '33 !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                transform: translateY(-50%) !important;
                cursor: pointer !important;
                z-index: 10001 !important;
                pointer-events: auto !important;
                transition: all 0.3s ease !important;
            }
            #flexframe-viewer-container .menu-hint-tab-right::before,
            .thumbnail-grid-container-right .menu-hint-tab-right::before,
            .menu-hint-tab-right::before {
                content: none !important;
                display: none !important;
            }
            #flexframe-viewer-container .menu-hint-tab-right svg,
            .thumbnail-grid-container-right .menu-hint-tab-right svg,
            .menu-hint-tab-right svg {
                fill: ' . $menu_text_color . ' !important;
                width: 22px !important;
                height: 22px !important;
            }
            #flexframe-viewer-container .menu-hint-tab-right:hover,
            .thumbnail-grid-container-right .menu-hint-tab-right:hover,
            .menu-hint-tab-right:hover {
                background: ' . $menu_accent_color . ' !important;
                background-color: ' . $menu_accent_color . ' !important;
                transform: translateY(-50%) scale(1.1) !important;
            }
            #flexframe-viewer-container .menu-hint-tab-right:hover svg,
            .thumbnail-grid-container-right .menu-hint-tab-right:hover svg,
            .menu-hint-tab-right:hover svg {
                fill: #ffffff !important;
            }
            /* Right menu info items - use PRIMARY COLOR with 35% opacity and 50px blur */
            #flexframe-viewer-container .info-step-item,
            .thumbnail-dropdown-right .info-step-item,
            .info-step-item {
                background: rgba(' . $primary_rgb[0] . ', ' . $primary_rgb[1] . ', ' . $primary_rgb[2] . ', 0.35) !important;
                backdrop-filter: blur(50px) !important;
                -webkit-backdrop-filter: blur(50px) !important;
                border-color: ' . $menu_accent_color . '44 !important;
                color: ' . $menu_text_color . ' !important;
            }
            /* Section headers - larger, bolder styling */
            #flexframe-viewer-container .info-section-header,
            .thumbnail-dropdown-right .info-section-header,
            .info-section-header {
                background: rgba(' . $primary_rgb[0] . ', ' . $primary_rgb[1] . ', ' . $primary_rgb[2] . ', 0.5) !important;
                backdrop-filter: blur(50px) !important;
                -webkit-backdrop-filter: blur(50px) !important;
                border: 2px solid ' . $menu_accent_color . ' !important;
                padding: 16px !important;
                margin: 12px 8px !important;
                border-radius: 12px !important;
                text-align: center !important;
            }
            #flexframe-viewer-container .info-section-title,
            .thumbnail-dropdown-right .info-section-title,
            .info-section-title {
                font-size: 18px !important;
                font-weight: 700 !important;
                color: ' . $menu_accent_color . ' !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
            }
            /* Sticky header for mobile info menu */
            .info-sticky-header {
                position: sticky !important;
                top: 0 !important;
                z-index: 100 !important;
                background: rgba(' . $primary_rgb[0] . ', ' . $primary_rgb[1] . ', ' . $primary_rgb[2] . ', 0.95) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border-bottom: 2px solid ' . $menu_accent_color . ' !important;
                padding: 5px !important;
                text-align: center !important;
                font-size: clamp(9px, 3.43vw, 18px) !important;
                font-weight: 700 !important;
                color: ' . $menu_accent_color . ' !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
                margin: -10px 0px 10px 0px !important;
                white-space: normal !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
            }
            /* Ensure all text inside info items is solid color, not transparent */
            #flexframe-viewer-container .info-step-item *,
            .thumbnail-dropdown-right .info-step-item *,
            .info-step-item * {
                color: ' . $menu_text_color . ' !important;
                opacity: 1 !important;
            }
            #flexframe-viewer-container .info-step-item:hover,
            .thumbnail-dropdown-right .info-step-item:hover,
            .info-step-item:hover {
                background-color: rgba(' . $primary_rgb[0] . ', ' . $primary_rgb[1] . ', ' . $primary_rgb[2] . ', 0.5) !important;
                border-color: ' . $menu_accent_color . ' !important;
            }
            /* Right menu info titles - use text color */
            #flexframe-viewer-container .info-step-title,
            .thumbnail-dropdown-right .info-step-title,
            .info-step-item .info-step-title,
            .info-step-title {
                color: ' . $menu_text_color . ' !important;
                opacity: 1 !important;
                font-weight: 600 !important;
            }
            /* Right menu info text - use text opacity setting */
            #flexframe-viewer-container .info-step-text,
            .thumbnail-dropdown-right .info-step-text,
            .info-step-item .info-step-text,
            .info-step-text {
                color: ' . $menu_text_color . ' !important;
                opacity: 1 !important;
            }
            /* Right menu scroll buttons */
            #flexframe-viewer-container .thumbnail-dropdown-right .scroll-btn:hover,
            .thumbnail-dropdown-right .scroll-btn:hover {
                background-color: ' . $menu_accent_color . '33 !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right .scroll-btn:hover svg,
            .thumbnail-dropdown-right .scroll-btn:hover svg {
                fill: ' . $menu_accent_color . ' !important;
            }
            /* Right menu scrollbar */
            #flexframe-viewer-container .thumbnail-dropdown-right::-webkit-scrollbar-thumb,
            .thumbnail-dropdown-right::-webkit-scrollbar-thumb,
            #hintsDropdown::-webkit-scrollbar-thumb,
            #tipsDropdown::-webkit-scrollbar-thumb,
            #stepsDropdown::-webkit-scrollbar-thumb,
            #errorsDropdown::-webkit-scrollbar-thumb,
            #hintsContainer::-webkit-scrollbar-thumb,
            #tipsContainer::-webkit-scrollbar-thumb,
            #stepsContainer::-webkit-scrollbar-thumb,
            #errorsContainer::-webkit-scrollbar-thumb {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right::-webkit-scrollbar-thumb:hover,
            .thumbnail-dropdown-right::-webkit-scrollbar-thumb:hover {
                background-color: ' . $menu_accent_color . 'cc !important;
            }
            /* Firefox scrollbar for right menu */
            #flexframe-viewer-container .thumbnail-dropdown-right,
            .thumbnail-dropdown-right,
            #hintsContainer,
            #tipsContainer,
            #stepsContainer,
            #errorsContainer {
                scrollbar-color: ' . $menu_accent_color . ' rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            /* Right menu glow effect override */
            #flexframe-viewer-container .thumbnail-dropdown-right.show,
            .thumbnail-dropdown-right.show {
                box-shadow: 0 0 20px ' . $menu_accent_color . '66 !important;
            }
            /* Right menu settings panel */
            #flexframe-viewer-container .right-menu-settings-panel,
            .right-menu-settings-panel {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                border: 2px solid ' . $menu_accent_color . ' !important;
            }
            /* Right menu sliders */
            #flexframe-viewer-container .thumbnail-dropdown-right input[type="range"]::-webkit-slider-thumb,
            .thumbnail-dropdown-right input[type="range"]::-webkit-slider-thumb,
            .right-menu-settings-panel input[type="range"]::-webkit-slider-thumb {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right input[type="range"]::-moz-range-thumb,
            .thumbnail-dropdown-right input[type="range"]::-moz-range-thumb,
            .right-menu-settings-panel input[type="range"]::-moz-range-thumb {
                background-color: ' . $menu_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right input[type="range"],
            .thumbnail-dropdown-right input[type="range"],
            .right-menu-settings-panel input[type="range"] {
                accent-color: ' . $menu_accent_color . ' !important;
            }
            
            /* FINAL OVERRIDE: Force all text inside info-step-item to be 100% opaque */
            .info-step-item,
            .info-step-item *,
            .info-step-item .info-step-title,
            .info-step-item .info-step-text,
            .info-step-title,
            .info-step-text,
            #flexframe-viewer-container .info-step-item,
            #flexframe-viewer-container .info-step-item *,
            #flexframe-viewer-container .info-step-title,
            #flexframe-viewer-container .info-step-text,
            .thumbnail-dropdown-right .info-step-item,
            .thumbnail-dropdown-right .info-step-item *,
            .thumbnail-dropdown-right .info-step-title,
            .thumbnail-dropdown-right .info-step-text {
                opacity: 1 !important;
                -webkit-opacity: 1 !important;
            }
            
            /* Thumbnail label gradient uses custom color and opacity */
            #flexframe-viewer-container .thumbnail-label,
            .thumbnail-dropdown .thumbnail-label,
            .thumbnail-label {
                background: linear-gradient(rgba(' . $thumbnail_label_rgb[0] . ', ' . $thumbnail_label_rgb[1] . ', ' . $thumbnail_label_rgb[2] . ', ' . $thumbnail_label_opacity . '), transparent) !important;
            }
            
            /* Thumbnail muscle info gradient (bottom) uses same settings */
            #flexframe-viewer-container .thumbnail-muscle-info,
            .thumbnail-dropdown .thumbnail-muscle-info,
            .thumbnail-muscle-info {
                background: linear-gradient(transparent, rgba(' . $thumbnail_label_rgb[0] . ', ' . $thumbnail_label_rgb[1] . ', ' . $thumbnail_label_rgb[2] . ', ' . $thumbnail_label_opacity . ')) !important;
            }
        ';
        
        // Hide right menu if setting is enabled
        if ($hide_right_menu) {
            $ui_css .= '
                /* Hide Right Info Panel */
                #flexframe-viewer-container .thumbnail-grid-container-right,
                .thumbnail-grid-container-right {
                    display: none !important;
                }
            ';
        }
        
        wp_add_inline_style('flexframe-viewer-style', $ui_css);
        
        // Register Vite-generated JavaScript bundle (must register before localizing)
        wp_register_script(
            'flexframe-viewer-script',
            FLEXFRAME_PLUGIN_URL . 'assets/assets/index-Tn_u0FhX.js',
            array(),
            FLEXFRAME_VERSION,
            true
        );
        
        // Add type="module" attribute to script
        add_filter('script_loader_tag', 'flexframe_add_type_module', 10, 3);
        
        // Pass WordPress settings to JavaScript (must be after register, before enqueue)
        // Defaults match recommended settings
        // Force clear option cache to get fresh values (especially after Theme Editor saves)
        wp_cache_delete('flexframe_primary_color', 'options');
        wp_cache_delete('flexframe_primary_color_mode', 'options');
        wp_cache_delete('alloptions', 'options');
        
        $primary_color_mode = get_option('flexframe_primary_color_mode', 'custom');
        $primary_color = get_option('flexframe_primary_color', '#f50000');
        $logo_url = get_option('flexframe_logo_url', '');
        // Ensure HTTPS to avoid mixed content warnings
        if (!empty($logo_url) && strpos($logo_url, 'http://') === 0) {
            $logo_url = str_replace('http://', 'https://', $logo_url);
        }
        $logo_threshold = get_option('flexframe_logo_threshold', 0.95);
        $logo_border_enabled = get_option('flexframe_logo_border_enabled', false);
        $logo_border_size = absint(get_option('flexframe_logo_border_size', 2));
        $logo_display_size = absint(get_option('flexframe_logo_display_size', 100));
        $material_mode = get_option('flexframe_material_mode', 'preset');
        $material_preset = get_option('flexframe_material_preset', 'default');
        
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
        
        // Get custom thumbnails
        $custom_thumbnails_json = get_option('flexframe_custom_thumbnails', '{}');
        $custom_thumbnails = json_decode($custom_thumbnails_json, true);
        if (!is_array($custom_thumbnails)) {
            $custom_thumbnails = array();
        }
        
        // Get spinner color - if it's 'primary' or matches old green default, use primary color instead
        $spinner_color_option = get_option('flexframe_spinner_color', '#4a9eff');
        $spinner_color = ($spinner_color_option === 'primary' || $spinner_color_option === '#00f510') 
            ? $primary_color 
            : $spinner_color_option;
        
        // Get UI settings
        $ui_settings = array(
            'spinnerColor' => $spinner_color,
            'player' => array(
                'bgColor' => get_option('flexframe_player_bg_color', '#000000'),
                'bgOpacity' => floatval(get_option('flexframe_player_bg_opacity', 0.8)),
                'buttonColor' => get_option('flexframe_player_button_color', '#ffffff'),
                'buttonBgColor' => get_option('flexframe_player_button_bg_color', '#f50000'),
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
        
        // Scene/Background settings
        $background_settings = array(
            'gradientTop' => get_option('flexframe_bg_gradient_top', '#3865ad'),
            'gradientBottom' => get_option('flexframe_bg_gradient_bottom', '#0101bc'),
            'gradientAlpha' => floatval(get_option('flexframe_bg_opacity', 1))
        );
        
        // Lighting settings
        $lighting_settings = array(
            'ambientLight' => array(
                'intensity' => floatval(get_option('flexframe_ambient_intensity', 0.4)),
                'color' => get_option('flexframe_ambient_color', '#ffffff')
            ),
            'directionalLight' => array(
                'intensity' => floatval(get_option('flexframe_directional_intensity', 1.43)),
                'color' => get_option('flexframe_directional_color', '#ffffff'),
                'position' => array(
                    'x' => floatval(get_option('flexframe_directional_pos_x', 1.35)),
                    'y' => floatval(get_option('flexframe_directional_pos_y', 1.57)),
                    'z' => floatval(get_option('flexframe_directional_pos_z', 0.9))
                )
            )
        );
        
        // Particle settings
        $particle_settings = array(
            'visible' => (bool) get_option('flexframe_particles_enabled', true),
            'count' => absint(get_option('flexframe_particles_count', 1150)),
            'size' => floatval(get_option('flexframe_particles_size', 0.0095)),
            'color' => get_option('flexframe_particles_color', '#0d529c'),
            'opacity' => floatval(get_option('flexframe_particles_opacity', 1)),
            'speed' => floatval(get_option('flexframe_particles_speed', 0.5))
        );
        
        // Equipment Material Settings
        $equipment_materials = array('barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber');
        $equipment_settings = array();
        
        foreach ($equipment_materials as $mat_key) {
            $is_enabled = get_option("flexframe_{$mat_key}_enabled", false);
            if ($is_enabled) {
                $equipment_settings[strtoupper($mat_key)] = array(
                    'enabled' => true,
                    'color' => get_option("flexframe_{$mat_key}_color", '#808080'),
                    'opacity' => floatval(get_option("flexframe_{$mat_key}_opacity", 1)),
                    'metalness' => floatval(get_option("flexframe_{$mat_key}_metalness", 0)),
                    'roughness' => floatval(get_option("flexframe_{$mat_key}_roughness", 0.5)),
                    'colorMapEnabled' => (bool) get_option("flexframe_{$mat_key}_color_map_enabled", true),
                    'bumpScale' => floatval(get_option("flexframe_{$mat_key}_bump_scale", 1)),
                    'normalScale' => floatval(get_option("flexframe_{$mat_key}_normal_scale", 1)),
                    'clearcoat' => floatval(get_option("flexframe_{$mat_key}_clearcoat", 0)),
                    'clearcoatRoughness' => floatval(get_option("flexframe_{$mat_key}_clearcoat_roughness", 0)),
                    'emissiveColor' => get_option("flexframe_{$mat_key}_emissive_color", '#000000'),
                    'emissiveIntensity' => floatval(get_option("flexframe_{$mat_key}_emissive_intensity", 0)),
                    'blending' => get_option("flexframe_{$mat_key}_blending", 'normal'),
                    'transmission' => floatval(get_option("flexframe_{$mat_key}_transmission", 0)),
                    'thickness' => floatval(get_option("flexframe_{$mat_key}_thickness", 0)),
                    'ior' => floatval(get_option("flexframe_{$mat_key}_ior", 1.5)),
                    'envMapIntensity' => floatval(get_option("flexframe_{$mat_key}_env_intensity", 1)),
                    'sheen' => floatval(get_option("flexframe_{$mat_key}_sheen", 0)),
                    'sheenRoughness' => floatval(get_option("flexframe_{$mat_key}_sheen_roughness", 0.5)),
                    'sheenColor' => get_option("flexframe_{$mat_key}_sheen_color", '#ffffff')
                );
            }
        }

        
        $settings_data = array(
            'primaryColorMode' => $primary_color_mode,
            'primaryColor' => $primary_color,
            'logoUrl' => $logo_url,
            'logoThreshold' => $logo_threshold,
            'logoBorderEnabled' => (bool) $logo_border_enabled,
            'logoBorderSize' => $logo_border_size,
            'logoDisplaySize' => $logo_display_size,
            'materialMode' => $material_mode,
            'materialPreset' => $material_preset,
            'skinSettings' => $skin_settings,
            'equipmentMaterials' => $equipment_settings,
            'hiddenExercises' => $hidden_exercises,
            'customThumbnails' => $custom_thumbnails,
            'uiSettings' => $ui_settings,
            'backgroundSettings' => $background_settings,
            'lightingSettings' => $lighting_settings,
            'particleSettings' => $particle_settings,
            'materialSettings' => array(
                'skinColor' => get_option('flexframe_skin_color', '#ffdbac'),
                'skinOpacity' => floatval(get_option('flexframe_skin_opacity', 0.4)),
                'skinRoughness' => floatval(get_option('flexframe_skin_roughness', 0.7)),
                'skinMetalness' => floatval(get_option('flexframe_skin_metalness', 0)),
                'skinTransmission' => floatval(get_option('flexframe_skin_transmission', 0)),
                'skinThickness' => floatval(get_option('flexframe_skin_thickness', 0)),
                'skinIor' => floatval(get_option('flexframe_skin_ior', 1.5)),
                'skinEnvIntensity' => floatval(get_option('flexframe_skin_env_intensity', 1))
            ),
            'menuBackgroundColor' => $menu_bg_color,
            'menuBackgroundOpacity' => $menu_bg_opacity,
            'showScreenshotButton' => (bool) get_option('flexframe_show_screenshot_button', true),
            'autoFullscreen' => (bool) get_option('flexframe_auto_fullscreen', true),
            'pluginUrl' => FLEXFRAME_PLUGIN_URL,
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('flexframe_settings_nonce'),
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
        
        // Add menu toggle button functionality (circular icons)
        $toggle_js = "
            document.addEventListener('DOMContentLoaded', function() {
                // Left menu circular toggle button
                var leftHintTab = document.querySelector('#flexframe-viewer-container .menu-hint-tab');
                var leftMenuContainer = document.querySelector('#flexframe-viewer-container .thumbnail-grid-container');
                
                if (leftHintTab && leftMenuContainer) {
                    leftHintTab.style.cursor = 'pointer';
                    leftHintTab.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        leftMenuContainer.classList.toggle('menu-visible');
                    });
                }
                
                // Right menu circular toggle button
                var rightHintTab = document.querySelector('#flexframe-viewer-container .menu-hint-tab-right');
                var rightMenuContainer = document.querySelector('#flexframe-viewer-container .thumbnail-grid-container-right');
                
                if (rightHintTab && rightMenuContainer) {
                    rightHintTab.style.cursor = 'pointer';
                    rightHintTab.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        rightMenuContainer.classList.toggle('menu-visible');
                    });
                }
            });
        ";
        wp_add_inline_script('flexframe-viewer-script', $toggle_js, 'before');
        
        // Now enqueue the script
        wp_enqueue_script('flexframe-viewer-script');
        
        // Add viewport meta tag for proper mobile scaling
        add_action('wp_head', 'flexframe_add_viewport_meta', 1);
    }
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_assets');

/**
 * Add type="module" attribute to FlexFrame script for ES modules
 */
function flexframe_add_type_module($tag, $handle, $src) {
    if ('flexframe-viewer-script' === $handle) {
        $tag = '<script type="module" crossorigin src="' . esc_url($src) . '" id="' . $handle . '-js"></script>';
    }
    return $tag;
}

/**
 * Add viewport meta tag for proper mobile responsiveness
 */
function flexframe_add_viewport_meta() {
    // Remove any existing viewport meta and add our own for proper 1:1 scaling
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">' . "\n";
}

/**
 * AJAX handler to save primary color setting
 */
function flexframe_save_primary_color() {
    // Verify nonce
    check_ajax_referer('flexframe_settings_nonce', 'nonce');
    
    // Check if user has permission
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
        return;
    }
    
    // Get the primary color from POST
    $primary_color = isset($_POST['primary_color']) ? sanitize_hex_color($_POST['primary_color']) : '';
    
    if (empty($primary_color)) {
        wp_send_json_error('Invalid color value');
        return;
    }
    
    // Update the primary color option
    update_option('flexframe_primary_color', $primary_color);
    
    // Also set primary color mode to 'custom' when saving a custom color
    update_option('flexframe_primary_color_mode', 'custom');
    
    // Update menu accent color to match primary color (so inline CSS uses new color)
    update_option('flexframe_menu_accent_color', $primary_color);
    
    // Update player accent color to match primary color (scrubber/timeline)
    update_option('flexframe_player_accent_color', $primary_color);
    
    // Update player button BACKGROUND color to match primary color
    update_option('flexframe_player_button_bg_color', $primary_color);
    
    // Update spinner color to match primary color
    update_option('flexframe_spinner_color', $primary_color);
    
    // Update directional light color to match primary color
    update_option('flexframe_directional_color', $primary_color);
    
    // Update particles color to match primary color
    update_option('flexframe_particles_color', $primary_color);
    
    // Force clear WordPress object cache for these specific options
    wp_cache_delete('flexframe_primary_color', 'options');
    wp_cache_delete('flexframe_primary_color_mode', 'options');
    wp_cache_delete('flexframe_menu_accent_color', 'options');
    wp_cache_delete('flexframe_player_accent_color', 'options');
    wp_cache_delete('flexframe_player_button_bg_color', 'options');
    wp_cache_delete('flexframe_spinner_color', 'options');
    wp_cache_delete('flexframe_directional_color', 'options');
    wp_cache_delete('flexframe_particles_color', 'options');
    wp_cache_delete('alloptions', 'options'); // Clear all options cache
    
    // Clear all WordPress caches
    if (function_exists('wp_cache_flush')) {
        wp_cache_flush();
    }
    
    // Clear SiteGround cache if available
    if (function_exists('sg_cachepress_purge_cache')) {
        sg_cachepress_purge_cache();
    }
    
    // Clear WP Super Cache if available
    if (function_exists('wp_cache_clear_cache')) {
        wp_cache_clear_cache();
    }
    
    // Clear W3 Total Cache if available
    if (function_exists('w3tc_flush_all')) {
        w3tc_flush_all();
    }
    
    // Set a transient to force CSS regeneration
    set_transient('flexframe_force_css_regeneration', true, 10);
    
    // Log the update
    flexframe_log('Primary color updated via Theme Editor', ['color' => $primary_color, 'mode' => 'custom']);
    
    // Verify the saved value by reading it back (after cache clear)
    $saved_color = get_option('flexframe_primary_color');
    $saved_mode = get_option('flexframe_primary_color_mode');
    
    wp_send_json_success([
        'message' => 'Primary color saved successfully',
        'color' => $primary_color,
        'saved_color' => $saved_color,
        'saved_mode' => $saved_mode
    ]);
}
add_action('wp_ajax_flexframe_save_primary_color', 'flexframe_save_primary_color');

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
    
    // Convert HTTP to HTTPS to prevent mixed content warnings
    if (!empty($logo_url) && strpos($logo_url, 'http://') === 0) {
        $logo_url = str_replace('http://', 'https://', $logo_url);
    }
    
    ?>
    <div id="flexframe-viewer-container" style="width: <?php echo esc_attr($atts['width']); ?>; height: <?php echo esc_attr($atts['height']); ?>; position: relative; overflow: hidden; border-radius: 0 !important;">
        <!-- Model Loader -->
        <div id="model-loader" class="model-loader" style="display: none;">
            <?php if ($use_logo_loader && !empty($logo_url)) : ?>
                <!-- Logo Loader with Progress -->
                <div class="logo-loader-wrapper">
                    <div class="logo-loader-container" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: <?php echo esc_attr($logo_loader_size); ?>px;">
                        <img src="<?php echo esc_url($logo_url); ?>" alt="Loading" class="logo-loader-img <?php echo esc_attr($logo_loader_animation); ?>" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: auto;" />
                    </div>
                    <!-- Progress bar under logo -->
                    <div class="logo-progress-bar-container">
                        <div class="logo-progress-bar" id="logo-progress-bar"></div>
                    </div>
                    <div class="logo-progress-text" id="logo-progress-text">0%</div>
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
            <div class="menu-hint-tab">
                <!-- Dumbbell/Fitness Icon -->
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                </svg>
            </div>
            
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
                    <div class="search-content-wrapper">
                        <div class="search-filters-panel" id="searchFiltersPanel">
                            <div class="filter-section">
                                <div class="filter-section-header">
                                    <div class="filter-title">Type</div>
                                </div>
                                <div class="filter-options" id="typeFilters"></div>
                            </div>
                            <div class="filter-section">
                                <div class="filter-section-header">
                                    <div class="filter-title">Muscles</div>
                                    <button class="filter-clear-btn" id="clearMuscleFilters">Clear</button>
                                </div>
                                <div class="filter-options" id="muscleFilters"></div>
                            </div>
                            <div class="filter-section">
                                <div class="filter-section-header">
                                    <div class="filter-title">Equipment</div>
                                    <button class="filter-clear-btn" id="clearEquipmentFilters">Clear</button>
                                </div>
                                <div class="filter-options" id="equipmentFilters"></div>
                            </div>
                        </div>
                        <div class="search-results-panel">
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
                <!-- Mobile close button for search dropdown -->
                <button class="search-close-btn-mobile" id="searchCloseBtnMobile" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Right Side Menu System -->
        <div class="thumbnail-grid-container-right">
            <div class="menu-hint-tab-right">
                <!-- Information Icon -->
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
            </div>
            
            <!-- Desktop: 4 separate buttons (hidden on mobile) -->
            <!-- Info1 Menu -->
            <div class="thumbnail-menu-wrapper desktop-only">
                <button class="thumbnail-menu-toggle" id="info1Toggle">
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
            <div class="thumbnail-menu-wrapper desktop-only">
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
            <div class="thumbnail-menu-wrapper desktop-only">
                <button class="thumbnail-menu-toggle" id="info3Toggle">
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
            <div class="thumbnail-menu-wrapper desktop-only">
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
            
            <!-- Mobile: Single consolidated button (hidden on desktop) -->
            <div class="thumbnail-menu-wrapper mobile-only">
                <button class="thumbnail-menu-toggle" id="infoToggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" style="fill: #ffffff !important;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#ffffff" style="fill: #ffffff !important;"/></svg>
                    <span>Exercise Info</span>
                </button>
                <div class="thumbnail-dropdown-right" id="infoDropdown">
                    <div class="thumbnail-scroll-controls">
                        <button class="scroll-btn" id="infoScrollUp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg></button>
                        <button class="scroll-btn" id="infoScrollDown"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></button>
                    </div>
                    <div class="thumbnail-scroll-container" id="infoContainer">
                        <div class="thumbnail-grid" id="infoGrid"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Canvas element -->
        <canvas class="webgl"></canvas>
        
        <!-- Fullscreen Button -->
        <button id="fullscreen-btn" class="fullscreen-btn" title="Toggle Fullscreen">
            <svg class="fullscreen-enter-icon" viewBox="0 0 24 24" width="18" height="18">
                <!-- Expand icon -->
                <path fill="white" d="M5 5h5v2H7v3H5V5zm14 0v5h-2V7h-3V5h5zM5 19v-5h2v3h3v2H5zm14 0h-5v-2h3v-3h2v5z"/>
            </svg>
            <svg class="fullscreen-exit-icon" viewBox="0 0 24 24" width="18" height="18" style="display: none;">
                <!-- Contract icon -->
                <path fill="white" d="M10 10H5V8h3V5h2v5zm4 0V5h2v3h3v2h-5zM10 14v5H8v-3H5v-2h5zm9 0v2h-3v3h-2v-5h5z"/>
            </svg>
        </button>
        
        <?php
        // Background Logo Watermark (CSS Overlay)
        $bg_logo_enabled = get_option('flexframe_bg_logo_enabled', false);
        $bg_logo_size = absint(get_option('flexframe_bg_logo_size', 150));
        $bg_logo_opacity = floatval(get_option('flexframe_bg_logo_opacity', 0.5));
        $bg_logo_pos_x = absint(get_option('flexframe_bg_logo_pos_x', 50));
        $bg_logo_pos_y = absint(get_option('flexframe_bg_logo_pos_y', 90));
        // Convert from "% from bottom" to CSS top value
        $bg_logo_pos_y_css = 100 - $bg_logo_pos_y;
        
        if ($bg_logo_enabled && !empty($logo_url)) :
        ?>
        <!-- Logo Watermark Overlay -->
        <div class="flexframe-bg-watermark" style="
            position: absolute;
            top: <?php echo esc_attr($bg_logo_pos_y_css); ?>%;
            left: <?php echo esc_attr($bg_logo_pos_x); ?>%;
            transform: translate(-50%, -50%);
            width: <?php echo esc_attr($bg_logo_size); ?>px;
            height: auto;
            opacity: <?php echo esc_attr($bg_logo_opacity); ?>;
            pointer-events: none;
            z-index: 1;
            user-select: none;
            -webkit-user-drag: none;
        ">
            <img src="<?php echo esc_url($logo_url); ?>" alt="" style="
                width: 100%;
                height: auto;
                pointer-events: none;
                user-select: none;
                -webkit-user-drag: none;
            " draggable="false" />
        </div>
        <?php endif; ?>
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
    add_option('flexframe_logo_border_enabled', false);
    add_option('flexframe_logo_border_size', 2);
    add_option('flexframe_logo_display_size', 100);
    
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












