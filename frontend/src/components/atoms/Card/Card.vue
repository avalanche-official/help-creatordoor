<!-- components/atoms/Card/Card.vue -->
<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'outlined', 'dashed', 'elevated', 'card', 'ghost'].includes(v),
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  bg: {
    type: String,
    default: null, // Custom background color
  },
  rounded: {
    type: String,
    default: 'rounded-2xl', // Default rounded
    validator: (v) =>
      [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-3xl',
        'rounded-full',
      ].includes(v),
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div
    :class="[
      'group',
      rounded,
      'transition-all',
      'duration-200',
      {
        'border border-solid border-stone-300': variant === 'outlined',
        'bg-stone-200/70 hover:bg-stone-200': variant === 'card' && !bg,
        'border-2 border-dashed border-stone-200': variant === 'dashed',
        'bg-white': variant === 'default' && !bg,
        'bg-stone-50': variant === 'elevated' && !bg,
        'bg-transparent': variant === 'ghost' && !bg, // ✅ Only apply if no custom bg
      },
      bg, // ✅ Apply custom background (removed the || '')
      clickable && 'cursor-pointer hover:bg-stone-100',
    ]"
    @click="clickable ? handleClick() : null"
  >
    <slot />
  </div>
</template>
