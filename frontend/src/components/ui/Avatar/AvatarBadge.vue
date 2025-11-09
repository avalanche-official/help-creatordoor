<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Badge type: flag, image, status, action, reference, fast-flag
  type: {
    type: String,
    default: 'flag',
    validator: (value) =>
      ['flag', 'image', 'status', 'action', 'reference', 'fast-flag'].includes(value),
  },
  // Size of badge (usually 1/2 of parent avatar)
  size: {
    type: Number,
    default: 20,
  },
  // For flag/icon
  icon: {
    type: String,
    default: '',
  },
  // For image
  src: {
    type: String,
    default: '',
  },
  // Status color
  status: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value),
  },
})

const sizeClass = computed(() => {
  const sizes = {
    16: 'w-4 h-4 text-[8px]',
    20: 'w-5 h-5 text-[10px]',
    24: 'w-6 h-6 text-xs',
    28: 'w-7 h-7 text-sm',
  }
  return sizes[props.size] || 'w-5 h-5 text-xs'
})

const statusColors = {
  success: 'bg-content-positive',
  warning: 'bg-content-warning',
  error: 'bg-content-negative',
  info: 'bg-content-accent',
}
</script>

<template>
  <div
    :class="[
      'rounded-full flex items-center justify-center',
      'border-2 border-white bg-white',
      sizeClass,
    ]"
  >
    <!-- Image Badge -->
    <img
      v-if="(type === 'image' || type === 'fast-flag') && src"
      :src="src"
      class="w-full h-full rounded-full object-cover"
    />

    <!-- Flag Badge -->
    <span v-else-if="type === 'flag' && icon" class="text-base">
      {{ icon }}
    </span>

    <!-- Status Badge -->
    <div
      v-else-if="type === 'status'"
      :class="['w-full h-full rounded-full', statusColors[status]]"
    />

    <!-- Action Badge (Plus) -->
    <span v-else-if="type === 'action'" class="text-content-accent font-bold text-sm"> + </span>

    <!-- Reference Badge (Check) -->
    <span v-else-if="type === 'reference'" class="text-content-positive text-xs font-bold">
      ✓
    </span>

    <!-- Custom Content -->
    <slot v-else />
  </div>
</template>
