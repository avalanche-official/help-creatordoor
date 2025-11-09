<!-- components/molecules/Summary/Summary.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  // Status type
  status: {
    type: String,
    default: null,
    validator: (value) => !value || ['done', 'pending', 'not-done'].includes(value),
  },
  // Custom icon (overrides status icon)
  icon: {
    type: String,
    default: null,
  },
  // Title (required)
  title: {
    type: String,
    required: true,
  },
  // Description (optional)
  description: {
    type: String,
    default: null,
  },
  // Action text (optional)
  actionText: {
    type: String,
    default: null,
  },
  // Info button (optional)
  showInfo: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['action-click', 'info-click'])

const statusIcon = computed(() => {
  if (props.icon) return props.icon

  const icons = {
    done: 'check-circle',
    pending: 'clock',
    'not-done': null,
  }
  return icons[props.status] || null
})

const statusColor = computed(() => {
  const colors = {
    done: 'text-sentiment-positive',
    pending: 'text-content-secondary',
    'not-done': 'text-content-secondary',
  }
  return colors[props.status] || 'text-content-secondary'
})

const ariaLabel = computed(() => {
  const labels = {
    done: 'Completed',
    pending: 'In progress',
    'not-done': 'Not done',
  }
  return labels[props.status] || null
})

const handleActionClick = () => {
  emit('action-click')
}

const handleInfoClick = () => {
  emit('info-click')
}
</script>

<template>
  <div class="flex items-start gap-3 py-3" :aria-label="ariaLabel">
    <!-- Left: Status Icon -->
    <div v-if="statusIcon" :class="['flex-shrink-0 mt-0.5', statusColor]">
      <Icon :name="statusIcon" :size="20" />
    </div>

    <!-- Placeholder when no icon (for alignment) -->
    <div v-else class="flex-shrink-0 w-6" />

    <!-- Right: Content (Everything stacked vertically) -->
    <div class="flex-1 space-y-2">
      <!-- Title with optional info button -->
      <div class="flex items-start gap-2">
        <Text variant="body-large-bold" color="content-primary" class="flex-1">
          {{ title }}
        </Text>

        <!-- Info button -->
        <button
          v-if="showInfo"
          type="button"
          class="flex-shrink-0 text-content-secondary hover:text-primary-purple transition-colors"
          aria-label="More information"
          @click="handleInfoClick"
        >
          <Icon name="info" :size="20" />
        </button>
      </div>

      <!-- Description (optional) - Below title -->
      <Text v-if="description" variant="body-default" color="content-secondary">
        {{ description }}
      </Text>

      <!-- Action link (optional) - Below description -->
      <button
        v-if="actionText"
        type="button"
        class="cursor-pointer text-content-link hover:opacity-80 transition-opacity text-left"
        @click="handleActionClick"
      >
        <Text variant="link-default" color="content-link">
          {{ actionText }}
        </Text>
      </button>
    </div>
  </div>
</template>
