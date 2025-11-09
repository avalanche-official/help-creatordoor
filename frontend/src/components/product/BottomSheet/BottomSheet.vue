<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  // Show/hide bottom sheet
  show: {
    type: Boolean,
    default: false,
  },
  // Close on backdrop click
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  // Show close button
  showClose: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])

const sheetRef = ref(null)
const startY = ref(0)
const currentY = ref(0)
const isDragging = ref(false)

const close = () => {
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

// Touch events for swipe down to dismiss
const handleTouchStart = (e) => {
  startY.value = e.touches[0].clientY
  isDragging.value = true
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  currentY.value = e.touches[0].clientY - startY.value

  // Only allow dragging down
  if (currentY.value > 0 && sheetRef.value) {
    sheetRef.value.style.transform = `translateY(${currentY.value}px)`
  }
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false

  // If dragged down more than 100px, close the sheet
  if (currentY.value > 100) {
    close()
  }

  // Reset position
  if (sheetRef.value) {
    sheetRef.value.style.transform = 'translateY(0)'
  }
  currentY.value = 0
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
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
      <div v-if="show" class="fixed inset-0 z-50 bg-black/50" @click="handleBackdropClick">
        <!-- Bottom Sheet Container -->
        <Transition
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-y-full"
          enter-to-class="translate-y-0"
          leave-active-class="transition-transform duration-200 ease-in"
          leave-from-class="translate-y-0"
          leave-to-class="translate-y-full"
        >
          <div
            v-if="show"
            ref="sheetRef"
            class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            :class="['md:left-1/2 md:-translate-x-1/2 md:w-2/3 md:max-w-4xl']"
            @click.stop
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <!-- Drag Handle -->
            <div class="flex justify-center pt-3 pb-2">
              <div class="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <!-- Close Button -->
            <button
              v-if="showClose"
              @click="close"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-background-elevated hover:bg-gray-200 transition-colors z-10"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Content (scrollable) -->
            <div class="flex-1 overflow-y-auto px-6 pb-6">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
