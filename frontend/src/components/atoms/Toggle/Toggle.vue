<!-- components/atoms/Toggle/Toggle.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const handleToggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between p-4 bg-stone-50 rounded-2xl transition-all',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-stone-100',
    ]"
    @click="handleToggle"
  >
    <div class="flex-1 flex-col pr-4">
      <div>
        <Text v-if="label" variant="body-default-bold" color="content-primary">
          {{ label }}
        </Text>
      </div>
      <div>
        <Text v-if="description" variant="body-default" color="content-secondary" class="mt-1">
          {{ description }}
        </Text>
      </div>
    </div>

    <!-- Toggle Switch -->
    <label class="relative inline-flex items-center cursor-pointer" @click.stop>
      <input
        :checked="modelValue"
        type="checkbox"
        class="sr-only peer"
        :disabled="disabled"
        @change="handleToggle"
      />
      <div
        :class="[
          'w-11 h-6 rounded-full peer transition-all',
          'peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-purple/20',
          'after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px]',
          'after:bg-white after:border after:rounded-full after:h-5 after:w-5',
          'after:transition-all after:border-stone-300',
          'peer-checked:after:translate-x-full peer-checked:after:border-white',
          modelValue ? 'bg-primary-purple' : 'bg-stone-300',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
      ></div>
    </label>
  </div>
</template>
