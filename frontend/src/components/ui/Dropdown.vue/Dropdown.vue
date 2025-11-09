<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Dropdown',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
})

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const close = () => {
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({ close })
</script>

<template>
  <div class="relative inline-block" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      @click="toggle"
      :disabled="disabled"
      :class="[
        'inline-flex items-center justify-between gap-2',
        'px-4 py-2 min-w-[160px]',
        'bg-white border border-border-default rounded-lg',
        'text-content-primary font-medium',
        'hover:bg-background-elevated transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-content-accent focus:ring-offset-1',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ]"
    >
      <span>{{ label }}</span>
      <svg
        :class="['w-4 h-4 transition-transform duration-200', isOpen ? 'rotate-180' : '']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 mt-2 w-56',
          'bg-white border border-border-default rounded-lg shadow-lg',
          'py-1',
          align === 'right' ? 'right-0' : 'left-0',
        ]"
      >
        <slot :close="close" />
      </div>
    </Transition>
  </div>
</template>
