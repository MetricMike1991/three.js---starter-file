<?php
/**
 * FlexFrame Workout Builder - Custom Post Type & REST API
 * Handles workout storage, retrieval, and sharing
 */

if (!defined('ABSPATH')) exit;

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
        'shareUrl'   => home_url('/workout/?w=' . $hash),
        'exercises'  => $params['exercises'],
        'visibility' => $visibility,
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
        'shareUrl'   => home_url('/workout/?w=' . $hash),
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
        'shareUrl'          => home_url('/workout/?w=' . $hash),
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
            'shareUrl'          => home_url('/workout/?w=' . $hash),
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

/**
 * Flush rewrite rules on activation for the workout CPT
 */
function flexframe_workout_flush_rewrite() {
    flexframe_register_workout_post_type();
    flush_rewrite_rules();
}
