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
    if (!SETTINGS || !SETTINGS.isLoggedIn) return;

    let root, bubbleBtn, panel, messagesEl, inputEl, sendBtn, chipsEl;
    let conversation = []; // [{role:'user'|'assistant', content:string}]
    let busy = false;
    let lastWorkout = null;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        root = document.getElementById('flexframe-ai-coach');
        if (!root) return;

        bubbleBtn  = root.querySelector('.ffc-bubble');
        panel      = root.querySelector('.ffc-panel');
        messagesEl = root.querySelector('.ffc-messages');
        inputEl    = root.querySelector('.ffc-input');
        sendBtn    = root.querySelector('.ffc-send');
        chipsEl    = root.querySelector('.ffc-chips');

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

        chipsEl.querySelectorAll('.ffc-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const isWod = chip.dataset.mode === 'wod';
                inputEl.value = chip.dataset.prompt || chip.textContent;
                onSend({ mode: isWod ? 'wod' : null });
            });
        });

        // Greeting
        addAssistantMessage("Hey! I'm your FlexFrame Coach. Tell me what you're after today and I'll build you a workout — or pick a starter below.");
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
        messagesEl.innerHTML = '';
        chipsEl.style.display = '';
        addAssistantMessage("Fresh start! What kind of workout would you like today?");
    }

    function autoGrow() {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    }

    async function onSend(opts) {
        if (busy) return;
        const text = inputEl.value.trim();
        if (!text) return;

        chipsEl.style.display = 'none';
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
})();
