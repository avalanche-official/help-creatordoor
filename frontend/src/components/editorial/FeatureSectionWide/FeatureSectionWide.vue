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
  // Optional image badge (e.g., "Electric City  150 USD")
  imageBadge: {
    type: Object,
    default: null,
    // Example: { icon: '↑', label: 'Electric City', value: '150 USD' }
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
  // Layout variant
  layout: {
    type: String,
    default: 'layout-1',
    // Options: 'layout-1', 'layout-2', 'layout-3'
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

// Layout styles - controls where content is positioned
const layoutStyles = {
  'layout-1': 'items-end justify-start', // Bottom left
  'layout-2': 'items-center justify-center', // Center
  'layout-3': 'items-start justify-end', // Top right
}
</script>

<template>
  <div :class="['feature-section-wide py-12 px-4', themeStyles[theme].bg]">
    <div class="max-w-7xl mx-auto">
      <!-- Wide Image Container -->
      <div class="relative rounded-3xl overflow-hidden mb-8">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt"
          class="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />
        <!-- Slot for custom image -->
        <slot name="image" />

        <!-- Image Badge Overlay (like "Electric City - 150 USD") -->
        <div
          v-if="imageBadge"
          class="absolute bottom-8 left-8 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3"
        >
          <div
            v-if="imageBadge.icon"
            class="w-8 h-8 rounded-full bg-content-positive flex items-center justify-center font-bold"
          >
            {{ imageBadge.icon }}
          </div>
          <div class="flex items-center gap-4">
            <span class="font-semibold text-content-primary">{{ imageBadge.label }}</span>
            <span class="font-bold text-content-primary">{{ imageBadge.value }}</span>
          </div>
        </div>
      </div>

      <!-- Content Section Below Image -->
      <div class="max-w-3xl mx-auto text-center space-y-6">
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
</template>

<style scoped>
/* Ensure smooth transitions */
a {
  transition: all 0.2s ease;
}

/* Ensure proper image display */
img {
  display: block;
}
</style>
