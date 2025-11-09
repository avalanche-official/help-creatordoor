import SuccessScreen from './SuccessScreen.vue'

export default {
  title: 'UI/SuccessScreen',
  component: SuccessScreen,
  tags: ['autodocs'],
}

// All Sent - Celebration (Wise Style!)
export const AllSent = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="🎉"
        title="All sent"
        description="It's with Henrique, just like that. And you saved up to 10.50 GBP."
        primary-button="OK"
        @primary-click="() => alert('OK')"
      />
    `,
  }),
}

// Money Sent - Celebration
export const MoneySent = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="✓"
        title="Money sent"
        description="Your transfer to Jane Smith is complete. It should arrive within 2 hours."
        primary-button="Done"
        secondary-button="Send another"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('Send another')"
      />
    `,
  }),
}

// Card Ordered - Celebration
export const CardOrdered = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="💳"
        title="Card ordered"
        description="Your Wise card is on its way. It should arrive in 5-7 business days."
        primary-button="Done"
        @primary-click="() => alert('Done')"
      />
    `,
  }),
}

// Conversion Complete - Celebration
export const ConversionComplete = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="🔄"
        title="Conversion complete"
        description="You converted 500 GBP to 585 EUR at the real exchange rate."
        primary-button="Done"
        secondary-button="Convert more"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('Convert more')"
      />
    `,
  }),
}

// Receipt Sent - Confirmation (White Background)
export const ReceiptSent = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="white"
        illustration="✉️"
        title="Receipt sent"
        description="We've emailed you a copy of your receipt."
        primary-button="Done"
        @primary-click="() => alert('Done')"
      />
    `,
  }),
}

// Team Member Added - Confirmation (Green Background)
export const TeamMemberAdded = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="green"
        illustration="✓"
        title="Team member added"
        description="Sophie has been added to your business account."
        primary-button="Done"
        secondary-button="Add another"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('Add another')"
      />
    `,
  }),
}

// Direct Debit Set Up - Confirmation
export const DirectDebitSetUp = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="white"
        illustration="✓"
        title="Direct Debit set up"
        description="Your Direct Debit is now active. Your next payment will be taken on 1st March."
        primary-button="Done"
        @primary-click="() => alert('Done')"
      />
    `,
  }),
}

// Account Verified - Celebration
export const AccountVerified = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="✓"
        title="Account verified"
        description="Your account is now fully verified. You can now use all features."
        primary-button="Get started"
        @primary-click="() => alert('Get started')"
      />
    `,
  }),
}

// Balance Added - Celebration
export const BalanceAdded = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="💰"
        title="Balance added"
        description="500 GBP has been added to your account."
        primary-button="Done"
        secondary-button="Add more"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('Add more')"
      />
    `,
  }),
}

// Recipient Added - Confirmation
export const RecipientAdded = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="white"
        illustration="✓"
        title="Recipient added"
        description="Jane Smith has been added to your recipients."
        primary-button="Done"
        secondary-button="Send money"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('Send money')"
      />
    `,
  }),
}

// Password Changed - Confirmation
export const PasswordChanged = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="white"
        illustration="🔒"
        title="Password changed"
        description="Your password has been updated successfully."
        primary-button="Done"
        @primary-click="() => alert('Done')"
      />
    `,
  }),
}

// Jar Created - Celebration
export const JarCreated = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="🏺"
        title="Jar created"
        description="Your Holiday Fund jar is ready. Start saving today!"
        primary-button="Done"
        secondary-button="Add money"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('Add money')"
      />
    `,
  }),
}

// Auto Conversion Set - Confirmation
export const AutoConversionSet = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="green"
        illustration="✓"
        title="Auto conversion set up"
        description="We'll automatically convert your money when your target rate is reached."
        primary-button="Done"
        @primary-click="() => alert('Done')"
      />
    `,
  }),
}

// Payment Scheduled - Confirmation
export const PaymentScheduled = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="confirmation"
        background="white"
        illustration="📅"
        title="Payment scheduled"
        description="Your payment will be sent on 15th March at 9:00 AM."
        primary-button="Done"
        secondary-button="View details"
        @primary-click="() => alert('Done')"
        @secondary-click="() => alert('View details')"
      />
    `,
  }),
}

// Type Comparison
export const TypeComparison = {
  render: () => ({
    components: { SuccessScreen },
    data() {
      return {
        currentType: 'celebration-green',
        types: [
          {
            id: 'celebration-green',
            type: 'celebration',
            background: 'green',
            label: 'Celebration (Green)',
            title: 'Money sent',
            desc: 'For key brand moments like sending money',
          },
          {
            id: 'confirmation-green',
            type: 'confirmation',
            background: 'green',
            label: 'Confirmation (Green)',
            title: 'Team member added',
            desc: 'For admin tasks with green background',
          },
          {
            id: 'confirmation-white',
            type: 'confirmation',
            background: 'white',
            label: 'Confirmation (White)',
            title: 'Receipt sent',
            desc: 'For admin tasks with white background',
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
          <p class="text-xs font-semibold mb-2 text-content-secondary">Select Type:</p>
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

        <!-- Success Screen -->
        <SuccessScreen
          :type="current.type"
          :background="current.background"
          illustration="✓"
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
    components: { SuccessScreen },
    template: `
      <div class="max-w-md mx-auto">
        <SuccessScreen
          type="celebration"
          illustration="✓"
          title="Money sent"
          description="Your transfer is complete."
          primary-button="Done"
          @primary-click="() => alert('Done')"
        />
      </div>
    `,
  }),
}

// With Savings Amount
export const WithSavingsAmount = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="🎉"
        title="All sent"
        description="It's with Henrique, just like that. And you saved up to 10.50 GBP."
        primary-button="OK"
        @primary-click="() => alert('OK')"
      />
    `,
  }),
}

// Custom Illustration
export const CustomIllustration = {
  render: () => ({
    components: { SuccessScreen },
    template: `
      <SuccessScreen
        type="celebration"
        illustration="🚀"
        title="Custom success"
        description="You can use any emoji or image URL as an illustration."
        primary-button="Awesome"
        @primary-click="() => alert('Awesome')"
      />
    `,
  }),
}
