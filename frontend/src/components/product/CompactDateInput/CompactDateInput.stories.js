import CompactDateInput from './CompactDateInput.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/CompactDateInput',
  component: CompactDateInput,
  tags: ['autodocs'],
}

// Basic Compact Date Input
export const Basic = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '', year: '' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
        />
        <p class="text-xs text-content-secondary mt-4">
          Value: {{ date.month || 'MM' }} / {{ date.year || 'YY' }}
        </p>
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '', year: '' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
          description="Enter the expiration date on your card"
        />
      </div>
    `,
  }),
}

// Required Field
export const Required = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '', year: '' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
          required
        />
      </div>
    `,
  }),
}

// Success State
export const Success = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '12', year: '28' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
          state="success"
        />
      </div>
    `,
  }),
}

// Error State
export const Error = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '', year: '' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
          state="error"
          error-message="Please enter a valid expiry date"
          required
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '12', year: '28' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
          disabled
        />
      </div>
    `,
  }),
}

// Credit Card Form
export const CreditCardForm = {
  render: () => ({
    components: { CompactDateInput, Card },
    data() {
      return {
        cardNumber: '',
        expiryDate: { month: '', year: '' },
        cvv: '',
        touched: false,
      }
    },
    computed: {
      isValidExpiry() {
        const month = parseInt(this.expiryDate.month, 10)
        const year = parseInt(this.expiryDate.year, 10)

        if (!month || !year || month < 1 || month > 12) return false

        // Check if date is in the future
        const now = new Date()
        const currentYear = now.getFullYear() % 100 // Get last 2 digits
        const currentMonth = now.getMonth() + 1

        if (year < currentYear) return false
        if (year === currentYear && month < currentMonth) return false

        return true
      },
      expiryState() {
        if (!this.touched) return 'default'
        if (!this.expiryDate.month || !this.expiryDate.year) return 'error'
        return this.isValidExpiry ? 'success' : 'error'
      },
      errorMessage() {
        if (!this.expiryDate.month || !this.expiryDate.year) {
          return 'Please enter expiry date'
        }
        if (!this.isValidExpiry) {
          return 'Card has expired or invalid date'
        }
        return ''
      },
    },
    methods: {
      handleBlur() {
        this.touched = true
      },
      handleSubmit() {
        if (this.isValidExpiry) {
          alert('Card details submitted!')
        }
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Add payment card</h2>
          <p class="text-sm text-content-secondary mb-8">Enter your card details</p>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Card number
              </label>
              <input
                v-model="cardNumber"
                type="text"
                maxlength="19"
                placeholder="1234 5678 9012 3456"
                class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20 outline-none transition-all"
              />
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <CompactDateInput
                  v-model="expiryDate"
                  label="Expiry date"
                  :state="expiryState"
                  :error-message="errorMessage"
                  required
                  @blur="handleBlur"
                />
              </div>

              <div class="w-24">
                <label class="block text-sm font-medium text-content-primary mb-2">
                  CVV
                </label>
                <input
                  v-model="cvv"
                  type="text"
                  maxlength="3"
                  placeholder="123"
                  class="w-full px-4 py-3 text-base text-center border border-gray-300 rounded-lg hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                :disabled="!isValidExpiry"
                class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Add card
              </button>
            </div>
          </form>
        </Card>
      </div>
    `,
  }),
}

// Subscription Expiry
export const SubscriptionExpiry = {
  render: () => ({
    components: { CompactDateInput, Card },
    data() {
      return {
        expiryDate: { month: '', year: '' },
        touched: false,
      }
    },
    computed: {
      isValid() {
        return (
          this.expiryDate.month &&
          this.expiryDate.year &&
          parseInt(this.expiryDate.month) >= 1 &&
          parseInt(this.expiryDate.month) <= 12
        )
      },
      dateState() {
        if (!this.touched) return 'default'
        return this.isValid ? 'success' : 'error'
      },
      formattedExpiry() {
        if (!this.expiryDate.month || !this.expiryDate.year) return 'Not set'
        return `${this.expiryDate.month.padStart(2, '0')}/${this.expiryDate.year.padStart(2, '0')}`
      },
    },
    methods: {
      handleBlur() {
        this.touched = true
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-1">Subscription details</h2>
          <p class="text-sm text-content-secondary mb-8">When does your subscription expire?</p>

          <div class="space-y-6">
            <CompactDateInput
              v-model="expiryDate"
              label="Expiry date"
              description="Month and year your subscription expires"
              :state="dateState"
              error-message="Please enter a valid month and year"
              required
              @blur="handleBlur"
            />

            <div v-if="isValid" class="p-4 bg-background-elevated rounded-lg">
              <p class="text-sm text-content-secondary">
                📅 <strong class="text-content-primary">Your subscription expires:</strong> {{ formattedExpiry }}
              </p>
            </div>

            <button
              type="button"
              :disabled="!isValid"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Update expiry date
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Validation Example
export const ValidationExample = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        date: { month: '', year: '' },
        touched: false,
      }
    },
    computed: {
      isValidMonth() {
        const month = parseInt(this.date.month, 10)
        return month >= 1 && month <= 12
      },
      isExpired() {
        if (!this.date.month || !this.date.year) return false

        const month = parseInt(this.date.month, 10)
        const year = parseInt(this.date.year, 10)
        const now = new Date()
        const currentYear = now.getFullYear() % 100
        const currentMonth = now.getMonth() + 1

        if (year < currentYear) return true
        if (year === currentYear && month < currentMonth) return true

        return false
      },
      dateState() {
        if (!this.touched) return 'default'
        if (!this.date.month || !this.date.year) return 'error'
        if (!this.isValidMonth) return 'error'
        if (this.isExpired) return 'error'
        return 'success'
      },
      errorMessage() {
        if (!this.date.month || !this.date.year) return 'Please enter complete date'
        if (!this.isValidMonth) return 'Month must be between 01 and 12'
        if (this.isExpired) return 'Date has already expired'
        return ''
      },
    },
    methods: {
      handleBlur() {
        this.touched = true
      },
    },
    template: `
      <div class="p-8 max-w-4xl">
        <CompactDateInput
          v-model="date"
          label="Expiry date"
          description="Enter a future date (MM/YY format)"
          :state="dateState"
          :error-message="errorMessage"
          required
          @blur="handleBlur"
        />

        <div class="mt-4 p-4 bg-background-elevated rounded-lg text-xs text-content-secondary space-y-1">
          <p><strong>Validation rules:</strong></p>
          <p>✓ Month must be 01-12</p>
          <p>✓ Year must be 2 digits</p>
          <p>✓ Date must not be expired</p>
          <p>✓ Auto-advances from month to year</p>
        </div>
      </div>
    `,
  }),
}

// All States Comparison
export const AllStates = {
  render: () => ({
    components: { CompactDateInput },
    data() {
      return {
        default: { month: '', year: '' },
        success: { month: '12', year: '28' },
        error: { month: '', year: '' },
        disabled: { month: '12', year: '28' },
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-8">
        <CompactDateInput
          v-model="default"
          label="Default state"
          description="Type to enter month and year"
        />

        <CompactDateInput
          v-model="success"
          label="Success state"
          state="success"
        />

        <CompactDateInput
          v-model="error"
          label="Error state"
          state="error"
          error-message="Please enter a valid expiry date"
        />

        <CompactDateInput
          v-model="disabled"
          label="Disabled state"
          disabled
        />
      </div>
    `,
  }),
}

// Best Practices
export const BestPractices = {
  render: () => ({
    components: { CompactDateInput, Card },
    template: `
      <div class="p-8 max-w-4xl">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Wise Compact Date Input Best Practices</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Good Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">When to use</h3>
            </div>

            <div class="space-y-6">
              <div>
                <CompactDateInput label="Expiry date" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ User knows the date (card expiry)
                </p>
              </div>

              <div>
                <CompactDateInput label="Valid until" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Short date without day (MM/YY)
                </p>
              </div>

              <div>
                <CompactDateInput label="Subscription ends" description="Month and year" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ User can easily find this info
                </p>
              </div>
            </div>
          </Card>

          <!-- Bad Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <h3 class="text-lg font-semibold text-content-negative">Don't use for</h3>
            </div>

            <div class="space-y-6">
              <div>
                <CompactDateInput label="Date of birth" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Needs full date with day - use Date Input
                </p>
              </div>

              <div>
                <CompactDateInput label="Travel dates" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Multiple dates/range - use date lookup
                </p>
              </div>

              <div>
                <CompactDateInput label="Event date" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Needs full date - use Date Input or Date Picker
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Use for <strong>short dates</strong> (month/year only, no day)</li>
            <li>Perfect for dates user already knows (card expiry, subscription end)</li>
            <li>Auto-advances from month to year when complete</li>
            <li>Validates month (01-12) automatically</li>
            <li>NOT for full dates or date ranges</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
