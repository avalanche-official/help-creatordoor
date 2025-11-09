<script setup>
import { ref, computed, watch } from 'vue'
import Tabs from '../../product/Tabs/Tabs.vue'
import Tab from '../../product/Tabs/Tab.vue'

const props = defineProps({
  // Headline text
  headline: {
    type: String,
    required: true,
  },
  // Tab options with data
  tabs: {
    type: Array,
    required: true,
    // Example: [
    //   {
    //     value: 'gbp',
    //     label: 'GBP',
    //     image: '/path/to/chart.png',
    //     alt: 'A graphic showing performance data',
    //     description: 'The graph shows past performance...'
    //   }
    // ]
  },
  // Default active tab
  defaultTab: {
    type: String,
    default: null,
  },
})

// Set initial active tab
const activeTab = ref(props.defaultTab || props.tabs[0]?.value)

// Image loading state
const imageLoaded = ref(false)

// Get current tab data
const currentTabData = computed(() => {
  return props.tabs.find((tab) => tab.value === activeTab.value)
})

// Reset image loaded state when tab changes
watch(activeTab, () => {
  imageLoaded.value = false
})

// Handle image error
const handleImageError = () => {
  imageLoaded.value = true // Show placeholder permanently if image fails
}
</script>

<template>
  <div class="tabs-data py-12 md:py-16 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <!-- Headline -->
      <h2 class="text-3xl md:text-4xl font-bold text-content-primary text-center mb-8">
        {{ headline }}
      </h2>

      <!-- Tabs Navigation -->
      <div class="flex justify-center mb-8">
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
      <div class="bg-background-elevated rounded-lg p-6 md:p-8">
        <!-- Data Image/Chart -->
        <div class="mb-6 flex justify-center">
          <div class="relative w-full max-w-4xl">
            <!-- Placeholder shown while image loads or if error -->
            <div
              v-if="!imageLoaded"
              class="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <div class="text-center text-content-tertiary">
                <svg
                  class="w-16 h-16 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p class="text-sm font-medium">Data visualization</p>
              </div>
            </div>

            <!-- Actual Image -->
            <img
              v-show="imageLoaded"
              :src="currentTabData.image"
              :alt="currentTabData.alt"
              class="max-w-full h-auto rounded-lg"
              @load="imageLoaded = true"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Optional Description -->
        <p
          v-if="currentTabData.description"
          class="text-sm md:text-base text-content-secondary text-center max-w-3xl mx-auto leading-relaxed"
        >
          {{ currentTabData.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure images are responsive */
img {
  max-height: 500px;
  object-fit: contain;
}
</style>
