<script setup>
const props = defineProps({
  // Size: small, large
  size: {
    type: String,
    default: 'small',
    validator: (value) => ['small', 'large'].includes(value),
  },
  // Make card clickable
  clickable: {
    type: Boolean,
    default: false,
  },
  // Show dismiss button
  dismissible: {
    type: Boolean,
    default: false,
  },
  // Padding size: none, sm, md, lg
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value),
  },
})

const emit = defineEmits(['click', 'dismiss'])

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}

const handleDismiss = (e) => {
  e.stopPropagation()
  emit('dismiss')
}

// Size classes (Wise specs: small min 88px max 300px, large min 300px)
const sizeClasses = {
  small: 'min-h-[88px] max-h-[300px] rounded-2xl',
  large: 'min-h-[300px] rounded-3xl',
}

// Padding classes
const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <div
    :class="[
      'relative bg-background-elevated border border-gray-200 overflow-hidden',
      'transition-all duration-200',
      sizeClasses[size],
      paddingClasses[padding],
      clickable && 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
    ]"
    @click="handleClick"
  >
    <!-- Dismiss Button -->
    <button
      v-if="dismissible"
      @click="handleDismiss"
      class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors z-10 shadow-sm"
      aria-label="Dismiss"
    >
      <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Content Slot -->
    <slot />
  </div>
</template>
