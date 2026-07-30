/**
 * Laravel Onboarding Tour — Theme Module
 * Controls theme variables, live preview stage, and global/page theme configurations
 */

const ThemeModule = {
    applyThemeVariables(settings) {
        const root = document.documentElement;
        const accent = settings.accent_color || THEME_DEFAULTS.accent_color;
        root.style.setProperty('--tour-accent-color', accent);
        root.style.setProperty('--tour-accent-light', accent + '1e');
        root.style.setProperty('--tour-backdrop-bg', settings.backdrop_color || hexToRgba(settings.backdrop_hex, settings.backdrop_opacity));
    },

    saveGlobalThemeDraft() {
        const tour = window.LaravelOnboardingTour;
        fetch('/api/onboarding-tour/save-global-theme', {
            method: 'POST',
            headers: csrfHeaders(),
            body: JSON.stringify({ theme_settings: tour.themeSettings })
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    tour.globalTheme = data.global_theme;
                    tour.themeSettings = { ...tour.globalTheme, use_custom_theme: false };
                    this.applyThemeVariables(tour.themeSettings);
                    tour.closeStepManagerDrawer();
                    tour.showToast(t('global_theme_saved_success', 'Global Theme saved!'), 'success');
                } else {
                    tour.showToast(t('error_saving_global_theme', 'Error saving theme'), 'error');
                }
            })
            .catch(e => { console.error(e); tour.showToast(t('error_connection', 'Connection error'), 'error'); });
    },

    _renderThemeTab(useCustom) {
        const tour = window.LaravelOnboardingTour;
        const sub = tour.activeThemeSubTab || 'card';
        const ts = tour.themeSettings;
        const pills = (items, cur, cls) => items.map(i => `<button type="button" class="${cls} ${cur === i.hex ? 'active' : ''}" data-color="${i.hex}"><span class="w-2.5 h-2.5 rounded-full${cls.includes('backdrop') ? ' border border-zinc-500' : ''}" style="background-color:${i.hex}"></span><span>${i.name}</span></button>`).join('');
        const colors = [{ name: t('color_blue', 'Blue'), hex: '#2563eb' }, { name: t('color_emerald', 'Emerald'), hex: '#10b981' }, { name: t('color_purple', 'Purple'), hex: '#7c3aed' }, { name: t('color_amber', 'Amber'), hex: '#d97706' }, { name: t('color_rose', 'Rose'), hex: '#e11d48' }];
        const bgs = [{ name: t('bg_dark_slate', 'Dark Slate'), hex: '#0f172a' }, { name: t('bg_deep_indigo', 'Deep Indigo'), hex: '#1e1b4b' }, { name: t('bg_emerald_night', 'Emerald Night'), hex: '#022c22' }, { name: t('bg_soft_charcoal', 'Soft Charcoal'), hex: '#334155' }];
        const opt = (v, l, c) => `<option value="${v}" ${c === v ? 'selected' : ''}>${l}</option>`;
        const subContent = {
            card: `<div class="tour-card-box p-3.5 space-y-3"><div class="grid grid-cols-2 gap-3"><div><label class="tour-label">${t('card_style_label', 'Card Style')}</label><select id="theme-card-style" class="tour-select">${opt('auto', t('style_auto', 'Auto'), ts.card_style)}${opt('glass', t('style_glass', 'Glass'), ts.card_style)}${opt('dark', t('style_dark', 'Dark'), ts.card_style)}${opt('light', t('style_light', 'Light'), ts.card_style)}</select></div><div><label class="tour-label">${t('card_size_label', 'Card Size')}</label><select id="theme-card-size" class="tour-select">${opt('sm', t('size_sm', 'Small'), ts.card_size)}${opt('md', t('size_md', 'Medium'), ts.card_size || 'md')}${opt('lg', t('size_lg', 'Large'), ts.card_size)}${opt('xl', t('size_xl', 'Extra Large'), ts.card_size)}</select></div></div><div class="pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60 mt-2"><label class="tour-label block mb-2.5">${t('accent_color_label', 'Accent Color')}</label><div class="flex flex-wrap items-center gap-1.5 mb-3">${pills(colors, ts.accent_color, 'tour-color-pill')}</div><div class="flex items-center gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 mt-3"><div class="tour-color-picker-box"><input type="color" id="theme-color-picker" value="${ts.accent_color || '#2563eb'}" class="tour-color-swatch-input"/><span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">${t('color_custom', 'Custom:')}</span></div><div class="flex-1"><input type="text" id="theme-hex-input" value="${ts.accent_color || '#2563eb'}" placeholder="#2563eb" maxlength="7" class="tour-input" style="font-family:monospace;color:var(--tour-text-main);font-weight:700"/></div></div></div></div>`,
            highlight: `<div class="tour-card-box p-4 space-y-2"><label class="tour-label">${t('highlight_style_label', 'Highlight Style')}</label><select id="theme-highlight-style" class="tour-select">${opt('minimal', t('hl_minimal', 'Minimal'), ts.highlight_style)}${opt('ring', t('hl_ring', 'Ring'), ts.highlight_style)}${opt('glow', t('hl_glow', 'Glow'), ts.highlight_style)}${opt('dashed', t('hl_dashed', 'Dashed'), ts.highlight_style)}${opt('none', t('hl_none', 'None'), ts.highlight_style)}</select></div>`,
            backdrop: `<div class="tour-card-box p-4 space-y-4"><div><label class="tour-label block">${t('backdrop_label', 'Background')}</label><div class="flex flex-wrap items-center gap-1.5 mb-3">${pills(bgs, ts.backdrop_hex || '#0f172a', 'tour-backdrop-pill')}</div><div class="flex items-center gap-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60"><div class="tour-color-picker-box"><input type="color" id="theme-backdrop-picker" value="${ts.backdrop_hex || '#0f172a'}" class="tour-color-swatch-input"/><span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">${t('backdrop_color_hex', 'Color:')}</span></div><div class="flex-1"><input type="text" id="theme-backdrop-hex-input" value="${ts.backdrop_hex || '#0f172a'}" placeholder="#0f172a" maxlength="7" class="tour-input" style="font-family:monospace;color:var(--tour-text-main);font-weight:700"/></div></div></div><div class="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60"><div class="flex items-center justify-between mb-1"><label class="tour-label" style="margin-bottom:0">${t('backdrop_opacity', 'Opacity')}</label><span class="text-xs font-mono font-bold text-blue-500" id="backdrop-opacity-val">${ts.backdrop_opacity || 75}%</span></div><input type="range" id="theme-backdrop-opacity" min="20" max="95" value="${ts.backdrop_opacity || 75}" class="tour-range-slider"/></div></div>`
        };
        const subPill = (id, icon, label) => `<button type="button" id="subtab-btn-${id}" class="tour-subnav-pill ${sub === id ? 'active' : ''}">${icon}<span>${label}</span></button>`;
        return `<div class="tour-sticky-preview-header"><div class="flex items-center justify-between mb-2"><label class="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>${t('live_preview', 'Live Preview')}</label></div><div class="tour-live-preview-stage" id="tour-live-preview-stage"><div class="tour-preview-sample-target" id="tour-preview-sample-target">${t('sample_target_element', 'Sample Highlighted Target')}</div><div class="tour-preview-sample-card tour-popover-card card-${ts.card_style || 'auto'} size-${ts.card_size || 'md'}" id="tour-preview-sample-card"><div class="flex items-center justify-between gap-2 mb-2"><h4 class="font-bold text-sm leading-tight">${t('sample_title', 'Step Preview Title')}</h4><span class="tour-badge-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">1/3</span></div><div class="tour-step-desc text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 font-medium">${t('sample_description', 'Preview of how users will see this step.')}</div><div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800"><span class="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">${t('dismiss_btn', "Don't show again")}</span><div class="flex items-center gap-1"><button class="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[10px] font-semibold">${t('prev_btn', 'Back')}</button><button class="px-3.5 py-1 rounded-lg tour-btn-accent text-[10px] font-bold shadow-md">${t('next_btn', 'Next')}</button></div></div></div></div></div><div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"><div class="tour-subnav-bar mb-3"><button type="button" id="theme-scope-global" class="tour-subnav-pill ${!useCustom ? 'active' : ''}">${SVG.globe}<span>${t('scope_global_btn', 'Global Theme')}</span></button><button type="button" id="theme-scope-custom" class="tour-subnav-pill ${useCustom ? 'active' : ''}">${SVG.page}<span>${t('scope_custom_btn', 'Page Theme')}</span></button></div><div class="tour-subnav-bar mb-4">${subPill('card', SVG.card, t('subtab_card', 'Card'))}${subPill('highlight', SVG.target, t('subtab_highlight', 'Highlight'))}${subPill('backdrop', SVG.backdrop, t('subtab_backdrop', 'Backdrop'))}</div><div id="custom-theme-controls-container">${subContent[sub] || ''}</div></div>`;
    },

    _bindThemeHandlers(panel) {
        const tour = window.LaravelOnboardingTour;
        const ts = tour.themeSettings;
        const updatePreview = () => {
            ts.backdrop_color = hexToRgba(ts.backdrop_hex || '#0f172a', ts.backdrop_opacity ?? 75);
            this.applyThemeVariables(ts);
            const stage = document.getElementById('tour-live-preview-stage'), card = document.getElementById('tour-preview-sample-card'), tgt = document.getElementById('tour-preview-sample-target');
            if (stage) stage.style.background = ts.backdrop_color;
            if (card) card.className = `tour-preview-sample-card tour-popover-card card-${ts.card_style || 'auto'} size-${ts.card_size || 'md'}`;
            if (tgt) {
                const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
                Object.assign(tgt.style, { background: isDark ? '#18181b' : '#fff', color: isDark ? '#fff' : '#0f172a', border: 'none', boxShadow: 'none' });
                const a = ts.accent_color || '#2563eb', s = ts.highlight_style || 'minimal';
                const map = { minimal: { border: `2px solid ${a}`, boxShadow: `0 0 15px ${a}60` }, ring: { border: `2.5px solid ${a}`, boxShadow: `0 0 0 4px ${a}50` }, glow: { border: `2px solid ${a}`, boxShadow: `0 0 25px ${a}` }, dashed: { border: `2px dashed ${a}` } };
                if (map[s]) Object.assign(tgt.style, map[s]);
            }
        };
        updatePreview();

        document.getElementById('theme-scope-global')?.addEventListener('click', () => { tour.themeSettings = { ...tour.globalTheme, use_custom_theme: false }; tour.openStepManagerDrawer(); tour.showToast(t('global_theme_enabled', 'Global Theme active'), 'info'); });
        document.getElementById('theme-scope-custom')?.addEventListener('click', () => { ts.use_custom_theme = true; tour.openStepManagerDrawer(); tour.showToast(t('custom_theme_enabled', 'Custom mode'), 'info'); });
        ['card', 'highlight', 'backdrop'].forEach(tab => document.getElementById(`subtab-btn-${tab}`)?.addEventListener('click', () => { tour.activeThemeSubTab = tab; tour.openStepManagerDrawer(); }));

        const bindSelect = (id, prop) => { const el = document.getElementById(id); if (el) el.onchange = e => { ts[prop] = e.target.value; updatePreview(); }; };
        bindSelect('theme-card-style', 'card_style'); bindSelect('theme-card-size', 'card_size'); bindSelect('theme-highlight-style', 'highlight_style');

        const setColor = (prop, hexId, pickerId) => val => {
            if (!/^#[0-9A-F]{6}$/i.test(val)) return; ts[prop] = val;
            const hi = document.getElementById(hexId), pi = document.getElementById(pickerId);
            if (hi && hi.value !== val) hi.value = val; if (pi && pi.value !== val) pi.value = val;
            updatePreview();
        };
        const setAccent = setColor('accent_color', 'theme-hex-input', 'theme-color-picker');
        const setBackdrop = setColor('backdrop_hex', 'theme-backdrop-hex-input', 'theme-backdrop-picker');

        document.getElementById('theme-color-picker')?.addEventListener('input', e => setAccent(e.target.value));
        document.getElementById('theme-hex-input')?.addEventListener('input', e => { let v = e.target.value.trim(); if (!v.startsWith('#')) v = '#' + v; setAccent(v); });
        document.getElementById('theme-backdrop-picker')?.addEventListener('input', e => setBackdrop(e.target.value));
        document.getElementById('theme-backdrop-hex-input')?.addEventListener('input', e => { let v = e.target.value.trim(); if (!v.startsWith('#')) v = '#' + v; setBackdrop(v); });
        document.getElementById('theme-backdrop-opacity')?.addEventListener('input', e => { ts.backdrop_opacity = parseInt(e.target.value); const l = document.getElementById('backdrop-opacity-val'); if (l) l.innerText = `${ts.backdrop_opacity}%`; updatePreview(); });

        const bindPills = (cls, setter) => panel.querySelectorAll(`.${cls}`).forEach(p => { p.onclick = () => { setter(p.dataset.color); panel.querySelectorAll(`.${cls}`).forEach(x => x.classList.remove('active')); p.classList.add('active'); }; });
        bindPills('tour-color-pill', setAccent); bindPills('tour-backdrop-pill', setBackdrop);
    }
};
