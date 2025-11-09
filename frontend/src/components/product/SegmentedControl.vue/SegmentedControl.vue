<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  // Model value for v-model
  modelValue: {
    type: [String, Number],
    required: true,
  },
  // Options array: [{ label: 'Option 1', value: 'opt1' }, ...]
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return (
        options.length >= 2 &&
        options.length <= 3 &&
        options.every((opt) => opt.label && opt.value !== undefined)
      )
    },
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Size: default or small
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'small'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const containerRef = ref(null)
const buttonRefs = ref([])
const sliderStyle = ref({})

const containerClasses = computed(() => {
  const base = [
    'relative',
    'inline-flex',
    'items-center',
    'bg-background-elevated',
    'rounded-full',
    'p-1',
    'gap-1',
  ]

  if (props.disabled) {
    base.push('opacity-50', 'cursor-not-allowed')
  }

  return base
})

const buttonClasses = (option) => {
  const base = [
    'relative',
    'z-10',
    'px-6',
    'font-medium',
    'rounded-full',
    'transition-colors',
    'duration-200',
    'whitespace-normal',
    'text-center',
    'leading-tight',
  ]

  // Size
  if (props.size === 'small') {
    base.push('py-1.5', 'text-sm', 'px-4')
  } else {
    base.push('py-2.5', 'text-base')
  }

  // Active/inactive colors
  if (option.value === props.modelValue) {
    base.push('text-content-primary')
  } else {
    base.push('text-content-secondary', 'hover:text-content-primary')
  }

  if (props.disabled) {
    base.push('cursor-not-allowed')
  } else {
    base.push('cursor-pointer')
  }

  return base
}

const updateSliderPosition = () => {
  nextTick(() => {
    const activeIndex = props.options.findIndex((opt) => opt.value === props.modelValue)
    if (activeIndex === -1 || !buttonRefs.value[activeIndex]) return

    const activeButton = buttonRefs.value[activeIndex]
    const container = containerRef.value

    if (!activeButton || !container) return

    const buttonRect = activeButton.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    sliderStyle.value = {
      width: `${buttonRect.width}px`,
      height: `${buttonRect.height}px`,
      transform: `translateX(${buttonRect.left - containerRect.left}px)`,
    }
  })
}

const handleSelect = (option) => {
  if (props.disabled || option.value === props.modelValue) return

  emit('update:modelValue', option.value)
  emit('change', option.value)
}

watch(
  () => props.modelValue,
  () => {
    updateSliderPosition()
  },
)

watch(
  () => props.options,
  () => {
    updateSliderPosition()
  },
  { deep: true },
)

onMounted(() => {
  updateSliderPosition()
  window.addEventListener('resize', updateSliderPosition)
})
</script>

<template>
  <div ref="containerRef" :class="containerClasses">
    <!-- Sliding background -->
    <div
      class="absolute bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
      :style="sliderStyle"
    />

    <!-- Options -->
    <button
      v-for="(option, index) in options"
      :key="option.value"
      :ref="
        (el) => {
          if (el) buttonRefs[index] = el
        }
      "
      type="button"
      :class="buttonClasses(option)"
      :disabled="disabled"
      @click="handleSelect(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
