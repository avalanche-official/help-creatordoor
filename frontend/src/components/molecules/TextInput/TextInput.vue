<!-- components/molecules/TextInput/TextInput.vue -->
<script setup>
import { ref, computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
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
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error'].includes(value),
  },
  errorMessage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  toggleable: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
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

const borderClasses = computed(() => {
  if (props.disabled) return 'border-stone-300'
  if (props.state === 'error') return 'border-red-500'
  if (props.state === 'success') return 'border-green-500'
  if (isFocused.value) return 'border-black'
  return 'border-stone-300'
})

const ringClasses = computed(() => {
  if (isFocused.value && props.state === 'default' && !props.disabled) {
    return 'ring-2 ring-black'
  }
  return ''
})

const handleInput = (value) => {
  emit('update:modelValue', value)
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
  <div class="w-full px-1">
    <!-- Label -->
    <label v-if="label" :for="id" class="block mb-1">
      <Text variant="body-default-bold" color="content-primary">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </Text>
    </label>

    <!-- Description -->
    <div v-if="description && state === 'default'" class="mb-2">
      <Text variant="body-default" color="content-secondary">
        {{ description }}
      </Text>
    </div>

    <!-- Input Container -->
    <div
      class="relative flex items-center w-full border rounded-lg transition-all duration-200 border-stone-200"
      :class="[
        borderClasses,
        ringClasses,
        {
          'cursor-not-allowed opacity-50': disabled,
        },
      ]"
    >
      <!-- Input Field -->
      <Input
        :id="id"
        :type="inputType"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @update:model-value="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- State Icon (Success/Error) -->
      <div v-if="state !== 'default' && !disabled" class="px-3 shrink-0">
        <Icon v-if="state === 'success'" name="check" :size="20" class="text-green-500" />
        <Icon v-if="state === 'error'" name="alert-circle" :size="20" class="text-red-500" />
      </div>

      <!-- Toggle Visibility Button -->
      <button
        v-if="toggleable && !disabled"
        type="button"
        @click="toggleVisibility"
        class="px-3 shrink-0 transition-colors text-stone-500 hover:text-stone-900"
        :aria-label="isContentVisible ? 'Hide content' : 'Show content'"
      >
        <Icon :name="isContentVisible ? 'eye' : 'eye-off'" :size="20" />
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="state === 'error' && errorMessage" class="flex items-start gap-2 mt-2">
      <Icon name="alert-circle" :size="16" class="mt-0.5 shrink-0 text-red-500" />
      <Text variant="body-default" color="content-secondary" class="text-red-500">
        {{ errorMessage }}
      </Text>
    </div>

    <!-- Success Message -->
    <div v-if="state === 'success'" class="flex items-start gap-2 mt-2">
      <Icon name="check" :size="16" class="mt-0.5 shrink-0 text-green-500" />
      <Text variant="body-default" color="content-secondary" class="text-green-500">
        <slot name="success-message">Looks good!</slot>
      </Text>
    </div>
  </div>
</template>
