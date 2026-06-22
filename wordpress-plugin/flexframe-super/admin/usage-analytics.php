<?php
/**
 * ========== EXERCISE VIEWER USAGE ANALYTICS ==========
 *
 * Cookie-free, first-party usage analytics for the MAIN exercise viewer
 * (not the gym demo pages — those have their own analytics file).
 *
 * Design goals (identical privacy posture to demo-analytics.php):
 *  - No cookies, no localStorage, no third-party scripts → no consent
 *    banner required.
 *  - Cache-safe: events are sent via a JS beacon to a (non-cached) REST
 *    endpoint, never logged at PHP render time.
 *  - Lightweight: navigator.sendBeacon fire-and-forget, so there is zero
 *    impact on rendering or interaction.
 *  - Privacy-conscious: we store a salted HASH of IP+UA (never a raw IP),
 *    used only to roughly count unique visitors. Rows auto-purge after a
 *    retention window.
 *
 * What we capture (per anonymous in-memory session):
 *  - view      : an exercise model was opened (exercise name)
 *  - duration  : seconds spent on an exercise before switching away
 *  - quality   : user switched model quality (detail = SD | HD)
 *  - ar        : user opened the exercise in AR (exercise name)
 *  - search    : a search was performed (detail = query, num = result count)
 *
 * Shared helpers (flexframe_detect_device, flexframe_visitor_hash,
 * flexframe_client_ip) are defined in admin/demo-analytics.php, which is
 * loaded before this file.
 *
 * @package FlexFrame_Super
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Number of days to retain individual usage rows before auto-purging.
 */
if (!defined('FLEXFRAME_USAGE_RETENTION_DAYS')) {
    define('FLEXFRAME_USAGE_RETENTION_DAYS', 365);
}

/* ------------------------------------------------------------------ *
 *  Table
 * ------------------------------------------------------------------ */

/**
 * Create / upgrade the usage events table.
 */
function flexframe_create_usage_events_table() {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        session_id varchar(32) NOT NULL DEFAULT '',
        event_type varchar(20) NOT NULL DEFAULT '',
        exercise varchar(191) NOT NULL DEFAULT '',
        detail varchar(191) NOT NULL DEFAULT '',
        num_value int(11) NOT NULL DEFAULT 0,
        device varchar(20) NOT NULL DEFAULT '',
        visitor_hash varchar(64) NOT NULL DEFAULT '',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY event_type (event_type),
        KEY exercise (exercise),
        KEY created_at (created_at)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}

/**
 * Ensure the table exists (cheap option-flag guard so dbDelta does not run
 * on every request).
 */
function flexframe_maybe_create_usage_events_table() {
    $flag = get_option('flexframe_usage_events_table_version', '');
    if ($flag !== '1') {
        flexframe_create_usage_events_table();
        update_option('flexframe_usage_events_table_version', '1');
    }
}

/**
 * Opportunistic purge of old usage rows. Runs rarely (1-in-50 writes) to
 * avoid a DELETE on every beacon.
 */
function flexframe_maybe_purge_usage_events() {
    if (mt_rand(1, 50) !== 1) {
        return;
    }
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';
    $days  = (int) FLEXFRAME_USAGE_RETENTION_DAYS;
    $wpdb->query($wpdb->prepare(
        "DELETE FROM $table WHERE created_at < (NOW() - INTERVAL %d DAY)",
        $days
    ));
}

/* ------------------------------------------------------------------ *
 *  Frontend: enqueue the beacon on the viewer (cache-safe, demo-excluded)
 * ------------------------------------------------------------------ */

/**
 * Is usage tracking globally enabled? (Admin can switch it off.)
 */
function flexframe_usage_tracking_enabled() {
    return (bool) get_option('flexframe_usage_tracking_enabled', true);
}

/**
 * Should we track only logged-OUT visitors (i.e. exclude logged-in users
 * such as you/admins testing the viewer)?
 */
function flexframe_usage_logged_out_only() {
    return (bool) get_option('flexframe_usage_logged_out_only', false);
}

/**
 * Enqueue the lightweight usage beacon on pages that render the main
 * exercise viewer — but NOT on gym demo pages (those are tracked
 * separately) and not in the admin.
 */
function flexframe_enqueue_usage_analytics() {
    if (is_admin() || !flexframe_usage_tracking_enabled()) {
        return;
    }

    // Optionally exclude logged-in users so the stats reflect only real,
    // logged-out visitors (and not your own testing).
    if (flexframe_usage_logged_out_only() && is_user_logged_in()) {
        return;
    }

    $post_id = get_queried_object_id();

    // Never track demo pages here — they have their own analytics.
    if ($post_id && function_exists('flexframe_is_demo_page') && flexframe_is_demo_page($post_id)) {
        return;
    }

    // Only load where the viewer shortcode is actually present.
    $post = get_post($post_id);
    $has_viewer = $post && has_shortcode($post->post_content, 'flexframe_viewer');
    if (!$has_viewer) {
        return;
    }

    wp_enqueue_script(
        'flexframe-usage-analytics',
        FLEXFRAME_PLUGIN_URL . 'assets/usage-analytics.js',
        array(),
        FLEXFRAME_VERSION,
        true
    );

    wp_localize_script('flexframe-usage-analytics', 'flexframeUsageConfig', array(
        'rest'    => esc_url_raw(rest_url('flexframe/v1/')),
        'enabled' => true,
    ));
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_usage_analytics');

/* ------------------------------------------------------------------ *
 *  REST beacon
 * ------------------------------------------------------------------ */

function flexframe_register_usage_analytics_api() {
    register_rest_route('flexframe/v1', '/usage-event', array(
        'methods'             => 'POST',
        'callback'            => 'flexframe_handle_usage_event',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'flexframe_register_usage_analytics_api');

/**
 * Allowed event types and how their fields map.
 */
function flexframe_usage_event_types() {
    return array('view', 'duration', 'quality', 'ar', 'search');
}

/**
 * Record a single usage event.
 */
function flexframe_handle_usage_event($request) {
    if (!flexframe_usage_tracking_enabled()) {
        return rest_ensure_response(array('ok' => true, 'skipped' => 'disabled'));
    }

    $params  = $request->get_json_params();
    $type    = isset($params['type']) ? sanitize_key($params['type']) : '';
    $session = isset($params['session']) ? sanitize_text_field($params['session']) : '';

    if (!in_array($type, flexframe_usage_event_types(), true)) {
        return new WP_Error('invalid_type', 'Unknown event type.', array('status' => 400));
    }

    // Normalise the client-supplied session id to a safe token.
    $session = preg_replace('/[^a-zA-Z0-9]/', '', $session);
    if (strlen($session) < 8 || strlen($session) > 32) {
        $session = wp_generate_password(24, false, false);
    }

    $ua  = isset($_SERVER['HTTP_USER_AGENT']) ? substr(sanitize_text_field($_SERVER['HTTP_USER_AGENT']), 0, 255) : '';
    $ip  = flexframe_client_ip();
    $dev = flexframe_detect_device($ua);

    // Drop obvious bots so they do not pollute the stats.
    if ($dev === 'bot') {
        return rest_ensure_response(array('ok' => true, 'skipped' => 'bot'));
    }

    $exercise = isset($params['exercise']) ? substr(sanitize_text_field($params['exercise']), 0, 191) : '';
    $detail   = isset($params['detail']) ? substr(sanitize_text_field($params['detail']), 0, 191) : '';
    $num      = isset($params['num']) ? (int) $params['num'] : 0;

    // Clamp the numeric field to sane bounds (seconds / result counts).
    if ($num < 0) {
        $num = 0;
    } elseif ($num > 1000000) {
        $num = 1000000;
    }

    // A duration with no time isn't useful.
    if ($type === 'duration' && $num <= 0) {
        return rest_ensure_response(array('ok' => true, 'skipped' => 'empty'));
    }

    flexframe_maybe_create_usage_events_table();

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';

    $wpdb->insert(
        $table,
        array(
            'session_id'   => $session,
            'event_type'   => $type,
            'exercise'     => $exercise,
            'detail'       => $detail,
            'num_value'    => $num,
            'device'       => $dev,
            'visitor_hash' => flexframe_visitor_hash($ip, $ua, 0),
            'created_at'   => current_time('mysql'),
        ),
        array('%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s')
    );

    flexframe_maybe_purge_usage_events();

    return rest_ensure_response(array('ok' => true));
}

/* ------------------------------------------------------------------ *
 *  Stats queries (for the dashboard)
 * ------------------------------------------------------------------ */

/**
 * Does the usage table exist yet?
 */
function flexframe_usage_table_exists() {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';
    return $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table)) === $table;
}

/**
 * Whitelist + normalise the selected range key.
 * Valid keys: 'yesterday', '7', '30', '90', '365'.
 */
function flexframe_usage_valid_range($range) {
    $allowed = array('yesterday', '7', '30', '90', '365');
    $range = is_string($range) ? $range : (string) (int) $range;
    return in_array($range, $allowed, true) ? $range : '30';
}

/**
 * Resolve a range key to [start, end] datetime strings in WP local time.
 * $end is '' when the window runs up to "now".
 */
function flexframe_usage_range_bounds($range) {
    $range = flexframe_usage_valid_range($range);
    $now   = current_time('timestamp');

    if ($range === 'yesterday') {
        $start_today = strtotime(date('Y-m-d 00:00:00', $now));
        $start = $start_today - DAY_IN_SECONDS;
        return array(date('Y-m-d H:i:s', $start), date('Y-m-d H:i:s', $start_today));
    }

    $days  = (int) $range;
    $start = $now - ($days * DAY_IN_SECONDS);
    return array(date('Y-m-d H:i:s', $start), '');
}

/**
 * Build a prepared WHERE date condition + its args for the given range.
 *
 * @return array array($condition_sql, $args)
 */
function flexframe_usage_range_where($range) {
    list($start, $end) = flexframe_usage_range_bounds($range);
    if ($end !== '') {
        return array('created_at >= %s AND created_at < %s', array($start, $end));
    }
    return array('created_at >= %s', array($start));
}

/**
 * Headline numbers for the chosen window.
 */
function flexframe_usage_overview($range) {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';

    $empty = array(
        'views'       => 0,
        'visitors'    => 0,
        'sessions'    => 0,
        'avg_seconds' => 0,
        'ar_clicks'   => 0,
        'searches'    => 0,
        'sd'          => 0,
        'hd'          => 0,
    );
    if (!flexframe_usage_table_exists()) {
        return $empty;
    }

    list($cond, $args) = flexframe_usage_range_where($range);
    $row = $wpdb->get_row($wpdb->prepare(
        "SELECT
            SUM(event_type = 'view')                              AS views,
            COUNT(DISTINCT visitor_hash)                          AS visitors,
            COUNT(DISTINCT session_id)                            AS sessions,
            AVG(CASE WHEN event_type = 'duration' AND num_value > 0 THEN num_value END) AS avg_seconds,
            SUM(event_type = 'ar')                                AS ar_clicks,
            SUM(event_type = 'search')                            AS searches,
            SUM(event_type = 'quality' AND detail = 'SD')         AS sd,
            SUM(event_type = 'quality' AND detail = 'HD')         AS hd
         FROM $table
         WHERE $cond",
        $args
    ), ARRAY_A);

    if (!$row) {
        return $empty;
    }

    return array(
        'views'       => (int) $row['views'],
        'visitors'    => (int) $row['visitors'],
        'sessions'    => (int) $row['sessions'],
        'avg_seconds' => (int) round((float) $row['avg_seconds']),
        'ar_clicks'   => (int) $row['ar_clicks'],
        'searches'    => (int) $row['searches'],
        'sd'          => (int) $row['sd'],
        'hd'          => (int) $row['hd'],
    );
}

/**
 * Top exercises by views, with average dwell time.
 */
function flexframe_usage_top_exercises($range, $limit = 25) {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';
    $limit = max(1, min(100, (int) $limit));

    if (!flexframe_usage_table_exists()) {
        return array();
    }

    list($cond, $args) = flexframe_usage_range_where($range);
    $args[] = $limit;
    return $wpdb->get_results($wpdb->prepare(
        "SELECT
            exercise,
            SUM(event_type = 'view') AS views,
            AVG(CASE WHEN event_type = 'duration' AND num_value > 0 THEN num_value END) AS avg_seconds,
            SUM(event_type = 'ar')   AS ar_clicks
         FROM $table
         WHERE $cond
           AND exercise <> ''
         GROUP BY exercise
         HAVING views > 0
         ORDER BY views DESC
         LIMIT %d",
        $args
    ), ARRAY_A);
}

/**
 * Search terms, split by whether they returned results.
 *
 * @param string $mode 'found' | 'missing'
 */
function flexframe_usage_search_terms($range, $mode = 'found', $limit = 25) {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';
    $limit = max(1, min(100, (int) $limit));

    if (!flexframe_usage_table_exists()) {
        return array();
    }

    // "missing" = at least one search for this term returned zero results.
    $having = ($mode === 'missing') ? 'MIN(num_value) = 0' : 'MIN(num_value) > 0';

    list($cond, $args) = flexframe_usage_range_where($range);
    $args[] = $limit;
    return $wpdb->get_results($wpdb->prepare(
        "SELECT
            detail AS term,
            COUNT(*) AS searches,
            MAX(num_value) AS max_results
         FROM $table
         WHERE event_type = 'search'
           AND detail <> ''
           AND $cond
         GROUP BY detail
         HAVING $having
         ORDER BY searches DESC
         LIMIT %d",
        $args
    ), ARRAY_A);
}

/**
 * Device split (by view events).
 */
function flexframe_usage_device_split($range) {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_usage_events';

    $out = array('desktop' => 0, 'mobile' => 0, 'tablet' => 0, 'unknown' => 0);
    if (!flexframe_usage_table_exists()) {
        return $out;
    }

    list($cond, $args) = flexframe_usage_range_where($range);
    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT device, COUNT(*) AS c
         FROM $table
         WHERE event_type = 'view'
           AND $cond
         GROUP BY device",
        $args
    ), ARRAY_A);

    foreach ((array) $rows as $r) {
        $d = isset($out[$r['device']]) ? $r['device'] : 'unknown';
        $out[$d] += (int) $r['c'];
    }
    return $out;
}

/* ------------------------------------------------------------------ *
 *  Admin page
 * ------------------------------------------------------------------ */

/**
 * Register the "Usage Analytics" submenu under FlexFrame.
 * Gated behind the super-admin flag so clients never see it.
 */
function flexframe_add_usage_analytics_menu() {
    if (!function_exists('flexframe_is_super_admin') || !flexframe_is_super_admin()) {
        return;
    }
    add_submenu_page(
        'flexframe-settings',
        __('Usage Analytics', 'flexframe-viewer'),
        __('Usage Analytics', 'flexframe-viewer'),
        'manage_flexframe',
        'flexframe-usage-analytics',
        'flexframe_render_usage_analytics_page'
    );
}
add_action('admin_menu', 'flexframe_add_usage_analytics_menu', 20);

/**
 * Format a duration in seconds as a compact human string.
 */
function flexframe_usage_format_duration($seconds) {
    $seconds = (int) $seconds;
    if ($seconds <= 0) {
        return '—';
    }
    if ($seconds < 60) {
        return $seconds . 's';
    }
    $m = floor($seconds / 60);
    $s = $seconds % 60;
    return $s ? sprintf('%dm %ds', $m, $s) : sprintf('%dm', $m);
}

/**
 * Render the Usage Analytics dashboard.
 */
function flexframe_render_usage_analytics_page() {
    if (!current_user_can('manage_flexframe') || !function_exists('flexframe_is_super_admin') || !flexframe_is_super_admin()) {
        wp_die(esc_html__('You do not have permission to view this page.', 'flexframe-viewer'));
    }

    // Allow toggling tracking on/off from this page.
    if (isset($_POST['flexframe_usage_toggle']) && check_admin_referer('flexframe_usage_toggle')) {
        update_option('flexframe_usage_tracking_enabled', isset($_POST['flexframe_usage_enabled']) ? 1 : 0);
        update_option('flexframe_usage_logged_out_only', isset($_POST['flexframe_usage_logged_out_only']) ? 1 : 0);
        echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Usage tracking setting saved.', 'flexframe-viewer') . '</p></div>';
    }

    $range = isset($_GET['range']) ? flexframe_usage_valid_range(wp_unslash($_GET['range'])) : '30';
    $enabled = flexframe_usage_tracking_enabled();
    $logged_out_only = flexframe_usage_logged_out_only();

    $overview   = flexframe_usage_overview($range);
    $top        = flexframe_usage_top_exercises($range, 25);
    $found      = flexframe_usage_search_terms($range, 'found', 25);
    $missing    = flexframe_usage_search_terms($range, 'missing', 25);
    $devices    = flexframe_usage_device_split($range);

    $sd = $overview['sd'];
    $hd = $overview['hd'];
    $quality_total = $sd + $hd;
    $sd_pct = $quality_total ? round($sd / $quality_total * 100) : 0;
    $hd_pct = $quality_total ? 100 - $sd_pct : 0;

    $device_total = array_sum($devices);

    $base_url = admin_url('admin.php?page=flexframe-usage-analytics');
    ?>
    <div class="wrap flexframe-usage-wrap">
        <h1><?php esc_html_e('Exercise Viewer — Usage Analytics', 'flexframe-viewer'); ?></h1>
        <p class="description">
            <?php esc_html_e('Cookie-free, first-party usage of your main exercise viewer. No personal data is stored.', 'flexframe-viewer'); ?>
        </p>

        <?php if (!$enabled) : ?>
            <div class="notice notice-warning"><p>
                <strong><?php esc_html_e('Tracking is currently OFF.', 'flexframe-viewer'); ?></strong>
                <?php esc_html_e('No new usage data is being collected.', 'flexframe-viewer'); ?>
            </p></div>
        <?php endif; ?>

        <h2 class="screen-reader-text"><?php esc_html_e('Filters', 'flexframe-viewer'); ?></h2>
        <p class="flexframe-usage-ranges">
            <?php
            $ranges = array(
                'yesterday' => __('Yesterday', 'flexframe-viewer'),
                '7'   => __('Last 7 days', 'flexframe-viewer'),
                '30'  => __('Last 30 days', 'flexframe-viewer'),
                '90'  => __('Last 90 days', 'flexframe-viewer'),
                '365' => __('Last year', 'flexframe-viewer'),
            );
            foreach ($ranges as $key => $label) {
                $url = esc_url(add_query_arg('range', $key, $base_url));
                $cls = ((string) $key === (string) $range) ? 'button button-primary' : 'button';
                echo '<a href="' . $url . '" class="' . esc_attr($cls) . '">' . esc_html($label) . '</a> ';
            }
            ?>
        </p>

        <div class="flexframe-usage-cards">
            <?php
            $cards = array(
                array(__('Exercise views', 'flexframe-viewer'), number_format_i18n($overview['views'])),
                array(__('Unique visitors', 'flexframe-viewer'), number_format_i18n($overview['visitors'])),
                array(__('Sessions', 'flexframe-viewer'), number_format_i18n($overview['sessions'])),
                array(__('Avg. time / exercise', 'flexframe-viewer'), flexframe_usage_format_duration($overview['avg_seconds'])),
                array(__('AR opens', 'flexframe-viewer'), number_format_i18n($overview['ar_clicks'])),
                array(__('Searches', 'flexframe-viewer'), number_format_i18n($overview['searches'])),
            );
            foreach ($cards as $c) {
                echo '<div class="flexframe-usage-card"><span class="fu-card-value">' . esc_html($c[1]) . '</span><span class="fu-card-label">' . esc_html($c[0]) . '</span></div>';
            }
            ?>
        </div>

        <div class="flexframe-usage-grid">
            <div class="flexframe-usage-panel">
                <h2><?php esc_html_e('Quality preference (SD vs HD)', 'flexframe-viewer'); ?></h2>
                <?php if ($quality_total) : ?>
                    <div class="fu-bar">
                        <div class="fu-bar-sd" style="width:<?php echo (int) $sd_pct; ?>%"><?php echo $sd_pct >= 12 ? esc_html('SD ' . $sd_pct . '%') : ''; ?></div>
                        <div class="fu-bar-hd" style="width:<?php echo (int) $hd_pct; ?>%"><?php echo $hd_pct >= 12 ? esc_html('HD ' . $hd_pct . '%') : ''; ?></div>
                    </div>
                    <p class="description">
                        <?php printf(esc_html__('SD chosen %1$s times · HD chosen %2$s times', 'flexframe-viewer'), esc_html(number_format_i18n($sd)), esc_html(number_format_i18n($hd))); ?>
                    </p>
                <?php else : ?>
                    <p class="description"><?php esc_html_e('No quality switches recorded yet.', 'flexframe-viewer'); ?></p>
                <?php endif; ?>
            </div>

            <div class="flexframe-usage-panel">
                <h2><?php esc_html_e('Device split', 'flexframe-viewer'); ?></h2>
                <?php if ($device_total) : ?>
                    <table class="widefat striped">
                        <tbody>
                        <?php foreach (array('desktop' => __('Desktop', 'flexframe-viewer'), 'mobile' => __('Mobile', 'flexframe-viewer'), 'tablet' => __('Tablet', 'flexframe-viewer'), 'unknown' => __('Unknown', 'flexframe-viewer')) as $key => $label) :
                            if (!$devices[$key]) { continue; }
                            $pct = round($devices[$key] / $device_total * 100); ?>
                            <tr>
                                <td><?php echo esc_html($label); ?></td>
                                <td style="text-align:right;"><?php echo esc_html(number_format_i18n($devices[$key])); ?></td>
                                <td style="text-align:right; width:60px;"><?php echo (int) $pct; ?>%</td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else : ?>
                    <p class="description"><?php esc_html_e('No views recorded yet.', 'flexframe-viewer'); ?></p>
                <?php endif; ?>
            </div>
        </div>

        <div class="flexframe-usage-panel">
            <h2><?php esc_html_e('Top exercises', 'flexframe-viewer'); ?></h2>
            <?php if ($top) : ?>
                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th><?php esc_html_e('Exercise', 'flexframe-viewer'); ?></th>
                            <th style="text-align:right;"><?php esc_html_e('Views', 'flexframe-viewer'); ?></th>
                            <th style="text-align:right;"><?php esc_html_e('Avg. time', 'flexframe-viewer'); ?></th>
                            <th style="text-align:right;"><?php esc_html_e('AR opens', 'flexframe-viewer'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($top as $r) : ?>
                            <tr>
                                <td><?php echo esc_html($r['exercise']); ?></td>
                                <td style="text-align:right;"><?php echo esc_html(number_format_i18n((int) $r['views'])); ?></td>
                                <td style="text-align:right;"><?php echo esc_html(flexframe_usage_format_duration((int) round((float) $r['avg_seconds']))); ?></td>
                                <td style="text-align:right;"><?php echo esc_html(number_format_i18n((int) $r['ar_clicks'])); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else : ?>
                <p class="description"><?php esc_html_e('No exercise views recorded yet.', 'flexframe-viewer'); ?></p>
            <?php endif; ?>
        </div>

        <div class="flexframe-usage-grid">
            <div class="flexframe-usage-panel">
                <h2><?php esc_html_e('Top searches (found)', 'flexframe-viewer'); ?></h2>
                <?php if ($found) : ?>
                    <table class="widefat striped">
                        <thead><tr><th><?php esc_html_e('Term', 'flexframe-viewer'); ?></th><th style="text-align:right;"><?php esc_html_e('Searches', 'flexframe-viewer'); ?></th></tr></thead>
                        <tbody>
                            <?php foreach ($found as $r) : ?>
                                <tr><td><?php echo esc_html($r['term']); ?></td><td style="text-align:right;"><?php echo esc_html(number_format_i18n((int) $r['searches'])); ?></td></tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else : ?>
                    <p class="description"><?php esc_html_e('No successful searches recorded yet.', 'flexframe-viewer'); ?></p>
                <?php endif; ?>
            </div>

            <div class="flexframe-usage-panel">
                <h2><?php esc_html_e('Searches with no results', 'flexframe-viewer'); ?></h2>
                <p class="description"><?php esc_html_e('Content gaps — exercises people looked for but could not find.', 'flexframe-viewer'); ?></p>
                <?php if ($missing) : ?>
                    <table class="widefat striped">
                        <thead><tr><th><?php esc_html_e('Term', 'flexframe-viewer'); ?></th><th style="text-align:right;"><?php esc_html_e('Searches', 'flexframe-viewer'); ?></th></tr></thead>
                        <tbody>
                            <?php foreach ($missing as $r) : ?>
                                <tr><td><?php echo esc_html($r['term']); ?></td><td style="text-align:right;"><?php echo esc_html(number_format_i18n((int) $r['searches'])); ?></td></tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else : ?>
                    <p class="description"><?php esc_html_e('No empty searches recorded yet.', 'flexframe-viewer'); ?></p>
                <?php endif; ?>
            </div>
        </div>

        <div class="flexframe-usage-panel">
            <h2><?php esc_html_e('Tracking', 'flexframe-viewer'); ?></h2>
            <form method="post">
                <?php wp_nonce_field('flexframe_usage_toggle'); ?>
                <p>
                    <label>
                        <input type="checkbox" name="flexframe_usage_enabled" value="1" <?php checked($enabled); ?> />
                        <?php esc_html_e('Collect anonymous, cookie-free usage analytics for the exercise viewer', 'flexframe-viewer'); ?>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="flexframe_usage_logged_out_only" value="1" <?php checked($logged_out_only); ?> />
                        <?php esc_html_e('Only track logged-out visitors (ignore your own logged-in / admin usage)', 'flexframe-viewer'); ?>
                    </label>
                </p>
                <p>
                    <button type="submit" name="flexframe_usage_toggle" value="1" class="button button-primary"><?php esc_html_e('Save', 'flexframe-viewer'); ?></button>
                </p>
                <p class="description">
                    <?php printf(esc_html__('Individual rows auto-delete after %d days. No cookies, no IP addresses, and no personal data are stored.', 'flexframe-viewer'), (int) FLEXFRAME_USAGE_RETENTION_DAYS); ?>
                </p>
            </form>
        </div>
    </div>

    <style>
        .flexframe-usage-ranges { margin: 16px 0; }
        .flexframe-usage-cards { display: flex; flex-wrap: wrap; gap: 14px; margin: 18px 0 24px; }
        .flexframe-usage-card { flex: 1 1 150px; background: #fff; border: 1px solid #dcdcde; border-radius: 8px; padding: 16px 18px; display: flex; flex-direction: column; }
        .flexframe-usage-card .fu-card-value { font-size: 26px; font-weight: 600; line-height: 1.1; color: #1d2327; }
        .flexframe-usage-card .fu-card-label { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: #646970; margin-top: 6px; }
        .flexframe-usage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 782px) { .flexframe-usage-grid { grid-template-columns: 1fr; } }
        .flexframe-usage-panel { background: #fff; border: 1px solid #dcdcde; border-radius: 8px; padding: 14px 18px 20px; margin: 0 0 20px; }
        .flexframe-usage-panel h2 { font-size: 15px; margin: 6px 0 12px; }
        .fu-bar { display: flex; height: 30px; border-radius: 6px; overflow: hidden; background: #f0f0f1; font-size: 12px; font-weight: 600; color: #fff; }
        .fu-bar-sd { background: #2271b1; display: flex; align-items: center; justify-content: center; min-width: 0; }
        .fu-bar-hd { background: #d63638; display: flex; align-items: center; justify-content: center; min-width: 0; }
    </style>
    <?php
}
