<script setup>
const props = defineProps({
  // Main headline text
  headline: {
    type: String,
    required: true,
  },
  // Supporting body text (optional)
  body: {
    type: String,
    default: '',
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
    headlineText: 'text-content-primary',
    bodyText: 'text-content-secondary',
  },
  neutral: {
    bg: 'bg-gray-50',
    headlineText: 'text-content-primary',
    bodyText: 'text-content-secondary',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    headlineText: 'text-white',
    bodyText: 'text-white/90',
  },
}

const currentTheme = themeStyles[props.theme]
</script>

<template>
  <div :class="['text-headline py-12 md:py-16 lg:py-20 px-4', currentTheme.bg]">
    <div class="max-w-5xl mx-auto text-center">
      <!-- Headline -->
      <h2
        :class="[
          'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-tight mb-6',
          currentTheme.headlineText,
        ]"
      >
        {{ headline }}
      </h2>

      <!-- Optional Body Text -->
      <p
        v-if="body"
        :class="[
          'text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto',
          currentTheme.bodyText,
        ]"
      >
        {{ body }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper spacing and readability */
h2 {
  letter-spacing: -0.02em;
}
</style>
