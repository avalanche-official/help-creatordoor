<!-- components/organisms/EarningsChart/EarningsChart.vue -->
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import Text from '@/components/atoms/Text/Text.vue'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const props = defineProps({
  data: {
    type: Array,
    required: true,
    // Example: [{ date: '2025-10-30', earnings: 50.00 }, ...]
  },
  title: {
    type: String,
    default: 'Umsatzentwicklung',
  },
  lineColor: {
    type: String,
    default: '#8b5cf6', // purple
  },
})

// Format date for chart labels
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
  })
}

// Sort data by date (oldest first for chart)
const sortedData = computed(() => {
  return [...props.data].sort((a, b) => new Date(a.date) - new Date(b.date))
})

// Chart data
const chartData = computed(() => {
  return {
    labels: sortedData.value.map((d) => formatDate(d.date)),
    datasets: [
      {
        label: 'Einnahmen (CHF)',
        data: sortedData.value.map((d) => d.earnings),
        borderColor: props.lineColor,
        backgroundColor: `${props.lineColor}33`, // 20% opacity
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: props.lineColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
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
      display: false,
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function (context) {
          return `CHF ${context.parsed.y.toFixed(2)}`
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        callback: function (value) {
          return `CHF ${value}`
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}
</script>

<template>
  <div class="space-y-4">
    <div class="px-2 sm:px-4">
      <Text variant="body-default-bold" color="content-secondary">{{ title }}</Text>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 p-6">
      <div class="h-80">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
