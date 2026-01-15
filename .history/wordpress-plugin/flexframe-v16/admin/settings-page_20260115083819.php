<?php
/**
 * FlexFrame Admin Settings Page
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add admin menu
 */
function flexframe_add_admin_menu() {
    add_menu_page(
        __('FlexFrame Settings', 'flexframe-viewer'),
        __('FlexFrame', 'flexframe-viewer'),
        'manage_options',
        'flexframe-settings',
        'flexframe_settings_page',
        'dashicons-video-alt3',
        30
    );
}
add_action('admin_menu', 'flexframe_add_admin_menu');

/**
 * Register settings
 */
function flexframe_register_settings() {
    register_setting('flexframe_settings_group', 'flexframe_logo_url');
    register_setting('flexframe_settings_group', 'flexframe_logo_threshold');
    register_setting('flexframe_settings_group', 'flexframe_wp_skin_preset');
}
add_action('admin_init', 'flexframe_register_settings');

/**
 * Enqueue admin assets
 */
function flexframe_enqueue_admin_assets($hook) {
    if ($hook !== 'toplevel_page_flexframe-settings') {
        return;
    }
    
    // Enqueue WordPress media library
    wp_enqueue_media();
    
    // Enqueue custom admin script
    wp_enqueue_script(
        'flexframe-admin-script',
        FLEXFRAME_PLUGIN_URL . 'admin/admin-script.js',
        array('jquery'),
        FLEXFRAME_VERSION,
        true
    );
    
    // Enqueue admin styles
    wp_enqueue_style(
        'flexframe-admin-style',
        FLEXFRAME_PLUGIN_URL . 'admin/admin-style.css',
        array(),
        FLEXFRAME_VERSION
    );
}
add_action('admin_enqueue_scripts', 'flexframe_enqueue_admin_assets');

/**
 * Settings page HTML
 */
function flexframe_settings_page() {
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Get current values
    $logo_url = get_option('flexframe_logo_url', '');
    $logo_threshold = get_option('flexframe_logo_threshold', 0.95);
    $wp_skin_preset = get_option('flexframe_wp_skin_preset', false);
    
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        
        <div class="flexframe-settings-container">
            <form method="post" action="options.php">
                <?php
                settings_fields('flexframe_settings_group');
                do_settings_sections('flexframe_settings_group');
                ?>
                
                <table class="form-table">
                    <!-- Logo Upload Section -->
                    <tr>
                        <th scope="row">
                            <label for="flexframe_logo_url"><?php _e('Global Logo', 'flexframe-viewer'); ?></label>
                        </th>
                        <td>
                            <div class="flexframe-logo-upload">
                                <input 
                                    type="text" 
                                    id="flexframe_logo_url" 
                                    name="flexframe_logo_url" 
                                    value="<?php echo esc_attr($logo_url); ?>" 
                                    class="regular-text"
                                    readonly
                                />
                                <button type="button" class="button" id="flexframe_upload_logo_button">
                                    <?php _e('Upload Logo', 'flexframe-viewer'); ?>
                                </button>
                                <button type="button" class="button" id="flexframe_remove_logo_button" <?php echo empty($logo_url) ? 'style="display:none;"' : ''; ?>>
                                    <?php _e('Remove', 'flexframe-viewer'); ?>
                                </button>
                                
                                <?php if (!empty($logo_url)) : ?>
                                    <div class="flexframe-logo-preview" id="flexframe_logo_preview">
                                        <img src="<?php echo esc_url($logo_url); ?>" alt="Logo Preview" style="max-width: 200px; max-height: 200px; margin-top: 10px;">
                                    </div>
                                <?php else : ?>
                                    <div class="flexframe-logo-preview" id="flexframe_logo_preview" style="display:none;"></div>
                                <?php endif; ?>
                                
                                <p class="description">
                                    <?php _e('Upload a PNG logo with transparency. This will be applied to all LOGO materials in your 3D models.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Edge Threshold Section -->
                    <tr>
                        <th scope="row">
                            <label for="flexframe_logo_threshold"><?php _e('Logo Edge Threshold', 'flexframe-viewer'); ?></label>
                        </th>
                        <td>
                            <input 
                                type="number" 
                                id="flexframe_logo_threshold" 
                                name="flexframe_logo_threshold" 
                                value="<?php echo esc_attr($logo_threshold); ?>" 
                                min="0" 
                                max="1" 
                                step="0.01"
                                class="small-text"
                            />
                            <p class="description">
                                <?php _e('Adjust this value (0-1) to fix white fringe around transparent logo edges. Default: 0.95', 'flexframe-viewer'); ?>
                            </p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
            
            <!-- Usage Instructions -->
            <div class="flexframe-instructions">
                <h2><?php _e('How to Use', 'flexframe-viewer'); ?></h2>
                <p><?php _e('Add the FlexFrame viewer to any page or post using the shortcode:', 'flexframe-viewer'); ?></p>
                <code>[flexframe_viewer]</code>
                
                <h3><?php _e('Shortcode Options:', 'flexframe-viewer'); ?></h3>
                <ul>
                    <li><code>[flexframe_viewer height="600px" width="100%"]</code></li>
                </ul>
            </div>
        </div>
    </div>
    
    <style>
        .flexframe-settings-container {
            max-width: 800px;
        }
        .flexframe-logo-upload {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .flexframe-logo-upload input {
            max-width: 400px;
        }
        .flexframe-instructions {
            background: #fff;
            border: 1px solid #ccd0d4;
            padding: 20px;
            margin-top: 20px;
            border-radius: 4px;
        }
        .flexframe-instructions code {
            background: #f0f0f1;
            padding: 2px 6px;
            border-radius: 3px;
        }
    </style>
    <?php
}
