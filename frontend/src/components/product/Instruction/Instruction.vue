<script setup>
const props = defineProps({
  // Array of instruction items
  // Each item: { text: String, type: 'positive' | 'negative' }
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) => typeof item.text === 'string' && ['positive', 'negative'].includes(item.type),
      )
    },
  },
  // Size: 'sm', 'md', 'lg'
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const sizeClasses = {
  sm: {
    icon: 'w-5 h-5',
    text: 'text-sm',
    gap: 'gap-2',
  },
  md: {
    icon: 'w-6 h-6',
    text: 'text-base',
    gap: 'gap-3',
  },
  lg: {
    icon: 'w-8 h-8',
    text: 'text-lg',
    gap: 'gap-4',
  },
}

const getIconColor = (type) => {
  return type === 'positive' ? 'bg-content-positive' : 'bg-content-negative'
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['flex items-center', sizeClasses[size].gap]"
    >
      <!-- Icon -->
      <div
        :class="[
          'shrink-0 rounded-full flex items-center justify-center text-white',
          sizeClasses[size].icon,
          getIconColor(item.type),
        ]"
      >
        <!-- Checkmark for positive -->
        <svg
          v-if="item.type === 'positive'"
          class="w-3/5 h-3/5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>

        <!-- X for negative -->
        <svg
          v-else
          class="w-3/5 h-3/5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <!-- Text -->
      <div :class="['flex-1 text-content-primary', sizeClasses[size].text]">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
