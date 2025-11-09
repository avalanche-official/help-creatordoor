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
  // Model value for v-model
  modelValue: {
    type: String,
    default: '',
  },
  // Input type
  type: {
    type: String,
    default: 'text',
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
  // Show toggle for hiding/showing content (for sensitive fields)
  toggleable: {
    type: Boolean,
    default: false,
  },
  // Required field
  required: {
    type: Boolean,
    default: false,
  },
  // ID for input (auto-generated if not provided)
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isContentVisible = ref(true)
const isFocused = ref(false)

const inputType = computed(() => {
  if (props.toggleable && !isContentVisible.value) {
    return 'password'
  }
  return props.type
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
    'border',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'bg-white',
  ]

  // Border colors based on state
  if (props.disabled) {
    base.push('border-border-default', 'bg-background-elevated', 'cursor-not-allowed')
  } else if (props.state === 'error') {
    base.push('border-content-negative', 'focus-within:border-content-negative')
  } else if (props.state === 'success') {
    base.push('border-content-positive', 'focus-within:border-content-positive')
  } else if (isFocused.value) {
    base.push('border-content-accent', 'ring-2', 'ring-content-accent/20')
  } else {
    base.push('border-border-default', 'hover:border-content-accent/50')
  }

  return base
})

const inputClasses = computed(() => {
  const base = [
    'flex-1',
    'px-4',
    'py-3',
    'text-base',
    'text-content-primary',
    'bg-transparent',
    'outline-none',
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

const handleInput = (event) => {
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

const toggleVisibility = () => {
  isContentVisible.value = !isContentVisible.value
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
      <!-- Input Field -->
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- State Icon (Success/Error) -->
      <div v-if="state !== 'default' && !disabled" class="px-3 shrink-0">
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

      <!-- Toggle Visibility Button (for sensitive content) -->
      <button
        v-if="toggleable && !disabled"
        type="button"
        @click="toggleVisibility"
        class="px-3 shrink-0 text-content-secondary hover:text-content-primary transition-colors"
        :aria-label="isContentVisible ? 'Hide content' : 'Show content'"
      >
        <!-- Show Icon (eye) -->
        <svg
          v-if="!isContentVisible"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>

        <!-- Hide Icon (eye-off) -->
        <svg
          v-if="isContentVisible"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      </button>
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
        <span>Looks good!</span>
      </slot>
    </div>
  </div>
</template>
