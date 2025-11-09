<!-- components/editorial/FeatureHighlight/FeatureHighlight.vue -->
<script setup>
import { computed } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  // Array of feature items (2-3 items)
  items: {
    type: Array,
    required: true,
    validator: (items) => items.length >= 2 && items.length <= 3,
    // Example: [{ icon: 'lock', title: 'Privacy', description: 'We protect...' }]
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'neutral', 'deep-purple'].includes(v),
  },
  // Show top divider
  showDivider: {
    type: Boolean,
    default: true,
  },
})

const gridClasses = computed(() => {
  const baseClasses = 'grid gap-8 md:gap-10'
  const columnClasses =
    props.items.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return `${baseClasses} ${columnClasses}`
})

const themeClasses = computed(() => {
  const themes = {
    light: {
      bg: 'bg-white',
      divider: 'border-stone-200',
      iconBg: 'bg-stone-50',
      textColor: 'content-primary',
      subtextColor: 'content-secondary',
      iconColor: 'text-stone-600',
    },
    neutral: {
      bg: 'bg-gray-50',
      divider: 'border-stone-200',
      iconBg: 'bg-white',
      textColor: 'content-primary',
      subtextColor: 'content-secondary',
      iconColor: 'text-purple-600',
    },
    'deep-purple': {
      bg: 'bg-purple-900',
      divider: 'border-purple-700',
      iconBg: 'bg-purple-800',
      textColor: 'content-inverse',
      subtextColor: 'content-inverse',
      iconColor: 'text-white',
    },
  }

  return themes[props.theme]
})
</script>

<template>
  <div :class="['pb-8', themeClasses.bg]">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Optional Divider -->
      <div v-if="showDivider" :class="['w-full border-t mb-8 md:mb-10', themeClasses.divider]" />

      <!-- Features Grid -->
      <div :class="gridClasses">
        <div v-for="(item, index) in items" :key="index" class="flex flex-col items-start gap-4">
          <!-- Icon Circle -->
          <div
            :class="[
              'flex items-center border border-stone-200 justify-center rounded-full w-12 h-12',
              themeClasses.iconBg,
            ]"
          >
            <!-- Custom Icon Slot (optional) -->
            <slot :name="`icon-${index}`">
              <!-- Default: Icon component -->
              <Icon
                :name="item.icon"
                :size="22"
                :color="themeClasses.iconColor"
                :stroke-width="2"
              />
            </slot>
          </div>
          <div class="space-y-2">
            <!-- Title -->
            <Text variant="title-subsection" :color="themeClasses.textColor" as="h3">
              {{ item.title }}
            </Text>

            <!-- Description -->
            <Text v-if="item.description" variant="body-large" :color="themeClasses.subtextColor">
              {{ item.description }}
            </Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
