<!-- components/organisms/TextInput.vue -->
<script setup>
import { computed } from 'vue'
import Label from '@/components/molecules/Label/Label.vue'
import InputField from '@/components/molecules/InputField/InputField.vue'
import ErrorMessage from '@/components/molecules/ErrorMessage/ErrorMessage.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
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
  error: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  showPasswordToggle: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
  // ✅ NEW: Character limit
  maxLength: {
    type: Number,
    default: null,
  },
  // ✅ NEW: Show character counter
  showCharCount: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

// ✅ Calculate character count
const charCount = computed(() => {
  const value = props.modelValue?.toString() || ''
  return value.length
})

// ✅ Check if near limit (80% of max)
const isNearLimit = computed(() => {
  if (!props.maxLength) return false
  return charCount.value >= props.maxLength * 0.8
})

// ✅ Check if at limit
const isAtLimit = computed(() => {
  if (!props.maxLength) return false
  return charCount.value >= props.maxLength
})

// ✅ Character counter color
const counterColor = computed(() => {
  if (isAtLimit.value) return 'text-sentiment-negative'
  if (isNearLimit.value) return 'text-sentiment-warning'
  return 'text-stone-500'
})

const handleInput = (value) => {
  // ✅ Enforce max length if set
  if (props.maxLength && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength)
  }
  emit('update:modelValue', value)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}
</script>

<template>
  <div class="w-full">
    <!-- Label with optional character counter -->
    <div v-if="label" class="flex items-center justify-between mb-1">
      <Label :text="label" :required="required" :html-for="id" />

      <!-- ✅ Character counter in label area -->
      <Text v-if="showCharCount && maxLength" variant="body-default" :class="counterColor">
        {{ charCount }}/{{ maxLength }}
      </Text>
    </div>

    <!-- Input Field -->
    <InputField
      :id="id"
      :model-value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :has-error="!!error"
      :prefix-icon="prefixIcon"
      :show-password-toggle="showPasswordToggle"
      :maxlength="maxLength"
      @update:model-value="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- Error Message -->
    <ErrorMessage v-if="error" :message="error" />

    <!-- Helper Text -->
    <div v-else-if="helperText" class="mt-1">
      <Text variant="body-default" color="content-tertiary">{{ helperText }}</Text>
    </div>
  </div>
</template>
