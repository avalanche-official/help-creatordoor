<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-[99999] p-2"
      @click="$emit('close')"
    >
      <!-- Confetti Animation -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          v-for="piece in confettiPieces"
          :key="piece.id"
          class="absolute w-2 h-2 rounded-full animate-bounce"
          :style="{
            left: piece.left + '%',
            backgroundColor: piece.color,
            animationDelay: piece.delay + 's',
            animationDuration: piece.duration + 's',
            transform: `translateY(-100vh)`,
            animation: `confetti-fall ${piece.duration}s ${piece.delay}s ease-out forwards`,
          }"
        />
      </div>

      <!-- Success Modal -->
      <div
        class="bg-white rounded-3xl max-w-lg w-full mx-4 relative shadow-2xl overflow-hidden"
        @click.stop
      >
        <!-- Header with Celebration -->
        <div class="text-center p-8 pb-6">
          <!-- Success Icon with Theme Color -->
          <div
            class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            :style="{ backgroundColor: themeColor }"
          >
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <!-- Title -->
          <h2 class="text-3xl font-black text-neutral-900 mb-2">
            {{ $t('payment.success_title') }}
          </h2>

          <!-- Subtitle -->
          <p class="text-neutral-600 text-lg mb-6">
            {{ $t('payment.success_subtitle') }}
          </p>
        </div>

        <!-- Product Info -->
        <div class="px-8 pb-6">
          <div class="bg-neutral-50 rounded-2xl p-6 mb-6">
            <h3 class="font-semibold text-neutral-900 mb-2">{{ productTitle }}</h3>
            <p class="text-sm text-neutral-600">
              {{ $t('payment.download_link_sent', { email: customerEmail }) }}
            </p>
          </div>

          <!-- Download Status -->
          <div
            v-if="downloadStarted"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3"
                />
              </svg>
              <span class="text-green-800 font-medium">{{ $t('payment.download_started') }}</span>
            </div>
          </div>

          <!-- Download Button -->
          <button
            @click="handleDownload"
            class="w-full text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-105 transform duration-200 mb-4 flex items-center justify-center space-x-2"
            :style="{ backgroundColor: themeColor }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>{{
              downloadStarted ? $t('payment.download_again') : $t('payment.download_now')
            }}</span>
          </button>

          <!-- Alternative Actions -->
          <div class="text-center space-y-2">
            <p class="text-xs text-neutral-500">
              {{ $t('payment.check_email_hint') }}
            </p>
            <button
              @click="$emit('close')"
              class="text-neutral-400 hover:text-neutral-600 text-sm transition-colors"
            >
              {{ $t('payment.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n' // 👈 Add this import

const { t } = useI18n() // 👈 Get translation function

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  productTitle: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  downloadUrl: {
    type: String,
    required: true,
  },
  themeColor: {
    type: String,
    default: '#000000',
  },
})

const emit = defineEmits(['close', 'download'])

const confettiPieces = ref([])
const downloadStarted = ref(false)

// Generate confetti animation
const generateConfetti = () => {
  const pieces = []
  for (let i = 0; i < 50; i++) {
    pieces.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][
        Math.floor(Math.random() * 6)
      ],
    })
  }
  confettiPieces.value = pieces
}

// Handle download
const handleDownload = () => {
  if (props.downloadUrl) {
    // Create download link
    const link = document.createElement('a')
    link.href = props.downloadUrl
    link.download = props.productTitle || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    downloadStarted.value = true
    emit('download')
  }
}

// Auto-download after modal opens
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      generateConfetti()

      // Auto-start download after 1.5 seconds
      setTimeout(() => {
        handleDownload()
      }, 1500)
    }
  },
)

// Prevent body scroll when modal is open
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {
  // Cleanup on unmount
  return () => {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
@keyframes confetti-fall {
  from {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

/* Ensure modal appears above everything */
.z-\[99999\] {
  z-index: 99999;
}
</style>
