<!-- src/components/atoms/Turnstile/Turnstile.vue -->
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  siteKey: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    default: 'light', // 'light', 'dark', 'auto'
  },
  size: {
    type: String,
    default: 'normal', // 'normal', 'compact'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['verify', 'error', 'expire'])

const turnstileContainer = ref(null)
const widgetId = ref(null)
const isLoaded = ref(false)

// Handle verification success
const handleVerify = (token) => {
  console.log('✅ Turnstile verified:', token)
  emit('verify', token)
}

// Handle verification error
const handleError = (error) => {
  console.error('❌ Turnstile error:', error)
  emit('error', error)
}

// Handle token expiration
const handleExpire = () => {
  console.log('⏰ Turnstile token expired')
  emit('expire')
}

// Initialize Turnstile widget
const initTurnstile = () => {
  if (!window.turnstile || !turnstileContainer.value || widgetId.value !== null) {
    return
  }

  try {
    widgetId.value = window.turnstile.render(turnstileContainer.value, {
      sitekey: props.siteKey,
      theme: props.theme,
      size: props.size,
      callback: handleVerify,
      'error-callback': handleError,
      'expired-callback': handleExpire,
    })
    isLoaded.value = true
    console.log('✅ Turnstile widget initialized:', widgetId.value)
  } catch (error) {
    console.error('❌ Failed to initialize Turnstile:', error)
  }
}

// Reset Turnstile widget
const reset = () => {
  if (window.turnstile && widgetId.value !== null) {
    try {
      window.turnstile.reset(widgetId.value)
      console.log('🔄 Turnstile widget reset')
    } catch (error) {
      console.error('❌ Failed to reset Turnstile:', error)
    }
  }
}

// Remove Turnstile widget
const remove = () => {
  if (window.turnstile && widgetId.value !== null) {
    try {
      window.turnstile.remove(widgetId.value)
      widgetId.value = null
      isLoaded.value = false
      console.log('🗑️ Turnstile widget removed')
    } catch (error) {
      console.error('❌ Failed to remove Turnstile:', error)
    }
  }
}

// Wait for Turnstile script to load
const waitForTurnstile = () => {
  const checkInterval = setInterval(() => {
    if (window.turnstile) {
      clearInterval(checkInterval)
      initTurnstile()
    }
  }, 100)

  // Timeout after 10 seconds
  setTimeout(() => {
    clearInterval(checkInterval)
    if (!window.turnstile) {
      console.error('❌ Turnstile script failed to load')
      handleError('Failed to load Turnstile')
    }
  }, 10000)
}

// Watch for disabled state changes
watch(
  () => props.disabled,
  (newDisabled) => {
    if (newDisabled) {
      remove()
    } else if (!isLoaded.value) {
      waitForTurnstile()
    }
  },
)

onMounted(() => {
  if (!props.disabled) {
    if (window.turnstile) {
      initTurnstile()
    } else {
      waitForTurnstile()
    }
  }
})

onUnmounted(() => {
  remove()
})

// Expose reset method to parent
defineExpose({
  reset,
  remove,
})
</script>

<template>
  <div ref="turnstileContainer" class="turnstile-container"></div>
</template>

<style scoped>
.turnstile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65px;
}
</style>
