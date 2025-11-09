<!-- components/editorial/CardCluster/CardCluster.vue -->
<script setup>
import { computed } from 'vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  headline: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    required: true,
    validator: (items) => Array.isArray(items) && items.length > 0,
  },
  variant: {
    type: String,
    default: 'icons',
    validator: (v) => ['icons', 'rates', 'stepper'].includes(v),
  },
  theme: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'normal', 'neutral', 'deep-purple'].includes(v),
  },
  cta: {
    type: Object,
    default: null,
  },
})

const cardThemeStyles = {
  normal: {
    bg: 'bg-stone-200',
    cardBg: 'bg-white',
    textColor: 'content-primary',
    subtextColor: 'content-secondary',
    stepBadgeBg: 'bg-purple-100',
    stepBadgeText: 'text-purple-900',
    iconColor: 'text-purple-600',
  },
  light: {
    bg: 'bg-white',
    cardBg: 'bg-stone-50',
    textColor: 'content-primary',
    subtextColor: 'content-secondary',
    stepBadgeBg: 'bg-purple-100',
    stepBadgeText: 'text-purple-900',
    iconColor: 'text-purple-600',
  },
  neutral: {
    bg: 'bg-stone-50',
    cardBg: 'bg-white',
    textColor: 'content-primary',
    subtextColor: 'content-secondary',
    stepBadgeBg: 'bg-purple-100',
    stepBadgeText: 'text-purple-900',
    iconColor: 'text-purple-600',
  },
  'deep-purple': {
    bg: 'bg-purple-900',
    cardBg: 'bg-white/10',
    textColor: 'content-inverse',
    subtextColor: 'content-inverse',
    stepBadgeBg: 'bg-purple-600',
    stepBadgeText: 'text-purple-900',
    iconColor: 'text-purple-600',
  },
}

const currentTheme = computed(() => cardThemeStyles[props.theme] || cardThemeStyles.light)

// ✅ Handle link clicks
const handleLinkClick = (event, link) => {
  console.log('🎯 Link clicked in CardCluster:', link) // ✅ Debug log

  if (link.onClick && typeof link.onClick === 'function') {
    event.preventDefault()
    console.log('✅ Calling onClick function') // ✅ Debug log
    link.onClick()
  }
  // Otherwise, let the href handle navigation normally
}
</script>

<template>
  <section :class="['py-8 md:py-10 lg:py-12', currentTheme.bg]">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Header Section with CopyBlock -->
      <div v-if="headline || description || cta" class="flex flex-col items-center mb-8 md:mb-10">
        <CopyBlock
          v-if="headline || description"
          :title="headline"
          :description="description"
          align="center"
          spacing="4"
          title-variant="title-screen"
          description-variant="body-large"
          :title-color="currentTheme.textColor"
          :description-color="currentTheme.subtextColor"
          as="h2"
        />

        <!-- CTA Button -->
        <div v-if="cta" class="mt-6">
          <Button as="a" :href="cta.href" variant="primary" size="large">
            {{ cta.label }}
          </Button>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="[
            'p-8 flex flex-col items-center text-center rounded-3xl border border-stone-200',
            currentTheme.cardBg,
          ]"
        >
          <!-- Variant: Rates -->
          <template v-if="variant === 'rates'">
            <div class="mb-6 text-6xl">
              {{ item.icon }}
            </div>
            <Text variant="title-section" :color="currentTheme.textColor" as="h3" class="mb-4">
              {{ item.title }}
            </Text>
            <Text v-if="item.subtitle" variant="body-default" :color="currentTheme.subtextColor">
              {{ item.subtitle }}
            </Text>
          </template>

          <!-- Variant: Stepper -->
          <template v-else-if="variant === 'stepper'">
            <div
              :class="[
                'flex items-center justify-center rounded-full w-16 h-16 text-xl font-bold mb-6',
                currentTheme.stepBadgeBg,
                currentTheme.stepBadgeText,
              ]"
            >
              {{ index + 1 }}
            </div>
            <Text variant="title-section" :color="currentTheme.textColor" as="h3" class="mb-4">
              {{ item.title }}
            </Text>
            <Text v-if="item.subtitle" variant="body-default" :color="currentTheme.subtextColor">
              {{ item.subtitle }}
            </Text>
          </template>

          <!-- Variant: Icons -->
          <template v-else-if="variant === 'icons'">
            <!-- Icon or Image -->
            <div class="mb-6">
              <img
                v-if="item.image || item.imageSrc"
                :src="item.image || item.imageSrc"
                :alt="item.title"
                class="w-fit h-48 object-contain"
              />
              <div
                v-else-if="item.icon && typeof item.icon === 'string'"
                class="flex items-center justify-center w-16 h-16"
              >
                <Icon :name="item.icon" :size="48" :color="currentTheme.iconColor" />
              </div>
              <div
                v-else-if="item.icon"
                class="flex items-center justify-center text-4xl w-16 h-16"
              >
                {{ item.icon }}
              </div>
              <slot v-else :name="`icon-${index}`" />
            </div>

            <!-- Title -->
            <Text variant="title-section" :color="currentTheme.textColor" as="h3" class="mb-4">
              {{ item.title }}
            </Text>

            <!-- Subtitle/Description -->
            <Text
              v-if="item.subtitle"
              variant="body-default"
              :color="currentTheme.subtextColor"
              class="mb-6"
            >
              {{ item.subtitle }}
            </Text>

            <!-- ✅ UPDATED: Only show link if label exists, use chevron-right icon with primary-purple color -->
            <div v-if="item.link && item.link.label" class="mb-4">
              <a
                :href="item.link.href || '#'"
                :class="[
                  'inline-flex items-center gap-2 font-medium underline hover:no-underline transition-all cursor-pointer',
                  theme === 'deep-purple' ? 'text-white' : 'text-secondary-purple hover:',
                ]"
                @click="(e) => handleLinkClick(e, item.link)"
              >
                <Icon name="circle-check" :size="16" color="text-secondary-purple" />
                {{ item.link.label }}
              </a>
            </div>

            <!-- Card Button -->
            <div v-if="item.button">
              <Button as="a" :href="item.button.href" variant="primary">
                {{ item.button.label }}
              </Button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
