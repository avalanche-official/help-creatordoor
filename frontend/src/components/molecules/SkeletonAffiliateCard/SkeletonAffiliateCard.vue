<!-- components/molecules/SkeletonAffiliateCard/SkeletonAffiliateCard.vue -->
<script setup>
import Skeleton from '@/components/atoms/Skeleton/Skeleton.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v),
  },
})

// Variant styles
const bgClass = 'bg-stone-100' // Same as product card
</script>

<template>
  <div :class="['rounded-2xl h-50 p-4 flex flex-col justify-between overflow-hidden', bgClass]">
    <!-- Top Section: Icon + Product Name -->
    <div class="flex items-center gap-3">
      <!-- Icon Circle -->
      <Skeleton variant="circle" width="48px" height="48px" />

      <!-- Product Name -->
      <Skeleton variant="text" width="60%" height="18px" />
    </div>

    <!-- Bottom Section: Earnings/Commission + Status Chip -->
    <div class="flex items-end justify-between mt-auto">
      <!-- Earnings/Commission Section (left) -->
      <div class="flex flex-col space-y-1">
        <Skeleton variant="text" width="60px" height="12px" />
        <Skeleton variant="text" width="80px" height="20px" />
      </div>

      <!-- Status Chip (right) -->
      <Skeleton variant="button" width="70px" height="28px" rounded="full" />
    </div>
  </div>
</template>
