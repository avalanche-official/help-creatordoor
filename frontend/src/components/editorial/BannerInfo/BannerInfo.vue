<!-- components/editorial/BannerInfo/BannerInfo.vue -->
<script setup>
import { computed } from 'vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  icon: {
    type: String,
    default: null,
    // Lucide icon name
  },
  image: {
    type: String,
    default: null,
  },
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'bright-purple',
    validator: (v) =>
      [
        'bright-purple',
        'deep-purple',
        'bright-orange',
        'bright-yellow',
        'bright-blue',
        'bright-pink',
      ].includes(v),
  },
  // Optional convenience props
  cta: {
    type: Object,
    default: null,
  },
  secondaryCta: {
    type: Object,
    default: null,
  },
})

// Theme styles
const themeStyles = {
  'bright-purple': {
    bg: 'bg-secondary-purple',
    titleColor: 'primary-purple',
    descColor: 'white',
    iconBg: 'bg-primary-purple/70',
    iconColor: 'text-secondary-purple',
    buttonVariant: 'primary',
    secondaryVariant: 'link',
  },
  'deep-purple': {
    bg: 'bg-deep-purple',
    titleColor: 'content-inverse',
    descColor: 'content-inverse',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    buttonVariant: 'primary',
    secondaryVariant: 'link',
  },
  'bright-orange': {
    bg: 'bg-bright-',
    titleColor: 'content-primary',
    descColor: 'content-primary',
    iconBg: 'bg-white/20',
    iconColor: 'text-gray-900',
    buttonVariant: 'primary',
    secondaryVariant: 'link',
  },
  'bright-yellow': {
    bg: 'bg-bright-yellow',
    titleColor: 'content-primary',
    descColor: 'content-primary',
    iconBg: 'bg-white/20',
    iconColor: 'text-gray-900',
    buttonVariant: 'primary',
    secondaryVariant: 'link',
  },
  'bright-blue': {
    bg: 'bg-bright-blue',
    titleColor: 'content-primary',
    descColor: 'content-primary',
    iconBg: 'bg-white/20',
    iconColor: 'text-gray-900',
    buttonVariant: 'primary',
    secondaryVariant: 'link',
  },
  'bright-pink': {
    bg: 'bg-bright-pink',
    titleColor: 'content-primary',
    descColor: 'content-primary',
    iconBg: 'bg-white/20',
    iconColor: 'text-gray-900',
    buttonVariant: 'primary',
    secondaryVariant: 'link',
  },
}

const currentTheme = computed(() => themeStyles[props.theme] || themeStyles['bright-purple'])
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col items-center text-center rounded-4xl',
      currentTheme.bg,
    ]"
    style="min-height: 320px"
  >
    <!-- Icon or Image -->
    <div v-if="icon || image" class="mb-6">
      <!-- Image -->
      <img v-if="image" :src="image" :alt="headline" class="w-16 h-16 object-contain" />

      <!-- Lucide Icon -->
      <div
        v-else-if="icon"
        :class="[
          'w-16 h-16 rounded-full backdrop-blur-sm flex items-center justify-center',
          currentTheme.iconBg,
        ]"
      >
        <Icon :name="icon" :size="32" :color="currentTheme.iconColor" :stroke-width="2" />
      </div>
    </div>

    <!-- Custom icon slot -->
    <slot name="icon" />

    <!-- Content with CopyBlock -->
    <div class="max-w-3xl">
      <CopyBlock
        :title="headline"
        :description="description"
        align="center"
        spacing="4"
        title-variant="display-medium"
        description-variant="body-large"
        :title-color="currentTheme.titleColor"
        :description-color="currentTheme.descColor"
        as="h2"
      >
        <!-- Custom description slot -->
        <slot name="description" />

        <!-- Actions: Slot has priority, props as fallback -->
        <div
          v-if="$slots.actions || cta || secondaryCta"
          class="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
        >
          <slot name="actions">
            <!-- Fallback: Use Button component -->
            <Button
              v-if="cta"
              as="a"
              :href="cta.href"
              :variant="currentTheme.buttonVariant"
              size="large"
            >
              {{ cta.label }}
            </Button>

            <Button
              v-if="secondaryCta"
              as="a"
              :href="secondaryCta.href"
              :variant="currentTheme.secondaryVariant"
              size="large"
            >
              {{ secondaryCta.label }}
            </Button>
          </slot>
        </div>
      </CopyBlock>
    </div>

    <!-- Pattern overlay -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background-image: radial-gradient(
          circle at 2px 2px,
          rgba(255, 255, 255, 0.05) 1px,
          transparent 0
        );
        background-size: 32px 32px;
      "
    ></div>
  </div>
</template>
