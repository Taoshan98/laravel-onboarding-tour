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
        check: `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
        info: `<svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        alert: `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        list: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`,
        close: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
        palette: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>`,
        expand: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/></svg>`
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

    function formatMediaHtml(url) {
        if (!url || typeof url !== 'string' || !url.trim()) return '';

        const cleanUrl = url.trim();

        const expandBtnHtml = `
            <button type="button" class="tour-media-expand-btn" title="${t('expand_media', 'Espandi a schermo intero')}" data-media-url="${cleanUrl}">
                ${SVG.expand}
                <span>${t('expand_media', 'Espandi')}</span>
            </button>
        `;

        // 1. Image formats check (.jpg, .jpeg, .png, .gif, .webp, .svg or data:image)
        if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl) || cleanUrl.startsWith('data:image/')) {
            return `<div class="tour-media-container group flex items-center justify-center cursor-pointer tour-media-trigger" data-media-url="${cleanUrl}">
                        <img src="${cleanUrl}" class="w-full h-auto max-h-48 object-contain rounded-xl" alt="Media Step" />
                        ${expandBtnHtml}
                    </div>`;
        }

        // 2. Direct video file (.mp4, .webm, .ogg)
        if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
            return `<div class="tour-media-container group bg-black">
                        <video src="${cleanUrl}" controls class="w-full max-h-48 rounded-xl"></video>
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
                this.themeSettings = { ...this.globalTheme, ...this.currentTour.theme_settings };
            } else {
                this.themeSettings = { ...this.globalTheme, use_custom_theme: false };
            }

            this.applyThemeVariables(this.themeSettings);

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
            modal.className = 'fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
            modal.innerHTML = `
                <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-zinc-900 dark:text-zinc-100">
                    <h3 class="text-base font-bold mb-2">${title}</h3>
                    <p class="text-xs text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">${message}</p>
                    <div class="flex items-center justify-end gap-2">
                        <button id="tour-confirm-cancel" class="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">${t('cancel', 'Annulla')}</button>
                        <button id="tour-confirm-ok" class="px-5 py-2 rounded-xl tour-btn-accent text-xs font-bold shadow-lg">${t('confirm', 'Conferma')}</button>
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
            modal.className = 'fixed inset-0 z-[100005] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fade-in';

            let contentHtml = '';

            if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(cleanUrl) || cleanUrl.startsWith('data:image/')) {
                contentHtml = `<img src="${cleanUrl}" class="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl border border-zinc-700/80" alt="Expanded Media" />`;
            } else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
                contentHtml = `<video src="${cleanUrl}" controls autoplay class="max-w-full max-h-[82vh] rounded-2xl shadow-2xl border border-zinc-700/80 bg-black"></video>`;
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
                    <div class="aspect-video w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80 bg-black">
                        <iframe src="${embedUrl}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
            }

            modal.innerHTML = `
                <div class="relative w-full max-w-5xl flex flex-col items-center justify-center">
                    <button id="tour-lightbox-close" class="absolute -top-12 right-0 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white backdrop-blur-md transition-all shadow-xl flex items-center justify-center">
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
                this.showToast('Nessun tour configurato per questa pagina.', 'info');
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
                <div class="tour-step-desc text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 font-medium">
                    ${step.description}
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button id="tour-dismiss-btn" class="text-[11px] font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
                        ${t('dismiss_btn', 'Non mostrare più')}
                    </button>
                    <div class="flex items-center gap-1.5">
                        ${index > 0 ? `<button id="tour-prev-btn" class="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">${t('prev_btn', 'Indietro')}</button>` : ''}
                        <button id="tour-next-btn" class="px-4 py-1.5 rounded-lg tour-btn-accent text-xs font-bold shadow-md">
                            ${isLastStep ? t('finish_btn', 'Concludi') : t('next_btn', 'Avanti')}
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
                document.addEventListener('click', this._onClick = (e) => this.handleInspectorClick(e), true);
                this.showToast('Modalità Builder attivata', 'info');
            } else {
                const bar = document.getElementById('tour-inspector-bar');
                if (bar) bar.remove();
                this.closeStepManagerDrawer();
                this.removeInspectorOutline();
                if (this._onMouseMove) document.removeEventListener('mousemove', this._onMouseMove);
                if (this._onClick) document.removeEventListener('click', this._onClick, true);
                this.showToast('Modalità Builder disattivata', 'info');
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
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Modalità Builder</span>
                </div>
                <div class="flex items-center gap-2">
                    <button id="tour-manage-steps-btn" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold border border-zinc-700/60 transition-all flex items-center gap-1.5">
                        ${SVG.list}
                        <span>${t('manage_steps', 'Gestisci step')}</span>
                    </button>
                    <button id="tour-theme-toggle-btn" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold border border-zinc-700/60 transition-all flex items-center gap-1.5">
                        ${SVG.palette}
                        <span>${t('theme', 'Tema')}</span>
                    </button>
                    <button id="tour-save-all-btn" class="px-3.5 py-1.5 tour-btn-accent rounded-xl font-semibold text-xs shadow-md transition-all">${t('save_tour', 'Salva tour')}</button>
                    <button id="tour-close-inspector-btn" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition-all">${t('exit', 'Esci')}</button>
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
            document.getElementById('tour-save-all-btn').onclick = () => {
                this.showConfirmModal(
                    'Salva tour',
                    `Vuoi salvare il tour con ${this.draftSteps.length} step e le impostazioni grafiche per questa vista?`,
                    () => this.saveTourDraft()
                );
            };
            document.getElementById('tour-close-inspector-btn').onclick = () => this.toggleInspectorMode();
        },

        // ── Step Manager Side Drawer with Sticky Live Preview & Custom Backdrop Options ──
        openStepManagerDrawer: function () {
            this.closeStepManagerDrawer();

            const backdrop = document.createElement('div');
            backdrop.id = 'tour-drawer-backdrop';
            backdrop.className = 'tour-drawer-backdrop';
            backdrop.onclick = () => this.closeStepManagerDrawer();

            const panel = document.createElement('div');
            panel.id = 'tour-drawer-panel';
            panel.className = 'tour-drawer-panel text-zinc-900 dark:text-zinc-100';

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
                            <p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Nessuno step nel tour</p>
                            <p class="text-xs text-zinc-400 mt-1">Clicca su qualsiasi elemento della pagina per aggiungere il primo step.</p>
                        </div>
                    `;
                } else {
                    stepsListHtml = this.draftSteps.map((step, idx) => `
                        <div class="tour-drawer-step-item flex items-start justify-between gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:border-blue-500/50 transition-all group" draggable="true" data-idx="${idx}">
                            <div class="flex items-center gap-2.5 mt-0.5">
                                <span class="drag-handle p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-grab" title="Trascina per riordinare">
                                    ${SVG.grip}
                                </span>
                                <span class="step-num-badge tour-badge-accent w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    ${idx + 1}
                                </span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h5 class="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">${step.title}</h5>
                                <p class="text-[10px] font-mono text-zinc-400 truncate mt-0.5">${step.element_selector}</p>
                                ${step.video_url || step.media_url ? `<span class="inline-block mt-1 text-[9px] font-semibold text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded">Media Incluso</span>` : ''}
                            </div>
                            <div class="flex items-center gap-1">
                                <button class="tour-test-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30" title="Test evidenziazione" data-idx="${idx}">
                                    ${SVG.eye}
                                </button>
                                <button class="tour-edit-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30" title="Modifica step" data-idx="${idx}">
                                    ${SVG.pencil}
                                </button>
                                <button class="tour-delete-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" title="Elimina step" data-idx="${idx}">
                                    ${SVG.trash}
                                </button>
                            </div>
                        </div>
                    `).join('');
                }

                bodyContentHtml = `
                    <div class="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar" id="tour-drawer-steps-list">
                        ${stepsListHtml}
                    </div>
                `;
            } else {
                // Theme Customization Tab: Fixed Live Preview Top + Scrollable Controls Bottom
                const colors = [
                    { name: 'Blu', hex: '#2563eb' },
                    { name: 'Smeraldo', hex: '#10b981' },
                    { name: 'Viola', hex: '#7c3aed' },
                    { name: 'Ambra', hex: '#d97706' },
                    { name: 'Rosa', hex: '#e11d48' },
                    { name: 'Ardesia', hex: '#475569' }
                ];

                const colorPillsHtml = colors.map(c => `
                    <button type="button" class="tour-color-pill px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 ${this.themeSettings.accent_color === c.hex ? 'bg-zinc-800 text-white border-zinc-600 shadow-sm' : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200'}" data-color="${c.hex}">
                        <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${c.hex};"></span>
                        <span>${c.name}</span>
                    </button>
                `).join('');

                const backdropPresets = [
                    { name: 'Slate Scuro', hex: '#0f172a' },
                    { name: 'Nero Assoluto', hex: '#000000' },
                    { name: 'Blu Notte', hex: '#0b1329' },
                    { name: 'Grigio Scuro', hex: '#18181b' }
                ];

                const backdropPillsHtml = backdropPresets.map(b => `
                    <button type="button" class="tour-backdrop-pill px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 ${(this.themeSettings.backdrop_hex || '#0f172a') === b.hex ? 'bg-zinc-800 text-white border-zinc-600 shadow-sm' : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200'}" data-color="${b.hex}">
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
                                Anteprima in Tempo Reale
                            </label>
                            <span class="text-[10px] text-zinc-400 font-mono">Fissa in Alto</span>
                        </div>

                        <!-- Live Stage with 100% Faithful Popover Card & Target Preview -->
                        <div class="tour-live-preview-stage" id="tour-live-preview-stage">
                            <!-- Sample Target Highlight -->
                            <div class="tour-preview-sample-target" id="tour-preview-sample-target">
                                Elemento Target Evidenziato
                            </div>

                            <!-- 100% Faithful Popover Card Sample -->
                            <div class="tour-preview-sample-card tour-popover-card card-${this.themeSettings.card_style || 'auto'} size-${this.themeSettings.card_size || 'md'}" id="tour-preview-sample-card">
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <h4 class="font-bold text-sm leading-tight">Titolo dell'anteprima step</h4>
                                    <span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">1/3</span>
                                </div>
                                <div class="tour-step-desc text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 font-medium">
                                    Questa card mostra l'aspetto esatto che vedranno gli utenti durante la navigazione guidata.
                                </div>
                                <div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <span class="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Non mostrare più</span>
                                    <div class="flex items-center gap-1">
                                        <button class="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[10px] font-semibold">Indietro</button>
                                        <button class="px-3.5 py-1 rounded-lg tour-btn-accent text-[10px] font-bold shadow-md">Avanti</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scrollable Controls Section -->
                    <div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                        <!-- Global vs View Dedicated Scope Switcher -->
                        <div class="bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl flex items-center border border-zinc-200 dark:border-zinc-700">
                            <button type="button" id="theme-scope-global" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${!useCustomTheme ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-md border border-zinc-200 dark:border-zinc-700' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}">
                                <span>🌐 Tema Globale App</span>
                            </button>
                            <button type="button" id="theme-scope-custom" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${useCustomTheme ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-md border border-zinc-200 dark:border-zinc-700' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}">
                                <span>🎨 Personalizzato View</span>
                            </button>
                        </div>

                        <!-- Scope Explanation Banner -->
                        <div class="p-3.5 rounded-2xl ${!useCustomTheme ? 'bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300' : 'bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300'} space-y-1">
                            <h5 class="text-xs font-bold flex items-center gap-1.5">
                                ${SVG.info}
                                <span>${!useCustomTheme ? 'Modalità: Tema Globale App' : 'Modalità: Tema Personalizzato per questa View'}</span>
                            </h5>
                            <p class="text-[11px] leading-relaxed opacity-90">
                                ${!useCustomTheme 
                                    ? 'Le modifiche effettuate qui possono essere salvate come <strong>Tema Globale dell\'Applicazione</strong> ed essere applicate a tutti i tour del sistema.' 
                                    : 'Le modifiche grafiche si applicheranno unicamente al tour di questa specifica pagina.'}
                            </p>
                        </div>

                        <!-- Custom Controls Container -->
                        <div id="custom-theme-controls-container" class="space-y-4">
                            <!-- Card Style Selector -->
                            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                                <label class="text-xs font-bold text-zinc-800 dark:text-zinc-200">1. Stile della Card Popover</label>
                                <select id="theme-card-style" class="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="auto" ${this.themeSettings.card_style === 'auto' ? 'selected' : ''}>Adattivo (Light/Dark basato su UI)</option>
                                    <option value="glass" ${this.themeSettings.card_style === 'glass' ? 'selected' : ''}>Vetro Sfocato (Glassmorphism)</option>
                                    <option value="dark" ${this.themeSettings.card_style === 'dark' ? 'selected' : ''}>Scuro Elegante (Dark Solid)</option>
                                    <option value="light" ${this.themeSettings.card_style === 'light' ? 'selected' : ''}>Chiaro Pulito (Light Solid)</option>
                                </select>
                            </div>

                            <!-- Card Size Selector -->
                            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                                <label class="text-xs font-bold text-zinc-800 dark:text-zinc-200">2. Dimensione Predefinita della Card Popover</label>
                                <select id="theme-card-size" class="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="sm" ${this.themeSettings.card_size === 'sm' ? 'selected' : ''}>Compatta (320px)</option>
                                    <option value="md" ${(this.themeSettings.card_size || 'md') === 'md' ? 'selected' : ''}>Standard (380px)</option>
                                    <option value="lg" ${this.themeSettings.card_size === 'lg' ? 'selected' : ''}>Media (460px)</option>
                                    <option value="xl" ${this.themeSettings.card_size === 'xl' ? 'selected' : ''}>Ampia / Extra-Large (560px)</option>
                                </select>
                            </div>

                            <!-- Accent Color Picker & Hex Input -->
                            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                                <label class="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">3. Colore Accento (Pulsanti & Badge)</label>

                                <div class="flex flex-wrap items-center gap-1.5" id="theme-color-pills-box">
                                    ${colorPillsHtml}
                                </div>

                                <div class="flex items-center gap-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                    <div class="tour-color-picker-box">
                                        <input type="color" id="theme-color-picker" value="${this.themeSettings.accent_color || '#2563eb'}" class="tour-color-swatch-input" title="Scegli colore personalizzato" />
                                        <span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Personalizzato:</span>
                                    </div>
                                    <div class="flex-1">
                                        <input type="text" id="theme-hex-input" value="${this.themeSettings.accent_color || '#2563eb'}" placeholder="#2563eb" maxlength="7" class="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-xs text-blue-500 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>

                            <!-- Highlight Style -->
                            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                                <label class="text-xs font-bold text-zinc-800 dark:text-zinc-200">4. Stile Evidenziatore Elemento Target</label>
                                <select id="theme-highlight-style" class="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="minimal" ${this.themeSettings.highlight_style === 'minimal' ? 'selected' : ''}>Minimale con bagliore discreto</option>
                                    <option value="ring" ${this.themeSettings.highlight_style === 'ring' ? 'selected' : ''}>Anello marcato col colore accento</option>
                                    <option value="glow" ${this.themeSettings.highlight_style === 'glow' ? 'selected' : ''}>Bagliore radioso intenso</option>
                                    <option value="dashed" ${this.themeSettings.highlight_style === 'dashed' ? 'selected' : ''}>Bordo tratteggiato accent</option>
                                    <option value="none" ${this.themeSettings.highlight_style === 'none' ? 'selected' : ''}>Nessun bordo (Solo oscuramento spotlight)</option>
                                </select>
                            </div>

                            <!-- Backdrop Customization: Color + Opacity Slider -->
                            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                                <label class="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">5. Personalizza Sfondo Oscurato (Backdrop)</label>

                                <div class="flex flex-wrap items-center gap-1.5">
                                    ${backdropPillsHtml}
                                </div>

                                <div class="flex items-center gap-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                    <div class="tour-color-picker-box">
                                        <input type="color" id="theme-backdrop-picker" value="${this.themeSettings.backdrop_hex || '#0f172a'}" class="tour-color-swatch-input" title="Scegli colore dello sfondo" />
                                        <span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Colore Hex:</span>
                                    </div>
                                    <div class="flex-1">
                                        <input type="text" id="theme-backdrop-hex-input" value="${this.themeSettings.backdrop_hex || '#0f172a'}" placeholder="#0f172a" maxlength="7" class="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-xs text-blue-500 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>

                                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                    <div class="flex items-center justify-between mb-1">
                                        <label class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Opacità Sfondo</label>
                                        <span class="text-xs font-mono font-bold text-blue-500" id="backdrop-opacity-val">${this.themeSettings.backdrop_opacity || 75}%</span>
                                    </div>
                                    <input type="range" id="theme-backdrop-opacity" min="20" max="95" value="${this.themeSettings.backdrop_opacity || 75}" class="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            const actionBtnText = !isStepsTab
                ? (!useCustomTheme ? '🌐 Salva come Tema Globale App (Tutti i Tour)' : '🎨 Salva Tema Personalizzato per questa View')
                : 'Salva modifiche tour';

            panel.innerHTML = `
                <!-- Header with Tabs -->
                <div class="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h3 class="text-base font-bold">${t('drawer_title', 'Editor Tour Onboarding')}</h3>
                        <p class="text-xs text-zinc-400 mt-0.5">${t('drawer_subtitle', 'Configura passaggi e aspetto visivo')}</p>
                    </div>
                    <button id="tour-drawer-close-btn" class="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        ${SVG.close}
                    </button>
                </div>

                <!-- Tab Navigation Buttons Bar -->
                <div class="flex items-center gap-2 px-5 py-2.5 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800">
                    <button id="tab-btn-steps" class="tour-tab-btn flex-1 justify-center ${isStepsTab ? 'active' : ''}">
                        ${SVG.list}
                        <span>${t('manage_steps', 'Gestisci step')} (${this.draftSteps.length})</span>
                    </button>
                    <button id="tab-btn-theme" class="tour-tab-btn flex-1 justify-center ${!isStepsTab ? 'active' : ''}">
                        ${SVG.palette}
                        <span>${t('theme', 'Tema')}</span>
                    </button>
                </div>

                ${bodyContentHtml}

                <div class="p-5 border-t border-zinc-200 dark:border-zinc-800 space-y-2 bg-white dark:bg-zinc-900 z-30">
                    <button id="tour-drawer-save-btn" class="w-full py-2.5 rounded-xl tour-btn-accent text-xs font-bold shadow-lg transition-all">
                        ${actionBtnText}
                    </button>
                    ${this.currentTour ? `
                        <button id="tour-drawer-delete-tour-btn" class="w-full py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-all">
                            ${t('delete_tour', 'Elimina intero tour')}
                        </button>
                    ` : ''}
                </div>
            `;

            document.body.appendChild(backdrop);
            document.body.appendChild(panel);

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
                        'Aggiorna Tema Globale App',
                        'Vuoi salvare queste impostazioni grafiche come TEMA GLOBALE predefinito per TUTTI i tour dell\'applicazione?',
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
                        'Elimina tour',
                        'Sei sicuro di voler eliminare l\'intero tour per questa pagina?',
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
                        sampleTarget.style.border = 'none';
                        sampleTarget.style.boxShadow = 'none';
                        sampleTarget.style.background = 'rgba(255, 255, 255, 0.15)';

                        const accent = this.themeSettings.accent_color || '#2563eb';
                        const style = this.themeSettings.highlight_style || 'minimal';

                        if (style === 'minimal') {
                            sampleTarget.style.border = `2px solid ${accent}`;
                            sampleTarget.style.boxShadow = `0 0 15px ${accent}40`;
                        } else if (style === 'ring') {
                            sampleTarget.style.border = `2.5px solid ${accent}`;
                            sampleTarget.style.boxShadow = `0 0 0 4px ${accent}40`;
                        } else if (style === 'glow') {
                            sampleTarget.style.border = `2px solid ${accent}`;
                            sampleTarget.style.boxShadow = `0 0 25px ${accent}`;
                        } else if (style === 'dashed') {
                            sampleTarget.style.border = `2px dashed ${accent}`;
                            sampleTarget.style.background = `${accent}20`;
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
                        this.showToast('Modalità Tema Globale attivata', 'info');
                    };

                    scopeCustomBtn.onclick = () => {
                        this.themeSettings.use_custom_theme = true;
                        this.openStepManagerDrawer();
                        this.showToast('Personalizzazione attivata per questa view', 'info');
                    };
                }

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

                        panel.querySelectorAll('.tour-color-pill').forEach(p => {
                            p.className = 'tour-color-pill px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200';
                        });
                        pill.className = 'tour-color-pill px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 bg-zinc-800 text-white border-zinc-600 shadow-sm';
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

                        panel.querySelectorAll('.tour-backdrop-pill').forEach(p => {
                            p.className = 'tour-backdrop-pill px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200';
                        });
                        pill.className = 'tour-backdrop-pill px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1.5 bg-zinc-800 text-white border-zinc-600 shadow-sm';
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
                            this.showToast('Ordine step aggiornato', 'success');
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
                        const step = this.draftSteps[idx];
                        let safeSel = (step.element_selector || '')
                            .replace(/\[wire:key=/g, '[wire\\3a key=')
                            .replace(/\[wire:id=/g, '[wire\\3a id=');
                        let targetEl = null;
                        try {
                            targetEl = document.querySelector(safeSel);
                        } catch(e) {}

                        if (!targetEl && step.target_text) {
                            targetEl = this.findByTextContent(step.target_text);
                        }

                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            this.showOutline(targetEl);
                            this.showToast(`Test step #${idx + 1}: evidenziato`, 'info');
                        } else {
                            this.showToast(`Elemento per step #${idx + 1} non trovato nel DOM`, 'error');
                        }
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
                        } catch(e) {}

                        if (!targetEl && step.target_text) {
                            targetEl = this.findByTextContent(step.target_text);
                        }

                        this.closeStepManagerDrawer();
                        this.openStepBuilderModal(targetEl || document.body, idx);
                    };
                });

                panel.querySelectorAll('.tour-delete-step-btn').forEach(btn => {
                    btn.onclick = () => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        this.showConfirmModal(
                            'Elimina step',
                            `Vuoi eliminare lo step #${idx + 1} (${this.draftSteps[idx].title})?`,
                            () => {
                                this.draftSteps.splice(idx, 1);
                                this.renderInspectorBar();
                                this.openStepManagerDrawer();
                                this.showToast('Step eliminato', 'success');
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
                    this.showToast('Tema Globale salvato per TUTTI i tour dell\'applicazione!', 'success');
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    this.showToast('Errore durante il salvataggio del Tema Globale', 'error');
                }
            })
            .catch(err => {
                console.error(err);
                this.showToast('Errore di connessione al server.', 'error');
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
                    this.showToast('Tour eliminato con successo', 'success');
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    this.showToast('Errore durante l\'eliminazione', 'error');
                }
            })
            .catch(err => console.error(err));
        },

        handleInspectorHover: function (e) {
            if (!this.inspectorActive) return;
            const target = e.target;
            if (target.closest('#tour-inspector-bar') || target.closest('#tour-builder-modal') || target.closest('#tour-admin-toggle-btn') || target.closest('#tour-confirm-modal') || target.closest('#tour-drawer-panel')) {
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

        removeInspectorOutline: function () {
            const outline = document.getElementById('tour-inspector-outline');
            if (outline) outline.remove();
        },

        handleInspectorClick: function (e) {
            if (!this.inspectorActive) return;
            const target = e.target;
            if (target.closest('#tour-inspector-bar') || target.closest('#tour-builder-modal') || target.closest('#tour-admin-toggle-btn') || target.closest('#tour-confirm-modal') || target.closest('#tour-drawer-panel')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            this.selectedElement = target;
            this.openStepBuilderModal(target);
        },

        generateSelector: function (el) {
            if (!el || el === document.body) return 'body';

            if (el.hasAttribute('data-tour')) {
                const sel = `[data-tour="${el.getAttribute('data-tour')}"]`;
                try { if (document.querySelectorAll(sel).length === 1) return sel; } catch(e) {}
            }

            if (el.id) {
                const sel = `#${typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(el.id) : el.id}`;
                try { if (document.querySelectorAll(sel).length === 1) return sel; } catch(e) {}
            }

            if (el.hasAttribute('wire:key')) {
                const sel = safeAttrSelector('wire:key', el.getAttribute('wire:key'));
                try { if (document.querySelectorAll(sel).length === 1) return sel; } catch(e) {}
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
                    try { if (document.querySelectorAll(candidate).length === 1) return candidate; } catch(e) {}
                    curr = curr.parentElement;
                    continue;
                }

                if (curr.hasAttribute('wire:key')) {
                    stepSelector = safeAttrSelector('wire:key', curr.getAttribute('wire:key'));
                    parts.unshift(stepSelector);
                    const candidate = parts.join(' > ');
                    try { if (document.querySelectorAll(candidate).length === 1) return candidate; } catch(e) {}
                    curr = curr.parentElement;
                    continue;
                }

                if (curr.hasAttribute('data-tour')) {
                    stepSelector = `[data-tour="${curr.getAttribute('data-tour')}"]`;
                    parts.unshift(stepSelector);
                    const candidate = parts.join(' > ');
                    try { if (document.querySelectorAll(candidate).length === 1) return candidate; } catch(e) {}
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
                } catch (err) {}

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
            modal.className = 'fixed inset-0 z-[100010] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';

            const breadcrumbsHtml = breadcrumbs.map((b, i) => `
                <span class="tour-breadcrumb-chip ${i === breadcrumbs.length - 1 ? 'active' : ''}" data-crumb-idx="${i}">
                    ${b.label}
                </span>
            `).join(' <span class="text-zinc-600">/</span> ');

            const existingMedia = existingStep ? (existingStep.media_url || existingStep.video_url || '') : '';

            modal.innerHTML = `
                <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-zinc-900 dark:text-zinc-100">
                    <h3 class="text-lg font-bold mb-2">${isEditing ? `Modifica step #${editingIndex + 1}` : 'Aggiungi step al tour'}</h3>
                    
                    <div class="mb-4">
                        <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Gerarchia elemento (clicca per cambiare)</label>
                        <div class="tour-breadcrumb-bar" id="tour-crumb-bar">
                            ${breadcrumbsHtml}
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Selettore CSS target</label>
                            <input type="text" id="step-selector-input" value="${selector}" class="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono text-xs text-blue-500 font-bold" />
                        </div>
                        <div class="grid grid-cols-3 gap-3">
                            <div class="col-span-2">
                                <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Titolo step</label>
                                <input type="text" id="step-title-input" value="${existingStep ? existingStep.title : ''}" placeholder="Es. Filtri tabella" class="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium" />
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Dimensione Card</label>
                                <select id="step-card-size-input" class="w-full mt-1 px-2.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold">
                                    <option value="sm" ${existingStep && existingStep.card_size === 'sm' ? 'selected' : ''}>Compatta (320px)</option>
                                    <option value="md" ${(!existingStep || !existingStep.card_size || existingStep.card_size === 'md') ? 'selected' : ''}>Standard (380px)</option>
                                    <option value="lg" ${existingStep && existingStep.card_size === 'lg' ? 'selected' : ''}>Media (460px)</option>
                                    <option value="xl" ${existingStep && existingStep.card_size === 'xl' ? 'selected' : ''}>Ampia (560px)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Descrizione</label>
                            <textarea id="step-desc-input" rows="3" placeholder="Spiega cosa fa questo elemento..." class="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm">${existingStep ? existingStep.description : ''}</textarea>
                        </div>
                        <div>
                            <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">URL Immagine o Video (Opzionale)</label>
                            <input type="text" id="step-video-input" value="${existingMedia}" placeholder="Es. https://.../image.png oppure YouTube URL" class="w-full mt-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs" />
                            <span class="text-[10px] text-zinc-400 mt-1 block">Supporta immagini (.png, .jpg, .gif, .webp) e video (YouTube watch/embed, Vimeo, MP4). Cliccandoci verrà espanso a schermo intero.</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <button id="modal-cancel-btn" class="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">${t('cancel', 'Annulla')}</button>
                        <button id="modal-add-step-btn" class="px-5 py-2 rounded-xl tour-btn-accent text-xs font-bold shadow-lg">${isEditing ? t('save_changes', 'Salva modifiche') : t('add_step', 'Aggiungi step')}</button>
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
                    this.showToast(`Step #${editingIndex + 1} aggiornato`, 'success');
                } else {
                    this.draftSteps.push(stepObj);
                    this.showToast(`Step aggiunto! Totale step: ${this.draftSteps.length}`, 'success');
                }

                modal.remove();
                this.removeInspectorOutline();
                this.renderInspectorBar();
            };
        },

        saveTourDraft: function () {
            if (this.draftSteps.length === 0) {
                this.showToast('Nessuno step da salvare. Clicca su un elemento prima.', 'error');
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
                    this.showToast('Tour salvato in cache Redis con successo!', 'success');
                    setTimeout(() => window.location.reload(), 1200);
                } else {
                    this.showToast('Errore durante il salvataggio: ' + (data.error || 'sconosciuto'), 'error');
                }
            })
            .catch(err => {
                console.error(err);
                this.showToast('Errore di connessione al server.', 'error');
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
                            is_admin: data.is_admin
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
