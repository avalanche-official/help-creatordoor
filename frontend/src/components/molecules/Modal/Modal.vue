<!-- src/components/molecules/Modal/Modal.vue -->
<!-- ✅ FINAL: Added constrained prop for absolute positioning within parent -->
<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  showBackButton: {
    type: Boolean,
    default: false,
  },
  backButtonText: {
    type: String,
    default: 'Zurück',
  },
  showPrimaryButton: {
    type: Boolean,
    default: true,
  },
  primaryButtonText: {
    type: String,
    default: 'Weiter',
  },
  primaryButtonDisabled: {
    type: Boolean,
    default: false,
  },
  primaryButtonLoading: {
    type: Boolean,
    default: false,
  },
  showSecondaryButton: {
    type: Boolean,
    default: false,
  },
  secondaryButtonText: {
    type: String,
    default: 'Abbrechen',
  },
  secondaryButtonDisabled: {
    type: Boolean,
    default: false,
  },
  secondaryButtonLoading: {
    type: Boolean,
    default: false,
  },
  showTertiaryButton: {
    type: Boolean,
    default: false,
  },
  tertiaryButtonText: {
    type: String,
    default: 'Löschen',
  },
  tertiaryButtonVariant: {
    type: String,
    default: 'destructive',
  },
  tertiaryButtonDisabled: {
    type: Boolean,
    default: false,
  },
  tertiaryButtonLoading: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: 'lg',
  },
  locked: {
    type: Boolean,
    default: false,
  },
  blurred: {
    type: Boolean,
    default: false,
  },
  // ✅ NEW: Constrained mode
  constrained: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'back', 'primary', 'secondary', 'tertiary'])

const handleClose = () => {
  if (props.locked) {
    console.log('🔒 Modal is locked')
    return
  }

  if (props.showCloseButton) {
    emit('close')
  }
}

const handleBack = () => {
  emit('back')
}

const handlePrimary = () => {
  emit('primary')
}

const handleSecondary = () => {
  emit('secondary')
}

const handleTertiary = () => {
  emit('tertiary')
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.showCloseButton && !props.locked) {
    handleClose()
  }
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      // ✅ Only lock body scroll if NOT constrained
      if (!props.constrained) {
        document.body.style.overflow = 'hidden'
      }
      document.addEventListener('keydown', handleEscape)
    } else {
      if (!props.constrained) {
        document.body.style.overflow = ''
      }
      document.removeEventListener('keydown', handleEscape)
    }
  },
)

onMounted(() => {
  if (props.show) {
    if (!props.constrained) {
      document.body.style.overflow = 'hidden'
    }
    document.addEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  if (!props.constrained) {
    document.body.style.overflow = ''
  }
  document.removeEventListener('keydown', handleEscape)
})

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click.self="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="handleBackdropClick"></div>

        <!-- Modal Container -->
        <div
          :class="[
            'relative bg-white shadow-xl',
            'w-full max-w-[var(--modal-max-width)]',
            // ✅ MOBILE: Full screen with flex column
            'h-screen sm:h-auto',
            'sm:rounded-3xl',
            'flex flex-col',
            // ✅ On desktop, add max-height and allow scrolling
            'sm:max-h-[90vh]',
          ]"
          :style="{ '--modal-max-width': maxWidthValue }"
        >
          <!-- Header (Fixed on mobile) -->
          <div class="flex-shrink-0 px-6 pt-6 pb-4 border-b border-stone-200">
            <div class="flex items-center justify-between">
              <Text variant="title-section" color="content-primary">{{ title }}</Text>
              <button
                v-if="showCloseButton"
                type="button"
                class="p-2 hover:bg-stone-100 rounded-full transition-colors"
                @click="handleClose"
              >
                <Icon name="x" :size="20" color="var(--color-stone-600)" />
              </button>
            </div>
          </div>

          <!-- ✅ SCROLLABLE Content Area -->
          <div class="flex-1 overflow-y-auto px-6 py-6">
            <slot />
          </div>

          <!-- Footer (Fixed on mobile) -->
          <div
            v-if="showBackButton || showPrimaryButton"
            class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-stone-200"
          >
            <div class="flex gap-3">
              <Button
                v-if="showBackButton"
                variant="secondary"
                size="large"
                class="flex-1"
                :disabled="primaryButtonLoading"
                @click="handleBack"
              >
                {{ backButtonText }}
              </Button>
              <Button
                v-if="showPrimaryButton"
                variant="primary"
                size="large"
                class="flex-1"
                :disabled="primaryButtonDisabled"
                :loading="primaryButtonLoading"
                @click="handlePrimary"
              >
                {{ primaryButtonText }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
