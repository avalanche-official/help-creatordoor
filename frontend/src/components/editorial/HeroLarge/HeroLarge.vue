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
  // Review/rating badges
  badges: {
    type: Array,
    default: () => [],
    // Example: [{ icon: '⭐', rating: '4.3★', source: 'on App Store', reviews: '(57k reviews)' }]
  },
  // Image URL
  image: {
    type: String,
    default: '',
  },
  // Image alt text
  imageAlt: {
    type: String,
    default: 'Hero image',
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
  // Background style
  backgroundStyle: {
    type: String,
    default: 'half',
    // Options: 'half' (split background), 'full' (solid background)
  },
  // Video controls
  hasVideo: {
    type: Boolean,
    default: false,
  },
})

// Theme colors
const themeStyles = {
  light: {
    topBg: 'bg-white',
    bottomBg: 'bg-gray-50',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
  },
  'bright-green': {
    topBg: 'bg-content-positive',
    bottomBg: 'bg-white',
    text: 'text-content-primary',
    subtext: 'text-content-primary/80',
  },
  'forest-green': {
    topBg: 'bg-[#1A4D2E]',
    bottomBg: 'bg-[#0D2818]',
    text: 'text-white',
    subtext: 'text-white/80',
  },
}
</script>

<template>
  <div class="hero-large relative overflow-hidden">
    <!-- Background Layers -->
    <div v-if="backgroundStyle === 'half'" class="absolute inset-0">
      <!-- Top half -->
      <div :class="['absolute top-0 left-0 right-0 h-1/2', themeStyles[theme].topBg]" />
      <!-- Bottom half -->
      <div :class="['absolute bottom-0 left-0 right-0 h-1/2', themeStyles[theme].bottomBg]" />
    </div>
    <div v-else :class="['absolute inset-0', themeStyles[theme].topBg]" />

    <!-- Content Container -->
    <div class="relative z-10 py-12 md:py-16 lg:py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Badges (App Store / Google Play ratings) -->
        <div v-if="badges.length" class="flex flex-wrap justify-center gap-4 mb-8">
          <div
            v-for="(badge, index) in badges"
            :key="index"
            class="flex items-center gap-2 text-sm"
          >
            <span class="text-2xl">{{ badge.icon }}</span>
            <div>
              <div :class="['font-semibold', themeStyles[theme].text]">
                {{ badge.rating }} {{ badge.source }}
              </div>
              <div :class="['text-xs', themeStyles[theme].subtext]">
                {{ badge.reviews }}
              </div>
            </div>
          </div>
        </div>

        <!-- Headline -->
        <h1
          :class="[
            'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight text-center mb-6 max-w-5xl mx-auto',
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
            'text-base md:text-lg lg:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-8',
            themeStyles[theme].subtext,
          ]"
        >
          {{ description }}
        </p>

        <!-- CTAs -->
        <div v-if="cta" class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

        <!-- Hero Image -->
        <div class="relative max-w-5xl mx-auto rounded-3xl overflow-hidden">
          <img v-if="image" :src="image" :alt="imageAlt" class="w-full h-auto object-cover" />
          <!-- Slot for custom image -->
          <slot name="image" />

          <!-- Video pause button -->
          <button
            v-if="hasVideo"
            class="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Pause video"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
a {
  transition: all 0.2s ease;
}

/* Proper image sizing */
img {
  max-height: 700px;
  object-fit: cover;
}
</style>
