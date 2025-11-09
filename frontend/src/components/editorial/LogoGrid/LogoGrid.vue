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
  // Array of logo objects
  logos: {
    type: Array,
    required: true,
    validator: (value) => value.length >= 4 && value.length <= 8,
    // Example: [
    //   { name: 'Monzo', image: '/path/to/logo.svg', alt: 'Monzo logo' },
    //   { name: 'N26', image: '/path/to/logo.svg', alt: 'N26 logo' }
    // ]
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'neutral', 'forest-green'].includes(value),
  },
})

// Theme configurations
const themeStyles = {
  light: {
    bg: 'bg-white',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
    logoBg: 'bg-gray-50',
    logoFilter: 'grayscale opacity-70 hover:opacity-100',
  },
  neutral: {
    bg: 'bg-gray-50',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
    logoBg: 'bg-white',
    logoFilter: 'grayscale opacity-70 hover:opacity-100',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    text: 'text-white',
    subtext: 'text-white/80',
    logoBg: 'bg-[#2A6B42]',
    logoFilter: 'brightness-0 invert opacity-70 hover:opacity-100',
  },
}

const currentTheme = themeStyles[props.theme]
</script>

<template>
  <div :class="['logo-grid py-12 md:py-16 px-4', currentTheme.bg]">
    <div class="max-w-6xl mx-auto">
      <!-- Headline -->
      <h2
        :class="[
          'text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 leading-tight',
          currentTheme.text,
        ]"
      >
        {{ headline }}
      </h2>

      <!-- Description -->
      <p
        v-if="description"
        :class="['text-base md:text-lg text-center mb-12 max-w-3xl mx-auto', currentTheme.subtext]"
      >
        {{ description }}
      </p>

      <!-- Logo Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
        <div
          v-for="(logo, index) in logos"
          :key="index"
          :class="[
            'flex items-center justify-center p-6 md:p-8 rounded-2xl transition-all duration-300',
            currentTheme.logoBg,
          ]"
        >
          <img
            :src="logo.image"
            :alt="logo.alt"
            :class="[
              'max-w-full h-auto max-h-12 md:max-h-14 transition-all duration-300',
              currentTheme.logoFilter,
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure logos maintain aspect ratio and consistent sizing */
img {
  object-fit: contain;
}

/* Smooth hover transitions */
.logo-grid img:hover {
  transform: scale(1.05);
}
</style>
