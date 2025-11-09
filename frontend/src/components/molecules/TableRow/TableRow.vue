<!-- components/molecules/TableRow/TableRow.vue -->
<script setup>
defineProps({
  clickable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <tr
    :class="[
      'border-b border-stone-200 transition-colors',
      clickable && 'cursor-pointer hover:bg-stone-50',
    ]"
    @click="clickable ? handleClick() : null"
  >
    <slot />
  </tr>
</template>
