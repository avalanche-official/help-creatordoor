<script setup>
import { ref, computed, watch } from 'vue'

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
  // Model value for v-model (object with month and year)
  modelValue: {
    type: Object,
    default: () => ({ month: '', year: '' }),
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
  // ID for inputs (auto-generated if not provided)
  id: {
    type: String,
    default: () => `compact-date-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const monthInput = ref(null)
const yearInput = ref(null)
const isFocused = ref(false)

const month = ref(props.modelValue.month || '')
const year = ref(props.modelValue.year || '')

// Watch for external changes
watch(
  () => props.modelValue,
  (newVal) => {
    month.value = newVal.month || ''
    year.value = newVal.year || ''
  },
  { deep: true },
)

const containerClasses = computed(() => {
  return ['w-fit']
})

const inputsContainerClasses = computed(() => {
  const base = ['flex', 'gap-3']
  return base
})

const inputWrapperClasses = computed(() => {
  const base = [
    'relative',
    'flex',
    'items-center',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'bg-white',
  ]

  // Border styles
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

const inputClasses = computed(() => {
  const base = [
    'w-fit',
    'px-4',
    'py-3',
    'text-base',
    'text-content-primary',
    'bg-transparent',
    'outline-none',
    'text-center',
    'placeholder:text-content-tertiary',
    'disabled:cursor-not-allowed',
    'disabled:text-content-tertiary',
  ]

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

const handleMonthInput = (event) => {
  let value = event.target.value.replace(/\D/g, '') // Only digits

  // Limit to 2 digits
  if (value.length > 2) {
    value = value.slice(0, 2)
  }

  // Validate month (01-12)
  if (value.length === 2) {
    const monthNum = parseInt(value, 10)
    if (monthNum < 1) value = '01'
    if (monthNum > 12) value = '12'

    // Auto-focus to year input
    if (yearInput.value) {
      yearInput.value.focus()
    }
  }

  month.value = value
  emit('update:modelValue', { month: month.value, year: year.value })
}

const handleYearInput = (event) => {
  let value = event.target.value.replace(/\D/g, '') // Only digits

  // Limit to 2 digits
  if (value.length > 2) {
    value = value.slice(0, 2)
  }

  year.value = value
  emit('update:modelValue', { month: month.value, year: year.value })
}

const handleMonthKeydown = (event) => {
  // Auto-advance to year on forward slash
  if (event.key === '/' && yearInput.value) {
    event.preventDefault()
    yearInput.value.focus()
  }

  // Backspace on empty month input
  if (event.key === 'Backspace' && month.value === '') {
    // Stay on month input
  }
}

const handleYearKeydown = (event) => {
  // Backspace on empty year input goes back to month
  if (event.key === 'Backspace' && year.value === '' && monthInput.value) {
    event.preventDefault()
    monthInput.value.focus()
  }
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  // Only blur if focus is leaving both inputs
  setTimeout(() => {
    if (document.activeElement !== monthInput.value && document.activeElement !== yearInput.value) {
      isFocused.value = false
      emit('blur', event)
    }
  }, 0)
}

// Format month for display (pad with 0)
const formattedMonth = computed({
  get: () => month.value.padStart(2, '0').slice(0, 2),
  set: (val) => {
    month.value = val
  },
})

// Format year for display (pad with 0)
const formattedYear = computed({
  get: () => year.value.padStart(2, '0').slice(0, 2),
  set: (val) => {
    year.value = val
  },
})
</script>

<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="`${id}-month`" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-content-negative ml-1">*</span>
    </label>

    <!-- Description (optional) -->
    <p v-if="description && state === 'default'" :class="descriptionClasses">
      {{ description }}
    </p>

    <!-- Inputs Container -->
    <div :class="inputsContainerClasses">
      <!-- Month Input -->
      <div :class="inputWrapperClasses" class="flex-1">
        <input
          :id="`${id}-month`"
          ref="monthInput"
          v-model="formattedMonth"
          type="text"
          inputmode="numeric"
          maxlength="2"
          placeholder="MM"
          :disabled="disabled"
          :required="required"
          :class="inputClasses"
          @input="handleMonthInput"
          @keydown="handleMonthKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>

      <!-- Separator -->
      <div class="flex items-center text-content-secondary font-medium">/</div>

      <!-- Year Input -->
      <div :class="inputWrapperClasses" class="flex-1">
        <input
          :id="`${id}-year`"
          ref="yearInput"
          v-model="formattedYear"
          type="text"
          inputmode="numeric"
          maxlength="2"
          placeholder="YY"
          :disabled="disabled"
          :required="required"
          :class="inputClasses"
          @input="handleYearInput"
          @keydown="handleYearKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>

      <!-- State Icon (Success/Error) -->
      <div v-if="state !== 'default' && !disabled" class="flex items-center shrink-0">
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
        <span>Valid date</span>
      </slot>
    </div>
  </div>
</template>
