<script setup>
import { computed } from 'vue'

const props = defineProps({
  // v-model support
  modelValue: {
    type: [Boolean, Array],
    default: false,
  },
  // Value for checkbox (used in arrays)
  value: {
    type: [String, Number, Boolean],
    default: null,
  },
  // Label text
  label: {
    type: String,
    default: '',
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Error state
  error: {
    type: Boolean,
    default: false,
  },
  // Indeterminate state (for "select all" scenarios)
  indeterminate: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

const handleChange = (event) => {
  if (props.disabled) return

  const checked = event.target.checked

  if (Array.isArray(props.modelValue)) {
    let newValue = [...props.modelValue]
    if (checked) {
      newValue.push(props.value)
    } else {
      newValue = newValue.filter((v) => v !== props.value)
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', checked)
  }
}
</script>

<template>
  <label
    :class="[
      'flex items-start gap-3 cursor-pointer',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80',
      'transition-opacity duration-200',
    ]"
  >
    <!-- Checkbox Input -->
    <div class="relative flex items-center shrink-0 pt-0.5">
      <input
        type="checkbox"
        :checked="isChecked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleChange"
        class="peer sr-only"
      />

      <!-- Custom Checkbox -->
      <div
        :class="[
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
          error
            ? 'border-content-negative'
            : isChecked || indeterminate
              ? 'border-content-accent bg-content-accent'
              : 'border-border-default bg-white',
          !disabled && 'peer-focus:ring-2 peer-focus:ring-content-accent peer-focus:ring-offset-2',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
      >
        <!-- Checkmark -->
        <svg
          v-if="isChecked && !indeterminate"
          class="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>

        <!-- Indeterminate Line -->
        <svg
          v-else-if="indeterminate"
          class="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h14" />
        </svg>
      </div>
    </div>

    <!-- Label and Description -->
    <div v-if="label || description || $slots.default" class="flex-1 min-w-0">
      <div
        v-if="label"
        :class="[
          'text-sm font-medium leading-tight',
          error ? 'text-content-negative' : 'text-content-primary',
        ]"
      >
        {{ label }}
      </div>

      <div v-if="description" class="text-sm text-content-secondary mt-1 leading-relaxed">
        {{ description }}
      </div>

      <!-- Custom content slot -->
      <slot />
    </div>
  </label>
</template>
