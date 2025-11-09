<script setup>
const props = defineProps({
  divided: {
    type: Boolean,
    default: true,
  },
  spacing: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const spacingClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-4',
}
</script>

<template>
  <ul
    :class="[
      'flex flex-col',
      spacingClasses[spacing],
      divided ? 'divide-y divide-border-default' : '',
    ]"
  >
    <slot />
  </ul>
</template>
