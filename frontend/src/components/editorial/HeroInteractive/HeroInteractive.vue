<!-- components/editorial/HeroInteractive/HeroInteractive.vue -->
<script setup>
import { computed } from 'vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonLink: {
    type: String,
    default: '#',
  },
  buttonVariant: {
    type: String,
    default: 'primary',
  },
  buttonSize: {
    type: String,
    default: 'large',
  },
  theme: {
    type: String,
    default: 'bright-purple',
    validator: (v) => ['bright-purple', 'deep-purple', 'transparent'].includes(v),
  },
  backgroundStyle: {
    type: String,
    default: 'half',
    validator: (v) => ['half', 'full'].includes(v),
  },
  layout: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v),
  },
  // CopyBlock props
  titleVariant: {
    type: String,
    default: 'display-medium',
  },
  mobileTitleVariant: {
    type: String,
    default: 'display-small',
  },
  descriptionVariant: {
    type: String,
    default: 'body-large-bold',
  },
  titleColor: {
    type: String,
    default: 'content-primary',
  },
  descriptionColor: {
    type: String,
    default: 'content-secondary',
  },
})

const emit = defineEmits(['button-click'])

const themeStyles = {
  'bright-purple': {
    topBg: 'bg-purple-600',
    bottomBg: 'bg-gray-50',
  },
  'deep-purple': {
    topBg: 'bg-purple-900',
    bottomBg: 'bg-purple-950',
  },
  transparent: {
    topBg: 'bg-transparent',
    bottomBg: 'bg-transparent',
  },
}

const currentTheme = computed(() => themeStyles[props.theme] || themeStyles['bright-purple'])

// Mobile: always center, Desktop: depends on layout
const copyBlockAlign = computed(() => {
  if (props.layout === 'vertical') return 'center'
  return 'center' // This will be overridden by responsive classes
})

const handleButtonClick = (event) => {
  emit('button-click', event)
}
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Background Layers -->
    <div v-if="backgroundStyle === 'half'" class="absolute inset-0">
      <div :class="['absolute top-0 left-0 right-0 h-1/2', currentTheme.topBg]"></div>
      <div :class="['absolute bottom-0 left-0 right-0 h-1/2', currentTheme.bottomBg]"></div>
    </div>
    <div v-else :class="['absolute inset-0', currentTheme.topBg]"></div>

    <!-- Content Container -->
    <div class="relative z-10 py-8 md:pt-20 md:pb-13 lg:pt-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          :class="[
            'grid items-center gap-8 lg:gap-12',
            layout === 'vertical' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2',
          ]"
        >
          <!-- Text Content -->
          <div
            :class="[
              'flex flex-col gap-6',
              layout === 'vertical' ? 'max-w-3xl mx-auto' : '',
              // Mobile: always centered, Desktop: left-aligned for horizontal layout
              'text-center lg:text-left',
              layout === 'vertical' ? 'lg:text-center' : '',
            ]"
          >
            <CopyBlock
              :title="headline"
              :description="description"
              align="center"
              :title-variant="titleVariant"
              :mobile-title-variant="mobileTitleVariant"
              :description-variant="descriptionVariant"
              :title-color="titleColor"
              :description-color="descriptionColor"
              spacing="4"
              as="h1"
              :class="[
                // Override align prop with responsive classes
                'text-center lg:text-left',
                layout === 'vertical' ? 'lg:text-center' : '',
              ]"
            >
              <!-- Extra content slot -->
              <slot name="content" />

              <!-- Button -->
              <div
                :class="[
                  'mt-6',
                  // Mobile: center, Desktop: left for horizontal, center for vertical
                  'flex justify-center lg:justify-start',
                  layout === 'vertical' ? 'lg:justify-center' : '',
                ]"
              >
                <Button
                  v-if="buttonText"
                  as="a"
                  :href="buttonLink"
                  :variant="buttonVariant"
                  :size="buttonSize"
                  @click="handleButtonClick"
                >
                  {{ buttonText }}
                </Button>
              </div>
            </CopyBlock>
          </div>

          <!-- Interactive Element -->
          <div
            :class="[
              'relative flex',
              layout === 'vertical'
                ? 'justify-center max-w-2xl mx-auto w-full'
                : 'justify-center lg:justify-end',
            ]"
          >
            <div class="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-[500px]">
              <slot name="interactive">
                <div class="p-12 text-center text-gray-400">
                  <p class="text-base">Interactive component goes here</p>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
