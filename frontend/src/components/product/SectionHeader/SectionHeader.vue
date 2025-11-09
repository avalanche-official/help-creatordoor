<script setup>
const props = defineProps({
  // Header text
  text: {
    type: String,
    required: true,
  },
  // Type: 'section' or 'group'
  type: {
    type: String,
    default: 'section',
    validator: (value) => ['section', 'group'].includes(value),
  },
  // Optional action link text
  action: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['action-click'])

const handleActionClick = () => {
  emit('action-click')
}
</script>

<template>
  <div class="flex items-center justify-between gap-4 mb-6">
    <!-- Text with divider line -->
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <h2 class="text-lg font-medium text-content-primary whitespace-nowrap">
        {{ text }}
      </h2>
      <div v-if="type === 'section'" class="flex-1 h-px bg-border-default" />
    </div>

    <!-- Optional action link -->
    <button
      v-if="action"
      @click="handleActionClick"
      class="shrink-0 text-sm font-medium text-content-accent hover:underline"
    >
      {{ action }}
    </button>
  </div>
</template>
