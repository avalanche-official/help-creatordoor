<script setup>
const props = defineProps({
  // Image URL
  image: {
    type: String,
    default: '',
  },
  // Image alt text
  imageAlt: {
    type: String,
    default: 'Feature image',
  },
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
  // Layout orientation
  layout: {
    type: String,
    default: 'layout-1',
    // Options: 'layout-1' (image left), 'layout-2' (image right)
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
  <div :class="['feature-section-single py-12 px-4', themeStyles[theme].bg]">
    <div class="max-w-7xl mx-auto">
      <div
        :class="[
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
          layout === 'layout-2' ? 'lg:flex-row-reverse' : '',
        ]"
      >
        <!-- Image Section -->
        <div
          :class="[
            'relative rounded-3xl overflow-hidden',
            layout === 'layout-2' ? 'lg:order-2' : '',
          ]"
        >
          <img v-if="image" :src="image" :alt="imageAlt" class="w-full h-auto object-cover" />
          <!-- Slot for custom image content -->
          <slot name="image" />

          <!-- Video pause button overlay -->
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

        <!-- Content Section -->
        <div :class="['space-y-6', layout === 'layout-2' ? 'lg:order-1' : '']">
          <!-- Headline -->
          <h2
            :class="[
              'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
              themeStyles[theme].text,
            ]"
          >
            {{ headline }}
          </h2>

          <!-- Description -->
          <p
            v-if="description"
            :class="['text-base md:text-lg leading-relaxed', themeStyles[theme].subtext]"
          >
            {{ description }}
          </p>

          <!-- CTAs -->
          <div v-if="cta" class="flex flex-col sm:flex-row gap-4">
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

            <!-- Secondary CTA (link style) -->
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure images have proper aspect ratio */
img {
  max-height: 700px;
  object-fit: cover;
}

/* Smooth hover transitions */
a {
  transition: all 0.2s ease;
}
</style>
