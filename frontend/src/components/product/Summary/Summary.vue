<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Title text (required)
  title: {
    type: String,
    required: true,
  },
  // Description text (optional)
  description: {
    type: String,
    default: '',
  },
  // Status: 'done', 'pending', 'not-done', or null
  status: {
    type: String,
    default: null,
    validator: (value) => [null, 'done', 'pending', 'not-done'].includes(value),
  },
  // Icon for custom status (overrides default status icons)
  icon: {
    type: String,
    default: '',
  },
  // Action text (optional)
  action: {
    type: String,
    default: '',
  },
  // Info button (shows info icon)
  hasInfo: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['action-click', 'info-click'])

const statusConfig = {
  done: {
    icon: '✓',
    ariaLabel: 'Done',
    iconClasses: 'bg-content-positive text-white',
  },
  pending: {
    icon: '⏳',
    ariaLabel: 'Pending',
    iconClasses: 'bg-content-warning text-white',
  },
  'not-done': {
    icon: null,
    ariaLabel: 'Not done',
    iconClasses: '',
  },
}

const currentStatus = computed(() => {
  if (!props.status) return null
  return statusConfig[props.status]
})

const displayIcon = computed(() => {
  if (props.icon) return props.icon
  if (currentStatus.value) return currentStatus.value.icon
  return null
})

const handleActionClick = () => {
  emit('action-click')
}

const handleInfoClick = () => {
  emit('info-click')
}
</script>

<template>
  <div class="flex items-start gap-3">
    <!-- Status Icon -->
    <div
      v-if="displayIcon"
      :class="[
        'flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5',
        currentStatus?.iconClasses || 'bg-gray-200',
      ]"
      :aria-label="currentStatus?.ariaLabel"
    >
      <span class="text-sm">{{ displayIcon }}</span>
    </div>

    <!-- Placeholder for alignment when no icon -->
    <div v-else-if="status === 'not-done'" class="w-6 shrink-0" aria-label="Not done" />

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <!-- Title and Info Button -->
      <div class="flex items-start gap-2">
        <h4 class="flex-1 text-base font-medium text-content-primary leading-tight">
          {{ title }}
        </h4>

        <!-- Info Button -->
        <button
          v-if="hasInfo"
          @click="handleInfoClick"
          class="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="More information"
        >
          <span class="text-xs">ℹ️</span>
        </button>
      </div>

      <!-- Description -->
      <p v-if="description" class="mt-1 text-sm text-content-secondary leading-relaxed">
        {{ description }}
      </p>

      <!-- Action -->
      <button
        v-if="action"
        @click="handleActionClick"
        class="mt-2 text-sm font-medium text-content-accent hover:underline"
      >
        {{ action }}
      </button>
    </div>
  </div>
</template>
