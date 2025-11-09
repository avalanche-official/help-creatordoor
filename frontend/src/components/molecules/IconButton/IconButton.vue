<!-- components/molecules/IconButton.vue -->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/atoms/Icon/Icon.vue'

const router = useRouter()

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'ghost',
    validator: (v) =>
      ['primary', 'secondary', 'ghost', 'danger', 'neutral', 'darkNeutral'].includes(v),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['mini', 'small', 'medium', 'large'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
  groupHover: {
    type: Boolean,
    default: false,
  },
  border: {
    type: String,
    default: null,
    validator: (v) => !v || ['white', 'black'].includes(v),
  },
  routeTo: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['click'])

// Button size classes
const sizeClasses = computed(() => {
  const sizes = {
    mini: 'w-7 h-7', // 28px
    small: 'w-8 h-8', // 32px
    medium: 'w-10 h-10', // 40px
    large: 'w-12 h-12', // 48px
  }
  return sizes[props.size]
})

// Icon sizes based on button size
const iconSize = computed(() => {
  const sizes = {
    mini: 14,
    small: 16,
    medium: 20,
    large: 24,
  }
  return sizes[props.size]
})

// Variant styles
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-[#7646ff] text-white hover:bg-[#5a2aff] active:bg-[#210f56]',
    secondary: 'bg-[#f0ebff] text-[#7646ff] hover:opacity-85 active:opacity-75',
    ghost: 'bg-transparent text-[#0e0e11] hover:bg-[#f0ebff] active:bg-[#fafaff]',
    danger: 'bg-transparent text-[#e53935] hover:bg-red-50 active:bg-red-100',
    neutral: 'bg-stone-100 hover:bg-stone-200 text-black active:opacity-90',
    darkNeutral: 'bg-stone-200 text-content-secondary border border-stone-300 hover:bg-stone-300',
  }
  return variants[props.variant]
})

// Border classes
const borderClasses = computed(() => {
  if (!props.border) return ''
  return props.border === 'white' ? 'border-2 border-stone-200' : 'border-2 border-black'
})

// Group hover classes
const groupHoverClasses = computed(() => {
  if (props.groupHover && props.variant === 'darkNeutral') {
    return 'group-hover:bg-stone-300 group-hover:text-black'
  }
  return ''
})

const handleClick = (event) => {
  if (!props.disabled) {
    // If routeTo is provided, navigate to that route
    if (props.routeTo) {
      router.push(props.routeTo)
    }
    // Always emit click event
    emit('click', event)
  }
}
</script>

<!-- components/molecules/IconButton.vue -->
<template>
  <button
    type="button"
    :class="[
      sizeClasses,
      variantClasses,
      borderClasses,
      groupHoverClasses,
      'inline-flex items-center justify-center',
      'rounded-full',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-[#7646ff] focus:ring-offset-2',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <Icon :name="icon" :size="iconSize" />
  </button>
</template>
