<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Show/hide snackbar
  modelValue: {
    type: Boolean,
    default: false,
  },
  // Message text
  message: {
    type: String,
    required: true,
  },
  // Action button text (optional)
  action: {
    type: String,
    default: '',
  },
  // Auto-hide duration in milliseconds (0 = no auto-hide)
  duration: {
    type: Number,
    default: 4000,
  },
  // Position: 'bottom-left', 'bottom-center', 'bottom-right'
  position: {
    type: String,
    default: 'bottom-center',
    validator: (value) => ['bottom-left', 'bottom-center', 'bottom-right'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'action-click'])

const isVisible = ref(props.modelValue)
let hideTimer = null

const positionClasses = {
  'bottom-left': 'left-4 sm:left-6',
  'bottom-center': 'left-1/2 -translate-x-1/2',
  'bottom-right': 'right-4 sm:right-6',
}

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal

    if (newVal && props.duration > 0) {
      // Clear existing timer
      if (hideTimer) clearTimeout(hideTimer)

      // Set new timer to auto-hide
      hideTimer = setTimeout(() => {
        hide()
      }, props.duration)
    }
  },
)

const hide = () => {
  isVisible.value = false
  emit('update:modelValue', false)
}

const handleActionClick = () => {
  emit('action-click')
  hide()
}

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="isVisible"
      :class="[
        'fixed bottom-4 sm:bottom-6 z-50',
        'flex items-center gap-4',
        'min-w-[288px] max-w-[568px]',
        'px-4 py-3 sm:px-6 sm:py-4',
        'bg-gray-900 text-white',
        'rounded-lg shadow-xl',
        positionClasses[position],
      ]"
      role="status"
      aria-live="polite"
    >
      <!-- Message -->
      <span class="flex-1 text-sm sm:text-base">{{ message }}</span>

      <!-- Action Button -->
      <button
        v-if="action"
        @click="handleActionClick"
        class="shrink-0 px-3 py-1 text-sm font-medium text-content-accent hover:opacity-80 transition-opacity uppercase"
      >
        {{ action }}
      </button>

      <!-- Close Button -->
      <button @click="hide" class="shrink-0 hover:opacity-70 transition-opacity" aria-label="Close">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>
