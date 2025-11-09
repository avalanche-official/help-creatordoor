<!-- components/organisms/PaymentStatistics/PaymentStatistics.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    // Example: [{ date: '2025-10-30', earnings: 50.00 }, ...]
  },
  title: {
    type: String,
    default: 'Tagesumsatz',
  },
  earningsLabel: {
    type: String,
    default: 'Umsatz',
  },
})

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Sort data by date (newest first)
const sortedData = computed(() => {
  return [...props.data].sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<template>
  <div class="space-y-4">
    <div class="px-2 sm:px-4">
      <Text variant="body-default-bold" color="content-secondary">{{ title }}</Text>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-stone-50 border-b border-stone-200">
            <tr>
              <th class="px-6 py-3 text-left">
                <Text variant="body-default-bold" color="content-secondary">Datum</Text>
              </th>
              <th class="px-6 py-3 text-right">
                <Text variant="body-default-bold" color="content-secondary">
                  {{ earningsLabel }}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(day, index) in sortedData"
              :key="day.date"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-stone-50'"
            >
              <td class="px-6 py-4">
                <Text variant="body-default" color="content-primary">
                  {{ formatDate(day.date) }}
                </Text>
              </td>
              <td class="px-6 py-4 text-right">
                <Text variant="body-default-bold" color="content-primary">
                  CHF {{ formatCurrency(day.earnings) }}
                </Text>
              </td>
            </tr>

            <!-- Empty state -->
            <tr v-if="sortedData.length === 0">
              <td colspan="2" class="px-6 py-12 text-center">
                <Text variant="body-default" color="content-secondary">
                  Keine Daten verfügbar
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
