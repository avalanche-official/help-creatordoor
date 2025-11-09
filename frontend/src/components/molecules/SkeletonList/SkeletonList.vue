<!-- components/molecules/SkeletonList/SkeletonList.vue -->
<script setup>
import Skeleton from '@/components/atoms/Skeleton/Skeleton.vue'

const props = defineProps({
  count: {
    type: Number,
    default: 3,
  },
  spacing: {
    type: String,
    default: '3', // spacing-y-3
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  showAmount: {
    type: Boolean,
    default: true,
  },
  showDescription: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div :class="`space-y-${spacing}`">
    <div v-for="i in count" :key="i" class="w-full p-3 rounded-lg bg-white flex items-center gap-4">
      <!-- Icon Circle -->
      <Skeleton v-if="showIcon" variant="circle" width="48px" height="48px" />

      <!-- Text Content -->
      <div class="flex-1 space-y-2">
        <!-- Title -->
        <Skeleton variant="text" width="40%" height="16px" />
        <!-- Description -->
        <Skeleton v-if="showDescription" variant="text" width="60%" height="14px" />
      </div>

      <!-- Amount -->
      <div v-if="showAmount" class="flex-shrink-0">
        <Skeleton variant="text" width="80px" height="16px" />
      </div>
    </div>
  </div>
</template>
