import ProgressBar from './ProgressBar.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
}

// Basic Indeterminate
export const Indeterminate = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div class="p-8 space-y-6">
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Indeterminate (unknown duration)</p>
          <ProgressBar type="indeterminate" />
        </div>
        <p class="text-xs text-content-secondary">
          Used when loading time is unknown. Shows continuous animation.
        </p>
      </div>
    `,
  }),
}

// Determinate Progress
export const Determinate = {
  render: () => ({
    components: { ProgressBar },
    data() {
      return {
        progress: 0,
        interval: null,
      }
    },
    mounted() {
      this.startProgress()
    },
    beforeUnmount() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    methods: {
      startProgress() {
        this.progress = 0
        this.interval = setInterval(() => {
          if (this.progress >= 100) {
            this.progress = 0
          } else {
            this.progress += 2
          }
        }, 50)
      },
    },
    template: `
      <div class="p-8 space-y-6">
        <div>
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-content-primary">Determinate (0-100%)</p>
            <p class="text-sm font-mono text-content-secondary">{{ progress }}%</p>
          </div>
          <ProgressBar type="determinate" :value="progress" />
        </div>
        <p class="text-xs text-content-secondary">
          Used when progress is known. Animates from 0-100%.
        </p>
      </div>
    `,
  }),
}

// Light vs Dark Mode
export const ThemeComparison = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div class="p-8 space-y-8">
        <!-- Light mode (default) -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Light mode (Tapestry 05)</p>
          <ProgressBar type="indeterminate" theme="light" />
        </div>

        <!-- Dark mode -->
        <div class="bg-[#171717] p-6 rounded-lg">
          <p class="text-sm font-medium text-white mb-3">Dark mode (Tapestry 08)</p>
          <ProgressBar type="indeterminate" theme="dark" />
        </div>
      </div>
    `,
  }),
}

// Size Variants
export const Sizes = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div class="p-8 space-y-6">
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Small (2px height)</p>
          <ProgressBar type="indeterminate" size="sm" />
        </div>

        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Medium (4px height - default)</p>
          <ProgressBar type="indeterminate" size="md" />
        </div>
      </div>
    `,
  }),
}

// Top of Page (Full Width)
export const TopOfPage = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div class="min-h-screen bg-background-surface">
        <!-- Fixed at top -->
        <div class="fixed top-0 left-0 right-0 z-50">
          <ProgressBar type="indeterminate" />
        </div>

        <!-- Page content -->
        <div class="pt-8 p-8">
          <h1 class="text-3xl font-bold text-content-primary mb-4">Loading page content...</h1>
          <p class="text-content-secondary">
            Progress bar at the top indicates the page is loading.
          </p>
        </div>
      </div>
    `,
  }),
}

// Inside Card/Container
export const InsideContainer = {
  render: () => ({
    components: { ProgressBar, Card },
    template: `
      <div class="p-8">
        <Card>
          <!-- Progress bar at top of card -->
          <ProgressBar type="indeterminate" />

          <div class="pt-6">
            <h3 class="text-lg font-semibold text-content-primary mb-2">
              Processing your transaction
            </h3>
            <p class="text-sm text-content-secondary">
              Please wait while we verify your payment...
            </p>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Bottom Sheet Style
export const BottomSheet = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div class="p-8 flex items-end justify-center" style="min-height: 400px;">
        <!-- Bottom sheet -->
        <div class="w-full max-w-md bg-white rounded-t-3xl shadow-xl overflow-hidden">
          <!-- Progress bar centered at top -->
          <div class="flex justify-center pt-4 px-4">
            <div class="w-24">
              <ProgressBar type="indeterminate" />
            </div>
          </div>

          <!-- Sheet content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-content-primary mb-2 text-center">
              Uploading documents
            </h3>
            <p class="text-sm text-content-secondary text-center">
              Please don't close this screen
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}

// Upload Flow (Determinate)
export const UploadFlow = {
  render: () => ({
    components: { ProgressBar, Card },
    data() {
      return {
        uploading: false,
        progress: 0,
        interval: null,
      }
    },
    methods: {
      startUpload() {
        this.uploading = true
        this.progress = 0
        this.interval = setInterval(() => {
          if (this.progress >= 100) {
            clearInterval(this.interval)
            setTimeout(() => {
              this.uploading = false
              this.progress = 0
            }, 500)
          } else {
            this.progress += 5
          }
        }, 100)
      },
    },
    template: `
      <div class="p-8">
        <Card>
          <!-- Progress bar (only visible when uploading) -->
          <transition name="fade">
            <div v-if="uploading">
              <ProgressBar type="determinate" :value="progress" />
            </div>
          </transition>

          <div :class="uploading ? 'pt-6' : ''">
            <h3 class="text-lg font-semibold text-content-primary mb-2">
              Upload your document
            </h3>
            <p class="text-sm text-content-secondary mb-4">
              {{ uploading ? 'Uploading... ' + progress + '%' : 'Ready to upload' }}
            </p>

            <button
              @click="startUpload"
              :disabled="uploading"
              class="px-4 py-2 bg-content-accent text-white rounded-lg font-medium hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ uploading ? 'Uploading...' : 'Start Upload' }}
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Loading States Timeline (Wise Design System Spec)
export const LoadingTimeline = {
  render: () => ({
    components: { ProgressBar },
    data() {
      return {
        stage: 'idle', // idle, fast, indeterminate, known, done
        progress: 0,
      }
    },
    methods: {
      startSequence() {
        this.stage = 'idle'
        this.progress = 0

        // Stage 1: Show determinate for 700ms
        setTimeout(() => {
          this.stage = 'fast'
          this.animateFastProgress()
        }, 200)

        // Stage 2: Switch to indeterminate at 700ms
        setTimeout(() => {
          this.stage = 'indeterminate'
        }, 900)

        // Stage 3: Content becomes known, show determinate
        setTimeout(() => {
          this.stage = 'known'
          this.progress = 50
          this.animateKnownProgress()
        }, 3000)

        // Stage 4: Complete
        setTimeout(() => {
          this.stage = 'done'
          this.progress = 100
        }, 4500)
      },
      animateFastProgress() {
        const interval = setInterval(() => {
          if (this.progress >= 30 || this.stage !== 'fast') {
            clearInterval(interval)
          } else {
            this.progress += 10
          }
        }, 100)
      },
      animateKnownProgress() {
        const interval = setInterval(() => {
          if (this.progress >= 100 || this.stage === 'done') {
            clearInterval(interval)
          } else {
            this.progress += 10
          }
        }, 100)
      },
    },
    template: `
      <div class="p-8 space-y-6">
        <div>
          <div class="mb-4">
            <p class="text-sm font-medium text-content-primary mb-2">
              Wise Loading Timeline (as per design system)
            </p>
            <p class="text-xs text-content-secondary mb-3">
              Current stage: <strong>{{ stage }}</strong>
            </p>
          </div>

          <!-- Progress bar -->
          <ProgressBar
            :type="stage === 'fast' || stage === 'known' || stage === 'done' ? 'determinate' : 'indeterminate'"
            :value="progress"
          />

          <!-- Stage explanation -->
          <div class="mt-4 p-4 bg-background-elevated rounded-lg">
            <p class="text-xs text-content-secondary">
              <span v-if="stage === 'idle'">
                ⏱️ Waiting to start...
              </span>
              <span v-else-if="stage === 'fast'">
                🏃 0-700ms: Determinate bar shown for fast actions
              </span>
              <span v-else-if="stage === 'indeterminate'">
                🔄 700ms+: Switched to indeterminate (unknown duration)
              </span>
              <span v-else-if="stage === 'known'">
                ✅ Content known: Back to determinate, animating to 100%
              </span>
              <span v-else-if="stage === 'done'">
                🎉 Complete!
              </span>
            </p>
          </div>

          <button
            @click="startSequence"
            class="mt-4 px-4 py-2 bg-content-accent text-white rounded-lg font-medium hover:bg-accent-hover"
          >
            Run Timeline Demo
          </button>
        </div>
      </div>
    `,
  }),
}

// Sending Money (Stressful Task)
export const SendingMoney = {
  render: () => ({
    components: { ProgressBar, Card },
    data() {
      return {
        sending: false,
        stage: 'preparing', // preparing, verifying, processing, complete
        progress: 0,
      }
    },
    methods: {
      async sendMoney() {
        this.sending = true
        this.stage = 'preparing'
        this.progress = 0

        // Stage 1: Preparing (0-33%)
        await this.animateToProgress(33, 1000)
        this.stage = 'verifying'

        // Stage 2: Verifying (33-66%)
        await this.animateToProgress(66, 1500)
        this.stage = 'processing'

        // Stage 3: Processing (66-100%)
        await this.animateToProgress(100, 1000)
        this.stage = 'complete'

        // Reset after showing success
        setTimeout(() => {
          this.sending = false
          this.progress = 0
          this.stage = 'preparing'
        }, 2000)
      },
      animateToProgress(target, duration) {
        return new Promise((resolve) => {
          const start = this.progress
          const diff = target - start
          const steps = duration / 50
          const increment = diff / steps
          let current = 0

          const interval = setInterval(() => {
            current++
            this.progress = Math.min(start + increment * current, target)

            if (current >= steps) {
              clearInterval(interval)
              resolve()
            }
          }, 50)
        })
      },
    },
    computed: {
      stageMessage() {
        const messages = {
          preparing: 'Preparing your transfer...',
          verifying: 'Verifying recipient details...',
          processing: 'Processing payment...',
          complete: 'Money sent successfully! 🎉',
        }
        return messages[this.stage]
      },
    },
    template: `
      <div class="p-8">
        <Card>
          <transition name="fade">
            <div v-if="sending">
              <ProgressBar type="determinate" :value="progress" />
            </div>
          </transition>

          <div :class="sending ? 'pt-6' : ''">
            <h3 class="text-lg font-semibold text-content-primary mb-2">
              Send money to John Doe
            </h3>
            <p class="text-sm text-content-secondary mb-4">
              {{ sending ? stageMessage : 'Amount: $500.00 USD' }}
            </p>

            <button
              @click="sendMoney"
              :disabled="sending"
              class="px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {{ sending ? 'Sending...' : 'Send Money' }}
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Poor Connection Warning (5000ms+)
export const PoorConnectionWarning = {
  render: () => ({
    components: { ProgressBar },
    data() {
      return {
        loading: false,
        showWarning: false,
      }
    },
    methods: {
      startLoading() {
        this.loading = true
        this.showWarning = false

        // Show warning after 5000ms
        setTimeout(() => {
          if (this.loading) {
            this.showWarning = true
          }
        }, 5000)
      },
      stopLoading() {
        this.loading = false
        this.showWarning = false
      },
    },
    template: `
      <div class="p-8 space-y-4">
        <div>
          <ProgressBar v-if="loading" type="indeterminate" />
        </div>

        <!-- Warning message (appears after 5000ms) -->
        <transition name="fade">
          <div v-if="showWarning" class="p-4 bg-content-warning/10 border border-content-warning/20 rounded-lg">
            <p class="text-sm text-content-warning">
              ⚠️ This is taking longer than usual. Please check your connection.
            </p>
          </div>
        </transition>

        <div class="flex gap-3">
          <button
            @click="startLoading"
            :disabled="loading"
            class="px-4 py-2 bg-content-accent text-white rounded-lg font-medium hover:bg-accent-hover disabled:opacity-50"
          >
            Start Loading
          </button>
          <button
            @click="stopLoading"
            :disabled="!loading"
            class="px-4 py-2 bg-white border border-border-default text-content-primary rounded-lg font-medium hover:bg-background-elevated disabled:opacity-50"
          >
            Stop
          </button>
        </div>

        <p class="text-xs text-content-secondary">
          Wait 5 seconds to see the poor connection warning
        </p>
      </div>
    `,
  }),
}
