<!-- components/atoms/Avatar/Avatar.vue -->
<script setup>
import { computed } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  initials: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  iconSize: {
    type: Number,
    default: null, // ✅ NEW: Optional custom icon size
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['x-small', 'small', 'medium', 'large', 'x-large'].includes(value),
  },
  src: {
    type: String,
    default: null,
  },
  backgroundColor: {
    type: String,
    default: 'bg-stone-100',
  },
  textColor: {
    type: String,
    default: 'text-[#0e0e11]',
  },
  groupHover: {
    type: Boolean,
    default: false,
  },
})

// Avatar sizes in pixels
const sizeClasses = {
  'x-small': 'w-8 h-8', // 32px
  small: 'w-10 h-10', // 40px
  medium: 'w-12 h-12', // 48px
  large: 'w-16 h-16', // 64px
  'x-large': 'w-20 h-20', // 80px
}

// Default icon sizes based on avatar size
const defaultIconSizes = {
  'x-small': 16,
  small: 20,
  medium: 24,
  large: 32,
  'x-large': 40,
}

// Use custom iconSize if provided, otherwise use default based on avatar size
const computedIconSize = computed(() => {
  return props.iconSize || defaultIconSizes[props.size]
})

// Font size for initials
const fontSizes = {
  'x-small': 'text-xs',
  small: 'text-sm',
  medium: 'text-base',
  large: 'title-subsection',
  'x-large': 'text-xl',
}

const classes = computed(() => {
  const classList = [
    sizeClasses[props.size],
    fontSizes[props.size],
    props.backgroundColor,
    props.textColor,
  ]

  if (props.groupHover) {
    classList.push('group-hover:bg-stone-200')
  }

  return classList.join(' ')
})
</script>

<template>
  <div
    :class="[
      classes,
      'rounded-full',
      'flex items-center justify-center',
      'font-semibold',
      'overflow-hidden',
      'transition-colors duration-200',
    ]"
  >
    <!-- Priority: Image > Icon > Initials -->
    <img v-if="src" :src="src" :alt="initials || 'Avatar'" class="w-full h-full object-cover" />
    <Icon v-else-if="icon" :name="icon" :size="computedIconSize" />
    <span v-else-if="initials">{{ initials }}</span>
  </div>
</template>
