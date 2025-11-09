<script setup>
const props = defineProps({
  // Icon (text or slot)
  icon: {
    type: String,
    default: '',
  },
  // Size: 16, 24, 32, 40, 48, 56, 72
  size: {
    type: Number,
    default: 40,
    validator: (value) => [16, 24, 32, 40, 48, 56, 72].includes(value),
  },
  // Priority: primary, secondary, tertiary, minimal
  priority: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary', 'tertiary', 'minimal'].includes(value),
  },
  // Type: default, negative
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'negative'].includes(value),
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Aria label (required for accessibility)
  ariaLabel: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

// Size classes for the button
const sizeClasses = {
  16: 'w-4 h-4',
  24: 'w-6 h-6',
  32: 'w-8 h-8',
  40: 'w-10 h-10',
  48: 'w-12 h-12',
  56: 'w-14 h-14',
  72: 'w-18 h-18',
}

// Icon size classes (slightly smaller than button)
const iconSizeClasses = {
  16: 'w-3 h-3 text-xs',
  24: 'w-4 h-4 text-sm',
  32: 'w-5 h-5 text-base',
  40: 'w-6 h-6 text-lg',
  48: 'w-7 h-7 text-xl',
  56: 'w-8 h-8 text-2xl',
  72: 'w-10 h-10 text-3xl',
}

// Priority + Type combinations
const buttonClasses = (priority, type) => {
  const classes = {
    primary: {
      default: 'bg-content-accent text-white hover:opacity-90 active:opacity-80',
      negative: 'bg-content-negative text-white hover:opacity-90 active:opacity-80',
    },
    secondary: {
      default: 'bg-background-elevated text-content-primary hover:bg-gray-200 active:bg-gray-300',
      negative: 'bg-background-elevated text-content-negative hover:bg-red-50 active:bg-red-100',
    },
    tertiary: {
      default:
        'bg-transparent border-2 border-gray-300 text-content-primary hover:bg-background-elevated active:bg-gray-200',
      negative:
        'bg-transparent border-2 border-red-300 text-content-negative hover:bg-red-50 active:bg-red-100',
    },
    minimal: {
      default:
        'bg-transparent text-content-primary hover:bg-background-elevated active:bg-gray-200',
      negative: 'bg-transparent text-content-negative hover:bg-red-50 active:bg-red-100',
    },
  }

  return classes[priority][type]
}
</script>

<template>
  <button
    type="button"
    @click="handleClick"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :class="[
      'shrink-0 rounded-full flex items-center justify-center transition-all',
      sizeClasses[size],
      buttonClasses(priority, type),
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <!-- Icon Slot or Text -->
    <span v-if="$slots.default" :class="iconSizeClasses[size]">
      <slot />
    </span>
    <span v-else-if="icon" :class="['font-bold', iconSizeClasses[size]]">
      {{ icon }}
    </span>
  </button>
</template>
