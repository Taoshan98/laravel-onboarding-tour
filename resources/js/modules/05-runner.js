/**
 * Laravel Onboarding Tour — Runner Module
 * Tour initialization, step rendering state machine, popover card placement, spotlight mask, and completion logic
 */

const RunnerModule = {
    init(configData) {
        const tour = window.LaravelOnboardingTour;
        tour.config = configData || {};
        tour.globalTheme = tour.config.global_theme || { ...THEME_DEFAULTS };
        tour.currentTour = tour.config.tour || null;
        tour.draftSteps = tour.currentTour ? [...(tour.currentTour.steps || [])] : [];
        tour.draftRoutePattern = tour.currentTour?.route_name || tour.config?.route_pattern || tour.config?.route_name || window.location.pathname;
        const tourTheme = tour.currentTour?.theme_settings;
        tour.themeSettings = tourTheme?.use_custom_theme ? { ...tour.globalTheme, ...tourTheme } : { ...tour.globalTheme, use_custom_theme: false };
        tour.applyThemeVariables(tour.themeSettings);
        ShortcutsModule.bindGlobalKeydown();
        if (tour.currentTour?.should_auto_start && tour.currentTour.steps?.length > 0) setTimeout(() => tour.startTour(), 600);
    },

    getLocalizedText(data) {
        const tour = window.LaravelOnboardingTour;
        if (!data) return '';
        if (typeof data === 'string') return data;
        if (typeof data === 'object') {
            const locales = tour.config?.locales?.length ? tour.config.locales : ['it', 'en'];
            const current = tour.config?.current_locale || locales[0];
            const fallback = locales[0] || 'it';
            if (data[current] && data[current] !== '') return data[current];
            if (data[fallback] && data[fallback] !== '') return data[fallback];
            for (const k in data) { if (typeof data[k] === 'string' && data[k] !== '') return data[k]; }
        }
        return '';
    },

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

    startTour() {
        const tour = window.LaravelOnboardingTour;
        if (!tour.currentTour?.steps?.length) { tour.showToast(t('no_tour_for_page', 'No tour configured for this page.'), 'info'); return; }
        tour.currentStepIndex = 0;
        tour.renderStep(0, 'next');
    },

    _findStepTarget(step) {
        const tour = window.LaravelOnboardingTour;
        if (!step) return null;
        let el = null;
        if (step.element_selector) {
            try {
                const matches = Array.from(document.querySelectorAll(escapeWireSelector(step.element_selector)));
                if (matches.length === 1) {
                    el = matches[0];
                } else if (matches.length > 1) {
                    if (step.target_text) {
                        const textMatch = matches.find(m => {
                            const txt = (m.innerText || m.textContent || '').trim();
                            return txt.includes(step.target_text) || step.target_text.includes(txt);
                        });
                        if (textMatch) el = textMatch;
                    }
                    if (!el) {
                        el = matches.find(m => this._isElementVisible(m)) || matches[0];
                    }
                }
            } catch (e) { }
        }
        if (!el && step.target_text) {
            el = tour.findByTextContent(step.target_text);
        }
        return el;
    },

    renderStep(index, direction = 'next') {
        const tour = window.LaravelOnboardingTour;
        const steps = tour.currentTour?.steps;
        if (!steps || index < 0 || index >= steps.length) { tour.closeTour(true); return; }
        tour.applyThemeVariables(tour.themeSettings);
        const step = steps[index];

        const isActionStep = step.is_action || step.card_size === 'action' || step.step_type === 'action';
        if (isActionStep) {
            document.getElementById('tour-spotlight-mask')?.remove();
            document.getElementById('tour-popover-card')?.remove();
            let targetEl = this._findStepTarget(step);
            if (targetEl) {
                safeClick(targetEl);
            }

            if (direction === 'next') {
                if (index >= steps.length - 1) {
                    tour.closeTour(true);
                    return;
                }
                const nextIdx = index + 1;
                tour.currentStepIndex = nextIdx;
                setTimeout(() => tour.renderStep(nextIdx, 'next'), 250);
            } else {
                if (index <= 0) {
                    tour.closeTour(false);
                    return;
                }
                const prevIdx = index - 1;
                tour.currentStepIndex = prevIdx;
                setTimeout(() => tour.renderStep(prevIdx, 'prev'), 250);
            }
            return;
        }

        if (step.trigger_selector) {
            try {
                const triggerEl = document.querySelector(escapeWireSelector(step.trigger_selector));
                if (triggerEl) {
                    safeClick(triggerEl);
                }
            } catch (e) { }
        }

        const delay = step.trigger_selector ? 280 : 0;
        setTimeout(() => {
            let targetEl = this._findStepTarget(step);
            if (!targetEl || !this._isElementVisible(targetEl)) {
                let retries = 0;
                const interval = setInterval(() => {
                    retries++;
                    targetEl = this._findStepTarget(step);
                    if ((targetEl && this._isElementVisible(targetEl)) || retries >= 15) {
                        clearInterval(interval);
                        this._displayStepTarget(targetEl, step, index, steps.length);
                    }
                }, 100);
            } else {
                this._displayStepTarget(targetEl, step, index, steps.length);
            }
        }, delay);
    },

    _isElementVisible(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && el.offsetParent !== null && window.getComputedStyle(el).visibility !== 'hidden';
    },

    _displayStepTarget(targetEl, step, index, total) {
        const tour = window.LaravelOnboardingTour;
        const isVisible = this._isElementVisible(targetEl);
        if (targetEl && isVisible) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            setTimeout(() => {
                this.updateSpotlight(targetEl);
                this._renderPopoverCard(targetEl, step, index, total, 'tour');
            }, 200);
        } else {
            document.getElementById('tour-spotlight-mask')?.remove();
            this._renderPopoverCard(null, step, index, total, 'tour');
        }
    },

    updateSpotlight(targetEl) {
        const tour = window.LaravelOnboardingTour;
        if (!targetEl) return;
        const mask = getOrCreate('tour-spotlight-mask', 'div');
        mask.className = `tour-spotlight-mask style-${tour.themeSettings.highlight_style || 'minimal'}`;
        const rect = targetEl.getBoundingClientRect();
        Object.assign(mask.style, { top: `${rect.top - 6}px`, left: `${rect.left - 6}px`, width: `${rect.width + 12}px`, height: `${rect.height + 12}px` });
    },

    _renderPopoverCard(targetEl, step, index, total, mode) {
        const tour = window.LaravelOnboardingTour;
        const popover = getOrCreate('tour-popover-card', 'div');
        const sizeClass = step.card_size || tour.themeSettings.card_size || 'md';
        popover.className = `tour-popover-card card-${tour.themeSettings.card_style || 'auto'} size-${sizeClass}`;
        popover.setAttribute('role', 'dialog');
        popover.setAttribute('aria-modal', 'true');
        positionPopover(popover, targetEl, sizeClass);

        const stepTitle = tour.getLocalizedText(step.title_i18n || step.title);
        const stepDesc = tour.getLocalizedText(step.description_i18n || step.description);
        const mediaHtml = formatMediaHtml(getStepMediaUrl(step, tour.getLocalizedText.bind(tour)));
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
            document.getElementById('tour-next-btn')?.addEventListener('click', () => { if (isLast) tour.closeTour(true); else { tour.currentStepIndex++; tour.renderStep(tour.currentStepIndex); } });
            document.getElementById('tour-prev-btn')?.addEventListener('click', () => { tour.currentStepIndex--; tour.renderStep(tour.currentStepIndex); });
            document.getElementById('tour-dismiss-btn')?.addEventListener('click', () => tour.closeTour(false, true));
            document.getElementById('tour-shortcuts-btn')?.addEventListener('click', () => ShortcutsModule.toggleShortcutsModal());
        } else {
            document.getElementById('tour-back-to-editor-btn')?.addEventListener('click', () => { popover.remove(); document.getElementById('tour-spotlight-mask')?.remove(); tour.openStepManagerDrawer(); });
        }
        trapFocus(popover);
        setTimeout(() => document.getElementById(mode === 'tour' ? 'tour-next-btn' : 'tour-back-to-editor-btn')?.focus(), 50);
    },

    closeTour(completed = false, dismissed = false) {
        const tour = window.LaravelOnboardingTour;
        document.getElementById('tour-spotlight-mask')?.remove();
        document.getElementById('tour-popover-card')?.remove();
        if (tour.currentTour && (completed || dismissed)) {
            fetch('/api/onboarding-tour/complete', { method: 'POST', headers: csrfHeaders(), body: JSON.stringify({ tour_id: tour.currentTour.id, action: dismissed ? 'dismiss' : 'complete' }) }).catch(console.error);
        }
    },

    saveTourDraft() {
        const tour = window.LaravelOnboardingTour;
        if (!tour.draftSteps.length) { tour.showToast(t('no_steps_to_save', 'No steps to save'), 'error'); return; }
        const routeInput = document.getElementById('tour-route-pattern-input');
        const isWildcardCheckbox = document.getElementById('tour-wildcard-toggle-checkbox');
        const isWildcard = isWildcardCheckbox ? isWildcardCheckbox.checked : true;
        let route = routeInput?.value.trim() || tour.draftRoutePattern || tour.currentTour?.route_name || tour.config?.route_pattern || window.location.pathname;
        if (isWildcard) {
            route = tour.normalizeRoutePattern(route);
        }

        fetch('/api/onboarding-tour/save', {
            method: 'POST',
            headers: csrfHeaders(),
            body: JSON.stringify({
                route_name: route,
                is_wildcard: isWildcard,
                title: `Tour ${route}`,
                description: `Tour guidato per la rotta ${route}`,
                auto_start: true,
                highlight_theme: tour.themeSettings.highlight_style || 'minimal',
                theme_settings: tour.themeSettings,
                steps: tour.draftSteps
            })
        })
            .then(r => r.json()).then(data => {
                if (data.success) {
                    if (data.tour) {
                        tour.currentTour = data.tour;
                        tour.draftRoutePattern = data.tour.route_name;
                        if (data.tour.steps) tour.draftSteps = [...data.tour.steps];
                    }
                    tour.showToast(t('tour_saved_success', 'Tour saved!'), 'success');
                    if (document.getElementById('tour-drawer-panel')) {
                        tour.openStepManagerDrawer();
                    }
                } else {
                    let errMsg = data.message || data.error || t('unknown_error', 'unknown');
                    if (data.errors) {
                        const errList = Object.entries(data.errors).map(([field, msgs]) => {
                            const match = field.match(/steps\.(\d+)\.(.+)/);
                            if (match) {
                                const stepNum = parseInt(match[1]) + 1;
                                return `Step #${stepNum}: ${msgs.join(', ')}`;
                            }
                            return msgs.join(', ');
                        });
                        errMsg = errList.join(' | ');
                    }
                    tour.showToast(errMsg, 'error');
                }
            })
            .catch(e => { console.error(e); tour.showToast(t('server_error', 'Server error'), 'error'); });
    }
};
