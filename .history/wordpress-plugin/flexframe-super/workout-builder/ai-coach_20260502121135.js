/**
 * FlexFrame AI Coach — chat widget for the Workout Builder
 * Talks to /wp-json/flexframe/v1/coach-chat (logged-in users only).
 * On `propose_workout` tool result, offers two handoffs:
 *   1. Load directly into the builder (in-page)
 *   2. Save publicly and produce a share link
 */
(function () {
    'use strict';

    const SETTINGS = window.flexframeCoachSettings || null;
    if (!SETTINGS || !SETTINGS.enabled) return;
    // Allow logged-in users always; allow anonymous only if public mode is on
    if (!SETTINGS.isLoggedIn && !SETTINGS.isPublicMode) return;

    let root, bubbleBtn, panel, messagesEl, inputEl, sendBtn, actionsEl;
    let conversation = []; // [{role:'user'|'assistant', content:string}]
    let busy = false;
    let lastWorkout = null;
    let profile = null;     // user profile from intake form (per-session, in memory only)
    let formShown = false;  // form gate: chat input is hidden until form is submitted or skipped

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        root = document.getElementById('flexframe-ai-coach');
        if (!root) return;

        // Inherit primary color from the workout builder settings
        if (SETTINGS.primaryColor) {
            root.style.setProperty('--ffc-primary', SETTINGS.primaryColor);
            const rgb = hexToRgb(SETTINGS.primaryColor);
            if (rgb) root.style.setProperty('--ffc-primary-rgb', rgb);
        }

        bubbleBtn  = root.querySelector('.ffc-bubble');
        panel      = root.querySelector('.ffc-panel');
        messagesEl = root.querySelector('.ffc-messages');
        inputEl    = root.querySelector('.ffc-input');
        sendBtn    = root.querySelector('.ffc-send');
        actionsEl  = root.querySelector('.ffc-actions');

        bubbleBtn.addEventListener('click', openPanel);
        root.querySelector('.ffc-header-close').addEventListener('click', closePanel);
        root.querySelector('.ffc-header-reset').addEventListener('click', resetChat);

        sendBtn.addEventListener('click', onSend);
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
            }
        });
        inputEl.addEventListener('input', autoGrow);

        actionsEl.querySelectorAll('.ffc-action').forEach(btn => {
            btn.addEventListener('click', () => handleAction(btn.dataset.action));
        });

        // Greeting + intake form
        const botName = (SETTINGS.botName && String(SETTINGS.botName).trim()) || 'FlexFrame Coach';
        addAssistantMessage("Hey! I'm your " + botName + ". Fill in the quick form below, then hit Generate Now — or hit WOD for a surprise.");
        renderIntakeForm();
        setInputVisible(false);
    }

    function handleAction(action) {
        if (busy) return;
        if (action === 'wod') {
            // WOD bypasses everything
            hideForm();
            setInputVisible(true);
            addUserMessage("WOD please — surprise me.");
            conversation.push({ role: 'user', content: "WOD please — surprise me with today's Workout of the Day." });
            sendToServer({ mode: 'wod' });
            return;
        }
        if (action === 'generate') {
            if (!profile) {
                addAssistantMessage("Fill in the quick form first so I can tailor it — then tap Generate Now again.");
                return;
            }
            hideForm();
            setInputVisible(true);
            const summary = profileSummaryString(profile);
            addUserMessage('Generate my workout');
            conversation.push({ role: 'user', content: 'Generate my workout. ' + summary });
            sendToServer({ mode: 'generate' });
            return;
        }
        if (action === 'ai-image') {
            generateWorkoutImage();
            return;
        }
        if (action === 'chat') {
            if (!profile) {
                addAssistantMessage("Fill in the quick form first so I have your basics — then we can chat freely.");
                return;
            }
            hideForm();
            setInputVisible(true);
            inputEl.focus();
            return;
        }
    }

    function setInputVisible(show) {
        const bar = root.querySelector('.ffc-input-bar');
        if (!bar) return;
        // If admin disabled free-form chat, the input bar is permanently hidden
        if (SETTINGS.chatEnabled === false) { bar.style.display = 'none'; return; }
        // If restrictions are OFF (unrestricted chat), the input bar is always visible
        if (SETTINGS.restrictionsEnabled === false) { bar.style.display = 'flex'; return; }
        bar.style.display = show ? 'flex' : 'none';
    }

    function openPanel() {
        root.classList.add('ffc-open');
        setTimeout(() => inputEl.focus(), 50);
    }
    function closePanel() {
        root.classList.remove('ffc-open');
    }
    function resetChat() {
        if (!confirm('Start a new chat? The current conversation will be cleared.')) return;
        conversation = [];
        lastWorkout = null;
        profile = null;
        formShown = false;
        messagesEl.innerHTML = '';
        addAssistantMessage("Fresh start! Fill in the form below — then hit Generate Now.");
        renderIntakeForm();
        setInputVisible(false);
    }

    function autoGrow() {
        inputEl.style.height = 'auto';
        const next = Math.min(inputEl.scrollHeight, 120);
        inputEl.style.height = next + 'px';
        // Only show the scrollbar once the textarea has actually hit its max height
        inputEl.classList.toggle('ffc-input-scroll', inputEl.scrollHeight > 120);
    }

    async function onSend(opts) {
        if (busy) return;
        const text = inputEl.value.trim();
        if (!text) return;

        inputEl.value = '';
        inputEl.style.height = 'auto';

        addUserMessage(text);
        conversation.push({ role: 'user', content: text });

        await sendToServer(opts || {});
    }

    async function sendToServer(opts) {
        busy = true;
        sendBtn.disabled = true;
        const typingEl = addTypingIndicator();

        try {
            const res = await fetch(SETTINGS.restUrl + 'coach-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': SETTINGS.nonce,
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    messages: conversation,
                    mode: (opts && opts.mode) || null,
                    profile: profile,
                }),
            });

            const data = await res.json();
            typingEl.remove();

            if (!res.ok) {
                const msg = data && (data.message || data.code) || ('Error ' + res.status);
                addErrorMessage(msg);
                return;
            }

            if (data.message) {
                addAssistantMessage(data.message);
                conversation.push({ role: 'assistant', content: data.message });
            }

            if (data.workout && data.workout.exercises && data.workout.exercises.length) {
                lastWorkout = data.workout;
                addWorkoutCard(data.workout);
                // Append a short assistant marker so the conversation history reflects the proposal
                conversation.push({
                    role: 'assistant',
                    content: '[Proposed workout: "' + data.workout.name + '" — ' + data.workout.exercises.length + ' exercises]'
                });
            }
        } catch (err) {
            typingEl.remove();
            addErrorMessage('Network error. Please try again.');
            console.error('[AI Coach]', err);
        } finally {
            busy = false;
            sendBtn.disabled = false;
            inputEl.focus();
        }
    }

    // ─── DOM helpers ──────────────────────────────────────────
    function addUserMessage(text) {
        const el = document.createElement('div');
        el.className = 'ffc-msg user';
        el.innerHTML = '<div class="ffc-msg-bubble"></div>';
        el.querySelector('.ffc-msg-bubble').textContent = text;
        messagesEl.appendChild(el);
        scrollToBottom();
    }

    function addAssistantMessage(text) {
        const el = document.createElement('div');
        el.className = 'ffc-msg assistant';
        el.innerHTML = '<div class="ffc-msg-bubble"></div>';
        el.querySelector('.ffc-msg-bubble').textContent = text;
        messagesEl.appendChild(el);
        scrollToBottom();
    }

    function addErrorMessage(text) {
        const el = document.createElement('div');
        el.className = 'ffc-msg assistant';
        el.innerHTML = '<div class="ffc-error"></div>';
        el.querySelector('.ffc-error').textContent = text;
        messagesEl.appendChild(el);
        scrollToBottom();
    }

    function addTypingIndicator() {
        const el = document.createElement('div');
        el.className = 'ffc-msg assistant';
        el.innerHTML = '<div class="ffc-msg-bubble"><div class="ffc-typing"><span></span><span></span><span></span></div></div>';
        messagesEl.appendChild(el);
        scrollToBottom();
        return el;
    }

    function addWorkoutCard(workout) {
        const wrap = document.createElement('div');
        wrap.className = 'ffc-msg assistant';
        wrap.style.maxWidth = '100%';

        const card = document.createElement('div');
        card.className = 'ffc-result';

        const title = document.createElement('div');
        title.className = 'ffc-result-title';
        title.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        const titleText = document.createElement('span');
        titleText.textContent = workout.name;
        title.appendChild(titleText);
        card.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'ffc-result-list';
        let lastGroup = null;
        workout.exercises.forEach(ex => {
            const li = document.createElement('li');
            const isSuper = ex.groupId && ex.groupId === lastGroup;
            const prefix = isSuper ? '↳ ' : (ex.groupId ? '◆ ' : '• ');
            li.textContent = `${prefix}${ex.name}  —  ${ex.sets}×${ex.reps}, ${ex.rest}s rest`;
            if (ex.groupId) li.classList.add('ffc-superset');
            list.appendChild(li);
            lastGroup = ex.groupId;
        });
        card.appendChild(list);

        const actions = document.createElement('div');
        actions.className = 'ffc-result-actions';

        const loadBtn = document.createElement('button');
        loadBtn.className = 'ffc-btn';
        loadBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Load into Builder';
        loadBtn.addEventListener('click', () => loadIntoBuilder(workout, loadBtn));

        const linkBtn = document.createElement('button');
        linkBtn.className = 'ffc-btn ffc-btn-secondary';
        linkBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg> Get Share Link';
        linkBtn.addEventListener('click', () => createShareLink(workout, linkBtn, card));

        actions.appendChild(loadBtn);
        actions.appendChild(linkBtn);
        card.appendChild(actions);

        wrap.appendChild(card);
        messagesEl.appendChild(wrap);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // ─── Handoffs ─────────────────────────────────────────────
    function loadIntoBuilder(workout, btn) {
        // Prefer the builder's exposed API; fall back to a custom event.
        if (window.flexframeBuilder && typeof window.flexframeBuilder.loadFromAI === 'function') {
            window.flexframeBuilder.loadFromAI(workout);
        } else {
            document.dispatchEvent(new CustomEvent('flexframe:ai-load-workout', { detail: workout }));
        }
        btn.disabled = true;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Loaded';
        // Auto-close so user sees the builder
        setTimeout(closePanel, 600);
    }

    async function createShareLink(workout, btn, card) {
        btn.disabled = true;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '… Saving';

        try {
            const res = await fetch(SETTINGS.restUrl + 'workouts/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({
                    name: workout.name,
                    exercises: workout.exercises,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.shareUrl) throw new Error(data.message || 'Save failed');

            // Replace the button row with a copy field
            const linkRow = document.createElement('div');
            linkRow.className = 'ffc-result-actions';
            linkRow.style.flexDirection = 'column';
            linkRow.style.alignItems = 'stretch';

            const input = document.createElement('input');
            input.type = 'text';
            input.value = data.shareUrl;
            input.readOnly = true;
            input.className = 'ffc-input';
            input.style.fontSize = '11px';

            const copyBtn = document.createElement('button');
            copyBtn.className = 'ffc-btn';
            copyBtn.textContent = 'Copy Link';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(data.shareUrl).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => copyBtn.textContent = 'Copy Link', 1500);
                });
            });

            const openBtn = document.createElement('a');
            openBtn.className = 'ffc-btn ffc-btn-secondary';
            openBtn.href = data.shareUrl;
            openBtn.target = '_blank';
            openBtn.rel = 'noopener';
            openBtn.textContent = 'Open in New Tab';
            openBtn.style.textDecoration = 'none';
            openBtn.style.textAlign = 'center';

            linkRow.appendChild(input);
            const btnRow = document.createElement('div');
            btnRow.style.display = 'flex';
            btnRow.style.gap = '6px';
            btnRow.appendChild(copyBtn);
            btnRow.appendChild(openBtn);
            linkRow.appendChild(btnRow);

            card.querySelector('.ffc-result-actions').replaceWith(linkRow);
        } catch (err) {
            console.error('[AI Coach] share error', err);
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            addErrorMessage('Could not create share link: ' + err.message);
        }
    }

    // ─── Intake form ──────────────────────────────────────────
    const GOAL_OPTIONS = [
        { id: 'strength',     label: 'Strength' },
        { id: 'hypertrophy',  label: 'Hypertrophy' },
        { id: 'cardio',       label: 'Cardio' },
        { id: 'hybrid',       label: 'Hybrid' },
        { id: 'fat_loss',     label: 'Fat Loss' },
        { id: 'abs',          label: 'Abs' },
        { id: 'glutes',       label: 'Glutes' },
        { id: 'mobility',     label: 'Mobility' },
        { id: 'sport',        label: 'Sport' },
    ];

    function renderIntakeForm() {
        if (formShown) return;
        formShown = true;

        const wrap = document.createElement('div');
        wrap.className = 'ffc-msg assistant ffc-form-wrap';
        wrap.style.maxWidth = '100%';

        const form = document.createElement('div');
        form.className = 'ffc-form';
        form.innerHTML = `
            <div class="ffc-form-row">
                <label>First name <span class="ffc-form-opt">(optional)</span></label>
                <input type="text" class="ffc-form-input" data-field="firstName" maxlength="30" placeholder="e.g. Alex" autocomplete="given-name">
            </div>
            <div class="ffc-form-row">
                <label>Experience</label>
                <div class="ffc-pills" data-field="experience" data-multi="false">
                    <button type="button" class="ffc-pill" data-value="beginner">Beginner</button>
                    <button type="button" class="ffc-pill" data-value="intermediate">Intermediate</button>
                    <button type="button" class="ffc-pill" data-value="advanced">Advanced</button>
                </div>
            </div>
            <div class="ffc-form-row">
                <label>Where</label>
                <div class="ffc-pills" data-field="location" data-multi="false">
                    <button type="button" class="ffc-pill" data-value="home">Home</button>
                    <button type="button" class="ffc-pill" data-value="gym">Gym</button>
                </div>
            </div>
            <div class="ffc-form-row">
                <label>Duration</label>
                <div class="ffc-pills" data-field="duration" data-multi="false">
                    <button type="button" class="ffc-pill" data-value="quick">Quick</button>
                    <button type="button" class="ffc-pill" data-value="regular">Regular</button>
                    <button type="button" class="ffc-pill" data-value="long">Long</button>
                </div>
            </div>
            <div class="ffc-form-row">
                <label>Goals <span class="ffc-form-opt">(pick any)</span></label>
                <div class="ffc-pills ffc-pills-multi" data-field="goals" data-multi="true">
                    ${GOAL_OPTIONS.map(g => `<button type="button" class="ffc-pill" data-value="${g.id}">${g.label}</button>`).join('')}
                </div>
            </div>
            <div class="ffc-form-row">
                <label>Time-savers <span class="ffc-form-opt">(optional, multi)</span></label>
                <div class="ffc-pills ffc-pills-multi" data-field="techniques" data-multi="true">
                    <button type="button" class="ffc-pill" data-value="supersets">Supersets</button>
                    <button type="button" class="ffc-pill" data-value="trisets">Trisets</button>
                    <button type="button" class="ffc-pill" data-value="giantsets">Giant sets</button>
                </div>
            </div>
            <div class="ffc-form-row">
                <label>Injuries</label>
                <div class="ffc-pills" data-field="hasInjuries" data-multi="false">
                    <button type="button" class="ffc-pill" data-value="false">None</button>
                    <button type="button" class="ffc-pill" data-value="true">Yes</button>
                </div>
                <textarea class="ffc-form-input ffc-form-injury" data-field="injuryDetails" rows="2" placeholder="Briefly describe (e.g. lower back pain, sore left knee)…" style="display:none;"></textarea>
            </div>
            <div class="ffc-form-error" style="display:none;"></div>
            <div class="ffc-form-actions">
                <button type="button" class="ffc-btn ffc-form-save">Save profile</button>
            </div>
        `;

        // Pill selection logic
        form.querySelectorAll('.ffc-pills').forEach(group => {
            const multi = group.dataset.multi === 'true';
            group.addEventListener('click', (e) => {
                const btn = e.target.closest('.ffc-pill');
                if (!btn) return;
                if (multi) {
                    btn.classList.toggle('active');
                } else {
                    group.querySelectorAll('.ffc-pill').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                // Show/hide injury textarea
                if (group.dataset.field === 'hasInjuries') {
                    const ta = form.querySelector('.ffc-form-injury');
                    if (ta) ta.style.display = (btn.dataset.value === 'true') ? 'block' : 'none';
                }
            });
        });

        form.querySelector('.ffc-form-save').addEventListener('click', () => submitForm(form, false));

        wrap.appendChild(form);
        messagesEl.appendChild(wrap);
        scrollToBottom();
    }

    function readForm(form) {
        const data = {};
        form.querySelectorAll('.ffc-form-input').forEach(inp => {
            const field = inp.dataset.field;
            if (!field) return;
            const v = inp.value.trim();
            if (v) data[field] = v;
        });
        form.querySelectorAll('.ffc-pills').forEach(group => {
            const field = group.dataset.field;
            const multi = group.dataset.multi === 'true';
            const active = group.querySelectorAll('.ffc-pill.active');
            if (!active.length) return;
            if (multi) {
                data[field] = Array.from(active).map(b => b.dataset.value);
            } else {
                data[field] = active[0].dataset.value;
            }
        });
        // Coerce types
        if (data.age) data.age = parseInt(data.age, 10) || undefined;
        // duration is now a token: 'quick' | 'regular' | 'long' — leave as string
        if (data.hasInjuries === 'true') data.hasInjuries = true;
        else if (data.hasInjuries === 'false') data.hasInjuries = false;
        return data;
    }

    function validateForm(data) {
        if (!data.experience) return 'Please pick your experience level.';
        if (!data.location)   return 'Please pick where you\'ll train (home or gym).';
        if (!data.duration)   return 'Please pick a workout duration.';
        if (!data.goals || !data.goals.length) return 'Please pick at least one goal.';
        if (data.hasInjuries === undefined) return 'Please tell me if you have any injuries.';
        return null;
    }

    function submitForm(form, generateNow) {
        const data = readForm(form);
        const errEl = form.querySelector('.ffc-form-error');
        const err = validateForm(data);
        if (err) {
            errEl.textContent = err;
            errEl.style.display = 'block';
            return;
        }
        errEl.style.display = 'none';

        profile = data;

        // Replace the form with a compact "Profile" card
        const wrap = form.closest('.ffc-form-wrap');
        if (wrap) wrap.remove();
        addProfileCard(profile);

        // Reveal chat input
        setInputVisible(true);

        if (generateNow) {
            const summary = profileSummaryString(profile);
            addUserMessage('Generate my workout');
            conversation.push({ role: 'user', content: 'Generate my workout. ' + summary });
            sendToServer({ mode: 'generate' });
        } else {
            addAssistantMessage("Got it. Tap ‘Generate Now’ when you're ready, or use Chat to refine — style, focus, exercises to include or avoid.");
        }
    }

    function profileSummaryString(p) {
        const parts = [];
        if (p.firstName)  parts.push('name=' + p.firstName);
        parts.push('experience=' + p.experience);
        parts.push('location=' + p.location);
        parts.push('duration=' + p.duration);
        parts.push('goals=' + (p.goals || []).join('+'));
        parts.push('techniques=' + ((p.techniques && p.techniques.length) ? p.techniques.join('+') : 'none'));
        parts.push('injuries=' + (p.hasInjuries ? (p.injuryDetails || 'yes') : 'none'));
        return '(' + parts.join(', ') + ')';
    }

    function addProfileCard(p) {
        const wrap = document.createElement('div');
        wrap.className = 'ffc-msg assistant';
        wrap.style.maxWidth = '100%';
        const card = document.createElement('div');
        card.className = 'ffc-profile-card';

        const lines = [];
        if (p.firstName) lines.push(`<strong>${escapeHtml(p.firstName)}</strong>`);
        lines.push(cap(p.experience) + ' · ' + cap(p.location) + ' · ' + cap(p.duration));
        if (p.goals && p.goals.length) {
            lines.push('Goals: ' + p.goals.map(g => GOAL_OPTIONS.find(o => o.id === g)?.label || g).join(', '));
        }
        if (p.techniques && p.techniques.length) {
            const tlabels = { supersets: 'Supersets', trisets: 'Trisets', giantsets: 'Giant sets' };
            lines.push('Time-savers: ' + p.techniques.map(t => tlabels[t] || t).join(', '));
        }
        if (p.hasInjuries) {
            lines.push('⚠️ Injuries: ' + escapeHtml(p.injuryDetails || 'yes'));
        } else {
            lines.push('No injuries');
        }

        card.innerHTML = `
            <div class="ffc-profile-title">Your profile</div>
            <div class="ffc-profile-body">${lines.map(l => '<div>' + l + '</div>').join('')}</div>
            <button type="button" class="ffc-profile-edit">Edit</button>
        `;
        card.querySelector('.ffc-profile-edit').addEventListener('click', () => {
            // Editing = reset chat back to form
            if (!confirm('Edit your profile? The current conversation will be cleared.')) return;
            conversation = [];
            lastWorkout = null;
            profile = null;
            formShown = false;
            messagesEl.innerHTML = '';
            addAssistantMessage("No worries — update your details below.");
            renderIntakeForm();
            setInputVisible(false);
        });

        wrap.appendChild(card);
        messagesEl.appendChild(wrap);
        scrollToBottom();
    }

    function hideForm() {
        const wrap = messagesEl.querySelector('.ffc-form-wrap');
        if (wrap) wrap.remove();
    }

    // ─── A.I Image: workout infographic generation ────────────
    async function generateWorkoutImage() {
        if (busy) return;
        if (typeof window.html2canvas !== 'function') {
            addErrorMessage('Image library not loaded. Please refresh the page and try again.');
            return;
        }
        const builderEl = document.getElementById('flexframe-workout-builder');
        if (!builderEl) {
            addErrorMessage('Could not find the workout builder on this page.');
            return;
        }
        const wo = (window.flexframeBuilder && typeof window.flexframeBuilder.getCurrentWorkout === 'function')
            ? window.flexframeBuilder.getCurrentWorkout()
            : null;
        if (!wo || !wo.exercises || !wo.exercises.length) {
            addAssistantMessage("Add at least one exercise to the builder first, then tap A.I Image again.");
            return;
        }

        busy = true;
        addAssistantMessage("Saving your workout, capturing it as an image, then sending it to the AI to be turned into a branded Instagram post. This usually takes around 90 seconds — hang tight, the countdown will tick down below.");
        const countdown = addCountdownCard(90);

        // 1. Save the workout publicly so we get a share URL to embed in the caption.
        let shareUrl = '';
        try {
            const saveRes = await fetch(SETTINGS.restUrl + 'workouts/share', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: wo.name,
                    exercises: wo.exercises,
                }),
            });
            const saveData = await saveRes.json();
            if (saveRes.ok && saveData && saveData.shareUrl) {
                shareUrl = saveData.shareUrl;
            } else {
                console.warn('[AI Coach] Could not save workout for share URL', saveData);
            }
        } catch (err) {
            console.warn('[AI Coach] Share-save failed (non-fatal)', err);
        }

        let screenshotDataUrl = '';
        try {
            // Hide the chat panel itself so it doesn't appear in the screenshot
            const wasOpen = root.classList.contains('ffc-open');
            if (wasOpen) root.classList.remove('ffc-open');
            const bubbleVisible = bubbleBtn.style.display;
            bubbleBtn.style.display = 'none';

            const canvas = await window.html2canvas(builderEl, {
                backgroundColor: '#1a1a1a',
                scale: Math.min(2, window.devicePixelRatio || 1),
                useCORS: true,
                logging: false,
            });
            screenshotDataUrl = canvas.toDataURL('image/png');

            bubbleBtn.style.display = bubbleVisible;
            if (wasOpen) root.classList.add('ffc-open');
        } catch (err) {
            countdown.stop(true);
            busy = false;
            console.error('[AI Coach] Screenshot failed', err);
            addErrorMessage('Could not capture the workout: ' + (err.message || err));
            return;
        }

        const exerciseList = wo.exercises.map((ex, i) => {
            const reps = ex.reps != null ? ex.reps : '';
            const sets = ex.sets != null ? ex.sets : '';
            const rest = ex.rest != null ? (ex.rest + 's rest') : '';
            const meta = [sets && reps ? (sets + '×' + reps) : (sets || reps), rest].filter(Boolean).join(', ');
            return (i + 1) + '. ' + ex.name + (meta ? '  —  ' + meta : '');
        }).join('\n');

        try {
            const res = await fetch(SETTINGS.restUrl + 'ai-render', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': SETTINGS.nonce,
                },
                body: JSON.stringify({
                    mode: 'workout',
                    workoutName: wo.name,
                    exerciseList: exerciseList,
                    screenshot: screenshotDataUrl,
                    aspect: 'square',
                    provider: 'openai',
                }),
            });
            const data = await res.json();
            countdown.stop(true);
            busy = false;
            if (!res.ok || !data.success || !data.image) {
                const msg = (data && (data.message || data.code)) || ('Error ' + res.status);
                addErrorMessage('AI image failed: ' + msg);
                return;
            }
            addImageCard(data.image, wo.name, exerciseList, shareUrl);
        } catch (err) {
            countdown.stop(true);
            busy = false;
            console.error('[AI Coach] AI render failed', err);
            addErrorMessage('Network error while generating image. Please try again.');
        }
    }

    function addCountdownCard(seconds) {
        const wrap = document.createElement('div');
        wrap.className = 'ffc-msg assistant';
        wrap.style.maxWidth = '100%';

        const card = document.createElement('div');
        card.className = 'ffc-countdown';
        card.innerHTML = `
            <div class="ffc-countdown-head">
                <div class="ffc-countdown-spinner" aria-hidden="true"></div>
                <div class="ffc-countdown-text">
                    <div class="ffc-countdown-title">Generating your Instagram post…</div>
                    <div class="ffc-countdown-sub">Turning your workout into a branded social post. Please don't close this window.</div>
                </div>
            </div>
            <div class="ffc-countdown-timer"><span class="ffc-countdown-num">${seconds}</span><span class="ffc-countdown-unit">s</span></div>
            <div class="ffc-countdown-bar"><div class="ffc-countdown-fill"></div></div>
        `;

        wrap.appendChild(card);
        messagesEl.appendChild(wrap);
        scrollToBottom();

        const numEl  = card.querySelector('.ffc-countdown-num');
        const fillEl = card.querySelector('.ffc-countdown-fill');
        let remaining = seconds;
        let tickId = setInterval(() => {
            remaining = Math.max(0, remaining - 1);
            numEl.textContent = remaining;
            const pct = Math.max(0, Math.min(100, ((seconds - remaining) / seconds) * 100));
            fillEl.style.width = pct + '%';
            if (remaining <= 0) {
                clearInterval(tickId);
                tickId = null;
                // If the request hasn't finished by 0, switch the message so the user knows we're still waiting.
                const sub = card.querySelector('.ffc-countdown-sub');
                if (sub) sub.textContent = "Almost done — finishing up the final render…";
            }
        }, 1000);

        return {
            stop: function (remove) {
                if (tickId) { clearInterval(tickId); tickId = null; }
                if (remove) wrap.remove();
            }
        };
    }

    function addImageCard(imageDataUrl, workoutName, exerciseList, shareUrl) {
        const wrap = document.createElement('div');
        wrap.className = 'ffc-msg assistant';
        wrap.style.maxWidth = '100%';

        const card = document.createElement('div');
        card.className = 'ffc-result ffc-image-result';

        const title = document.createElement('div');
        title.className = 'ffc-result-title';
        title.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
        const titleText = document.createElement('span');
        titleText.textContent = workoutName + ' — Instagram post';
        title.appendChild(titleText);
        card.appendChild(title);

        const img = document.createElement('img');
        img.src = imageDataUrl;
        img.alt = workoutName;
        img.className = 'ffc-image-preview';
        card.appendChild(img);

        const actions = document.createElement('div');
        actions.className = 'ffc-result-actions';

        const dlBtn = document.createElement('a');
        dlBtn.className = 'ffc-btn';
        dlBtn.href = imageDataUrl;
        dlBtn.download = (workoutName || 'workout').replace(/[^a-z0-9]+/gi, '_') + '.png';
        dlBtn.style.textDecoration = 'none';
        dlBtn.style.textAlign = 'center';
        dlBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Download';

        const capBtn = document.createElement('button');
        capBtn.className = 'ffc-btn ffc-btn-secondary';
        capBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg> Generate Caption';
        capBtn.addEventListener('click', () => generateWorkoutCaption(capBtn, card, workoutName, exerciseList, shareUrl));

        actions.appendChild(dlBtn);
        actions.appendChild(capBtn);
        card.appendChild(actions);

        wrap.appendChild(card);
        messagesEl.appendChild(wrap);
        scrollToBottom();
    }

    async function generateWorkoutCaption(btn, card, workoutName, exerciseList, shareUrl) {
        if (btn.disabled) return;
        btn.disabled = true;
        const original = btn.innerHTML;
        btn.innerHTML = '… Writing';
        try {
            const res = await fetch(SETTINGS.restUrl + 'ai-caption', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': SETTINGS.nonce,
                },
                body: JSON.stringify({
                    mode: 'workout',
                    workoutName: workoutName,
                    exerciseList: exerciseList,
                    shareUrl: shareUrl || '',
                    provider: 'openai',
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success || !data.caption) {
                const msg = (data && (data.message || data.code)) || ('Error ' + res.status);
                btn.disabled = false;
                btn.innerHTML = original;
                addErrorMessage('Caption failed: ' + msg);
                return;
            }
            renderCaptionInCard(card, data.caption);
        } catch (err) {
            console.error('[AI Coach] Caption failed', err);
            btn.disabled = false;
            btn.innerHTML = original;
            addErrorMessage('Network error while generating caption.');
        }
    }

    function renderCaptionInCard(card, captionText) {
        // Remove any prior caption block
        const prior = card.querySelector('.ffc-caption-block');
        if (prior) prior.remove();

        const block = document.createElement('div');
        block.className = 'ffc-caption-block';

        const ta = document.createElement('textarea');
        ta.className = 'ffc-caption-text';
        ta.rows = 8;
        ta.readOnly = true;
        ta.value = captionText;
        block.appendChild(ta);

        const row = document.createElement('div');
        row.className = 'ffc-result-actions';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'ffc-btn';
        copyBtn.textContent = 'Copy Caption';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(captionText).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy Caption', 1500);
            });
        });
        row.appendChild(copyBtn);
        block.appendChild(row);

        card.appendChild(block);
        scrollToBottom();
    }

    function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    function hexToRgb(hex) {
        if (!hex) return null;
        const m = String(hex).trim().replace('#', '');
        const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
        if (!/^[0-9a-f]{6}$/i.test(full)) return null;
        const n = parseInt(full, 16);
        return ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255);
    }
})();
