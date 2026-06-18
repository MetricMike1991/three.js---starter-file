/**
 * FlexFrame — Demo Page Analytics beacon (cookie-free).
 *
 * Loaded only on gym demo pages. Sends two anonymous, first-party beacons:
 *   1. A "view" the moment the page loads.
 *   2. An "engage" ping once the visitor has meaningfully interacted
 *      (pointer/scroll/touch) or dwelled long enough to count as engaged.
 *
 * No cookies and no localStorage are used. A random per-load view id lives
 * only in memory for the lifetime of the page, so nothing persists on the
 * visitor's device.
 */
(function () {
    'use strict';

    var cfg = window.flexframeDemoAnalytics;
    if (!cfg || !cfg.rest || !cfg.pageId) {
        return;
    }

    // Random per-page-load id (in-memory only — never stored).
    var viewId = (function () {
        var s = '';
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 24; i++) {
            s += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return s;
    })();

    var ENGAGE_THRESHOLD_MS = 15000; // dwell time that counts as "engaged"
    var startTime = Date.now();
    var engaged = false;
    var interacted = false;

    function send(path, payload) {
        var url = cfg.rest + path;
        try {
            var body = JSON.stringify(payload);
            if (navigator.sendBeacon) {
                var blob = new Blob([body], { type: 'application/json' });
                navigator.sendBeacon(url, blob);
                return;
            }
        } catch (e) { /* fall through to fetch */ }

        // Fallback for browsers without sendBeacon.
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

    function referrerHost() {
        try {
            if (document.referrer) {
                var sameOrigin = document.referrer.indexOf(window.location.origin) === 0;
                return sameOrigin ? '' : document.referrer;
            }
        } catch (e) {}
        return '';
    }

    // 1) Record the view immediately.
    send('demo-view', {
        pageId: cfg.pageId,
        viewId: viewId,
        referrer: referrerHost()
    });

    // 2) Mark engagement once — on real interaction or after the dwell threshold.
    function markEngaged() {
        if (engaged) {
            return;
        }
        engaged = true;
        var seconds = Math.round((Date.now() - startTime) / 1000);
        send('demo-engage', { viewId: viewId, seconds: seconds });
        cleanup();
    }

    function onInteract() {
        interacted = true;
        // Require a tiny dwell so an instant bounce-click doesn't count.
        if (Date.now() - startTime > 3000) {
            markEngaged();
        }
    }

    var interactionEvents = ['pointerdown', 'touchstart', 'wheel', 'keydown'];
    function addListeners() {
        interactionEvents.forEach(function (ev) {
            window.addEventListener(ev, onInteract, { passive: true });
        });
    }
    function cleanup() {
        interactionEvents.forEach(function (ev) {
            window.removeEventListener(ev, onInteract, { passive: true });
        });
        if (dwellTimer) {
            clearTimeout(dwellTimer);
            dwellTimer = null;
        }
    }
    addListeners();

    // Dwell-based engagement.
    var dwellTimer = setTimeout(function () {
        markEngaged();
    }, ENGAGE_THRESHOLD_MS);

    // On the way out, if they interacted but we never sent engagement
    // (e.g. left before the dwell timer), send the accumulated dwell.
    window.addEventListener('pagehide', function () {
        if (!engaged && interacted) {
            var seconds = Math.round((Date.now() - startTime) / 1000);
            engaged = true;
            send('demo-engage', { viewId: viewId, seconds: seconds });
        }
    });
})();
