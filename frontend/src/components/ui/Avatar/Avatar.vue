<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Size: 16, 24, 32, 40, 48, 56, 72
  size: {
    type: Number,
    default: 40,
    validator: (value) => [16, 24, 32, 40, 48, 56, 72].includes(value),
  },
  // Type: image, text, icon, flag
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['image', 'text', 'icon', 'flag'].includes(value),
  },
  // For image type
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  // For text type (initials)
  text: {
    type: String,
    default: '',
    validator: (value) => value.length <= 2,
  },
  // For icon/flag type
  icon: {
    type: String,
    default: '',
  },
  // Interactive state
  interactive: {
    type: Boolean,
    default: false,
  },
  // Selected state
  selected: {
    type: Boolean,
    default: false,
  },
  // Notification indicator
  notification: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const sizeClasses = computed(() => {
  const sizes = {
    16: 'w-4 h-4 min-w-4 min-h-4 text-[8px]',
    24: 'w-6 h-6 min-w-6 min-h-6 text-[10px]',
    32: 'w-8 h-8 min-w-8 min-h-8 text-xs',
    40: 'w-10 h-10 min-w-10 min-h-10 text-sm',
    48: 'w-12 h-12 min-w-12 min-h-12 text-base',
    56: 'w-14 h-14 min-w-14 min-h-14 text-lg',
    72: 'w-[72px] h-[72px] min-w-[72px] min-h-[72px] text-xl',
  }
  return sizes[props.size]
})

const notificationSize = computed(() => {
  if (props.size <= 24) return 'w-2 h-2'
  if (props.size <= 40) return 'w-2.5 h-2.5'
  return 'w-3 h-3'
})

const backgroundClass = computed(() => {
  if (props.selected) {
    return 'bg-content-accent text-white ring-2 ring-content-accent ring-offset-2'
  }
  if (props.interactive) {
    return 'bg-background-elevated hover:bg-content-accent/10 text-content-primary cursor-pointer transition-all duration-200'
  }
  return 'bg-background-elevated text-content-primary'
})

const handleClick = () => {
  if (props.interactive || props.selected) {
    emit('click')
  }
}
</script>

<template>
  <div class="relative inline-flex shrink-0">
    <div
      :class="[
        'rounded-full flex items-center justify-center overflow-hidden',
        'border border-border-default',
        sizeClasses,
        backgroundClass,
        interactive || selected ? 'cursor-pointer' : '',
      ]"
      @click="handleClick"
    >
      <!-- Image Type -->
      <img
        v-if="type === 'image' && src"
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
      />

      <!-- Text Type (Initials) -->
      <span v-else-if="type === 'text' && text" class="font-semibold uppercase leading-none">
        {{ text }}
      </span>

      <!-- Icon or Flag Type -->
      <span
        v-else-if="(type === 'icon' || type === 'flag') && icon"
        :class="[
          'leading-none flex items-center justify-center',
          size <= 24 ? 'text-base' : size <= 40 ? 'text-xl' : 'text-2xl',
        ]"
      >
        {{ icon }}
      </span>

      <!-- Fallback -->
      <span v-else class="text-content-tertiary leading-none">?</span>
    </div>

    <!-- Badge Slot -->
    <div v-if="$slots.badge" class="absolute -bottom-0.5 -right-0.5 z-10">
      <slot name="badge" />
    </div>

    <!-- Notification Indicator -->
    <div
      v-if="notification"
      :class="[
        'absolute top-0 right-0 z-10',
        'rounded-full bg-content-negative border-2 border-white',
        notificationSize,
      ]"
    />
  </div>
</template>
