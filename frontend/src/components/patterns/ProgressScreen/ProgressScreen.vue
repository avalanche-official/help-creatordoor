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
    default: '✈️',
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
  <div class="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
    <!-- Illustration -->
    <div class="mb-8">
      <!-- If it's an emoji or simple text -->
      <div v-if="!illustration.includes('.')" class="text-9xl mb-4">
        {{ illustration }}
      </div>
      <!-- If it's an image URL -->
      <img v-else :src="illustration" :alt="title" class="w-64 h-64 object-contain mb-4" />
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-bold text-content-primary mb-4 max-w-4xl text-center">
      {{ title }}
    </h1>

    <!-- Description -->
    <p class="text-lg text-content-secondary mb-12 max-w-4xl text-center leading-relaxed">
      {{ description }}
    </p>

    <!-- Buttons -->
    <div class="w-full max-w-4xl space-y-4">
      <!-- Primary Button -->
      <button
        v-if="primaryButton"
        @click="handlePrimaryClick"
        class="w-full px-6 py-4 bg-content-accent text-white rounded-full hover:opacity-90 font-medium text-lg transition-opacity"
      >
        {{ primaryButton }}
      </button>

      <!-- Secondary Button -->
      <button
        v-if="secondaryButton"
        @click="handleSecondaryClick"
        class="w-full px-6 py-4 border-2 border-gray-300 text-content-primary rounded-full hover:bg-background-elevated font-medium text-lg transition-colors"
      >
        {{ secondaryButton }}
      </button>
    </div>

    <!-- Slot for custom actions -->
    <div v-if="$slots.actions" class="mt-6 w-full max-w-4xl">
      <slot name="actions" />
    </div>
  </div>
</template>
