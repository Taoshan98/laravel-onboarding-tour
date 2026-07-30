/**
 * Laravel Onboarding Tour — Utils Module
 * SVG registry, constants, DOM helpers, selector escaping, and position math
 */

const SVG = {
    eye: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
    pencil: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    trash: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
    grip: `<svg class="w-4 h-4 cursor-grab text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>`,
    check: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    info: `<svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    alert: `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    list: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`,
    close: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    palette: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>`,
    expand: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/></svg>`,
    globe: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"/></svg>`,
    page: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    card: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 9h16"/></svg>`,
    target: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.5"/><circle cx="12" cy="12" r="5" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
    backdrop: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
    media: `<svg class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
    keyboard: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" stroke-width="1.5"/><path stroke-width="1.5" stroke-linecap="round" d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>`,
    pointer: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>`,
    chevronDown: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`,
    copy: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>`
};

const THEME_DEFAULTS = {
    use_custom_theme: false, card_style: 'auto', card_size: 'md', accent_color: '#2563eb',
    card_radius: '20px', highlight_style: 'minimal', backdrop_hex: '#0f172a', backdrop_opacity: 75,
    backdrop_color: 'rgba(15, 23, 42, 0.75)'
};

const CARD_MAX_WIDTHS = { sm: 320, md: 380, lg: 460, xl: 560 };

const OWN_UI_SELECTORS = [
    '#tour-inspector-bar', '#tour-builder-modal', '#tour-step-edit-modal',
    '#tour-shortcuts-modal', '#tour-admin-toggle-btn', '#tour-confirm-modal',
    '#tour-drawer-panel', '#tour-popover-card', '#tour-spotlight-mask', '#tour-trigger-picker-banner',
    '#tour-import-modal'
];

function t(key, fallback) {
    return window.LaravelOnboardingTour?.config?.translations?.[key] || (fallback !== undefined ? fallback : key);
}

function isOwnUI(target) {
    return OWN_UI_SELECTORS.some(sel => target.closest(sel));
}

function isModalOpen() {
    return !!(document.getElementById('tour-shortcuts-modal') || document.getElementById('tour-step-edit-modal'));
}

function escapeWireSelector(sel) {
    return (sel || '').replace(/\[wire:(key|id|model)=/g, '[wire\\3a $1=');
}

function hexToRgba(hex, opacityPercent) {
    let h = (hex || '#0f172a').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const r = parseInt(h.substring(0, 2), 16) || 15;
    const g = parseInt(h.substring(2, 4), 16) || 23;
    const b = parseInt(h.substring(4, 6), 16) || 42;
    return `rgba(${r}, ${g}, ${b}, ${((opacityPercent ?? 75) / 100).toFixed(2)})`;
}

function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (/^https:\/\//i.test(trimmed) || /^\//.test(trimmed) || /^data:image\//i.test(trimmed)) return trimmed;
    if (/^http:\/\//i.test(trimmed)) return trimmed.replace(/^http:\/\//i, 'https://');
    return '';
}

function getEmbedUrl(url) {
    let match;
    if (url.includes('youtube.com/watch') && (match = url.match(/[?&]v=([^&]+)/))) return `https://www.youtube.com/embed/${match[1]}`;
    if (url.includes('youtu.be/') && (match = url.match(/youtu\.be\/([^?&]+)/))) return `https://www.youtube.com/embed/${match[1]}`;
    if (url.includes('vimeo.com/') && (match = url.match(/vimeo\.com\/(\d+)/))) return `https://player.vimeo.com/video/${match[1]}`;
    return url;
}

if (typeof HTMLFormElement !== 'undefined' && !HTMLFormElement.prototype._tourSubmitPatched) {
    const originalSubmit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = function () {
        if (window.__laravelTourProgrammaticClicking) {
            console.warn('[OnboardingTour] Blocked programmatic form submission during tour step playback.');
            return;
        }
        return originalSubmit.apply(this, arguments);
    };
    HTMLFormElement.prototype._tourSubmitPatched = true;
}

function safeClick(el) {
    if (!el) return;

    window.__laravelTourProgrammaticClicking = true;

    const form = el.closest ? el.closest('form') : null;
    const preventSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    if (form) {
        form.addEventListener('submit', preventSubmit, { capture: true });
    }
    window.addEventListener('submit', preventSubmit, { capture: true });

    let preventLink = null;
    if (el.tagName && el.tagName.toLowerCase() === 'a') {
        const href = el.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript:')) {
            preventLink = (e) => { e.preventDefault(); };
            el.addEventListener('click', preventLink, { capture: true });
        }
    }

    try {
        el.click();
    } catch (e) {
        try {
            el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        } catch (err) { }
    }

    setTimeout(() => {
        window.__laravelTourProgrammaticClicking = false;
        if (form) {
            try { form.removeEventListener('submit', preventSubmit, { capture: true }); } catch (err) { }
        }
        try { window.removeEventListener('submit', preventSubmit, { capture: true }); } catch (err) { }
        if (preventLink) {
            try { el.removeEventListener('click', preventLink, { capture: true }); } catch (err) { }
        }
    }, 400);
}

function csrfHeaders() {
    return { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' };
}

function positionPopover(popover, targetEl, sizeClass) {
    if (!targetEl || targetEl === document.body) {
        popover.classList.add('is-centered');
        popover.style.top = '';
        popover.style.left = '';
        return;
    }

    popover.classList.remove('is-centered');
    const rect = targetEl.getBoundingClientRect();
    const maxWidth = CARD_MAX_WIDTHS[sizeClass] || 380;

    const popRect = popover.getBoundingClientRect();
    const popWidth = Math.min(popRect.width || maxWidth, maxWidth);
    const popHeight = popRect.height || 230;
    const gap = 16;

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;

    let top = 0;
    let left = rect.left + (rect.width / 2) - (popWidth / 2);

    if (spaceBelow >= popHeight + gap + 10 || spaceBelow >= spaceAbove) {
        top = rect.bottom + gap;
        if (top + popHeight > vh - 12) {
            if (spaceAbove >= popHeight + gap) {
                top = rect.top - popHeight - gap;
            } else {
                top = Math.max(rect.bottom + 8, vh - popHeight - 12);
            }
        }
    } else {
        top = rect.top - popHeight - gap;
        if (top < 12) {
            if (spaceBelow >= popHeight + gap) {
                top = rect.bottom + gap;
            } else {
                top = 12;
            }
        }
    }

    left = Math.max(16, Math.min(left, vw - popWidth - 16));

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
}

function getStepMediaUrl(step, getLocalizedText) {
    const raw = step.media_url_i18n || step.video_url_i18n || step.media_url || step.video_url;
    return getLocalizedText(raw) || (typeof step.media_url === 'string' ? step.media_url : (typeof step.video_url === 'string' ? step.video_url : ''));
}

function formatMediaHtml(url) {
    const cleanUrl = sanitizeUrl(url);
    if (!cleanUrl) return '';
    const expandBtn = `<button type="button" class="tour-media-expand-btn" title="${t('expand_media', 'Expand')}" data-media-url="${cleanUrl}">${SVG.expand} <span>${t('expand_media', 'Expand')}</span></button>`;
    if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl) || cleanUrl.startsWith('data:image/')) {
        return `<div class="tour-media-container group cursor-pointer tour-media-trigger" data-media-url="${cleanUrl}"><img src="${cleanUrl}" class="tour-media-preview-img" alt="Step Media" />${expandBtn}</div>`;
    }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
        return `<div class="tour-media-container group cursor-pointer tour-media-trigger" data-media-url="${cleanUrl}"><video src="${cleanUrl}" controls class="tour-media-preview-video"></video>${expandBtn}</div>`;
    }
    return `<div class="tour-media-container group aspect-video bg-black"><iframe src="${getEmbedUrl(cleanUrl)}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>${expandBtn}</div>`;
}

function getOrCreate(id, tag, className, parent) {
    let el = document.getElementById(id);
    if (!el) { el = document.createElement(tag || 'div'); el.id = id; if (className) el.className = className; (parent || document.body).appendChild(el); }
    return el;
}

function trapFocus(container) {
    container.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
}

// ── Shortcuts Module ──
const ShortcutsModule = {
    isOpen: false, previousActiveElement: null, _bound: false,

    bindGlobalKeydown() {
        if (this._bound) return;
        this._bound = true;
        document.addEventListener('keydown', (e) => {
            const tag = document.activeElement?.tagName?.toLowerCase() || '';
            const isTyping = ['input', 'textarea', 'select'].includes(tag) || document.activeElement?.isContentEditable;
            const tour = window.LaravelOnboardingTour;

            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S') && tour?.inspectorActive) { e.preventDefault(); tour.saveTourDraft(); return; }
            if (e.altKey && (e.key === 'b' || e.key === 'B')) { e.preventDefault(); tour?.toggleInspectorMode(); return; }
            if (isTyping) return;
            if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) { e.preventDefault(); this.toggleShortcutsModal(); return; }

            if (e.key === 'Escape') {
                if (this.isOpen) { this.toggleShortcutsModal(false); return; }
                const em = document.getElementById('tour-step-edit-modal'); if (em) { em.remove(); tour?.removeInspectorOutline(); return; }
                const cm = document.getElementById('tour-confirm-modal'); if (cm) { cm.remove(); return; }
                const dr = document.getElementById('tour-inspector-drawer'); if (dr?.classList.contains('open')) { tour?.closeStepManagerDrawer(); return; }
                if (tour?.isTourActive()) { tour.closeTour(false, true); return; }
                if (tour?.inspectorActive) { tour.toggleInspectorMode(); return; }
            }

            if (tour?.isTourActive()) {
                if (['ArrowRight', 'l', 'L'].includes(e.key)) { e.preventDefault(); tour.nextStep(); return; }
                if (['ArrowLeft', 'h', 'H'].includes(e.key)) { e.preventDefault(); tour.prevStep(); return; }
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tour.nextStep(); return; }
            }

            if (tour?.inspectorActive) {
                if (e.key === 's' || e.key === 'S') { e.preventDefault(); tour.activeDrawerTab = 'steps'; tour.openStepManagerDrawer(); return; }
                if (e.key === 't' || e.key === 'T') { e.preventDefault(); tour.activeDrawerTab = 'theme'; tour.openStepManagerDrawer(); return; }
            }
        });
    },

    toggleShortcutsModal(forceState) {
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
        let modal = document.getElementById('tour-shortcuts-modal');
        if (!this.isOpen) { if (modal) modal.remove(); this.previousActiveElement?.focus?.(); this.previousActiveElement = null; return; }
        this.previousActiveElement = document.activeElement;
        if (modal) return;

        modal = document.createElement('div');
        modal.id = 'tour-shortcuts-modal';
        modal.className = 'tour-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', t('shortcuts_title', 'Keyboard Shortcuts'));

        const row = (label, keys) => `<div class="flex items-center justify-between py-0.5"><span class="text-zinc-600 dark:text-zinc-300 font-medium">${label}</span><div class="flex items-center gap-1">${keys}</div></div>`;
        const kbd = k => `<kbd class="tour-kbd">${k}</kbd>`;
        const or = ` <span class="text-zinc-400 text-[10px]">${t('or', 'or')}</span> `;
        const plus = ` <span class="text-zinc-400 text-[10px]">+</span> `;

        modal.innerHTML = `
            <div class="tour-modal-card" style="max-width:440px">
                <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-700 mb-3">
                    <div class="flex items-center gap-2"><span class="text-blue-500">${SVG.keyboard}</span><h3 class="text-sm font-bold">${t('shortcuts_title', 'Keyboard Shortcuts')}</h3></div>
                    <button id="shortcuts-modal-close" class="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">${SVG.close}</button>
                </div>
                <div class="space-y-2 text-xs">
                    <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">${t('shortcuts_navigation', 'Navigation')}</div>
                    ${row(t('shortcut_next_step', 'Next Step'), `${kbd('→')}${or}${kbd('Space')}${or}${kbd('Enter')}${or}${kbd('L')}`)}
                    ${row(t('shortcut_prev_step', 'Previous Step'), `${kbd('←')}${or}${kbd('H')}`)}
                    ${row(t('shortcut_close_tour', 'Close / Exit'), `${kbd('Esc')}`)}
                    ${row(t('shortcut_help_modal', 'Toggle Shortcuts'), `${kbd('?')}`)}
                    <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pt-2 border-t border-zinc-100 dark:border-zinc-800">${t('shortcuts_admin', 'Admin Inspector')}</div>
                    ${row(t('shortcut_toggle_inspector', 'Toggle Admin Mode'), `${kbd('Alt')}${plus}${kbd('B')}`)}
                    ${row(t('shortcut_save_tour', 'Save Tour'), `${kbd('Ctrl')}${plus}${kbd('S')}${or}${kbd('⌘')}${plus}${kbd('S')}`)}
                    ${row(t('shortcut_steps_tab', 'Open Steps Manager'), `${kbd('S')}`)}
                    ${row(t('shortcut_theme_tab', 'Open Theme Editor'), `${kbd('T')}`)}
                </div>
            </div>`;

        document.body.appendChild(modal);
        trapFocus(modal);
        modal.querySelector('#shortcuts-modal-close').onclick = () => this.toggleShortcutsModal(false);
        modal.onclick = (e) => { if (e.target === modal) this.toggleShortcutsModal(false); };
    }
};
