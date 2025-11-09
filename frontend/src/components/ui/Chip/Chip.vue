<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Type: choice or filter
  type: {
    type: String,
    default: 'choice',
    validator: (value) => ['choice', 'filter'].includes(value),
  },
  // Selected state
  selected: {
    type: Boolean,
    default: false,
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // For filter chips - show clear button
  clearable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'clear'])

const chipClasses = computed(() => {
  const base = [
    'inline-flex items-center gap-2',
    'px-4 py-2',
    'rounded-full',
    'text-sm font-medium',
    'transition-all duration-200',
    'border',
    'whitespace-nowrap',
  ]

  if (props.disabled) {
    base.push('opacity-50 cursor-not-allowed')
    return base
  }

  if (props.selected) {
    base.push(
      'bg-content-accent text-white',
      'border-content-accent',
      'hover:bg-accent-hover',
      'cursor-pointer',
    )
  } else {
    base.push(
      'bg-white text-content-primary',
      'border-border-default',
      'hover:bg-background-elevated hover:border-content-accent/30',
      'cursor-pointer',
    )
  }

  return base
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

const handleClear = (e) => {
  e.stopPropagation()
  if (!props.disabled) {
    emit('clear')
  }
}
</script>

<template>
  <button :class="chipClasses" :disabled="disabled" @click="handleClick" type="button">
    <slot />

    <!-- Clear button for filter chips -->
    <button
      v-if="clearable && selected"
      @click="handleClear"
      class="ml-1 hover:opacity-70 transition-opacity"
      aria-label="Clear filter"
      type="button"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </button>
</template>
