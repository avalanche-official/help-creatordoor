<script setup>
const props = defineProps({
  // Quote text
  quote: {
    type: String,
    required: true,
  },
  // Author name and title
  author: {
    type: String,
    required: true,
  },
  // Author image
  image: {
    type: String,
    required: true,
  },
  // Image alt text
  imageAlt: {
    type: String,
    default: 'Author photo',
  },
  // Optional CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Primary Button', href: '/link' }
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'bright-green', 'forest-green'].includes(value),
  },
  // Image position
  imagePosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
})

// Theme configurations
const themeStyles = {
  light: {
    bg: 'bg-white',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
    buttonBg: 'bg-content-positive',
    buttonText: 'text-content-primary',
    buttonHover: 'hover:bg-[#9fdb1c]',
  },
  'bright-green': {
    bg: 'bg-[#9fdb1c]',
    text: 'text-content-primary',
    subtext: 'text-content-primary',
    buttonBg: 'bg-content-primary',
    buttonText: 'text-white',
    buttonHover: 'hover:bg-gray-800',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    text: 'text-white',
    subtext: 'text-white/80',
    buttonBg: 'bg-content-positive',
    buttonText: 'text-content-primary',
    buttonHover: 'hover:bg-[#9fdb1c]',
  },
}

const currentTheme = themeStyles[props.theme]
</script>

<template>
  <div :class="['quote-text py-12 md:py-16 px-4', currentTheme.bg]">
    <div class="max-w-7xl mx-auto">
      <div
        :class="[
          'flex flex-col gap-8 items-center',
          imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse',
        ]"
      >
        <!-- Image Section -->
        <div class="flex-shrink-0 w-full md:w-auto">
          <img
            :src="image"
            :alt="imageAlt"
            class="w-64 h-64 rounded-full object-cover mx-auto shadow-lg"
          />
        </div>

        <!-- Content Section -->
        <div class="flex-1 text-center md:text-left">
          <!-- Quote -->
          <blockquote class="mb-6">
            <p
              :class="[
                'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight',
                currentTheme.text,
              ]"
            >
              "{{ quote }}"
            </p>
          </blockquote>

          <!-- Author -->
          <p :class="['text-base md:text-lg font-medium mb-8', currentTheme.subtext]">
            {{ author }}
          </p>

          <!-- CTA Button -->
          <div v-if="cta">
            <a
              :href="cta.href"
              :class="[
                'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-md',
                currentTheme.buttonBg,
                currentTheme.buttonText,
                currentTheme.buttonHover,
              ]"
            >
              {{ cta.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}

a:hover {
  transform: translateY(-2px);
}

/* Ensure image maintains circular shape */
img {
  aspect-ratio: 1 / 1;
}
</style>
