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
 * AJAX handler to create the Exercise Viewer page
 */
function flexframe_create_viewer_page() {
    // Security check
    check_ajax_referer('flexframe_create_page', 'nonce');
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }
    
    // Check if page already exists
    $existing_page = get_page_by_path('exercise-viewer');
    if ($existing_page) {
        // Update the existing page to use blank template
        flexframe_set_blank_template($existing_page->ID);
        
        $page_url = get_permalink($existing_page->ID);
        update_option('flexframe_viewer_page_url', $page_url);
        wp_send_json_success(array(
            'message' => 'Page already exists! Template updated.',
            'url' => $page_url,
            'page_id' => $existing_page->ID,
            'edit_url' => get_edit_post_link($existing_page->ID, 'raw')
        ));
    }
    
    // Create the page with minimal content (shortcode only)
    $page_data = array(
        'post_title'    => 'Exercise Viewer',
        'post_name'     => 'exercise-viewer',
        'post_content'  => '[flexframe_viewer]',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_author'   => get_current_user_id(),
    );
    
    $page_id = wp_insert_post($page_data);
    
    if (is_wp_error($page_id)) {
        wp_send_json_error(array('message' => $page_id->get_error_message()));
    }
    
    // Set blank/canvas template for the page
    flexframe_set_blank_template($page_id);
    
    // Save the page URL to settings
    $page_url = get_permalink($page_id);
    update_option('flexframe_viewer_page_url', $page_url);
    
    wp_send_json_success(array(
        'message' => 'Exercise Viewer page created successfully!',
        'url' => $page_url,
        'page_id' => $page_id,
        'edit_url' => get_edit_post_link($page_id, 'raw')
    ));
}
add_action('wp_ajax_flexframe_create_viewer_page', 'flexframe_create_viewer_page');

/**
 * Set a blank/canvas template for the page
 */
function flexframe_set_blank_template($page_id) {
    // Always mark this page as a FlexFrame viewer page for our custom CSS
    update_post_meta($page_id, '_flexframe_viewer_page', '1');
    
    // Try common blank template names used by popular themes
    $blank_templates = array(
        'blank',
        'canvas', 
        'blank-canvas',
        'template-blank.php',
        'template-canvas.php',
        'page-templates/blank.php',
        'page-templates/canvas.php',
        'templates/blank.php',
        'templates/canvas.php',
        'elementor_canvas',
        'elementor-canvas',
    );
    
    // Get available page templates
    $available_templates = get_page_templates();
    
    // Try to find a blank template
    foreach ($blank_templates as $template) {
        if (in_array($template, $available_templates) || array_key_exists($template, $available_templates)) {
            update_post_meta($page_id, '_wp_page_template', $template);
            return;
        }
        // Check values (some themes use different keys/values)
        foreach ($available_templates as $name => $file) {
            if (stripos($name, 'blank') !== false || stripos($name, 'canvas') !== false || 
                stripos($file, 'blank') !== false || stripos($file, 'canvas') !== false) {
                update_post_meta($page_id, '_wp_page_template', $file);
                return;
            }
        }
    }
    
    // For block themes, try to use the blank template
    if (wp_is_block_theme()) {
        update_post_meta($page_id, '_wp_page_template', 'blank');
    }
}

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
    
    // Hidden exercises - stored as JSON array of exercise IDs
    register_setting('flexframe_settings_group', 'flexframe_hidden_exercises', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '[]'
    ));
    
    // Viewer page URL for generating exercise deep links
    register_setting('flexframe_settings_group', 'flexframe_viewer_page_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // ========== UI Settings (Step 5) ==========
    
    // Loading Spinner
    register_setting('flexframe_settings_group', 'flexframe_spinner_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#4a9eff'
    ));
    
    // Animation Player Settings
    register_setting('flexframe_settings_group', 'flexframe_player_bg_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#000000'
    ));
    register_setting('flexframe_settings_group', 'flexframe_player_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.8
    ));
    register_setting('flexframe_settings_group', 'flexframe_player_button_bg_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ffffff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_player_button_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.1
    ));
    register_setting('flexframe_settings_group', 'flexframe_player_icon_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ffffff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_player_accent_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#00bcd4'
    ));
    register_setting('flexframe_settings_group', 'flexframe_player_always_visible', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'no'
    ));
    
    // Menu Settings
    register_setting('flexframe_settings_group', 'flexframe_menu_bg_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#000000'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.9
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_text_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ffffff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_accent_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#4a9eff'
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
    
    // Hidden exercises
    $hidden_exercises = get_option('flexframe_hidden_exercises', '[]');
    
    // Get current page URL for exercise deep links
    $current_page_url = home_url($_SERVER['REQUEST_URI']);
    // Try to get the page where shortcode is used (if set)
    $viewer_page_url = get_option('flexframe_viewer_page_url', '');
    if (empty($viewer_page_url)) {
        $viewer_page_url = home_url('/');
    }
    
    // UI Settings
    $spinner_color = get_option('flexframe_spinner_color', '#4a9eff');
    $player_bg_color = get_option('flexframe_player_bg_color', '#000000');
    $player_bg_opacity = get_option('flexframe_player_bg_opacity', 0.8);
    $player_button_bg_color = get_option('flexframe_player_button_bg_color', '#ffffff');
    $player_button_bg_opacity = get_option('flexframe_player_button_bg_opacity', 0.1);
    $player_icon_color = get_option('flexframe_player_icon_color', '#ffffff');
    $player_accent_color = get_option('flexframe_player_accent_color', '#00bcd4');
    $player_always_visible = get_option('flexframe_player_always_visible', 'no');
    $menu_bg_color = get_option('flexframe_menu_bg_color', '#000000');
    $menu_bg_opacity = get_option('flexframe_menu_bg_opacity', 0.9);
    $menu_text_color = get_option('flexframe_menu_text_color', '#ffffff');
    $menu_accent_color = get_option('flexframe_menu_accent_color', '#4a9eff');
    
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
                        
                        <div class="flexframe-color-mode-selector">
                            <label class="color-mode-option <?php echo $primary_color_mode === 'default' ? 'selected' : ''; ?>">
                                <input type="radio" name="flexframe_primary_color_mode" value="default" <?php checked($primary_color_mode, 'default'); ?> />
                                <span class="color-mode-card">
                                    <span class="color-mode-icon">🎨</span>
                                    <span class="color-mode-title"><?php _e('Use Default Color', 'flexframe-viewer'); ?></span>
                                    <span class="color-mode-desc"><?php _e('Uses primary color from the default theme selected in Step 3 below', 'flexframe-viewer'); ?></span>
                                </span>
                            </label>
                            
                            <label class="color-mode-option <?php echo $primary_color_mode === 'custom' ? 'selected' : ''; ?>">
                                <input type="radio" name="flexframe_primary_color_mode" value="custom" <?php checked($primary_color_mode, 'custom'); ?> />
                                <span class="color-mode-card">
                                    <span class="color-mode-icon">✏️</span>
                                    <span class="color-mode-title"><?php _e('Custom Brand Color', 'flexframe-viewer'); ?></span>
                                    <span class="color-mode-desc"><?php _e('Choose your own color to match your gym branding', 'flexframe-viewer'); ?></span>
                                </span>
                            </label>
                        </div>
                        
                        <div class="flexframe-custom-color-panel" <?php echo $primary_color_mode !== 'custom' ? 'style="display:none;"' : ''; ?>>
                            <div class="flexframe-color-picker">
                                <input type="color" id="flexframe_primary_color" name="flexframe_primary_color" value="<?php echo esc_attr($primary_color); ?>" />
                                <span class="color-hex-display"><?php echo esc_html($primary_color); ?></span>
                                <span class="color-label"><?php _e('Your Brand Color', 'flexframe-viewer'); ?></span>
                            </div>
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
                
                <div class="flexframe-step-section">
                    <div class="flexframe-step-header">
                        <span class="step-number">4</span>
                        <h2><?php _e('Exercise Library', 'flexframe-viewer'); ?></h2>
                    </div>
                    <div class="flexframe-step-content">
                        <p class="step-description">
                            <?php _e('Manage which exercises are visible in your viewer. Copy direct links to share specific exercises, or hide exercises you don\'t want your users to see.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <div class="flexframe-viewer-url-setting">
                            <div class="flexframe-create-page-row">
                                <button type="button" id="flexframe-create-viewer-page" class="button button-primary">
                                    <span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span>
                                    <?php _e('Create Exercise Viewer Page', 'flexframe-viewer'); ?>
                                </button>
                                <span id="flexframe-create-page-status" style="margin-left: 10px; line-height: 30px;"></span>
                            </div>
                            <p class="description" style="margin-top: 8px; margin-bottom: 16px;">
                                <?php _e('Click to automatically create a new page with the FlexFrame viewer shortcode.', 'flexframe-viewer'); ?>
                            </p>
                            
                            <label for="flexframe_viewer_page_url"><?php _e('Viewer Page URL:', 'flexframe-viewer'); ?></label>
                            <input type="url" id="flexframe_viewer_page_url" name="flexframe_viewer_page_url" 
                                   value="<?php echo esc_attr($viewer_page_url); ?>" 
                                   class="regular-text"
                                   placeholder="https://yoursite.com/exercise-viewer/" />
                            <p class="description">
                                <?php if (!empty($viewer_page_url)): ?>
                                    <span style="color: #00a32a;">✓ <?php _e('Viewer page URL is set.', 'flexframe-viewer'); ?></span>
                                    <a href="<?php echo esc_url($viewer_page_url); ?>" target="_blank" style="margin-left: 8px;"><?php _e('View Page →', 'flexframe-viewer'); ?></a>
                                <?php else: ?>
                                    <span style="color: #d63638;">⚠ <?php _e('No viewer page set. Click the button above to create one automatically.', 'flexframe-viewer'); ?></span>
                                <?php endif; ?>
                            </p>
                        </div>
                        
                        <div class="flexframe-exercise-library">
                            <div class="exercise-library-header">
                                <div class="exercise-search-box">
                                    <input type="text" id="exercise-search" placeholder="<?php _e('Search exercises...', 'flexframe-viewer'); ?>" />
                                </div>
                                <div class="exercise-bulk-actions">
                                    <button type="button" class="button" id="show-all-exercises"><?php _e('Show All', 'flexframe-viewer'); ?></button>
                                    <button type="button" class="button" id="hide-all-exercises"><?php _e('Hide All', 'flexframe-viewer'); ?></button>
                                </div>
                            </div>
                            
                            <div class="exercise-list-container">
                                <div id="exercise-list" class="exercise-list">
                                    <div class="exercise-loading">
                                        <span class="spinner is-active"></span>
                                        <?php _e('Loading exercises...', 'flexframe-viewer'); ?>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Hidden input to store the JSON array of hidden exercises -->
                            <input type="hidden" id="flexframe_hidden_exercises" name="flexframe_hidden_exercises" value="<?php echo esc_attr($hidden_exercises); ?>" />
                        </div>
                        
                        <p class="description" style="margin-top: 16px;">
                            <?php _e('💡 Tip: Use the direct links to share specific exercises on social media or in emails. Hidden exercises won\'t appear in the exercise menu for your users.', 'flexframe-viewer'); ?>
                        </p>
                    </div>
                </div>
                
                <!-- Step 5: UI Settings -->
                <div class="settings-step" id="step-5">
                    <div class="step-header">
                        <span class="step-number">5</span>
                        <h2><?php _e('UI Settings', 'flexframe-viewer'); ?></h2>
                    </div>
                    <div class="step-content">
                        <p class="step-description"><?php _e('Customize the appearance of the loading spinner, animation player controls, and menus.', 'flexframe-viewer'); ?></p>
                        
                        <!-- Loading Spinner Settings -->
                        <div class="ui-settings-section">
                            <h3><span class="dashicons dashicons-update"></span> <?php _e('Loading Spinner', 'flexframe-viewer'); ?></h3>
                            <table class="form-table ui-settings-table">
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_spinner_color"><?php _e('Spinner Color', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_spinner_color" name="flexframe_spinner_color" value="<?php echo esc_attr($spinner_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($spinner_color); ?></span>
                                        <p class="description"><?php _e('Color of the loading spinner shown while exercises load.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Animation Player Settings -->
                        <div class="ui-settings-section">
                            <h3><span class="dashicons dashicons-controls-play"></span> <?php _e('Animation Player', 'flexframe-viewer'); ?></h3>
                            <table class="form-table ui-settings-table">
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_bg_color"><?php _e('Player Background', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_player_bg_color" name="flexframe_player_bg_color" value="<?php echo esc_attr($player_bg_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($player_bg_color); ?></span>
                                        <p class="description"><?php _e('Background color of the entire player bar.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_bg_opacity"><?php _e('Player Background Opacity', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="range" id="flexframe_player_bg_opacity" name="flexframe_player_bg_opacity" min="0" max="1" step="0.1" value="<?php echo esc_attr($player_bg_opacity); ?>" class="opacity-slider" />
                                        <span class="opacity-value"><?php echo esc_html($player_bg_opacity); ?></span>
                                        <p class="description"><?php _e('0 = fully transparent, 1 = fully opaque', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_button_bg_color"><?php _e('Button Background', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_player_button_bg_color" name="flexframe_player_button_bg_color" value="<?php echo esc_attr($player_button_bg_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($player_button_bg_color); ?></span>
                                        <p class="description"><?php _e('Background color of the Play/Pause and Speed buttons.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_button_bg_opacity"><?php _e('Button Background Opacity', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="range" id="flexframe_player_button_bg_opacity" name="flexframe_player_button_bg_opacity" min="0" max="1" step="0.1" value="<?php echo esc_attr($player_button_bg_opacity); ?>" class="opacity-slider" />
                                        <span class="opacity-value"><?php echo esc_html($player_button_bg_opacity); ?></span>
                                        <p class="description"><?php _e('0 = fully transparent, 1 = fully opaque', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_icon_color"><?php _e('Icon & Text Color', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_player_icon_color" name="flexframe_player_icon_color" value="<?php echo esc_attr($player_icon_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($player_icon_color); ?></span>
                                        <p class="description"><?php _e('Color of Play/Pause icons, speed text, and time display.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_accent_color"><?php _e('Accent Color', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_player_accent_color" name="flexframe_player_accent_color" value="<?php echo esc_attr($player_accent_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($player_accent_color); ?></span>
                                        <p class="description"><?php _e('Accent color for progress bar/scrubber.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_player_always_visible"><?php _e('Visibility Mode', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <select id="flexframe_player_always_visible" name="flexframe_player_always_visible">
                                            <option value="no" <?php selected($player_always_visible, 'no'); ?>><?php _e('Auto-hide (shows on hover/interaction)', 'flexframe-viewer'); ?></option>
                                            <option value="yes" <?php selected($player_always_visible, 'yes'); ?>><?php _e('Always Visible', 'flexframe-viewer'); ?></option>
                                        </select>
                                        <p class="description"><?php _e('Choose whether the player controls stay visible or hide automatically.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Menu Settings -->
                        <div class="ui-settings-section">
                            <h3><span class="dashicons dashicons-menu"></span> <?php _e('Menus & Panels', 'flexframe-viewer'); ?></h3>
                            <table class="form-table ui-settings-table">
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_menu_bg_color"><?php _e('Background Color', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_menu_bg_color" name="flexframe_menu_bg_color" value="<?php echo esc_attr($menu_bg_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($menu_bg_color); ?></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_menu_bg_opacity"><?php _e('Background Opacity', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="range" id="flexframe_menu_bg_opacity" name="flexframe_menu_bg_opacity" min="0" max="1" step="0.1" value="<?php echo esc_attr($menu_bg_opacity); ?>" class="opacity-slider" />
                                        <span class="opacity-value"><?php echo esc_html($menu_bg_opacity); ?></span>
                                        <p class="description"><?php _e('0 = fully transparent, 1 = fully opaque', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_menu_text_color"><?php _e('Text Color', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_menu_text_color" name="flexframe_menu_text_color" value="<?php echo esc_attr($menu_text_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($menu_text_color); ?></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <label for="flexframe_menu_accent_color"><?php _e('Accent Color', 'flexframe-viewer'); ?></label>
                                    </th>
                                    <td>
                                        <input type="color" id="flexframe_menu_accent_color" name="flexframe_menu_accent_color" value="<?php echo esc_attr($menu_accent_color); ?>" class="color-picker" />
                                        <span class="color-value"><?php echo esc_html($menu_accent_color); ?></span>
                                        <p class="description"><?php _e('Accent color for selected items and hover states.', 'flexframe-viewer'); ?></p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Preview Section -->
                        <div class="ui-preview-section">
                            <h4><?php _e('Preview', 'flexframe-viewer'); ?></h4>
                            <div class="ui-preview-container">
                                <div class="preview-player" id="preview-player">
                                    <div class="preview-controls">
                                        <button type="button" class="preview-btn">▶</button>
                                        <div class="preview-progress">
                                            <div class="preview-progress-fill"></div>
                                        </div>
                                        <span class="preview-time">0:00 / 1:00</span>
                                    </div>
                                </div>
                                <div class="preview-menu" id="preview-menu">
                                    <div class="preview-menu-item active"><?php _e('Exercise 1', 'flexframe-viewer'); ?></div>
                                    <div class="preview-menu-item"><?php _e('Exercise 2', 'flexframe-viewer'); ?></div>
                                    <div class="preview-menu-item"><?php _e('Exercise 3', 'flexframe-viewer'); ?></div>
                                </div>
                                <div class="preview-spinner" id="preview-spinner">
                                    <div class="spinner-circle"></div>
                                </div>
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
        
        /* Color mode selector */
        .flexframe-color-mode-selector {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
        }
        .color-mode-option {
            flex: 1;
            max-width: 280px;
            cursor: pointer;
        }
        .color-mode-option input[type="radio"] {
            display: none;
        }
        .color-mode-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
            background: #f9f9f9;
            border: 2px solid #ddd;
            border-radius: 8px;
            text-align: center;
            transition: all 0.2s ease;
        }
        .color-mode-option:hover .color-mode-card {
            border-color: #2271b1;
            background: #f0f6fc;
        }
        .color-mode-option.selected .color-mode-card,
        .color-mode-option input:checked + .color-mode-card {
            border-color: #2271b1;
            background: #f0f6fc;
            box-shadow: 0 0 0 1px #2271b1;
        }
        .color-mode-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .color-mode-title {
            font-size: 14px;
            font-weight: 600;
            color: #1d2327;
            margin-bottom: 4px;
        }
        .color-mode-desc {
            font-size: 11px;
            color: #646970;
        }
        .flexframe-custom-color-panel {
            margin-top: 16px;
            padding: 16px;
            background: #f9f9f9;
            border-radius: 6px;
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
        
        /* Exercise Library Styles */
        .flexframe-viewer-url-setting {
            margin-bottom: 20px;
            padding: 16px;
            background: #f9f9f9;
            border-radius: 6px;
        }
        .flexframe-create-page-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .flexframe-create-page-row .button-primary {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .flexframe-viewer-url-setting label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .flexframe-viewer-url-setting input {
            width: 100%;
            max-width: 500px;
        }
        .flexframe-exercise-library {
            border: 1px solid #ddd;
            border-radius: 6px;
            overflow: hidden;
        }
        .exercise-library-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: #f6f7f7;
            border-bottom: 1px solid #ddd;
            gap: 16px;
            flex-wrap: wrap;
        }
        .exercise-search-box {
            flex: 1;
            min-width: 200px;
        }
        .exercise-search-box input {
            width: 100%;
            max-width: 300px;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .exercise-bulk-actions {
            display: flex;
            gap: 8px;
        }
        .exercise-list-container {
            max-height: 500px;
            overflow-y: auto;
        }
        .exercise-list {
            padding: 0;
        }
        .exercise-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            color: #666;
        }
        .exercise-loading .spinner {
            margin-right: 10px;
        }
        .exercise-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
            transition: background 0.2s;
        }
        .exercise-item:last-child {
            border-bottom: none;
        }
        .exercise-item:hover {
            background: #f9f9f9;
        }
        .exercise-item.hidden-exercise {
            background: #fff5f5;
        }
        .exercise-item.hidden-exercise .exercise-name {
            color: #999;
            text-decoration: line-through;
        }
        .exercise-visibility-toggle {
            margin-right: 12px;
        }
        .exercise-visibility-toggle input {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
        .exercise-info {
            flex: 1;
            min-width: 0;
        }
        .exercise-name {
            font-weight: 500;
            color: #1d2327;
            margin-bottom: 4px;
        }
        .exercise-meta {
            display: flex;
            gap: 12px;
            font-size: 12px;
            color: #666;
        }
        .exercise-meta span {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .exercise-actions {
            display: flex;
            gap: 8px;
            margin-left: 12px;
        }
        .exercise-url-input {
            width: 280px;
            padding: 6px 10px;
            font-size: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
            color: #666;
        }
        .copy-url-btn {
            padding: 6px 12px;
            font-size: 12px;
            cursor: pointer;
            background: #2271b1;
            color: #fff;
            border: none;
            border-radius: 4px;
            transition: background 0.2s;
        }
        .copy-url-btn:hover {
            background: #135e96;
        }
        .copy-url-btn.copied {
            background: #00a32a;
        }
        .qr-code-btn {
            padding: 6px 10px;
            font-size: 12px;
            cursor: pointer;
            background: #8c5ac3;
            color: #fff;
            border: none;
            border-radius: 4px;
            transition: background 0.2s;
        }
        .qr-code-btn:hover {
            background: #6b3fa0;
        }
        .no-exercises-found {
            padding: 40px;
            text-align: center;
            color: #666;
        }
        /* QR Code Modal */
        .qr-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .qr-modal {
            background: #fff;
            border-radius: 12px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        .qr-modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            line-height: 1;
        }
        .qr-modal-close:hover {
            color: #333;
        }
        .qr-modal h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
            color: #1d2327;
        }
        .qr-modal-url {
            font-size: 12px;
            color: #666;
            word-break: break-all;
            margin-bottom: 20px;
            padding: 8px;
            background: #f6f7f7;
            border-radius: 4px;
        }
        .qr-modal img {
            max-width: 200px;
            height: auto;
            margin-bottom: 20px;
        }
        .qr-modal-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        .qr-modal-actions button {
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            border: none;
        }
        .qr-download-btn {
            background: #2271b1;
            color: #fff;
        }
        .qr-download-btn:hover {
            background: #135e96;
        }
        .qr-copy-btn {
            background: #00a32a;
            color: #fff;
        }
        .qr-copy-btn:hover {
            background: #008a20;
        }
        
        /* Step 5: UI Settings Styles */
        .ui-settings-section {
            margin-bottom: 24px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            border: 1px solid #e2e4e7;
        }
        .ui-settings-section h3 {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 0 16px 0;
            font-size: 16px;
            color: #1d2327;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e4e7;
        }
        .ui-settings-section h3 .dashicons {
            color: #2271b1;
        }
        .ui-settings-table {
            margin: 0;
        }
        .ui-settings-table th {
            width: 160px;
            padding: 12px 10px 12px 0;
            vertical-align: middle;
            font-weight: 500;
        }
        .ui-settings-table td {
            padding: 12px 0;
        }
        .color-picker {
            width: 50px;
            height: 36px;
            padding: 2px;
            border: 2px solid #ddd;
            border-radius: 6px;
            cursor: pointer;
            vertical-align: middle;
        }
        .color-picker:hover {
            border-color: #2271b1;
        }
        .color-value {
            display: inline-block;
            margin-left: 10px;
            font-family: monospace;
            font-size: 13px;
            color: #666;
            vertical-align: middle;
        }
        .opacity-slider {
            width: 200px;
            vertical-align: middle;
        }
        .opacity-value {
            display: inline-block;
            margin-left: 10px;
            font-family: monospace;
            font-size: 13px;
            color: #666;
            vertical-align: middle;
            min-width: 30px;
        }
        .ui-settings-table select {
            min-width: 280px;
        }
        
        /* UI Preview Section */
        .ui-preview-section {
            margin-top: 24px;
            padding: 20px;
            background: #1a1a2e;
            border-radius: 8px;
        }
        .ui-preview-section h4 {
            margin: 0 0 16px 0;
            font-size: 14px;
            color: #fff;
        }
        .ui-preview-container {
            display: flex;
            gap: 20px;
            align-items: flex-start;
            flex-wrap: wrap;
        }
        
        /* Preview Player */
        .preview-player {
            padding: 12px 16px;
            border-radius: 8px;
            min-width: 280px;
        }
        .preview-controls {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .preview-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preview-progress {
            flex: 1;
            height: 6px;
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
            overflow: hidden;
        }
        .preview-progress-fill {
            width: 40%;
            height: 100%;
            border-radius: 3px;
        }
        .preview-time {
            font-size: 12px;
            font-family: monospace;
        }
        
        /* Preview Menu */
        .preview-menu {
            padding: 12px;
            border-radius: 8px;
            min-width: 150px;
        }
        .preview-menu-item {
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 13px;
            margin-bottom: 4px;
            cursor: pointer;
        }
        .preview-menu-item:last-child {
            margin-bottom: 0;
        }
        .preview-menu-item.active {
            font-weight: 500;
        }
        
        /* Preview Spinner */
        .preview-spinner {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
        }
        .spinner-circle {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.2);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
    
    <script>
    jQuery(document).ready(function($) {
        // Toggle primary color mode (default vs custom)
        $('input[name="flexframe_primary_color_mode"]').on('change', function() {
            var mode = $(this).val();
            
            // Update card selection - remove selected from all, add to current
            $('.color-mode-option').removeClass('selected');
            $(this).closest('.color-mode-option').addClass('selected');
            
            if (mode === 'custom') {
                $('.flexframe-custom-color-panel').slideDown(200);
            } else {
                $('.flexframe-custom-color-panel').slideUp(200);
            }
        });
        
        // Toggle theme mode (preset vs custom)
        $('input[name="flexframe_material_mode"]').on('change', function() {
            var mode = $(this).val();
            
            // Update card selection - remove selected from all, add to current
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
        
        // Create Viewer Page button handler
        $('#flexframe-create-viewer-page').on('click', function() {
            var $btn = $(this);
            var $status = $('#flexframe-create-page-status');
            
            $btn.prop('disabled', true).text('Creating...');
            $status.html('<span style="color: #666;">Please wait...</span>');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_viewer_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_create_page'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        $status.html('<span style="color: #00a32a;">✓ ' + response.data.message + '</span>');
                        $('#flexframe_viewer_page_url').val(response.data.url);
                        
                        // Update the viewerPageUrl variable for exercise URLs
                        viewerPageUrl = response.data.url;
                        renderExerciseList();
                        
                        // Show links to view/edit the page
                        setTimeout(function() {
                            $status.html(
                                '<span style="color: #00a32a;">✓ Page created!</span> ' +
                                '<a href="' + response.data.url + '" target="_blank">View Page</a> | ' +
                                '<a href="' + response.data.edit_url + '" target="_blank">Edit Page</a>'
                            );
                        }, 1500);
                    } else {
                        $status.html('<span style="color: #d63638;">✗ ' + response.data.message + '</span>');
                    }
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span> Create Exercise Viewer Page');
                },
                error: function() {
                    $status.html('<span style="color: #d63638;">✗ An error occurred. Please try again.</span>');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span> Create Exercise Viewer Page');
                }
            });
        });
        
        // Exercise Library functionality
        var exercises = [];
        var hiddenExercises = [];
        var viewerPageUrl = $('#flexframe_viewer_page_url').val() || '<?php echo esc_js(home_url('/')); ?>';
        
        // Load hidden exercises from the hidden input
        try {
            hiddenExercises = JSON.parse($('#flexframe_hidden_exercises').val() || '[]');
        } catch (e) {
            hiddenExercises = [];
        }
        
        // Fetch exercises from CDN
        function loadExercises() {
            var cdnUrl = 'https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises.json';
            
            $.ajax({
                url: cdnUrl + '?t=' + Date.now(),
                dataType: 'json',
                success: function(data) {
                    exercises = data;
                    renderExerciseList();
                },
                error: function() {
                    $('#exercise-list').html('<div class="no-exercises-found">Failed to load exercises. Please try refreshing the page.</div>');
                }
            });
        }
        
        // Render exercise list
        function renderExerciseList(filter) {
            var $list = $('#exercise-list');
            var filteredExercises = exercises;
            
            // Apply search filter
            if (filter && filter.trim()) {
                var searchTerm = filter.toLowerCase();
                filteredExercises = exercises.filter(function(ex) {
                    return ex.name.toLowerCase().indexOf(searchTerm) !== -1 ||
                           (ex.muscleGroup && ex.muscleGroup.join(' ').toLowerCase().indexOf(searchTerm) !== -1) ||
                           (ex.equipment && ex.equipment.join(' ').toLowerCase().indexOf(searchTerm) !== -1);
                });
            }
            
            if (filteredExercises.length === 0) {
                $list.html('<div class="no-exercises-found">No exercises found matching your search.</div>');
                return;
            }
            
            var html = '';
            filteredExercises.forEach(function(exercise) {
                var isHidden = hiddenExercises.indexOf(exercise.id) !== -1;
                var exerciseUrl = generateExerciseUrl(exercise.id);
                var muscleGroups = exercise.muscleGroup ? exercise.muscleGroup.join(', ') : '';
                var equipment = exercise.equipment ? exercise.equipment.join(', ') : '';
                
                html += '<div class="exercise-item' + (isHidden ? ' hidden-exercise' : '') + '" data-id="' + exercise.id + '">';
                html += '    <div class="exercise-visibility-toggle">';
                html += '        <input type="checkbox" ' + (isHidden ? '' : 'checked') + ' title="' + (isHidden ? 'Click to show' : 'Click to hide') + '" />';
                html += '    </div>';
                html += '    <div class="exercise-info">';
                html += '        <div class="exercise-name">' + exercise.name + '</div>';
                html += '        <div class="exercise-meta">';
                if (muscleGroups) {
                    html += '            <span>💪 ' + muscleGroups + '</span>';
                }
                if (equipment) {
                    html += '            <span>🏋️ ' + equipment + '</span>';
                }
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="exercise-actions">';
                html += '        <input type="text" class="exercise-url-input" value="' + exerciseUrl + '" readonly />';
                html += '        <button type="button" class="copy-url-btn" data-url="' + exerciseUrl + '">Copy</button>';
                html += '        <button type="button" class="qr-code-btn" data-url="' + exerciseUrl + '" data-name="' + exercise.name.replace(/"/g, '&quot;') + '">QR</button>';
                html += '    </div>';
                html += '</div>';
            });
            
            $list.html(html);
        }
        
        // Generate exercise URL
        function generateExerciseUrl(exerciseId) {
            var baseUrl = viewerPageUrl.replace(/\/$/, '');
            var separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
            return baseUrl + separator + 'exercise=' + exerciseId;
        }
        
        // Update viewer URL when input changes
        $('#flexframe_viewer_page_url').on('input', function() {
            viewerPageUrl = $(this).val() || '<?php echo esc_js(home_url('/')); ?>';
            renderExerciseList($('#exercise-search').val());
        });
        
        // Search functionality
        $('#exercise-search').on('input', function() {
            renderExerciseList($(this).val());
        });
        
        // Toggle exercise visibility
        $(document).on('change', '.exercise-visibility-toggle input', function() {
            var $item = $(this).closest('.exercise-item');
            var exerciseId = $item.data('id');
            var isVisible = $(this).is(':checked');
            
            if (isVisible) {
                // Remove from hidden list
                hiddenExercises = hiddenExercises.filter(function(id) { return id !== exerciseId; });
                $item.removeClass('hidden-exercise');
            } else {
                // Add to hidden list
                if (hiddenExercises.indexOf(exerciseId) === -1) {
                    hiddenExercises.push(exerciseId);
                }
                $item.addClass('hidden-exercise');
            }
            
            // Update the hidden input
            $('#flexframe_hidden_exercises').val(JSON.stringify(hiddenExercises));
        });
        
        // Copy URL functionality
        $(document).on('click', '.copy-url-btn', function() {
            var $btn = $(this);
            var url = $btn.data('url');
            
            navigator.clipboard.writeText(url).then(function() {
                $btn.text('Copied!').addClass('copied');
                setTimeout(function() {
                    $btn.text('Copy').removeClass('copied');
                }, 2000);
            }).catch(function() {
                // Fallback for older browsers
                var $input = $btn.siblings('.exercise-url-input');
                $input.select();
                document.execCommand('copy');
                $btn.text('Copied!').addClass('copied');
                setTimeout(function() {
                    $btn.text('Copy').removeClass('copied');
                }, 2000);
            });
        });
        
        // QR Code modal functionality
        $(document).on('click', '.qr-code-btn', function() {
            var url = $(this).data('url');
            var name = $(this).data('name');
            var qrImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url);
            
            var modalHtml = '<div class="qr-modal-overlay">';
            modalHtml += '    <div class="qr-modal">';
            modalHtml += '        <button type="button" class="qr-modal-close">&times;</button>';
            modalHtml += '        <h3>' + name + '</h3>';
            modalHtml += '        <div class="qr-modal-url">' + url + '</div>';
            modalHtml += '        <img src="' + qrImageUrl + '" alt="QR Code" />';
            modalHtml += '        <div class="qr-modal-actions">';
            modalHtml += '            <button type="button" class="qr-download-btn" data-url="' + qrImageUrl + '" data-name="' + name.replace(/[^a-z0-9]/gi, '_') + '">Download QR</button>';
            modalHtml += '            <button type="button" class="qr-copy-btn" data-url="' + url + '">Copy URL</button>';
            modalHtml += '        </div>';
            modalHtml += '    </div>';
            modalHtml += '</div>';
            
            $('body').append(modalHtml);
        });
        
        // Close QR modal
        $(document).on('click', '.qr-modal-close, .qr-modal-overlay', function(e) {
            if (e.target === this) {
                $('.qr-modal-overlay').remove();
            }
        });
        
        // Download QR code
        $(document).on('click', '.qr-download-btn', function(e) {
            e.stopPropagation();
            var imageUrl = $(this).data('url');
            var fileName = $(this).data('name') + '_qr.png';
            
            // Fetch the image and download it
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    var link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    URL.revokeObjectURL(link.href);
                });
        });
        
        // Copy URL from modal
        $(document).on('click', '.qr-copy-btn', function(e) {
            e.stopPropagation();
            var $btn = $(this);
            var url = $btn.data('url');
            
            navigator.clipboard.writeText(url).then(function() {
                $btn.text('Copied!');
                setTimeout(function() {
                    $btn.text('Copy URL');
                }, 2000);
            });
        });
        
        // Close modal on Escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                $('.qr-modal-overlay').remove();
            }
        });
        
        // Show all exercises
        $('#show-all-exercises').on('click', function() {
            hiddenExercises = [];
            $('#flexframe_hidden_exercises').val('[]');
            renderExerciseList($('#exercise-search').val());
        });
        
        // Hide all exercises
        $('#hide-all-exercises').on('click', function() {
            hiddenExercises = exercises.map(function(ex) { return ex.id; });
            $('#flexframe_hidden_exercises').val(JSON.stringify(hiddenExercises));
            renderExerciseList($('#exercise-search').val());
        });
        
        // Load exercises on page load
        loadExercises();
        
        // ============================================
        // Step 5: UI Settings - Live Preview
        // ============================================
        
        function updateUIPreview() {
            // Get current values
            var spinnerColor = $('#flexframe_spinner_color').val();
            var playerBgColor = $('#flexframe_player_bg_color').val();
            var playerBgOpacity = parseFloat($('#flexframe_player_bg_opacity').val());
            var playerButtonBgColor = $('#flexframe_player_button_bg_color').val();
            var playerButtonBgOpacity = parseFloat($('#flexframe_player_button_bg_opacity').val());
            var playerIconColor = $('#flexframe_player_icon_color').val();
            var playerAccentColor = $('#flexframe_player_accent_color').val();
            var menuBgColor = $('#flexframe_menu_bg_color').val();
            var menuBgOpacity = parseFloat($('#flexframe_menu_bg_opacity').val());
            var menuTextColor = $('#flexframe_menu_text_color').val();
            var menuAccentColor = $('#flexframe_menu_accent_color').val();
            
            // Convert hex to rgba
            function hexToRgba(hex, alpha) {
                var r = parseInt(hex.slice(1, 3), 16);
                var g = parseInt(hex.slice(3, 5), 16);
                var b = parseInt(hex.slice(5, 7), 16);
                return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
            }
            
            // Update preview player
            var $player = $('#preview-player');
            $player.css('background-color', hexToRgba(playerBgColor, playerBgOpacity));
            $player.find('.preview-btn').css({
                'background-color': hexToRgba(playerButtonBgColor, playerButtonBgOpacity),
                'color': playerIconColor
            });
            $player.find('.preview-progress-fill').css('background-color', playerAccentColor);
            $player.find('.preview-time').css('color', playerIconColor);
            
            // Update preview menu
            var $menu = $('#preview-menu');
            $menu.css('background-color', hexToRgba(menuBgColor, menuBgOpacity));
            $menu.find('.preview-menu-item').css('color', menuTextColor);
            $menu.find('.preview-menu-item.active').css({
                'background-color': hexToRgba(menuAccentColor, 0.2),
                'color': menuAccentColor
            });
            
            // Update preview spinner
            var $spinner = $('#preview-spinner .spinner-circle');
            $spinner.css('border-top-color', spinnerColor);
        }
        
        // Color picker change handlers
        $('.color-picker').on('input change', function() {
            var $this = $(this);
            $this.siblings('.color-value').text($this.val());
            updateUIPreview();
        });
        
        // Opacity slider change handlers
        $('.opacity-slider').on('input change', function() {
            var $this = $(this);
            $this.siblings('.opacity-value').text($this.val());
            updateUIPreview();
        });
        
        // Initial preview update
        if ($('#preview-player').length) {
            updateUIPreview();
        }
    });
    </script>
    <?php
}
