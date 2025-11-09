<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  // Large headline text (2 lines max, bold, uppercase)
  headline: {
    type: String,
    required: true,
  },
  // Optional subheadline or supporting text
  description: {
    type: String,
    default: '',
  },
  // CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Learn about our mission', href: '/register', variant: 'primary' }
  },
  // Image/illustration at the top
  image: {
    type: String,
    default: null,
    // URL to the image
  },
  // Image alt text for accessibility
  imageAlt: {
    type: String,
    default: 'Illustration',
  },
  // Image position
  imagePosition: {
    type: String,
    default: 'inside',
    // Options: 'inside', 'half-outside'
  },
  // Image size control
  imageSize: {
    type: String,
    default: 'medium',
    // Options: 'small', 'medium', 'large', 'custom'
    validator: (v) => ['small', 'medium', 'large', 'custom'].includes(v),
  },
  // Custom image width (when imageSize is 'custom')
  imageWidth: {
    type: String,
    default: '300px',
    // Example: '200px', '400px', '50%'
  },
  // ✅ NEW: Custom color for gradient background
  customColor: {
    type: String,
    default: null,
  },
})

// Handle CTA click
const handleCtaClick = () => {
  if (props.cta?.onClick) {
    props.cta.onClick()
  }
}

// Compute image size classes
const imageSizeClasses = () => {
  if (props.imageSize === 'custom') {
    return '' // Will use inline style instead
  }

  const sizeMap = {
    small: 'max-w-[150px] md:max-w-[150px]',
    medium: 'max-w-[300px] md:max-w-[400px]',
    large: 'max-w-[400px] md:max-w-[500px]',
  }

  return sizeMap[props.imageSize] || sizeMap.medium
}

// Compute spacing for half-outside positioning based on image size
const getHalfOutsideSpacing = () => {
  const spacingMap = {
    small: {
      wrapperPadding: 'pt-[20px] md:pt-[8px]',
      imageTop: 'top-[-50px] md:top-[-50px]',
      contentMargin: 'mt-[60px] md:mt-[60px]',
    },
    medium: {
      wrapperPadding: 'pt-[150px] md:pt-[200px]',
      imageTop: 'top-[-150px] md:top-[-200px]',
      contentMargin: 'mt-[150px] md:mt-[200px]',
    },
    large: {
      wrapperPadding: 'pt-[200px] md:pt-[250px]',
      imageTop: 'top-[-200px] md:top-[-250px]',
      contentMargin: 'mt-[200px] md:mt-[250px]',
    },
  }

  return spacingMap[props.imageSize] || spacingMap.medium
}

// ✅ NEW: Custom gradient background style
const customGradientStyle = computed(() => {
  if (props.customColor) {
    // Create a gradient from customColor to a darker version (with 70% opacity overlay)
    return {
      background: `linear-gradient(135deg, ${props.customColor}ee, ${props.customColor}aa)`,
    }
  }
  return {}
})

// ✅ NEW: Dynamic background classes
const backgroundClasses = computed(() => {
  // If custom color is set, don't use default gradient classes
  if (props.customColor) {
    return ''
  }
  return 'bg-gradient-to-br from-primary-purple to-purple-700'
})
</script>

<template>
  <!-- Wrapper with extra top padding when image is half-outside -->
  <div :class="imagePosition === 'half-outside' ? getHalfOutsideSpacing().wrapperPadding : ''">
    <div
      class="relative overflow-visible flex flex-col items-center justify-center text-center rounded-3xl p-6 md:p-12 lg:p-4 min-h-[400px]"
      :class="backgroundClasses"
      :style="customGradientStyle"
    >
      <!-- Image/Illustration - Half Outside -->
      <div
        v-if="(image || $slots.image) && imagePosition === 'half-outside'"
        class="absolute left-1/2 -translate-x-1/2 z-10"
        :class="[
          imageSize !== 'custom' ? imageSizeClasses() : '',
          getHalfOutsideSpacing().imageTop,
        ]"
        :style="imageSize === 'custom' ? { maxWidth: imageWidth } : {}"
      >
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt"
          class="w-full h-auto mx-auto object-contain drop-shadow-2xl"
        />
        <slot name="image" />
      </div>

      <!-- Image/Illustration - Inside (default) -->
      <div
        v-if="(image || $slots.image) && imagePosition === 'inside'"
        :class="['mb-8', imageSize !== 'custom' ? imageSizeClasses() : '']"
        :style="imageSize === 'custom' ? { maxWidth: imageWidth } : {}"
      >
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt"
          class="w-full h-auto mx-auto drop-shadow-xl"
        />
        <slot name="image" />
      </div>

      <!-- Content wrapper with top margin when image is half-outside -->
      <div
        :class="[
          'max-w-3xl mx-auto',
          imagePosition === 'half-outside' ? getHalfOutsideSpacing().contentMargin : '',
        ]"
      >
        <!-- Headline using Text component -->
        <div class="mb-4">
          <Text variant="display-small" color="white" class="md:hidden">
            {{ headline }}
          </Text>
          <Text variant="display-medium" color="white" class="hidden md:block">
            {{ headline }}
          </Text>
        </div>

        <!-- Description using Text component -->
        <div v-if="description" class="mb-4 max-w-sm mx-auto">
          <Text variant="body-large" class="text-white/90">
            {{ description }}
          </Text>
        </div>

        <slot name="description" />

        <!-- CTA Button using Button component -->
        <div v-if="cta" class="mt-4">
          <Button
            v-if="cta.href"
            :variant="cta.variant || 'secondary'"
            :size="cta.size || 'large'"
            :href="cta.href"
            tag="a"
          >
            {{ cta.label }}
          </Button>
          <Button
            v-else
            :variant="cta.variant || 'secondary'"
            size="medium"
            @click="handleCtaClick"
          >
            {{ cta.label }}
          </Button>
        </div>

        <slot name="cta" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper text rendering on colored background */
.text-white {
  color: white !important;
}
</style>
