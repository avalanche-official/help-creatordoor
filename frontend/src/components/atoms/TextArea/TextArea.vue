<!-- components/atoms/TextArea/TextArea.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  helpText: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
  showCharCount: {
    type: Boolean,
    default: false,
  },
  resize: {
    type: String,
    default: 'vertical',
    validator: (v) => ['none', 'vertical', 'horizontal', 'both'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue'])

const charCount = computed(() => {
  return props.modelValue?.length || 0
})

const resizeClass = computed(() => {
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }
  return resizeClasses[props.resize]
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="space-y-2">
    <!-- Label with optional character count -->
    <div v-if="label || (showCharCount && maxLength)" class="flex items-center justify-between">
      <label v-if="label" class="block text-sm font-medium text-content-primary">
        {{ label }}
      </label>
      <Text v-if="showCharCount && maxLength" variant="body-default" color="content-tertiary">
        {{ charCount }} / {{ maxLength }}
      </Text>
    </div>

    <!-- Textarea -->
    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="[
        'w-full px-4 py-3 rounded-2xl border transition-all',
        'focus:outline-none focus:ring-2',
        resizeClass,
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
          : 'border-stone-200 focus:border-primary-purple focus:ring-primary-purple/20',
        disabled ? 'opacity-50 cursor-not-allowed bg-stone-50' : 'bg-white hover:border-stone-300',
      ]"
      @input="handleInput"
    />

    <!-- Help Text or Error Message -->
    <Text v-if="helpText" variant="body-default" :color="error ? 'red' : 'content-tertiary'">
      {{ helpText }}
    </Text>

    <!-- Character count (bottom) -->
    <Text
      v-if="showCharCount && !maxLength"
      variant="body-default"
      color="content-tertiary"
      class="text-right"
    >
      {{ charCount }} characters
    </Text>
  </div>
</template>

<style scoped>
/* Ensure textarea looks good on mobile */
textarea {
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  textarea {
    font-size: 1rem; /* Prevent iOS zoom on focus */
  }
}
</style>
