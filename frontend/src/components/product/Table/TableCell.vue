<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Cell type: header, leading, text, currency, status
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['header', 'leading', 'text', 'currency', 'status'].includes(value),
  },
  // State for text cells: default, success, error
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error'].includes(value),
  },
  // For status cells: info, pending, warning, error, success
  status: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'pending', 'warning', 'error', 'success'].includes(value),
  },
})

const cellClasses = computed(() => {
  const base = ['px-4 py-4']

  if (props.type === 'header') {
    base.push('text-left text-sm font-semibold text-content-primary')
  } else if (props.type === 'leading') {
    base.push('font-semibold text-content-primary')
  } else if (props.type === 'text') {
    base.push('text-content-primary')
    if (props.state === 'success') base.push('text-content-positive')
    if (props.state === 'error') base.push('text-content-negative')
  } else if (props.type === 'currency') {
    base.push('text-right font-medium text-content-primary tabular-nums')
    if (props.state === 'success') base.push('text-content-positive')
    if (props.state === 'error') base.push('text-content-negative')
  } else if (props.type === 'status') {
    base.push('text-right')
  }

  return base
})

const statusStyles = {
  info: {
    bg: 'bg-content-accent/10',
    text: 'text-content-accent',
    icon: 'ℹ️',
  },
  pending: {
    bg: 'bg-content-warning/10',
    text: 'text-content-warning',
    icon: '🕐',
  },
  warning: {
    bg: 'bg-content-warning/10',
    text: 'text-content-warning',
    icon: '⚠️',
  },
  error: {
    bg: 'bg-content-negative/10',
    text: 'text-content-negative',
    icon: '❌',
  },
  success: {
    bg: 'bg-content-positive/10',
    text: 'text-content-positive',
    icon: '✅',
  },
}

const currentStatus = computed(() => statusStyles[props.status])
</script>

<template>
  <component :is="type === 'header' ? 'th' : 'td'" :class="cellClasses">
    <!-- Status badge -->
    <div v-if="type === 'status'" class="flex items-center justify-end gap-2">
      <span
        :class="[
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
          currentStatus.bg,
          currentStatus.text,
        ]"
      >
        <span>{{ currentStatus.icon }}</span>
        <slot />
      </span>
    </div>

    <!-- Regular cell content -->
    <slot v-else />
  </component>
</template>
