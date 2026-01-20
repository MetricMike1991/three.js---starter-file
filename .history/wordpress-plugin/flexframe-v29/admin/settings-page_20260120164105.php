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
 * AJAX handler to save a custom theme preset
 */
function flexframe_save_custom_preset() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    // Check permissions
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $preset_name = isset($_POST['preset_name']) ? sanitize_text_field($_POST['preset_name']) : '';
    $preset_data = isset($_POST['preset_data']) ? $_POST['preset_data'] : array();
    
    if (empty($preset_name)) {
        wp_send_json_error(array('message' => 'Preset name is required.'));
    }
    
    // Get existing presets
    $custom_presets = get_option('flexframe_custom_presets', array());
    
    // Generate unique ID
    $preset_id = 'custom_' . sanitize_title($preset_name) . '_' . time();
    
    // Sanitize preset data
    $sanitized_data = array(
        'name' => $preset_name,
        'created' => current_time('mysql'),
        'settings' => array(
            // UI Settings
            'spinner_color' => sanitize_hex_color($preset_data['spinner_color'] ?? '#00f510'),
            'use_logo_loader' => (bool)($preset_data['use_logo_loader'] ?? false),
            'logo_loader_animation' => sanitize_text_field($preset_data['logo_loader_animation'] ?? 'pulse'),
            'logo_loader_size' => intval($preset_data['logo_loader_size'] ?? 100),
            'player_bg_color' => sanitize_hex_color($preset_data['player_bg_color'] ?? '#828282'),
            'player_bg_opacity' => floatval($preset_data['player_bg_opacity'] ?? 0),
            'player_button_bg_color' => sanitize_hex_color($preset_data['player_button_bg_color'] ?? '#f50000'),
            'player_button_bg_opacity' => floatval($preset_data['player_button_bg_opacity'] ?? 0.8),
            'player_icon_color' => sanitize_hex_color($preset_data['player_icon_color'] ?? '#ffffff'),
            'player_accent_color' => sanitize_hex_color($preset_data['player_accent_color'] ?? '#f50000'),
            'player_always_visible' => sanitize_text_field($preset_data['player_always_visible'] ?? 'no'),
            'menu_bg_color' => sanitize_hex_color($preset_data['menu_bg_color'] ?? '#000000'),
            'menu_bg_opacity' => floatval($preset_data['menu_bg_opacity'] ?? 0.9),
            'menu_text_color' => sanitize_hex_color($preset_data['menu_text_color'] ?? '#ffffff'),
            'menu_accent_color' => sanitize_hex_color($preset_data['menu_accent_color'] ?? '#f50000'),
            'hide_right_menu' => (bool)($preset_data['hide_right_menu'] ?? false),
            // Material Settings
            'skin_color' => sanitize_hex_color($preset_data['skin_color'] ?? '#ffdbac'),
            'skin_opacity' => floatval($preset_data['skin_opacity'] ?? 0.4),
            'skin_roughness' => floatval($preset_data['skin_roughness'] ?? 0.7),
            'skin_metalness' => floatval($preset_data['skin_metalness'] ?? 0),
            'skin_transmission' => floatval($preset_data['skin_transmission'] ?? 0),
            'skin_thickness' => floatval($preset_data['skin_thickness'] ?? 0),
            'skin_ior' => floatval($preset_data['skin_ior'] ?? 1.5),
            'skin_env_intensity' => floatval($preset_data['skin_env_intensity'] ?? 1),
            // Scene Background Settings
            'bg_gradient_top' => sanitize_hex_color($preset_data['bg_gradient_top'] ?? '#3865ad'),
            'bg_gradient_bottom' => sanitize_hex_color($preset_data['bg_gradient_bottom'] ?? '#0101bc'),
            'bg_gradient_opacity' => floatval($preset_data['bg_gradient_opacity'] ?? 1),
            // Lighting Settings
            'ambient_intensity' => floatval($preset_data['ambient_intensity'] ?? 0.4),
            'ambient_color' => sanitize_hex_color($preset_data['ambient_color'] ?? '#ffffff'),
            'directional_intensity' => floatval($preset_data['directional_intensity'] ?? 1.43),
            'directional_color' => sanitize_hex_color($preset_data['directional_color'] ?? '#ffffff'),
            'directional_pos_x' => floatval($preset_data['directional_pos_x'] ?? 1.35),
            'directional_pos_y' => floatval($preset_data['directional_pos_y'] ?? 1.57),
            'directional_pos_z' => floatval($preset_data['directional_pos_z'] ?? 0.9),
            // Particle Settings
            'particles_enabled' => (bool)($preset_data['particles_enabled'] ?? true),
            'particle_count' => intval($preset_data['particle_count'] ?? 1150),
            'particle_size' => floatval($preset_data['particle_size'] ?? 0.0095),
            'particle_color' => sanitize_hex_color($preset_data['particle_color'] ?? '#0d529c'),
            'particle_opacity' => floatval($preset_data['particle_opacity'] ?? 1),
            'particle_speed' => floatval($preset_data['particle_speed'] ?? 0.5),
        )
    );
    
    // Add preset
    $custom_presets[$preset_id] = $sanitized_data;
    
    // Save
    update_option('flexframe_custom_presets', $custom_presets);
    
    wp_send_json_success(array(
        'message' => 'Preset saved successfully!',
        'preset_id' => $preset_id,
        'presets' => $custom_presets
    ));
}
add_action('wp_ajax_flexframe_save_custom_preset', 'flexframe_save_custom_preset');

/**
 * AJAX handler to load a custom theme preset
 */
function flexframe_load_custom_preset() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    $preset_id = isset($_POST['preset_id']) ? sanitize_text_field($_POST['preset_id']) : '';
    
    if (empty($preset_id)) {
        wp_send_json_error(array('message' => 'Preset ID is required.'));
    }
    
    $custom_presets = get_option('flexframe_custom_presets', array());
    
    if (!isset($custom_presets[$preset_id])) {
        wp_send_json_error(array('message' => 'Preset not found.'));
    }
    
    wp_send_json_success(array(
        'preset' => $custom_presets[$preset_id]
    ));
}
add_action('wp_ajax_flexframe_load_custom_preset', 'flexframe_load_custom_preset');

/**
 * AJAX handler to delete a custom theme preset
 */
function flexframe_delete_custom_preset() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    // Check permissions
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $preset_id = isset($_POST['preset_id']) ? sanitize_text_field($_POST['preset_id']) : '';
    
    if (empty($preset_id)) {
        wp_send_json_error(array('message' => 'Preset ID is required.'));
    }
    
    $custom_presets = get_option('flexframe_custom_presets', array());
    
    if (!isset($custom_presets[$preset_id])) {
        wp_send_json_error(array('message' => 'Preset not found.'));
    }
    
    unset($custom_presets[$preset_id]);
    update_option('flexframe_custom_presets', $custom_presets);
    
    wp_send_json_success(array(
        'message' => 'Preset deleted successfully!',
        'presets' => $custom_presets
    ));
}
add_action('wp_ajax_flexframe_delete_custom_preset', 'flexframe_delete_custom_preset');

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
    
    // Custom SKIN settings - Default: pure material appearance, no textures
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
    register_setting('flexframe_settings_group', 'flexframe_use_logo_loader', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => false
    ));
    register_setting('flexframe_settings_group', 'flexframe_logo_loader_animation', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'pulse'
    ));
    register_setting('flexframe_settings_group', 'flexframe_logo_loader_size', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 80
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
    register_setting('flexframe_settings_group', 'flexframe_hide_right_menu', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => false
    ));
    
    // ========== Scene/Background Settings ==========
    register_setting('flexframe_settings_group', 'flexframe_bg_gradient_top', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#3865ad'
    ));
    register_setting('flexframe_settings_group', 'flexframe_bg_gradient_bottom', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#0101bc'
    ));
    register_setting('flexframe_settings_group', 'flexframe_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
    ));
    
    // ========== Lighting Settings ==========
    register_setting('flexframe_settings_group', 'flexframe_ambient_intensity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.4
    ));
    register_setting('flexframe_settings_group', 'flexframe_ambient_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ffffff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_directional_intensity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1.43
    ));
    register_setting('flexframe_settings_group', 'flexframe_directional_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ffffff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_directional_pos_x', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1.35
    ));
    register_setting('flexframe_settings_group', 'flexframe_directional_pos_y', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1.57
    ));
    register_setting('flexframe_settings_group', 'flexframe_directional_pos_z', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.9
    ));
    
    // ========== Dust Particle Settings ==========
    register_setting('flexframe_settings_group', 'flexframe_particles_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_particles_count', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 1150
    ));
    register_setting('flexframe_settings_group', 'flexframe_particles_size', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.0095
    ));
    register_setting('flexframe_settings_group', 'flexframe_particles_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#0d529c'
    ));
    register_setting('flexframe_settings_group', 'flexframe_particles_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
    ));
    register_setting('flexframe_settings_group', 'flexframe_particles_speed', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.5
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
    
    // Get current values - defaults match recommended settings
    $primary_color_mode = get_option('flexframe_primary_color_mode', 'custom');
    $primary_color = get_option('flexframe_primary_color', '#f50000');
    $logo_url = get_option('flexframe_logo_url', '');
    $logo_threshold = get_option('flexframe_logo_threshold', 0.95);
    $material_mode = get_option('flexframe_material_mode', 'preset');
    $material_preset = get_option('flexframe_material_preset', 'default');
    
    // Custom presets
    $custom_presets = get_option('flexframe_custom_presets', array());
    
    // Custom SKIN settings - Default: pure material, no textures
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
    
    // UI Settings - defaults match recommended settings
    $spinner_color = get_option('flexframe_spinner_color', '#00f510');
    $use_logo_loader = get_option('flexframe_use_logo_loader', true);
    $logo_loader_animation = get_option('flexframe_logo_loader_animation', 'pulse');
    $logo_loader_size = get_option('flexframe_logo_loader_size', 100);
    $player_bg_color = get_option('flexframe_player_bg_color', '#828282');
    $player_bg_opacity = get_option('flexframe_player_bg_opacity', 0);
    $player_button_bg_color = get_option('flexframe_player_button_bg_color', '#f50000');
    $player_button_bg_opacity = get_option('flexframe_player_button_bg_opacity', 0.8);
    $player_icon_color = get_option('flexframe_player_icon_color', '#ffffff');
    $player_accent_color = get_option('flexframe_player_accent_color', '#f50000');
    $player_always_visible = get_option('flexframe_player_always_visible', 'no');
    $menu_bg_color = get_option('flexframe_menu_bg_color', '#000000');
    $menu_bg_opacity = get_option('flexframe_menu_bg_opacity', 0.9);
    $menu_text_color = get_option('flexframe_menu_text_color', '#ffffff');
    $menu_accent_color = get_option('flexframe_menu_accent_color', '#f50000');
    $hide_right_menu = get_option('flexframe_hide_right_menu', false);
    
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        
        <div class="flexframe-settings-container">
            <form method="post" action="options.php" id="flexframe-settings-form">
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
                        
                        <!-- Hidden field to always use custom mode when color is set -->
                        <input type="hidden" name="flexframe_primary_color_mode" value="<?php echo !empty($primary_color) ? 'custom' : 'default'; ?>" />
                        
                        <div class="flexframe-custom-color-panel">
                            <div class="flexframe-color-picker">
                                <input type="color" id="flexframe_primary_color" name="flexframe_primary_color" value="<?php echo esc_attr($primary_color ?: '#c20e1d'); ?>" />
                                <span class="color-hex-display"><?php echo esc_html($primary_color ?: '#c20e1d'); ?></span>
                                <span class="color-label"><?php _e('Your Brand Color', 'flexframe-viewer'); ?></span>
                            </div>
                            <p class="color-hint" style="margin-top: 10px; color: #666; font-size: 13px;">
                                <?php _e('If no color is saved, the default color from your selected theme will be used.', 'flexframe-viewer'); ?>
                            </p>
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
                                    <span class="theme-desc"><?php _e('Full control over UI and material settings', 'flexframe-viewer'); ?></span>
                                </span>
                            </label>
                        </div>
                        
                        <!-- Preset Selection (shown when mode = preset) -->
                        <div class="flexframe-preset-panel" <?php echo $material_mode !== 'preset' ? 'style="display:none;"' : ''; ?>>
                            <div class="preset-theme-selector">
                                <label for="flexframe_material_preset"><?php _e('Select Theme:', 'flexframe-viewer'); ?></label>
                                <select id="flexframe_material_preset" name="flexframe_material_preset" class="preset-theme-select">
                                    <option value="default" <?php selected($material_preset, 'default'); ?>>
                                        <?php _e('1. Default Settings', 'flexframe-viewer'); ?>
                                    </option>
                                    <option value="dark" <?php selected($material_preset, 'dark'); ?>>
                                        <?php _e('2. Dark Theme', 'flexframe-viewer'); ?>
                                    </option>
                                    <option value="light" <?php selected($material_preset, 'light'); ?>>
                                        <?php _e('3. Light Theme', 'flexframe-viewer'); ?>
                                    </option>
                                </select>
                                <button type="button" id="apply-preset-theme" class="button button-primary">
                                    <span class="dashicons dashicons-yes" style="margin-top: 4px;"></span>
                                    <?php _e('Apply & Save', 'flexframe-viewer'); ?>
                                </button>
                            </div>
                            <p class="preset-theme-description" id="preset-theme-description">
                                <span class="dashicons dashicons-info"></span>
                                <span id="preset-desc-text"><?php _e('Optimized settings with your brand colors.', 'flexframe-viewer'); ?></span>
                            </p>
                        </div>
                        
                        <!-- Custom Settings Panel (always visible, disabled when preset selected) -->
                        <div class="flexframe-custom-panel <?php echo $material_mode !== 'custom' ? 'panel-disabled' : ''; ?>">
                            
                            <!-- Preset Manager -->
                            <div class="preset-manager">
                                <div class="preset-manager-row">
                                    <div class="preset-load-section">
                                        <label for="flexframe_load_preset"><?php _e('Load Saved Preset:', 'flexframe-viewer'); ?></label>
                                        <select id="flexframe_load_preset" class="preset-select">
                                            <option value=""><?php _e('-- Select a preset --', 'flexframe-viewer'); ?></option>
                                            <?php foreach ($custom_presets as $preset_id => $preset) : ?>
                                                <option value="<?php echo esc_attr($preset_id); ?>">
                                                    <?php echo esc_html($preset['name']); ?>
                                                </option>
                                            <?php endforeach; ?>
                                        </select>
                                        <button type="button" id="flexframe-load-preset-btn" class="button" disabled>
                                            <span class="dashicons dashicons-download" style="margin-top: 4px;"></span>
                                            <?php _e('Load', 'flexframe-viewer'); ?>
                                        </button>
                                        <button type="button" id="flexframe-delete-preset-btn" class="button button-link-delete" disabled>
                                            <span class="dashicons dashicons-trash" style="margin-top: 4px;"></span>
                                        </button>
                                    </div>
                                    <div class="preset-save-section">
                                        <button type="button" id="flexframe-save-preset-btn" class="button button-secondary">
                                            <span class="dashicons dashicons-cloud-saved" style="margin-top: 4px;"></span>
                                            <?php _e('Save Current as Preset', 'flexframe-viewer'); ?>
                                        </button>
                                        <button type="button" id="flexframe-export-settings-btn" class="button button-secondary">
                                            <span class="dashicons dashicons-clipboard" style="margin-top: 4px;"></span>
                                            <?php _e('Export to Clipboard', 'flexframe-viewer'); ?>
                                        </button>
                                    </div>
                                </div>
                                <span id="preset-action-message" class="preset-message" style="display: none;"></span>
                            </div>
                            
                            <!-- UI Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="ui-settings-content">
                                    <h4><span class="dashicons dashicons-admin-appearance"></span> <?php _e('UI Settings', 'flexframe-viewer'); ?></h4>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="ui-settings-content">
                                    
                                    <!-- Loading Spinner Settings -->
                                    <div class="ui-settings-section">
                                        <h5><span class="dashicons dashicons-update"></span> <?php _e('Loading Indicator', 'flexframe-viewer'); ?></h5>
                                        <table class="form-table ui-settings-table">
                                            <tr>
                                                <th scope="row">
                                                    <label><?php _e('Loader Type', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <div class="loader-type-options">
                                                        <label class="loader-type-option <?php echo !$use_logo_loader ? 'selected' : ''; ?>">
                                                            <input type="radio" name="flexframe_use_logo_loader" value="0" <?php checked($use_logo_loader, false); ?> />
                                                            <span class="loader-type-card">
                                                                <span class="loader-type-icon"><span class="dashicons dashicons-update"></span></span>
                                                                <span class="loader-type-label"><?php _e('Spinner', 'flexframe-viewer'); ?></span>
                                                            </span>
                                                        </label>
                                                        <label class="loader-type-option <?php echo $use_logo_loader ? 'selected' : ''; ?> <?php echo empty($logo_url) ? 'disabled' : ''; ?>">
                                                            <input type="radio" name="flexframe_use_logo_loader" value="1" <?php checked($use_logo_loader, true); ?> <?php echo empty($logo_url) ? 'disabled' : ''; ?> />
                                                            <span class="loader-type-card">
                                                                <span class="loader-type-icon"><span class="dashicons dashicons-format-image"></span></span>
                                                                <span class="loader-type-label"><?php _e('Your Logo', 'flexframe-viewer'); ?></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <?php if (empty($logo_url)) : ?>
                                                        <p class="description logo-warning"><span class="dashicons dashicons-warning"></span> <?php _e('Upload a logo in Step 2 to use it as a loading indicator.', 'flexframe-viewer'); ?></p>
                                                    <?php endif; ?>
                                                </td>
                                            </tr>
                                            <tr class="spinner-options" <?php echo $use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                <th scope="row">
                                                    <label for="flexframe_spinner_color"><?php _e('Spinner Color', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <input type="color" id="flexframe_spinner_color" name="flexframe_spinner_color" value="<?php echo esc_attr($spinner_color); ?>" class="color-picker" />
                                                    <span class="color-value"><?php echo esc_html($spinner_color); ?></span>
                                                </td>
                                            </tr>
                                            <tr class="logo-loader-options" <?php echo !$use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                <th scope="row">
                                                    <label for="flexframe_logo_loader_animation"><?php _e('Animation Style', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <select id="flexframe_logo_loader_animation" name="flexframe_logo_loader_animation">
                                                        <option value="pulse" <?php selected($logo_loader_animation, 'pulse'); ?>><?php _e('Pulse (Grow & Shrink)', 'flexframe-viewer'); ?></option>
                                                        <option value="spin" <?php selected($logo_loader_animation, 'spin'); ?>><?php _e('Spin (Rotate)', 'flexframe-viewer'); ?></option>
                                                        <option value="fade" <?php selected($logo_loader_animation, 'fade'); ?>><?php _e('Fade (Opacity)', 'flexframe-viewer'); ?></option>
                                                        <option value="bounce" <?php selected($logo_loader_animation, 'bounce'); ?>><?php _e('Bounce (Up & Down)', 'flexframe-viewer'); ?></option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr class="logo-loader-options" <?php echo !$use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                <th scope="row">
                                                    <label for="flexframe_logo_loader_size"><?php _e('Logo Size', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <input type="range" id="flexframe_logo_loader_size" name="flexframe_logo_loader_size" min="40" max="150" step="10" value="<?php echo esc_attr($logo_loader_size); ?>" />
                                                    <span class="size-value"><?php echo esc_html($logo_loader_size); ?>px</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                    <!-- Animation Player Settings -->
                                    <div class="ui-settings-section">
                                        <h5><span class="dashicons dashicons-controls-play"></span> <?php _e('Animation Player', 'flexframe-viewer'); ?></h5>
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
                                        <h5><span class="dashicons dashicons-menu"></span> <?php _e('Menus & Panels', 'flexframe-viewer'); ?></h5>
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
                                            <tr>
                                                <th scope="row">
                                                    <label for="flexframe_hide_right_menu"><?php _e('Hide Info Panel', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <label class="toggle-switch">
                                                        <input type="checkbox" id="flexframe_hide_right_menu" name="flexframe_hide_right_menu" value="1" <?php checked($hide_right_menu, true); ?> />
                                                        <span class="toggle-slider"></span>
                                                    </label>
                                                    <p class="description"><?php _e('Hide the information panel (Hints, Tips, Steps, Errors) on the right side of the viewer.', 'flexframe-viewer'); ?></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                    <!-- UI Preview Section -->
                                    <div class="ui-preview-section">
                                        <h5><?php _e('Preview', 'flexframe-viewer'); ?></h5>
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
                                            <div class="preview-spinner" id="preview-spinner" <?php echo $use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                <div class="spinner-circle"></div>
                                            </div>
                                            <div class="preview-logo-loader" id="preview-logo-loader" <?php echo !$use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                <?php if (!empty($logo_url)) : ?>
                                                    <img src="<?php echo esc_url($logo_url); ?>" alt="Loading" class="logo-loader-img <?php echo esc_attr($logo_loader_animation); ?>" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: auto;" />
                                                <?php else : ?>
                                                    <div class="logo-placeholder"><span class="dashicons dashicons-format-image"></span></div>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Model Material Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="material-settings-content">
                                    <h4><span class="dashicons dashicons-art"></span> <?php _e('Model Material Settings', 'flexframe-viewer'); ?></h4>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="material-settings-content">
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
                            
                            <!-- Scene Background Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="background-settings-content">
                                    <h4><span class="dashicons dashicons-admin-appearance"></span> <?php _e('Scene Background', 'flexframe-viewer'); ?></h4>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="background-settings-content">
                                    <div class="flexframe-custom-settings">
                                        <?php
                                        // Get background settings with defaults
                                        $bg_gradient_top = get_option('flexframe_bg_gradient_top', '#3865ad');
                                        $bg_gradient_bottom = get_option('flexframe_bg_gradient_bottom', '#0101bc');
                                        $bg_opacity = get_option('flexframe_bg_opacity', 1);
                                        ?>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_bg_gradient_top"><?php _e('Gradient Top Color', 'flexframe-viewer'); ?></label>
                                            <input type="color" id="flexframe_bg_gradient_top" name="flexframe_bg_gradient_top" value="<?php echo esc_attr($bg_gradient_top); ?>" />
                                            <span class="color-hex"><?php echo esc_html($bg_gradient_top); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_bg_gradient_bottom"><?php _e('Gradient Bottom Color', 'flexframe-viewer'); ?></label>
                                            <input type="color" id="flexframe_bg_gradient_bottom" name="flexframe_bg_gradient_bottom" value="<?php echo esc_attr($bg_gradient_bottom); ?>" />
                                            <span class="color-hex"><?php echo esc_html($bg_gradient_bottom); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_bg_opacity"><?php _e('Background Opacity', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_bg_opacity" name="flexframe_bg_opacity" value="<?php echo esc_attr($bg_opacity); ?>" min="0" max="1" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($bg_opacity); ?></span>
                                        </div>
                                        
                                        <p class="description">
                                            <?php _e('💡 Customize the gradient background of the 3D scene.', 'flexframe-viewer'); ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Lighting Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="lighting-settings-content">
                                    <h4><span class="dashicons dashicons-lightbulb"></span> <?php _e('Lighting', 'flexframe-viewer'); ?></h4>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="lighting-settings-content">
                                    <div class="flexframe-custom-settings">
                                        <?php
                                        // Get lighting settings with defaults
                                        $ambient_intensity = get_option('flexframe_ambient_intensity', 0.4);
                                        $ambient_color = get_option('flexframe_ambient_color', '#ffffff');
                                        $directional_intensity = get_option('flexframe_directional_intensity', 1.43);
                                        $directional_color = get_option('flexframe_directional_color', '#ffffff');
                                        $directional_pos_x = get_option('flexframe_directional_pos_x', 1.35);
                                        $directional_pos_y = get_option('flexframe_directional_pos_y', 1.57);
                                        $directional_pos_z = get_option('flexframe_directional_pos_z', 0.9);
                                        ?>
                                        
                                        <h5 style="margin: 0 0 12px; color: #4a9eff;"><?php _e('Ambient Light', 'flexframe-viewer'); ?></h5>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_ambient_intensity"><?php _e('Intensity', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_ambient_intensity" name="flexframe_ambient_intensity" value="<?php echo esc_attr($ambient_intensity); ?>" min="0" max="2" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($ambient_intensity); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_ambient_color"><?php _e('Color', 'flexframe-viewer'); ?></label>
                                            <input type="color" id="flexframe_ambient_color" name="flexframe_ambient_color" value="<?php echo esc_attr($ambient_color); ?>" />
                                            <span class="color-hex"><?php echo esc_html($ambient_color); ?></span>
                                        </div>
                                        
                                        <h5 style="margin: 20px 0 12px; color: #4a9eff;"><?php _e('Directional Light', 'flexframe-viewer'); ?></h5>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_directional_intensity"><?php _e('Intensity', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_directional_intensity" name="flexframe_directional_intensity" value="<?php echo esc_attr($directional_intensity); ?>" min="0" max="5" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($directional_intensity); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_directional_color"><?php _e('Color', 'flexframe-viewer'); ?></label>
                                            <input type="color" id="flexframe_directional_color" name="flexframe_directional_color" value="<?php echo esc_attr($directional_color); ?>" />
                                            <span class="color-hex"><?php echo esc_html($directional_color); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_directional_pos_x"><?php _e('Position X', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_directional_pos_x" name="flexframe_directional_pos_x" value="<?php echo esc_attr($directional_pos_x); ?>" min="-5" max="5" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($directional_pos_x); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_directional_pos_y"><?php _e('Position Y', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_directional_pos_y" name="flexframe_directional_pos_y" value="<?php echo esc_attr($directional_pos_y); ?>" min="-5" max="5" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($directional_pos_y); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_directional_pos_z"><?php _e('Position Z', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_directional_pos_z" name="flexframe_directional_pos_z" value="<?php echo esc_attr($directional_pos_z); ?>" min="-5" max="5" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($directional_pos_z); ?></span>
                                        </div>
                                        
                                        <p class="description">
                                            <?php _e('💡 Adjust lighting to highlight muscle definition and create dramatic effects.', 'flexframe-viewer'); ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Dust Particles Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="particles-settings-content">
                                    <h4><span class="dashicons dashicons-star-filled"></span> <?php _e('Dust Particles', 'flexframe-viewer'); ?></h4>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="particles-settings-content">
                                    <div class="flexframe-custom-settings">
                                        <?php
                                        // Get particle settings with defaults
                                        $particles_enabled = get_option('flexframe_particles_enabled', true);
                                        $particles_count = get_option('flexframe_particles_count', 1150);
                                        $particles_size = get_option('flexframe_particles_size', 0.0095);
                                        $particles_color = get_option('flexframe_particles_color', '#0d529c');
                                        $particles_opacity = get_option('flexframe_particles_opacity', 1);
                                        $particles_speed = get_option('flexframe_particles_speed', 0.5);
                                        ?>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_particles_enabled"><?php _e('Enable Particles', 'flexframe-viewer'); ?></label>
                                            <label class="toggle-switch">
                                                <input type="checkbox" id="flexframe_particles_enabled" name="flexframe_particles_enabled" value="1" <?php checked($particles_enabled, true); ?> />
                                                <span class="toggle-slider"></span>
                                            </label>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_particles_count"><?php _e('Particle Count', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_particles_count" name="flexframe_particles_count" value="<?php echo esc_attr($particles_count); ?>" min="0" max="5000" step="50" />
                                            <span class="range-value"><?php echo esc_html($particles_count); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_particles_size"><?php _e('Particle Size', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_particles_size" name="flexframe_particles_size" value="<?php echo esc_attr($particles_size); ?>" min="0.001" max="0.05" step="0.001" />
                                            <span class="range-value"><?php echo esc_html($particles_size); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_particles_color"><?php _e('Particle Color', 'flexframe-viewer'); ?></label>
                                            <input type="color" id="flexframe_particles_color" name="flexframe_particles_color" value="<?php echo esc_attr($particles_color); ?>" />
                                            <span class="color-hex"><?php echo esc_html($particles_color); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_particles_opacity"><?php _e('Opacity', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_particles_opacity" name="flexframe_particles_opacity" value="<?php echo esc_attr($particles_opacity); ?>" min="0" max="1" step="0.01" />
                                            <span class="range-value"><?php echo esc_html($particles_opacity); ?></span>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label for="flexframe_particles_speed"><?php _e('Animation Speed', 'flexframe-viewer'); ?></label>
                                            <input type="range" id="flexframe_particles_speed" name="flexframe_particles_speed" value="<?php echo esc_attr($particles_speed); ?>" min="0" max="2" step="0.1" />
                                            <span class="range-value"><?php echo esc_html($particles_speed); ?></span>
                                        </div>
                                        
                                        <p class="description">
                                            <?php _e('💡 Floating dust particles add atmosphere and depth to the scene.', 'flexframe-viewer'); ?>
                                        </p>
                                    </div>
                                </div>
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
                
                <div class="flexframe-button-row">
                    <?php submit_button('Save Settings', 'primary', 'submit', false); ?>
                    <button type="button" class="button button-secondary" id="flexframe-export-settings" style="margin-left: 10px;">
                        <span class="dashicons dashicons-clipboard" style="vertical-align: middle; margin-right: 5px;"></span>
                        <?php _e('Export Settings to Clipboard', 'flexframe-viewer'); ?>
                    </button>
                    <span id="export-success-message" style="display: none; color: #00a32a; margin-left: 10px; line-height: 30px;">
                        ✓ <?php _e('Settings copied to clipboard!', 'flexframe-viewer'); ?>
                    </span>
                </div>
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
            transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .flexframe-step-section.disabled {
            opacity: 0.5;
            pointer-events: none;
            filter: grayscale(50%);
        }
        .flexframe-step-section.disabled .flexframe-step-header {
            background: linear-gradient(135deg, #e0e0e0 0%, #f0f0f0 100%);
        }
        .flexframe-step-section.disabled .step-number {
            background: #999;
        }
        .settings-step.disabled {
            opacity: 0.5;
            pointer-events: none;
            filter: grayscale(50%);
        }
        .settings-step.disabled .step-header {
            background: linear-gradient(135deg, #e0e0e0 0%, #f0f0f0 100%);
        }
        .settings-step.disabled .step-number {
            background: #999;
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
        .flexframe-preset-panel .preset-info {
            margin: 0;
            font-size: 14px;
            color: #1d2327;
            display: flex;
            align-items: center;
            gap: 8px;
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
        
        /* Preset Theme Selector */
        .preset-theme-selector {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .preset-theme-selector label {
            font-weight: 500;
            color: #1d2327;
        }
        .preset-theme-select {
            min-width: 200px;
            padding: 6px 12px;
        }
        .preset-theme-description {
            margin: 12px 0 0 0;
            padding: 10px 14px;
            background: #e7f3ff;
            border-radius: 4px;
            color: #1d2327;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .preset-theme-description .dashicons {
            color: #2271b1;
        }
        
        /* Disabled panel state */
        .flexframe-custom-panel.panel-disabled {
            position: relative;
            opacity: 0.6;
            pointer-events: none;
        }
        .flexframe-custom-panel.panel-disabled::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.3);
            z-index: 10;
            border-radius: 6px;
        }
        .flexframe-custom-panel.panel-disabled .custom-panel-header {
            cursor: default;
        }
        
        /* Preset Manager */
        .preset-manager {
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .preset-manager-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 16px;
        }
        .preset-load-section {
            display: flex;
            align-items: flex-end;
            gap: 8px;
        }
        .preset-load-section label {
            font-weight: 500;
            font-size: 13px;
            color: #1d2327;
            margin-bottom: 4px;
            display: block;
        }
        .preset-select {
            min-width: 200px;
        }
        .preset-save-section {
            display: flex;
            gap: 8px;
        }
        .preset-message {
            display: block;
            margin-top: 12px;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 13px;
        }
        .preset-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .preset-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .button-link-delete {
            color: #b32d2e !important;
        }
        .button-link-delete:hover {
            color: #a00 !important;
            background: #fee !important;
        }
        
        /* Save Preset Modal */
        .preset-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preset-modal {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            width: 400px;
            max-width: 90%;
        }
        .preset-modal-header {
            padding: 16px 20px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .preset-modal-header h3 {
            margin: 0;
            font-size: 16px;
        }
        .preset-modal-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
            padding: 0;
            line-height: 1;
        }
        .preset-modal-close:hover {
            color: #000;
        }
        .preset-modal-body {
            padding: 20px;
        }
        .preset-modal-body label {
            display: block;
            font-weight: 500;
            margin-bottom: 8px;
        }
        .preset-modal-body input[type="text"] {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        .preset-modal-footer {
            padding: 16px 20px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        /* Collapsible panel sections */
        .custom-panel-section {
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            margin-bottom: 16px;
            background: #fff;
            overflow: hidden;
        }
        .custom-panel-section:last-child {
            margin-bottom: 0;
        }
        .custom-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 16px;
            background: linear-gradient(135deg, #f8f9fa 0%, #f0f0f1 100%);
            cursor: pointer;
            user-select: none;
            transition: background 0.2s ease;
        }
        .custom-panel-header:hover {
            background: linear-gradient(135deg, #f0f0f1 0%, #e8e8e9 100%);
        }
        .custom-panel-header h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #1d2327;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .custom-panel-header h4 .dashicons {
            color: #2271b1;
            font-size: 18px;
            width: 18px;
            height: 18px;
        }
        .custom-panel-header .toggle-icon {
            color: #646970;
            transition: transform 0.3s ease;
        }
        .custom-panel-header.collapsed .toggle-icon {
            transform: rotate(-90deg);
        }
        .custom-panel-content {
            padding: 16px;
            border-top: 1px solid #e0e0e0;
        }
        .custom-panel-content.collapsed {
            display: none;
        }
        
        /* UI Settings subsections in custom panel */
        .custom-panel-content .ui-settings-section {
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .custom-panel-content .ui-settings-section:last-of-type {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .custom-panel-content .ui-settings-section h5 {
            font-size: 13px;
            font-weight: 600;
            color: #1d2327;
            margin: 0 0 12px 0;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .custom-panel-content .ui-settings-section h5 .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
            color: #50575e;
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
        .dashicons.spin {
            animation: spin 1s linear infinite;
        }
        
        /* Loader Type Options */
        .loader-type-options {
            display: flex;
            gap: 12px;
            margin-bottom: 8px;
        }
        .loader-type-option {
            cursor: pointer;
        }
        .loader-type-option.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .loader-type-option input[type="radio"] {
            display: none;
        }
        .loader-type-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px 20px;
            border: 2px solid #c3c4c7;
            border-radius: 8px;
            background: #f6f7f7;
            transition: all 0.2s ease;
        }
        .loader-type-option:hover:not(.disabled) .loader-type-card {
            border-color: #2271b1;
            background: #f0f6fc;
        }
        .loader-type-option.selected .loader-type-card {
            border-color: #2271b1;
            background: #f0f6fc;
            box-shadow: 0 0 0 1px #2271b1;
        }
        .loader-type-icon {
            font-size: 24px;
            margin-bottom: 4px;
        }
        .loader-type-icon .dashicons {
            font-size: 24px;
            width: 24px;
            height: 24px;
        }
        .loader-type-label {
            font-size: 12px;
            font-weight: 500;
        }
        .logo-warning {
            color: #d63638;
            margin-top: 8px;
        }
        .logo-warning .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
            vertical-align: text-bottom;
        }
        
        /* Preview Logo Loader */
        .preview-logo-loader {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
        }
        .logo-loader-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .logo-loader-img.pulse {
            animation: logoPulse 1.5s ease-in-out infinite;
        }
        .logo-loader-img.spin {
            animation: logoSpin 2s linear infinite;
        }
        .logo-loader-img.fade {
            animation: logoFade 1.5s ease-in-out infinite;
        }
        .logo-loader-img.bounce {
            animation: logoBounce 1s ease-in-out infinite;
        }
        @keyframes logoPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes logoSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes logoFade {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        @keyframes logoBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .logo-placeholder {
            width: 60px;
            height: 60px;
            border: 2px dashed rgba(255,255,255,0.3);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo-placeholder .dashicons {
            font-size: 24px;
            color: rgba(255,255,255,0.4);
        }
        
        /* Size value display */
        .size-value {
            display: inline-block;
            margin-left: 10px;
            font-weight: 500;
            min-width: 50px;
        }
        
        /* Toggle Switch */
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 26px;
            vertical-align: middle;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.3s;
            border-radius: 26px;
        }
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
        }
        .toggle-switch input:checked + .toggle-slider {
            background-color: #2271b1;
        }
        .toggle-switch input:checked + .toggle-slider:before {
            transform: translateX(24px);
        }
    </style>
    
    <script>
    jQuery(document).ready(function($) {
        // Toggle loader type (spinner vs logo)
        $('input[name="flexframe_use_logo_loader"]').on('change', function() {
            var useLogo = $(this).val() === '1';
            
            // Update card selection
            $('.loader-type-option').removeClass('selected');
            $(this).closest('.loader-type-option').addClass('selected');
            
            // Toggle options visibility
            if (useLogo) {
                $('.spinner-options').slideUp(200);
                $('.logo-loader-options').slideDown(200);
                $('#preview-spinner').hide();
                $('#preview-logo-loader').show();
            } else {
                $('.spinner-options').slideDown(200);
                $('.logo-loader-options').slideUp(200);
                $('#preview-spinner').show();
                $('#preview-logo-loader').hide();
            }
        });
        
        // Update logo loader animation preview
        $('#flexframe_logo_loader_animation').on('change', function() {
            var animation = $(this).val();
            var img = $('#preview-logo-loader .logo-loader-img');
            img.removeClass('pulse spin fade bounce').addClass(animation);
        });
        
        // Update logo loader size preview
        $('#flexframe_logo_loader_size').on('input', function() {
            var size = $(this).val();
            $(this).siblings('.size-value').text(size + 'px');
            $('#preview-logo-loader .logo-loader-img').css('width', size + 'px');
        });
        
        // Update hex display and sync related colors when primary color changes
        $('#flexframe_primary_color').on('input change', function() {
            var color = $(this).val();
            $(this).siblings('.color-hex-display').text(color);
            
            // Sync to Animation Player - Button Background
            $('#flexframe_player_button_bg_color').val(color);
            $('#flexframe_player_button_bg_color').siblings('.color-value').text(color);
            
            // Sync to Animation Player - Accent Color
            $('#flexframe_player_accent_color').val(color);
            $('#flexframe_player_accent_color').siblings('.color-value').text(color);
            
            // Sync to Menus & Panels - Accent Color
            $('#flexframe_menu_accent_color').val(color);
            $('#flexframe_menu_accent_color').siblings('.color-value').text(color);
            
            // Sync to Dust Particles - Color
            $('#flexframe_particles_color').val(color);
            $('#flexframe_particles_color').siblings('.color-value').text(color);
            
            // Sync to Directional Light - Color
            $('#flexframe_directional_color').val(color);
            $('#flexframe_directional_color').siblings('.color-value').text(color);
            
            // Update the UI preview
            if (typeof updateUIPreview === 'function') {
                updateUIPreview();
            }
        });
        
        // Collapsible panel sections
        $('.custom-panel-header').on('click', function() {
            var $header = $(this);
            var targetId = $header.data('target');
            var $content = $('#' + targetId);
            
            $header.toggleClass('collapsed');
            $content.slideToggle(200);
        });
        
        // Toggle theme mode (preset vs custom)
        $('input[name="flexframe_material_mode"]').on('change', function() {
            var mode = $(this).val();
            
            // Update card selection - remove selected from all, add to current
            $('.theme-option').removeClass('selected');
            $(this).closest('.theme-option').addClass('selected');
            
            if (mode === 'preset') {
                $('.flexframe-preset-panel').slideDown(200);
                $('.flexframe-custom-panel').addClass('panel-disabled');
            } else {
                $('.flexframe-preset-panel').slideUp(200);
                $('.flexframe-custom-panel').removeClass('panel-disabled');
            }
        });
        
        // =====================
        // Built-in Theme Presets
        // =====================
        
        // Preset theme definitions
        var builtInPresets = {
            'default': {
                name: '<?php _e('Default Settings', 'flexframe-viewer'); ?>',
                description: '<?php _e('Optimized settings with your brand colors.', 'flexframe-viewer'); ?>',
                settings: {
                    // Use primary color from Step 1 for these (marked with 'primary')
                    spinnerColor: '#00f510',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    playerBgColor: '#828282',
                    playerBgOpacity: 0,
                    playerButtonBgColor: 'primary', // Will use primary color
                    playerButtonBgOpacity: 0.8,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary', // Will use primary color
                    playerAlwaysVisible: 'no',
                    menuBgColor: '#000000',
                    menuBgOpacity: 0.9,
                    menuTextColor: '#ffffff',
                    menuAccentColor: 'primary', // Will use primary color
                    hideRightMenu: false,
                    // Material settings
                    skinColor: '#ccdef5',
                    skinOpacity: 1,
                    skinRoughness: 0,
                    skinMetalness: 0,
                    skinTransmission: 1,
                    skinThickness: 0,
                    skinIor: 1,
                    skinEnvIntensity: 2.29,
                    // Scene Background settings
                    bgGradientTop: '#3865ad',
                    bgGradientBottom: '#0101bc',
                    bgGradientOpacity: 1,
                    // Lighting settings
                    ambientIntensity: 0.4,
                    ambientColor: '#ffffff',
                    directionalIntensity: 1.43,
                    directionalColor: '#ffffff',
                    directionalPosX: 1.35,
                    directionalPosY: 1.57,
                    directionalPosZ: 0.9,
                    // Particle settings
                    particlesEnabled: true,
                    particleCount: 1150,
                    particleSize: 0.0095,
                    particleColor: '#0d529c',
                    particleOpacity: 1,
                    particleSpeed: 0.5
                }
            },
            'dark': {
                name: '<?php _e('Dark Theme', 'flexframe-viewer'); ?>',
                description: '<?php _e('Dark interface with high contrast. Great for dark websites.', 'flexframe-viewer'); ?>',
                settings: {
                    spinnerColor: '#00f510',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    playerBgColor: '#1a1a1a',
                    playerBgOpacity: 0.95,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 0.9,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    menuBgColor: '#1a1a1a',
                    menuBgOpacity: 0.95,
                    menuTextColor: '#ffffff',
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    // Material settings
                    skinColor: '#ccdef5',
                    skinOpacity: 1,
                    skinRoughness: 0,
                    skinMetalness: 0,
                    skinTransmission: 1,
                    skinThickness: 0,
                    skinIor: 1,
                    skinEnvIntensity: 2.29,
                    // Scene Background settings - darker gradient for dark theme
                    bgGradientTop: '#1a1a2e',
                    bgGradientBottom: '#16213e',
                    bgGradientOpacity: 1,
                    // Lighting settings
                    ambientIntensity: 0.4,
                    ambientColor: '#ffffff',
                    directionalIntensity: 1.43,
                    directionalColor: '#ffffff',
                    directionalPosX: 1.35,
                    directionalPosY: 1.57,
                    directionalPosZ: 0.9,
                    // Particle settings
                    particlesEnabled: true,
                    particleCount: 1150,
                    particleSize: 0.0095,
                    particleColor: '#4a69bd',
                    particleOpacity: 1,
                    particleSpeed: 0.5
                }
            },
            'light': {
                name: '<?php _e('Light Theme', 'flexframe-viewer'); ?>',
                description: '<?php _e('Light interface with soft colors. Great for light websites.', 'flexframe-viewer'); ?>',
                settings: {
                    spinnerColor: 'primary',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    playerBgColor: '#f5f5f5',
                    playerBgOpacity: 0.95,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 0.9,
                    playerIconColor: '#333333',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    menuBgColor: '#ffffff',
                    menuBgOpacity: 0.95,
                    menuTextColor: '#333333',
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    // Material settings
                    skinColor: '#ccdef5',
                    skinOpacity: 1,
                    skinRoughness: 0,
                    skinMetalness: 0,
                    skinTransmission: 1,
                    skinThickness: 0,
                    skinIor: 1,
                    skinEnvIntensity: 2.29,
                    // Scene Background settings - lighter gradient for light theme
                    bgGradientTop: '#87ceeb',
                    bgGradientBottom: '#e0f6ff',
                    bgGradientOpacity: 1,
                    // Lighting settings
                    ambientIntensity: 0.5,
                    ambientColor: '#ffffff',
                    directionalIntensity: 1.5,
                    directionalColor: '#ffffff',
                    directionalPosX: 1.35,
                    directionalPosY: 1.57,
                    directionalPosZ: 0.9,
                    // Particle settings
                    particlesEnabled: true,
                    particleCount: 1150,
                    particleSize: 0.0095,
                    particleColor: '#6eb5ff',
                    particleOpacity: 0.8,
                    particleSpeed: 0.5
                }
            }
        };
        
        // Update preset description when dropdown changes
        $('#flexframe_material_preset').on('change', function() {
            var presetId = $(this).val();
            var preset = builtInPresets[presetId];
            if (preset) {
                $('#preset-desc-text').text(preset.description);
            }
        });
        
        // Apply built-in preset theme
        function applyBuiltInPreset(presetId) {
            var preset = builtInPresets[presetId];
            if (!preset) return;
            
            var settings = preset.settings;
            var primaryColor = $('#flexframe_primary_color').val() || '#2383cd';
            
            // Helper to get color (use primary if marked)
            function getColor(value) {
                return value === 'primary' ? primaryColor : value;
            }
            
            // Apply UI Settings
            $('#flexframe_spinner_color').val(getColor(settings.spinnerColor));
            $('#flexframe_spinner_color').siblings('.color-value').text(getColor(settings.spinnerColor));
            
            $('input[name="flexframe_use_logo_loader"][value="' + (settings.useLogoLoader ? '1' : '0') + '"]').prop('checked', true).trigger('change');
            
            $('#flexframe_logo_loader_animation').val(settings.logoLoaderAnimation);
            $('#flexframe_logo_loader_size').val(settings.logoLoaderSize);
            $('#flexframe_logo_loader_size').siblings('.size-value').text(settings.logoLoaderSize + 'px');
            
            $('#flexframe_player_bg_color').val(getColor(settings.playerBgColor));
            $('#flexframe_player_bg_color').siblings('.color-value').text(getColor(settings.playerBgColor));
            $('#flexframe_player_bg_opacity').val(settings.playerBgOpacity);
            $('#flexframe_player_bg_opacity').siblings('.opacity-value').text(settings.playerBgOpacity);
            
            $('#flexframe_player_button_bg_color').val(getColor(settings.playerButtonBgColor));
            $('#flexframe_player_button_bg_color').siblings('.color-value').text(getColor(settings.playerButtonBgColor));
            $('#flexframe_player_button_bg_opacity').val(settings.playerButtonBgOpacity);
            $('#flexframe_player_button_bg_opacity').siblings('.opacity-value').text(settings.playerButtonBgOpacity);
            
            $('#flexframe_player_icon_color').val(getColor(settings.playerIconColor));
            $('#flexframe_player_icon_color').siblings('.color-value').text(getColor(settings.playerIconColor));
            
            $('#flexframe_player_accent_color').val(getColor(settings.playerAccentColor));
            $('#flexframe_player_accent_color').siblings('.color-value').text(getColor(settings.playerAccentColor));
            
            $('#flexframe_player_always_visible').val(settings.playerAlwaysVisible);
            
            $('#flexframe_menu_bg_color').val(getColor(settings.menuBgColor));
            $('#flexframe_menu_bg_color').siblings('.color-value').text(getColor(settings.menuBgColor));
            $('#flexframe_menu_bg_opacity').val(settings.menuBgOpacity);
            $('#flexframe_menu_bg_opacity').siblings('.opacity-value').text(settings.menuBgOpacity);
            
            $('#flexframe_menu_text_color').val(getColor(settings.menuTextColor));
            $('#flexframe_menu_text_color').siblings('.color-value').text(getColor(settings.menuTextColor));
            
            $('#flexframe_menu_accent_color').val(getColor(settings.menuAccentColor));
            $('#flexframe_menu_accent_color').siblings('.color-value').text(getColor(settings.menuAccentColor));
            
            $('#flexframe_hide_right_menu').prop('checked', settings.hideRightMenu);
            
            // Apply Material Settings - trigger input events so values are recognized
            $('#flexframe_skin_color').val(settings.skinColor).trigger('input').trigger('change');
            $('#flexframe_skin_color').siblings('.color-hex').text(settings.skinColor);
            
            $('#flexframe_skin_opacity').val(settings.skinOpacity).trigger('input');
            $('#flexframe_skin_opacity').siblings('.range-value').text(settings.skinOpacity);
            
            $('#flexframe_skin_roughness').val(settings.skinRoughness).trigger('input');
            $('#flexframe_skin_roughness').siblings('.range-value').text(settings.skinRoughness);
            
            $('#flexframe_skin_metalness').val(settings.skinMetalness).trigger('input');
            $('#flexframe_skin_metalness').siblings('.range-value').text(settings.skinMetalness);
            
            $('#flexframe_skin_transmission').val(settings.skinTransmission).trigger('input');
            $('#flexframe_skin_transmission').siblings('.range-value').text(settings.skinTransmission);
            
            $('#flexframe_skin_thickness').val(settings.skinThickness).trigger('input');
            $('#flexframe_skin_thickness').siblings('.range-value').text(settings.skinThickness);
            
            $('#flexframe_skin_ior').val(settings.skinIor).trigger('input');
            $('#flexframe_skin_ior').siblings('.range-value').text(settings.skinIor);
            
            $('#flexframe_skin_env_intensity').val(settings.skinEnvIntensity).trigger('input');
            $('#flexframe_skin_env_intensity').siblings('.range-value').text(settings.skinEnvIntensity);
            
            console.log('Applied skin settings:', {
                color: settings.skinColor,
                opacity: settings.skinOpacity,
                transmission: settings.skinTransmission,
                ior: settings.skinIor,
                envIntensity: settings.skinEnvIntensity
            });
            
            // Apply Scene Background Settings
            $('#flexframe_bg_gradient_top').val(settings.bgGradientTop).trigger('input');
            $('#flexframe_bg_gradient_top').siblings('.color-value').text(settings.bgGradientTop);
            $('#flexframe_bg_gradient_bottom').val(settings.bgGradientBottom).trigger('input');
            $('#flexframe_bg_gradient_bottom').siblings('.color-value').text(settings.bgGradientBottom);
            $('#flexframe_bg_opacity').val(settings.bgGradientOpacity).trigger('input');
            $('#flexframe_bg_opacity').siblings('.opacity-value').text(settings.bgGradientOpacity);
            
            // Apply Lighting Settings
            $('#flexframe_ambient_intensity').val(settings.ambientIntensity).trigger('input');
            $('#flexframe_ambient_intensity').siblings('.range-value').text(settings.ambientIntensity);
            $('#flexframe_ambient_color').val(settings.ambientColor).trigger('input');
            $('#flexframe_ambient_color').siblings('.color-value').text(settings.ambientColor);
            $('#flexframe_directional_intensity').val(settings.directionalIntensity).trigger('input');
            $('#flexframe_directional_intensity').siblings('.range-value').text(settings.directionalIntensity);
            $('#flexframe_directional_color').val(settings.directionalColor).trigger('input');
            $('#flexframe_directional_color').siblings('.color-value').text(settings.directionalColor);
            $('#flexframe_directional_pos_x').val(settings.directionalPosX).trigger('input');
            $('#flexframe_directional_pos_x').siblings('.range-value').text(settings.directionalPosX);
            $('#flexframe_directional_pos_y').val(settings.directionalPosY).trigger('input');
            $('#flexframe_directional_pos_y').siblings('.range-value').text(settings.directionalPosY);
            $('#flexframe_directional_pos_z').val(settings.directionalPosZ).trigger('input');
            $('#flexframe_directional_pos_z').siblings('.range-value').text(settings.directionalPosZ);
            
            // Apply Particle Settings
            $('input[name="flexframe_particles_enabled"][value="' + (settings.particlesEnabled ? '1' : '0') + '"]').prop('checked', true).trigger('change');
            $('#flexframe_particle_count').val(settings.particleCount).trigger('input');
            $('#flexframe_particle_count').siblings('.range-value').text(settings.particleCount);
            $('#flexframe_particle_size').val(settings.particleSize).trigger('input');
            $('#flexframe_particle_size').siblings('.range-value').text(settings.particleSize);
            $('#flexframe_particle_color').val(settings.particleColor).trigger('input');
            $('#flexframe_particle_color').siblings('.color-value').text(settings.particleColor);
            $('#flexframe_particle_opacity').val(settings.particleOpacity).trigger('input');
            $('#flexframe_particle_opacity').siblings('.range-value').text(settings.particleOpacity);
            $('#flexframe_particle_speed').val(settings.particleSpeed).trigger('input');
            $('#flexframe_particle_speed').siblings('.range-value').text(settings.particleSpeed);
            
            console.log('Applied scene settings:', {
                background: { top: settings.bgGradientTop, bottom: settings.bgGradientBottom, opacity: settings.bgGradientOpacity },
                lighting: { ambient: settings.ambientIntensity, directional: settings.directionalIntensity },
                particles: { enabled: settings.particlesEnabled, count: settings.particleCount }
            });
            
            // Update UI preview if available
            if (typeof updateUIPreview === 'function') {
                updateUIPreview();
            }
        }
        
        // Apply Theme button click
        $('#apply-preset-theme').on('click', function() {
            var presetId = $('#flexframe_material_preset').val();
            // Temporarily remove disabled state to ensure values are set properly
            var wasDisabled = $('.flexframe-custom-panel').hasClass('panel-disabled');
            $('.flexframe-custom-panel').removeClass('panel-disabled');
            
            applyBuiltInPreset(presetId);
            
            // Re-apply disabled state if it was disabled
            if (wasDisabled) {
                $('.flexframe-custom-panel').addClass('panel-disabled');
            }
            
            // Show success feedback and disable button
            var $btn = $(this);
            $btn.prop('disabled', true).html('<span class="dashicons dashicons-yes" style="margin-top: 4px;"></span> <?php _e('Saving...', 'flexframe-viewer'); ?>');
            
            // Submit by clicking the main save button
            setTimeout(function() {
                $('#submit').click();
            }, 100);
        });
        
        // Apply preset on page load if preset mode is selected
        if ($('input[name="flexframe_material_mode"]:checked').val() === 'preset') {
            // Set initial description
            var initialPreset = $('#flexframe_material_preset').val();
            if (builtInPresets[initialPreset]) {
                $('#preset-desc-text').text(builtInPresets[initialPreset].description);
            }
        }
        
        // =====================
        // Custom Preset Manager
        // =====================
        
        // Enable/disable load and delete buttons based on selection
        $('#flexframe_load_preset').on('change', function() {
            var hasSelection = $(this).val() !== '';
            $('#flexframe-load-preset-btn').prop('disabled', !hasSelection);
            $('#flexframe-delete-preset-btn').prop('disabled', !hasSelection);
        });
        
        // Show preset message
        function showPresetMessage(message, type) {
            var $msg = $('#preset-action-message');
            $msg.removeClass('success error').addClass(type).text(message).fadeIn(200);
            setTimeout(function() {
                $msg.fadeOut(200);
            }, 3000);
        }
        
        // Get current settings for saving
        function getCurrentSettings() {
            return {
                // Step 1 - Brand Settings
                primary_color_mode: $('input[name="flexframe_primary_color_mode"]:checked').val(),
                primary_color: $('#flexframe_primary_color').val(),
                // UI Settings
                spinner_color: $('#flexframe_spinner_color').val(),
                use_logo_loader: $('input[name="flexframe_use_logo_loader"]:checked').val() === '1',
                logo_loader_animation: $('#flexframe_logo_loader_animation').val(),
                logo_loader_size: $('#flexframe_logo_loader_size').val(),
                player_bg_color: $('#flexframe_player_bg_color').val(),
                player_bg_opacity: $('#flexframe_player_bg_opacity').val(),
                player_button_bg_color: $('#flexframe_player_button_bg_color').val(),
                player_button_bg_opacity: $('#flexframe_player_button_bg_opacity').val(),
                player_icon_color: $('#flexframe_player_icon_color').val(),
                player_accent_color: $('#flexframe_player_accent_color').val(),
                player_always_visible: $('#flexframe_player_always_visible').val(),
                player_width: $('#flexframe_player_width').val(),
                player_show_time: $('#flexframe_player_show_time').is(':checked'),
                menu_bg_color: $('#flexframe_menu_bg_color').val(),
                menu_bg_opacity: $('#flexframe_menu_bg_opacity').val(),
                menu_text_color: $('#flexframe_menu_text_color').val(),
                menu_accent_color: $('#flexframe_menu_accent_color').val(),
                hide_right_menu: $('#flexframe_hide_right_menu').is(':checked'),
                // Material Settings
                skin_color: $('#flexframe_skin_color').val(),
                skin_opacity: $('#flexframe_skin_opacity').val(),
                skin_roughness: $('#flexframe_skin_roughness').val(),
                skin_metalness: $('#flexframe_skin_metalness').val(),
                skin_transmission: $('#flexframe_skin_transmission').val(),
                skin_thickness: $('#flexframe_skin_thickness').val(),
                skin_ior: $('#flexframe_skin_ior').val(),
                skin_env_intensity: $('#flexframe_skin_env_intensity').val(),
                // Scene Background Settings
                bg_gradient_top: $('#flexframe_bg_gradient_top').val(),
                bg_gradient_bottom: $('#flexframe_bg_gradient_bottom').val(),
                bg_gradient_opacity: $('#flexframe_bg_opacity').val(),
                // Lighting Settings
                ambient_intensity: $('#flexframe_ambient_intensity').val(),
                ambient_color: $('#flexframe_ambient_color').val(),
                directional_intensity: $('#flexframe_directional_intensity').val(),
                directional_color: $('#flexframe_directional_color').val(),
                directional_pos_x: $('#flexframe_directional_pos_x').val(),
                directional_pos_y: $('#flexframe_directional_pos_y').val(),
                directional_pos_z: $('#flexframe_directional_pos_z').val(),
                // Particle Settings
                particles_enabled: $('input[name="flexframe_particles_enabled"]:checked').val() === '1',
                particle_count: $('#flexframe_particle_count').val(),
                particle_size: $('#flexframe_particle_size').val(),
                particle_color: $('#flexframe_particle_color').val(),
                particle_opacity: $('#flexframe_particle_opacity').val(),
                particle_speed: $('#flexframe_particle_speed').val()
            };
        }
        
        // Apply settings from preset
        function applyPresetSettings(settings) {
            // UI Settings
            $('#flexframe_spinner_color').val(settings.spinner_color).trigger('input');
            $('#flexframe_spinner_color').siblings('.color-value').text(settings.spinner_color);
            
            $('input[name="flexframe_use_logo_loader"][value="' + (settings.use_logo_loader ? '1' : '0') + '"]').prop('checked', true).trigger('change');
            
            $('#flexframe_logo_loader_animation').val(settings.logo_loader_animation);
            $('#flexframe_logo_loader_size').val(settings.logo_loader_size);
            $('#flexframe_logo_loader_size').siblings('.size-value').text(settings.logo_loader_size + 'px');
            
            $('#flexframe_player_bg_color').val(settings.player_bg_color).trigger('input');
            $('#flexframe_player_bg_color').siblings('.color-value').text(settings.player_bg_color);
            $('#flexframe_player_bg_opacity').val(settings.player_bg_opacity);
            $('#flexframe_player_bg_opacity').siblings('.opacity-value').text(settings.player_bg_opacity);
            
            $('#flexframe_player_button_bg_color').val(settings.player_button_bg_color).trigger('input');
            $('#flexframe_player_button_bg_color').siblings('.color-value').text(settings.player_button_bg_color);
            $('#flexframe_player_button_bg_opacity').val(settings.player_button_bg_opacity);
            $('#flexframe_player_button_bg_opacity').siblings('.opacity-value').text(settings.player_button_bg_opacity);
            
            $('#flexframe_player_icon_color').val(settings.player_icon_color).trigger('input');
            $('#flexframe_player_icon_color').siblings('.color-value').text(settings.player_icon_color);
            
            $('#flexframe_player_accent_color').val(settings.player_accent_color).trigger('input');
            $('#flexframe_player_accent_color').siblings('.color-value').text(settings.player_accent_color);
            
            $('#flexframe_player_always_visible').val(settings.player_always_visible);
            
            $('#flexframe_menu_bg_color').val(settings.menu_bg_color).trigger('input');
            $('#flexframe_menu_bg_color').siblings('.color-value').text(settings.menu_bg_color);
            $('#flexframe_menu_bg_opacity').val(settings.menu_bg_opacity);
            $('#flexframe_menu_bg_opacity').siblings('.opacity-value').text(settings.menu_bg_opacity);
            
            $('#flexframe_menu_text_color').val(settings.menu_text_color).trigger('input');
            $('#flexframe_menu_text_color').siblings('.color-value').text(settings.menu_text_color);
            
            $('#flexframe_menu_accent_color').val(settings.menu_accent_color).trigger('input');
            $('#flexframe_menu_accent_color').siblings('.color-value').text(settings.menu_accent_color);
            
            $('#flexframe_hide_right_menu').prop('checked', settings.hide_right_menu);
            
            // Material Settings
            $('#flexframe_skin_color').val(settings.skin_color);
            $('#flexframe_skin_color').siblings('.color-hex').text(settings.skin_color);
            $('#flexframe_skin_opacity').val(settings.skin_opacity);
            $('#flexframe_skin_opacity').siblings('.range-value').text(settings.skin_opacity);
            $('#flexframe_skin_roughness').val(settings.skin_roughness);
            $('#flexframe_skin_roughness').siblings('.range-value').text(settings.skin_roughness);
            $('#flexframe_skin_metalness').val(settings.skin_metalness);
            $('#flexframe_skin_metalness').siblings('.range-value').text(settings.skin_metalness);
            $('#flexframe_skin_transmission').val(settings.skin_transmission);
            $('#flexframe_skin_transmission').siblings('.range-value').text(settings.skin_transmission);
            $('#flexframe_skin_thickness').val(settings.skin_thickness);
            $('#flexframe_skin_thickness').siblings('.range-value').text(settings.skin_thickness);
            $('#flexframe_skin_ior').val(settings.skin_ior);
            $('#flexframe_skin_ior').siblings('.range-value').text(settings.skin_ior);
            $('#flexframe_skin_env_intensity').val(settings.skin_env_intensity);
            $('#flexframe_skin_env_intensity').siblings('.range-value').text(settings.skin_env_intensity);
            
            // Scene Background Settings (if present - for backwards compatibility)
            if (settings.bg_gradient_top !== undefined) {
                $('#flexframe_bg_gradient_top').val(settings.bg_gradient_top).trigger('input');
                $('#flexframe_bg_gradient_top').siblings('.color-value').text(settings.bg_gradient_top);
            }
            if (settings.bg_gradient_bottom !== undefined) {
                $('#flexframe_bg_gradient_bottom').val(settings.bg_gradient_bottom).trigger('input');
                $('#flexframe_bg_gradient_bottom').siblings('.color-value').text(settings.bg_gradient_bottom);
            }
            if (settings.bg_gradient_opacity !== undefined) {
                $('#flexframe_bg_opacity').val(settings.bg_gradient_opacity).trigger('input');
                $('#flexframe_bg_opacity').siblings('.opacity-value').text(settings.bg_gradient_opacity);
            }
            
            // Lighting Settings (if present)
            if (settings.ambient_intensity !== undefined) {
                $('#flexframe_ambient_intensity').val(settings.ambient_intensity).trigger('input');
                $('#flexframe_ambient_intensity').siblings('.range-value').text(settings.ambient_intensity);
            }
            if (settings.ambient_color !== undefined) {
                $('#flexframe_ambient_color').val(settings.ambient_color).trigger('input');
                $('#flexframe_ambient_color').siblings('.color-value').text(settings.ambient_color);
            }
            if (settings.directional_intensity !== undefined) {
                $('#flexframe_directional_intensity').val(settings.directional_intensity).trigger('input');
                $('#flexframe_directional_intensity').siblings('.range-value').text(settings.directional_intensity);
            }
            if (settings.directional_color !== undefined) {
                $('#flexframe_directional_color').val(settings.directional_color).trigger('input');
                $('#flexframe_directional_color').siblings('.color-value').text(settings.directional_color);
            }
            if (settings.directional_pos_x !== undefined) {
                $('#flexframe_directional_pos_x').val(settings.directional_pos_x).trigger('input');
                $('#flexframe_directional_pos_x').siblings('.range-value').text(settings.directional_pos_x);
            }
            if (settings.directional_pos_y !== undefined) {
                $('#flexframe_directional_pos_y').val(settings.directional_pos_y).trigger('input');
                $('#flexframe_directional_pos_y').siblings('.range-value').text(settings.directional_pos_y);
            }
            if (settings.directional_pos_z !== undefined) {
                $('#flexframe_directional_pos_z').val(settings.directional_pos_z).trigger('input');
                $('#flexframe_directional_pos_z').siblings('.range-value').text(settings.directional_pos_z);
            }
            
            // Particle Settings (if present)
            if (settings.particles_enabled !== undefined) {
                $('input[name="flexframe_particles_enabled"][value="' + (settings.particles_enabled ? '1' : '0') + '"]').prop('checked', true).trigger('change');
            }
            if (settings.particle_count !== undefined) {
                $('#flexframe_particle_count').val(settings.particle_count).trigger('input');
                $('#flexframe_particle_count').siblings('.range-value').text(settings.particle_count);
            }
            if (settings.particle_size !== undefined) {
                $('#flexframe_particle_size').val(settings.particle_size).trigger('input');
                $('#flexframe_particle_size').siblings('.range-value').text(settings.particle_size);
            }
            if (settings.particle_color !== undefined) {
                $('#flexframe_particle_color').val(settings.particle_color).trigger('input');
                $('#flexframe_particle_color').siblings('.color-value').text(settings.particle_color);
            }
            if (settings.particle_opacity !== undefined) {
                $('#flexframe_particle_opacity').val(settings.particle_opacity).trigger('input');
                $('#flexframe_particle_opacity').siblings('.range-value').text(settings.particle_opacity);
            }
            if (settings.particle_speed !== undefined) {
                $('#flexframe_particle_speed').val(settings.particle_speed).trigger('input');
                $('#flexframe_particle_speed').siblings('.range-value').text(settings.particle_speed);
            }
            
            // Update UI preview
            if (typeof updateUIPreview === 'function') {
                updateUIPreview();
            }
        }
        
        // Save Preset Button - Show Modal
        $('#flexframe-save-preset-btn').on('click', function() {
            var modalHtml = `
                <div class="preset-modal-overlay" id="preset-save-modal">
                    <div class="preset-modal">
                        <div class="preset-modal-header">
                            <h3><?php _e('Save Custom Preset', 'flexframe-viewer'); ?></h3>
                            <button type="button" class="preset-modal-close">&times;</button>
                        </div>
                        <div class="preset-modal-body">
                            <label for="preset-name-input"><?php _e('Preset Name:', 'flexframe-viewer'); ?></label>
                            <input type="text" id="preset-name-input" placeholder="<?php _e('My Custom Theme', 'flexframe-viewer'); ?>" />
                        </div>
                        <div class="preset-modal-footer">
                            <button type="button" class="button preset-modal-cancel"><?php _e('Cancel', 'flexframe-viewer'); ?></button>
                            <button type="button" class="button button-primary" id="preset-save-confirm"><?php _e('Save Preset', 'flexframe-viewer'); ?></button>
                        </div>
                    </div>
                </div>
            `;
            $('body').append(modalHtml);
            $('#preset-name-input').focus();
        });
        
        // Export to Clipboard Button
        $('#flexframe-export-settings-btn').on('click', function() {
            var settings = getCurrentSettings();
            var settingsJson = JSON.stringify(settings, null, 2);
            
            navigator.clipboard.writeText(settingsJson).then(function() {
                showPresetMessage('<?php _e('Settings exported to clipboard!', 'flexframe-viewer'); ?>', 'success');
            }).catch(function(err) {
                // Fallback for older browsers
                var textarea = document.createElement('textarea');
                textarea.value = settingsJson;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    showPresetMessage('<?php _e('Settings exported to clipboard!', 'flexframe-viewer'); ?>', 'success');
                } catch (e) {
                    showPresetMessage('<?php _e('Failed to copy to clipboard', 'flexframe-viewer'); ?>', 'error');
                }
                document.body.removeChild(textarea);
            });
        });
        
        // Close modal
        $(document).on('click', '.preset-modal-close, .preset-modal-cancel, .preset-modal-overlay', function(e) {
            if (e.target === this) {
                $('#preset-save-modal').remove();
            }
        });
        
        // Confirm save preset
        $(document).on('click', '#preset-save-confirm', function() {
            var presetName = $('#preset-name-input').val().trim();
            
            if (!presetName) {
                alert('<?php _e('Please enter a preset name.', 'flexframe-viewer'); ?>');
                return;
            }
            
            var $btn = $(this);
            $btn.prop('disabled', true).text('<?php _e('Saving...', 'flexframe-viewer'); ?>');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_save_custom_preset',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    preset_name: presetName,
                    preset_data: getCurrentSettings()
                },
                success: function(response) {
                    if (response.success) {
                        // Add new preset to dropdown
                        var $select = $('#flexframe_load_preset');
                        $select.append($('<option>', {
                            value: response.data.preset_id,
                            text: presetName
                        }));
                        
                        $('#preset-save-modal').remove();
                        showPresetMessage('<?php _e('Preset saved successfully!', 'flexframe-viewer'); ?>', 'success');
                    } else {
                        alert(response.data.message || '<?php _e('Error saving preset.', 'flexframe-viewer'); ?>');
                        $btn.prop('disabled', false).text('<?php _e('Save Preset', 'flexframe-viewer'); ?>');
                    }
                },
                error: function() {
                    alert('<?php _e('Error saving preset.', 'flexframe-viewer'); ?>');
                    $btn.prop('disabled', false).text('<?php _e('Save Preset', 'flexframe-viewer'); ?>');
                }
            });
        });
        
        // Load Preset Button
        $('#flexframe-load-preset-btn').on('click', function() {
            var presetId = $('#flexframe_load_preset').val();
            if (!presetId) return;
            
            var $btn = $(this);
            $btn.prop('disabled', true);
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_load_custom_preset',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    preset_id: presetId
                },
                success: function(response) {
                    if (response.success) {
                        applyPresetSettings(response.data.preset.settings);
                        showPresetMessage('<?php _e('Preset loaded! Remember to save your settings.', 'flexframe-viewer'); ?>', 'success');
                    } else {
                        showPresetMessage(response.data.message || '<?php _e('Error loading preset.', 'flexframe-viewer'); ?>', 'error');
                    }
                    $btn.prop('disabled', false);
                },
                error: function() {
                    showPresetMessage('<?php _e('Error loading preset.', 'flexframe-viewer'); ?>', 'error');
                    $btn.prop('disabled', false);
                }
            });
        });
        
        // Delete Preset Button
        $('#flexframe-delete-preset-btn').on('click', function() {
            var presetId = $('#flexframe_load_preset').val();
            var presetName = $('#flexframe_load_preset option:selected').text();
            
            if (!presetId) return;
            
            if (!confirm('<?php _e('Are you sure you want to delete the preset:', 'flexframe-viewer'); ?> "' + presetName + '"?')) {
                return;
            }
            
            var $btn = $(this);
            $btn.prop('disabled', true);
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_delete_custom_preset',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    preset_id: presetId
                },
                success: function(response) {
                    if (response.success) {
                        // Remove from dropdown
                        $('#flexframe_load_preset option[value="' + presetId + '"]').remove();
                        $('#flexframe_load_preset').val('').trigger('change');
                        showPresetMessage('<?php _e('Preset deleted successfully!', 'flexframe-viewer'); ?>', 'success');
                    } else {
                        showPresetMessage(response.data.message || '<?php _e('Error deleting preset.', 'flexframe-viewer'); ?>', 'error');
                    }
                    $btn.prop('disabled', false);
                },
                error: function() {
                    showPresetMessage('<?php _e('Error deleting preset.', 'flexframe-viewer'); ?>', 'error');
                    $btn.prop('disabled', false);
                }
            });
        });
        
        // =====================
        // End Preset Manager
        // =====================
        
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
        
        // ============================================
        // Export Settings to Clipboard
        // ============================================
        $('#flexframe-export-settings').on('click', function() {
            var settings = {
                // Step 1: Primary Brand Color
                primaryColorMode: $('input[name="flexframe_primary_color_mode"]').val(),
                primaryColor: $('#flexframe_primary_color').val(),
                
                // Step 2: Logo
                logoUrl: $('#flexframe_logo_url').val(),
                logoThreshold: $('#flexframe_logo_threshold').val(),
                
                // Step 3: Theme/Materials
                materialMode: $('input[name="flexframe_material_mode"]:checked').val(),
                wpSkinPreset: $('input[name="flexframe_wp_skin_preset"]:checked').val(),
                
                // Custom materials (if in custom mode)
                customSkinColor: $('#flexframe_custom_skin_color').val(),
                customSkinMetalness: $('#flexframe_custom_skin_metalness').val(),
                customSkinRoughness: $('#flexframe_custom_skin_roughness').val(),
                customPadColor: $('#flexframe_custom_pad_color').val(),
                customPadMetalness: $('#flexframe_custom_pad_metalness').val(),
                customPadRoughness: $('#flexframe_custom_pad_roughness').val(),
                customPlasticColor: $('#flexframe_custom_plastic_color').val(),
                customPlasticMetalness: $('#flexframe_custom_plastic_metalness').val(),
                customPlasticRoughness: $('#flexframe_custom_plastic_roughness').val(),
                
                // Step 4: Exercise Visibility
                hiddenExercises: $('#flexframe_hidden_exercises').val(),
                
                // Step 5: UI Settings
                spinnerStyle: $('input[name="flexframe_spinner_style"]:checked').val(),
                spinnerColor: $('#flexframe_spinner_color').val(),
                useLogoLoader: $('input[name="flexframe_use_logo_loader"]:checked').val(),
                logoLoaderAnimation: $('input[name="flexframe_logo_loader_animation"]:checked').val(),
                logoLoaderSize: $('#flexframe_logo_loader_size').val(),
                playerBgColor: $('#flexframe_player_bg_color').val(),
                playerBgOpacity: $('#flexframe_player_bg_opacity').val(),
                playerButtonBgColor: $('#flexframe_player_button_bg_color').val(),
                playerButtonBgOpacity: $('#flexframe_player_button_bg_opacity').val(),
                playerButtonIconColor: $('#flexframe_player_button_icon_color').val(),
                playerScrubberColor: $('#flexframe_player_scrubber_color').val(),
                playerScrubberOpacity: $('#flexframe_player_scrubber_opacity').val(),
                
                // Meta
                exportDate: new Date().toISOString(),
                pluginVersion: '<?php echo FLEXFRAME_VERSION; ?>'
            };
            
            var settingsJson = JSON.stringify(settings, null, 2);
            
            navigator.clipboard.writeText(settingsJson).then(function() {
                $('#export-success-message').fadeIn(200);
                setTimeout(function() {
                    $('#export-success-message').fadeOut(200);
                }, 3000);
            }).catch(function(err) {
                // Fallback for older browsers
                var textarea = document.createElement('textarea');
                textarea.value = settingsJson;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                $('#export-success-message').fadeIn(200);
                setTimeout(function() {
                    $('#export-success-message').fadeOut(200);
                }, 3000);
            });
        });
    });
    </script>
    <?php
}
