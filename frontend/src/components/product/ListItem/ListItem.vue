<script setup>
const props = defineProps({
  // Title text
  title: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Additional info text
  additionalInfo: {
    type: String,
    default: '',
  },
  // Value text (right side)
  value: {
    type: String,
    default: '',
  },
  // Avatar size: 32, 40, 48, 56, 72
  avatarSize: {
    type: Number,
    default: 48,
    validator: (value) => [32, 40, 48, 56, 72].includes(value),
  },
  // Make entire item clickable
  clickable: {
    type: Boolean,
    default: false,
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Show navigation chevron
  showChevron: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.clickable && !props.disabled) {
    emit('click')
  }
}

const avatarSizeClasses = {
  32: 'w-8 h-8',
  40: 'w-10 h-10',
  48: 'w-12 h-12',
  56: 'w-14 h-14',
  72: 'w-18 h-18',
}
</script>

<template>
  <div
    :class="[
      'flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200',
      'transition-all',
      clickable && !disabled && 'cursor-pointer hover:bg-background-elevated active:scale-[0.98]',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    @click="handleClick"
  >
    <!-- Avatar/Icon Slot -->
    <div
      v-if="$slots.avatar"
      :class="[
        'shrink-0 rounded-full overflow-hidden flex items-center justify-center',
        avatarSizeClasses[avatarSize],
      ]"
    >
      <slot name="avatar" />
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <!-- Title -->
      <div class="font-semibold text-base text-content-primary leading-tight">
        {{ title }}
      </div>

      <!-- Description -->
      <div v-if="description" class="mt-0.5 text-sm text-content-secondary leading-tight">
        {{ description }}
      </div>

      <!-- Additional Info -->
      <div v-if="additionalInfo" class="mt-1 text-xs text-content-secondary">
        {{ additionalInfo }}
      </div>

      <!-- Prompt Slot (for warnings, etc.) -->
      <div v-if="$slots.prompt" class="mt-2">
        <slot name="prompt" />
      </div>
    </div>

    <!-- Value (right side) -->
    <div v-if="value" class="shrink-0 font-semibold text-base text-content-primary">
      {{ value }}
    </div>

    <!-- Action Slot (for buttons, switches, radios, etc.) -->
    <div v-if="$slots.action" class="shrink-0">
      <slot name="action" />
    </div>

    <!-- Navigation Chevron -->
    <svg
      v-if="showChevron"
      class="w-5 h-5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</template>
