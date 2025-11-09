<script setup>
const props = defineProps({
  // Title text (required)
  title: {
    type: String,
    required: true,
  },
  // Description text (optional)
  description: {
    type: String,
    default: '',
  },
  // Button text
  buttonText: {
    type: String,
    required: true,
  },
  // Show banner
  show: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['button-click'])

const handleButtonClick = () => {
  emit('button-click')
}
</script>

<template>
  <div
    v-if="show"
    class="w-full bg-content-negative text-white p-6 rounded-2xl"
    role="alert"
    aria-live="assertive"
  >
    <div class="flex items-start gap-4">
      <!-- Warning Icon -->
      <div class="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <svg class="w-6 h-6 text-content-negative" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h2 class="text-lg font-semibold mb-2 leading-tight">
          {{ title }}
        </h2>

        <!-- Description -->
        <p v-if="description" class="text-sm mb-4 leading-relaxed opacity-90">
          {{ description }}
        </p>

        <!-- Button -->
        <button
          @click="handleButtonClick"
          class="px-6 py-2.5 bg-white text-content-negative rounded-full hover:bg-gray-100 font-medium transition-colors"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>
