<!-- components/molecules/SkeletonCard/SkeletonCard.vue -->
<script setup>
import Skeleton from '@/components/atoms/Skeleton/Skeleton.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'metrics', 'product', 'profile'].includes(value),
  },
  showImage: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <!-- Default Card -->
  <div
    v-if="variant === 'default'"
    class="p-6 bg-white border border-stone-200 rounded-2xl space-y-4"
  >
    <Skeleton v-if="showImage" variant="rectangle" height="200px" rounded="xl" />
    <Skeleton variant="title" />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="60%" />
  </div>

  <!-- Metrics Card -->
  <div
    v-else-if="variant === 'metrics'"
    class="p-6 bg-white border border-stone-200 rounded-2xl space-y-3"
  >
    <Skeleton variant="text" width="40%" height="14px" />
    <Skeleton variant="title" width="60%" height="32px" />
  </div>

  <!-- Product Card -->
  <div
    v-else-if="variant === 'product'"
    class="bg-white border border-stone-200 rounded-2xl overflow-hidden"
  >
    <Skeleton variant="rectangle" height="200px" rounded="none" />
    <div class="p-4 space-y-3">
      <Skeleton variant="title" />
      <Skeleton variant="text" width="70%" />
      <div class="flex items-center justify-between mt-4">
        <Skeleton variant="text" width="60px" />
        <Skeleton variant="button" width="80px" />
      </div>
    </div>
  </div>

  <!-- Profile Card -->
  <div
    v-else-if="variant === 'profile'"
    class="p-6 bg-white border border-stone-200 rounded-2xl flex items-center gap-4"
  >
    <Skeleton variant="avatar" width="64px" height="64px" />
    <div class="flex-1 space-y-2">
      <Skeleton variant="title" width="50%" />
      <Skeleton variant="text" width="70%" />
    </div>
  </div>
</template>
