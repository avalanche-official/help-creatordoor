<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Type: default or negative
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'negative'].includes(value),
  },
  // Priority: primary or secondary
  priority: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  // Icon (emoji or text)
  icon: {
    type: String,
    required: true,
  },
  // Accessible label (required for screen readers)
  label: {
    type: String,
    required: true,
  },
  // Size: sm, md, lg
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-12 h-12 text-xl',
    lg: 'w-14 h-14 text-2xl',
  }
  return sizes[props.size]
})

const buttonClasses = computed(() => {
  const base = [
    'rounded-full flex items-center justify-center',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'shrink-0',
    sizeClasses.value,
  ]

  if (props.disabled) {
    base.push('opacity-50 cursor-not-allowed')
    return base
  }

  // Type + Priority combinations
  if (props.type === 'default') {
    if (props.priority === 'primary') {
      base.push(
        'bg-content-accent text-white',
        'hover:bg-accent-hover active:bg-accent-active',
        'focus:ring-content-accent',
        'cursor-pointer',
      )
    } else {
      // Secondary
      base.push(
        'bg-background-elevated text-content-primary',
        'border-2 border-border-default',
        'hover:bg-white hover:border-content-accent/30',
        'focus:ring-content-accent',
        'cursor-pointer',
      )
    }
  } else {
    // Negative type
    if (props.priority === 'primary') {
      base.push(
        'bg-content-negative text-white',
        'hover:bg-negative-hover',
        'focus:ring-content-negative',
        'cursor-pointer',
      )
    } else {
      // Secondary negative
      base.push(
        'bg-background-elevated text-content-negative',
        'border-2 border-content-negative/30',
        'hover:bg-content-negative/5 hover:border-content-negative',
        'focus:ring-content-negative',
        'cursor-pointer',
      )
    }
  }

  return base
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="label"
    @click="handleClick"
    type="button"
  >
    <span class="leading-none">{{ icon }}</span>
  </button>
</template>
