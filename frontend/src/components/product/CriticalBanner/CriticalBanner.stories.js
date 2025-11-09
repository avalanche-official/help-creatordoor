import CriticalBanner from './CriticalBanner.vue'

export default {
  title: 'UI/CriticalBanner',
  component: CriticalBanner,
  tags: ['autodocs'],
}

// Account Blocked
export const AccountBlocked = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div>
        <CriticalBanner
          title="We've temporarily blocked your account because we need to verify your identity."
          button-text="Unblock account"
          @button-click="() => alert('Navigate to unblock flow')"
        />
      </div>
    `,
  }),
}

// Account At Risk (Wise Style!)
export const AccountAtRisk = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div>
        <CriticalBanner
          title="Your account is at risk of being blocked."
          description="You need to upload some ID documents by 1 March to keep your money moving."
          button-text="Upload now"
          @button-click="() => alert('Navigate to upload documents')"
        />
      </div>
    `,
  }),
}

// Payment Required
export const PaymentRequired = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div>
        <CriticalBanner
          title="Your account is at risk of being closed."
          description="You need to pay your outstanding balance by 15 February to keep your account open."
          button-text="Pay now"
          @button-click="() => alert('Navigate to payment')"
        />
      </div>
    `,
  }),
}

// Verification Needed
export const VerificationNeeded = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div>
        <CriticalBanner
          title="We need you to verify your details."
          description="You need to confirm your address by 30 January to continue using your account."
          button-text="Verify now"
          @button-click="() => alert('Navigate to verification')"
        />
      </div>
    `,
  }),
}

// Documents Missing
export const DocumentsMissing = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div>
        <CriticalBanner
          title="We're missing some important documents from you."
          description="You need to upload proof of address by 10 March to avoid account restrictions."
          button-text="Upload documents"
          @button-click="() => alert('Navigate to document upload')"
        />
      </div>
    `,
  }),
}

// Without Description
export const WithoutDescription = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div>
        <CriticalBanner
          title="We've temporarily blocked your account because your payment failed."
          button-text="Update payment method"
          @button-click="() => alert('Navigate to payment settings')"
        />
      </div>
    `,
  }),
}

// In App Layout
export const InAppLayout = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div class="min-h-screen bg-background-default">
        <!-- Critical Banner at Top -->
        <div class="sticky top-0 z-50 p-4 bg-background-default">
          <div class="max-w-4xl mx-auto">
            <CriticalBanner
              title="Your account is at risk of being blocked."
              description="You need to upload some ID documents by 1 March to keep your money moving."
              button-text="Upload now"
              @button-click="() => alert('Navigate to upload')"
            />
          </div>
        </div>

        <!-- App Content -->
        <div class="max-w-4xl mx-auto p-6">
          <h1 class="text-3xl font-bold mb-6">Your accounts</h1>

          <div class="space-y-4">
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">GBP Balance</span>
                <span class="text-2xl font-bold">£1,234.56</span>
              </div>
              <p class="text-sm text-content-secondary">British Pound</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">EUR Balance</span>
                <span class="text-2xl font-bold">€987.65</span>
              </div>
              <p class="text-sm text-content-secondary">Euro</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">USD Balance</span>
                <span class="text-2xl font-bold">$543.21</span>
              </div>
              <p class="text-sm text-content-secondary">US Dollar</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Mobile View
export const MobileView = {
  render: () => ({
    components: { CriticalBanner },
    template: `
      <div class="max-w-4xl mx-auto bg-background-default min-h-screen">
        <!-- Mobile App Bar -->
        <div class="bg-white border-b border-gray-200 p-4">
          <h1 class="text-xl font-semibold">Home</h1>
        </div>

        <!-- Critical Banner -->
        <div class="p-4">
          <CriticalBanner
            title="Your account is at risk of being blocked."
            description="You need to upload some ID documents by 1 March to keep your money moving."
            button-text="Upload now"
            @button-click="() => alert('Navigate to upload')"
          />
        </div>

        <!-- Content -->
        <div class="p-4">
          <div class="space-y-3">
            <div class="p-4 bg-white rounded-lg flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                💷
              </div>
              <div class="flex-1">
                <p class="font-semibold">GBP Balance</p>
                <p class="text-sm text-content-secondary">£1,234.56</p>
              </div>
            </div>

            <div class="p-4 bg-white rounded-lg flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                💶
              </div>
              <div class="flex-1">
                <p class="font-semibold">EUR Balance</p>
                <p class="text-sm text-content-secondary">€987.65</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Multiple Scenarios
export const MultipleScenarios = {
  render: () => ({
    components: { CriticalBanner },
    data() {
      return {
        currentScenario: 'blocked',
        scenarios: {
          blocked: {
            title:
              "We've temporarily blocked your account because we need to verify your identity.",
            description: '',
            button: 'Unblock account',
          },
          risk: {
            title: 'Your account is at risk of being blocked.',
            description:
              'You need to upload some ID documents by 1 March to keep your money moving.',
            button: 'Upload now',
          },
          payment: {
            title: 'Your account is at risk of being closed.',
            description:
              'You need to pay your outstanding balance by 15 February to keep your account open.',
            button: 'Pay now',
          },
        },
      }
    },
    template: `
      <div class="space-y-6">
        <!-- Scenario Selector -->
        <div class="flex gap-2">
          <button
            @click="currentScenario = 'blocked'"
            :class="[
              'px-4 py-2 rounded-lg font-medium',
              currentScenario === 'blocked'
                ? 'bg-content-accent text-white'
                : 'bg-gray-200 text-content-primary'
            ]"
          >
            Blocked
          </button>
          <button
            @click="currentScenario = 'risk'"
            :class="[
              'px-4 py-2 rounded-lg font-medium',
              currentScenario === 'risk'
                ? 'bg-content-accent text-white'
                : 'bg-gray-200 text-content-primary'
            ]"
          >
            At Risk
          </button>
          <button
            @click="currentScenario = 'payment'"
            :class="[
              'px-4 py-2 rounded-lg font-medium',
              currentScenario === 'payment'
                ? 'bg-content-accent text-white'
                : 'bg-gray-200 text-content-primary'
            ]"
          >
            Payment Due
          </button>
        </div>

        <!-- Banner -->
        <CriticalBanner
          :title="scenarios[currentScenario].title"
          :description="scenarios[currentScenario].description"
          :button-text="scenarios[currentScenario].button"
          @button-click="() => alert('Action clicked: ' + currentScenario)"
        />
      </div>
    `,
  }),
}

// With Toggle
export const WithToggle = {
  render: () => ({
    components: { CriticalBanner },
    data() {
      return {
        showBanner: true,
      }
    },
    template: `
      <div class="space-y-4">
        <button
          @click="showBanner = !showBanner"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          {{ showBanner ? 'Hide Banner' : 'Show Banner' }}
        </button>

        <CriticalBanner
          :show="showBanner"
          title="Your account is at risk of being blocked."
          description="You need to upload some ID documents by 1 March to keep your money moving."
          button-text="Upload now"
        />

        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">Main Content</h2>
          <p class="text-content-secondary">
            This is the main content of the page below the critical banner.
          </p>
        </div>
      </div>
    `,
  }),
}
