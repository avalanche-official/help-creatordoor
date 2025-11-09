<!-- components/atoms/Button/Button.vue -->
<script setup>
import { computed } from 'vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      [
        'primary',
        'primary-reversed',
        'primary-negative',
        'secondary',
        'secondary-negative',
        'secondary-neutral',
        'tertiary',
        'tertiary-negative',
        'outline',
        'textButton',
        'link',
        'link-white',
        'custom', // ✅ NEW: Custom solid color variant
      ].includes(value),
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'circular'].includes(value),
  },
  fontSize: {
    type: String,
    default: null,
    validator: (value) =>
      !value ||
      [
        'body-default',
        'body-default-bold',
        'body-large',
        'body-large-bold',
        'link-default',
        'link-large',
      ].includes(value),
  },
  // ✅ NEW: Custom color prop (single solid color)
  customColor: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['click'])

// Determine which element to render (button or anchor)
const component = computed(() => {
  return props.href ? 'a' : 'button'
})

// Spinner size based on button size
const spinnerSize = computed(() => {
  const sizeMap = {
    small: 'xs',
    default: 'xs',
    circular: 'xs',
  }
  return sizeMap[props.size] || 'xs'
})

// Button is disabled when loading OR manually disabled
const isDisabled = computed(() => {
  return props.loading || props.disabled
})

// ✅ NEW: Custom inline styles for solid color
const customStyles = computed(() => {
  if (props.variant === 'custom' && props.customColor) {
    return {
      backgroundColor: props.customColor,
      color: 'white',
      border: 'none',
    }
  }
  return {}
})

// Build CSS classes based on variant and size
const classes = computed(() => {
  const classList = []

  // Base button styles
  classList.push(
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'transition-all',
    'duration-200',
  )

  // Variant styles using design system tokens
  const variantClasses = {
    primary: [
      'bg-primary-purple',
      'text-white',
      'hover:bg-interactive-hover',
      'active:bg-interactive-active',
      'disabled:bg-interactive-disabled',
      'disabled:cursor-not-allowed',
    ],
    'primary-reversed': [
      'bg-white',
      'text-primary-purple',
      'border-1',
      'border-primary-purple',
      'hover:bg-background-accent',
    ],
    'primary-negative': [
      'bg-sentiment-negative',
      'text-white',
      'hover:opacity-90',
      'active:opacity-80',
    ],
    secondary: ['bg-background-accent', 'text-primary-purple', 'hover:bg-soft-pink'],
    'secondary-negative': [
      'bg-sentiment-negative/10',
      'text-sentiment-negative',
      'hover:bg-sentiment-negative/20',
    ],
    'secondary-neutral': ['bg-stone-200', 'text-content-secondary', 'hover:bg-background-accent'],
    tertiary: ['bg-transparent', 'text-primary-purple', 'hover:bg-background-accent'],
    'tertiary-negative': [
      'bg-transparent',
      'text-sentiment-negative',
      'hover:bg-sentiment-negative/10',
    ],
    outline: [
      'bg-transparent',
      'text-primary-purple',
      'border-1',
      'border-interactive-border',
      'hover:bg-background-accent',
    ],
    textButton: ['bg-transparent', 'text-secondary-purple', 'hover:bg-background-accent'],
    link: ['bg-transparent', 'text-content-link', 'hover:opacity-80', 'underline'],
    'link-white': ['bg-transparent', 'text-white', 'hover:opacity-80', 'underline'],
    // ✅ NEW: Custom variant with hover effect
    custom: ['text-white', 'hover:opacity-90', 'active:opacity-80'],
  }

  classList.push(...(variantClasses[props.variant] || variantClasses.primary))

  // Size classes
  const isLinkVariant = props.variant === 'link' || props.variant === 'link-white'

  if (!isLinkVariant) {
    if (props.size === 'small') {
      classList.push('button-small', 'px-3', 'rounded-full')
    } else if (props.size === 'circular') {
      classList.push('button-circular', 'rounded-full', 'p-0')
    } else {
      // default
      classList.push('button-default', 'px-4', 'rounded-full')
    }
  }

  // Typography variant
  if (props.fontSize) {
    classList.push(props.fontSize)
  }

  return classList.join(' ')
})

// Handle click events (only if not disabled or loading)
const handleClick = (event) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    class="cursor-pointer"
    :is="component"
    :class="classes"
    :style="customStyles"
    :disabled="component === 'button' ? isDisabled : undefined"
    :type="component === 'button' ? type : undefined"
    :href="component === 'a' ? href : undefined"
    :target="component === 'a' ? target : undefined"
    :aria-disabled="component === 'a' && isDisabled ? 'true' : undefined"
    @click="handleClick"
  >
    <!-- Show spinner + content when loading -->
    <span v-if="loading" class="flex items-center justify-center gap-2">
      <Spinner :size="spinnerSize" color="currentColor" thickness="2" />
      <slot />
    </span>

    <!-- Show normal content when not loading -->
    <slot v-else />
  </component>
</template>
