<!-- components/molecules/InputField.vue -->
<script setup>
import { ref, computed } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import IconButton from '../IconButton/IconButton.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  showPasswordToggle: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value),
  },
  rounded: {
    type: String,
    default: 'rounded-xl',
    validator: (value) =>
      [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-3xl',
        'rounded-full',
      ].includes(value),
  },
  background: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'transparent'].includes(value),
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
  maxlength: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

const isFocused = ref(false)
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

const backgroundClasses = computed(() => {
  if (props.disabled) {
    return 'bg-stone-50'
  }

  switch (props.background) {
    case 'dark':
      return 'bg-neutral-800'
    case 'transparent':
      return 'bg-transparent'
    case 'light':
    default:
      return 'bg-white'
  }
})

const textColorClasses = computed(() => {
  switch (props.background) {
    case 'dark':
      return 'text-white placeholder:text-neutral-400'
    case 'transparent':
      return 'text-stone-900 placeholder:text-stone-400'
    case 'light':
    default:
      return 'text-stone-900 placeholder:text-stone-400'
  }
})

const borderColorClasses = computed(() => {
  if (props.hasError) {
    return 'border-sentiment-negative focus-within:border-sentiment-negative focus-within:ring-1 focus-within:ring-sentiment-negative'
  }

  if (isFocused.value) {
    switch (props.background) {
      case 'dark':
        return 'border-white ring-1 ring-white'
      case 'transparent':
        return 'border-white ring-1 ring-white'
      default:
        return 'border-black ring-1 ring-black'
    }
  }

  switch (props.background) {
    case 'dark':
      return 'border-neutral-600 hover:border-neutral-500'
    case 'transparent':
      return 'border-neutral-400 hover:border-neutral-300'
    default:
      return 'border-stone-300 hover:border-stone-400'
  }
})

const wrapperClasses = computed(() => {
  const classes = [
    'relative',
    'border',
    props.rounded,
    'transition-all',
    'duration-200',
    backgroundClasses.value,
    borderColorClasses.value,
  ]

  if (props.disabled) {
    classes.push('cursor-not-allowed', 'opacity-60')
  }

  return classes
})

const sizeClasses = computed(() => {
  const sizes = {
    small: {
      input: 'py-1.5 px-3 text-sm',
      icon: 16,
      iconLeft: 'left-2.5',
      iconPadding: 'pl-9',
      toggleRight: 'right-1.5',
      togglePadding: 'pr-9',
    },
    default: {
      input: 'py-2.5 px-4 text-base',
      icon: 18,
      iconLeft: 'left-3',
      iconPadding: 'pl-10',
      toggleRight: 'right-2',
      togglePadding: 'pr-10',
    },
    large: {
      input: 'py-3.5 px-5 text-lg',
      icon: 20,
      iconLeft: 'left-4',
      iconPadding: 'pl-12',
      toggleRight: 'right-3',
      togglePadding: 'pr-12',
    },
  }
  return sizes[props.size] || sizes.default
})

const inputClasses = computed(() => {
  return [
    sizeClasses.value.input,
    props.prefixIcon ? sizeClasses.value.iconPadding : '',
    props.showPasswordToggle || props.type === 'password' ? sizeClasses.value.togglePadding : '',
    'w-full',
    'border-0',
    'focus:outline-none',
    'focus:ring-0',
    'bg-transparent',
    textColorClasses.value,
    props.rounded, 
  ]
})

const iconColor = computed(() => {
  if (props.hasError) {
    return 'text-sentiment-negative'
  }
  if (props.background === 'dark' || props.background === 'transparent') {
    return isFocused.value ? '#ffffff' : '#a3a3a3'
  }
  return isFocused.value ? '#8b5cf6' : '#7a7a85'
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

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div :class="wrapperClasses">
    <!-- Prefix Icon -->
    <div
      v-if="prefixIcon"
      :class="[
        'absolute',
        sizeClasses.iconLeft,
        'top-1/2',
        '-translate-y-1/2',
        'pointer-events-none',
        'z-10',
      ]"
    >
      <Icon :name="prefixIcon" :size="sizeClasses.icon" :color="iconColor" />
    </div>

    <!-- Native Input -->
    <input
      :id="id"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :maxlength="maxlength || undefined"
      :class="inputClasses"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- Password Toggle Button -->
    <div
      v-if="type === 'password' && showPasswordToggle"
      :class="['absolute', sizeClasses.toggleRight, 'top-1/2', '-translate-y-1/2', 'z-10']"
    >
      <IconButton
        :icon="showPassword ? 'eye-off' : 'eye'"
        variant="ghost"
        :size="size === 'small' ? 'small' : 'medium'"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="togglePasswordVisibility"
      />
    </div>
  </div>
</template>