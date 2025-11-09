<!-- components/molecules/SkeletonProductCard/SkeletonProductCard.vue -->
<script setup>
import Skeleton from '@/components/atoms/Skeleton/Skeleton.vue'
</script>

<template>
  <div class="bg-stone-100 rounded-2xl h-50 p-4 flex flex-col justify-between overflow-hidden">
    <!-- Top Section: Icon + Product Name -->
    <div class="flex items-center gap-3">
      <!-- Icon Circle -->
      <Skeleton variant="circle" width="48px" height="48px" />

      <!-- Product Name -->
      <Skeleton variant="text" width="60%" height="18px" />
    </div>

    <!-- Bottom Section: Price + Status Chip -->
    <div class="flex items-end justify-between mt-auto">
      <!-- Price Section (left) -->
      <div class="flex flex-col space-y-1">
        <Skeleton variant="text" width="60px" height="12px" />
        <Skeleton variant="text" width="80px" height="20px" />
      </div>

      <!-- Status Chip (right) -->
      <Skeleton variant="button" width="70px" height="28px" rounded="full" />
    </div>
  </div>
</template>
