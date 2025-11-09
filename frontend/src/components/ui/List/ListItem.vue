<script setup>
const props = defineProps({
  interactive: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled && props.interactive) {
    emit('click')
  }
}
</script>

<template>
  <li
    :class="[
      'flex items-center py-3 px-4',
      interactive ? 'cursor-pointer hover:bg-background-elevated transition-colors rounded-lg' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    @click="handleClick"
  >
    <slot />
  </li>
</template>
