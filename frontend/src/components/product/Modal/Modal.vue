<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  // Show/hide modal
  show: {
    type: Boolean,
    default: false,
  },
  // Title text
  title: {
    type: String,
    required: true,
  },
  // Max width (default 540px per Wise specs)
  maxWidth: {
    type: String,
    default: '540px',
  },
  // Show close button
  showClose: {
    type: Boolean,
    default: true,
  },
  // Close on backdrop click
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  // Close on ESC key
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

const handleEscKey = (event) => {
  if (event.key === 'Escape' && props.closeOnEsc && props.show) {
    close()
  }
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

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
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
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click="handleBackdropClick"
      >
        <!-- Modal Container -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="show"
            class="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[800px] flex flex-col"
            :style="{ maxWidth }"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-start justify-between p-6 pb-4">
              <h2 class="text-2xl font-semibold text-content-primary pr-8 leading-tight">
                {{ title }}
              </h2>

              <!-- Close Button -->
              <button
                v-if="showClose"
                @click="close"
                class="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-background-elevated hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Content (scrollable if needed) -->
            <div class="flex-1 overflow-y-auto px-6">
              <slot />
            </div>

            <!-- Actions (if provided) -->
            <div v-if="$slots.actions" class="p-6 pt-4">
              <slot name="actions" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
