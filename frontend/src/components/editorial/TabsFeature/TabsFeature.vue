<script setup>
import { ref, computed } from 'vue'
import Tabs from '../../product/Tabs/Tabs.vue'
import Tab from '../../product/Tabs/Tab.vue'

const props = defineProps({
  // Main headline
  headline: {
    type: String,
    required: true,
  },
  // Tab options with feature details
  tabs: {
    type: Array,
    required: true,
    validator: (value) => value.length >= 2 && value.length <= 6,
    // Example: [
    //   {
    //     value: 'property',
    //     label: 'Property purchase',
    //     title: 'Selling in one country to buy a home in another',
    //     description: 'If you\'re selling up overseas...',
    //     image: '/path/to/image.jpg',
    //     alt: 'A woman holding a Wise card',
    //     buttons: [{ label: 'Learn more', href: '#' }]
    //   }
    // ]
  },
  // Default active tab
  defaultTab: {
    type: String,
    default: null,
  },
  // Image position
  imagePosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
})

// Set initial active tab
const activeTab = ref(props.defaultTab || props.tabs[0]?.value)

// Get current tab data
const currentTabData = computed(() => {
  return props.tabs.find((tab) => tab.value === activeTab.value)
})
</script>

<template>
  <div class="tabs-feature py-12 md:py-16 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Main Headline -->
      <h2
        class="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-8 leading-tight"
      >
        {{ headline }}
      </h2>

      <!-- Tabs Navigation -->
      <div class="mb-8 md:mb-12">
        <Tabs v-model="activeTab">
          <Tab
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            :label="tab.label"
            :disabled="tab.disabled"
          />
        </Tabs>
      </div>

      <!-- Tab Content -->
      <div
        :class="[
          'flex flex-col gap-8 items-center',
          imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse',
        ]"
      >
        <!-- Image Section -->
        <div class="w-full lg:w-1/2 flex-shrink-0">
          <div
            class="relative rounded-3xl overflow-hidden shadow-lg bg-gray-100 aspect-[3/4] md:aspect-[4/5]"
          >
            <img
              v-if="currentTabData.image"
              :src="currentTabData.image"
              :alt="currentTabData.alt"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Content Section -->
        <div class="w-full lg:w-1/2 bg-background-elevated rounded-2xl p-8 md:p-10">
          <!-- Feature Title -->
          <h3 class="text-2xl md:text-3xl font-bold text-content-primary mb-4 leading-tight">
            {{ currentTabData.title }}
          </h3>

          <!-- Feature Description -->
          <p class="text-base md:text-lg text-content-secondary leading-relaxed mb-6">
            {{ currentTabData.description }}
          </p>

          <!-- Optional Buttons -->
          <div
            v-if="currentTabData.buttons && currentTabData.buttons.length"
            class="flex flex-wrap gap-4"
          >
            <a
              v-for="(button, index) in currentTabData.buttons"
              :key="index"
              :href="button.href"
              class="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-base bg-content-positive text-content-primary transition-all hover:bg-[#9fdb1c] shadow-md"
            >
              {{ button.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}

a:hover {
  transform: translateY(-2px);
}

/* Ensure proper aspect ratio for images */
img {
  transition: opacity 0.3s ease;
}
</style>
