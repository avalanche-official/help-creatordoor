<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Background color
  bgColor: {
    type: String,
    default: '#9CDB7C', // Wise green
  },
  // Scroll speed multiplier
  scrollMultiplier: {
    type: Number,
    default: 0.5,
  },
})

// Flags/icons data
const flags = [
  { id: 1, emoji: '🇨🇭', label: 'Switzerland' },
  { id: 2, emoji: '🇪🇺', label: 'European Union' },
  { id: 3, emoji: '🇬🇧', label: 'United Kingdom' },
  { id: 4, emoji: '🇮🇪', label: 'Ireland' },
  { id: 5, emoji: '🇺🇸', label: 'United States' },
  { id: 6, emoji: '🇨🇦', label: 'Canada' },
  { id: 7, emoji: '🇦🇺', label: 'Australia' },
  { id: 8, emoji: '🇯🇵', label: 'Japan' },
  { id: 9, emoji: '🇩🇪', label: 'Germany' },
  { id: 10, emoji: '🇫🇷', label: 'France' },
  { id: 11, emoji: '🇮🇹', label: 'Italy' },
  { id: 12, emoji: '🇪🇸', label: 'Spain' },
]

const containerRef = ref(null)
const translateX = ref(0)
const bannerTranslateX = ref(0)

const handleScroll = () => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Only animate when the component is in viewport
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Calculate how much of the component is visible
    const scrollProgress = Math.max(
      0,
      Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)),
    )

    // Move flags to the right (positive direction) as user scrolls down
    translateX.value = scrollProgress * 800 * props.scrollMultiplier

    // Move banner background to the left (negative direction) for parallax effect
    bannerTranslateX.value = -scrollProgress * 200
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="scrolling-flags-animation relative overflow-hidden"
    :style="{
      backgroundColor: bgColor,
      transform: `translateX(${bannerTranslateX}px)`,
    }"
    ref="containerRef"
  >
    <!-- Green arrow circle that follows the scroll -->
    <div
      class="absolute left-8 top-1/2 -translate-y-1/2 z-10 transition-transform duration-100 ease-out"
      :style="{ transform: `translate(${translateX * 0.3}px, -50%)` }"
    >
      <div class="w-24 h-24 rounded-full bg-[#1A4D2E] flex items-center justify-center shadow-lg">
        <svg
          class="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>

    <!-- Scrolling flags container -->
    <div class="relative h-32 flex items-center py-4">
      <div
        class="flex gap-8 items-center transition-transform duration-100 ease-out"
        :style="{
          transform: `translateX(${translateX}px)`,
        }"
      >
        <div v-for="flag in flags" :key="flag.id" class="flex-shrink-0">
          <div
            class="w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl shadow-md"
          >
            {{ flag.emoji }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrolling-flags-animation {
  min-height: 150px;
  position: relative;
  will-change: transform;
}
</style>
