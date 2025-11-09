<!-- src/components/molecules/CopyBlock/CopyBlock.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  // Desktop title variant
  titleVariant: {
    type: String,
    default: 'title-screen',
  },
  // Mobile title variant
  mobileTitleVariant: {
    type: String,
    default: '', // If empty, don't pass to Text component
  },
  // Desktop description variant
  descriptionVariant: {
    type: String,
    default: 'body-default',
  },
  // Mobile description variant
  mobileDescriptionVariant: {
    type: String,
    default: '', // If empty, don't pass to Text component
  },
  // Custom colors
  titleColor: {
    type: String,
    default: 'content-primary',
  },
  descriptionColor: {
    type: String,
    default: 'content-secondary',
  },
  // Line clamping
  titleClamp: {
    type: [Number, Boolean],
    default: null,
    validator: (value) => {
      if (value === null || typeof value === 'boolean') return true
      return value >= 1 && value <= 6
    },
  },
  descriptionClamp: {
    type: [Number, Boolean],
    default: null,
    validator: (value) => {
      if (value === null || typeof value === 'boolean') return true
      return value >= 1 && value <= 6
    },
  },
  align: {
    type: String,
    default: 'center', // 'left', 'center', 'right'
    validator: (value) => ['left', 'center', 'right'].includes(value),
  },
  spacing: {
    type: String,
    default: '0', // Spacing between title and description
    validator: (value) => ['0', '2', '3', '4', '5', '6', '8'].includes(value),
  },
  as: {
    type: String,
    default: 'h2', // HTML tag for title
  },
})

const alignmentClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

// Fixed spacing classes (must be complete for Tailwind purging)
const spacingClasses = {
  2: 'space-y-2',
  3: 'space-y-3',
  4: 'space-y-4',
  5: 'space-y-5',
  6: 'space-y-6',
  8: 'space-y-8',
}

const spacingClass = computed(() => spacingClasses[props.spacing] || 'space-y-1')

// ✅ Only return mobile variant if it's a non-empty string
const effectiveMobileTitleVariant = computed(() => {
  return props.mobileTitleVariant && props.mobileTitleVariant.trim() !== ''
    ? props.mobileTitleVariant
    : undefined
})

const effectiveMobileDescriptionVariant = computed(() => {
  return props.mobileDescriptionVariant && props.mobileDescriptionVariant.trim() !== ''
    ? props.mobileDescriptionVariant
    : undefined
})
</script>

<template>
  <div :class="[alignmentClass[align], spacingClass]">
    <!-- Title with responsive variants -->
    <Text
      :as="as"
      :variant="titleVariant"
      :mobile-variant="effectiveMobileTitleVariant"
      :color="titleColor"
      :clamp="titleClamp"
    >
      {{ title }}
    </Text>

    <!-- Description with responsive variants -->
    <Text
      v-if="description"
      :variant="descriptionVariant"
      :mobile-variant="effectiveMobileDescriptionVariant"
      :color="descriptionColor"
      :clamp="descriptionClamp"
    >
      {{ description }}
    </Text>

    <!-- Optional slot for custom content below description -->
    <slot />
  </div>
</template>
