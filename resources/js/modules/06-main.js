/**
 * Laravel Onboarding Tour — Main Module
 * Orchestrates modules into window.LaravelOnboardingTour & binds global delegation
 */

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
    activeThemeSubTab: 'card',
    _lastToggleTime: 0,
    themeSettings: { ...THEME_DEFAULTS },

    isTourActive() {
        return !!document.getElementById('tour-popover-card');
    },

    nextStep() {
        if (this.currentStepIndex < (this.currentTour?.steps?.length ?? 0) - 1) {
            this.currentStepIndex++;
            this.renderStep(this.currentStepIndex);
        } else {
            this.closeTour(true);
        }
    },

    prevStep() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            this.renderStep(this.currentStepIndex);
        }
    },

    toggleShortcutsModal(s) {
        ShortcutsModule.toggleShortcutsModal(s);
    },

    // Mix in modules
    ...ThemeModule,
    ...BuilderModule,
    ...DrawerModule,
    ...RunnerModule
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
        if (reinitPending) return;
        reinitPending = true;
        const route = window.location.pathname;
        fetch(`/api/onboarding-tour/config?route_name=${encodeURIComponent(route)}`)
            .then(r => r.json()).then(data => {
                reinitPending = false;
                if (data && window.LaravelOnboardingTour) {
                    window.LaravelOnboardingTour.init({
                        route_name: route,
                        tour: data.tour,
                        global_theme: data.global_theme,
                        translations: data.translations || window.LaravelOnboardingTour.config?.translations,
                        locales: data.locales,
                        current_locale: data.current_locale
                    });
                }
            })
            .catch(e => { reinitPending = false; console.error('[OnboardingTour] Re-init error:', e); });
    }

    document.addEventListener('livewire:navigated', autoReinit);
    document.addEventListener('livewire:initialized', autoReinit);
}
