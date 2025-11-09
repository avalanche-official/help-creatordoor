<script setup>
const props = defineProps({
  // Headline text (2 lines max)
  headline: {
    type: String,
    required: true,
  },
  // Body copy text
  description: {
    type: String,
    required: true,
  },
  // CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Learn more', href: '/about' }
  },
  // Image/illustration on the right
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
  // Background color variant
  variant: {
    type: String,
    default: 'teal',
    // Options: 'teal', 'blue', 'green', 'purple', 'pink', 'coral'
  },
  // Layout direction (image on right by default)
  imagePosition: {
    type: String,
    default: 'right',
    // Options: 'left', 'right'
  },
})

// Color variants based on Wise's color pairings
const colorVariants = {
  teal: {
    bg: 'bg-[#9CDBDB]',
    text: 'text-content-primary',
  },
  blue: {
    bg: 'bg-[#BBDEFB]',
    text: 'text-content-primary',
  },
  green: {
    bg: 'bg-[#C5E1A5]',
    text: 'text-content-primary',
  },
  purple: {
    bg: 'bg-[#D1C4E9]',
    text: 'text-content-primary',
  },
  pink: {
    bg: 'bg-[#F8BBD0]',
    text: 'text-content-primary',
  },
  coral: {
    bg: 'bg-[#FFCCBC]',
    text: 'text-content-primary',
  },
}
</script>

<template>
  <div
    :class="[
      'callout-small rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden',
      colorVariants[variant].bg,
    ]"
  >
    <div
      :class="[
        'flex flex-col gap-8 items-center',
        imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse',
      ]"
    >
      <!-- Content Section -->
      <div class="flex-1 space-y-6">
        <!-- Headline -->
        <h2 :class="['text-3xl md:text-4xl font-bold leading-tight', colorVariants[variant].text]">
          {{ headline }}
        </h2>

        <!-- Description -->
        <p :class="['text-base md:text-lg leading-relaxed', colorVariants[variant].text]">
          {{ description }}
        </p>

        <!-- CTA Button -->
        <a
          v-if="cta"
          :href="cta.href"
          class="inline-flex items-center justify-center px-8 py-3.5 bg-content-primary text-white rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 shadow-lg"
        >
          {{ cta.label }}
        </a>

        <!-- Slot for custom CTA -->
        <slot name="cta" />
      </div>

      <!-- Image Section -->
      <div v-if="image || $slots.image" class="flex-shrink-0 w-full lg:w-auto lg:max-w-4xl">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt"
          class="w-full h-auto object-contain max-h-80"
        />

        <!-- Slot for custom image/illustration -->
        <slot name="image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.callout-small {
  position: relative;
}

/* Smooth transitions */
a {
  transition: all 0.2s ease;
}

/* Ensure images scale nicely */
img {
  display: block;
}
</style>
