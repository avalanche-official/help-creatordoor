<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Title (optional, for definitions)
  title: {
    type: String,
    default: '',
  },
  // Content text
  content: {
    type: String,
    required: true,
  },
  // Placement: 'top', 'bottom', 'left', 'right'
  placement: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
  },
  // Max width
  maxWidth: {
    type: String,
    default: '320px',
  },
})

const isOpen = ref(false)
const popoverRef = ref(null)
const triggerRef = ref(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (
    popoverRef.value &&
    triggerRef.value &&
    !popoverRef.value.contains(event.target) &&
    !triggerRef.value.contains(event.target)
  ) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const placementClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-px border-t-white',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-px border-b-white',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-px border-l-white',
  right: 'right-full top-1/2 -translate-y-1/2 -mr-px border-r-white',
}
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger Button (slot for icon button) -->
    <div ref="triggerRef" @click="toggle">
      <slot name="trigger">
        <button
          type="button"
          class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="More information"
        >
          <span class="text-sm">ℹ️</span>
        </button>
      </slot>
    </div>

    <!-- Popover -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="popoverRef"
        :class="['absolute z-50', placementClasses[placement]]"
        :style="{ maxWidth }"
      >
        <!-- Arrow -->
        <div :class="['absolute w-0 h-0 border-8 border-transparent', arrowClasses[placement]]" />

        <!-- Popover Content -->
        <div class="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
          <!-- Title (optional) -->
          <h3 v-if="title" class="text-base font-semibold text-content-primary mb-2">
            {{ title }}
          </h3>

          <!-- Content -->
          <div class="text-sm text-content-secondary leading-relaxed">
            <slot>{{ content }}</slot>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
