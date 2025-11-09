<!-- components/molecules/ButtonWithTimer/ButtonWithTimer.vue -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'secondary',
  },
  size: {
    type: String,
    default: 'large',
  },
  initialText: {
    type: String,
    required: true,
  },
  timerText: {
    type: String,
    default: 'Erneut senden in {seconds}s',
  },
  countdownSeconds: {
    type: Number,
    default: 60,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  autoStart: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'countdown-complete'])

const secondsRemaining = ref(0)
const isCountingDown = ref(false)
let intervalId = null

const isDisabled = computed(() => {
  return props.loading || isCountingDown.value
})

const buttonText = computed(() => {
  if (props.loading) {
    return 'Wird gesendet...'
  }
  if (isCountingDown.value) {
    return props.timerText.replace('{seconds}', secondsRemaining.value)
  }
  return props.initialText
})

const startCountdown = () => {
  isCountingDown.value = true
  secondsRemaining.value = props.countdownSeconds

  intervalId = setInterval(() => {
    secondsRemaining.value--

    if (secondsRemaining.value <= 0) {
      stopCountdown()
      emit('countdown-complete')
    }
  }, 1000)
}

const stopCountdown = () => {
  isCountingDown.value = false
  secondsRemaining.value = 0
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const handleClick = () => {
  if (!isDisabled.value) {
    emit('click')
    startCountdown()
  }
}

onMounted(() => {
  if (props.autoStart) {
    startCountdown()
  }
})

onUnmounted(() => {
  stopCountdown()
})

// Expose methods for parent components
defineExpose({
  startCountdown,
  stopCountdown,
})
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :disabled="isDisabled"
    :loading="loading"
    @click="handleClick"
    class="w-full"
  >
    {{ buttonText }}
  </Button>
</template>
