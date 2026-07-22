/**
 * Laravel Onboarding Tour Engine & Admin Inspector
 * Group Tecno / Tecnovat
 */

(function () {
    // Minimalist SVG Icons
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

    function t(key, fallback) {
        if (window.LaravelOnboardingTour && window.LaravelOnboardingTour.config && window.LaravelOnboardingTour.config.translations) {
            const val = window.LaravelOnboardingTour.config.translations[key];
            if (val) return val;
        }
        return fallback !== undefined ? fallback : key;
    }

    function safeAttrSelector(attrName, attrVal) {
        const escapedAttr = attrName.replace(/:/g, '\\3a ');
        const escapedVal = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(attrVal) : attrVal.replace(/"/g, '\\"');
        return `[${escapedAttr}="${escapedVal}"]`;
    }

    function hexToRgba(hex, opacityPercent) {
        let cleanHex = (hex || '#0f172a').replace('#', '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(c => c + c).join('');
        }
        const r = parseInt(cleanHex.substring(0, 2), 16) || 15;
        const g = parseInt(cleanHex.substring(2, 4), 16) || 23;
        const b = parseInt(cleanHex.substring(4, 6), 16) || 42;
        const alpha = ((opacityPercent !== undefined ? opacityPercent : 75) / 100).toFixed(2);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function sanitizeUrl(url) {
        if (!url || typeof url !== 'string') return '';
        const trimmed = url.trim();
        if (/^https:\/\//i.test(trimmed) || /^\//.test(trimmed) || /^data:image\/(png|jpg|jpeg|gif|webp|svg\+xml);base64,/i.test(trimmed)) {
            return trimmed;
        }
        if (/^http:\/\//i.test(trimmed)) {
            return trimmed.replace(/^http:\/\//i, 'https://');
        }
        return '';
    }

    function formatMediaHtml(url) {
        const cleanUrl = sanitizeUrl(url);
        if (!cleanUrl) return '';

        const expandBtnHtml = `
            <button type="button" class="tour-media-expand-btn" title="${t('expand_media', 'Expand full screen')}" data-media-url="${cleanUrl}">
                ${SVG.expand}
                <span>${t('expand_media', 'Expand')}</span>
            </button>
        `;

        // 1. Image formats check (.jpg, .jpeg, .png, .gif, .webp, .svg or data:image)
        if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl) || cleanUrl.startsWith('data:image/')) {
            return `<div class="tour-media-container group cursor-pointer tour-media-trigger" data-media-url="${cleanUrl}">
                        <img src="${cleanUrl}" class="tour-media-preview-img" alt="Step Media" />
                        ${expandBtnHtml}
                    </div>`;
        }

        // 2. Direct video file (.mp4, .webm, .ogg)
        if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
            return `<div class="tour-media-container group cursor-pointer tour-media-trigger" data-media-url="${cleanUrl}">
                        <video src="${cleanUrl}" controls class="tour-media-preview-video"></video>
                        ${expandBtnHtml}
                    </div>`;
        }

        // 3. YouTube / Vimeo URL embed converter
        let embedUrl = cleanUrl;
        if (cleanUrl.includes('youtube.com/watch')) {
            const match = cleanUrl.match(/[?&]v=([^&]+)/);
            if (match && match[1]) {
                embedUrl = `https://www.youtube.com/embed/${match[1]}`;
            }
        } else if (cleanUrl.includes('youtu.be/')) {
            const match = cleanUrl.match(/youtu\.be\/([^?&]+)/);
            if (match && match[1]) {
                embedUrl = `https://www.youtube.com/embed/${match[1]}`;
            }
        } else if (cleanUrl.includes('vimeo.com/')) {
            const match = cleanUrl.match(/vimeo\.com\/(\d+)/);
            if (match && match[1]) {
                embedUrl = `https://player.vimeo.com/video/${match[1]}`;
            }
        }

        return `<div class="tour-media-container group aspect-video bg-black">
                    <iframe src="${embedUrl}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    ${expandBtnHtml}
                </div>`;
    }

    const ShortcutsModule = {
        isOpen: false,
        previousActiveElement: null,
        _bound: false,

        bindGlobalKeydown: function () {
            if (this._bound) return;
            this._bound = true;

            document.addEventListener('keydown', (e) => {
                const activeEl = document.activeElement;
                const activeTag = activeEl ? activeEl.tagName.toLowerCase() : '';
                const isTyping =
                    activeTag === 'input' ||
                    activeTag === 'textarea' ||
                    activeTag === 'select' ||
                    (activeEl && activeEl.isContentEditable);

                // 1. Save Tour Shortcut (Ctrl+S / Cmd+S in Builder Mode)
                if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                    if (window.LaravelOnboardingTour && window.LaravelOnboardingTour.inspectorActive) {
                        e.preventDefault();
                        window.LaravelOnboardingTour.saveTourDraft();
                        return;
                    }
                }

                // 2. Alt+B: Toggle Builder Mode anytime
                if (e.altKey && (e.key === 'b' || e.key === 'B')) {
                    e.preventDefault();
                    if (window.LaravelOnboardingTour && typeof window.LaravelOnboardingTour.toggleInspectorMode === 'function') {
                        window.LaravelOnboardingTour.toggleInspectorMode();
                    }
                    return;
                }

                if (isTyping) {
                    return; // Allow normal typing in input/textarea/select
                }

                // 3. Toggle Shortcuts Palette Modal (`?` or `Shift + /`)
                if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
                    e.preventDefault();
                    this.toggleShortcutsModal();
                    return;
                }

                // 4. ESC Key: Close Palette Modal, Edit/Confirm Modals, Drawer, Active Tour, or Exit Builder Mode
                if (e.key === 'Escape') {
                    if (this.isOpen) {
                        this.toggleShortcutsModal(false);
                        return;
                    }
                    const editModal = document.getElementById('tour-step-edit-modal');
                    if (editModal) {
                        editModal.remove();
                        if (window.LaravelOnboardingTour) window.LaravelOnboardingTour.removeInspectorOutline();
                        return;
                    }
                    const confirmModal = document.getElementById('tour-confirm-modal');
                    if (confirmModal) {
                        confirmModal.remove();
                        return;
                    }
                    const drawer = document.getElementById('tour-inspector-drawer');
                    if (drawer && drawer.classList.contains('open')) {
                        if (window.LaravelOnboardingTour) window.LaravelOnboardingTour.closeStepManagerDrawer();
                        return;
                    }
                    if (window.LaravelOnboardingTour && window.LaravelOnboardingTour.isTourActive()) {
                        window.LaravelOnboardingTour.closeTour(false, true);
                        return;
                    }
                    if (window.LaravelOnboardingTour && window.LaravelOnboardingTour.inspectorActive) {
                        window.LaravelOnboardingTour.toggleInspectorMode();
                        return;
                    }
                }

                // 5. Active Tour Navigation Hotkeys
                if (window.LaravelOnboardingTour && window.LaravelOnboardingTour.isTourActive()) {
                    if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
                        e.preventDefault();
                        window.LaravelOnboardingTour.nextStep();
                        return;
                    } else if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'H') {
                        e.preventDefault();
                        window.LaravelOnboardingTour.prevStep();
                        return;
                    } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.LaravelOnboardingTour.nextStep();
                        return;
                    }
                }

                // 6. Active Builder Mode Hotkeys
                if (window.LaravelOnboardingTour && window.LaravelOnboardingTour.inspectorActive) {
                    if (e.key === 's' || e.key === 'S') {
                        e.preventDefault();
                        window.LaravelOnboardingTour.activeDrawerTab = 'steps';
                        window.LaravelOnboardingTour.openStepManagerDrawer();
                        return;
                    } else if (e.key === 't' || e.key === 'T') {
                        e.preventDefault();
                        window.LaravelOnboardingTour.activeDrawerTab = 'theme';
                        window.LaravelOnboardingTour.openStepManagerDrawer();
                        return;
                    } else if (e.key === 'b' || e.key === 'B') {
                        e.preventDefault();
                        window.LaravelOnboardingTour.toggleInspectorMode();
                        return;
                    }
                }
            });
        },

        toggleShortcutsModal: function (forceState) {
            this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
            let modal = document.getElementById('tour-shortcuts-modal');

            if (!this.isOpen) {
                if (modal) modal.remove();
                if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
                    this.previousActiveElement.focus();
                    this.previousActiveElement = null;
                }
                return;
            }

            this.previousActiveElement = document.activeElement;

            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'tour-shortcuts-modal';
                modal.className = 'tour-shortcuts-modal';
                modal.setAttribute('role', 'dialog');
                modal.setAttribute('aria-modal', 'true');
                modal.setAttribute('aria-label', t('shortcuts_title', 'Keyboard Shortcuts'));

                modal.innerHTML = `
                    <div class="tour-modal-card tour-shortcuts-card animate-scale-in" style="max-width: 440px;">
                        <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-700 mb-3">
                            <div class="flex items-center gap-2">
                                <span class="text-blue-500">${SVG.keyboard || '⌨️'}</span>
                                <h3 class="text-sm font-bold">${t('shortcuts_title', 'Keyboard Shortcuts')}</h3>
                            </div>
                            <button id="tour-shortcuts-close-btn" class="tour-btn-icon" aria-label="${t('close', 'Close')}">
                                ${SVG.close}
                            </button>
                        </div>

                        <!-- Active Tour Navigation Shortcuts -->
                        <div class="mb-4">
                            <div class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">${t('shortcut_section_tour', 'Tour Navigation')}</div>
                            <div class="space-y-2 text-xs">
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_next', 'Next Step')}</span>
                                    <div class="flex items-center gap-1">
                                        <kbd class="tour-kbd">→</kbd>
                                        <span class="text-zinc-400 text-[10px]">${t('or', 'or')}</span>
                                        <kbd class="tour-kbd">Space</kbd>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_prev', 'Previous Step')}</span>
                                    <kbd class="tour-kbd">←</kbd>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_finish', 'Finish Tour')}</span>
                                    <kbd class="tour-kbd">Enter</kbd>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_close', 'Dismiss / Exit')}</span>
                                    <kbd class="tour-kbd">ESC</kbd>
                                </div>
                            </div>
                        </div>

                        <!-- Builder Mode Shortcuts -->
                        <div class="mb-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                            <div class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">${t('shortcut_section_builder', 'Builder Mode')}</div>
                            <div class="space-y-2 text-xs">
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_toggle_builder', 'Toggle Builder')}</span>
                                    <div class="flex items-center gap-1">
                                        <kbd class="tour-kbd">Alt</kbd>
                                        <span class="text-zinc-400 text-[10px]">+</span>
                                        <kbd class="tour-kbd">B</kbd>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_open_steps', 'Steps Drawer')}</span>
                                    <kbd class="tour-kbd">S</kbd>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_open_theme', 'Theme Settings')}</span>
                                    <kbd class="tour-kbd">T</kbd>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="text-zinc-600 dark:text-zinc-300 font-medium">${t('shortcut_save_tour', 'Save Tour')}</span>
                                    <div class="flex items-center gap-1">
                                        <kbd class="tour-kbd">Ctrl</kbd>
                                        <span class="text-zinc-400 text-[10px]">+</span>
                                        <kbd class="tour-kbd">S</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <span class="text-[10px] text-zinc-400 font-mono">${t('shortcut_toggle', 'Toggle Shortcuts')}: <kbd class="tour-kbd" style="font-size: 9px; min-width: 18px; height: 18px; padding: 0 4px;">?</kbd></span>
                            <button id="tour-shortcuts-ok-btn" class="tour-btn tour-btn-accent text-xs px-4 py-1.5">${t('close', 'Close')}</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                const closeBtn = document.getElementById('tour-shortcuts-close-btn');
                const okBtn = document.getElementById('tour-shortcuts-ok-btn');

                if (closeBtn) closeBtn.onclick = () => this.toggleShortcutsModal(false);
                if (okBtn) {
                    okBtn.onclick = () => this.toggleShortcutsModal(false);
                    setTimeout(() => okBtn.focus(), 50);
                }

                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                        if (focusables.length === 0) return;
                        const firstEl = focusables[0];
                        const lastEl = focusables[focusables.length - 1];

                        if (e.shiftKey) {
                            if (document.activeElement === firstEl) {
                                lastEl.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastEl) {
                                firstEl.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            }
        }
    };

    window.LaravelOnboardingTour = {
        config: null,
        currentTour: null,
        globalTheme: null,
        currentStepIndex: 0,
        inspectorActive: false,
        hoveredElement: null,
        selectedElement: null,
        draftSteps: [],
        activeDrawerTab: 'steps',
        _lastToggleTime: 0,

        isTourActive: function () {
            return document.getElementById('tour-popover-card') !== null;
        },

        nextStep: function () {
            if (!this.currentTour || !this.currentTour.steps) return;
            if (this.currentStepIndex < this.currentTour.steps.length - 1) {
                this.currentStepIndex++;
                this.renderStep(this.currentStepIndex);
            } else {
                this.closeTour(true);
            }
        },

        prevStep: function () {
            if (!this.currentTour || !this.currentTour.steps) return;
            if (this.currentStepIndex > 0) {
                this.currentStepIndex--;
                this.renderStep(this.currentStepIndex);
            }
        },

        toggleShortcutsModal: function (forceState) {
            ShortcutsModule.toggleShortcutsModal(forceState);
        },

        themeSettings: {
            use_custom_theme: false,
            card_style: 'auto',              // 'auto', 'glass', 'dark', 'light'
            card_size: 'md',                 // 'sm' (320px), 'md' (380px), 'lg' (460px), 'xl' (560px)
            accent_color: '#2563eb',         // Hex accent color
            highlight_style: 'minimal',      // 'minimal', 'ring', 'glow', 'dashed', 'none'
            backdrop_hex: '#0f172a',         // Hex backdrop base color
            backdrop_opacity: 75,            // Opacity percentage (20 to 95)
            backdrop_color: 'rgba(15, 23, 42, 0.75)'
        },

        init: function (configData) {
            this.config = configData || {};
            this.globalTheme = this.config.global_theme || {
                use_custom_theme: false,
                card_style: 'auto',
                card_size: 'md',
                accent_color: '#2563eb',
                highlight_style: 'minimal',
                backdrop_hex: '#0f172a',
                backdrop_opacity: 75,
                backdrop_color: 'rgba(15, 23, 42, 0.75)'
            };

            this.currentTour = this.config.tour || null;
            this.draftSteps = this.currentTour ? [...(this.currentTour.steps || [])] : [];

            if (this.currentTour && this.currentTour.theme_settings) {
                const useCustom = !!this.currentTour.theme_settings.use_custom_theme;
                if (useCustom) {
                    this.themeSettings = { ...this.globalTheme, ...this.currentTour.theme_settings };
                } else {
                    this.themeSettings = { ...this.globalTheme, use_custom_theme: false };
                }
            } else {
                this.themeSettings = { ...this.globalTheme, use_custom_theme: false };
            }

            this.applyThemeVariables(this.themeSettings);

            ShortcutsModule.bindGlobalKeydown();

            if (this.currentTour && this.currentTour.should_auto_start && this.currentTour.steps && this.currentTour.steps.length > 0) {
                setTimeout(() => this.startTour(), 600);
            }
        },

        applyThemeVariables: function (settings) {
            const root = document.documentElement;
            const accent = settings.accent_color || '#2563eb';
            const backdrop = settings.backdrop_color || hexToRgba(settings.backdrop_hex || '#0f172a', settings.backdrop_opacity || 75);

            root.style.setProperty('--tour-accent-color', accent);
            root.style.setProperty('--tour-accent-light', accent + '1e');
            root.style.setProperty('--tour-backdrop-bg', backdrop);
        },

        // ── Custom Styled Toasts & Confirmation Modals ──
        showToast: function (message, type = 'info') {
            let container = document.getElementById('tour-toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'tour-toast-container';
                container.className = 'tour-toast-container';
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            toast.className = 'tour-toast';

            const iconSvg = type === 'success' ? SVG.check : (type === 'error' ? SVG.alert : SVG.info);
            toast.innerHTML = `<span>${iconSvg}</span> <span>${message}</span>`;

            container.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-10px)';
                toast.style.transition = 'all 0.2s ease';
                setTimeout(() => toast.remove(), 200);
            }, 3200);
        },

        showConfirmModal: function (title, message, onConfirm) {
            let old = document.getElementById('tour-confirm-modal');
            if (old) old.remove();

            const modal = document.createElement('div');
            modal.id = 'tour-confirm-modal';
            modal.className = 'tour-confirm-modal p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
            modal.innerHTML = `
                <div class="tour-modal-card" style="max-width: 400px;">
                    <h3 class="text-base font-bold mb-2">${title}</h3>
                    <p class="text-xs opacity-80 mb-6 leading-relaxed">${message}</p>
                    <div class="flex items-center justify-end gap-2">
                        <button id="tour-confirm-cancel" class="tour-btn tour-btn-ghost">${t('cancel', 'Cancel')}</button>
                        <button id="tour-confirm-ok" class="tour-btn tour-btn-accent">${t('confirm', 'Confirm')}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            document.getElementById('tour-confirm-cancel').onclick = () => modal.remove();
            document.getElementById('tour-confirm-ok').onclick = () => {
                modal.remove();
                if (typeof onConfirm === 'function') onConfirm();
            };
        },

        // ── Fullscreen Media Lightbox ──
        openMediaLightbox: function (url) {
            let modal = document.getElementById('tour-media-lightbox-modal');
            if (modal) modal.remove();

            const cleanUrl = (url || '').trim();
            if (!cleanUrl) return;

            modal = document.createElement('div');
            modal.id = 'tour-media-lightbox-modal';
            modal.className = 'tour-media-lightbox-modal';

            let contentHtml = '';

            if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl) || cleanUrl.startsWith('data:image/')) {
                contentHtml = `<img src="${cleanUrl}" class="tour-lightbox-content" alt="Expanded Media" />`;
            } else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
                contentHtml = `<video src="${cleanUrl}" controls autoplay class="tour-lightbox-content"></video>`;
            } else {
                let embedUrl = cleanUrl;
                if (cleanUrl.includes('youtube.com/watch')) {
                    const match = cleanUrl.match(/[?&]v=([^&]+)/);
                    if (match && match[1]) embedUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
                } else if (cleanUrl.includes('youtu.be/')) {
                    const match = cleanUrl.match(/youtu\.be\/([^?&]+)/);
                    if (match && match[1]) embedUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
                } else if (cleanUrl.includes('vimeo.com/')) {
                    const match = cleanUrl.match(/vimeo\.com\/(\d+)/);
                    if (match && match[1]) embedUrl = `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
                }

                contentHtml = `
                    <div style="width: 85vw; max-width: 1000px; aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; background: #000; box-shadow: 0 25px 60px rgba(0,0,0,0.8);">
                        <iframe src="${embedUrl}" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
            }

            modal.innerHTML = `
                <div style="position: relative; display: flex; align-items: center; justify-content: center; max-width: 95vw; max-height: 90vh;">
                    <button id="tour-lightbox-close" class="tour-lightbox-close-btn" title="${t('close', 'Close')}">
                        ${SVG.close}
                    </button>
                    ${contentHtml}
                </div>
            `;

            document.body.appendChild(modal);

            const closeModal = () => {
                if (modal) modal.remove();
                document.removeEventListener('keydown', handleKey);
            };

            const handleKey = (e) => {
                if (e.key === 'Escape') closeModal();
            };

            document.addEventListener('keydown', handleKey);
            modal.onclick = (e) => {
                if (e.target === modal || e.target.closest('#tour-lightbox-close')) {
                    closeModal();
                }
            };
        },

        // ── Spotlight & Tour Runner ──
        startTour: function () {
            if (!this.currentTour || !this.currentTour.steps || this.currentTour.steps.length === 0) {
                this.showToast(t('no_tour_for_page', 'No tour configured for this page.'), 'info');
                return;
            }

            this.currentStepIndex = 0;
            this.renderStep(this.currentStepIndex);
        },

        renderStep: function (index) {
            const steps = this.currentTour.steps;
            if (index < 0 || index >= steps.length) {
                this.closeTour(true);
                return;
            }

            this.applyThemeVariables(this.themeSettings);

            const step = steps[index];
            let targetEl = null;

            if (step.element_selector) {
                let safeSelector = step.element_selector
                    .replace(/\[wire:key=/g, '[wire\\3a key=')
                    .replace(/\[wire:id=/g, '[wire\\3a id=')
                    .replace(/\[wire:model=/g, '[wire\\3a model=');

                try {
                    targetEl = document.querySelector(safeSelector);
                } catch (err) {
                    console.warn(`[OnboardingTour] Selector error: ${step.element_selector}`, err);
                }
            }

            if (!targetEl && step.target_text) {
                targetEl = this.findByTextContent(step.target_text);
            }

            if (!targetEl) {
                console.warn(`[OnboardingTour] Elemento non trovato: ${step.element_selector}`);
                if (index + 1 < steps.length) {
                    this.renderStep(index + 1);
                } else {
                    this.closeTour(true);
                }
                return;
            }

            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

            setTimeout(() => {
                this.updateSpotlight(targetEl);
                this.renderPopover(targetEl, step, index, steps.length);
            }, 250);
        },

        updateSpotlight: function (targetEl) {
            let mask = document.getElementById('tour-spotlight-mask');
            if (!mask) {
                mask = document.createElement('div');
                mask.id = 'tour-spotlight-mask';
                document.body.appendChild(mask);
            }

            mask.className = `tour-spotlight-mask style-${this.themeSettings.highlight_style || 'minimal'}`;

            const rect = targetEl.getBoundingClientRect();
            mask.style.top = `${rect.top - 6}px`;
            mask.style.left = `${rect.left - 6}px`;
            mask.style.width = `${rect.width + 12}px`;
            mask.style.height = `${rect.height + 12}px`;
        },

        renderPopover: function (targetEl, step, index, total) {
            let popover = document.getElementById('tour-popover-card');
            if (!popover) {
                popover = document.createElement('div');
                popover.id = 'tour-popover-card';
                document.body.appendChild(popover);
            }

            popover.setAttribute('role', 'dialog');
            popover.setAttribute('aria-modal', 'true');
            popover.setAttribute('aria-label', `${step.title} (${index + 1}/${total})`);

            const sizeClass = step.card_size || this.themeSettings.card_size || 'md';
            popover.className = `tour-popover-card card-${this.themeSettings.card_style || 'auto'} size-${sizeClass}`;

            const rect = targetEl.getBoundingClientRect();

            let maxWidth = 380;
            if (sizeClass === 'sm') maxWidth = 320;
            if (sizeClass === 'lg') maxWidth = 460;
            if (sizeClass === 'xl') maxWidth = 560;

            let top = rect.bottom + 12;
            let left = rect.left + rect.width / 2 - (maxWidth / 2);
            left = Math.max(16, Math.min(left, window.innerWidth - maxWidth - 16));

            if (top + 220 > window.innerHeight) {
                top = Math.max(16, rect.top - 220);
            }

            popover.style.top = `${top}px`;
            popover.style.left = `${left}px`;

            const mediaUrl = step.media_url || step.video_url;
            const mediaHtml = formatMediaHtml(mediaUrl);
            const isLastStep = (index === total - 1);

            popover.innerHTML = `
                ${mediaHtml}
                <div class="flex items-center justify-between gap-2 mb-2">
                    <h4 class="font-bold text-base leading-tight">${step.title}</h4>
                    <span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">${index + 1}/${total}</span>
                </div>
                <div class="tour-step-desc text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 font-medium" aria-live="polite">
                    ${step.description}
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div class="flex items-center gap-2">
                        <button id="tour-dismiss-btn" class="text-[11px] font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
                            ${t('dismiss_btn', "Don't show again")}
                        </button>
                        <button id="tour-shortcuts-btn" class="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 p-1 rounded-md transition-colors" title="${t('shortcuts_title', 'Keyboard Shortcuts')}" aria-label="${t('shortcuts_title', 'Keyboard Shortcuts')}">
                            ${SVG.keyboard}
                        </button>
                    </div>
                    <div class="flex items-center gap-1.5">
                        ${index > 0 ? `<button id="tour-prev-btn" class="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">${t('prev_btn', 'Back')}</button>` : ''}
                        <button id="tour-next-btn" class="px-4 py-1.5 rounded-lg tour-btn-accent text-xs font-bold shadow-md">
                            ${isLastStep ? t('finish_btn', 'Finish') : t('next_btn', 'Next')}
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('tour-next-btn')?.addEventListener('click', () => {
                if (index === total - 1) {
                    this.closeTour(true);
                } else {
                    this.currentStepIndex++;
                    this.renderStep(this.currentStepIndex);
                }
            });

            document.getElementById('tour-prev-btn')?.addEventListener('click', () => {
                this.currentStepIndex--;
                this.renderStep(this.currentStepIndex);
            });

            document.getElementById('tour-dismiss-btn')?.addEventListener('click', () => {
                this.closeTour(false, true);
            });

            document.getElementById('tour-shortcuts-btn')?.addEventListener('click', () => {
                this.toggleShortcutsModal();
            });

            popover.onkeydown = (e) => {
                if (e.key === 'Tab') {
                    const focusables = popover.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    if (focusables.length === 0) return;
                    const firstEl = focusables[0];
                    const lastEl = focusables[focusables.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstEl) {
                            lastEl.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastEl) {
                            firstEl.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            setTimeout(() => {
                const nextBtn = document.getElementById('tour-next-btn');
                if (nextBtn) nextBtn.focus();
            }, 50);
        },

        closeTour: function (completed = false, dismissed = false) {
            const mask = document.getElementById('tour-spotlight-mask');
            if (mask) mask.remove();

            const popover = document.getElementById('tour-popover-card');
            if (popover) popover.remove();

            if (this.currentTour && (completed || dismissed)) {
                fetch('/api/onboarding-tour/complete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                    },
                    body: JSON.stringify({
                        tour_id: this.currentTour.id,
                        action: dismissed ? 'dismiss' : 'complete'
                    })
                }).catch(err => console.error(err));
            }
        },

        // ── Admin Inspector & Floating Top Bar ──
        toggleInspectorMode: function () {
            const now = Date.now();
            if (this._lastToggleTime && (now - this._lastToggleTime) < 350) {
                return; // Ignore duplicate calls within 350ms
            }
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
                const bar = document.getElementById('tour-inspector-bar');
                if (bar) bar.remove();
                this.closeStepManagerDrawer();
                this.removeInspectorOutline();
                if (this._onMouseMove) document.removeEventListener('mousemove', this._onMouseMove);
                if (this._onMouseDown) document.removeEventListener('mousedown', this._onMouseDown, true);
                if (this._onPointerDown) document.removeEventListener('pointerdown', this._onPointerDown, true);
                if (this._onClick) document.removeEventListener('click', this._onClick, true);
                this.showToast(t('builder_disabled', 'Builder Mode disabled'), 'info');
            }
        },

        renderInspectorBar: function () {
            let bar = document.getElementById('tour-inspector-bar');
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'tour-inspector-bar';
                bar.className = 'tour-inspector-bar';
                document.body.appendChild(bar);
            }

            bar.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="tour-inspector-dot-wrapper">
                        <span class="tour-inspector-dot-ping"></span>
                        <span class="tour-inspector-dot-core"></span>
                    </span>
                    <span>${t('builder_mode', 'Builder Mode')}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button id="tour-manage-steps-btn" class="tour-btn tour-btn-ghost">
                        ${SVG.list}
                        <span>${t('manage_steps', 'Steps')}</span>
                    </button>
                    <button id="tour-theme-toggle-btn" class="tour-btn tour-btn-ghost">
                        ${SVG.palette}
                        <span>${t('theme', 'Theme')}</span>
                    </button>
                    <button id="tour-shortcuts-inspector-btn" class="tour-btn tour-btn-ghost">
                        ${SVG.keyboard}
                        <span>${t('shortcuts_btn', 'Shortcuts')}</span>
                    </button>
                    <button id="tour-save-all-btn" class="tour-btn tour-btn-accent">
                        ${SVG.check}
                        <span>${t('save_tour', 'Save tour')}</span>
                    </button>
                    <button id="tour-close-inspector-btn" class="tour-btn tour-btn-ghost">
                        ${SVG.close}
                        <span>${t('exit', 'Exit')}</span>
                    </button>
                </div>
            `;

            document.getElementById('tour-manage-steps-btn').onclick = () => {
                this.activeDrawerTab = 'steps';
                this.openStepManagerDrawer();
            };
            document.getElementById('tour-theme-toggle-btn').onclick = () => {
                this.activeDrawerTab = 'theme';
                this.openStepManagerDrawer();
            };
            document.getElementById('tour-shortcuts-inspector-btn').onclick = () => {
                this.toggleShortcutsModal();
            };
            document.getElementById('tour-save-all-btn').onclick = () => {
                this.showConfirmModal(
                    t('save_tour', 'Save'),
                    t('save_tour_confirm', 'Save tour and visual settings for this page?'),
                    () => this.saveTourDraft()
                );
            };
            document.getElementById('tour-close-inspector-btn').onclick = () => this.toggleInspectorMode();
        },

        // ── Step Manager Side Drawer with Sticky Live Preview & Custom Backdrop Options ──
        openStepManagerDrawer: function () {
            let backdrop = document.getElementById('tour-drawer-backdrop');
            let panel = document.getElementById('tour-drawer-panel');

            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.id = 'tour-drawer-backdrop';
                backdrop.className = 'tour-drawer-backdrop';
                backdrop.onclick = () => this.closeStepManagerDrawer();
                document.body.appendChild(backdrop);
            }

            if (!panel) {
                panel = document.createElement('div');
                panel.id = 'tour-drawer-panel';
                panel.className = 'tour-drawer-panel';
                document.body.appendChild(panel);
            } else {
                panel.style.animation = 'none';
            }

            const isStepsTab = this.activeDrawerTab === 'steps';
            const useCustomTheme = !!this.themeSettings.use_custom_theme;

            let bodyContentHtml = '';

            if (isStepsTab) {
                let stepsListHtml = '';
                if (this.draftSteps.length === 0) {
                    stepsListHtml = `
                        <div class="flex flex-col items-center justify-center p-8 text-center text-zinc-400">
                            <svg class="w-12 h-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">${t('no_steps_title', 'No steps in tour')}</p>
                            <p class="text-xs text-zinc-400 mt-1">${t('no_steps_subtitle', 'Click any element on the page to add the first step.')}</p>
                        </div>
                    `;
                } else {
                    stepsListHtml = this.draftSteps.map((step, idx) => {
                        const hasMedia = !!(step.video_url || step.media_url);
                        return `
                        <div class="tour-drawer-step-item tour-card-box flex items-center justify-between gap-2.5 px-3 py-2.5 hover:border-blue-500/50 transition-all group" draggable="true" data-idx="${idx}">
                            <div class="flex items-center gap-2 flex-shrink-0">
                                <span class="drag-handle p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-grab" title="${t('drag_to_reorder', 'Drag to reorder')}">
                                    ${SVG.grip}
                                </span>
                                <span class="step-num-badge tour-badge-accent w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                                    ${idx + 1}
                                </span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-1.5">
                                    <h5 class="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">${step.title}</h5>
                                    ${hasMedia ? `<span class="inline-flex items-center gap-0.5 text-[9px] font-semibold text-purple-500 bg-purple-500/10 dark:bg-purple-500/20 px-1.5 py-0.5 rounded-full flex-shrink-0" title="${t('media_included', 'Media Included')}">${SVG.media}</span>` : ''}
                                </div>
                                <p class="text-[10px] font-mono text-zinc-400 truncate leading-tight mt-0.5">${step.element_selector}</p>
                            </div>
                            <div class="flex items-center gap-0.5 flex-shrink-0">
                                <button class="tour-test-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30" title="${t('test_step', 'Test highlight')}" data-idx="${idx}">
                                    ${SVG.eye}
                                </button>
                                <button class="tour-edit-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30" title="${t('edit_step', 'Edit step')}" data-idx="${idx}">
                                    ${SVG.pencil}
                                </button>
                                <button class="tour-delete-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" title="${t('delete_step', 'Delete step')}" data-idx="${idx}">
                                    ${SVG.trash}
                                </button>
                            </div>
                        </div>
                    `;
                    }).join('');
                }

                bodyContentHtml = `
                    <div class="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar" id="tour-drawer-steps-list">
                        ${stepsListHtml}
                    </div>
                `;
            } else {
                // Theme Customization Tab: Fixed Live Preview Top + Subtab Controls Bottom
                this.activeThemeSubTab = this.activeThemeSubTab || 'card';
                const activeSubTab = this.activeThemeSubTab;

                const colors = [
                    { name: t('color_blue', 'Blue'), hex: '#2563eb' },
                    { name: t('color_emerald', 'Emerald'), hex: '#10b981' },
                    { name: t('color_purple', 'Purple'), hex: '#7c3aed' },
                    { name: t('color_amber', 'Amber'), hex: '#d97706' },
                    { name: t('color_rose', 'Rose'), hex: '#e11d48' }
                ];

                const colorPillsHtml = colors.map(c => `
                    <button type="button" class="tour-color-pill ${this.themeSettings.accent_color === c.hex ? 'active' : ''}" data-color="${c.hex}">
                        <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${c.hex};"></span>
                        <span>${c.name}</span>
                    </button>
                `).join('');

                const backdropPresets = [
                    { name: t('bg_dark_slate', 'Dark Slate'), hex: '#0f172a' },
                    { name: t('bg_deep_indigo', 'Deep Indigo'), hex: '#1e1b4b' },
                    { name: t('bg_emerald_night', 'Emerald Night'), hex: '#022c22' },
                    { name: t('bg_soft_charcoal', 'Soft Charcoal'), hex: '#334155' }
                ];

                const backdropPillsHtml = backdropPresets.map(b => `
                    <button type="button" class="tour-backdrop-pill ${(this.themeSettings.backdrop_hex || '#0f172a') === b.hex ? 'active' : ''}" data-color="${b.hex}">
                        <span class="w-2.5 h-2.5 rounded-full border border-zinc-500" style="background-color: ${b.hex};"></span>
                        <span>${b.name}</span>
                    </button>
                `).join('');

                bodyContentHtml = `
                    <!-- Sticky Fixed Top Live Preview Header -->
                    <div class="tour-sticky-preview-header">
                        <div class="flex items-center justify-between mb-2">
                            <label class="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                ${t('live_preview', 'Live Preview')}
                            </label>
                        </div>

                        <!-- Live Stage with 100% Faithful Popover Card & Target Preview -->
                        <div class="tour-live-preview-stage" id="tour-live-preview-stage">
                            <!-- Sample Target Highlight -->
                            <div class="tour-preview-sample-target" id="tour-preview-sample-target">
                                ${t('sample_target_element', 'Sample Highlighted Target')}
                            </div>

                            <!-- 100% Faithful Popover Card Sample -->
                            <div class="tour-preview-sample-card tour-popover-card card-${this.themeSettings.card_style || 'auto'} size-${this.themeSettings.card_size || 'md'}" id="tour-preview-sample-card">
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <h4 class="font-bold text-sm leading-tight">${t('sample_title', 'Step Preview Title')}</h4>
                                    <span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">1/3</span>
                                </div>
                                <div class="tour-step-desc text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 font-medium">
                                    ${t('sample_description', 'This card shows the exact appearance users will see during guided navigation.')}
                                </div>
                                <div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <span class="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">${t('dismiss_btn', "Don't show again")}</span>
                                    <div class="flex items-center gap-1">
                                        <button class="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[10px] font-semibold">${t('prev_btn', 'Back')}</button>
                                        <button class="px-3.5 py-1 rounded-lg tour-btn-accent text-[10px] font-bold shadow-md">${t('next_btn', 'Next')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scrollable Controls Section -->
                    <div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                        <!-- Global vs View Dedicated Scope Switcher -->
                        <div class="tour-subnav-bar mb-3">
                            <button type="button" id="theme-scope-global" class="tour-subnav-pill ${!useCustomTheme ? 'active' : ''}">
                                ${SVG.globe}
                                <span>${t('scope_global_btn', 'Global Theme')}</span>
                            </button>
                            <button type="button" id="theme-scope-custom" class="tour-subnav-pill ${useCustomTheme ? 'active' : ''}">
                                ${SVG.page}
                                <span>${t('scope_custom_btn', 'Page Theme')}</span>
                            </button>
                        </div>

                        <!-- Sub-Tabs Bar for Theme Sections -->
                        <div class="tour-subnav-bar mb-4">
                            <button type="button" id="subtab-btn-card" class="tour-subnav-pill ${activeSubTab === 'card' ? 'active' : ''}">
                                ${SVG.card}
                                <span>${t('subtab_card', 'Card')}</span>
                            </button>
                            <button type="button" id="subtab-btn-highlight" class="tour-subnav-pill ${activeSubTab === 'highlight' ? 'active' : ''}">
                                ${SVG.target}
                                <span>${t('subtab_highlight', 'Highlight')}</span>
                            </button>
                            <button type="button" id="subtab-btn-backdrop" class="tour-subnav-pill ${activeSubTab === 'backdrop' ? 'active' : ''}">
                                ${SVG.backdrop}
                                <span>${t('subtab_backdrop', 'Backdrop')}</span>
                            </button>
                        </div>

                        <!-- Custom Controls Container per Active Subtab -->
                        <div id="custom-theme-controls-container">
                            ${activeSubTab === 'card' ? `
                                <!-- 1. Card Settings -->
                                <div class="tour-card-box p-3.5 space-y-3">
                                    <div class="grid grid-cols-2 gap-3">
                                        <div>
                                            <label class="tour-label">${t('card_style_label', 'Card Style')}</label>
                                            <select id="theme-card-style" class="tour-select">
                                                <option value="auto" ${this.themeSettings.card_style === 'auto' ? 'selected' : ''}>${t('style_auto', 'Auto (System)')}</option>
                                                <option value="glass" ${this.themeSettings.card_style === 'glass' ? 'selected' : ''}>${t('style_glass', 'Glassmorphism')}</option>
                                                <option value="dark" ${this.themeSettings.card_style === 'dark' ? 'selected' : ''}>${t('style_dark', 'Dark')}</option>
                                                <option value="light" ${this.themeSettings.card_style === 'light' ? 'selected' : ''}>${t('style_light', 'Light')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="tour-label">${t('card_size_label', 'Card Size')}</label>
                                            <select id="theme-card-size" class="tour-select">
                                                <option value="sm" ${this.themeSettings.card_size === 'sm' ? 'selected' : ''}>${t('size_sm', 'Small')}</option>
                                                <option value="md" ${(this.themeSettings.card_size || 'md') === 'md' ? 'selected' : ''}>${t('size_md', 'Medium')}</option>
                                                <option value="lg" ${this.themeSettings.card_size === 'lg' ? 'selected' : ''}>${t('size_lg', 'Large')}</option>
                                                <option value="xl" ${this.themeSettings.card_size === 'xl' ? 'selected' : ''}>${t('size_xl', 'Extra Large')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Accent Color Section with Border Above -->
                                    <div class="pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60 mt-2">
                                        <label class="tour-label block mb-2.5">${t('accent_color_label', 'Accent Color')}</label>
                                        <div class="flex flex-wrap items-center gap-1.5 mb-3" id="theme-color-pills-box">
                                            ${colorPillsHtml}
                                        </div>
                                        <div class="flex items-center gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 mt-3">
                                            <div class="tour-color-picker-box">
                                                <input type="color" id="theme-color-picker" value="${this.themeSettings.accent_color || '#2563eb'}" class="tour-color-swatch-input" title="${t('color_custom', 'Custom:')}" />
                                                <span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">${t('color_custom', 'Custom:')}</span>
                                            </div>
                                            <div class="flex-1">
                                                <input type="text" id="theme-hex-input" value="${this.themeSettings.accent_color || '#2563eb'}" placeholder="#2563eb" maxlength="7" class="tour-input" style="font-family: monospace; color: var(--tour-text-main); font-weight: 700;" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}

                            ${activeSubTab === 'highlight' ? `
                                <!-- 2. Target Highlight Settings -->
                                <div class="tour-card-box p-4 space-y-2">
                                    <label class="tour-label">${t('highlight_style_label', 'Highlight Style')}</label>
                                    <select id="theme-highlight-style" class="tour-select">
                                        <option value="minimal" ${this.themeSettings.highlight_style === 'minimal' ? 'selected' : ''}>${t('hl_minimal', 'Minimal')}</option>
                                        <option value="ring" ${this.themeSettings.highlight_style === 'ring' ? 'selected' : ''}>${t('hl_ring', 'Ring')}</option>
                                        <option value="glow" ${this.themeSettings.highlight_style === 'glow' ? 'selected' : ''}>${t('hl_glow', 'Glow')}</option>
                                        <option value="dashed" ${this.themeSettings.highlight_style === 'dashed' ? 'selected' : ''}>${t('hl_dashed', 'Dashed')}</option>
                                        <option value="none" ${this.themeSettings.highlight_style === 'none' ? 'selected' : ''}>${t('hl_none', 'None (Spotlight only)')}</option>
                                    </select>
                                </div>
                            ` : ''}

                            ${activeSubTab === 'backdrop' ? `
                                <!-- 3. Backdrop Settings -->
                                <div class="tour-card-box p-4 space-y-4">
                                    <div>
                                        <label class="tour-label block">${t('backdrop_label', 'Background')}</label>
                                        <div class="flex flex-wrap items-center gap-1.5 mb-3">
                                            ${backdropPillsHtml}
                                        </div>
                                        <div class="flex items-center gap-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                            <div class="tour-color-picker-box">
                                                <input type="color" id="theme-backdrop-picker" value="${this.themeSettings.backdrop_hex || '#0f172a'}" class="tour-color-swatch-input" title="${t('backdrop_color_hex', 'Color:')}" />
                                                <span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">${t('backdrop_color_hex', 'Color:')}</span>
                                            </div>
                                            <div class="flex-1">
                                                <input type="text" id="theme-backdrop-hex-input" value="${this.themeSettings.backdrop_hex || '#0f172a'}" placeholder="#0f172a" maxlength="7" class="tour-input" style="font-family: monospace; color: var(--tour-text-main); font-weight: 700;" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                        <div class="flex items-center justify-between mb-1">
                                            <label class="tour-label" style="margin-bottom: 0;">${t('backdrop_opacity', 'Opacity')}</label>
                                            <span class="text-xs font-mono font-bold text-blue-500" id="backdrop-opacity-val">${this.themeSettings.backdrop_opacity || 75}%</span>
                                        </div>
                                        <input type="range" id="theme-backdrop-opacity" min="20" max="95" value="${this.themeSettings.backdrop_opacity || 75}" class="tour-range-slider" />
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }

            const actionBtnText = !isStepsTab
                ? (!useCustomTheme ? t('save_global_theme_btn', 'Save Global Theme') : t('save_custom_theme_btn', 'Save Page Theme'))
                : t('save_changes', 'Save');

            panel.innerHTML = `
                <!-- Header with Tabs -->
                <div class="tour-drawer-header">
                    <div>
                        <h3 class="text-base font-bold">${t('drawer_title', 'Onboarding Tour Editor')}</h3>
                        <p class="text-xs text-zinc-400 mt-0.5">${t('drawer_subtitle', 'Configure steps and visual appearance')}</p>
                    </div>
                    <button id="tour-drawer-close-btn" class="tour-btn-icon">
                        ${SVG.close}
                    </button>
                </div>

                <!-- Tab Navigation Buttons Bar -->
                <div class="tour-drawer-subnav">
                    <button id="tab-btn-steps" class="tour-tab-btn flex-1 justify-center ${isStepsTab ? 'active' : ''}">
                        ${SVG.list}
                        <span>${t('manage_steps', 'Steps')} (${this.draftSteps.length})</span>
                    </button>
                    <button id="tab-btn-theme" class="tour-tab-btn flex-1 justify-center ${!isStepsTab ? 'active' : ''}">
                        ${SVG.palette}
                        <span>${t('theme', 'Theme')}</span>
                    </button>
                </div>

                ${bodyContentHtml}

                <div class="tour-drawer-footer">
                    ${this.currentTour ? `
                        <button id="tour-drawer-delete-tour-btn" class="tour-btn tour-btn-danger">
                            ${SVG.trash}
                            <span>${t('delete_tour', 'Delete tour')}</span>
                        </button>
                    ` : ''}
                    <button id="tour-drawer-save-btn" class="tour-btn tour-btn-accent flex-1">
                        ${actionBtnText}
                    </button>
                </div>
            `;

            // Bind Drawer Tab Switching
            document.getElementById('tab-btn-steps').onclick = () => {
                this.activeDrawerTab = 'steps';
                this.openStepManagerDrawer();
            };
            document.getElementById('tab-btn-theme').onclick = () => {
                this.activeDrawerTab = 'theme';
                this.openStepManagerDrawer();
            };

            document.getElementById('tour-drawer-close-btn').onclick = () => this.closeStepManagerDrawer();
            document.getElementById('tour-drawer-save-btn').onclick = () => {
                if (!isStepsTab && !useCustomTheme) {
                    this.showConfirmModal(
                        t('scope_global', 'Global Theme'),
                        t('save_global_theme_confirm', 'Save as default Global Theme for all tours in the app?'),
                        () => this.saveGlobalThemeDraft()
                    );
                } else {
                    this.closeStepManagerDrawer();
                    this.saveTourDraft();
                }
            };

            const deleteTourBtn = document.getElementById('tour-drawer-delete-tour-btn');
            if (deleteTourBtn) {
                deleteTourBtn.onclick = () => {
                    this.showConfirmModal(
                        t('delete_tour', 'Delete tour'),
                        t('confirm_delete_tour_msg', 'Delete the tour for this page?'),
                        () => this.deleteEntireTour()
                    );
                };
            }

            // Bind Handlers for Theme Customization Tab with Live Preview
            if (!isStepsTab) {
                const updateLivePreviewState = () => {
                    // Recalculate RGBA backdrop color
                    this.themeSettings.backdrop_color = hexToRgba(
                        this.themeSettings.backdrop_hex || '#0f172a',
                        this.themeSettings.backdrop_opacity !== undefined ? this.themeSettings.backdrop_opacity : 75
                    );

                    this.applyThemeVariables(this.themeSettings);

                    const sampleTarget = document.getElementById('tour-preview-sample-target');
                    const sampleCard = document.getElementById('tour-preview-sample-card');
                    const stage = document.getElementById('tour-live-preview-stage');

                    if (stage) {
                        stage.style.background = this.themeSettings.backdrop_color;
                    }

                    if (sampleCard) {
                        sampleCard.className = `tour-preview-sample-card tour-popover-card card-${this.themeSettings.card_style || 'auto'} size-${this.themeSettings.card_size || 'md'}`;
                    }

                    if (sampleTarget) {
                        const isDarkApp = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
                        sampleTarget.style.background = isDarkApp ? '#18181b' : '#ffffff';
                        sampleTarget.style.color = isDarkApp ? '#ffffff' : '#0f172a';
                        sampleTarget.style.border = 'none';
                        sampleTarget.style.boxShadow = 'none';

                        const accent = this.themeSettings.accent_color || '#2563eb';
                        const style = this.themeSettings.highlight_style || 'minimal';

                        if (style === 'minimal') {
                            sampleTarget.style.border = `2px solid ${accent}`;
                            sampleTarget.style.boxShadow = `0 0 15px ${accent}60`;
                        } else if (style === 'ring') {
                            sampleTarget.style.border = `2.5px solid ${accent}`;
                            sampleTarget.style.boxShadow = `0 0 0 4px ${accent}50`;
                        } else if (style === 'glow') {
                            sampleTarget.style.border = `2px solid ${accent}`;
                            sampleTarget.style.boxShadow = `0 0 25px ${accent}`;
                        } else if (style === 'dashed') {
                            sampleTarget.style.border = `2px dashed ${accent}`;
                        }
                    }
                };

                // Initialize Live Preview State
                updateLivePreviewState();

                // Bind Scope Switcher Buttons (Global vs Custom)
                const scopeGlobalBtn = document.getElementById('theme-scope-global');
                const scopeCustomBtn = document.getElementById('theme-scope-custom');

                if (scopeGlobalBtn && scopeCustomBtn) {
                    scopeGlobalBtn.onclick = () => {
                        this.themeSettings = { ...this.globalTheme, use_custom_theme: false };
                        this.openStepManagerDrawer();
                        this.showToast(t('global_theme_enabled', 'Global Theme mode active'), 'info');
                    };

                    scopeCustomBtn.onclick = () => {
                        this.themeSettings.use_custom_theme = true;
                        this.openStepManagerDrawer();
                        this.showToast(t('custom_theme_enabled', 'Custom mode activated'), 'info');
                    };
                }

                // Bind Theme Subtabs
                const subtabCard = document.getElementById('subtab-btn-card');
                const subtabHighlight = document.getElementById('subtab-btn-highlight');
                const subtabBackdrop = document.getElementById('subtab-btn-backdrop');

                if (subtabCard) subtabCard.onclick = () => { this.activeThemeSubTab = 'card'; this.openStepManagerDrawer(); };
                if (subtabHighlight) subtabHighlight.onclick = () => { this.activeThemeSubTab = 'highlight'; this.openStepManagerDrawer(); };
                if (subtabBackdrop) subtabBackdrop.onclick = () => { this.activeThemeSubTab = 'backdrop'; this.openStepManagerDrawer(); };

                const cardStyleSelect = document.getElementById('theme-card-style');
                if (cardStyleSelect) {
                    cardStyleSelect.onchange = (e) => {
                        this.themeSettings.card_style = e.target.value;
                        updateLivePreviewState();
                    };
                }

                const cardSizeSelect = document.getElementById('theme-card-size');
                if (cardSizeSelect) {
                    cardSizeSelect.onchange = (e) => {
                        this.themeSettings.card_size = e.target.value;
                        updateLivePreviewState();
                    };
                }

                const highlightSelect = document.getElementById('theme-highlight-style');
                if (highlightSelect) {
                    highlightSelect.onchange = (e) => {
                        this.themeSettings.highlight_style = e.target.value;
                        updateLivePreviewState();
                    };
                }

                // Accent Color Handlers
                const hexInput = document.getElementById('theme-hex-input');
                const pickerInput = document.getElementById('theme-color-picker');

                const setAccentColor = (hexVal) => {
                    if (/^#[0-9A-F]{6}$/i.test(hexVal)) {
                        this.themeSettings.accent_color = hexVal;
                        if (hexInput && hexInput.value !== hexVal) hexInput.value = hexVal;
                        if (pickerInput && pickerInput.value !== hexVal) pickerInput.value = hexVal;
                        updateLivePreviewState();
                    }
                };

                if (pickerInput) pickerInput.oninput = (e) => setAccentColor(e.target.value);
                if (hexInput) {
                    hexInput.oninput = (e) => {
                        let val = e.target.value.trim();
                        if (!val.startsWith('#')) val = '#' + val;
                        setAccentColor(val);
                    };
                }

                panel.querySelectorAll('.tour-color-pill').forEach(pill => {
                    pill.onclick = () => {
                        const hex = pill.getAttribute('data-color');
                        setAccentColor(hex);

                        panel.querySelectorAll('.tour-color-pill').forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                    };
                });

                // Backdrop Color & Opacity Handlers
                const backdropPicker = document.getElementById('theme-backdrop-picker');
                const backdropHexInput = document.getElementById('theme-backdrop-hex-input');
                const backdropOpacitySlider = document.getElementById('theme-backdrop-opacity');
                const backdropOpacityVal = document.getElementById('backdrop-opacity-val');

                const setBackdropColor = (hexVal) => {
                    if (/^#[0-9A-F]{6}$/i.test(hexVal)) {
                        this.themeSettings.backdrop_hex = hexVal;
                        if (backdropHexInput && backdropHexInput.value !== hexVal) backdropHexInput.value = hexVal;
                        if (backdropPicker && backdropPicker.value !== hexVal) backdropPicker.value = hexVal;
                        updateLivePreviewState();
                    }
                };

                if (backdropPicker) backdropPicker.oninput = (e) => setBackdropColor(e.target.value);
                if (backdropHexInput) {
                    backdropHexInput.oninput = (e) => {
                        let val = e.target.value.trim();
                        if (!val.startsWith('#')) val = '#' + val;
                        setBackdropColor(val);
                    };
                }

                if (backdropOpacitySlider) {
                    backdropOpacitySlider.oninput = (e) => {
                        const opacity = parseInt(e.target.value);
                        this.themeSettings.backdrop_opacity = opacity;
                        if (backdropOpacityVal) backdropOpacityVal.innerText = `${opacity}%`;
                        updateLivePreviewState();
                    };
                }

                panel.querySelectorAll('.tour-backdrop-pill').forEach(pill => {
                    pill.onclick = () => {
                        const hex = pill.getAttribute('data-color');
                        setBackdropColor(hex);

                        panel.querySelectorAll('.tour-backdrop-pill').forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                    };
                });
            } else {
                // Setup HTML5 Drag & Drop In-Place Reordering for Steps Tab
                const listContainer = document.getElementById('tour-drawer-steps-list');
                let draggedItem = null;

                if (listContainer) {
                    listContainer.querySelectorAll('.tour-drawer-step-item').forEach(item => {
                        item.addEventListener('dragstart', (e) => {
                            draggedItem = item;
                            item.classList.add('is-dragging');
                            e.dataTransfer.effectAllowed = 'move';
                        });

                        item.addEventListener('dragend', () => {
                            item.classList.remove('is-dragging');
                            draggedItem = null;

                            const newStepsOrder = [];
                            const DOMItems = Array.from(listContainer.querySelectorAll('.tour-drawer-step-item'));
                            DOMItems.forEach((el, newIdx) => {
                                const originalIdx = parseInt(el.getAttribute('data-idx'));
                                const stepObj = this.draftSteps[originalIdx];
                                stepObj.sort_order = newIdx + 1;
                                newStepsOrder.push(stepObj);
                                el.setAttribute('data-idx', newIdx);

                                const badge = el.querySelector('.step-num-badge');
                                if (badge) badge.innerText = newIdx + 1;
                            });
                            this.draftSteps = newStepsOrder;
                            this.renderInspectorBar();
                            this.showToast(t('step_order_updated', 'Step order updated'), 'success');
                        });

                        item.addEventListener('dragover', (e) => {
                            e.preventDefault();
                            if (!draggedItem || draggedItem === item) return;

                            const rect = item.getBoundingClientRect();
                            const midY = rect.top + rect.height / 2;

                            if (e.clientY < midY) {
                                listContainer.insertBefore(draggedItem, item);
                            } else {
                                listContainer.insertBefore(draggedItem, item.nextSibling);
                            }
                        });
                    });
                }

                // Step Action Buttons Handlers
                panel.querySelectorAll('.tour-test-step-btn').forEach(btn => {
                    btn.onclick = () => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        this.testSingleStep(idx);
                    };
                });

                panel.querySelectorAll('.tour-edit-step-btn').forEach(btn => {
                    btn.onclick = () => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        const step = this.draftSteps[idx];
                        let safeSel = (step.element_selector || '')
                            .replace(/\[wire:key=/g, '[wire\\3a key=')
                            .replace(/\[wire:id=/g, '[wire\\3a id=');
                        let targetEl = null;
                        try {
                            targetEl = document.querySelector(safeSel);
                        } catch (e) { }

                        if (!targetEl && step.target_text) {
                            targetEl = this.findByTextContent(step.target_text);
                        }

                        this.closeStepManagerDrawer();
                        this.openStepBuilderModal(targetEl || document.body, idx);
                    };
                });

                panel.querySelectorAll('.tour-delete-step-btn').forEach(btn => {
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        this.showConfirmModal(
                            t('delete_step', 'Delete step'),
                            t('confirm_delete_step_msg', 'Delete this step?'),
                            () => {
                                this.draftSteps.splice(idx, 1);
                                this.renderInspectorBar();
                                this.openStepManagerDrawer();
                                this.showToast(t('step_deleted_success', 'Step deleted'), 'success');
                            }
                        );
                    };
                });
            }
        },

        closeStepManagerDrawer: function () {
            const backdrop = document.getElementById('tour-drawer-backdrop');
            if (backdrop) backdrop.remove();

            const panel = document.getElementById('tour-drawer-panel');
            if (panel) panel.remove();
        },

        saveGlobalThemeDraft: function () {
            fetch('/api/onboarding-tour/save-global-theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                },
                body: JSON.stringify({
                    theme_settings: this.themeSettings
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.globalTheme = data.global_theme;
                        this.themeSettings = { ...this.globalTheme, use_custom_theme: false };
                        this.applyThemeVariables(this.themeSettings);
                        this.closeStepManagerDrawer();
                        this.showToast(t('global_theme_saved_success', 'Global Theme saved!'), 'success');
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        this.showToast(t('error_saving_global_theme', 'Error saving Global Theme'), 'error');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.showToast(t('error_connection', 'Connection error'), 'error');
                });
        },

        deleteEntireTour: function () {
            const routeName = this.config.route_name || window.location.pathname;

            fetch('/api/onboarding-tour/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                },
                body: JSON.stringify({ route_name: routeName })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.showToast(t('tour_deleted_success', 'Tour deleted'), 'success');
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        this.showToast(t('error_deleting_tour', 'Error deleting tour'), 'error');
                    }
                })
                .catch(err => console.error(err));
        },

        handleInspectorHover: function (e) {
            if (!this.inspectorActive) return;
            const target = e.target;
            if (
                target.closest('#tour-inspector-bar') ||
                target.closest('#tour-builder-modal') ||
                target.closest('#tour-step-edit-modal') ||
                target.closest('#tour-shortcuts-modal') ||
                target.closest('#tour-admin-toggle-btn') ||
                target.closest('#tour-confirm-modal') ||
                target.closest('#tour-drawer-panel') ||
                target.closest('#tour-popover-card') ||
                target.closest('#tour-spotlight-mask') ||
                document.getElementById('tour-shortcuts-modal') ||
                document.getElementById('tour-step-edit-modal')
            ) {
                this.removeInspectorOutline();
                return;
            }

            const drawerOpen = !!document.getElementById('tour-drawer-panel');
            if (drawerOpen) {
                this.removeInspectorOutline();
                return;
            }

            this.hoveredElement = target;
            this.showOutline(target);
        },

        showOutline: function (target) {
            let outline = document.getElementById('tour-inspector-outline');
            if (!outline) {
                outline = document.createElement('div');
                outline.id = 'tour-inspector-outline';
                outline.className = 'tour-inspector-outline';
                document.body.appendChild(outline);
            }

            const rect = target.getBoundingClientRect();
            const selector = this.generateSelector(target);

            outline.style.top = `${rect.top + window.scrollY}px`;
            outline.style.left = `${rect.left + window.scrollX}px`;
            outline.style.width = `${rect.width}px`;
            outline.style.height = `${rect.height}px`;

            let badge = outline.querySelector('.tour-inspector-badge');
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'tour-inspector-badge';
                outline.appendChild(badge);
            }
            badge.innerText = selector;
        },

        _preventNav: function (e) {
            if (!this.inspectorActive) return;
            const target = e.target;
            if (
                target.closest('#tour-inspector-bar') ||
                target.closest('#tour-builder-modal') ||
                target.closest('#tour-step-edit-modal') ||
                target.closest('#tour-shortcuts-modal') ||
                target.closest('#tour-admin-toggle-btn') ||
                target.closest('#tour-confirm-modal') ||
                target.closest('#tour-drawer-panel') ||
                target.closest('#tour-popover-card') ||
                target.closest('#tour-spotlight-mask')
            ) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        },

        removeInspectorOutline: function () {
            const outline = document.getElementById('tour-inspector-outline');
            if (outline) outline.remove();
        },

        handleInspectorClick: function (e) {
            if (!this.inspectorActive) return;
            const target = e.target;
            if (
                target.closest('#tour-inspector-bar') ||
                target.closest('#tour-builder-modal') ||
                target.closest('#tour-step-edit-modal') ||
                target.closest('#tour-shortcuts-modal') ||
                target.closest('#tour-admin-toggle-btn') ||
                target.closest('#tour-confirm-modal') ||
                target.closest('#tour-drawer-panel') ||
                target.closest('#tour-popover-card') ||
                target.closest('#tour-spotlight-mask') ||
                document.getElementById('tour-shortcuts-modal') ||
                document.getElementById('tour-step-edit-modal')
            ) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const drawerOpen = !!document.getElementById('tour-drawer-panel');
            if (drawerOpen) {
                this.closeStepManagerDrawer();
                this.removeInspectorOutline();
                return;
            }

            this.selectedElement = target;
            this.openStepBuilderModal(target);
        },

        generateSelector: function (el) {
            if (!el || el === document.body) return 'body';

            if (el.hasAttribute('data-tour')) {
                const sel = `[data-tour="${el.getAttribute('data-tour')}"]`;
                try { if (document.querySelectorAll(sel).length === 1) return sel; } catch (e) { }
            }

            if (el.id) {
                const sel = `#${typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(el.id) : el.id}`;
                try { if (document.querySelectorAll(sel).length === 1) return sel; } catch (e) { }
            }

            if (el.hasAttribute('wire:key')) {
                const sel = safeAttrSelector('wire:key', el.getAttribute('wire:key'));
                try { if (document.querySelectorAll(sel).length === 1) return sel; } catch (e) { }
            }

            const parts = [];
            let curr = el;

            while (curr && curr !== document.body && parts.length < 5) {
                let tag = curr.tagName.toLowerCase();
                let stepSelector = tag;

                if (curr.id) {
                    stepSelector = `#${typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(curr.id) : curr.id}`;
                    parts.unshift(stepSelector);
                    const candidate = parts.join(' > ');
                    try { if (document.querySelectorAll(candidate).length === 1) return candidate; } catch (e) { }
                    curr = curr.parentElement;
                    continue;
                }

                if (curr.hasAttribute('wire:key')) {
                    stepSelector = safeAttrSelector('wire:key', curr.getAttribute('wire:key'));
                    parts.unshift(stepSelector);
                    const candidate = parts.join(' > ');
                    try { if (document.querySelectorAll(candidate).length === 1) return candidate; } catch (e) { }
                    curr = curr.parentElement;
                    continue;
                }

                if (curr.hasAttribute('data-tour')) {
                    stepSelector = `[data-tour="${curr.getAttribute('data-tour')}"]`;
                    parts.unshift(stepSelector);
                    const candidate = parts.join(' > ');
                    try { if (document.querySelectorAll(candidate).length === 1) return candidate; } catch (e) { }
                    curr = curr.parentElement;
                    continue;
                }

                const parent = curr.parentElement;
                if (tag === 'tr' || tag === 'td' || tag === 'th' || tag === 'li') {
                    if (parent) {
                        const siblings = Array.from(parent.children);
                        if (siblings.length > 1) {
                            const idx = siblings.indexOf(curr) + 1;
                            stepSelector += `:nth-child(${idx})`;
                        }
                    }
                } else if (curr.className && typeof curr.className === 'string') {
                    const cleanClasses = curr.className.split(' ')
                        .filter(c => c && !c.includes(':') && !c.startsWith('hover') && !c.startsWith('dark') && !c.startsWith('focus'))
                        .slice(0, 2);
                    if (cleanClasses.length > 0) {
                        stepSelector += '.' + cleanClasses.map(c => typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(c) : c).join('.');
                    }

                    if (parent) {
                        const sameTagSiblings = Array.from(parent.children).filter(child => child.tagName === curr.tagName);
                        if (sameTagSiblings.length > 1) {
                            const idx = Array.from(parent.children).indexOf(curr) + 1;
                            stepSelector += `:nth-child(${idx})`;
                        }
                    }
                } else if (parent) {
                    const idx = Array.from(parent.children).indexOf(curr) + 1;
                    stepSelector += `:nth-child(${idx})`;
                }

                parts.unshift(stepSelector);

                const candidate = parts.join(' > ');
                try {
                    const matches = document.querySelectorAll(candidate);
                    if (matches.length === 1 && matches[0] === el) {
                        return candidate;
                    }
                } catch (err) { }

                curr = parent;
            }

            return parts.join(' > ');
        },

        getHierarchyBreadcrumbs: function (el) {
            const breadcrumbs = [];
            let curr = el;
            while (curr && curr !== document.body && breadcrumbs.length < 4) {
                breadcrumbs.unshift({
                    element: curr,
                    label: curr.tagName.toLowerCase() + (curr.id ? `#${curr.id}` : (curr.className && typeof curr.className === 'string' ? '.' + curr.className.split(' ')[0] : ''))
                });
                curr = curr.parentElement;
            }
            return breadcrumbs;
        },

        openStepBuilderModal: function (targetEl, editingIndex = null) {
            this.removeInspectorOutline();
            let modal = document.getElementById('tour-builder-modal');
            if (modal) modal.remove();

            const isEditing = editingIndex !== null;
            const existingStep = isEditing ? this.draftSteps[editingIndex] : null;

            const selector = existingStep ? existingStep.element_selector : this.generateSelector(targetEl);
            const textContent = existingStep ? existingStep.target_text : (targetEl.innerText || targetEl.textContent || '').trim().substring(0, 30);
            const breadcrumbs = this.getHierarchyBreadcrumbs(targetEl);

            modal = document.createElement('div');
            modal.id = 'tour-builder-modal';
            modal.className = 'tour-builder-modal p-4 bg-black/60 backdrop-blur-sm animate-fade-in';

            const breadcrumbsHtml = breadcrumbs.map((b, i) => `
                <span class="tour-breadcrumb-chip ${i === breadcrumbs.length - 1 ? 'active' : ''}" data-crumb-idx="${i}">
                    ${b.label}
                </span>
            `).join(' <span class="text-zinc-600">/</span> ');

            const existingMedia = existingStep ? (existingStep.media_url || existingStep.video_url || '') : '';

            modal.innerHTML = `
                <div class="tour-modal-card">
                    <h3 class="text-lg font-bold mb-2">${isEditing ? `${t('modal_title_edit', 'Edit Step')} #${editingIndex + 1}` : t('add_step_to_tour', 'Add step to tour')}</h3>
                    
                    <div style="margin-bottom: 16px;">
                        <label class="tour-label" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7;">${t('element_hierarchy', 'Element hierarchy (click to change)')}</label>
                        <div class="tour-breadcrumb-bar" id="tour-crumb-bar">
                            ${breadcrumbsHtml}
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        <div>
                            <label class="tour-label">${t('step_target_label', 'CSS Selector (Target Element)')}</label>
                            <input type="text" id="step-selector-input" value="${selector}" class="tour-input" style="font-family: monospace; color: var(--tour-text-main); font-weight: 700;" />
                        </div>
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
                            <div>
                                <label class="tour-label">${t('step_title_label', 'Step Title')}</label>
                                <input type="text" id="step-title-input" value="${existingStep ? existingStep.title : ''}" placeholder="E.g. Table filters" class="tour-input" />
                            </div>
                            <div>
                                <label class="tour-label">${t('card_size_label', 'Card Size')}</label>
                                <select id="step-card-size-input" class="tour-select">
                                    <option value="sm" ${existingStep && existingStep.card_size === 'sm' ? 'selected' : ''}>${t('size_sm', 'Compact (320px)')}</option>
                                    <option value="md" ${(!existingStep || !existingStep.card_size || existingStep.card_size === 'md') ? 'selected' : ''}>${t('size_md', 'Standard (380px)')}</option>
                                    <option value="lg" ${existingStep && existingStep.card_size === 'lg' ? 'selected' : ''}>${t('size_lg', 'Medium (460px)')}</option>
                                    <option value="xl" ${existingStep && existingStep.card_size === 'xl' ? 'selected' : ''}>${t('size_xl', 'Wide / Extra-Large (560px)')}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="tour-label">${t('step_content_label', 'Description / Content')}</label>
                            <textarea id="step-desc-input" rows="3" placeholder="Explain what this element does..." class="tour-textarea">${existingStep ? existingStep.description : ''}</textarea>
                        </div>
                        <div>
                            <label class="tour-label">${t('media_url_label', 'Media URL (Image / YouTube / MP4)')}</label>
                            <input type="text" id="step-video-input" value="${existingMedia}" placeholder="E.g. https://.../image.png or YouTube URL" class="tour-input" />
                            <span style="font-size: 10px; opacity: 0.7; margin-top: 4px; display: block;">${t('media_help_text', 'Supports images (.png, .jpg, .gif, .webp) and videos (YouTube, Vimeo, MP4).')}</span>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--tour-border-color);">
                        <button id="modal-cancel-btn" class="tour-btn tour-btn-ghost">${t('cancel', 'Cancel')}</button>
                        <button id="modal-add-step-btn" class="tour-btn tour-btn-accent">${isEditing ? t('save_changes', 'Save changes') : t('add_step', 'Add step')}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelectorAll('.tour-breadcrumb-chip').forEach(chip => {
                chip.onclick = () => {
                    const idx = parseInt(chip.getAttribute('data-crumb-idx'));
                    const target = breadcrumbs[idx].element;
                    this.selectedElement = target;
                    document.getElementById('step-selector-input').value = this.generateSelector(target);
                    this.showOutline(target);

                    modal.querySelectorAll('.tour-breadcrumb-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                };
            });

            document.getElementById('modal-cancel-btn').onclick = () => {
                modal.remove();
                this.removeInspectorOutline();
            };
            document.getElementById('modal-add-step-btn').onclick = () => {
                const mediaVal = document.getElementById('step-video-input').value || null;
                const sizeVal = document.getElementById('step-card-size-input').value || 'md';

                const stepObj = {
                    element_selector: document.getElementById('step-selector-input').value,
                    target_text: textContent,
                    title: document.getElementById('step-title-input').value || 'Step',
                    description: document.getElementById('step-desc-input').value || '',
                    video_url: mediaVal,
                    media_url: mediaVal,
                    card_size: sizeVal,
                    position: 'auto',
                    sort_order: isEditing ? existingStep.sort_order : this.draftSteps.length + 1
                };

                if (isEditing) {
                    this.draftSteps[editingIndex] = stepObj;
                    this.showToast(t('step_updated', 'Step updated'), 'success');
                } else {
                    this.draftSteps.push(stepObj);
                    this.showToast(t('step_added', 'Step added'), 'success');
                }

                modal.remove();
                this.removeInspectorOutline();
                this.renderInspectorBar();
            };
        },

        saveTourDraft: function () {
            if (this.draftSteps.length === 0) {
                this.showToast(t('no_steps_to_save', 'No steps to save'), 'error');
                return;
            }

            const routeName = this.config.route_name || window.location.pathname;

            fetch('/api/onboarding-tour/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                },
                body: JSON.stringify({
                    route_name: routeName,
                    title: `Tour ${routeName}`,
                    description: `Tour guidato per la rotta ${routeName}`,
                    auto_start: true,
                    highlight_theme: this.themeSettings.highlight_style || 'minimal',
                    theme_settings: this.themeSettings,
                    steps: this.draftSteps
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.showToast(t('tour_saved_success', 'Tour saved successfully!'), 'success');
                        setTimeout(() => window.location.reload(), 1200);
                    } else {
                        this.showToast(t('save_error', 'Error saving tour:') + ' ' + (data.error || t('unknown_error', 'unknown')), 'error');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.showToast(t('server_error', 'Server connection error'), 'error');
                });
        },

        findByTextContent: function (text) {
            const elements = document.querySelectorAll('button, a, h1, h2, h3, h4, span, p, td, th');
            for (let el of elements) {
                if (el.innerText && el.innerText.trim().includes(text.trim())) {
                    return el;
                }
            }
            return null;
        },

        testSingleStep: function (index) {
            if (!this.draftSteps || index < 0 || index >= this.draftSteps.length) return;

            const step = this.draftSteps[index];
            let safeSel = (step.element_selector || '')
                .replace(/\[wire:key=/g, '[wire\\3a key=')
                .replace(/\[wire:id=/g, '[wire\\3a id=')
                .replace(/\[wire:model=/g, '[wire\\3a model=');
            let targetEl = null;

            try {
                targetEl = document.querySelector(safeSel);
            } catch (e) {}

            if (!targetEl && step.target_text) {
                targetEl = this.findByTextContent(step.target_text);
            }

            if (!targetEl) {
                this.showToast(t('test_step_error', 'Element not found on page'), 'error');
                return;
            }

            this.closeStepManagerDrawer();
            this.applyThemeVariables(this.themeSettings);

            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

            setTimeout(() => {
                this.updateSpotlight(targetEl);
                this.renderSingleStepTestPopover(targetEl, step, index);
            }, 250);
        },

        renderSingleStepTestPopover: function (targetEl, step, index) {
            let popover = document.getElementById('tour-popover-card');
            if (!popover) {
                popover = document.createElement('div');
                popover.id = 'tour-popover-card';
                document.body.appendChild(popover);
            }

            const sizeClass = step.card_size || this.themeSettings.card_size || 'md';
            popover.className = `tour-popover-card card-${this.themeSettings.card_style || 'auto'} size-${sizeClass}`;

            const rect = targetEl.getBoundingClientRect();
            let maxWidth = 380;
            if (sizeClass === 'sm') maxWidth = 320;
            if (sizeClass === 'lg') maxWidth = 460;
            if (sizeClass === 'xl') maxWidth = 560;

            let top = rect.bottom + 12;
            let left = rect.left + rect.width / 2 - (maxWidth / 2);
            left = Math.max(16, Math.min(left, window.innerWidth - maxWidth - 16));

            if (top + 220 > window.innerHeight) {
                top = Math.max(16, rect.top - 220);
            }

            popover.style.top = `${top}px`;
            popover.style.left = `${left}px`;

            const mediaUrl = step.media_url || step.video_url;
            const mediaHtml = formatMediaHtml(mediaUrl);

            popover.innerHTML = `
                ${mediaHtml}
                <div class="flex items-center justify-between gap-2 mb-2">
                    <h4 class="font-bold text-base leading-tight">${step.title}</h4>
                    <span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">${t('live_preview', 'Preview')}</span>
                </div>
                <div class="tour-step-desc text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 font-medium">
                    ${step.description}
                </div>
                <div class="flex items-center justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button id="tour-back-to-editor-btn" class="tour-btn tour-btn-accent text-xs font-bold shadow-md flex items-center gap-1.5">
                        ${SVG.pencil}
                        <span>${t('back_to_builder', 'Back to Editor')}</span>
                    </button>
                </div>
            `;

            const exitPreview = () => {
                if (popover) popover.remove();
                const mask = document.getElementById('tour-spotlight-mask');
                if (mask) mask.remove();
                this.openStepManagerDrawer();
            };

            const backBtn = document.getElementById('tour-back-to-editor-btn');
            if (backBtn) backBtn.onclick = exitPreview;
        }
    };

    // ── Global Event Delegation Singleton Registration ──
    if (!window.__tour_listeners_bound) {
        window.__tour_listeners_bound = true;

        document.addEventListener('click', function (e) {
            // Media Lightbox Expand Trigger
            const mediaExpandBtn = e.target.closest('.tour-media-expand-btn') || e.target.closest('.tour-media-trigger');
            if (mediaExpandBtn) {
                e.preventDefault();
                e.stopPropagation();
                const mediaUrl = mediaExpandBtn.getAttribute('data-media-url');
                if (mediaUrl && window.LaravelOnboardingTour) {
                    window.LaravelOnboardingTour.openMediaLightbox(mediaUrl);
                }
                return;
            }

            const startBtn = e.target.closest('#tour-start-btn');
            if (startBtn) {
                e.preventDefault();
                e.stopPropagation();
                if (window.LaravelOnboardingTour) {
                    window.LaravelOnboardingTour.startTour();
                }
                return;
            }

            const adminToggleBtn = e.target.closest('#tour-admin-toggle-btn');
            if (adminToggleBtn) {
                e.preventDefault();
                e.stopPropagation();
                if (window.LaravelOnboardingTour) {
                    window.LaravelOnboardingTour.toggleInspectorMode();
                }
                return;
            }
        });

        let isReinitializationPending = false;
        function autoReinitOnNavigation() {
            if (isReinitializationPending) return;
            isReinitializationPending = true;

            const currentRoute = window.location.pathname;

            fetch(`/api/onboarding-tour/config?route_name=${encodeURIComponent(currentRoute)}`)
                .then(res => res.json())
                .then(data => {
                    isReinitializationPending = false;
                    if (data && window.LaravelOnboardingTour) {
                        window.LaravelOnboardingTour.init({
                            route_name: currentRoute,
                            tour: data.tour,
                            global_theme: data.global_theme,
                            translations: data.translations || (window.LaravelOnboardingTour.config ? window.LaravelOnboardingTour.config.translations : null)
                        });
                    }
                })
                .catch(err => {
                    isReinitializationPending = false;
                    console.error('[OnboardingTour] Navigation re-init error:', err);
                });
        }

        document.addEventListener('livewire:navigated', autoReinitOnNavigation);
        document.addEventListener('livewire:initialized', autoReinitOnNavigation);
    }
})();
