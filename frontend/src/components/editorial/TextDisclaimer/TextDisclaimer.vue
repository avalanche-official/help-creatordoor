<script setup>
const props = defineProps({
  // Disclaimer text content (can include HTML for links)
  content: {
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
    containerBg: 'bg-gray-100',
    text: 'text-content-secondary',
  },
  neutral: {
    bg: 'bg-gray-50',
    containerBg: 'bg-gray-200',
    text: 'text-content-secondary',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    containerBg: 'bg-[#2A6B42]',
    text: 'text-white/90',
  },
}

const currentTheme = themeStyles[props.theme]
</script>

<template>
  <div :class="['text-disclaimer py-12 md:py-16 px-4', currentTheme.bg]">
    <div class="max-w-7xl mx-auto">
      <div :class="['rounded-2xl p-6 md:p-8 lg:p-10', currentTheme.containerBg]">
        <div
          :class="['text-xs md:text-sm leading-relaxed rich-text-content', currentTheme.text]"
          v-html="content"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styling for links in disclaimer text */
.rich-text-content :deep(a) {
  text-decoration: underline;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.rich-text-content :deep(a):hover {
  opacity: 0.8;
}

/* Preserve spacing for paragraphs if needed */
.rich-text-content :deep(p) {
  margin-bottom: 0.5rem;
}

.rich-text-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Style for asterisk/bullet points */
.rich-text-content :deep(strong) {
  font-weight: 600;
}
</style>
