import * as THREE from 'three';

/**
 * AnnotationManager
 *
 * Handles bone-relative annotation markers on the 3D exercise model.
 *
 * Flow:
 *  - init(renderer, camera, container)   — call once on startup
 *  - setModel(model)                      — call after each model load
 *  - setExerciseId(id)                    — call when exercise changes
 *  - update()                             — call every frame (projects markers to screen)
 *
 * Logged-in users can toggle "annotation edit mode" via the floating button,
 * then double-click the model to place a new marker.
 * All visitors can click existing markers to read the annotation card.
 */
export class AnnotationManager {
    constructor() {
        this.renderer    = null;
        this.camera      = null;
        this.container   = null;
        this.overlay     = null;
        this.model       = null;
        this.exerciseId  = null;

        this.annotations  = [];           // [{id, label, body_text, bone_name, offset_x, offset_y, offset_z}]
        this.markerEls    = new Map();    // annotationId (number|string) -> DOM element
        this.activeCard   = null;

        this.editMode     = false;        // only togglable when logged in
        this.editToggleBtn = null;

        this.isLoggedIn  = !!(window.flexframeSettings?.isLoggedIn);
        this.restUrl     = window.flexframeSettings?.restUrl     || '';
        this.restNonce   = window.flexframeSettings?.restNonce   || '';

        this._bones      = [];            // THREE.Bone instances from current model

        this._injectStyles();
    }

    // ─── Public API ──────────────────────────────────────────────────────────

    init(renderer, camera, container) {
        this.renderer  = renderer;
        this.camera    = camera;
        this.container = container;

        // Transparent overlay div sits over the canvas; markers are children of it
        this.overlay = document.createElement('div');
        this.overlay.className = 'ff-ann-overlay';
        this.overlay.style.cssText =
            'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;overflow:hidden;';
        container.appendChild(this.overlay);

        // Double-click on canvas → place annotation (only in edit mode + logged in)
        renderer.domElement.addEventListener('dblclick', (e) => this._onDblClick(e));

        // Click outside card → close it
        document.addEventListener('click', (e) => {
            if (!this.activeCard) return;
            if (this.activeCard.contains(e.target)) return;
            if (e.target.closest('.ff-marker')) return;
            this._hideCard();
        });

        // Edit-mode toggle button (logged-in only)
        if (this.isLoggedIn) {
            this._createEditToggleBtn();
        }
    }

    setModel(model) {
        this.model  = model;
        this._bones = [];
        if (!model) return;

        model.traverse((child) => {
            if (child.isBone) this._bones.push(child);
        });
        console.log(`[Annotations] ${this._bones.length} bones found on model`);

        // Rebuild marker DOM elements (positions recomputed each frame)
        this._rebuildMarkers();
    }

    setExerciseId(id) {
        this.exerciseId = id;
        this._clearAll();
        if (id) this._loadAnnotations();
        // Turn off edit mode when switching exercise
        this._setEditMode(false);
    }

    /** Call from main animate() loop */
    update() {
        if (!this.camera || !this.renderer || !this.model || this._bones.length === 0) return;

        const canvas = this.renderer.domElement;
        const W = canvas.clientWidth;
        const H = canvas.clientHeight;

        this.annotations.forEach(ann => {
            const el = this.markerEls.get(String(ann.id));
            if (!el) return;

            const bone = this._bones.find(b => b.name === ann.bone_name);
            if (!bone) { el.style.display = 'none'; return; }

            // World position = local offset transformed by bone's current world matrix
            const worldPos = new THREE.Vector3(ann.offset_x, ann.offset_y, ann.offset_z)
                .applyMatrix4(bone.matrixWorld);

            // Project to NDC
            const ndc = worldPos.clone().project(this.camera);
            if (ndc.z > 1) { el.style.display = 'none'; return; } // behind camera

            const sx = (ndc.x *  0.5 + 0.5) * W;
            const sy = (ndc.y * -0.5 + 0.5) * H;

            el.style.display = 'flex';
            el.style.left    = sx + 'px';
            el.style.top     = sy + 'px';

            // Keep active card tethered to its marker
            if (this.activeCard && String(this.activeCard.dataset.annotationId) === String(ann.id)) {
                this._positionCard(this.activeCard, sx, sy, W, H);
            }
        });
    }

    // ─── Edit mode ───────────────────────────────────────────────────────────

    _createEditToggleBtn() {
        const btn = document.createElement('button');
        btn.className = 'ff-ann-edit-toggle';
        btn.title     = 'Toggle annotation edit mode';
        btn.innerHTML = '&#9998; Annotate';
        btn.addEventListener('click', () => this._setEditMode(!this.editMode));
        this.container.appendChild(btn);
        this.editToggleBtn = btn;
    }

    _setEditMode(on) {
        this.editMode = on;
        if (this.editToggleBtn) {
            this.editToggleBtn.classList.toggle('active', on);
            this.editToggleBtn.title = on
                ? 'Double-click the model to add a point — click again to exit'
                : 'Toggle annotation edit mode';
        }
        // Expose flag so camera.js can suppress its dblclick handler
        if (this.renderer?.domElement) {
            this.renderer.domElement.dataset.ffAnnotationMode = on ? '1' : '';
        }
        if (on) {
            this.overlay.style.cursor = 'crosshair';
            this.renderer.domElement.style.cursor = 'crosshair';
        } else {
            this.overlay.style.cursor = '';
            this.renderer.domElement.style.cursor = '';
            this._hideCard();
        }
    }

    // ─── Double-click handler ────────────────────────────────────────────────

    _onDblClick(e) {
        if (!this.isLoggedIn || !this.editMode) return;
        if (!this.model || this._bones.length === 0) return;

        const canvas = this.renderer.domElement;
        const rect   = canvas.getBoundingClientRect();
        const mouse  = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width)  *  2 - 1,
            ((e.clientY - rect.top)  / rect.height) * -2 + 1,
        );

        const ray = new THREE.Raycaster();
        ray.setFromCamera(mouse, this.camera);
        const hits = ray.intersectObject(this.model, true);
        if (hits.length === 0) return;

        const point = hits[0].point;

        // Find nearest bone by world position
        let nearestBone = null, nearestDist = Infinity;
        const bonePos = new THREE.Vector3();
        this._bones.forEach(bone => {
            bone.getWorldPosition(bonePos);
            const d = bonePos.distanceTo(point);
            if (d < nearestDist) { nearestDist = d; nearestBone = bone; }
        });
        if (!nearestBone) return;

        // Local offset in bone space
        const localOffset = point.clone().applyMatrix4(nearestBone.matrixWorld.clone().invert());

        // Screen position of the click
        const sx = e.clientX - rect.left;
        const sy = e.clientY - rect.top;

        this._showCreateCard(sx, sy, nearestBone.name, localOffset);

        e.preventDefault();
        e.stopPropagation();
    }

    // ─── Cards ───────────────────────────────────────────────────────────────

    _showCreateCard(sx, sy, boneName, offset) {
        this._hideCard();

        const card = this._buildCard('New Annotation', `
            <input  class="ff-ann-input ff-ann-label-input" type="text"
                    placeholder="Short label (e.g. Hip Hinge)" maxlength="80" />
            <textarea class="ff-ann-input ff-ann-body-input"
                    placeholder="Coaching note, description or cue…"
                    rows="3" maxlength="600"></textarea>
            <div class="ff-ann-actions">
                <button class="ff-ann-save-btn">Save</button>
                <button class="ff-ann-cancel-btn">Cancel</button>
            </div>
        `);

        card.querySelector('.ff-ann-cancel-btn').addEventListener('click', () => this._hideCard());
        card.querySelector('.ff-ann-save-btn').addEventListener('click', () => {
            const label = card.querySelector('.ff-ann-label-input').value.trim();
            const body  = card.querySelector('.ff-ann-body-input').value.trim();
            if (!label) { card.querySelector('.ff-ann-label-input').focus(); return; }
            this._apiCreate(label, body, boneName, offset);
            this._hideCard();
        });

        this._mountCard(card, sx, sy);
        card.querySelector('.ff-ann-label-input').focus();
    }

    _showViewCard(ann, sx, sy) {
        this._hideCard();

        const editBlock = this.isLoggedIn ? `
            <div class="ff-ann-actions">
                <button class="ff-ann-edit-btn">Edit</button>
                <button class="ff-ann-delete-btn">Delete</button>
            </div>` : '';

        const card = this._buildCard(ann.label, `
            <p class="ff-ann-body-text">${this._esc(ann.body_text).replace(/\n/g, '<br>')}</p>
            ${editBlock}
        `);
        card.dataset.annotationId = ann.id;

        if (this.isLoggedIn) {
            card.querySelector('.ff-ann-edit-btn').addEventListener('click', () =>
                this._showEditCard(ann, sx, sy));
            card.querySelector('.ff-ann-delete-btn').addEventListener('click', () => {
                if (confirm('Delete this annotation?')) {
                    this._apiDelete(ann.id);
                    this._hideCard();
                }
            });
        }

        this._mountCard(card, sx, sy);
    }

    _showEditCard(ann, sx, sy) {
        this._hideCard();

        const card = this._buildCard('Edit Annotation', `
            <input  class="ff-ann-input ff-ann-label-input" type="text"
                    value="${this._esc(ann.label)}" maxlength="80" />
            <textarea class="ff-ann-input ff-ann-body-input"
                    rows="3" maxlength="600">${this._esc(ann.body_text)}</textarea>
            <div class="ff-ann-actions">
                <button class="ff-ann-save-btn">Save</button>
                <button class="ff-ann-cancel-btn">Cancel</button>
            </div>
        `);
        card.dataset.annotationId = ann.id;

        card.querySelector('.ff-ann-cancel-btn').addEventListener('click', () => this._hideCard());
        card.querySelector('.ff-ann-save-btn').addEventListener('click', () => {
            const label = card.querySelector('.ff-ann-label-input').value.trim();
            const body  = card.querySelector('.ff-ann-body-input').value.trim();
            if (!label) { card.querySelector('.ff-ann-label-input').focus(); return; }
            this._apiUpdate(ann.id, label, body);
            this._hideCard();
        });

        this._mountCard(card, sx, sy);
        card.querySelector('.ff-ann-label-input').focus();
    }

    _buildCard(title, bodyHtml) {
        const card = document.createElement('div');
        card.className = 'ff-annotation-card';
        card.innerHTML = `
            <div class="ff-ann-card-header">
                <span class="ff-ann-card-title">${this._esc(title)}</span>
                <button class="ff-ann-close-btn" title="Close">✕</button>
            </div>
            <div class="ff-ann-card-body">${bodyHtml}</div>
        `;
        card.querySelector('.ff-ann-close-btn').addEventListener('click', () => this._hideCard());
        card.style.pointerEvents = 'auto';
        return card;
    }

    _mountCard(card, sx, sy) {
        this.overlay.appendChild(card);
        this.activeCard = card;
        const W = this.renderer.domElement.clientWidth;
        const H = this.renderer.domElement.clientHeight;
        this._positionCard(card, sx, sy, W, H);
    }

    _hideCard() {
        if (this.activeCard) { this.activeCard.remove(); this.activeCard = null; }
    }

    _positionCard(card, sx, sy, W, H) {
        const OFFSET = 18, CW = 230, CH = 180;
        let left = sx + OFFSET;
        let top  = sy - CH / 2;
        if (left + CW > W - 8)  left = sx - CW - OFFSET;
        if (top < 8)             top  = 8;
        if (top + CH > H - 8)   top  = H - CH - 8;
        card.style.left = left + 'px';
        card.style.top  = top  + 'px';
    }

    // ─── Markers ─────────────────────────────────────────────────────────────

    _createMarkerEl(ann) {
        const el = document.createElement('div');
        el.className           = 'ff-marker';
        el.dataset.annotationId = ann.id;
        el.title               = ann.label;
        el.innerHTML = `<span class="ff-marker-dot"></span>
                        <span class="ff-marker-label">${this._esc(ann.label)}</span>`;
        el.style.pointerEvents = 'auto';

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const sx = parseFloat(el.style.left) || 0;
            const sy = parseFloat(el.style.top)  || 0;
            this._showViewCard(ann, sx, sy);
        });

        this.overlay.appendChild(el);
        this.markerEls.set(String(ann.id), el);
    }

    _rebuildMarkers() {
        this.markerEls.forEach(el => el.remove());
        this.markerEls.clear();
        this.annotations.forEach(ann => this._createMarkerEl(ann));
    }

    _clearAll() {
        this._hideCard();
        this.markerEls.forEach(el => el.remove());
        this.markerEls.clear();
        this.annotations = [];
    }

    // ─── REST API ─────────────────────────────────────────────────────────────

    async _loadAnnotations() {
        if (!this.restUrl || !this.exerciseId) return;
        try {
            const res = await fetch(
                `${this.restUrl}annotations?exercise_id=${encodeURIComponent(this.exerciseId)}`,
                { headers: { 'X-WP-Nonce': this.restNonce } }
            );
            if (!res.ok) return;
            const data = await res.json();
            this.annotations = Array.isArray(data) ? data : [];
            this.annotations.forEach(ann => this._createMarkerEl(ann));
        } catch (err) {
            console.warn('[Annotations] Load error:', err);
        }
    }

    async _apiCreate(label, body_text, bone_name, offset) {
        if (!this.restUrl || !this.exerciseId) return;
        try {
            const res = await fetch(`${this.restUrl}annotations`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': this.restNonce },
                body:    JSON.stringify({
                    exercise_id: this.exerciseId,
                    label, body_text, bone_name,
                    offset_x: offset.x,
                    offset_y: offset.y,
                    offset_z: offset.z,
                }),
            });
            if (!res.ok) return;
            const ann = await res.json();
            this.annotations.push(ann);
            this._createMarkerEl(ann);
        } catch (err) {
            console.warn('[Annotations] Create error:', err);
        }
    }

    async _apiUpdate(id, label, body_text) {
        if (!this.restUrl) return;
        try {
            const res = await fetch(`${this.restUrl}annotations/${id}`, {
                method:  'PUT',
                headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': this.restNonce },
                body:    JSON.stringify({ label, body_text }),
            });
            if (!res.ok) return;
            const ann = await res.json();
            const idx = this.annotations.findIndex(a => String(a.id) === String(id));
            if (idx >= 0) this.annotations[idx] = ann;
            const el = this.markerEls.get(String(id));
            if (el) {
                el.querySelector('.ff-marker-label').textContent = ann.label;
                el.title = ann.label;
            }
        } catch (err) {
            console.warn('[Annotations] Update error:', err);
        }
    }

    async _apiDelete(id) {
        if (!this.restUrl) return;
        try {
            const res = await fetch(`${this.restUrl}annotations/${id}`, {
                method:  'DELETE',
                headers: { 'X-WP-Nonce': this.restNonce },
            });
            if (!res.ok) return;
            this.annotations = this.annotations.filter(a => String(a.id) !== String(id));
            const el = this.markerEls.get(String(id));
            if (el) el.remove();
            this.markerEls.delete(String(id));
        } catch (err) {
            console.warn('[Annotations] Delete error:', err);
        }
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    _esc(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    _injectStyles() {
        if (document.getElementById('ff-annotation-styles')) return;
        const s = document.createElement('style');
        s.id = 'ff-annotation-styles';
        s.textContent = /* css */`
            /* ── Edit-mode toggle button ── */
            .ff-ann-edit-toggle {
                position: absolute;
                top: 48px;
                right: 12px;
                z-index: 30;
                padding: 6px 12px;
                background: rgba(18,18,28,0.82);
                border: 1px solid rgba(255,255,255,0.18);
                border-radius: 20px;
                color: rgba(255,255,255,0.7);
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                backdrop-filter: blur(8px);
                transition: background 0.2s, color 0.2s, border-color 0.2s;
                letter-spacing: 0.04em;
            }
            .ff-ann-edit-toggle:hover {
                background: rgba(255,255,255,0.12);
                color: #fff;
            }
            .ff-ann-edit-toggle.active {
                background: rgba(255,255,255,0.18);
                border-color: rgba(255,255,255,0.5);
                color: #fff;
            }

            /* ── Marker dot ── */
            .ff-marker {
                position: absolute;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 15;
            }
            .ff-marker-dot {
                display: block;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                border: 2px solid #fff;
                box-shadow: 0 0 0 0 rgba(255,255,255,0.45);
                animation: ff-pulse 2.4s ease-out infinite;
                transition: transform 0.15s, background 0.15s;
            }
            .ff-marker:hover .ff-marker-dot {
                background: rgba(255,255,255,0.45);
                transform: scale(1.25);
            }
            .ff-marker-label {
                position: absolute;
                top: 22px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                font-size: 10px;
                font-weight: 600;
                color: #fff;
                background: rgba(0,0,0,0.6);
                border-radius: 4px;
                padding: 2px 6px;
                pointer-events: none;
                letter-spacing: 0.02em;
            }
            @keyframes ff-pulse {
                0%   { box-shadow: 0 0 0 0   rgba(255,255,255,0.55); }
                60%  { box-shadow: 0 0 0 9px rgba(255,255,255,0);    }
                100% { box-shadow: 0 0 0 0   rgba(255,255,255,0);    }
            }

            /* ── Annotation card ── */
            .ff-annotation-card {
                position: absolute;
                width: 230px;
                background: rgba(14,14,22,0.93);
                border: 1px solid rgba(255,255,255,0.13);
                border-radius: 12px;
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                box-shadow: 0 8px 32px rgba(0,0,0,0.55);
                z-index: 25;
                overflow: hidden;
                font-size: 12px;
                color: #fff;
            }
            .ff-ann-card-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 12px 8px;
                border-bottom: 1px solid rgba(255,255,255,0.09);
            }
            .ff-ann-card-title {
                font-size: 13px;
                font-weight: 700;
                color: #fff;
                flex: 1;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .ff-ann-close-btn {
                background: none;
                border: none;
                color: rgba(255,255,255,0.45);
                cursor: pointer;
                font-size: 13px;
                padding: 0 0 0 8px;
                line-height: 1;
                flex-shrink: 0;
            }
            .ff-ann-close-btn:hover { color: #fff; }
            .ff-ann-card-body {
                padding: 10px 12px 12px;
            }
            .ff-ann-body-text {
                margin: 0 0 8px;
                font-size: 12px;
                line-height: 1.55;
                color: rgba(255,255,255,0.72);
            }
            .ff-ann-input {
                width: 100%;
                box-sizing: border-box;
                background: rgba(255,255,255,0.07);
                border: 1px solid rgba(255,255,255,0.14);
                border-radius: 6px;
                color: #fff;
                font-size: 12px;
                padding: 6px 8px;
                margin-bottom: 6px;
                outline: none;
                resize: vertical;
                font-family: inherit;
            }
            .ff-ann-input:focus { border-color: rgba(255,255,255,0.38); }
            .ff-ann-input::placeholder { color: rgba(255,255,255,0.3); }
            .ff-ann-actions {
                display: flex;
                gap: 6px;
                margin-top: 4px;
            }
            .ff-ann-save-btn, .ff-ann-edit-btn {
                flex: 1;
                padding: 5px 10px;
                background: rgba(255,255,255,0.14);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                color: #fff;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.15s;
            }
            .ff-ann-save-btn:hover, .ff-ann-edit-btn:hover { background: rgba(255,255,255,0.26); }
            .ff-ann-cancel-btn {
                padding: 5px 10px;
                background: transparent;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 6px;
                color: rgba(255,255,255,0.45);
                font-size: 11px;
                cursor: pointer;
                transition: color 0.15s;
            }
            .ff-ann-cancel-btn:hover { color: #fff; }
            .ff-ann-delete-btn {
                padding: 5px 10px;
                background: transparent;
                border: 1px solid rgba(255,90,90,0.25);
                border-radius: 6px;
                color: rgba(255,100,100,0.7);
                font-size: 11px;
                cursor: pointer;
                transition: background 0.15s, color 0.15s;
            }
            .ff-ann-delete-btn:hover { background: rgba(255,90,90,0.15); color: #ff6b6b; }
        `;
        document.head.appendChild(s);
    }
}
