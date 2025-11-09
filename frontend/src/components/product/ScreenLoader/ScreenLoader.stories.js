import ScreenLoader from './ScreenLoader.vue'

export default {
  title: 'UI/ScreenLoader',
  component: ScreenLoader,
  tags: ['autodocs'],
}

// Basic Screen Loader
export const Basic = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      showLoader() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 3000)
      },
    },
    template: `
      <div>
        <button
          @click="showLoader"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Show Loader (3 seconds)
        </button>

        <ScreenLoader :show="loading" />
      </div>
    `,
  }),
}

// With Loading Text
export const WithText = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      sendMoney() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 3000)
      },
    },
    template: `
      <div>
        <button
          @click="sendMoney"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Send Money
        </button>

        <ScreenLoader :show="loading" text="Sending your transfer..." />
      </div>
    `,
  }),
}

// Different Sizes
export const Sizes = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loadingSmall: false,
        loadingMedium: false,
        loadingLarge: false,
      }
    },
    methods: {
      showSmall() {
        this.loadingSmall = true
        window.setTimeout(() => {
          this.loadingSmall = false
        }, 2000)
      },
      showMedium() {
        this.loadingMedium = true
        window.setTimeout(() => {
          this.loadingMedium = false
        }, 2000)
      },
      showLarge() {
        this.loadingLarge = true
        window.setTimeout(() => {
          this.loadingLarge = false
        }, 2000)
      },
    },
    template: `
      <div class="flex gap-4">
        <button
          @click="showSmall"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Small
        </button>

        <button
          @click="showMedium"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Medium
        </button>

        <button
          @click="showLarge"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Large
        </button>

        <ScreenLoader :show="loadingSmall" size="small" text="Small loader" />
        <ScreenLoader :show="loadingMedium" size="medium" text="Medium loader" />
        <ScreenLoader :show="loadingLarge" size="large" text="Large loader" />
      </div>
    `,
  }),
}

// Money Transfer Flow (Wise Style!)
export const MoneyTransferFlow = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
        loadingText: '',
        step: 0,
      }
    },
    methods: {
      startTransfer() {
        this.step = 1
        this.loading = true
        this.loadingText = 'Verifying recipient...'

        window.setTimeout(() => {
          this.step = 2
          this.loadingText = 'Processing payment...'
        }, 2000)

        window.setTimeout(() => {
          this.step = 3
          this.loadingText = 'Sending your transfer...'
        }, 4000)

        window.setTimeout(() => {
          this.loading = false
          this.step = 4
        }, 6000)
      },
    },
    template: `
      <div>
        <div v-if="!loading && step === 0" class="text-center">
          <button
            @click="startTransfer"
            class="px-6 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Send £500.00 to Jane Smith
          </button>
        </div>

        <div v-if="step === 4" class="text-center">
          <div class="text-6xl mb-4">✓</div>
          <h2 class="text-2xl font-semibold text-content-positive mb-2">Transfer sent!</h2>
          <p class="text-content-secondary">Your money is on its way</p>
        </div>

        <ScreenLoader :show="loading" :text="loadingText" />
      </div>
    `,
  }),
}

// Verification Loading
export const VerificationLoading = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      verify() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 4000)
      },
    },
    template: `
      <div>
        <button
          @click="verify"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Verify Identity
        </button>

        <ScreenLoader :show="loading" text="Verifying your identity..." />
      </div>
    `,
  }),
}

// Document Upload Loading
export const DocumentUploadLoading = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      upload() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 3000)
      },
    },
    template: `
      <div>
        <button
          @click="upload"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Upload Document
        </button>

        <ScreenLoader :show="loading" text="Uploading your document..." />
      </div>
    `,
  }),
}

// Account Setup Loading
export const AccountSetupLoading = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      createAccount() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 3000)
      },
    },
    template: `
      <div>
        <button
          @click="createAccount"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Create Account
        </button>

        <ScreenLoader :show="loading" text="Setting up your account..." />
      </div>
    `,
  }),
}

// Multi-Step Process
export const MultiStepProcess = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
        currentStep: 0,
        steps: [
          'Checking your details...',
          'Verifying your account...',
          'Processing payment...',
          'Almost there...',
          'Finalizing...',
        ],
      }
    },
    methods: {
      startProcess() {
        this.loading = true
        this.currentStep = 0

        const interval = window.setInterval(() => {
          this.currentStep++
          if (this.currentStep >= this.steps.length) {
            window.clearInterval(interval)
            this.loading = false
            this.currentStep = 0
          }
        }, 1500)
      },
    },
    computed: {
      currentStepText() {
        return this.steps[this.currentStep] || ''
      },
    },
    template: `
      <div>
        <button
          @click="startProcess"
          class="px-6 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
        >
          Start Multi-Step Process
        </button>

        <ScreenLoader :show="loading" :text="currentStepText" />
      </div>
    `,
  }),
}

// Simple Loading (No Text)
export const SimpleLoading = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      load() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 2000)
      },
    },
    template: `
      <div>
        <button
          @click="load"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Load Page
        </button>

        <ScreenLoader :show="loading" />
      </div>
    `,
  }),
}

// Currency Conversion Loading
export const CurrencyConversionLoading = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      convert() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 2000)
      },
    },
    template: `
      <div>
        <button
          @click="convert"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Convert Currency
        </button>

        <ScreenLoader :show="loading" text="Converting your balance..." />
      </div>
    `,
  }),
}

// Long Running Task
export const LongRunningTask = {
  render: () => ({
    components: { ScreenLoader },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      generate() {
        this.loading = true
        window.setTimeout(() => {
          this.loading = false
        }, 8000)
      },
    },
    template: `
      <div>
        <button
          @click="generate"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Generate Statement (8 seconds)
        </button>

        <ScreenLoader :show="loading" text="Generating your statement..." />
      </div>
    `,
  }),
}
