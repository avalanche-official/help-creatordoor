<!-- src/components/organisms/BottomSheet/BottomSheet.vue -->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  heightMode: {
    type: String,
    default: 'fixed',
    validator: (v) => ['fixed', 'fit'].includes(v),
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'update:isOpen'])

const sheetRef = ref(null)

// Computed height classes based on mode
const heightClasses = computed(() => {
  if (props.heightMode === 'fit') {
    return 'max-h-[90vh]' // Fits content, but max 90vh
  }
  return 'h-[90vh]' // Fixed 90vh height
})

// Computed content classes based on mode
const contentClasses = computed(() => {
  if (props.heightMode === 'fit') {
    return '' // No flex-1, no scroll - content determines height
  }
  return 'flex-1 overflow-y-auto min-h-0' // Scrollable content
})

const closeSheet = () => {
  emit('update:isOpen', false)
  emit('close')
}

// Close on outside click
const handleOutsideClick = (event) => {
  if (sheetRef.value && !sheetRef.value.contains(event.target) && props.isOpen) {
    closeSheet()
  }
}

// Close on escape key
const handleEscKey = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeSheet()
  }
}

// Prevent body scroll when sheet is open
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- Backdrop / Dimmer -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-40" @click="handleOutsideClick" />
  </Transition>

  <!-- Bottom Sheet -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="isOpen"
      ref="sheetRef"
      :class="[
        'z-60 fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl flex flex-col',
        heightClasses,
      ]"
    >
      <!-- Drag Handle (always visible) -->
      <div class="flex-shrink-0 flex justify-center pt-3 pb-2">
        <div class="w-10 h-1 bg-neutral-300 rounded-full" />
      </div>

      <!-- Optional Header: Title + Close -->
      <div v-if="showHeader" class="flex-shrink-0">
        <div class="flex items-center justify-between px-4 pb-4 border-b border-neutral-200">
          <h2 class="title-subsection text-content-primary">
            {{ title }}
          </h2>
          <IconButton
            icon="x"
            variant="ghost"
            size="medium"
            aria-label="Close"
            @click="closeSheet"
          />
        </div>
      </div>

      <!-- Fixed Search Area (if provided via slot) -->
      <div
        v-if="$slots.search"
        class="flex-shrink-0 px-4 py-4 border-b border-neutral-200 bg-white"
      >
        <slot name="search" />
      </div>

      <!-- Content Area - Dynamic based on heightMode -->
      <div :class="contentClasses">
        <div class="px-4 pt-4 pb-4">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>
