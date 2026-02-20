<?php
/**
 * Plugin Name: FlexFrame v41
 * Plugin URI: https://flexframe.com
 * Description: 3D interactive exercise viewer with customizable logo and materials
 * Version: 1.41.318
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
define('FLEXFRAME_VERSION', '1.41.438');
define('FLEXFRAME_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLEXFRAME_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include Workout Builder modules
require_once FLEXFRAME_PLUGIN_DIR . 'workout-builder/workout-post-type.php';
require_once FLEXFRAME_PLUGIN_DIR . 'workout-builder/workout-shortcode.php';

/**
 * Allow GLB/GLTF file uploads in WordPress Media Library
 */
function flexframe_allow_glb_upload($mimes) {
    $mimes['glb'] = 'model/gltf-binary';
    $mimes['gltf'] = 'model/gltf+json';
    return $mimes;
}
add_filter('upload_mimes', 'flexframe_allow_glb_upload');

/**
 * Fix MIME type detection for GLB files (WordPress may not detect correctly)
 */
function flexframe_check_glb_filetype($data, $file, $filename, $mimes) {
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    if ($ext === 'glb') {
        $data['ext'] = 'glb';
        $data['type'] = 'model/gltf-binary';
    } elseif ($ext === 'gltf') {
        $data['ext'] = 'gltf';
        $data['type'] = 'model/gltf+json';
    }
    return $data;
}
add_filter('wp_check_filetype_and_ext', 'flexframe_check_glb_filetype', 10, 4);

// Log plugin initialization
flexframe_log('Plugin loaded', array('version' => '1.40.0', 'plugin_url' => plugin_dir_url(__FILE__)));

// Include admin settings
require_once FLEXFRAME_PLUGIN_DIR . 'admin/settings-page.php';

/**
 * ========== CLIENT ACCESS SYSTEM ==========
 * Custom role & capability for gym/client accounts to access
 * FlexFrame settings without full WordPress admin access.
 */

/**
 * Register the flexframe_manager role and manage_flexframe capability.
 * Called on activation and on init (to ensure cap exists on admins).
 */
function flexframe_setup_roles() {
    // Add manage_flexframe cap to administrator role
    $admin = get_role('administrator');
    if ($admin && !$admin->has_cap('manage_flexframe')) {
        $admin->add_cap('manage_flexframe');
    }
    
    // Create/update the flexframe_manager role
    $existing = get_role('flexframe_manager');
    if (!$existing) {
        add_role('flexframe_manager', 'FlexFrame Manager', array(
            'read'              => true,
            'upload_files'      => true,
            'manage_flexframe'  => true,
        ));
    } else {
        // Ensure it has the right caps
        if (!$existing->has_cap('manage_flexframe')) {
            $existing->add_cap('manage_flexframe');
        }
        if (!$existing->has_cap('upload_files')) {
            $existing->add_cap('upload_files');
        }
    }
}
add_action('init', 'flexframe_setup_roles');

/**
 * Check if a user is a FlexFrame client (not an admin).
 */
function flexframe_is_client_user($user = null) {
    if (!$user) {
        $user = wp_get_current_user();
    }
    if (!$user || !$user->exists()) return false;
    return in_array('flexframe_manager', (array) $user->roles) && !in_array('administrator', (array) $user->roles);
}

/**
 * Hide the WordPress admin bar for FlexFrame client users.
 */
function flexframe_hide_admin_bar_for_clients() {
    if (flexframe_is_client_user()) {
        show_admin_bar(false);
    }
}
add_action('after_setup_theme', 'flexframe_hide_admin_bar_for_clients');

/**
 * Remove all admin menu items except FlexFrame for client users.
 */
function flexframe_restrict_admin_menu() {
    if (!flexframe_is_client_user()) return;
    
    global $menu, $submenu;
    
    // Keep only FlexFrame and profile
    $allowed_slugs = array('flexframe-settings', 'profile.php');
    
    if (is_array($menu)) {
        foreach ($menu as $key => $item) {
            if (!isset($item[2])) continue;
            if (!in_array($item[2], $allowed_slugs)) {
                remove_menu_page($item[2]);
            }
        }
    }
}
add_action('admin_menu', 'flexframe_restrict_admin_menu', 999);

/**
 * Redirect FlexFrame clients to the settings page on login & dashboard access.
 */
function flexframe_redirect_client_on_login($redirect_to, $requested, $user) {
    if (is_wp_error($user) || !is_a($user, 'WP_User')) return $redirect_to;
    
    if (flexframe_is_client_user($user)) {
        return admin_url('admin.php?page=flexframe-settings');
    }
    return $redirect_to;
}
add_filter('login_redirect', 'flexframe_redirect_client_on_login', 10, 3);

/**
 * Redirect clients away from dashboard and other admin pages.
 */
function flexframe_redirect_client_away_from_dashboard() {
    if (!flexframe_is_client_user()) return;
    
    global $pagenow;
    $current_page = isset($_GET['page']) ? $_GET['page'] : '';
    
    // Allow FlexFrame settings, profile, AJAX, and options.php (form save)
    $allowed_pages = array('flexframe-settings');
    $allowed_pagenow = array('admin-ajax.php', 'options.php', 'profile.php', 'async-upload.php', 'media-upload.php', 'upload.php');
    
    if (in_array($current_page, $allowed_pages)) return;
    if (in_array($pagenow, $allowed_pagenow)) return;
    
    // Redirect everything else to FlexFrame settings
    wp_redirect(admin_url('admin.php?page=flexframe-settings'));
    exit;
}
add_action('admin_init', 'flexframe_redirect_client_away_from_dashboard');

/**
 * Inject custom admin CSS to hide WP clutter for client users.
 */
function flexframe_client_admin_styles() {
    if (!flexframe_is_client_user()) return;
    ?>
    <style>
        /* Hide WP admin notices, footer, and update nag for clients */
        #wpfooter,
        .update-nag,
        .notice:not(.flexframe-notice),
        #wp-admin-bar-root-default,
        #screen-meta,
        #screen-meta-links,
        .wp-header-end { display: none !important; }
        
        /* Clean up the admin layout */
        #wpcontent { padding-left: 0 !important; }
        #adminmenuwrap, #adminmenuback, #adminmenumain { display: none !important; }
        #wpcontent, #wpbody { margin-left: 0 !important; }
        
        /* Standalone app feel */
        #wpbody-content {
            padding: 0 !important;
            max-width: 100%;
            margin: 0;
            background: #f0f2f5;
            min-height: 100vh;
        }
        
        .wrap {
            max-width: 960px;
            margin: 0 auto !important;
            padding: 0 24px 40px 24px;
        }
        
        /* ─── Top Navigation Bar ─── */
        .flexframe-client-topbar {
            background: #1d2327;
            color: #fff;
            padding: 0 24px;
            height: 56px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 -24px 0 -24px;
            position: sticky;
            top: 0;
            z-index: 999;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .flexframe-client-topbar .topbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 15px;
            font-weight: 600;
            min-width: 0;
        }
        .flexframe-client-topbar .topbar-logo {
            height: 32px;
            width: auto;
            max-width: 120px;
            object-fit: contain;
            border-radius: 4px;
        }
        .flexframe-client-topbar .topbar-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .flexframe-client-topbar .topbar-brand .dashicons {
            font-size: 24px;
            width: 24px;
            height: 24px;
            color: var(--client-accent, #2271b1);
        }
        .flexframe-client-topbar .topbar-actions {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .flexframe-client-topbar .topbar-btn {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            color: #bfc5cb;
            text-decoration: none;
            font-size: 13px;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        .flexframe-client-topbar .topbar-btn .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
        }
        .flexframe-client-topbar .topbar-btn:hover {
            color: #fff;
            background: rgba(255,255,255,0.08);
        }
        .flexframe-client-topbar .topbar-btn-accent {
            background: var(--client-accent, #2271b1);
            color: #fff;
            font-weight: 500;
        }
        .flexframe-client-topbar .topbar-btn-accent:hover {
            filter: brightness(1.15);
            color: #fff;
            background: var(--client-accent, #2271b1);
        }
        .flexframe-client-topbar .topbar-btn-logout:hover {
            color: #ff6b6b;
            background: rgba(255,107,107,0.1);
        }
        
        /* ─── Welcome Hero Card ─── */
        .flexframe-client-welcome {
            background: #fff;
            border-radius: 12px;
            margin: 24px -24px 28px -24px;
            padding: 0;
            box-shadow: 0 1px 4px rgba(0,0,0,0.06);
            overflow: hidden;
            border: 1px solid #e2e4e7;
        }
        .flexframe-client-welcome .welcome-content {
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 32px 32px 24px 32px;
        }
        .flexframe-client-welcome .welcome-logo {
            flex-shrink: 0;
            width: 72px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            border-radius: 14px;
            border: 2px solid #eee;
            padding: 8px;
        }
        .flexframe-client-welcome .welcome-logo img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .flexframe-client-welcome .welcome-text h1 {
            margin: 0 0 6px 0;
            font-size: 22px;
            font-weight: 700;
            color: #1d2327;
        }
        .flexframe-client-welcome .welcome-text p {
            margin: 0;
            font-size: 14px;
            color: #646970;
            line-height: 1.5;
        }
        
        /* Quick-link pills */
        .flexframe-client-welcome .welcome-quick-links {
            display: flex;
            gap: 0;
            border-top: 1px solid #eee;
        }
        .flexframe-client-welcome .quick-link {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 14px 10px;
            font-size: 13px;
            font-weight: 500;
            color: #50575e;
            cursor: pointer;
            transition: all 0.2s ease;
            border-right: 1px solid #eee;
            text-align: center;
        }
        .flexframe-client-welcome .quick-link:last-child {
            border-right: none;
        }
        .flexframe-client-welcome .quick-link:hover {
            background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
            color: var(--client-accent, #2271b1);
        }
        .flexframe-client-welcome .quick-link .dashicons {
            font-size: 18px;
            width: 18px;
            height: 18px;
            color: var(--client-accent, #2271b1);
            opacity: 0.7;
        }
        .flexframe-client-welcome .quick-link:hover .dashicons {
            opacity: 1;
        }
        
        /* ─── Client Step Overrides ─── */
        .flexframe-step-section {
            border-radius: 10px !important;
            border-color: #e2e4e7 !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .flexframe-step-header {
            border-radius: 10px 10px 0 0;
        }
        .step-number {
            background: var(--client-accent, #2271b1) !important;
        }
        
        /* ─── Floating Save Bar ─── */
        .flexframe-button-row {
            position: sticky;
            bottom: 0;
            background: #fff;
            border-top: 1px solid #e2e4e7;
            padding: 16px 24px;
            margin: 24px -24px 0 -24px;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
            z-index: 100;
            border-radius: 0;
        }
        
        /* Responsive */
        @media (max-width: 680px) {
            .flexframe-client-topbar {
                padding: 0 16px;
                height: 50px;
            }
            .flexframe-client-topbar .topbar-btn span:not(.dashicons) {
                display: none;
            }
            .flexframe-client-topbar .topbar-btn-accent span:not(.dashicons) {
                display: inline;
            }
            .flexframe-client-welcome .welcome-content {
                flex-direction: column;
                text-align: center;
                padding: 24px 20px 20px 20px;
            }
            .flexframe-client-welcome .quick-link span:not(.dashicons) {
                display: none;
            }
            .wrap {
                padding: 0 16px 40px 16px;
            }
        }
    </style>
    <?php
}
add_action('admin_head', 'flexframe_client_admin_styles');

/**
 * ========== BRANDED LOGIN PAGE ==========
 * Custom login page at /flexframe-login/ for client users.
 */

/**
 * Create the login page on plugin activation or when needed.
 */
function flexframe_ensure_login_page() {
    $login_slug = get_option('flexframe_client_login_slug', 'flexframe-login');
    $page = get_page_by_path($login_slug);
    if (!$page) {
        $page_id = wp_insert_post(array(
            'post_title'   => 'FlexFrame Login',
            'post_name'    => $login_slug,
            'post_content' => '<!-- FlexFrame Client Login Page -->',
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_author'  => 1,
        ));
        if (!is_wp_error($page_id)) {
            update_option('flexframe_client_login_page_id', $page_id);
        }
    } else {
        update_option('flexframe_client_login_page_id', $page->ID);
    }
}

/**
 * Render the branded login form on the login page.
 */
function flexframe_render_login_page($content) {
    $login_page_id = get_option('flexframe_client_login_page_id', 0);
    if (!is_page($login_page_id)) return $content;
    
    // If already logged in, redirect to settings
    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        if (flexframe_is_client_user($user) || current_user_can('manage_options')) {
            wp_redirect(admin_url('admin.php?page=flexframe-settings'));
            exit;
        }
    }
    
    $primary_color = get_option('flexframe_primary_color', '#f50000');
    $logo_url = get_option('flexframe_logo_url', '');
    $error_message = '';
    
    // Handle login submission
    if (isset($_POST['flexframe_login_nonce']) && wp_verify_nonce($_POST['flexframe_login_nonce'], 'flexframe_client_login')) {
        $creds = array(
            'user_login'    => sanitize_user($_POST['ff_username']),
            'user_password' => $_POST['ff_password'],
            'remember'      => !empty($_POST['ff_remember']),
        );
        
        $user = wp_signon($creds, is_ssl());
        
        if (is_wp_error($user)) {
            $error_message = 'Invalid username or password.';
        } else {
            wp_redirect(admin_url('admin.php?page=flexframe-settings'));
            exit;
        }
    }
    
    ob_start();
    ?>
    <div class="flexframe-login-wrapper" style="
        max-width: 420px;
        margin: 40px auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
        <div style="text-align: center; margin-bottom: 30px;">
            <?php if (!empty($logo_url)) : ?>
                <img src="<?php echo esc_url($logo_url); ?>" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;" />
            <?php endif; ?>
            <h2 style="margin: 0; font-size: 22px; color: #1d2327;">Settings Login</h2>
            <p style="color: #666; font-size: 14px; margin-top: 5px;">Sign in to manage your FlexFrame viewer</p>
        </div>
        
        <?php if ($error_message) : ?>
            <div style="
                background: #fef0f0;
                border: 1px solid #f5c6c6;
                color: #cc1818;
                padding: 10px 14px;
                border-radius: 6px;
                margin-bottom: 20px;
                font-size: 13px;
            ">
                <span class="dashicons dashicons-warning" style="font-size: 16px; vertical-align: text-bottom; margin-right: 4px;"></span>
                <?php echo esc_html($error_message); ?>
            </div>
        <?php endif; ?>
        
        <form method="post" style="
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        ">
            <?php wp_nonce_field('flexframe_client_login', 'flexframe_login_nonce'); ?>
            
            <div style="margin-bottom: 18px;">
                <label for="ff_username" style="display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px;">Username or Email</label>
                <input type="text" name="ff_username" id="ff_username" required
                    value="<?php echo isset($_POST['ff_username']) ? esc_attr($_POST['ff_username']) : ''; ?>"
                    style="
                        width: 100%;
                        padding: 10px 14px;
                        border: 1px solid #ccc;
                        border-radius: 6px;
                        font-size: 14px;
                        box-sizing: border-box;
                        transition: border-color 0.2s;
                    "
                    onfocus="this.style.borderColor='<?php echo esc_attr($primary_color); ?>'"
                    onblur="this.style.borderColor='#ccc'"
                />
            </div>
            
            <div style="margin-bottom: 18px;">
                <label for="ff_password" style="display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px;">Password</label>
                <input type="password" name="ff_password" id="ff_password" required style="
                    width: 100%;
                    padding: 10px 14px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 14px;
                    box-sizing: border-box;
                    transition: border-color 0.2s;
                "
                    onfocus="this.style.borderColor='<?php echo esc_attr($primary_color); ?>'"
                    onblur="this.style.borderColor='#ccc'"
                />
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #555; cursor: pointer;">
                    <input type="checkbox" name="ff_remember" value="1" style="margin: 0;" />
                    Remember me
                </label>
            </div>
            
            <button type="submit" style="
                width: 100%;
                padding: 12px;
                background: <?php echo esc_attr($primary_color); ?>;
                color: #fff;
                border: none;
                border-radius: 6px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s;
            " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                Sign In
            </button>
        </form>
        
        <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
            Powered by FlexFrame
        </p>
    </div>
    <?php
    return ob_get_clean();
}
add_filter('the_content', 'flexframe_render_login_page');

/**
 * ========== DEMO PAGE THEME OVERRIDE SYSTEM ==========
 * When a demo page is loaded, override ALL global FlexFrame settings
 * with the demo page's frozen snapshot — making it fully independent.
 */

/**
 * Get the master list of ALL FlexFrame option keys that affect rendering.
 * This is the single source of truth for snapshotting.
 */
function flexframe_get_snapshot_option_keys() {
    $keys = array(
        // Brand / Identity
        'flexframe_primary_color',
        'flexframe_primary_color_mode',
        'flexframe_logo_url',
        'flexframe_logo_threshold',
        'flexframe_logo_border_enabled',
        'flexframe_logo_border_size',
        'flexframe_logo_display_size',
        
        // Background Logo / Watermark
        'flexframe_bg_logo_enabled',
        'flexframe_bg_logo_size',
        'flexframe_bg_logo_opacity',
        'flexframe_bg_logo_pos_x',
        'flexframe_bg_logo_pos_y',
        
        // Material mode & preset
        'flexframe_material_mode',
        'flexframe_material_preset',
        
        // Skin material
        'flexframe_skin_color',
        'flexframe_skin_opacity',
        'flexframe_skin_roughness',
        'flexframe_skin_metalness',
        'flexframe_skin_transmission',
        'flexframe_skin_thickness',
        'flexframe_skin_ior',
        'flexframe_skin_env_intensity',
        
        // Loading / Spinner
        'flexframe_spinner_color',
        'flexframe_use_logo_loader',
        'flexframe_logo_loader_animation',
        'flexframe_logo_loader_size',
        
        // Animation Player
        'flexframe_player_bg_color',
        'flexframe_player_bg_opacity',
        'flexframe_player_button_bg_color',
        'flexframe_player_button_bg_opacity',
        'flexframe_player_icon_color',
        'flexframe_player_accent_color',
        'flexframe_player_always_visible',
        
        // Menu (legacy V1)
        'flexframe_menu_bg_color',
        'flexframe_menu_bg_opacity',
        'flexframe_menu_text_color',
        'flexframe_menu_text_opacity',
        'flexframe_menu_accent_color',
        'flexframe_hide_right_menu',
        'flexframe_show_screenshot_button',
        'flexframe_show_hd_button',
        'flexframe_show_ar_button',
        'flexframe_thumbnail_label_color',
        'flexframe_thumbnail_label_opacity',
        
        // Menu V2 (Side Menus)
        'flexframe_menu_v2_bg_color',
        'flexframe_menu_v2_bg_opacity',
        'flexframe_menu_v2_text_color',
        'flexframe_menu_v2_text_opacity',
        'flexframe_menu_v2_accent_color',
        'flexframe_menu_v2_show_thumbnail_labels',
        'flexframe_menu_v2_heading_bg_color',
        'flexframe_menu_v2_heading_bg_opacity',
        'flexframe_menu_v2_info_step_opacity',
        'flexframe_menu_v2_search_input_bg_opacity',
        'flexframe_menu_v2_search_input_bg_color',
        'flexframe_menu_v2_info_header_opacity',
        'flexframe_menu_v2_info_panel_opacity',
        'flexframe_menu_v2_filter_thumb_bg_opacity',
        
        // Scene Background
        'flexframe_bg_gradient_top',
        'flexframe_bg_gradient_bottom',
        'flexframe_bg_opacity',
        
        // Lighting
        'flexframe_ambient_intensity',
        'flexframe_ambient_color',
        'flexframe_directional_intensity',
        'flexframe_directional_color',
        'flexframe_directional_pos_x',
        'flexframe_directional_pos_y',
        'flexframe_directional_pos_z',
        
        // Particles
        'flexframe_particles_enabled',
        'flexframe_particles_count',
        'flexframe_particles_size',
        'flexframe_particles_color',
        'flexframe_particles_opacity',
        'flexframe_particles_speed',
        
        // Exercise Library
        'flexframe_hidden_exercises',
        'flexframe_custom_thumbnails',
    );
    
    // Equipment materials — every property for each material
    $equipment = array('barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber');
    $mat_props = array(
        'enabled', 'color', 'opacity', 'metalness', 'roughness',
        'color_map_enabled', 'bump_scale', 'normal_scale',
        'clearcoat', 'clearcoat_roughness',
        'emissive_color', 'emissive_intensity',
        'blending', 'transmission', 'thickness', 'ior', 'env_intensity',
        'sheen', 'sheen_roughness', 'sheen_color',
    );
    foreach ($equipment as $mat) {
        foreach ($mat_props as $prop) {
            $keys[] = "flexframe_{$mat}_{$prop}";
        }
    }
    
    return $keys;
}

/**
 * Take a complete snapshot of all current FlexFrame option values.
 * Returns associative array: option_name => value
 */
function flexframe_take_settings_snapshot() {
    $keys = flexframe_get_snapshot_option_keys();
    $snapshot = array();
    foreach ($keys as $key) {
        $snapshot[$key] = get_option($key);
    }
    return $snapshot;
}

/**
 * Build a settings snapshot for a demo page, given a theme preset.
 * - 'current': snapshots the live global settings as-is
 * - 'dark' / 'light_v3': starts from current, then layers the built-in preset on top
 * - 'custom:xxx': starts from current, then layers the custom preset on top
 *
 * The snapshot also includes the demo's custom logo if provided.
 */
function flexframe_build_demo_snapshot($theme_preset, $demo_logo_url = '') {
    // Start with current live settings as the base
    $snapshot = flexframe_take_settings_snapshot();
    
    // Layer on the preset overrides (unless "current")
    if ($theme_preset !== 'current' && !empty($theme_preset)) {
        $override_settings = array();
        
        if (strpos($theme_preset, 'custom:') === 0) {
            $custom_presets = get_option('flexframe_custom_presets', array());
            $preset_id = str_replace('custom:', '', $theme_preset);
            if (isset($custom_presets[$preset_id]) && isset($custom_presets[$preset_id]['settings'])) {
                $override_settings = flexframe_map_preset_to_options($custom_presets[$preset_id]['settings']);
            }
        } else {
            $built_in = flexframe_get_builtin_preset($theme_preset);
            if ($built_in) {
                $primary_color = $snapshot['flexframe_primary_color'] ?: '#f50000';
                $override_settings = flexframe_map_builtin_preset_to_options($built_in, $primary_color);
            }
        }
        
        // Merge preset overrides on top of the base
        foreach ($override_settings as $option_name => $value) {
            $snapshot[$option_name] = $value;
        }
    }
    
    // Apply the demo's custom logo (overrides whatever was in the snapshot)
    if (!empty($demo_logo_url)) {
        $snapshot['flexframe_logo_url'] = $demo_logo_url;
    }
    
    return $snapshot;
}

/**
 * Apply a demo page's frozen snapshot on the frontend.
 * This fires on every page load — if it's a demo page, ALL flexframe
 * options are overridden from the snapshot, making it fully independent.
 */
function flexframe_maybe_apply_demo_overrides() {
    global $post;
    if (!is_a($post, 'WP_Post')) return;
    
    $is_demo = get_post_meta($post->ID, '_flexframe_demo_page', true);
    if (!$is_demo) return;
    
    // Load the frozen snapshot
    $snapshot = get_post_meta($post->ID, '_flexframe_demo_snapshot', true);
    
    if (empty($snapshot) || !is_array($snapshot)) {
        flexframe_log('Demo page has no snapshot — falling back to global settings', $post->ID);
        return;
    }
    
    // Override logo if there's a per-demo logo (may have been updated after snapshot)
    $demo_logo_url = get_post_meta($post->ID, '_flexframe_demo_logo_url', true);
    if (!empty($demo_logo_url)) {
        $snapshot['flexframe_logo_url'] = $demo_logo_url;
    }
    
    // Apply every snapshotted value via pre_option filters
    foreach ($snapshot as $option_name => $value) {
        $filter_value = $value;
        add_filter("pre_option_{$option_name}", function() use ($filter_value) {
            return $filter_value;
        });
    }
    
    flexframe_log('Demo page snapshot applied', array('post_id' => $post->ID, 'keys' => count($snapshot)));
}
add_action('wp', 'flexframe_maybe_apply_demo_overrides');

/**
 * Map a custom preset's settings array to WordPress option names
 */
function flexframe_map_preset_to_options($s) {
    $map = array();
    
    // Direct mappings from preset key => option name
    $direct = array(
        'primary_color' => 'flexframe_primary_color',
        'primary_color_mode' => 'flexframe_primary_color_mode',
        'spinner_color' => 'flexframe_spinner_color',
        'use_logo_loader' => 'flexframe_use_logo_loader',
        'logo_loader_animation' => 'flexframe_logo_loader_animation',
        'logo_loader_size' => 'flexframe_logo_loader_size',
        'player_bg_color' => 'flexframe_player_bg_color',
        'player_bg_opacity' => 'flexframe_player_bg_opacity',
        'player_button_bg_color' => 'flexframe_player_button_bg_color',
        'player_button_bg_opacity' => 'flexframe_player_button_bg_opacity',
        'player_icon_color' => 'flexframe_player_button_icon_color',
        'player_accent_color' => 'flexframe_player_scrubber_color',
        'player_always_visible' => 'flexframe_player_always_visible',
        'menu_bg_color' => 'flexframe_menu_bg_color',
        'menu_bg_opacity' => 'flexframe_menu_bg_opacity',
        'menu_accent_color' => 'flexframe_menu_accent_color',
        'hide_right_menu' => 'flexframe_hide_right_menu',
        'show_screenshot_button' => 'flexframe_show_screenshot_button',
        'show_hd_button' => 'flexframe_show_hd_button',
        'show_ar_button' => 'flexframe_show_ar_button',
        'menu_v2_bg_color' => 'flexframe_menu_v2_bg_color',
        'menu_v2_bg_opacity' => 'flexframe_menu_v2_bg_opacity',
        'menu_v2_text_color' => 'flexframe_menu_v2_text_color',
        'menu_v2_text_opacity' => 'flexframe_menu_v2_text_opacity',
        'menu_v2_accent_color' => 'flexframe_menu_v2_accent_color',
        'menu_v2_show_thumbnail_labels' => 'flexframe_menu_v2_show_thumbnail_labels',
        'menu_v2_heading_bg_color' => 'flexframe_menu_v2_heading_bg_color',
        'menu_v2_heading_bg_opacity' => 'flexframe_menu_v2_heading_bg_opacity',
        'menu_v2_info_step_opacity' => 'flexframe_menu_v2_info_step_opacity',
        'menu_v2_info_header_opacity' => 'flexframe_menu_v2_info_header_opacity',
        'menu_v2_info_panel_opacity' => 'flexframe_menu_v2_info_panel_opacity',
        'menu_v2_filter_thumb_bg_opacity' => 'flexframe_menu_v2_filter_thumb_bg_opacity',
        'menu_v2_search_input_bg_opacity' => 'flexframe_menu_v2_search_input_bg_opacity',
        'menu_v2_search_input_bg_color' => 'flexframe_menu_v2_search_input_bg_color',
        'skin_color' => 'flexframe_skin_color',
        'skin_opacity' => 'flexframe_skin_opacity',
        'skin_roughness' => 'flexframe_skin_roughness',
        'skin_metalness' => 'flexframe_skin_metalness',
        'skin_transmission' => 'flexframe_skin_transmission',
        'skin_thickness' => 'flexframe_skin_thickness',
        'skin_ior' => 'flexframe_skin_ior',
        'skin_env_intensity' => 'flexframe_skin_env_intensity',
        'bg_gradient_top' => 'flexframe_bg_gradient_top',
        'bg_gradient_bottom' => 'flexframe_bg_gradient_bottom',
        'bg_gradient_opacity' => 'flexframe_bg_gradient_opacity',
        'ambient_intensity' => 'flexframe_ambient_intensity',
        'ambient_color' => 'flexframe_ambient_color',
        'directional_intensity' => 'flexframe_directional_intensity',
        'directional_color' => 'flexframe_directional_color',
        'directional_pos_x' => 'flexframe_directional_pos_x',
        'directional_pos_y' => 'flexframe_directional_pos_y',
        'directional_pos_z' => 'flexframe_directional_pos_z',
        'particles_enabled' => 'flexframe_particles_enabled',
        'particle_count' => 'flexframe_particles_count',
        'particle_size' => 'flexframe_particles_size',
        'particle_color' => 'flexframe_particles_color',
        'particle_opacity' => 'flexframe_particles_opacity',
        'particle_speed' => 'flexframe_particles_speed',
        'menu_text_opacity' => 'flexframe_menu_text_opacity',
        'thumbnail_label_color' => 'flexframe_thumbnail_label_color',
        'thumbnail_label_opacity' => 'flexframe_thumbnail_label_opacity',
    );
    
    foreach ($direct as $preset_key => $option_name) {
        if (isset($s[$preset_key])) {
            $map[$option_name] = $s[$preset_key];
        }
    }
    
    // Equipment materials
    $equipment = array('barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber');
    $mat_props = array('color', 'opacity', 'metalness', 'roughness');
    foreach ($equipment as $mat) {
        foreach ($mat_props as $prop) {
            $key = $mat . '_' . $prop;
            if (isset($s[$key])) {
                $map['flexframe_' . $key] = $s[$key];
            }
        }
    }
    
    return $map;
}

/**
 * Get a built-in preset's settings by ID
 */
function flexframe_get_builtin_preset($preset_id) {
    $presets = array(
        'dark' => array(
            'spinner_color' => 'primary',
            'player_bg_color' => '#828282',
            'player_bg_opacity' => 0,
            'player_button_bg_color' => 'primary',
            'player_button_bg_opacity' => 0.8,
            'player_icon_color' => '#ffffff',
            'player_accent_color' => 'primary',
            'player_always_visible' => 'no',
            'menu_bg_color' => '#000000',
            'menu_bg_opacity' => 0.9,
            'menu_text_color' => '#ffffff',
            'menu_accent_color' => 'primary',
            'menu_v2_bg_color' => '#000000',
            'menu_v2_bg_opacity' => 0.7,
            'menu_v2_text_color' => '#ffffff',
            'menu_v2_text_opacity' => 1,
            'menu_v2_accent_color' => 'primary',
            'menu_v2_heading_bg_color' => 'primary',
            'menu_v2_heading_bg_opacity' => 0.17,
            'menu_v2_info_step_opacity' => 0.35,
            'menu_v2_search_input_bg_opacity' => 0.7,
            'menu_v2_search_input_bg_color' => '#000000',
            'menu_v2_info_header_opacity' => 0.5,
            'menu_v2_info_panel_opacity' => 0.17,
            'menu_v2_filter_thumb_bg_opacity' => 0.8,
            'skin_color' => '#ccdef5',
            'skin_opacity' => 1,
            'skin_roughness' => 0,
            'skin_metalness' => 0,
            'skin_transmission' => 1,
            'skin_thickness' => 0,
            'skin_ior' => 1,
            'skin_env_intensity' => 2.29,
            'bg_gradient_top' => '#000000',
            'bg_gradient_bottom' => '#000000',
            'bg_gradient_opacity' => 1,
            'ambient_intensity' => 0.4,
            'ambient_color' => '#ffffff',
            'directional_intensity' => 4.21,
            'directional_color' => 'primary',
            'directional_pos_x' => 1.35,
            'directional_pos_y' => 1.57,
            'directional_pos_z' => 0.9,
            'particles_enabled' => true,
            'particle_count' => 1150,
            'particle_size' => 0.01,
            'particle_color' => 'primary',
            'particle_opacity' => 1,
            'particle_speed' => 0.5,
            'barbell_color' => '#808080', 'barbell_opacity' => 1, 'barbell_metalness' => 0.8, 'barbell_roughness' => 0.3,
            'bumper_color' => '#808080', 'bumper_opacity' => 1, 'bumper_metalness' => 0, 'bumper_roughness' => 0.8,
            'cable_color' => '#808080', 'cable_opacity' => 1, 'cable_metalness' => 0.5, 'cable_roughness' => 0.4,
            'chrome_color' => '#cccccc', 'chrome_opacity' => 1, 'chrome_metalness' => 1, 'chrome_roughness' => 0.1,
            'color1_color' => 'primary', 'color1_opacity' => 1, 'color1_metalness' => 0.5, 'color1_roughness' => 0.5,
            'metal_color' => '#b0b0b0', 'metal_opacity' => 1, 'metal_metalness' => 0.9, 'metal_roughness' => 0.3,
            'pad_color' => '#1a1a1a', 'pad_opacity' => 1, 'pad_metalness' => 0, 'pad_roughness' => 0.9,
            'plastic_color' => '#808080', 'plastic_opacity' => 1, 'plastic_metalness' => 0, 'plastic_roughness' => 0.6,
            'rubber_color' => '#1a1a1a', 'rubber_opacity' => 1, 'rubber_metalness' => 0, 'rubber_roughness' => 0.95,
        ),
        'light_v3' => array(
            'spinner_color' => 'primary',
            'player_bg_color' => '#7d7d7d',
            'player_bg_opacity' => 0.2,
            'player_button_bg_color' => 'primary',
            'player_button_bg_opacity' => 1,
            'player_icon_color' => '#ffffff',
            'player_accent_color' => 'primary',
            'player_always_visible' => 'no',
            'menu_bg_color' => '#ffffff',
            'menu_bg_opacity' => 0,
            'menu_text_color' => '#ffffff',
            'menu_accent_color' => 'primary',
            'menu_v2_bg_color' => '#6b6b6b',
            'menu_v2_bg_opacity' => 0.16,
            'menu_v2_text_color' => '#ffffff',
            'menu_v2_text_opacity' => 1,
            'menu_v2_accent_color' => 'primary',
            'menu_v2_heading_bg_color' => 'primary',
            'menu_v2_heading_bg_opacity' => 0.17,
            'menu_v2_info_step_opacity' => 0.53,
            'menu_v2_info_header_opacity' => 0.7,
            'menu_v2_info_panel_opacity' => 0.66,
            'menu_v2_filter_thumb_bg_opacity' => 0.18,
            'menu_v2_search_input_bg_opacity' => 1,
            'menu_v2_search_input_bg_color' => '#cfcfcf',
            'skin_color' => '#aaadb1',
            'skin_opacity' => 1,
            'skin_roughness' => 0,
            'skin_metalness' => 0,
            'skin_transmission' => 1,
            'skin_thickness' => 0,
            'skin_ior' => 1,
            'skin_env_intensity' => 2.29,
            'bg_gradient_top' => '#ffffff',
            'bg_gradient_bottom' => '#ffffff',
            'bg_gradient_opacity' => 1,
            'ambient_intensity' => 0.4,
            'ambient_color' => '#ffffff',
            'directional_intensity' => 1.35,
            'directional_color' => 'primary',
            'directional_pos_x' => 1.35,
            'directional_pos_y' => 1.57,
            'directional_pos_z' => 0.9,
            'particles_enabled' => true,
            'particle_count' => 1450,
            'particle_size' => 0.013,
            'particle_color' => 'primary',
            'particle_opacity' => 1,
            'particle_speed' => 0.5,
            'barbell_color' => '#808080', 'barbell_opacity' => 1, 'barbell_metalness' => 0.8, 'barbell_roughness' => 0.3,
            'bumper_color' => '#808080', 'bumper_opacity' => 1, 'bumper_metalness' => 0, 'bumper_roughness' => 0.8,
            'cable_color' => '#808080', 'cable_opacity' => 1, 'cable_metalness' => 0.5, 'cable_roughness' => 0.4,
            'chrome_color' => '#cccccc', 'chrome_opacity' => 1, 'chrome_metalness' => 1, 'chrome_roughness' => 0.1,
            'color1_color' => 'primary', 'color1_opacity' => 1, 'color1_metalness' => 0.5, 'color1_roughness' => 0.5,
            'metal_color' => '#b0b0b0', 'metal_opacity' => 1, 'metal_metalness' => 0.9, 'metal_roughness' => 0.3,
            'pad_color' => '#1a1a1a', 'pad_opacity' => 1, 'pad_metalness' => 0, 'pad_roughness' => 0.9,
            'plastic_color' => '#808080', 'plastic_opacity' => 1, 'plastic_metalness' => 0, 'plastic_roughness' => 0.6,
            'rubber_color' => '#1a1a1a', 'rubber_opacity' => 1, 'rubber_metalness' => 0, 'rubber_roughness' => 0.95,
        ),
    );
    
    return isset($presets[$preset_id]) ? $presets[$preset_id] : null;
}

/**
 * Map a built-in preset to option names, replacing 'primary' with the actual primary color
 */
function flexframe_map_builtin_preset_to_options($preset, $primary_color) {
    // Replace 'primary' keyword with actual primary color
    foreach ($preset as $key => $value) {
        if ($value === 'primary') {
            $preset[$key] = $primary_color;
        }
    }
    
    return flexframe_map_preset_to_options($preset);
}

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
            FLEXFRAME_PLUGIN_URL . 'assets/assets/index-2qfYeZnd.css',
            array(),
            FLEXFRAME_VERSION
        );
        
        // Check if this is a dedicated FlexFrame viewer page (hide all WP elements)
        $is_viewer_page = get_post_meta($post->ID, '_flexframe_viewer_page', true);
        
        // Get theme color settings early for use in isolation CSS
        $primary_color = esc_attr(get_option('flexframe_primary_color', '#f50000'));
        $menu_bg_color = esc_attr(get_option('flexframe_menu_bg_color', '#000000'));
        $menu_accent_color = esc_attr(get_option('flexframe_menu_accent_color', '#f50000'));
        $menu_bg_rgb = sscanf($menu_bg_color, "#%02x%02x%02x");
        $menu_bg_opacity = floatval(get_option('flexframe_menu_bg_opacity', 0.9));
        
        // Get V2 menu settings
        $menu_v2_bg_color = esc_attr(get_option('flexframe_menu_v2_bg_color', '#1a1a1a'));
        $menu_v2_bg_opacity = floatval(get_option('flexframe_menu_v2_bg_opacity', 0.95));
        $menu_v2_accent_color = esc_attr(get_option('flexframe_menu_v2_accent_color', $primary_color));
        $menu_v2_text_color = esc_attr(get_option('flexframe_menu_v2_text_color', '#ffffff'));
        $menu_v2_text_opacity = floatval(get_option('flexframe_menu_v2_text_opacity', 1));
        $menu_v2_show_thumbnail_labels = get_option('flexframe_menu_v2_show_thumbnail_labels', 'yes');
        
        // V2 Heading Background settings
        $menu_v2_heading_bg_color = esc_attr(get_option('flexframe_menu_v2_heading_bg_color', $primary_color));
        $menu_v2_heading_bg_opacity = floatval(get_option('flexframe_menu_v2_heading_bg_opacity', $menu_v2_bg_opacity));
        $menu_v2_heading_bg_rgb = sscanf($menu_v2_heading_bg_color, "#%02x%02x%02x");
        $menu_v2_heading_bg_rgba = 'rgba(' . implode(', ', $menu_v2_heading_bg_rgb) . ', ' . $menu_v2_heading_bg_opacity . ')';
        
        // V2 Info Step Item opacity
        $menu_v2_info_step_opacity = floatval(get_option('flexframe_menu_v2_info_step_opacity', 0.35));
        
        // Convert hex to rgba for V2 menus
        $menu_v2_bg_rgb = sscanf($menu_v2_bg_color, "#%02x%02x%02x");
        $menu_v2_bg_rgba = 'rgba(' . implode(', ', $menu_v2_bg_rgb) . ', ' . $menu_v2_bg_opacity . ')';
        $menu_v2_text_rgb = sscanf($menu_v2_text_color, "#%02x%02x%02x");
        $menu_v2_text_rgba = 'rgba(' . implode(', ', $menu_v2_text_rgb) . ', ' . $menu_v2_text_opacity . ')';
        
        // V2 Search Input Background opacity and color (must come after $menu_v2_bg_rgb)
        $menu_v2_search_input_bg_opacity = floatval(get_option('flexframe_menu_v2_search_input_bg_opacity', $menu_v2_bg_opacity));
        $menu_v2_search_input_bg_color = esc_attr(get_option('flexframe_menu_v2_search_input_bg_color', $menu_v2_bg_color));
        $menu_v2_search_input_bg_rgb = sscanf($menu_v2_search_input_bg_color, "#%02x%02x%02x");
        $menu_v2_search_input_bg_rgba = 'rgba(' . implode(', ', $menu_v2_search_input_bg_rgb) . ', ' . $menu_v2_search_input_bg_opacity . ')';
        
        // V2 Info Header opacity (independent from info step items)
        $menu_v2_info_header_opacity = floatval(get_option('flexframe_menu_v2_info_header_opacity', 0.5));
        
        // V2 Info Panel opacity (right side header + border)
        $menu_v2_info_panel_opacity = floatval(get_option('flexframe_menu_v2_info_panel_opacity', $menu_v2_heading_bg_opacity));
        
        // V2 Filter Thumbnail Background opacity
        $menu_v2_filter_thumb_bg_opacity = floatval(get_option('flexframe_menu_v2_filter_thumb_bg_opacity', 0.8));
        
        $menu_v2_bg_rgba_light = 'rgba(' . implode(', ', $menu_v2_bg_rgb) . ', 0.2)'; // For frosted glass info dropdown
        $menu_v2_accent_rgb = sscanf($menu_v2_accent_color, "#%02x%02x%02x");
        $menu_v2_thumbnail_label_rgb = $menu_v2_accent_rgb; // Use accent color for label gradient
        $menu_v2_accent_border_rgba = 'rgba(' . implode(', ', $menu_v2_accent_rgb) . ', ' . $menu_v2_heading_bg_opacity . ')';
        $menu_v2_accent_border_right_rgba = 'rgba(' . implode(', ', $menu_v2_accent_rgb) . ', ' . $menu_v2_info_panel_opacity . ')';
        $menu_v2_info_sticky_header_rgba = 'rgba(' . implode(', ', $menu_v2_heading_bg_rgb) . ', ' . $menu_v2_info_panel_opacity . ')';
        
        // Button visibility settings
        $show_screenshot_button = (bool) get_option('flexframe_show_screenshot_button', true);
        $show_hd_button = (bool) get_option('flexframe_show_hd_button', true);
        $show_ar_button = (bool) get_option('flexframe_show_ar_button', true);
        
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
            
            /* Prevent WordPress theme from breaking checkboxes */
            #flexframe-viewer-container input[type="checkbox"] {
                -webkit-appearance: checkbox !important;
                -moz-appearance: checkbox !important;
                appearance: checkbox !important;
                width: 18px !important;
                height: 18px !important;
                min-width: 18px !important;
                min-height: 18px !important;
                background: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
                cursor: pointer !important;
                opacity: 1 !important;
                position: static !important;
                visibility: visible !important;
                pointer-events: auto !important;
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
                background: ' . $menu_v2_search_input_bg_rgba . ' !important;
                border: 2px solid ' . $menu_v2_accent_color . '66 !important;
                border-radius: 10px !important;
                color: ' . $menu_v2_text_rgba . ' !important;
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
                color: rgba(' . $menu_v2_text_rgb[0] . ', ' . $menu_v2_text_rgb[1] . ', ' . $menu_v2_text_rgb[2] . ', 0.4) !important;
                opacity: 1 !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container input.search-input:focus,
            #flexframe-viewer-container #searchInput:focus {
                border-color: ' . $menu_v2_accent_color . ' !important;
                background: rgba(' . $menu_v2_search_input_bg_rgb[0] . ', ' . $menu_v2_search_input_bg_rgb[1] . ', ' . $menu_v2_search_input_bg_rgb[2] . ', ' . min($menu_v2_search_input_bg_opacity + 0.1, 1) . ') !important;
                box-shadow: 0 0 0 2px ' . $menu_v2_accent_color . '1a !important;
                outline: none !important;
                color: ' . $menu_v2_text_rgba . ' !important;
            }
            /* Search header container */
            #flexframe-viewer-container .search-header,
            #flexframe-viewer-container #searchDropdown .search-header,
            .thumbnail-dropdown .search-header,
            div#searchDropdown .search-header {
                padding: 12px 15px !important;
                background: rgba(20, 20, 20, 0.95) !important;
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
                    background-color: ' . $menu_v2_bg_rgba . ' !important;
                    backdrop-filter: blur(20px) !important;
                    border: 2px solid ' . $menu_v2_accent_color . ' !important;
                    border-radius: 50% !important;
                    color: ' . $menu_v2_text_rgba . ' !important;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px ' . $menu_v2_accent_color . '4d !important;
                    cursor: pointer !important;
                }
                #flexframe-viewer-container #searchToggle:hover {
                    background-color: rgba(' . $menu_v2_bg_rgb[0] . ', ' . $menu_v2_bg_rgb[1] . ', ' . $menu_v2_bg_rgb[2] . ', ' . min(1, $menu_v2_bg_opacity + 0.15) . ') !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px ' . $menu_v2_accent_color . '80 !important;
                }
                #flexframe-viewer-container #searchToggle span {
                    display: none !important;
                }
                #flexframe-viewer-container #searchToggle svg {
                    width: 20px !important;
                    height: 20px !important;
                    fill: ' . $menu_v2_text_rgba . ' !important;
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
                    background-color: ' . $menu_v2_bg_rgba . ' !important;
                    backdrop-filter: blur(20px) !important;
                    border-radius: 16px !important;
                    border: 2px solid ' . $menu_v2_accent_border_rgba . ' !important;
                    box-shadow: 0 0 20px ' . $menu_v2_accent_color . '66, 0 0 40px ' . $menu_v2_accent_color . '33 !important;
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
                    border-right: none !important;
                    padding: 10px !important;
                    overflow-y: auto !important;
                    background: transparent !important;
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
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-radius: 8px !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    cursor: pointer !important;
                    flex-shrink: 0 !important;
                    flex-grow: 0 !important;
                    overflow: hidden !important;
                }
                #flexframe-viewer-container #searchDropdown .thumbnail-item:hover,
                #searchDropdown .thumbnail-item:hover {
                    background: rgba(255, 255, 255, 0.15) !important;
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
                    background-color: ' . $menu_v2_bg_rgba . ' !important;
                    backdrop-filter: blur(20px) !important;
                    border: 2px solid ' . $menu_v2_accent_color . ' !important;
                    border-radius: 50% !important;
                    color: #ffffff !important;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px ' . $menu_v2_accent_color . '4d !important;
                    cursor: pointer !important;
                    overflow: hidden !important;
                }
                #flexframe-viewer-container #infoToggle:hover,
                button.thumbnail-menu-toggle#infoToggle:hover {
                    background-color: rgba(' . $menu_v2_bg_rgb[0] . ', ' . $menu_v2_bg_rgb[1] . ', ' . $menu_v2_bg_rgb[2] . ', ' . min(1, $menu_v2_bg_opacity + 0.15) . ') !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px ' . $menu_v2_accent_color . '80 !important;
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
                    fill: ' . $menu_v2_text_rgba . ' !important;
                    display: block !important;
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                }
                #flexframe-viewer-container #infoToggle svg path,
                button.thumbnail-menu-toggle#infoToggle svg path {
                    fill: ' . $menu_v2_text_rgba . ' !important;
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
                    background-color: ' . $menu_v2_bg_rgba_light . ' !important;
                    backdrop-filter: blur(20px) !important;
                    border-radius: 16px !important;
                    border: 2px solid ' . $menu_v2_accent_border_right_rgba . ' !important;
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
                
                /* Info sticky header for tablet/desktop - use heading background color with info panel opacity */
                #flexframe-viewer-container .info-sticky-header,
                .thumbnail-dropdown-right .info-sticky-header,
                #infoDropdown .info-sticky-header,
                .info-sticky-header {
                    background: ' . $menu_v2_info_sticky_header_rgba . ' !important;
                    background-color: ' . $menu_v2_info_sticky_header_rgba . ' !important;
                    border: none !important;
                    border-radius: 13px 13px 0 0 !important;
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
                color: #ffffff !important;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
            }
            
            .filter-clear-btn {
                font-size: 9px;
                color: ' . $menu_v2_accent_color . ' !important;
                background: transparent !important;
                border: 1px solid ' . $menu_v2_accent_color . '66 !important;
                padding: 2px 6px !important;
                border-radius: 3px !important;
                cursor: pointer !important;
                transition: all 0.2s !important;
            }
            
            .filter-clear-btn:hover,
            .filter-clear-btn:active,
            .filter-clear-btn:focus {
                background: ' . $menu_v2_accent_color . '33 !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
                color: ' . $menu_v2_accent_color . ' !important;
                outline: none !important;
            }
            
            #flexframe-viewer-container .filter-clear-btn,
            #flexframe-viewer-container .filter-clear-btn:hover,
            #flexframe-viewer-container .filter-clear-btn:active,
            #flexframe-viewer-container .filter-clear-btn:focus {
                color: ' . $menu_v2_accent_color . ' !important;
                background: transparent !important;
                border-color: ' . $menu_v2_accent_color . '66 !important;
            }
            
            #flexframe-viewer-container .filter-clear-btn:hover {
                background: ' . $menu_v2_accent_color . '33 !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . '22 !important;
                border: 1px solid ' . $menu_v2_accent_color . '44 !important;
            }
            
            label.filter-checkbox-label.selected {
                background-color: ' . $menu_v2_accent_color . '22 !important;
                border: 2px solid ' . $menu_v2_accent_color . ' !important;
                border-style: solid !important;
                border-width: 2px !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
                box-shadow: 0 0 8px ' . $menu_v2_accent_color . '66 !important;
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
                    border-right: 1px solid ' . $menu_v2_accent_color . '33;
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
                    background-color: ' . $menu_v2_accent_color . '22 !important;
                    border: 2px solid ' . $menu_v2_accent_color . ' !important;
                    box-shadow: 0 0 12px ' . $menu_v2_accent_color . 'cc, 0 0 6px ' . $menu_v2_accent_color . '88, inset 0 0 8px ' . $menu_v2_accent_color . '33 !important;
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
                    border: 1px solid ' . $menu_v2_accent_color . ' !important;
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
                    border: 1px solid ' . $menu_v2_accent_color . ' !important;
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
                    border: 1px solid ' . $menu_v2_accent_color . ' !important;
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
                    background-color: ' . $menu_v2_accent_color . '22 !important;
                    border-color: ' . $menu_v2_accent_color . ' !important;
                    border: 1px solid ' . $menu_v2_accent_color . ' !important;
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
                    background-color: ' . $menu_v2_accent_color . '22 !important;
                    border-color: ' . $menu_v2_accent_color . ' !important;
                    border: 1px solid ' . $menu_v2_accent_color . ' !important;
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
        
        // V2 menu settings
        $menu_v2_accent_color = esc_attr(get_option('flexframe_menu_v2_accent_color', $primary_color));
        $menu_v2_accent_rgb = sscanf($menu_v2_accent_color, "#%02x%02x%02x");
        
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
            
            /* Quality, AR & Screenshot button hover/focus states - use player accent color instead of blue */
            .animation-player .quality-btn:hover,
            .animation-player .quality-btn:focus,
            .animation-player .quality-btn:active,
            #quality-toggle-btn:hover,
            #quality-toggle-btn:focus,
            #quality-toggle-btn:active,
            .animation-player .ar-btn:hover,
            .animation-player .ar-btn:focus,
            .animation-player .ar-btn:active,
            .animation-player .screenshot-btn:hover,
            .animation-player .screenshot-btn:focus,
            .animation-player .screenshot-btn:active {
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
            .animation-player .timeline-fill {
                background-color: ' . $player_accent_color . ' !important;
            }
            /* Slider thumb uses button color (not accent) */
            .animation-player input[type="range"]::-webkit-slider-thumb {
                background-color: rgba(' . $player_button_bg_rgb[0] . ', ' . $player_button_bg_rgb[1] . ', ' . $player_button_bg_rgb[2] . ', ' . $player_button_bg_opacity . ') !important;
            }
            .animation-player input[type="range"]::-moz-range-thumb {
                background-color: rgba(' . $player_button_bg_rgb[0] . ', ' . $player_button_bg_rgb[1] . ', ' . $player_button_bg_rgb[2] . ', ' . $player_button_bg_opacity . ') !important;
            }
            .animation-player .timeline-slider {
                accent-color: rgba(' . $player_button_bg_rgb[0] . ', ' . $player_button_bg_rgb[1] . ', ' . $player_button_bg_rgb[2] . ', ' . $player_button_bg_opacity . ') !important;
            }
            
            /* Button Visibility */
            ' . (!$show_screenshot_button ? '
            .screenshot-btn,
            #screenshot-btn,
            .animation-player .screenshot-btn,
            button.screenshot-btn,
            .player-right .screenshot-btn {
                display: none !important;
            }
            ' : '') . '
            ' . (!$show_hd_button ? '
            #quality-toggle-btn,
            .quality-btn,
            .animation-player .quality-btn,
            button.quality-btn {
                display: none !important;
            }
            ' : '') . '
            ' . (!$show_ar_button ? '
            .ar-btn,
            .animation-player .ar-btn,
            button.ar-btn {
                display: none !important;
            }
            ' : '') . '
            
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
            /* ALL DROPDOWN BORDERS - use V2 accent color with heading BG opacity */
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
                border: 2px solid ' . $menu_v2_accent_border_rgba . ' !important;
                outline: none !important;
                background-color: ' . $menu_v2_bg_rgba . ' !important;
                backdrop-filter: blur(20px) !important;
            }
            
            /* ===== SEARCH INPUT - USE SIDE MENU V2 BG COLOR WITH OWN OPACITY ===== */
            #flexframe-viewer-container .search-input,
            #flexframe-viewer-container input.search-input,
            #flexframe-viewer-container #searchInput,
            #flexframe-viewer-container input#searchInput,
            .thumbnail-dropdown .search-input,
            .search-header .search-input {
                background-color: ' . $menu_v2_search_input_bg_rgba . ' !important;
                color: ' . $menu_v2_text_rgba . ' !important;
                border-color: ' . $menu_v2_accent_color . '66 !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container input.search-input:focus,
            #flexframe-viewer-container #searchInput:focus,
            #flexframe-viewer-container input#searchInput:focus,
            .thumbnail-dropdown .search-input:focus {
                background-color: rgba(' . $menu_v2_search_input_bg_rgb[0] . ', ' . $menu_v2_search_input_bg_rgb[1] . ', ' . $menu_v2_search_input_bg_rgb[2] . ', ' . min($menu_v2_search_input_bg_opacity + 0.1, 1) . ') !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-input::placeholder,
            #flexframe-viewer-container #searchInput::placeholder {
                color: rgba(' . $menu_v2_text_rgb[0] . ', ' . $menu_v2_text_rgb[1] . ', ' . $menu_v2_text_rgb[2] . ', 0.5) !important;
            }
            
            /* ===== SEARCH HEADER - USE HEADING BACKGROUND COLOR ===== */
            #flexframe-viewer-container .search-header,
            #flexframe-viewer-container #searchDropdown .search-header,
            .thumbnail-dropdown .search-header,
            div#searchDropdown .search-header {
                background: rgba(' . $menu_v2_heading_bg_rgb[0] . ', ' . $menu_v2_heading_bg_rgb[1] . ', ' . $menu_v2_heading_bg_rgb[2] . ', ' . $menu_v2_heading_bg_opacity . ') !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
            }
            
            /* ===== SEARCH ACTION BUTTON - USE ACCENT COLOR ===== */
            #flexframe-viewer-container .search-action-btn,
            .thumbnail-dropdown .search-action-btn {
                background-color: ' . $menu_v2_accent_color . '33 !important;
                color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-action-btn:hover,
            .thumbnail-dropdown .search-action-btn:hover {
                background-color: ' . $menu_v2_accent_color . '66 !important;
            }
            #flexframe-viewer-container .search-action-btn svg,
            .thumbnail-dropdown .search-action-btn svg {
                fill: ' . $menu_v2_accent_color . ' !important;
            }
            
            /* ===== SEARCH SUGGESTIONS - USE MENU BACKGROUND COLOR ===== */
            #flexframe-viewer-container .search-suggestions,
            .thumbnail-dropdown .search-suggestions {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . min($menu_bg_opacity + 0.1, 1) . ') !important;
                border-color: ' . $menu_v2_accent_color . '66 !important;
            }
            .search-suggestion-item:hover {
                background-color: ' . $menu_v2_accent_color . '33 !important;
            }
            .search-suggestion-category {
                color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . ' !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
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
                border: 2px solid ' . $menu_v2_accent_color . ' !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 20px ' . $menu_v2_accent_color . '33 !important;
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
                background: ' . $menu_v2_accent_color . ' !important;
                background-color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . '33 !important;
                color: ' . $menu_v2_accent_color . ' !important;
            }
            .scroll-btn:hover svg,
            .thumbnail-scroll-controls button:hover svg {
                fill: ' . $menu_v2_accent_color . ' !important;
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
                border-color: ' . $menu_v2_accent_color . ' !important;
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
                border-color: ' . $menu_v2_accent_color . ' !important;
                outline: 2px solid ' . $menu_v2_accent_color . ' !important;
                outline-offset: -2px !important;
                box-shadow: 0 0 0 3px ' . $menu_v2_accent_color . '33 !important;
            }
            
            /* ===== SEARCH DROPDOWN CONTAINER & SUGGESTIONS ===== */
            #flexframe-viewer-container #searchDropdown,
            #flexframe-viewer-container .search-dropdown,
            #searchDropdown,
            .search-dropdown {
                border-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container #searchDropdown.show,
            #flexframe-viewer-container .search-dropdown.show,
            #searchDropdown.show,
            .search-dropdown.show {
                border-color: ' . $menu_v2_accent_color . ' !important;
            }
            /* Search suggestions dropdown */
            #flexframe-viewer-container .search-suggestions,
            #flexframe-viewer-container #searchSuggestions,
            #flexframe-viewer-container .autocomplete-suggestions,
            #searchSuggestions,
            .search-suggestions,
            .autocomplete-suggestions {
                border-color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . '33 !important;
            }
            /* Search suggestions scrollbar - webkit */
            #flexframe-viewer-container .search-suggestions::-webkit-scrollbar-thumb,
            #flexframe-viewer-container #searchSuggestions::-webkit-scrollbar-thumb,
            #searchSuggestions::-webkit-scrollbar-thumb,
            .search-suggestions::-webkit-scrollbar-thumb,
            .autocomplete-suggestions::-webkit-scrollbar-thumb {
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .search-suggestions::-webkit-scrollbar-thumb:hover,
            #flexframe-viewer-container #searchSuggestions::-webkit-scrollbar-thumb:hover,
            #searchSuggestions::-webkit-scrollbar-thumb:hover,
            .search-suggestions::-webkit-scrollbar-thumb:hover,
            .autocomplete-suggestions::-webkit-scrollbar-thumb:hover {
                background-color: ' . $menu_v2_accent_color . 'cc !important;
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
                scrollbar-color: ' . $menu_v2_accent_color . ' rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            /* Search input wrapper */
            #flexframe-viewer-container .search-input-wrapper,
            #flexframe-viewer-container .search-header,
            .search-input-wrapper,
            .search-header {
                border-color: ' . $menu_v2_accent_color . ' !important;
            }
            /* Focused search area highlight */
            #flexframe-viewer-container .search-input-wrapper:focus-within,
            #flexframe-viewer-container .search-header:focus-within,
            .search-input-wrapper:focus-within,
            .search-header:focus-within {
                border-color: ' . $menu_v2_accent_color . ' !important;
                box-shadow: 0 0 0 2px ' . $menu_v2_accent_color . '33 !important;
            }
            /* Keep search header solid on focus */
            #flexframe-viewer-container .search-header:focus-within,
            #flexframe-viewer-container #searchDropdown .search-header:focus-within,
            .thumbnail-dropdown .search-header:focus-within,
            div#searchDropdown .search-header:focus-within {
                background: rgba(' . $menu_v2_heading_bg_rgb[0] . ', ' . $menu_v2_heading_bg_rgb[1] . ', ' . $menu_v2_heading_bg_rgb[2] . ', ' . min($menu_v2_heading_bg_opacity + 0.1, 1) . ') !important;
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
                color: ' . $menu_v2_accent_color . ' !important;
            }
            
            /* ===== SEARCH SUGGESTION CATEGORY HEADERS (POPULAR EXERCISES, MUSCLE GROUPS) ===== */
            /* Background = accent color, Font = white */
            #flexframe-viewer-container .search-suggestion-category,
            #flexframe-viewer-container #searchSuggestions .search-suggestion-category,
            #searchDropdown .search-suggestion-category,
            #searchSuggestions .search-suggestion-category,
            .search-suggestions .search-suggestion-category,
            .search-suggestion-category {
                background-color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown::-webkit-scrollbar-thumb:hover,
            #flexframe-viewer-container .thumbnail-scroll-container::-webkit-scrollbar-thumb:hover,
            .thumbnail-dropdown::-webkit-scrollbar-thumb:hover,
            .thumbnail-scroll-container::-webkit-scrollbar-thumb:hover {
                background-color: ' . $menu_v2_accent_color . 'cc !important;
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
                scrollbar-color: ' . $menu_v2_accent_color . ' rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            
            /* ===== EXERCISE LIST ITEM ICONS ===== */
            #flexframe-viewer-container .exercise-item::before,
            #flexframe-viewer-container .menu-item::before,
            #flexframe-viewer-container .exercise-list-item::before,
            .exercise-item::before,
            .menu-item::before,
            .exercise-list-item::before {
                color: ' . $menu_v2_accent_color . ' !important;
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
                fill: ' . $menu_v2_accent_color . ' !important;
                color: ' . $menu_v2_accent_color . ' !important;
            }
            
            /* ===== THUMBNAIL ITEMS HOVER/ACTIVE ===== */
            .thumbnail-item.active,
            .thumbnail-item:hover,
            .thumbnail-item.touch-active,
            .menu-item.active,
            .menu-item:hover,
            .exercise-item.active,
            .exercise-item:hover {
                background-color: ' . $menu_v2_accent_color . '33 !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
            }
            .thumbnail-item.active *,
            .thumbnail-item.touch-active *,
            .menu-item.active * {
                color: ' . $menu_v2_accent_color . ' !important;
            }
            
            /* ===== SELECTED EXERCISE ITEM & CHECKMARK ===== */
            #flexframe-viewer-container .thumbnail-item.selected,
            #flexframe-viewer-container .exercise-item.selected,
            #flexframe-viewer-container .menu-item.selected,
            .thumbnail-item.selected,
            .exercise-item.selected,
            .menu-item.selected {
                background-color: ' . $menu_v2_accent_color . '44 !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . ' !important;
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
            
            /* ===== SELECTED THUMBNAIL GLOW & CHECKMARK - Uses V2 Accent Color ===== */
            #flexframe-viewer-container .thumbnail-item.selected,
            .thumbnail-item.selected {
                border-color: ' . $menu_v2_accent_color . ' !important;
                box-shadow: 0 0 20px ' . $menu_v2_accent_color . '80 !important;
            }
            #flexframe-viewer-container .thumbnail-item.selected::before,
            .thumbnail-item.selected::before,
            .thumbnail-item.selected:before {
                background: ' . $menu_v2_accent_color . ' !important;
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            
            /* ===== LINKS HOVER ===== */
            .thumbnail-grid-container a:hover,
            .thumbnail-dropdown a:hover,
            .menu-panel a:hover {
                color: ' . $menu_v2_accent_color . ' !important;
            }
            
            /* ===== OVERRIDE ANY HARDCODED BLUE (#4a9eff) ===== */
            #flexframe-viewer-container [style*="background-color: #4a9eff"],
            #flexframe-viewer-container [style*="background-color: rgb(74, 158, 255)"],
            #flexframe-viewer-container [style*="background:#4a9eff"],
            .thumbnail-dropdown [style*="background-color: #4a9eff"],
            .thumbnail-dropdown [style*="background:#4a9eff"] {
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container [style*="color: #4a9eff"],
            #flexframe-viewer-container [style*="color: rgb(74, 158, 255)"],
            #flexframe-viewer-container [style*="color:#4a9eff"],
            .thumbnail-dropdown [style*="color: #4a9eff"],
            .thumbnail-dropdown [style*="color:#4a9eff"] {
                color: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . ' !important;
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
                border: 2px solid ' . $menu_v2_accent_border_right_rgba . ' !important;
            }
            /* Right menu text color */
            #flexframe-viewer-container .thumbnail-dropdown-right *,
            .thumbnail-dropdown-right * {
                color: ' . $menu_v2_text_rgba . ' !important;
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
                background: ' . $menu_v2_bg_rgba . ' !important;
                background-color: ' . $menu_v2_bg_rgba . ' !important;
                border: 2px solid ' . $menu_v2_accent_color . ' !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 20px ' . $menu_v2_accent_color . '33 !important;
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
                fill: ' . $menu_v2_text_rgba . ' !important;
                width: 22px !important;
                height: 22px !important;
            }
            #flexframe-viewer-container .menu-hint-tab-right:hover,
            .thumbnail-grid-container-right .menu-hint-tab-right:hover,
            .menu-hint-tab-right:hover {
                background: ' . $menu_v2_accent_color . ' !important;
                background-color: ' . $menu_v2_accent_color . ' !important;
                transform: translateY(-50%) scale(1.1) !important;
            }
            #flexframe-viewer-container .menu-hint-tab-right:hover svg,
            .thumbnail-grid-container-right .menu-hint-tab-right:hover svg,
            .menu-hint-tab-right:hover svg {
                fill: #ffffff !important;
            }
            /* Right menu info items - use V2 ACCENT COLOR with configurable opacity and 50px blur */
            #flexframe-viewer-container .info-step-item,
            .thumbnail-dropdown-right .info-step-item,
            .info-step-item {
                background: rgba(' . $menu_v2_accent_rgb[0] . ', ' . $menu_v2_accent_rgb[1] . ', ' . $menu_v2_accent_rgb[2] . ', ' . $menu_v2_info_step_opacity . ') !important;
                backdrop-filter: blur(50px) !important;
                -webkit-backdrop-filter: blur(50px) !important;
                border-color: ' . $menu_v2_accent_color . '44 !important;
                color: ' . $menu_v2_text_rgba . ' !important;
            }
            /* Section headers - larger, bolder styling */
            #flexframe-viewer-container .info-section-header,
            .thumbnail-dropdown-right .info-section-header,
            .info-section-header {
                background: rgba(' . $menu_v2_accent_rgb[0] . ', ' . $menu_v2_accent_rgb[1] . ', ' . $menu_v2_accent_rgb[2] . ', ' . $menu_v2_info_header_opacity . ') !important;
                backdrop-filter: blur(50px) !important;
                -webkit-backdrop-filter: blur(50px) !important;
                border: 2px solid ' . $menu_v2_accent_color . ' !important;
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
                color: ' . $menu_v2_accent_color . ' !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
            }
            /* Filter Thumbnails - configurable background opacity */
            #flexframe-viewer-container .filter-thumbnail,
            .thumbnail-dropdown .filter-thumbnail,
            .filter-thumbnail {
                background: rgba(40, 40, 40, ' . $menu_v2_filter_thumb_bg_opacity . ') !important;
            }
            #flexframe-viewer-container .filter-thumbnail:hover:not(.selected),
            .thumbnail-dropdown .filter-thumbnail:hover:not(.selected),
            .filter-thumbnail:hover:not(.selected) {
                background: rgba(60, 60, 60, ' . min($menu_v2_filter_thumb_bg_opacity + 0.1, 1) . ') !important;
            }
            /* Sticky header for mobile info menu - uses info panel opacity */
            .info-sticky-header {
                position: sticky !important;
                top: 0 !important;
                z-index: 100 !important;
                background: ' . $menu_v2_info_sticky_header_rgba . ' !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border-bottom: 2px solid ' . $menu_v2_accent_color . ' !important;
                padding: 5px !important;
                text-align: center !important;
                font-size: clamp(9px, 3.43vw, 18px) !important;
                font-weight: 700 !important;
                color: ' . $menu_v2_accent_color . ' !important;
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
                color: ' . $menu_v2_text_rgba . ' !important;
                opacity: 1 !important;
            }
            #flexframe-viewer-container .info-step-item:hover,
            .thumbnail-dropdown-right .info-step-item:hover,
            .info-step-item:hover {
                background-color: rgba(' . $menu_v2_accent_rgb[0] . ', ' . $menu_v2_accent_rgb[1] . ', ' . $menu_v2_accent_rgb[2] . ', 0.5) !important;
                border-color: ' . $menu_v2_accent_color . ' !important;
            }
            /* Right menu info titles - use text color */
            #flexframe-viewer-container .info-step-title,
            .thumbnail-dropdown-right .info-step-title,
            .info-step-item .info-step-title,
            .info-step-title {
                color: ' . $menu_v2_text_rgba . ' !important;
                opacity: 1 !important;
                font-weight: 600 !important;
            }
            /* Right menu info text - use text opacity setting */
            #flexframe-viewer-container .info-step-text,
            .thumbnail-dropdown-right .info-step-text,
            .info-step-item .info-step-text,
            .info-step-text {
                color: ' . $menu_v2_text_rgba . ' !important;
                opacity: 1 !important;
            }
            /* Right menu scroll buttons */
            #flexframe-viewer-container .thumbnail-dropdown-right .scroll-btn:hover,
            .thumbnail-dropdown-right .scroll-btn:hover {
                background-color: ' . $menu_v2_accent_color . '33 !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right .scroll-btn:hover svg,
            .thumbnail-dropdown-right .scroll-btn:hover svg {
                fill: ' . $menu_v2_accent_color . ' !important;
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
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right::-webkit-scrollbar-thumb:hover,
            .thumbnail-dropdown-right::-webkit-scrollbar-thumb:hover {
                background-color: ' . $menu_v2_accent_color . 'cc !important;
            }
            /* Firefox scrollbar for right menu */
            #flexframe-viewer-container .thumbnail-dropdown-right,
            .thumbnail-dropdown-right,
            #hintsContainer,
            #tipsContainer,
            #stepsContainer,
            #errorsContainer {
                scrollbar-color: ' . $menu_v2_accent_color . ' rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', 0.5) !important;
            }
            /* Right menu glow effect override */
            #flexframe-viewer-container .thumbnail-dropdown-right.show,
            .thumbnail-dropdown-right.show {
                box-shadow: 0 0 20px ' . $menu_v2_accent_color . '66 !important;
            }
            /* Right menu settings panel */
            #flexframe-viewer-container .right-menu-settings-panel,
            .right-menu-settings-panel {
                background-color: rgba(' . $menu_bg_rgb[0] . ', ' . $menu_bg_rgb[1] . ', ' . $menu_bg_rgb[2] . ', ' . $menu_bg_opacity . ') !important;
                border: 2px solid ' . $menu_v2_accent_color . ' !important;
            }
            /* Right menu sliders */
            #flexframe-viewer-container .thumbnail-dropdown-right input[type="range"]::-webkit-slider-thumb,
            .thumbnail-dropdown-right input[type="range"]::-webkit-slider-thumb,
            .right-menu-settings-panel input[type="range"]::-webkit-slider-thumb {
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right input[type="range"]::-moz-range-thumb,
            .thumbnail-dropdown-right input[type="range"]::-moz-range-thumb,
            .right-menu-settings-panel input[type="range"]::-moz-range-thumb {
                background-color: ' . $menu_v2_accent_color . ' !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right input[type="range"],
            .thumbnail-dropdown-right input[type="range"],
            .right-menu-settings-panel input[type="range"] {
                accent-color: ' . $menu_v2_accent_color . ' !important;
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
            
            /* Thumbnail label gradient uses V2 accent color */
            #flexframe-viewer-container .thumbnail-label,
            .thumbnail-dropdown .thumbnail-label,
            .thumbnail-label {
                background: linear-gradient(rgba(' . $menu_v2_thumbnail_label_rgb[0] . ', ' . $menu_v2_thumbnail_label_rgb[1] . ', ' . $menu_v2_thumbnail_label_rgb[2] . ', 0.85), transparent) !important;
                color: ' . $menu_v2_text_rgba . ' !important;
                border: none !important;
                border-radius: 0 !important;
                ' . ($menu_v2_show_thumbnail_labels !== 'yes' ? 'display: none !important;' : '') . '
            }
            
            /* Thumbnail muscle info gradient (bottom) uses same settings */
            #flexframe-viewer-container .thumbnail-muscle-info,
            .thumbnail-dropdown .thumbnail-muscle-info,
            .thumbnail-muscle-info {
                background: linear-gradient(transparent, rgba(' . $menu_v2_thumbnail_label_rgb[0] . ', ' . $menu_v2_thumbnail_label_rgb[1] . ', ' . $menu_v2_thumbnail_label_rgb[2] . ', 0.85)) !important;
                color: ' . $menu_v2_text_rgba . ' !important;
                ' . ($menu_v2_show_thumbnail_labels !== 'yes' ? 'display: none !important;' : '') . '
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
            FLEXFRAME_PLUGIN_URL . 'assets/assets/index-Bc7r5Q-R.js',
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
            'useLogoLoader' => (bool) $use_logo_loader,
            'player' => array(
                'bgColor' => get_option('flexframe_player_bg_color', '#000000'),
                'bgOpacity' => floatval(get_option('flexframe_player_bg_opacity', 0.8)),
                'buttonColor' => get_option('flexframe_player_button_color', '#ffffff'),
                'buttonBgColor' => get_option('flexframe_player_button_bg_color', '#f50000'),
                'buttonOpacity' => floatval(get_option('flexframe_player_button_bg_opacity', 1)),
                'accentColor' => get_option('flexframe_player_accent_color', '#00bcd4'),
                'alwaysVisible' => get_option('flexframe_player_always_visible', 'no') === 'yes'
            ),
            'menu' => array(
                'bgColor' => get_option('flexframe_menu_bg_color', '#000000'),
                'bgOpacity' => floatval(get_option('flexframe_menu_bg_opacity', 0.9)),
                'textColor' => get_option('flexframe_menu_text_color', '#ffffff'),
                'textOpacity' => floatval(get_option('flexframe_menu_text_opacity', 1)),
                'accentColor' => get_option('flexframe_menu_accent_color', '#4a9eff'),
                'thumbnailLabelColor' => get_option('flexframe_thumbnail_label_color', '#000000'),
                'thumbnailLabelOpacity' => floatval(get_option('flexframe_thumbnail_label_opacity', 0.1))
            ),
            'menuV2' => array(
                'bgColor' => get_option('flexframe_menu_v2_bg_color', '#1a1a1a'),
                'bgOpacity' => floatval(get_option('flexframe_menu_v2_bg_opacity', 0.95)),
                'textColor' => get_option('flexframe_menu_v2_text_color', '#ffffff'),
                'textOpacity' => floatval(get_option('flexframe_menu_v2_text_opacity', 1)),
                'accentColor' => get_option('flexframe_menu_v2_accent_color', $primary_color),
                'showThumbnailLabels' => get_option('flexframe_menu_v2_show_thumbnail_labels', 'yes') === 'yes',
                'headingBgColor' => get_option('flexframe_menu_v2_heading_bg_color', $primary_color),
                'headingBgOpacity' => floatval(get_option('flexframe_menu_v2_heading_bg_opacity', 0.95)),
                'infoStepOpacity' => floatval(get_option('flexframe_menu_v2_info_step_opacity', 0.35)),
                'searchInputBgOpacity' => floatval(get_option('flexframe_menu_v2_search_input_bg_opacity', 0.95)),
                'searchInputBgColor' => get_option('flexframe_menu_v2_search_input_bg_color', get_option('flexframe_menu_v2_bg_color', '#1a1a1a')),
                'infoHeaderOpacity' => floatval(get_option('flexframe_menu_v2_info_header_opacity', 0.5)),
                'infoPanelOpacity' => floatval(get_option('flexframe_menu_v2_info_panel_opacity', 0.95)),
                'filterThumbBgOpacity' => floatval(get_option('flexframe_menu_v2_filter_thumb_bg_opacity', 0.8))
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
                'skinColor' => get_option('flexframe_skin_color', '#ccdef5'),
                'skinOpacity' => floatval(get_option('flexframe_skin_opacity', 1)),
                'skinRoughness' => floatval(get_option('flexframe_skin_roughness', 0)),
                'skinMetalness' => floatval(get_option('flexframe_skin_metalness', 0)),
                'skinTransmission' => floatval(get_option('flexframe_skin_transmission', 1)),
                'skinThickness' => floatval(get_option('flexframe_skin_thickness', 0)),
                'skinIor' => floatval(get_option('flexframe_skin_ior', 1)),
                'skinEnvIntensity' => floatval(get_option('flexframe_skin_env_intensity', 2.29))
            ),
            'menuBackgroundColor' => $menu_bg_color,
            'menuBackgroundOpacity' => $menu_bg_opacity,
            'showScreenshotButton' => (bool) get_option('flexframe_show_screenshot_button', true),
            'showHDButton' => (bool) get_option('flexframe_show_hd_button', true),
            'showARButton' => (bool) get_option('flexframe_show_ar_button', true),
            'autoFullscreen' => (bool) get_option('flexframe_auto_fullscreen', true),
            'pluginUrl' => FLEXFRAME_PLUGIN_URL,
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('flexframe_settings_nonce'),
            'debug' => FLEXFRAME_DEBUG,
            'version' => FLEXFRAME_VERSION,
            'testModelUrl' => (get_option('flexframe_test_model_enabled', false) ? set_url_scheme(esc_url(get_option('flexframe_test_model_url', '')), 'https') : ''),
            'testModelEnabled' => (bool) get_option('flexframe_test_model_enabled', false)
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
    if (!current_user_can('manage_flexframe')) {
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
    
    // Update V2 side menu accent color to match primary color
    update_option('flexframe_menu_v2_accent_color', $primary_color);
    
    // Update V2 side menu heading background color to match primary color
    update_option('flexframe_menu_v2_heading_bg_color', $primary_color);
    
    // Update equipment color1 to match primary color
    update_option('flexframe_color1_color', $primary_color);
    
    // Force clear WordPress object cache for these specific options
    wp_cache_delete('flexframe_primary_color', 'options');
    wp_cache_delete('flexframe_primary_color_mode', 'options');
    wp_cache_delete('flexframe_menu_accent_color', 'options');
    wp_cache_delete('flexframe_player_accent_color', 'options');
    wp_cache_delete('flexframe_player_button_bg_color', 'options');
    wp_cache_delete('flexframe_spinner_color', 'options');
    wp_cache_delete('flexframe_directional_color', 'options');
    wp_cache_delete('flexframe_particles_color', 'options');
    wp_cache_delete('flexframe_menu_v2_accent_color', 'options');
    wp_cache_delete('flexframe_menu_v2_heading_bg_color', 'options');
    wp_cache_delete('flexframe_color1_color', 'options');
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
            <!-- Logo Loader with Progress (always rendered, shown/hidden by setting) -->
            <div class="logo-loader-wrapper" style="<?php echo ($use_logo_loader && !empty($logo_url)) ? '' : 'display: none;'; ?>">
                <div class="logo-loader-container" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: <?php echo esc_attr($logo_loader_size); ?>px;">
                    <?php if (!empty($logo_url)) : ?>
                    <img src="<?php echo esc_url($logo_url); ?>" alt="Loading" class="logo-loader-img <?php echo esc_attr($logo_loader_animation); ?>" style="width: <?php echo esc_attr($logo_loader_size); ?>px; height: auto;" />
                    <?php endif; ?>
                </div>
                <!-- Progress bar under logo -->
                <div class="logo-progress-bar-container">
                    <div class="logo-progress-bar" id="logo-progress-bar"></div>
                </div>
                <div class="logo-progress-text" id="logo-progress-text">0%</div>
            </div>
            <!-- Default Spinner (always rendered, shown/hidden by setting) -->
            <div class="spinner-box" data-spinner="cool" style="<?php echo ($use_logo_loader && !empty($logo_url)) ? 'display: none;' : ''; ?>">
                <div class="loader-spinner"></div>
            </div>
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
    // Setup roles and capabilities
    flexframe_setup_roles();
    
    // Create the branded login page
    flexframe_ensure_login_page();
    
    // Register workout post type and flush rewrite rules
    flexframe_register_workout_post_type();
    
    // Create email captures table
    flexframe_create_email_captures_table();
    
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
    
    // Flush rewrite rules for login page
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'flexframe_activate');

/**
 * Plugin deactivation
 */
function flexframe_deactivate() {
    // Unschedule stale workout cleanup cron
    $timestamp = wp_next_scheduled('flexframe_cleanup_stale_workouts');
    if ($timestamp) {
        wp_unschedule_event($timestamp, 'flexframe_cleanup_stale_workouts');
    }
}
register_deactivation_hook(__FILE__, 'flexframe_deactivate');

/**
 * Schedule daily cron for stale workout cleanup
 */
add_action('init', function() {
    if (!wp_next_scheduled('flexframe_cleanup_stale_workouts')) {
        wp_schedule_event(time(), 'daily', 'flexframe_cleanup_stale_workouts');
    }
});

/**
 * Cron handler: delete workouts not accessed in 30 days
 */
add_action('flexframe_cleanup_stale_workouts', 'flexframe_delete_stale_workouts');
function flexframe_delete_stale_workouts() {
    $cutoff = date('Y-m-d H:i:s', strtotime('-30 days'));

    // Only target guest/anonymous workouts (post_author = 0)
    // Logged-in user workouts are kept indefinitely
    $stale = get_posts(array(
        'post_type'      => 'flexframe_workout',
        'post_status'    => 'any',
        'posts_per_page' => 100,
        'author'         => 0,
        'meta_query'     => array(
            'relation' => 'OR',
            // last_accessed exists and is older than 30 days
            array(
                'key'     => '_flexframe_workout_last_accessed',
                'value'   => $cutoff,
                'compare' => '<',
                'type'    => 'DATETIME',
            ),
            // last_accessed never set (legacy workouts) — fall back to post_date
            array(
                'key'     => '_flexframe_workout_last_accessed',
                'compare' => 'NOT EXISTS',
            ),
        ),
    ));

    foreach ($stale as $post) {
        // For legacy posts without last_accessed, check post_date
        $last = get_post_meta($post->ID, '_flexframe_workout_last_accessed', true);
        if (empty($last)) {
            if (strtotime($post->post_date) >= strtotime($cutoff)) {
                continue; // Post is less than 30 days old, skip
            }
        }
        wp_delete_post($post->ID, true); // Force delete (bypass trash)
    }
}












