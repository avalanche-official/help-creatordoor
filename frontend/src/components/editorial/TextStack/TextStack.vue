<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Main headline
  headline: {
    type: String,
    required: true,
  },
  // Stack items
  items: {
    type: Array,
    required: true,
    // Example: [
    //   {
    //     title: 'PISP',
    //     description: 'PISP (Payment Initiation Service Provider) payments are...',
    //     visible: true // optional, defaults to true
    //   }
    // ]
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'forest-green'].includes(value),
  },
  // Number of initially visible items
  initialVisibleCount: {
    type: Number,
    default: 3,
  },
  // Show more/less button labels
  showMoreLabel: {
    type: String,
    default: 'Show more',
  },
  showLessLabel: {
    type: String,
    default: 'Show less',
  },
})

// Track expanded state
const isExpanded = ref(false)

// Theme configurations
const themeStyles = {
  light: {
    bg: 'bg-white',
    headlineText: 'text-content-primary',
    titleText: 'text-content-primary',
    descText: 'text-content-secondary',
    divider: 'border-gray-300',
    buttonBg: 'bg-content-positive',
    buttonText: 'text-content-primary',
    buttonHover: 'hover:bg-[#9fdb1c]',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    headlineText: 'text-white',
    titleText: 'text-white',
    descText: 'text-white/90',
    divider: 'border-white/30',
    buttonBg: 'bg-content-positive',
    buttonText: 'text-content-primary',
    buttonHover: 'hover:bg-[#9fdb1c]',
  },
}

const currentTheme = themeStyles[props.theme]

// Visible items based on expanded state
const visibleItems = computed(() => {
  if (isExpanded.value) {
    return props.items
  }
  return props.items.slice(0, props.initialVisibleCount)
})

// Show expand/collapse button only if there are more items
const showToggleButton = computed(() => {
  return props.items.length > props.initialVisibleCount
})

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div :class="['text-stack py-12 md:py-16 px-4', currentTheme.bg]">
    <div class="max-w-5xl mx-auto">
      <!-- Headline -->
      <h2
        :class="[
          'text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-8 md:mb-12',
          currentTheme.headlineText,
        ]"
      >
        {{ headline }}
      </h2>

      <!-- Stack Items -->
      <div class="space-y-0">
        <div
          v-for="(item, index) in visibleItems"
          :key="index"
          :class="[
            'py-8 md:py-10',
            index !== visibleItems.length - 1 || showToggleButton
              ? `border-b ${currentTheme.divider}`
              : '',
          ]"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Title -->
            <div class="md:col-span-1">
              <h3 :class="['text-xl md:text-2xl font-bold', currentTheme.titleText]">
                {{ item.title }}
              </h3>
            </div>

            <!-- Description with HTML support for links -->
            <div class="md:col-span-2">
              <div
                :class="['text-base leading-relaxed rich-text-content', currentTheme.descText]"
                v-html="item.description"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Show More/Less Button -->
      <div v-if="showToggleButton" class="flex justify-center mt-8 md:mt-10">
        <button
          @click="toggleExpanded"
          :class="[
            'flex flex-col items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all',
            currentTheme.buttonBg,
            currentTheme.buttonText,
            currentTheme.buttonHover,
          ]"
        >
          <!-- Icon -->
          <div class="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center">
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isExpanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <!-- Label -->
          <span>{{ isExpanded ? showLessLabel : showMoreLabel }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Link styling within description */
.rich-text-content :deep(a) {
  text-decoration: underline;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.rich-text-content :deep(a):hover {
  opacity: 0.8;
}

/* Button transitions */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}
</style>
