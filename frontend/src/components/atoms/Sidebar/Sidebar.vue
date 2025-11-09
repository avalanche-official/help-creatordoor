<!-- components/atoms/Sidebar/Sidebar.vue -->
<script setup>
import { watch } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
})

const emit = defineEmits(['close'])

const closeSidebar = () => {
  emit('close')
}

// Prevent body scroll when sidebar is open
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
</script>

<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-[60]" @click="closeSidebar" />
  </Transition>

  <!-- Sidebar -->
  <Transition :name="position === 'right' ? 'slide-right' : 'slide-left'">
    <div
      v-if="isOpen"
      :class="[
        'fixed top-0 h-full w-full sm:w-128 bg-white shadow-xl z-[70] flex flex-col',
        position === 'right' ? 'right-0' : 'left-0',
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-stone-200">
        <h2 class="title-subsection text-content-primary">
          {{ title }}
        </h2>
        <Button variant="ghost" size="small" @click="closeSidebar" class="!p-2">
          <Icon name="x" :size="20" />
        </Button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transitions for sidebar */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
