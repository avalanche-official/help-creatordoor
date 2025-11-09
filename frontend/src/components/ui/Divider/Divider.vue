<script setup>
const props = defineProps({
  // Type: section, subsection, content
  type: {
    type: String,
    default: 'section',
    validator: (value) => ['section', 'subsection', 'content'].includes(value),
  },
})

// Spacing classes based on type
const spacingClasses = {
  section: 'my-8', // Section spacing (largest)
  subsection: 'my-6', // Section spacing
  content: 'my-4', // Component spacing (smallest)
}

// Border classes based on type
const borderClasses = {
  section: 'border-gray-200', // Full width, no padding
  subsection: 'border-gray-200', // With padding
  content: 'border-gray-300', // Lighter for content breaks
}
</script>

<template>
  <div :class="spacingClasses[type]">
    <hr :class="['border-t', borderClasses[type], type === 'subsection' && 'mx-4']" />
  </div>
</template>
