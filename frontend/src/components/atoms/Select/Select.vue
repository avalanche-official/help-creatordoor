<!-- src/components/atoms/Select/Select.vue -->
<script setup>
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  displayText: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      'cursor-pointer body-default w-full py-2.5 px-3',
      'bg-transparent border border-stone-200 rounded-lg transition-all duration-200',
      'text-[#0e0e11]',
      'text-left flex items-center justify-between',
      'focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-stone-50',
      error
        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
        : isOpen
          ? 'border-black ring-2 ring-black'
          : 'border-stone-300 focus:ring-2 focus:ring-black',
    ]"
    @click="handleClick"
  >
    <!-- Left side: Prefix + Text -->
    <span
      :class="[
        'flex items-center gap-2',
        displayText || modelValue ? 'text-[#0e0e11]' : 'text-stone-400',
      ]"
    >
      <span v-if="prefix" class="text-xl">{{ prefix }}</span>
      <span class="text-body-large">
        {{ displayText || placeholder }}
      </span>
    </span>

    <!-- Right side: Chevron Icon -->
    <Icon
      name="chevron-down"
      :size="20"
      :class="[
        'transition-transform duration-200',
        isOpen ? 'rotate-180' : 'rotate-0',
        error ? 'text-red-500' : 'text-stone-400',
      ]"
    />
  </button>
</template>
