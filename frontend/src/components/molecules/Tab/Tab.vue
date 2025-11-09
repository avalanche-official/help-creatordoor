<!-- components/molecules/Tab/Tab.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

const classes = computed(() => {
  return [
    'relative px-4 py-3 cursor-pointer transition-colors duration-200',
    props.active ? 'text-primary-purple' : 'text-content-secondary hover:text-content-primary',
    props.disabled && 'opacity-50 cursor-not-allowed',
  ]
})
</script>

<template>
  <div :class="classes" @click="handleClick">
    <Text variant="body-large-bold" :color="active ? 'primary-purple' : 'inherit'">
      {{ label }}
    </Text>

    <!-- Active indicator line -->
    <div v-if="active" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-purple" />
  </div>
</template>
