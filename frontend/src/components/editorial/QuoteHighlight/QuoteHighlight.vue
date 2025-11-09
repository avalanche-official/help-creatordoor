<script setup>
const props = defineProps({
  // Quote text
  quote: {
    type: String,
    required: true,
  },
  // Author name and details
  author: {
    type: String,
    required: true,
  },
  // Background image
  backgroundImage: {
    type: String,
    required: true,
  },
  // Background overlay opacity (0-1)
  overlayOpacity: {
    type: Number,
    default: 0.3,
  },
})
</script>

<template>
  <div class="quote-highlight relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img :src="backgroundImage" alt="" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black" :style="{ opacity: overlayOpacity }"></div>
    </div>

    <!-- Content Container -->
    <div
      class="relative z-10 flex items-center justify-center min-h-[400px] md:min-h-[450px] px-4 py-12 md:py-16"
    >
      <div class="max-w-5xl mx-auto">
        <!-- Quote Card -->
        <div class="bg-white rounded-3xl px-8 py-12 md:px-16 md:py-16 shadow-2xl">
          <!-- Quote Text -->
          <blockquote class="text-center">
            <p
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-content-primary leading-tight mb-6"
            >
              "{{ quote }}"
            </p>
            <!-- Author -->
            <footer class="text-base md:text-lg text-content-secondary font-medium">
              {{ author }}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure minimum height for visual consistency */
.quote-highlight {
  position: relative;
}

/* Smooth transitions */
.bg-white {
  transition: transform 0.3s ease;
}

/* Optional: Add subtle hover effect to card */
.quote-highlight:hover .bg-white {
  transform: scale(1.01);
}
</style>
