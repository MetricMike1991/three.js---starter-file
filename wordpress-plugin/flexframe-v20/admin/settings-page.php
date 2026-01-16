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
    
    // Material mode: 'preset' or 'custom'
    register_setting('flexframe_settings_group', 'flexframe_material_mode', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'preset'
    ));
    
    // Preset selection
    register_setting('flexframe_settings_group', 'flexframe_material_preset', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'preset1'
    ));
    
    // Custom SKIN settings
    register_setting('flexframe_settings_group', 'flexframe_skin_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ccdef5'
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_roughness', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_metalness', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_transmission', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_thickness', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_ior', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
    ));
    register_setting('flexframe_settings_group', 'flexframe_skin_env_intensity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 2.29
    ));
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
    $material_mode = get_option('flexframe_material_mode', 'preset');
    $material_preset = get_option('flexframe_material_preset', 'preset1');
    
    // Custom SKIN settings
    $skin_color = get_option('flexframe_skin_color', '#ccdef5');
    $skin_opacity = get_option('flexframe_skin_opacity', 1);
    $skin_roughness = get_option('flexframe_skin_roughness', 0);
    $skin_metalness = get_option('flexframe_skin_metalness', 0);
    $skin_transmission = get_option('flexframe_skin_transmission', 1);
    $skin_thickness = get_option('flexframe_skin_thickness', 0);
    $skin_ior = get_option('flexframe_skin_ior', 1);
    $skin_env_intensity = get_option('flexframe_skin_env_intensity', 2.29);
    
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
                    
                    <!-- Material Settings Mode Section -->
                    <tr>
                        <th scope="row">
                            <label><?php _e('SKIN Material Settings', 'flexframe-viewer'); ?></label>
                        </th>
                        <td>
                            <fieldset>
                                <label>
                                    <input type="radio" name="flexframe_material_mode" value="preset" <?php checked($material_mode, 'preset'); ?> />
                                    <?php _e('Use Preset', 'flexframe-viewer'); ?>
                                </label>
                                <br>
                                <label>
                                    <input type="radio" name="flexframe_material_mode" value="custom" <?php checked($material_mode, 'custom'); ?> />
                                    <?php _e('Custom Settings', 'flexframe-viewer'); ?>
                                </label>
                            </fieldset>
                        </td>
                    </tr>
                    
                    <!-- Preset Dropdown (shown when mode = preset) -->
                    <tr class="flexframe-preset-row" <?php echo $material_mode !== 'preset' ? 'style="display:none;"' : ''; ?>>
                        <th scope="row">
                            <label for="flexframe_material_preset"><?php _e('Select Preset', 'flexframe-viewer'); ?></label>
                        </th>
                        <td>
                            <select 
                                id="flexframe_material_preset" 
                                name="flexframe_material_preset"
                                class="regular-text"
                            >
                                <option value="none" <?php selected($material_preset, 'none'); ?>>
                                    <?php _e('None - Use model defaults', 'flexframe-viewer'); ?>
                                </option>
                                <option value="preset1" <?php selected($material_preset, 'preset1'); ?>>
                                    <?php _e('Preset 1 - Refraction Skin', 'flexframe-viewer'); ?>
                                </option>
                                <option value="wp_preset" <?php selected($material_preset, 'wp_preset'); ?>>
                                    <?php _e('WP Preset - Translucent Blue', 'flexframe-viewer'); ?>
                                </option>
                            </select>
                            <p class="description">
                                <?php _e('Select a material preset to automatically apply to SKIN materials when models load.', 'flexframe-viewer'); ?>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Custom Settings Panel (shown when mode = custom) -->
                    <tr class="flexframe-custom-row" <?php echo $material_mode !== 'custom' ? 'style="display:none;"' : ''; ?>>
                        <th scope="row">
                            <label><?php _e('Custom SKIN Settings', 'flexframe-viewer'); ?></label>
                        </th>
                        <td>
                            <div class="flexframe-custom-settings">
                                <!-- Color -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_color"><?php _e('Color', 'flexframe-viewer'); ?></label>
                                    <input type="color" id="flexframe_skin_color" name="flexframe_skin_color" value="<?php echo esc_attr($skin_color); ?>" />
                                    <span class="color-hex"><?php echo esc_html($skin_color); ?></span>
                                </div>
                                
                                <!-- Opacity -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_opacity"><?php _e('Opacity', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_opacity" name="flexframe_skin_opacity" value="<?php echo esc_attr($skin_opacity); ?>" min="0" max="1" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_opacity); ?></span>
                                </div>
                                
                                <!-- Roughness -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_roughness"><?php _e('Roughness', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_roughness" name="flexframe_skin_roughness" value="<?php echo esc_attr($skin_roughness); ?>" min="0" max="1" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_roughness); ?></span>
                                </div>
                                
                                <!-- Metalness -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_metalness"><?php _e('Metalness', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_metalness" name="flexframe_skin_metalness" value="<?php echo esc_attr($skin_metalness); ?>" min="0" max="1" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_metalness); ?></span>
                                </div>
                                
                                <!-- Transmission -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_transmission"><?php _e('Transmission (Glass)', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_transmission" name="flexframe_skin_transmission" value="<?php echo esc_attr($skin_transmission); ?>" min="0" max="1" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_transmission); ?></span>
                                </div>
                                
                                <!-- Thickness -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_thickness"><?php _e('Thickness', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_thickness" name="flexframe_skin_thickness" value="<?php echo esc_attr($skin_thickness); ?>" min="0" max="10" step="0.1" />
                                    <span class="range-value"><?php echo esc_html($skin_thickness); ?></span>
                                </div>
                                
                                <!-- IOR -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_ior"><?php _e('IOR (Refraction)', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_ior" name="flexframe_skin_ior" value="<?php echo esc_attr($skin_ior); ?>" min="1" max="2.33" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_ior); ?></span>
                                </div>
                                
                                <!-- Env Map Intensity -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_env_intensity"><?php _e('Env Map Intensity', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_env_intensity" name="flexframe_skin_env_intensity" value="<?php echo esc_attr($skin_env_intensity); ?>" min="0" max="5" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_env_intensity); ?></span>
                                </div>
                                
                                <p class="description">
                                    <?php _e('These settings will be applied to SKIN materials when models load. Tip: Transmission=1 gives glass-like refraction effect.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
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
        
        /* Custom settings panel styles */
        .flexframe-custom-settings {
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            max-width: 500px;
        }
        .flexframe-setting-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            gap: 10px;
        }
        .flexframe-setting-row label {
            min-width: 140px;
            font-weight: 500;
        }
        .flexframe-setting-row input[type="range"] {
            flex: 1;
            max-width: 200px;
        }
        .flexframe-setting-row input[type="color"] {
            width: 50px;
            height: 30px;
            padding: 0;
            border: 1px solid #ddd;
            cursor: pointer;
        }
        .flexframe-setting-row .range-value,
        .flexframe-setting-row .color-hex {
            min-width: 60px;
            font-family: monospace;
            color: #666;
        }
        
        /* Mode toggle styling */
        fieldset label {
            display: inline-block;
            margin-bottom: 5px;
        }
    </style>
    
    <script>
    jQuery(document).ready(function($) {
        // Toggle preset/custom panels
        $('input[name="flexframe_material_mode"]').on('change', function() {
            var mode = $(this).val();
            if (mode === 'preset') {
                $('.flexframe-preset-row').show();
                $('.flexframe-custom-row').hide();
            } else {
                $('.flexframe-preset-row').hide();
                $('.flexframe-custom-row').show();
            }
        });
        
        // Update range value displays
        $('input[type="range"]').on('input', function() {
            $(this).siblings('.range-value').text($(this).val());
        });
        
        // Update color hex display
        $('input[type="color"]').on('input', function() {
            $(this).siblings('.color-hex').text($(this).val());
        });
    });
    </script>
    <?php
}
