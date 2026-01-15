<?php
/**
 * Plugin Name: FlexFrame Exercise Viewer
 * Plugin URI: https://flexframe.com
 * Description: 3D interactive exercise viewer with customizable logo and materials
 * Version: 1.0.0
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

// Define plugin constants
define('FLEXFRAME_VERSION', '1.0.0');
define('FLEXFRAME_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLEXFRAME_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include admin settings
require_once FLEXFRAME_PLUGIN_DIR . 'admin/settings-page.php';

/**
 * Enqueue plugin assets
 */
function flexframe_enqueue_assets() {
    // Only load on pages with the shortcode
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'flexframe_viewer')) {
        
        // Enqueue CSS
        wp_enqueue_style(
            'flexframe-viewer-style',
            FLEXFRAME_PLUGIN_URL . 'assets/css/style.css',
            array(),
            FLEXFRAME_VERSION
        );
        
        // Enqueue JavaScript bundle
        wp_enqueue_script(
            'flexframe-viewer-script',
            FLEXFRAME_PLUGIN_URL . 'assets/js/main.bundle.js',
            array(),
            FLEXFRAME_VERSION,
            true
        );
        
        // Pass WordPress settings to JavaScript
        $logo_url = get_option('flexframe_logo_url', '');
        $logo_threshold = get_option('flexframe_logo_threshold', 0.95);
        
        wp_localize_script('flexframe-viewer-script', 'flexframeSettings', array(
            'logoUrl' => $logo_url,
            'logoThreshold' => $logo_threshold,
            'pluginUrl' => FLEXFRAME_PLUGIN_URL
        ));
    }
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_assets');

/**
 * Register shortcode [flexframe_viewer]
 */
function flexframe_viewer_shortcode($atts) {
    // Parse shortcode attributes
    $atts = shortcode_atts(array(
        'height' => '100vh',
        'width' => '100%'
    ), $atts);
    
    ob_start();
    ?>
    <div id="flexframe-viewer-container" style="width: <?php echo esc_attr($atts['width']); ?>; height: <?php echo esc_attr($atts['height']); ?>;">
        <!-- Model Loader Spinner -->
        <div id="model-loader" class="model-loader" style="display: none;">
            <div class="spinner-container">
                <!-- Gradient spinner (default) -->
                <div class="spinner-box" data-spinner="gradient">
                    <div class="configure-border-1">  
                        <div class="configure-core"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Canvas element -->
        <canvas class="webgl"></canvas>
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
}
register_activation_hook(__FILE__, 'flexframe_activate');

/**
 * Plugin deactivation
 */
function flexframe_deactivate() {
    // Cleanup if needed
}
register_deactivation_hook(__FILE__, 'flexframe_deactivate');
