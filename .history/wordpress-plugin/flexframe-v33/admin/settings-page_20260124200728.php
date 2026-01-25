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
    $preset_data_raw = isset($_POST['preset_data']) ? $_POST['preset_data'] : array();
    
    // Decode JSON if it's a string (from frontend theme editor)
    if (is_string($preset_data_raw)) {
        $preset_data = json_decode(stripslashes($preset_data_raw), true);
        if ($preset_data === null) {
            $preset_data = array();
        }
    } else {
        $preset_data = $preset_data_raw;
    }
    
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
            // Primary Color (for Theme Editor compatibility)
            'primary_color' => sanitize_hex_color($preset_data['primary_color'] ?? '#f50000'),
            'primary_color_mode' => sanitize_text_field($preset_data['primary_color_mode'] ?? 'custom'),
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
 * Sanitize primary color with logging
 */
function flexframe_sanitize_primary_color($value) {
    error_log('[FlexFrame Form Save] Received primary_color value: ' . $value);
    $sanitized = sanitize_hex_color($value);
    error_log('[FlexFrame Form Save] Sanitized primary_color: ' . $sanitized);
    return $sanitized;
}

/**
 * Sanitize primary color mode with logging
 */
function flexframe_sanitize_primary_color_mode($value) {
    error_log('[FlexFrame Form Save] Received primary_color_mode value: ' . $value);
    $sanitized = sanitize_text_field($value);
    error_log('[FlexFrame Form Save] Sanitized primary_color_mode: ' . $sanitized);
    return $sanitized;
}

/**
 * Register settings
 */
function flexframe_register_settings() {
    // Primary color mode: 'default' or 'custom'
    register_setting('flexframe_settings_group', 'flexframe_primary_color_mode', array(
        'type' => 'string',
        'sanitize_callback' => 'flexframe_sanitize_primary_color_mode',
        'default' => 'default'
    ));
    
    // Primary brand color (COLOR_1 material) - only used when mode is 'custom'
    register_setting('flexframe_settings_group', 'flexframe_primary_color', array(
        'type' => 'string',
        'sanitize_callback' => 'flexframe_sanitize_primary_color',
        'default' => '#ff0000'
    ));
    
    register_setting('flexframe_settings_group', 'flexframe_logo_url');
    register_setting('flexframe_settings_group', 'flexframe_logo_threshold');
    
    // Logo border settings
    register_setting('flexframe_settings_group', 'flexframe_logo_border_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => false
    ));
    register_setting('flexframe_settings_group', 'flexframe_logo_border_size', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 2
    ));
    
    // Logo display size (percentage of container)
    register_setting('flexframe_settings_group', 'flexframe_logo_display_size', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 100
    ));
    
    // Background logo settings
    register_setting('flexframe_settings_group', 'flexframe_bg_logo_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => false
    ));
    register_setting('flexframe_settings_group', 'flexframe_bg_logo_size', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 150
    ));
    register_setting('flexframe_settings_group', 'flexframe_bg_logo_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.5
    ));
    register_setting('flexframe_settings_group', 'flexframe_bg_logo_pos_x', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 50
    ));
    register_setting('flexframe_settings_group', 'flexframe_bg_logo_pos_y', array(
        'type' => 'number',
        'sanitize_callback' => 'absint',
        'default' => 90
    ));
    
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
    
    // ========== Equipment Material Settings ==========
    // Materials: BARBELL, BUMPER, CABLE, CHROME, COLOR1, METAL, PAD, PLASTIC, RUBBER
    
    $equipment_materials = array(
        'barbell' => array(
            'color' => '#c0c0c0',
            'opacity' => 1,
            'metalness' => 0.9,
            'roughness' => 0.3,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'bumper' => array(
            'color' => '#1a1a1a',
            'opacity' => 1,
            'metalness' => 0,
            'roughness' => 0.8,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'cable' => array(
            'color' => '#2a2a2a',
            'opacity' => 1,
            'metalness' => 0.1,
            'roughness' => 0.6,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'chrome' => array(
            'color' => '#ffffff',
            'opacity' => 1,
            'metalness' => 0.82,
            'roughness' => 0.07,
            'color_map_enabled' => false,
            'bump_scale' => 0,
            'normal_scale' => 0,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'color1' => array(
            'color' => '#ff0000',
            'opacity' => 1,
            'metalness' => 0,
            'roughness' => 0.22,
            'color_map_enabled' => false,
            'bump_scale' => 0,
            'normal_scale' => 0,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'metal' => array(
            'color' => '#808080',
            'opacity' => 1,
            'metalness' => 0.8,
            'roughness' => 0.4,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'pad' => array(
            'color' => '#1a1a1a',
            'opacity' => 1,
            'metalness' => 0,
            'roughness' => 0.9,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'plastic' => array(
            'color' => '#2a2a2a',
            'opacity' => 1,
            'metalness' => 0,
            'roughness' => 0.5,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0.3,
            'clearcoat_roughness' => 0.2,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        ),
        'rubber' => array(
            'color' => '#1a1a1a',
            'opacity' => 1,
            'metalness' => 0,
            'roughness' => 0.95,
            'color_map_enabled' => true,
            'bump_scale' => 1,
            'normal_scale' => 1,
            'clearcoat' => 0,
            'clearcoat_roughness' => 0,
            'emissive_color' => '#000000',
            'emissive_intensity' => 0,
            'blending' => 'normal',
            'transmission' => 0,
            'thickness' => 0,
            'ior' => 1.5,
            'env_intensity' => 1,
            'sheen' => 0,
            'sheen_roughness' => 0.5,
            'sheen_color' => '#ffffff'
        )
    );
    
    // Register settings for each equipment material
    foreach ($equipment_materials as $mat_key => $defaults) {
        // Enable/disable toggle for this material's custom settings
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_enabled", array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
            'default' => false
        ));
        
        // Color
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_color", array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_hex_color',
            'default' => $defaults['color']
        ));
        
        // Opacity
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_opacity", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['opacity']
        ));
        
        // Metalness
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_metalness", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['metalness']
        ));
        
        // Roughness
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_roughness", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['roughness']
        ));
        
        // Color Map Toggle
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_color_map_enabled", array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
            'default' => $defaults['color_map_enabled']
        ));
        
        // Bump Scale
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_bump_scale", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['bump_scale']
        ));
        
        // Normal Scale
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_normal_scale", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['normal_scale']
        ));
        
        // Clearcoat
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_clearcoat", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['clearcoat']
        ));
        
        // Clearcoat Roughness
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_clearcoat_roughness", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['clearcoat_roughness']
        ));
        
        // Emissive Color
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_emissive_color", array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_hex_color',
            'default' => $defaults['emissive_color']
        ));
        
        // Emissive Intensity
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_emissive_intensity", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['emissive_intensity']
        ));
        
        // Blending Mode
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_blending", array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => $defaults['blending']
        ));
        
        // Transmission
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_transmission", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['transmission']
        ));
        
        // Thickness
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_thickness", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['thickness']
        ));
        
        // IOR
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_ior", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['ior']
        ));
        
        // Environment Map Intensity
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_env_intensity", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['env_intensity']
        ));
        
        // Sheen
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_sheen", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['sheen']
        ));
        
        // Sheen Roughness
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_sheen_roughness", array(
            'type' => 'number',
            'sanitize_callback' => 'floatval',
            'default' => $defaults['sheen_roughness']
        ));
        
        // Sheen Color
        register_setting('flexframe_settings_group', "flexframe_{$mat_key}_sheen_color", array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_hex_color',
            'default' => $defaults['sheen_color']
        ));
    }
    
    // Hidden exercises - stored as JSON array of exercise IDs
    register_setting('flexframe_settings_group', 'flexframe_hidden_exercises', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '[]'
    ));
    
    // Custom exercise thumbnails - stored as JSON object { exerciseId: thumbnailUrl }
    register_setting('flexframe_settings_group', 'flexframe_custom_thumbnails', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => '{}'
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
    register_setting('flexframe_settings_group', 'flexframe_menu_text_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
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
    register_setting('flexframe_settings_group', 'flexframe_show_screenshot_button', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_thumbnail_label_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#000000'
    ));
    register_setting('flexframe_settings_group', 'flexframe_thumbnail_label_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.1
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
    $logo_border_enabled = get_option('flexframe_logo_border_enabled', false);
    $logo_border_size = get_option('flexframe_logo_border_size', 2);
    $logo_display_size = get_option('flexframe_logo_display_size', 100);
    $bg_logo_enabled = get_option('flexframe_bg_logo_enabled', false);
    $bg_logo_size = get_option('flexframe_bg_logo_size', 150);
    $bg_logo_opacity = get_option('flexframe_bg_logo_opacity', 0.15);
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
    
    // Custom exercise thumbnails
    $custom_thumbnails = get_option('flexframe_custom_thumbnails', '{}');
    
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
    $menu_text_opacity = get_option('flexframe_menu_text_opacity', 1);
    $menu_accent_color = get_option('flexframe_menu_accent_color', '#f50000');
    $hide_right_menu = get_option('flexframe_hide_right_menu', false);
    $show_screenshot_button = get_option('flexframe_show_screenshot_button', true);
    $thumbnail_label_color = get_option('flexframe_thumbnail_label_color', '#000000');
    $thumbnail_label_opacity = get_option('flexframe_thumbnail_label_opacity', 0.1);
    
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        
        <div class="flexframe-settings-container">
            
            <form method="post" action="options.php" id="flexframe-settings-form">
                <?php
                settings_fields('flexframe_settings_group');
                do_settings_sections('flexframe_settings_group');
                ?>
                
                <!-- Step 1: Create Viewer Page / Exercise Library -->
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="1">
                        <span class="step-number">1</span>
                        <h2><?php _e('Create Your Exercise Library', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        
                        <!-- Getting Started Section -->
                        <div class="flexframe-getting-started">
                            <div class="getting-started-header">
                                <span class="getting-started-icon">🚀</span>
                                <h3><?php _e('Getting Started', 'flexframe-viewer'); ?></h3>
                            </div>
                            <p class="getting-started-desc">
                                <?php _e('Add the FlexFrame 3D Exercise Viewer to any page or post using the shortcode below, or generate an exercise viewer page automatically.', 'flexframe-viewer'); ?>
                            </p>
                            
                            <!-- Shortcode Display Box -->
                            <div class="flexframe-shortcode-box">
                                <div class="shortcode-display">
                                    <code id="flexframe-shortcode">[flexframe_viewer]</code>
                                    <button type="button" class="button button-small copy-shortcode-btn" data-shortcode="[flexframe_viewer]" title="<?php _e('Copy to clipboard', 'flexframe-viewer'); ?>">
                                        <span class="dashicons dashicons-clipboard"></span>
                                    </button>
                                </div>
                                <span class="copy-success" style="display: none; color: #00a32a; margin-left: 8px;">✓ <?php _e('Copied!', 'flexframe-viewer'); ?></span>
                            </div>
                            
                            <!-- Quick Create Button -->
                            <div class="flexframe-create-page-row">
                                <button type="button" id="flexframe-create-viewer-page" class="button button-primary button-hero">
                                    <span class="dashicons dashicons-plus-alt" style="margin-top: 5px; margin-right: 5px;"></span>
                                    <?php _e('Create Exercise Viewer Page', 'flexframe-viewer'); ?>
                                </button>
                                <span id="flexframe-create-page-status" style="margin-left: 10px; line-height: 46px;"></span>
                            </div>
                            <p class="description" style="margin-top: 8px;">
                                <?php _e('Click to automatically create a new page with the FlexFrame viewer shortcode.', 'flexframe-viewer'); ?>
                            </p>
                        </div>
                        
                        <!-- Viewer Page URL Section -->
                        <div class="flexframe-viewer-url-setting">
                            <label for="flexframe_viewer_page_url"><strong><?php _e('Viewer Page URL:', 'flexframe-viewer'); ?></strong></label>
                            <div class="url-input-row">
                                <input type="url" id="flexframe_viewer_page_url" name="flexframe_viewer_page_url" 
                                       value="<?php echo esc_attr($viewer_page_url); ?>" 
                                       class="regular-text"
                                       placeholder="https://yoursite.com/exercise-viewer/" />
                            </div>
                            <p class="description" id="flexframe-url-status">
                                <?php if (!empty($viewer_page_url)): ?>
                                    <span style="color: #00a32a; font-size: 14px;">✓ <?php _e('Viewer page URL is set.', 'flexframe-viewer'); ?></span>
                                    <a href="<?php echo esc_url($viewer_page_url); ?>" target="_blank" class="button button-secondary" style="margin-left: 12px;"><?php _e('View Page →', 'flexframe-viewer'); ?></a>
                                <?php else: ?>
                                    <span style="color: #d63638;">⚠ <?php _e('No viewer page set. Create one above or paste your URL here.', 'flexframe-viewer'); ?></span>
                                <?php endif; ?>
                            </p>
                        </div>
                        
                        <!-- Shortcode Options Collapsible -->
                        <div class="flexframe-shortcode-options">
                            <div class="shortcode-options-header" id="shortcode-options-toggle">
                                <span class="dashicons dashicons-editor-code"></span>
                                <strong><?php _e('Shortcode Options', 'flexframe-viewer'); ?></strong>
                                <span class="toggle-hint"><?php _e('(click to expand)', 'flexframe-viewer'); ?></span>
                            </div>
                            <div class="shortcode-options-content" style="display: none;">
                                <table class="shortcode-examples-table">
                                    <tr>
                                        <td><code>[flexframe_viewer]</code></td>
                                        <td><?php _e('Basic viewer with default settings', 'flexframe-viewer'); ?></td>
                                        <td><button type="button" class="button button-small copy-shortcode-btn" data-shortcode="[flexframe_viewer]"><span class="dashicons dashicons-clipboard"></span></button></td>
                                    </tr>
                                    <tr>
                                        <td><code>[flexframe_viewer height="600px" width="100%"]</code></td>
                                        <td><?php _e('Custom dimensions', 'flexframe-viewer'); ?></td>
                                        <td><button type="button" class="button button-small copy-shortcode-btn" data-shortcode='[flexframe_viewer height="600px" width="100%"]'><span class="dashicons dashicons-clipboard"></span></button></td>
                                    </tr>
                                    <tr>
                                        <td><code>[flexframe_viewer exercise="barbell_back_squat"]</code></td>
                                        <td><?php _e('Load specific exercise', 'flexframe-viewer'); ?></td>
                                        <td><button type="button" class="button button-small copy-shortcode-btn" data-shortcode='[flexframe_viewer exercise="barbell_back_squat"]'><span class="dashicons dashicons-clipboard"></span></button></td>
                                    </tr>
                                    <tr>
                                        <td><code>[flexframe_viewer height="500px" exercise="bench_press"]</code></td>
                                        <td><?php _e('Combined options', 'flexframe-viewer'); ?></td>
                                        <td><button type="button" class="button button-small copy-shortcode-btn" data-shortcode='[flexframe_viewer height="500px" exercise="bench_press"]'><span class="dashicons dashicons-clipboard"></span></button></td>
                                    </tr>
                                </table>
                                <p class="description" style="margin-top: 12px;">
                                    <?php _e('💡 Available exercises: barbell_back_squat, barbell_deadlift, bench_press, seated_lat_pulldown, sumo_deadlift', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                        </div>
                        
                        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e4e7;" />
                        
                        <!-- Exercise Library Section -->
                        <div class="flexframe-library-section">
                            <div class="library-section-header">
                                <span class="library-icon">📚</span>
                                <h3><?php _e('Exercise Library', 'flexframe-viewer'); ?></h3>
                            </div>
                            <p class="step-description" style="margin-bottom: 16px;">
                                <?php _e('Manage which exercises are visible in your viewer. Copy direct links to share specific exercises, or hide exercises you don\'t want your users to see.', 'flexframe-viewer'); ?>
                            </p>
                            
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
                                <!-- Hidden input to store custom thumbnails -->
                                <input type="hidden" id="flexframe_custom_thumbnails" name="flexframe_custom_thumbnails" value="<?php echo esc_attr($custom_thumbnails); ?>" />
                            </div>
                            
                            <p class="description" style="margin-top: 16px;">
                                <?php _e('💡 Tip: Use the direct links to share specific exercises on social media or in emails. Hidden exercises won\'t appear in the exercise menu for your users.', 'flexframe-viewer'); ?>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Upload Your Logo -->
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="2">
                        <span class="step-number">2</span>
                        <h2><?php _e('Upload Your Logo', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
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
                                    <img src="<?php echo esc_url($logo_url); ?>" alt="Logo Preview" 
                                         style="transform: scale(<?php echo esc_attr($logo_display_size / 100); ?>); <?php echo $logo_border_enabled ? 'filter: drop-shadow(0 0 ' . esc_attr($logo_border_size) . 'px white) drop-shadow(0 0 ' . esc_attr($logo_border_size) . 'px white);' : ''; ?>"
                                         id="flexframe_logo_preview_img">
                                </div>
                            <?php else : ?>
                                <div class="flexframe-logo-preview" id="flexframe_logo_preview" style="display:none;">
                                    <img src="" alt="Logo Preview" id="flexframe_logo_preview_img">
                                </div>
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
                            
                            <!-- Logo Display Size -->
                            <div class="flexframe-setting-row">
                                <label for="flexframe_logo_display_size"><?php _e('Logo Display Size', 'flexframe-viewer'); ?></label>
                                <div class="flexframe-slider-control">
                                    <input 
                                        type="range" 
                                        id="flexframe_logo_display_size" 
                                        name="flexframe_logo_display_size" 
                                        value="<?php echo esc_attr($logo_display_size); ?>" 
                                        min="50" 
                                        max="150" 
                                        step="1"
                                        class="flexframe-slider"
                                    />
                                    <span class="flexframe-slider-value" id="logo_display_size_value"><?php echo esc_attr($logo_display_size); ?>%</span>
                                </div>
                                <p class="description">
                                    <?php _e('Adjust the logo size relative to its display area (50-150%). Default: 100%', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <!-- White Border Settings -->
                            <div class="flexframe-setting-row">
                                <label class="flexframe-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        id="flexframe_logo_border_enabled" 
                                        name="flexframe_logo_border_enabled" 
                                        value="1"
                                        <?php checked($logo_border_enabled, true); ?>
                                    />
                                    <?php _e('Add White Border to Logo', 'flexframe-viewer'); ?>
                                </label>
                                <p class="description" style="margin-left: 24px;">
                                    <?php _e('Adds a white border/outline around your logo for better visibility on dark backgrounds.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <div class="flexframe-setting-row flexframe-border-size-row" id="logo_border_size_row" style="<?php echo $logo_border_enabled ? '' : 'display:none;'; ?>">
                                <label for="flexframe_logo_border_size"><?php _e('Border Size', 'flexframe-viewer'); ?></label>
                                <div class="flexframe-slider-control">
                                    <input 
                                        type="range" 
                                        id="flexframe_logo_border_size" 
                                        name="flexframe_logo_border_size" 
                                        value="<?php echo esc_attr($logo_border_size); ?>" 
                                        min="1" 
                                        max="10" 
                                        step="1"
                                        class="flexframe-slider"
                                    />
                                    <span class="flexframe-slider-value" id="logo_border_size_value"><?php echo esc_attr($logo_border_size); ?>px</span>
                                </div>
                                <p class="description">
                                    <?php _e('Thickness of the white border in pixels (1-10). Default: 2px', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <!-- Background Logo Section (Info Only) -->
                            <div class="flexframe-setting-section-divider">
                                <h4><?php _e('Background Logo (Watermark)', 'flexframe-viewer'); ?></h4>
                            </div>
                            
                            <div class="flexframe-bg-logo-info-box">
                                <div class="info-icon">
                                    <span class="dashicons dashicons-info"></span>
                                </div>
                                <div class="info-content">
                                    <p><strong><?php _e('Background logo settings are available in Custom Theme', 'flexframe-viewer'); ?></strong></p>
                                    <p class="description"><?php _e('To add your logo as a watermark on the viewer background, go to Step 4 → Select "Custom Theme" → Scene Background section.', 'flexframe-viewer'); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Primary Brand Color -->
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="3">
                        <span class="step-number">3</span>
                        <h2><?php _e('Select Your Primary Brand Color', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Choose your main brand color. This will be applied to accent elements like bumper plates, kettlebells, and trim colors on machines — helping the 3D models match your gym\'s branding.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Hidden field to always use custom mode when color is set -->
                        <input type="hidden" name="flexframe_primary_color_mode" value="<?php echo !empty($primary_color) ? 'custom' : 'default'; ?>" />
                        
                        <div class="flexframe-color-with-logo">
                            <!-- Color Picker -->
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
                            
                            <!-- Logo Preview for Eyedropper -->
                            <?php if (!empty($logo_url)) : ?>
                            <div class="flexframe-logo-color-reference">
                                <div class="logo-reference-header">
                                    <span class="dashicons dashicons-art"></span>
                                    <strong><?php _e('Your Logo', 'flexframe-viewer'); ?></strong>
                                </div>
                                <div class="logo-reference-preview">
                                    <img src="<?php echo esc_url($logo_url); ?>" alt="Logo for color reference" id="logo-color-reference-img">
                                </div>
                                <p class="logo-reference-hint">
                                    <span class="dashicons dashicons-lightbulb"></span>
                                    <?php _e('Use the eyedropper to sample colors from your logo!', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="4">
                        <span class="step-number">4</span>
                        <h2><?php _e('Select a Theme', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Choose how the anatomical skin layer appears on your 3D models. Select a theme to apply its settings, or create your own in the next step.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Hidden field for material mode - always use preset for base selection -->
                        <input type="hidden" name="flexframe_material_mode" value="preset" />
                        
                        <div class="flexframe-theme-selector-simple">
                            <div class="theme-selector-row">
                                <label for="flexframe_material_preset"><?php _e('Select Theme:', 'flexframe-viewer'); ?></label>
                                <select id="flexframe_material_preset" name="flexframe_material_preset" class="preset-theme-select">
                                    <optgroup label="<?php _e('Built-in Themes', 'flexframe-viewer'); ?>">
                                        <option value="default" <?php selected($material_preset, 'default'); ?>>
                                            <?php _e('Default Settings', 'flexframe-viewer'); ?>
                                        </option>
                                        <option value="dark" <?php selected($material_preset, 'dark'); ?>>
                                            <?php _e('Dark Theme', 'flexframe-viewer'); ?>
                                        </option>
                                        <option value="light" <?php selected($material_preset, 'light'); ?>>
                                            <?php _e('Light Theme', 'flexframe-viewer'); ?>
                                        </option>
                                        <option value="branded" <?php selected($material_preset, 'branded'); ?>>
                                            <?php _e('Branded Theme', 'flexframe-viewer'); ?>
                                        </option>
                                        <option value="random" <?php selected($material_preset, 'random'); ?>>
                                            <?php _e('🎲 Random Theme', 'flexframe-viewer'); ?>
                                        </option>
                                    </optgroup>
                                    <?php if (!empty($custom_presets)) : ?>
                                    <optgroup label="<?php _e('Your Custom Themes', 'flexframe-viewer'); ?>" id="custom-themes-optgroup">
                                        <?php foreach ($custom_presets as $preset_id => $preset) : ?>
                                            <option value="custom:<?php echo esc_attr($preset_id); ?>" <?php selected($material_preset, 'custom:' . $preset_id); ?>>
                                                <?php echo esc_html($preset['name']); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </optgroup>
                                    <?php else : ?>
                                    <optgroup label="<?php _e('Your Custom Themes', 'flexframe-viewer'); ?>" id="custom-themes-optgroup" style="display:none;">
                                    </optgroup>
                                    <?php endif; ?>
                                </select>
                                <button type="button" id="apply-preset-theme" class="button button-primary">
                                    <span class="dashicons dashicons-yes" style="margin-top: 4px;"></span>
                                    <?php _e('Apply Theme', 'flexframe-viewer'); ?>
                                </button>
                                <button type="button" id="delete-custom-theme" class="button button-link-delete" style="display: none;">
                                    <span class="dashicons dashicons-trash" style="margin-top: 4px;"></span>
                                    <?php _e('Delete', 'flexframe-viewer'); ?>
                                </button>
                            </div>
                            <p class="preset-theme-description" id="preset-theme-description">
                                <span class="dashicons dashicons-info"></span>
                                <span id="preset-desc-text"><?php _e('Optimized settings with your brand colors.', 'flexframe-viewer'); ?></span>
                            </p>
                            <p class="theme-hint" style="margin-top: 15px; color: #666; font-size: 13px;">
                                <span class="dashicons dashicons-lightbulb" style="color: #dba617;"></span>
                                <?php _e('Want to customize? The selected theme will be loaded in Step 5 where you can tweak all settings.', 'flexframe-viewer'); ?>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 5: Create a Custom Theme -->
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="5">
                        <span class="step-number">5</span>
                        <h2><?php _e('Create a Custom Theme', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Fine-tune your theme settings below. The theme selected in Step 4 has been loaded as your starting point. Customize any settings, then save your custom theme.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Current Theme Indicator -->
                        <div class="current-theme-indicator">
                            <span class="dashicons dashicons-admin-customizer"></span>
                            <span><?php _e('Based on:', 'flexframe-viewer'); ?></span>
                            <strong id="current-base-theme-name"><?php echo esc_html(ucfirst($material_preset)); ?> Theme</strong>
                        </div>
                        
                        <!-- Save Custom Theme Section -->
                        <div class="save-custom-theme-section">
                            <div class="save-theme-row">
                                <input type="text" id="custom-theme-name" placeholder="<?php _e('Enter custom theme name...', 'flexframe-viewer'); ?>" class="regular-text" />
                                <button type="button" id="save-custom-theme-btn" class="button button-primary button-hero">
                                    <span class="dashicons dashicons-saved" style="margin-top: 6px;"></span>
                                    <?php _e('Save Theme & Apply', 'flexframe-viewer'); ?>
                                </button>
                            </div>
                            <span id="save-theme-message" class="save-theme-message" style="display: none;"></span>
                        </div>
                        
                        <!-- Live Preview Section -->
                        <div class="flexframe-live-preview-section" style="margin: 30px 0; padding: 20px; background: #f8f9fa; border: 2px solid #0073aa; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <h3 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                                    <span class="dashicons dashicons-visibility" style="font-size: 24px; color: #0073aa;"></span>
                                    <?php _e('Live Preview with Theme Editor', 'flexframe-viewer'); ?>
                                </h3>
                                <button type="button" id="toggle-preview-btn" class="button button-secondary">
                                    <span class="dashicons dashicons-visibility"></span>
                                    <?php _e('Show Preview', 'flexframe-viewer'); ?>
                                </button>
                            </div>
                            <p style="margin: 0 0 15px 0; color: #666;">
                                <?php _e('Preview your viewer with live theme editing. Press', 'flexframe-viewer'); ?> <kbd style="background: #fff; padding: 2px 6px; border: 1px solid #ccc; border-radius: 3px; font-family: monospace;">T</kbd> <?php _e('inside the preview to open the Theme Editor.', 'flexframe-viewer'); ?>
                            </p>
                            <div id="live-preview-container" style="display: none; position: relative; width: 100%; height: 600px; border: 3px solid #0073aa; border-radius: 6px; overflow: hidden; background: #000;">
                                <?php
                                $viewer_page_url = get_option('flexframe_viewer_page_url', '');
                                if (!empty($viewer_page_url)) :
                                ?>
                                    <iframe 
                                        id="live-preview-iframe" 
                                        src="<?php echo esc_url($viewer_page_url); ?>" 
                                        style="width: 100%; height: 100%; border: none;"
                                        allow="xr-spatial-tracking"
                                    ></iframe>
                                <?php else : ?>
                                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; flex-direction: column; gap: 15px;">
                                        <span class="dashicons dashicons-warning" style="font-size: 48px; opacity: 0.5;"></span>
                                        <p style="margin: 0; font-size: 16px;"><?php _e('No viewer page URL set. Please set your viewer page URL in Step 1.', 'flexframe-viewer'); ?></p>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <!-- Custom Panel Settings (no preset manager, settings only) -->
                        <div class="flexframe-custom-panel">
                            
                            <div style="padding: 20px; background: #e7f3ff; border-left: 4px solid #0073aa; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 14px;">
                                    <strong><?php _e('💡 Theme Editor Available:', 'flexframe-viewer'); ?></strong>
                                    <?php _e('UI Settings and Model Materials can now be edited live in the Theme Editor! Press', 'flexframe-viewer'); ?> <kbd style="background: #fff; padding: 2px 6px; border: 1px solid #ccc; border-radius: 3px; font-family: monospace;">T</kbd> <?php _e('in the preview above to open the Theme Editor.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <!-- Scene Background Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="background-settings-content">
                                    <h4><span class="dashicons dashicons-admin-appearance"></span> <?php _e('Scene Background', 'flexframe-viewer'); ?></h4>
                                    <div class="header-preview background-preview">
                                        <div class="gradient-swatch" id="preview-gradient-swatch"></div>
                                    </div>
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
                                        
                                        <!-- Background Logo Watermark -->
                                        <div class="flexframe-subsection-divider">
                                            <h5><span class="dashicons dashicons-format-image"></span> <?php _e('Logo Watermark Overlay', 'flexframe-viewer'); ?></h5>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label class="flexframe-checkbox-label">
                                                <input 
                                                    type="checkbox" 
                                                    id="flexframe_bg_logo_enabled" 
                                                    name="flexframe_bg_logo_enabled" 
                                                    value="1"
                                                    <?php checked($bg_logo_enabled, true); ?>
                                                    <?php echo empty($logo_url) ? 'disabled' : ''; ?>
                                                />
                                                <?php _e('Show Logo Watermark on Viewer', 'flexframe-viewer'); ?>
                                            </label>
                                            <?php if (empty($logo_url)) : ?>
                                                <p class="description" style="margin-left: 24px; color: #d63638;">
                                                    <span class="dashicons dashicons-warning" style="font-size: 14px;"></span>
                                                    <?php _e('Upload a logo in Step 3 to enable this feature.', 'flexframe-viewer'); ?>
                                                </p>
                                            <?php endif; ?>
                                        </div>
                                        
                                        <?php
                                        // Get watermark position settings
                                        $bg_logo_pos_x = get_option('flexframe_bg_logo_pos_x', 50);
                                        $bg_logo_pos_y = get_option('flexframe_bg_logo_pos_y', 90);
                                        ?>
                                        
                                        <div class="flexframe-bg-logo-options" id="bg_logo_options" style="<?php echo ($bg_logo_enabled && !empty($logo_url)) ? '' : 'display:none;'; ?>">
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_pos_x"><?php _e('Horizontal Position', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_pos_x" name="flexframe_bg_logo_pos_x" value="<?php echo esc_attr($bg_logo_pos_x); ?>" min="0" max="100" step="1" />
                                                <span class="range-value" id="bg_logo_pos_x_value"><?php echo esc_html($bg_logo_pos_x); ?>%</span>
                                            </div>
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_pos_y"><?php _e('Vertical Position', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_pos_y" name="flexframe_bg_logo_pos_y" value="<?php echo esc_attr($bg_logo_pos_y); ?>" min="0" max="100" step="1" />
                                                <span class="range-value" id="bg_logo_pos_y_value"><?php echo esc_html($bg_logo_pos_y); ?>%</span>
                                            </div>
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_size"><?php _e('Logo Size', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_size" name="flexframe_bg_logo_size" value="<?php echo esc_attr($bg_logo_size); ?>" min="30" max="500" step="10" />
                                                <span class="range-value" id="bg_logo_size_value"><?php echo esc_html($bg_logo_size); ?>px</span>
                                            </div>
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_opacity"><?php _e('Logo Opacity', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_opacity" name="flexframe_bg_logo_opacity" value="<?php echo esc_attr($bg_logo_opacity); ?>" min="0" max="1" step="0.05" />
                                                <span class="range-value" id="bg_logo_opacity_value"><?php echo esc_html(round($bg_logo_opacity * 100)); ?>%</span>
                                            </div>
                                            
                                            <p class="description">
                                                <?php _e('💡 The watermark appears as an overlay on the viewer. Adjust position and opacity to your preference.', 'flexframe-viewer'); ?>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Lighting Settings Section -->
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
                                        <div class="ui-section-header-row">
                                            <h5><span class="dashicons dashicons-controls-play"></span> <?php _e('Animation Player', 'flexframe-viewer'); ?></h5>
                                            <div class="inline-preview player-preview">
                                                <div class="preview-player-inline" id="preview-player">
                                                    <div class="preview-controls-inline">
                                                        <button type="button" class="preview-btn-inline">▶</button>
                                                        <div class="preview-progress-inline">
                                                            <div class="preview-progress-fill-inline"></div>
                                                        </div>
                                                        <span class="preview-time-inline">0:30</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <div class="ui-section-header-row">
                                            <h5><span class="dashicons dashicons-menu"></span> <?php _e('Menus & Panels', 'flexframe-viewer'); ?></h5>
                                            <div class="inline-preview menu-preview">
                                                <div class="preview-menu-inline" id="preview-menu">
                                                    <div class="preview-menu-item-inline active"><?php _e('Exercise 1', 'flexframe-viewer'); ?></div>
                                                    <div class="preview-menu-item-inline"><?php _e('Exercise 2', 'flexframe-viewer'); ?></div>
                                                </div>
                                            </div>
                                        </div>
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
                                                    <label for="flexframe_menu_text_opacity"><?php _e('Text Opacity', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <input type="range" id="flexframe_menu_text_opacity" name="flexframe_menu_text_opacity" min="0" max="1" step="0.05" value="<?php echo esc_attr($menu_text_opacity); ?>" />
                                                    <span class="opacity-value"><?php echo esc_html($menu_text_opacity); ?></span>
                                                    <p class="description"><?php _e('0 = fully transparent, 1 = fully opaque', 'flexframe-viewer'); ?></p>
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
                                                    <label for="flexframe_thumbnail_label_color"><?php _e('Thumbnail Label Color', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <input type="color" id="flexframe_thumbnail_label_color" name="flexframe_thumbnail_label_color" value="<?php echo esc_attr($thumbnail_label_color); ?>" class="color-picker" />
                                                    <span class="color-value"><?php echo esc_html($thumbnail_label_color); ?></span>
                                                    <p class="description"><?php _e('Background gradient color for thumbnail labels.', 'flexframe-viewer'); ?></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <label for="flexframe_thumbnail_label_opacity"><?php _e('Thumbnail Label Opacity', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <input type="range" id="flexframe_thumbnail_label_opacity" name="flexframe_thumbnail_label_opacity" min="0" max="1" step="0.05" value="<?php echo esc_attr($thumbnail_label_opacity); ?>" class="opacity-slider" />
                                                    <span class="opacity-value"><?php echo esc_html($thumbnail_label_opacity); ?></span>
                                                    <p class="description"><?php _e('Opacity of the thumbnail label gradient (0 = transparent, 1 = solid).', 'flexframe-viewer'); ?></p>
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
                                            <tr>
                                                <th scope="row">
                                                    <label for="flexframe_show_screenshot_button"><?php _e('Show Screenshot Button', 'flexframe-viewer'); ?></label>
                                                </th>
                                                <td>
                                                    <label class="toggle-switch">
                                                        <input type="checkbox" id="flexframe_show_screenshot_button" name="flexframe_show_screenshot_button" value="1" <?php checked($show_screenshot_button, true); ?> />
                                                        <span class="toggle-slider"></span>
                                                    </label>
                                                    <p class="description"><?php _e('Show a screenshot button in the animation player controls.', 'flexframe-viewer'); ?></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Model Material Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="material-settings-content">
                                    <h4><span class="dashicons dashicons-art"></span> <?php _e('Model Material Settings', 'flexframe-viewer'); ?></h4>
                                    <div class="header-preview material-preview">
                                        <div class="material-sphere" id="preview-material-sphere"></div>
                                    </div>
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
                            
                            <!-- Equipment Material Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="equipment-settings-content">
                                    <h4><span class="dashicons dashicons-hammer"></span> <?php _e('Equipment Materials', 'flexframe-viewer'); ?></h4>
                                    <div class="header-preview equipment-preview">
                                        <span class="dashicons dashicons-admin-generic"></span>
                                    </div>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="equipment-settings-content">
                                    <div class="flexframe-custom-settings">
                                        <p class="description" style="margin-bottom: 20px;">
                                            <?php _e('Customize the appearance of equipment materials in your 3D models. Enable a material to override its default settings.', 'flexframe-viewer'); ?>
                                        </p>
                                        
                                        <?php
                                        // Define equipment materials with display names and icons
                                        $equipment_material_config = array(
                                            'barbell' => array('name' => 'Barbell', 'icon' => '🏋️'),
                                            'bumper' => array('name' => 'Bumper Plates', 'icon' => '⚫'),
                                            'cable' => array('name' => 'Cable', 'icon' => '🔗'),
                                            'chrome' => array('name' => 'Chrome', 'icon' => '✨'),
                                            'color1' => array('name' => 'Brand Color (COLOR1)', 'icon' => '🎨'),
                                            'metal' => array('name' => 'Metal', 'icon' => '🔩'),
                                            'pad' => array('name' => 'Pad / Cushion', 'icon' => '🛋️'),
                                            'plastic' => array('name' => 'Plastic', 'icon' => '🧱'),
                                            'rubber' => array('name' => 'Rubber', 'icon' => '⬛')
                                        );
                                        
                                        foreach ($equipment_material_config as $mat_key => $mat_config) :
                                            // Get current values
                                            $mat_enabled = get_option("flexframe_{$mat_key}_enabled", false);
                                            $mat_color = get_option("flexframe_{$mat_key}_color", '#808080');
                                            $mat_opacity = get_option("flexframe_{$mat_key}_opacity", 1);
                                            $mat_metalness = get_option("flexframe_{$mat_key}_metalness", 0);
                                            $mat_roughness = get_option("flexframe_{$mat_key}_roughness", 0.5);
                                            $mat_color_map = get_option("flexframe_{$mat_key}_color_map_enabled", true);
                                            $mat_bump = get_option("flexframe_{$mat_key}_bump_scale", 1);
                                            $mat_normal = get_option("flexframe_{$mat_key}_normal_scale", 1);
                                            $mat_clearcoat = get_option("flexframe_{$mat_key}_clearcoat", 0);
                                            $mat_clearcoat_rough = get_option("flexframe_{$mat_key}_clearcoat_roughness", 0);
                                            $mat_emissive = get_option("flexframe_{$mat_key}_emissive_color", '#000000');
                                            $mat_emissive_int = get_option("flexframe_{$mat_key}_emissive_intensity", 0);
                                            $mat_blending = get_option("flexframe_{$mat_key}_blending", 'normal');
                                            $mat_transmission = get_option("flexframe_{$mat_key}_transmission", 0);
                                            $mat_thickness = get_option("flexframe_{$mat_key}_thickness", 0);
                                            $mat_ior = get_option("flexframe_{$mat_key}_ior", 1.5);
                                            $mat_env = get_option("flexframe_{$mat_key}_env_intensity", 1);
                                            $mat_sheen = get_option("flexframe_{$mat_key}_sheen", 0);
                                            $mat_sheen_rough = get_option("flexframe_{$mat_key}_sheen_roughness", 0.5);
                                            $mat_sheen_color = get_option("flexframe_{$mat_key}_sheen_color", '#ffffff');
                                        ?>
                                        
                                        <!-- <?php echo esc_html($mat_config['name']); ?> Material Accordion -->
                                        <div class="equipment-material-accordion <?php echo $mat_enabled ? 'active' : ''; ?>" data-material="<?php echo esc_attr($mat_key); ?>">
                                            <div class="equipment-material-header">
                                                <label class="equipment-enable-toggle">
                                                    <input type="checkbox" 
                                                           name="flexframe_<?php echo esc_attr($mat_key); ?>_enabled" 
                                                           value="1" 
                                                           <?php checked($mat_enabled, true); ?>
                                                           class="equipment-material-toggle" />
                                                    <span class="toggle-slider"></span>
                                                </label>
                                                <span class="material-icon"><?php echo $mat_config['icon']; ?></span>
                                                <span class="material-name"><?php echo esc_html($mat_config['name']); ?></span>
                                                <div class="material-color-preview" style="background-color: <?php echo esc_attr($mat_color); ?>;"></div>
                                                <span class="accordion-arrow dashicons dashicons-arrow-down-alt2"></span>
                                            </div>
                                            <div class="equipment-material-content" <?php echo !$mat_enabled ? 'style="display:none;"' : ''; ?>>
                                                
                                                <!-- Basic Properties -->
                                                <div class="material-property-group">
                                                    <h5><?php _e('Basic Properties', 'flexframe-viewer'); ?></h5>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Color', 'flexframe-viewer'); ?></label>
                                                        <input type="color" name="flexframe_<?php echo esc_attr($mat_key); ?>_color" value="<?php echo esc_attr($mat_color); ?>" />
                                                        <span class="color-hex"><?php echo esc_html($mat_color); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Opacity', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_opacity" value="<?php echo esc_attr($mat_opacity); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_opacity); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Metalness', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_metalness" value="<?php echo esc_attr($mat_metalness); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_metalness); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Roughness', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_roughness" value="<?php echo esc_attr($mat_roughness); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_roughness); ?></span>
                                                    </div>
                                                </div>
                                                
                                                <!-- Texture Maps -->
                                                <div class="material-property-group">
                                                    <h5><?php _e('Texture Maps', 'flexframe-viewer'); ?></h5>
                                                    
                                                    <div class="flexframe-setting-row checkbox-row">
                                                        <label>
                                                            <input type="checkbox" name="flexframe_<?php echo esc_attr($mat_key); ?>_color_map_enabled" value="1" <?php checked($mat_color_map, true); ?> />
                                                            <?php _e('Use Color Map (Texture)', 'flexframe-viewer'); ?>
                                                        </label>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Bump Scale', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_bump_scale" value="<?php echo esc_attr($mat_bump); ?>" min="0" max="5" step="0.1" />
                                                        <span class="range-value"><?php echo esc_html($mat_bump); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Normal Scale', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_normal_scale" value="<?php echo esc_attr($mat_normal); ?>" min="0" max="5" step="0.1" />
                                                        <span class="range-value"><?php echo esc_html($mat_normal); ?></span>
                                                    </div>
                                                </div>
                                                
                                                <!-- Clearcoat -->
                                                <div class="material-property-group">
                                                    <h5><?php _e('Clearcoat', 'flexframe-viewer'); ?></h5>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Clearcoat', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_clearcoat" value="<?php echo esc_attr($mat_clearcoat); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_clearcoat); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Clearcoat Roughness', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_clearcoat_roughness" value="<?php echo esc_attr($mat_clearcoat_rough); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_clearcoat_rough); ?></span>
                                                    </div>
                                                </div>
                                                
                                                <!-- Emission -->
                                                <div class="material-property-group">
                                                    <h5><?php _e('Emission (Glow)', 'flexframe-viewer'); ?></h5>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Emissive Color', 'flexframe-viewer'); ?></label>
                                                        <input type="color" name="flexframe_<?php echo esc_attr($mat_key); ?>_emissive_color" value="<?php echo esc_attr($mat_emissive); ?>" />
                                                        <span class="color-hex"><?php echo esc_html($mat_emissive); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Emissive Intensity', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_emissive_intensity" value="<?php echo esc_attr($mat_emissive_int); ?>" min="0" max="5" step="0.1" />
                                                        <span class="range-value"><?php echo esc_html($mat_emissive_int); ?></span>
                                                    </div>
                                                </div>
                                                
                                                <!-- Advanced -->
                                                <div class="material-property-group">
                                                    <h5><?php _e('Advanced Properties', 'flexframe-viewer'); ?></h5>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Blending Mode', 'flexframe-viewer'); ?></label>
                                                        <select name="flexframe_<?php echo esc_attr($mat_key); ?>_blending">
                                                            <option value="normal" <?php selected($mat_blending, 'normal'); ?>><?php _e('Normal', 'flexframe-viewer'); ?></option>
                                                            <option value="additive" <?php selected($mat_blending, 'additive'); ?>><?php _e('Additive', 'flexframe-viewer'); ?></option>
                                                            <option value="subtractive" <?php selected($mat_blending, 'subtractive'); ?>><?php _e('Subtractive', 'flexframe-viewer'); ?></option>
                                                            <option value="multiply" <?php selected($mat_blending, 'multiply'); ?>><?php _e('Multiply', 'flexframe-viewer'); ?></option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Transmission (Glass)', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_transmission" value="<?php echo esc_attr($mat_transmission); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_transmission); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Thickness', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_thickness" value="<?php echo esc_attr($mat_thickness); ?>" min="0" max="10" step="0.1" />
                                                        <span class="range-value"><?php echo esc_html($mat_thickness); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('IOR (Refraction Index)', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_ior" value="<?php echo esc_attr($mat_ior); ?>" min="1" max="2.5" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_ior); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Environment Intensity', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_env_intensity" value="<?php echo esc_attr($mat_env); ?>" min="0" max="5" step="0.1" />
                                                        <span class="range-value"><?php echo esc_html($mat_env); ?></span>
                                                    </div>
                                                </div>
                                                
                                                <!-- Sheen -->
                                                <div class="material-property-group">
                                                    <h5><?php _e('Sheen (Fabric/Velvet Effect)', 'flexframe-viewer'); ?></h5>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Sheen', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_sheen" value="<?php echo esc_attr($mat_sheen); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_sheen); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Sheen Roughness', 'flexframe-viewer'); ?></label>
                                                        <input type="range" name="flexframe_<?php echo esc_attr($mat_key); ?>_sheen_roughness" value="<?php echo esc_attr($mat_sheen_rough); ?>" min="0" max="1" step="0.01" />
                                                        <span class="range-value"><?php echo esc_html($mat_sheen_rough); ?></span>
                                                    </div>
                                                    
                                                    <div class="flexframe-setting-row">
                                                        <label><?php _e('Sheen Color', 'flexframe-viewer'); ?></label>
                                                        <input type="color" name="flexframe_<?php echo esc_attr($mat_key); ?>_sheen_color" value="<?php echo esc_attr($mat_sheen_color); ?>" />
                                                        <span class="color-hex"><?php echo esc_html($mat_sheen_color); ?></span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                        <?php endforeach; ?>
                                        
                                        <p class="description" style="margin-top: 20px;">
                                            <?php _e('💡 Enable a material to customize its appearance. These settings will be applied when the model contains materials with matching names (BARBELL, BUMPER, CABLE, CHROME, COLOR1, METAL, PAD, PLASTIC, RUBBER).', 'flexframe-viewer'); ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Scene Background Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="background-settings-content">
                                    <h4><span class="dashicons dashicons-admin-appearance"></span> <?php _e('Scene Background', 'flexframe-viewer'); ?></h4>
                                    <div class="header-preview background-preview">
                                        <div class="gradient-swatch" id="preview-gradient-swatch"></div>
                                    </div>
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
                                        
                                        <!-- Background Logo Watermark -->
                                        <div class="flexframe-subsection-divider">
                                            <h5><span class="dashicons dashicons-format-image"></span> <?php _e('Logo Watermark Overlay', 'flexframe-viewer'); ?></h5>
                                        </div>
                                        
                                        <div class="flexframe-setting-row">
                                            <label class="flexframe-checkbox-label">
                                                <input 
                                                    type="checkbox" 
                                                    id="flexframe_bg_logo_enabled" 
                                                    name="flexframe_bg_logo_enabled" 
                                                    value="1"
                                                    <?php checked($bg_logo_enabled, true); ?>
                                                    <?php echo empty($logo_url) ? 'disabled' : ''; ?>
                                                />
                                                <?php _e('Show Logo Watermark on Viewer', 'flexframe-viewer'); ?>
                                            </label>
                                            <?php if (empty($logo_url)) : ?>
                                                <p class="description" style="margin-left: 24px; color: #d63638;">
                                                    <span class="dashicons dashicons-warning" style="font-size: 14px;"></span>
                                                    <?php _e('Upload a logo in Step 3 to enable this feature.', 'flexframe-viewer'); ?>
                                                </p>
                                            <?php endif; ?>
                                        </div>
                                        
                                        <?php
                                        // Get watermark position settings
                                        $bg_logo_pos_x = get_option('flexframe_bg_logo_pos_x', 50);
                                        $bg_logo_pos_y = get_option('flexframe_bg_logo_pos_y', 90);
                                        ?>
                                        
                                        <div class="flexframe-bg-logo-options" id="bg_logo_options" style="<?php echo ($bg_logo_enabled && !empty($logo_url)) ? '' : 'display:none;'; ?>">
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_pos_x"><?php _e('Horizontal Position', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_pos_x" name="flexframe_bg_logo_pos_x" value="<?php echo esc_attr($bg_logo_pos_x); ?>" min="0" max="100" step="1" />
                                                <span class="range-value" id="bg_logo_pos_x_value"><?php echo esc_html($bg_logo_pos_x); ?>%</span>
                                            </div>
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_pos_y"><?php _e('Vertical Position', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_pos_y" name="flexframe_bg_logo_pos_y" value="<?php echo esc_attr($bg_logo_pos_y); ?>" min="0" max="100" step="1" />
                                                <span class="range-value" id="bg_logo_pos_y_value"><?php echo esc_html($bg_logo_pos_y); ?>%</span>
                                            </div>
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_size"><?php _e('Logo Size', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_size" name="flexframe_bg_logo_size" value="<?php echo esc_attr($bg_logo_size); ?>" min="30" max="500" step="10" />
                                                <span class="range-value" id="bg_logo_size_value"><?php echo esc_html($bg_logo_size); ?>px</span>
                                            </div>
                                            
                                            <div class="flexframe-setting-row">
                                                <label for="flexframe_bg_logo_opacity"><?php _e('Logo Opacity', 'flexframe-viewer'); ?></label>
                                                <input type="range" id="flexframe_bg_logo_opacity" name="flexframe_bg_logo_opacity" value="<?php echo esc_attr($bg_logo_opacity); ?>" min="0" max="1" step="0.05" />
                                                <span class="range-value" id="bg_logo_opacity_value"><?php echo esc_html(round($bg_logo_opacity * 100)); ?>%</span>
                                            </div>
                                            
                                            <p class="description">
                                                <?php _e('💡 The watermark appears as an overlay on the viewer. Adjust position and opacity to your preference.', 'flexframe-viewer'); ?>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Lighting Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="lighting-settings-content">
                                    <h4><span class="dashicons dashicons-lightbulb"></span> <?php _e('Lighting', 'flexframe-viewer'); ?></h4>
                                    <div class="header-preview lighting-preview">
                                        <div class="lighting-indicator" id="preview-lighting">
                                            <div class="light-ambient" title="Ambient"></div>
                                            <div class="light-directional" title="Directional"></div>
                                        </div>
                                    </div>
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
                                    <div class="header-preview particles-preview">
                                        <div class="particles-container" id="preview-particles">
                                            <span class="particle p1"></span>
                                            <span class="particle p2"></span>
                                            <span class="particle p3"></span>
                                            <span class="particle p4"></span>
                                            <span class="particle p5"></span>
                                        </div>
                                    </div>
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
        .flexframe-step-header .step-save-btn {
            margin-left: auto;
            position: relative;
            transition: all 0.3s ease;
        }
        .flexframe-step-header .step-save-btn .dashicons {
            margin-right: 4px;
            vertical-align: middle;
            margin-top: -2px;
            transition: transform 0.3s ease;
        }
        .flexframe-step-header .step-save-btn.saving {
            background: #dba617 !important;
            border-color: #c59315 !important;
            pointer-events: none;
        }
        .flexframe-step-header .step-save-btn.saving .dashicons {
            animation: spin 1s linear infinite;
        }
        .flexframe-step-header .step-save-btn.saved {
            background: #00a32a !important;
            border-color: #008a20 !important;
        }
        .flexframe-step-header .step-save-btn.saved .dashicons {
            animation: bounce 0.5s ease;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
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
            flex: 1;
        }
        .flexframe-step-header {
            cursor: pointer;
        }
        .step-toggle-icon {
            color: #646970;
            transition: transform 0.3s ease;
            font-size: 20px;
        }
        .flexframe-step-section.collapsed .step-toggle-icon {
            transform: rotate(-90deg);
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
        
        /* Getting Started Section */
        .flexframe-getting-started {
            background: linear-gradient(135deg, #f0f7ff 0%, #e8f4f8 100%);
            border: 1px solid #c3d9ed;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
        }
        .getting-started-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        .getting-started-icon {
            font-size: 28px;
        }
        .getting-started-header h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: #1d2327;
        }
        .getting-started-desc {
            color: #50575e;
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 20px 0;
        }
        
        /* Shortcode Display Box */
        .flexframe-shortcode-box {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .shortcode-display {
            display: flex;
            align-items: center;
            background: #1d2327;
            border-radius: 6px;
            padding: 4px 4px 4px 16px;
            gap: 12px;
        }
        .shortcode-display code {
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 15px;
            color: #7cd9a9;
            background: transparent;
            padding: 8px 0;
        }
        .copy-shortcode-btn {
            background: #2271b1 !important;
            border-color: #2271b1 !important;
            color: #fff !important;
            padding: 6px 10px !important;
            height: auto !important;
            min-height: 32px;
        }
        .copy-shortcode-btn:hover {
            background: #135e96 !important;
            border-color: #135e96 !important;
        }
        .copy-shortcode-btn .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
            line-height: 16px;
        }
        
        /* Viewer URL Section */
        .flexframe-viewer-url-setting {
            background: #f9f9f9;
            border: 1px solid #e2e4e7;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .flexframe-viewer-url-setting label {
            display: block;
            margin-bottom: 8px;
        }
        .url-input-row {
            margin-bottom: 8px;
        }
        .url-input-row input {
            width: 100%;
            max-width: 500px;
        }
        
        /* Shortcode Options Section */
        .flexframe-shortcode-options {
            background: #fff;
            border: 1px solid #e2e4e7;
            border-radius: 6px;
            overflow: hidden;
        }
        .shortcode-options-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            background: #f6f7f7;
            cursor: pointer;
            transition: background 0.2s;
        }
        .shortcode-options-header:hover {
            background: #eef0f1;
        }
        .shortcode-options-header .dashicons {
            color: #2271b1;
        }
        .shortcode-options-header .toggle-hint {
            color: #888;
            font-size: 12px;
            margin-left: auto;
        }
        .shortcode-options-content {
            padding: 16px;
            border-top: 1px solid #e2e4e7;
        }
        .shortcode-examples-table {
            width: 100%;
            border-collapse: collapse;
        }
        .shortcode-examples-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #f0f0f0;
            vertical-align: middle;
        }
        .shortcode-examples-table tr:last-child td {
            border-bottom: none;
        }
        .shortcode-examples-table td:first-child {
            font-family: monospace;
            font-size: 13px;
            color: #1d2327;
            background: #f9f9f9;
            border-radius: 4px;
            white-space: nowrap;
        }
        .shortcode-examples-table td:first-child code {
            background: transparent;
            padding: 0;
        }
        .shortcode-examples-table td:nth-child(2) {
            color: #646970;
            font-size: 13px;
        }
        .shortcode-examples-table td:last-child {
            text-align: right;
            width: 50px;
        }
        
        /* Library Section Header */
        .flexframe-library-section {
            margin-top: 0;
        }
        .library-section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        .library-icon {
            font-size: 24px;
        }
        .library-section-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #1d2327;
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
        
        /* Color picker with logo side by side */
        .flexframe-color-with-logo {
            display: flex;
            gap: 24px;
            align-items: flex-start;
        }
        .flexframe-color-with-logo .flexframe-custom-color-panel {
            margin-top: 0;
            flex: 0 0 auto;
        }
        
        /* Logo color reference for eyedropper */
        .flexframe-logo-color-reference {
            background: #f6f7f7;
            border: 1px solid #e2e4e7;
            border-radius: 8px;
            padding: 16px;
            flex: 0 0 auto;
            max-width: 220px;
        }
        .logo-reference-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
            color: #1d2327;
            font-size: 13px;
        }
        .logo-reference-header .dashicons {
            color: #2271b1;
            font-size: 16px;
            width: 16px;
            height: 16px;
        }
        .logo-reference-preview {
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(45deg, #e8e8e8 25%, #f5f5f5 25%, #f5f5f5 50%, #e8e8e8 50%, #e8e8e8 75%, #f5f5f5 75%);
            background-size: 12px 12px;
            border-radius: 6px;
            padding: 12px;
            min-height: 80px;
        }
        .logo-reference-preview img {
            max-width: 100%;
            max-height: 100px;
            object-fit: contain;
        }
        .logo-reference-hint {
            display: flex;
            align-items: flex-start;
            gap: 6px;
            margin-top: 10px;
            padding: 8px 10px;
            background: #fff8e5;
            border: 1px solid #f0c36d;
            border-radius: 4px;
            font-size: 12px;
            color: #6e4b00;
            line-height: 1.4;
        }
        .logo-reference-hint .dashicons {
            color: #d68f00;
            flex-shrink: 0;
            font-size: 14px;
            width: 14px;
            height: 14px;
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
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(45deg, #333 25%, #444 25%, #444 50%, #333 50%, #333 75%, #444 75%);
            background-size: 20px 20px;
            border-radius: 8px;
            width: 250px;
            height: 250px;
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
        }
        .flexframe-logo-preview img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            transition: transform 0.2s ease, filter 0.2s ease;
            transform-origin: center center;
            object-fit: contain;
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
        
        /* Simple Theme Selector (Step 4) */
        .flexframe-theme-selector-simple {
            padding: 20px 0;
        }
        .theme-selector-row {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .theme-selector-row label {
            font-weight: 500;
            color: #1d2327;
        }
        .theme-selector-row .preset-theme-select {
            min-width: 250px;
        }
        .theme-hint {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        /* Current Theme Indicator (Step 5) */
        .current-theme-indicator {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
            border: 1px solid #c3ddf6;
            padding: 10px 16px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .current-theme-indicator .dashicons {
            color: #2271b1;
        }
        .current-theme-indicator strong {
            color: #1d2327;
        }
        
        /* Save Custom Theme Section */
        .save-custom-theme-section {
            background: linear-gradient(135deg, #f8fff8 0%, #f0fdf0 100%);
            border: 2px solid #00a32a;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .save-theme-row {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .save-theme-row input[type="text"] {
            flex: 1;
            min-width: 200px;
            padding: 10px 14px;
            font-size: 14px;
            border: 1px solid #c3c4c7;
            border-radius: 4px;
        }
        .save-theme-row .button-hero {
            padding: 8px 24px !important;
            height: auto !important;
            font-size: 14px !important;
        }
        .save-theme-message {
            display: block;
            margin-top: 12px;
            padding: 10px 14px;
            border-radius: 4px;
            font-size: 13px;
        }
        .save-theme-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .save-theme-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
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
        
        /* Header Preview Panels */
        .header-preview {
            background: #1a1a2e;
            border-radius: 6px;
            padding: 8px 12px;
            margin-left: auto;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* UI Settings Preview */
        .ui-preview {
            min-width: 60px;
        }
        .ui-icons-preview {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .ui-icon-btn {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }
        .ui-icon-menu {
            font-size: 14px;
            padding: 3px 6px;
            border-radius: 3px;
        }
        
        /* Material Sphere Preview */
        .material-preview {
            min-width: 50px;
        }
        .material-sphere {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%);
            box-shadow: 
                inset -3px -3px 8px rgba(0,0,0,0.3),
                inset 3px 3px 8px rgba(255,255,255,0.2),
                0 2px 8px rgba(0,0,0,0.3);
        }
        
        /* Gradient Background Preview */
        .background-preview {
            min-width: 60px;
        }
        .gradient-swatch {
            width: 50px;
            height: 32px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        /* Lighting Preview */
        .lighting-preview {
            min-width: 70px;
        }
        .lighting-indicator {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .light-ambient, .light-directional {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: relative;
        }
        .light-ambient {
            box-shadow: 0 0 10px 3px currentColor;
        }
        .light-directional {
            box-shadow: 0 0 12px 4px currentColor;
        }
        
        /* Particles Preview */
        .particles-preview {
            min-width: 60px;
            min-height: 36px;
        }
        .particles-container {
            position: relative;
            width: 50px;
            height: 32px;
        }
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: floatParticle 3s ease-in-out infinite;
        }
        .particle.p1 { width: 4px; height: 4px; top: 5px; left: 10px; animation-delay: 0s; }
        .particle.p2 { width: 3px; height: 3px; top: 15px; left: 25px; animation-delay: 0.5s; }
        .particle.p3 { width: 5px; height: 5px; top: 8px; left: 40px; animation-delay: 1s; }
        .particle.p4 { width: 3px; height: 3px; top: 22px; left: 8px; animation-delay: 1.5s; }
        .particle.p5 { width: 4px; height: 4px; top: 20px; left: 35px; animation-delay: 2s; }
        
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0); opacity: 0.7; }
            50% { transform: translateY(-5px); opacity: 1; }
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
        
        /* Slider control layout */
        .flexframe-slider-control {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            max-width: 300px;
        }
        .flexframe-slider-control .flexframe-slider {
            flex: 1;
            min-width: 150px;
        }
        .flexframe-slider-control .flexframe-slider-value {
            min-width: 50px;
            font-family: monospace;
            color: #646970;
            font-size: 13px;
        }
        
        /* Checkbox label styling */
        .flexframe-checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            font-weight: 500;
        }
        .flexframe-checkbox-label input[type="checkbox"] {
            margin: 0;
        }
        
        /* Border size row */
        .flexframe-border-size-row {
            margin-left: 24px;
            padding-left: 12px;
            border-left: 2px solid #dcdcde;
        }
        
        /* Section divider */
        .flexframe-setting-section-divider {
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid #e2e4e7;
        }
        .flexframe-setting-section-divider h4 {
            margin: 0 0 16px;
            font-size: 14px;
            font-weight: 600;
            color: #1d2327;
        }
        
        /* Background logo options */
        .flexframe-bg-logo-options {
            margin-left: 24px;
            padding-left: 12px;
            border-left: 2px solid #dcdcde;
        }
        
        /* Equipment Material Accordion Styles */
        .equipment-material-accordion {
            border: 1px solid #dcdcde;
            border-radius: 8px;
            margin-bottom: 12px;
            overflow: hidden;
            background: #fff;
            transition: box-shadow 0.2s ease;
        }
        .equipment-material-accordion:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .equipment-material-accordion.active {
            border-color: #2271b1;
            box-shadow: 0 0 0 1px #2271b1;
        }
        .equipment-material-header {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            cursor: pointer;
            background: #f9f9f9;
            transition: background-color 0.2s ease;
            gap: 12px;
        }
        .equipment-material-header:hover {
            background: #f0f0f1;
        }
        .equipment-enable-toggle {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 22px;
            flex-shrink: 0;
        }
        .equipment-enable-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .equipment-enable-toggle .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.3s;
            border-radius: 22px;
        }
        .equipment-enable-toggle .toggle-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
        }
        .equipment-enable-toggle input:checked + .toggle-slider {
            background-color: #2271b1;
        }
        .equipment-enable-toggle input:checked + .toggle-slider:before {
            transform: translateX(18px);
        }
        .material-icon {
            font-size: 18px;
            width: 24px;
            text-align: center;
        }
        .material-name {
            font-weight: 600;
            color: #1d2327;
            flex: 1;
        }
        .material-color-preview {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            border: 2px solid #dcdcde;
            flex-shrink: 0;
        }
        .accordion-arrow {
            color: #646970;
            transition: transform 0.3s ease;
            flex-shrink: 0;
        }
        .equipment-material-accordion.active .accordion-arrow {
            transform: rotate(180deg);
        }
        .equipment-material-content {
            padding: 20px;
            background: #fff;
            border-top: 1px solid #e2e4e7;
        }
        .material-property-group {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f1;
        }
        .material-property-group:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .material-property-group h5 {
            margin: 0 0 12px;
            font-size: 13px;
            font-weight: 600;
            color: #50575e;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .equipment-material-content .flexframe-setting-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            padding: 0;
        }
        .equipment-material-content .flexframe-setting-row label {
            min-width: 140px;
            font-weight: 500;
            color: #1d2327;
        }
        .equipment-material-content .flexframe-setting-row input[type="range"] {
            flex: 1;
            max-width: 200px;
        }
        .equipment-material-content .flexframe-setting-row select {
            min-width: 150px;
        }
        .equipment-material-content .checkbox-row {
            padding: 8px 0;
        }
        .equipment-material-content .checkbox-row label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }
        .equipment-preview {
            min-width: 40px;
            background: #2a2a3e;
        }
        .equipment-preview .dashicons {
            color: #8c8c9a;
            font-size: 18px;
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
        /* Exercise Thumbnail Styles */
        .exercise-thumbnail-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-right: 12px;
        }
        .exercise-thumbnail {
            width: 50px;
            height: 50px;
            border-radius: 6px;
            overflow: hidden;
            border: 2px solid #ddd;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .exercise-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .exercise-thumbnail .no-thumbnail {
            font-size: 20px;
            color: #999;
        }
        .exercise-thumbnail.has-custom {
            border-color: #00a32a;
        }
        .exercise-thumbnail-actions {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .upload-thumbnail-btn {
            padding: 4px 8px;
            font-size: 11px;
            cursor: pointer;
            background: #2271b1;
            color: #fff;
            border: none;
            border-radius: 3px;
            transition: background 0.2s;
            white-space: nowrap;
        }
        .upload-thumbnail-btn:hover {
            background: #135e96;
        }
        .remove-thumbnail-btn {
            padding: 4px 8px;
            font-size: 11px;
            cursor: pointer;
            background: #d63638;
            color: #fff;
            border: none;
            border-radius: 3px;
            transition: background 0.2s;
        }
        .remove-thumbnail-btn:hover {
            background: #b32d2e;
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
        
        /* Inline Preview Styles */
        .ui-section-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e4e7;
        }
        .ui-section-header-row h5 {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0;
            font-size: 15px;
            color: #1d2327;
        }
        .ui-section-header-row h5 .dashicons {
            color: #2271b1;
        }
        .inline-preview {
            background: #1a1a2e;
            padding: 10px 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
        }
        
        /* Inline Loading Preview */
        .loading-preview {
            min-width: 80px;
        }
        .preview-spinner-inline {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preview-spinner-inline .spinner-circle {
            width: 30px;
            height: 30px;
            border-width: 3px;
        }
        .preview-logo-loader-inline {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preview-logo-loader-inline .logo-loader-img {
            max-height: 60px;
            object-fit: contain;
        }
        .logo-placeholder-small {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,0.4);
        }
        .logo-placeholder-small .dashicons {
            font-size: 20px;
            width: 20px;
            height: 20px;
        }
        
        /* Inline Player Preview */
        .player-preview {
            min-width: 200px;
        }
        .preview-player-inline {
            width: 100%;
        }
        .preview-controls-inline {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .preview-btn-inline {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: none;
            cursor: default;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preview-progress-inline {
            flex: 1;
            height: 4px;
            background: rgba(255,255,255,0.2);
            border-radius: 2px;
            overflow: hidden;
            min-width: 80px;
        }
        .preview-progress-fill-inline {
            width: 40%;
            height: 100%;
            border-radius: 2px;
        }
        .preview-time-inline {
            font-size: 10px;
            font-family: monospace;
        }
        
        /* Inline Menu Preview */
        .menu-preview {
            min-width: 120px;
        }
        .preview-menu-inline {
            width: 100%;
        }
        .preview-menu-item-inline {
            padding: 5px 8px;
            border-radius: 3px;
            font-size: 11px;
            margin-bottom: 3px;
        }
        .preview-menu-item-inline:last-child {
            margin-bottom: 0;
        }
        .preview-menu-item-inline.active {
            font-weight: 500;
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
        // Step section collapse/expand functionality
        $('.flexframe-step-header').on('click', function(e) {
            // Don't toggle if clicking on the save button
            if ($(e.target).closest('.step-save-btn').length) {
                return;
            }
            
            var $section = $(this).closest('.flexframe-step-section');
            var $content = $section.find('.flexframe-step-content');
            
            $section.toggleClass('collapsed');
            $content.slideToggle(200);
        });
        
        // Copy shortcode to clipboard
        $('.copy-shortcode-btn').on('click', function() {
            var $btn = $(this);
            var $codeElement = $btn.closest('.shortcode-display, td').find('code');
            var shortcode = $codeElement.text();
            
            navigator.clipboard.writeText(shortcode).then(function() {
                var $icon = $btn.find('.dashicons');
                $icon.removeClass('dashicons-clipboard').addClass('dashicons-yes');
                setTimeout(function() {
                    $icon.removeClass('dashicons-yes').addClass('dashicons-clipboard');
                }, 1500);
            });
        });
        
        // Shortcode options toggle
        $('#shortcode-options-toggle').on('click', function() {
            var $content = $(this).next('.shortcode-options-content');
            var $hint = $(this).find('.toggle-hint');
            
            $content.slideToggle(200, function() {
                if ($content.is(':visible')) {
                    $hint.text('<?php _e('(click to collapse)', 'flexframe-viewer'); ?>');
                } else {
                    $hint.text('<?php _e('(click to expand)', 'flexframe-viewer'); ?>');
                }
            });
        });
        
        // Save button animation
        $('.step-save-btn').on('click', function(e) {
            var $btn = $(this);
            var originalHtml = $btn.html();
            
            // Change to saving state
            $btn.removeClass('saved').addClass('saving');
            $btn.html('<span class="dashicons dashicons-update"></span><?php _e('Saving...', 'flexframe-viewer'); ?>');
            
            // After form submits and page reloads, this won't matter
            // But for visual feedback before submit:
            setTimeout(function() {
                $btn.removeClass('saving').addClass('saved');
                $btn.html('<span class="dashicons dashicons-yes-alt"></span><?php _e('Saved!', 'flexframe-viewer'); ?>');
            }, 500);
        });
        
        // Check if settings were just saved (via URL parameter)
        if (window.location.search.indexOf('settings-updated=true') > -1) {
            $('.step-save-btn').each(function() {
                var $btn = $(this);
                $btn.addClass('saved');
                $btn.html('<span class="dashicons dashicons-yes-alt"></span><?php _e('Saved!', 'flexframe-viewer'); ?>');
                
                // Reset after 3 seconds
                setTimeout(function() {
                    $btn.removeClass('saved');
                    $btn.html('<span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>');
                }, 3000);
            });
        }
        
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
            // Cap at 60px for inline preview, actual size used in viewer
            var previewSize = Math.min(size, 60);
            $('#preview-logo-loader .logo-loader-img').css({
                'width': previewSize + 'px',
                'max-width': previewSize + 'px'
            });
        });
        
        // Update hex display and sync related colors when primary color changes
        $('#flexframe_primary_color').on('input change', function() {
            var color = $(this).val();
            console.log('[FlexFrame Admin] Primary color changed to:', color);
            $(this).siblings('.color-hex-display').text(color);
            
            // Sync to Animation Player - Button Background
            $('#flexframe_player_button_bg_color').val(color).trigger('input');
            $('#flexframe_player_button_bg_color').siblings('.color-value').text(color);
            
            // Sync to Animation Player - Accent Color
            $('#flexframe_player_accent_color').val(color).trigger('input');
            $('#flexframe_player_accent_color').siblings('.color-value').text(color);
            
            // Sync to Menus & Panels - Accent Color
            $('#flexframe_menu_accent_color').val(color).trigger('input');
            $('#flexframe_menu_accent_color').siblings('.color-value').text(color);
            
            // Sync to Dust Particles - Color
            var particleInput = $('#flexframe_particles_color');
            console.log('[FlexFrame Admin] Particle color input found:', particleInput.length > 0);
            particleInput.val(color).trigger('input');
            particleInput.siblings('.color-hex').text(color);
            
            // Sync to Directional Light - Color
            $('#flexframe_directional_color').val(color).trigger('input');
            $('#flexframe_directional_color').siblings('.color-hex').text(color);
            
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
        
        // Custom panels in Step 5 start collapsed
        $('.custom-panel-header').each(function() {
            var $header = $(this);
            var targetId = $header.data('target');
            var $content = $('#' + targetId);
            $header.addClass('collapsed');
            $content.hide();
        });
        
        // Show/hide delete button based on theme selection
        $('#flexframe_material_preset').on('change', function() {
            var selectedVal = $(this).val();
            var isCustomTheme = selectedVal.indexOf('custom:') === 0;
            
            if (isCustomTheme) {
                $('#delete-custom-theme').show();
            } else {
                $('#delete-custom-theme').hide();
            }
            
            // Update theme description
            var presetId = selectedVal.replace('custom:', '');
            if (builtInPresets[presetId]) {
                $('#preset-desc-text').text(builtInPresets[presetId].description);
            } else if (isCustomTheme) {
                $('#preset-desc-text').text('<?php _e('Your custom theme with personalized settings.', 'flexframe-viewer'); ?>');
            }
        });
        
        // Delete custom theme button
        $('#delete-custom-theme').on('click', function() {
            var selectedVal = $('#flexframe_material_preset').val();
            if (selectedVal.indexOf('custom:') !== 0) return;
            
            var presetId = selectedVal.replace('custom:', '');
            if (!confirm('<?php _e('Are you sure you want to delete this custom theme?', 'flexframe-viewer'); ?>')) {
                return;
            }
            
            // Delete via AJAX
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_delete_custom_preset',
                    preset_id: presetId,
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        // Remove option from dropdown
                        $('#flexframe_material_preset option[value="custom:' + presetId + '"]').remove();
                        // Select default
                        $('#flexframe_material_preset').val('default').trigger('change');
                        showSaveThemeMessage('<?php _e('Theme deleted successfully!', 'flexframe-viewer'); ?>', 'success');
                    } else {
                        showSaveThemeMessage(response.data || '<?php _e('Error deleting theme.', 'flexframe-viewer'); ?>', 'error');
                    }
                },
                error: function() {
                    showSaveThemeMessage('<?php _e('Error deleting theme.', 'flexframe-viewer'); ?>', 'error');
                }
            });
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
                    spinnerColor: 'primary',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    // Animation Player
                    playerBgColor: '#828282',
                    playerBgOpacity: 0,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 0.8,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    playerWidth: 100,
                    playerShowTime: true,
                    // Menu
                    menuBgColor: '#000000',
                    menuBgOpacity: 0.9,
                    menuTextColor: '#ffffff',
                    menuTextOpacity: 1,
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    showScreenshotButton: true,
                    // Thumbnail Label settings
                    thumbnailLabelColor: '#000000',
                    thumbnailLabelOpacity: 0.1,
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
                    // Background Logo settings
                    bgLogoEnabled: true,
                    bgLogoPosX: 50,
                    bgLogoPosY: 90,
                    bgLogoSize: 150,
                    bgLogoOpacity: 0.5,
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
                    particlesCount: 1150,
                    particlesSize: 0.0095,
                    particlesColor: '#0d529c',
                    particlesOpacity: 1,
                    particlesSpeed: 0.5
                }
            },
            'dark': {
                name: '<?php _e('Dark Theme', 'flexframe-viewer'); ?>',
                description: '<?php _e('Dark interface with high contrast. Great for dark websites.', 'flexframe-viewer'); ?>',
                settings: {
                    spinnerColor: 'primary',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    // Animation Player
                    playerBgColor: '#828282',
                    playerBgOpacity: 0,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 0.8,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    playerWidth: 100,
                    playerShowTime: true,
                    // Menu
                    menuBgColor: '#000000',
                    menuBgOpacity: 0.9,
                    menuTextColor: '#ffffff',
                    menuTextOpacity: 1,
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    showScreenshotButton: true,
                    // Thumbnail Label settings
                    thumbnailLabelColor: '#000000',
                    thumbnailLabelOpacity: 0.1,
                    // Material settings
                    skinColor: '#ccdef5',
                    skinOpacity: 1,
                    skinRoughness: 0,
                    skinMetalness: 0,
                    skinTransmission: 1,
                    skinThickness: 0,
                    skinIor: 1,
                    skinEnvIntensity: 2.29,
                    // Scene Background settings - solid black for dark theme
                    bgGradientTop: '#000000',
                    bgGradientBottom: '#000000',
                    bgGradientOpacity: 1,
                    // Background Logo settings
                    bgLogoEnabled: true,
                    bgLogoPosX: 50,
                    bgLogoPosY: 90,
                    bgLogoSize: 150,
                    bgLogoOpacity: 0.5,
                    // Lighting settings
                    ambientIntensity: 0.4,
                    ambientColor: '#ffffff',
                    directionalIntensity: 4.21,
                    directionalColor: 'primary',
                    directionalPosX: 1.35,
                    directionalPosY: 1.57,
                    directionalPosZ: 0.9,
                    // Particle settings
                    particlesEnabled: true,
                    particlesCount: 1150,
                    particlesSize: 0.0095,
                    particlesColor: 'primary',
                    particlesOpacity: 1,
                    particlesSpeed: 0.5
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
                    // Animation Player
                    playerBgColor: '#7d7d7d',
                    playerBgOpacity: 0.3,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 0.8,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    playerWidth: 100,
                    playerShowTime: true,
                    // Menu
                    menuBgColor: '#7d7d7d',
                    menuBgOpacity: 0.3,
                    menuTextColor: '#222222',
                    menuTextOpacity: 1,
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    showScreenshotButton: true,
                    // Thumbnail Label settings
                    thumbnailLabelColor: '#333333',
                    thumbnailLabelOpacity: 0.1,
                    // Material settings
                    skinColor: '#aaadb1',
                    skinOpacity: 1,
                    skinRoughness: 0,
                    skinMetalness: 0,
                    skinTransmission: 1,
                    skinThickness: 0,
                    skinIor: 1,
                    skinEnvIntensity: 2.29,
                    // Scene Background settings - solid white for light theme
                    bgGradientTop: '#ffffff',
                    bgGradientBottom: '#ffffff',
                    bgGradientOpacity: 1,
                    // Background Logo settings
                    bgLogoEnabled: true,
                    bgLogoPosX: 50,
                    bgLogoPosY: 90,
                    bgLogoSize: 150,
                    bgLogoOpacity: 0.3,
                    // Lighting settings
                    ambientIntensity: 1.52,
                    ambientColor: '#ffffff',
                    directionalIntensity: 0.43,
                    directionalColor: 'primary',
                    directionalPosX: 1.35,
                    directionalPosY: 1.57,
                    directionalPosZ: 0.9,
                    // Particle settings
                    particlesEnabled: true,
                    particlesCount: 1150,
                    particlesSize: 0.0095,
                    particlesColor: 'primary',
                    particlesOpacity: 1,
                    particlesSpeed: 0.5
                }
            },
            'random': {
                name: '<?php _e('Random Theme', 'flexframe-viewer'); ?>',
                description: '<?php _e('Generates random colors and settings based on your primary color. Try it multiple times for different results!', 'flexframe-viewer'); ?>',
                isRandom: true
            },
            'branded': {
                name: '<?php _e('Branded Theme', 'flexframe-viewer'); ?>',
                description: '<?php _e('White-to-brand gradient background with matching skin color. Perfect for showcasing your brand.', 'flexframe-viewer'); ?>',
                settings: {
                    spinnerColor: 'primary',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    // Animation Player
                    playerBgColor: '#828282',
                    playerBgOpacity: 0,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 0.8,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    playerWidth: 100,
                    playerShowTime: true,
                    // Menu
                    menuBgColor: '#000000',
                    menuBgOpacity: 0.9,
                    menuTextColor: '#ffffff',
                    menuTextOpacity: 1,
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    showScreenshotButton: true,
                    // Thumbnail Label settings
                    thumbnailLabelColor: '#222222',
                    thumbnailLabelOpacity: 0.1,
                    // Material settings - skin uses primary color
                    skinColor: 'primary',
                    skinOpacity: 1,
                    skinRoughness: 0,
                    skinMetalness: 0,
                    skinTransmission: 1,
                    skinThickness: 0,
                    skinIor: 1,
                    skinEnvIntensity: 2.29,
                    // Scene Background settings - white top, primary bottom gradient
                    bgGradientTop: '#ffffff',
                    bgGradientBottom: 'primary',
                    bgGradientOpacity: 1,
                    // Background Logo settings
                    bgLogoEnabled: true,
                    bgLogoPosX: 50,
                    bgLogoPosY: 90,
                    bgLogoSize: 150,
                    bgLogoOpacity: 0.5,
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
                    particlesCount: 1150,
                    particlesSize: 0.0095,
                    particlesColor: 'primary',
                    particlesOpacity: 1,
                    particlesSpeed: 0.5
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
            console.log('[Theme Load] Loading built-in theme:', presetId);
            var preset = builtInPresets[presetId];
            if (!preset) {
                console.error('[Theme Load] Built-in theme not found:', presetId);
                return;
            }
            
            var primaryColor = $('#flexframe_primary_color').val() || '#2383cd';
            
            // Handle random theme specially
            var settings;
            if (preset.isRandom) {
                settings = generateRandomTheme(primaryColor);
                console.log('[Theme Load] Generated random theme:', settings);
            } else {
                settings = preset.settings;
                console.log('[Theme Load] Built-in theme settings:', settings);
            }
            
            // Map camelCase keys from built-in presets to snake_case for applyPresetSettings
            var keyMap = {
                spinnerColor: 'spinner_color',
                useLogoLoader: 'use_logo_loader',
                logoLoaderAnimation: 'logo_loader_animation',
                logoLoaderSize: 'logo_loader_size',
                // Animation Player
                playerBgColor: 'player_bg_color',
                playerBgOpacity: 'player_bg_opacity',
                playerButtonBgColor: 'player_button_bg_color',
                playerButtonBgOpacity: 'player_button_bg_opacity',
                playerIconColor: 'player_icon_color',
                playerAccentColor: 'player_accent_color',
                playerAlwaysVisible: 'player_always_visible',
                playerWidth: 'player_width',
                playerShowTime: 'player_show_time',
                // Menu
                menuBgColor: 'menu_bg_color',
                menuBgOpacity: 'menu_bg_opacity',
                menuTextColor: 'menu_text_color',
                menuTextOpacity: 'menu_text_opacity',
                menuAccentColor: 'menu_accent_color',
                hideRightMenu: 'hide_right_menu',
                showScreenshotButton: 'show_screenshot_button',
                // Thumbnail Labels
                thumbnailLabelColor: 'thumbnail_label_color',
                thumbnailLabelOpacity: 'thumbnail_label_opacity',
                // Skin Material
                skinColor: 'skin_color',
                skinOpacity: 'skin_opacity',
                skinRoughness: 'skin_roughness',
                skinMetalness: 'skin_metalness',
                skinTransmission: 'skin_transmission',
                skinThickness: 'skin_thickness',
                skinIor: 'skin_ior',
                skinEnvIntensity: 'skin_env_intensity',
                // Scene Background
                bgGradientTop: 'bg_gradient_top',
                bgGradientBottom: 'bg_gradient_bottom',
                bgGradientOpacity: 'bg_gradient_opacity',
                // Background Logo
                bgLogoEnabled: 'bg_logo_enabled',
                bgLogoPosX: 'bg_logo_pos_x',
                bgLogoPosY: 'bg_logo_pos_y',
                bgLogoSize: 'bg_logo_size',
                bgLogoOpacity: 'bg_logo_opacity',
                // Lighting
                ambientIntensity: 'ambient_intensity',
                ambientColor: 'ambient_color',
                directionalIntensity: 'directional_intensity',
                directionalColor: 'directional_color',
                directionalPosX: 'directional_pos_x',
                directionalPosY: 'directional_pos_y',
                directionalPosZ: 'directional_pos_z',
                // Particles - support both old and new naming
                particlesEnabled: 'particles_enabled',
                particlesCount: 'particles_count',
                particlesSize: 'particles_size',
                particlesColor: 'particles_color',
                particlesOpacity: 'particles_opacity',
                particlesSpeed: 'particles_speed',
                // Old particle naming (for backwards compatibility)
                particleCount: 'particles_count',
                particleSize: 'particles_size',
                particleColor: 'particles_color',
                particleOpacity: 'particles_opacity',
                particleSpeed: 'particles_speed'
            };
            
            // Create settings object with snake_case keys and 'primary' replaced
            var settingsToApply = {};
            for (var camelKey in settings) {
                var snakeKey = keyMap[camelKey] || camelKey;
                var value = settings[camelKey];
                if (value === 'primary') {
                    settingsToApply[snakeKey] = primaryColor;
                } else {
                    settingsToApply[snakeKey] = value;
                }
            }
            
            console.log('[Theme Load] Converted settings to apply:', JSON.stringify(settingsToApply, null, 2));
            console.log('[Theme Load] Total settings count:', Object.keys(settingsToApply).length);
            
            // Use the unified applyPresetSettings function
            applyPresetSettings(settingsToApply);
        }
        
        
        // Generate random color variations
        function generateRandomTheme(primaryColor) {
            // Helper functions
            function hexToHSL(hex) {
                var r = parseInt(hex.slice(1,3), 16) / 255;
                var g = parseInt(hex.slice(3,5), 16) / 255;
                var b = parseInt(hex.slice(5,7), 16) / 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;
                if (max === min) { h = s = 0; }
                else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                        case g: h = ((b - r) / d + 2) / 6; break;
                        case b: h = ((r - g) / d + 4) / 6; break;
                    }
                }
                return { h: h * 360, s: s * 100, l: l * 100 };
            }
            
            function hslToHex(h, s, l) {
                h /= 360; s /= 100; l /= 100;
                var r, g, b;
                if (s === 0) { r = g = b = l; }
                else {
                    function hue2rgb(p, q, t) {
                        if (t < 0) t += 1; if (t > 1) t -= 1;
                        if (t < 1/6) return p + (q - p) * 6 * t;
                        if (t < 1/2) return q;
                        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                        return p;
                    }
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1/3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1/3);
                }
                return '#' + [r, g, b].map(function(x) {
                    return Math.round(x * 255).toString(16).padStart(2, '0');
                }).join('');
            }
            
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            function randomChoice(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }
            
            var hsl = hexToHSL(primaryColor);
            
            // Generate complementary/analogous colors based on primary
            var hueShift = randomChoice([0, 30, -30, 60, -60, 120, 180]); // Analogous or complementary
            var secondaryHue = (hsl.h + hueShift + 360) % 360;
            var secondaryColor = hslToHex(secondaryHue, Math.min(100, hsl.s + randomInRange(-20, 20)), Math.min(90, Math.max(20, hsl.l + randomInRange(-20, 20))));
            
            // Random gradient type
            var gradientStyle = randomChoice(['dark', 'light', 'colored', 'duotone']);
            var bgTop, bgBottom;
            
            switch(gradientStyle) {
                case 'dark':
                    bgTop = hslToHex(hsl.h, randomInRange(10, 40), randomInRange(5, 20));
                    bgBottom = hslToHex(hsl.h, randomInRange(20, 50), randomInRange(2, 10));
                    break;
                case 'light':
                    bgTop = '#ffffff';
                    bgBottom = hslToHex(hsl.h, randomInRange(20, 60), randomInRange(85, 95));
                    break;
                case 'colored':
                    bgTop = hslToHex(hsl.h, randomInRange(40, 80), randomInRange(40, 70));
                    bgBottom = hslToHex(secondaryHue, randomInRange(40, 80), randomInRange(20, 50));
                    break;
                case 'duotone':
                    bgTop = primaryColor;
                    bgBottom = secondaryColor;
                    break;
            }
            
            // Random skin color (variations of primary or secondary)
            var skinStyle = randomChoice(['primary', 'secondary', 'neutral', 'light']);
            var skinColor;
            switch(skinStyle) {
                case 'primary': skinColor = primaryColor; break;
                case 'secondary': skinColor = secondaryColor; break;
                case 'neutral': skinColor = hslToHex(hsl.h, randomInRange(5, 20), randomInRange(70, 90)); break;
                case 'light': skinColor = hslToHex(hsl.h, randomInRange(20, 50), randomInRange(80, 95)); break;
            }
            
            // Random particle color
            var particleColor = randomChoice([primaryColor, secondaryColor, '#ffffff', hslToHex(hsl.h, 60, 60)]);
            
            // Random lighting
            var lightingStyle = randomChoice(['dramatic', 'soft', 'colored']);
            var ambientIntensity, directionalIntensity, directionalColor;
            switch(lightingStyle) {
                case 'dramatic':
                    ambientIntensity = randomInRange(0.2, 0.5);
                    directionalIntensity = randomInRange(2, 5);
                    directionalColor = randomChoice(['#ffffff', primaryColor]);
                    break;
                case 'soft':
                    ambientIntensity = randomInRange(0.8, 1.5);
                    directionalIntensity = randomInRange(0.3, 1);
                    directionalColor = '#ffffff';
                    break;
                case 'colored':
                    ambientIntensity = randomInRange(0.4, 0.8);
                    directionalIntensity = randomInRange(1, 3);
                    directionalColor = randomChoice([primaryColor, secondaryColor]);
                    break;
            }
            
            return {
                spinnerColor: primaryColor,
                useLogoLoader: true,
                logoLoaderAnimation: randomChoice(['pulse', 'spin', 'bounce']),
                logoLoaderSize: Math.round(randomInRange(80, 120)),
                // Animation Player
                playerBgColor: hslToHex(0, 0, randomInRange(30, 70)),
                playerBgOpacity: randomInRange(0, 0.5),
                playerButtonBgColor: primaryColor,
                playerButtonBgOpacity: randomInRange(0.6, 1),
                playerIconColor: '#ffffff',
                playerAccentColor: primaryColor,
                playerAlwaysVisible: 'no',
                playerWidth: 100,
                playerShowTime: true,
                // Menu
                menuBgColor: hslToHex(hsl.h, randomInRange(5, 20), randomInRange(5, 25)),
                menuBgOpacity: randomInRange(0.7, 0.95),
                menuTextColor: '#ffffff',
                menuTextOpacity: 1,
                menuAccentColor: primaryColor,
                hideRightMenu: false,
                showScreenshotButton: true,
                // Thumbnail Labels
                thumbnailLabelColor: randomChoice(['#000000', '#333333', '#222222']),
                thumbnailLabelOpacity: randomInRange(0.05, 0.2),
                // Material settings
                skinColor: skinColor,
                skinOpacity: 1,
                skinRoughness: randomInRange(0, 0.3),
                skinMetalness: randomInRange(0, 0.2),
                skinTransmission: randomInRange(0.7, 1),
                skinThickness: 0,
                skinIor: randomInRange(1, 1.5),
                skinEnvIntensity: randomInRange(1.5, 3),
                // Scene Background
                bgGradientTop: bgTop,
                bgGradientBottom: bgBottom,
                bgGradientOpacity: 1,
                // Background Logo
                bgLogoEnabled: true,
                bgLogoPosX: 50,
                bgLogoPosY: Math.round(randomInRange(80, 95)),
                bgLogoSize: Math.round(randomInRange(100, 200)),
                bgLogoOpacity: randomInRange(0.3, 0.7),
                // Lighting
                ambientIntensity: ambientIntensity,
                ambientColor: '#ffffff',
                directionalIntensity: directionalIntensity,
                directionalColor: directionalColor,
                directionalPosX: randomInRange(0.5, 2),
                directionalPosY: randomInRange(1, 2),
                directionalPosZ: randomInRange(0.5, 1.5),
                // Particles - use new naming convention
                particlesEnabled: Math.random() > 0.2, // 80% chance enabled
                particlesCount: Math.round(randomInRange(500, 2000)),
                particlesSize: randomInRange(0.005, 0.015),
                particlesColor: particleColor,
                particlesOpacity: randomInRange(0.5, 1),
                particlesSpeed: randomInRange(0.2, 0.8)
            };
        }
        
        // Apply Theme button click (Step 4)
        $('#apply-preset-theme').on('click', function() {
            var selectedVal = $('#flexframe_material_preset').val();
            var presetId = selectedVal.replace('custom:', '');
            var isCustomTheme = selectedVal.indexOf('custom:') === 0;
            
            var $btn = $(this);
            $btn.prop('disabled', true).html('<span class="dashicons dashicons-update spin" style="margin-top: 4px;"></span> <?php _e('Applying & Saving...', 'flexframe-viewer'); ?>');
            
            // Update the base theme indicator in Step 5
            var themeName = isCustomTheme ? presetId : (builtInPresets[presetId] ? builtInPresets[presetId].name : presetId);
            $('#current-base-theme-name').text(themeName + ' Theme');
            
            // Apply the preset settings to form fields
            if (isCustomTheme) {
                // Load custom preset via AJAX
                loadCustomPreset(presetId);
            } else {
                // Apply built-in preset (synchronous)
                applyBuiltInPreset(presetId);
            }
            
            // Submit form after brief delay to allow settings to populate
            setTimeout(function() {
                console.log('[Theme Apply] Submitting form to save settings...');
                $('#submit').click();
            }, isCustomTheme ? 800 : 200);
        });
        
        // Set initial description on page load
        var initialPreset = $('#flexframe_material_preset').val();
        if (initialPreset) {
            var isCustom = initialPreset.indexOf('custom:') === 0;
            if (isCustom) {
                $('#preset-desc-text').text('<?php _e('Your custom theme with personalized settings.', 'flexframe-viewer'); ?>');
                $('#delete-custom-theme').show();
            } else if (builtInPresets[initialPreset]) {
                $('#preset-desc-text').text(builtInPresets[initialPreset].description);
            }
        }
        
        // Show save theme message helper
        function showSaveThemeMessage(message, type) {
            var $msg = $('#save-theme-message');
            $msg.removeClass('success error').addClass(type).text(message).fadeIn(200);
            setTimeout(function() {
                $msg.fadeOut(200);
            }, 4000);
        }
        
        // Load custom preset from server
        function loadCustomPreset(presetId) {
            console.log('[Theme Load] Loading custom theme ID:', presetId);
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_load_custom_preset',
                    preset_id: presetId,
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>'
                },
                success: function(response) {
                    console.log('[Theme Load] AJAX response:', response);
                    if (response.success && response.data && response.data.preset) {
                        console.log('[Theme Load] Theme settings from AJAX:', response.data.preset.settings);
                        console.log('[Theme Load] Primary color:', response.data.preset.settings.primary_color, 'mode:', response.data.preset.settings.primary_color_mode);
                        applyPresetSettings(response.data.preset.settings);
                    } else {
                        console.error('[Theme Load] Failed to load theme:', response);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('[Theme Load] AJAX error:', error);
                }
            });
        }
        
        // Save Custom Theme button (Step 5)
        $('#save-custom-theme-btn').on('click', function() {
            var themeName = $('#custom-theme-name').val().trim();
            
            if (!themeName) {
                showSaveThemeMessage('<?php _e('Please enter a name for your custom theme.', 'flexframe-viewer'); ?>', 'error');
                $('#custom-theme-name').focus();
                return;
            }
            
            var $btn = $(this);
            $btn.prop('disabled', true).html('<span class="dashicons dashicons-update spin" style="margin-top: 6px;"></span> <?php _e('Saving...', 'flexframe-viewer'); ?>');
            
            // Collect current settings
            var settings = getCurrentSettings();
            
            // Save via AJAX
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_save_custom_preset',
                    preset_name: themeName,
                    preset_data: settings,
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        var presetId = response.data.preset_id;
                        
                        // Add to Step 4 dropdown if not already there
                        var $optgroup = $('#custom-themes-optgroup');
                        if ($optgroup.length === 0) {
                            // Create optgroup if it doesn't exist
                            $('#flexframe_material_preset').append('<optgroup label="<?php _e('Your Custom Themes', 'flexframe-viewer'); ?>" id="custom-themes-optgroup"></optgroup>');
                            $optgroup = $('#custom-themes-optgroup');
                        }
                        $optgroup.show();
                        
                        // Check if this preset already exists (updating)
                        var $existingOption = $optgroup.find('option[value="custom:' + presetId + '"]');
                        if ($existingOption.length) {
                            $existingOption.text(themeName);
                        } else {
                            $optgroup.append('<option value="custom:' + presetId + '">' + themeName + '</option>');
                        }
                        
                        // Select the new theme in Step 4
                        $('#flexframe_material_preset').val('custom:' + presetId).trigger('change');
                        
                        showSaveThemeMessage('<?php _e('Theme saved successfully! It has been added to Step 4.', 'flexframe-viewer'); ?>', 'success');
                        
                        // Also save the form
                        setTimeout(function() {
                            $('#submit').click();
                        }, 500);
                    } else {
                        showSaveThemeMessage(response.data || '<?php _e('Error saving theme.', 'flexframe-viewer'); ?>', 'error');
                    }
                    
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-saved" style="margin-top: 6px;"></span> <?php _e('Save Theme & Apply', 'flexframe-viewer'); ?>');
                },
                error: function() {
                    showSaveThemeMessage('<?php _e('Error saving theme. Please try again.', 'flexframe-viewer'); ?>', 'error');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-saved" style="margin-top: 6px;"></span> <?php _e('Save Theme & Apply', 'flexframe-viewer'); ?>');
                }
            });
        });
        
        // =====================
        // Custom Preset Manager
        // =====================
        
        // Enable/disable load and delete buttons based on selection
        $('#flexframe_load_preset').on('change', function() {
            var selectedVal = $(this).val();
            var hasSelection = selectedVal !== '';
            var isBuiltIn = selectedVal.indexOf('builtin:') === 0;
            
            $('#flexframe-load-preset-btn').prop('disabled', !hasSelection);
            
            // Only show delete button for user-saved presets (not built-in)
            if (hasSelection && !isBuiltIn) {
                $('#flexframe-delete-preset-btn').show().prop('disabled', false);
            } else {
                $('#flexframe-delete-preset-btn').hide().prop('disabled', true);
            }
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
        // Get current settings for saving
        function getCurrentSettings() {
            // Collect equipment material settings
            var equipmentMaterials = {};
            var materialKeys = ['barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber'];
            
            materialKeys.forEach(function(matKey) {
                var isEnabled = $('input[name="flexframe_' + matKey + '_enabled"]').is(':checked');
                if (isEnabled) {
                    equipmentMaterials[matKey] = {
                        enabled: true,
                        color: $('input[name="flexframe_' + matKey + '_color"]').val(),
                        opacity: $('input[name="flexframe_' + matKey + '_opacity"]').val(),
                        metalness: $('input[name="flexframe_' + matKey + '_metalness"]').val(),
                        roughness: $('input[name="flexframe_' + matKey + '_roughness"]').val(),
                        color_map_enabled: $('input[name="flexframe_' + matKey + '_color_map_enabled"]').is(':checked'),
                        bump_scale: $('input[name="flexframe_' + matKey + '_bump_scale"]').val(),
                        normal_scale: $('input[name="flexframe_' + matKey + '_normal_scale"]').val(),
                        clearcoat: $('input[name="flexframe_' + matKey + '_clearcoat"]').val(),
                        clearcoat_roughness: $('input[name="flexframe_' + matKey + '_clearcoat_roughness"]').val(),
                        emissive_color: $('input[name="flexframe_' + matKey + '_emissive_color"]').val(),
                        emissive_intensity: $('input[name="flexframe_' + matKey + '_emissive_intensity"]').val(),
                        blending: $('select[name="flexframe_' + matKey + '_blending"]').val(),
                        transmission: $('input[name="flexframe_' + matKey + '_transmission"]').val(),
                        thickness: $('input[name="flexframe_' + matKey + '_thickness"]').val(),
                        ior: $('input[name="flexframe_' + matKey + '_ior"]').val(),
                        env_intensity: $('input[name="flexframe_' + matKey + '_env_intensity"]').val(),
                        sheen: $('input[name="flexframe_' + matKey + '_sheen"]').val(),
                        sheen_roughness: $('input[name="flexframe_' + matKey + '_sheen_roughness"]').val(),
                        sheen_color: $('input[name="flexframe_' + matKey + '_sheen_color"]').val()
                    };
                }
            });
            
            return {
                // Step 1 - Brand Settings
                primary_color_mode: $('input[name="flexframe_primary_color_mode"]').val() || 'custom',
                primary_color: $('#flexframe_primary_color').val(),
                
                // UI Settings - Loading Indicator
                spinner_color: $('#flexframe_spinner_color').val(),
                use_logo_loader: $('input[name="flexframe_use_logo_loader"]:checked').val() === '1',
                logo_loader_animation: $('#flexframe_logo_loader_animation').val(),
                logo_loader_size: $('#flexframe_logo_loader_size').val(),
                
                // UI Settings - Animation Player
                player_bg_color: $('#flexframe_player_bg_color').val(),
                player_bg_opacity: $('#flexframe_player_bg_opacity').val(),
                player_button_bg_color: $('#flexframe_player_button_bg_color').val(),
                player_button_bg_opacity: $('#flexframe_player_button_bg_opacity').val(),
                player_icon_color: $('#flexframe_player_icon_color').val(),
                player_accent_color: $('#flexframe_player_accent_color').val(),
                player_always_visible: $('#flexframe_player_always_visible').val(),
                player_width: $('#flexframe_player_width').val(),
                player_show_time: $('#flexframe_player_show_time').is(':checked'),
                
                // UI Settings - Menu Styling
                menu_bg_color: $('#flexframe_menu_bg_color').val(),
                menu_bg_opacity: $('#flexframe_menu_bg_opacity').val(),
                menu_text_color: $('#flexframe_menu_text_color').val(),
                menu_text_opacity: $('#flexframe_menu_text_opacity').val(),
                menu_accent_color: $('#flexframe_menu_accent_color').val(),
                hide_right_menu: $('#flexframe_hide_right_menu').is(':checked'),
                show_screenshot_button: $('#flexframe_show_screenshot_button').is(':checked'),
                
                // UI Settings - Thumbnail Labels
                thumbnail_label_color: $('#flexframe_thumbnail_label_color').val(),
                thumbnail_label_opacity: $('#flexframe_thumbnail_label_opacity').val(),
                
                // Material Settings - SKIN
                skin_color: $('#flexframe_skin_color').val(),
                skin_opacity: $('#flexframe_skin_opacity').val(),
                skin_roughness: $('#flexframe_skin_roughness').val(),
                skin_metalness: $('#flexframe_skin_metalness').val(),
                skin_transmission: $('#flexframe_skin_transmission').val(),
                skin_thickness: $('#flexframe_skin_thickness').val(),
                skin_ior: $('#flexframe_skin_ior').val(),
                skin_env_intensity: $('#flexframe_skin_env_intensity').val(),
                
                // Equipment Material Settings
                equipment_materials: equipmentMaterials,
                
                // Scene Background Settings
                bg_gradient_top: $('#flexframe_bg_gradient_top').val(),
                bg_gradient_bottom: $('#flexframe_bg_gradient_bottom').val(),
                bg_gradient_opacity: $('#flexframe_bg_opacity').val(),
                
                // Background Logo Watermark
                bg_logo_enabled: $('#flexframe_bg_logo_enabled').is(':checked'),
                bg_logo_pos_x: $('#flexframe_bg_logo_pos_x').val(),
                bg_logo_pos_y: $('#flexframe_bg_logo_pos_y').val(),
                bg_logo_size: $('#flexframe_bg_logo_size').val(),
                bg_logo_opacity: $('#flexframe_bg_logo_opacity').val(),
                
                // Lighting Settings - Ambient
                ambient_intensity: $('#flexframe_ambient_intensity').val(),
                ambient_color: $('#flexframe_ambient_color').val(),
                
                // Lighting Settings - Directional
                directional_intensity: $('#flexframe_directional_intensity').val(),
                directional_color: $('#flexframe_directional_color').val(),
                directional_pos_x: $('#flexframe_directional_pos_x').val(),
                directional_pos_y: $('#flexframe_directional_pos_y').val(),
                directional_pos_z: $('#flexframe_directional_pos_z').val(),
                
                // Particle Settings
                particles_enabled: $('#flexframe_particles_enabled').is(':checked'),
                particles_count: $('#flexframe_particles_count').val(),
                particles_size: $('#flexframe_particles_size').val(),
                particles_color: $('#flexframe_particles_color').val(),
                particles_opacity: $('#flexframe_particles_opacity').val(),
                particles_speed: $('#flexframe_particles_speed').val()
            };
            
            console.log('[Theme Save] Collected primary color:', settings.primary_color, 'mode:', settings.primary_color_mode);
            return settings;
        }
        
        // Apply settings from preset
        function applyPresetSettings(settings) {
            console.log('[Theme Apply] Applying preset settings:', settings);
            
            // Primary Color (if exists in preset)
            if (settings.primary_color !== undefined) {
                $('#flexframe_primary_color').val(settings.primary_color).trigger('input');
                $('#flexframe_primary_color').siblings('.color-value').text(settings.primary_color);
                // Update hex display in Step 3
                $('.color-hex-display').text(settings.primary_color);
                console.log('[Theme Apply] Set primary color to:', settings.primary_color);
            }
            if (settings.primary_color_mode !== undefined) {
                // Update hidden input for primary color mode
                $('input[name="flexframe_primary_color_mode"]').val(settings.primary_color_mode);
                console.log('[Theme Apply] Set primary color mode to:', settings.primary_color_mode);
            } else {
                // If no mode specified, set to 'custom' when color exists
                if (settings.primary_color !== undefined) {
                    $('input[name="flexframe_primary_color_mode"]').val('custom');
                    console.log('[Theme Apply] Set primary color mode to: custom (fallback)');
                }
            }
            
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
            
            if (settings.menu_text_opacity !== undefined) {
                $('#flexframe_menu_text_opacity').val(settings.menu_text_opacity).trigger('input');
                $('#flexframe_menu_text_opacity').siblings('.opacity-value').text(settings.menu_text_opacity);
            }
            
            $('#flexframe_menu_accent_color').val(settings.menu_accent_color).trigger('input');
            $('#flexframe_menu_accent_color').siblings('.color-value').text(settings.menu_accent_color);
            
            $('#flexframe_hide_right_menu').prop('checked', settings.hide_right_menu);
            
            // Thumbnail Label Settings
            if (settings.thumbnail_label_color !== undefined) {
                $('#flexframe_thumbnail_label_color').val(settings.thumbnail_label_color).trigger('input');
                $('#flexframe_thumbnail_label_color').siblings('.color-value').text(settings.thumbnail_label_color);
            }
            if (settings.thumbnail_label_opacity !== undefined) {
                $('#flexframe_thumbnail_label_opacity').val(settings.thumbnail_label_opacity).trigger('input');
                $('#flexframe_thumbnail_label_opacity').siblings('.opacity-value').text(settings.thumbnail_label_opacity);
            }
            
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
            
            // Particle Settings (if present) - handle both old 'particle_' and new 'particles_' naming
            if (settings.particles_enabled !== undefined) {
                $('#flexframe_particles_enabled').prop('checked', settings.particles_enabled).trigger('change');
            }
            // Handle both naming conventions
            var particleCount = settings.particles_count !== undefined ? settings.particles_count : settings.particle_count;
            if (particleCount !== undefined) {
                $('#flexframe_particles_count').val(particleCount).trigger('input');
                $('#flexframe_particles_count').siblings('.range-value').text(particleCount);
            }
            var particleSize = settings.particles_size !== undefined ? settings.particles_size : settings.particle_size;
            if (particleSize !== undefined) {
                $('#flexframe_particles_size').val(particleSize).trigger('input');
                $('#flexframe_particles_size').siblings('.range-value').text(particleSize);
            }
            var particleColor = settings.particles_color !== undefined ? settings.particles_color : settings.particle_color;
            if (particleColor !== undefined) {
                $('#flexframe_particles_color').val(particleColor).trigger('input');
                $('#flexframe_particles_color').siblings('.color-hex').text(particleColor);
            }
            var particleOpacity = settings.particles_opacity !== undefined ? settings.particles_opacity : settings.particle_opacity;
            if (particleOpacity !== undefined) {
                $('#flexframe_particles_opacity').val(particleOpacity).trigger('input');
                $('#flexframe_particles_opacity').siblings('.range-value').text(particleOpacity);
            }
            var particleSpeed = settings.particles_speed !== undefined ? settings.particles_speed : settings.particle_speed;
            if (particleSpeed !== undefined) {
                $('#flexframe_particles_speed').val(particleSpeed).trigger('input');
                $('#flexframe_particles_speed').siblings('.range-value').text(particleSpeed);
            }
            
            // Player Width and Show Time (if present)
            if (settings.player_width !== undefined) {
                $('#flexframe_player_width').val(settings.player_width).trigger('input');
                $('#flexframe_player_width').siblings('.range-value').text(settings.player_width + '%');
            }
            if (settings.player_show_time !== undefined) {
                $('#flexframe_player_show_time').prop('checked', settings.player_show_time);
            }
            
            // Show Screenshot Button (if present)
            if (settings.show_screenshot_button !== undefined) {
                $('#flexframe_show_screenshot_button').prop('checked', settings.show_screenshot_button);
            }
            
            // Equipment Material Settings (if present)
            if (settings.equipment_materials !== undefined) {
                var materialKeys = ['barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber'];
                
                materialKeys.forEach(function(matKey) {
                    var matSettings = settings.equipment_materials[matKey];
                    var $accordion = $('.equipment-material-accordion[data-material="' + matKey + '"]');
                    
                    if (matSettings && matSettings.enabled) {
                        // Enable the material
                        $('input[name="flexframe_' + matKey + '_enabled"]').prop('checked', true).trigger('change');
                        
                        // Apply all settings
                        if (matSettings.color) {
                            $('input[name="flexframe_' + matKey + '_color"]').val(matSettings.color).trigger('input');
                        }
                        if (matSettings.opacity !== undefined) {
                            $('input[name="flexframe_' + matKey + '_opacity"]').val(matSettings.opacity).trigger('input');
                            $('input[name="flexframe_' + matKey + '_opacity"]').siblings('.range-value').text(matSettings.opacity);
                        }
                        if (matSettings.metalness !== undefined) {
                            $('input[name="flexframe_' + matKey + '_metalness"]').val(matSettings.metalness).trigger('input');
                            $('input[name="flexframe_' + matKey + '_metalness"]').siblings('.range-value').text(matSettings.metalness);
                        }
                        if (matSettings.roughness !== undefined) {
                            $('input[name="flexframe_' + matKey + '_roughness"]').val(matSettings.roughness).trigger('input');
                            $('input[name="flexframe_' + matKey + '_roughness"]').siblings('.range-value').text(matSettings.roughness);
                        }
                        if (matSettings.color_map_enabled !== undefined) {
                            $('input[name="flexframe_' + matKey + '_color_map_enabled"]').prop('checked', matSettings.color_map_enabled);
                        }
                        if (matSettings.bump_scale !== undefined) {
                            $('input[name="flexframe_' + matKey + '_bump_scale"]').val(matSettings.bump_scale).trigger('input');
                            $('input[name="flexframe_' + matKey + '_bump_scale"]').siblings('.range-value').text(matSettings.bump_scale);
                        }
                        if (matSettings.normal_scale !== undefined) {
                            $('input[name="flexframe_' + matKey + '_normal_scale"]').val(matSettings.normal_scale).trigger('input');
                            $('input[name="flexframe_' + matKey + '_normal_scale"]').siblings('.range-value').text(matSettings.normal_scale);
                        }
                        if (matSettings.clearcoat !== undefined) {
                            $('input[name="flexframe_' + matKey + '_clearcoat"]').val(matSettings.clearcoat).trigger('input');
                            $('input[name="flexframe_' + matKey + '_clearcoat"]').siblings('.range-value').text(matSettings.clearcoat);
                        }
                        if (matSettings.clearcoat_roughness !== undefined) {
                            $('input[name="flexframe_' + matKey + '_clearcoat_roughness"]').val(matSettings.clearcoat_roughness).trigger('input');
                            $('input[name="flexframe_' + matKey + '_clearcoat_roughness"]').siblings('.range-value').text(matSettings.clearcoat_roughness);
                        }
                        if (matSettings.emissive_color) {
                            $('input[name="flexframe_' + matKey + '_emissive_color"]').val(matSettings.emissive_color).trigger('input');
                        }
                        if (matSettings.emissive_intensity !== undefined) {
                            $('input[name="flexframe_' + matKey + '_emissive_intensity"]').val(matSettings.emissive_intensity).trigger('input');
                            $('input[name="flexframe_' + matKey + '_emissive_intensity"]').siblings('.range-value').text(matSettings.emissive_intensity);
                        }
                        if (matSettings.blending) {
                            $('select[name="flexframe_' + matKey + '_blending"]').val(matSettings.blending);
                        }
                        if (matSettings.transmission !== undefined) {
                            $('input[name="flexframe_' + matKey + '_transmission"]').val(matSettings.transmission).trigger('input');
                            $('input[name="flexframe_' + matKey + '_transmission"]').siblings('.range-value').text(matSettings.transmission);
                        }
                        if (matSettings.thickness !== undefined) {
                            $('input[name="flexframe_' + matKey + '_thickness"]').val(matSettings.thickness).trigger('input');
                            $('input[name="flexframe_' + matKey + '_thickness"]').siblings('.range-value').text(matSettings.thickness);
                        }
                        if (matSettings.ior !== undefined) {
                            $('input[name="flexframe_' + matKey + '_ior"]').val(matSettings.ior).trigger('input');
                            $('input[name="flexframe_' + matKey + '_ior"]').siblings('.range-value').text(matSettings.ior);
                        }
                        if (matSettings.env_intensity !== undefined) {
                            $('input[name="flexframe_' + matKey + '_env_intensity"]').val(matSettings.env_intensity).trigger('input');
                            $('input[name="flexframe_' + matKey + '_env_intensity"]').siblings('.range-value').text(matSettings.env_intensity);
                        }
                        if (matSettings.sheen !== undefined) {
                            $('input[name="flexframe_' + matKey + '_sheen"]').val(matSettings.sheen).trigger('input');
                            $('input[name="flexframe_' + matKey + '_sheen"]').siblings('.range-value').text(matSettings.sheen);
                        }
                        if (matSettings.sheen_roughness !== undefined) {
                            $('input[name="flexframe_' + matKey + '_sheen_roughness"]').val(matSettings.sheen_roughness).trigger('input');
                            $('input[name="flexframe_' + matKey + '_sheen_roughness"]').siblings('.range-value').text(matSettings.sheen_roughness);
                        }
                        if (matSettings.sheen_color) {
                            $('input[name="flexframe_' + matKey + '_sheen_color"]').val(matSettings.sheen_color).trigger('input');
                        }
                    } else {
                        // Disable the material if not in preset or explicitly disabled
                        $('input[name="flexframe_' + matKey + '_enabled"]').prop('checked', false).trigger('change');
                    }
                });
            }
            
            // Background Logo Settings (if present)
            if (settings.bg_logo_enabled !== undefined) {
                $('input[name="flexframe_bg_logo_enabled"][value="' + (settings.bg_logo_enabled ? '1' : '0') + '"]').prop('checked', true).trigger('change');
            }
            if (settings.bg_logo_pos_x !== undefined) {
                $('#flexframe_bg_logo_pos_x').val(settings.bg_logo_pos_x).trigger('input');
                $('#flexframe_bg_logo_pos_x').siblings('.range-value').text(settings.bg_logo_pos_x + '%');
            }
            if (settings.bg_logo_pos_y !== undefined) {
                $('#flexframe_bg_logo_pos_y').val(settings.bg_logo_pos_y).trigger('input');
                $('#flexframe_bg_logo_pos_y').siblings('.range-value').text(settings.bg_logo_pos_y + '%');
            }
            if (settings.bg_logo_size !== undefined) {
                $('#flexframe_bg_logo_size').val(settings.bg_logo_size).trigger('input');
                $('#flexframe_bg_logo_size').siblings('.range-value').text(settings.bg_logo_size + 'px');
            }
            if (settings.bg_logo_opacity !== undefined) {
                $('#flexframe_bg_logo_opacity').val(settings.bg_logo_opacity).trigger('input');
                $('#flexframe_bg_logo_opacity').siblings('.range-value').text(Math.round(settings.bg_logo_opacity * 100) + '%');
            }
            
            // Update UI preview
            if (typeof updateUIPreview === 'function') {
                updateUIPreview();
            }
            
            // Update all header previews
            if (typeof updateUIHeaderPreview === 'function') {
                updateUIHeaderPreview();
            }
            if (typeof updateMaterialPreview === 'function') {
                updateMaterialPreview();
            }
            if (typeof updateBackgroundPreview === 'function') {
                updateBackgroundPreview();
            }
            if (typeof updateLightingPreview === 'function') {
                updateLightingPreview();
            }
            if (typeof updateParticlesPreview === 'function') {
                updateParticlesPreview();
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
            
            // Check if this is a built-in preset
            if (presetId.indexOf('builtin:') === 0) {
                var builtInId = presetId.replace('builtin:', '');
                var preset = builtInPresets[builtInId];
                
                if (preset && preset.settings) {
                    // Get primary color for 'primary' value substitution
                    var primaryColor = $('#flexframe_primary_color').val() || '#2383cd';
                    
                    // Map camelCase keys from built-in presets to snake_case for applyPresetSettings
                    var keyMap = {
                        spinnerColor: 'spinner_color',
                        useLogoLoader: 'use_logo_loader',
                        logoLoaderAnimation: 'logo_loader_animation',
                        logoLoaderSize: 'logo_loader_size',
                        // Animation Player
                        playerBgColor: 'player_bg_color',
                        playerBgOpacity: 'player_bg_opacity',
                        playerButtonBgColor: 'player_button_bg_color',
                        playerButtonBgOpacity: 'player_button_bg_opacity',
                        playerIconColor: 'player_icon_color',
                        playerAccentColor: 'player_accent_color',
                        playerAlwaysVisible: 'player_always_visible',
                        playerWidth: 'player_width',
                        playerShowTime: 'player_show_time',
                        // Menu
                        menuBgColor: 'menu_bg_color',
                        menuBgOpacity: 'menu_bg_opacity',
                        menuTextColor: 'menu_text_color',
                        menuTextOpacity: 'menu_text_opacity',
                        menuAccentColor: 'menu_accent_color',
                        hideRightMenu: 'hide_right_menu',
                        showScreenshotButton: 'show_screenshot_button',
                        // Thumbnail Labels
                        thumbnailLabelColor: 'thumbnail_label_color',
                        thumbnailLabelOpacity: 'thumbnail_label_opacity',
                        // Skin Material
                        skinColor: 'skin_color',
                        skinOpacity: 'skin_opacity',
                        skinRoughness: 'skin_roughness',
                        skinMetalness: 'skin_metalness',
                        skinTransmission: 'skin_transmission',
                        skinThickness: 'skin_thickness',
                        skinIor: 'skin_ior',
                        skinEnvIntensity: 'skin_env_intensity',
                        // Scene Background
                        bgGradientTop: 'bg_gradient_top',
                        bgGradientBottom: 'bg_gradient_bottom',
                        bgGradientOpacity: 'bg_gradient_opacity',
                        // Background Logo
                        bgLogoEnabled: 'bg_logo_enabled',
                        bgLogoPosX: 'bg_logo_pos_x',
                        bgLogoPosY: 'bg_logo_pos_y',
                        bgLogoSize: 'bg_logo_size',
                        bgLogoOpacity: 'bg_logo_opacity',
                        // Lighting
                        ambientIntensity: 'ambient_intensity',
                        ambientColor: 'ambient_color',
                        directionalIntensity: 'directional_intensity',
                        directionalColor: 'directional_color',
                        directionalPosX: 'directional_pos_x',
                        directionalPosY: 'directional_pos_y',
                        directionalPosZ: 'directional_pos_z',
                        // Particles - support both old and new naming
                        particlesEnabled: 'particles_enabled',
                        particlesCount: 'particles_count',
                        particlesSize: 'particles_size',
                        particlesColor: 'particles_color',
                        particlesOpacity: 'particles_opacity',
                        particlesSpeed: 'particles_speed',
                        // Old particle naming (for backwards compatibility)
                        particleCount: 'particles_count',
                        particleSize: 'particles_size',
                        particleColor: 'particles_color',
                        particleOpacity: 'particles_opacity',
                        particleSpeed: 'particles_speed'
                    };
                    
                    // Create settings object with snake_case keys and 'primary' replaced
                    var settingsToApply = {};
                    for (var camelKey in preset.settings) {
                        var snakeKey = keyMap[camelKey] || camelKey;
                        var value = preset.settings[camelKey];
                        if (value === 'primary') {
                            settingsToApply[snakeKey] = primaryColor;
                        } else {
                            settingsToApply[snakeKey] = value;
                        }
                    }
                    
                    console.log('[Theme Load] Built-in theme data:', settingsToApply);
                    console.log('[Theme Load] Primary color from built-in:', settingsToApply.primary_color, 'mode:', settingsToApply.primary_color_mode);
                    applyPresetSettings(settingsToApply);
                    showPresetMessage('<?php _e('Theme loaded! Remember to save your settings.', 'flexframe-viewer'); ?>', 'success');
                } else {
                    showPresetMessage('<?php _e('Error: Could not find theme settings.', 'flexframe-viewer'); ?>', 'error');
                }
                $btn.prop('disabled', false);
                return;
            }
            
            // Load user-saved preset via AJAX
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
                        console.log('[Theme Load] AJAX theme response:', response.data.preset);
                        console.log('[Theme Load] Primary color from AJAX:', response.data.preset.settings.primary_color, 'mode:', response.data.preset.settings.primary_color_mode);
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
        
        // Logo border checkbox toggle
        $('#flexframe_logo_border_enabled').on('change', function() {
            if ($(this).is(':checked')) {
                $('#logo_border_size_row').slideDown(200);
            } else {
                $('#logo_border_size_row').slideUp(200);
            }
            updateLogoPreview();
        });
        
        // Background logo checkbox toggle
        $('#flexframe_bg_logo_enabled').on('change', function() {
            if ($(this).is(':checked')) {
                $('#bg_logo_options').slideDown(200);
            } else {
                $('#bg_logo_options').slideUp(200);
            }
        });
        
        // Background logo sliders
        $('#flexframe_bg_logo_size').on('input', function() {
            $('#bg_logo_size_value').text($(this).val() + 'px');
        });
        
        $('#flexframe_bg_logo_opacity').on('input', function() {
            var percent = Math.round($(this).val() * 100);
            $('#bg_logo_opacity_value').text(percent + '%');
        });
        
        $('#flexframe_bg_logo_pos_x').on('input', function() {
            $('#bg_logo_pos_x_value').text($(this).val() + '%');
        });
        
        $('#flexframe_bg_logo_pos_y').on('input', function() {
            $('#bg_logo_pos_y_value').text($(this).val() + '%');
        });
        
        // Logo display size slider
        $('#flexframe_logo_display_size').on('input', function() {
            $('#logo_display_size_value').text($(this).val() + '%');
            updateLogoPreview();
        });
        
        // Logo border size slider
        $('#flexframe_logo_border_size').on('input', function() {
            $('#logo_border_size_value').text($(this).val() + 'px');
            updateLogoPreview();
        });
        
        // Function to update logo preview with current settings
        function updateLogoPreview() {
            var $img = $('#flexframe_logo_preview_img');
            if ($img.length === 0) return;
            
            var displaySize = parseInt($('#flexframe_logo_display_size').val()) / 100;
            var borderEnabled = $('#flexframe_logo_border_enabled').is(':checked');
            var borderSize = parseInt($('#flexframe_logo_border_size').val());
            
            var transform = 'scale(' + displaySize + ')';
            var filter = '';
            
            if (borderEnabled) {
                // Use multiple drop-shadows to create a solid border effect
                filter = 'drop-shadow(0 0 ' + borderSize + 'px white) drop-shadow(0 0 ' + borderSize + 'px white) drop-shadow(0 0 ' + (borderSize * 0.5) + 'px white)';
            }
            
            $img.css({
                'transform': transform,
                'filter': filter
            });
        }
        
        // Update range value displays
        $('input[type="range"]').on('input', function() {
            $(this).siblings('.range-value').text($(this).val());
        });
        
        // Update color hex display
        $('input[type="color"]').on('input', function() {
            $(this).siblings('.color-hex').text($(this).val());
            $(this).siblings('.color-hex-display').text($(this).val());
            
            // Update material color preview if in equipment accordion
            var $accordion = $(this).closest('.equipment-material-accordion');
            if ($accordion.length && $(this).attr('name').indexOf('_color') > -1 && $(this).attr('name').indexOf('_emissive') === -1 && $(this).attr('name').indexOf('_sheen') === -1) {
                $accordion.find('.material-color-preview').css('background-color', $(this).val());
            }
        });
        
        // =====================
        // Equipment Material Accordion Handlers
        // =====================
        
        // Toggle equipment material accordion
        $('.equipment-material-header').on('click', function(e) {
            // Don't toggle if clicking on the enable checkbox
            if ($(e.target).closest('.equipment-enable-toggle').length) {
                return;
            }
            
            var $accordion = $(this).closest('.equipment-material-accordion');
            var $content = $accordion.find('.equipment-material-content');
            var isEnabled = $accordion.find('.equipment-material-toggle').is(':checked');
            
            // Only allow toggle if the material is enabled
            if (isEnabled) {
                $accordion.toggleClass('active');
                $content.slideToggle(200);
            }
        });
        
        // Handle equipment material enable/disable toggle
        $('.equipment-material-toggle').on('change', function() {
            var $accordion = $(this).closest('.equipment-material-accordion');
            var $content = $accordion.find('.equipment-material-content');
            
            if ($(this).is(':checked')) {
                $accordion.addClass('active');
                $content.slideDown(200);
            } else {
                $accordion.removeClass('active');
                $content.slideUp(200);
            }
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
                        
                        // Update the URL status section below the input
                        $('#flexframe-url-status').html(
                            '<span style="color: #00a32a; font-size: 14px;">✓ Viewer page URL is set.</span> ' +
                            '<a href="' + response.data.url + '" target="_blank" class="button button-secondary" style="margin-left: 12px;">View Page →</a> ' +
                            '<a href="' + response.data.edit_url + '" target="_blank" class="button button-secondary" style="margin-left: 8px;">Edit Page</a>'
                        );
                        
                        // Update the viewerPageUrl variable for exercise URLs
                        viewerPageUrl = response.data.url;
                        renderExerciseList();
                        
                        // Show links to view/edit the page in status area
                        setTimeout(function() {
                            $status.html(
                                '<span style="color: #00a32a;">✓ Page created!</span> '
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
        var customThumbnails = {};
        var viewerPageUrl = $('#flexframe_viewer_page_url').val() || '<?php echo esc_js(home_url('/')); ?>';
        
        // Load hidden exercises from the hidden input
        try {
            hiddenExercises = JSON.parse($('#flexframe_hidden_exercises').val() || '[]');
        } catch (e) {
            hiddenExercises = [];
        }
        
        // Load custom thumbnails from the hidden input
        try {
            customThumbnails = JSON.parse($('#flexframe_custom_thumbnails').val() || '{}');
        } catch (e) {
            customThumbnails = {};
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
                var customThumb = customThumbnails[exercise.id] || '';
                var defaultThumb = exercise.thumbnail || '';
                var displayThumb = customThumb || defaultThumb;
                var hasCustom = !!customThumb;
                
                html += '<div class="exercise-item' + (isHidden ? ' hidden-exercise' : '') + '" data-id="' + exercise.id + '">';
                html += '    <div class="exercise-visibility-toggle">';
                html += '        <input type="checkbox" ' + (isHidden ? '' : 'checked') + ' title="' + (isHidden ? 'Click to show' : 'Click to hide') + '" />';
                html += '    </div>';
                html += '    <div class="exercise-thumbnail-wrapper">';
                html += '        <div class="exercise-thumbnail' + (hasCustom ? ' has-custom' : '') + '" data-id="' + exercise.id + '">';
                if (displayThumb) {
                    html += '            <img src="' + displayThumb + '" alt="' + exercise.name + '" />';
                } else {
                    html += '            <span class="no-thumbnail">📷</span>';
                }
                html += '        </div>';
                html += '        <div class="exercise-thumbnail-actions">';
                html += '            <button type="button" class="upload-thumbnail-btn" data-id="' + exercise.id + '" data-name="' + exercise.name.replace(/"/g, '&quot;') + '">' + (hasCustom ? 'Change' : 'Upload') + '</button>';
                if (hasCustom) {
                    html += '            <button type="button" class="remove-thumbnail-btn" data-id="' + exercise.id + '">Remove</button>';
                }
                html += '        </div>';
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
        
        // Upload custom thumbnail
        $(document).on('click', '.upload-thumbnail-btn', function(e) {
            e.preventDefault();
            var $btn = $(this);
            var exerciseId = $btn.data('id');
            var exerciseName = $btn.data('name');
            
            // Create WordPress media frame
            var mediaFrame = wp.media({
                title: 'Select Thumbnail for ' + exerciseName,
                button: {
                    text: 'Use as Thumbnail'
                },
                multiple: false,
                library: {
                    type: 'image'
                }
            });
            
            // When image is selected
            mediaFrame.on('select', function() {
                var attachment = mediaFrame.state().get('selection').first().toJSON();
                var imageUrl = attachment.url;
                
                // Use thumbnail size if available
                if (attachment.sizes && attachment.sizes.thumbnail) {
                    imageUrl = attachment.sizes.thumbnail.url;
                } else if (attachment.sizes && attachment.sizes.medium) {
                    imageUrl = attachment.sizes.medium.url;
                }
                
                // Update customThumbnails object
                customThumbnails[exerciseId] = imageUrl;
                
                // Update hidden input
                $('#flexframe_custom_thumbnails').val(JSON.stringify(customThumbnails));
                
                // Update the thumbnail display
                var $wrapper = $btn.closest('.exercise-thumbnail-wrapper');
                var $thumb = $wrapper.find('.exercise-thumbnail');
                $thumb.html('<img src="' + imageUrl + '" alt="' + exerciseName + '" />');
                $thumb.addClass('has-custom');
                
                // Update button text
                $btn.text('Change');
                
                // Add remove button if not present
                if ($wrapper.find('.remove-thumbnail-btn').length === 0) {
                    $btn.after('<button type="button" class="remove-thumbnail-btn" data-id="' + exerciseId + '">Remove</button>');
                }
            });
            
            // Open the media frame
            mediaFrame.open();
        });
        
        // Remove custom thumbnail
        $(document).on('click', '.remove-thumbnail-btn', function(e) {
            e.preventDefault();
            var $btn = $(this);
            var exerciseId = $btn.data('id');
            var $wrapper = $btn.closest('.exercise-thumbnail-wrapper');
            var $item = $btn.closest('.exercise-item');
            
            // Remove from customThumbnails object
            delete customThumbnails[exerciseId];
            
            // Update hidden input
            $('#flexframe_custom_thumbnails').val(JSON.stringify(customThumbnails));
            
            // Find the original thumbnail from exercises data
            var exercise = exercisesData.find(function(ex) { return ex.id === exerciseId; });
            var defaultThumb = exercise ? (exercise.thumbnail || '') : '';
            
            // Update the thumbnail display
            var $thumb = $wrapper.find('.exercise-thumbnail');
            if (defaultThumb) {
                $thumb.html('<img src="' + defaultThumb + '" alt="' + (exercise ? exercise.name : '') + '" />');
            } else {
                $thumb.html('<span class="no-thumbnail">📷</span>');
            }
            $thumb.removeClass('has-custom');
            
            // Update upload button text
            $wrapper.find('.upload-thumbnail-btn').text('Upload');
            
            // Remove the remove button
            $btn.remove();
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
            
            // Update inline player preview
            var $player = $('#preview-player');
            $player.css('background-color', hexToRgba(playerBgColor, playerBgOpacity));
            $player.find('.preview-btn-inline').css({
                'background-color': hexToRgba(playerButtonBgColor, playerButtonBgOpacity),
                'color': playerIconColor
            });
            $player.find('.preview-progress-fill-inline').css('background-color', playerAccentColor);
            $player.find('.preview-time-inline').css('color', playerIconColor);
            
            // Update inline menu preview
            var $menu = $('#preview-menu');
            $menu.css('background-color', hexToRgba(menuBgColor, menuBgOpacity));
            $menu.find('.preview-menu-item-inline').css('color', menuTextColor);
            $menu.find('.preview-menu-item-inline.active').css({
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
        // Header Preview Updates for Custom Settings
        // ============================================
        
        // UI Settings Header Preview
        function updateUIHeaderPreview() {
            var playerButtonBgColor = $('#flexframe_player_button_bg_color').val();
            var playerButtonBgOpacity = parseFloat($('#flexframe_player_button_bg_opacity').val());
            var playerIconColor = $('#flexframe_player_icon_color').val();
            var menuBgColor = $('#flexframe_menu_bg_color').val();
            var menuBgOpacity = parseFloat($('#flexframe_menu_bg_opacity').val());
            var menuTextColor = $('#flexframe_menu_text_color').val();
            
            function hexToRgba(hex, alpha) {
                var r = parseInt(hex.slice(1, 3), 16);
                var g = parseInt(hex.slice(3, 5), 16);
                var b = parseInt(hex.slice(5, 7), 16);
                return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
            }
            
            $('#preview-ui-icons .ui-icon-btn').css({
                'background-color': hexToRgba(playerButtonBgColor, playerButtonBgOpacity),
                'color': playerIconColor
            });
            
            $('#preview-ui-icons .ui-icon-menu').css({
                'background-color': hexToRgba(menuBgColor, menuBgOpacity),
                'color': menuTextColor
            });
        }
        
        // Material Sphere Preview
        function updateMaterialPreview() {
            var skinColor = $('#flexframe_skin_color').val();
            var opacity = parseFloat($('#flexframe_skin_opacity').val());
            var roughness = parseFloat($('#flexframe_skin_roughness').val());
            var metalness = parseFloat($('#flexframe_skin_metalness').val());
            
            var $sphere = $('#preview-material-sphere');
            
            // Calculate highlight based on roughness (less rough = more shine)
            var highlightIntensity = (1 - roughness) * 0.4;
            var highlightColor = metalness > 0.5 ? skinColor : 'rgba(255,255,255,' + highlightIntensity + ')';
            
            $sphere.css({
                'background-color': skinColor,
                'opacity': opacity,
                'background': 'linear-gradient(135deg, ' + highlightColor + ' 0%, ' + skinColor + ' 50%, ' + adjustBrightness(skinColor, -30) + ' 100%)'
            });
        }
        
        // Gradient Background Preview
        function updateBackgroundPreview() {
            var topColor = $('#flexframe_bg_gradient_top').val();
            var bottomColor = $('#flexframe_bg_gradient_bottom').val();
            var opacity = parseFloat($('#flexframe_bg_opacity').val());
            
            $('#preview-gradient-swatch').css({
                'background': 'linear-gradient(to bottom, ' + topColor + ', ' + bottomColor + ')',
                'opacity': opacity
            });
        }
        
        // Lighting Preview
        function updateLightingPreview() {
            var ambientColor = $('#flexframe_ambient_color').val();
            var ambientIntensity = parseFloat($('#flexframe_ambient_intensity').val());
            var directionalColor = $('#flexframe_directional_color').val();
            var directionalIntensity = parseFloat($('#flexframe_directional_intensity').val());
            
            // Scale intensity to opacity (0-2 -> 0.2-1)
            var ambientOpacity = Math.min(0.2 + (ambientIntensity / 2) * 0.8, 1);
            var directionalOpacity = Math.min(0.2 + (directionalIntensity / 5) * 0.8, 1);
            
            $('#preview-lighting .light-ambient').css({
                'background-color': ambientColor,
                'color': ambientColor,
                'opacity': ambientOpacity
            });
            
            $('#preview-lighting .light-directional').css({
                'background-color': directionalColor,
                'color': directionalColor,
                'opacity': directionalOpacity
            });
        }
        
        // Particles Preview
        function updateParticlesPreview() {
            var enabled = $('#flexframe_particles_enabled').is(':checked');
            var color = $('#flexframe_particles_color').val();
            var opacity = parseFloat($('#flexframe_particles_opacity').val());
            var size = parseFloat($('#flexframe_particles_size').val());
            
            var $container = $('#preview-particles');
            
            if (!enabled) {
                $container.css('opacity', 0.3);
            } else {
                $container.css('opacity', 1);
            }
            
            // Scale size for preview (0.001-0.05 -> 2-6px)
            var previewSize = 2 + (size / 0.05) * 4;
            
            $container.find('.particle').css({
                'background-color': color,
                'opacity': opacity,
                'width': previewSize + 'px',
                'height': previewSize + 'px'
            });
        }
        
        // Helper function to adjust color brightness
        function adjustBrightness(hex, percent) {
            var r = parseInt(hex.slice(1, 3), 16);
            var g = parseInt(hex.slice(3, 5), 16);
            var b = parseInt(hex.slice(5, 7), 16);
            
            r = Math.max(0, Math.min(255, r + percent));
            g = Math.max(0, Math.min(255, g + percent));
            b = Math.max(0, Math.min(255, b + percent));
            
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        
        // Bind change events to update previews
        // UI Header Settings
        $('#flexframe_player_button_bg_color, #flexframe_player_button_bg_opacity, #flexframe_player_icon_color, #flexframe_menu_bg_color, #flexframe_menu_bg_opacity, #flexframe_menu_text_color, #flexframe_menu_text_opacity').on('input change', updateUIHeaderPreview);
        
        // Text opacity slider value display
        $('#flexframe_menu_text_opacity').on('input', function() {
            $(this).siblings('.opacity-value').text($(this).val());
        });
        
        // Thumbnail label opacity slider value display
        $('#flexframe_thumbnail_label_opacity').on('input', function() {
            $(this).siblings('.opacity-value').text($(this).val());
        });
        
        // Material Settings
        $('#flexframe_skin_color, #flexframe_skin_opacity, #flexframe_skin_roughness, #flexframe_skin_metalness').on('input change', updateMaterialPreview);
        
        // Background Settings
        $('#flexframe_bg_gradient_top, #flexframe_bg_gradient_bottom, #flexframe_bg_opacity').on('input change', updateBackgroundPreview);
        
        // Lighting Settings
        $('#flexframe_ambient_color, #flexframe_ambient_intensity, #flexframe_directional_color, #flexframe_directional_intensity').on('input change', updateLightingPreview);
        
        // Particles Settings
        $('#flexframe_particles_enabled, #flexframe_particles_color, #flexframe_particles_opacity, #flexframe_particles_size').on('input change', updateParticlesPreview);
        
        // Initial preview updates
        updateUIHeaderPreview();
        updateMaterialPreview();
        updateBackgroundPreview();
        updateLightingPreview();
        updateParticlesPreview();
        
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
                logoBorderEnabled: $('#flexframe_logo_border_enabled').is(':checked'),
                logoBorderSize: $('#flexframe_logo_border_size').val(),
                logoDisplaySize: $('#flexframe_logo_display_size').val(),
                
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
        
        // ============================================
        // Live Preview Toggle
        // ============================================
        
        $('#toggle-preview-btn').on('click', function(e) {
            e.preventDefault();
            var $button = $(this);
            var $container = $('#live-preview-container');
            
            if ($container.is(':visible')) {
                // Hide preview
                $container.slideUp(300);
                $button.html('<span class="dashicons dashicons-visibility"></span> <?php _e('Show Preview', 'flexframe-viewer'); ?>');
            } else {
                // Show preview
                $container.slideDown(300);
                $button.html('<span class="dashicons dashicons-hidden"></span> <?php _e('Hide Preview', 'flexframe-viewer'); ?>');
                
                // Reload iframe if it exists
                var $iframe = $('#live-preview-iframe');
                if ($iframe.length) {
                    var src = $iframe.attr('src');
                    $iframe.attr('src', src);
                }
            }
        });
    });
    </script>
    <?php
}
