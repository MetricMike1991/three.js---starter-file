/**
 * BatchRecorder
 *
 * Hidden UI panel (Ctrl+Shift+B) for recording multiple exercise videos
 * back-to-back without manual intervention.
 *
 * - Opens a floating panel where you search/tick exercises from the full list
 * - Shared recording settings (size, quality, loops) apply to all
 * - Reuses the camera angles captured in the Screenshot panel (_videoAngles)
 * - Calls the same recordTimelineVideo() used by the screenshot panel
 * - Progress log shows status per exercise
 */

import { ScreenshotUtils } from './screenshot-utils.js';

const S = {
    inp: 'background:#1e1e3a;border:1px solid #3a3a5c;border-radius:4px;color:#e0e0e0;padding:5px 8px;font-size:13px;',
    card: 'background:#1a1a35;border:1px solid #2a2a4a;border-radius:5px;padding:8px 10px;',
    smBtn: 'background:#1e1e3a;border:1px solid #3a3a5c;border-radius:3px;color:#aaa;cursor:pointer;font-size:11px;padding:3px 9px;',
};

export class BatchRecorder {
    constructor(app) {
        this.app         = app;
        this.panel       = null;
        this.isRunning   = false;
        this.shouldStop  = false;
        this._allExercises  = [];
        this._checkedIds     = new Set();
        this._searchTerm     = '';

        // Exercise sources — persisted in localStorage
        this._sources         = this._loadSources();
        this._selectedSource  = localStorage.getItem('ff_batch_source_selected') || 'plugin';

        // Per-exercise saved camera angles — persisted in localStorage
        this._perExerciseAngles = this._loadSavedAngles();

        this._buildPanel();
        this._bindKey();
    }

    // ── Public ────────────────────────────────────────────────────────────────

    toggle() {
        if (!this.panel) return;
        if (this.panel.style.display !== 'none') {
            this.panel.style.display = 'none';
        } else {
            this.panel.style.display = 'flex';
            this._refresh();
        }
    }

    _loadSavedAngles() {
        try { return JSON.parse(localStorage.getItem('ff_batch_exercise_angles') || '{}'); }
        catch (_) { return {}; }
    }

    _saveAnglesToStorage() {
        try { localStorage.setItem('ff_batch_exercise_angles', JSON.stringify(this._perExerciseAngles)); }
        catch (_) {}
    }

    _captureAngleForExercise(id) {
        const camera   = this.app.cameraManager?.getCamera();
        const controls = this.app.cameraManager?.getControls();
        if (!camera) return;
        this._perExerciseAngles[id] = {
            position: camera.position.toArray(),
            rotation: camera.rotation.toArray().slice(0, 3),
            target:   controls ? controls.target.toArray() : [0, 0, 0],
        };
        this._saveAnglesToStorage();
        this._renderList();
    }

    _clearAngleForExercise(id) {
        delete this._perExerciseAngles[id];
        this._saveAnglesToStorage();
        this._renderList();
    }

    // ── Sources (exercise lists) ─────────────────────────────────────────

    _loadSources() {
        const defaults = [
            { name: 'Hidden Exercises', url: 'https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises_hidden.json' },
        ];
        try {
            const saved = JSON.parse(localStorage.getItem('ff_batch_sources') || 'null');
            return Array.isArray(saved) ? saved : defaults;
        } catch (_) { return defaults; }
    }

    _saveSources() {
        try { localStorage.setItem('ff_batch_sources', JSON.stringify(this._sources)); }
        catch (_) {}
    }

    _addSource() {
        const name = prompt('Source name (e.g. "Client A Models"):')?.trim();
        if (!name) return;
        const url = prompt('JSON URL:')?.trim();
        if (!url) return;
        this._sources.push({ name, url });
        this._saveSources();
        this._renderSourceDropdown();
    }

    _removeSource() {
        if (this._selectedSource === 'plugin') return;
        const src = this._sources.find(s => s.url === this._selectedSource);
        if (!src) return;
        if (!confirm(`Remove source "${src.name}"?`)) return;
        this._sources = this._sources.filter(s => s.url !== this._selectedSource);
        this._saveSources();
        this._selectedSource = 'plugin';
        localStorage.setItem('ff_batch_source_selected', 'plugin');
        this._renderSourceDropdown();
        this._refresh();
    }

    _renderSourceDropdown() {
        const sel = this.panel?.querySelector('#ff-br-source');
        const removeBtn = this.panel?.querySelector('#ff-br-source-remove');
        if (!sel) return;
        sel.innerHTML =
            `<option value="plugin">Plugin Exercises</option>` +
            this._sources.map(s =>
                `<option value="${s.url}"${s.url === this._selectedSource ? ' selected' : ''}>${s.name}</option>`
            ).join('');
        if (this._selectedSource !== 'plugin') sel.value = this._selectedSource;
        if (removeBtn) removeBtn.disabled = this._selectedSource === 'plugin';
    }

    // ── Key binding ───────────────────────────────────────────────────────────

    _bindKey() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'Y' || e.key === 'y')) {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    // ── Panel construction ────────────────────────────────────────────────────

    _buildPanel() {
        const p = document.createElement('div');
        p.id = 'ff-batch-recorder';
        p.style.cssText = [
            'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)',
            'width:450px;max-height:92vh',
            'background:#14142a;color:#e0e0e0',
            'border:1px solid #3a3a5c;border-radius:10px',
            'box-shadow:0 12px 48px rgba(0,0,0,.75)',
            'display:none;flex-direction:column',
            "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px",
            'z-index:99999;user-select:none',
        ].join(';');

        // Header
        const hdr = document.createElement('div');
        hdr.style.cssText = 'padding:11px 15px;background:#0d0d20;border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:space-between;cursor:move;border-bottom:1px solid #2a2a4a;flex-shrink:0;';
        hdr.innerHTML =
            '<span style="font-weight:700;font-size:14px;letter-spacing:.3px;">Batch Video Recorder</span>' +
            '<button id="ff-br-close" style="background:none;border:none;color:#777;cursor:pointer;font-size:22px;line-height:1;padding:0 2px;" title="Close (Ctrl+Shift+Y)">×</button>';
        p.appendChild(hdr);

        // Body
        const body = document.createElement('div');
        body.style.cssText = 'flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:14px;min-height:0;';

        // Section label helper
        const sec = (t) => `<div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#555;letter-spacing:.8px;margin-bottom:8px;">${t}</div>`;

        body.innerHTML = `
        <div>
          ${sec('Recording Settings')}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:9px;">
            <label style="display:flex;flex-direction:column;gap:3px;">
              <span style="font-size:11px;color:#888;">Width (px)</span>
              <input id="ff-br-width" type="number" value="2500" min="100" max="7680" style="${S.inp}">
            </label>
            <label style="display:flex;flex-direction:column;gap:3px;">
              <span style="font-size:11px;color:#888;">Height (px)</span>
              <input id="ff-br-height" type="number" value="2500" min="100" max="4320" style="${S.inp}">
            </label>
            <label style="display:flex;flex-direction:column;gap:3px;">
              <span style="font-size:11px;color:#888;">Quality</span>
              <select id="ff-br-quality" style="${S.inp}">
                <option value="ultra" selected>Ultra</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </label>
            <label style="display:flex;flex-direction:column;gap:3px;">
              <span style="font-size:11px;color:#888;">Loops</span>
              <input id="ff-br-loops" type="number" value="1" min="1" max="10" style="${S.inp}">
            </label>
          </div>
          <label style="display:flex;align-items:center;gap:7px;font-size:12px;color:#bbb;cursor:pointer;">
            <input id="ff-br-overlay-name" type="checkbox"> Overlay exercise name on video
          </label>
          <label style="display:flex;align-items:center;gap:7px;font-size:12px;color:#bbb;cursor:pointer;">
            <input id="ff-br-overlay-logo" type="checkbox" checked> Include logo on video
          </label>
        </div>

        <div>
          ${sec('Camera Angles')}
          <div id="ff-br-angle-info" style="${S.card} font-size:12px;line-height:1.5;"></div>
        </div>

        <div style="flex:1;display:flex;flex-direction:column;min-height:0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div id="ff-br-list-heading" style="font-size:10px;font-weight:700;text-transform:uppercase;color:#555;letter-spacing:.8px;">Exercises</div>
            <div style="display:flex;gap:5px;">
              <button id="ff-br-reload"   style="${S.smBtn}">Reload</button>
              <button id="ff-br-sel-all"  style="${S.smBtn}">All</button>
              <button id="ff-br-sel-none" style="${S.smBtn}">None</button>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:5px;margin-bottom:7px;">
            <select id="ff-br-source" style="${S.inp} flex:1;cursor:pointer;"></select>
            <button id="ff-br-source-add"    style="${S.smBtn} padding:3px 8px;font-size:14px;line-height:1;" title="Add source">+</button>
            <button id="ff-br-source-remove" style="${S.smBtn} padding:3px 8px;font-size:14px;line-height:1;color:#f87171;" title="Remove source" disabled>−</button>
          </div>
          <input id="ff-br-search" type="text" placeholder="Search exercises…"
            style="${S.inp} width:100%;box-sizing:border-box;margin-bottom:7px;">
          <div id="ff-br-list"
            style="flex:1;min-height:120px;max-height:190px;overflow-y:auto;background:#1a1a35;border:1px solid #2a2a4a;border-radius:5px;padding:3px 0;">
            <div style="color:#555;padding:8px 12px;font-size:12px;">Loading…</div>
          </div>
          <div id="ff-br-count" style="font-size:11px;color:#555;margin-top:5px;text-align:right;">0 selected</div>
        </div>`;

        p.appendChild(body);

        // Footer
        const ftr = document.createElement('div');
        ftr.style.cssText = 'padding:12px 15px;border-top:1px solid #2a2a4a;background:#0d0d20;border-radius:0 0 10px 10px;flex-shrink:0;';
        ftr.innerHTML = `
          <div style="display:flex;gap:8px;margin-bottom:9px;">
            <button id="ff-br-start" style="flex:1;background:#2563eb;border:none;border-radius:5px;color:#fff;cursor:pointer;padding:9px;font-size:13px;font-weight:600;">Start Batch</button>
            <button id="ff-br-stop" disabled style="background:#dc2626;border:none;border-radius:5px;color:#fff;cursor:not-allowed;padding:9px 16px;font-size:13px;font-weight:600;opacity:.3;">Stop</button>
          </div>
          <div id="ff-br-prog-wrap" style="display:none;background:#1a1a35;border-radius:3px;height:4px;margin-bottom:9px;overflow:hidden;">
            <div id="ff-br-prog-bar" style="height:100%;background:#2563eb;border-radius:3px;width:0%;transition:width .4s;"></div>
          </div>
          <div id="ff-br-log" style="display:none;max-height:100px;overflow-y:auto;font-size:11px;font-family:monospace;line-height:1.65;"></div>`;
        p.appendChild(ftr);

        document.body.appendChild(p);
        this.panel = p;

        // Wire events
        p.querySelector('#ff-br-close').addEventListener('click', () => this.toggle());
        p.querySelector('#ff-br-reload').addEventListener('click', () => this._refresh());
        p.querySelector('#ff-br-sel-all').addEventListener('click', () => this._setAll(true));
        p.querySelector('#ff-br-sel-none').addEventListener('click', () => this._setAll(false));
        p.querySelector('#ff-br-search').addEventListener('input', (e) => {
            this._searchTerm = e.target.value.toLowerCase();
            this._renderList();
        });
        p.querySelector('#ff-br-start').addEventListener('click', () => this.startBatch());
        p.querySelector('#ff-br-stop').addEventListener('click', () => { this.shouldStop = true; });

        p.querySelector('#ff-br-source').addEventListener('change', (e) => {
            this._selectedSource = e.target.value;
            localStorage.setItem('ff_batch_source_selected', this._selectedSource);
            const removeBtn = this.panel.querySelector('#ff-br-source-remove');
            if (removeBtn) removeBtn.disabled = this._selectedSource === 'plugin';
            this._checkedIds.clear();
            this._refresh();
        });
        p.querySelector('#ff-br-source-add').addEventListener('click',    () => this._addSource());
        p.querySelector('#ff-br-source-remove').addEventListener('click', () => this._removeSource());

        this._renderSourceDropdown();
        this._makeDraggable(p, hdr);
    }

    _makeDraggable(panel, handle) {
        let ox, oy, left, top;
        handle.addEventListener('mousedown', (e) => {
            if (e.target.id === 'ff-br-close') return;
            const r = panel.getBoundingClientRect();
            panel.style.transform = 'none';
            panel.style.left = r.left + 'px';
            panel.style.top  = r.top  + 'px';
            ox = e.clientX; oy = e.clientY;
            left = r.left;  top = r.top;
            const onMove = (e2) => {
                panel.style.left = (left + e2.clientX - ox) + 'px';
                panel.style.top  = (top  + e2.clientY - oy) + 'px';
            };
            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup',  onUp);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup',  onUp);
        });
    }

    // ── Data / list ───────────────────────────────────────────────────────────

    async _refresh() {
        let exercises = [];

        if (this._selectedSource !== 'plugin') {
            // Fetch from custom CDN source
            try {
                const bust = `?_=${Date.now()}`;
                const res = await fetch(this._selectedSource + bust, { cache: 'no-store' }).catch(() => null);
                if (res?.ok) {
                    const data = await res.json();
                    exercises = Array.isArray(data) ? data : (data.exercises || []);
                }
            } catch (_) {}
        } else {
            // Plugin exercises — try loaded menu, then fetch exercises.json
            exercises = window.menuManager?.allExercises || [];
            if (!exercises.length) {
                try {
                    const url = window.flexframeSettings?.pluginUrl
                        ? window.flexframeSettings.pluginUrl + 'viewer/data/exercises.json'
                        : '/wp-content/plugins/flexframe-super/viewer/data/exercises.json';
                    const assetUrl = document.querySelector('script[src*="index-"]')?.src?.replace(/\/assets\/index-.*/, '/data/exercises.json') || '';
                    const res = await fetch(assetUrl || url).catch(() => null);
                    if (res?.ok) {
                        const data = await res.json();
                        exercises = Array.isArray(data) ? data : (data.exercises || []);
                    }
                } catch (_) {}
            }
            if (!exercises.length && this.app.multiThumbnailMenuSystem?.allExercises?.length) {
                exercises = this.app.multiThumbnailMenuSystem.allExercises;
            }
        }
        this._allExercises = exercises;

        const listHeading = this.panel.querySelector('#ff-br-list-heading');
        if (listHeading) {
            listHeading.textContent = exercises.length
                ? `Exercises (${exercises.length} available)`
                : 'Exercises';
        }

        const angles = (this.app._videoAngles || []).filter(a => a);
        const el = this.panel.querySelector('#ff-br-angle-info');
        if (angles.length > 0) {
            el.style.color = '#4ade80';
            el.textContent = `${angles.length} camera angle${angles.length !== 1 ? 's' : ''} captured from Screenshot panel`;
        } else {
            el.style.color = '#fbbf24';
            el.textContent = 'No angles set — capture angles in the Screenshot panel first. Recording will use the current camera view.';
        }

        this._renderList();
    }

    _renderList() {
        const list = this.panel.querySelector('#ff-br-list');
        const term = this._searchTerm;
        const filtered = this._allExercises.filter(ex =>
            !term || (ex.name || ex.id || '').toLowerCase().includes(term) || (ex.id || '').toLowerCase().includes(term)
        );

        if (!this._allExercises.length) {
            list.innerHTML = '<div style="color:#888;padding:10px 12px;font-size:12px;line-height:1.6;">No exercises loaded yet.<br>Open the exercise menu in the viewer first, then re-open this panel.</div>';
            this._updateCount();
            return;
        }

        if (!filtered.length) {
            list.innerHTML = '<div style="color:#555;padding:8px 12px;font-size:12px;">No exercises match your search.</div>';
            this._updateCount();
            return;
        }

        list.innerHTML = filtered.map(ex => {
            const id      = ex.id   || ex.name || '';
            const label   = ex.name || ex.id   || '';
            const checked = this._checkedIds.has(id);
            const savedAngle = this._perExerciseAngles[id];
            const bg      = checked ? 'background:#22224a;' : '';
            const angleDot = savedAngle
                ? `<span data-angle-clear="${id}" title="Angle saved — click to clear" style="flex-shrink:0;width:8px;height:8px;border-radius:50%;background:#4ade80;cursor:pointer;"></span>`
                : `<span style="flex-shrink:0;width:8px;height:8px;border-radius:50%;background:#2a2a4a;"></span>`;
            return `<div data-row-id="${id}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;cursor:pointer;${bg}border-bottom:1px solid #1e1e3a;">
                      <div style="width:16px;height:16px;flex-shrink:0;border:2px solid ${checked ? '#2563eb' : '#444'};border-radius:3px;background:${checked ? '#2563eb' : 'transparent'};display:flex;align-items:center;justify-content:center;">
                        ${checked ? '<div style="width:8px;height:8px;background:#fff;border-radius:1px;"></div>' : ''}
                      </div>
                      <span style="font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;" title="${id}">${label}</span>
                      ${angleDot}
                      <button data-angle-set="${id}" style="flex-shrink:0;background:#1e1e3a;border:1px solid ${savedAngle ? '#4ade80' : '#3a3a5c'};border-radius:3px;color:${savedAngle ? '#4ade80' : '#888'};cursor:pointer;font-size:10px;padding:2px 7px;white-space:nowrap;">Set Angle</button>
                      <button data-load-ex="${id}" style="flex-shrink:0;background:#1e1e3a;border:1px solid #3a3a5c;border-radius:3px;color:#aaa;cursor:pointer;font-size:10px;padding:2px 7px;white-space:nowrap;">Load</button>
                    </div>`;
        }).join('');

        list.querySelectorAll('[data-row-id]').forEach(row => {
            row.addEventListener('click', (e) => {
                // Don't toggle selection if action buttons were clicked
                if (e.target.dataset.angleSet || e.target.dataset.angleClear || e.target.dataset.loadEx) return;
                const id = row.dataset.rowId;
                if (this._checkedIds.has(id)) this._checkedIds.delete(id);
                else this._checkedIds.add(id);
                this._renderList();
                this._updateCount();
            });
        });

        list.querySelectorAll('[data-angle-set]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this._captureAngleForExercise(btn.dataset.angleSet);
            });
        });

        list.querySelectorAll('[data-angle-clear]').forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Clear saved angle for this exercise?')) {
                    this._clearAngleForExercise(dot.dataset.angleClear);
                }
            });
        });

        list.querySelectorAll('[data-load-ex]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.loadEx;
                const ex = this._allExercises.find(x => (x.id || x.name) === id);
                if (ex) this.app._handleExerciseSelected(ex);
            });
        });

        this._updateCount();
    }

    _setAll(on) {
        const term = this._searchTerm;
        this._allExercises
            .filter(ex => !term || (ex.name || ex.id || '').toLowerCase().includes(term))
            .forEach(ex => {
                const id = ex.id || ex.name || '';
                if (on) this._checkedIds.add(id); else this._checkedIds.delete(id);
            });
        this._renderList();
    }

    _updateCount() {
        this.panel.querySelector('#ff-br-count').textContent = `${this._checkedIds.size} selected`;
    }

    _getSelected() {
        return this._allExercises.filter(ex => this._checkedIds.has(ex.id || ex.name || ''));
    }

    // ── Progress / log ────────────────────────────────────────────────────────

    _log(msg, type = 'info') {
        const log = this.panel.querySelector('#ff-br-log');
        log.style.display = 'block';
        const colors = { info: '#aaa', success: '#4ade80', error: '#f87171', active: '#60a5fa' };
        const d = document.createElement('div');
        d.style.color = colors[type] || '#aaa';
        d.textContent = msg;
        log.appendChild(d);
        log.scrollTop = log.scrollHeight;
    }

    _setProgress(n, total) {
        const wrap = this.panel.querySelector('#ff-br-prog-wrap');
        const bar  = this.panel.querySelector('#ff-br-prog-bar');
        wrap.style.display = 'block';
        bar.style.width = total > 0 ? `${Math.round((n / total) * 100)}%` : '0%';
    }

    // ── Batch execution ───────────────────────────────────────────────────────

    async startBatch() {
        if (this.isRunning) return;

        const selected = this._getSelected();
        if (!selected.length) { alert('Select at least one exercise.'); return; }

        const width      = parseInt(this.panel.querySelector('#ff-br-width').value)  || 2500;
        const height     = parseInt(this.panel.querySelector('#ff-br-height').value) || 2500;
        const quality    = this.panel.querySelector('#ff-br-quality').value          || 'ultra';
        const loops      = parseInt(this.panel.querySelector('#ff-br-loops').value)  || 1;
        const nameOverlay = this.panel.querySelector('#ff-br-overlay-name').checked;
        const logoOverlay  = this.panel.querySelector('#ff-br-overlay-logo').checked;

        const startBtn = this.panel.querySelector('#ff-br-start');
        const stopBtn  = this.panel.querySelector('#ff-br-stop');
        startBtn.disabled = true;  startBtn.style.opacity = '.4';
        stopBtn.disabled  = false; stopBtn.style.cursor   = 'pointer'; stopBtn.style.opacity = '1';

        this.panel.querySelector('#ff-br-log').innerHTML = '';
        this.isRunning  = true;
        this.shouldStop = false;

        this._log(`Batch started — ${selected.length} exercise${selected.length !== 1 ? 's' : ''}`, 'info');

        let done = 0;

        for (let i = 0; i < selected.length; i++) {
            if (this.shouldStop) { this._log('Stopped by user.', 'error'); break; }

            const ex   = selected[i];
            const name = ex.name || ex.id || `exercise_${i}`;

            this._setProgress(i, selected.length);
            this._log(`[${i + 1}/${selected.length}] Loading "${name}"…`, 'active');

            try {
                await this.app._handleExerciseSelected(ex);

                // Give the animation system a moment to settle after model load
                await new Promise(r => setTimeout(r, 700));

                // Apply per-exercise saved camera angle (overrides config default)
                const exId = ex.id || ex.name || '';
                const savedAngle = this._perExerciseAngles[exId];
                if (savedAngle) {
                    const camera   = this.app.cameraManager.getCamera();
                    const controls = this.app.cameraManager.getControls();
                    if (savedAngle.position) camera.position.set(...savedAngle.position);
                    if (savedAngle.rotation) camera.rotation.set(...savedAngle.rotation);
                    if (savedAngle.target)   controls.target.set(...savedAngle.target);
                    controls.update();
                    // Extra frame to let Three.js settle
                    await new Promise(r => setTimeout(r, 100));
                }

                if (!this.app.animationPlayer?.currentAction || !this.app.mixer) {
                    this._log(`  No animation — skipping`, 'error');
                    continue;
                }

                this._log('  Recording…', 'info');

                // Frame/container dims for crop mask (if screenshot frame panel is active)
                let frameWidth = null, frameHeight = null, containerWidth = null, containerHeight = null;
                const container = document.getElementById('flexframe-viewer-container');
                if (this.app.screenshotFramePanel && container) {
                    const rect = container.getBoundingClientRect();
                    containerWidth  = rect.width;
                    containerHeight = rect.height;
                    frameWidth  = parseFloat(this.app.screenshotFramePanel.style.width)  || 0;
                    frameHeight = parseFloat(this.app.screenshotFramePanel.style.height) || 0;
                }

                const angles = (this.app._videoAngles || [])
                    .map(a => a ? { ...a } : null)
                    .filter(a => a !== null);

                const result = await ScreenshotUtils.recordTimelineVideo(
                    this.app.renderer,
                    this.app.sceneManager.getScene(),
                    this.app.cameraManager.getCamera(),
                    this.app.animationPlayer,
                    this.app.mixer,
                    {
                        width, height,
                        filename: ex.id || ex.name || `exercise_${i}`,
                        fps: 30, quality, loops,
                        cameraAngles: angles,
                        frameWidth, frameHeight, containerWidth, containerHeight,
                        showFloorShadow: false,
                        ground: this.app.ground,
                        overlayLogoUrl: logoOverlay ? (window.flexframeSettings?.logoUrl || null) : null,
                        overlayLogoPosition: 'top-left',
                        overlayExerciseName: nameOverlay ? name : null,
                    }
                );

                if (result.success) {
                    done++;
                    this._log(`  Saved: ${result.filename}`, 'success');
                } else {
                    this._log(`  Failed: ${result.error || 'unknown error'}`, 'error');
                }

                // Brief pause between downloads so the browser doesn't block them
                if (i < selected.length - 1 && !this.shouldStop) {
                    await new Promise(r => setTimeout(r, 1200));
                }

            } catch (err) {
                this._log(`  Error: ${err.message}`, 'error');
            }
        }

        this._setProgress(selected.length, selected.length);
        this._log(
            `Done — ${done} of ${selected.length} saved.`,
            done === selected.length ? 'success' : 'info'
        );

        this.isRunning = false;
        startBtn.disabled = false; startBtn.style.opacity = '1';
        stopBtn.disabled  = true;  stopBtn.style.cursor   = 'not-allowed'; stopBtn.style.opacity = '.3';
    }
}
