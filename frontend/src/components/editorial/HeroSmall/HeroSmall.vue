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
  // Layout orientation
  layout: {
    type: String,
    default: 'layout-1',
    // Options: 'layout-1' (text then image), 'layout-2' (image then text)
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
  <div :class="['hero-small py-12 md:py-16 lg:py-20 px-4', themeStyles[theme].bg]">
    <div class="max-w-4xl mx-auto">
      <!-- Layout 1: Text then Image -->
      <template v-if="layout === 'layout-1'">
        <!-- Text Content -->
        <div class="text-center mb-8">
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
          <div v-if="cta" class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
        </div>

        <!-- Image -->
        <div class="relative max-w-sm mx-auto rounded-3xl overflow-hidden">
          <img v-if="image" :src="image" :alt="imageAlt" class="w-full h-auto object-cover" />
          <slot name="image" />

          <!-- Video pause button -->
          <button
            v-if="hasVideo"
            class="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Pause video"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </button>
        </div>
      </template>

      <!-- Layout 2: Image then Text -->
      <template v-else>
        <!-- Image -->
        <div class="relative max-w-sm mx-auto rounded-3xl overflow-hidden mb-8">
          <img v-if="image" :src="image" :alt="imageAlt" class="w-full h-auto object-cover" />
          <slot name="image" />

          <!-- Video pause button -->
          <button
            v-if="hasVideo"
            class="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Pause video"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </button>
        </div>

        <!-- Text Content -->
        <div class="text-center">
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
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}

/* Proper image sizing */
img {
  max-height: 500px;
}
</style>
