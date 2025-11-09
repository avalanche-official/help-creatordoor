<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['dismiss'])

const variantStyles = {
  info: {
    container: 'bg-content-accent/10 border-content-accent/30 text-content-accent',
    icon: '🔒',
    iconBg: 'bg-content-accent/20',
  },
  success: {
    container: 'bg-content-positive/10 border-content-positive/30 text-content-positive',
    icon: '✓',
    iconBg: 'bg-content-positive/20',
  },
  warning: {
    container: 'bg-content-warning/10 border-content-warning/30 text-content-warning',
    icon: '⚠️',
    iconBg: 'bg-content-warning/20',
  },
  error: {
    container: 'bg-content-negative/10 border-content-negative/30 text-content-negative',
    icon: '✕',
    iconBg: 'bg-content-negative/20',
  },
}

const currentVariant = computed(() => variantStyles[props.variant])
const displayIcon = computed(() => props.icon || currentVariant.value.icon)

const handleDismiss = () => {
  emit('dismiss')
}
</script>

<template>
  <div
    :class="['flex items-start gap-3 p-4 rounded-lg border', currentVariant.container]"
    role="alert"
  >
    <!-- Icon -->
    <div
      v-if="displayIcon"
      :class="[
        'flex items-center justify-center w-10 h-10 rounded-full shrink-0',
        currentVariant.iconBg,
      ]"
    >
      <span class="text-xl">{{ displayIcon }}</span>
    </div>

    <!-- Content - Better text wrapping -->
    <div class="flex-1 min-w-0">
      <h4 v-if="title" class="font-semibold mb-2 text-base leading-tight">
        {{ title }}
      </h4>
      <div class="text-sm leading-relaxed">
        <slot />
      </div>
    </div>

    <!-- Dismiss Button -->
    <button
      v-if="dismissible"
      @click="handleDismiss"
      class="shrink-0 hover:opacity-70 transition-opacity p-1 -mt-1"
      aria-label="Dismiss"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
