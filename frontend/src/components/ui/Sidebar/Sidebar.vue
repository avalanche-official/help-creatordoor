<!-- components/molecules/Sidebar/Sidebar.vue -->
<script setup>
import { watch } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  // Controls sidebar visibility
  isOpen: {
    type: Boolean,
    default: false,
  },
  // Sidebar title
  title: {
    type: String,
    required: true,
  },
  // ✅ Button text at the bottom
  buttonText: {
    type: String,
    default: 'Änderung bestätigen',
  },
  // ✅ Button variant (primary, secondary, outline, etc.)
  buttonVariant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'link'].includes(value),
  },
  // ✅ Button size
  buttonSize: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  // Position: 'left' or 'right'
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
  // Show footer button
  showFooterButton: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'action'])

// Prevent body scroll when sidebar is open
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

const handleClose = () => {
  emit('close')
}

const handleAction = () => {
  emit('action')
}
</script>

<template>
  <!-- Backdrop with bg-black/40 -->
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 bg-black/40 z-[60]" @click="handleClose"></div>
  </transition>

  <!-- Sidebar -->
  <transition
    enter-active-class="transition-transform duration-300 ease-out"
    leave-active-class="transition-transform duration-300 ease-in"
    :enter-from-class="position === 'right' ? 'translate-x-full' : '-translate-x-full'"
    :enter-to-class="'translate-x-0'"
    :leave-from-class="'translate-x-0'"
    :leave-to-class="position === 'right' ? 'translate-x-full' : '-translate-x-full'"
  >
    <div
      v-if="isOpen"
      :class="[
        'fixed top-0 h-full bg-white shadow-2xl z-[70] flex flex-col w-full sm:w-[600px]',
        position === 'right' ? 'right-0' : 'left-0',
      ]"
    >
      <!-- Header with Title and Close Button -->
      <div class="border-b border-stone-200 flex items-center justify-between px-6 py-4">
        <Text variant="title-body" color="content-primary" as="h2">
          {{ title }}
        </Text>
        <button
          @click="handleClose"
          class="p-2 rounded-full hover:bg-background-neutral transition-colors"
          aria-label="Close"
        >
          <Icon name="x" :size="24" color="text-content-secondary" />
        </button>
      </div>

      <!-- Body Content -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <slot />
      </div>

      <!-- Footer with Customizable Button -->
      <div v-if="showFooterButton" class="border-t border-stone-200 px-6 py-5">
        <Button :variant="buttonVariant" :size="buttonSize" @click="handleAction" class="w-full">
          {{ buttonText }}
        </Button>
      </div>
    </div>
  </transition>
</template>
