<!-- components/editorial/FeatureSectionGrid/FeatureSectionGrid.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  // Array of feature items
  items: {
    type: Array,
    required: true,
    // Example: [{ image, imageSrc, imageAlt, title, description, cta: { primary, secondary }, hasVideo }]
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'neutral', 'deep-purple'].includes(v),
  },
})

// Theme colors
const themeStyles = {
  light: {
    bg: 'bg-white',
    titleColor: 'content-primary',
    descColor: 'content-secondary',
  },
  neutral: {
    bg: 'bg-gray-50',
    titleColor: 'content-primary',
    descColor: 'content-secondary',
  },
  'deep-purple': {
    bg: 'bg-purple-900',
    titleColor: 'content-inverse',
    descColor: 'content-inverse',
  },
}

const currentTheme = computed(() => themeStyles[props.theme] || themeStyles.light)
</script>

<template>
  <div :class="['py-8 md:py-10 lg:py-12', currentTheme.bg]">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Feature Items -->
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center',
          index < items.length - 1 ? 'mb-24' : '',
        ]"
      >
        <!-- Image Section -->
        <div :class="['relative rounded-3xl overflow-hidden', index % 2 === 1 ? 'lg:order-2' : '']">
          <img
            v-if="item.image || item.imageSrc"
            :src="item.image || item.imageSrc"
            :alt="item.imageAlt || 'Feature image'"
            class="w-full h-auto object-cover"
            style="max-height: 600px"
          />

          <slot :name="`image-${index}`" />

          <!-- Video Play Button -->
          <button
            v-if="item.hasVideo"
            class="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            aria-label="Play video"
            @click="$emit('play-video', index)"
          >
            <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <!-- Content Section -->
        <div :class="['flex flex-col', index % 2 === 1 ? 'lg:order-1' : '']">
          <!-- Title -->
          <Text variant="title-section" :color="currentTheme.titleColor" as="h2" class="mb-6">
            {{ item.title }}
          </Text>

          <!-- Description -->
          <Text variant="body-large" :color="currentTheme.descColor" class="mb-8">
            {{ item.description }}
          </Text>

          <!-- CTAs -->
          <div v-if="item.cta" class="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button
              v-if="item.cta.primary"
              as="a"
              :href="item.cta.primary.href"
              variant="primary"
              size="large"
            >
              {{ item.cta.primary.label }}
            </Button>

            <Button
              v-if="item.cta.secondary"
              as="a"
              :href="item.cta.secondary.href"
              variant="link"
              size="large"
              :class="theme === 'deep-purple' ? 'text-white hover:text-white/80' : ''"
            >
              {{ item.cta.secondary.label }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
