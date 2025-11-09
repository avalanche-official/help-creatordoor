<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Type: determinate (0-100%) or indeterminate (animated loop)
  type: {
    type: String,
    default: 'indeterminate',
    validator: (value) => ['determinate', 'indeterminate'].includes(value),
  },
  // Progress value (0-100) - only for determinate type
  value: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  // Theme: light or dark
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
  // Size: sm (2px) or md (4px)
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value),
  },
})

const containerClasses = computed(() => {
  const base = ['w-full', 'rounded-full', 'overflow-hidden']

  // Height based on size
  if (props.size === 'sm') {
    base.push('h-0.5') // 2px
  } else {
    base.push('h-1') // 4px
  }

  // Background color based on theme (using Neptune Tapestry tokens)
  if (props.theme === 'dark') {
    base.push('bg-[var(--color-background-elevated)]') // Tapestry 08 equivalent
  } else {
    base.push('bg-background-elevated') // Tapestry 05 equivalent
  }

  return base
})

const barClasses = computed(() => {
  const base = ['h-full', 'transition-all', 'duration-300', 'ease-out']

  // Accent color from Neptune
  base.push('bg-content-accent')

  // Animation for indeterminate
  if (props.type === 'indeterminate') {
    base.push('animate-progress-indeterminate')
  }

  return base
})

const barStyle = computed(() => {
  if (props.type === 'determinate') {
    return {
      width: `${props.value}%`,
    }
  }
  // Indeterminate uses animation, no width needed
  return {}
})
</script>

<template>
  <div
    :class="containerClasses"
    role="progressbar"
    :aria-valuenow="type === 'determinate' ? value : undefined"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div :class="barClasses" :style="barStyle" />
  </div>
</template>

<style scoped>
@keyframes progress-indeterminate {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 40%;
    margin-left: 30%;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}

.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s infinite ease-in-out;
}
</style>
