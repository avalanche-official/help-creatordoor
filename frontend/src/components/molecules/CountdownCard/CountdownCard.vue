<!-- components/molecules/CountdownCard/CountdownCard.vue -->
<!-- ✅ Countdown Card - Matches StatsCard styling -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'clock',
  },
  label: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: '#7a7a85',
  },
  targetDate: {
    type: [String, Date],
    required: true,
  },
})

const timeRemaining = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const countdownEnded = ref(false)
let intervalId = null

const calculateTimeRemaining = () => {
  const now = new Date()
  const target = new Date(props.targetDate)
  const diff = target - now

  if (diff <= 0) {
    countdownEnded.value = true
    timeRemaining.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    if (intervalId) {
      clearInterval(intervalId)
    }
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  timeRemaining.value = { days, hours, minutes, seconds }
}

const countdownDisplay = computed(() => {
  if (countdownEnded.value) return 'Beendet!'

  const { days, hours, minutes, seconds } = timeRemaining.value
  const pad = (num) => String(num).padStart(2, '0')

  if (days > 0) {
    return `${days}d ${pad(hours)}h ${pad(minutes)}m`
  }
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
})

onMounted(() => {
  calculateTimeRemaining()
  intervalId = setInterval(calculateTimeRemaining, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="bg-stone-100 rounded-xl p-6 hover:bg-stone-200 transition-colors">
    <div class="flex items-start justify-between gap-4">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <Icon :name="icon" :size="24" color="" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- Label -->
        <Text variant="body-large" color="content-secondary" class="mb-2">
          {{ label }}
        </Text>

        <!-- Countdown Display -->
        <Text
          variant="title-section"
          :color="countdownEnded ? 'content-error' : 'content-primary'"
          class="font-mono"
        >
          {{ countdownDisplay }}
        </Text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: 'Courier New', Courier, monospace;
  font-variant-numeric: tabular-nums;
}
</style>
