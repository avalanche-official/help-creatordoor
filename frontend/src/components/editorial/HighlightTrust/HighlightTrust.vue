<!-- components/editorial/HighlightTrust/HighlightTrust.vue -->
<script setup>
import { computed } from 'vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  // Headline text
  headline: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Trust features/points
  features: {
    type: Array,
    default: () => [],
    // Example: [{ icon: 'lock' OR emoji: '🔒' OR image: '/path/to/icon.svg', title: '...', description: '...', link: { label, href } }]
  },
  // Hero image/illustration
  image: {
    type: String,
    default: '',
  },
  // Image alt text
  imageAlt: {
    type: String,
    default: 'Trust illustration',
  },
  // CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'How we keep your money safe', href: '/security' }
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
    featureBg: 'bg-white',
    featureBorder: 'border-stone-200',
    iconBg: 'bg-[#EDEFEB]',
    iconColor: 'text-stone-600',
  },
  neutral: {
    bg: 'bg-gray-50',
    titleColor: 'content-primary',
    descColor: 'content-secondary',
    featureBg: 'bg-white',
    featureBorder: 'border-stone-200',
    iconBg: 'bg-gray-50',
    iconColor: 'text-purple-600',
  },
  'deep-purple': {
    bg: 'bg-purple-900',
    titleColor: 'content-inverse',
    descColor: 'content-inverse',
    featureBg: 'bg-white/10',
    featureBorder: 'border-white/20',
    iconBg: 'bg-white/10',
    iconColor: 'text-white',
  },
}

const currentTheme = computed(() => themeStyles[props.theme] || themeStyles.light)
</script>

<template>
  <div :class="['py-8 md:py-10 lg:py-12', currentTheme.bg]">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Hero Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <!-- Content -->
        <div class="flex flex-col gap-6">
          <!-- Headline & Description -->
          <CopyBlock
            :title="headline"
            :description="description"
            align="left"
            spacing="4"
            title-variant="display-small"
            mobile-title-variant="title-page"
            description-variant="body-large"
            :title-color="currentTheme.titleColor"
            :description-color="currentTheme.descColor"
            as="h2"
          >
            <!-- CTA Button -->
            <div v-if="cta" class="mt-6">
              <Button as="a" :href="cta.href" variant="primary" size="large">
                {{ cta.label }}
              </Button>
            </div>
          </CopyBlock>
        </div>

        <!-- Illustration -->
        <div class="flex items-center justify-center">
          <img
            v-if="image"
            :src="image"
            :alt="imageAlt"
            class="w-full max-w-[250px] sm:max-w-[350px] h-auto object-contain"
          />
          <!-- Slot for custom illustration -->
          <slot name="image" />
        </div>
      </div>

      <!-- Trust Features Grid -->
      <div
        v-if="features.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="[
            ' flex flex-col gap-4 rounded-2xl ',
            currentTheme.featureBg,
            currentTheme.featureBorder,
          ]"
        >
          <!-- Icon or Image -->
          <div v-if="feature.icon || feature.emoji || feature.image" class="flex-shrink-0">
            <!-- Image -->
            <div
              v-if="feature.image"
              :class="[
                'w-14 h-14 rounded-full flex items-center justify-center overflow-hidden',
                currentTheme.iconBg,
              ]"
            >
              <img :src="feature.image" :alt="feature.title" class="w-10 h-10 object-contain" />
            </div>
            <!-- Emoji -->
            <div
              v-else-if="feature.emoji"
              :class="[
                'w-16 h-16 rounded-full flex items-center justify-center text-2xl',
                currentTheme.iconBg,
              ]"
            >
              {{ feature.emoji }}
            </div>
            <!-- Lucide Icon -->
            <div
              v-else-if="feature.icon"
              :class="[
                'w-14 h-14 rounded-full flex items-center justify-center',
                currentTheme.iconBg,
              ]"
            >
              <Icon :name="feature.icon" :size="24" :color="currentTheme.iconColor" />
            </div>
          </div>

          <!-- Title (optional) -->
          <Text
            v-if="feature.title"
            variant="title-section"
            :color="currentTheme.titleColor"
            as="h3"
          >
            {{ feature.title }}
          </Text>

          <!-- Description -->
          <Text variant="body-large-bold" :color="currentTheme.descColor" class="flex-1">
            {{ feature.description }}
          </Text>

          <!-- Link -->
          <div v-if="feature.link" class="mt-auto">
            <Button
              as="a"
              :href="feature.link.href"
              :variant="theme === 'deep-purple' ? 'link' : 'link'"
              :class="theme === 'deep-purple' ? 'text-white hover:text-white/80' : ''"
            >
              {{ feature.link.label }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
