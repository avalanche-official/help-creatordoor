<!-- components/product/MegaMenuButton/MegaMenuButton.vue -->
<script setup>
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'mouseenter'])
</script>

<template>
  <Button
    @click="emit('click')"
    @mouseenter="emit('mouseenter')"
    variant="textButton"
    class="border-none"
    size="small"
  >
    {{ label }}
  </Button>
</template>
