/**
 * Laravel Onboarding Tour Engine & Admin Inspector
 * Group Tecno / Tecnovat
 */

(function () {
    // ── SVG Icons ──
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
        keyboard: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" stroke-width="1.5"/><path stroke-width="1.5" stroke-linecap="round" d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>`
    };

    // ── Theme Defaults (single source of truth) ──
    const THEME_DEFAULTS = {
        use_custom_theme: false, card_style: 'auto', card_size: 'md', accent_color: '#2563eb',
        card_radius: '20px', highlight_style: 'minimal', backdrop_hex: '#0f172a', backdrop_opacity: 75,
        backdrop_color: 'rgba(15, 23, 42, 0.75)'
    };

    const CARD_MAX_WIDTHS = { sm: 320, md: 380, lg: 460, xl: 560 };

    // Selectors for own UI elements (ignore clicks/hovers on these in inspector)
    const OWN_UI_SELECTORS = [
        '#tour-inspector-bar', '#tour-builder-modal', '#tour-step-edit-modal',
        '#tour-shortcuts-modal', '#tour-admin-toggle-btn', '#tour-confirm-modal',
        '#tour-drawer-panel', '#tour-popover-card', '#tour-spotlight-mask'
    ];

    // ── Shared Helpers ──
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

    function csrfHeaders() {
        return { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' };
    }

    function positionPopover(popover, targetEl, sizeClass) {
        const rect = targetEl.getBoundingClientRect();
        const maxWidth = CARD_MAX_WIDTHS[sizeClass] || 380;
        let top = rect.bottom + 12;
        let left = Math.max(16, Math.min(rect.left + rect.width / 2 - maxWidth / 2, window.innerWidth - maxWidth - 16));
        if (top + 220 > window.innerHeight) top = Math.max(16, rect.top - 220);
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
                        <button id="tour-shortcuts-close-btn" class="tour-btn-icon" aria-label="${t('close', 'Close')}">${SVG.close}</button>
                    </div>
                    <div class="mb-4"><div class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">${t('shortcut_section_tour', 'Tour Navigation')}</div><div class="space-y-2 text-xs">${row(t('shortcut_next', 'Next Step'), kbd('→') + or + kbd('Space'))}${row(t('shortcut_prev', 'Previous Step'), kbd('←'))}${row(t('shortcut_finish', 'Finish Tour'), kbd('Enter'))}${row(t('shortcut_close', 'Dismiss / Exit'), kbd('ESC'))}</div></div>
                    <div class="mb-4 pt-3 border-t border-zinc-100 dark:border-zinc-800"><div class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">${t('shortcut_section_builder', 'Builder Mode')}</div><div class="space-y-2 text-xs">${row(t('shortcut_toggle_builder', 'Toggle Builder'), kbd('Alt') + plus + kbd('B'))}${row(t('shortcut_open_steps', 'Steps Drawer'), kbd('S'))}${row(t('shortcut_open_theme', 'Theme Settings'), kbd('T'))}${row(t('shortcut_save_tour', 'Save Tour'), kbd('Ctrl') + plus + kbd('S'))}</div></div>
                    <div class="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <span class="text-[10px] text-zinc-400 font-mono">${t('shortcut_toggle', 'Toggle Shortcuts')}: <kbd class="tour-kbd" style="font-size:9px;min-width:18px;height:18px;padding:0 4px">?</kbd></span>
                        <button id="tour-shortcuts-ok-btn" class="tour-btn tour-btn-accent text-xs px-4 py-1.5">${t('close', 'Close')}</button>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            const close = () => this.toggleShortcutsModal(false);
            document.getElementById('tour-shortcuts-close-btn').onclick = close;
            const okBtn = document.getElementById('tour-shortcuts-ok-btn');
            okBtn.onclick = close;
            setTimeout(() => okBtn.focus(), 50);
            trapFocus(modal);
        }
    };

    // ── Main Tour Object ──
    window.LaravelOnboardingTour = {
        config: null, currentTour: null, globalTheme: null, currentStepIndex: 0,
        inspectorActive: false, hoveredElement: null, selectedElement: null,
        draftSteps: [], activeDrawerTab: 'steps', activeThemeSubTab: 'card', _lastToggleTime: 0,
        themeSettings: { ...THEME_DEFAULTS },

        isTourActive() { return !!document.getElementById('tour-popover-card'); },
        nextStep() { if (this.currentStepIndex < (this.currentTour?.steps?.length ?? 0) - 1) { this.currentStepIndex++; this.renderStep(this.currentStepIndex); } else { this.closeTour(true); } },
        prevStep() { if (this.currentStepIndex > 0) { this.currentStepIndex--; this.renderStep(this.currentStepIndex); } },
        toggleShortcutsModal(s) { ShortcutsModule.toggleShortcutsModal(s); },

        init(configData) {
            this.config = configData || {};
            this.globalTheme = this.config.global_theme || { ...THEME_DEFAULTS };
            this.currentTour = this.config.tour || null;
            this.draftSteps = this.currentTour ? [...(this.currentTour.steps || [])] : [];
            const tourTheme = this.currentTour?.theme_settings;
            this.themeSettings = tourTheme?.use_custom_theme ? { ...this.globalTheme, ...tourTheme } : { ...this.globalTheme, use_custom_theme: false };
            this.applyThemeVariables(this.themeSettings);
            ShortcutsModule.bindGlobalKeydown();
            if (this.currentTour?.should_auto_start && this.currentTour.steps?.length > 0) setTimeout(() => this.startTour(), 600);
        },

        getLocalizedText(data) {
            if (!data) return '';
            if (typeof data === 'string') return data;
            if (typeof data === 'object') {
                const locales = this.config?.locales?.length ? this.config.locales : ['it', 'en'];
                const current = this.config?.current_locale || locales[0];
                const fallback = locales[0] || 'it';
                if (data[current] && data[current] !== '') return data[current];
                if (data[fallback] && data[fallback] !== '') return data[fallback];
                for (const k in data) { if (typeof data[k] === 'string' && data[k] !== '') return data[k]; }
            }
            return '';
        },

        applyThemeVariables(settings) {
            const root = document.documentElement;
            const accent = settings.accent_color || THEME_DEFAULTS.accent_color;
            root.style.setProperty('--tour-accent-color', accent);
            root.style.setProperty('--tour-accent-light', accent + '1e');
            root.style.setProperty('--tour-backdrop-bg', settings.backdrop_color || hexToRgba(settings.backdrop_hex, settings.backdrop_opacity));
        },

        // ── Toasts & Confirm Modals ──
        showToast(message, type = 'info') {
            const container = getOrCreate('tour-toast-container', 'div', 'tour-toast-container');
            const toast = document.createElement('div');
            toast.className = 'tour-toast';
            toast.innerHTML = `<span>${type === 'success' ? SVG.check : (type === 'error' ? SVG.alert : SVG.info)}</span> <span>${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => { toast.style.cssText = 'opacity:0;transform:translateY(-10px);transition:all 0.2s ease'; setTimeout(() => toast.remove(), 200); }, 3200);
        },

        showConfirmModal(title, message, onConfirm) {
            document.getElementById('tour-confirm-modal')?.remove();
            const modal = document.createElement('div');
            modal.id = 'tour-confirm-modal';
            modal.className = 'tour-modal-overlay';
            modal.innerHTML = `<div class="tour-modal-card" style="max-width:400px"><h3 class="text-base font-bold mb-2">${title}</h3><p class="text-xs opacity-80 mb-6 leading-relaxed">${message}</p><div class="flex items-center justify-end gap-2"><button id="tour-confirm-cancel" class="tour-btn tour-btn-ghost">${t('cancel', 'Cancel')}</button><button id="tour-confirm-ok" class="tour-btn tour-btn-accent">${t('confirm', 'Confirm')}</button></div></div>`;
            document.body.appendChild(modal);
            document.getElementById('tour-confirm-cancel').onclick = () => modal.remove();
            document.getElementById('tour-confirm-ok').onclick = () => { modal.remove(); onConfirm?.(); };
        },

        // ── Media Lightbox ──
        openMediaLightbox(url) {
            document.getElementById('tour-media-lightbox-modal')?.remove();
            const cleanUrl = (url || '').trim();
            if (!cleanUrl) return;
            const modal = document.createElement('div');
            modal.id = 'tour-media-lightbox-modal';
            modal.className = 'tour-modal-overlay tour-media-lightbox-modal';
            modal.style.cssText = 'z-index:100030;background-color:rgba(0,0,0,0.85)';

            let content;
            if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl) || cleanUrl.startsWith('data:image/')) content = `<img src="${cleanUrl}" class="tour-lightbox-content" alt="Expanded Media" />`;
            else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) content = `<video src="${cleanUrl}" controls autoplay class="tour-lightbox-content"></video>`;
            else content = `<div style="width:85vw;max-width:1000px;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:#000;box-shadow:0 25px 60px rgba(0,0,0,0.8)"><iframe src="${getEmbedUrl(cleanUrl)}?autoplay=1" style="width:100%;height:100%;border:none" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`;

            modal.innerHTML = `<div style="position:relative;display:flex;align-items:center;justify-content:center;max-width:95vw;max-height:90vh"><button id="tour-lightbox-close" class="tour-lightbox-close-btn" title="${t('close', 'Close')}">${SVG.close}</button>${content}</div>`;
            document.body.appendChild(modal);
            const closeModal = () => { modal.remove(); document.removeEventListener('keydown', hk); };
            const hk = (e) => { if (e.key === 'Escape') closeModal(); };
            document.addEventListener('keydown', hk);
            modal.onclick = (e) => { if (e.target === modal || e.target.closest('#tour-lightbox-close')) closeModal(); };
        },

        // ── Tour Runner ──
        startTour() {
            if (!this.currentTour?.steps?.length) { this.showToast(t('no_tour_for_page', 'No tour configured for this page.'), 'info'); return; }
            this.currentStepIndex = 0;
            this.renderStep(0);
        },

        _findStepTarget(step) {
            let el = null;
            if (step.element_selector) { try { el = document.querySelector(escapeWireSelector(step.element_selector)); } catch (e) { } }
            if (!el && step.target_text) el = this.findByTextContent(step.target_text);
            return el;
        },

        renderStep(index) {
            const steps = this.currentTour.steps;
            if (index < 0 || index >= steps.length) { this.closeTour(true); return; }
            this.applyThemeVariables(this.themeSettings);
            const step = steps[index];
            const targetEl = this._findStepTarget(step);
            if (!targetEl) { console.warn(`[OnboardingTour] Element not found: ${step.element_selector}`); if (index + 1 < steps.length) this.renderStep(index + 1); else this.closeTour(true); return; }
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            setTimeout(() => { this.updateSpotlight(targetEl); this._renderPopoverCard(targetEl, step, index, steps.length, 'tour'); }, 250);
        },

        updateSpotlight(targetEl) {
            const mask = getOrCreate('tour-spotlight-mask', 'div');
            mask.className = `tour-spotlight-mask style-${this.themeSettings.highlight_style || 'minimal'}`;
            const rect = targetEl.getBoundingClientRect();
            Object.assign(mask.style, { top: `${rect.top - 6}px`, left: `${rect.left - 6}px`, width: `${rect.width + 12}px`, height: `${rect.height + 12}px` });
        },

        // Unified popover rendering: mode = 'tour' | 'preview'
        _renderPopoverCard(targetEl, step, index, total, mode) {
            const popover = getOrCreate('tour-popover-card', 'div');
            const sizeClass = step.card_size || this.themeSettings.card_size || 'md';
            popover.className = `tour-popover-card card-${this.themeSettings.card_style || 'auto'} size-${sizeClass}`;
            popover.setAttribute('role', 'dialog');
            popover.setAttribute('aria-modal', 'true');
            positionPopover(popover, targetEl, sizeClass);

            const stepTitle = this.getLocalizedText(step.title_i18n || step.title);
            const stepDesc = this.getLocalizedText(step.description_i18n || step.description);
            const mediaHtml = formatMediaHtml(getStepMediaUrl(step, this.getLocalizedText.bind(this)));
            const isLast = index === total - 1;
            popover.setAttribute('aria-label', `${stepTitle} (${index + 1}/${total})`);

            const badge = mode === 'tour' ? `${index + 1}/${total}` : t('live_preview', 'Preview');
            let footerHtml;
            if (mode === 'tour') {
                footerHtml = `<div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800"><div class="flex items-center gap-2"><button id="tour-dismiss-btn" class="text-[11px] font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">${t('dismiss_btn', "Don't show again")}</button><button id="tour-shortcuts-btn" class="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 p-1 rounded-md transition-colors" title="${t('shortcuts_title', 'Keyboard Shortcuts')}" aria-label="${t('shortcuts_title', 'Keyboard Shortcuts')}">${SVG.keyboard}</button></div><div class="flex items-center gap-1.5">${index > 0 ? `<button id="tour-prev-btn" class="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">${t('prev_btn', 'Back')}</button>` : ''}<button id="tour-next-btn" class="px-4 py-1.5 rounded-lg tour-btn-accent text-xs font-bold shadow-md">${isLast ? t('finish_btn', 'Finish') : t('next_btn', 'Next')}</button></div></div>`;
            } else {
                footerHtml = `<div class="flex items-center justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800"><button id="tour-back-to-editor-btn" class="tour-btn tour-btn-accent text-xs font-bold shadow-md flex items-center gap-1.5">${SVG.pencil} <span>${t('back_to_builder', 'Back to Editor')}</span></button></div>`;
            }

            popover.innerHTML = `${mediaHtml}<div class="flex items-center justify-between gap-2 mb-2"><h4 class="font-bold text-base leading-tight">${stepTitle}</h4><span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">${badge}</span></div><div class="tour-step-desc text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 font-medium" aria-live="polite">${stepDesc}</div>${footerHtml}`;

            if (mode === 'tour') {
                document.getElementById('tour-next-btn')?.addEventListener('click', () => { if (isLast) this.closeTour(true); else { this.currentStepIndex++; this.renderStep(this.currentStepIndex); } });
                document.getElementById('tour-prev-btn')?.addEventListener('click', () => { this.currentStepIndex--; this.renderStep(this.currentStepIndex); });
                document.getElementById('tour-dismiss-btn')?.addEventListener('click', () => this.closeTour(false, true));
                document.getElementById('tour-shortcuts-btn')?.addEventListener('click', () => this.toggleShortcutsModal());
            } else {
                document.getElementById('tour-back-to-editor-btn')?.addEventListener('click', () => { popover.remove(); document.getElementById('tour-spotlight-mask')?.remove(); this.openStepManagerDrawer(); });
            }
            trapFocus(popover);
            setTimeout(() => document.getElementById(mode === 'tour' ? 'tour-next-btn' : 'tour-back-to-editor-btn')?.focus(), 50);
        },

        closeTour(completed = false, dismissed = false) {
            document.getElementById('tour-spotlight-mask')?.remove();
            document.getElementById('tour-popover-card')?.remove();
            if (this.currentTour && (completed || dismissed)) {
                fetch('/api/onboarding-tour/complete', { method: 'POST', headers: csrfHeaders(), body: JSON.stringify({ tour_id: this.currentTour.id, action: dismissed ? 'dismiss' : 'complete' }) }).catch(console.error);
            }
        },

        // ── Inspector Mode ──
        toggleInspectorMode() {
            const now = Date.now();
            if (this._lastToggleTime && (now - this._lastToggleTime) < 350) return;
            this._lastToggleTime = now;
            this.inspectorActive = !this.inspectorActive;
            if (this.inspectorActive) {
                this.renderInspectorBar();
                document.addEventListener('mousemove', this._onMouseMove = (e) => this.handleInspectorHover(e));
                document.addEventListener('mousedown', this._onMouseDown = (e) => this._preventNav(e), true);
                document.addEventListener('pointerdown', this._onPointerDown = (e) => this._preventNav(e), true);
                document.addEventListener('click', this._onClick = (e) => this.handleInspectorClick(e), true);
                this.showToast(t('builder_enabled', 'Builder Mode enabled'), 'info');
            } else {
                document.getElementById('tour-inspector-bar')?.remove();
                this.closeStepManagerDrawer();
                this.removeInspectorOutline();
                if (this._onMouseMove) document.removeEventListener('mousemove', this._onMouseMove);
                if (this._onMouseDown) document.removeEventListener('mousedown', this._onMouseDown, true);
                if (this._onPointerDown) document.removeEventListener('pointerdown', this._onPointerDown, true);
                if (this._onClick) document.removeEventListener('click', this._onClick, true);
                this.showToast(t('builder_disabled', 'Builder Mode disabled'), 'info');
            }
        },

        renderInspectorBar() {
            const bar = getOrCreate('tour-inspector-bar', 'div', 'tour-inspector-bar');
            bar.innerHTML = `<div class="flex items-center gap-2"><span class="tour-inspector-dot-wrapper"><span class="tour-inspector-dot-ping"></span><span class="tour-inspector-dot-core"></span></span><span>${t('builder_mode', 'Builder Mode')}</span></div><div class="flex items-center gap-2"><button id="tour-manage-steps-btn" class="tour-btn tour-btn-ghost">${SVG.list}<span>${t('manage_steps', 'Steps')}</span></button><button id="tour-theme-toggle-btn" class="tour-btn tour-btn-ghost">${SVG.palette}<span>${t('theme', 'Theme')}</span></button><button id="tour-shortcuts-inspector-btn" class="tour-btn tour-btn-ghost">${SVG.keyboard}<span>${t('shortcuts_btn', 'Shortcuts')}</span></button><button id="tour-save-all-btn" class="tour-btn tour-btn-accent">${SVG.check}<span>${t('save_tour', 'Save tour')}</span></button><button id="tour-close-inspector-btn" class="tour-btn tour-btn-ghost">${SVG.close}<span>${t('exit', 'Exit')}</span></button></div>`;
            document.getElementById('tour-manage-steps-btn').onclick = () => { this.activeDrawerTab = 'steps'; this.openStepManagerDrawer(); };
            document.getElementById('tour-theme-toggle-btn').onclick = () => { this.activeDrawerTab = 'theme'; this.openStepManagerDrawer(); };
            document.getElementById('tour-shortcuts-inspector-btn').onclick = () => this.toggleShortcutsModal();
            document.getElementById('tour-save-all-btn').onclick = () => this.showConfirmModal(t('save_tour', 'Save'), t('save_tour_confirm', 'Save tour?'), () => this.saveTourDraft());
            document.getElementById('tour-close-inspector-btn').onclick = () => this.toggleInspectorMode();
        },

        // ── Step Manager Drawer ──
        openStepManagerDrawer() {
            const backdrop = getOrCreate('tour-drawer-backdrop', 'div', 'tour-drawer-backdrop');
            backdrop.onclick = () => this.closeStepManagerDrawer();
            let panel = document.getElementById('tour-drawer-panel');
            if (!panel) { panel = document.createElement('div'); panel.id = 'tour-drawer-panel'; panel.className = 'tour-drawer-panel'; document.body.appendChild(panel); }
            else { panel.style.animation = 'none'; }

            const isStepsTab = this.activeDrawerTab === 'steps';
            const useCustom = !!this.themeSettings.use_custom_theme;
            const bodyHtml = isStepsTab ? this._renderStepsTab() : this._renderThemeTab(useCustom);
            const actionText = !isStepsTab ? (!useCustom ? t('save_global_theme_btn', 'Save Global Theme') : t('save_custom_theme_btn', 'Save Page Theme')) : t('save_changes', 'Save');

            panel.innerHTML = `<div class="tour-drawer-header"><div><h3 class="text-base font-bold">${t('drawer_title', 'Onboarding Tour Editor')}</h3><p class="text-xs text-zinc-400 mt-0.5">${t('drawer_subtitle', 'Configure steps and visual appearance')}</p></div><button id="tour-drawer-close-btn" class="tour-btn-icon">${SVG.close}</button></div><div class="tour-drawer-subnav"><button id="tab-btn-steps" class="tour-tab-btn flex-1 justify-center ${isStepsTab ? 'active' : ''}">${SVG.list}<span>${t('manage_steps', 'Steps')} (${this.draftSteps.length})</span></button><button id="tab-btn-theme" class="tour-tab-btn flex-1 justify-center ${!isStepsTab ? 'active' : ''}">${SVG.palette}<span>${t('theme', 'Theme')}</span></button></div>${bodyHtml}<div class="tour-drawer-footer">${this.currentTour ? `<button id="tour-drawer-delete-tour-btn" class="tour-btn tour-btn-danger">${SVG.trash}<span>${t('delete_tour', 'Delete tour')}</span></button>` : ''}<button id="tour-drawer-save-btn" class="tour-btn tour-btn-accent flex-1">${actionText}</button></div>`;

            document.getElementById('tab-btn-steps').onclick = () => { this.activeDrawerTab = 'steps'; this.openStepManagerDrawer(); };
            document.getElementById('tab-btn-theme').onclick = () => { this.activeDrawerTab = 'theme'; this.openStepManagerDrawer(); };
            document.getElementById('tour-drawer-close-btn').onclick = () => this.closeStepManagerDrawer();
            document.getElementById('tour-drawer-save-btn').onclick = () => {
                if (!isStepsTab && !useCustom) this.showConfirmModal(t('scope_global', 'Global Theme'), t('save_global_theme_confirm', 'Save as default Global Theme?'), () => this.saveGlobalThemeDraft());
                else { this.closeStepManagerDrawer(); this.saveTourDraft(); }
            };
            document.getElementById('tour-drawer-delete-tour-btn')?.addEventListener('click', () => this.showConfirmModal(t('delete_tour', 'Delete tour'), t('confirm_delete_tour_msg', 'Delete the tour?'), () => this.deleteEntireTour()));
            if (isStepsTab) this._bindStepActions(panel); else this._bindThemeHandlers(panel);
        },

        _renderStepsTab() {
            if (!this.draftSteps.length) return `<div class="flex-1 overflow-y-auto p-5" id="tour-drawer-steps-list"><div class="flex flex-col items-center justify-center p-8 text-center text-zinc-400"><svg class="w-12 h-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg><p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">${t('no_steps_title', 'No steps in tour')}</p><p class="text-xs text-zinc-400 mt-1">${t('no_steps_subtitle', 'Click any element to add a step.')}</p></div></div>`;
            const items = this.draftSteps.map((step, idx) => {
                const hasMedia = !!(this.getLocalizedText(step.media_url_i18n || step.video_url_i18n || step.media_url || step.video_url));
                const title = this.getLocalizedText(step.title_i18n || step.title) || `Step #${idx + 1}`;
                return `<div class="tour-drawer-step-item tour-card-box flex items-center justify-between gap-2.5 px-3 py-2.5 hover:border-blue-500/50 transition-all group" draggable="true" data-idx="${idx}"><div class="flex items-center gap-2 flex-shrink-0"><span class="drag-handle p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-grab" title="${t('drag_to_reorder', 'Drag')}">${SVG.grip}</span><span class="step-num-badge tour-badge-accent w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center flex-shrink-0">${idx + 1}</span></div><div class="flex-1 min-w-0"><div class="flex items-center gap-1.5"><h5 class="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">${title}</h5>${hasMedia ? `<span class="inline-flex items-center gap-0.5 text-[9px] font-semibold text-purple-500 bg-purple-500/10 dark:bg-purple-500/20 px-1.5 py-0.5 rounded-full flex-shrink-0">${SVG.media}</span>` : ''}</div><p class="text-[10px] font-mono text-zinc-400 truncate leading-tight mt-0.5">${step.element_selector}</p></div><div class="flex items-center gap-0.5 flex-shrink-0"><button class="tour-test-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30" data-idx="${idx}">${SVG.eye}</button><button class="tour-edit-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30" data-idx="${idx}">${SVG.pencil}</button><button class="tour-delete-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" data-idx="${idx}">${SVG.trash}</button></div></div>`;
            }).join('');
            return `<div class="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar" id="tour-drawer-steps-list">${items}</div>`;
        },

        _renderThemeTab(useCustom) {
            const sub = this.activeThemeSubTab || 'card';
            const ts = this.themeSettings;
            const pills = (items, cur, cls) => items.map(i => `<button type="button" class="${cls} ${cur === i.hex ? 'active' : ''}" data-color="${i.hex}"><span class="w-2.5 h-2.5 rounded-full${cls.includes('backdrop') ? ' border border-zinc-500' : ''}" style="background-color:${i.hex}"></span><span>${i.name}</span></button>`).join('');
            const colors = [{name:t('color_blue','Blue'),hex:'#2563eb'},{name:t('color_emerald','Emerald'),hex:'#10b981'},{name:t('color_purple','Purple'),hex:'#7c3aed'},{name:t('color_amber','Amber'),hex:'#d97706'},{name:t('color_rose','Rose'),hex:'#e11d48'}];
            const bgs = [{name:t('bg_dark_slate','Dark Slate'),hex:'#0f172a'},{name:t('bg_deep_indigo','Deep Indigo'),hex:'#1e1b4b'},{name:t('bg_emerald_night','Emerald Night'),hex:'#022c22'},{name:t('bg_soft_charcoal','Soft Charcoal'),hex:'#334155'}];
            const opt = (v,l,c) => `<option value="${v}" ${c===v?'selected':''}>${l}</option>`;
            const subContent = {
                card: `<div class="tour-card-box p-3.5 space-y-3"><div class="grid grid-cols-2 gap-3"><div><label class="tour-label">${t('card_style_label','Card Style')}</label><select id="theme-card-style" class="tour-select">${opt('auto',t('style_auto','Auto'),ts.card_style)}${opt('glass',t('style_glass','Glass'),ts.card_style)}${opt('dark',t('style_dark','Dark'),ts.card_style)}${opt('light',t('style_light','Light'),ts.card_style)}</select></div><div><label class="tour-label">${t('card_size_label','Card Size')}</label><select id="theme-card-size" class="tour-select">${opt('sm',t('size_sm','Small'),ts.card_size)}${opt('md',t('size_md','Medium'),ts.card_size||'md')}${opt('lg',t('size_lg','Large'),ts.card_size)}${opt('xl',t('size_xl','Extra Large'),ts.card_size)}</select></div></div><div class="pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60 mt-2"><label class="tour-label block mb-2.5">${t('accent_color_label','Accent Color')}</label><div class="flex flex-wrap items-center gap-1.5 mb-3">${pills(colors,ts.accent_color,'tour-color-pill')}</div><div class="flex items-center gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 mt-3"><div class="tour-color-picker-box"><input type="color" id="theme-color-picker" value="${ts.accent_color||'#2563eb'}" class="tour-color-swatch-input"/><span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">${t('color_custom','Custom:')}</span></div><div class="flex-1"><input type="text" id="theme-hex-input" value="${ts.accent_color||'#2563eb'}" placeholder="#2563eb" maxlength="7" class="tour-input" style="font-family:monospace;color:var(--tour-text-main);font-weight:700"/></div></div></div></div>`,
                highlight: `<div class="tour-card-box p-4 space-y-2"><label class="tour-label">${t('highlight_style_label','Highlight Style')}</label><select id="theme-highlight-style" class="tour-select">${opt('minimal',t('hl_minimal','Minimal'),ts.highlight_style)}${opt('ring',t('hl_ring','Ring'),ts.highlight_style)}${opt('glow',t('hl_glow','Glow'),ts.highlight_style)}${opt('dashed',t('hl_dashed','Dashed'),ts.highlight_style)}${opt('none',t('hl_none','None'),ts.highlight_style)}</select></div>`,
                backdrop: `<div class="tour-card-box p-4 space-y-4"><div><label class="tour-label block">${t('backdrop_label','Background')}</label><div class="flex flex-wrap items-center gap-1.5 mb-3">${pills(bgs,ts.backdrop_hex||'#0f172a','tour-backdrop-pill')}</div><div class="flex items-center gap-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60"><div class="tour-color-picker-box"><input type="color" id="theme-backdrop-picker" value="${ts.backdrop_hex||'#0f172a'}" class="tour-color-swatch-input"/><span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">${t('backdrop_color_hex','Color:')}</span></div><div class="flex-1"><input type="text" id="theme-backdrop-hex-input" value="${ts.backdrop_hex||'#0f172a'}" placeholder="#0f172a" maxlength="7" class="tour-input" style="font-family:monospace;color:var(--tour-text-main);font-weight:700"/></div></div></div><div class="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60"><div class="flex items-center justify-between mb-1"><label class="tour-label" style="margin-bottom:0">${t('backdrop_opacity','Opacity')}</label><span class="text-xs font-mono font-bold text-blue-500" id="backdrop-opacity-val">${ts.backdrop_opacity||75}%</span></div><input type="range" id="theme-backdrop-opacity" min="20" max="95" value="${ts.backdrop_opacity||75}" class="tour-range-slider"/></div></div>`
            };
            const subPill = (id,icon,label) => `<button type="button" id="subtab-btn-${id}" class="tour-subnav-pill ${sub===id?'active':''}">${icon}<span>${label}</span></button>`;
            return `<div class="tour-sticky-preview-header"><div class="flex items-center justify-between mb-2"><label class="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>${t('live_preview','Live Preview')}</label></div><div class="tour-live-preview-stage" id="tour-live-preview-stage"><div class="tour-preview-sample-target" id="tour-preview-sample-target">${t('sample_target_element','Sample Highlighted Target')}</div><div class="tour-preview-sample-card tour-popover-card card-${ts.card_style||'auto'} size-${ts.card_size||'md'}" id="tour-preview-sample-card"><div class="flex items-center justify-between gap-2 mb-2"><h4 class="font-bold text-sm leading-tight">${t('sample_title','Step Preview Title')}</h4><span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">1/3</span></div><div class="tour-step-desc text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 font-medium">${t('sample_description','Preview of how users will see this step.')}</div><div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800"><span class="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">${t('dismiss_btn',"Don't show again")}</span><div class="flex items-center gap-1"><button class="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[10px] font-semibold">${t('prev_btn','Back')}</button><button class="px-3.5 py-1 rounded-lg tour-btn-accent text-[10px] font-bold shadow-md">${t('next_btn','Next')}</button></div></div></div></div></div><div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"><div class="tour-subnav-bar mb-3"><button type="button" id="theme-scope-global" class="tour-subnav-pill ${!useCustom?'active':''}">${SVG.globe}<span>${t('scope_global_btn','Global Theme')}</span></button><button type="button" id="theme-scope-custom" class="tour-subnav-pill ${useCustom?'active':''}">${SVG.page}<span>${t('scope_custom_btn','Page Theme')}</span></button></div><div class="tour-subnav-bar mb-4">${subPill('card',SVG.card,t('subtab_card','Card'))}${subPill('highlight',SVG.target,t('subtab_highlight','Highlight'))}${subPill('backdrop',SVG.backdrop,t('subtab_backdrop','Backdrop'))}</div><div id="custom-theme-controls-container">${subContent[sub]||''}</div></div>`;
        },

        _bindThemeHandlers(panel) {
            const ts = this.themeSettings;
            const updatePreview = () => {
                ts.backdrop_color = hexToRgba(ts.backdrop_hex||'#0f172a', ts.backdrop_opacity??75);
                this.applyThemeVariables(ts);
                const stage = document.getElementById('tour-live-preview-stage'), card = document.getElementById('tour-preview-sample-card'), tgt = document.getElementById('tour-preview-sample-target');
                if (stage) stage.style.background = ts.backdrop_color;
                if (card) card.className = `tour-preview-sample-card tour-popover-card card-${ts.card_style||'auto'} size-${ts.card_size||'md'}`;
                if (tgt) {
                    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
                    Object.assign(tgt.style, { background: isDark?'#18181b':'#fff', color: isDark?'#fff':'#0f172a', border:'none', boxShadow:'none' });
                    const a = ts.accent_color||'#2563eb', s = ts.highlight_style||'minimal';
                    const map = { minimal:{border:`2px solid ${a}`,boxShadow:`0 0 15px ${a}60`}, ring:{border:`2.5px solid ${a}`,boxShadow:`0 0 0 4px ${a}50`}, glow:{border:`2px solid ${a}`,boxShadow:`0 0 25px ${a}`}, dashed:{border:`2px dashed ${a}`} };
                    if (map[s]) Object.assign(tgt.style, map[s]);
                }
            };
            updatePreview();

            document.getElementById('theme-scope-global')?.addEventListener('click', () => { this.themeSettings = { ...this.globalTheme, use_custom_theme: false }; this.openStepManagerDrawer(); this.showToast(t('global_theme_enabled','Global Theme active'),'info'); });
            document.getElementById('theme-scope-custom')?.addEventListener('click', () => { ts.use_custom_theme = true; this.openStepManagerDrawer(); this.showToast(t('custom_theme_enabled','Custom mode'),'info'); });
            ['card','highlight','backdrop'].forEach(tab => document.getElementById(`subtab-btn-${tab}`)?.addEventListener('click', () => { this.activeThemeSubTab = tab; this.openStepManagerDrawer(); }));

            const bindSelect = (id,prop) => { const el = document.getElementById(id); if (el) el.onchange = e => { ts[prop] = e.target.value; updatePreview(); }; };
            bindSelect('theme-card-style','card_style'); bindSelect('theme-card-size','card_size'); bindSelect('theme-highlight-style','highlight_style');

            const setColor = (prop, hexId, pickerId) => val => {
                if (!/^#[0-9A-F]{6}$/i.test(val)) return; ts[prop] = val;
                const hi = document.getElementById(hexId), pi = document.getElementById(pickerId);
                if (hi && hi.value !== val) hi.value = val; if (pi && pi.value !== val) pi.value = val;
                updatePreview();
            };
            const setAccent = setColor('accent_color','theme-hex-input','theme-color-picker');
            const setBackdrop = setColor('backdrop_hex','theme-backdrop-hex-input','theme-backdrop-picker');

            document.getElementById('theme-color-picker')?.addEventListener('input', e => setAccent(e.target.value));
            document.getElementById('theme-hex-input')?.addEventListener('input', e => { let v = e.target.value.trim(); if (!v.startsWith('#')) v = '#'+v; setAccent(v); });
            document.getElementById('theme-backdrop-picker')?.addEventListener('input', e => setBackdrop(e.target.value));
            document.getElementById('theme-backdrop-hex-input')?.addEventListener('input', e => { let v = e.target.value.trim(); if (!v.startsWith('#')) v = '#'+v; setBackdrop(v); });
            document.getElementById('theme-backdrop-opacity')?.addEventListener('input', e => { ts.backdrop_opacity = parseInt(e.target.value); const l = document.getElementById('backdrop-opacity-val'); if (l) l.innerText = `${ts.backdrop_opacity}%`; updatePreview(); });

            const bindPills = (cls, setter) => panel.querySelectorAll(`.${cls}`).forEach(p => { p.onclick = () => { setter(p.dataset.color); panel.querySelectorAll(`.${cls}`).forEach(x => x.classList.remove('active')); p.classList.add('active'); }; });
            bindPills('tour-color-pill', setAccent); bindPills('tour-backdrop-pill', setBackdrop);
        },

        _bindStepActions(panel) {
            const list = document.getElementById('tour-drawer-steps-list');
            let draggedItem = null;
            if (list) {
                list.querySelectorAll('.tour-drawer-step-item').forEach(item => {
                    item.addEventListener('dragstart', e => { draggedItem = item; item.classList.add('is-dragging'); e.dataTransfer.effectAllowed = 'move'; });
                    item.addEventListener('dragend', () => {
                        item.classList.remove('is-dragging'); draggedItem = null;
                        const newOrder = [];
                        list.querySelectorAll('.tour-drawer-step-item').forEach((el, i) => { const s = this.draftSteps[parseInt(el.dataset.idx)]; s.sort_order = i+1; newOrder.push(s); el.dataset.idx = i; const b = el.querySelector('.step-num-badge'); if (b) b.innerText = i+1; });
                        this.draftSteps = newOrder; this.renderInspectorBar(); this.showToast(t('step_order_updated','Step order updated'),'success');
                    });
                    item.addEventListener('dragover', e => { e.preventDefault(); if (!draggedItem || draggedItem === item) return; const mid = item.getBoundingClientRect().top + item.getBoundingClientRect().height/2; list.insertBefore(draggedItem, e.clientY < mid ? item : item.nextSibling); });
                });
            }
            panel.querySelectorAll('.tour-test-step-btn').forEach(b => b.onclick = () => this.testSingleStep(parseInt(b.dataset.idx)));
            panel.querySelectorAll('.tour-edit-step-btn').forEach(b => b.onclick = () => {
                const step = this.draftSteps[parseInt(b.dataset.idx)];
                let el = null; try { el = document.querySelector(escapeWireSelector(step.element_selector)); } catch(e){}
                if (!el && step.target_text) el = this.findByTextContent(step.target_text);
                this.closeStepManagerDrawer(); this.openStepBuilderModal(el || document.body, parseInt(b.dataset.idx));
            });
            panel.querySelectorAll('.tour-delete-step-btn').forEach(b => b.onclick = e => {
                e.stopPropagation(); const idx = parseInt(b.dataset.idx);
                this.showConfirmModal(t('delete_step','Delete step'), t('confirm_delete_step_msg','Delete this step?'), () => { this.draftSteps.splice(idx,1); this.renderInspectorBar(); this.openStepManagerDrawer(); this.showToast(t('step_deleted_success','Step deleted'),'success'); });
            });
        },

        closeStepManagerDrawer() { document.getElementById('tour-drawer-backdrop')?.remove(); document.getElementById('tour-drawer-panel')?.remove(); },

        // ── API Calls ──
        saveGlobalThemeDraft() {
            fetch('/api/onboarding-tour/save-global-theme', { method:'POST', headers:csrfHeaders(), body:JSON.stringify({ theme_settings:this.themeSettings }) })
                .then(r => r.json()).then(data => { if (data.success) { this.globalTheme = data.global_theme; this.themeSettings = { ...this.globalTheme, use_custom_theme:false }; this.applyThemeVariables(this.themeSettings); this.closeStepManagerDrawer(); this.showToast(t('global_theme_saved_success','Global Theme saved!'),'success'); setTimeout(() => window.location.reload(),1000); } else { this.showToast(t('error_saving_global_theme','Error'),'error'); } })
                .catch(e => { console.error(e); this.showToast(t('error_connection','Connection error'),'error'); });
        },

        saveTourDraft() {
            if (!this.draftSteps.length) { this.showToast(t('no_steps_to_save','No steps to save'),'error'); return; }
            const route = this.config.route_name || window.location.pathname;
            fetch('/api/onboarding-tour/save', { method:'POST', headers:csrfHeaders(), body:JSON.stringify({ route_name:route, title:`Tour ${route}`, description:`Tour guidato per la rotta ${route}`, auto_start:true, highlight_theme:this.themeSettings.highlight_style||'minimal', theme_settings:this.themeSettings, steps:this.draftSteps }) })
                .then(r => r.json()).then(data => { if (data.success) { this.showToast(t('tour_saved_success','Tour saved!'),'success'); setTimeout(() => window.location.reload(),1200); } else { this.showToast(t('save_error','Error:')+' '+(data.error||t('unknown_error','unknown')),'error'); } })
                .catch(e => { console.error(e); this.showToast(t('server_error','Server error'),'error'); });
        },

        deleteEntireTour() {
            const route = this.config.route_name || window.location.pathname;
            fetch('/api/onboarding-tour/delete', { method:'POST', headers:csrfHeaders(), body:JSON.stringify({ route_name:route }) })
                .then(r => r.json()).then(data => { if (data.success) { this.showToast(t('tour_deleted_success','Tour deleted'),'success'); setTimeout(() => window.location.reload(),1000); } else { this.showToast(t('error_deleting_tour','Error'),'error'); } })
                .catch(console.error);
        },

        // ── Inspector Handlers ──
        handleInspectorHover(e) {
            if (!this.inspectorActive || isOwnUI(e.target) || isModalOpen() || document.getElementById('tour-drawer-panel')) { this.removeInspectorOutline(); return; }
            this.hoveredElement = e.target; this.showOutline(e.target);
        },

        _preventNav(e) { if (!this.inspectorActive || isOwnUI(e.target)) return; e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); },

        handleInspectorClick(e) {
            if (!this.inspectorActive || isOwnUI(e.target) || isModalOpen()) return;
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            if (document.getElementById('tour-drawer-panel')) { this.closeStepManagerDrawer(); this.removeInspectorOutline(); return; }
            this.selectedElement = e.target; this.openStepBuilderModal(e.target);
        },

        showOutline(target) {
            const outline = getOrCreate('tour-inspector-outline', 'div', 'tour-inspector-outline');
            const rect = target.getBoundingClientRect();
            Object.assign(outline.style, { top:`${rect.top+window.scrollY}px`, left:`${rect.left+window.scrollX}px`, width:`${rect.width}px`, height:`${rect.height}px` });
            let badge = outline.querySelector('.tour-inspector-badge');
            if (!badge) { badge = document.createElement('div'); badge.className = 'tour-inspector-badge'; outline.appendChild(badge); }
            badge.innerText = this.generateSelector(target);
        },

        removeInspectorOutline() { document.getElementById('tour-inspector-outline')?.remove(); },

        // ── Selector Generator ──
        generateSelector(el) {
            if (!el || el === document.body) return 'body';
            const tryUnique = sel => { try { return document.querySelectorAll(sel).length === 1 ? sel : null; } catch(e) { return null; } };
            const safeAttr = (name,val) => `[${name.replace(/:/g,'\\3a ')}="${CSS?.escape?.(val)||val.replace(/"/g,'\\"')}"]`;

            if (el.hasAttribute('data-tour')) { const s = tryUnique(`[data-tour="${el.getAttribute('data-tour')}"]`); if (s) return s; }
            if (el.id) { const s = tryUnique(`#${CSS?.escape?.(el.id)||el.id}`); if (s) return s; }
            if (el.hasAttribute('wire:key')) { const s = tryUnique(safeAttr('wire:key',el.getAttribute('wire:key'))); if (s) return s; }

            const parts = []; let curr = el;
            while (curr && curr !== document.body && parts.length < 5) {
                let tag = curr.tagName.toLowerCase(), step = tag;
                if (curr.id) step = `#${CSS?.escape?.(curr.id)||curr.id}`;
                else if (curr.hasAttribute('wire:key')) step = safeAttr('wire:key',curr.getAttribute('wire:key'));
                else if (curr.hasAttribute('data-tour')) step = `[data-tour="${curr.getAttribute('data-tour')}"]`;
                else {
                    const parent = curr.parentElement;
                    if (['tr','td','th','li'].includes(tag) && parent) { const sibs = Array.from(parent.children); if (sibs.length>1) step += `:nth-child(${sibs.indexOf(curr)+1})`; }
                    else if (curr.className && typeof curr.className === 'string') {
                        const cls = curr.className.split(' ').filter(c => c && !c.includes(':') && !c.startsWith('hover') && !c.startsWith('dark') && !c.startsWith('focus')).slice(0,2);
                        if (cls.length) step += '.' + cls.map(c => CSS?.escape?.(c)||c).join('.');
                        if (parent) { const same = Array.from(parent.children).filter(c => c.tagName === curr.tagName); if (same.length>1) step += `:nth-child(${Array.from(parent.children).indexOf(curr)+1})`; }
                    } else if (parent) step += `:nth-child(${Array.from(parent.children).indexOf(curr)+1})`;
                }
                parts.unshift(step);
                const candidate = parts.join(' > ');
                try { const m = document.querySelectorAll(candidate); if (m.length === 1 && m[0] === el) return candidate; } catch(e){}
                curr = curr.parentElement;
            }
            return parts.join(' > ');
        },

        getHierarchyBreadcrumbs(el) {
            const crumbs = []; let curr = el;
            while (curr && curr !== document.body && crumbs.length < 4) {
                crumbs.unshift({ element:curr, label: curr.tagName.toLowerCase() + (curr.id ? `#${curr.id}` : (curr.className && typeof curr.className === 'string' ? '.'+curr.className.split(' ')[0] : '')) });
                curr = curr.parentElement;
            }
            return crumbs;
        },

        // ── Step Builder Modal ──
        openStepBuilderModal(targetEl, editingIndex = null) {
            this.removeInspectorOutline();
            document.getElementById('tour-builder-modal')?.remove();
            const isEditing = editingIndex !== null;
            const existing = isEditing ? this.draftSteps[editingIndex] : null;
            const selector = existing ? existing.element_selector : this.generateSelector(targetEl);
            const textContent = existing ? existing.target_text : (targetEl.innerText||targetEl.textContent||'').trim().substring(0,30);
            const breadcrumbs = this.getHierarchyBreadcrumbs(targetEl);
            const defaultLoc = this.config.default_locale || 'en';
            const rawLocales = this.config.locales?.length ? this.config.locales : ['it','en'];
            const locales = [defaultLoc, ...rawLocales.filter(l => l !== defaultLoc)];
            const getLocVal = (obj,loc) => { if (!obj) return ''; if (typeof obj==='string') return loc===locales[0]?obj:''; return obj?.[loc]||''; };

            const modal = document.createElement('div');
            modal.id = 'tour-builder-modal';
            modal.className = 'tour-modal-overlay';

            const crumbsHtml = breadcrumbs.map((b,i) => `<span class="tour-breadcrumb-chip ${i===breadcrumbs.length-1?'active':''}" data-crumb-idx="${i}">${b.label}</span>`).join(' <span class="text-zinc-600">/</span> ');
            const langTabs = locales.map(loc => `<button type="button" class="tour-lang-tab-pill ${loc===defaultLoc?'active':''}" data-loc="${loc}"><span class="uppercase font-bold">${loc.toUpperCase()}</span>${loc===defaultLoc ? '<span class="tour-lang-default-badge">★</span>' : ''}</button>`).join('');
            const langPanels = locales.map(loc => `<div class="tour-lang-panel ${loc===locales[0]?'':'hidden'}" data-loc-panel="${loc}"><div style="display:flex;flex-direction:column;gap:12px"><div><label class="tour-label">${t('step_title_label','Title')} (${loc.toUpperCase()})</label><input type="text" data-field="title" data-loc="${loc}" value="${getLocVal(existing?.title_i18n||existing?.title,loc)}" placeholder="${t('step_title_label','Title')} ${loc.toUpperCase()}" class="tour-input"/></div><div><label class="tour-label">${t('step_content_label','Description')} (${loc.toUpperCase()})</label><textarea data-field="description" data-loc="${loc}" rows="3" placeholder="${t('step_content_label','Description')} ${loc.toUpperCase()}" class="tour-textarea">${getLocVal(existing?.description_i18n||existing?.description,loc)}</textarea></div><div><label class="tour-label">${t('media_url_label','Media URL')} (${loc.toUpperCase()})</label><input type="text" data-field="video_url" data-loc="${loc}" value="${getLocVal(existing?.video_url_i18n||existing?.video_url||existing?.media_url,loc)}" placeholder="https://..." class="tour-input"/></div></div></div>`).join('');
            const sizeOpt = (v,l) => `<option value="${v}" ${existing?.card_size===v||(!existing?.card_size&&v==='md')?'selected':''}>${l}</option>`;

            modal.innerHTML = `<div class="tour-modal-card"><h3 class="text-lg font-bold mb-2">${isEditing?`${t('modal_title_edit','Edit Step')} #${editingIndex+1}`:t('add_step_to_tour','Add step')}</h3><div style="margin-bottom:16px"><label class="tour-label" style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;opacity:0.7">${t('element_hierarchy','Element')}</label><div class="tour-breadcrumb-bar" id="tour-crumb-bar">${crumbsHtml}</div></div><div style="display:flex;flex-direction:column;gap:14px"><div style="display:grid;grid-template-columns:2fr 1fr;gap:12px"><div><label class="tour-label">${t('step_target_label','CSS Selector')}</label><input type="text" id="step-selector-input" value="${selector}" class="tour-input" style="font-family:monospace;color:var(--tour-text-main);font-weight:700"/></div><div><label class="tour-label">${t('card_size_label','Card Size')}</label><select id="step-card-size-input" class="tour-select">${sizeOpt('sm',t('size_sm','Small'))}${sizeOpt('md',t('size_md','Standard'))}${sizeOpt('lg',t('size_lg','Medium'))}${sizeOpt('xl',t('size_xl','Wide'))}</select></div></div><div><label class="tour-label" style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;opacity:0.7;margin-bottom:6px">Language / Lingua</label><div class="tour-lang-tab-container">${langTabs}</div></div><div>${langPanels}</div><span style="font-size:10px;opacity:0.7;margin-top:-4px;display:block">${t('media_help_text','Images or videos.')}</span></div><div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:24px;padding-top:16px;border-top:1px solid var(--tour-border-color)"><button id="modal-cancel-btn" class="tour-btn tour-btn-ghost">${t('cancel','Cancel')}</button><button id="modal-add-step-btn" class="tour-btn tour-btn-accent">${isEditing?t('save_changes','Save'):t('add_step','Add step')}</button></div></div>`;
            document.body.appendChild(modal);

            modal.querySelectorAll('.tour-lang-tab-pill').forEach(btn => btn.onclick = () => { modal.querySelectorAll('.tour-lang-tab-pill').forEach(b => b.classList.remove('active')); btn.classList.add('active'); modal.querySelectorAll('.tour-lang-panel').forEach(p => p.classList.toggle('hidden', p.dataset.locPanel !== btn.dataset.loc)); });
            modal.querySelectorAll('.tour-breadcrumb-chip').forEach(chip => chip.onclick = () => { const tgt = breadcrumbs[parseInt(chip.dataset.crumbIdx)].element; this.selectedElement = tgt; document.getElementById('step-selector-input').value = this.generateSelector(tgt); this.showOutline(tgt); modal.querySelectorAll('.tour-breadcrumb-chip').forEach(c => c.classList.remove('active')); chip.classList.add('active'); });
            document.getElementById('modal-cancel-btn').onclick = () => { modal.remove(); this.removeInspectorOutline(); };
            document.getElementById('modal-add-step-btn').onclick = () => {
                const titleObj={}, descObj={}, mediaObj={};
                locales.forEach(loc => { titleObj[loc] = modal.querySelector(`[data-field="title"][data-loc="${loc}"]`)?.value.trim()||''; descObj[loc] = modal.querySelector(`[data-field="description"][data-loc="${loc}"]`)?.value.trim()||''; mediaObj[loc] = modal.querySelector(`[data-field="video_url"][data-loc="${loc}"]`)?.value.trim()||''; });
                const stepObj = { element_selector:document.getElementById('step-selector-input').value, target_text:textContent, title:titleObj, description:descObj, video_url:mediaObj, media_url:mediaObj, title_i18n:titleObj, description_i18n:descObj, video_url_i18n:mediaObj, card_size:document.getElementById('step-card-size-input').value||'md', position:'auto', sort_order:isEditing?existing.sort_order:this.draftSteps.length+1 };
                if (isEditing) { this.draftSteps[editingIndex] = stepObj; this.showToast(t('step_updated','Step updated'),'success'); }
                else { this.draftSteps.push(stepObj); this.showToast(t('step_added','Step added'),'success'); }
                modal.remove(); this.removeInspectorOutline(); this.renderInspectorBar();
            };
        },

        findByTextContent(text) {
            for (const el of document.querySelectorAll('button, a, h1, h2, h3, h4, span, p, td, th')) { if (el.innerText?.trim().includes(text.trim())) return el; }
            return null;
        },

        testSingleStep(index) {
            const step = this.draftSteps?.[index];
            if (!step) return;
            const targetEl = this._findStepTarget(step);
            if (!targetEl) { this.showToast(t('test_step_error','Element not found'),'error'); return; }
            this.closeStepManagerDrawer(); this.applyThemeVariables(this.themeSettings);
            targetEl.scrollIntoView({ behavior:'smooth', block:'center', inline:'center' });
            setTimeout(() => { this.updateSpotlight(targetEl); this._renderPopoverCard(targetEl, step, index, this.draftSteps.length, 'preview'); }, 250);
        }
    };

    // ── Global Event Delegation ──
    if (!window.__tour_listeners_bound) {
        window.__tour_listeners_bound = true;
        document.addEventListener('click', function (e) {
            const mediaBtn = e.target.closest('.tour-media-expand-btn') || e.target.closest('.tour-media-trigger');
            if (mediaBtn) { e.preventDefault(); e.stopPropagation(); window.LaravelOnboardingTour?.openMediaLightbox(mediaBtn.dataset.mediaUrl); return; }
            if (e.target.closest('#tour-start-btn')) { e.preventDefault(); e.stopPropagation(); window.LaravelOnboardingTour?.startTour(); return; }
            if (e.target.closest('#tour-admin-toggle-btn')) { e.preventDefault(); e.stopPropagation(); window.LaravelOnboardingTour?.toggleInspectorMode(); return; }
        });

        let reinitPending = false;
        function autoReinit() {
            if (reinitPending) return; reinitPending = true;
            const route = window.location.pathname;
            fetch(`/api/onboarding-tour/config?route_name=${encodeURIComponent(route)}`)
                .then(r => r.json()).then(data => { reinitPending = false; if (data && window.LaravelOnboardingTour) window.LaravelOnboardingTour.init({ route_name:route, tour:data.tour, global_theme:data.global_theme, translations:data.translations||window.LaravelOnboardingTour.config?.translations, locales:data.locales, current_locale:data.current_locale }); })
                .catch(e => { reinitPending = false; console.error('[OnboardingTour] Re-init error:', e); });
        }
        document.addEventListener('livewire:navigated', autoReinit);
        document.addEventListener('livewire:initialized', autoReinit);
    }
})();
