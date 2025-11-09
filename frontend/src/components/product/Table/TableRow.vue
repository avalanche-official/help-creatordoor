<script setup>
const props = defineProps({
  // Make row clickable
  clickable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<template>
  <tr
    :class="[
      'border-b border-border-default',
      clickable && 'cursor-pointer hover:bg-background-elevated transition-colors',
    ]"
    @click="handleClick"
  >
    <slot />
  </tr>
</template>
