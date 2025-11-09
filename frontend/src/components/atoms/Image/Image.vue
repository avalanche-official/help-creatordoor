<!-- components/atoms/Image/Image.vue -->
<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: 'auto',
  },
  height: {
    type: [String, Number],
    default: 'auto',
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  objectFit: {
    type: String,
    default: 'cover',
    validator: (value) => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(value),
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager'].includes(value),
  },
})

const getSize = (value) => {
  return typeof value === 'number' ? `${value}px` : value
}
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :loading="loading"
    :style="{
      width: getSize(width),
      height: getSize(height),
      objectFit: objectFit,
    }"
    :class="{ 'rounded-full': rounded }"
    class="block"
  />
</template>
