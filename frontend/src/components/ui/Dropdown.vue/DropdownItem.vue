<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  danger: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="[
      'w-full flex items-center gap-3 px-4 py-2',
      'text-left text-sm',
      danger ? 'text-content-negative' : 'text-content-primary',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-background-elevated cursor-pointer',
      'transition-colors',
    ]"
  >
    <span v-if="icon" class="text-lg">{{ icon }}</span>
    <slot />
  </button>
</template>
