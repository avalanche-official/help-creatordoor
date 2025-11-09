<script setup>
const props = defineProps({
  // Headline text (optional)
  headline: {
    type: String,
    default: '',
  },
  // Large fact/stat text
  fact: {
    type: String,
    required: true,
  },
  // Supporting text below fact
  description: {
    type: String,
    required: true,
  },
  // Background image for the fact text (optional)
  factImage: {
    type: String,
    default: '',
  },
  // Color theme
  theme: {
    type: String,
    default: 'forest-green',
    validator: (value) => ['forest-green', 'dark-charcoal', 'dark-gold'].includes(value),
  },
})

// Theme configurations
const themeStyles = {
  'forest-green': {
    bg: 'bg-[#1A4D2E]',
    headlineText: 'text-[#9fdb1c]',
    factText: 'text-[#9fdb1c]',
    descText: 'text-[#9fdb1c]',
  },
  'dark-charcoal': {
    bg: 'bg-[#2D2D2D]',
    headlineText: 'text-white',
    factText: 'text-white',
    descText: 'text-gray-300',
  },
  'dark-gold': {
    bg: 'bg-[#3A2F1F]',
    headlineText: 'text-[#FFD700]',
    factText: 'text-[#FFD700]',
    descText: 'text-[#FFD700]',
  },
}

const currentTheme = themeStyles[props.theme]
</script>

<template>
  <div :class="['text-fact py-16 md:py-20 lg:py-24 px-4', currentTheme.bg]">
    <div class="max-w-6xl mx-auto text-center">
      <!-- Optional Headline -->
      <h2
        v-if="headline"
        :class="[
          'text-2xl md:text-3xl lg:text-4xl font-bold mb-12 md:mb-16',
          currentTheme.headlineText,
        ]"
      >
        {{ headline }}
      </h2>

      <!-- Large Fact/Stat -->
      <div class="mb-8 md:mb-12">
        <div v-if="factImage" class="relative inline-block">
          <!-- Fact text with background image -->
          <p
            class="text-8xl font-black leading-none tracking-tight"
            :style="{
              backgroundImage: `url(${factImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }"
          >
            {{ fact }}
          </p>
        </div>

        <!-- Fallback without image -->
        <p
          v-else
          :class="[
            'text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight',
            currentTheme.factText,
          ]"
        >
          {{ fact }}
        </p>
      </div>

      <!-- Description -->
      <p :class="['text-lg md:text-xl lg:text-2xl font-medium', currentTheme.descText]">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper text rendering for large numbers */
.text-fact p {
  font-feature-settings: 'tnum' 1;
}
</style>
