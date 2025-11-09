<script setup>
const props = defineProps({
  // Headline text
  headline: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Social/contact options
  options: {
    type: Array,
    required: true,
    // Example: [{ icon: 'email', label: 'E-Mail' }, { icon: 'chat', label: 'Live Chat' }]
  },
  // CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Get in touch', href: '/contact' }
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    // Options: 'light', 'neutral', 'forest-green'
  },
})

// Theme colors
const themeStyles = {
  light: {
    bg: 'bg-white',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
    iconBg: 'bg-gray-100',
  },
  neutral: {
    bg: 'bg-gray-50',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
    iconBg: 'bg-gray-200',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    text: 'text-white',
    subtext: 'text-white/80',
    iconBg: 'bg-[#2A6B42]',
  },
}

// Icon SVGs
const iconPaths = {
  email:
    'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  phone:
    'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
}
</script>

<template>
  <div :class="['icon-socials py-12 md:py-16 px-4', themeStyles[theme].bg]">
    <div class="max-w-4xl mx-auto text-center space-y-8">
      <!-- Headline -->
      <h2 :class="['text-3xl md:text-4xl font-bold leading-tight', themeStyles[theme].text]">
        {{ headline }}
      </h2>

      <!-- Description -->
      <p
        v-if="description"
        :class="['text-base md:text-lg leading-relaxed', themeStyles[theme].subtext]"
      >
        {{ description }}
      </p>

      <!-- Contact Options -->
      <div class="flex flex-wrap justify-center gap-4 md:gap-6">
        <div v-for="(option, index) in options" :key="index" class="flex items-center gap-3">
          <!-- Icon -->
          <div
            :class="[
              'w-12 h-12 rounded-full flex items-center justify-center',
              themeStyles[theme].iconBg,
            ]"
          >
            <svg
              class="w-6 h-6"
              :class="themeStyles[theme].text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="iconPaths[option.icon] || iconPaths.email"
              />
            </svg>
          </div>

          <!-- Label -->
          <span :class="['text-base font-semibold', themeStyles[theme].text]">
            {{ option.label }}
          </span>
        </div>
      </div>

      <!-- CTA Button -->
      <div v-if="cta">
        <a
          :href="cta.href"
          :class="[
            'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 shadow-md',
            theme === 'forest-green'
              ? 'bg-content-positive text-content-primary'
              : 'bg-content-positive text-content-primary',
          ]"
        >
          {{ cta.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}
</style>
