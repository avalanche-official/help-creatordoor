import ProgressScreen from './ProgressScreen.vue'

export default {
  title: 'UI/ProgressScreen',
  component: ProgressScreen,
  tags: ['autodocs'],
}

// Money On The Move (Wise Style!)
export const MoneyOnTheMove = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="✈️"
        title="Your money's on the move"
        description="It should arrive in 4 hours. We'll let you know when it lands."
        primary-button="Track your transfer"
        @primary-click="() => alert('Track transfer')"
      />
    `,
  }),
}

// Processing Transfer
export const ProcessingTransfer = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="⏳"
        title="Processing your transfer"
        description="This usually takes a few minutes. We'll send you an email when it's done."
        primary-button="View details"
        @primary-click="() => alert('View details')"
      />
    `,
  }),
}

// Verifying Details
export const VerifyingDetails = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="🔍"
        title="Verifying your details"
        description="We're checking your information. This should only take a moment."
        primary-button="OK"
        @primary-click="() => alert('OK')"
      />
    `,
  }),
}

// Setting Up Account
export const SettingUpAccount = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="⚙️"
        title="Setting up your account"
        description="We're getting everything ready for you. This won't take long."
        primary-button="Continue"
        @primary-click="() => alert('Continue')"
      />
    `,
  }),
}

// Payment Being Processed
export const PaymentProcessing = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="💳"
        title="Processing your payment"
        description="Your payment is being processed. We'll notify you once it's complete."
        primary-button="View payment"
        secondary-button="Go to home"
        @primary-click="() => alert('View payment')"
        @secondary-click="() => alert('Go home')"
      />
    `,
  }),
}

// Card Being Delivered
export const CardDelivery = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="📦"
        title="Your card is on its way"
        description="Your Wise card should arrive in 5-7 business days. We'll send you tracking details."
        primary-button="Track delivery"
        @primary-click="() => alert('Track delivery')"
      />
    `,
  }),
}

// Conversion In Progress
export const ConversionInProgress = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="🔄"
        title="Converting your money"
        description="We're converting your GBP to EUR at the real exchange rate. Almost done!"
        primary-button="View conversion"
        @primary-click="() => alert('View conversion')"
      />
    `,
  }),
}

// Document Upload Processing
export const DocumentProcessing = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="📄"
        title="Processing your documents"
        description="We're reviewing your documents. This usually takes 1-2 business days."
        primary-button="OK"
        secondary-button="Upload more"
        @primary-click="() => alert('OK')"
        @secondary-click="() => alert('Upload more')"
      />
    `,
  }),
}

// Refund Being Processed
export const RefundProcessing = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="💰"
        title="Refund being processed"
        description="Your refund is on its way. It should arrive in your account within 3-5 business days."
        primary-button="View details"
        @primary-click="() => alert('View details')"
      />
    `,
  }),
}

// Almost There
export const AlmostThere = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="🎯"
        title="Almost there"
        description="We're finishing up. Just a few more seconds and you'll be all set."
        primary-button="Continue"
        @primary-click="() => alert('Continue')"
      />
    `,
  }),
}

// Sending Money
export const SendingMoney = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="💸"
        title="Sending your money"
        description="Your transfer to Jane Smith is being processed. It should arrive by tomorrow."
        primary-button="Track transfer"
        secondary-button="Send another"
        @primary-click="() => alert('Track')"
        @secondary-click="() => alert('Send another')"
      />
    `,
  }),
}

// Loading Balance
export const LoadingBalance = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="⏳"
        title="Loading your balance"
        description="We're updating your account information. This will just take a moment."
        primary-button="Refresh"
        @primary-click="() => alert('Refresh')"
      />
    `,
  }),
}

// Account Verification
export const AccountVerification = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="✓"
        title="Verifying your account"
        description="We're checking your details to keep your money safe. This usually takes a few minutes."
        primary-button="View status"
        @primary-click="() => alert('View status')"
      />
    `,
  }),
}

// Direct Debit Setup
export const DirectDebitSetup = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="📋"
        title="Setting up Direct Debit"
        description="We're setting up your Direct Debit. You'll be able to use it in 2-3 business days."
        primary-button="Done"
        @primary-click="() => alert('Done')"
      />
    `,
  }),
}

// Rate Lock Active
export const RateLockActive = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="🔒"
        title="Rate locked in"
        description="Your exchange rate is guaranteed for the next 48 hours. Complete your transfer to use it."
        primary-button="Continue transfer"
        @primary-click="() => alert('Continue')"
      />
    `,
  }),
}

// Mobile View
export const MobileView = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <div class="max-w-4xl mx-auto">
        <ProgressScreen
          illustration="✈️"
          title="Your money's on the move"
          description="It should arrive in 4 hours. We'll let you know when it lands."
          primary-button="Track your transfer"
          @primary-click="() => alert('Track transfer')"
        />
      </div>
    `,
  }),
}

// With Loading Spinner
export const WithLoadingSpinner = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="⏳"
        title="Processing"
        description="Please wait while we process your request. This won't take long."
      >
        <template #actions>
          <div class="flex justify-center">
            <div class="w-12 h-12 border-4 border-content-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        </template>
      </ProgressScreen>
    `,
  }),
}

// With Progress Bar
export const WithProgressBar = {
  render: () => ({
    components: { ProgressScreen },
    data() {
      return {
        progress: 0,
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10
        } else {
          clearInterval(this.interval)
        }
      }, 500)
    },
    beforeUnmount() {
      clearInterval(this.interval)
    },
    template: `
      <ProgressScreen
        illustration="📦"
        title="Uploading documents"
        description="Please wait while we upload your documents securely."
      >
        <template #actions>
          <div class="w-full">
            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                class="bg-content-accent h-3 rounded-full transition-all duration-300"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <p class="text-sm text-center text-content-secondary">{{ progress }}%</p>
          </div>
        </template>
      </ProgressScreen>
    `,
  }),
}

// Different Illustrations
export const DifferentIllustrations = {
  render: () => ({
    components: { ProgressScreen },
    data() {
      return {
        currentIndex: 0,
        screens: [
          {
            illustration: '✈️',
            title: "Money's on the move",
            desc: 'Your transfer is being processed.',
          },
          { illustration: '⏳', title: 'Please wait', desc: 'This will just take a moment.' },
          {
            illustration: '🔍',
            title: 'Verifying details',
            desc: 'Were checking your information.',
          },
          {
            illustration: '💳',
            title: 'Processing payment',
            desc: 'Your payment is being processed.',
          },
          { illustration: '📦', title: 'Card on the way', desc: 'Your card is being delivered.' },
          {
            illustration: '🔄',
            title: 'Converting money',
            desc: 'Converting at the real exchange rate.',
          },
        ],
      }
    },
    computed: {
      current() {
        return this.screens[this.currentIndex]
      },
    },
    template: `
      <div>
        <!-- Navigation -->
        <div class="fixed top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p class="text-xs font-semibold mb-2 text-content-secondary">Select Illustration:</p>
          <div class="flex flex-col gap-2">
            <button
              v-for="(screen, index) in screens"
              :key="index"
              @click="currentIndex = index"
              :class="[
                'px-3 py-2 text-sm rounded-lg text-left transition-colors',
                currentIndex === index
                  ? 'bg-content-accent text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              ]"
            >
              {{ screen.illustration }} {{ screen.title }}
            </button>
          </div>
        </div>

        <!-- Progress Screen -->
        <ProgressScreen
          :illustration="current.illustration"
          :title="current.title"
          :description="current.desc"
          primary-button="Primary action"
        />
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

// Custom Illustration
export const CustomIllustration = {
  render: () => ({
    components: { ProgressScreen },
    template: `
      <ProgressScreen
        illustration="🎉"
        title="Custom illustration"
        description="You can use any emoji or image URL as an illustration."
        primary-button="Got it"
        @primary-click="() => alert('Got it')"
      />
    `,
  }),
}
