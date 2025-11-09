<!-- components/editorial/FeatureSectionInteractive/FeatureSectionInteractive.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Theme preset
  theme: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'neutral', 'bright-purple', 'deep-purple'].includes(v),
  },
  // Content alignment
  align: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center'].includes(v),
  },
})

// Theme background classes
const themeClasses = {
  light: 'bg-white',
  neutral: 'bg-gray-50',
  'bright-purple': 'bg-purple-600',
  'deep-purple': 'bg-primary-purple',
}

// Computed background class
const bgClass = computed(() => themeClasses[props.theme] || 'bg-white')
</script>

<template>
  <section :class="['relative py-12 md:py-16 lg:py-20', bgClass]">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header Section -->
      <div v-if="$slots.header" :class="['mb-12', align === 'center' ? 'flex justify-center' : '']">
        <!-- Pass theme to children via slot props -->
        <slot name="header" :theme="theme" />
      </div>

      <!-- Body/Content Section -->
      <div class="flex justify-center">
        <slot />
      </div>
    </div>
  </section>
</template>
