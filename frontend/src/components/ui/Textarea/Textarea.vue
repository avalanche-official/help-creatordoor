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
  // Optional field (shows "Optional" label)
  optional: {
    type: Boolean,
    default: false,
  },
  // Max character limit
  maxLength: {
    type: Number,
    default: null,
  },
  // Rows (height)
  rows: {
    type: Number,
    default: 4,
  },
  // ID for textarea (auto-generated if not provided)
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isFocused = ref(false)

const characterCount = computed(() => {
  return props.modelValue.length
})

const charactersRemaining = computed(() => {
  if (!props.maxLength) return null
  return props.maxLength - characterCount.value
})

const isOverLimit = computed(() => {
  if (!props.maxLength) return false
  return characterCount.value > props.maxLength
})

const containerClasses = computed(() => {
  return ['w-full']
})

const textareaContainerClasses = computed(() => {
  const base = ['relative', 'w-full', 'rounded-lg', 'transition-all', 'duration-200', 'bg-white']

  // Border styles
  if (props.disabled) {
    base.push('border', 'border-gray-300', 'bg-background-elevated', 'cursor-not-allowed')
  } else if (props.state === 'error' || isOverLimit.value) {
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

const textareaClasses = computed(() => {
  const base = [
    'w-full',
    'px-4',
    'py-3',
    'text-base',
    'text-content-primary',
    'bg-transparent',
    'outline-none',
    'resize-y',
    'min-h-[100px]',
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

  if (props.state === 'error' || isOverLimit.value) {
    base.push('text-content-negative')
  } else if (props.state === 'success') {
    base.push('text-content-positive')
  }

  return base
})

const counterClasses = computed(() => {
  const base = ['text-xs', 'mt-2']

  if (isOverLimit.value) {
    base.push('text-content-negative', 'font-medium')
  } else {
    base.push('text-content-secondary')
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
</script>

<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-content-negative ml-1">*</span>
      <span v-if="optional" class="text-content-tertiary font-normal ml-2">(Optional)</span>
    </label>

    <!-- Description (optional) -->
    <p v-if="description && state === 'default'" :class="descriptionClasses">
      {{ description }}
    </p>

    <!-- Textarea Container -->
    <div :class="textareaContainerClasses">
      <!-- Textarea -->
      <textarea
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :maxlength="maxLength"
        :class="textareaClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <!-- Character Counter -->
    <div v-if="maxLength" :class="counterClasses">
      {{ characterCount }} / {{ maxLength }}
      <span v-if="isOverLimit" class="ml-1">({{ Math.abs(charactersRemaining) }} over limit)</span>
    </div>

    <!-- Error Message -->
    <div v-if="(state === 'error' || isOverLimit) && errorMessage" :class="messageClasses">
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
