<!-- components/organisms/PaymentMethodsChart/PaymentMethodsChart.vue -->
<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import Text from '@/components/atoms/Text/Text.vue'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title)

const props = defineProps({
  paymentMethods: {
    type: Array,
    required: true,
    // Example: [{ type: 'card', name: 'Karte', count: 25, totalAmount: 500.00 }, ...]
  },
  title: {
    type: String,
    default: 'Beliebteste Zahlungsmethoden',
  },
})

// Payment method colors and icons
const paymentMethodConfig = {
  card: { color: '#8b5cf6', icon: '💳' },
  paypal: { color: '#0070ba', icon: '🅿️' },
  apple_pay: { color: '#000000', icon: '🍎' },
  google_pay: { color: '#4285f4', icon: '🔵' },
  klarna: { color: '#ffb3c7', icon: '🔷' },
  sepa_debit: { color: '#003399', icon: '🇪🇺' },
  alipay: { color: '#1677ff', icon: '🇨🇳' },
  wechat_pay: { color: '#09b83e', icon: '💬' },
  bank_account: { color: '#6b7280', icon: '🏦' },
  giropay: { color: '#002a7f', icon: '🇩🇪' },
  ideal: { color: '#cc0066', icon: '🇳🇱' },
  sofort: { color: '#ee7023', icon: '🔐' },
  afterpay: { color: '#b2fce4', icon: '⬛' },
  default: { color: '#9ca3af', icon: '💵' },
}

// Get config for payment method
const getMethodConfig = (type) => {
  return paymentMethodConfig[type] || paymentMethodConfig.default
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

// Sort by count (most popular first)
const sortedMethods = computed(() => {
  return [...props.paymentMethods].sort((a, b) => b.count - a.count)
})

// Chart data
const chartData = computed(() => {
  return {
    labels: sortedMethods.value.map((m) => m.name),
    datasets: [
      {
        label: 'Zahlungen',
        data: sortedMethods.value.map((m) => m.count),
        backgroundColor: sortedMethods.value.map((m) => getMethodConfig(m.type).color),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  }
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        padding: 15,
        font: {
          size: 12,
        },
        generateLabels: (chart) => {
          const data = chart.data
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              const count = data.datasets[0].data[i]
              const total = data.datasets[0].data.reduce((a, b) => a + b, 0)
              const percentage = ((count / total) * 100).toFixed(1)
              return {
                text: `${label} (${percentage}%)`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i,
              }
            })
          }
          return []
        },
      },
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      callbacks: {
        label: function (context) {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${label}: ${value} Zahlungen (${percentage}%)`
        },
      },
    },
  },
}

// Calculate total
const totalTransactions = computed(() => {
  return sortedMethods.value.reduce((sum, m) => sum + m.count, 0)
})

const totalAmount = computed(() => {
  return sortedMethods.value.reduce((sum, m) => sum + m.totalAmount, 0)
})
</script>

<template>
  <div class="space-y-4">
    <div class="px-2 sm:px-4">
      <Text variant="body-default-bold" color="content-secondary">{{ title }}</Text>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 p-6">
      <!-- Summary Stats -->
      <div class="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-stone-200">
        <div>
          <Text variant="body-default" color="content-secondary" class="mb-1">
            Gesamt Zahlungen
          </Text>
          <Text variant="title-body" class="text-2xl font-bold">
            {{ totalTransactions }}
          </Text>
        </div>
        <div>
          <Text variant="body-default" color="content-secondary" class="mb-1"> Gesamt Betrag </Text>
          <Text variant="title-body" class="text-2xl font-bold">
            CHF {{ formatCurrency(totalAmount) }}
          </Text>
        </div>
      </div>

      <!-- Chart -->
      <div class="h-80 mb-6">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <!-- Detailed List -->
      <div class="space-y-3">
        <Text variant="body-default-bold" color="content-secondary" class="px-2"> Details </Text>
        <div class="space-y-2">
          <div
            v-for="method in sortedMethods"
            :key="method.type"
            class="flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ getMethodConfig(method.type).icon }}</span>
              <div>
                <Text variant="body-default-bold">{{ method.name }}</Text>
                <Text variant="body-default" color="content-secondary">
                  {{ method.count }} {{ method.count === 1 ? 'Zahlung' : 'Zahlungen' }}
                </Text>
              </div>
            </div>
            <div class="text-right">
              <Text variant="body-default-bold">CHF {{ formatCurrency(method.totalAmount) }}</Text>
              <Text variant="body-default" color="content-secondary">
                {{ ((method.count / totalTransactions) * 100).toFixed(1) }}%
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
