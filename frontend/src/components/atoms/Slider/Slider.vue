<!-- components/atoms/Slider/Slider.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Label from '@/components/molecules/Label/Label.vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  unit: {
    type: String,
    default: '',
  },
  showValue: {
    type: Boolean,
    default: true,
  },
  minLabel: {
    type: String,
    default: '',
  },
  maxLabel: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const displayValue = computed(() => {
  if (props.unit) {
    return `${props.modelValue}${props.unit}`
  }
  return props.modelValue
})

const sliderPercentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const handleInput = (event) => {
  emit('update:modelValue', Number(event.target.value))
}
</script>

<template>
  <div class="space-y-0">
    <!-- Label and Value -->
    <div class="flex items-center justify-between">
      <Label v-if="label" :text="label" :html-for="id" />
      <Text v-if="showValue" variant="body-default-bold" class="text-primary-purple">
        {{ displayValue }}
      </Text>
    </div>

    <!-- Slider Container -->
    <div class="relative">
      <input
        :id="id"
        :value="modelValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        :style="`--slider-percentage: ${sliderPercentage}%`"
        @input="handleInput"
      />
    </div>

    <!-- Min/Max Labels -->
    <div v-if="minLabel || maxLabel" class="flex items-center justify-between">
      <Text v-if="minLabel" variant="body-default" color="content-tertiary">
        {{ minLabel }}
      </Text>
      <Text v-if="maxLabel" variant="body-default" color="content-tertiary">
        {{ maxLabel }}
      </Text>
    </div>
  </div>
</template>

<style scoped>
/* Base slider styles */
.slider {
  background: linear-gradient(
    to right,
    rgb(124, 58, 237) 0%,
    rgb(124, 58, 237) var(--slider-percentage),
    rgb(229, 231, 235) var(--slider-percentage),
    rgb(229, 231, 235) 100%
  );
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(147, 51, 234); /* primary-purple */
  background: rgb(168, 85, 247); /* secondary-purple */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  background: rgb(168, 85, 247); /* secondary-purple */
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
}

.slider::-webkit-slider-thumb:active {
  background: rgb(168, 85, 247); /* secondary-purple */
  transform: scale(1.05);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(168, 85, 247); /* secondary-purple */
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  background: rgb(168, 85, 247); /* secondary-purple */
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
}

.slider::-moz-range-thumb:active {
  background: rgb(168, 85, 247); /* secondary-purple */
  transform: scale(1.05);
}

.slider::-moz-range-track {
  background: transparent;
}

/* Focus styles for accessibility */
.slider:focus {
  outline: none;
}

.slider:focus-visible::-webkit-slider-thumb {
  ring: 2px;
  ring-color: rgb(124, 58, 237);
  ring-offset: 2px;
}

.slider:focus-visible::-moz-range-thumb {
  ring: 2px;
  ring-color: rgb(124, 58, 237);
  ring-offset: 2px;
}
</style>
