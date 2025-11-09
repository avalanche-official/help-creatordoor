import Instruction from './Instruction.vue'

export default {
  title: 'UI/Instruction',
  component: Instruction,
  tags: ['autodocs'],
}

// Basic Instructions
export const Basic = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        items: [
          { text: 'Personal information', type: 'positive' },
          { text: 'Transfer details', type: 'positive' },
          { text: 'Verification', type: 'negative' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl">
        <Instruction :items="items" />
      </div>
    `,
  }),
}

// Password Requirements
export const PasswordRequirements = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        password: '',
      }
    },
    computed: {
      requirements() {
        return [
          {
            text: 'At least 8 characters',
            type: this.password.length >= 8 ? 'positive' : 'negative',
          },
          {
            text: 'Contains a number',
            type: /\d/.test(this.password) ? 'positive' : 'negative',
          },
          {
            text: 'Contains an uppercase letter',
            type: /[A-Z]/.test(this.password) ? 'positive' : 'negative',
          },
          {
            text: 'Contains a special character',
            type: /[!@#$%^&*]/.test(this.password) ? 'positive' : 'negative',
          },
        ]
      },
    },
    template: `
      <div class="max-w-4xl">
        <label class="block text-sm font-medium text-content-primary mb-2">
          Create password
        </label>
        <input
          v-model="password"
          type="password"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-2 focus:border-[#25ccbf]"
          placeholder="Enter password"
        />

        <h3 class="text-sm font-semibold mb-3 text-content-secondary">Password requirements:</h3>
        <Instruction :items="requirements" />
      </div>
    `,
  }),
}

// Feature Explanation (Do's and Don'ts)
export const DosAndDonts = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        dos: [
          { text: 'Use for multiple currency accounts', type: 'positive' },
          { text: 'Send money to 80+ countries', type: 'positive' },
          { text: 'Hold and convert 40+ currencies', type: 'positive' },
        ],
        donts: [
          { text: 'Cannot be used for cash withdrawals', type: 'negative' },
          { text: 'Not available for business accounts', type: 'negative' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl space-y-6">
        <div>
          <h3 class="text-base font-semibold mb-3 text-content-primary">What you can do:</h3>
          <Instruction :items="dos" />
        </div>

        <div>
          <h3 class="text-base font-semibold mb-3 text-content-primary">Limitations:</h3>
          <Instruction :items="donts" />
        </div>
      </div>
    `,
  }),
}

// Task Completion
export const TaskCompletion = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        tasks: [
          { text: 'Verify your email', type: 'positive' },
          { text: 'Add your address', type: 'positive' },
          { text: 'Upload ID document', type: 'negative' },
          { text: 'Confirm phone number', type: 'negative' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4 text-content-primary">Complete your profile</h2>
        <p class="text-sm text-content-secondary mb-4">
          Complete these steps to start using your account
        </p>
        <Instruction :items="tasks" />
      </div>
    `,
  }),
}

// Account Setup Progress
export const AccountSetupProgress = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        steps: [
          { text: 'Personal information', type: 'positive' },
          { text: 'Transfer details', type: 'positive' },
          { text: 'Verification', type: 'negative' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-border-default rounded-lg">
        <h2 class="text-xl font-semibold mb-2 text-content-primary">Setup progress</h2>
        <p class="text-sm text-content-secondary mb-6">
          2 of 3 steps completed
        </p>
        <Instruction :items="steps" />
      </div>
    `,
  }),
}

// Size Variations
export const SizeVariations = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        items: [
          { text: 'First requirement met', type: 'positive' },
          { text: 'Second requirement pending', type: 'negative' },
        ],
      }
    },
    template: `
      <div class="space-y-8 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Small</h3>
          <Instruction :items="items" size="sm" />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Medium (Default)</h3>
          <Instruction :items="items" size="md" />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Large</h3>
          <Instruction :items="items" size="lg" />
        </div>
      </div>
    `,
  }),
}

// Verification Checklist
export const VerificationChecklist = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        items: [
          { text: 'Government-issued ID uploaded', type: 'positive' },
          { text: 'Photo is clear and not blurry', type: 'positive' },
          { text: 'All four corners are visible', type: 'negative' },
          { text: 'Document is not expired', type: 'positive' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-border-default rounded-lg">
        <h2 class="text-xl font-semibold mb-2 text-content-primary">ID verification</h2>
        <p class="text-sm text-content-secondary mb-6">
          Make sure your ID photo meets these requirements
        </p>
        <Instruction :items="items" />

        <button class="w-full mt-6 px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
          Upload new photo
        </button>
      </div>
    `,
  }),
}

// Feature Comparison
export const FeatureComparison = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        personal: [
          { text: 'Send money internationally', type: 'positive' },
          { text: 'Hold 40+ currencies', type: 'positive' },
          { text: 'Get a debit card', type: 'positive' },
          { text: 'Batch payments', type: 'negative' },
          { text: 'Team access', type: 'negative' },
        ],
        business: [
          { text: 'Send money internationally', type: 'positive' },
          { text: 'Hold 40+ currencies', type: 'positive' },
          { text: 'Get a debit card', type: 'positive' },
          { text: 'Batch payments', type: 'positive' },
          { text: 'Team access', type: 'positive' },
        ],
      }
    },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div class="p-6 bg-white border border-border-default rounded-lg">
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Personal Account</h3>
          <Instruction :items="personal" />
        </div>

        <div class="p-6 bg-white border border-border-default rounded-lg">
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Business Account</h3>
          <Instruction :items="business" />
        </div>
      </div>
    `,
  }),
}

// All Positive
export const AllPositive = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        items: [
          { text: 'Fast transfers', type: 'positive' },
          { text: 'Low fees', type: 'positive' },
          { text: 'Real exchange rate', type: 'positive' },
          { text: 'Secure and regulated', type: 'positive' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-semibold mb-4 text-content-primary">Why choose Wise?</h3>
        <Instruction :items="items" />
      </div>
    `,
  }),
}

// All Negative
export const AllNegative = {
  render: () => ({
    components: { Instruction },
    data() {
      return {
        items: [
          { text: 'Cannot send to this country', type: 'negative' },
          { text: 'Amount exceeds daily limit', type: 'negative' },
          { text: 'Recipient details incomplete', type: 'negative' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-semibold mb-4 text-content-primary">Issues found</h3>
        <Instruction :items="items" />
      </div>
    `,
  }),
}
