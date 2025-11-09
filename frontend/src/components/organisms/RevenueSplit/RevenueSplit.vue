<!-- components/organisms/RevenueSplit/RevenueSplit.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  vendorEarnings: {
    type: Number,
    required: true,
  },
  affiliateEarnings: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: 'Einnahmen Übersicht',
  },
})

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

// Total earnings
const totalEarnings = computed(() => {
  return props.vendorEarnings + props.affiliateEarnings
})

// Percentages
const vendorPercentage = computed(() => {
  if (totalEarnings.value === 0) return 0
  return ((props.vendorEarnings / totalEarnings.value) * 100).toFixed(1)
})

const affiliatePercentage = computed(() => {
  if (totalEarnings.value === 0) return 0
  return ((props.affiliateEarnings / totalEarnings.value) * 100).toFixed(1)
})
</script>

<template>
  <div class="space-y-4">
    <div class="px-2 sm:px-4">
      <Text variant="body-default-bold" color="content-secondary">{{ title }}</Text>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 p-6">
      <!-- Total -->
      <div class="mb-6 pb-6 border-b border-stone-200">
        <Text variant="body-default" color="content-secondary" class="mb-2">
          Gesamt Einnahmen
        </Text>
        <Text variant="title-body" class="text-3xl font-bold">
          CHF {{ formatCurrency(totalEarnings) }}
        </Text>
      </div>

      <!-- Split Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Vendor Card -->
        <div class="bg-purple-50 rounded-xl p-5 border border-purple-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-xl">🏪</span>
            </div>
            <div>
              <Text variant="body-default" color="content-secondary">Vendor Einnahmen</Text>
            </div>
          </div>
          <Text variant="title-body" class="text-2xl font-bold mb-1">
            CHF {{ formatCurrency(vendorEarnings) }}
          </Text>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex-1 bg-purple-200 rounded-full h-2 overflow-hidden">
              <div
                class="bg-purple-600 h-full transition-all duration-500"
                :style="{ width: `${vendorPercentage}%` }"
              ></div>
            </div>
            <Text variant="body-default" color="content-secondary"> {{ vendorPercentage }}% </Text>
          </div>
        </div>

        <!-- Affiliate Card -->
        <div class="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-xl">🤝</span>
            </div>
            <div>
              <Text variant="body-default" color="content-secondary">Affiliate Provisionen</Text>
            </div>
          </div>
          <Text variant="title-body" class="text-2xl font-bold mb-1">
            CHF {{ formatCurrency(affiliateEarnings) }}
          </Text>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex-1 bg-blue-200 rounded-full h-2 overflow-hidden">
              <div
                class="bg-blue-600 h-full transition-all duration-500"
                :style="{ width: `${affiliatePercentage}%` }"
              ></div>
            </div>
            <Text variant="body-default" color="content-secondary">
              {{ affiliatePercentage }}%
            </Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
