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
  // CTA buttons
  cta: {
    type: Object,
    default: null,
    // Example: { primary: { label, href }, secondary: { label, href } }
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    // Options: 'light', 'bright-green', 'forest-green'
  },
})

// Theme colors
const themeStyles = {
  light: {
    bg: 'bg-white',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
  },
  'bright-green': {
    bg: 'bg-content-positive',
    text: 'text-content-primary',
    subtext: 'text-content-primary/80',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    text: 'text-white',
    subtext: 'text-white/80',
  },
}
</script>

<template>
  <div :class="['hero-simple py-16 md:py-20 lg:py-24 px-4', themeStyles[theme].bg]">
    <div class="max-w-5xl mx-auto text-center">
      <!-- Headline -->
      <h1
        :class="[
          'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight mb-6',
          themeStyles[theme].text,
        ]"
        style="font-family: var(--font-heading)"
      >
        {{ headline }}
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        :class="[
          'text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8',
          themeStyles[theme].subtext,
        ]"
      >
        {{ description }}
      </p>

      <!-- CTAs -->
      <div v-if="cta" class="flex flex-col sm:flex-row gap-4 justify-center">
        <!-- Primary CTA -->
        <a
          v-if="cta.primary"
          :href="cta.primary.href"
          :class="[
            'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 shadow-md',
            theme === 'forest-green'
              ? 'bg-content-positive text-content-primary'
              : 'bg-content-positive text-content-primary',
          ]"
        >
          {{ cta.primary.label }}
        </a>

        <!-- Secondary CTA -->
        <a
          v-if="cta.secondary"
          :href="cta.secondary.href"
          :class="[
            'inline-flex items-center justify-center px-8 py-3.5 font-semibold text-base transition-all hover:opacity-70 underline',
            themeStyles[theme].text,
          ]"
        >
          {{ cta.secondary.label }}
        </a>
      </div>

      <!-- Slot for additional content -->
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}
</style>
