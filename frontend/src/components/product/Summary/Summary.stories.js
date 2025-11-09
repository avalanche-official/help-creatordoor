import Summary from './Summary.vue'

export default {
  title: 'UI/Summary',
  component: Summary,
  tags: ['autodocs'],
}

// Basic Summary
export const Basic = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="space-y-4 max-w-4xl">
        <Summary title="Low fees" />
        <Summary title="Fast transfers" />
        <Summary title="Real exchange rate" />
      </div>
    `,
  }),
}

// With Descriptions
export const WithDescriptions = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="space-y-4 max-w-4xl">
        <Summary
          title="Low fees"
          description="Save up to 8x compared to traditional banks"
        />
        <Summary
          title="Fast transfers"
          description="Most transfers arrive within 1-2 business days"
        />
        <Summary
          title="Real exchange rate"
          description="No markup on the exchange rate you see on Google"
        />
      </div>
    `,
  }),
}

// With Status (Done/Pending/Not Done)
export const WithStatus = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="space-y-4 max-w-4xl">
        <Summary
          title="Your email is verified"
          description="We sent a confirmation to your email address"
          status="done"
        />
        <Summary
          title="We're verifying your address"
          description="This usually takes 1-2 business days"
          status="pending"
        />
        <Summary
          title="Verify your phone number"
          description="We'll send you a code to confirm"
          status="not-done"
        />
      </div>
    `,
  }),
}

// Account Verification Flow (Wise Style!)
export const AccountVerification = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-6 text-content-primary">Complete your profile</h2>
        <div class="space-y-6">
          <Summary
            title="You verified your email"
            description="john.doe@example.com"
            status="done"
          />
          <Summary
            title="You verified your address"
            description="10 Downing Street, Westminster, London SW1A 2AA"
            status="done"
            action="Edit address"
            @action-click="() => alert('Edit address clicked')"
          />
          <Summary
            title="We're verifying your ID"
            description="This usually takes 1-2 business days"
            status="pending"
          />
          <Summary
            title="Verify your phone number"
            description="We'll send you a code to +44 7700 900000"
            status="not-done"
            action="Verify now"
            @action-click="() => alert('Verify now clicked')"
          />
        </div>
      </div>
    `,
  }),
}

// With Actions
export const WithActions = {
  render: () => ({
    components: { Summary },
    data() {
      return {
        lastAction: null,
      }
    },
    template: `
      <div class="space-y-4 max-w-4xl">
        <Summary
          title="Your address is verified"
          description="10 Downing Street, Westminster, London SW1A 2AA"
          status="done"
          action="Edit address"
          @action-click="lastAction = 'Edit address'"
        />
        <Summary
          title="Your phone number is verified"
          description="+44 7700 900000"
          status="done"
          action="Change number"
          @action-click="lastAction = 'Change number'"
        />
        <Summary
          title="Payment method added"
          description="Visa ending in 1234"
          status="done"
          action="Update"
          @action-click="lastAction = 'Update payment'"
        />

        <p v-if="lastAction" class="mt-6 p-3 bg-content-accent/10 rounded-lg text-sm">
          Action clicked: <strong>{{ lastAction }}</strong>
        </p>
      </div>
    `,
  }),
}

// With Info Button
export const WithInfoButton = {
  render: () => ({
    components: { Summary },
    data() {
      return {
        infoClicked: null,
      }
    },
    template: `
      <div class="space-y-4 max-w-4xl">
        <Summary
          title="Low fees"
          description="Save up to 8x compared to traditional banks"
          has-info
          @info-click="infoClicked = 'Low fees'"
        />
        <Summary
          title="Real exchange rate"
          description="No markup on the exchange rate"
          has-info
          @info-click="infoClicked = 'Real exchange rate'"
        />
        <Summary
          title="Secure transfers"
          description="Bank-level security for every transfer"
          has-info
          @info-click="infoClicked = 'Secure transfers'"
        />

        <p v-if="infoClicked" class="mt-6 p-3 bg-content-accent/10 rounded-lg text-sm">
          Info clicked: <strong>{{ infoClicked }}</strong>
        </p>
      </div>
    `,
  }),
}

// Money Transfer Steps
export const MoneyTransferSteps = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-6 text-content-primary">Send money to Jane Smith</h2>
        <div class="space-y-6">
          <Summary
            title="Recipient details confirmed"
            description="Jane Smith • jane@example.com"
            status="done"
            action="Edit recipient"
          />
          <Summary
            title="Payment processing"
            description="Your transfer of £500.00 is being processed"
            status="pending"
          />
          <Summary
            title="Upload proof of address"
            description="Required for transfers over £500"
            status="not-done"
            action="Upload now"
          />
        </div>
      </div>
    `,
  }),
}

// Benefits List
export const BenefitsList = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-6 text-content-primary">Why choose Wise?</h2>
        <div class="space-y-6">
          <Summary
            icon="💰"
            title="Low fees"
            description="Save up to 8x compared to banks and other providers"
            has-info
          />
          <Summary
            icon="⚡"
            title="Fast transfers"
            description="Most transfers arrive within 1-2 business days"
            has-info
          />
          <Summary
            icon="🌍"
            title="Global coverage"
            description="Send money to over 80 countries worldwide"
            has-info
          />
          <Summary
            icon="🔒"
            title="Secure and regulated"
            description="Bank-level security and regulated by financial authorities"
            has-info
          />
        </div>
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="space-y-8 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">Done Status</h3>
          <Summary
            title="Your email is verified"
            description="We sent a confirmation to your email"
            status="done"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">Pending Status</h3>
          <Summary
            title="We're verifying your address"
            description="This usually takes 1-2 business days"
            status="pending"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">Not Done Status</h3>
          <Summary
            title="Verify your phone number"
            description="We'll send you a code to confirm"
            status="not-done"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">No Status</h3>
          <Summary
            title="Low fees"
            description="Save up to 8x compared to traditional banks"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">With Action</h3>
          <Summary
            title="Your address is verified"
            description="10 Downing Street, Westminster, London"
            status="done"
            action="Edit address"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">With Info Button</h3>
          <Summary
            title="Real exchange rate"
            description="No markup on the exchange rate"
            has-info
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-primary">Custom Icon</h3>
          <Summary
            icon="🎉"
            title="Welcome bonus activated"
            description="Invite friends to get $10 each"
          />
        </div>
      </div>
    `,
  }),
}

// Setup Checklist
export const SetupChecklist = {
  render: () => ({
    components: { Summary },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-2 text-content-primary">Get started with Wise</h2>
        <p class="text-sm text-content-secondary mb-6">Complete these steps to start sending money</p>
        <div class="space-y-6">
          <Summary
            title="Create your account"
            description="Sign up with your email address"
            status="done"
          />
          <Summary
            title="Verify your email"
            description="Check your inbox for the verification link"
            status="done"
          />
          <Summary
            title="Add recipient details"
            description="Enter who you want to send money to"
            status="pending"
          />
          <Summary
            title="Add payment method"
            description="Connect your bank account or debit card"
            status="not-done"
            action="Add now"
          />
          <Summary
            title="Make your first transfer"
            description="Send money at the real exchange rate"
            status="not-done"
          />
        </div>
      </div>
    `,
  }),
}
