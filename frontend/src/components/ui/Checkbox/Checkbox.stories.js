import Checkbox from './Checkbox.vue'

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

// Basic Checkbox
export const Basic = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        checked: false,
      }
    },
    template: `
      <div class="p-8 space-y-4">
        <Checkbox v-model="checked" label="Accept terms and conditions" />
        <p class="text-sm text-content-secondary">
          Checked: <strong class="text-content-primary">{{ checked }}</strong>
        </p>
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        checked: false,
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Checkbox
          v-model="checked"
          label="Subscribe to newsletter"
          description="Get updates about new features, tips, and special offers delivered to your inbox."
        />
      </div>
    `,
  }),
}

// Multiple Checkboxes (Array)
export const MultipleSelection = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        selected: [],
      }
    },
    template: `
      <div class="p-8 space-y-4 max-w-4xl">
        <p class="text-sm font-medium text-content-primary mb-4">
          Select your interests:
        </p>

        <Checkbox
          v-model="selected"
          value="tech"
          label="Technology"
          description="News and updates about tech"
        />
        <Checkbox
          v-model="selected"
          value="finance"
          label="Finance"
          description="Money management tips and insights"
        />
        <Checkbox
          v-model="selected"
          value="travel"
          label="Travel"
          description="Travel guides and destination ideas"
        />
        <Checkbox
          v-model="selected"
          value="food"
          label="Food & Dining"
          description="Recipes and restaurant recommendations"
        />

        <div class="pt-4 border-t border-border-default">
          <p class="text-sm text-content-secondary">
            Selected: <strong class="text-content-primary">{{ selected.join(', ') || 'None' }}</strong>
          </p>
        </div>
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="p-8 space-y-4 max-w-4xl">
        <Checkbox
          :modelValue="false"
          disabled
          label="Disabled unchecked"
        />
        <Checkbox
          :modelValue="true"
          disabled
          label="Disabled checked"
        />
        <Checkbox
          :modelValue="false"
          disabled
          label="Disabled with description"
          description="This checkbox is disabled and cannot be interacted with."
        />
      </div>
    `,
  }),
}

// Error State
export const ErrorState = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        agreed: false,
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Checkbox
          v-model="agreed"
          error
          label="I agree to the terms and conditions"
          description="You must agree to continue"
        />
        <p v-if="!agreed" class="text-sm text-content-negative mt-2">
          Please accept the terms and conditions to proceed
        </p>
      </div>
    `,
  }),
}

// Indeterminate State (Select All)
export const IndeterminateState = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        items: ['item1', 'item2', 'item3'],
        selected: [],
      }
    },
    computed: {
      allSelected() {
        return this.selected.length === this.items.length
      },
      someSelected() {
        return this.selected.length > 0 && !this.allSelected
      },
    },
    methods: {
      toggleAll() {
        if (this.allSelected) {
          this.selected = []
        } else {
          this.selected = [...this.items]
        }
      },
    },
    template: `
      <div class="p-8 max-w-4xl space-y-4">
        <Checkbox
          :modelValue="allSelected"
          :indeterminate="someSelected"
          @update:modelValue="toggleAll"
          label="Select all items"
        />

        <div class="pl-8 space-y-3 border-l-2 border-border-default">
          <Checkbox
            v-model="selected"
            value="item1"
            label="Item 1"
          />
          <Checkbox
            v-model="selected"
            value="item2"
            label="Item 2"
          />
          <Checkbox
            v-model="selected"
            value="item3"
            label="Item 3"
          />
        </div>

        <div class="pt-4 border-t border-border-default">
          <p class="text-sm text-content-secondary">
            Selected: <strong class="text-content-primary">{{ selected.length }} / {{ items.length }}</strong>
          </p>
        </div>
      </div>
    `,
  }),
}

// Terms and Conditions (Wise Style!)
export const TermsAndConditions = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        agreedToTerms: false,
        agreedToPrivacy: false,
        agreedToMarketing: false,
      }
    },
    computed: {
      canContinue() {
        return this.agreedToTerms && this.agreedToPrivacy
      },
    },
    template: `
      <div class="p-8 max-w-4xl">
        <h3 class="text-lg font-semibold text-content-primary mb-4">
          Before you continue
        </h3>

        <div class="space-y-4 mb-6">
          <Checkbox
            v-model="agreedToTerms"
            :error="!agreedToTerms"
            label="I agree to the Terms and Conditions"
            description="Please read our terms of service carefully before agreeing."
          />

          <Checkbox
            v-model="agreedToPrivacy"
            :error="!agreedToPrivacy"
            label="I agree to the Privacy Policy"
            description="We take your privacy seriously. Learn how we protect your data."
          />

          <Checkbox
            v-model="agreedToMarketing"
            label="Send me promotional emails (optional)"
            description="Get exclusive offers and updates about new features."
          />
        </div>

        <button
          :disabled="!canContinue"
          :class="[
            'w-full px-6 py-3 rounded-lg font-medium transition-all',
            canContinue
              ? 'bg-content-accent text-white hover:bg-accent-hover cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]"
        >
          Continue
        </button>
      </div>
    `,
  }),
}

// Settings Panel
export const SettingsPanel = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        preferences: {
          marketing: false,
          updates: true,
          newsletter: false,
        },
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-6">
        <!-- Notification Settings -->
        <div>
          <h3 class="text-lg font-semibold text-content-primary mb-4">
            Notification preferences
          </h3>
          <div class="space-y-4">
            <Checkbox
              v-model="notifications.email"
              label="Email notifications"
              description="Receive notifications via email"
            />
            <Checkbox
              v-model="notifications.push"
              label="Push notifications"
              description="Receive push notifications on your device"
            />
            <Checkbox
              v-model="notifications.sms"
              label="SMS notifications"
              description="Receive text messages for important updates"
            />
          </div>
        </div>

        <!-- Marketing Preferences -->
        <div class="pt-6 border-t border-border-default">
          <h3 class="text-lg font-semibold text-content-primary mb-4">
            Marketing & communication
          </h3>
          <div class="space-y-4">
            <Checkbox
              v-model="preferences.marketing"
              label="Marketing emails"
              description="Special offers, promotions, and partner deals"
            />
            <Checkbox
              v-model="preferences.updates"
              label="Product updates"
              description="New features, improvements, and important changes"
            />
            <Checkbox
              v-model="preferences.newsletter"
              label="Monthly newsletter"
              description="Tips, insights, and stories from the Wise community"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Transaction Filters
export const TransactionFilters = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        filters: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <h3 class="text-lg font-semibold text-content-primary mb-4">
          Filter transactions
        </h3>

        <div class="space-y-3">
          <Checkbox
            v-model="filters"
            value="received"
            label="Money received"
          />
          <Checkbox
            v-model="filters"
            value="sent"
            label="Money sent"
          />
          <Checkbox
            v-model="filters"
            value="converted"
            label="Currency converted"
          />
          <Checkbox
            v-model="filters"
            value="pending"
            label="Pending transactions"
          />
          <Checkbox
            v-model="filters"
            value="cancelled"
            label="Cancelled transactions"
          />
        </div>

        <div class="pt-4 mt-4 border-t border-border-default">
          <p class="text-sm text-content-secondary">
            Active filters:
            <strong class="text-content-primary">
              {{ filters.length > 0 ? filters.join(', ') : 'None' }}
            </strong>
          </p>
        </div>
      </div>
    `,
  }),
}

// Account Setup Form
export const AccountSetupForm = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        formData: {
          accountType: [],
          features: [],
          agreedToTerms: false,
        },
      }
    },
    computed: {
      isValid() {
        return this.formData.accountType.length > 0 && this.formData.agreedToTerms
      },
    },
    template: `
      <div class="p-8 max-w-4xl space-y-8">
        <!-- Account Type -->
        <div>
          <h3 class="text-lg font-semibold text-content-primary mb-2">
            What type of account do you need?
          </h3>
          <p class="text-sm text-content-secondary mb-4">
            Select all that apply
          </p>
          <div class="space-y-3">
            <Checkbox
              v-model="formData.accountType"
              value="personal"
              label="Personal account"
              description="For your personal money transfers and everyday spending"
            />
            <Checkbox
              v-model="formData.accountType"
              value="business"
              label="Business account"
              description="For managing business payments and invoices"
            />
            <Checkbox
              v-model="formData.accountType"
              value="joint"
              label="Joint account"
              description="Share an account with family or friends"
            />
          </div>
        </div>

        <!-- Features -->
        <div class="pt-6 border-t border-border-default">
          <h3 class="text-lg font-semibold text-content-primary mb-2">
            Additional features
          </h3>
          <p class="text-sm text-content-secondary mb-4">
            Optional services you can enable
          </p>
          <div class="space-y-3">
            <Checkbox
              v-model="formData.features"
              value="card"
              label="Wise debit card"
              description="Spend in 40+ currencies at the real exchange rate"
            />
            <Checkbox
              v-model="formData.features"
              value="direct-debit"
              label="Direct debit"
              description="Set up automatic payments and subscriptions"
            />
            <Checkbox
              v-model="formData.features"
              value="multi-currency"
              label="Multi-currency account"
              description="Hold and manage money in multiple currencies"
            />
          </div>
        </div>

        <!-- Terms -->
        <div class="pt-6 border-t border-border-default">
          <Checkbox
            v-model="formData.agreedToTerms"
            :error="!formData.agreedToTerms"
          >
            <div class="text-sm">
              I agree to the
              <a href="#" class="text-content-accent hover:underline">Terms of Service</a>
              and
              <a href="#" class="text-content-accent hover:underline">Privacy Policy</a>
            </div>
          </Checkbox>
        </div>

        <!-- Submit -->
        <button
          :disabled="!isValid"
          :class="[
            'w-full px-6 py-3 rounded-lg font-medium transition-all',
            isValid
              ? 'bg-content-accent text-white hover:bg-accent-hover cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]"
        >
          Create Account
        </button>
      </div>
    `,
  }),
}

// Custom Content Slot
export const CustomContent = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        selected: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-4">
        <Checkbox v-model="selected" value="premium">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-content-primary">Premium Plan</span>
              <span class="text-sm font-bold text-content-accent">$9.99/mo</span>
            </div>
            <p class="text-sm text-content-secondary">
              Unlimited transfers, priority support, and exclusive features
            </p>
            <ul class="text-xs text-content-secondary space-y-1 pl-4">
              <li>• No transfer fees</li>
              <li>• 24/7 priority support</li>
              <li>• Multi-currency cards</li>
            </ul>
          </div>
        </Checkbox>

        <Checkbox v-model="selected" value="business">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-content-primary">Business Plan</span>
              <span class="text-sm font-bold text-content-accent">$29.99/mo</span>
            </div>
            <p class="text-sm text-content-secondary">
              Everything in Premium plus advanced business tools
            </p>
            <ul class="text-xs text-content-secondary space-y-1 pl-4">
              <li>• Batch payments</li>
              <li>• Invoice management</li>
              <li>• Team accounts</li>
            </ul>
          </div>
        </Checkbox>
      </div>
    `,
  }),
}
