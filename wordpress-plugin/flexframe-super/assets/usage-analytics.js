/**
 * FlexFrame — Exercise Viewer usage analytics beacon (cookie-free).
 *
 * Loaded only on the main viewer page (never on gym demo pages). Exposes a
 * tiny global API that the viewer bundle calls when meaningful things happen:
 *
 *   window.flexframeUsage.viewExercise(name)  → logs a view + starts a dwell timer
 *   window.flexframeUsage.track('quality', { detail: 'HD' })
 *   window.flexframeUsage.track('ar',      { exercise: name })
 *   window.flexframeUsage.track('search',  { detail: query, num: resultCount })
 *
 * No cookies and no localStorage are used. A random per-load session id lives
 * only in memory for the lifetime of the page, so nothing persists on the
 * visitor's device. Events are sent with navigator.sendBeacon (fire-and-forget),
 * so there is no impact on rendering or interaction.
 *
 * If this script is not present (e.g. on a demo page, or tracking disabled),
 * the viewer's calls to window.flexframeUsage are simply no-ops.
 */
(function () {
    'use strict';

    var cfg = window.flexframeUsageConfig;

    // Always expose a safe no-op API so the bundle can call it unconditionally.
    function noop() {}
    var api = { track: noop, viewExercise: noop };

    if (!cfg || !cfg.rest || !cfg.enabled) {
        window.flexframeUsage = api;
        return;
    }

    // Random per-page-load session id (in-memory only — never stored).
    var sessionId = (function () {
        var s = '';
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 24; i++) {
            s += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return s;
    })();

    function send(payload) {
        payload.session = sessionId;
        var url = cfg.rest + 'usage-event';
        try {
            var body = JSON.stringify(payload);
            if (navigator.sendBeacon) {
                var blob = new Blob([body], { type: 'application/json' });
                navigator.sendBeacon(url, blob);
                return;
            }
        } catch (e) { /* fall through to fetch */ }

        try {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true,
                credentials: 'omit'
            });
        } catch (e) { /* give up silently */ }
    }

    // ── Per-exercise dwell tracking ──────────────────────────────────────
    // current = { name, start } for the exercise currently on screen.
    var current = null;

    function flushDwell() {
        if (!current) {
            return;
        }
        var seconds = Math.round((Date.now() - current.start) / 1000);
        var name = current.name;
        current = null;
        if (seconds > 0) {
            send({ type: 'duration', exercise: name, num: seconds });
        }
    }

    api.viewExercise = function (name) {
        name = (name == null) ? '' : String(name);
        // Close out the previous exercise's dwell time before starting a new one.
        flushDwell();
        send({ type: 'view', exercise: name });
        current = { name: name, start: Date.now() };
    };

    api.track = function (type, data) {
        if (!type) {
            return;
        }
        data = data || {};
        data.type = type;
        send(data);
    };

    // Flush the in-progress dwell when the page is hidden or unloaded.
    window.addEventListener('pagehide', flushDwell);
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            flushDwell();
        }
    });

    window.flexframeUsage = api;
})();
