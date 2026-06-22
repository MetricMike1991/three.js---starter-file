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

    // 1b) Check (fresh, uncached) whether this demo's trial has expired.
    //     If so, lock the viewer behind a branded "demo ended" CTA.
    checkExpiry();

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

    /* ------------------------------------------------------------------ *
     *  Trial expiry gate
     * ------------------------------------------------------------------ */

    function checkExpiry() {
        var url = cfg.rest + 'demo-status?pageId=' + encodeURIComponent(cfg.pageId);
        try {
            fetch(url, { method: 'GET', credentials: 'omit', cache: 'no-store' })
                .then(function (r) { return r.ok ? r.json() : null; })
                .then(function (data) {
                    if (data && data.expired) {
                        renderExpiredCTA();
                    }
                })
                .catch(function () { /* fail open — never block on a network error */ });
        } catch (e) { /* ignore */ }
    }

    function renderExpiredCTA() {
        var cta = cfg.cta || {};
        var color = cta.color || '#f50000';

        // Stop the engagement timer — an expired page shouldn't log engagement.
        cleanup();

        var overlay = document.createElement('div');
        overlay.id = 'ffx-demo-expired';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Demo ended');
        overlay.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:2147483600',
            'display:flex', 'align-items:center', 'justify-content:center',
            'padding:24px', 'box-sizing:border-box',
            'background:radial-gradient(circle at 50% 30%, #1c1c22 0%, #0b0b0f 100%)',
            'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif'
        ].join(';');

        var logoHtml = cta.logo
            ? '<img src="' + escapeAttr(cta.logo) + '" alt="" style="max-width:180px;max-height:90px;margin:0 auto 28px;display:block;object-fit:contain;" />'
            : '';

        var heading = escapeHtml(cta.heading || 'Your demo has ended');
        var message = escapeHtml(cta.message || '');
        var btnText = escapeHtml(cta.buttonText || 'Get in touch');
        var btnUrl = cta.buttonUrl || '#';

        overlay.innerHTML =
            '<div style="max-width:520px;width:100%;text-align:center;color:#fff;">' +
                logoHtml +
                '<div style="display:inline-block;padding:6px 14px;border-radius:999px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-bottom:20px;background:' + escapeAttr(color) + '22;color:' + escapeAttr(color) + ';">Trial ended</div>' +
                '<h1 style="font-size:30px;line-height:1.2;margin:0 0 14px;font-weight:800;color:#fff;">' + heading + '</h1>' +
                '<p style="font-size:16px;line-height:1.6;margin:0 0 30px;color:#c9c9d2;">' + message + '</p>' +
                '<a href="' + escapeAttr(btnUrl) + '" style="display:inline-block;padding:14px 30px;border-radius:10px;background:' + escapeAttr(color) + ';color:#fff;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px ' + escapeAttr(color) + '55;">' + btnText + '</a>' +
            '</div>';

        document.body.appendChild(overlay);
        document.documentElement.style.overflow = 'hidden';
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function escapeAttr(s) {
        return escapeHtml(s);
    }
})();
