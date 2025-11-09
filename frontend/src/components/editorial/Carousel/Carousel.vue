<script setup>
import { ref } from 'vue'

const props = defineProps({
  // Section headline (optional)
  headline: {
    type: String,
    default: '',
  },
  // Array of carousel items
  items: {
    type: Array,
    required: true,
  },
  // Variant type
  variant: {
    type: String,
    default: 'quotes',
    // Options: 'quotes', 'stepper', 'images'
  },
  // Auto-play interval (0 to disable)
  autoPlay: {
    type: Number,
    default: 0, // milliseconds
  },
})

const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// Auto-play functionality
if (props.autoPlay > 0) {
  setInterval(() => {
    nextSlide()
  }, props.autoPlay)
}
</script>

<template>
  <div class="carousel py-12 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Two Column Layout: Left side header/nav, Right side carousel -->
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:overflow-visible"
      >
        <!-- Left Column: Headline + Navigation -->
        <div class="lg:col-span-4 flex flex-col gap-8 relative z-10 bg-white lg:pr-4">
          <!-- Headline -->
          <h2
            v-if="headline"
            class="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-gray-900"
          >
            {{ headline }}
          </h2>

          <!-- Navigation Controls -->
          <div class="flex gap-3">
            <button
              @click="prevSlide"
              class="w-14 h-14 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              @click="nextSlide"
              class="w-14 h-14 rounded-full bg-green-600 hover:opacity-90 flex items-center justify-center transition-opacity text-white"
              aria-label="Next slide"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <!-- Dots Indicator (Desktop) -->
          <div class="hidden lg:flex gap-2">
            <button
              v-for="(item, index) in items"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-2 h-2 rounded-full transition-all',
                currentIndex === index ? 'bg-purple-600 w-8' : 'bg-gray-300',
              ]"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
        </div>

        <!-- Right Column: Carousel Content -->
        <div class="lg:col-span-8 lg:ml-auto lg:mr-0 relative z-0">
          <!-- Carousel Container with overflow -->
          <div class="relative">
            <!-- Slides -->
            <div
              class="flex transition-transform duration-500 ease-out lg:pr-8"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div v-for="(item, index) in items" :key="index" class="w-full flex-shrink-0">
                <!-- Quotes Variant -->
                <div v-if="variant === 'quotes'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    v-for="(quote, qIndex) in [item.quote1, item.quote2].filter(Boolean)"
                    :key="qIndex"
                    :class="[
                      'rounded-3xl p-8 md:p-10 min-h-[400px] flex flex-col justify-between',
                      qIndex === 0 ? 'bg-[#1A4D2E] text-white' : 'bg-green-500 text-gray-900',
                    ]"
                  >
                    <!-- Flag Icon -->
                    <div class="text-5xl mb-6">{{ quote.flag }}</div>

                    <!-- Quote Text -->
                    <p class="text-base md:text-lg leading-relaxed mb-8 flex-1">
                      "{{ quote.text }}"
                    </p>

                    <!-- Author Button -->
                    <button
                      :class="[
                        'self-start px-6 py-3 rounded-full font-semibold text-sm transition-all',
                        qIndex === 0
                          ? 'bg-green-500 text-gray-900 hover:opacity-90'
                          : 'bg-gray-900 text-white hover:opacity-90',
                      ]"
                    >
                      {{ quote.author }}
                    </button>
                  </div>
                </div>

                <!-- Stepper Variant -->
                <div
                  v-else-if="variant === 'stepper'"
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <div
                    v-for="(step, sIndex) in item.steps"
                    :key="sIndex"
                    class="bg-gray-50 rounded-3xl p-8 flex flex-col"
                  >
                    <!-- Step Number -->
                    <div
                      class="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold mb-6"
                    >
                      {{ sIndex + 1 }}
                    </div>

                    <!-- Step Title -->
                    <h3 class="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                      {{ step.title }}
                    </h3>

                    <!-- Step Description -->
                    <p class="text-sm leading-relaxed text-gray-600">
                      {{ step.description }}
                    </p>
                  </div>
                </div>

                <!-- Images Variant -->
                <div
                  v-else-if="variant === 'images'"
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <div
                    v-for="(image, iIndex) in item.images"
                    :key="iIndex"
                    class="rounded-3xl overflow-hidden"
                  >
                    <img :src="image.src" :alt="image.alt" class="w-full h-80 object-cover" />
                    <div v-if="image.caption" class="bg-white p-4">
                      <p class="text-sm text-gray-600">{{ image.caption }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots Indicator (Mobile) -->
      <div class="flex lg:hidden justify-center gap-2 mt-8">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-2 h-2 rounded-full transition-all',
            currentIndex === index ? 'bg-purple-600 w-8' : 'bg-gray-300',
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth carousel transitions */
.flex {
  will-change: transform;
}

/* Allow carousel to overflow on desktop */
@media (min-width: 1024px) {
  .carousel {
    overflow: visible;
  }

  .lg\:col-span-8 {
    overflow: visible;
  }
}
</style>
