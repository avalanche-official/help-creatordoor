<!-- components/atoms/Spinner/Spinner.vue -->
<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value),
  },
  color: {
    type: String,
    default: 'var(--color-interactive-primary)',
  },
  thickness: {
    type: String,
    default: '4',
  },
})

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-20 h-20',
}
</script>

<template>
  <div
    class="animate-spin rounded-full border-t-transparent inline-block"
    :class="sizeMap[size]"
    :style="{
      borderWidth: `${thickness}px`,
      borderColor: color,
      borderTopColor: 'transparent',
    }"
    role="status"
    aria-label="Loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
