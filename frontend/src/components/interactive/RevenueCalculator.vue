<!-- components/interactive/RevenueCalculator.vue -->
<script setup>
import { ref, computed } from 'vue'
import Slider from '@/components/atoms/Slider/Slider.vue'
import Text from '@/components/atoms/Text/Text.vue'
import CopyBlock from '../molecules/CopyBlock/CopyBlock.vue'
const productPrice = ref(49)
const monthlySales = ref(20)
const averageOrderValue = ref(1)

const calculations = computed(() => {
  const price = productPrice.value
  const sales = monthlySales.value
  const orderQty = averageOrderValue.value

  const monthlyRevenue = price * sales * orderQty
  const creatorhubFee = monthlyRevenue * 0.035
  const competitorFee = monthlyRevenue * 0.079
  const youKeep = monthlyRevenue - creatorhubFee
  const savings = competitorFee - creatorhubFee

  return {
    monthlyRevenue,
    creatorhubFee,
    competitorFee,
    youKeep,
    savings,
    yearlyRevenue: monthlyRevenue * 12,
    yearlySavings: savings * 12,
  }
})

const formatCurrency = (value) => {
  return `€${Math.round(value).toLocaleString('de-DE')}`
}
</script>

<template>
  <div class="revenue-calculator space-y-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <CopyBlock
        title-variant="title-section"
        description-variant="body-default"
        title="Berechne deine Einnahmen"
        description="Bewege die Regler und sieh sofort dein Sparpotential"
      />
    </div>

    <!-- Sliders -->
    <div class="space-y-6 bg-white rounded-2xl p-6 border-2 border-gray-200">
      <Slider
        v-model="productPrice"
        label="Produktpreis"
        :min="1"
        :max="10000"
        :step="5"
        unit="€"
        min-label="€1"
        max-label="10.000"
        color=""
      />

      <Slider
        v-model="monthlySales"
        label="Verkäufe pro Monat"
        :min="1"
        :max="1500"
        :step="1"
        min-label="1 Verkauf"
        max-label="1.500+ Verkäufe"
        color="blue"
      />

      <Slider
        v-model="averageOrderValue"
        label="Produkte pro Bestellung"
        :min="1"
        :max="5"
        :step="1"
        min-label="1 Produkt"
        max-label="5 Produkte"
        color="green"
      />
    </div>

    <!-- Results -->
    <div class="space-y-4">
      <!-- Monthly Revenue -->
      <div class="bg-primary-purple rounded-2xl p-6 text-white">
        <Text variant="title-section" color="text-white" class="opacity-90 mb-2">
          Monatlicher Umsatz
        </Text>
        <div class="flex justify-center items-baseline gap-2">
          <span class="display-small text-center">{{
            formatCurrency(calculations.monthlyRevenue)
          }}</span>
        </div>
        <div class="mt-4 pt-4 border-t border-white/20">
          <div class="flex items-center justify-between body-default">
            <span class="opacity-90">Du sparst mit Creatordoor</span>
            <span class="body-default-bold"
              >{{ formatCurrency(calculations.savings) }} pro Jahr</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
