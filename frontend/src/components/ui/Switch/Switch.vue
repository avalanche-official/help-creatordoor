<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const handleToggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div class="flex items-start gap-3">
    <!-- Switch Toggle -->
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label || 'Toggle switch'"
      :disabled="disabled"
      :class="[
        'relative inline-flex h-6 w-11 items-center rounded-full',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-content-accent focus:ring-offset-2',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        modelValue ? 'bg-content-positive' : 'bg-gray-400',
      ]"
      @click="handleToggle"
    >
      <!-- Thumb with inline transform -->
      <span
        :class="[
          'inline-block h-5 w-5 rounded-full bg-white shadow-sm',
          'transition-transform duration-200 ease-in-out',
        ]"
        :style="{ transform: modelValue ? 'translateX(20px)' : 'translateX(2px)' }"
      />
    </button>

    <!-- Label and Description -->
    <div v-if="label || description || $slots.default" class="flex-1 min-w-0">
      <label
        v-if="label"
        class="block text-sm font-medium text-content-primary cursor-pointer"
        @click="!disabled && handleToggle()"
      >
        {{ label }}
      </label>
      <p v-if="description" class="mt-0.5 text-sm text-content-secondary">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>
