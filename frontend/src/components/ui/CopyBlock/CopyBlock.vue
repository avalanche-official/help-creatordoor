<script setup>
import { computed } from 'vue'

const props = defineProps({
  headline: {
    type: String,
    default: '',
  },
  headingTag: {
    type: String,
    default: 'h2',
    validator: (v) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(v),
  },
  text: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: 'left',
    validator: (v) => ['left', 'center'].includes(v),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v),
  },
  // Theme prop - automatically handles colors
  theme: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'neutral', 'bright-purple', 'deep-purple'].includes(v),
  },
  // Optional custom classes (override theme colors if needed)
  headlineClass: {
    type: String,
    default: '',
  },
  textClass: {
    type: String,
    default: '',
  },
  maxWidth: {
    type: String,
    default: '',
  },
})

// Theme-based text colors
const themeTextColors = {
  light: {
    headline: 'text-content-primary',
    text: 'text-content-secondary',
  },
  neutral: {
    headline: 'text-content-primary',
    text: 'text-content-secondary',
  },
  'bright-purple': {
    headline: 'text-white',
    text: 'text-white/80',
  },
  'deep-purple': {
    headline: 'text-white',
    text: 'text-white/80',
  },
}

const alignmentClasses = computed(() => ({
  left: 'text-left items-start',
  center: 'text-center items-center',
}))

// Size-based typography classes
const headlineSizeClasses = {
  small: 'text-heading-4',
  medium: 'text-heading-2',
  large: 'text-display-2',
}

const textSizeClasses = {
  small: 'text-body-3',
  medium: 'text-body-2',
  large: 'text-body-1',
}

const computedMaxWidth = computed(() => {
  if (props.maxWidth) return props.maxWidth
  if (props.align === 'center') {
    return props.size === 'large' ? '900px' : '680px'
  }
  return props.size === 'large' ? '900px' : '680px'
})

// Computed classes - combines size + theme colors
const headlineComputedClass = computed(() => {
  // If custom class provided, use it
  if (props.headlineClass) return props.headlineClass

  // Otherwise combine size class + theme color
  const sizeClass = headlineSizeClasses[props.size]
  const colorClass = themeTextColors[props.theme]?.headline || 'text-content-primary'

  return `${sizeClass} ${colorClass}`
})

const textComputedClass = computed(() => {
  // If custom class provided, use it
  if (props.textClass) return props.textClass

  // Otherwise combine size class + theme color
  const sizeClass = textSizeClasses[props.size]
  const colorClass = themeTextColors[props.theme]?.text || 'text-content-secondary'

  return `${sizeClass} ${colorClass}`
})
</script>

<template>
  <div
    :class="['flex flex-col', alignmentClasses[align]]"
    :style="{ gap: 'var(--spacing-lg)', maxWidth: computedMaxWidth, width: '100%' }"
  >
    <!-- Headline -->
    <component :is="headingTag" v-if="headline" :class="headlineComputedClass">
      {{ headline }}
    </component>

    <!-- Body Text -->
    <p v-if="text" :class="textComputedClass">
      {{ text }}
    </p>

    <!-- Default slot for custom content between text and actions -->
    <slot />

    <!-- Actions slot for buttons/links -->
    <div
      v-if="$slots.actions"
      class="flex flex-wrap"
      :class="align === 'center' ? 'justify-center' : 'justify-start'"
      :style="{ gap: 'var(--spacing-md)' }"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
