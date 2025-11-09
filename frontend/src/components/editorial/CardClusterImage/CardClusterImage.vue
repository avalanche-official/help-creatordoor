<script setup>
const props = defineProps({
  // Section headline (optional)
  headline: {
    type: String,
    default: '',
  },
  // Section description (optional)
  description: {
    type: String,
    default: '',
  },
  // Array of card items
  items: {
    type: Array,
    required: true,
    // Example: [{ image: '/img.png', imageAlt: 'Description', title: 'Turn on interest', description: 'Your money is invested...' }]
  },
  // Color theme
  theme: {
    type: String,
    default: 'light',
    // Options: 'light', 'neutral'
  },
  // Optional CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Learn more', href: '/interest' }
  },
})

// Theme colors
const themeStyles = {
  light: {
    bg: 'bg-white',
    cardText: 'text-content-primary',
    cardSubtext: 'text-content-secondary',
  },
  neutral: {
    bg: 'bg-gray-50',
    cardText: 'text-content-primary',
    cardSubtext: 'text-content-secondary',
  },
}
</script>

<template>
  <div :class="['card-cluster-image py-12 px-4', themeStyles[theme].bg]">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div v-if="headline || description" class="text-center mb-12 max-w-4xl mx-auto">
        <h2
          v-if="headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-4 text-content-primary"
          style="font-family: var(--font-heading)"
        >
          {{ headline }}
        </h2>
        <p v-if="description" class="text-base md:text-lg leading-relaxed text-content-secondary">
          {{ description }}
        </p>
      </div>

      <!-- Cards Grid (Desktop) / Carousel (Mobile) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div v-for="(item, index) in items" :key="index" class="card-item">
          <!-- Image Container with dark green background -->
          <div
            class="image-container bg-[#1A4D2E] rounded-3xl p-8 mb-6 flex items-center justify-center min-h-[320px]"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.imageAlt || 'Illustration'"
              class="w-full h-auto object-contain max-w-sm"
            />
            <!-- Slot for custom image content -->
            <slot :name="`image-${index}`" />
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <h3 :class="['text-xl md:text-2xl font-bold mb-3', themeStyles[theme].cardText]">
              {{ item.title }}
            </h3>
            <p
              v-if="item.description"
              :class="['text-sm md:text-base leading-relaxed', themeStyles[theme].cardSubtext]"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Optional CTA -->
      <div v-if="cta" class="text-center">
        <a
          :href="cta.href"
          class="inline-flex items-center justify-center px-8 py-3.5 bg-content-accent text-white rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 shadow-md"
        >
          {{ cta.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  background: linear-gradient(135deg, #1a4d2e 0%, #0d2818 100%);
}

/* Mobile carousel could be added with a carousel library */
@media (max-width: 768px) {
  /* On mobile, cards could become a horizontal scroll/slider */
  /* This would require additional carousel implementation */
}
</style>
