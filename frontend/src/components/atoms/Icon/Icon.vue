<!-- components/atoms/Icon.vue -->
<script setup>
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 20,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  strokeWidth: {
    type: Number,
    default: 2,
  },
})

const iconComponent = computed(() => {
  const pascalName = props.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  return icons[pascalName] || icons.HelpCircle
})

// ✅ Check if color is a hex/rgb value or a Tailwind class
const isColorValue = computed(() => {
  return (
    props.color.startsWith('#') ||
    props.color.startsWith('rgb') ||
    props.color.startsWith('hsl') ||
    props.color === 'currentColor'
  )
})

// ✅ Use color prop for hex/rgb, otherwise let Tailwind class handle it
const iconColor = computed(() => {
  return isColorValue.value ? props.color : 'currentColor'
})

// ✅ Add Tailwind class if color is a class
const iconClass = computed(() => {
  return !isColorValue.value ? props.color : ''
})
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="iconColor"
    :stroke-width="strokeWidth"
    :class="iconClass"
  />
</template>
