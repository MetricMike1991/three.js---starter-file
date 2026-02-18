<?php
/**
 * FlexFrame Workout Builder - Custom Post Type & REST API
 * Handles workout storage, retrieval, and sharing
 */

if (!defined('ABSPATH')) exit;

/**
 * Build a share URL for a workout hash using the configured workout page URL.
 * Falls back to home_url('/workout/') if no setting is saved.
 */
function flexframe_get_workout_share_url($hash) {
    $base = get_option('flexframe_workout_page_url', '');
    if (empty($base)) {
        $base = home_url('/workout/');
    }
    $sep = (strpos($base, '?') !== false) ? '&' : '?';
    return rtrim($base, '/') . $sep . 'workout=' . $hash;
}

/**
 * Register the flexframe_workout custom post type
 */
function flexframe_register_workout_post_type() {
    $labels = array(
        'name'               => 'Workouts',
        'singular_name'      => 'Workout',
        'menu_name'          => 'Workouts',
        'add_new'            => 'Add New Workout',
        'add_new_item'       => 'Add New Workout',
        'edit_item'          => 'Edit Workout',
        'new_item'           => 'New Workout',
        'view_item'          => 'View Workout',
        'search_items'       => 'Search Workouts',
        'not_found'          => 'No workouts found',
        'not_found_in_trash' => 'No workouts found in trash',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => false, // We'll show under FlexFrame menu
        'query_var'          => true,
        'rewrite'            => array('slug' => 'workout'),
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'supports'           => array('title', 'author'),
        'show_in_rest'       => true,
    );

    register_post_type('flexframe_workout', $args);
}
add_action('init', 'flexframe_register_workout_post_type');

/**
 * Generate a unique short hash for workout sharing
 */
function flexframe_generate_workout_hash($length = 6) {
    $characters = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $hash = '';
    for ($i = 0; $i < $length; $i++) {
        $hash .= $characters[random_int(0, strlen($characters) - 1)];
    }
    return $hash;
}

/**
 * Register REST API endpoints for workouts
 */
function flexframe_register_workout_api() {
    // Save workout
    register_rest_route('flexframe/v1', '/workouts', array(
        'methods'  => 'POST',
        'callback' => 'flexframe_save_workout',
        'permission_callback' => function() {
            return is_user_logged_in();
        },
    ));

    // Save & share workout (public — allows anonymous users)
    register_rest_route('flexframe/v1', '/workouts/share', array(
        'methods'  => 'POST',
        'callback' => 'flexframe_save_workout_public',
        'permission_callback' => '__return_true',
    ));

    // Update workout
    register_rest_route('flexframe/v1', '/workouts/(?P<id>\d+)', array(
        'methods'  => 'PUT',
        'callback' => 'flexframe_update_workout',
        'permission_callback' => function() {
            return is_user_logged_in();
        },
    ));

    // Get workout by hash (public - for sharing)
    register_rest_route('flexframe/v1', '/workouts/shared/(?P<hash>[a-zA-Z0-9]+)', array(
        'methods'  => 'GET',
        'callback' => 'flexframe_get_shared_workout',
        'permission_callback' => '__return_true',
    ));

    // Get workout by ID
    register_rest_route('flexframe/v1', '/workouts/(?P<id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'flexframe_get_workout',
        'permission_callback' => function() {
            return is_user_logged_in();
        },
    ));

    // List user's workouts
    register_rest_route('flexframe/v1', '/workouts', array(
        'methods'  => 'GET',
        'callback' => 'flexframe_list_workouts',
        'permission_callback' => function() {
            return is_user_logged_in();
        },
    ));

    // Delete workout
    register_rest_route('flexframe/v1', '/workouts/(?P<id>\d+)', array(
        'methods'  => 'DELETE',
        'callback' => 'flexframe_delete_workout',
        'permission_callback' => function() {
            return is_user_logged_in();
        },
    ));
}
add_action('rest_api_init', 'flexframe_register_workout_api');

/**
 * Save a new workout
 */
function flexframe_save_workout($request) {
    $params = $request->get_json_params();
    
    if (empty($params['name'])) {
        return new WP_Error('missing_name', 'Workout name is required', array('status' => 400));
    }

    if (empty($params['exercises']) || !is_array($params['exercises'])) {
        return new WP_Error('missing_exercises', 'At least one exercise is required', array('status' => 400));
    }

    $visibility = isset($params['visibility']) ? $params['visibility'] : 'private';
    $post_status = ($visibility === 'public') ? 'publish' : 'draft';

    $post_id = wp_insert_post(array(
        'post_title'  => sanitize_text_field($params['name']),
        'post_type'   => 'flexframe_workout',
        'post_status' => $post_status,
        'post_author' => get_current_user_id(),
    ));

    if (is_wp_error($post_id)) {
        return $post_id;
    }

    // Generate unique share hash
    $hash = flexframe_generate_workout_hash();
    // Ensure uniqueness
    while (flexframe_get_workout_by_hash($hash)) {
        $hash = flexframe_generate_workout_hash();
    }

    // Save workout data
    update_post_meta($post_id, '_flexframe_workout_data', wp_json_encode($params['exercises']));
    update_post_meta($post_id, '_flexframe_workout_hash', $hash);
    update_post_meta($post_id, '_flexframe_workout_tags', isset($params['tags']) ? $params['tags'] : array());
    update_post_meta($post_id, '_flexframe_workout_visibility', $visibility);
    update_post_meta($post_id, '_flexframe_workout_estimated_duration', isset($params['estimatedDuration']) ? intval($params['estimatedDuration']) : 0);

    $author = get_userdata(get_current_user_id());

    return rest_ensure_response(array(
        'id'         => $post_id,
        'hash'       => $hash,
        'name'       => $params['name'],
        'author'     => $author ? $author->display_name : 'Unknown',
        'created'    => get_the_date('c', $post_id),
        'shareUrl'   => flexframe_get_workout_share_url($hash),
        'exercises'  => $params['exercises'],
        'visibility' => $visibility,
    ));
}

/**
 * Save & share a workout (public — allows anonymous users)
 */
function flexframe_save_workout_public($request) {
    $params = $request->get_json_params();

    if (empty($params['name'])) {
        return new WP_Error('missing_name', 'Workout name is required', array('status' => 400));
    }

    if (empty($params['exercises']) || !is_array($params['exercises'])) {
        return new WP_Error('missing_exercises', 'At least one exercise is required', array('status' => 400));
    }

    $post_id = wp_insert_post(array(
        'post_title'  => sanitize_text_field($params['name']),
        'post_type'   => 'flexframe_workout',
        'post_status' => 'publish',
        'post_author' => get_current_user_id() ?: 0,
    ));

    if (is_wp_error($post_id)) {
        return $post_id;
    }

    $hash = flexframe_generate_workout_hash();
    while (flexframe_get_workout_by_hash($hash)) {
        $hash = flexframe_generate_workout_hash();
    }

    update_post_meta($post_id, '_flexframe_workout_data', wp_json_encode($params['exercises']));
    update_post_meta($post_id, '_flexframe_workout_hash', $hash);
    update_post_meta($post_id, '_flexframe_workout_tags', array());
    update_post_meta($post_id, '_flexframe_workout_visibility', 'public');
    update_post_meta($post_id, '_flexframe_workout_estimated_duration', isset($params['estimatedDuration']) ? intval($params['estimatedDuration']) : 0);

    $author_name = 'Guest';
    if (is_user_logged_in()) {
        $author = get_userdata(get_current_user_id());
        $author_name = $author ? $author->display_name : 'Unknown';
    }

    return rest_ensure_response(array(
        'id'         => $post_id,
        'hash'       => $hash,
        'name'       => $params['name'],
        'author'     => $author_name,
        'shareUrl'   => flexframe_get_workout_share_url($hash),
        'exercises'  => $params['exercises'],
        'visibility' => 'public',
    ));
}

/**
 * Update an existing workout
 */
function flexframe_update_workout($request) {
    $post_id = intval($request['id']);
    $params = $request->get_json_params();
    $post = get_post($post_id);

    if (!$post || $post->post_type !== 'flexframe_workout') {
        return new WP_Error('not_found', 'Workout not found', array('status' => 404));
    }

    if ($post->post_author != get_current_user_id() && !current_user_can('manage_options')) {
        return new WP_Error('forbidden', 'You cannot edit this workout', array('status' => 403));
    }

    if (!empty($params['name'])) {
        wp_update_post(array(
            'ID'         => $post_id,
            'post_title' => sanitize_text_field($params['name']),
        ));
    }

    if (!empty($params['exercises'])) {
        update_post_meta($post_id, '_flexframe_workout_data', wp_json_encode($params['exercises']));
    }

    if (isset($params['visibility'])) {
        $visibility = $params['visibility'];
        $post_status = ($visibility === 'public') ? 'publish' : 'draft';
        wp_update_post(array('ID' => $post_id, 'post_status' => $post_status));
        update_post_meta($post_id, '_flexframe_workout_visibility', $visibility);
    }

    if (isset($params['tags'])) {
        update_post_meta($post_id, '_flexframe_workout_tags', $params['tags']);
    }

    if (isset($params['estimatedDuration'])) {
        update_post_meta($post_id, '_flexframe_workout_estimated_duration', intval($params['estimatedDuration']));
    }

    $hash = get_post_meta($post_id, '_flexframe_workout_hash', true);

    return rest_ensure_response(array(
        'id'         => $post_id,
        'hash'       => $hash,
        'name'       => get_the_title($post_id),
        'shareUrl'   => flexframe_get_workout_share_url($hash),
        'updated'    => true,
    ));
}

/**
 * Get workout by share hash
 */
function flexframe_get_shared_workout($request) {
    $hash = sanitize_text_field($request['hash']);
    $post = flexframe_get_workout_by_hash($hash);

    if (!$post) {
        return new WP_Error('not_found', 'Workout not found', array('status' => 404));
    }

    if ($post->post_status !== 'publish') {
        return new WP_Error('not_available', 'This workout is not publicly shared', array('status' => 403));
    }

    $exercises = json_decode(get_post_meta($post->ID, '_flexframe_workout_data', true), true);
    $author = get_userdata($post->post_author);
    $tags = get_post_meta($post->ID, '_flexframe_workout_tags', true);
    $duration = get_post_meta($post->ID, '_flexframe_workout_estimated_duration', true);

    return rest_ensure_response(array(
        'id'                => $post->ID,
        'hash'              => $hash,
        'name'              => $post->post_title,
        'author'            => $author ? $author->display_name : 'Unknown',
        'created'           => get_the_date('c', $post->ID),
        'exercises'         => $exercises ?: array(),
        'tags'              => $tags ?: array(),
        'estimatedDuration' => intval($duration),
        'visibility'        => 'public',
        'readOnly'          => true,
    ));
}

/**
 * Get workout by ID (owner only)
 */
function flexframe_get_workout($request) {
    $post_id = intval($request['id']);
    $post = get_post($post_id);

    if (!$post || $post->post_type !== 'flexframe_workout') {
        return new WP_Error('not_found', 'Workout not found', array('status' => 404));
    }

    if ($post->post_author != get_current_user_id() && !current_user_can('manage_options')) {
        return new WP_Error('forbidden', 'Access denied', array('status' => 403));
    }

    $exercises = json_decode(get_post_meta($post->ID, '_flexframe_workout_data', true), true);
    $hash = get_post_meta($post->ID, '_flexframe_workout_hash', true);
    $tags = get_post_meta($post->ID, '_flexframe_workout_tags', true);
    $visibility = get_post_meta($post->ID, '_flexframe_workout_visibility', true);
    $duration = get_post_meta($post->ID, '_flexframe_workout_estimated_duration', true);

    return rest_ensure_response(array(
        'id'                => $post->ID,
        'hash'              => $hash,
        'name'              => $post->post_title,
        'exercises'         => $exercises ?: array(),
        'tags'              => $tags ?: array(),
        'estimatedDuration' => intval($duration),
        'visibility'        => $visibility ?: 'private',
        'shareUrl'          => flexframe_get_workout_share_url($hash),
    ));
}

/**
 * List user's workouts
 */
function flexframe_list_workouts($request) {
    $args = array(
        'post_type'      => 'flexframe_workout',
        'author'         => get_current_user_id(),
        'posts_per_page' => 50,
        'orderby'        => 'modified',
        'order'          => 'DESC',
    );

    // Admins can see all
    if (current_user_can('manage_options')) {
        unset($args['author']);
    }

    $posts = get_posts($args);
    $workouts = array();

    foreach ($posts as $post) {
        $exercises = json_decode(get_post_meta($post->ID, '_flexframe_workout_data', true), true);
        $hash = get_post_meta($post->ID, '_flexframe_workout_hash', true);
        $visibility = get_post_meta($post->ID, '_flexframe_workout_visibility', true);
        $duration = get_post_meta($post->ID, '_flexframe_workout_estimated_duration', true);
        $author = get_userdata($post->post_author);

        $workouts[] = array(
            'id'                => $post->ID,
            'hash'              => $hash,
            'name'              => $post->post_title,
            'author'            => $author ? $author->display_name : 'Unknown',
            'created'           => get_the_date('c', $post->ID),
            'modified'          => get_the_modified_date('c', $post->ID),
            'exerciseCount'     => is_array($exercises) ? count($exercises) : 0,
            'estimatedDuration' => intval($duration),
            'visibility'        => $visibility ?: 'private',
            'shareUrl'          => flexframe_get_workout_share_url($hash),
        );
    }

    return rest_ensure_response($workouts);
}

/**
 * Delete a workout
 */
function flexframe_delete_workout($request) {
    $post_id = intval($request['id']);
    $post = get_post($post_id);

    if (!$post || $post->post_type !== 'flexframe_workout') {
        return new WP_Error('not_found', 'Workout not found', array('status' => 404));
    }

    if ($post->post_author != get_current_user_id() && !current_user_can('manage_options')) {
        return new WP_Error('forbidden', 'You cannot delete this workout', array('status' => 403));
    }

    wp_delete_post($post_id, true);

    return rest_ensure_response(array('deleted' => true, 'id' => $post_id));
}

/**
 * Helper: Get workout post by share hash
 */
function flexframe_get_workout_by_hash($hash) {
    $posts = get_posts(array(
        'post_type'      => 'flexframe_workout',
        'meta_key'       => '_flexframe_workout_hash',
        'meta_value'     => sanitize_text_field($hash),
        'posts_per_page' => 1,
        'post_status'    => array('publish', 'draft'),
    ));

    return !empty($posts) ? $posts[0] : null;
}

// ─── Email Captures ──────────────────────────────────────────

/**
 * Create the email captures DB table
 */
function flexframe_create_email_captures_table() {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_email_captures';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        email varchar(255) NOT NULL,
        marketing_consent tinyint(1) NOT NULL DEFAULT 0,
        day_pass_requested tinyint(1) NOT NULL DEFAULT 0,
        workout_count int(11) NOT NULL DEFAULT 1,
        workout_name varchar(255) DEFAULT '',
        workout_hash varchar(20) DEFAULT '',
        ip_address varchar(45) DEFAULT '',
        captured_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);

    // Safety: add columns if missing (table existed before these columns were added)
    $col = $wpdb->get_results("SHOW COLUMNS FROM $table LIKE 'day_pass_requested'");
    if (empty($col)) {
        $wpdb->query("ALTER TABLE $table ADD COLUMN day_pass_requested tinyint(1) NOT NULL DEFAULT 0 AFTER marketing_consent");
    }
    $col2 = $wpdb->get_results("SHOW COLUMNS FROM $table LIKE 'workout_count'");
    if (empty($col2)) {
        $wpdb->query("ALTER TABLE $table ADD COLUMN workout_count int(11) NOT NULL DEFAULT 1 AFTER day_pass_requested");
    }
}

/**
 * REST endpoint: capture email before sharing
 */
function flexframe_register_email_capture_api() {
    register_rest_route('flexframe/v1', '/email-capture', array(
        'methods'  => 'POST',
        'callback' => 'flexframe_handle_email_capture',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'flexframe_register_email_capture_api');

function flexframe_handle_email_capture($request) {
    $params = $request->get_json_params();
    $email  = isset($params['email']) ? sanitize_email($params['email']) : '';
    $consent = !empty($params['marketingConsent']) ? 1 : 0;
    $day_pass = !empty($params['dayPassRequested']) ? 1 : 0;
    $workout_name = isset($params['workoutName']) ? sanitize_text_field($params['workoutName']) : '';
    $workout_hash = isset($params['workoutHash']) ? sanitize_text_field($params['workoutHash']) : '';

    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'Please enter a valid email address.', array('status' => 400));
    }

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_email_captures';

    // Ensure table exists (in case activation hook didn't run)
    flexframe_create_email_captures_table();

    // Check if this email already exists
    $existing = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE email = %s", $email));

    if ($existing) {
        // Update existing record: bump workout count, update day pass if requested
        $update_data = array(
            'workout_count'  => intval($existing->workout_count) + 1,
            'workout_name'   => $workout_name,
            'workout_hash'   => $workout_hash,
            'captured_at'    => current_time('mysql'),
        );
        $update_format = array('%d', '%s', '%s', '%s');

        // Upgrade consent to true if they check it this time (never downgrade)
        if ($consent && !$existing->marketing_consent) {
            $update_data['marketing_consent'] = 1;
            $update_format[] = '%d';
        }

        // Upgrade day pass request if they check it this time
        if ($day_pass && !$existing->day_pass_requested) {
            $update_data['day_pass_requested'] = 1;
            $update_format[] = '%d';
        }

        $wpdb->update($table, $update_data, array('id' => $existing->id), $update_format, array('%d'));
    } else {
        // New email — insert
        $wpdb->insert($table, array(
            'email'             => $email,
            'marketing_consent' => $consent,
            'day_pass_requested'=> $day_pass,
            'workout_count'     => 1,
            'workout_name'      => $workout_name,
            'workout_hash'      => $workout_hash,
            'ip_address'        => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
            'captured_at'       => current_time('mysql'),
        ), array('%s', '%d', '%d', '%d', '%s', '%s', '%s', '%s'));
    }

    return rest_ensure_response(array('success' => true));
}

/**
 * AJAX: Get email captures for admin settings page
 */
function flexframe_ajax_get_email_captures() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Permission denied');
    }

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_email_captures';
    
    // Ensure table exists
    flexframe_create_email_captures_table();

    $page = max(1, intval($_GET['page_num'] ?? 1));
    $per_page = 25;
    $offset = ($page - 1) * $per_page;

    $total = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table");
    $rows  = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM $table ORDER BY captured_at DESC LIMIT %d OFFSET %d",
        $per_page, $offset
    ));

    wp_send_json_success(array(
        'rows'     => $rows,
        'total'    => $total,
        'page'     => $page,
        'pages'    => ceil($total / $per_page),
    ));
}
add_action('wp_ajax_flexframe_get_email_captures', 'flexframe_ajax_get_email_captures');

/**
 * AJAX: Export email captures as CSV
 */
function flexframe_ajax_export_email_captures() {
    if (!current_user_can('manage_options')) {
        wp_die('Permission denied');
    }

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_email_captures';
    flexframe_create_email_captures_table();

    $rows = $wpdb->get_results("SELECT * FROM $table ORDER BY captured_at DESC");

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=flexframe-email-captures-' . date('Y-m-d') . '.csv');

    $out = fopen('php://output', 'w');
    fputcsv($out, array('Email', 'Marketing Consent', 'Day Pass Requested', 'Workouts Shared', 'Last Workout', 'IP Address', 'Last Activity'));

    foreach ($rows as $row) {
        fputcsv($out, array(
            $row->email,
            $row->marketing_consent ? 'Yes' : 'No',
            $row->day_pass_requested ? 'Yes' : 'No',
            $row->workout_count ?? 1,
            $row->workout_name,
            $row->ip_address,
            $row->captured_at,
        ));
    }

    fclose($out);
    exit;
}
add_action('wp_ajax_flexframe_export_email_captures', 'flexframe_ajax_export_email_captures');

/**
 * AJAX: Delete a single email capture
 */
function flexframe_ajax_delete_email_capture() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Permission denied');
    }

    $id = intval($_POST['capture_id'] ?? 0);
    if (!$id) {
        wp_send_json_error('Invalid ID');
    }

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_email_captures';
    $wpdb->delete($table, array('id' => $id), array('%d'));

    wp_send_json_success();
}
add_action('wp_ajax_flexframe_delete_email_capture', 'flexframe_ajax_delete_email_capture');

/**
 * Flush rewrite rules on activation for the workout CPT
 */
function flexframe_workout_flush_rewrite() {
    flexframe_register_workout_post_type();
    flush_rewrite_rules();
}
