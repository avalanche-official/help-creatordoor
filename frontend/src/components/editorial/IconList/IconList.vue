<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Array of list items (3-6 items recommended)
  items: {
    type: Array,
    required: true,
    // Example: [{ icon: '🔒', title: 'Privacy and data', description: 'We protect your details...' }]
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    // Options: 'light', 'neutral', 'forest-green'
  },
  // Enable "Show more" for 6+ items
  showMoreEnabled: {
    type: Boolean,
    default: true,
  },
})

// Theme colors
const themeStyles = {
  light: {
    bg: 'bg-white',
    cardBg: 'bg-gray-50',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
  },
  neutral: {
    bg: 'bg-gray-50',
    cardBg: 'bg-gray-100',
    text: 'text-content-primary',
    subtext: 'text-content-secondary',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    cardBg: 'bg-[#2A6B42]',
    text: 'text-white',
    subtext: 'text-white/80',
  },
}

// Show more functionality
const isExpanded = ref(false)
const showMoreButton = computed(() => props.showMoreEnabled && props.items.length > 6)

const visibleItems = computed(() => {
  if (!showMoreButton.value || isExpanded.value) {
    return props.items
  }
  // Show 3 on mobile, 4 on tablet, 6 on desktop (handled by CSS)
  return props.items
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div :class="['icon-list py-12 md:py-16 px-4', themeStyles[theme].bg]">
    <div class="max-w-7xl mx-auto">
      <!-- Items Grid -->
      <div :class="['grid gap-6 lg:gap-8 mb-8', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3']">
        <div
          v-for="(item, index) in visibleItems"
          :key="index"
          :class="[
            'rounded-2xl p-6 space-y-4',
            themeStyles[theme].cardBg,
            // Hide items based on screen size when not expanded
            showMoreButton && !isExpanded
              ? [
                  index >= 3 ? 'hidden md:block' : '',
                  index >= 4 ? 'hidden lg:block' : '',
                  index >= 6 ? 'hidden' : '',
                ]
              : '',
          ]"
        >
          <!-- Icon -->
          <div class="flex items-start gap-4">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <!-- SVG Icon Slot -->
              <slot :name="`icon-${index}`">
                <!-- Default: Use emoji/text icon -->
                <span class="text-xl">{{ item.icon }}</span>
              </slot>
            </div>
          </div>

          <!-- Title -->
          <h3 :class="['text-lg font-bold leading-tight', themeStyles[theme].text]">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p
            v-if="item.description"
            :class="['text-sm leading-relaxed', themeStyles[theme].subtext]"
          >
            {{ item.description }}
          </p>
        </div>
      </div>

      <!-- Show More/Less Button -->
      <div v-if="showMoreButton" class="text-center">
        <button
          @click="toggleExpand"
          :class="[
            'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:opacity-90',
            theme === 'forest-green'
              ? 'bg-content-positive text-content-primary'
              : 'bg-content-positive text-content-primary',
          ]"
        >
          {{ isExpanded ? 'Show less' : 'Show more' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.2s ease;
}
</style>
