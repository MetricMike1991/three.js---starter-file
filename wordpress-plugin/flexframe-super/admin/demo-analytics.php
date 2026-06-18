<?php
/**
 * ========== DEMO PAGE ANALYTICS ==========
 *
 * Cookie-free, first-party usage analytics for Gym Demo Pages.
 *
 * Design goals:
 *  - No cookies, no third-party scripts, no cross-site identifiers
 *    → no cookie-consent banner required.
 *  - Cache-safe: demo pages are typically full-page cached, so logging
 *    happens via a JS beacon hitting a (non-cached) REST endpoint rather
 *    than at PHP render time. The demo page ID is baked into the per-URL
 *    HTML, which is correct even when that HTML is served from cache.
 *  - Privacy-conscious: we store a salted HASH of IP+UA (never the raw IP),
 *    used only to roughly count unique/returning visitors. Rows auto-purge
 *    after a retention window.
 *
 * What we capture per page load:
 *  - Which demo page, timestamp, device type (desktop/mobile/tablet),
 *    a coarse visitor hash (repeat-visit detection), referrer host,
 *    and an engagement flag + dwell seconds (set by a follow-up beacon).
 *
 * @package FlexFrame_Super
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Number of days to retain individual view rows before auto-purging.
 */
if (!defined('FLEXFRAME_DEMO_ANALYTICS_RETENTION_DAYS')) {
    define('FLEXFRAME_DEMO_ANALYTICS_RETENTION_DAYS', 90);
}

/**
 * Create / upgrade the demo views table.
 */
function flexframe_create_demo_views_table() {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        page_id bigint(20) UNSIGNED NOT NULL,
        view_id varchar(32) NOT NULL DEFAULT '',
        visitor_hash varchar(64) NOT NULL DEFAULT '',
        device varchar(20) NOT NULL DEFAULT '',
        user_agent varchar(255) NOT NULL DEFAULT '',
        referrer varchar(255) NOT NULL DEFAULT '',
        engaged tinyint(1) NOT NULL DEFAULT 0,
        engaged_seconds int(11) NOT NULL DEFAULT 0,
        viewed_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY page_id (page_id),
        KEY view_id (view_id),
        KEY viewed_at (viewed_at)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}

/**
 * Ensure the table exists (cheap option-flag guard so we don't run
 * dbDelta on every request).
 */
function flexframe_maybe_create_demo_views_table() {
    $flag = get_option('flexframe_demo_views_table_version', '');
    if ($flag !== '1') {
        flexframe_create_demo_views_table();
        update_option('flexframe_demo_views_table_version', '1');
    }
}

/* ------------------------------------------------------------------ *
 *  Helpers
 * ------------------------------------------------------------------ */

/**
 * Is the given post ID a gym demo page?
 */
function flexframe_is_demo_page($post_id) {
    if (!$post_id) {
        return false;
    }
    return (bool) get_post_meta($post_id, '_flexframe_demo_page', true);
}

/**
 * Derive a coarse device bucket from a user-agent string.
 *
 * @return string desktop|mobile|tablet|bot
 */
function flexframe_detect_device($ua) {
    $ua = (string) $ua;
    if ($ua === '') {
        return 'unknown';
    }
    if (preg_match('/bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|bingpreview|google-read|monitor|curl|wget|python-requests|headless/i', $ua)) {
        return 'bot';
    }
    if (preg_match('/ipad|tablet|playbook|silk|(android(?!.*mobile))/i', $ua)) {
        return 'tablet';
    }
    if (preg_match('/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i', $ua)) {
        return 'mobile';
    }
    return 'desktop';
}

/**
 * Build a salted, non-reversible visitor hash from IP + UA.
 * Stored only as a hash so we never persist a raw IP address.
 */
function flexframe_visitor_hash($ip, $ua, $page_id) {
    $salt = wp_salt('nonce');
    return hash('sha256', $salt . '|' . $ip . '|' . $ua . '|' . (int) $page_id);
}

/**
 * Best-effort client IP (used only to compute the hash, never stored raw).
 */
function flexframe_client_ip() {
    $keys = array('HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR');
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $val = $_SERVER[$key];
            if ($key === 'HTTP_X_FORWARDED_FOR' && strpos($val, ',') !== false) {
                $parts = explode(',', $val);
                $val = trim($parts[0]);
            }
            $val = filter_var($val, FILTER_VALIDATE_IP);
            if ($val) {
                return $val;
            }
        }
    }
    return '';
}

/* ------------------------------------------------------------------ *
 *  Frontend: inject demo id + enqueue the beacon (cache-safe)
 * ------------------------------------------------------------------ */

/**
 * On a demo page, enqueue the lightweight beacon script and hand it the
 * demo page ID + REST endpoint. These values are static per URL, so they
 * cache correctly. No cookies, no nonce (the endpoints are public and only
 * write anonymous aggregate rows).
 */
function flexframe_enqueue_demo_analytics() {
    if (!is_singular('page')) {
        return;
    }
    $post_id = get_queried_object_id();
    if (!flexframe_is_demo_page($post_id)) {
        return;
    }

    wp_enqueue_script(
        'flexframe-demo-analytics',
        FLEXFRAME_PLUGIN_URL . 'assets/demo-analytics.js',
        array(),
        FLEXFRAME_VERSION,
        true
    );

    wp_localize_script('flexframe-demo-analytics', 'flexframeDemoAnalytics', array(
        'rest'   => esc_url_raw(rest_url('flexframe/v1/')),
        'pageId' => (int) $post_id,
    ));
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_demo_analytics');

/* ------------------------------------------------------------------ *
 *  REST beacons
 * ------------------------------------------------------------------ */

function flexframe_register_demo_analytics_api() {
    register_rest_route('flexframe/v1', '/demo-view', array(
        'methods'             => 'POST',
        'callback'            => 'flexframe_handle_demo_view',
        'permission_callback' => '__return_true',
    ));
    register_rest_route('flexframe/v1', '/demo-engage', array(
        'methods'             => 'POST',
        'callback'            => 'flexframe_handle_demo_engage',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'flexframe_register_demo_analytics_api');

/**
 * Record a single demo page view.
 */
function flexframe_handle_demo_view($request) {
    $params  = $request->get_json_params();
    $page_id = isset($params['pageId']) ? absint($params['pageId']) : 0;
    $view_id = isset($params['viewId']) ? sanitize_text_field($params['viewId']) : '';

    // Only log genuine demo pages.
    if (!$page_id || !flexframe_is_demo_page($page_id)) {
        return new WP_Error('invalid_page', 'Not a demo page.', array('status' => 400));
    }

    // Normalise the client-supplied view id to a safe 32-char token.
    $view_id = preg_replace('/[^a-zA-Z0-9]/', '', $view_id);
    if (strlen($view_id) < 8 || strlen($view_id) > 32) {
        $view_id = wp_generate_password(24, false, false);
    }

    $ua  = isset($_SERVER['HTTP_USER_AGENT']) ? substr(sanitize_text_field($_SERVER['HTTP_USER_AGENT']), 0, 255) : '';
    $ip  = flexframe_client_ip();
    $dev = flexframe_detect_device($ua);

    // Drop obvious bots so they don't pollute the stats.
    if ($dev === 'bot') {
        return rest_ensure_response(array('ok' => true, 'skipped' => 'bot'));
    }

    $referrer = '';
    if (!empty($params['referrer'])) {
        $host = wp_parse_url(esc_url_raw($params['referrer']), PHP_URL_HOST);
        $referrer = $host ? substr(sanitize_text_field($host), 0, 255) : '';
    }

    flexframe_maybe_create_demo_views_table();

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';

    $wpdb->insert(
        $table,
        array(
            'page_id'      => $page_id,
            'view_id'      => $view_id,
            'visitor_hash' => flexframe_visitor_hash($ip, $ua, $page_id),
            'device'       => $dev,
            'user_agent'   => $ua,
            'referrer'     => $referrer,
            'engaged'      => 0,
            'engaged_seconds' => 0,
            'viewed_at'    => current_time('mysql'),
        ),
        array('%d', '%s', '%s', '%s', '%s', '%s', '%d', '%d', '%s')
    );

    // Opportunistic cleanup of old rows (cheap, runs rarely in practice).
    flexframe_maybe_purge_demo_views();

    return rest_ensure_response(array('ok' => true, 'viewId' => $view_id));
}

/**
 * Mark a previously-recorded view as engaged (and store dwell seconds).
 */
function flexframe_handle_demo_engage($request) {
    $params  = $request->get_json_params();
    $view_id = isset($params['viewId']) ? preg_replace('/[^a-zA-Z0-9]/', '', sanitize_text_field($params['viewId'])) : '';
    $seconds = isset($params['seconds']) ? absint($params['seconds']) : 0;

    if (strlen($view_id) < 8) {
        return new WP_Error('invalid_view', 'Missing view id.', array('status' => 400));
    }

    // Clamp dwell to a sane ceiling (1 hour) to resist tampering.
    if ($seconds > 3600) {
        $seconds = 3600;
    }

    flexframe_maybe_create_demo_views_table();

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';

    $wpdb->query($wpdb->prepare(
        "UPDATE $table SET engaged = 1, engaged_seconds = GREATEST(engaged_seconds, %d) WHERE view_id = %s",
        $seconds,
        $view_id
    ));

    return rest_ensure_response(array('ok' => true));
}

/**
 * Purge view rows older than the retention window. Runs at most once/day.
 */
function flexframe_maybe_purge_demo_views() {
    $last = (int) get_option('flexframe_demo_views_last_purge', 0);
    if ((time() - $last) < DAY_IN_SECONDS) {
        return;
    }
    update_option('flexframe_demo_views_last_purge', time());

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';
    $days  = (int) FLEXFRAME_DEMO_ANALYTICS_RETENTION_DAYS;
    $wpdb->query($wpdb->prepare(
        "DELETE FROM $table WHERE viewed_at < (NOW() - INTERVAL %d DAY)",
        $days
    ));
}

/* ------------------------------------------------------------------ *
 *  Stats queries (admin)
 * ------------------------------------------------------------------ */

/**
 * Summary stats for one demo page.
 *
 * @return array { views, visitors, engaged, avg_seconds, last_seen }
 */
function flexframe_get_demo_stats($page_id) {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';
    $page_id = (int) $page_id;

    $empty = array(
        'views'       => 0,
        'visitors'    => 0,
        'engaged'     => 0,
        'avg_seconds' => 0,
        'last_seen'   => '',
    );

    // Guard: table may not exist yet on a brand-new install.
    if ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table)) !== $table) {
        return $empty;
    }

    $row = $wpdb->get_row($wpdb->prepare(
        "SELECT
            COUNT(*) AS views,
            COUNT(DISTINCT visitor_hash) AS visitors,
            SUM(engaged) AS engaged,
            AVG(NULLIF(engaged_seconds, 0)) AS avg_seconds,
            MAX(viewed_at) AS last_seen
         FROM $table
         WHERE page_id = %d",
        $page_id
    ), ARRAY_A);

    if (!$row) {
        return $empty;
    }

    return array(
        'views'       => (int) $row['views'],
        'visitors'    => (int) $row['visitors'],
        'engaged'     => (int) $row['engaged'],
        'avg_seconds' => (int) round((float) $row['avg_seconds']),
        'last_seen'   => $row['last_seen'] ? $row['last_seen'] : '',
    );
}

/**
 * Recent individual views for one demo page (for the detail panel).
 */
function flexframe_get_demo_recent_views($page_id, $limit = 25) {
    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';
    $page_id = (int) $page_id;
    $limit   = max(1, min(100, (int) $limit));

    if ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table)) !== $table) {
        return array();
    }

    return $wpdb->get_results($wpdb->prepare(
        "SELECT device, referrer, engaged, engaged_seconds, viewed_at
         FROM $table
         WHERE page_id = %d
         ORDER BY viewed_at DESC
         LIMIT %d",
        $page_id,
        $limit
    ), ARRAY_A);
}

/**
 * AJAX: return the recent-views detail panel HTML for one demo page.
 */
function flexframe_ajax_demo_analytics_detail() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }

    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    if (!$page_id) {
        wp_send_json_error(array('message' => 'Missing page id.'));
    }

    $rows = flexframe_get_demo_recent_views($page_id, 25);

    ob_start();
    if (empty($rows)) {
        echo '<p class="ffda-detail-empty">' . esc_html__('No visits recorded yet.', 'flexframe-viewer') . '</p>';
    } else {
        echo '<table class="ffda-detail-table"><thead><tr>';
        echo '<th>' . esc_html__('When', 'flexframe-viewer') . '</th>';
        echo '<th>' . esc_html__('Device', 'flexframe-viewer') . '</th>';
        echo '<th>' . esc_html__('Source', 'flexframe-viewer') . '</th>';
        echo '<th>' . esc_html__('Engaged', 'flexframe-viewer') . '</th>';
        echo '</tr></thead><tbody>';
        foreach ($rows as $r) {
            $when = mysql2date('M j, Y g:i a', $r['viewed_at']);
            $dev  = ucfirst($r['device']);
            $src  = $r['referrer'] !== '' ? $r['referrer'] : esc_html__('Direct', 'flexframe-viewer');
            if ((int) $r['engaged'] === 1) {
                $secs = (int) $r['engaged_seconds'];
                $eng  = $secs > 0
                    ? sprintf(esc_html__('Yes · %s', 'flexframe-viewer'), flexframe_format_duration($secs))
                    : esc_html__('Yes', 'flexframe-viewer');
            } else {
                $eng = '—';
            }
            echo '<tr>';
            echo '<td>' . esc_html($when) . '</td>';
            echo '<td>' . esc_html($dev) . '</td>';
            echo '<td>' . esc_html($src) . '</td>';
            echo '<td>' . esc_html($eng) . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    }
    $html = ob_get_clean();

    wp_send_json_success(array('html' => $html));
}
add_action('wp_ajax_flexframe_demo_analytics_detail', 'flexframe_ajax_demo_analytics_detail');

/**
 * Human-friendly duration (e.g. "2m 5s").
 */
function flexframe_format_duration($seconds) {
    $seconds = (int) $seconds;
    if ($seconds < 60) {
        return $seconds . 's';
    }
    $m = floor($seconds / 60);
    $s = $seconds % 60;
    return $s > 0 ? $m . 'm ' . $s . 's' : $m . 'm';
}

/**
 * Relative "time ago" label for the last-seen value.
 */
function flexframe_demo_time_ago($mysql_datetime) {
    if (empty($mysql_datetime)) {
        return '';
    }
    // viewed_at is stored in site-local time via current_time('mysql'),
    // so compare against the site-local "now" for a consistent diff.
    $ts = strtotime($mysql_datetime);
    if (!$ts) {
        return '';
    }
    return sprintf(
        /* translators: %s: human-readable time difference, e.g. "2 days" */
        __('%s ago', 'flexframe-viewer'),
        human_time_diff($ts, current_time('timestamp'))
    );
}
