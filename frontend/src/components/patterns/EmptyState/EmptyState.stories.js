import EmptyState from './EmptyState.vue'

export default {
  title: 'UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

// No Payments Waiting (Wise Style!)
export const NoPaymentsWaiting = {
  render: () => ({
    components: { EmptyState },
    template: `
      <div class="min-h-screen bg-background-default p-6">
        <EmptyState
          title="You're not waiting on any payments"
          description="When you create a new request, it'll show up here."
          illustration="🪙"
          primary-button="Request payment"
          @primary-click="() => alert('Request payment clicked')"
        />
      </div>
    `,
  }),
}

// No Auto Conversions (Wise Style!)
export const NoAutoConversions = {
  render: () => ({
    components: { EmptyState },
    template: `
      <div class="min-h-screen bg-background-default p-6">
        <EmptyState
          title="You have no auto conversions set up"
          description="Set one up and we'll automatically convert your money when your desired exchange rate is met."
          illustration="🪙"
          primary-button="Create an Auto Conversion"
          @primary-click="() => alert('Create conversion clicked')"
        />
      </div>
    `,
  }),
}

// No Transactions
export const NoTransactions = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="No transactions yet"
        description="Your transaction history will appear here once you start using your account."
        illustration="📊"
        primary-button="Send money"
        secondary-button="Learn more"
        @primary-click="() => alert('Send money')"
        @secondary-click="() => alert('Learn more')"
      />
    `,
  }),
}

// No Recipients
export const NoRecipients = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="No recipients saved"
        description="Add recipients to send money quickly and easily in the future."
        illustration="👥"
        primary-button="Add recipient"
        @primary-click="() => alert('Add recipient')"
      />
    `,
  }),
}

// No Cards
export const NoCards = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="You don't have any cards"
        description="Order a Wise card to spend in 150+ countries at the real exchange rate."
        illustration="💳"
        primary-button="Order card"
        secondary-button="Learn more"
        @primary-click="() => alert('Order card')"
        @secondary-click="() => alert('Learn more')"
      />
    `,
  }),
}

// No Direct Debits
export const NoDirectDebits = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="No Direct Debits set up"
        description="Set up Direct Debits to automatically pay bills and subscriptions from your Wise account."
        illustration="📋"
        primary-button="Set up Direct Debit"
        @primary-click="() => alert('Set up Direct Debit')"
      />
    `,
  }),
}

// Search No Results
export const SearchNoResults = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
        illustration="🔍"
        primary-button="Clear filters"
        @primary-click="() => alert('Clear filters')"
      />
    `,
  }),
}

// No Notifications
export const NoNotifications = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="All caught up!"
        description="You don't have any notifications right now. We'll let you know when something needs your attention."
        illustration="✓"
      />
    `,
  }),
}

// No Internet Connection
export const NoInternetConnection = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="No internet connection"
        description="Check your connection and try again."
        illustration="📡"
        primary-button="Try again"
        @primary-click="() => alert('Try again')"
      />
    `,
  }),
}

// With Custom Actions Slot
export const WithCustomActions = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="No balances yet"
        description="Add money to your Wise account to get started."
        illustration="💰"
      >
        <template #actions>
          <div class="space-y-3">
            <button class="w-full px-6 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
              Add money
            </button>
            <button class="w-full px-6 py-3 border-2 border-gray-300 text-content-primary rounded-lg hover:bg-background-elevated font-medium">
              Open a balance
            </button>
            <button class="w-full text-sm text-content-accent hover:underline">
              Learn how balances work
            </button>
          </div>
        </template>
      </EmptyState>
    `,
  }),
}

// In Page Context
export const InPageContext = {
  render: () => ({
    components: { EmptyState },
    template: `
      <div class="min-h-screen bg-background-default">
        <!-- Page Header -->
        <div class="border-b border-gray-200 bg-white">
          <div class="max-w-4xl mx-auto px-6 py-4">
            <div class="flex items-center gap-4">
              <button class="p-2 hover:bg-background-elevated rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 class="text-2xl font-semibold">Payment requests</h1>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="max-w-4xl mx-auto px-6">
          <EmptyState
            title="You're not waiting on any payments"
            description="When you create a new request, it'll show up here."
            illustration="🪙"
            primary-button="Request payment"
            @primary-click="() => alert('Request payment')"
          />
        </div>
      </div>
    `,
  }),
}

// Different Illustrations
export const DifferentIllustrations = {
  render: () => ({
    components: { EmptyState },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div class="border border-gray-200 rounded-lg p-4">
          <EmptyState
            title="No money emoji"
            description="Using simple emoji illustrations."
            illustration="💵"
            primary-button="Action"
          />
        </div>

        <div class="border border-gray-200 rounded-lg p-4">
          <EmptyState
            title="Gift emoji"
            description="Different emoji for different contexts."
            illustration="🎁"
            primary-button="Action"
          />
        </div>

        <div class="border border-gray-200 rounded-lg p-4">
          <EmptyState
            title="Chart emoji"
            description="Stats and analytics empty state."
            illustration="📈"
            primary-button="Action"
          />
        </div>

        <div class="border border-gray-200 rounded-lg p-4">
          <EmptyState
            title="Lock emoji"
            description="Security or restricted content."
            illustration="🔒"
            primary-button="Action"
          />
        </div>
      </div>
    `,
  }),
}

// Mobile View
export const MobileView = {
  render: () => ({
    components: { EmptyState },
    template: `
      <div class="max-w-4xl mx-auto min-h-screen bg-background-default">
        <!-- Mobile Header -->
        <div class="bg-white border-b border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <button class="p-2 hover:bg-background-elevated rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold">Recipients</h1>
          </div>
        </div>

        <!-- Empty State -->
        <EmptyState
          title="No recipients saved"
          description="Add recipients to send money quickly and easily."
          illustration="👥"
          primary-button="Add recipient"
          @primary-click="() => alert('Add recipient')"
        />
      </div>
    `,
  }),
}
