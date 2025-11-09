<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'body-default',
    validator: (value) =>
      [
        'display-large',
        'display-medium',
        'display-small',
        'title-screen',
        'title-section',
        'title-subsection',
        'title-body',
        'title-group',
        'body-large',
        'body-large-bold',
        'body-default',
        'body-3-semibold',
        'body-default-bold',
        'link-large',
        'link-default',
      ].includes(value),
  },
  // ✅ ADD THIS: Mobile variant prop
  mobileVariant: {
    type: String,
    default: null,
    validator: (value) => {
      if (!value) return true
      return [
        'display-large',
        'display-medium',
        'display-small',
        'title-screen',
        'title-section',
        'title-subsection',
        'title-body',
        'title-group',
        'body-large',
        'body-large-bold',
        'body-default',
        'body-3-semibold',
        'body-default-bold',
        'link-large',
        'link-default',
      ].includes(value)
    },
  },
  color: {
    type: String,
    default: null,
  },
  customColor: {
    type: String,
    default: null,
  },
  as: {
    type: String,
    default: 'span',
  },
  clamp: {
    type: [Number, Boolean],
    default: null,
    validator: (value) => {
      if (typeof value === 'boolean') return true
      return value >= 1 && value <= 6
    },
  },
})

const classes = computed(() => {
  const classList = []

  // ✅ ADD THIS: Apply mobile variant with md: breakpoint
  if (props.mobileVariant) {
    classList.push(props.mobileVariant)
    classList.push(`md:${props.variant}`)
  } else {
    classList.push(props.variant)
  }

  // Add color class if provided (design system colors)
  if (props.color && !props.customColor) {
    classList.push(`text-color-${props.color}`)
  }

  // Add line-clamp class if provided
  if (props.clamp === true) {
    classList.push('line-clamp-1')
  } else if (typeof props.clamp === 'number') {
    classList.push(`line-clamp-${props.clamp}`)
  }

  return classList.join(' ')
})

const customStyles = computed(() => {
  if (props.customColor) {
    return {
      color: props.customColor,
    }
  }
  return {}
})
</script>

<template>
  <component :is="as" :class="classes" :style="customStyles">
    <slot />
  </component>
</template>
