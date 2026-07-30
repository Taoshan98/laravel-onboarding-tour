/**
 * Laravel Onboarding Tour — Drawer Module
 * Step Manager drawer panel, tab switching, step action reordering, and import/clone modal
 */

const DrawerModule = {
    normalizeRoutePattern(route) {
        if (!route) return '';
        let path = route.replace(/^https?:\/\/[^\/]+/, '');
        path = path.replace(/\{[^}]+\}/g, '*');
        path = path.replace(/(?<=\/)\d+(?=\/|$)/g, '*');
        path = path.replace(/(?<=\/)[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(?=\/|$)/g, '*');
        return path;
    },

    openStepManagerDrawer() {
        const tour = window.LaravelOnboardingTour;
        const backdrop = getOrCreate('tour-drawer-backdrop', 'div', 'tour-drawer-backdrop');
        backdrop.onclick = () => this.closeStepManagerDrawer();
        let panel = document.getElementById('tour-drawer-panel');
        if (!panel) { panel = document.createElement('div'); panel.id = 'tour-drawer-panel'; panel.className = 'tour-drawer-panel'; document.body.appendChild(panel); }
        else { panel.style.animation = 'none'; }

        const isStepsTab = tour.activeDrawerTab === 'steps';
        const useCustom = !!tour.themeSettings.use_custom_theme;
        const bodyHtml = isStepsTab ? this._renderStepsTab() : tour._renderThemeTab(useCustom);
        const actionText = !isStepsTab ? (!useCustom ? t('save_global_theme_btn', 'Save Global Theme') : t('save_custom_theme_btn', 'Save Page Theme')) : t('save_changes', 'Save');

        panel.innerHTML = `<div class="tour-drawer-header"><div><h3 class="text-base font-bold">${t('drawer_title', 'Onboarding Tour Editor')}</h3><p class="text-xs text-zinc-400 mt-0.5">${t('drawer_subtitle', 'Configure steps and visual appearance')}</p></div><button id="tour-drawer-close-btn" class="tour-btn-icon">${SVG.close}</button></div><div class="tour-drawer-subnav"><button id="tab-btn-steps" class="tour-tab-btn flex-1 justify-center ${isStepsTab ? 'active' : ''}">${SVG.list}<span>${t('manage_steps', 'Steps')} (${tour.draftSteps.length})</span></button><button id="tab-btn-theme" class="tour-tab-btn flex-1 justify-center ${!isStepsTab ? 'active' : ''}">${SVG.palette}<span>${t('theme', 'Theme')}</span></button></div>${bodyHtml}<div class="tour-drawer-footer">${tour.currentTour ? `<button id="tour-drawer-delete-tour-btn" class="tour-btn tour-btn-danger">${SVG.trash}<span>${t('delete_tour', 'Delete tour')}</span></button>` : ''}<button id="tour-drawer-save-btn" class="tour-btn tour-btn-accent flex-1">${actionText}</button></div>`;

        document.getElementById('tab-btn-steps').onclick = () => { tour.activeDrawerTab = 'steps'; this.openStepManagerDrawer(); };
        document.getElementById('tab-btn-theme').onclick = () => { tour.activeDrawerTab = 'theme'; this.openStepManagerDrawer(); };
        document.getElementById('tour-drawer-close-btn').onclick = () => this.closeStepManagerDrawer();
        document.getElementById('tour-drawer-save-btn').onclick = () => {
            if (!isStepsTab && !useCustom) tour.showConfirmModal(t('scope_global', 'Global Theme'), t('save_global_theme_confirm', 'Save as default Global Theme?'), () => tour.saveGlobalThemeDraft());
            else { this.closeStepManagerDrawer(); tour.saveTourDraft(); }
        };
        document.getElementById('tour-drawer-delete-tour-btn')?.addEventListener('click', () => tour.showConfirmModal(t('delete_tour', 'Delete tour'), t('confirm_delete_tour_msg', 'Delete the tour?'), () => tour.deleteEntireTour()));
        if (isStepsTab) this._bindStepActions(panel); else tour._bindThemeHandlers(panel);
    },

    closeStepManagerDrawer() {
        document.getElementById('tour-drawer-backdrop')?.remove();
        document.getElementById('tour-drawer-panel')?.remove();
    },

    _renderStepsTab() {
        const tour = window.LaravelOnboardingTour;
        const isWildcardCheckbox = document.getElementById('tour-wildcard-toggle-checkbox');
        const isWildcard = isWildcardCheckbox ? isWildcardCheckbox.checked : true;
        const rawRoute = tour.draftRoutePattern || tour.currentTour?.route_name || tour.config?.route_pattern || tour.config?.route_name || window.location.pathname;
        const defaultRoute = isWildcard ? this.normalizeRoutePattern(rawRoute) : rawRoute;
        const importBtn = `<div class="mb-3"><button type="button" id="tour-drawer-import-btn" class="tour-btn tour-btn-import">${SVG.copy}<span>${t('import_tour_btn', 'Importa Tour')}</span></button></div>`;
        const routeCard = `<div class="tour-card-box p-3.5 mb-3 transition-all hover:border-blue-500/30"><div class="flex items-center justify-between gap-3"><div class="flex-1 min-w-0"><label for="tour-wildcard-toggle-checkbox" class="font-bold text-xs cursor-pointer block text-zinc-800 dark:text-zinc-100 select-none">${t('wildcard_toggle_label', 'Applica a pagine simili')}</label><p class="text-[11px] text-zinc-400 leading-snug mt-0.5" style="margin:2px 0 0 0">${t('wildcard_toggle_help', 'Valido per tutti gli ID dinamici (es. /1/edit, /2/edit)')}</p></div><label class="tour-switch cursor-pointer"><input type="checkbox" id="tour-wildcard-toggle-checkbox" ${isWildcard ? 'checked' : ''} /><span class="tour-slider"></span></label></div><details class="text-[10px] pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800"><summary class="cursor-pointer text-zinc-400 hover:text-blue-500 font-semibold select-none transition-colors">${t('advanced_url_rule', 'Avanzate URL')}</summary><input type="text" id="tour-route-pattern-input" class="tour-input font-mono text-xs mt-1.5" value="${defaultRoute}" placeholder="es. users/*/edit" /></details></div>`;

        if (!tour.draftSteps.length) return `<div class="flex-1 overflow-y-auto p-5" id="tour-drawer-steps-list">${importBtn}${routeCard}<div class="flex flex-col items-center justify-center p-8 text-center text-zinc-400"><svg class="w-12 h-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg><p class="text-sm font-semibold text-zinc-600 dark:text-zinc-400">${t('no_steps_title', 'No steps in tour')}</p><p class="text-xs text-zinc-400 mt-1">${t('no_steps_subtitle', 'Click any element to add a step.')}</p></div></div>`;
        const items = tour.draftSteps.map((step, idx) => {
            const isAction = step.is_action || step.card_size === 'action' || step.step_type === 'action';
            const hasMedia = !!(tour.getLocalizedText(step.media_url_i18n || step.video_url_i18n || step.media_url || step.video_url));
            const title = isAction ? t('step_action_badge', 'Navigazione Automatica') : (tour.getLocalizedText(step.title_i18n || step.title) || `Step #${idx + 1}`);
            const badgeClass = isAction ? 'bg-amber-500/20 text-amber-500 font-bold border border-amber-500/40' : 'tour-badge-accent';
            return `<div class="tour-drawer-step-item tour-card-box flex items-center justify-between gap-2.5 px-3 py-2.5 hover:border-blue-500/50 transition-all group" draggable="true" data-idx="${idx}"><div class="flex items-center gap-2 flex-shrink-0"><span class="drag-handle p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded cursor-grab" title="${t('drag_to_reorder', 'Drag')}">${SVG.grip}</span><span class="step-num-badge ${badgeClass} w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center flex-shrink-0">${idx + 1}</span></div><div class="flex-1 min-w-0"><div class="flex items-center gap-1.5"><h5 class="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">${title}</h5>${isAction ? `<span class="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full flex-shrink-0">${SVG.target} <span>Azione</span></span>` : (hasMedia ? `<span class="inline-flex items-center gap-0.5 text-[9px] font-semibold text-purple-500 bg-purple-500/10 dark:bg-purple-500/20 px-1.5 py-0.5 rounded-full flex-shrink-0">${SVG.media}</span>` : '')}</div><p class="text-[10px] font-mono text-zinc-400 truncate leading-tight mt-0.5">${step.element_selector}</p></div><div class="flex items-center gap-0.5 flex-shrink-0"><button class="tour-test-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30" data-idx="${idx}">${SVG.eye}</button><button class="tour-edit-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30" data-idx="${idx}">${SVG.pencil}</button><button class="tour-delete-step-btn p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" data-idx="${idx}">${SVG.trash}</button></div></div>`;
        }).join('');
        return `<div class="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar" id="tour-drawer-steps-list">${importBtn}${routeCard}${items}</div>`;
    },

    _bindStepActions(panel) {
        const tour = window.LaravelOnboardingTour;
        panel.querySelector('#tour-drawer-import-btn')?.addEventListener('click', () => this.openImportTourModal());
        const patternInput = panel.querySelector('#tour-route-pattern-input');
        if (patternInput) {
            patternInput.addEventListener('input', e => { tour.draftRoutePattern = e.target.value; });
        }
        const list = document.getElementById('tour-drawer-steps-list');
        let draggedItem = null;
        if (list) {
            list.querySelectorAll('.tour-drawer-step-item').forEach(item => {
                item.addEventListener('dragstart', e => { draggedItem = item; item.classList.add('is-dragging'); e.dataTransfer.effectAllowed = 'move'; });
                item.addEventListener('dragend', () => {
                    item.classList.remove('is-dragging'); draggedItem = null;
                    const newOrder = [];
                    list.querySelectorAll('.tour-drawer-step-item').forEach((el, i) => { const s = tour.draftSteps[parseInt(el.dataset.idx)]; s.sort_order = i + 1; newOrder.push(s); el.dataset.idx = i; const b = el.querySelector('.step-num-badge'); if (b) b.innerText = i + 1; });
                    tour.draftSteps = newOrder; tour.renderInspectorBar(); tour.showToast(t('step_order_updated', 'Step order updated'), 'success');
                });
                item.addEventListener('dragover', e => { e.preventDefault(); if (!draggedItem || draggedItem === item) return; const mid = item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2; list.insertBefore(draggedItem, e.clientY < mid ? item : item.nextSibling); });
            });
        }
        panel.querySelectorAll('.tour-test-step-btn').forEach(b => b.onclick = () => tour.testSingleStep(parseInt(b.dataset.idx)));
        panel.querySelectorAll('.tour-edit-step-btn').forEach(b => b.onclick = () => {
            const step = tour.draftSteps[parseInt(b.dataset.idx)];
            let el = null; try { el = document.querySelector(escapeWireSelector(step.element_selector)); } catch (e) { }
            if (!el && step.target_text) el = tour.findByTextContent(step.target_text);
            this.closeStepManagerDrawer(); tour.openStepBuilderModal(el || document.body, parseInt(b.dataset.idx));
        });
        panel.querySelectorAll('.tour-delete-step-btn').forEach(b => b.onclick = e => {
            e.stopPropagation(); const idx = parseInt(b.dataset.idx);
            tour.showConfirmModal(t('delete_step', 'Delete step'), t('confirm_delete_step_msg', 'Delete this step?'), () => { tour.draftSteps.splice(idx, 1); tour.renderInspectorBar(); this.openStepManagerDrawer(); tour.showToast(t('step_deleted_success', 'Step deleted'), 'success'); });
        });
    },

    openImportTourModal() {
        const tourEngine = window.LaravelOnboardingTour;
        fetch('/api/onboarding-tour/list')
            .then(r => r.json())
            .then(data => {
                const tours = data.tours || [];
                if (!tours.length) {
                    tourEngine.showToast(t('no_tours_to_import', 'Nessun altro tour disponibile da clonare.'), 'info');
                    return;
                }

                document.getElementById('tour-import-modal')?.remove();
                const modal = document.createElement('div');
                modal.id = 'tour-import-modal';
                modal.className = 'tour-modal-overlay tour-import-modal';

                const itemsHtml = tours.map(tour => {
                    const count = tour.steps_count || (tour.steps ? tour.steps.length : 0);
                    const routeName = this.normalizeRoutePattern(tour.route_name);
                    
                    let title = tour.title ? tour.title.trim() : '';
                    if (!title || title.startsWith('Tour http') || title === `Tour ${tour.route_name}` || title === `Tour ${routeName}` || title === `Tour /${routeName}`) {
                        title = `Tour: ${routeName}`;
                    } else if (title.startsWith('Tour ')) {
                        title = 'Tour: ' + this.normalizeRoutePattern(title.substring(5));
                    }

                    const showSubtitle = tour.title && tour.title !== title && tour.title !== routeName && tour.title !== `Tour ${routeName}` && tour.title !== `Tour: ${routeName}`;
                    const subtitleHtml = showSubtitle ? `<p class="text-[10px] font-mono text-zinc-400 truncate mt-0.5">${routeName}</p>` : '';

                    const isCurrent = tourEngine.currentTour && (tourEngine.currentTour.id === tour.id || (tourEngine.currentTour.route_name && this.normalizeRoutePattern(tourEngine.currentTour.route_name) === routeName));

                    if (isCurrent) {
                        return `<div class="tour-card-box p-3 cursor-not-allowed flex items-center justify-between gap-3 border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 select-none">
                            <div class="min-w-0 flex-1">
                                <div class="flex items-center gap-2">
                                    <h4 class="font-bold text-xs text-zinc-800 dark:text-zinc-100 truncate">${title}</h4>
                                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 flex-shrink-0 shadow-sm">${t('current_page_badge', 'Pagina Attuale')}</span>
                                </div>
                                ${subtitleHtml}
                            </div>
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-500/10 flex-shrink-0">${count} step</span>
                        </div>`;
                    }

                    return `<div class="tour-card-box p-3 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all cursor-pointer flex items-center justify-between gap-3 tour-import-item group" data-tour-id="${tour.id}">
                        <div class="min-w-0 flex-1">
                            <h4 class="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors truncate">${title}</h4>
                            ${subtitleHtml}
                        </div>
                        <div class="flex items-center gap-2 flex-shrink-0">
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">${count} step</span>
                            <button type="button" class="tour-btn tour-btn-accent text-[11px] py-1 px-2.5 rounded-lg font-bold flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100">${SVG.copy} <span>${t('import_btn_action', 'Importa')}</span></button>
                        </div>
                    </div>`;
                }).join('');

                modal.innerHTML = `<div class="tour-modal-card" style="max-width:440px;padding:20px">
                    <div class="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                        <div>
                            <h3 class="text-base font-bold text-zinc-900 dark:text-zinc-100">${t('import_tour_title', 'Importa Tour da un\'altra pagina')}</h3>
                            <p class="text-xs text-zinc-400 mt-0.5">${t('import_tour_subtitle', 'Seleziona un tour esistente per copiarne gli step in questa pagina.')}</p>
                        </div>
                        <button id="import-modal-close-btn" class="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">${SVG.close}</button>
                    </div>
                    <div class="space-y-2 max-h-60 overflow-y-auto custom-scrollbar my-3">
                        ${itemsHtml}
                    </div>
                    <div class="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200/80 dark:border-zinc-800">
                        <button id="import-modal-cancel-btn" class="tour-btn tour-btn-ghost text-xs">${t('cancel', 'Annulla')}</button>
                    </div>
                </div>`;

                document.body.appendChild(modal);

                modal.querySelector('#import-modal-close-btn').onclick = () => modal.remove();
                modal.querySelector('#import-modal-cancel-btn').onclick = () => modal.remove();

                modal.querySelectorAll('.tour-import-item').forEach(item => {
                    item.onclick = () => {
                        const tourId = parseInt(item.dataset.tourId);
                        const selectedTour = tours.find(t => t.id === tourId);
                        if (!selectedTour) return;

                        const count = selectedTour.steps ? selectedTour.steps.length : 0;
                        const msg = t('import_tour_confirm_msg', `Importare i ${count} step da questo tour? Gli step esistenti nel draft verranno sostituiti.`).replace(':count', count);

                        tourEngine.showConfirmModal(t('import_tour_title', 'Importa Tour'), msg, () => {
                            modal.remove();
                            if (selectedTour.steps) {
                                tourEngine.draftSteps = selectedTour.steps.map((s, idx) => ({
                                    element_selector: s.element_selector,
                                    target_text: s.target_text,
                                    trigger_selector: s.trigger_selector,
                                    title: s.title,
                                    description: s.description,
                                    video_url: s.video_url,
                                    card_size: s.card_size || 'md',
                                    is_action: !!s.is_action,
                                    position: s.position || 'auto',
                                    sort_order: idx + 1,
                                }));
                            }
                            tourEngine.showToast(t('import_tour_success', 'Step importati con successo!'), 'success');
                            tourEngine.renderInspectorBar();
                            this.openStepManagerDrawer();
                        });
                    };
                });
            })
            .catch(e => {
                console.error(e);
                tourEngine.showToast(t('server_error', 'Server error'), 'error');
            });
    }
};
