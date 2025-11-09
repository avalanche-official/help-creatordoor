<script setup>
const props = defineProps({
  // Headline text
  headline: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Product image/render URL
  image: {
    type: String,
    default: '',
  },
  // Image alt text
  imageAlt: {
    type: String,
    default: 'Product image',
  },
  // CTA buttons
  cta: {
    type: Object,
    default: null,
    // Example: { primary: { label, href }, secondary: { label, href } }
  },
  // Image position
  imagePosition: {
    type: String,
    default: 'left',
    // Options: 'left', 'right'
  },
})
</script>

<template>
  <div class="highlight-product bg-content-positive py-12 md:py-16 lg:py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div
        :class="[
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
          imagePosition === 'right' ? 'lg:flex-row-reverse' : '',
        ]"
      >
        <!-- Product Image/Render -->
        <div
          :class="[
            'relative flex items-center justify-center',
            imagePosition === 'right' ? 'lg:order-2' : '',
          ]"
        >
          <img
            v-if="image"
            :src="image"
            :alt="imageAlt"
            class="w-full max-w-lg h-auto object-contain"
          />
          <!-- Slot for custom product render -->
          <slot name="image" />
        </div>

        <!-- Content Section -->
        <div :class="['space-y-6', imagePosition === 'right' ? 'lg:order-1' : '']">
          <!-- Headline -->
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-content-primary"
            style="font-family: var(--font-heading)"
          >
            {{ headline }}
          </h2>

          <!-- Description -->
          <p
            v-if="description"
            class="text-base md:text-lg leading-relaxed text-content-primary/80"
          >
            {{ description }}
          </p>

          <!-- CTAs -->
          <div v-if="cta" class="flex flex-col sm:flex-row gap-4">
            <!-- Primary CTA -->
            <a
              v-if="cta.primary"
              :href="cta.primary.href"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-content-primary text-white rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 shadow-md"
            >
              {{ cta.primary.label }}
            </a>

            <!-- Secondary CTA (outlined) -->
            <a
              v-if="cta.secondary"
              :href="cta.secondary.href"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-content-primary text-content-primary rounded-full font-semibold text-base transition-all hover:bg-content-primary hover:text-white"
            >
              {{ cta.secondary.label }}
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

/* Ensure proper image sizing */
img {
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15));
}
</style>
