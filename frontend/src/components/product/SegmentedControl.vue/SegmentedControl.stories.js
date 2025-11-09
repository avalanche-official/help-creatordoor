import SegmentedControl from './SegmentedControl.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
}

// Basic Segmented Control (2 options)
export const TwoOptions = {
  render: () => ({
    components: { SegmentedControl },
    data() {
      return {
        selected: 'personal',
        options: [
          { label: 'Personal', value: 'personal' },
          { label: 'Business', value: 'business' },
        ],
      }
    },
    template: `
      <div class="p-8 flex flex-col items-center">
        <SegmentedControl
          v-model="selected"
          :options="options"
        />
        <p class="text-sm text-content-secondary mt-4">Selected: {{ selected }}</p>
      </div>
    `,
  }),
}

// Three Options
export const ThreeOptions = {
  render: () => ({
    components: { SegmentedControl },
    data() {
      return {
        selected: 'day',
        options: [
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
          { label: 'Month', value: 'month' },
        ],
      }
    },
    template: `
      <div class="p-8 flex flex-col items-center">
        <SegmentedControl
          v-model="selected"
          :options="options"
        />
        <p class="text-sm text-content-secondary mt-4">Selected: {{ selected }}</p>
      </div>
    `,
  }),
}

// Small Size
export const SmallSize = {
  render: () => ({
    components: { SegmentedControl },
    data() {
      return {
        selected: 'grid',
        options: [
          { label: 'List', value: 'list' },
          { label: 'Grid', value: 'grid' },
        ],
      }
    },
    template: `
      <div class="p-8 flex flex-col items-center">
        <SegmentedControl
          v-model="selected"
          :options="options"
          size="small"
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { SegmentedControl },
    data() {
      return {
        selected: 'personal',
        options: [
          { label: 'Personal', value: 'personal' },
          { label: 'Business', value: 'business' },
        ],
      }
    },
    template: `
      <div class="p-8 flex flex-col items-center">
        <SegmentedControl
          v-model="selected"
          :options="options"
          disabled
        />
      </div>
    `,
  }),
}

// Account Type Selection
export const AccountType = {
  render: () => ({
    components: { SegmentedControl, Card },
    data() {
      return {
        accountType: 'personal',
        options: [
          { label: 'Personal', value: 'personal' },
          { label: 'Business', value: 'business' },
        ],
      }
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-content-primary mb-2">Open an account</h2>
            <p class="text-sm text-content-secondary">Choose your account type</p>
          </div>

          <div class="flex justify-center mb-8">
            <SegmentedControl
              v-model="accountType"
              :options="options"
            />
          </div>

          <div v-if="accountType === 'personal'" class="p-4 bg-background-elevated rounded-lg">
            <h3 class="font-semibold text-content-primary mb-2">Personal Account</h3>
            <p class="text-sm text-content-secondary">
              Perfect for individuals managing their own money
            </p>
          </div>

          <div v-if="accountType === 'business'" class="p-4 bg-background-elevated rounded-lg">
            <h3 class="font-semibold text-content-primary mb-2">Business Account</h3>
            <p class="text-sm text-content-secondary">
              Designed for businesses and freelancers
            </p>
          </div>

          <button class="w-full mt-6 px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all">
            Continue
          </button>
        </Card>
      </div>
    `,
  }),
}

// View Switcher
export const ViewSwitcher = {
  render: () => ({
    components: { SegmentedControl, Card },
    data() {
      return {
        view: 'activity',
        options: [
          { label: 'Activity', value: 'activity' },
          { label: 'Details', value: 'details' },
          { label: 'Documents', value: 'documents' },
        ],
      }
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-content-primary">Transfer #12345</h2>
          </div>

          <div class="flex justify-center mb-8">
            <SegmentedControl
              v-model="view"
              :options="options"
            />
          </div>

          <!-- Activity View -->
          <div v-if="view === 'activity'" class="space-y-4">
            <div class="flex items-center gap-3 p-3 bg-background-elevated rounded-lg">
              <div class="w-2 h-2 rounded-full bg-content-positive"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-content-primary">Money sent</p>
                <p class="text-xs text-content-secondary">Today at 10:30 AM</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-background-elevated rounded-lg">
              <div class="w-2 h-2 rounded-full bg-content-accent"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-content-primary">Transfer created</p>
                <p class="text-xs text-content-secondary">Today at 10:28 AM</p>
              </div>
            </div>
          </div>

          <!-- Details View -->
          <div v-if="view === 'details'" class="space-y-3">
            <div class="flex justify-between py-3 border-b border-border-default">
              <span class="text-sm text-content-secondary">Amount</span>
              <span class="text-sm font-medium text-content-primary">$500.00</span>
            </div>
            <div class="flex justify-between py-3 border-b border-border-default">
              <span class="text-sm text-content-secondary">Recipient</span>
              <span class="text-sm font-medium text-content-primary">John Doe</span>
            </div>
            <div class="flex justify-between py-3 border-b border-border-default">
              <span class="text-sm text-content-secondary">Reference</span>
              <span class="text-sm font-medium text-content-primary">Invoice #123</span>
            </div>
          </div>

          <!-- Documents View -->
          <div v-if="view === 'documents'" class="text-center py-8">
            <p class="text-content-secondary">No documents uploaded</p>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Transaction Period Filter
export const TransactionFilter = {
  render: () => ({
    components: { SegmentedControl },
    data() {
      return {
        period: 'week',
        options: [
          { label: 'Week', value: 'week' },
          { label: 'Month', value: 'month' },
          { label: 'Year', value: 'year' },
        ],
        transactions: {
          week: 12,
          month: 48,
          year: 365,
        },
      }
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <div class="mb-6 text-center">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Transactions</h2>
          <p class="text-sm text-content-secondary">View your transaction history</p>
        </div>

        <div class="flex justify-center mb-8">
          <SegmentedControl
            v-model="period"
            :options="options"
          />
        </div>

        <div class="bg-white rounded-lg border border-border-default p-6 text-center">
          <div class="text-4xl font-bold text-content-primary mb-2">
            {{ transactions[period] }}
          </div>
          <p class="text-sm text-content-secondary">
            transactions this {{ period }}
          </p>
        </div>
      </div>
    `,
  }),
}

// Form Payment Method
export const PaymentMethodForm = {
  render: () => ({
    components: { SegmentedControl, Card },
    data() {
      return {
        paymentMethod: 'card',
        options: [
          { label: 'Card', value: 'card' },
          { label: 'Bank transfer', value: 'bank' },
        ],
      }
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Add money</h2>
          <p class="text-sm text-content-secondary mb-8">Choose your payment method</p>

          <div class="mb-6">
            <label class="block text-sm font-medium text-content-primary mb-3">
              Payment method
            </label>
            <div class="flex justify-center">
              <SegmentedControl
                v-model="paymentMethod"
                :options="options"
              />
            </div>
          </div>

          <!-- Card Form -->
          <div v-if="paymentMethod === 'card'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Card number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20 outline-none transition-all"
              />
            </div>
            <div class="text-xs text-content-secondary">
              💳 Your card will be charged immediately
            </div>
          </div>

          <!-- Bank Transfer Info -->
          <div v-if="paymentMethod === 'bank'" class="p-4 bg-background-elevated rounded-lg">
            <p class="text-sm text-content-secondary mb-2">
              🏦 Transfer money from your bank account
            </p>
            <p class="text-xs text-content-tertiary">
              Usually arrives in 1-2 business days
            </p>
          </div>

          <button class="w-full mt-6 px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all">
            Continue
          </button>
        </Card>
      </div>
    `,
  }),
}

// Long Text Wrapping
export const LongTextWrapping = {
  render: () => ({
    components: { SegmentedControl },
    data() {
      return {
        selected: 'option1',
        options: [
          { label: 'Short option', value: 'option1' },
          { label: 'Really long option text here', value: 'option2' },
        ],
      }
    },
    template: `
      <div class="p-8 flex flex-col items-center" style="max-width: 700px; margin: 0 auto;">
        <SegmentedControl
          v-model="selected"
          :options="options"
        />
        <p class="text-xs text-content-secondary mt-4 text-center">
          ✓ Text wraps to 2 lines if needed (no truncation)
        </p>
      </div>
    `,
  }),
}

// Sequential Options (1, 2, 3)
export const SequentialSteps = {
  render: () => ({
    components: { SegmentedControl, Card },
    data() {
      return {
        step: 1,
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
        ],
      }
    },
    computed: {
      stepContent() {
        const content = {
          1: {
            title: 'Step 1: Personal details',
            description: 'Enter your name and email address',
          },
          2: {
            title: 'Step 2: Address',
            description: 'Provide your home address',
          },
          3: {
            title: 'Step 3: Verification',
            description: 'Verify your identity',
          },
        }
        return content[this.step]
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <div class="flex justify-center mb-8">
            <SegmentedControl
              v-model="step"
              :options="options"
            />
          </div>

          <div class="text-center mb-6">
            <h3 class="text-lg font-semibold text-content-primary mb-2">
              {{ stepContent.title }}
            </h3>
            <p class="text-sm text-content-secondary">
              {{ stepContent.description }}
            </p>
          </div>

          <div class="flex gap-3">
            <button
              @click="step = Math.max(1, step - 1)"
              :disabled="step === 1"
              class="flex-1 px-4 py-2 border border-border-default text-content-primary rounded-lg font-medium hover:bg-background-elevated disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Back
            </button>
            <button
              @click="step = Math.min(3, step + 1)"
              :disabled="step === 3"
              class="flex-1 px-4 py-2 bg-content-accent text-white rounded-lg font-medium hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Best Practices
export const BestPractices = {
  render: () => ({
    components: { SegmentedControl, Card },
    data() {
      return {
        good1: 'personal',
        good2: 'day',
        bad1: 'opt1',
        bad2: 'opt1',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Segmented Control Best Practices</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Good Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">Good examples</h3>
            </div>

            <div class="space-y-6">
              <div>
                <div class="flex justify-center mb-2">
                  <SegmentedControl
                    v-model="good1"
                    :options="[
                      { label: 'Personal', value: 'personal' },
                      { label: 'Business', value: 'business' }
                    ]"
                  />
                </div>
                <p class="text-xs text-content-secondary text-center">
                  ✓ 1-3 words, similar options
                </p>
              </div>

              <div>
                <div class="flex justify-center mb-2">
                  <SegmentedControl
                    v-model="good2"
                    :options="[
                      { label: 'Day', value: 'day' },
                      { label: 'Week', value: 'week' },
                      { label: 'Month', value: 'month' }
                    ]"
                  />
                </div>
                <p class="text-xs text-content-secondary text-center">
                  ✓ Consistent hierarchy, capitalized
                </p>
              </div>

              <div class="text-xs text-content-secondary space-y-1">
                <p>✓ Center-aligned with content</p>
                <p>✓ For updating/selecting, not navigating</p>
                <p>✓ Text wraps if needed (no truncation)</p>
              </div>
            </div>
          </Card>

          <!-- Bad Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <h3 class="text-lg font-semibold text-content-negative">Avoid</h3>
            </div>

            <div class="space-y-6">
              <div>
                <div class="flex justify-center mb-2">
                  <SegmentedControl
                    v-model="bad1"
                    :options="[
                      { label: 'One option here!', value: 'opt1' },
                      { label: 'Different', value: 'opt2' }
                    ]"
                  />
                </div>
                <p class="text-xs text-content-secondary text-center">
                  ✗ Punctuation, inconsistent length
                </p>
              </div>

              <div>
                <div class="flex justify-center mb-2">
                  <SegmentedControl
                    v-model="bad2"
                    :options="[
                      { label: 'Home', value: 'opt1' },
                      { label: 'Profile', value: 'opt2' }
                    ]"
                  />
                </div>
                <p class="text-xs text-content-secondary text-center">
                  ✗ Don't use for navigation (use tabs)
                </p>
              </div>

              <div class="text-xs text-content-secondary space-y-1">
                <p>✗ More than 3 options</p>
                <p>✗ 100% width on desktop</p>
                <p>✗ Left-aligned</p>
                <p>✗ Dissimilar/unrelated options</p>
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Use for <strong>updating views or selecting options</strong>, not navigation</li>
            <li>2-3 options only, all similar/alike</li>
            <li>Short labels (1-3 words), capitalize first letter</li>
            <li>Center-aligned, never 100% width on desktop</li>
            <li>Text wraps over 2 lines if needed (never truncate)</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
