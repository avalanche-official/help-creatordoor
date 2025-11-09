<!-- components/molecules/Chip/Chip.vue -->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  iconPosition: {
    type: String,
    default: 'right',
    validator: (v) => ['left', 'right'].includes(v),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) =>
      [
        'primary',
        'primaryLight',
        'secondary',
        'success',
        'warning',
        'error',
        'neutral',
        'outlined',
        'custom',
      ].includes(v),
  },
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['small', 'medium', 'default'].includes(v),
  },
  customColor: {
    type: String,
    default: null,
  },
  // For animated icon (chevron rotation)
  isOpen: {
    type: Boolean,
    default: false,
  },
  // ✅ NEW: Router navigation props
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  external: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
const router = useRouter()

const variantClasses = {
  primary: 'bg-primary-purple text-white',
  primaryLight: 'bg-primary-purple/50 text-white',
  secondary: 'bg-background-elevated text-content-primary',
  success: 'bg-sentiment-positive text-white',
  warning: 'bg-sentiment-warning text-black',
  error: 'bg-sentiment-negative text-white',
  neutral: 'bg-stone-200 text-content-primary',
  outlined: 'border border-secondary-purple text-secondary-purple',
  custom: 'text-white',
}

const sizeClasses = {
  small: 'py-1',
  default: 'chip-default',
  medium: 'py-1',
}

const textVariants = {
  small: 'body-default-bold',
  medium: 'body-large-bold',
  default: 'body-default-bold',
}

const iconSizes = {
  small: 16,
  default: 20,
}

// Custom inline styles for custom variant
const customStyles = computed(() => {
  if (props.variant === 'custom' && props.customColor) {
    return {
      backgroundColor: props.customColor,
      color: 'white',
    }
  }
  return {}
})

// ✅ Check if chip is clickable
const isClickable = computed(() => {
  return props.to || props.href || !!emit.click
})

// ✅ Handle click with navigation
const handleClick = () => {
  emit('click')

  if (props.to) {
    router.push(props.to)
  } else if (props.href) {
    if (props.external) {
      window.open(props.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = props.href
    }
  }
}
</script>

<template>
  <component
    :is="isClickable ? 'button' : 'span'"
    :class="[
      'inline-flex items-center',
      'gap-2',
      'rounded-pill',
      'px-3',
      sizeClasses[size],
      variantClasses[variant],
      isClickable && 'cursor-pointer transition-opacity hover:opacity-80',
    ]"
    :style="customStyles"
    :type="isClickable ? 'button' : undefined"
    @click="isClickable ? handleClick() : undefined"
  >
    <!-- Icon on LEFT -->
    <slot v-if="iconPosition === 'left'" name="icon">
      <Icon
        v-if="icon"
        :name="icon"
        :size="iconSizes[size]"
        :class="[
          'transition-all duration-300 ease-in-out',
          icon === 'chevron-down' && isOpen ? 'rotate-180' : 'rotate-0',
        ]"
      />
    </slot>

    <!-- Label -->
    <Text :variant="textVariants[size]" class="leading-none">
      {{ label }}
    </Text>

    <!-- Icon on RIGHT -->
    <slot v-if="iconPosition === 'right'" name="icon">
      <Icon
        v-if="icon"
        :name="icon"
        :size="iconSizes[size]"
        :class="[
          'transition-all duration-300 ease-in-out',
          icon === 'chevron-down' && isOpen ? 'rotate-180' : 'rotate-0',
        ]"
      />
    </slot>
  </component>
</template>
