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
    // Primary color mode: 'default' or 'custom'
    register_setting('flexframe_settings_group', 'flexframe_primary_color_mode', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'default'
    ));
    
    // Primary brand color (COLOR_1 material) - only used when mode is 'custom'
    register_setting('flexframe_settings_group', 'flexframe_primary_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ff0000'
    ));
    
    register_setting('flexframe_settings_group', 'flexframe_logo_url');
    register_setting('flexframe_settings_group', 'flexframe_logo_threshold');
    
    // Material mode: 'preset' or 'custom'
    register_setting('flexframe_settings_group', 'flexframe_material_mode', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'preset'
    ));
    
    // Preset selection - default to preset1 (Glass Skin)
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
    $primary_color_mode = get_option('flexframe_primary_color_mode', 'default');
    $primary_color = get_option('flexframe_primary_color', '#ff0000');
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
                
                <div class="flexframe-step-section">
                    <div class="flexframe-step-header">
                        <span class="step-number">1</span>
                        <h2><?php _e('Select Your Primary Brand Color', 'flexframe-viewer'); ?></h2>
                    </div>
                    <div class="flexframe-step-content">
                        <p class="step-description">
                            <?php _e('Choose your main brand color. This will be applied to accent elements like bumper plates, kettlebells, and trim colors on machines — helping the 3D models match your gym\'s branding.', 'flexframe-viewer'); ?>
                        </p>
                        <div class="flexframe-color-picker">
                            <input type="color" id="flexframe_primary_color" name="flexframe_primary_color" value="<?php echo esc_attr($primary_color); ?>" />
                            <span class="color-hex-display"><?php echo esc_html($primary_color); ?></span>
                            <span class="color-label"><?php _e('Primary Brand Color', 'flexframe-viewer'); ?></span>
                        </div>
                    </div>
                </div>
                
                <div class="flexframe-step-section">
                    <div class="flexframe-step-header">
                        <span class="step-number">2</span>
                        <h2><?php _e('Upload Your Logo', 'flexframe-viewer'); ?></h2>
                    </div>
                    <div class="flexframe-step-content">
                        <p class="step-description">
                            <?php _e('Upload a PNG logo with a transparent background. This logo will automatically appear on equipment pads, machine displays, and other branded surfaces in your 3D models.', 'flexframe-viewer'); ?>
                        </p>
                        <div class="flexframe-logo-upload">
                            <input 
                                type="text" 
                                id="flexframe_logo_url" 
                                name="flexframe_logo_url" 
                                value="<?php echo esc_attr($logo_url); ?>" 
                                class="regular-text"
                                readonly
                                placeholder="<?php _e('No logo selected', 'flexframe-viewer'); ?>"
                            />
                            <div class="flexframe-logo-buttons">
                                <button type="button" class="button button-primary" id="flexframe_upload_logo_button">
                                    <?php _e('Upload Logo', 'flexframe-viewer'); ?>
                                </button>
                                <button type="button" class="button" id="flexframe_remove_logo_button" <?php echo empty($logo_url) ? 'style="display:none;"' : ''; ?>>
                                    <?php _e('Remove', 'flexframe-viewer'); ?>
                                </button>
                            </div>
                            
                            <?php if (!empty($logo_url)) : ?>
                                <div class="flexframe-logo-preview" id="flexframe_logo_preview">
                                    <img src="<?php echo esc_url($logo_url); ?>" alt="Logo Preview">
                                </div>
                            <?php else : ?>
                                <div class="flexframe-logo-preview" id="flexframe_logo_preview" style="display:none;"></div>
                            <?php endif; ?>
                        </div>
                        
                        <div class="flexframe-advanced-toggle">
                            <button type="button" class="button-link" id="toggle-logo-advanced">
                                <?php _e('▶ Advanced Logo Settings', 'flexframe-viewer'); ?>
                            </button>
                        </div>
                        <div class="flexframe-advanced-settings" id="logo-advanced-settings" style="display:none;">
                            <div class="flexframe-setting-row">
                                <label for="flexframe_logo_threshold"><?php _e('Edge Threshold', 'flexframe-viewer'); ?></label>
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
                                <p class="description inline-desc">
                                    <?php _e('Adjust to fix white fringe around transparent edges (0-1). Default: 0.95', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flexframe-step-section">
                    <div class="flexframe-step-header">
                        <span class="step-number">3</span>
                        <h2><?php _e('Select a Theme', 'flexframe-viewer'); ?></h2>
                    </div>
                    <div class="flexframe-step-content">
                        <p class="step-description">
                            <?php _e('Choose how the anatomical skin layer appears on your 3D models. Select a preset for quick setup, or use custom settings for full control over the material appearance.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <div class="flexframe-theme-selector">
                            <label class="theme-option <?php echo $material_mode === 'preset' ? 'selected' : ''; ?>">
                                <input type="radio" name="flexframe_material_mode" value="preset" <?php checked($material_mode, 'preset'); ?> />
                                <span class="theme-card">
                                    <span class="theme-icon">🎨</span>
                                    <span class="theme-title"><?php _e('Use a Preset Theme', 'flexframe-viewer'); ?></span>
                                    <span class="theme-desc"><?php _e('Quick setup with pre-configured materials', 'flexframe-viewer'); ?></span>
                                </span>
                            </label>
                            
                            <label class="theme-option <?php echo $material_mode === 'custom' ? 'selected' : ''; ?>">
                                <input type="radio" name="flexframe_material_mode" value="custom" <?php checked($material_mode, 'custom'); ?> />
                                <span class="theme-card">
                                    <span class="theme-icon">⚙️</span>
                                    <span class="theme-title"><?php _e('Custom Theme', 'flexframe-viewer'); ?></span>
                                    <span class="theme-desc"><?php _e('Full control over skin material settings', 'flexframe-viewer'); ?></span>
                                </span>
                            </label>
                        </div>
                        
                        <!-- Preset Dropdown (shown when mode = preset) -->
                        <div class="flexframe-preset-panel" <?php echo $material_mode !== 'preset' ? 'style="display:none;"' : ''; ?>>
                            <label for="flexframe_material_preset"><?php _e('Select Preset:', 'flexframe-viewer'); ?></label>
                            <select 
                                id="flexframe_material_preset" 
                                name="flexframe_material_preset"
                                class="regular-text"
                            >
                                <option value="none" <?php selected($material_preset, 'none'); ?>>
                                    <?php _e('None - Use model defaults', 'flexframe-viewer'); ?>
                                </option>
                                <option value="preset1" <?php selected($material_preset, 'preset1'); ?>>
                                    <?php _e('Glass Skin - Refraction effect', 'flexframe-viewer'); ?>
                                </option>
                                <option value="wp_preset" <?php selected($material_preset, 'wp_preset'); ?>>
                                    <?php _e('Translucent Blue - Soft anatomical view', 'flexframe-viewer'); ?>
                                </option>
                            </select>
                        </div>
                        
                        <!-- Custom Settings Panel (shown when mode = custom) -->
                        <div class="flexframe-custom-panel" <?php echo $material_mode !== 'custom' ? 'style="display:none;"' : ''; ?>>
                            <h4><?php _e('Custom Skin Material Settings', 'flexframe-viewer'); ?></h4>
                            <div class="flexframe-custom-settings">
                                <!-- Color -->
                                <div class="flexframe-setting-row">
                                    <label for="flexframe_skin_color"><?php _e('Skin Color', 'flexframe-viewer'); ?></label>
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
                                    <label for="flexframe_skin_env_intensity"><?php _e('Environment Intensity', 'flexframe-viewer'); ?></label>
                                    <input type="range" id="flexframe_skin_env_intensity" name="flexframe_skin_env_intensity" value="<?php echo esc_attr($skin_env_intensity); ?>" min="0" max="5" step="0.01" />
                                    <span class="range-value"><?php echo esc_html($skin_env_intensity); ?></span>
                                </div>
                                
                                <p class="description">
                                    <?php _e('💡 Tip: Set Transmission to 1 for a glass-like refraction effect that lets you see the muscles beneath.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
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
            max-width: 900px;
        }
        
        /* Step sections */
        .flexframe-step-section {
            background: #fff;
            border: 1px solid #c3c4c7;
            border-radius: 8px;
            margin-bottom: 24px;
            overflow: hidden;
        }
        .flexframe-step-header {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 20px;
            background: linear-gradient(135deg, #f6f7f7 0%, #fff 100%);
            border-bottom: 1px solid #e2e4e7;
        }
        .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: #2271b1;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            border-radius: 50%;
        }
        .flexframe-step-header h2 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #1d2327;
        }
        .flexframe-step-content {
            padding: 20px;
        }
        .step-description {
            color: #646970;
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 20px 0;
            max-width: 700px;
        }
        
        /* Primary color picker */
        .flexframe-color-picker {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: #f9f9f9;
            border-radius: 6px;
            max-width: 400px;
        }
        .flexframe-color-picker input[type="color"] {
            width: 60px;
            height: 40px;
            padding: 0;
            border: 2px solid #ddd;
            border-radius: 6px;
            cursor: pointer;
        }
        .flexframe-color-picker .color-hex-display {
            font-family: monospace;
            font-size: 16px;
            color: #1d2327;
            background: #fff;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .flexframe-color-picker .color-label {
            color: #646970;
            font-size: 13px;
        }
        
        /* Logo upload */
        .flexframe-logo-upload {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .flexframe-logo-upload input[type="text"] {
            max-width: 400px;
            background: #f9f9f9;
        }
        .flexframe-logo-buttons {
            display: flex;
            gap: 8px;
        }
        .flexframe-logo-preview {
            margin-top: 8px;
        }
        .flexframe-logo-preview img {
            max-width: 200px;
            max-height: 200px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 8px;
            background: #f9f9f9;
        }
        
        /* Advanced toggle */
        .flexframe-advanced-toggle {
            margin-top: 16px;
        }
        .flexframe-advanced-toggle .button-link {
            color: #2271b1;
            font-size: 13px;
        }
        .flexframe-advanced-settings {
            margin-top: 12px;
            padding: 16px;
            background: #f9f9f9;
            border-radius: 6px;
        }
        
        /* Theme selector cards */
        .flexframe-theme-selector {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
        }
        .theme-option {
            flex: 1;
            max-width: 280px;
            cursor: pointer;
        }
        .theme-option input[type="radio"] {
            display: none;
        }
        .theme-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: #f9f9f9;
            border: 2px solid #ddd;
            border-radius: 8px;
            text-align: center;
            transition: all 0.2s ease;
        }
        .theme-option:hover .theme-card {
            border-color: #2271b1;
            background: #f0f6fc;
        }
        .theme-option.selected .theme-card,
        .theme-option input:checked + .theme-card {
            border-color: #2271b1;
            background: #f0f6fc;
            box-shadow: 0 0 0 1px #2271b1;
        }
        .theme-icon {
            font-size: 32px;
            margin-bottom: 12px;
        }
        .theme-title {
            font-size: 15px;
            font-weight: 600;
            color: #1d2327;
            margin-bottom: 6px;
        }
        .theme-desc {
            font-size: 12px;
            color: #646970;
        }
        
        /* Preset/Custom panels */
        .flexframe-preset-panel,
        .flexframe-custom-panel {
            padding: 16px 20px;
            background: #f9f9f9;
            border-radius: 6px;
            margin-top: 8px;
        }
        .flexframe-preset-panel label {
            font-weight: 500;
            margin-right: 12px;
        }
        .flexframe-custom-panel h4 {
            margin: 0 0 16px 0;
            font-size: 14px;
            color: #1d2327;
        }
        
        /* Custom settings panel styles */
        .flexframe-custom-settings {
            display: grid;
            gap: 12px;
        }
        .flexframe-setting-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .flexframe-setting-row label {
            min-width: 160px;
            font-weight: 500;
            color: #1d2327;
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
            border-radius: 4px;
            cursor: pointer;
        }
        .flexframe-setting-row .range-value,
        .flexframe-setting-row .color-hex {
            min-width: 60px;
            font-family: monospace;
            color: #646970;
            font-size: 13px;
        }
        .flexframe-custom-settings .description {
            grid-column: 1 / -1;
            margin-top: 8px;
            padding: 12px;
            background: #fff8e5;
            border-radius: 4px;
            color: #826200;
        }
        
        .inline-desc {
            display: inline;
            margin-left: 8px;
        }
        
        /* Instructions box */
        .flexframe-instructions {
            background: #fff;
            border: 1px solid #c3c4c7;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
        }
        .flexframe-instructions h2 {
            margin-top: 0;
        }
        .flexframe-instructions code {
            background: #f0f0f1;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 13px;
        }
    </style>
    
    <script>
    jQuery(document).ready(function($) {
        // Toggle preset/custom panels
        $('input[name="flexframe_material_mode"]').on('change', function() {
            var mode = $(this).val();
            
            // Update card selection
            $('.theme-option').removeClass('selected');
            $(this).closest('.theme-option').addClass('selected');
            
            if (mode === 'preset') {
                $('.flexframe-preset-panel').slideDown(200);
                $('.flexframe-custom-panel').slideUp(200);
            } else {
                $('.flexframe-preset-panel').slideUp(200);
                $('.flexframe-custom-panel').slideDown(200);
            }
        });
        
        // Toggle advanced logo settings
        $('#toggle-logo-advanced').on('click', function() {
            var $settings = $('#logo-advanced-settings');
            var $btn = $(this);
            
            if ($settings.is(':visible')) {
                $settings.slideUp(200);
                $btn.html('▶ Advanced Logo Settings');
            } else {
                $settings.slideDown(200);
                $btn.html('▼ Advanced Logo Settings');
            }
        });
        
        // Update range value displays
        $('input[type="range"]').on('input', function() {
            $(this).siblings('.range-value').text($(this).val());
        });
        
        // Update color hex display
        $('input[type="color"]').on('input', function() {
            $(this).siblings('.color-hex').text($(this).val());
            $(this).siblings('.color-hex-display').text($(this).val());
        });
    });
    </script>
    <?php
}
