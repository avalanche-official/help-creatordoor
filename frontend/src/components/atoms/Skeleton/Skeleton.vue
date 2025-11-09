<!-- components/atoms/Skeleton/Skeleton.vue -->
<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'title', 'circle', 'rectangle', 'avatar', 'button', 'card'].includes(value),
  },
  width: {
    type: String,
    default: null, // e.g., '100px', '50%', 'full'
  },
  height: {
    type: String,
    default: null,
  },
  rounded: {
    type: String,
    default: null, // 'sm', 'md', 'lg', 'full'
  },
  animated: {
    type: Boolean,
    default: true,
  },
})

// Get base classes based on variant (without width/height, we'll add those separately)
const getVariantClasses = () => {
  // Only return rounded classes from variants
  const variants = {
    text: 'rounded',
    title: 'rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
    avatar: 'rounded-full',
    button: 'rounded-lg',
    card: 'rounded-xl',
  }
  return variants[props.variant] || variants.text
}

// Get width class - only for predefined variants, custom goes to style
const getWidthClass = () => {
  // If custom width is provided, return empty (we'll use inline style)
  if (props.width) return ''

  // Otherwise use default width from variant
  const variantWidths = {
    text: 'w-full',
    title: 'w-3/4',
    circle: 'w-12',
    rectangle: 'w-full',
    avatar: 'w-10',
    button: 'w-24',
    card: 'w-full',
  }
  return variantWidths[props.variant] || 'w-full'
}

// Get height class - only for predefined variants, custom goes to style
const getHeightClass = () => {
  // If custom height is provided, return empty (we'll use inline style)
  if (props.height) return ''

  // Otherwise use default height from variant
  const variantHeights = {
    text: 'h-4',
    title: 'h-6',
    circle: 'h-12',
    rectangle: 'h-32',
    avatar: 'h-10',
    button: 'h-10',
    card: 'h-48',
  }
  return variantHeights[props.variant] || 'h-4'
}

// Get inline styles for custom dimensions
const getInlineStyles = () => {
  const styles = {}
  if (props.width) {
    styles.width = props.width === 'full' ? '100%' : props.width
  }
  if (props.height) {
    styles.height = props.height === 'full' ? '100%' : props.height
  }
  return styles
}

// Get custom rounded class
const getRoundedClass = () => {
  if (!props.rounded) return ''
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }
  return roundedClasses[props.rounded] || ''
}
</script>

<template>
  <div
    :class="[
      'bg-stone-200',
      getVariantClasses(),
      getWidthClass(),
      getHeightClass(),
      getRoundedClass(),
      animated && 'animate-pulse',
    ]"
    :style="getInlineStyles()"
  />
</template>

<style scoped>
/* Custom animation if needed */
</style>
