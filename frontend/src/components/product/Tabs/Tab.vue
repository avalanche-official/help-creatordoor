<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  // Tab value (unique identifier)
  value: {
    type: [String, Number],
    required: true,
  },
  // Tab label
  label: {
    type: String,
    required: true,
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
})

const tabs = inject('tabs')

const isActive = computed(() => {
  return tabs.activeTab.value === props.value
})

const tabClasses = computed(() => {
  const base = [
    'relative',
    'px-6',
    'py-4',
    'text-base',
    'font-medium',
    'whitespace-nowrap',
    'transition-colors',
    'duration-200',
    'border-b-2',
    'focus:outline-none',
  ]

  if (props.disabled) {
    base.push('text-content-tertiary', 'cursor-not-allowed', 'border-transparent')
  } else if (isActive.value) {
    base.push('text-content-primary', 'border-content-accent', 'cursor-default')
  } else {
    base.push(
      'text-content-secondary',
      'border-transparent',
      'hover:text-content-primary',
      'hover:border-gray-300',
      'cursor-pointer',
    )
  }

  return base
})

const handleClick = () => {
  if (!props.disabled && !isActive.value) {
    tabs.setActiveTab(props.value)
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <button
    :class="tabClasses"
    :disabled="disabled"
    :aria-selected="isActive"
    :tabindex="isActive ? 0 : -1"
    role="tab"
    type="button"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    {{ label }}
  </button>
</template>
