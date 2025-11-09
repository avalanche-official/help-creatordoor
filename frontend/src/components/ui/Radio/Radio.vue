<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Model value for v-model
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  // Value of this radio option
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  // Label text
  label: {
    type: String,
    required: true,
  },
  // Description text (optional)
  description: {
    type: String,
    default: '',
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Name attribute (for grouping)
  name: {
    type: String,
    default: 'radio-group',
  },
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => props.modelValue === props.value)

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
  }
}
</script>

<template>
  <label
    :class="[
      'flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all',
      isChecked
        ? 'border-2 border-content-accent bg-background-elevated'
        : 'border border-gray-300 hover:border-content-accent bg-white',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <!-- Radio Circle -->
    <div class="relative flex items-center justify-center shrink-0 mt-0.5">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @change="handleChange"
        class="sr-only"
      />
      <div
        :class="[
          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          isChecked ? 'border-content-accent' : 'border-gray-300 group-hover:border-content-accent',
        ]"
      >
        <div v-if="isChecked" class="w-3 h-3 rounded-full bg-content-accent" />
      </div>
    </div>

    <!-- Label and Description -->
    <div class="flex-1 min-w-0">
      <div class="text-base font-medium text-content-primary">
        {{ label }}
      </div>
      <p v-if="description" class="mt-1 text-sm text-content-secondary">
        {{ description }}
      </p>
    </div>
  </label>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
