import Radio from './Radio.vue'

export default {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
}

// Basic Radio Group
export const Basic = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        selected: 'personal',
      }
    },
    template: `
      <div class="space-y-3 max-w-4xl">
        <Radio
          v-model="selected"
          value="personal"
          label="Personal account"
          name="account-type"
        />
        <Radio
          v-model="selected"
          value="business"
          label="Business account"
          name="account-type"
        />

        <p class="mt-4 text-sm text-content-secondary">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
}

// With Descriptions
export const WithDescriptions = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        selected: 'personal',
      }
    },
    template: `
      <div class="space-y-3 max-w-4xl">
        <Radio
          v-model="selected"
          value="personal"
          label="Personal account"
          description="For personal use and everyday spending"
          name="account-type"
        />
        <Radio
          v-model="selected"
          value="business"
          label="Business account"
          description="For your company or freelance work"
          name="account-type"
        />
      </div>
    `,
  }),
}

// Account Type Selection (Wise Style!)
export const AccountTypeSelection = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        accountType: 'personal',
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4 text-content-primary">Choose account type</h2>
        <div class="space-y-3">
          <Radio
            v-model="accountType"
            value="personal"
            label="Personal account"
            description="Send, spend and receive money around the world"
            name="account-type"
          />
          <Radio
            v-model="accountType"
            value="business"
            label="Business account"
            description="Manage your business finances in multiple currencies"
            name="account-type"
          />
        </div>

        <button class="mt-6 w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
          Continue
        </button>
      </div>
    `,
  }),
}

// Transfer Speed Options
export const TransferSpeedOptions = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        speed: 'standard',
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4 text-content-primary">Transfer speed</h2>
        <div class="space-y-3">
          <Radio
            v-model="speed"
            value="instant"
            label="Instant transfer"
            description="Arrives in minutes • Fee: £2.50"
            name="transfer-speed"
          />
          <Radio
            v-model="speed"
            value="standard"
            label="Standard transfer"
            description="Arrives in 1-2 business days • Fee: £0.50"
            name="transfer-speed"
          />
          <Radio
            v-model="speed"
            value="economy"
            label="Economy transfer"
            description="Arrives in 3-5 business days • Free"
            name="transfer-speed"
          />
        </div>
      </div>
    `,
  }),
}

// Payment Methods
export const PaymentMethods = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        paymentMethod: 'bank',
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4 text-content-primary">Payment method</h2>
        <div class="space-y-3">
          <Radio
            v-model="paymentMethod"
            value="bank"
            label="Bank transfer"
            description="Pay from your bank account"
            name="payment-method"
          />
          <Radio
            v-model="paymentMethod"
            value="card"
            label="Debit card"
            description="Pay with your Visa or Mastercard"
            name="payment-method"
          />
          <Radio
            v-model="paymentMethod"
            value="balance"
            label="Wise balance"
            description="Pay from your Wise account balance"
            name="payment-method"
          />
        </div>
      </div>
    `,
  }),
}

// Disabled Options
export const DisabledOptions = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        plan: 'standard',
      }
    },
    template: `
      <div class="space-y-3 max-w-4xl">
        <Radio
          v-model="plan"
          value="basic"
          label="Basic plan"
          description="£0/month"
          name="plan"
        />
        <Radio
          v-model="plan"
          value="standard"
          label="Standard plan"
          description="£5/month"
          name="plan"
        />
        <Radio
          v-model="plan"
          value="premium"
          label="Premium plan"
          description="£15/month - Coming soon"
          name="plan"
          disabled
        />
      </div>
    `,
  }),
}

// Currency Selection
export const CurrencySelection = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        currency: 'GBP',
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4 text-content-primary">Choose currency</h2>
        <div class="space-y-3">
          <Radio
            v-model="currency"
            value="GBP"
            label="British Pound (GBP)"
            description="Your primary currency"
            name="currency"
          />
          <Radio
            v-model="currency"
            value="EUR"
            label="Euro (EUR)"
            description="Used in 19 EU countries"
            name="currency"
          />
          <Radio
            v-model="currency"
            value="USD"
            label="US Dollar (USD)"
            description="Most widely used currency"
            name="currency"
          />
        </div>
      </div>
    `,
  }),
}

// Delivery Options
export const DeliveryOptions = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        delivery: 'home',
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4 text-content-primary">Card delivery</h2>
        <div class="space-y-3">
          <Radio
            v-model="delivery"
            value="home"
            label="Home delivery"
            description="Free delivery in 5-7 business days"
            name="delivery"
          />
          <Radio
            v-model="delivery"
            value="express"
            label="Express delivery"
            description="£5.00 - Arrives in 2-3 business days"
            name="delivery"
          />
          <Radio
            v-model="delivery"
            value="pickup"
            label="Store pickup"
            description="Free - Pick up from our branch"
            name="delivery"
          />
        </div>
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        option1: 'selected',
        option2: 'unselected',
      }
    },
    template: `
      <div class="space-y-8 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-primary">Selected</h3>
          <Radio
            v-model="option1"
            value="selected"
            label="Selected option"
            description="This option is currently selected"
            name="state1"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-primary">Unselected</h3>
          <Radio
            v-model="option2"
            value="selected"
            label="Unselected option"
            description="Click to select this option"
            name="state2"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-primary">Disabled</h3>
          <Radio
            model-value="disabled"
            value="disabled"
            label="Disabled option"
            description="This option cannot be selected"
            name="state3"
            disabled
          />
        </div>
      </div>
    `,
  }),
}

// Registration Form
export const RegistrationForm = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        accountType: '',
        useCase: '',
        errors: {
          accountType: false,
          useCase: false,
        },
      }
    },
    methods: {
      validate() {
        this.errors.accountType = !this.accountType
        this.errors.useCase = !this.useCase

        if (!this.errors.accountType && !this.errors.useCase) {
          alert('Form submitted!')
        }
      },
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">Create your account</h2>

        <div class="space-y-6">
          <!-- Account Type -->
          <div>
            <label class="block text-sm font-medium text-content-primary mb-3">
              Account type *
            </label>
            <div class="space-y-3">
              <Radio
                v-model="accountType"
                value="personal"
                label="Personal"
                description="For personal use"
                name="account-type"
              />
              <Radio
                v-model="accountType"
                value="business"
                label="Business"
                description="For your company"
                name="account-type"
              />
            </div>
            <p v-if="errors.accountType" class="mt-2 text-sm text-red-500">
              Please select an account type
            </p>
          </div>

          <!-- Use Case -->
          <div>
            <label class="block text-sm font-medium text-content-primary mb-3">
              What will you use Wise for? *
            </label>
            <div class="space-y-3">
              <Radio
                v-model="useCase"
                value="sending"
                label="Sending money abroad"
                name="use-case"
              />
              <Radio
                v-model="useCase"
                value="receiving"
                label="Receiving money"
                name="use-case"
              />
              <Radio
                v-model="useCase"
                value="both"
                label="Both sending and receiving"
                name="use-case"
              />
            </div>
            <p v-if="errors.useCase" class="mt-2 text-sm text-red-500">
              Please select a use case
            </p>
          </div>

          <button
            @click="validate"
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    `,
  }),
}

// Without Descriptions
export const WithoutDescriptions = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        size: 'medium',
      }
    },
    template: `
      <div class="space-y-3 max-w-4xl">
        <Radio
          v-model="size"
          value="small"
          label="Small"
          name="size"
        />
        <Radio
          v-model="size"
          value="medium"
          label="Medium"
          name="size"
        />
        <Radio
          v-model="size"
          value="large"
          label="Large"
          name="size"
        />
      </div>
    `,
  }),
}
