<script setup>
const props = defineProps({
  // Enable horizontal scrolling on mobile
  scrollable: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div :class="{ 'overflow-x-auto': scrollable }">
    <table class="w-full border-collapse">
      <slot />
    </table>
  </div>
</template>
