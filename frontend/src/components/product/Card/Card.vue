<script setup>
const props = defineProps({
  hover: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value),
  },
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <div
    :class="[
      'bg-white',
      'border border-border-default',
      'rounded-lg',
      'shadow-sm',
      hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '',
      paddingClasses[padding],
    ]"
  >
    <slot />
  </div>
</template>
