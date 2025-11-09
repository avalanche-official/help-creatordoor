<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Label text (max 3 words - noun)
  label: {
    type: String,
    default: '',
  },
  // Description text (optional - single sentence)
  description: {
    type: String,
    default: '',
  },
  // Model value for v-model (ISO date string YYYY-MM-DD)
  modelValue: {
    type: String,
    default: '',
  },
  // State: default, success, error
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error'].includes(value),
  },
  // Error message (shown when state is 'error')
  errorMessage: {
    type: String,
    default: '',
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Required field
  required: {
    type: Boolean,
    default: false,
  },
  // Min date (ISO format YYYY-MM-DD)
  min: {
    type: String,
    default: '',
  },
  // Max date (ISO format YYYY-MM-DD)
  max: {
    type: String,
    default: '',
  },
  // ID for input (auto-generated if not provided)
  id: {
    type: String,
    default: () => `datepicker-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isFocused = ref(false)

// Format date for display (e.g., "15 Jan 2025")
const formattedDate = computed(() => {
  if (!props.modelValue) return ''

  const date = new Date(props.modelValue)
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return date.toLocaleDateString('en-GB', options)
})

const containerClasses = computed(() => {
  return ['w-full']
})

const inputContainerClasses = computed(() => {
  const base = [
    'relative',
    'flex',
    'items-center',
    'w-full',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'bg-white',
  ]

  // Border styles - simplified for Tailwind v4
  if (props.disabled) {
    base.push('border', 'border-gray-300', 'bg-background-elevated', 'cursor-not-allowed')
  } else if (props.state === 'error') {
    base.push('border-2', 'border-red-500')
  } else if (props.state === 'success') {
    base.push('border-2', 'border-green-500')
  } else if (isFocused.value) {
    base.push('border-2', 'border-[#25ccbf]', 'ring-2', 'ring-[#25ccbf]/20')
  } else {
    base.push('border', 'border-gray-300', 'hover:border-[#25ccbf]')
  }

  return base
})

const displayClasses = computed(() => {
  const base = ['flex-1', 'px-4', 'py-3', 'text-base']

  if (props.modelValue) {
    base.push('text-content-primary')
  } else {
    base.push('text-content-tertiary')
  }

  if (props.disabled) {
    base.push('cursor-not-allowed', 'text-content-tertiary')
  }

  return base
})

const labelClasses = computed(() => {
  const base = ['block', 'text-sm', 'font-medium', 'mb-2']

  if (props.disabled) {
    base.push('text-content-tertiary')
  } else {
    base.push('text-content-primary')
  }

  return base
})

const descriptionClasses = computed(() => {
  return ['text-sm', 'text-content-secondary', 'mt-2']
})

const messageClasses = computed(() => {
  const base = ['flex', 'items-start', 'gap-2', 'text-sm', 'mt-2']

  if (props.state === 'error') {
    base.push('text-content-negative')
  } else if (props.state === 'success') {
    base.push('text-content-positive')
  }

  return base
})

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>

<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-content-negative ml-1">*</span>
    </label>

    <!-- Description (optional) -->
    <p v-if="description && state === 'default'" :class="descriptionClasses">
      {{ description }}
    </p>

    <!-- Input Container -->
    <div :class="inputContainerClasses">
      <!-- Display Value (Shows formatted date or placeholder) -->
      <div :class="displayClasses">
        {{ formattedDate || 'Select date' }}
      </div>

      <!-- Calendar Icon -->
      <div class="px-3 shrink-0">
        <svg
          class="w-5 h-5 text-content-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- State Icon (Success/Error) -->
      <div v-if="state !== 'default' && !disabled" class="px-3 shrink-0 -ml-3">
        <!-- Success Icon -->
        <svg
          v-if="state === 'success'"
          class="w-5 h-5 text-content-positive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>

        <!-- Error Icon -->
        <svg
          v-if="state === 'error'"
          class="w-5 h-5 text-content-negative"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Native Date Input (Hidden but triggers native picker) -->
      <input
        :id="id"
        type="date"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        style="color: transparent"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <!-- Error Message -->
    <div v-if="state === 'error' && errorMessage" :class="messageClasses">
      <svg class="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Success Message (optional slot) -->
    <div v-if="state === 'success'" :class="messageClasses">
      <svg class="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <slot name="success-message">
        <span>Date selected</span>
      </slot>
    </div>
  </div>
</template>
