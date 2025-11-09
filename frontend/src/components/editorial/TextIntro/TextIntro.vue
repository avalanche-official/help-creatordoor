<script setup>
const props = defineProps({
  // Intro text content
  text: {
    type: String,
    required: true,
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
  },
  neutral: {
    bg: 'bg-gray-50',
    text: 'text-content-primary',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    text: 'text-white',
  },
}

const currentTheme = themeStyles[props.theme]
</script>

<template>
  <div :class="['text-intro py-12 md:py-16 lg:py-20 px-4', currentTheme.bg]">
    <div class="max-w-5xl mx-auto text-center">
      <p
        :class="[
          'text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed',
          currentTheme.text,
        ]"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper line height for readability */
p {
  line-height: 1.5;
}
</style>
