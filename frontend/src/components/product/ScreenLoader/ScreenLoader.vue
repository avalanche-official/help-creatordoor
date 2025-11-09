<script setup>
const props = defineProps({
  // Show/hide loader
  show: {
    type: Boolean,
    default: false,
  },
  // Loading text (optional)
  text: {
    type: String,
    default: '',
  },
  // Size: 'small', 'medium', 'large'
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
})

const sizeClasses = {
  small: 'w-12 h-12',
  medium: 'w-16 h-16',
  large: 'w-24 h-24',
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-lightbeige"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <div class="flex flex-col items-center gap-4">
          <!-- Spinner -->
          <div
            :class="[
              'animate-spin rounded-full border-4 border-gray-200 border-t-content-positive',
              sizeClasses[size],
            ]"
          />

          <!-- Loading Text -->
          <p v-if="text" class="text-base text-content-primary font-medium">
            {{ text }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
