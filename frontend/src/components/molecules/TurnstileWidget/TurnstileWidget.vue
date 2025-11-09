<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  siteKey: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['verified', 'error', 'expired'])

const turnstileToken = ref(null)

const handleTurnstileVerify = (event) => {
  turnstileToken.value = event.detail
  emit('verified', event.detail)
}

const handleTurnstileError = (event) => {
  emit('error', event.detail)
}

const handleTurnstileExpired = (event) => {
  turnstileToken.value = null
  emit('expired', event.detail)
}

onMounted(() => {
  window.addEventListener('turnstile-verified', handleTurnstileVerify)
  window.addEventListener('turnstile-error', handleTurnstileError)
  window.addEventListener('turnstile-expired', handleTurnstileExpired)
})

onUnmounted(() => {
  window.removeEventListener('turnstile-verified', handleTurnstileVerify)
  window.removeEventListener('turnstile-error', handleTurnstileError)
  window.removeEventListener('turnstile-expired', handleTurnstileExpired)
})
</script>

<template>
  <div class="flex justify-center py-4">
    <div
      class="cf-turnstile"
      :data-sitekey="siteKey"
      data-callback="onTurnstileVerify"
      data-error-callback="onTurnstileError"
      data-expired-callback="onTurnstileExpired"
    ></div>
  </div>
</template>

<script>
// Global callback functions for Turnstile
window.onTurnstileVerify = function (token) {
  const event = new CustomEvent('turnstile-verified', { detail: token })
  window.dispatchEvent(event)
}

window.onTurnstileError = function (error) {
  const event = new CustomEvent('turnstile-error', { detail: error })
  window.dispatchEvent(event)
}

window.onTurnstileExpired = function () {
  const event = new CustomEvent('turnstile-expired')
  window.dispatchEvent(event)
}
</script>
