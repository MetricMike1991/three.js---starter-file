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
        'manage_flexframe',
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
    
    if (!current_user_can('manage_flexframe')) {
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
 * AJAX handler to create the Workout Builder page
 */
function flexframe_create_workout_page() {
    // Security check
    check_ajax_referer('flexframe_create_page', 'nonce');
    
    if (!current_user_can('manage_flexframe')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }
    
    // Check if page already exists
    $existing_page = get_page_by_path('workout-builder');
    if ($existing_page) {
        // Update the existing page to use blank template
        flexframe_set_blank_template($existing_page->ID);
        // Also mark as workout page for full-screen CSS
        update_post_meta($existing_page->ID, '_flexframe_workout_page', '1');
        
        $page_url = get_permalink($existing_page->ID);
        update_option('flexframe_workout_page_url', $page_url);
        wp_send_json_success(array(
            'message' => 'Workout page already exists! Template updated.',
            'url' => $page_url,
            'page_id' => $existing_page->ID,
            'edit_url' => get_edit_post_link($existing_page->ID, 'raw')
        ));
    }
    
    // Create the page with the workout builder shortcode
    $page_data = array(
        'post_title'    => 'Workout Builder',
        'post_name'     => 'workout-builder',
        'post_content'  => '[flexframe_workout_builder]',
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
    // Mark as workout page for full-screen CSS
    update_post_meta($page_id, '_flexframe_workout_page', '1');
    
    // Save the page URL to settings
    $page_url = get_permalink($page_id);
    update_option('flexframe_workout_page_url', $page_url);
    
    wp_send_json_success(array(
        'message' => 'Workout Builder page created successfully!',
        'url' => $page_url,
        'page_id' => $page_id,
        'edit_url' => get_edit_post_link($page_id, 'raw')
    ));
}
add_action('wp_ajax_flexframe_create_workout_page', 'flexframe_create_workout_page');

/**
 * AJAX handler to create the Dashboard page
 */
function flexframe_create_dashboard_page() {
    check_ajax_referer('flexframe_create_page', 'nonce');
    
    if (!current_user_can('manage_flexframe')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }
    
    $existing_page = get_page_by_path('dashboard');
    if ($existing_page) {
        flexframe_set_blank_template($existing_page->ID);
        update_post_meta($existing_page->ID, '_flexframe_dashboard_page', '1');
        
        $page_url = get_permalink($existing_page->ID);
        update_option('flexframe_dashboard_page_url', $page_url);
        wp_send_json_success(array(
            'message' => 'Dashboard page already exists! Template updated.',
            'url' => $page_url,
            'page_id' => $existing_page->ID,
            'edit_url' => get_edit_post_link($existing_page->ID, 'raw')
        ));
    }
    
    $page_data = array(
        'post_title'    => 'Dashboard',
        'post_name'     => 'dashboard',
        'post_content'  => '[flexframe_dashboard]',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_author'   => get_current_user_id(),
    );
    
    $page_id = wp_insert_post($page_data);
    
    if (is_wp_error($page_id)) {
        wp_send_json_error(array('message' => $page_id->get_error_message()));
    }
    
    flexframe_set_blank_template($page_id);
    update_post_meta($page_id, '_flexframe_dashboard_page', '1');
    
    $page_url = get_permalink($page_id);
    update_option('flexframe_dashboard_page_url', $page_url);
    
    wp_send_json_success(array(
        'message' => 'Dashboard page created successfully!',
        'url' => $page_url,
        'page_id' => $page_id,
        'edit_url' => get_edit_post_link($page_id, 'raw')
    ));
}
add_action('wp_ajax_flexframe_create_dashboard_page', 'flexframe_create_dashboard_page');

/**
 * AJAX handler to create a Privacy Policy page with comprehensive GDPR content
 */
function flexframe_create_privacy_policy_page() {
    check_ajax_referer('flexframe_create_page', 'nonce');

    if (!current_user_can('manage_flexframe')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    // Check if page already exists
    $existing_page = get_page_by_path('flexframe-privacy-policy');
    if ($existing_page) {
        $page_url = get_permalink($existing_page->ID);
        update_option('flexframe_privacy_policy_url', $page_url);
        wp_send_json_success(array(
            'message' => 'Privacy policy page already exists! URL updated.',
            'url' => $page_url,
            'page_id' => $existing_page->ID,
            'edit_url' => get_edit_post_link($existing_page->ID, 'raw')
        ));
    }

    $site_name = get_bloginfo('name');
    $admin_email = get_option('admin_email');

    $content = '<!-- wp:heading {"level":1} -->
<h1>Privacy Policy</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Last updated:</strong> ' . date('F j, Y') . '</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This privacy policy explains how ' . esc_html($site_name) . ' ("we", "us", "our") collects, uses, stores, and protects your personal data when you use our Workout Builder and related services. We are committed to ensuring your privacy is protected in accordance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable data protection laws.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>1. Data Controller</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The data controller responsible for your personal data is:<br>' . esc_html($site_name) . '<br>Contact: ' . esc_html($admin_email) . '</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>2. What Data We Collect</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>When you use our Workout Builder and sharing features, we may collect the following personal data:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Email address</strong> — Collected when you share a workout via the share feature.</li>
<li><strong>Marketing consent status</strong> — Whether you opted in to receive marketing communications.</li>
<li><strong>Workout data</strong> — The name and content of workouts you create and share.</li>
<li><strong>IP address</strong> — Collected automatically when you submit the share form for security and fraud prevention.</li>
<li><strong>Browser and device information</strong> — Standard server logs may capture your browser type, operating system, and device type.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>3. How We Use Your Data</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We use your personal data for the following purposes:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Providing the sharing service</strong> — To generate a unique shareable link for your workout (contractual necessity).</li>
<li><strong>Marketing communications</strong> — If you consent, we may send you emails about workout tips, new features, fitness content, promotions, and related offers (consent-based).</li>
<li><strong>Service improvement</strong> — Aggregated, anonymised usage data helps us improve our products (legitimate interest).</li>
<li><strong>Security and fraud prevention</strong> — IP addresses are logged to prevent abuse of our services (legitimate interest).</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>4. Legal Basis for Processing (GDPR)</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We process your personal data under the following legal bases as defined by Article 6 of the GDPR:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Consent (Art. 6(1)(a))</strong> — For marketing communications and email collection during the share process. You provide explicit consent via the checkbox before sharing.</li>
<li><strong>Contractual necessity (Art. 6(1)(b))</strong> — Processing your email is necessary to deliver the sharing service you requested.</li>
<li><strong>Legitimate interest (Art. 6(1)(f))</strong> — For security logging and service improvement, where our interests do not override your fundamental rights.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>5. Marketing Communications</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We will only send you marketing emails if you have given explicit consent by checking the consent box when sharing a workout. Marketing communications may include:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Workout tips and fitness advice</li>
<li>New feature announcements</li>
<li>Special offers and promotions</li>
<li>Third-party partner offers (only with your additional consent)</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>You can withdraw your consent at any time</strong> by clicking the "Unsubscribe" link in any marketing email, or by contacting us at ' . esc_html($admin_email) . '. Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>6. Data Retention</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We retain your personal data only as long as necessary for the purposes outlined above:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Email addresses and consent records</strong> — Retained until you request deletion or withdraw consent, whichever comes first.</li>
<li><strong>Shared workout data</strong> — Retained as long as the shared link is active.</li>
<li><strong>IP addresses</strong> — Retained for up to 12 months for security purposes, then deleted or anonymised.</li>
<li><strong>Server logs</strong> — Automatically deleted after 90 days.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>7. Your Rights</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Under the GDPR and applicable data protection laws, you have the following rights:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Right of access (Art. 15)</strong> — Request a copy of your personal data we hold.</li>
<li><strong>Right to rectification (Art. 16)</strong> — Request correction of inaccurate data.</li>
<li><strong>Right to erasure (Art. 17)</strong> — Request deletion of your personal data ("right to be forgotten").</li>
<li><strong>Right to restrict processing (Art. 18)</strong> — Request that we limit how we use your data.</li>
<li><strong>Right to data portability (Art. 20)</strong> — Receive your data in a structured, machine-readable format.</li>
<li><strong>Right to object (Art. 21)</strong> — Object to processing based on legitimate interest, including direct marketing.</li>
<li><strong>Right to withdraw consent (Art. 7(3))</strong> — Withdraw consent at any time without affecting prior processing.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>To exercise any of these rights, contact us at <strong>' . esc_html($admin_email) . '</strong>. We will respond within 30 days.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>8. Data Sharing and Third Parties</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We do not sell your personal data. We may share data with:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Hosting providers</strong> — Our website hosting provider processes data on our behalf under a Data Processing Agreement (DPA).</li>
<li><strong>Email service providers</strong> — If you consent to marketing, your email may be shared with our email marketing provider to deliver communications.</li>
<li><strong>Legal obligations</strong> — We may disclose data if required by law or to protect our legal rights.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>All third-party processors are contractually obligated to protect your data and process it only on our instructions.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>9. Data Security</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We implement appropriate technical and organisational measures to protect your personal data, including:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>SSL/TLS encryption for all data in transit</li>
<li>Secure database storage with restricted access</li>
<li>Regular security updates and monitoring</li>
<li>Access controls limiting who can view personal data</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>10. International Data Transfers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Your data may be processed in countries outside your jurisdiction. Where transfers occur outside the European Economic Area (EEA), we ensure appropriate safeguards such as Standard Contractual Clauses (SCCs) or adequacy decisions are in place.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>11. Cookies</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our Workout Builder may use essential cookies for functionality. We do not use tracking or advertising cookies in the Workout Builder. For details on cookies used across the wider website, please refer to our main cookie policy.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>12. Children&apos;s Privacy</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our services are not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us so we can delete it.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>13. Changes to This Policy</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We may update this privacy policy from time to time. Material changes will be communicated via our website. The "Last updated" date at the top indicates the most recent revision.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>14. Contact Us</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>If you have questions about this privacy policy or wish to exercise your data rights, please contact us:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Email:</strong> ' . esc_html($admin_email) . '</li>
<li><strong>Website:</strong> ' . esc_url(home_url('/')) . '</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>If you are not satisfied with our response, you have the right to lodge a complaint with your local Data Protection Authority (DPA).</p>
<!-- /wp:paragraph -->';

    $page_data = array(
        'post_title'   => 'Privacy Policy — Workout Builder',
        'post_name'    => 'flexframe-privacy-policy',
        'post_content' => $content,
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_author'  => get_current_user_id(),
    );

    $page_id = wp_insert_post($page_data);

    if (is_wp_error($page_id)) {
        wp_send_json_error(array('message' => $page_id->get_error_message()));
    }

    $page_url = get_permalink($page_id);
    update_option('flexframe_privacy_policy_url', $page_url);

    wp_send_json_success(array(
        'message' => 'Privacy Policy page created successfully!',
        'url' => $page_url,
        'page_id' => $page_id,
        'edit_url' => get_edit_post_link($page_id, 'raw')
    ));
}
add_action('wp_ajax_flexframe_create_privacy_policy_page', 'flexframe_create_privacy_policy_page');

/**
 * AJAX handler to save a custom theme preset
 */
function flexframe_save_custom_preset() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    // Check permissions
    if (!current_user_can('manage_flexframe')) {
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
            'show_screenshot_button' => (bool)($preset_data['show_screenshot_button'] ?? true),
            'show_hd_button' => (bool)($preset_data['show_hd_button'] ?? true),
            'show_ar_button' => (bool)($preset_data['show_ar_button'] ?? true),
            // Side Menus V2 Settings
            'menu_v2_bg_color' => sanitize_hex_color($preset_data['menu_v2_bg_color'] ?? '#1a1a1a'),
            'menu_v2_bg_opacity' => floatval($preset_data['menu_v2_bg_opacity'] ?? 0.95),
            'menu_v2_text_color' => sanitize_hex_color($preset_data['menu_v2_text_color'] ?? '#ffffff'),
            'menu_v2_text_opacity' => floatval($preset_data['menu_v2_text_opacity'] ?? 1),
            'menu_v2_accent_color' => sanitize_hex_color($preset_data['menu_v2_accent_color'] ?? '#f50000'),
            'menu_v2_show_thumbnail_labels' => sanitize_text_field($preset_data['menu_v2_show_thumbnail_labels'] ?? 'yes'),
            'menu_v2_heading_bg_color' => sanitize_hex_color($preset_data['menu_v2_heading_bg_color'] ?? '#4a9eff'),
            'menu_v2_heading_bg_opacity' => floatval($preset_data['menu_v2_heading_bg_opacity'] ?? 0.95),
            'menu_v2_info_step_opacity' => floatval($preset_data['menu_v2_info_step_opacity'] ?? 0.35),
            'menu_v2_info_header_opacity' => floatval($preset_data['menu_v2_info_header_opacity'] ?? 0.5),
            'menu_v2_info_panel_opacity' => floatval($preset_data['menu_v2_info_panel_opacity'] ?? 0.95),
            'menu_v2_filter_thumb_bg_opacity' => floatval($preset_data['menu_v2_filter_thumb_bg_opacity'] ?? 0.8),
            'menu_v2_search_input_bg_opacity' => floatval($preset_data['menu_v2_search_input_bg_opacity'] ?? 0.95),
            'menu_v2_search_input_bg_color' => sanitize_hex_color($preset_data['menu_v2_search_input_bg_color'] ?? '#1a1a1a'),
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
            // V1 Menu Settings (legacy)
            'menu_text_opacity' => floatval($preset_data['menu_text_opacity'] ?? 1),
            'thumbnail_label_color' => sanitize_hex_color($preset_data['thumbnail_label_color'] ?? '#000000'),
            'thumbnail_label_opacity' => floatval($preset_data['thumbnail_label_opacity'] ?? 0.1),
            // Equipment Material Settings
            'barbell_color' => sanitize_hex_color($preset_data['barbell_color'] ?? '#808080'),
            'barbell_opacity' => floatval($preset_data['barbell_opacity'] ?? 1),
            'barbell_metalness' => floatval($preset_data['barbell_metalness'] ?? 0.8),
            'barbell_roughness' => floatval($preset_data['barbell_roughness'] ?? 0.3),
            'bumper_color' => sanitize_hex_color($preset_data['bumper_color'] ?? '#808080'),
            'bumper_opacity' => floatval($preset_data['bumper_opacity'] ?? 1),
            'bumper_metalness' => floatval($preset_data['bumper_metalness'] ?? 0),
            'bumper_roughness' => floatval($preset_data['bumper_roughness'] ?? 0.8),
            'cable_color' => sanitize_hex_color($preset_data['cable_color'] ?? '#808080'),
            'cable_opacity' => floatval($preset_data['cable_opacity'] ?? 1),
            'cable_metalness' => floatval($preset_data['cable_metalness'] ?? 0.5),
            'cable_roughness' => floatval($preset_data['cable_roughness'] ?? 0.4),
            'chrome_color' => sanitize_hex_color($preset_data['chrome_color'] ?? '#cccccc'),
            'chrome_opacity' => floatval($preset_data['chrome_opacity'] ?? 1),
            'chrome_metalness' => floatval($preset_data['chrome_metalness'] ?? 1),
            'chrome_roughness' => floatval($preset_data['chrome_roughness'] ?? 0.1),
            'color1_color' => sanitize_hex_color($preset_data['color1_color'] ?? '#4a9eff'),
            'color1_opacity' => floatval($preset_data['color1_opacity'] ?? 1),
            'color1_metalness' => floatval($preset_data['color1_metalness'] ?? 0.5),
            'color1_roughness' => floatval($preset_data['color1_roughness'] ?? 0.5),
            'metal_color' => sanitize_hex_color($preset_data['metal_color'] ?? '#b0b0b0'),
            'metal_opacity' => floatval($preset_data['metal_opacity'] ?? 1),
            'metal_metalness' => floatval($preset_data['metal_metalness'] ?? 0.9),
            'metal_roughness' => floatval($preset_data['metal_roughness'] ?? 0.3),
            'pad_color' => sanitize_hex_color($preset_data['pad_color'] ?? '#1a1a1a'),
            'pad_opacity' => floatval($preset_data['pad_opacity'] ?? 1),
            'pad_metalness' => floatval($preset_data['pad_metalness'] ?? 0),
            'pad_roughness' => floatval($preset_data['pad_roughness'] ?? 0.9),
            'plastic_color' => sanitize_hex_color($preset_data['plastic_color'] ?? '#808080'),
            'plastic_opacity' => floatval($preset_data['plastic_opacity'] ?? 1),
            'plastic_metalness' => floatval($preset_data['plastic_metalness'] ?? 0),
            'plastic_roughness' => floatval($preset_data['plastic_roughness'] ?? 0.6),
            'rubber_color' => sanitize_hex_color($preset_data['rubber_color'] ?? '#1a1a1a'),
            'rubber_opacity' => floatval($preset_data['rubber_opacity'] ?? 1),
            'rubber_metalness' => floatval($preset_data['rubber_metalness'] ?? 0),
            'rubber_roughness' => floatval($preset_data['rubber_roughness'] ?? 0.95),
        )
    );
    
    // Add preset
    $custom_presets[$preset_id] = $sanitized_data;
    
    // Save preset collection
    update_option('flexframe_custom_presets', $custom_presets);
    
    // Also check if the caller wants to immediately apply settings
    $apply_now = isset($_POST['apply_settings']) && $_POST['apply_settings'] === 'yes';
    
    if ($apply_now) {
        $s = $sanitized_data['settings'];
        
        // Primary Color
        update_option('flexframe_primary_color', $s['primary_color']);
        update_option('flexframe_primary_color_mode', $s['primary_color_mode']);
        
        // UI Settings
        update_option('flexframe_spinner_color', $s['spinner_color']);
        update_option('flexframe_use_logo_loader', $s['use_logo_loader'] ? '1' : '0');
        update_option('flexframe_logo_loader_animation', $s['logo_loader_animation']);
        update_option('flexframe_logo_loader_size', $s['logo_loader_size']);
        update_option('flexframe_player_bg_color', $s['player_bg_color']);
        update_option('flexframe_player_bg_opacity', $s['player_bg_opacity']);
        update_option('flexframe_player_button_bg_color', $s['player_button_bg_color']);
        update_option('flexframe_player_button_bg_opacity', $s['player_button_bg_opacity']);
        update_option('flexframe_player_icon_color', $s['player_icon_color']);
        update_option('flexframe_player_accent_color', $s['player_accent_color']);
        update_option('flexframe_player_always_visible', $s['player_always_visible']);
        update_option('flexframe_menu_bg_color', $s['menu_bg_color']);
        update_option('flexframe_menu_bg_opacity', $s['menu_bg_opacity']);
        update_option('flexframe_menu_text_color', $s['menu_text_color']);
        update_option('flexframe_menu_text_opacity', $s['menu_text_opacity']);
        update_option('flexframe_menu_accent_color', $s['menu_accent_color']);
        update_option('flexframe_thumbnail_label_color', $s['thumbnail_label_color']);
        update_option('flexframe_thumbnail_label_opacity', $s['thumbnail_label_opacity']);
        update_option('flexframe_show_screenshot_button', $s['show_screenshot_button'] ? '1' : '0');
        update_option('flexframe_show_hd_button', $s['show_hd_button'] ? '1' : '0');
        update_option('flexframe_show_ar_button', $s['show_ar_button'] ? '1' : '0');
        
        // V2 Side Menu Settings
        update_option('flexframe_menu_v2_bg_color', $s['menu_v2_bg_color']);
        update_option('flexframe_menu_v2_bg_opacity', $s['menu_v2_bg_opacity']);
        update_option('flexframe_menu_v2_text_color', $s['menu_v2_text_color']);
        update_option('flexframe_menu_v2_text_opacity', $s['menu_v2_text_opacity']);
        update_option('flexframe_menu_v2_accent_color', $s['menu_v2_accent_color']);
        update_option('flexframe_menu_v2_show_thumbnail_labels', $s['menu_v2_show_thumbnail_labels']);
        update_option('flexframe_menu_v2_heading_bg_color', $s['menu_v2_heading_bg_color']);
        update_option('flexframe_menu_v2_heading_bg_opacity', $s['menu_v2_heading_bg_opacity']);
        update_option('flexframe_menu_v2_info_step_opacity', $s['menu_v2_info_step_opacity']);
        update_option('flexframe_menu_v2_info_header_opacity', $s['menu_v2_info_header_opacity']);
        update_option('flexframe_menu_v2_info_panel_opacity', $s['menu_v2_info_panel_opacity']);
        update_option('flexframe_menu_v2_filter_thumb_bg_opacity', $s['menu_v2_filter_thumb_bg_opacity']);
        update_option('flexframe_menu_v2_search_input_bg_opacity', $s['menu_v2_search_input_bg_opacity']);
        update_option('flexframe_menu_v2_search_input_bg_color', $s['menu_v2_search_input_bg_color']);
        
        // Skin Material Settings
        update_option('flexframe_skin_color', $s['skin_color']);
        update_option('flexframe_skin_opacity', $s['skin_opacity']);
        update_option('flexframe_skin_roughness', $s['skin_roughness']);
        update_option('flexframe_skin_metalness', $s['skin_metalness']);
        update_option('flexframe_skin_transmission', $s['skin_transmission']);
        update_option('flexframe_skin_thickness', $s['skin_thickness']);
        update_option('flexframe_skin_ior', $s['skin_ior']);
        update_option('flexframe_skin_env_intensity', $s['skin_env_intensity']);
        
        // Background Settings
        update_option('flexframe_bg_gradient_top', $s['bg_gradient_top']);
        update_option('flexframe_bg_gradient_bottom', $s['bg_gradient_bottom']);
        update_option('flexframe_bg_gradient_opacity', $s['bg_gradient_opacity']);
        
        // Lighting Settings
        update_option('flexframe_ambient_intensity', $s['ambient_intensity']);
        update_option('flexframe_ambient_color', $s['ambient_color']);
        update_option('flexframe_directional_intensity', $s['directional_intensity']);
        update_option('flexframe_directional_color', $s['directional_color']);
        
        // Particle Settings
        update_option('flexframe_particles_enabled', $s['particles_enabled'] ? '1' : '0');
        update_option('flexframe_particles_count', $s['particle_count']);
        update_option('flexframe_particles_size', $s['particle_size']);
        update_option('flexframe_particles_color', $s['particle_color']);
        update_option('flexframe_particles_opacity', $s['particle_opacity']);
        update_option('flexframe_particles_speed', $s['particle_speed']);
        
        // Equipment Material Settings - enable and apply each
        $equip_keys = array('barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber');
        $equip_props = array('color', 'opacity', 'metalness', 'roughness');
        foreach ($equip_keys as $mat_key) {
            // Enable the material so the viewer picks it up
            update_option("flexframe_{$mat_key}_enabled", '1');
            foreach ($equip_props as $prop) {
                $setting_key = "{$mat_key}_{$prop}";
                if (isset($s[$setting_key])) {
                    update_option("flexframe_{$setting_key}", $s[$setting_key]);
                }
            }
        }
    }
    
    wp_send_json_success(array(
        'message' => $apply_now ? 'Theme saved & applied!' : 'Preset saved successfully!',
        'preset_id' => $preset_id,
        'presets' => $custom_presets,
        'applied' => $apply_now
    ));
}
add_action('wp_ajax_flexframe_save_custom_preset', 'flexframe_save_custom_preset');

/**
 * AJAX handler to get a custom theme preset for download
 */
function flexframe_get_custom_preset() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    // Check permissions
    if (!current_user_can('manage_flexframe')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $preset_id = isset($_POST['preset_id']) ? sanitize_text_field($_POST['preset_id']) : '';
    
    if (empty($preset_id)) {
        wp_send_json_error(array('message' => 'Preset ID is required.'));
    }
    
    // Get existing presets
    $custom_presets = get_option('flexframe_custom_presets', array());
    
    if (!isset($custom_presets[$preset_id])) {
        wp_send_json_error(array('message' => 'Preset not found.'));
    }
    
    wp_send_json_success($custom_presets[$preset_id]);
}
add_action('wp_ajax_flexframe_get_custom_preset', 'flexframe_get_custom_preset');

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
    if (!current_user_can('manage_flexframe')) {
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
 * ========== DEMO PAGE MANAGEMENT (Step 6) ==========
 */

/**
 * AJAX handler to create a gym demo page
 */
function flexframe_create_demo_page() {
    // Security check
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $demo_name = isset($_POST['demo_name']) ? sanitize_text_field($_POST['demo_name']) : '';
    $demo_slug = isset($_POST['demo_slug']) ? sanitize_title($_POST['demo_slug']) : '';
    $theme_preset = isset($_POST['theme_preset']) ? sanitize_text_field($_POST['theme_preset']) : '';
    $demo_logo_url = isset($_POST['demo_logo_url']) ? esc_url_raw($_POST['demo_logo_url']) : '';
    
    if (empty($demo_name) || empty($demo_slug)) {
        wp_send_json_error(array('message' => 'Demo name and URL slug are required.'));
    }
    
    if (empty($theme_preset)) {
        wp_send_json_error(array('message' => 'Please select a theme for this demo page.'));
    }
    
    // Check if a page with this slug already exists under /demo/
    $full_slug = 'demo/' . $demo_slug;
    $existing_page = get_page_by_path($full_slug);
    if ($existing_page) {
        wp_send_json_error(array('message' => 'A demo page with this URL already exists. Please choose a different name.'));
    }
    
    // First, ensure the parent "demo" page exists
    $demo_parent = get_page_by_path('demo');
    $parent_id = 0;
    if (!$demo_parent) {
        $parent_page_data = array(
            'post_title'    => 'Demo',
            'post_name'     => 'demo',
            'post_content'  => '<!-- FlexFrame Demo Pages Parent -->',
            'post_status'   => 'publish',
            'post_type'     => 'page',
            'post_author'   => get_current_user_id(),
        );
        $parent_id = wp_insert_post($parent_page_data);
        if (is_wp_error($parent_id)) {
            $parent_id = 0;
        }
    } else {
        $parent_id = $demo_parent->ID;
    }
    
    // Create the demo page
    $page_data = array(
        'post_title'    => $demo_name,
        'post_name'     => $demo_slug,
        'post_content'  => '[flexframe_viewer]',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_author'   => get_current_user_id(),
        'post_parent'   => $parent_id,
    );
    
    $page_id = wp_insert_post($page_data);
    
    if (is_wp_error($page_id)) {
        wp_send_json_error(array('message' => $page_id->get_error_message()));
    }
    
    // Set blank template
    flexframe_set_blank_template($page_id);
    
    // Store demo page metadata
    update_post_meta($page_id, '_flexframe_demo_page', '1');
    update_post_meta($page_id, '_flexframe_demo_preset', $theme_preset);
    update_post_meta($page_id, '_flexframe_demo_name', $demo_name);
    if (!empty($demo_logo_url)) {
        update_post_meta($page_id, '_flexframe_demo_logo_url', $demo_logo_url);
    }
    
    // Build & store a FULL settings snapshot — this makes the demo fully independent
    $snapshot = flexframe_build_demo_snapshot($theme_preset, $demo_logo_url);
    update_post_meta($page_id, '_flexframe_demo_snapshot', $snapshot);
    
    // Track demo pages in an option for easy retrieval
    $demo_pages = get_option('flexframe_demo_pages', array());
    $demo_pages[$page_id] = array(
        'name' => $demo_name,
        'slug' => $demo_slug,
        'theme_preset' => $theme_preset,
        'logo_url' => $demo_logo_url,
        'created' => current_time('mysql'),
        'url' => get_permalink($page_id),
    );
    update_option('flexframe_demo_pages', $demo_pages);
    
    wp_send_json_success(array(
        'message' => 'Demo page "' . $demo_name . '" created successfully!',
        'page_id' => $page_id,
        'url' => get_permalink($page_id),
        'demo_pages' => $demo_pages
    ));
}
add_action('wp_ajax_flexframe_create_demo_page', 'flexframe_create_demo_page');

/**
 * AJAX handler to update a demo page's theme
 */
function flexframe_update_demo_theme() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    $theme_preset = isset($_POST['theme_preset']) ? sanitize_text_field($_POST['theme_preset']) : '';
    
    if (empty($page_id) || empty($theme_preset)) {
        wp_send_json_error(array('message' => 'Page ID and theme preset are required.'));
    }
    
    // Verify it's a demo page
    $is_demo = get_post_meta($page_id, '_flexframe_demo_page', true);
    if (!$is_demo) {
        wp_send_json_error(array('message' => 'This is not a demo page.'));
    }
    
    // Update the theme
    update_post_meta($page_id, '_flexframe_demo_preset', $theme_preset);
    
    // Update logo if provided
    $demo_logo_url = isset($_POST['demo_logo_url']) ? esc_url_raw($_POST['demo_logo_url']) : null;
    if ($demo_logo_url !== null) {
        update_post_meta($page_id, '_flexframe_demo_logo_url', $demo_logo_url);
    }
    
    // Rebuild the full settings snapshot with the new theme applied
    $current_logo = ($demo_logo_url !== null) ? $demo_logo_url : get_post_meta($page_id, '_flexframe_demo_logo_url', true);
    $snapshot = flexframe_build_demo_snapshot($theme_preset, $current_logo);
    update_post_meta($page_id, '_flexframe_demo_snapshot', $snapshot);
    
    // Update the tracked demo pages option
    $demo_pages = get_option('flexframe_demo_pages', array());
    if (isset($demo_pages[$page_id])) {
        $demo_pages[$page_id]['theme_preset'] = $theme_preset;
        if ($demo_logo_url !== null) {
            $demo_pages[$page_id]['logo_url'] = $demo_logo_url;
        }
        update_option('flexframe_demo_pages', $demo_pages);
    }
    
    wp_send_json_success(array(
        'message' => 'Settings updated successfully!',
        'demo_pages' => $demo_pages
    ));
}
add_action('wp_ajax_flexframe_update_demo_theme', 'flexframe_update_demo_theme');

/**
 * AJAX handler to refresh a demo page's snapshot to current global settings
 * This lets the admin intentionally push latest settings to a demo page.
 */
function flexframe_refresh_demo_snapshot() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    
    if (empty($page_id)) {
        wp_send_json_error(array('message' => 'Page ID is required.'));
    }
    
    $is_demo = get_post_meta($page_id, '_flexframe_demo_page', true);
    if (!$is_demo) {
        wp_send_json_error(array('message' => 'This is not a demo page.'));
    }
    
    // Get the current preset and logo for this demo page
    $theme_preset = get_post_meta($page_id, '_flexframe_demo_preset', true);
    $demo_logo_url = get_post_meta($page_id, '_flexframe_demo_logo_url', true);
    
    // Rebuild the snapshot from current global settings + the demo's preset & logo
    $snapshot = flexframe_build_demo_snapshot($theme_preset ?: 'current', $demo_logo_url);
    update_post_meta($page_id, '_flexframe_demo_snapshot', $snapshot);
    
    wp_send_json_success(array(
        'message' => 'Demo page snapshot refreshed to current settings!',
    ));
}
add_action('wp_ajax_flexframe_refresh_demo_snapshot', 'flexframe_refresh_demo_snapshot');

/**
 * AJAX handler to delete a gym demo page
 */
function flexframe_delete_demo_page() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    
    if (empty($page_id)) {
        wp_send_json_error(array('message' => 'Page ID is required.'));
    }
    
    // Verify it's a demo page
    $is_demo = get_post_meta($page_id, '_flexframe_demo_page', true);
    if (!$is_demo) {
        wp_send_json_error(array('message' => 'This is not a demo page.'));
    }
    
    // Delete the page (move to trash)
    wp_trash_post($page_id);
    
    // Remove from tracked demo pages
    $demo_pages = get_option('flexframe_demo_pages', array());
    unset($demo_pages[$page_id]);
    update_option('flexframe_demo_pages', $demo_pages);
    
    wp_send_json_success(array(
        'message' => 'Demo page deleted successfully!',
        'demo_pages' => $demo_pages
    ));
}
add_action('wp_ajax_flexframe_delete_demo_page', 'flexframe_delete_demo_page');

/**
 * ========== CLIENT ACCESS MANAGEMENT (Step 7) ==========
 */

/**
 * Track last login time for FlexFrame client users.
 */
function flexframe_track_client_login($user_login, $user) {
    if (in_array('flexframe_manager', (array) $user->roles)) {
        update_user_meta($user->ID, 'flexframe_last_login', current_time('mysql'));
    }
}
add_action('wp_login', 'flexframe_track_client_login', 10, 2);

/**
 * AJAX handler to create a client account.
 */
function flexframe_create_client_account() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Only administrators can manage client accounts.'));
    }
    
    $display_name = isset($_POST['display_name']) ? sanitize_text_field($_POST['display_name']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $username = isset($_POST['username']) ? sanitize_user($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    
    if (empty($display_name) || empty($email) || empty($username) || empty($password)) {
        wp_send_json_error(array('message' => 'All fields are required.'));
    }
    
    if (!is_email($email)) {
        wp_send_json_error(array('message' => 'Please enter a valid email address.'));
    }
    
    if (username_exists($username)) {
        wp_send_json_error(array('message' => 'This username is already taken. Please choose a different one.'));
    }
    
    if (email_exists($email)) {
        wp_send_json_error(array('message' => 'This email address is already registered.'));
    }
    
    $user_id = wp_create_user($username, $password, $email);
    
    if (is_wp_error($user_id)) {
        wp_send_json_error(array('message' => $user_id->get_error_message()));
    }
    
    // Set role and display name
    $user = new WP_User($user_id);
    $user->set_role('flexframe_manager');
    wp_update_user(array(
        'ID' => $user_id,
        'display_name' => $display_name,
    ));
    
    wp_send_json_success(array(
        'message' => 'Client account "' . $display_name . '" created successfully!',
        'user_id' => $user_id,
    ));
}
add_action('wp_ajax_flexframe_create_client_account', 'flexframe_create_client_account');

/**
 * AJAX handler to reset a client's password.
 */
function flexframe_reset_client_password() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Only administrators can manage client accounts.'));
    }
    
    $user_id = isset($_POST['user_id']) ? absint($_POST['user_id']) : 0;
    $new_password = isset($_POST['new_password']) ? $_POST['new_password'] : '';
    
    if (empty($user_id) || empty($new_password)) {
        wp_send_json_error(array('message' => 'User ID and new password are required.'));
    }
    
    // Verify it's a FlexFrame client user
    $user = get_userdata($user_id);
    if (!$user || !in_array('flexframe_manager', (array) $user->roles)) {
        wp_send_json_error(array('message' => 'This is not a FlexFrame client account.'));
    }
    
    wp_set_password($new_password, $user_id);
    
    wp_send_json_success(array(
        'message' => 'Password reset successfully for "' . $user->display_name . '"!',
    ));
}
add_action('wp_ajax_flexframe_reset_client_password', 'flexframe_reset_client_password');

/**
 * AJAX handler to delete a client account.
 */
function flexframe_delete_client_account() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Only administrators can manage client accounts.'));
    }
    
    $user_id = isset($_POST['user_id']) ? absint($_POST['user_id']) : 0;
    
    if (empty($user_id)) {
        wp_send_json_error(array('message' => 'User ID is required.'));
    }
    
    // Verify it's a FlexFrame client user (safety check)
    $user = get_userdata($user_id);
    if (!$user || !in_array('flexframe_manager', (array) $user->roles)) {
        wp_send_json_error(array('message' => 'This is not a FlexFrame client account.'));
    }
    
    // Don't allow deleting yourself
    if ($user_id === get_current_user_id()) {
        wp_send_json_error(array('message' => 'You cannot delete your own account.'));
    }
    
    require_once(ABSPATH . 'wp-admin/includes/user.php');
    $result = wp_delete_user($user_id);
    
    if (!$result) {
        wp_send_json_error(array('message' => 'Failed to delete user.'));
    }
    
    wp_send_json_success(array(
        'message' => 'Client account "' . $user->display_name . '" deleted successfully!',
    ));
}
add_action('wp_ajax_flexframe_delete_client_account', 'flexframe_delete_client_account');

/**
 * AJAX handler to create the login page.
 */
function flexframe_create_login_page() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    
    flexframe_ensure_login_page();
    
    $login_slug = get_option('flexframe_client_login_slug', 'flexframe-login');
    $login_page = get_page_by_path($login_slug);
    
    if ($login_page) {
        wp_send_json_success(array(
            'message' => 'Login page created successfully!',
            'url' => get_permalink($login_page->ID),
        ));
    } else {
        wp_send_json_error(array('message' => 'Failed to create login page.'));
    }
}
add_action('wp_ajax_flexframe_create_login_page', 'flexframe_create_login_page');

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
 * Sanitize custom exercises JSON
 */
function flexframe_sanitize_custom_exercises($input) {
    $decoded = json_decode(stripslashes($input), true);
    if (!is_array($decoded)) {
        return '[]';
    }
    $sanitized = array();
    foreach ($decoded as $exercise) {
        if (empty($exercise['id']) || empty($exercise['name'])) continue;
        $sanitized[] = array(
            'id'            => sanitize_key($exercise['id']),
            'name'          => sanitize_text_field($exercise['name']),
            'thumbnailUrl'  => esc_url_raw(!empty($exercise['thumbnailUrl']) ? $exercise['thumbnailUrl'] : ''),
            'configUrl'     => '',
            'youtubeUrl'    => esc_url_raw(!empty($exercise['youtubeUrl']) ? $exercise['youtubeUrl'] : ''),
            'source'        => 'custom',
            'showInfo'      => !empty($exercise['showInfo']) ? true : false,
            'showInViewer'  => isset($exercise['showInViewer']) ? (bool) $exercise['showInViewer'] : true,
            'showInWorkout' => isset($exercise['showInWorkout']) ? (bool) $exercise['showInWorkout'] : true,
            'muscleGroup'   => !empty($exercise['muscleGroup']) && is_array($exercise['muscleGroup']) ? array_map('sanitize_text_field', $exercise['muscleGroup']) : array(),
            'equipment'     => !empty($exercise['equipment']) && is_array($exercise['equipment']) ? array_map('sanitize_text_field', $exercise['equipment']) : array(),
            'type'          => in_array(!empty($exercise['type']) ? $exercise['type'] : '', array('Strength', 'Cardio', 'Flexibility', 'Stretching')) ? $exercise['type'] : 'Strength',
            'information'   => array(
                'step1' => sanitize_textarea_field(!empty($exercise['information']['step1']) ? $exercise['information']['step1'] : ''),
                'step2' => sanitize_textarea_field(!empty($exercise['information']['step2']) ? $exercise['information']['step2'] : ''),
                'step3' => sanitize_textarea_field(!empty($exercise['information']['step3']) ? $exercise['information']['step3'] : ''),
                'step4' => sanitize_textarea_field(!empty($exercise['information']['step4']) ? $exercise['information']['step4'] : '')
            )
        );
    }
    return wp_json_encode($sanitized);
}

/**
 * Register settings
 */
function flexframe_register_settings() {
    // Allow manage_flexframe cap to save settings via options.php
    add_filter('option_page_capability_flexframe_settings_group', function() {
        return 'manage_flexframe';
    });
    
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
    
    // Custom exercises - stored as JSON array of exercise objects
    register_setting('flexframe_settings_group', 'flexframe_custom_exercises', array(
        'type' => 'string',
        'sanitize_callback' => 'flexframe_sanitize_custom_exercises',
        'default' => '[]'
    ));
    
    // Viewer page URL for generating exercise deep links
    register_setting('flexframe_settings_group', 'flexframe_viewer_page_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // Workout builder page URL (Step 9)
    register_setting('flexframe_settings_group', 'flexframe_workout_page_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // Privacy policy URL (Step 9)
    register_setting('flexframe_settings_group', 'flexframe_privacy_policy_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // ========== Dashboard Settings (Step 10) ==========
    
    // Dashboard page URL
    register_setting('flexframe_settings_group', 'flexframe_dashboard_page_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // Dashboard tagline
    register_setting('flexframe_settings_group', 'flexframe_dashboard_tagline', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Your Fitness Journey Starts Here'
    ));
    
    // Button 1: Exercise Viewer
    register_setting('flexframe_settings_group', 'flexframe_dash_btn1_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_btn1_label', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Exercise Viewer'
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_btn1_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // Button 2: Workout Builder
    register_setting('flexframe_settings_group', 'flexframe_dash_btn2_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_btn2_label', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Workout Builder'
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_btn2_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // Button 3: Gym Website
    register_setting('flexframe_settings_group', 'flexframe_dash_btn3_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_btn3_label', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Visit Our Website'
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_btn3_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // Button 4: Client Login
    register_setting('flexframe_settings_group', 'flexframe_dash_login_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_login_label', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Client Login'
    ));
    register_setting('flexframe_settings_group', 'flexframe_dash_login_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    
    // ========== Lead Capture Settings (Dashboard) ==========
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_mode', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'off'
    ));
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_heading', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Stay Connected'
    ));
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_description', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Enter your email to get updates and exclusive offers.'
    ));
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_button_text', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Submit'
    ));
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_success_msg', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'Thanks! We\'ll be in touch.'
    ));
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_consent_text', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'I agree to receive marketing emails'
    ));
    register_setting('flexframe_settings_group', 'flexframe_lead_capture_show_phone', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => false
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
    register_setting('flexframe_settings_group', 'flexframe_show_hd_button', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => true
    ));
    register_setting('flexframe_settings_group', 'flexframe_show_ar_button', array(
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
    
    // ========== Side Menus V2 Settings ==========
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_bg_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#1a1a1a'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.95
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_text_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#ffffff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_text_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 1
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_accent_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#4a9eff'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_show_thumbnail_labels', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'yes'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_heading_bg_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#1a1a1a'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_heading_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.95
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_info_step_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.35
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_search_input_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.95
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_search_input_bg_color', array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_hex_color',
        'default' => '#1a1a1a'
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_info_header_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.5
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_info_panel_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.95
    ));
    register_setting('flexframe_settings_group', 'flexframe_menu_v2_filter_thumb_bg_opacity', array(
        'type' => 'number',
        'sanitize_callback' => 'floatval',
        'default' => 0.8
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
    
    // ========== Model Tester (Step 8) ==========
    register_setting('flexframe_settings_group', 'flexframe_test_model_url', array(
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => ''
    ));
    register_setting('flexframe_settings_group', 'flexframe_test_model_enabled', array(
        'type' => 'boolean',
        'sanitize_callback' => 'rest_sanitize_boolean',
        'default' => false
    ));
}
add_action('admin_init', 'flexframe_register_settings');

/**
 * When the primary color is saved via the settings form, propagate it
 * to all dependent settings (V2 side menus, spinner, player, etc.).
 * This ensures the primary color is always applied consistently.
 */
function flexframe_propagate_primary_color($old_value, $new_value) {
    if (empty($new_value) || $new_value === $old_value) return;
    
    // V2 Side Menus
    update_option('flexframe_menu_v2_accent_color', $new_value);
    update_option('flexframe_menu_v2_heading_bg_color', $new_value);
    
    // Animation Player
    update_option('flexframe_player_button_bg_color', $new_value);
    update_option('flexframe_player_accent_color', $new_value);
    
    // Legacy Menu accent
    update_option('flexframe_menu_accent_color', $new_value);
    
    // Spinner
    update_option('flexframe_spinner_color', $new_value);
    
    // Directional Light
    update_option('flexframe_directional_color', $new_value);
    
    // Particles
    update_option('flexframe_particles_color', $new_value);
    
    // Equipment color1
    update_option('flexframe_color1_color', $new_value);
}
add_action('update_option_flexframe_primary_color', 'flexframe_propagate_primary_color', 10, 2);

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
    if (!current_user_can('manage_flexframe')) {
        return;
    }
    
    $is_client_user = flexframe_is_client_user();
    $is_admin_user = current_user_can('manage_options');
    
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
    
    // Custom exercises
    $custom_exercises = get_option('flexframe_custom_exercises', '[]');
    
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
    <div class="wrap"<?php if ($is_client_user) : $client_primary = !empty($primary_color) ? $primary_color : '#2271b1'; ?> style="--client-accent: <?php echo esc_attr($client_primary); ?>;"<?php endif; ?>>
        <?php if ($is_client_user) : 
            $current_user = wp_get_current_user();
            $client_display_name = !empty($current_user->display_name) ? $current_user->display_name : $current_user->user_login;
        ?>
            <!-- Client Top Navigation Bar -->
            <div class="flexframe-client-topbar">
                <div class="topbar-brand">
                    <?php if (!empty($logo_url)) : ?>
                        <img src="<?php echo esc_url($logo_url); ?>" alt="Logo" class="topbar-logo" />
                    <?php else : ?>
                        <span class="dashicons dashicons-video-alt3"></span>
                    <?php endif; ?>
                    <span class="topbar-title"><?php echo esc_html(get_bloginfo('name')); ?></span>
                </div>
                <div class="topbar-actions">
                    <?php if (!empty($viewer_page_url) && $viewer_page_url !== home_url('/')) : ?>
                    <a href="<?php echo esc_url($viewer_page_url); ?>" target="_blank" class="topbar-btn topbar-btn-accent">
                        <span class="dashicons dashicons-visibility"></span>
                        <?php _e('View Exercise Library', 'flexframe-viewer'); ?>
                    </a>
                    <?php endif; ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" class="topbar-btn">
                        <span class="dashicons dashicons-admin-home"></span>
                        <?php _e('Site', 'flexframe-viewer'); ?>
                    </a>
                    <a href="<?php echo esc_url(wp_logout_url(home_url('/'))); ?>" class="topbar-btn topbar-btn-logout">
                        <span class="dashicons dashicons-exit"></span>
                        <?php _e('Logout', 'flexframe-viewer'); ?>
                    </a>
                </div>
            </div>

            <!-- Client Welcome Hero -->
            <div class="flexframe-client-welcome">
                <div class="welcome-content">
                    <?php if (!empty($logo_url)) : ?>
                        <div class="welcome-logo">
                            <img src="<?php echo esc_url($logo_url); ?>" alt="Logo" />
                        </div>
                    <?php endif; ?>
                    <div class="welcome-text">
                        <h1><?php printf(__('Welcome back, %s', 'flexframe-viewer'), esc_html($client_display_name)); ?></h1>
                        <p><?php _e('Customize your 3D exercise viewer — upload your logo, set brand colors, choose a theme, and manage your exercise library.', 'flexframe-viewer'); ?></p>
                    </div>
                </div>
                <div class="welcome-quick-links">
                    <div class="quick-link" data-scroll-step="2">
                        <span class="dashicons dashicons-format-image"></span>
                        <span><?php _e('Logo', 'flexframe-viewer'); ?></span>
                    </div>
                    <div class="quick-link" data-scroll-step="3">
                        <span class="dashicons dashicons-art"></span>
                        <span><?php _e('Brand Color', 'flexframe-viewer'); ?></span>
                    </div>
                    <div class="quick-link" data-scroll-step="4">
                        <span class="dashicons dashicons-admin-appearance"></span>
                        <span><?php _e('Theme', 'flexframe-viewer'); ?></span>
                    </div>
                    <div class="quick-link" data-scroll-step="5">
                        <span class="dashicons dashicons-admin-customizer"></span>
                        <span><?php _e('Custom Theme', 'flexframe-viewer'); ?></span>
                    </div>
                </div>
            </div>
        <?php else : ?>
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <?php endif; ?>
        
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
                        
                        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e4e7;" />
                        
                        <!-- Custom Exercises Section -->
                        <div class="flexframe-custom-exercises-section">
                            <div class="custom-exercises-section-header">
                                <span class="custom-exercises-icon">🎬</span>
                                <h3><?php _e('Custom Exercises (YouTube)', 'flexframe-viewer'); ?></h3>
                            </div>
                            <p class="step-description" style="margin-bottom: 16px;">
                                <?php _e('Add your own exercises using YouTube videos. These will appear alongside the built-in 3D exercises in the Exercise Viewer and Workout Builder.', 'flexframe-viewer'); ?>
                            </p>
                            
                            <div class="custom-exercises-container">
                                <div class="custom-exercises-toolbar">
                                    <button type="button" class="button button-primary" id="add-custom-exercise-btn">
                                        <span class="dashicons dashicons-plus-alt2" style="margin-top: 3px; margin-right: 4px;"></span>
                                        <?php _e('Add Custom Exercise', 'flexframe-viewer'); ?>
                                    </button>
                                    <span class="custom-exercises-count" id="custom-exercises-count"></span>
                                </div>
                                
                                <!-- Custom Exercises List -->
                                <div id="custom-exercises-list" class="custom-exercises-list">
                                    <div class="custom-exercises-empty" id="custom-exercises-empty">
                                        <span class="empty-icon">🎬</span>
                                        <p><?php _e('No custom exercises yet. Click "Add Custom Exercise" to create one.', 'flexframe-viewer'); ?></p>
                                    </div>
                                </div>
                                
                                <!-- Custom Exercise Form (hidden by default) -->
                                <div id="custom-exercise-form" class="custom-exercise-form" style="display: none;">
                                    <div class="custom-exercise-form-header">
                                        <h4 id="custom-exercise-form-title"><?php _e('Add Custom Exercise', 'flexframe-viewer'); ?></h4>
                                        <button type="button" class="custom-exercise-form-close" id="custom-exercise-form-close">&times;</button>
                                    </div>
                                    
                                    <div class="custom-exercise-form-body">
                                        <div class="custom-exercise-form-row">
                                            <label for="ce-name"><strong><?php _e('Exercise Name', 'flexframe-viewer'); ?></strong> <span class="required">*</span></label>
                                            <input type="text" id="ce-name" placeholder="<?php _e('e.g. Pistol Squat', 'flexframe-viewer'); ?>" />
                                        </div>
                                        
                                        <div class="custom-exercise-form-row">
                                            <label for="ce-youtube"><strong><?php _e('YouTube URL', 'flexframe-viewer'); ?></strong> <span class="required">*</span></label>
                                            <input type="url" id="ce-youtube" placeholder="<?php _e('https://www.youtube.com/watch?v=...', 'flexframe-viewer'); ?>" />
                                            <p class="description"><?php _e('Paste a YouTube video URL. This will be displayed instead of a 3D model.', 'flexframe-viewer'); ?></p>
                                        </div>
                                        
                                        <div class="custom-exercise-form-row">
                                            <label><strong><?php _e('Thumbnail', 'flexframe-viewer'); ?></strong></label>
                                            <div class="ce-thumbnail-upload">
                                                <div class="ce-thumbnail-preview" id="ce-thumbnail-preview">
                                                    <span class="no-thumbnail">📷</span>
                                                </div>
                                                <div class="ce-thumbnail-actions">
                                                    <button type="button" class="button" id="ce-upload-thumbnail-btn">
                                                        <span class="dashicons dashicons-upload" style="margin-top: 3px; margin-right: 2px;"></span>
                                                        <?php _e('Upload from Media Library', 'flexframe-viewer'); ?>
                                                    </button>
                                                    <button type="button" class="button" id="ce-remove-thumbnail-btn" style="display: none;">
                                                        <?php _e('Remove', 'flexframe-viewer'); ?>
                                                    </button>
                                                </div>
                                                <input type="hidden" id="ce-thumbnail-url" value="" />
                                            </div>
                                        </div>
                                        
                                        <div class="custom-exercise-form-row-group">
                                            <div class="custom-exercise-form-row half">
                                                <label for="ce-type"><strong><?php _e('Type / Category', 'flexframe-viewer'); ?></strong></label>
                                                <select id="ce-type">
                                                    <option value="Strength"><?php _e('Strength', 'flexframe-viewer'); ?></option>
                                                    <option value="Cardio"><?php _e('Cardio', 'flexframe-viewer'); ?></option>
                                                    <option value="Flexibility"><?php _e('Flexibility', 'flexframe-viewer'); ?></option>
                                                    <option value="Stretching"><?php _e('Stretching', 'flexframe-viewer'); ?></option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="custom-exercise-form-row">
                                            <label><strong><?php _e('Target Muscles', 'flexframe-viewer'); ?></strong></label>
                                            <div class="ce-checkbox-grid" id="ce-muscles-grid">
                                                <?php
                                                $muscles = array('Chest','Back','Shoulders','Biceps','Triceps','Abs','Quads','Glutes','Hamstrings','Calves');
                                                foreach ($muscles as $muscle) :
                                                ?>
                                                    <label class="ce-checkbox-label">
                                                        <input type="checkbox" value="<?php echo esc_attr($muscle); ?>" />
                                                        <?php echo esc_html($muscle); ?>
                                                    </label>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                        
                                        <div class="custom-exercise-form-row">
                                            <label><strong><?php _e('Equipment', 'flexframe-viewer'); ?></strong></label>
                                            <div class="ce-checkbox-grid" id="ce-equipment-grid">
                                                <?php
                                                $equipment_list = array('Barbell','Dumbbell','Cables','Machines','Kettlebell','Body Weight','Bands','TRX','Medicine Ball');
                                                foreach ($equipment_list as $equip) :
                                                ?>
                                                    <label class="ce-checkbox-label">
                                                        <input type="checkbox" value="<?php echo esc_attr($equip); ?>" />
                                                        <?php echo esc_html($equip); ?>
                                                    </label>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                        
                                        <div class="custom-exercise-form-row">
                                            <label><strong><?php _e('Display In', 'flexframe-viewer'); ?></strong></label>
                                            <div class="ce-toggle-group">
                                                <div class="ce-toggle-row">
                                                    <label class="ce-toggle">
                                                        <input type="checkbox" id="ce-show-in-viewer" checked />
                                                        <span class="ce-toggle-slider"></span>
                                                    </label>
                                                    <span class="ce-toggle-description"><?php _e('Exercise Viewer', 'flexframe-viewer'); ?></span>
                                                </div>
                                                <div class="ce-toggle-row">
                                                    <label class="ce-toggle">
                                                        <input type="checkbox" id="ce-show-in-workout" checked />
                                                        <span class="ce-toggle-slider"></span>
                                                    </label>
                                                    <span class="ce-toggle-description"><?php _e('Workout Builder', 'flexframe-viewer'); ?></span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="custom-exercise-form-row">
                                            <label><strong><?php _e('Show Exercise Info Panel', 'flexframe-viewer'); ?></strong></label>
                                            <div class="ce-toggle-row">
                                                <label class="ce-toggle">
                                                    <input type="checkbox" id="ce-show-info" checked />
                                                    <span class="ce-toggle-slider"></span>
                                                </label>
                                                <span class="ce-toggle-description"><?php _e('Display the step-by-step instructions dropdown for this exercise', 'flexframe-viewer'); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div id="ce-info-fields" class="custom-exercise-info-fields">
                                            <div class="custom-exercise-form-row">
                                                <label for="ce-step1"><strong><?php _e('Step 1', 'flexframe-viewer'); ?></strong></label>
                                                <textarea id="ce-step1" rows="2" placeholder="<?php _e('Describe the first step...', 'flexframe-viewer'); ?>"></textarea>
                                            </div>
                                            <div class="custom-exercise-form-row">
                                                <label for="ce-step2"><strong><?php _e('Step 2', 'flexframe-viewer'); ?></strong></label>
                                                <textarea id="ce-step2" rows="2" placeholder="<?php _e('Describe the second step...', 'flexframe-viewer'); ?>"></textarea>
                                            </div>
                                            <div class="custom-exercise-form-row">
                                                <label for="ce-step3"><strong><?php _e('Step 3', 'flexframe-viewer'); ?></strong></label>
                                                <textarea id="ce-step3" rows="2" placeholder="<?php _e('Describe the third step...', 'flexframe-viewer'); ?>"></textarea>
                                            </div>
                                            <div class="custom-exercise-form-row">
                                                <label for="ce-step4"><strong><?php _e('Step 4', 'flexframe-viewer'); ?></strong></label>
                                                <textarea id="ce-step4" rows="2" placeholder="<?php _e('Describe the fourth step (optional)...', 'flexframe-viewer'); ?>"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="custom-exercise-form-footer">
                                        <button type="button" class="button" id="custom-exercise-cancel-btn"><?php _e('Cancel', 'flexframe-viewer'); ?></button>
                                        <button type="button" class="button button-primary" id="custom-exercise-save-btn">
                                            <span class="dashicons dashicons-saved" style="margin-top: 3px; margin-right: 4px;"></span>
                                            <?php _e('Save Exercise', 'flexframe-viewer'); ?>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Hidden input to store custom exercises JSON array -->
                                <input type="hidden" id="flexframe_custom_exercises" name="flexframe_custom_exercises" value="<?php echo esc_attr($custom_exercises); ?>" />
                            </div>
                            
                            <p class="description" style="margin-top: 16px;">
                                <?php _e('💡 Custom exercises use YouTube videos instead of 3D models. They appear in both the Exercise Viewer and the Workout Builder. Remember to click "Save Settings" to save your changes.', 'flexframe-viewer'); ?>
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
                                        <option value="dark" <?php selected($material_preset, 'dark'); ?>>
                                            <?php _e('Dark Spark', 'flexframe-viewer'); ?>
                                        </option>
                                        <option value="light_v3" <?php selected($material_preset, 'light_v3'); ?>>
                                            <?php _e('Light Theme - V3', 'flexframe-viewer'); ?>
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
                                <button type="button" id="download-custom-theme" class="button" style="display: none;">
                                    <span class="dashicons dashicons-download" style="margin-top: 4px;"></span>
                                    <?php _e('Download', 'flexframe-viewer'); ?>
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
                            <?php _e('Create your perfect theme using our Visual Theme Editor, or fine-tune settings manually below.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Visual Theme Editor CTA -->
                        <div class="visual-theme-editor-cta">
                            <div class="cta-content">
                                <div class="cta-icon">
                                    <span class="dashicons dashicons-art"></span>
                                </div>
                                <div class="cta-text">
                                    <h3><?php _e('Visual Theme Editor', 'flexframe-viewer'); ?></h3>
                                    <p><?php _e('The easiest way to create your theme! See changes in real-time as you customize colors, lighting, particles, and more.', 'flexframe-viewer'); ?></p>
                                </div>
                                <div class="cta-action">
                                    <?php 
                                    $theme_editor_url = $viewer_page_url ? add_query_arg('openThemeEditor', '1', $viewer_page_url) : '#';
                                    ?>
                                    <a href="<?php echo esc_url($theme_editor_url); ?>" target="_blank" class="button button-primary button-hero open-theme-editor-btn" <?php echo empty($viewer_page_url) ? 'disabled style="pointer-events:none;opacity:0.5;"' : ''; ?>>
                                        <span class="dashicons dashicons-edit" style="margin-top: 6px;"></span>
                                        <?php _e('Open Visual Editor', 'flexframe-viewer'); ?>
                                        <span class="dashicons dashicons-external" style="margin-top: 6px; font-size: 16px;"></span>
                                    </a>
                                    <?php if (empty($viewer_page_url)) : ?>
                                        <p class="cta-warning"><span class="dashicons dashicons-warning"></span> <?php _e('Set up your Viewer Page URL in Step 3 first.', 'flexframe-viewer'); ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="cta-tip">
                                <span class="dashicons dashicons-lightbulb"></span>
                                <?php _e('Tip: Press "T" on your keyboard anytime in the viewer to open/close the Theme Editor.', 'flexframe-viewer'); ?>
                            </div>
                        </div>
                        
                        <!-- Divider with "OR" -->
                        <?php if (flexframe_is_super_admin()) : ?>
                        <div class="theme-settings-divider">
                            <span class="divider-line"></span>
                            <span class="divider-text"><?php _e('OR', 'flexframe-viewer'); ?></span>
                            <span class="divider-line"></span>
                        </div>
                        
                        <!-- Manual Settings Section (Collapsible) -->
                        <div class="manual-theme-settings">
                            <div class="manual-settings-header" id="manual-settings-toggle">
                                <span class="dashicons dashicons-admin-generic"></span>
                                <h3><?php _e('Advanced Manual Settings', 'flexframe-viewer'); ?></h3>
                                <span class="manual-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                            </div>
                            <p class="manual-settings-desc"><?php _e('Configure theme settings directly here. Changes will apply to the viewer in real-time.', 'flexframe-viewer'); ?></p>
                        
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
                        
                        <!-- Import Theme Section -->
                        <div class="import-theme-section">
                            <div class="import-theme-row">
                                <label for="import-theme-file" class="button button-secondary import-theme-label">
                                    <span class="dashicons dashicons-upload" style="margin-top: 4px;"></span>
                                    <?php _e('Import Theme JSON', 'flexframe-viewer'); ?>
                                </label>
                                <input type="file" id="import-theme-file" accept=".json" style="display: none;" />
                                <span id="import-theme-filename" class="import-filename"></span>
                            </div>
                            <span id="import-theme-message" class="save-theme-message" style="display: none;"></span>
                        </div>
                        
                        <!-- Custom Panel Settings (no preset manager, settings only) -->
                        <div class="flexframe-custom-panel">
                            
                            <!-- UI Settings Section -->
                            <div class="custom-panel-section">
                                <div class="custom-panel-header" data-target="ui-settings-content">
                                    <h4><span class="dashicons dashicons-admin-appearance"></span> <?php _e('UI Settings', 'flexframe-viewer'); ?></h4>
                                    <div class="header-preview ui-preview">
                                        <div class="ui-icons-preview" id="preview-ui-icons">
                                            <span class="ui-icon-btn">▶</span>
                                            <span class="ui-icon-menu">☰</span>
                                        </div>
                                    </div>
                                    <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                                </div>
                                <div class="custom-panel-content" id="ui-settings-content">
                                    
                                    <!-- Loading Spinner Settings -->
                                    <div class="ui-settings-section">
                                        <div class="ui-section-header-row">
                                            <h5><span class="dashicons dashicons-update"></span> <?php _e('Loading Indicator', 'flexframe-viewer'); ?></h5>
                                            <div class="inline-preview loading-preview">
                                                <div class="preview-spinner-inline" id="preview-spinner" <?php echo $use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                    <div class="spinner-circle"></div>
                                                </div>
                                                <div class="preview-logo-loader-inline" id="preview-logo-loader" <?php echo !$use_logo_loader ? 'style="display:none;"' : ''; ?>>
                                                    <?php if (!empty($logo_url)) : ?>
                                                        <img src="<?php echo esc_url($logo_url); ?>" alt="Loading" class="logo-loader-img <?php echo esc_attr($logo_loader_animation); ?>" style="width: <?php echo esc_attr(min($logo_loader_size, 60)); ?>px; max-width: <?php echo esc_attr(min($logo_loader_size, 60)); ?>px; height: auto;" />
                                                    <?php else : ?>
                                                        <div class="logo-placeholder-small"><span class="dashicons dashicons-format-image"></span></div>
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                        </div>
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
                            
                            <!-- Hidden fields for Side Menu V2 settings (applied by theme presets) -->
                            <input type="hidden" id="flexframe_menu_v2_bg_color" name="flexframe_menu_v2_bg_color" value="<?php echo esc_attr(get_option('flexframe_menu_v2_bg_color', '#1a1a1a')); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_bg_opacity" name="flexframe_menu_v2_bg_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_bg_opacity', 0.95)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_text_color" name="flexframe_menu_v2_text_color" value="<?php echo esc_attr(get_option('flexframe_menu_v2_text_color', '#ffffff')); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_text_opacity" name="flexframe_menu_v2_text_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_text_opacity', 1)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_accent_color" name="flexframe_menu_v2_accent_color" value="<?php echo esc_attr(get_option('flexframe_menu_v2_accent_color', '#4a9eff')); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_show_thumbnail_labels" name="flexframe_menu_v2_show_thumbnail_labels" value="<?php echo esc_attr(get_option('flexframe_menu_v2_show_thumbnail_labels', 'yes')); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_heading_bg_color" name="flexframe_menu_v2_heading_bg_color" value="<?php echo esc_attr(get_option('flexframe_menu_v2_heading_bg_color', get_option('flexframe_primary_color', '#4a9eff'))); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_heading_bg_opacity" name="flexframe_menu_v2_heading_bg_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_heading_bg_opacity', 0.95)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_info_step_opacity" name="flexframe_menu_v2_info_step_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_info_step_opacity', 0.35)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_search_input_bg_opacity" name="flexframe_menu_v2_search_input_bg_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_search_input_bg_opacity', 0.95)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_search_input_bg_color" name="flexframe_menu_v2_search_input_bg_color" value="<?php echo esc_attr(get_option('flexframe_menu_v2_search_input_bg_color', get_option('flexframe_menu_v2_bg_color', '#1a1a1a'))); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_info_header_opacity" name="flexframe_menu_v2_info_header_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_info_header_opacity', 0.5)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_info_panel_opacity" name="flexframe_menu_v2_info_panel_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_info_panel_opacity', 0.95)); ?>" />
                            <input type="hidden" id="flexframe_menu_v2_filter_thumb_bg_opacity" name="flexframe_menu_v2_filter_thumb_bg_opacity" value="<?php echo esc_attr(get_option('flexframe_menu_v2_filter_thumb_bg_opacity', 0.8)); ?>" />

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
                        </div><!-- End of manual-theme-settings -->
                        <?php endif; // flexframe_is_super_admin ?>
                    </div>
                </div>
                
                <!-- Step 6: Gym Demo Pages (Super Admin Only) -->
                <?php if (flexframe_is_super_admin()) : ?>
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="6">
                        <span class="step-number">6</span>
                        <h2><?php _e('Gym Demo Pages', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Create branded demo pages for gyms and clients. Each demo page gets its own URL at <code>/demo/your-gym-name</code> with a custom theme applied.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Create New Demo Page -->
                        <div class="flexframe-demo-create-section">
                            <h3><span class="dashicons dashicons-plus-alt2"></span> <?php _e('Create New Demo Page', 'flexframe-viewer'); ?></h3>
                            <div class="demo-create-form">
                                <div class="demo-form-row">
                                    <div class="demo-form-field">
                                        <label for="flexframe_demo_name"><?php _e('Demo Name', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_demo_name" placeholder="<?php _e('e.g. Gold\'s Gym Downtown', 'flexframe-viewer'); ?>" />
                                    </div>
                                    <div class="demo-form-field">
                                        <label for="flexframe_demo_slug"><?php _e('URL Slug', 'flexframe-viewer'); ?></label>
                                        <div class="demo-slug-input-wrapper">
                                            <span class="demo-slug-prefix"><?php echo esc_html(home_url('/demo/')); ?></span>
                                            <input type="text" id="flexframe_demo_slug" placeholder="<?php _e('golds-gym', 'flexframe-viewer'); ?>" />
                                        </div>
                                    </div>
                                </div>
                                <div class="demo-form-row">
                                    <div class="demo-form-field">
                                        <label for="flexframe_demo_theme"><?php _e('Apply Theme', 'flexframe-viewer'); ?></label>
                                        <select id="flexframe_demo_theme">
                                            <option value=""><?php _e('— Select a theme —', 'flexframe-viewer'); ?></option>
                                            <optgroup label="<?php _e('Current Settings', 'flexframe-viewer'); ?>">
                                                <option value="current"><?php _e('Use Current Theme & Settings', 'flexframe-viewer'); ?></option>
                                            </optgroup>
                                            <optgroup label="<?php _e('Built-in Themes', 'flexframe-viewer'); ?>">
                                                <option value="dark"><?php _e('Dark Spark', 'flexframe-viewer'); ?></option>
                                                <option value="light_v3"><?php _e('Light Theme - V3', 'flexframe-viewer'); ?></option>
                                            </optgroup>
                                            <?php 
                                            $custom_presets_for_demo = get_option('flexframe_custom_presets', array());
                                            if (!empty($custom_presets_for_demo)) : ?>
                                            <optgroup label="<?php _e('Your Custom Themes', 'flexframe-viewer'); ?>">
                                                <?php foreach ($custom_presets_for_demo as $preset_id => $preset) : ?>
                                                    <option value="custom:<?php echo esc_attr($preset_id); ?>">
                                                        <?php echo esc_html($preset['name']); ?>
                                                    </option>
                                                <?php endforeach; ?>
                                            </optgroup>
                                            <?php endif; ?>
                                        </select>
                                    </div>
                                    <div class="demo-form-field">
                                        <label><?php _e('Logo', 'flexframe-viewer'); ?></label>
                                        <div class="demo-logo-upload-wrapper">
                                            <input type="hidden" id="flexframe_demo_logo_url" value="" />
                                            <div class="demo-logo-preview" id="demo-logo-preview" style="display:none;">
                                                <img src="" alt="Demo Logo" id="demo-logo-preview-img" />
                                                <button type="button" class="demo-logo-remove-btn" id="demo-logo-remove" title="<?php _e('Remove logo', 'flexframe-viewer'); ?>">
                                                    <span class="dashicons dashicons-no-alt"></span>
                                                </button>
                                            </div>
                                            <button type="button" class="button" id="demo-logo-upload-btn">
                                                <span class="dashicons dashicons-upload" style="margin-top: 4px;"></span>
                                                <?php _e('Upload Logo', 'flexframe-viewer'); ?>
                                            </button>
                                            <p class="description"><?php _e('Optional. Leave empty to use global logo.', 'flexframe-viewer'); ?></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="demo-form-row">
                                    <div class="demo-form-field demo-form-action">
                                        <button type="button" id="flexframe-create-demo-page" class="button button-primary">
                                            <span class="dashicons dashicons-plus-alt" style="margin-top: 4px;"></span>
                                            <?php _e('Create Demo Page', 'flexframe-viewer'); ?>
                                        </button>
                                    </div>
                                </div>
                                <div id="flexframe-demo-create-status" class="demo-status-message"></div>
                            </div>
                        </div>
                        
                        <!-- Existing Demo Pages List -->
                        <div class="flexframe-demo-list-section">
                            <h3><span class="dashicons dashicons-list-view"></span> <?php _e('Your Demo Pages', 'flexframe-viewer'); ?></h3>
                            <?php
                            $demo_pages = get_option('flexframe_demo_pages', array());
                            $custom_presets_list = get_option('flexframe_custom_presets', array());
                            ?>
                            <div id="flexframe-demo-pages-list">
                                <?php if (empty($demo_pages)) : ?>
                                    <div class="demo-empty-state">
                                        <span class="dashicons dashicons-store"></span>
                                        <p><?php _e('No demo pages created yet. Create your first one above!', 'flexframe-viewer'); ?></p>
                                    </div>
                                <?php else : ?>
                                    <table class="demo-pages-table">
                                        <thead>
                                            <tr>
                                                <th><?php _e('Name', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Logo', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('URL', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Theme', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Actions', 'flexframe-viewer'); ?></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($demo_pages as $page_id => $demo) : 
                                                // Get the theme display name
                                                $theme_display = $demo['theme_preset'];
                                                if ($theme_display === 'current') {
                                                    $theme_display = __('Current Settings', 'flexframe-viewer');
                                                } elseif ($theme_display === 'dark') {
                                                    $theme_display = __('Dark Spark', 'flexframe-viewer');
                                                } elseif ($theme_display === 'light_v3') {
                                                    $theme_display = __('Light Theme - V3', 'flexframe-viewer');
                                                } elseif (strpos($theme_display, 'custom:') === 0) {
                                                    $cid = str_replace('custom:', '', $theme_display);
                                                    $theme_display = isset($custom_presets_list[$cid]) ? $custom_presets_list[$cid]['name'] : __('Custom Theme', 'flexframe-viewer');
                                                }
                                                
                                                $demo_url = get_permalink($page_id);
                                            ?>
                                            <tr data-page-id="<?php echo esc_attr($page_id); ?>">
                                                <td class="demo-name-cell">
                                                    <strong><?php echo esc_html($demo['name']); ?></strong>
                                                </td>
                                                <td class="demo-logo-cell">
                                                    <?php 
                                                    $demo_logo = isset($demo['logo_url']) ? $demo['logo_url'] : '';
                                                    if (!empty($demo_logo)) : ?>
                                                        <div class="demo-table-logo-wrapper" data-page-id="<?php echo esc_attr($page_id); ?>">
                                                            <img src="<?php echo esc_url($demo_logo); ?>" alt="Logo" class="demo-table-logo-img" />
                                                            <button type="button" class="demo-table-logo-change" title="<?php _e('Change logo', 'flexframe-viewer'); ?>">
                                                                <span class="dashicons dashicons-edit"></span>
                                                            </button>
                                                            <button type="button" class="demo-table-logo-remove" data-page-id="<?php echo esc_attr($page_id); ?>" title="<?php _e('Remove logo (use global)', 'flexframe-viewer'); ?>">
                                                                <span class="dashicons dashicons-no-alt"></span>
                                                            </button>
                                                        </div>
                                                    <?php else : ?>
                                                        <div class="demo-table-logo-wrapper no-logo" data-page-id="<?php echo esc_attr($page_id); ?>">
                                                            <button type="button" class="button button-small demo-table-logo-change" title="<?php _e('Upload logo', 'flexframe-viewer'); ?>">
                                                                <span class="dashicons dashicons-format-image" style="margin-top: 3px;"></span>
                                                            </button>
                                                            <span class="demo-uses-global"><?php _e('Global', 'flexframe-viewer'); ?></span>
                                                        </div>
                                                    <?php endif; ?>
                                                </td>
                                                <td class="demo-url-cell">
                                                    <a href="<?php echo esc_url($demo_url); ?>" target="_blank" title="<?php _e('Open demo page', 'flexframe-viewer'); ?>">
                                                        /demo/<?php echo esc_html($demo['slug']); ?>/
                                                        <span class="dashicons dashicons-external"></span>
                                                    </a>
                                                </td>
                                                <td class="demo-theme-cell">
                                                    <select class="demo-theme-select" data-page-id="<?php echo esc_attr($page_id); ?>">
                                                        <optgroup label="<?php _e('Current Settings', 'flexframe-viewer'); ?>">
                                                            <option value="current" <?php selected($demo['theme_preset'], 'current'); ?>><?php _e('Use Current Theme & Settings', 'flexframe-viewer'); ?></option>
                                                        </optgroup>
                                                        <optgroup label="<?php _e('Built-in Themes', 'flexframe-viewer'); ?>">
                                                            <option value="dark" <?php selected($demo['theme_preset'], 'dark'); ?>><?php _e('Dark Spark', 'flexframe-viewer'); ?></option>
                                                            <option value="light_v3" <?php selected($demo['theme_preset'], 'light_v3'); ?>><?php _e('Light Theme - V3', 'flexframe-viewer'); ?></option>
                                                        </optgroup>
                                                        <?php if (!empty($custom_presets_list)) : ?>
                                                        <optgroup label="<?php _e('Your Custom Themes', 'flexframe-viewer'); ?>">
                                                            <?php foreach ($custom_presets_list as $pid => $p) : ?>
                                                                <option value="custom:<?php echo esc_attr($pid); ?>" <?php selected($demo['theme_preset'], 'custom:' . $pid); ?>>
                                                                    <?php echo esc_html($p['name']); ?>
                                                                </option>
                                                            <?php endforeach; ?>
                                                        </optgroup>
                                                        <?php endif; ?>
                                                    </select>
                                                    <button type="button" class="button button-small demo-update-theme-btn" data-page-id="<?php echo esc_attr($page_id); ?>">
                                                        <span class="dashicons dashicons-update" style="margin-top: 3px;"></span>
                                                        <?php _e('Apply', 'flexframe-viewer'); ?>
                                                    </button>
                                                </td>
                                                <td class="demo-actions-cell">
                                                    <a href="<?php echo esc_url($demo_url); ?>" target="_blank" class="button button-small" title="<?php _e('View', 'flexframe-viewer'); ?>">
                                                        <span class="dashicons dashicons-visibility" style="margin-top: 3px;"></span>
                                                    </a>
                                                    <button type="button" class="button button-small demo-refresh-btn" data-page-id="<?php echo esc_attr($page_id); ?>" title="<?php _e('Refresh snapshot to current settings', 'flexframe-viewer'); ?>">
                                                        <span class="dashicons dashicons-image-rotate" style="margin-top: 3px;"></span>
                                                    </button>
                                                    <button type="button" class="button button-small button-link-delete demo-delete-btn" data-page-id="<?php echo esc_attr($page_id); ?>" data-name="<?php echo esc_attr($demo['name']); ?>">
                                                        <span class="dashicons dashicons-trash" style="margin-top: 3px;"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <!-- Step 7: Client Access Management (Admin Only) -->
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="7">
                        <span class="step-number">7</span>
                        <h2><?php _e('Client Access', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Create login accounts for gym clients so they can access and customize their FlexFrame settings without WordPress admin access. Clients get a clean, branded settings page with Steps 1-5.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Login Page Info -->
                        <?php
                        $login_slug = get_option('flexframe_client_login_slug', 'flexframe-login');
                        $login_page = get_page_by_path($login_slug);
                        $login_url = $login_page ? get_permalink($login_page->ID) : home_url('/' . $login_slug . '/');
                        ?>
                        <div class="client-login-info">
                            <div class="client-login-url-box">
                                <span class="dashicons dashicons-admin-links"></span>
                                <div>
                                    <strong><?php _e('Client Login URL', 'flexframe-viewer'); ?></strong>
                                    <a href="<?php echo esc_url($login_url); ?>" target="_blank" id="client-login-url"><?php echo esc_html($login_url); ?></a>
                                </div>
                                <button type="button" class="button button-small" id="copy-login-url" title="Copy URL">
                                    <span class="dashicons dashicons-clipboard" style="margin-top: 3px;"></span>
                                </button>
                            </div>
                            <?php if (!$login_page) : ?>
                                <p class="description" style="color: #d63638;">
                                    <span class="dashicons dashicons-warning"></span>
                                    <?php _e('Login page not found. Click the button below to create it.', 'flexframe-viewer'); ?>
                                </p>
                                <button type="button" class="button button-secondary" id="create-login-page-btn">
                                    <span class="dashicons dashicons-admin-page" style="margin-top: 3px;"></span>
                                    <?php _e('Create Login Page', 'flexframe-viewer'); ?>
                                </button>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Login Page Shortcode -->
                        <div class="client-login-info" style="margin-top: 12px;">
                            <div class="client-login-url-box">
                                <span class="dashicons dashicons-shortcode"></span>
                                <div>
                                    <strong><?php _e('Login Page Shortcode', 'flexframe-viewer'); ?></strong>
                                    <code id="client-login-shortcode" style="display:inline-block;background:#f0f0f1;padding:3px 10px;border-radius:4px;font-size:13px;color:#1d2327;user-select:all;">[flexframe_login]</code>
                                    <p class="description" style="margin-top:4px;font-size:12px;color:#888;">
                                        <?php _e('Place this shortcode on any page to display a branded full-screen client login form. Uses your logo, primary color, and gradient background from the settings above.', 'flexframe-viewer'); ?>
                                    </p>
                                </div>
                                <button type="button" class="button button-small" id="copy-login-shortcode" title="Copy Shortcode">
                                    <span class="dashicons dashicons-clipboard" style="margin-top: 3px;"></span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Create New Client Account -->
                        <div class="flexframe-client-create-section">
                            <h3><span class="dashicons dashicons-admin-users"></span> <?php _e('Create Client Account', 'flexframe-viewer'); ?></h3>
                            <div class="client-create-form">
                                <div class="client-form-row">
                                    <div class="client-form-field">
                                        <label for="flexframe_client_name"><?php _e('Display Name', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_client_name" placeholder="<?php _e("e.g. Gold's Gym", 'flexframe-viewer'); ?>" />
                                    </div>
                                    <div class="client-form-field">
                                        <label for="flexframe_client_email"><?php _e('Email Address', 'flexframe-viewer'); ?></label>
                                        <input type="email" id="flexframe_client_email" placeholder="<?php _e('e.g. admin@goldsgym.com', 'flexframe-viewer'); ?>" />
                                    </div>
                                </div>
                                <div class="client-form-row">
                                    <div class="client-form-field">
                                        <label for="flexframe_client_username"><?php _e('Username', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_client_username" placeholder="<?php _e('e.g. goldsgym', 'flexframe-viewer'); ?>" />
                                    </div>
                                    <div class="client-form-field">
                                        <label for="flexframe_client_password"><?php _e('Password', 'flexframe-viewer'); ?></label>
                                        <div class="client-password-wrapper">
                                            <input type="text" id="flexframe_client_password" placeholder="<?php _e('Auto-generated or enter custom', 'flexframe-viewer'); ?>" />
                                            <button type="button" class="button button-small" id="generate-password-btn" title="Generate Password">
                                                <span class="dashicons dashicons-randomize" style="margin-top: 3px;"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="client-form-actions">
                                    <button type="button" class="button button-primary" id="create-client-btn">
                                        <span class="dashicons dashicons-plus-alt2" style="margin-top: 3px;"></span>
                                        <?php _e('Create Account', 'flexframe-viewer'); ?>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Existing Client Accounts -->
                        <div class="flexframe-client-list-section">
                            <h3><span class="dashicons dashicons-groups"></span> <?php _e('Client Accounts', 'flexframe-viewer'); ?></h3>
                            <div id="flexframe-client-accounts-list">
                                <?php
                                $client_users = get_users(array('role' => 'flexframe_manager'));
                                if (empty($client_users)) :
                                ?>
                                    <div class="client-empty-state">
                                        <span class="dashicons dashicons-admin-users"></span>
                                        <p><?php _e('No client accounts created yet. Create your first one above!', 'flexframe-viewer'); ?></p>
                                    </div>
                                <?php else : ?>
                                    <table class="client-accounts-table widefat striped">
                                        <thead>
                                            <tr>
                                                <th><?php _e('Name', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Username', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Email', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Last Login', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Actions', 'flexframe-viewer'); ?></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($client_users as $client) :
                                                $last_login = get_user_meta($client->ID, 'flexframe_last_login', true);
                                            ?>
                                                <tr data-user-id="<?php echo esc_attr($client->ID); ?>">
                                                    <td class="client-name-cell">
                                                        <span class="dashicons dashicons-admin-users" style="color: #999; margin-right: 4px;"></span>
                                                        <?php echo esc_html($client->display_name); ?>
                                                    </td>
                                                    <td><code><?php echo esc_html($client->user_login); ?></code></td>
                                                    <td><?php echo esc_html($client->user_email); ?></td>
                                                    <td>
                                                        <?php if ($last_login) : ?>
                                                            <?php echo esc_html(human_time_diff(strtotime($last_login), current_time('timestamp')) . ' ago'); ?>
                                                        <?php else : ?>
                                                            <span style="color: #999;"><?php _e('Never', 'flexframe-viewer'); ?></span>
                                                        <?php endif; ?>
                                                    </td>
                                                    <td class="client-actions-cell">
                                                        <button type="button" class="button button-small client-reset-pw-btn" data-user-id="<?php echo esc_attr($client->ID); ?>" data-name="<?php echo esc_attr($client->display_name); ?>" title="<?php _e('Reset Password', 'flexframe-viewer'); ?>">
                                                            <span class="dashicons dashicons-lock" style="margin-top: 3px;"></span>
                                                        </button>
                                                        <button type="button" class="button button-small button-link-delete client-delete-btn" data-user-id="<?php echo esc_attr($client->ID); ?>" data-name="<?php echo esc_attr($client->display_name); ?>" title="<?php _e('Delete Account', 'flexframe-viewer'); ?>">
                                                            <span class="dashicons dashicons-trash" style="margin-top: 3px;"></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?><!-- End Super-Admin Steps 6 & 7 -->
                
                <!-- Step 8: Model Tester (Super Admin Only) -->
                <?php if (flexframe_is_super_admin()) : ?>
                <div class="flexframe-step-section collapsed">
                    <div class="flexframe-step-header" data-step="8">
                        <span class="step-number">8</span>
                        <h2><?php _e('Model Tester', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Upload a GLB model directly to test it in the viewer without deploying to the CDN. When enabled, the test model will override the default exercise model. The viewer will show a detailed material inspector overlay.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <div class="flexframe-model-tester-section">
                            <!-- Enable/Disable Toggle -->
                            <div class="model-tester-toggle-row">
                                <label class="toggle-switch">
                                    <input type="checkbox" 
                                           id="flexframe_test_model_enabled" 
                                           name="flexframe_test_model_enabled" 
                                           value="1" 
                                           <?php checked(1, get_option('flexframe_test_model_enabled', 0)); ?> />
                                    <span class="toggle-slider"></span>
                                </label>
                                <div style="display:flex; flex-direction:column; gap:2px;">
                                    <strong><?php _e('Enable Test Model', 'flexframe-viewer'); ?></strong>
                                    <span class="description" style="font-size:12px; color:#757575;"><?php _e('When enabled, the test model loads in the viewer instead of the CDN model', 'flexframe-viewer'); ?></span>
                                </div>
                            </div>
                            
                            <!-- Upload Section -->
                            <div class="model-tester-upload-section">
                                <label for="flexframe_test_model_url"><strong><?php _e('Test Model URL:', 'flexframe-viewer'); ?></strong></label>
                                <div class="model-tester-input-row">
                                    <input type="url" 
                                           id="flexframe_test_model_url" 
                                           name="flexframe_test_model_url" 
                                           value="<?php echo esc_attr(get_option('flexframe_test_model_url', '')); ?>" 
                                           class="regular-text" 
                                           placeholder="https://yoursite.com/wp-content/uploads/model.glb" />
                                    <button type="button" class="button button-primary" id="flexframe_upload_test_model_button">
                                        <span class="dashicons dashicons-upload" style="margin-top: 4px;"></span>
                                        <?php _e('Upload GLB', 'flexframe-viewer'); ?>
                                    </button>
                                    <?php 
                                    $current_test_url = get_option('flexframe_test_model_url', '');
                                    $remove_style = empty($current_test_url) ? 'display:none;' : '';
                                    ?>
                                    <button type="button" class="button button-secondary" id="flexframe_remove_test_model_button" style="<?php echo $remove_style; ?>">
                                        <span class="dashicons dashicons-no" style="margin-top: 4px;"></span>
                                        <?php _e('Remove', 'flexframe-viewer'); ?>
                                    </button>
                                </div>
                                <p class="description"><?php _e('Upload a .glb file from your computer or paste a direct URL. Max file size depends on your WordPress upload settings.', 'flexframe-viewer'); ?></p>
                            </div>
                            
                            <!-- Model Info Preview -->
                            <?php 
                            $test_model_url_val = get_option('flexframe_test_model_url', '');
                            if (!empty($test_model_url_val)) : 
                                $attachment_id_val = attachment_url_to_postid($test_model_url_val);
                                $file_size_str = '';
                                $upload_date_str = '';
                                if ($attachment_id_val) {
                                    $file_path_val = get_attached_file($attachment_id_val);
                                    if ($file_path_val && file_exists($file_path_val)) {
                                        $bytes_val = filesize($file_path_val);
                                        if ($bytes_val >= 1048576) {
                                            $file_size_str = round($bytes_val / 1048576, 2) . ' MB';
                                        } else {
                                            $file_size_str = round($bytes_val / 1024, 2) . ' KB';
                                        }
                                    }
                                    $upload_date_str = get_the_date('M j, Y', $attachment_id_val);
                                }
                            ?>
                            <div class="model-tester-info-card">
                                <div class="model-info-header">
                                    <span class="dashicons dashicons-media-code"></span>
                                    <strong><?php _e('Uploaded Model', 'flexframe-viewer'); ?></strong>
                                </div>
                                <div class="model-info-details">
                                    <div class="model-info-row">
                                        <span class="info-label"><?php _e('URL:', 'flexframe-viewer'); ?></span>
                                        <code class="info-value model-url-truncate"><?php echo esc_html($test_model_url_val); ?></code>
                                    </div>
                                    <?php if (!empty($file_size_str)) : ?>
                                    <div class="model-info-row">
                                        <span class="info-label"><?php _e('File Size:', 'flexframe-viewer'); ?></span>
                                        <span class="info-value"><?php echo esc_html($file_size_str); ?></span>
                                    </div>
                                    <?php endif; ?>
                                    <?php if (!empty($upload_date_str)) : ?>
                                    <div class="model-info-row">
                                        <span class="info-label"><?php _e('Uploaded:', 'flexframe-viewer'); ?></span>
                                        <span class="info-value"><?php echo esc_html($upload_date_str); ?></span>
                                    </div>
                                    <?php endif; ?>
                                </div>
                                <p class="model-tester-instructions">
                                    <span class="dashicons dashicons-info"></span>
                                    <?php _e('Save settings, then click the button below to open the viewer. The test model will load with a <strong>Model Inspector</strong> panel showing all materials, mesh info, and file details.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            <?php endif; ?>
                            
                            <!-- Open Viewer Button -->
                            <div class="model-tester-open-viewer">
                                <a href="<?php echo esc_url($viewer_page_url); ?>" target="_blank" class="button button-hero button-primary" id="flexframe-open-test-viewer">
                                    <span class="dashicons dashicons-visibility" style="margin-top: 8px; margin-right: 4px;"></span>
                                    <?php _e('Open Viewer to Test Model', 'flexframe-viewer'); ?>
                                </a>
                                <p class="description" style="margin-top: 8px;">
                                    <?php _e('Make sure to <strong>Save Settings</strong> first, then click above to open the viewer in a new tab. The Model Inspector overlay will appear automatically.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <!-- Material Name Reference -->
                            <div class="model-tester-reference">
                                <div class="reference-toggle" id="model-tester-reference-toggle">
                                    <span class="dashicons dashicons-editor-table"></span>
                                    <strong><?php _e('Material Name Reference', 'flexframe-viewer'); ?></strong>
                                    <span class="toggle-hint"><?php _e('(click to expand)', 'flexframe-viewer'); ?></span>
                                </div>
                                <div class="reference-content" id="model-tester-reference-content" style="display: none;">
                                    <p class="description"><?php _e('Name your materials in Blender using these exact names for automatic theme integration:', 'flexframe-viewer'); ?></p>
                                    <table class="material-reference-table widefat">
                                        <thead>
                                            <tr>
                                                <th><?php _e('Blender Material Name', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('Theme Editor Section', 'flexframe-viewer'); ?></th>
                                                <th><?php _e('What Happens', 'flexframe-viewer'); ?></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td><code>SKIN</code></td><td><?php _e('Skin Material', 'flexframe-viewer'); ?></td><td><?php _e('Converted to transmissive glass-like body material', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>MUSCLE</code></td><td><em><?php _e('Preset only', 'flexframe-viewer'); ?></em></td><td><?php _e('Sheen-based red muscle material with bump mapping', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>SKELETON</code></td><td><em><?php _e('Preset only', 'flexframe-viewer'); ?></em></td><td><?php _e('Matte bone material with high roughness', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>BARBELL</code></td><td><?php _e('Barbell Material', 'flexframe-viewer'); ?></td><td><?php _e('Metallic barbell bar finish', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>BUMPER</code></td><td><?php _e('Bumper Plates', 'flexframe-viewer'); ?></td><td><?php _e('Matte rubber bumper plate material', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>CABLE</code></td><td><?php _e('Cable Material', 'flexframe-viewer'); ?></td><td><?php _e('Semi-metallic cable/wire material', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>CHROME</code></td><td><?php _e('Chrome Material', 'flexframe-viewer'); ?></td><td><?php _e('Highly reflective chrome finish (no textures)', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>COLOR_1</code></td><td><?php _e('Brand Color', 'flexframe-viewer'); ?></td><td><?php _e('Uses primary brand color from settings', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>METAL</code></td><td><?php _e('Metal Material', 'flexframe-viewer'); ?></td><td><?php _e('General metallic surface material', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>PAD</code></td><td><?php _e('Pad / Cushion', 'flexframe-viewer'); ?></td><td><?php _e('Dark matte cushion/upholstery material', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>PLASTIC</code></td><td><?php _e('Plastic Material', 'flexframe-viewer'); ?></td><td><?php _e('Smooth non-metallic plastic finish', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>RUBBER</code></td><td><?php _e('Rubber Material', 'flexframe-viewer'); ?></td><td><?php _e('High-roughness rubber surface', 'flexframe-viewer'); ?></td></tr>
                                            <tr><td><code>LOGO</code></td><td><?php _e('Logo (Step 2)', 'flexframe-viewer'); ?></td><td><?php _e('Your uploaded logo texture is applied to this surface', 'flexframe-viewer'); ?></td></tr>
                                        </tbody>
                                    </table>
                                    <p class="description" style="margin-top: 8px;">
                                        <?php _e('💡 Material names are case-insensitive. Any material not in this list will keep its original GLB appearance.', 'flexframe-viewer'); ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?><!-- End Step 8 -->
                
                <!-- Step 9: Workout Builder Page -->
                <div class="flexframe-step-section flexframe-step-section--page-tool collapsed">
                    <div class="flexframe-step-header" data-step="9">
                        <span class="page-tool-icon dashicons dashicons-list-view"></span>
                        <h2><?php _e('Workout Builder Page', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Create a full-screen Workout Builder page where users can search exercises, build custom workouts, and share them via a link. The page will have no sidebars, headers, or footers.', 'flexframe-viewer'); ?>
                        </p>

                        <!-- ── Sub-panel 1: Setup ── -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header" data-target="workout-setup-content">
                                <h4><span class="dashicons dashicons-admin-tools"></span> <?php _e('Setup', 'flexframe-viewer'); ?></h4>
                                <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                            </div>
                            <div class="custom-panel-content" id="workout-setup-content">
                                <div class="flexframe-getting-started" style="border:none; box-shadow:none; padding: 0; margin: 0;">
                                    <p class="getting-started-desc" style="margin-top:0;">
                                        <?php _e('Add the Workout Builder to any page using the shortcode below, or generate a full-screen workout builder page automatically.', 'flexframe-viewer'); ?>
                                    </p>
                                    
                                    <!-- Shortcode Display Box -->
                                    <div class="flexframe-shortcode-box">
                                        <div class="shortcode-display">
                                            <code id="flexframe-workout-shortcode">[flexframe_workout_builder]</code>
                                            <button type="button" class="button button-small copy-shortcode-btn" data-shortcode="[flexframe_workout_builder]" title="<?php _e('Copy to clipboard', 'flexframe-viewer'); ?>">
                                                <span class="dashicons dashicons-clipboard"></span>
                                            </button>
                                        </div>
                                        <span class="copy-success" style="display: none; color: #00a32a; margin-left: 8px;">✓ <?php _e('Copied!', 'flexframe-viewer'); ?></span>
                                    </div>
                                    
                                    <!-- Quick Create Button -->
                                    <div class="flexframe-create-page-row">
                                        <button type="button" id="flexframe-create-workout-page" class="button button-primary button-hero">
                                            <span class="dashicons dashicons-plus-alt" style="margin-top: 5px; margin-right: 5px;"></span>
                                            <?php _e('Create Workout Builder Page', 'flexframe-viewer'); ?>
                                        </button>
                                        <span id="flexframe-create-workout-page-status" style="margin-left: 10px; line-height: 46px;"></span>
                                    </div>
                                    <p class="description" style="margin-top: 8px;">
                                        <?php _e('Click to automatically create a full-screen page with the Workout Builder shortcode.', 'flexframe-viewer'); ?>
                                    </p>
                                </div>
                                
                                <!-- Workout Page URL Section -->
                                <div class="flexframe-viewer-url-setting" style="margin-top: 16px;">
                                    <label for="flexframe_workout_page_url"><strong><?php _e('Workout Page URL:', 'flexframe-viewer'); ?></strong></label>
                                    <div class="url-input-row">
                                        <input type="url" id="flexframe_workout_page_url" name="flexframe_workout_page_url" 
                                               value="<?php echo esc_attr(get_option('flexframe_workout_page_url', '')); ?>" 
                                               class="regular-text"
                                               placeholder="https://yoursite.com/workout-builder/" />
                                    </div>
                                    <p class="description" id="flexframe-workout-url-status">
                                        <?php 
                                        $workout_page_url = get_option('flexframe_workout_page_url', '');
                                        if (!empty($workout_page_url)): ?>
                                            <span style="color: #00a32a; font-size: 14px;">✓ <?php _e('Workout page URL is set.', 'flexframe-viewer'); ?></span>
                                            <a href="<?php echo esc_url($workout_page_url); ?>" target="_blank" class="button button-secondary" style="margin-left: 12px;"><?php _e('View Page →', 'flexframe-viewer'); ?></a>
                                        <?php else: ?>
                                            <span style="color: #d63638;">⚠ <?php _e('No workout page set. Create one above or paste your URL here.', 'flexframe-viewer'); ?></span>
                                        <?php endif; ?>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ── Sub-panel 2: Privacy Policy ── -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header" data-target="workout-privacy-content">
                                <h4><span class="dashicons dashicons-shield"></span> <?php _e('Privacy Policy', 'flexframe-viewer'); ?></h4>
                                <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                            </div>
                            <div class="custom-panel-content" id="workout-privacy-content">
                                <p style="margin: 0 0 12px; color: #666; font-size: 13px;">Set the URL of your privacy policy page. This link appears on the share modal. You can create a default page with comprehensive GDPR content, or link to your own.</p>

                                <div class="flexframe-create-page-row" style="margin-bottom: 12px;">
                                    <button type="button" id="flexframe-create-privacy-page" class="button button-secondary">
                                        <span class="dashicons dashicons-shield" style="margin-top: 3px; margin-right: 4px;"></span>
                                        <?php _e('Create Default Privacy Policy Page', 'flexframe-viewer'); ?>
                                    </button>
                                    <span id="flexframe-create-privacy-page-status" style="margin-left: 10px; line-height: 30px;"></span>
                                </div>

                                <div class="flexframe-viewer-url-setting">
                                    <label for="flexframe_privacy_policy_url"><strong><?php _e('Privacy Policy URL:', 'flexframe-viewer'); ?></strong></label>
                                    <div class="url-input-row">
                                        <input type="url" id="flexframe_privacy_policy_url" name="flexframe_privacy_policy_url"
                                               value="<?php echo esc_attr(get_option('flexframe_privacy_policy_url', '')); ?>"
                                               class="regular-text"
                                               placeholder="https://yoursite.com/privacy-policy/" />
                                    </div>
                                    <p class="description" id="flexframe-privacy-url-status">
                                        <?php
                                        $privacy_url = get_option('flexframe_privacy_policy_url', '');
                                        if (!empty($privacy_url)): ?>
                                            <span style="color: #00a32a; font-size: 14px;">✓ <?php _e('Privacy policy URL is set.', 'flexframe-viewer'); ?></span>
                                            <a href="<?php echo esc_url($privacy_url); ?>" target="_blank" class="button button-secondary" style="margin-left: 12px;"><?php _e('View Page →', 'flexframe-viewer'); ?></a>
                                        <?php else: ?>
                                            <span style="color: #d63638;">⚠ <?php _e('No privacy policy set. Create one above or paste your URL here.', 'flexframe-viewer'); ?></span>
                                        <?php endif; ?>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ── Sub-panel 3: Email Captures ── -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header" data-target="workout-emails-content">
                                <h4><span class="dashicons dashicons-email-alt"></span> <?php _e('Email Captures', 'flexframe-viewer'); ?></h4>
                                <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                            </div>
                            <div class="custom-panel-content" id="workout-emails-content">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                                    <p style="margin: 0; color: #666; font-size: 13px;">All captured leads — from workout sharing and dashboard contact forms. Includes marketing consent status.</p>
                                    <div style="display: flex; gap: 8px;">
                                        <button type="button" class="button button-secondary" id="flexframe-refresh-email-captures">
                                            <span class="dashicons dashicons-update" style="vertical-align: middle; margin-right: 4px;"></span> Refresh
                                        </button>
                                        <a href="<?php echo admin_url('admin-ajax.php?action=flexframe_export_email_captures'); ?>" class="button button-secondary" id="flexframe-export-emails">
                                            <span class="dashicons dashicons-download" style="vertical-align: middle; margin-right: 4px;"></span> Export CSV
                                        </a>
                                    </div>
                                </div>
                                <div id="flexframe-email-captures-container">
                                    <table class="wp-list-table widefat fixed striped" id="flexframe-email-captures-table" style="margin-bottom: 12px;">
                                        <thead>
                                            <tr>
                                                <th style="width: 6%;">Source</th>
                                                <th style="width: 15%;">Email</th>
                                                <th style="width: 9%;">Name</th>
                                                <th style="width: 7%;">Phone</th>
                                                <th style="width: 6%;">Consent</th>
                                                <th style="width: 6%;">Day Pass</th>
                                                <th style="width: 5%;">Wkts</th>
                                                <th style="width: 15%;">Message / Workout Links</th>
                                                <th style="width: 10%;">Last Workout</th>
                                                <th style="width: 12%;">Last Active</th>
                                                <th style="width: 9%;">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td colspan="11" style="text-align: center; padding: 20px; color: #666;">Click "Refresh" to load email captures.</td></tr>
                                        </tbody>
                                    </table>
                                    <div id="flexframe-email-pagination" style="text-align: center;"></div>
                                    <p id="flexframe-email-total" style="color: #666; font-size: 13px; margin-top: 4px;"></p>
                                </div>
                            </div>
                        </div>

                        <!-- ── Sub-panel 4: Saved Workouts ── -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header" data-target="workout-saved-content">
                                <h4><span class="dashicons dashicons-clipboard"></span> <?php _e('Saved Workouts', 'flexframe-viewer'); ?></h4>
                                <span class="toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                            </div>
                            <div class="custom-panel-content" id="workout-saved-content">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                                    <p style="margin: 0; color: #666; font-size: 13px;">Workouts created by logged-in users. These are stored permanently and not auto-deleted.</p>
                                    <div style="display: flex; gap: 8px;">
                                        <button type="button" class="button button-secondary" id="flexframe-refresh-saved-workouts">
                                            <span class="dashicons dashicons-update" style="vertical-align: middle; margin-right: 4px;"></span> Refresh
                                        </button>
                                    </div>
                                </div>
                                <div id="flexframe-saved-workouts-container">
                                    <table class="wp-list-table widefat fixed striped" id="flexframe-saved-workouts-table" style="margin-bottom: 12px;">
                                        <thead>
                                            <tr>
                                                <th style="width: 18%;">Workout Name</th>
                                                <th style="width: 10%;">Author</th>
                                                <th style="width: 6%;">Exercises</th>
                                                <th style="width: 6%;">Views</th>
                                                <th style="width: 5%;">Likes</th>
                                                <th style="width: 8%;">Visibility</th>
                                                <th style="width: 17%;">Share Link</th>
                                                <th style="width: 11%;">Created</th>
                                                <th style="width: 11%;">Last Active</th>
                                                <th style="width: 8%;">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td colspan="10" style="text-align: center; padding: 20px; color: #666;">Click "Refresh" to load saved workouts.</td></tr>
                                        </tbody>
                                    </table>
                                    <div id="flexframe-workout-pagination" style="text-align: center;"></div>
                                    <p id="flexframe-workout-total" style="color: #666; font-size: 13px; margin-top: 4px;"></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- End Step 9 -->
                
                <!-- Step 10: Dashboard Page -->
                <?php
                $dashboard_page_url = get_option('flexframe_dashboard_page_url', '');
                $dashboard_tagline = get_option('flexframe_dashboard_tagline', 'Your Fitness Journey Starts Here');
                
                // Button settings
                $btn1_enabled = get_option('flexframe_dash_btn1_enabled', true);
                $btn1_label   = get_option('flexframe_dash_btn1_label', 'Exercise Viewer');
                $btn1_url     = get_option('flexframe_dash_btn1_url', '');
                
                $btn2_enabled = get_option('flexframe_dash_btn2_enabled', true);
                $btn2_label   = get_option('flexframe_dash_btn2_label', 'Workout Builder');
                $btn2_url     = get_option('flexframe_dash_btn2_url', '');
                
                $btn3_enabled = get_option('flexframe_dash_btn3_enabled', true);
                $btn3_label   = get_option('flexframe_dash_btn3_label', 'Visit Our Website');
                $btn3_url     = get_option('flexframe_dash_btn3_url', '');
                
                $login_enabled = get_option('flexframe_dash_login_enabled', true);
                $login_label   = get_option('flexframe_dash_login_label', 'Client Login');
                $login_url     = get_option('flexframe_dash_login_url', '');
                
                // Lead capture settings
                $lead_capture_mode        = get_option('flexframe_lead_capture_mode', 'off');
                $lead_capture_heading     = get_option('flexframe_lead_capture_heading', 'Stay Connected');
                $lead_capture_description = get_option('flexframe_lead_capture_description', 'Enter your email to get updates and exclusive offers.');
                $lead_capture_button_text = get_option('flexframe_lead_capture_button_text', 'Submit');
                $lead_capture_success_msg = get_option('flexframe_lead_capture_success_msg', "Thanks! We'll be in touch.");
                $lead_capture_consent_text = get_option('flexframe_lead_capture_consent_text', 'I agree to receive marketing emails');
                $lead_capture_show_phone  = get_option('flexframe_lead_capture_show_phone', false);
                ?>
                <div class="flexframe-step-section flexframe-step-section--page-tool collapsed">
                    <div class="flexframe-step-header" data-step="10">
                        <span class="page-tool-icon dashicons dashicons-dashboard"></span>
                        <h2><?php _e('Dashboard Page', 'flexframe-viewer'); ?></h2>
                        <span class="step-toggle-icon dashicons dashicons-arrow-down-alt2"></span>
                        <button type="submit" class="button button-primary step-save-btn">
                            <span class="dashicons dashicons-saved"></span><?php _e('Save Settings', 'flexframe-viewer'); ?>
                        </button>
                    </div>
                    <div class="flexframe-step-content" style="display: none;">
                        <p class="step-description">
                            <?php _e('Create a branded full-screen dashboard page that serves as the main hub for your fitness app. It displays your logo, uses your theme colors, and provides configurable navigation buttons.', 'flexframe-viewer'); ?>
                        </p>
                        
                        <!-- Dashboard Setup -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header">
                                <span class="getting-started-icon">🏠</span>
                                <h3><?php _e('Dashboard Setup', 'flexframe-viewer'); ?></h3>
                            </div>
                            
                            <!-- Shortcode Display Box -->
                            <div class="flexframe-shortcode-box">
                                <div class="shortcode-display">
                                    <code id="flexframe-dashboard-shortcode">[flexframe_dashboard]</code>
                                    <button type="button" class="button button-small copy-shortcode-btn" data-shortcode="[flexframe_dashboard]" title="<?php _e('Copy to clipboard', 'flexframe-viewer'); ?>">
                                        <span class="dashicons dashicons-clipboard"></span>
                                    </button>
                                </div>
                                <span class="copy-success" style="display: none; color: #00a32a; margin-left: 8px;">✓ <?php _e('Copied!', 'flexframe-viewer'); ?></span>
                            </div>
                            
                            <!-- Quick Create Button -->
                            <div class="flexframe-create-page-row">
                                <button type="button" id="flexframe-create-dashboard-page" class="button button-primary button-hero">
                                    <span class="dashicons dashicons-plus-alt" style="margin-top: 5px; margin-right: 5px;"></span>
                                    <?php _e('Create Dashboard Page', 'flexframe-viewer'); ?>
                                </button>
                                <span id="flexframe-create-dashboard-page-status" style="margin-left: 10px; line-height: 46px;"></span>
                            </div>
                            <p class="description" style="margin-top: 8px;">
                                <?php _e('Click to automatically create a new full-screen dashboard page.', 'flexframe-viewer'); ?>
                            </p>
                            
                            <!-- Dashboard Page URL -->
                            <div class="flexframe-viewer-url-setting" style="margin-top: 20px;">
                                <label for="flexframe_dashboard_page_url"><strong><?php _e('Dashboard Page URL:', 'flexframe-viewer'); ?></strong></label>
                                <div class="url-input-row">
                                    <input type="url" id="flexframe_dashboard_page_url" name="flexframe_dashboard_page_url" 
                                           value="<?php echo esc_attr($dashboard_page_url); ?>" 
                                           class="regular-text"
                                           placeholder="https://yoursite.com/dashboard/" />
                                </div>
                                <p class="description" id="flexframe-dashboard-url-status">
                                    <?php if (!empty($dashboard_page_url)): ?>
                                        <span style="color: #00a32a; font-size: 14px;">✓ <?php _e('Dashboard page URL is set.', 'flexframe-viewer'); ?></span>
                                        <a href="<?php echo esc_url($dashboard_page_url); ?>" target="_blank" class="button button-secondary" style="margin-left: 12px;"><?php _e('View Page →', 'flexframe-viewer'); ?></a>
                                    <?php else: ?>
                                        <span style="color: #d63638;">⚠ <?php _e('No dashboard page set. Create one above or paste your URL here.', 'flexframe-viewer'); ?></span>
                                    <?php endif; ?>
                                </p>
                            </div>
                        </div>
                        
                        <!-- Navigation Buttons -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header">
                                <span class="getting-started-icon">🔗</span>
                                <h3><?php _e('Navigation Buttons', 'flexframe-viewer'); ?></h3>
                            </div>
                            <p class="description" style="margin-bottom: 16px;">
                                <?php _e('Toggle buttons on or off and assign custom URLs and labels for each navigation button on the dashboard.', 'flexframe-viewer'); ?>
                            </p>
                            
                            <!-- Button 1: Exercise Viewer -->
                            <div style="padding: 16px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <label class="toggle-switch" style="flex-shrink: 0;">
                                        <input type="hidden" name="flexframe_dash_btn1_enabled" value="0">
                                        <input type="checkbox" name="flexframe_dash_btn1_enabled" value="1" <?php checked($btn1_enabled); ?>>
                                        <span class="toggle-slider"></span>
                                    </label>
                                    <strong style="font-size: 14px;">🏋️ <?php _e('Button 1: Exercise Viewer', 'flexframe-viewer'); ?></strong>
                                </div>
                                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                    <div style="flex: 1; min-width: 200px;">
                                        <label for="flexframe_dash_btn1_label" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('Label:', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_dash_btn1_label" name="flexframe_dash_btn1_label" 
                                               value="<?php echo esc_attr($btn1_label); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="Exercise Viewer" />
                                    </div>
                                    <div style="flex: 2; min-width: 300px;">
                                        <label for="flexframe_dash_btn1_url" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('URL:', 'flexframe-viewer'); ?></label>
                                        <input type="url" id="flexframe_dash_btn1_url" name="flexframe_dash_btn1_url" 
                                               value="<?php echo esc_attr($btn1_url); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="https://yoursite.com/exercise-viewer/" />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Button 2: Workout Builder -->
                            <div style="padding: 16px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <label class="toggle-switch" style="flex-shrink: 0;">
                                        <input type="hidden" name="flexframe_dash_btn2_enabled" value="0">
                                        <input type="checkbox" name="flexframe_dash_btn2_enabled" value="1" <?php checked($btn2_enabled); ?>>
                                        <span class="toggle-slider"></span>
                                    </label>
                                    <strong style="font-size: 14px;">📋 <?php _e('Button 2: Workout Builder', 'flexframe-viewer'); ?></strong>
                                </div>
                                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                    <div style="flex: 1; min-width: 200px;">
                                        <label for="flexframe_dash_btn2_label" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('Label:', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_dash_btn2_label" name="flexframe_dash_btn2_label" 
                                               value="<?php echo esc_attr($btn2_label); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="Workout Builder" />
                                    </div>
                                    <div style="flex: 2; min-width: 300px;">
                                        <label for="flexframe_dash_btn2_url" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('URL:', 'flexframe-viewer'); ?></label>
                                        <input type="url" id="flexframe_dash_btn2_url" name="flexframe_dash_btn2_url" 
                                               value="<?php echo esc_attr($btn2_url); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="https://yoursite.com/workout-builder/" />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Button 3: Gym Website -->
                            <div style="padding: 16px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <label class="toggle-switch" style="flex-shrink: 0;">
                                        <input type="hidden" name="flexframe_dash_btn3_enabled" value="0">
                                        <input type="checkbox" name="flexframe_dash_btn3_enabled" value="1" <?php checked($btn3_enabled); ?>>
                                        <span class="toggle-slider"></span>
                                    </label>
                                    <strong style="font-size: 14px;">🌐 <?php _e('Button 3: Visit Website', 'flexframe-viewer'); ?></strong>
                                </div>
                                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                    <div style="flex: 1; min-width: 200px;">
                                        <label for="flexframe_dash_btn3_label" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('Label:', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_dash_btn3_label" name="flexframe_dash_btn3_label" 
                                               value="<?php echo esc_attr($btn3_label); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="Visit Our Website" />
                                    </div>
                                    <div style="flex: 2; min-width: 300px;">
                                        <label for="flexframe_dash_btn3_url" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('URL:', 'flexframe-viewer'); ?></label>
                                        <input type="url" id="flexframe_dash_btn3_url" name="flexframe_dash_btn3_url" 
                                               value="<?php echo esc_attr($btn3_url); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="https://www.yourgym.com/" />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Button 4: Admin Login -->
                            <div style="padding: 16px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <label class="toggle-switch" style="flex-shrink: 0;">
                                        <input type="hidden" name="flexframe_dash_login_enabled" value="0">
                                        <input type="checkbox" name="flexframe_dash_login_enabled" value="1" <?php checked($login_enabled); ?>>
                                        <span class="toggle-slider"></span>
                                    </label>
                                    <strong style="font-size: 14px;">🔒 <?php _e('Button 4: Client Login', 'flexframe-viewer'); ?></strong>
                                </div>
                                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                    <div style="flex: 1; min-width: 200px;">
                                        <label for="flexframe_dash_login_label" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('Label:', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_dash_login_label" name="flexframe_dash_login_label" 
                                               value="<?php echo esc_attr($login_label); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="Client Login" />
                                    </div>
                                    <div style="flex: 2; min-width: 300px;">
                                        <label for="flexframe_dash_login_url" style="display: block; margin-bottom: 4px; font-size: 12px; color: #666;"><?php _e('URL:', 'flexframe-viewer'); ?></label>
                                        <input type="url" id="flexframe_dash_login_url" name="flexframe_dash_login_url" 
                                               value="<?php echo esc_attr($login_url); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="https://yoursite.com/login/" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Dashboard Customization -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header">
                                <span class="getting-started-icon">✏️</span>
                                <h3><?php _e('Customization', 'flexframe-viewer'); ?></h3>
                            </div>
                            
                            <div class="flexframe-viewer-url-setting">
                                <label for="flexframe_dashboard_tagline"><strong><?php _e('Dashboard Tagline:', 'flexframe-viewer'); ?></strong></label>
                                <div class="url-input-row">
                                    <input type="text" id="flexframe_dashboard_tagline" name="flexframe_dashboard_tagline" 
                                           value="<?php echo esc_attr($dashboard_tagline); ?>" 
                                           class="regular-text"
                                           placeholder="Your Fitness Journey Starts Here" />
                                </div>
                                <p class="description">
                                    <?php _e('A short tagline displayed below the logo on the dashboard page.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <div style="margin-top: 20px; padding: 16px; background: #f0f6fc; border-left: 4px solid #2271b1; border-radius: 4px;">
                                <p style="margin: 0; font-size: 13px; color: #1d2327;">
                                    <strong><?php _e('Note:', 'flexframe-viewer'); ?></strong>
                                    <?php _e('The dashboard automatically uses your logo (Step 2), primary color (Step 3), and background settings (Step 6).', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                        </div>
                        
                        <!-- Lead Capture -->
                        <div class="custom-panel-section">
                            <div class="custom-panel-header">
                                <span class="getting-started-icon">📧</span>
                                <h3><?php _e('Lead Capture', 'flexframe-viewer'); ?></h3>
                            </div>
                            <p class="description" style="margin-bottom: 16px;">
                                <?php _e('Display an email signup box or full contact form popup on your dashboard page to capture leads. All submissions are saved and can be exported from the Workout Builder → Email Captures panel.', 'flexframe-viewer'); ?>
                            </p>
                            
                            <!-- Mode Selection -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600;"><?php _e('Lead Capture Mode:', 'flexframe-viewer'); ?></label>
                                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                    <label style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: <?php echo $lead_capture_mode === 'off' ? '#f0f6fc' : '#f9f9f9'; ?>; border: 2px solid <?php echo $lead_capture_mode === 'off' ? '#2271b1' : '#e0e0e0'; ?>; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                                        <input type="radio" name="flexframe_lead_capture_mode" value="off" <?php checked($lead_capture_mode, 'off'); ?> style="margin: 0;">
                                        <span style="font-size: 13px;">🚫 <?php _e('Off', 'flexframe-viewer'); ?></span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: <?php echo $lead_capture_mode === 'email' ? '#f0f6fc' : '#f9f9f9'; ?>; border: 2px solid <?php echo $lead_capture_mode === 'email' ? '#2271b1' : '#e0e0e0'; ?>; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                                        <input type="radio" name="flexframe_lead_capture_mode" value="email" <?php checked($lead_capture_mode, 'email'); ?> style="margin: 0;">
                                        <span style="font-size: 13px;">📩 <?php _e('Email Capture', 'flexframe-viewer'); ?></span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: <?php echo $lead_capture_mode === 'contact' ? '#f0f6fc' : '#f9f9f9'; ?>; border: 2px solid <?php echo $lead_capture_mode === 'contact' ? '#2271b1' : '#e0e0e0'; ?>; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                                        <input type="radio" name="flexframe_lead_capture_mode" value="contact" <?php checked($lead_capture_mode, 'contact'); ?> style="margin: 0;">
                                        <span style="font-size: 13px;">📝 <?php _e('Contact Form Popup', 'flexframe-viewer'); ?></span>
                                    </label>
                                </div>
                                <p class="description" style="margin-top: 8px;">
                                    <?php _e('<strong>Email Capture</strong> — Shows an inline email input below the navigation buttons.<br><strong>Contact Form Popup</strong> — Adds a "Contact Us" button that opens a modal with name, email, phone (optional), and message fields.', 'flexframe-viewer'); ?>
                                </p>
                            </div>
                            
                            <!-- Lead Capture Customization (shown when mode != off) -->
                            <div id="lead-capture-options" style="<?php echo $lead_capture_mode === 'off' ? 'display:none;' : ''; ?>">
                                <div style="padding: 16px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px;">
                                    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
                                        <div style="flex: 1; min-width: 250px;">
                                            <label for="flexframe_lead_capture_heading" style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: #1d2327;"><?php _e('Heading Text:', 'flexframe-viewer'); ?></label>
                                            <input type="text" id="flexframe_lead_capture_heading" name="flexframe_lead_capture_heading" 
                                                   value="<?php echo esc_attr($lead_capture_heading); ?>" class="regular-text" style="width: 100%;"
                                                   placeholder="Stay Connected" />
                                        </div>
                                        <div style="flex: 1; min-width: 250px;">
                                            <label for="flexframe_lead_capture_button_text" style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: #1d2327;"><?php _e('Button Text:', 'flexframe-viewer'); ?></label>
                                            <input type="text" id="flexframe_lead_capture_button_text" name="flexframe_lead_capture_button_text" 
                                                   value="<?php echo esc_attr($lead_capture_button_text); ?>" class="regular-text" style="width: 100%;"
                                                   placeholder="Submit" />
                                        </div>
                                    </div>
                                    <div style="margin-bottom: 16px;">
                                        <label for="flexframe_lead_capture_description" style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: #1d2327;"><?php _e('Description Text:', 'flexframe-viewer'); ?></label>
                                        <input type="text" id="flexframe_lead_capture_description" name="flexframe_lead_capture_description" 
                                               value="<?php echo esc_attr($lead_capture_description); ?>" class="regular-text" style="width: 100%;"
                                               placeholder="Enter your email to get updates and exclusive offers." />
                                    </div>
                                    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
                                        <div style="flex: 1; min-width: 250px;">
                                            <label for="flexframe_lead_capture_success_msg" style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: #1d2327;"><?php _e('Success Message:', 'flexframe-viewer'); ?></label>
                                            <input type="text" id="flexframe_lead_capture_success_msg" name="flexframe_lead_capture_success_msg" 
                                                   value="<?php echo esc_attr($lead_capture_success_msg); ?>" class="regular-text" style="width: 100%;"
                                                   placeholder="Thanks! We'll be in touch." />
                                        </div>
                                        <div style="flex: 1; min-width: 250px;">
                                            <label for="flexframe_lead_capture_consent_text" style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: #1d2327;"><?php _e('Consent Checkbox Text:', 'flexframe-viewer'); ?></label>
                                            <input type="text" id="flexframe_lead_capture_consent_text" name="flexframe_lead_capture_consent_text" 
                                                   value="<?php echo esc_attr($lead_capture_consent_text); ?>" class="regular-text" style="width: 100%;"
                                                   placeholder="I agree to receive marketing emails" />
                                        </div>
                                    </div>
                                    
                                    <!-- Contact Form specific options -->
                                    <div id="lead-capture-contact-options" style="<?php echo $lead_capture_mode !== 'contact' ? 'display:none;' : ''; ?>padding-top: 12px; border-top: 1px dashed #ccd0d4;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <label class="toggle-switch" style="flex-shrink: 0;">
                                                <input type="hidden" name="flexframe_lead_capture_show_phone" value="0">
                                                <input type="checkbox" name="flexframe_lead_capture_show_phone" value="1" <?php checked($lead_capture_show_phone); ?>>
                                                <span class="toggle-slider"></span>
                                            </label>
                                            <span style="font-size: 13px;"><?php _e('Show Phone Number Field', 'flexframe-viewer'); ?></span>
                                        </div>
                                        <p class="description" style="margin-top: 6px;"><?php _e('When enabled, the contact form popup includes an optional phone number field.', 'flexframe-viewer'); ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <!-- End Step 10 -->
                
                <div class="flexframe-button-row">
                    <?php submit_button('Save Settings', 'primary', 'submit', false); ?>
                    <?php if ($is_admin_user) : ?>
                    <button type="button" class="button button-secondary" id="flexframe-export-settings" style="margin-left: 10px;">
                        <span class="dashicons dashicons-clipboard" style="vertical-align: middle; margin-right: 5px;"></span>
                        <?php _e('Export Settings to Clipboard', 'flexframe-viewer'); ?>
                    </button>
                    <span id="export-success-message" style="display: none; color: #00a32a; margin-left: 10px; line-height: 30px;">
                        ✓ <?php _e('Settings copied to clipboard!', 'flexframe-viewer'); ?>
                    </span>
                    <?php endif; ?>
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
        /* Page-tool variant (Workout Builder, Dashboard) — visually distinct from numbered setup steps */
        .flexframe-step-section--page-tool {
            border-color: #50575e;
            box-shadow: 0 1px 0 rgba(0,0,0,0.04);
        }
        .flexframe-step-section--page-tool .flexframe-step-header {
            background: linear-gradient(135deg, #2c3338 0%, #3c434a 100%);
            border-bottom-color: #1d2327;
        }
        .flexframe-step-section--page-tool .flexframe-step-header h2 {
            color: #fff;
        }
        .flexframe-step-section--page-tool .step-toggle-icon {
            color: #c3c4c7;
        }
        .flexframe-step-section--page-tool .page-tool-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.12);
            color: #fff;
            font-size: 22px;
        }
        .flexframe-step-section--page-tool .page-tool-icon::before {
            font-size: 22px;
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
        
        /* Visual Theme Editor CTA (Step 5) */
        
        .import-theme-section {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e2e4e7;
        }
        
        .import-theme-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .import-theme-label {
            display: inline-flex !important;
            align-items: center;
            gap: 4px;
            cursor: pointer;
        }
        
        .import-filename {
            font-size: 13px;
            color: #50575e;
            font-style: italic;
        }
        .visual-theme-editor-cta {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 28px;
            margin-bottom: 24px;
            color: #fff;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }
        .visual-theme-editor-cta .cta-content {
            display: flex;
            align-items: center;
            gap: 24px;
            flex-wrap: wrap;
        }
        .visual-theme-editor-cta .cta-icon {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 16px;
            flex-shrink: 0;
        }
        .visual-theme-editor-cta .cta-icon .dashicons {
            font-size: 40px;
            width: 40px;
            height: 40px;
        }
        .visual-theme-editor-cta .cta-text {
            flex: 1;
            min-width: 200px;
        }
        .visual-theme-editor-cta .cta-text h3 {
            margin: 0 0 8px 0;
            font-size: 20px;
            font-weight: 600;
            color: #fff;
        }
        .visual-theme-editor-cta .cta-text p {
            margin: 0;
            opacity: 0.9;
            font-size: 14px;
            line-height: 1.5;
        }
        .visual-theme-editor-cta .cta-action {
            flex-shrink: 0;
        }
        .visual-theme-editor-cta .open-theme-editor-btn {
            background: #fff !important;
            color: #667eea !important;
            border: none !important;
            padding: 14px 28px !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            border-radius: 8px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            transition: transform 0.2s, box-shadow 0.2s !important;
            text-decoration: none !important;
        }
        .visual-theme-editor-cta .open-theme-editor-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
            color: #5a67d8 !important;
        }
        .visual-theme-editor-cta .cta-warning {
            margin: 10px 0 0 0;
            font-size: 12px;
            color: #ffd700;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .visual-theme-editor-cta .cta-tip {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 13px;
            opacity: 0.85;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .visual-theme-editor-cta .cta-tip .dashicons {
            color: #ffd700;
        }
        
        /* Theme Settings Divider */
        .theme-settings-divider {
            display: flex;
            align-items: center;
            gap: 16px;
            margin: 32px 0;
        }
        .theme-settings-divider .divider-line {
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c3c4c7, transparent);
        }
        .theme-settings-divider .divider-text {
            font-size: 13px;
            font-weight: 600;
            color: #646970;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Manual Theme Settings Section */
        .manual-theme-settings {
            border: 1px solid #c3c4c7;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 24px;
        }
        .manual-settings-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
            background: #f6f7f7;
            border-bottom: 1px solid #c3c4c7;
            cursor: pointer;
            transition: background 0.2s;
        }
        .manual-settings-header:hover {
            background: #f0f0f1;
        }
        .manual-settings-header .dashicons {
            color: #646970;
        }
        .manual-settings-header h3 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #1d2327;
            flex: 1;
        }
        .manual-toggle-icon {
            color: #646970;
            transition: transform 0.3s;
        }
        .manual-theme-settings.collapsed .manual-toggle-icon {
            transform: rotate(-90deg);
        }
        .manual-settings-desc {
            padding: 12px 20px;
            margin: 0;
            color: #646970;
            font-size: 13px;
            background: #fafafa;
            border-bottom: 1px solid #eee;
        }
        .manual-theme-settings.collapsed .manual-settings-desc,
        .manual-theme-settings.collapsed .current-theme-indicator,
        .manual-theme-settings.collapsed .save-custom-theme-section,
        .manual-theme-settings.collapsed .flexframe-custom-panel {
            display: none !important;
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

        /* Embed Code Button */
        .embed-code-btn {
            padding: 6px 10px;
            font-size: 12px;
            cursor: pointer;
            background: #e26f2e;
            color: #fff;
            border: none;
            border-radius: 4px;
            transition: background 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 2px;
        }
        .embed-code-btn:hover {
            background: #c45d22;
        }

        /* ========== Embed Customizer Modal ========== */
        .embed-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.75);
            z-index: 100001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: embedFadeIn 0.2s ease;
        }
        @keyframes embedFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .embed-modal {
            background: #fff;
            border-radius: 12px;
            max-width: 720px;
            width: 94%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
            position: relative;
            animation: embedSlideUp 0.25s ease;
        }
        @keyframes embedSlideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .embed-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px 16px;
            border-bottom: 1px solid #e2e4e7;
        }
        .embed-modal-header h3 {
            margin: 0;
            font-size: 18px;
            color: #1d2327;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .embed-modal-header h3 .dashicons {
            color: #e26f2e;
            font-size: 22px;
            width: 22px;
            height: 22px;
        }
        .embed-modal-close {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #666;
            line-height: 1;
            padding: 0 4px;
            transition: color 0.2s;
        }
        .embed-modal-close:hover {
            color: #d63638;
        }
        .embed-modal-body {
            padding: 24px;
        }
        .embed-modal-body .embed-exercise-name {
            font-size: 14px;
            color: #646970;
            margin-bottom: 20px;
            padding: 8px 12px;
            background: #f6f7f7;
            border-radius: 6px;
            border-left: 3px solid #e26f2e;
        }

        /* Embed Options Grid */
        .embed-options-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 24px;
        }
        .embed-option-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .embed-option-group label {
            font-size: 13px;
            font-weight: 600;
            color: #1d2327;
        }
        .embed-option-group input[type="number"],
        .embed-option-group select {
            padding: 8px 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 13px;
            background: #fff;
            transition: border-color 0.2s;
        }
        .embed-option-group input[type="number"]:focus,
        .embed-option-group select:focus {
            border-color: #2271b1;
            outline: none;
            box-shadow: 0 0 0 1px #2271b1;
        }
        .embed-option-group.full-width {
            grid-column: 1 / -1;
        }

        /* Toggle switches */
        .embed-toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f1;
        }
        .embed-toggle-row:last-child {
            border-bottom: none;
        }
        .embed-toggle-label {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .embed-toggle-label span.label-title {
            font-size: 13px;
            font-weight: 500;
            color: #1d2327;
        }
        .embed-toggle-label span.label-desc {
            font-size: 11px;
            color: #999;
        }
        .embed-toggle-switch {
            position: relative;
            width: 40px;
            height: 22px;
            flex-shrink: 0;
        }
        .embed-toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .embed-toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #ccc;
            transition: 0.3s;
            border-radius: 22px;
        }
        .embed-toggle-slider:before {
            content: '';
            position: absolute;
            height: 16px;
            width: 16px;
            left: 3px;
            bottom: 3px;
            background: #fff;
            transition: 0.3s;
            border-radius: 50%;
        }
        .embed-toggle-switch input:checked + .embed-toggle-slider {
            background: #e26f2e;
        }
        .embed-toggle-switch input:checked + .embed-toggle-slider:before {
            transform: translateX(18px);
        }

        /* Embed toggles section */
        .embed-toggles-section {
            margin-bottom: 24px;
            padding: 16px;
            background: #fafafa;
            border-radius: 8px;
            border: 1px solid #e2e4e7;
        }
        .embed-toggles-section h4 {
            margin: 0 0 12px 0;
            font-size: 13px;
            font-weight: 600;
            color: #1d2327;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .embed-toggles-section h4 .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
            color: #e26f2e;
        }

        /* Embed Preview */
        .embed-preview-section {
            margin-bottom: 20px;
        }
        .embed-preview-section h4 {
            margin: 0 0 10px 0;
            font-size: 13px;
            font-weight: 600;
            color: #1d2327;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .embed-preview-section h4 .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
            color: #2271b1;
        }
        .embed-preview-frame {
            border: 2px dashed #ccc;
            border-radius: 8px;
            padding: 12px;
            background: #f9f9f9;
            text-align: center;
            overflow: hidden;
            transition: all 0.3s;
        }
        .embed-preview-frame iframe {
            border: none;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-width: 100%;
        }

        /* Embed Code Output */
        .embed-code-section h4 {
            margin: 0 0 10px 0;
            font-size: 13px;
            font-weight: 600;
            color: #1d2327;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .embed-code-section h4 .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
            color: #00a32a;
        }
        .embed-code-output {
            position: relative;
        }
        .embed-code-output textarea {
            width: 100%;
            min-height: 80px;
            padding: 12px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            line-height: 1.5;
            border: 1px solid #ccc;
            border-radius: 8px;
            background: #1d2327;
            color: #50fa7b;
            resize: vertical;
            box-sizing: border-box;
        }
        .embed-code-output textarea:focus {
            outline: none;
            border-color: #e26f2e;
            box-shadow: 0 0 0 1px #e26f2e;
        }
        .embed-code-actions {
            display: flex;
            gap: 10px;
            margin-top: 12px;
            justify-content: flex-end;
        }
        .embed-copy-btn {
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 500;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            background: #e26f2e;
            color: #fff;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .embed-copy-btn:hover {
            background: #c45d22;
        }
        .embed-copy-btn.copied {
            background: #00a32a;
        }
        .embed-copy-html-btn {
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid #ccc;
            border-radius: 6px;
            cursor: pointer;
            background: #fff;
            color: #1d2327;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .embed-copy-html-btn:hover {
            border-color: #2271b1;
            color: #2271b1;
        }

        /* Responsive embed preview scaling */
        @media (max-width: 782px) {
            .embed-options-grid {
                grid-template-columns: 1fr;
            }
            .embed-modal {
                width: 98%;
                max-height: 95vh;
            }
        }
        
        /* ========== Custom Exercises (YouTube) ========== */
        .flexframe-custom-exercises-section {
            margin-top: 0;
        }
        .custom-exercises-section-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }
        .custom-exercises-section-header .custom-exercises-icon {
            font-size: 22px;
            line-height: 1;
        }
        .custom-exercises-section-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #1d2327;
        }
        .custom-exercises-container {
            background: #fff;
            border: 1px solid #e2e4e7;
            border-radius: 8px;
            overflow: hidden;
        }
        .custom-exercises-toolbar {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: #f6f7f7;
            border-bottom: 1px solid #e2e4e7;
        }
        .custom-exercises-count {
            font-size: 13px;
            color: #646970;
        }
        /* Custom Exercises List */
        .custom-exercises-list {
            min-height: 60px;
        }
        .custom-exercises-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            color: #8c8f94;
        }
        .custom-exercises-empty .empty-icon {
            font-size: 36px;
            margin-bottom: 8px;
            opacity: 0.5;
        }
        .custom-exercises-empty p {
            margin: 0;
            font-size: 13px;
        }
        /* Custom Exercise List Item */
        .custom-exercise-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 16px;
            border-bottom: 1px solid #f0f0f1;
            transition: background 0.15s;
        }
        .custom-exercise-item:last-child {
            border-bottom: none;
        }
        .custom-exercise-item:hover {
            background: #f9f9f9;
        }
        .custom-exercise-item-thumb {
            width: 48px;
            height: 48px;
            border-radius: 6px;
            background: #f0f0f1;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }
        .custom-exercise-item-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .custom-exercise-item-thumb .thumb-placeholder {
            font-size: 20px;
            color: #c3c4c7;
        }
        .custom-exercise-item-thumb .yt-badge {
            position: absolute;
            bottom: 2px;
            right: 2px;
            background: #ff0000;
            color: #fff;
            font-size: 8px;
            font-weight: 700;
            padding: 1px 3px;
            border-radius: 2px;
            line-height: 1.2;
        }
        .custom-exercise-item-info {
            flex: 1;
            min-width: 0;
        }
        .custom-exercise-item-name {
            font-size: 13px;
            font-weight: 600;
            color: #1d2327;
            margin: 0 0 2px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .custom-exercise-item-meta {
            font-size: 11px;
            color: #8c8f94;
            display: flex;
            flex-wrap: wrap;
            gap: 4px 10px;
        }
        .custom-exercise-item-meta span {
            display: inline-flex;
            align-items: center;
            gap: 3px;
        }
        .custom-exercise-item-actions {
            display: flex;
            align-items: center;
            gap: 4px;
            flex-shrink: 0;
            opacity: 0;
            transition: opacity 0.15s;
        }
        .custom-exercise-item:hover .custom-exercise-item-actions {
            opacity: 1;
        }
        .custom-exercise-item-actions button {
            background: none;
            border: 1px solid #e2e4e7;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px 8px;
            font-size: 12px;
            color: #50575e;
            transition: all 0.15s;
        }
        .custom-exercise-item-actions button:hover {
            background: #f0f0f1;
            color: #1d2327;
        }
        .custom-exercise-item-actions .ce-delete-btn:hover {
            background: #d63638;
            color: #fff;
            border-color: #d63638;
        }
        /* Custom Exercise Form */
        .custom-exercise-form {
            border-top: 2px solid #2271b1;
            background: #fafcff;
        }
        .custom-exercise-form-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: #f0f6fc;
            border-bottom: 1px solid #c3ddf6;
        }
        .custom-exercise-form-header h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #1d2327;
        }
        .custom-exercise-form-close {
            background: none;
            border: none;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
            color: #8c8f94;
            padding: 0 4px;
        }
        .custom-exercise-form-close:hover {
            color: #d63638;
        }
        .custom-exercise-form-body {
            padding: 16px;
        }
        .custom-exercise-form-row {
            margin-bottom: 16px;
        }
        .custom-exercise-form-row label {
            display: block;
            margin-bottom: 4px;
            font-size: 13px;
            color: #1d2327;
        }
        .custom-exercise-form-row .required {
            color: #d63638;
        }
        .custom-exercise-form-row input[type="text"],
        .custom-exercise-form-row input[type="url"],
        .custom-exercise-form-row select,
        .custom-exercise-form-row textarea {
            width: 100%;
            max-width: 500px;
        }
        .custom-exercise-form-row textarea {
            resize: vertical;
        }
        .custom-exercise-form-row-group {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
        }
        .custom-exercise-form-row.half {
            flex: 1;
            margin-bottom: 0;
        }
        /* Thumbnail Upload */
        .ce-thumbnail-upload {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .ce-thumbnail-preview {
            width: 80px;
            height: 80px;
            border-radius: 8px;
            background: #f0f0f1;
            border: 2px dashed #c3c4c7;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
        }
        .ce-thumbnail-preview.has-image {
            border-style: solid;
            border-color: #e2e4e7;
        }
        .ce-thumbnail-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .ce-thumbnail-preview .no-thumbnail {
            font-size: 28px;
            color: #c3c4c7;
        }
        .ce-thumbnail-actions {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        /* Checkbox Grid */
        .ce-checkbox-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 6px 16px;
            padding: 10px 12px;
            background: #f9f9f9;
            border: 1px solid #e2e4e7;
            border-radius: 6px;
            max-width: 500px;
        }
        .ce-checkbox-label {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 13px;
            color: #1d2327;
            cursor: pointer;
            min-width: 110px;
        }
        .ce-checkbox-label input[type="checkbox"] {
            margin: 0;
        }
        /* Toggle Switch */
        .ce-toggle-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .ce-toggle {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 22px;
            flex-shrink: 0;
        }
        .ce-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .ce-toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #c3c4c7;
            border-radius: 22px;
            transition: 0.2s;
        }
        .ce-toggle-slider:before {
            content: '';
            position: absolute;
            height: 16px;
            width: 16px;
            left: 3px;
            bottom: 3px;
            background: #fff;
            border-radius: 50%;
            transition: 0.2s;
        }
        .ce-toggle input:checked + .ce-toggle-slider {
            background: #2271b1;
        }
        .ce-toggle input:checked + .ce-toggle-slider:before {
            transform: translateX(18px);
        }
        .ce-toggle-description {
            font-size: 13px;
            color: #646970;
        }
        .ce-toggle-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        /* Info Fields Toggle */
        .custom-exercise-info-fields {
            padding: 12px 16px;
            background: #f9f9f9;
            border: 1px solid #e2e4e7;
            border-radius: 6px;
            margin-top: 8px;
        }
        .custom-exercise-info-fields .custom-exercise-form-row:last-child {
            margin-bottom: 0;
        }
        /* Form Footer */
        .custom-exercise-form-footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            padding: 12px 16px;
            background: #f6f7f7;
            border-top: 1px solid #e2e4e7;
        }
        
        /* ========== Step 8: Model Tester ========== */
        .flexframe-model-tester-section {
            padding: 0;
        }
        .model-tester-toggle-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 16px 20px;
            background: #f9f9f9;
            border: 1px solid #e2e4e7;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .model-tester-toggle-row .toggle-label {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .model-tester-toggle-row .toggle-label .description {
            font-size: 12px;
            color: #757575;
        }
        .model-tester-upload-section {
            margin-bottom: 20px;
        }
        .model-tester-upload-section label {
            display: block;
            margin-bottom: 8px;
        }
        .model-tester-input-row {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
        }
        .model-tester-input-row .regular-text {
            flex: 1;
            min-width: 200px;
        }
        .model-tester-info-card {
            background: linear-gradient(135deg, #f0f6fc 0%, #e7f3ff 100%);
            border: 1px solid #c3d9ed;
            border-left: 4px solid #2271b1;
            border-radius: 6px;
            padding: 16px 20px;
            margin-bottom: 20px;
        }
        .model-info-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            color: #1d2327;
        }
        .model-info-header .dashicons {
            color: #2271b1;
        }
        .model-info-details {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 12px;
        }
        .model-info-row {
            display: flex;
            gap: 8px;
            align-items: baseline;
            font-size: 13px;
        }
        .model-info-row .info-label {
            font-weight: 600;
            color: #50575e;
            min-width: 80px;
        }
        .model-info-row .info-value {
            color: #1d2327;
        }
        .model-url-truncate {
            max-width: 500px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            vertical-align: bottom;
            font-size: 12px;
            padding: 2px 6px;
            background: rgba(0,0,0,0.05);
            border-radius: 3px;
        }
        .model-tester-instructions {
            display: flex;
            align-items: flex-start;
            gap: 6px;
            margin: 0;
            font-size: 13px;
            color: #50575e;
            line-height: 1.5;
        }
        .model-tester-instructions .dashicons {
            flex-shrink: 0;
            margin-top: 1px;
            color: #2271b1;
        }
        .model-tester-open-viewer {
            margin: 20px 0;
            padding: 20px;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #86efac;
            border-radius: 8px;
            text-align: center;
        }
        .model-tester-open-viewer .button-hero {
            display: inline-flex;
            align-items: center;
            font-size: 15px;
            padding: 8px 24px;
            height: auto;
        }
        .model-tester-reference {
            margin-top: 20px;
            border: 1px solid #e2e4e7;
            border-radius: 8px;
            overflow: hidden;
        }
        .reference-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            background: #f9f9f9;
            cursor: pointer;
            transition: background 0.2s;
        }
        .reference-toggle:hover {
            background: #f0f0f1;
        }
        .reference-toggle .dashicons {
            color: #2271b1;
        }
        .reference-toggle .toggle-hint {
            font-size: 12px;
            color: #757575;
        }
        .reference-content {
            padding: 16px;
        }
        .material-reference-table {
            font-size: 13px;
        }
        .material-reference-table th {
            background: #f0f0f1;
            font-weight: 600;
            padding: 8px 12px;
        }
        .material-reference-table td {
            padding: 8px 12px;
            vertical-align: middle;
        }
        .material-reference-table code {
            background: #2271b1;
            color: #fff;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 600;
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
        
        /* ========== Step 6: Gym Demo Pages ========== */
        .flexframe-demo-create-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .flexframe-demo-create-section h3 {
            display: flex;
            align-items: center;
            gap: 6px;
            margin: 0 0 16px 0;
            font-size: 15px;
            color: #1d2327;
        }
        .flexframe-demo-create-section h3 .dashicons {
            color: #2271b1;
        }
        .demo-create-form .demo-form-row {
            display: flex;
            gap: 16px;
            margin-bottom: 14px;
            flex-wrap: wrap;
        }
        .demo-create-form .demo-form-field {
            flex: 1;
            min-width: 200px;
        }
        .demo-create-form .demo-form-field label {
            display: block;
            font-weight: 600;
            margin-bottom: 6px;
            font-size: 13px;
            color: #1d2327;
        }
        .demo-create-form .demo-form-field input[type="text"],
        .demo-create-form .demo-form-field select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #c3c4c7;
            border-radius: 4px;
            font-size: 13px;
        }
        .demo-slug-input-wrapper {
            display: flex;
            align-items: center;
            border: 1px solid #c3c4c7;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
        }
        .demo-slug-prefix {
            padding: 8px 4px 8px 10px;
            background: #f0f0f1;
            color: #666;
            font-size: 12px;
            white-space: nowrap;
            border-right: 1px solid #c3c4c7;
            user-select: none;
        }
        .demo-slug-input-wrapper input[type="text"] {
            border: none !important;
            flex: 1;
            padding: 8px 10px;
            font-size: 13px;
            outline: none;
        }
        .demo-form-action {
            display: flex;
            align-items: flex-end;
        }
        .demo-form-action .button {
            height: 36px;
            padding: 0 16px;
            white-space: nowrap;
        }
        .demo-status-message {
            margin-top: 8px;
            font-size: 13px;
            min-height: 20px;
        }
        
        /* Demo Pages List */
        .flexframe-demo-list-section {
            margin-top: 8px;
        }
        .flexframe-demo-list-section h3 {
            display: flex;
            align-items: center;
            gap: 6px;
            margin: 0 0 16px 0;
            font-size: 15px;
            color: #1d2327;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e4e7;
        }
        .flexframe-demo-list-section h3 .dashicons {
            color: #2271b1;
        }
        .demo-empty-state {
            text-align: center;
            padding: 40px 20px;
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            color: #666;
        }
        .demo-empty-state .dashicons {
            font-size: 48px;
            width: 48px;
            height: 48px;
            color: #c3c4c7;
            display: block;
            margin: 0 auto 12px;
        }
        .demo-empty-state p {
            margin: 0;
            font-size: 14px;
        }
        .demo-pages-table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid #e2e4e7;
        }
        .demo-pages-table thead th {
            background: #f0f0f1;
            padding: 10px 14px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            color: #1d2327;
            border-bottom: 1px solid #c3c4c7;
        }
        .demo-pages-table tbody tr {
            border-bottom: 1px solid #e2e4e7;
            transition: background 0.15s ease;
        }
        .demo-pages-table tbody tr:last-child {
            border-bottom: none;
        }
        .demo-pages-table tbody tr:hover {
            background: #f8f9fa;
        }
        .demo-pages-table td {
            padding: 12px 14px;
            font-size: 13px;
            vertical-align: middle;
        }
        .demo-name-cell strong {
            color: #1d2327;
        }
        .demo-url-cell a {
            color: #2271b1;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .demo-url-cell a .dashicons {
            font-size: 14px;
            width: 14px;
            height: 14px;
        }
        .demo-url-cell a:hover {
            text-decoration: underline;
        }
        .demo-theme-cell {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .demo-theme-cell select {
            min-width: 180px;
            padding: 4px 8px;
            font-size: 12px;
        }
        .demo-theme-cell .button-small {
            padding: 0 8px;
            min-height: 28px;
        }
        .demo-actions-cell {
            display: flex;
            gap: 6px;
        }
        .demo-actions-cell .button-small {
            padding: 0 8px;
            min-height: 28px;
        }
        .demo-refresh-btn .dashicons.spin {
            animation: flexframe-spin 1s linear infinite;
        }
        @keyframes flexframe-spin {
            100% { transform: rotate(360deg); }
        }
        .demo-update-theme-btn.updated {
            background: #00a32a !important;
            border-color: #00a32a !important;
            color: #fff !important;
        }
        
        /* Demo Logo Upload (Create Form) */
        .demo-logo-upload-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        .demo-logo-upload-wrapper .description {
            font-size: 12px;
            color: #666;
            margin: 0;
        }
        .demo-logo-preview {
            position: relative;
            display: inline-flex;
            align-items: center;
            background: linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 12px 12px;
            background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
            border: 1px solid #c3c4c7;
            border-radius: 6px;
            padding: 4px;
            overflow: hidden;
        }
        .demo-logo-preview img {
            max-width: 60px;
            max-height: 40px;
            object-fit: contain;
            display: block;
        }
        .demo-logo-remove-btn {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #d63638;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .demo-logo-remove-btn .dashicons {
            font-size: 12px;
            width: 12px;
            height: 12px;
        }
        
        /* Demo Logo in Table Rows */
        .demo-logo-cell {
            width: 90px;
        }
        .demo-table-logo-wrapper {
            display: flex;
            align-items: center;
            gap: 6px;
            position: relative;
        }
        .demo-table-logo-wrapper .demo-table-logo-img {
            max-width: 48px;
            max-height: 32px;
            object-fit: contain;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 2px;
            background: linear-gradient(45deg, #eee 25%, transparent 25%),
                        linear-gradient(-45deg, #eee 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #eee 75%),
                        linear-gradient(-45deg, transparent 75%, #eee 75%);
            background-size: 8px 8px;
            background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
        }
        .demo-table-logo-wrapper .demo-table-logo-change,
        .demo-table-logo-wrapper .demo-table-logo-remove {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            color: #666;
            display: flex;
            align-items: center;
        }
        .demo-table-logo-wrapper .demo-table-logo-change:hover {
            color: #2271b1;
        }
        .demo-table-logo-wrapper .demo-table-logo-remove:hover {
            color: #d63638;
        }
        .demo-table-logo-wrapper .demo-table-logo-change .dashicons,
        .demo-table-logo-wrapper .demo-table-logo-remove .dashicons {
            font-size: 14px;
            width: 14px;
            height: 14px;
        }
        .demo-table-logo-wrapper.no-logo {
            gap: 6px;
        }
        .demo-uses-global {
            font-size: 11px;
            color: #999;
            font-style: italic;
        }
        
        /* ========== Step 7: Client Access ========== */
        .client-login-info {
            background: #f0f6fc;
            border: 1px solid #c3d1e0;
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 24px;
        }
        .client-login-url-box {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .client-login-url-box .dashicons {
            color: #2271b1;
            font-size: 20px;
            width: 20px;
            height: 20px;
        }
        .client-login-url-box strong {
            display: block;
            font-size: 12px;
            color: #555;
            margin-bottom: 2px;
        }
        .client-login-url-box a {
            color: #2271b1;
            font-size: 14px;
            text-decoration: none;
        }
        .client-login-url-box a:hover {
            text-decoration: underline;
        }
        .client-login-url-box .button-small {
            margin-left: auto;
        }
        
        .flexframe-client-create-section {
            background: #f9f9f9;
            border: 1px solid #e2e4e7;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .flexframe-client-create-section h3 {
            margin: 0 0 16px 0;
            font-size: 15px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .client-create-form {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
        .client-form-row {
            display: flex;
            gap: 14px;
        }
        .client-form-row .client-form-field {
            flex: 1;
        }
        .client-form-field label {
            display: block;
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 5px;
            color: #1d2327;
        }
        .client-form-field input[type="text"],
        .client-form-field input[type="email"] {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid #c3c4c7;
            border-radius: 4px;
            font-size: 13px;
            box-sizing: border-box;
        }
        .client-password-wrapper {
            display: flex;
            gap: 6px;
        }
        .client-password-wrapper input {
            flex: 1;
        }
        .client-form-actions {
            display: flex;
            gap: 10px;
        }
        
        .flexframe-client-list-section {
            margin-top: 10px;
        }
        .flexframe-client-list-section h3 {
            margin: 0 0 14px 0;
            font-size: 15px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .client-accounts-table {
            background: #fff;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid #e2e4e7;
        }
        .client-accounts-table thead th {
            background: #f0f0f1;
            padding: 10px 14px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            color: #1d2327;
            border-bottom: 1px solid #c3c4c7;
        }
        .client-accounts-table tbody tr {
            border-bottom: 1px solid #e2e4e7;
            transition: background 0.15s ease;
        }
        .client-accounts-table tbody tr:last-child {
            border-bottom: none;
        }
        .client-accounts-table tbody tr:hover {
            background: #f6f7f7;
        }
        .client-accounts-table tbody td {
            padding: 10px 14px;
            font-size: 13px;
            vertical-align: middle;
        }
        .client-actions-cell {
            display: flex;
            gap: 6px;
        }
        .client-actions-cell .button-small {
            padding: 0 8px;
            min-height: 28px;
        }
        .client-empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #999;
        }
        .client-empty-state .dashicons {
            font-size: 36px;
            width: 36px;
            height: 36px;
            margin-bottom: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        .client-empty-state p {
            font-size: 14px;
            margin: 0;
        }
        
        /* Password reset modal */
        .flexframe-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .flexframe-modal {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            width: 420px;
            max-width: 90vw;
            padding: 24px;
        }
        .flexframe-modal h3 {
            margin: 0 0 16px 0;
            font-size: 16px;
        }
        .flexframe-modal .modal-field {
            margin-bottom: 14px;
        }
        .flexframe-modal .modal-field label {
            display: block;
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 5px;
        }
        .flexframe-modal .modal-field input {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid #c3c4c7;
            border-radius: 4px;
            font-size: 13px;
            box-sizing: border-box;
        }
        .flexframe-modal .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 18px;
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
        
        // Quick-link pills in welcome hero — scroll to & expand step
        $('.quick-link[data-scroll-step]').on('click', function() {
            var stepNum = $(this).data('scroll-step');
            var $header = $('.flexframe-step-header[data-step="' + stepNum + '"]');
            if (!$header.length) return;
            var $section = $header.closest('.flexframe-step-section');
            
            // Expand if collapsed
            if ($section.hasClass('collapsed')) {
                $section.removeClass('collapsed');
                $section.find('.flexframe-step-content').slideDown(200);
            }
            
            // Smooth scroll into view
            $('html, body').animate({
                scrollTop: $section.offset().top - 70
            }, 400);
        });
        
        // Manual theme settings toggle (Step 5)
        $('#manual-settings-toggle').on('click', function() {
            var $container = $(this).closest('.manual-theme-settings');
            $container.toggleClass('collapsed');
        });
        
        // Start with manual settings collapsed by default
        $('.manual-theme-settings').addClass('collapsed');
        
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
            
            // Sync to Side Menus V2 - Accent Color (hidden input)
            $('#flexframe_menu_v2_accent_color').val(color);
            
            // Sync to Side Menus V2 - Heading Background Color (hidden input)
            $('#flexframe_menu_v2_heading_bg_color').val(color);
            
            // Sync to Spinner Color
            $('#flexframe_spinner_color').val(color).trigger('input');
            $('#flexframe_spinner_color').siblings('.color-value').text(color);
            
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
                $('#download-custom-theme').show();
            } else {
                $('#delete-custom-theme').hide();
                $('#download-custom-theme').hide();
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
        
        // Download custom theme button
        $('#download-custom-theme').on('click', function() {
            var selectedVal = $('#flexframe_material_preset').val();
            if (selectedVal.indexOf('custom:') !== 0) return;
            
            var presetId = selectedVal.replace('custom:', '');
            
            // Get theme data via AJAX
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_get_custom_preset',
                    preset_id: presetId,
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>'
                },
                success: function(response) {
                    if (response.success && response.data) {
                        var themeData = response.data;
                        var themeName = themeData.name || presetId;
                        
                        // Create downloadable JSON
                        var dataStr = JSON.stringify(themeData, null, 2);
                        var dataBlob = new Blob([dataStr], {type: 'application/json'});
                        
                        // Create download link
                        var downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(dataBlob);
                        downloadLink.download = 'flexframe-theme-' + themeName.toLowerCase().replace(/\s+/g, '-') + '.json';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        
                        showSaveThemeMessage('<?php _e('Theme downloaded successfully!', 'flexframe-viewer'); ?>', 'success');
                    } else {
                        showSaveThemeMessage(response.data || '<?php _e('Error downloading theme.', 'flexframe-viewer'); ?>', 'error');
                    }
                },
                error: function() {
                    showSaveThemeMessage('<?php _e('Error downloading theme.', 'flexframe-viewer'); ?>', 'error');
                }
            });
        });
        
        // =====================
        // Built-in Theme Presets
        // =====================
        
        // Preset theme definitions
        var builtInPresets = {
            'dark': {
                name: '<?php _e('Dark Spark', 'flexframe-viewer'); ?>',
                description: '<?php _e('Sleek dark interface with vivid primary accents, glass-like skin, and glowing particles. Perfect for dark websites.', 'flexframe-viewer'); ?>',
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
                    // Menu V2 (Side Menus)
                    menuV2BgColor: '#000000',
                    menuV2BgOpacity: 0.7,
                    menuV2TextColor: '#ffffff',
                    menuV2TextOpacity: 1,
                    menuV2AccentColor: 'primary',
                    menuV2ShowThumbnailLabels: true,
                    menuV2HeadingBgColor: 'primary',
                    menuV2HeadingBgOpacity: 0.17,
                    menuV2InfoStepOpacity: 0.35,
                    menuV2SearchInputBgOpacity: 0.7,
                    menuV2SearchInputBgColor: '#000000',
                    menuV2InfoHeaderOpacity: 0.5,
                    menuV2InfoPanelOpacity: 0.17,
                    menuV2FilterThumbBgOpacity: 0.8,
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
                    particlesSize: 0.01,
                    particlesColor: 'primary',
                    particlesOpacity: 1,
                    particlesSpeed: 0.5,
                    // Equipment Material settings
                    barbellColor: '#808080',
                    barbellOpacity: 1,
                    barbellMetalness: 0.8,
                    barbellRoughness: 0.3,
                    bumperColor: '#808080',
                    bumperOpacity: 1,
                    bumperMetalness: 0,
                    bumperRoughness: 0.8,
                    cableColor: '#808080',
                    cableOpacity: 1,
                    cableMetalness: 0.5,
                    cableRoughness: 0.4,
                    chromeColor: '#cccccc',
                    chromeOpacity: 1,
                    chromeMetalness: 1,
                    chromeRoughness: 0.1,
                    color1Color: 'primary',
                    color1Opacity: 1,
                    color1Metalness: 0.5,
                    color1Roughness: 0.5,
                    metalColor: '#b0b0b0',
                    metalOpacity: 1,
                    metalMetalness: 0.9,
                    metalRoughness: 0.3,
                    padColor: '#1a1a1a',
                    padOpacity: 1,
                    padMetalness: 0,
                    padRoughness: 0.9,
                    plasticColor: '#808080',
                    plasticOpacity: 1,
                    plasticMetalness: 0,
                    plasticRoughness: 0.6,
                    rubberColor: '#1a1a1a',
                    rubberOpacity: 1,
                    rubberMetalness: 0,
                    rubberRoughness: 0.95
                }
            },
            'light_v3': {
                name: '<?php _e('Light Theme - V3', 'flexframe-viewer'); ?>',
                description: '<?php _e('Bright, clean interface with logo loader and glass-like skin. Transparent menus with bold accents.', 'flexframe-viewer'); ?>',
                settings: {
                    spinnerColor: 'primary',
                    useLogoLoader: true,
                    logoLoaderAnimation: 'pulse',
                    logoLoaderSize: 100,
                    // Animation Player
                    playerBgColor: '#7d7d7d',
                    playerBgOpacity: 0.2,
                    playerButtonBgColor: 'primary',
                    playerButtonBgOpacity: 1,
                    playerIconColor: '#ffffff',
                    playerAccentColor: 'primary',
                    playerAlwaysVisible: 'no',
                    playerWidth: 100,
                    playerShowTime: true,
                    // Menu
                    menuBgColor: '#ffffff',
                    menuBgOpacity: 0,
                    menuTextColor: '#ffffff',
                    menuTextOpacity: 1,
                    menuAccentColor: 'primary',
                    hideRightMenu: false,
                    showScreenshotButton: true,
                    // Thumbnail Label settings
                    thumbnailLabelColor: '#000000',
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
                    // Menu V2 (Side Menus)
                    menuV2BgColor: '#6b6b6b',
                    menuV2BgOpacity: 0.16,
                    menuV2TextColor: '#ffffff',
                    menuV2TextOpacity: 1,
                    menuV2AccentColor: 'primary',
                    menuV2ShowThumbnailLabels: true,
                    menuV2HeadingBgColor: 'primary',
                    menuV2HeadingBgOpacity: 0.17,
                    menuV2InfoStepOpacity: 0.53,
                    menuV2InfoHeaderOpacity: 0.7,
                    menuV2InfoPanelOpacity: 0.66,
                    menuV2FilterThumbBgOpacity: 0.18,
                    menuV2SearchInputBgOpacity: 1,
                    menuV2SearchInputBgColor: '#cfcfcf',
                    // Scene Background settings - solid white
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
                    ambientIntensity: 0.4,
                    ambientColor: '#ffffff',
                    directionalIntensity: 1.35,
                    directionalColor: 'primary',
                    directionalPosX: 1.35,
                    directionalPosY: 1.57,
                    directionalPosZ: 0.9,
                    // Particle settings
                    particlesEnabled: true,
                    particlesCount: 1450,
                    particlesSize: 0.013,
                    particlesColor: 'primary',
                    particlesOpacity: 1,
                    particlesSpeed: 0.5,
                    // Equipment Material settings
                    barbellColor: '#808080',
                    barbellOpacity: 1,
                    barbellMetalness: 0.8,
                    barbellRoughness: 0.3,
                    bumperColor: '#808080',
                    bumperOpacity: 1,
                    bumperMetalness: 0,
                    bumperRoughness: 0.8,
                    cableColor: '#808080',
                    cableOpacity: 1,
                    cableMetalness: 0.5,
                    cableRoughness: 0.4,
                    chromeColor: '#cccccc',
                    chromeOpacity: 1,
                    chromeMetalness: 1,
                    chromeRoughness: 0.1,
                    color1Color: 'primary',
                    color1Opacity: 1,
                    color1Metalness: 0.5,
                    color1Roughness: 0.5,
                    metalColor: '#b0b0b0',
                    metalOpacity: 1,
                    metalMetalness: 0.9,
                    metalRoughness: 0.3,
                    padColor: '#1a1a1a',
                    padOpacity: 1,
                    padMetalness: 0,
                    padRoughness: 0.9,
                    plasticColor: '#808080',
                    plasticOpacity: 1,
                    plasticMetalness: 0,
                    plasticRoughness: 0.6,
                    rubberColor: '#1a1a1a',
                    rubberOpacity: 1,
                    rubberMetalness: 0,
                    rubberRoughness: 0.95
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
                showHDButton: 'show_hd_button',
                showARButton: 'show_ar_button',
                // Thumbnail Labels
                thumbnailLabelColor: 'thumbnail_label_color',
                thumbnailLabelOpacity: 'thumbnail_label_opacity',
                // Menu V2 (Side Menus)
                menuV2BgColor: 'menu_v2_bg_color',
                menuV2BgOpacity: 'menu_v2_bg_opacity',
                menuV2TextColor: 'menu_v2_text_color',
                menuV2TextOpacity: 'menu_v2_text_opacity',
                menuV2AccentColor: 'menu_v2_accent_color',
                menuV2ShowThumbnailLabels: 'menu_v2_show_thumbnail_labels',
                menuV2HeadingBgColor: 'menu_v2_heading_bg_color',
                menuV2HeadingBgOpacity: 'menu_v2_heading_bg_opacity',
                menuV2InfoStepOpacity: 'menu_v2_info_step_opacity',
                menuV2SearchInputBgOpacity: 'menu_v2_search_input_bg_opacity',
                menuV2SearchInputBgColor: 'menu_v2_search_input_bg_color',
                menuV2InfoHeaderOpacity: 'menu_v2_info_header_opacity',
                menuV2InfoPanelOpacity: 'menu_v2_info_panel_opacity',
                menuV2FilterThumbBgOpacity: 'menu_v2_filter_thumb_bg_opacity',
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
                particleSpeed: 'particles_speed',
                // Equipment Materials
                barbellColor: 'barbell_color',
                barbellOpacity: 'barbell_opacity',
                barbellMetalness: 'barbell_metalness',
                barbellRoughness: 'barbell_roughness',
                bumperColor: 'bumper_color',
                bumperOpacity: 'bumper_opacity',
                bumperMetalness: 'bumper_metalness',
                bumperRoughness: 'bumper_roughness',
                cableColor: 'cable_color',
                cableOpacity: 'cable_opacity',
                cableMetalness: 'cable_metalness',
                cableRoughness: 'cable_roughness',
                chromeColor: 'chrome_color',
                chromeOpacity: 'chrome_opacity',
                chromeMetalness: 'chrome_metalness',
                chromeRoughness: 'chrome_roughness',
                color1Color: 'color1_color',
                color1Opacity: 'color1_opacity',
                color1Metalness: 'color1_metalness',
                color1Roughness: 'color1_roughness',
                metalColor: 'metal_color',
                metalOpacity: 'metal_opacity',
                metalMetalness: 'metal_metalness',
                metalRoughness: 'metal_roughness',
                padColor: 'pad_color',
                padOpacity: 'pad_opacity',
                padMetalness: 'pad_metalness',
                padRoughness: 'pad_roughness',
                plasticColor: 'plastic_color',
                plasticOpacity: 'plastic_opacity',
                plasticMetalness: 'plastic_metalness',
                plasticRoughness: 'plastic_roughness',
                rubberColor: 'rubber_color',
                rubberOpacity: 'rubber_opacity',
                rubberMetalness: 'rubber_metalness',
                rubberRoughness: 'rubber_roughness'
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
                // Load custom preset via AJAX, then submit form when done
                loadCustomPreset(presetId, function() {
                    setTimeout(function() {
                        console.log('[Theme Apply] Custom preset loaded, submitting form...');
                        $('#submit').click();
                    }, 100);
                });
            } else {
                // Apply built-in preset (synchronous)
                applyBuiltInPreset(presetId);
                // Submit form after brief delay to allow settings to populate
                setTimeout(function() {
                    console.log('[Theme Apply] Built-in preset applied, submitting form...');
                    $('#submit').click();
                }, 200);
            }
        });
        
        // Set initial description on page load
        var initialPreset = $('#flexframe_material_preset').val();
        if (initialPreset) {
            var isCustom = initialPreset.indexOf('custom:') === 0;
            if (isCustom) {
                $('#preset-desc-text').text('<?php _e('Your custom theme with personalized settings.', 'flexframe-viewer'); ?>');
                $('#delete-custom-theme').show();
                $('#download-custom-theme').show();
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
        function loadCustomPreset(presetId, callback) {
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
                    if (typeof callback === 'function') callback();
                },
                error: function(xhr, status, error) {
                    console.error('[Theme Load] AJAX error:', error);
                    if (typeof callback === 'function') callback();
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
        
        // Import Theme JSON file (Step 5)
        $('#import-theme-file').on('change', function(e) {
            var file = e.target.files[0];
            if (!file) return;
            
            $('#import-theme-filename').text(file.name);
            
            var reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    var data = JSON.parse(evt.target.result);
                    
                    // Support both wrapped format { settings: {...} } and flat format
                    var settings = data.settings || data;
                    
                    // The theme editor exports camelCase keys - convert to snake_case for applyPresetSettings
                    var camelToSnakeMap = {
                        primaryColor: 'primary_color',
                        spinnerColor: 'spinner_color',
                        useLogoLoader: 'use_logo_loader',
                        playerBgColor: 'player_bg_color',
                        playerBgOpacity: 'player_bg_opacity',
                        playerButtonColor: 'player_button_bg_color',
                        playerButtonOpacity: 'player_button_bg_opacity',
                        playerIconColor: 'player_icon_color',
                        playerAccentColor: 'player_accent_color',
                        menuBgColor: 'menu_bg_color',
                        menuBgOpacity: 'menu_bg_opacity',
                        menuTextColor: 'menu_text_color',
                        menuTextOpacity: 'menu_text_opacity',
                        menuAccentColor: 'menu_accent_color',
                        thumbnailLabelColor: 'thumbnail_label_color',
                        thumbnailLabelOpacity: 'thumbnail_label_opacity',
                        menuV2BgColor: 'menu_v2_bg_color',
                        menuV2BgOpacity: 'menu_v2_bg_opacity',
                        menuV2TextColor: 'menu_v2_text_color',
                        menuV2TextOpacity: 'menu_v2_text_opacity',
                        menuV2AccentColor: 'menu_v2_accent_color',
                        menuV2ShowThumbnailLabels: 'menu_v2_show_thumbnail_labels',
                        menuV2HeadingBgColor: 'menu_v2_heading_bg_color',
                        menuV2HeadingBgOpacity: 'menu_v2_heading_bg_opacity',
                        menuV2InfoStepOpacity: 'menu_v2_info_step_opacity',
                        menuV2InfoHeaderOpacity: 'menu_v2_info_header_opacity',
                        menuV2InfoPanelOpacity: 'menu_v2_info_panel_opacity',
                        menuV2FilterThumbBgOpacity: 'menu_v2_filter_thumb_bg_opacity',
                        menuV2SearchInputBgOpacity: 'menu_v2_search_input_bg_opacity',
                        menuV2SearchInputBgColor: 'menu_v2_search_input_bg_color',
                        showScreenshotButton: 'show_screenshot_button',
                        showARButton: 'show_ar_button',
                        skinColor: 'skin_color',
                        skinOpacity: 'skin_opacity',
                        skinRoughness: 'skin_roughness',
                        skinMetalness: 'skin_metalness',
                        skinTransmission: 'skin_transmission',
                        skinThickness: 'skin_thickness',
                        skinIor: 'skin_ior',
                        skinEnvIntensity: 'skin_env_intensity',
                        bgGradientTop: 'bg_gradient_top',
                        bgGradientBottom: 'bg_gradient_bottom',
                        bgGradientOpacity: 'bg_gradient_opacity',
                        ambientIntensity: 'ambient_intensity',
                        ambientColor: 'ambient_color',
                        directionalIntensity: 'directional_intensity',
                        directionalColor: 'directional_color',
                        particlesEnabled: 'particles_enabled',
                        particlesCount: 'particles_count',
                        particlesSize: 'particles_size',
                        particlesColor: 'particles_color',
                        particlesOpacity: 'particles_opacity',
                        particlesSpeed: 'particles_speed',
                        barbellColor: 'barbell_color',
                        barbellOpacity: 'barbell_opacity',
                        barbellMetalness: 'barbell_metalness',
                        barbellRoughness: 'barbell_roughness',
                        bumperColor: 'bumper_color',
                        bumperOpacity: 'bumper_opacity',
                        bumperMetalness: 'bumper_metalness',
                        bumperRoughness: 'bumper_roughness',
                        cableColor: 'cable_color',
                        cableOpacity: 'cable_opacity',
                        cableMetalness: 'cable_metalness',
                        cableRoughness: 'cable_roughness',
                        chromeColor: 'chrome_color',
                        chromeOpacity: 'chrome_opacity',
                        chromeMetalness: 'chrome_metalness',
                        chromeRoughness: 'chrome_roughness',
                        color1Color: 'color1_color',
                        color1Opacity: 'color1_opacity',
                        color1Metalness: 'color1_metalness',
                        color1Roughness: 'color1_roughness',
                        metalColor: 'metal_color',
                        metalOpacity: 'metal_opacity',
                        metalMetalness: 'metal_metalness',
                        metalRoughness: 'metal_roughness',
                        padColor: 'pad_color',
                        padOpacity: 'pad_opacity',
                        padMetalness: 'pad_metalness',
                        padRoughness: 'pad_roughness',
                        plasticColor: 'plastic_color',
                        plasticOpacity: 'plastic_opacity',
                        plasticMetalness: 'plastic_metalness',
                        plasticRoughness: 'plastic_roughness',
                        rubberColor: 'rubber_color',
                        rubberOpacity: 'rubber_opacity',
                        rubberMetalness: 'rubber_metalness',
                        rubberRoughness: 'rubber_roughness'
                    };
                    
                    // Convert camelCase keys to snake_case if needed
                    var converted = {};
                    for (var key in settings) {
                        if (settings.hasOwnProperty(key)) {
                            var snakeKey = camelToSnakeMap[key] || key;
                            var val = settings[key];
                            // Convert booleans to appropriate format for show_thumbnail_labels
                            if (snakeKey === 'menu_v2_show_thumbnail_labels' && typeof val === 'boolean') {
                                val = val ? 'yes' : 'no';
                            }
                            converted[snakeKey] = val;
                        }
                    }
                    
                    console.log('[Theme Import] Applying imported settings:', converted);
                    applyPresetSettings(converted);
                    
                    // Determine theme name from file or use filename
                    var themeName = data.name || file.name.replace(/\.json$/i, '');
                    $('#custom-theme-name').val(themeName);
                    
                    // Auto-save as a custom theme so it appears in Step 4 dropdown
                    var settingsToSave = getCurrentSettings();
                    
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: {
                            action: 'flexframe_save_custom_preset',
                            preset_name: themeName,
                            preset_data: settingsToSave,
                            nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>'
                        },
                        success: function(response) {
                            if (response.success) {
                                var presetId = response.data.preset_id;
                                
                                // Add to Step 4 dropdown
                                var $optgroup = $('#custom-themes-optgroup');
                                if ($optgroup.length === 0) {
                                    $('#flexframe_material_preset').append('<optgroup label="<?php _e('Your Custom Themes', 'flexframe-viewer'); ?>" id="custom-themes-optgroup"></optgroup>');
                                    $optgroup = $('#custom-themes-optgroup');
                                }
                                $optgroup.show();
                                
                                var $existingOption = $optgroup.find('option[value="custom:' + presetId + '"]');
                                if ($existingOption.length) {
                                    $existingOption.text(themeName);
                                } else {
                                    $optgroup.append('<option value="custom:' + presetId + '">' + themeName + '</option>');
                                }
                                
                                // Select it in Step 4
                                $('#flexframe_material_preset').val('custom:' + presetId).trigger('change');
                                
                                showImportMessage('<?php _e('Theme applied and saved! You can find it in the theme dropdown in Step 4.', 'flexframe-viewer'); ?>', 'success');
                                
                                // Save the form
                                setTimeout(function() {
                                    $('#submit').click();
                                }, 500);
                            } else {
                                showImportMessage('<?php _e('Theme applied to settings, but could not save to Step 4 dropdown.', 'flexframe-viewer'); ?>', 'error');
                            }
                        },
                        error: function() {
                            showImportMessage('<?php _e('Theme applied to settings, but could not save to Step 4 dropdown.', 'flexframe-viewer'); ?>', 'error');
                        }
                    });
                } catch (err) {
                    console.error('[Theme Import] Parse error:', err);
                    showImportMessage('<?php _e('Failed to parse theme file: ', 'flexframe-viewer'); ?>' + err.message, 'error');
                }
            };
            reader.readAsText(file);
            
            // Reset so same file can be re-selected
            $(this).val('');
        });
        
        function showImportMessage(message, type) {
            var $msg = $('#import-theme-message');
            $msg.removeClass('success error').addClass(type).text(message).fadeIn(200);
            setTimeout(function() {
                $msg.fadeOut(200);
            }, 5000);
        }
        
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
                show_hd_button: $('#flexframe_show_hd_button').length ? $('#flexframe_show_hd_button').is(':checked') : true,
                show_ar_button: $('#flexframe_show_ar_button').length ? $('#flexframe_show_ar_button').is(':checked') : true,
                
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
            
            // Material Settings (with undefined guards)
            if (settings.skin_color !== undefined) {
                $('#flexframe_skin_color').val(settings.skin_color);
                $('#flexframe_skin_color').siblings('.color-hex').text(settings.skin_color);
            }
            if (settings.skin_opacity !== undefined) {
                $('#flexframe_skin_opacity').val(settings.skin_opacity);
                $('#flexframe_skin_opacity').siblings('.range-value').text(settings.skin_opacity);
            }
            if (settings.skin_roughness !== undefined) {
                $('#flexframe_skin_roughness').val(settings.skin_roughness);
                $('#flexframe_skin_roughness').siblings('.range-value').text(settings.skin_roughness);
            }
            if (settings.skin_metalness !== undefined) {
                $('#flexframe_skin_metalness').val(settings.skin_metalness);
                $('#flexframe_skin_metalness').siblings('.range-value').text(settings.skin_metalness);
            }
            if (settings.skin_transmission !== undefined) {
                $('#flexframe_skin_transmission').val(settings.skin_transmission);
                $('#flexframe_skin_transmission').siblings('.range-value').text(settings.skin_transmission);
            }
            if (settings.skin_thickness !== undefined) {
                $('#flexframe_skin_thickness').val(settings.skin_thickness);
                $('#flexframe_skin_thickness').siblings('.range-value').text(settings.skin_thickness);
            }
            if (settings.skin_ior !== undefined) {
                $('#flexframe_skin_ior').val(settings.skin_ior);
                $('#flexframe_skin_ior').siblings('.range-value').text(settings.skin_ior);
            }
            if (settings.skin_env_intensity !== undefined) {
                $('#flexframe_skin_env_intensity').val(settings.skin_env_intensity);
                $('#flexframe_skin_env_intensity').siblings('.range-value').text(settings.skin_env_intensity);
            }
            
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
            
            // Show HD Button (if present)
            if (settings.show_hd_button !== undefined && $('#flexframe_show_hd_button').length) {
                $('#flexframe_show_hd_button').prop('checked', settings.show_hd_button);
            }
            
            // Show AR Button (if present)
            if (settings.show_ar_button !== undefined && $('#flexframe_show_ar_button').length) {
                $('#flexframe_show_ar_button').prop('checked', settings.show_ar_button);
            }
            
            // Side Menu V2 Settings (stored in hidden fields)
            if (settings.menu_v2_bg_color !== undefined) {
                $('#flexframe_menu_v2_bg_color').val(settings.menu_v2_bg_color);
            }
            if (settings.menu_v2_bg_opacity !== undefined) {
                $('#flexframe_menu_v2_bg_opacity').val(settings.menu_v2_bg_opacity);
            }
            if (settings.menu_v2_text_color !== undefined) {
                $('#flexframe_menu_v2_text_color').val(settings.menu_v2_text_color);
            }
            if (settings.menu_v2_text_opacity !== undefined) {
                $('#flexframe_menu_v2_text_opacity').val(settings.menu_v2_text_opacity);
            }
            if (settings.menu_v2_accent_color !== undefined) {
                $('#flexframe_menu_v2_accent_color').val(settings.menu_v2_accent_color);
            }
            if (settings.menu_v2_show_thumbnail_labels !== undefined) {
                $('#flexframe_menu_v2_show_thumbnail_labels').val(settings.menu_v2_show_thumbnail_labels === true ? 'yes' : (settings.menu_v2_show_thumbnail_labels === false ? 'no' : settings.menu_v2_show_thumbnail_labels));
            }
            if (settings.menu_v2_heading_bg_color !== undefined) {
                $('#flexframe_menu_v2_heading_bg_color').val(settings.menu_v2_heading_bg_color);
            }
            if (settings.menu_v2_heading_bg_opacity !== undefined) {
                $('#flexframe_menu_v2_heading_bg_opacity').val(settings.menu_v2_heading_bg_opacity);
            }
            if (settings.menu_v2_info_step_opacity !== undefined) {
                $('#flexframe_menu_v2_info_step_opacity').val(settings.menu_v2_info_step_opacity);
            }
            if (settings.menu_v2_search_input_bg_opacity !== undefined) {
                $('#flexframe_menu_v2_search_input_bg_opacity').val(settings.menu_v2_search_input_bg_opacity);
            }
            if (settings.menu_v2_search_input_bg_color !== undefined) {
                $('#flexframe_menu_v2_search_input_bg_color').val(settings.menu_v2_search_input_bg_color);
            }
            if (settings.menu_v2_info_header_opacity !== undefined) {
                $('#flexframe_menu_v2_info_header_opacity').val(settings.menu_v2_info_header_opacity);
            }
            if (settings.menu_v2_info_panel_opacity !== undefined) {
                $('#flexframe_menu_v2_info_panel_opacity').val(settings.menu_v2_info_panel_opacity);
            }
            if (settings.menu_v2_filter_thumb_bg_opacity !== undefined) {
                $('#flexframe_menu_v2_filter_thumb_bg_opacity').val(settings.menu_v2_filter_thumb_bg_opacity);
            }
            
            // Flat Equipment Material Settings (from theme editor / built-in presets)
            var materialKeys = ['barbell', 'bumper', 'cable', 'chrome', 'color1', 'metal', 'pad', 'plastic', 'rubber'];
            var materialProps = ['color', 'opacity', 'metalness', 'roughness'];
            materialKeys.forEach(function(matKey) {
                materialProps.forEach(function(prop) {
                    var settingKey = matKey + '_' + prop;
                    if (settings[settingKey] !== undefined) {
                        var $input = $('input[name="flexframe_' + settingKey + '"]');
                        if ($input.length) {
                            $input.val(settings[settingKey]).trigger('input');
                            var $sibling = $input.siblings('.range-value, .color-hex');
                            if ($sibling.length) $sibling.text(settings[settingKey]);
                        }
                    }
                });
            });
            
            // Equipment Material Settings (nested format, if present)
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
                        showHDButton: 'show_hd_button',
                        showARButton: 'show_ar_button',
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
                        particleSpeed: 'particles_speed',
                        // Menu V2 (Side Menus)
                        menuV2BgColor: 'menu_v2_bg_color',
                        menuV2BgOpacity: 'menu_v2_bg_opacity',
                        menuV2TextColor: 'menu_v2_text_color',
                        menuV2TextOpacity: 'menu_v2_text_opacity',
                        menuV2AccentColor: 'menu_v2_accent_color',
                        menuV2ShowThumbnailLabels: 'menu_v2_show_thumbnail_labels',
                        menuV2HeadingBgColor: 'menu_v2_heading_bg_color',
                        menuV2HeadingBgOpacity: 'menu_v2_heading_bg_opacity',
                        menuV2InfoStepOpacity: 'menu_v2_info_step_opacity',
                        menuV2SearchInputBgOpacity: 'menu_v2_search_input_bg_opacity',
                        menuV2SearchInputBgColor: 'menu_v2_search_input_bg_color',
                        menuV2InfoHeaderOpacity: 'menu_v2_info_header_opacity',
                        menuV2InfoPanelOpacity: 'menu_v2_info_panel_opacity',
                        menuV2FilterThumbBgOpacity: 'menu_v2_filter_thumb_bg_opacity',
                        // Equipment Materials
                        color1Color: 'color1_color',
                        color1Opacity: 'color1_opacity',
                        color1Metalness: 'color1_metalness',
                        color1Roughness: 'color1_roughness'
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
                html += '        <button type="button" class="embed-code-btn" data-url="' + exerciseUrl + '" data-name="' + exercise.name.replace(/"/g, '&quot;') + '" data-id="' + exercise.id + '"><span class="dashicons dashicons-shortcode" style="font-size:14px;width:14px;height:14px;vertical-align:middle;margin-right:2px;"></span>Embed</button>';
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
            
            // Also update the Visual Theme Editor button URL
            var $editorBtn = $('.open-theme-editor-btn');
            if (viewerPageUrl) {
                var separator = viewerPageUrl.indexOf('?') !== -1 ? '&' : '?';
                $editorBtn.attr('href', viewerPageUrl + separator + 'openThemeEditor=1');
                $editorBtn.removeAttr('disabled').css({'pointer-events': 'auto', 'opacity': '1'});
                $editorBtn.closest('.cta-action').find('.cta-warning').remove();
            } else {
                $editorBtn.attr('href', '#');
                $editorBtn.attr('disabled', 'disabled').css({'pointer-events': 'none', 'opacity': '0.5'});
            }
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
                $('.embed-modal-overlay').remove();
            }
        });

        // ========== Embed Code Customizer ==========

        // Default embed settings
        var embedDefaults = {
            width: 800,
            height: 600,
            responsive: true,
            autoplay: true,
            showPlayer: true,
            allowFullscreen: true,
            hdModel: false,
            showParticles: true,
            showWatermark: true,
            transparentBg: false,
            borderRadius: 8,
            borderStyle: 'none'
        };

        // Open embed modal
        $(document).on('click', '.embed-code-btn', function() {
            var url = $(this).data('url');
            var name = $(this).data('name');
            var exerciseId = $(this).data('id');

            var modalHtml = '<div class="embed-modal-overlay">';
            modalHtml += '<div class="embed-modal">';
            modalHtml += '  <div class="embed-modal-header">';
            modalHtml += '    <h3><span class="dashicons dashicons-shortcode"></span> Embed Code Customizer</h3>';
            modalHtml += '    <button type="button" class="embed-modal-close">&times;</button>';
            modalHtml += '  </div>';
            modalHtml += '  <div class="embed-modal-body">';
            modalHtml += '    <div class="embed-exercise-name">🏋️ <strong>' + name + '</strong></div>';

            // Size options
            modalHtml += '    <div class="embed-options-grid">';
            modalHtml += '      <div class="embed-option-group">';
            modalHtml += '        <label for="embed-width">Width (px)</label>';
            modalHtml += '        <input type="number" id="embed-width" value="' + embedDefaults.width + '" min="200" max="1920" step="10" />';
            modalHtml += '      </div>';
            modalHtml += '      <div class="embed-option-group">';
            modalHtml += '        <label for="embed-height">Height (px)</label>';
            modalHtml += '        <input type="number" id="embed-height" value="' + embedDefaults.height + '" min="200" max="1080" step="10" />';
            modalHtml += '      </div>';
            modalHtml += '      <div class="embed-option-group">';
            modalHtml += '        <label for="embed-border-radius">Border Radius (px)</label>';
            modalHtml += '        <input type="number" id="embed-border-radius" value="' + embedDefaults.borderRadius + '" min="0" max="50" step="1" />';
            modalHtml += '      </div>';
            modalHtml += '      <div class="embed-option-group">';
            modalHtml += '        <label for="embed-border-style">Border Style</label>';
            modalHtml += '        <select id="embed-border-style">';
            modalHtml += '          <option value="none">None</option>';
            modalHtml += '          <option value="thin">Thin (1px solid #ddd)</option>';
            modalHtml += '          <option value="medium">Medium (2px solid #ccc)</option>';
            modalHtml += '          <option value="shadow">Drop Shadow</option>';
            modalHtml += '        </select>';
            modalHtml += '      </div>';
            modalHtml += '    </div>';

            // Toggle options
            modalHtml += '    <div class="embed-toggles-section">';
            modalHtml += '      <h4><span class="dashicons dashicons-admin-generic"></span> Options</h4>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Responsive</span><span class="label-desc">Auto-scales to fit container width</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-responsive" ' + (embedDefaults.responsive ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Autoplay Animation</span><span class="label-desc">Automatically play exercise animation on load</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-autoplay" ' + (embedDefaults.autoplay ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Show Player Controls</span><span class="label-desc">Show bottom playback bar and action buttons</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-show-player" ' + (embedDefaults.showPlayer ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Allow Fullscreen</span><span class="label-desc">Enable fullscreen button on the iframe</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-fullscreen" ' + (embedDefaults.allowFullscreen ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">HD Model</span><span class="label-desc">Load the high-definition model (larger file size, better quality)</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-hd-model" ' + (embedDefaults.hdModel ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Show Particles</span><span class="label-desc">Show floating dust particles in the background</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-show-particles" ' + (embedDefaults.showParticles ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Show Logo Watermark</span><span class="label-desc">Show the background logo watermark behind the model</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-show-watermark" ' + (embedDefaults.showWatermark ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '      <div class="embed-toggle-row">';
            modalHtml += '        <div class="embed-toggle-label"><span class="label-title">Transparent Background</span><span class="label-desc">Remove background so the model floats over the page</span></div>';
            modalHtml += '        <label class="embed-toggle-switch"><input type="checkbox" id="embed-transparent-bg" ' + (embedDefaults.transparentBg ? 'checked' : '') + ' /><span class="embed-toggle-slider"></span></label>';
            modalHtml += '      </div>';

            modalHtml += '    </div>';

            // Preview
            modalHtml += '    <div class="embed-preview-section">';
            modalHtml += '      <h4><span class="dashicons dashicons-visibility"></span> Preview</h4>';
            modalHtml += '      <p style="font-size:12px;color:#888;margin:0 0 8px;">Orbit and zoom in the preview to set your desired camera angle, then click <strong>Capture Camera Position</strong>.</p>';
            modalHtml += '      <div class="embed-preview-frame" id="embed-preview-frame"></div>';

            // Camera capture section
            modalHtml += '      <div class="embed-camera-section" style="margin-top:12px;">';
            modalHtml += '        <button type="button" id="embed-capture-camera-btn" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:#2271b1;color:#fff;border:none;border-radius:4px;font-size:13px;cursor:pointer;transition:background 0.2s;"><span class="dashicons dashicons-camera" style="font-size:16px;width:16px;height:16px;"></span> Capture Camera Position</button>';
            modalHtml += '        <button type="button" id="embed-reset-camera-btn" style="display:none;align-items:center;gap:6px;padding:8px 16px;background:#b32d2e;color:#fff;border:none;border-radius:4px;font-size:13px;cursor:pointer;margin-left:8px;transition:background 0.2s;"><span class="dashicons dashicons-no" style="font-size:16px;width:16px;height:16px;"></span> Reset Camera</button>';
            modalHtml += '        <div id="embed-camera-status" style="margin-top:8px;font-size:12px;color:#888;"></div>';
            modalHtml += '      </div>';

            modalHtml += '    </div>';

            // Code output
            modalHtml += '    <div class="embed-code-section">';
            modalHtml += '      <h4><span class="dashicons dashicons-editor-code"></span> Embed Code</h4>';
            modalHtml += '      <div class="embed-code-output">';
            modalHtml += '        <textarea id="embed-code-textarea" readonly></textarea>';
            modalHtml += '      </div>';
            modalHtml += '      <div class="embed-code-actions">';
            modalHtml += '        <button type="button" class="embed-copy-html-btn" id="embed-copy-html-btn"><span class="dashicons dashicons-clipboard" style="font-size:16px;width:16px;height:16px;"></span> Copy HTML Only</button>';
            modalHtml += '        <button type="button" class="embed-copy-btn" id="embed-copy-btn"><span class="dashicons dashicons-clipboard" style="font-size:16px;width:16px;height:16px;"></span> Copy Embed Code</button>';
            modalHtml += '      </div>';
            modalHtml += '    </div>';

            modalHtml += '  </div>'; // end body
            modalHtml += '</div>'; // end modal
            modalHtml += '</div>'; // end overlay

            $('body').append(modalHtml);

            // Store data on the modal
            $('.embed-modal').data('exercise-url', url)
                             .data('exercise-name', name)
                             .data('exercise-id', exerciseId);

            // Generate initial embed code
            updateEmbedCode();

            // Set initial disabled state for width/height based on responsive default
            var isResponsive = $('#embed-responsive').is(':checked');
            $('#embed-width, #embed-height').prop('disabled', isResponsive).css('opacity', isResponsive ? 0.4 : 1);
        });

        // Update embed code whenever an option changes
        $(document).on('input change', '#embed-width, #embed-height, #embed-border-radius, #embed-border-style, #embed-responsive, #embed-autoplay, #embed-show-player, #embed-fullscreen, #embed-hd-model, #embed-show-particles, #embed-show-watermark, #embed-transparent-bg', function() {
            updateEmbedCode();
            // Gray out width/height when responsive is on
            var isResponsive = $('#embed-responsive').is(':checked');
            $('#embed-width, #embed-height').prop('disabled', isResponsive).css('opacity', isResponsive ? 0.4 : 1);
        });

        // Captured camera position data (null = not captured, use default)
        var embedCameraData = null;

        // Listen for camera data responses from the preview iframe
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'flexframe-camera-data') {
                embedCameraData = {
                    position: event.data.position,
                    target: event.data.target
                };
                updateEmbedCode();

                // Update UI
                $('#embed-reset-camera-btn').css('display', 'inline-flex');
                var pos = embedCameraData.position;
                var tgt = embedCameraData.target;
                $('#embed-camera-status').html(
                    '<span style="color:#00a32a;">&#10003; Camera position captured!</span><br>' +
                    '<span style="color:#666;">Position: (' + pos.x + ', ' + pos.y + ', ' + pos.z + ')</span><br>' +
                    '<span style="color:#666;">Target: (' + tgt.x + ', ' + tgt.y + ', ' + tgt.z + ')</span>'
                );

                // Flash the button green briefly
                var $btn = $('#embed-capture-camera-btn');
                $btn.css('background', '#00a32a').html('<span class="dashicons dashicons-yes" style="font-size:16px;width:16px;height:16px;"></span> Captured!');
                setTimeout(function() {
                    $btn.css('background', '#2271b1').html('<span class="dashicons dashicons-camera" style="font-size:16px;width:16px;height:16px;"></span> Capture Camera Position');
                }, 1500);
            }
        });

        // Capture camera button click
        $(document).on('click', '#embed-capture-camera-btn', function() {
            var $iframe = $('#embed-preview-frame iframe')[0];
            if ($iframe && $iframe.contentWindow) {
                $iframe.contentWindow.postMessage({ type: 'flexframe-get-camera' }, '*');
                $(this).css('background', '#dba617').html('<span class="dashicons dashicons-update" style="font-size:16px;width:16px;height:16px;"></span> Requesting...');
            } else {
                $('#embed-camera-status').html('<span style="color:#d63638;">Preview iframe not loaded yet. Wait for the model to load first.</span>');
            }
        });

        // Reset camera button click
        $(document).on('click', '#embed-reset-camera-btn', function() {
            embedCameraData = null;
            updateEmbedCode();
            $(this).css('display', 'none');
            $('#embed-camera-status').html('<span style="color:#888;">Camera position reset to default.</span>');
        });

        function updateEmbedCode() {
            var $modal = $('.embed-modal');
            if (!$modal.length) return;

            var baseUrl = $modal.data('exercise-url');
            var name = $modal.data('exercise-name');
            var width = parseInt($('#embed-width').val()) || 800;
            var height = parseInt($('#embed-height').val()) || 600;
            var responsive = $('#embed-responsive').is(':checked');
            var autoplay = $('#embed-autoplay').is(':checked');
            var showPlayer = $('#embed-show-player').is(':checked');
            var fullscreen = $('#embed-fullscreen').is(':checked');
            var hdModel = $('#embed-hd-model').is(':checked');
            var showParticles = $('#embed-show-particles').is(':checked');
            var showWatermark = $('#embed-show-watermark').is(':checked');
            var transparentBg = $('#embed-transparent-bg').is(':checked');
            var borderRadius = parseInt($('#embed-border-radius').val()) || 0;
            var borderStyle = $('#embed-border-style').val();

            // Build iframe URL with embed params
            var sep = baseUrl.indexOf('?') !== -1 ? '&' : '?';
            var iframeUrl = baseUrl + sep + 'embed=1';
            if (autoplay) iframeUrl += '&autoplay=1';
            if (!showPlayer) iframeUrl += '&hideUI=1';
            if (!fullscreen) iframeUrl += '&hideFullscreen=1';
            if (hdModel) iframeUrl += '&hdModel=1';
            if (!showParticles) iframeUrl += '&hideParticles=1';
            if (!showWatermark) iframeUrl += '&hideWatermark=1';
            if (transparentBg) iframeUrl += '&transparentBg=1';

            // Add camera position params if captured
            if (embedCameraData) {
                iframeUrl += '&camPosX=' + embedCameraData.position.x;
                iframeUrl += '&camPosY=' + embedCameraData.position.y;
                iframeUrl += '&camPosZ=' + embedCameraData.position.z;
                iframeUrl += '&camTargetX=' + embedCameraData.target.x;
                iframeUrl += '&camTargetY=' + embedCameraData.target.y;
                iframeUrl += '&camTargetZ=' + embedCameraData.target.z;
            }

            // Build border style string
            var borderCSS = 'border:none;';
            if (borderStyle === 'thin') borderCSS = 'border:1px solid #ddd;';
            else if (borderStyle === 'medium') borderCSS = 'border:2px solid #ccc;';
            else if (borderStyle === 'shadow') borderCSS = 'border:none;box-shadow:0 4px 20px rgba(0,0,0,0.15);';

            var iframeStyle = borderCSS + 'border-radius:' + borderRadius + 'px;';

            var embedCode = '';

            if (responsive) {
                // Responsive wrapper — width/height only define the aspect ratio
                var aspectRatio = ((height / width) * 100).toFixed(2);
                embedCode += '<!-- FlexFrame Embed: ' + name + ' -->\n';
                embedCode += '<div style="position:relative;width:100%;padding-bottom:' + aspectRatio + '%;height:0;overflow:hidden;">\n';
                embedCode += '  <iframe src="' + iframeUrl + '" style="position:absolute;top:0;left:0;width:100%;height:100%;' + iframeStyle + '" ' + (fullscreen ? 'allowfullscreen ' : '') + 'loading="lazy" title="' + name + '"></iframe>\n';
                embedCode += '</div>';
            } else {
                // Fixed size
                embedCode += '<!-- FlexFrame Embed: ' + name + ' -->\n';
                embedCode += '<iframe src="' + iframeUrl + '" width="' + width + '" height="' + height + '" style="' + iframeStyle + '" ' + (fullscreen ? 'allowfullscreen ' : '') + 'loading="lazy" title="' + name + '"></iframe>';
            }

            // Update textarea
            $('#embed-code-textarea').val(embedCode);

            // Update preview
            var previewWidth = Math.min(width, 660);
            var previewHeight = Math.round(previewWidth * (height / width));
            var previewHtml = '<iframe src="' + iframeUrl + '" width="' + previewWidth + '" height="' + previewHeight + '" style="' + iframeStyle + '" title="' + name + '" loading="lazy"></iframe>';
            previewHtml += '<div style="margin-top:8px;font-size:11px;color:#888;text-align:center;">Live preview loads the 3D model via <code style="background:#f0f0f1;padding:2px 6px;border-radius:3px;font-size:11px;">?embed=1</code> — a clean, chrome-free viewer page designed for iframes.</div>';
            $('#embed-preview-frame').html(previewHtml);
        }

        // Copy full embed code
        $(document).on('click', '#embed-copy-btn', function(e) {
            e.stopPropagation();
            var $btn = $(this);
            var code = $('#embed-code-textarea').val();
            navigator.clipboard.writeText(code).then(function() {
                $btn.addClass('copied').html('<span class="dashicons dashicons-yes" style="font-size:16px;width:16px;height:16px;"></span> Copied!');
                setTimeout(function() {
                    $btn.removeClass('copied').html('<span class="dashicons dashicons-clipboard" style="font-size:16px;width:16px;height:16px;"></span> Copy Embed Code');
                }, 2000);
            });
        });

        // Copy iframe-only (no wrapper)
        $(document).on('click', '#embed-copy-html-btn', function(e) {
            e.stopPropagation();
            var $btn = $(this);
            var code = $('#embed-code-textarea').val();
            // Extract just the iframe tag
            var iframeMatch = code.match(/<iframe[^>]*><\/iframe>/);
            var htmlOnly = iframeMatch ? iframeMatch[0] : code;
            navigator.clipboard.writeText(htmlOnly).then(function() {
                $btn.css({borderColor: '#00a32a', color: '#00a32a'}).html('<span class="dashicons dashicons-yes" style="font-size:16px;width:16px;height:16px;"></span> Copied!');
                setTimeout(function() {
                    $btn.css({borderColor: '#ccc', color: '#1d2327'}).html('<span class="dashicons dashicons-clipboard" style="font-size:16px;width:16px;height:16px;"></span> Copy HTML Only');
                }, 2000);
            });
        });

        // Close embed modal
        $(document).on('click', '.embed-modal-close, .embed-modal-overlay', function(e) {
            if (e.target === this) {
                $('.embed-modal-overlay').remove();
            }
        });

        // Prevent clicks inside modal from closing it
        $(document).on('click', '.embed-modal', function(e) {
            e.stopPropagation();
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
        // Custom Exercises (YouTube) - CRUD
        // ============================================
        (function() {
            var customExercises = [];
            var editingIndex = -1; // -1 = adding new, >= 0 = editing
            var mediaFrame = null;

            // Load from hidden input
            function loadCustomExercises() {
                try {
                    customExercises = JSON.parse($('#flexframe_custom_exercises').val() || '[]');
                } catch (e) {
                    customExercises = [];
                }
                renderCustomExercisesList();
            }

            // Save to hidden input
            function saveCustomExercises() {
                $('#flexframe_custom_exercises').val(JSON.stringify(customExercises));
                renderCustomExercisesList();
            }

            // Generate a slug-style ID
            function generateExerciseId(name) {
                return 'custom_' + name.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '_')
                    .replace(/^_|_$/g, '')
                    + '_' + Date.now().toString(36);
            }

            // Extract YouTube video ID from URL
            function extractYouTubeId(url) {
                var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]{11})/);
                return match ? match[1] : null;
            }

            // Render the list of custom exercises
            function renderCustomExercisesList() {
                var $list = $('#custom-exercises-list');
                var $empty = $('#custom-exercises-empty');
                var $count = $('#custom-exercises-count');

                // Remove all items except the empty placeholder
                $list.find('.custom-exercise-item').remove();

                if (customExercises.length === 0) {
                    $empty.show();
                    $count.text('');
                    return;
                }

                $empty.hide();
                $count.text(customExercises.length + ' custom exercise' + (customExercises.length !== 1 ? 's' : ''));

                customExercises.forEach(function(ex, index) {
                    var thumbHtml = ex.thumbnailUrl
                        ? '<img src="' + escHtml(ex.thumbnailUrl) + '" alt="" /><span class="yt-badge">YT</span>'
                        : '<span class="thumb-placeholder">🎬</span>';

                    var musclesText = (ex.muscleGroup || []).join(', ') || 'No muscles';
                    var equipText = (ex.equipment || []).join(', ') || 'No equipment';

                    var html = '<div class="custom-exercise-item" data-index="' + index + '">'
                        + '<div class="custom-exercise-item-thumb">' + thumbHtml + '</div>'
                        + '<div class="custom-exercise-item-info">'
                        + '<div class="custom-exercise-item-name">' + escHtml(ex.name) + '</div>'
                        + '<div class="custom-exercise-item-meta">'
                        + '<span>📂 ' + escHtml(ex.type || 'Strength') + '</span>'
                        + '<span>💪 ' + escHtml(musclesText) + '</span>'
                        + '<span>🏋️ ' + escHtml(equipText) + '</span>'
                        + (ex.showInfo ? '<span>📋 Info</span>' : '')
                        + '<span>📍 ' + (function(){ var where = []; if(ex.showInViewer !== false) where.push('Viewer'); if(ex.showInWorkout !== false) where.push('Workout'); return where.length ? where.join(' + ') : 'Hidden'; })() + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="custom-exercise-item-actions">'
                        + '<button type="button" class="ce-edit-btn" title="Edit">✏️ Edit</button>'
                        + '<button type="button" class="ce-delete-btn" title="Delete">🗑️ Delete</button>'
                        + '</div>'
                        + '</div>';
                    $list.append(html);
                });
            }

            // Simple HTML escape
            function escHtml(str) {
                var div = document.createElement('div');
                div.textContent = str || '';
                return div.innerHTML;
            }

            // Reset form fields
            function resetForm() {
                editingIndex = -1;
                $('#custom-exercise-form-title').text('Add Custom Exercise');
                $('#ce-name').val('');
                $('#ce-youtube').val('');
                $('#ce-thumbnail-url').val('');
                $('#ce-thumbnail-preview').removeClass('has-image').html('<span class="no-thumbnail">📷</span>');
                $('#ce-remove-thumbnail-btn').hide();
                $('#ce-type').val('Strength');
                $('#ce-muscles-grid input[type="checkbox"]').prop('checked', false);
                $('#ce-equipment-grid input[type="checkbox"]').prop('checked', false);
                $('#ce-show-in-viewer').prop('checked', true);
                $('#ce-show-in-workout').prop('checked', true);
                $('#ce-show-info').prop('checked', true);
                $('#ce-info-fields').show();
                $('#ce-step1, #ce-step2, #ce-step3, #ce-step4').val('');
            }

            // Populate form for editing
            function populateForm(ex) {
                $('#custom-exercise-form-title').text('Edit Custom Exercise');
                $('#ce-name').val(ex.name || '');
                $('#ce-youtube').val(ex.youtubeUrl || '');
                
                // Thumbnail
                if (ex.thumbnailUrl) {
                    $('#ce-thumbnail-url').val(ex.thumbnailUrl);
                    $('#ce-thumbnail-preview').addClass('has-image').html('<img src="' + escHtml(ex.thumbnailUrl) + '" alt="" />');
                    $('#ce-remove-thumbnail-btn').show();
                } else {
                    $('#ce-thumbnail-url').val('');
                    $('#ce-thumbnail-preview').removeClass('has-image').html('<span class="no-thumbnail">📷</span>');
                    $('#ce-remove-thumbnail-btn').hide();
                }

                $('#ce-type').val(ex.type || 'Strength');

                // Muscles
                $('#ce-muscles-grid input[type="checkbox"]').each(function() {
                    $(this).prop('checked', (ex.muscleGroup || []).indexOf($(this).val()) !== -1);
                });

                // Equipment
                $('#ce-equipment-grid input[type="checkbox"]').each(function() {
                    $(this).prop('checked', (ex.equipment || []).indexOf($(this).val()) !== -1);
                });

                // Display-in toggles
                $('#ce-show-in-viewer').prop('checked', ex.showInViewer !== false);
                $('#ce-show-in-workout').prop('checked', ex.showInWorkout !== false);

                // Show info toggle
                var showInfo = ex.showInfo !== false; // default true
                $('#ce-show-info').prop('checked', showInfo);
                $('#ce-info-fields').toggle(showInfo);

                // Steps
                var info = ex.information || {};
                $('#ce-step1').val(info.step1 || '');
                $('#ce-step2').val(info.step2 || '');
                $('#ce-step3').val(info.step3 || '');
                $('#ce-step4').val(info.step4 || '');
            }

            // Collect form data into an exercise object
            function collectFormData() {
                var muscles = [];
                $('#ce-muscles-grid input[type="checkbox"]:checked').each(function() {
                    muscles.push($(this).val());
                });

                var equipment = [];
                $('#ce-equipment-grid input[type="checkbox"]:checked').each(function() {
                    equipment.push($(this).val());
                });

                var showInfo = $('#ce-show-info').is(':checked');

                var exercise = {
                    name: $.trim($('#ce-name').val()),
                    youtubeUrl: $.trim($('#ce-youtube').val()),
                    thumbnailUrl: $('#ce-thumbnail-url').val() || '',
                    type: $('#ce-type').val(),
                    muscleGroup: muscles,
                    equipment: equipment,
                    source: 'custom',
                    showInViewer: $('#ce-show-in-viewer').is(':checked'),
                    showInWorkout: $('#ce-show-in-workout').is(':checked'),
                    showInfo: showInfo,
                    information: showInfo ? {
                        step1: $.trim($('#ce-step1').val()),
                        step2: $.trim($('#ce-step2').val()),
                        step3: $.trim($('#ce-step3').val()),
                        step4: $.trim($('#ce-step4').val())
                    } : {}
                };

                return exercise;
            }

            // Validate form
            function validateForm(exercise) {
                if (!exercise.name) {
                    alert('Please enter an exercise name.');
                    $('#ce-name').focus();
                    return false;
                }
                if (!exercise.youtubeUrl) {
                    alert('Please enter a YouTube URL.');
                    $('#ce-youtube').focus();
                    return false;
                }
                if (!extractYouTubeId(exercise.youtubeUrl)) {
                    alert('Please enter a valid YouTube URL.');
                    $('#ce-youtube').focus();
                    return false;
                }
                return true;
            }

            // Show form
            function showForm() {
                $('#custom-exercise-form').slideDown(200);
                // Scroll form into view
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: $('#custom-exercise-form').offset().top - 100
                    }, 300);
                }, 210);
            }

            // Hide form
            function hideForm() {
                $('#custom-exercise-form').slideUp(200);
            }

            // ---- Event Handlers ----

            // Add button
            $('#add-custom-exercise-btn').on('click', function() {
                resetForm();
                showForm();
            });

            // Cancel / close
            $('#custom-exercise-cancel-btn, #custom-exercise-form-close').on('click', function() {
                hideForm();
            });

            // Show Info toggle
            $('#ce-show-info').on('change', function() {
                $('#ce-info-fields').slideToggle(200);
            });

            // Upload thumbnail via Media Library
            $('#ce-upload-thumbnail-btn').on('click', function(e) {
                e.preventDefault();
                if (mediaFrame) {
                    mediaFrame.open();
                    return;
                }
                mediaFrame = wp.media({
                    title: 'Select Exercise Thumbnail',
                    button: { text: 'Use as Thumbnail' },
                    multiple: false,
                    library: { type: 'image' }
                });
                mediaFrame.on('select', function() {
                    var attachment = mediaFrame.state().get('selection').first().toJSON();
                    var url = attachment.sizes && attachment.sizes.medium
                        ? attachment.sizes.medium.url
                        : attachment.url;
                    $('#ce-thumbnail-url').val(url);
                    $('#ce-thumbnail-preview').addClass('has-image').html('<img src="' + escHtml(url) + '" alt="" />');
                    $('#ce-remove-thumbnail-btn').show();
                });
                mediaFrame.open();
            });

            // Remove thumbnail
            $('#ce-remove-thumbnail-btn').on('click', function() {
                $('#ce-thumbnail-url').val('');
                $('#ce-thumbnail-preview').removeClass('has-image').html('<span class="no-thumbnail">📷</span>');
                $(this).hide();
            });

            // Save exercise
            $('#custom-exercise-save-btn').on('click', function() {
                var exercise = collectFormData();
                if (!validateForm(exercise)) return;

                if (editingIndex >= 0) {
                    // Keep the original ID
                    exercise.id = customExercises[editingIndex].id;
                    customExercises[editingIndex] = exercise;
                } else {
                    // New exercise — generate ID
                    exercise.id = generateExerciseId(exercise.name);
                    customExercises.push(exercise);
                }

                saveCustomExercises();
                hideForm();
            });

            // Edit button (delegated)
            $('#custom-exercises-list').on('click', '.ce-edit-btn', function() {
                var index = $(this).closest('.custom-exercise-item').data('index');
                editingIndex = index;
                populateForm(customExercises[index]);
                showForm();
            });

            // Delete button (delegated)
            $('#custom-exercises-list').on('click', '.ce-delete-btn', function() {
                var index = $(this).closest('.custom-exercise-item').data('index');
                var name = customExercises[index].name;
                if (confirm('Delete "' + name + '"? This cannot be undone.')) {
                    customExercises.splice(index, 1);
                    saveCustomExercises();
                    // If we were editing this one, close form
                    if (editingIndex === index) {
                        hideForm();
                        editingIndex = -1;
                    } else if (editingIndex > index) {
                        editingIndex--;
                    }
                }
            });

            // Initialize
            loadCustomExercises();
        })();
        
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
                // Defensive: when super-admin-gated inputs aren't rendered,
                // $('#...').val() is undefined. Fall back to transparent black.
                if (typeof hex !== 'string' || hex.charAt(0) !== '#' || hex.length < 7) {
                    return 'rgba(0, 0, 0, 0)';
                }
                if (isNaN(alpha)) { alpha = 1; }
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
        
        // ========== Step 6: Gym Demo Pages ==========
        
        // Demo logo uploader (create form)
        var demoLogoUploader;
        $('#demo-logo-upload-btn').on('click', function(e) {
            e.preventDefault();
            if (demoLogoUploader) {
                demoLogoUploader.open();
                return;
            }
            demoLogoUploader = wp.media({
                title: '<?php _e('Select Demo Logo', 'flexframe-viewer'); ?>',
                button: { text: '<?php _e('Use this logo', 'flexframe-viewer'); ?>' },
                library: { type: 'image' },
                multiple: false
            });
            demoLogoUploader.on('select', function() {
                var attachment = demoLogoUploader.state().get('selection').first().toJSON();
                $('#flexframe_demo_logo_url').val(attachment.url);
                $('#demo-logo-preview-img').attr('src', attachment.url);
                $('#demo-logo-preview').show();
            });
            demoLogoUploader.open();
        });
        
        // Remove demo logo (create form)
        $('#demo-logo-remove').on('click', function(e) {
            e.preventDefault();
            $('#flexframe_demo_logo_url').val('');
            $('#demo-logo-preview-img').attr('src', '');
            $('#demo-logo-preview').hide();
        });
        
        // Change/upload logo for existing demo page (table row)
        $(document).on('click', '.demo-table-logo-change', function(e) {
            e.preventDefault();
            var $wrapper = $(this).closest('.demo-table-logo-wrapper');
            var pageId = $wrapper.data('page-id');
            
            var rowLogoUploader = wp.media({
                title: '<?php _e('Select Demo Logo', 'flexframe-viewer'); ?>',
                button: { text: '<?php _e('Use this logo', 'flexframe-viewer'); ?>' },
                library: { type: 'image' },
                multiple: false
            });
            rowLogoUploader.on('select', function() {
                var attachment = rowLogoUploader.state().get('selection').first().toJSON();
                // Save via AJAX
                var themePreset = $wrapper.closest('tr').find('.demo-theme-select').val();
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'flexframe_update_demo_theme',
                        nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                        page_id: pageId,
                        theme_preset: themePreset,
                        demo_logo_url: attachment.url
                    },
                    success: function(response) {
                        if (response.success) {
                            // Update the cell UI
                            $wrapper.removeClass('no-logo');
                            if ($wrapper.find('.demo-table-logo-img').length) {
                                $wrapper.find('.demo-table-logo-img').attr('src', attachment.url);
                            } else {
                                $wrapper.html(
                                    '<img src="' + attachment.url + '" alt="Logo" class="demo-table-logo-img" />' +
                                    '<button type="button" class="demo-table-logo-change" title="Change logo"><span class="dashicons dashicons-edit"></span></button>' +
                                    '<button type="button" class="demo-table-logo-remove" data-page-id="' + pageId + '" title="Remove logo"><span class="dashicons dashicons-no-alt"></span></button>'
                                );
                            }
                            $wrapper.find('.demo-uses-global').remove();
                        }
                    }
                });
            });
            rowLogoUploader.open();
        });
        
        // Remove logo from existing demo page (table row)
        $(document).on('click', '.demo-table-logo-remove', function(e) {
            e.preventDefault();
            var $btn = $(this);
            var pageId = $btn.data('page-id');
            var $wrapper = $btn.closest('.demo-table-logo-wrapper');
            var themePreset = $wrapper.closest('tr').find('.demo-theme-select').val();
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_update_demo_theme',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    page_id: pageId,
                    theme_preset: themePreset,
                    demo_logo_url: ''
                },
                success: function(response) {
                    if (response.success) {
                        $wrapper.addClass('no-logo');
                        $wrapper.html(
                            '<button type="button" class="button button-small demo-table-logo-change" title="Upload logo"><span class="dashicons dashicons-format-image" style="margin-top: 3px;"></span></button>' +
                            '<span class="demo-uses-global">Global</span>'
                        );
                    }
                }
            });
        });
        
        // Auto-generate slug from name
        $('#flexframe_demo_name').on('input', function() {
            var name = $(this).val();
            var slug = name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            $('#flexframe_demo_slug').val(slug);
        });
        
        // Create Demo Page
        $('#flexframe-create-demo-page').on('click', function() {
            var $btn = $(this);
            var $status = $('#flexframe-demo-create-status');
            var demoName = $('#flexframe_demo_name').val().trim();
            var demoSlug = $('#flexframe_demo_slug').val().trim();
            var themePreset = $('#flexframe_demo_theme').val();
            var demoLogoUrl = $('#flexframe_demo_logo_url').val();
            
            if (!demoName) {
                $status.html('<span style="color: #d63638;">✗ Please enter a demo name.</span>');
                return;
            }
            if (!demoSlug) {
                $status.html('<span style="color: #d63638;">✗ Please enter a URL slug.</span>');
                return;
            }
            if (!themePreset) {
                $status.html('<span style="color: #d63638;">✗ Please select a theme.</span>');
                return;
            }
            
            $btn.prop('disabled', true).html('<span class="dashicons dashicons-update spin" style="margin-top: 4px;"></span> Creating...');
            $status.html('<span style="color: #666;">Creating demo page...</span>');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_demo_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    demo_name: demoName,
                    demo_slug: demoSlug,
                    theme_preset: themePreset,
                    demo_logo_url: demoLogoUrl
                },
                success: function(response) {
                    if (response.success) {
                        $status.html('<span style="color: #00a32a;">✓ ' + response.data.message + '</span>');
                        // Clear form
                        $('#flexframe_demo_name').val('');
                        $('#flexframe_demo_slug').val('');
                        $('#flexframe_demo_theme').val('');
                        $('#flexframe_demo_logo_url').val('');
                        $('#demo-logo-preview-img').attr('src', '');
                        $('#demo-logo-preview').hide();
                        // Refresh demo list
                        refreshDemoPagesList(response.data.demo_pages);
                    } else {
                        $status.html('<span style="color: #d63638;">✗ ' + response.data.message + '</span>');
                    }
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 4px;"></span> Create Demo Page');
                },
                error: function() {
                    $status.html('<span style="color: #d63638;">✗ An error occurred. Please try again.</span>');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 4px;"></span> Create Demo Page');
                }
            });
        });
        
        // Update Demo Page Theme
        $(document).on('click', '.demo-update-theme-btn', function() {
            var $btn = $(this);
            var pageId = $btn.data('page-id');
            var themePreset = $btn.closest('td').find('.demo-theme-select').val();
            
            $btn.prop('disabled', true).html('<span class="dashicons dashicons-update spin" style="margin-top: 3px;"></span>');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_update_demo_theme',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    page_id: pageId,
                    theme_preset: themePreset
                },
                success: function(response) {
                    if (response.success) {
                        $btn.addClass('updated').html('<span class="dashicons dashicons-yes" style="margin-top: 3px;"></span> Saved');
                        setTimeout(function() {
                            $btn.removeClass('updated').html('<span class="dashicons dashicons-update" style="margin-top: 3px;"></span> Apply');
                        }, 2000);
                    } else {
                        alert(response.data.message);
                    }
                    $btn.prop('disabled', false);
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-update" style="margin-top: 3px;"></span> Apply');
                }
            });
        });
        
        // Refresh Demo Page Snapshot (re-capture current settings)
        $(document).on('click', '.demo-refresh-btn', function() {
            var $btn = $(this);
            var pageId = $btn.data('page-id');
            
            if (!confirm('This will update the demo page to use your CURRENT global settings (Steps 1-5). The demo page\'s theme selection will still be applied on top. Continue?')) {
                return;
            }
            
            $btn.prop('disabled', true).find('.dashicons').addClass('spin');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_refresh_demo_snapshot',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    page_id: pageId
                },
                success: function(response) {
                    if (response.success) {
                        $btn.find('.dashicons').removeClass('spin');
                        // Brief success flash
                        $btn.closest('tr').css('background-color', '#e7f5e7');
                        setTimeout(function() {
                            $btn.closest('tr').css('background-color', '');
                            $btn.prop('disabled', false);
                        }, 1500);
                    } else {
                        alert(response.data.message);
                        $btn.find('.dashicons').removeClass('spin');
                        $btn.prop('disabled', false);
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.find('.dashicons').removeClass('spin');
                    $btn.prop('disabled', false);
                }
            });
        });
        
        // Delete Demo Page
        $(document).on('click', '.demo-delete-btn', function() {
            var $btn = $(this);
            var pageId = $btn.data('page-id');
            var demoName = $btn.data('name');
            
            if (!confirm('Are you sure you want to delete the demo page "' + demoName + '"? This will move the page to trash.')) {
                return;
            }
            
            $btn.prop('disabled', true);
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_delete_demo_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    page_id: pageId
                },
                success: function(response) {
                    if (response.success) {
                        $btn.closest('tr').fadeOut(300, function() {
                            $(this).remove();
                            // If no more rows, show empty state
                            if ($('.demo-pages-table tbody tr').length === 0) {
                                refreshDemoPagesList({});
                            }
                        });
                    } else {
                        alert(response.data.message);
                        $btn.prop('disabled', false);
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.prop('disabled', false);
                }
            });
        });
        
        // Helper: Refresh the demo pages list HTML
        function refreshDemoPagesList(demoPages) {
            var $list = $('#flexframe-demo-pages-list');
            
            if (!demoPages || Object.keys(demoPages).length === 0) {
                $list.html(
                    '<div class="demo-empty-state">' +
                    '<span class="dashicons dashicons-store"></span>' +
                    '<p>No demo pages created yet. Create your first one above!</p>' +
                    '</div>'
                );
                return;
            }
            
            // Reload the page to get fresh server-rendered list
            location.reload();
        }
        
        // ========== Step 7: Client Access JS ==========
        
        // Auto-generate username from display name
        $('#flexframe_client_name').on('input', function() {
            var name = $(this).val();
            var username = name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '')
                .substring(0, 30);
            $('#flexframe_client_username').val(username);
        });
        
        // Generate random password
        function generatePassword(length) {
            length = length || 16;
            var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
            var password = '';
            for (var i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        }
        
        $('#generate-password-btn').on('click', function() {
            $('#flexframe_client_password').val(generatePassword(16));
        });
        
        // Auto-generate password on page load if field is empty
        if ($('#flexframe_client_password').length && !$('#flexframe_client_password').val()) {
            $('#flexframe_client_password').val(generatePassword(16));
        }
        
        // Copy login URL to clipboard
        $('#copy-login-url').on('click', function() {
            var url = $('#client-login-url').text();
            navigator.clipboard.writeText(url).then(function() {
                var $btn = $('#copy-login-url');
                $btn.find('.dashicons').removeClass('dashicons-clipboard').addClass('dashicons-yes');
                setTimeout(function() {
                    $btn.find('.dashicons').removeClass('dashicons-yes').addClass('dashicons-clipboard');
                }, 1500);
            });
        });
        
        // Copy login shortcode to clipboard
        $('#copy-login-shortcode').on('click', function() {
            navigator.clipboard.writeText('[flexframe_login]').then(function() {
                var $btn = $('#copy-login-shortcode');
                $btn.find('.dashicons').removeClass('dashicons-clipboard').addClass('dashicons-yes');
                setTimeout(function() {
                    $btn.find('.dashicons').removeClass('dashicons-yes').addClass('dashicons-clipboard');
                }, 1500);
            });
        });
        
        // Create Login Page
        $('#create-login-page-btn').on('click', function() {
            var $btn = $(this);
            $btn.prop('disabled', true).text('Creating...');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_login_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        location.reload();
                    } else {
                        alert(response.data.message);
                        $btn.prop('disabled', false).text('Create Login Page');
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.prop('disabled', false).text('Create Login Page');
                }
            });
        });
        
        // Create Client Account
        $('#create-client-btn').on('click', function() {
            var $btn = $(this);
            var displayName = $('#flexframe_client_name').val().trim();
            var email = $('#flexframe_client_email').val().trim();
            var username = $('#flexframe_client_username').val().trim();
            var password = $('#flexframe_client_password').val().trim();
            
            if (!displayName || !email || !username || !password) {
                alert('All fields are required.');
                return;
            }
            
            $btn.prop('disabled', true);
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_client_account',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    display_name: displayName,
                    email: email,
                    username: username,
                    password: password
                },
                success: function(response) {
                    if (response.success) {
                        // Show credentials summary before clearing
                        var loginUrl = $('#client-login-url').text();
                        var summary = 'Account created!\n\n' +
                            'Login URL: ' + loginUrl + '\n' +
                            'Username: ' + username + '\n' +
                            'Password: ' + password + '\n\n' +
                            'Copy these credentials now — the password won\'t be shown again.';
                        
                        if (confirm(summary + '\n\nClick OK to copy credentials to clipboard.')) {
                            navigator.clipboard.writeText(
                                'Login URL: ' + loginUrl + '\n' +
                                'Username: ' + username + '\n' +
                                'Password: ' + password
                            ).catch(function() {});
                        }
                        
                        location.reload();
                    } else {
                        alert(response.data.message);
                        $btn.prop('disabled', false);
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.prop('disabled', false);
                }
            });
        });
        
        // Reset Client Password (opens modal)
        $(document).on('click', '.client-reset-pw-btn', function() {
            var userId = $(this).data('user-id');
            var userName = $(this).data('name');
            var newPw = generatePassword(16);
            
            var modalHtml = '<div class="flexframe-modal-overlay">' +
                '<div class="flexframe-modal">' +
                    '<h3><span class="dashicons dashicons-lock" style="margin-right: 6px;"></span>Reset Password for ' + $('<span>').text(userName).html() + '</h3>' +
                    '<div class="modal-field">' +
                        '<label>New Password</label>' +
                        '<input type="text" id="modal-new-password" value="' + newPw + '" />' +
                    '</div>' +
                    '<div class="modal-actions">' +
                        '<button type="button" class="button modal-cancel-btn">Cancel</button>' +
                        '<button type="button" class="button button-primary modal-confirm-reset-btn" data-user-id="' + userId + '">Reset Password</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
            
            $('body').append(modalHtml);
        });
        
        // Close modal
        $(document).on('click', '.modal-cancel-btn, .flexframe-modal-overlay', function(e) {
            if (e.target === this) {
                $('.flexframe-modal-overlay').remove();
            }
        });
        
        // Confirm password reset
        $(document).on('click', '.modal-confirm-reset-btn', function() {
            var $btn = $(this);
            var userId = $btn.data('user-id');
            var newPassword = $('#modal-new-password').val().trim();
            
            if (!newPassword) {
                alert('Password cannot be empty.');
                return;
            }
            
            $btn.prop('disabled', true).text('Resetting...');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_reset_client_password',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    user_id: userId,
                    new_password: newPassword
                },
                success: function(response) {
                    if (response.success) {
                        if (confirm(response.data.message + '\n\nNew password: ' + newPassword + '\n\nClick OK to copy to clipboard.')) {
                            navigator.clipboard.writeText(newPassword).catch(function() {});
                        }
                        $('.flexframe-modal-overlay').remove();
                    } else {
                        alert(response.data.message);
                        $btn.prop('disabled', false).text('Reset Password');
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.prop('disabled', false).text('Reset Password');
                }
            });
        });
        
        // Delete Client Account
        $(document).on('click', '.client-delete-btn', function() {
            var $btn = $(this);
            var userId = $btn.data('user-id');
            var userName = $btn.data('name');
            
            if (!confirm('Are you sure you want to permanently delete the account for "' + userName + '"?\n\nThis cannot be undone.')) {
                return;
            }
            
            $btn.prop('disabled', true);
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_delete_client_account',
                    nonce: '<?php echo wp_create_nonce('flexframe_settings_nonce'); ?>',
                    user_id: userId
                },
                success: function(response) {
                    if (response.success) {
                        $btn.closest('tr').fadeOut(300, function() {
                            $(this).remove();
                            if ($('.client-accounts-table tbody tr').length === 0) {
                                $('#flexframe-client-accounts-list').html(
                                    '<div class="client-empty-state">' +
                                    '<span class="dashicons dashicons-admin-users"></span>' +
                                    '<p>No client accounts created yet. Create your first one above!</p>' +
                                    '</div>'
                                );
                            }
                        });
                    } else {
                        alert(response.data.message);
                        $btn.prop('disabled', false);
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                    $btn.prop('disabled', false);
                }
            });
        });
        
        // ========== Step 8: Model Tester ==========
        
        // GLB Upload button
        var glbUploader;
        $('#flexframe_upload_test_model_button').on('click', function(e) {
            e.preventDefault();
            
            if (glbUploader) {
                glbUploader.open();
                return;
            }
            
            glbUploader = wp.media({
                title: 'Select GLB Model File',
                button: { text: 'Use this model' },
                multiple: false
            });
            
            glbUploader.on('select', function() {
                var attachment = glbUploader.state().get('selection').first().toJSON();
                var url = attachment.url;
                
                // Accept any .glb file regardless of mime type detection
                if (!url.toLowerCase().endsWith('.glb')) {
                    alert('Please select a .glb file.');
                    return;
                }
                
                $('#flexframe_test_model_url').val(url);
                $('#flexframe_remove_test_model_button').show();
                
                // Auto-enable the test model toggle
                $('#flexframe_test_model_enabled').prop('checked', true);
            });
            
            glbUploader.open();
        });
        
        // Remove test model
        $('#flexframe_remove_test_model_button').on('click', function(e) {
            e.preventDefault();
            $('#flexframe_test_model_url').val('');
            $('#flexframe_test_model_enabled').prop('checked', false);
            $(this).hide();
        });
        
        // Also allow pasting a URL directly - show/hide remove button
        $('#flexframe_test_model_url').on('input', function() {
            if ($(this).val()) {
                $('#flexframe_remove_test_model_button').show();
            } else {
                $('#flexframe_remove_test_model_button').hide();
            }
        });
        
        // Material reference toggle
        $('#model-tester-reference-toggle').on('click', function() {
            $('#model-tester-reference-content').slideToggle(200);
        });
        
        // Create Workout Builder Page button handler
        $('#flexframe-create-workout-page').on('click', function() {
            var $btn = $(this);
            var $status = $('#flexframe-create-workout-page-status');
            
            $btn.prop('disabled', true).text('Creating...');
            $status.html('<span style="color: #666;">Please wait...</span>');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_workout_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_create_page'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        $status.html('<span style="color: #00a32a;">✓ ' + response.data.message + '</span>');
                        $('#flexframe_workout_page_url').val(response.data.url);
                        
                        // Update the URL status section below the input
                        $('#flexframe-workout-url-status').html(
                            '<span style="color: #00a32a; font-size: 14px;">✓ Workout page URL is set.</span> ' +
                            '<a href="' + response.data.url + '" target="_blank" class="button button-secondary" style="margin-left: 12px;">View Page →</a> ' +
                            '<a href="' + response.data.edit_url + '" target="_blank" class="button button-secondary" style="margin-left: 8px;">Edit Page</a>'
                        );
                        
                        // Show links to view/edit the page in status area
                        setTimeout(function() {
                            $status.html(
                                '<span style="color: #00a32a;">✓ Page created!</span> '
                            );
                        }, 1500);
                    } else {
                        $status.html('<span style="color: #d63638;">✗ ' + response.data.message + '</span>');
                    }
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span> Create Workout Builder Page');
                },
                error: function() {
                    $status.html('<span style="color: #d63638;">✗ An error occurred. Please try again.</span>');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span> Create Workout Builder Page');
                }
            });
        });

        // Create Dashboard Page button handler
        $('#flexframe-create-dashboard-page').on('click', function() {
            var $btn = $(this);
            var $status = $('#flexframe-create-dashboard-page-status');
            
            $btn.prop('disabled', true).text('Creating...');
            $status.html('<span style="color: #666;">Please wait...</span>');
            
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_dashboard_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_create_page'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        $status.html('<span style="color: #00a32a;">✓ ' + response.data.message + '</span>');
                        $('#flexframe_dashboard_page_url').val(response.data.url);
                        
                        $('#flexframe-dashboard-url-status').html(
                            '<span style="color: #00a32a; font-size: 14px;">✓ Dashboard page URL is set.</span> ' +
                            '<a href="' + response.data.url + '" target="_blank" class="button button-secondary" style="margin-left: 12px;">View Page →</a> ' +
                            '<a href="' + response.data.edit_url + '" target="_blank" class="button button-secondary" style="margin-left: 8px;">Edit Page</a>'
                        );
                        
                        setTimeout(function() {
                            $status.html('<span style="color: #00a32a;">✓ Page created!</span>');
                        }, 1500);
                    } else {
                        $status.html('<span style="color: #d63638;">✗ ' + response.data.message + '</span>');
                    }
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span> Create Dashboard Page');
                },
                error: function() {
                    $status.html('<span style="color: #d63638;">✗ An error occurred. Please try again.</span>');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-plus-alt" style="margin-top: 3px;"></span> Create Dashboard Page');
                }
            });
        });

        // ── Lead Capture Mode Toggle ──
        $('input[name="flexframe_lead_capture_mode"]').on('change', function() {
            var mode = $(this).val();
            // Update radio card styles
            $('input[name="flexframe_lead_capture_mode"]').each(function() {
                var $label = $(this).closest('label');
                if ($(this).is(':checked')) {
                    $label.css({'background': '#f0f6fc', 'border-color': '#2271b1'});
                } else {
                    $label.css({'background': '#f9f9f9', 'border-color': '#e0e0e0'});
                }
            });
            if (mode === 'off') {
                $('#lead-capture-options').slideUp(200);
            } else {
                $('#lead-capture-options').slideDown(200);
                if (mode === 'contact') {
                    $('#lead-capture-contact-options').slideDown(200);
                } else {
                    $('#lead-capture-contact-options').slideUp(200);
                }
            }
        });

        // ── Email Captures Panel ──
        var emailCapturePage = 1;

        function loadEmailCaptures(page) {
            page = page || 1;
            emailCapturePage = page;
            var $tbody = $('#flexframe-email-captures-table tbody');
            var $pagination = $('#flexframe-email-pagination');
            var $total = $('#flexframe-email-total');

            $tbody.html('<tr><td colspan="11" style="text-align:center;padding:20px;color:#666;">Loading...</td></tr>');

            $.ajax({
                url: ajaxurl,
                type: 'GET',
                data: { action: 'flexframe_get_email_captures', page_num: page },
                success: function(response) {
                    if (!response.success) {
                        $tbody.html('<tr><td colspan="11" style="text-align:center;color:#d63638;">Error loading data.</td></tr>');
                        return;
                    }
                    var d = response.data;
                    $total.text(d.total + ' total lead' + (d.total !== 1 ? 's' : '') + ' captured');

                    if (d.rows.length === 0) {
                        $tbody.html('<tr><td colspan="11" style="text-align:center;padding:20px;color:#666;">No leads captured yet.</td></tr>');
                        $pagination.empty();
                        return;
                    }

                    var html = '';
                    $.each(d.rows, function(i, row) {
                        var source = row.source || 'workout';
                        var sourceBadge = source === 'dashboard' 
                            ? '<span style="background:#e7f5ff;color:#1971c2;padding:2px 6px;border-radius:4px;font-size:11px;">Dashboard</span>' 
                            : '<span style="background:#fff3e0;color:#e65100;padding:2px 6px;border-radius:4px;font-size:11px;">Workout</span>';
                        
                        html += '<tr data-id="' + row.id + '">';
                        html += '<td>' + sourceBadge + '</td>';
                        html += '<td>' + $('<span>').text(row.email).html() + '</td>';
                        html += '<td>' + $('<span>').text(row.lead_name || '—').html() + '</td>';
                        html += '<td>' + $('<span>').text(row.phone || '—').html() + '</td>';
                        html += '<td>' + (parseInt(row.marketing_consent) ? '<span style="color:#00a32a;">Yes</span>' : '<span style="color:#d63638;">No</span>') + '</td>';
                        html += '<td>' + (parseInt(row.day_pass_requested) ? '<span style="color:#00a32a;">Yes</span>' : '<span style="color:#888;">No</span>') + '</td>';
                        html += '<td style="text-align:center;font-weight:700;">' + (parseInt(row.workout_count) || 0) + '</td>';

                        // Message / Workout Links column
                        var contentHtml = '';
                        if (row.message && row.message.trim()) {
                            contentHtml = '<div style="max-height:60px;overflow-y:auto;font-size:12px;line-height:1.4;color:#555;">' + $('<span>').text(row.message).html() + '</div>';
                        } else {
                            try {
                                var links = JSON.parse(row.workout_links || '[]');
                                if (links.length > 0) {
                                    var baseUrl = d.workoutBaseUrl || '';
                                    contentHtml = '<div style="max-height:60px;overflow-y:auto;font-size:12px;line-height:1.6;">';
                                    $.each(links, function(li, lnk) {
                                        var url = baseUrl + (lnk.hash || '');
                                        var name = lnk.name || 'Workout';
                                        contentHtml += '<a href="' + url + '" target="_blank" style="display:block;color:#2271b1;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="' + $('<span>').text(name).html() + '">' + $('<span>').text(name).html() + '</a>';
                                    });
                                    contentHtml += '</div>';
                                } else {
                                    contentHtml = '—';
                                }
                            } catch(e) { contentHtml = '—'; }
                        }
                        html += '<td>' + contentHtml + '</td>';

                        html += '<td>' + $('<span>').text(row.workout_name || '—').html() + '</td>';
                        html += '<td>' + $('<span>').text(row.captured_at || '').html() + '</td>';
                        html += '<td><button type="button" class="button button-small flexframe-delete-email-capture" data-id="' + row.id + '" style="color:#d63638;">Delete</button></td>';
                        html += '</tr>';
                    });
                    $tbody.html(html);

                    // Pagination
                    if (d.pages > 1) {
                        var pHtml = '';
                        for (var p = 1; p <= d.pages; p++) {
                            if (p === d.page) {
                                pHtml += '<strong style="margin:0 4px;">' + p + '</strong>';
                            } else {
                                pHtml += '<a href="#" class="flexframe-email-page-link" data-page="' + p + '" style="margin:0 4px;">' + p + '</a>';
                            }
                        }
                        $pagination.html(pHtml);
                    } else {
                        $pagination.empty();
                    }
                },
                error: function() {
                    $tbody.html('<tr><td colspan="11" style="text-align:center;color:#d63638;">Request failed.</td></tr>');
                }
            });
        }

        // ── Create Privacy Policy Page ──
        $('#flexframe-create-privacy-page').on('click', function() {
            var $btn = $(this);
            var $status = $('#flexframe-create-privacy-page-status');

            $btn.prop('disabled', true).text('Creating...');
            $status.html('<span style="color: #666;">Please wait...</span>');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'flexframe_create_privacy_policy_page',
                    nonce: '<?php echo wp_create_nonce('flexframe_create_page'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        $status.html('<span style="color: #00a32a;">✓ ' + response.data.message + '</span>');
                        $('#flexframe_privacy_policy_url').val(response.data.url);
                        $('#flexframe-privacy-url-status').html(
                            '<span style="color: #00a32a; font-size: 14px;">✓ Privacy policy URL is set.</span> ' +
                            '<a href="' + response.data.url + '" target="_blank" class="button button-secondary" style="margin-left: 12px;">View Page →</a>'
                        );
                    } else {
                        $status.html('<span style="color: #d63638;">✗ ' + response.data.message + '</span>');
                    }
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-shield" style="margin-top: 3px; margin-right: 4px;"></span> Create Default Privacy Policy Page');
                },
                error: function() {
                    $status.html('<span style="color: #d63638;">✗ An error occurred.</span>');
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-shield" style="margin-top: 3px; margin-right: 4px;"></span> Create Default Privacy Policy Page');
                }
            });
        });

        $('#flexframe-refresh-email-captures').on('click', function() {
            loadEmailCaptures(1);
        });

        $(document).on('click', '.flexframe-email-page-link', function(e) {
            e.preventDefault();
            loadEmailCaptures(parseInt($(this).data('page')));
        });

        $(document).on('click', '.flexframe-delete-email-capture', function() {
            var $btn = $(this);
            var id = $btn.data('id');
            if (!confirm('Delete this email capture?')) return;
            $btn.prop('disabled', true).text('...');
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: { action: 'flexframe_delete_email_capture', capture_id: id },
                success: function(response) {
                    if (response.success) {
                        loadEmailCaptures(emailCapturePage);
                    } else {
                        alert('Failed to delete.');
                        $btn.prop('disabled', false).text('Delete');
                    }
                },
                error: function() {
                    alert('Request failed.');
                    $btn.prop('disabled', false).text('Delete');
                }
            });
        });

        // ── Saved Workouts Panel ──
        var savedWorkoutsPage = 1;
        var $wkTbody = $('#flexframe-saved-workouts-table tbody');
        var $wkTotal = $('#flexframe-workout-total');
        var $wkPagination = $('#flexframe-workout-pagination');

        function loadSavedWorkouts(page) {
            savedWorkoutsPage = page;
            $wkTbody.html('<tr><td colspan="10" style="text-align:center;padding:20px;color:#666;">Loading...</td></tr>');

            $.ajax({
                url: ajaxurl,
                type: 'GET',
                data: { action: 'flexframe_get_saved_workouts', page_num: page },
                success: function(response) {
                    if (!response.success) {
                        $wkTbody.html('<tr><td colspan="10" style="text-align:center;color:#d63638;">Error loading data.</td></tr>');
                        return;
                    }
                    var d = response.data;
                    $wkTotal.text(d.total + ' saved workout' + (d.total !== 1 ? 's' : ''));

                    if (d.rows.length === 0) {
                        $wkTbody.html('<tr><td colspan="10" style="text-align:center;padding:20px;color:#666;">No saved workouts yet.</td></tr>');
                        $wkPagination.empty();
                        return;
                    }

                    var baseUrl = d.workoutBaseUrl || '';
                    var html = '';
                    $.each(d.rows, function(i, row) {
                        var shareUrl = baseUrl + row.hash;
                        var visLabel = row.visibility === 'public'
                            ? '<span style="color:#00a32a;">Public</span>'
                            : '<span style="color:#888;">Private</span>';

                        html += '<tr data-id="' + row.id + '">';
                        html += '<td><strong>' + $('<span>').text(row.name || 'Untitled').html() + '</strong></td>';
                        html += '<td>' + $('<span>').text(row.author).html() + '</td>';
                        html += '<td style="text-align:center;">' + row.exerciseCount + '</td>';
                        html += '<td style="text-align:center;font-weight:700;">' + (row.viewCount || 0) + '</td>';
                        html += '<td style="text-align:center;font-weight:700;color:#e74c3c;">' + (row.likeCount || 0) + '</td>';
                        html += '<td>' + visLabel + '</td>';
                        html += '<td>';
                        if (row.hash && row.visibility === 'public') {
                            html += '<a href="' + shareUrl + '" target="_blank" style="color:#2271b1;text-decoration:none;font-size:12px;word-break:break-all;">' + $('<span>').text(shareUrl).html() + '</a>';
                        } else {
                            html += '<span style="color:#888;">—</span>';
                        }
                        html += '</td>';
                        html += '<td>' + $('<span>').text(row.created || '').html() + '</td>';
                        html += '<td>' + $('<span>').text(row.lastAccessed || '').html() + '</td>';
                        html += '<td><button type="button" class="button button-small flexframe-delete-saved-workout" data-id="' + row.id + '" style="color:#d63638;">Delete</button></td>';
                        html += '</tr>';
                    });
                    $wkTbody.html(html);

                    // Pagination
                    if (d.pages > 1) {
                        var pHtml = '';
                        for (var p = 1; p <= d.pages; p++) {
                            if (p === d.page) {
                                pHtml += '<strong style="margin:0 4px;">' + p + '</strong>';
                            } else {
                                pHtml += '<a href="#" class="flexframe-workout-page-link" data-page="' + p + '" style="margin:0 4px;">' + p + '</a>';
                            }
                        }
                        $wkPagination.html(pHtml);
                    } else {
                        $wkPagination.empty();
                    }
                },
                error: function() {
                    $wkTbody.html('<tr><td colspan="10" style="text-align:center;color:#d63638;">Request failed.</td></tr>');
                }
            });
        }

        $('#flexframe-refresh-saved-workouts').on('click', function() {
            loadSavedWorkouts(1);
        });

        $(document).on('click', '.flexframe-workout-page-link', function(e) {
            e.preventDefault();
            loadSavedWorkouts(parseInt($(this).data('page')));
        });

        $(document).on('click', '.flexframe-delete-saved-workout', function() {
            var $btn = $(this);
            var id = $btn.data('id');
            if (!confirm('Permanently delete this workout?')) return;
            $btn.prop('disabled', true).text('...');
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: { action: 'flexframe_delete_saved_workout', workout_id: id },
                success: function(response) {
                    if (response.success) {
                        loadSavedWorkouts(savedWorkoutsPage);
                    } else {
                        alert('Failed to delete.');
                        $btn.prop('disabled', false).text('Delete');
                    }
                },
                error: function() {
                    alert('Request failed.');
                    $btn.prop('disabled', false).text('Delete');
                }
            });
        });
    });
    </script>
    <?php
}
