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
 * Default trial length (days) counted from the first ENGAGED visit.
 */
if (!defined('FLEXFRAME_DEMO_TRIAL_DAYS')) {
    define('FLEXFRAME_DEMO_TRIAL_DAYS', 14);
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

    // CTA content is static per-URL (so it caches fine). Only the "expired"
    // boolean is fetched fresh from REST at runtime, keeping this cache-safe.
    $cta = flexframe_demo_cta_content($post_id);

    wp_localize_script('flexframe-demo-analytics', 'flexframeDemoAnalytics', array(
        'rest'   => esc_url_raw(rest_url('flexframe/v1/')),
        'pageId' => (int) $post_id,
        'cta'    => $cta,
    ));
}
add_action('wp_enqueue_scripts', 'flexframe_enqueue_demo_analytics');

/**
 * Build the branded "demo ended" CTA payload for a demo page.
 * {gym} is replaced with the demo/gym name.
 */
function flexframe_demo_cta_content($page_id) {
    $gym = get_post_meta($page_id, '_flexframe_demo_name', true);
    if (empty($gym)) {
        $gym = get_the_title($page_id);
    }

    $logo = get_post_meta($page_id, '_flexframe_demo_logo_url', true);
    if (empty($logo)) {
        $logo = get_option('flexframe_logo_url', '');
    }

    $heading = get_option('flexframe_demo_cta_heading', '');
    if ($heading === '') {
        $heading = __('Your demo has ended', 'flexframe-viewer');
    }

    $message = get_option('flexframe_demo_cta_message', '');
    if ($message === '') {
        $message = __('We hope you enjoyed exploring this branded 3D workout experience. Ready to bring it to {gym}?', 'flexframe-viewer');
    }

    $button = get_option('flexframe_demo_cta_button', '');
    if ($button === '') {
        $button = __('Get in touch', 'flexframe-viewer');
    }

    $url = get_option('flexframe_demo_cta_url', '');
    if ($url === '') {
        $url = 'mailto:' . get_option('admin_email');
    }

    // Token replacement.
    $heading = str_replace('{gym}', $gym, $heading);
    $message = str_replace('{gym}', $gym, $message);

    return array(
        'gym'        => $gym,
        'logo'       => esc_url_raw($logo),
        'heading'    => wp_strip_all_tags($heading),
        'message'    => wp_strip_all_tags($message),
        'buttonText' => wp_strip_all_tags($button),
        'buttonUrl'  => esc_url_raw($url),
        'color'      => sanitize_hex_color(get_option('flexframe_primary_color', '#f50000')) ?: '#f50000',
    );
}

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
    register_rest_route('flexframe/v1', '/demo-status', array(
        'methods'             => 'GET',
        'callback'            => 'flexframe_handle_demo_status',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'flexframe_register_demo_analytics_api');

/**
 * Fresh (uncached) trial-status check for the frontend gate.
 * Returns only the expired boolean — keeps demo pages cache-safe.
 */
function flexframe_handle_demo_status($request) {
    $page_id = absint($request->get_param('pageId'));
    if (!$page_id || !flexframe_is_demo_page($page_id)) {
        return new WP_Error('invalid_page', 'Not a demo page.', array('status' => 400));
    }
    $response = rest_ensure_response(array(
        'expired' => flexframe_demo_is_expired($page_id),
    ));
    // Never cache this response.
    $response->header('Cache-Control', 'no-store, max-age=0');
    return $response;
}

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

    // Start the trial clock on the FIRST engaged visit for this demo.
    $page_id = (int) $wpdb->get_var($wpdb->prepare(
        "SELECT page_id FROM $table WHERE view_id = %s LIMIT 1",
        $view_id
    ));
    if ($page_id) {
        flexframe_demo_start_trial($page_id);
    }

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
 *  Trial / CRM lifecycle
 * ------------------------------------------------------------------ */

/**
 * Valid lifecycle statuses. "expired" is DERIVED (time-based), never stored.
 */
function flexframe_demo_statuses() {
    return array('new', 'engaged', 'hot', 'won', 'lost');
}

/**
 * Get the stored status for a demo (defaults to "new").
 */
function flexframe_demo_get_status($page_id) {
    $status = get_post_meta($page_id, '_flexframe_demo_status', true);
    return in_array($status, flexframe_demo_statuses(), true) ? $status : 'new';
}

/**
 * Trial length (days) for a demo — per-demo override or global default.
 */
function flexframe_demo_trial_days($page_id) {
    $days = (int) get_post_meta($page_id, '_flexframe_demo_trial_days', true);
    return $days > 0 ? $days : (int) FLEXFRAME_DEMO_TRIAL_DAYS;
}

/**
 * Follow-up email definitions. Each is a touchpoint you send MANUALLY;
 * the system only tracks whether/when you've sent it.
 *
 *  - offset_from: 'engaged' (first engaged visit) or 'expiry'
 *  - offset_days: days added to that anchor to compute the "due" date
 */
function flexframe_demo_followup_defs() {
    return array(
        'checkin' => array(
            'label'       => __('Check-in email', 'flexframe-viewer'),
            'offset_from' => 'engaged',
            'offset_days' => 3,
        ),
        'expiring' => array(
            'label'       => __('Expiring-soon nudge', 'flexframe-viewer'),
            'offset_from' => 'expiry',
            'offset_days' => -3,
        ),
    );
}

/**
 * Start (or no-op if already started) the trial clock for a demo.
 * Called on the first ENGAGED visit. Also promotes "new" -> "engaged".
 */
function flexframe_demo_start_trial($page_id) {
    $existing = get_post_meta($page_id, '_flexframe_demo_first_engaged', true);
    if (empty($existing)) {
        update_post_meta($page_id, '_flexframe_demo_first_engaged', current_time('mysql'));
    }
    // Only auto-promote from the initial "new" state — never downgrade
    // a manually-set hot/won/lost.
    if (flexframe_demo_get_status($page_id) === 'new') {
        update_post_meta($page_id, '_flexframe_demo_status', 'engaged');
    }
}

/**
 * Full trial / CRM snapshot for a demo, used by the admin UI and the
 * frontend expiry check.
 */
function flexframe_get_demo_trial($page_id) {
    $page_id       = (int) $page_id;
    $status        = flexframe_demo_get_status($page_id);
    $first_engaged = get_post_meta($page_id, '_flexframe_demo_first_engaged', true);
    $trial_days    = flexframe_demo_trial_days($page_id);
    $started       = !empty($first_engaged);

    $expiry_ts  = $started ? strtotime($first_engaged) + ($trial_days * DAY_IN_SECONDS) : 0;
    $now        = current_time('timestamp');
    $days_left  = $started ? (int) ceil(($expiry_ts - $now) / DAY_IN_SECONDS) : null;

    // Manual override: an admin can force-expire a demo at any time.
    $forced = (bool) get_post_meta($page_id, '_flexframe_demo_force_expired', true);

    // Expired = manually forced, OR (trial started, window passed, not "won").
    $expired = $forced || ($started && $now > $expiry_ts && $status !== 'won');

    // Build follow-up states.
    $sent = get_post_meta($page_id, '_flexframe_demo_followups', true);
    if (!is_array($sent)) {
        $sent = array();
    }
    $followups   = array();
    $next_action = '';
    foreach (flexframe_demo_followup_defs() as $key => $def) {
        $due_ts = 0;
        if ($started) {
            if ($def['offset_from'] === 'engaged') {
                $due_ts = strtotime($first_engaged) + ($def['offset_days'] * DAY_IN_SECONDS);
            } elseif ($def['offset_from'] === 'expiry') {
                $due_ts = $expiry_ts + ($def['offset_days'] * DAY_IN_SECONDS);
            }
        }
        $sent_at = isset($sent[$key]) && !empty($sent[$key]) ? $sent[$key] : '';

        if (!empty($sent_at)) {
            $state = 'sent';
        } elseif (!$started) {
            $state = 'pending';     // clock not started yet
        } elseif ($expired && $key !== 'checkin') {
            $state = 'na';          // expiring nudge is moot once expired
        } elseif ($now >= $due_ts) {
            // Overdue if more than a day past due.
            $state = ($now - $due_ts) > DAY_IN_SECONDS ? 'overdue' : 'due';
        } else {
            $state = 'upcoming';
        }

        $followups[$key] = array(
            'label'   => $def['label'],
            'due_ts'  => $due_ts,
            'sent_at' => $sent_at,
            'state'   => $state,
        );

        // Surface the most urgent actionable follow-up for the at-a-glance row.
        if (($state === 'overdue' || $state === 'due') && $next_action === '') {
            $next_action = $def['label'];
        }
    }

    return array(
        'status'        => $status,
        'started'       => $started,
        'first_engaged' => $first_engaged ? $first_engaged : '',
        'trial_days'    => $trial_days,
        'expiry_ts'     => $expiry_ts,
        'days_left'     => $days_left,
        'expired'       => $expired,
        'forced'        => $forced,
        'followups'     => $followups,
        'next_action'   => $next_action,
    );
}

/**
 * Is this demo currently past its trial? (Frontend gate.)
 */
function flexframe_demo_is_expired($page_id) {
    $trial = flexframe_get_demo_trial($page_id);
    return !empty($trial['expired']);
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
 * Render the CRM control panel (trial timeline + follow-up checklist +
 * reset) for one demo. Returned inside the expandable detail row.
 */
function flexframe_render_demo_crm_panel($page_id) {
    $trial = flexframe_get_demo_trial($page_id);

    // Trial line.
    if (!$trial['started']) {
        $trial_html = '<span class="ffda-trial-pill ffda-trial-pending">' . esc_html__('Trial not started — waiting for first engaged visit', 'flexframe-viewer') . '</span>';
    } elseif ($trial['expired']) {
        $trial_html = '<span class="ffda-trial-pill ffda-trial-expired">' . esc_html__('Trial expired', 'flexframe-viewer') . '</span>';
    } else {
        $days = max(0, (int) $trial['days_left']);
        $trial_html = '<span class="ffda-trial-pill ffda-trial-active">'
            . sprintf(esc_html(_n('%d day left', '%d days left', $days, 'flexframe-viewer')), $days)
            . '</span>';
    }
    $meta = '';
    if ($trial['started']) {
        $meta = '<span class="ffda-trial-meta">'
            . esc_html(sprintf(
                /* translators: 1: start date, 2: expiry date */
                __('Started %1$s · ends %2$s', 'flexframe-viewer'),
                mysql2date('M j', $trial['first_engaged']),
                date_i18n('M j', $trial['expiry_ts'])
            ))
            . '</span>';
    }

    ob_start();
    ?>
    <div class="ffda-crm">
        <div class="ffda-crm-row">
            <div class="ffda-crm-block">
                <span class="ffda-crm-label"><?php esc_html_e('Status', 'flexframe-viewer'); ?></span>
                <select class="ffda-status-select" data-page-id="<?php echo esc_attr($page_id); ?>">
                    <?php foreach (flexframe_demo_status_labels() as $val => $label) : ?>
                        <option value="<?php echo esc_attr($val); ?>" <?php selected($trial['status'], $val); ?>><?php echo esc_html($label); ?></option>
                    <?php endforeach; ?>
                </select>
                <button type="button" class="button button-small ffda-mark-hot" data-page-id="<?php echo esc_attr($page_id); ?>" title="<?php esc_attr_e('Mark as hot lead', 'flexframe-viewer'); ?>">
                    <span class="dashicons dashicons-superhero" style="margin-top:3px;"></span> <?php esc_html_e('Hot', 'flexframe-viewer'); ?>
                </button>
            </div>
            <div class="ffda-crm-block">
                <span class="ffda-crm-label"><?php esc_html_e('Trial', 'flexframe-viewer'); ?></span>
                <?php echo $trial_html; // phpcs:ignore WordPress.Security.EscapeOutput ?>
                <?php echo $meta; // phpcs:ignore WordPress.Security.EscapeOutput ?>
            </div>
            <div class="ffda-crm-block ffda-crm-reset">
                <?php if (!empty($trial['forced'])) : ?>
                    <button type="button" class="button button-small ffda-reactivate-btn" data-page-id="<?php echo esc_attr($page_id); ?>" title="<?php esc_attr_e('Lift the manual expiry and restore the demo', 'flexframe-viewer'); ?>">
                        <span class="dashicons dashicons-controls-play" style="margin-top:3px;"></span> <?php esc_html_e('Reactivate', 'flexframe-viewer'); ?>
                    </button>
                <?php else : ?>
                    <button type="button" class="button button-small ffda-expire-btn" data-page-id="<?php echo esc_attr($page_id); ?>" title="<?php esc_attr_e('End this trial now and show the CTA on the demo page', 'flexframe-viewer'); ?>">
                        <span class="dashicons dashicons-lock" style="margin-top:3px;"></span> <?php esc_html_e('Expire now', 'flexframe-viewer'); ?>
                    </button>
                <?php endif; ?>
                <button type="button" class="button button-small ffda-reset-btn" data-page-id="<?php echo esc_attr($page_id); ?>" title="<?php esc_attr_e('Reset stats & trial timer for this demo', 'flexframe-viewer'); ?>">
                    <span class="dashicons dashicons-image-rotate" style="margin-top:3px;"></span> <?php esc_html_e('Reset', 'flexframe-viewer'); ?>
                </button>
            </div>
        </div>

        <div class="ffda-followups">
            <span class="ffda-crm-label"><?php esc_html_e('Follow-up emails', 'flexframe-viewer'); ?></span>
            <ul class="ffda-followup-list">
                <?php foreach ($trial['followups'] as $key => $f) :
                    $state = $f['state'];
                    $due   = $f['due_ts'] ? date_i18n('M j', $f['due_ts']) : '';
                    ?>
                    <li class="ffda-followup ffda-fu-<?php echo esc_attr($state); ?>">
                        <span class="ffda-fu-label"><?php echo esc_html($f['label']); ?></span>
                        <?php if ($state === 'sent') : ?>
                            <span class="ffda-fu-status ffda-fu-sent-label"><span class="dashicons dashicons-yes-alt"></span><?php echo esc_html(sprintf(__('Sent %s', 'flexframe-viewer'), mysql2date('M j', $f['sent_at']))); ?></span>
                            <button type="button" class="button-link ffda-fu-undo" data-page-id="<?php echo esc_attr($page_id); ?>" data-key="<?php echo esc_attr($key); ?>"><?php esc_html_e('undo', 'flexframe-viewer'); ?></button>
                        <?php elseif ($state === 'pending') : ?>
                            <span class="ffda-fu-status ffda-fu-muted"><?php esc_html_e('after first engagement', 'flexframe-viewer'); ?></span>
                        <?php elseif ($state === 'na') : ?>
                            <span class="ffda-fu-status ffda-fu-muted"><?php esc_html_e('not needed', 'flexframe-viewer'); ?></span>
                        <?php else : ?>
                            <?php if ($state === 'overdue') : ?>
                                <span class="ffda-fu-status ffda-fu-overdue-label"><?php esc_html_e('Overdue', 'flexframe-viewer'); ?><?php echo $due ? ' · ' . esc_html($due) : ''; ?></span>
                            <?php elseif ($state === 'due') : ?>
                                <span class="ffda-fu-status ffda-fu-due-label"><?php esc_html_e('Due now', 'flexframe-viewer'); ?></span>
                            <?php else : ?>
                                <span class="ffda-fu-status ffda-fu-muted"><?php echo esc_html(sprintf(__('due %s', 'flexframe-viewer'), $due)); ?></span>
                            <?php endif; ?>
                            <button type="button" class="button button-small ffda-fu-mark" data-page-id="<?php echo esc_attr($page_id); ?>" data-key="<?php echo esc_attr($key); ?>"><?php esc_html_e('Mark sent', 'flexframe-viewer'); ?></button>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Human labels for each lifecycle status.
 */
function flexframe_demo_status_labels() {
    return array(
        'new'     => __('New', 'flexframe-viewer'),
        'engaged' => __('Engaged', 'flexframe-viewer'),
        'hot'     => __('Hot', 'flexframe-viewer'),
        'won'     => __('Won', 'flexframe-viewer'),
        'lost'    => __('Lost', 'flexframe-viewer'),
    );
}

/**
 * AJAX: return the detail panel HTML (CRM controls + recent visits).
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
    echo flexframe_render_demo_crm_panel($page_id); // phpcs:ignore WordPress.Security.EscapeOutput
    echo '<div class="ffda-recent-wrap"><span class="ffda-crm-label">' . esc_html__('Recent visits', 'flexframe-viewer') . '</span>';
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
    echo '</div>';
    $html = ob_get_clean();

    wp_send_json_success(array('html' => $html));
}
add_action('wp_ajax_flexframe_demo_analytics_detail', 'flexframe_ajax_demo_analytics_detail');

/**
 * AJAX: reset stats + trial timer for one demo.
 */
function flexframe_ajax_demo_reset() {
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

    global $wpdb;
    $table = $wpdb->prefix . 'flexframe_demo_views';
    $wpdb->delete($table, array('page_id' => $page_id), array('%d'));

    delete_post_meta($page_id, '_flexframe_demo_first_engaged');
    delete_post_meta($page_id, '_flexframe_demo_followups');
    delete_post_meta($page_id, '_flexframe_demo_force_expired');
    update_post_meta($page_id, '_flexframe_demo_status', 'new');

    wp_send_json_success(array('message' => 'Demo stats and trial timer reset.'));
}
add_action('wp_ajax_flexframe_demo_reset', 'flexframe_ajax_demo_reset');

/**
 * AJAX: manually force-expire (or reactivate) a demo's trial.
 * Forcing triggers the branded "demo ended" CTA on the demo page.
 */
function flexframe_ajax_demo_force_expire() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    if (!$page_id || !flexframe_is_demo_page($page_id)) {
        wp_send_json_error(array('message' => 'Invalid demo page.'));
    }

    // 'expire' to force-expire, 'reactivate' to lift the manual override.
    $mode = isset($_POST['mode']) ? sanitize_text_field($_POST['mode']) : 'expire';

    if ($mode === 'reactivate') {
        delete_post_meta($page_id, '_flexframe_demo_force_expired');
    } else {
        update_post_meta($page_id, '_flexframe_demo_force_expired', '1');
    }

    $trial  = flexframe_get_demo_trial($page_id);
    $labels = flexframe_demo_status_labels();
    $cur    = isset($labels[$trial['status']]) ? $labels[$trial['status']] : $trial['status'];

    wp_send_json_success(array(
        'expired' => !empty($trial['expired']),
        'forced'  => !empty($trial['forced']),
        'status'  => $trial['status'],
        'label'   => $cur,
        'html'    => flexframe_render_demo_crm_panel($page_id),
    ));
}
add_action('wp_ajax_flexframe_demo_force_expire', 'flexframe_ajax_demo_force_expire');

/**
 * AJAX: set lifecycle status for one demo.
 */
function flexframe_ajax_demo_set_status() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    $status  = isset($_POST['status']) ? sanitize_text_field($_POST['status']) : '';
    if (!$page_id || !in_array($status, flexframe_demo_statuses(), true)) {
        wp_send_json_error(array('message' => 'Invalid request.'));
    }

    update_post_meta($page_id, '_flexframe_demo_status', $status);

    $labels = flexframe_demo_status_labels();
    wp_send_json_success(array(
        'status' => $status,
        'label'  => isset($labels[$status]) ? $labels[$status] : $status,
    ));
}
add_action('wp_ajax_flexframe_demo_set_status', 'flexframe_ajax_demo_set_status');

/**
 * AJAX: mark a follow-up email as sent / undo.
 */
function flexframe_ajax_demo_mark_followup() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }
    $page_id = isset($_POST['page_id']) ? absint($_POST['page_id']) : 0;
    $key     = isset($_POST['key']) ? sanitize_key($_POST['key']) : '';
    $undo    = !empty($_POST['undo']);

    $defs = flexframe_demo_followup_defs();
    if (!$page_id || !isset($defs[$key])) {
        wp_send_json_error(array('message' => 'Invalid request.'));
    }

    $sent = get_post_meta($page_id, '_flexframe_demo_followups', true);
    if (!is_array($sent)) {
        $sent = array();
    }
    if ($undo) {
        unset($sent[$key]);
    } else {
        $sent[$key] = current_time('mysql');
    }
    update_post_meta($page_id, '_flexframe_demo_followups', $sent);

    // Return refreshed CRM panel HTML so the row updates in place.
    wp_send_json_success(array('html' => flexframe_render_demo_crm_panel($page_id)));
}
add_action('wp_ajax_flexframe_demo_mark_followup', 'flexframe_ajax_demo_mark_followup');

/**
 * AJAX: save the global demo expiry CTA content.
 */
function flexframe_ajax_demo_save_cta() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'flexframe_settings_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permission denied.'));
    }

    $heading = isset($_POST['heading']) ? sanitize_text_field(wp_unslash($_POST['heading'])) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';
    $button  = isset($_POST['button']) ? sanitize_text_field(wp_unslash($_POST['button'])) : '';
    $url     = isset($_POST['url']) ? esc_url_raw(wp_unslash($_POST['url'])) : '';

    update_option('flexframe_demo_cta_heading', $heading);
    update_option('flexframe_demo_cta_message', $message);
    update_option('flexframe_demo_cta_button', $button);
    update_option('flexframe_demo_cta_url', $url);

    wp_send_json_success(array('message' => 'CTA saved.'));
}
add_action('wp_ajax_flexframe_demo_save_cta', 'flexframe_ajax_demo_save_cta');

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
