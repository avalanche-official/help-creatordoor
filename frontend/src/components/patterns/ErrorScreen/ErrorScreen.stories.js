import ErrorScreen from './ErrorScreen.vue'

export default {
  title: 'UI/ErrorScreen',
  component: ErrorScreen,
  tags: ['autodocs'],
}

// Email Already In Use (Wise Style!)
export const EmailAlreadyInUse = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="exclamation"
        title="This email address is already in use"
        description="An account already exists with the email address sophie.beck@wise.com."
        primary-button="OK"
        @primary-click="() => alert('OK clicked')"
      />
    `,
  }),
}

// Page Not Found
export const PageNotFound = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="magnifying"
        title="Page not found"
        description="We couldn't find the page you're looking for. It might have been moved or deleted."
        primary-button="Go to home"
        secondary-button="Contact support"
        @primary-click="() => alert('Go home')"
        @secondary-click="() => alert('Contact support')"
      />
    `,
  }),
}

// No Internet Connection
export const NoInternetConnection = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="plug"
        title="No internet connection"
        description="Check your connection and try again. Your money is safe."
        primary-button="Try again"
        @primary-click="() => alert('Try again')"
      />
    `,
  }),
}

// Technical Issues
export const TechnicalIssues = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="tool"
        title="We're experiencing technical issues"
        description="We're working to fix this. Your money is safe. Try again in a few minutes."
        primary-button="Try again"
        secondary-button="Contact support"
        @primary-click="() => alert('Try again')"
        @secondary-click="() => alert('Contact support')"
      />
    `,
  }),
}

// Access Denied
export const AccessDenied = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="construction"
        title="You can't access this feature"
        description="This feature is only available for business accounts. Upgrade to access it."
        primary-button="Upgrade account"
        secondary-button="Learn more"
        @primary-click="() => alert('Upgrade')"
        @secondary-click="() => alert('Learn more')"
      />
    `,
  }),
}

// Feature Not Ready
export const FeatureNotReady = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="timer"
        title="This feature isn't ready yet"
        description="We're working on it. Check back soon to see what's new."
        primary-button="Go back"
        @primary-click="() => alert('Go back')"
      />
    `,
  }),
}

// Account Suspended
export const AccountSuspended = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="exclamation"
        title="Your account has been suspended"
        description="We've suspended your account due to suspicious activity. Contact support to resolve this."
        primary-button="Contact support"
        @primary-click="() => alert('Contact support')"
      />
    `,
  }),
}

// Transfer Failed
export const TransferFailed = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="exclamation"
        title="Transfer failed"
        description="We couldn't complete your transfer. Your money is safe in your account."
        primary-button="Try again"
        secondary-button="Go to home"
        @primary-click="() => alert('Try again')"
        @secondary-click="() => alert('Go home')"
      />
    `,
  }),
}

// Service Unavailable
export const ServiceUnavailable = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="tool"
        title="Service temporarily unavailable"
        description="We're performing scheduled maintenance. Your money is safe. Try again in 30 minutes."
        primary-button="Go to home"
        secondary-button="Check status"
        @primary-click="() => alert('Go home')"
        @secondary-click="() => alert('Check status')"
      />
    `,
  }),
}

// Session Expired
export const SessionExpired = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="timer"
        title="Your session has expired"
        description="For your security, please log in again to continue."
        primary-button="Log in"
        @primary-click="() => alert('Log in')"
      />
    `,
  }),
}

// Payment Declined
export const PaymentDeclined = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="exclamation"
        title="Payment declined"
        description="Your payment was declined by your bank. Please try a different payment method."
        primary-button="Try another method"
        secondary-button="Contact bank"
        @primary-click="() => alert('Try another method')"
        @secondary-click="() => alert('Contact bank')"
      />
    `,
  }),
}

// All Illustration Types
export const AllIllustrationTypes = {
  render: () => ({
    components: { ErrorScreen },
    data() {
      return {
        currentType: 'exclamation',
        types: [
          {
            id: 'exclamation',
            label: 'Exclamation',
            title: 'General warning',
            desc: 'For general warnings and checks',
          },
          {
            id: 'construction',
            label: 'Construction',
            title: 'Access denied',
            desc: 'User not allowed access',
          },
          {
            id: 'timer',
            label: 'Timer',
            title: 'Feature not ready',
            desc: 'Feature not available yet',
          },
          { id: 'plug', label: 'Plug', title: 'No connection', desc: 'No network connection' },
          { id: 'tool', label: 'Tool', title: 'Technical issues', desc: 'Wise technical problems' },
          {
            id: 'magnifying',
            label: 'Magnifying',
            title: 'Page not found',
            desc: 'Page does not exist',
          },
        ],
      }
    },
    computed: {
      current() {
        return this.types.find((t) => t.id === this.currentType)
      },
    },
    template: `
      <div>
        <!-- Type Selector -->
        <div class="fixed top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p class="text-xs font-semibold mb-2 text-content-secondary">Select Illustration:</p>
          <div class="flex flex-col gap-2">
            <button
              v-for="type in types"
              :key="type.id"
              @click="currentType = type.id"
              :class="[
                'px-3 py-2 text-sm rounded-lg text-left transition-colors',
                currentType === type.id
                  ? 'bg-content-accent text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              ]"
            >
              {{ type.label }}
            </button>
          </div>
        </div>

        <!-- Error Screen -->
        <ErrorScreen
          :illustration-type="currentType"
          :title="current.title"
          :description="current.desc"
          primary-button="Primary action"
          secondary-button="Secondary action"
        />
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

// Mobile View
export const MobileView = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <div class="max-w-4xl mx-auto">
        <ErrorScreen
          illustration-type="plug"
          title="No internet connection"
          description="Check your connection and try again. Your money is safe."
          primary-button="Try again"
          @primary-click="() => alert('Try again')"
        />
      </div>
    `,
  }),
}

// With Custom Actions
export const WithCustomActions = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        illustration-type="exclamation"
        title="Something went wrong"
        description="We couldn't complete your request. Please try one of the options below."
      >
        <template #actions>
          <div class="space-y-3">
            <button class="w-full px-6 py-4 bg-content-accent text-white rounded-full hover:opacity-90 font-medium text-lg">
              Try again
            </button>
            <button class="w-full px-6 py-4 border-2 border-gray-300 text-content-primary rounded-full hover:bg-background-elevated font-medium text-lg">
              Go to home
            </button>
            <button class="w-full text-content-accent hover:underline font-medium">
              Contact support
            </button>
          </div>
        </template>
      </ErrorScreen>
    `,
  }),
}

// Custom Illustration
export const CustomIllustration = {
  render: () => ({
    components: { ErrorScreen },
    template: `
      <ErrorScreen
        custom-illustration="🚫"
        title="Custom illustration"
        description="You can use any emoji or image URL as a custom illustration."
        primary-button="Got it"
        @primary-click="() => alert('Got it')"
      />
    `,
  }),
}
