/**
 * Laravel Onboarding Tour — Builder Module
 * Admin Inspector bar, element targeting, step builder modal, selector generator, and step testing
 */

const BuilderModule = {
    toggleInspectorMode() {
        const tour = window.LaravelOnboardingTour;
        const now = Date.now();
        if (tour._lastToggleTime && (now - tour._lastToggleTime) < 350) return;
        tour._lastToggleTime = now;
        tour.inspectorActive = !tour.inspectorActive;
        tour.isInteractiveNav = false;
        if (tour.inspectorActive) {
            this.renderInspectorBar();
            document.addEventListener('mousemove', tour._onMouseMove = (e) => this.handleInspectorHover(e));
            document.addEventListener('mousedown', tour._onMouseDown = (e) => this._preventNav(e), true);
            document.addEventListener('pointerdown', tour._onPointerDown = (e) => this._preventNav(e), true);
            document.addEventListener('click', tour._onClick = (e) => this.handleInspectorClick(e), true);
            tour.showToast(t('builder_enabled', 'Builder Mode enabled'), 'info');
        } else {
            document.getElementById('tour-inspector-bar')?.remove();
            tour.closeStepManagerDrawer();
            this.removeInspectorOutline();
            if (tour._onMouseMove) document.removeEventListener('mousemove', tour._onMouseMove);
            if (tour._onMouseDown) document.removeEventListener('mousedown', tour._onMouseDown, true);
            if (tour._onPointerDown) document.removeEventListener('pointerdown', tour._onPointerDown, true);
            if (tour._onClick) document.removeEventListener('click', tour._onClick, true);
            tour.showToast(t('builder_disabled', 'Builder Mode disabled'), 'info');
        }
    },

    renderInspectorBar() {
        const tour = window.LaravelOnboardingTour;
        const bar = getOrCreate('tour-inspector-bar', 'div', 'tour-inspector-bar');
        const interactClass = tour.isInteractiveNav ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : 'tour-btn-ghost';
        const interactText = tour.isInteractiveNav ? t('interact_mode_active', 'Navigazione UI') : t('toggle_interact_btn', 'Interagisci');
        bar.innerHTML = `<div class="flex items-center gap-2"><span class="tour-inspector-dot-wrapper"><span class="tour-inspector-dot-ping"></span><span class="tour-inspector-dot-core"></span></span><span>${t('builder_mode', 'Builder Mode')}</span></div><div class="flex items-center gap-2"><button id="tour-toggle-interact-btn" class="tour-btn ${interactClass}" title="${t('toggle_interact_help', 'Fai clic per aprire schede o navigare liberamente')}">${SVG.pointer}<span>${interactText}</span></button><button id="tour-manage-steps-btn" class="tour-btn tour-btn-ghost">${SVG.list}<span>${t('manage_steps', 'Steps')}</span></button><button id="tour-theme-toggle-btn" class="tour-btn tour-btn-ghost">${SVG.palette}<span>${t('theme', 'Theme')}</span></button><button id="tour-shortcuts-inspector-btn" class="tour-btn tour-btn-ghost">${SVG.keyboard}<span>${t('shortcuts_btn', 'Shortcuts')}</span></button><button id="tour-save-all-btn" class="tour-btn tour-btn-accent">${SVG.check}<span>${t('save_tour', 'Save tour')}</span></button><button id="tour-close-inspector-btn" class="tour-btn tour-btn-ghost">${SVG.close}<span>${t('exit', 'Exit')}</span></button></div>`;

        document.getElementById('tour-toggle-interact-btn').onclick = () => {
            tour.isInteractiveNav = !tour.isInteractiveNav;
            if (tour.isInteractiveNav) {
                this.removeInspectorOutline();
                tour.showToast(t('interact_enabled_toast', 'Navigazione libera attiva: ora puoi fare clic liberamente su schede e pulsanti'), 'info');
            } else {
                tour.showToast(t('pick_enabled_toast', 'Selezione elementi attiva: clicca su un elemento per aggiungere uno step'), 'info');
            }
            this.renderInspectorBar();
        };
        document.getElementById('tour-manage-steps-btn').onclick = () => { tour.activeDrawerTab = 'steps'; tour.openStepManagerDrawer(); };
        document.getElementById('tour-theme-toggle-btn').onclick = () => { tour.activeDrawerTab = 'theme'; tour.openStepManagerDrawer(); };
        document.getElementById('tour-shortcuts-inspector-btn').onclick = () => ShortcutsModule.toggleShortcutsModal();
        document.getElementById('tour-save-all-btn').onclick = () => tour.showConfirmModal(t('save_tour', 'Save'), t('save_tour_confirm', 'Save tour?'), () => tour.saveTourDraft());
        document.getElementById('tour-close-inspector-btn').onclick = () => this.toggleInspectorMode();
    },

    handleInspectorHover(e) {
        const tour = window.LaravelOnboardingTour;
        if (tour.isInteractiveNav || !tour.inspectorActive || isOwnUI(e.target) || (isModalOpen() && !tour.triggerPickerActive) || document.getElementById('tour-drawer-panel')) { this.removeInspectorOutline(); return; }
        const tgt = (e.target.closest && (e.target.closest('button, a, [role="button"]') || (['path', 'svg', 'g'].includes(e.target.tagName.toLowerCase()) ? e.target.closest('button, a, li, div') : null))) || e.target;
        tour.hoveredElement = tgt; this.showOutline(tgt);
    },

    _preventNav(e) {
        const tour = window.LaravelOnboardingTour;
        if (tour.isInteractiveNav || !tour.inspectorActive || isOwnUI(e.target)) return;
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    },

    handleInspectorClick(e) {
        const tour = window.LaravelOnboardingTour;
        if (tour.isInteractiveNav || !tour.inspectorActive || isOwnUI(e.target)) return;
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        const tgt = (e.target.closest && (e.target.closest('button, a, [role="button"]') || (['path', 'svg', 'g'].includes(e.target.tagName.toLowerCase()) ? e.target.closest('button, a, li, div') : null))) || e.target;

        if (tour.triggerPickerActive) {
            const triggerSelector = this.generateSelector(tgt);
            tour.triggerPickerActive = false;
            document.getElementById('tour-trigger-picker-banner')?.remove();
            this.removeInspectorOutline();
            this.openStepBuilderModal(tour.triggerPickerTargetEl, tour.triggerPickerEditingIdx, triggerSelector);
            return;
        }

        if (isModalOpen()) return;
        if (document.getElementById('tour-drawer-panel')) { tour.closeStepManagerDrawer(); this.removeInspectorOutline(); return; }
        tour.selectedElement = tgt; this.openStepBuilderModal(tgt);
    },

    showOutline(target) {
        const outline = getOrCreate('tour-inspector-outline', 'div', 'tour-inspector-outline');
        const rect = target.getBoundingClientRect();
        Object.assign(outline.style, { top: `${rect.top + window.scrollY}px`, left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`, height: `${rect.height}px` });
        let badge = outline.querySelector('.tour-inspector-badge');
        if (!badge) { badge = document.createElement('div'); badge.className = 'tour-inspector-badge'; outline.appendChild(badge); }
        badge.innerText = this.generateSelector(target);
    },

    removeInspectorOutline() { document.getElementById('tour-inspector-outline')?.remove(); },

    generateSelector(el) {
        if (!el || el === document.body) return 'body';
        const tryUnique = sel => { try { return document.querySelectorAll(sel).length === 1 ? sel : null; } catch (e) { return null; } };
        const safeAttr = (name, val) => `[${name.replace(/:/g, '\\3a ')}="${CSS?.escape?.(val) || val.replace(/"/g, '\\"')}"]`;

        if (el.hasAttribute('data-tour')) { const s = tryUnique(`[data-tour="${el.getAttribute('data-tour')}"]`); if (s) return s; }
        if (el.id) { const s = tryUnique(`#${CSS?.escape?.(el.id) || el.id}`); if (s) return s; }
        if (el.hasAttribute('wire:key')) { const s = tryUnique(safeAttr('wire:key', el.getAttribute('wire:key'))); if (s) return s; }

        const parts = []; let curr = el;
        while (curr && curr !== document.body && parts.length < 5) {
            let tag = curr.tagName.toLowerCase(), step = tag;
            const parent = curr.parentElement;

            if (curr.id) {
                step = `#${CSS?.escape?.(curr.id) || curr.id}`;
            } else if (curr.hasAttribute('wire:key')) {
                step = safeAttr('wire:key', curr.getAttribute('wire:key'));
            } else if (curr.hasAttribute('data-tour')) {
                step = `[data-tour="${curr.getAttribute('data-tour')}"]`;
            } else {
                if (curr.className && typeof curr.className === 'string') {
                    const firstClass = curr.className.split(' ').filter(c => c && !c.startsWith('tour-') && !c.includes(':') && !c.includes('[') && !c.includes(']'))[0];
                    if (firstClass) step += `.${CSS?.escape?.(firstClass) || firstClass}`;
                }

                if (parent) {
                    const sameTagSiblings = Array.from(parent.children).filter(c => c.tagName === curr.tagName);
                    if (sameTagSiblings.length > 1) {
                        const idx = sameTagSiblings.indexOf(curr) + 1;
                        step += `:nth-of-type(${idx})`;
                    }
                }
            }

            parts.unshift(step);
            const candidate = parts.join(' > ');
            try { const m = document.querySelectorAll(candidate); if (m.length === 1 && m[0] === el) return candidate; } catch (e) { }
            curr = parent;
        }
        return parts.join(' > ');
    },

    autoDetectParentTrigger(targetEl) {
        if (!targetEl || targetEl === document.body) return null;
        let curr = targetEl.parentElement;
        while (curr && curr !== document.body) {
            const tabId = curr.id || curr.getAttribute('data-tab-content') || curr.getAttribute('data-tab-pane') || curr.getAttribute('data-tab') || curr.getAttribute('data-pane');
            const xShow = curr.getAttribute('x-show') || curr.getAttribute('v-show') || curr.getAttribute('x-if');

            let tabVal = tabId;
            if (!tabVal && xShow) {
                const match = xShow.match(/['"]([^'"]+)['"]/);
                if (match) tabVal = match[1];
            }

            if (tabVal) {
                let trigger = document.querySelector(`[aria-controls="${tabVal}"], [href="#${tabVal}"], [data-target="#${tabVal}"], [data-bs-target="#${tabVal}"], [data-tab="${tabVal}"], [data-tab-target="${tabVal}"], [data-tab-toggle="${tabVal}"]`);
                if (!trigger) {
                    trigger = Array.from(document.querySelectorAll('button, a, [role="tab"]')).find(b => {
                        const clk = b.getAttribute('@click') || b.getAttribute('x-on:click') || b.getAttribute('v-on:click') || b.getAttribute('onclick') || '';
                        return clk.includes(`'${tabVal}'`) || clk.includes(`"${tabVal}"`);
                    });
                }
                if (trigger) return this.generateSelector(trigger);
            }

            if (curr.getAttribute('role') === 'tabpanel' && curr.id) {
                const trigger = document.querySelector(`[aria-controls="${curr.id}"], [href="#${curr.id}"], [data-target="#${curr.id}"]`);
                if (trigger) return this.generateSelector(trigger);
            }

            curr = curr.parentElement;
        }
        return null;
    },

    getHierarchyBreadcrumbs(el) {
        const crumbs = []; let curr = el;
        while (curr && curr !== document.body && crumbs.length < 4) {
            crumbs.unshift({ element: curr, label: curr.tagName.toLowerCase() + (curr.id ? `#${curr.id}` : (curr.className && typeof curr.className === 'string' ? '.' + curr.className.split(' ')[0] : '')) });
            curr = curr.parentElement;
        }
        return crumbs;
    },

    openStepBuilderModal(targetEl, editingIndex = null, pickedTriggerSelector = null) {
        const tour = window.LaravelOnboardingTour;
        this.removeInspectorOutline();
        document.getElementById('tour-builder-modal')?.remove();
        const isEditing = editingIndex !== null;
        const existing = isEditing ? tour.draftSteps[editingIndex] : null;
        const selector = existing ? existing.element_selector : this.generateSelector(targetEl);
        const autoDetectedTrigger = (!existing?.trigger_selector && targetEl) ? this.autoDetectParentTrigger(targetEl) : null;
        const triggerSel = pickedTriggerSelector !== null ? pickedTriggerSelector : (existing?.trigger_selector || autoDetectedTrigger || '');
        const textContent = existing ? existing.target_text : (targetEl.innerText || targetEl.textContent || '').trim().substring(0, 30);
        const breadcrumbs = this.getHierarchyBreadcrumbs(targetEl);
        const defaultLoc = tour.config.default_locale || 'en';
        const rawLocales = tour.config.locales?.length ? tour.config.locales : ['it', 'en'];
        const locales = [defaultLoc, ...rawLocales.filter(l => l !== defaultLoc)];
        const getLocVal = (obj, loc) => { if (!obj) return ''; if (typeof obj === 'string') return loc === locales[0] ? obj : ''; return obj?.[loc] || ''; };

        let currentMode = existing?.is_action || existing?.card_size === 'action' || existing?.step_type === 'action' ? 'action' : 'standard';

        const modal = document.createElement('div');
        modal.id = 'tour-builder-modal';
        modal.className = 'tour-modal-overlay';

        const crumbsHtml = breadcrumbs.map((b, i) => `<span class="tour-breadcrumb-chip ${i === breadcrumbs.length - 1 ? 'active' : ''}" data-crumb-idx="${i}">${b.label}</span>`).join(' <span class="text-zinc-600">/</span> ');
        const showLangTabs = locales.length > 1;
        const langTabs = showLangTabs ? locales.map(loc => `<button type="button" class="tour-lang-tab-pill ${loc === defaultLoc ? 'active' : ''}" data-loc="${loc}"><span class="uppercase font-bold">${loc.toUpperCase()}</span></button>`).join('') : '';
        const langPanels = locales.map(loc => `<div class="tour-lang-panel ${loc === locales[0] ? '' : 'hidden'}" data-loc-panel="${loc}"><div class="space-y-3"><div><label class="tour-label">${t('step_title_label', 'Titolo')} ${showLangTabs ? `(${loc.toUpperCase()})` : ''}</label><input type="text" data-field="title" data-loc="${loc}" value="${getLocVal(existing?.title_i18n || existing?.title, loc)}" placeholder="${t('step_title_label', 'Es. Benvenuto nella dashboard')}" class="tour-input"/></div><div><label class="tour-label">${t('step_content_label', 'Descrizione')} ${showLangTabs ? `(${loc.toUpperCase()})` : ''}</label><textarea data-field="description" data-loc="${loc}" rows="2" placeholder="${t('step_content_label', 'Spiega cosa fa questo elemento...')}" class="tour-textarea">${getLocVal(existing?.description_i18n || existing?.description, loc)}</textarea></div></div></div>`).join('');
        const sizeOpt = (v, l) => `<option value="${v}" ${currentMode !== 'action' && (existing?.card_size === v || (!existing?.card_size && v === 'md')) ? 'selected' : ''}>${l}</option>`;

        const modeSwitch = `<div class="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/80 mb-3"><button type="button" id="btn-mode-standard" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentMode === 'standard' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400'}">${SVG.card} <span>${t('step_mode_standard', 'Card Spiegazione')}</span></button><button type="button" id="btn-mode-action" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentMode === 'action' ? 'bg-amber-500 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400'}">${SVG.target} <span>${t('step_mode_action', 'Azione Automatica')}</span></button></div>`;

        const actionBanner = `<div id="step-action-banner" class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-medium leading-relaxed flex items-start gap-2.5 ${currentMode === 'action' ? '' : 'hidden'}"><span class="p-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 flex-shrink-0">${SVG.target}</span><div><span class="font-bold block text-zinc-900 dark:text-zinc-100 mb-0.5">${t('step_action_badge', 'Navigazione Automatica')}</span><span>${t('step_action_help', 'Esegue un clic automatico sull\'elemento e passa allo step successivo.')}</span></div></div>`;

        const mainCardFields = `<div id="step-standard-fields" class="space-y-3 ${currentMode === 'standard' ? '' : 'hidden'}">${showLangTabs ? `<div class="tour-lang-tab-container mb-2">${langTabs}</div>` : ''}${langPanels}</div>`;

        const advancedAccordion = `<details class="group rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden text-xs"><summary class="flex items-center justify-between p-2.5 font-semibold text-zinc-600 dark:text-zinc-400 cursor-pointer select-none hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"><span class="flex items-center gap-2">${SVG.pencil} <span>${t('advanced_options', 'Opzioni Avanzate (Selettore, Scheda, Dimensione)')}</span></span><span class="transition-transform group-open:rotate-180 text-zinc-400">${SVG.chevronDown}</span></summary><div class="p-3 pt-2 space-y-3 border-t border-zinc-200/60 dark:border-zinc-800/60"><div><label class="tour-label">${t('step_target_label', 'CSS Selector')}</label><input type="text" id="step-selector-input" value="${selector}" class="tour-input font-mono text-xs" /><div class="tour-breadcrumb-bar mt-1.5" id="tour-crumb-bar">${crumbsHtml}</div></div><div id="step-adv-standard" class="space-y-3 ${currentMode === 'standard' ? '' : 'hidden'}"><div class="grid grid-cols-2 gap-3"><div><label class="tour-label">${t('card_size_label', 'Dimensione Card')}</label><select id="step-card-size-input" class="tour-select text-xs">${sizeOpt('sm', t('size_sm', 'Small'))}${sizeOpt('md', t('size_md', 'Standard'))}${sizeOpt('lg', t('size_lg', 'Medium'))}${sizeOpt('xl', t('size_xl', 'Wide'))}</select></div><div><label class="tour-label">${t('media_url_label', 'Media URL (Immagine/Video)')}</label><input type="text" id="step-media-url-input" value="${getLocVal(existing?.video_url_i18n || existing?.video_url || existing?.media_url, defaultLoc)}" placeholder="https://..." class="tour-input text-xs" /></div></div><div><div class="flex items-center justify-between"><label class="tour-label" style="margin-bottom:0">${t('step_trigger_label', 'Azione automatica (es. apri scheda)')}</label>${autoDetectedTrigger ? `<span class="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">${SVG.check} <span>${t('trigger_autodetected', 'Scheda rilevata')}</span></span>` : ''}</div><div class="flex items-center gap-2 mt-1"><input type="text" id="step-trigger-selector-input" value="${triggerSel}" class="tour-input font-mono text-xs flex-1" placeholder="es. #tab-settings-btn" /><button type="button" id="modal-pick-trigger-btn" class="tour-btn border border-zinc-300 dark:border-zinc-700 text-xs px-2.5 py-1.5 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 flex items-center gap-1.5">${SVG.target} <span>${t('pick_trigger_btn', 'Seleziona scheda')}</span></button></div></div></div></div></details>`;

        modal.innerHTML = `<div class="tour-modal-card" style="max-width:500px;padding:20px"><div class="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-200/60 dark:border-zinc-800"><h3 class="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><span>${isEditing ? `${t('modal_title_edit', 'Modifica Step')} #${editingIndex + 1}` : t('add_step_to_tour', 'Aggiungi Step')}</span></h3><button id="modal-close-icon-btn" class="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">${SVG.close}</button></div><div class="space-y-3">${modeSwitch}${mainCardFields}${actionBanner}${advancedAccordion}</div><div class="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200/80 dark:border-zinc-800 mt-4"><button id="modal-cancel-btn" class="tour-btn tour-btn-ghost text-xs">${t('cancel', 'Annulla')}</button><button id="modal-add-step-btn" class="tour-btn tour-btn-accent text-xs font-bold px-4 py-1.5">${isEditing ? t('save_changes', 'Salva Modifiche') : t('add_step', 'Aggiungi Step')}</button></div></div>`;
        document.body.appendChild(modal);

        const btnStd = document.getElementById('btn-mode-standard');
        const btnAct = document.getElementById('btn-mode-action');
        const stdFields = document.getElementById('step-standard-fields');
        const actBanner = document.getElementById('step-action-banner');
        const advStd = document.getElementById('step-adv-standard');

        const setMode = (mode) => {
            currentMode = mode;
            if (mode === 'standard') {
                btnStd.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm';
                btnAct.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400';
                stdFields.classList.remove('hidden');
                actBanner.classList.add('hidden');
                advStd.classList.remove('hidden');
            } else {
                btnAct.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-amber-500 text-white shadow-sm';
                btnStd.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400';
                stdFields.classList.add('hidden');
                actBanner.classList.remove('hidden');
                advStd.classList.add('hidden');
            }
        };

        btnStd.onclick = () => setMode('standard');
        btnAct.onclick = () => setMode('action');

        document.getElementById('modal-close-icon-btn').onclick = () => { modal.remove(); this.removeInspectorOutline(); };
        document.getElementById('modal-cancel-btn').onclick = () => { modal.remove(); this.removeInspectorOutline(); };

        document.getElementById('modal-pick-trigger-btn').onclick = () => {
            modal.remove();
            tour.triggerPickerActive = true;
            tour.triggerPickerTargetEl = targetEl;
            tour.triggerPickerEditingIdx = editingIndex;

            const banner = getOrCreate('tour-trigger-picker-banner', 'div', 'tour-picker-banner');
            banner.innerHTML = `<div class="flex items-center gap-2">${SVG.target} <span>${t('trigger_picker_banner', 'Clicca sulla scheda o sul pulsante da aprire prima dello step')}</span></div><button type="button" id="tour-cancel-trigger-pick-btn" class="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors">${t('cancel', 'Annulla')}</button>`;

            banner.querySelector('#tour-cancel-trigger-pick-btn').onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                banner.remove();
                tour.triggerPickerActive = false;
                this.removeInspectorOutline();
                this.openStepBuilderModal(targetEl, editingIndex);
            };
        };

        modal.querySelectorAll('.tour-lang-tab-pill').forEach(btn => btn.onclick = () => { modal.querySelectorAll('.tour-lang-tab-pill').forEach(b => b.classList.remove('active')); btn.classList.add('active'); modal.querySelectorAll('.tour-lang-panel').forEach(p => p.classList.toggle('hidden', p.dataset.locPanel !== btn.dataset.loc)); });
        modal.querySelectorAll('.tour-breadcrumb-chip').forEach(chip => chip.onclick = () => { const tgt = breadcrumbs[parseInt(chip.dataset.crumbIdx)].element; tour.selectedElement = tgt; document.getElementById('step-selector-input').value = this.generateSelector(tgt); this.showOutline(tgt); modal.querySelectorAll('.tour-breadcrumb-chip').forEach(c => c.classList.remove('active')); chip.classList.add('active'); });

        document.getElementById('modal-add-step-btn').onclick = () => {
            const isActionStep = currentMode === 'action';
            const mediaVal = document.getElementById('step-media-url-input')?.value.trim() || '';

            const titleObj = {}, descObj = {}, mediaObj = {};
            if (isActionStep) {
                locales.forEach(loc => {
                    titleObj[loc] = 'Azione Automatica';
                    descObj[loc] = '';
                    mediaObj[loc] = '';
                });
            } else {
                locales.forEach(loc => {
                    titleObj[loc] = modal.querySelector(`[data-field="title"][data-loc="${loc}"]`)?.value.trim() || '';
                    descObj[loc] = modal.querySelector(`[data-field="description"][data-loc="${loc}"]`)?.value.trim() || '';
                    mediaObj[loc] = loc === defaultLoc ? mediaVal : (modal.querySelector(`[data-field="video_url"][data-loc="${loc}"]`)?.value.trim() || mediaVal);
                });
            }

            const stepObj = {
                element_selector: document.getElementById('step-selector-input').value,
                target_text: textContent,
                trigger_selector: isActionStep ? null : (document.getElementById('step-trigger-selector-input')?.value.trim() || null),
                title: titleObj, description: descObj, video_url: mediaObj, media_url: mediaObj,
                title_i18n: titleObj, description_i18n: descObj, video_url_i18n: mediaObj,
                card_size: isActionStep ? 'action' : (document.getElementById('step-card-size-input')?.value || 'md'),
                is_action: isActionStep,
                step_type: isActionStep ? 'action' : 'standard',
                position: 'auto',
                sort_order: isEditing ? existing.sort_order : tour.draftSteps.length + 1
            };
            if (isEditing) { tour.draftSteps[editingIndex] = stepObj; tour.showToast(t('step_updated', 'Step aggiornato'), 'success'); }
            else { tour.draftSteps.push(stepObj); tour.showToast(t('step_added', 'Step aggiunto'), 'success'); }
            modal.remove(); this.removeInspectorOutline(); this.renderInspectorBar();
        };
    },

    findByTextContent(text) {
        for (const el of document.querySelectorAll('button, a, h1, h2, h3, h4, span, p, td, th')) { if (el.innerText?.trim().includes(text.trim())) return el; }
        return null;
    },

    testSingleStep(index) {
        const tour = window.LaravelOnboardingTour;
        const step = tour.draftSteps?.[index];
        if (!step) return;
        const isAction = step.is_action || step.card_size === 'action' || step.step_type === 'action';
        if (isAction) {
            let targetEl = tour._findStepTarget(step);
            if (!targetEl && step.trigger_selector) {
                try { targetEl = document.querySelector(escapeWireSelector(step.trigger_selector)); } catch (e) { }
            }
            if (targetEl) {
                try {
                    safeClick(targetEl);
                    tour.showToast(t('step_action_executed', 'Navigazione automatica eseguita!'), 'success');
                } catch (e) {
                    tour.showToast(t('action_step_error', 'Errore durante l\'esecuzione dell\'azione'), 'error');
                }
            } else {
                tour.showToast(t('element_not_found', 'Elemento non trovato nella pagina'), 'error');
            }
            return;
        }
        const targetEl = tour._findStepTarget(step);
        if (!targetEl) { tour.showToast(t('test_step_error', 'Element not found'), 'error'); return; }
        tour.closeStepManagerDrawer(); tour.applyThemeVariables(tour.themeSettings);
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        setTimeout(() => { tour.updateSpotlight(targetEl); tour._renderPopoverCard(targetEl, step, index, tour.draftSteps.length, 'preview'); }, 250);
    },

    deleteEntireTour() {
        const tour = window.LaravelOnboardingTour;
        const routeInput = document.getElementById('tour-route-pattern-input');
        const route = routeInput?.value.trim() || tour.draftRoutePattern || tour.currentTour?.route_name || tour.config?.route_pattern || tour.config?.route_name || window.location.pathname;
        fetch('/api/onboarding-tour/delete', { method: 'POST', headers: csrfHeaders(), body: JSON.stringify({ route_name: route }) })
            .then(r => r.json()).then(data => { if (data.success) { tour.showToast(t('tour_deleted_success', 'Tour deleted'), 'success'); setTimeout(() => window.location.reload(), 1000); } else { tour.showToast(t('error_deleting_tour', 'Error'), 'error'); } })
            .catch(console.error);
    }
};
