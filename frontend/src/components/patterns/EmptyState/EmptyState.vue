<script setup>
const props = defineProps({
  // Title text
  title: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    required: true,
  },
  // Illustration (emoji or image URL)
  illustration: {
    type: String,
    default: '🪙',
  },
  // Primary button text
  primaryButton: {
    type: String,
    default: '',
  },
  // Secondary button text
  secondaryButton: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['primary-click', 'secondary-click'])

const handlePrimaryClick = () => {
  emit('primary-click')
}

const handleSecondaryClick = () => {
  emit('secondary-click')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-12 px-6">
    <!-- Illustration -->
    <div class="mb-6">
      <!-- If it's an emoji or simple text -->
      <div v-if="!illustration.includes('.')" class="text-8xl mb-4">
        {{ illustration }}
      </div>
      <!-- If it's an image URL -->
      <img v-else :src="illustration" :alt="title" class="w-48 h-48 object-contain mb-4" />
    </div>

    <!-- Title -->
    <h2 class="text-2xl font-bold text-content-primary mb-3 max-w-4xl">
      {{ title }}
    </h2>

    <!-- Description -->
    <p class="text-base text-content-secondary mb-8 max-w-4xl leading-relaxed">
      {{ description }}
    </p>

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 w-full max-w-4xl">
      <!-- Primary Button -->
      <button
        v-if="primaryButton"
        @click="handlePrimaryClick"
        class="flex-1 px-6 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium transition-opacity"
      >
        {{ primaryButton }}
      </button>

      <!-- Secondary Button -->
      <button
        v-if="secondaryButton"
        @click="handleSecondaryClick"
        class="flex-1 px-6 py-3 border-2 border-gray-300 text-content-primary rounded-lg hover:bg-background-elevated font-medium transition-colors"
      >
        {{ secondaryButton }}
      </button>
    </div>

    <!-- Slot for custom actions -->
    <div v-if="$slots.actions" class="mt-4 w-full max-w-4xl">
      <slot name="actions" />
    </div>
  </div>
</template>
