<button id="tour-start-btn"
        title="{{ __('onboarding-tour::messages.start_tour_title') }}"
        {{ $attributes->merge(['class' => 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95']) }}>
    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{{ __('onboarding-tour::messages.start_tour_btn') }}</span>
</button>
