<script setup>
import { ref } from 'vue'

const props = defineProps({
  // Video URL or embed URL
  videoUrl: {
    type: String,
    required: true,
  },
  // Poster/thumbnail image
  posterImage: {
    type: String,
    required: true,
  },
  // Alt text for poster image
  posterAlt: {
    type: String,
    default: 'Video thumbnail',
  },
  // Button label
  buttonLabel: {
    type: String,
    default: 'Watch video',
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'neutral', 'forest-green'].includes(value),
  },
})

const isPlaying = ref(false)

// Theme configurations
const themeStyles = {
  light: {
    bg: 'bg-white',
  },
  neutral: {
    bg: 'bg-gray-50',
  },
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
  },
}

const currentTheme = themeStyles[props.theme]

const playVideo = () => {
  isPlaying.value = true
}
</script>

<template>
  <div :class="['video-embed py-12 md:py-16 px-4', currentTheme.bg]">
    <div class="max-w-6xl mx-auto">
      <!-- Video Container -->
      <div class="relative w-full" style="padding-bottom: 56.25%">
        <!-- Poster Image with Play Button -->
        <div v-if="!isPlaying" class="absolute inset-0">
          <!-- Background Image -->
          <img
            :src="posterImage"
            :alt="posterAlt"
            class="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />

          <!-- Dark Overlay -->
          <div class="absolute inset-0 bg-black/20 rounded-2xl"></div>

          <!-- Play Button - Centered at Bottom -->
          <div class="absolute bottom-2 md:bottom-2 left-1/2 -translate-x-1/2 z-50">
            <button
              @click="playVideo"
              class="flex items-center gap-2 bg-white hover:bg-gray-50 text-content-primary font-semibold px-6 py-3.5 rounded-full shadow-xl transition-all hover:scale-105"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{{ buttonLabel }}</span>
            </button>
          </div>
        </div>

        <!-- Video Iframe -->
        <iframe
          v-else
          :src="videoUrl"
          class="absolute inset-0 w-full h-full rounded-2xl"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

button:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.2);
}
</style>
