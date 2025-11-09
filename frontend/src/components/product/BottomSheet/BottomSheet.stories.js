import BottomSheet from './BottomSheet.vue'

export default {
  title: 'UI/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
}

// Basic Bottom Sheet
export const Basic = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
      }
    },
    template: `
      <div>
        <button
          @click="showSheet = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Open Bottom Sheet
        </button>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <h2 class="text-2xl font-semibold mb-4">Bottom Sheet Title</h2>
          <p class="text-content-secondary mb-4">
            This is a basic bottom sheet component. You can put any content here.
          </p>
          <button
            @click="showSheet = false"
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Close
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

// Select Currency (Wise Style!)
export const SelectCurrency = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
        selectedCurrency: 'GBP',
        currencies: [
          { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
          { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
          { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
          { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
          { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
          { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
          { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
        ],
      }
    },
    methods: {
      selectCurrency(code) {
        this.selectedCurrency = code
        this.showSheet = false
      },
    },
    template: `
      <div class="max-w-4xl mx-auto p-6">
        <label class="block text-sm font-medium mb-2">Select currency</label>
        <button
          @click="showSheet = true"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-[#25ccbf]"
        >
          <span>{{ selectedCurrency }}</span>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <h2 class="text-xl font-semibold mb-6">Select currency</h2>

          <div class="space-y-2">
            <button
              v-for="currency in currencies"
              :key="currency.code"
              @click="selectCurrency(currency.code)"
              class="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-background-elevated transition-colors text-left"
              :class="{ 'bg-content-accent/10': selectedCurrency === currency.code }"
            >
              <span class="text-3xl">{{ currency.flag }}</span>
              <div class="flex-1">
                <div class="font-medium">{{ currency.code }}</div>
                <div class="text-sm text-content-secondary">{{ currency.name }}</div>
              </div>
              <svg
                v-if="selectedCurrency === currency.code"
                class="w-5 h-5 text-content-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </BottomSheet>
      </div>
    `,
  }),
}

// Filter Options
export const FilterOptions = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
        filters: {
          incoming: true,
          outgoing: true,
          pending: false,
        },
      }
    },
    template: `
      <div class="max-w-4xl mx-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Transactions</h2>
          <button
            @click="showSheet = true"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-background-elevated"
          >
            Filters
          </button>
        </div>

        <p class="text-sm text-content-secondary">
          Active filters: {{ Object.values(filters).filter(Boolean).length }}
        </p>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <h2 class="text-xl font-semibold mb-6">Filter transactions</h2>

          <div class="space-y-4">
            <label class="flex items-center justify-between p-4 rounded-lg bg-background-elevated">
              <span class="font-medium">Incoming</span>
              <input
                v-model="filters.incoming"
                type="checkbox"
                class="w-5 h-5"
              />
            </label>

            <label class="flex items-center justify-between p-4 rounded-lg bg-background-elevated">
              <span class="font-medium">Outgoing</span>
              <input
                v-model="filters.outgoing"
                type="checkbox"
                class="w-5 h-5"
              />
            </label>

            <label class="flex items-center justify-between p-4 rounded-lg bg-background-elevated">
              <span class="font-medium">Pending</span>
              <input
                v-model="filters.pending"
                type="checkbox"
                class="w-5 h-5"
              />
            </label>
          </div>

          <button
            @click="showSheet = false"
            class="w-full mt-6 px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Apply filters
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

// Account Details
export const AccountDetails = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
      }
    },
    template: `
      <div class="max-w-4xl mx-auto p-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-content-secondary">GBP Balance</span>
            <button
              @click="showSheet = true"
              class="text-content-accent hover:underline text-sm font-medium"
            >
              Details
            </button>
          </div>
          <p class="text-3xl font-bold">£1,234.56</p>
        </div>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <h2 class="text-xl font-semibold mb-6">Account details</h2>

          <div class="space-y-4">
            <div>
              <p class="text-sm text-content-secondary mb-1">Account number</p>
              <div class="flex items-center justify-between p-3 bg-background-elevated rounded-lg">
                <p class="font-medium">12345678</p>
                <button class="text-content-accent text-sm hover:underline">Copy</button>
              </div>
            </div>

            <div>
              <p class="text-sm text-content-secondary mb-1">Sort code</p>
              <div class="flex items-center justify-between p-3 bg-background-elevated rounded-lg">
                <p class="font-medium">23-14-70</p>
                <button class="text-content-accent text-sm hover:underline">Copy</button>
              </div>
            </div>

            <div>
              <p class="text-sm text-content-secondary mb-1">IBAN</p>
              <div class="flex items-center justify-between p-3 bg-background-elevated rounded-lg">
                <p class="font-medium text-sm">GB29 NWBK 6016 1331 9268 19</p>
                <button class="text-content-accent text-sm hover:underline">Copy</button>
              </div>
            </div>
          </div>
        </BottomSheet>
      </div>
    `,
  }),
}

// Confirmation Sheet
export const ConfirmationSheet = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
      }
    },
    methods: {
      confirm() {
        alert('Confirmed!')
        this.showSheet = false
      },
    },
    template: `
      <div>
        <button
          @click="showSheet = true"
          class="px-4 py-2 bg-content-negative text-white rounded-lg hover:opacity-90"
        >
          Cancel Transfer
        </button>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <div class="text-center mb-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-content-warning/10 flex items-center justify-center">
              <svg class="w-8 h-8 text-content-warning" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold mb-2">Cancel this transfer?</h2>
            <p class="text-content-secondary">
              This will permanently cancel your transfer to Jane Smith.
            </p>
          </div>

          <div class="space-y-3">
            <button
              @click="confirm"
              class="w-full px-4 py-3 bg-content-negative text-white rounded-lg hover:opacity-90 font-medium"
            >
              Cancel transfer
            </button>
            <button
              @click="showSheet = false"
              class="w-full px-4 py-3 border-2 border-gray-300 text-content-primary rounded-lg hover:bg-background-elevated font-medium"
            >
              Go back
            </button>
          </div>
        </BottomSheet>
      </div>
    `,
  }),
}

// Long Content (Scrollable)
export const LongContent = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
      }
    },
    template: `
      <div>
        <button
          @click="showSheet = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          View Terms
        </button>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <h2 class="text-xl font-semibold mb-6">Terms and Conditions</h2>

          <div class="space-y-4 text-sm text-content-secondary">
            <div>
              <h3 class="font-semibold text-content-primary mb-2">1. Introduction</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div>
              <h3 class="font-semibold text-content-primary mb-2">2. User Responsibilities</h3>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div>
              <h3 class="font-semibold text-content-primary mb-2">3. Privacy Policy</h3>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>

            <div>
              <h3 class="font-semibold text-content-primary mb-2">4. Payment Terms</h3>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            <div>
              <h3 class="font-semibold text-content-primary mb-2">5. Cancellation Policy</h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            </div>

            <div>
              <h3 class="font-semibold text-content-primary mb-2">6. Limitation of Liability</h3>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
            </div>

            <div>
              <h3 class="font-semibold text-content-primary mb-2">7. Governing Law</h3>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
            </div>
          </div>

          <button
            @click="showSheet = false"
            class="w-full mt-6 px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            I agree
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

// Share Options
export const ShareOptions = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
      }
    },
    methods: {
      share(method) {
        alert(`Sharing via ${method}`)
        this.showSheet = false
      },
    },
    template: `
      <div>
        <button
          @click="showSheet = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Share
        </button>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <h2 class="text-xl font-semibold mb-6">Share via</h2>

          <div class="grid grid-cols-4 gap-4 mb-6">
            <button @click="share('WhatsApp')" class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
                📱
              </div>
              <span class="text-xs text-center">WhatsApp</span>
            </button>

            <button @click="share('Email')" class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                ✉️
              </div>
              <span class="text-xs text-center">Email</span>
            </button>

            <button @click="share('SMS')" class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl">
                💬
              </div>
              <span class="text-xs text-center">SMS</span>
            </button>

            <button @click="share('Copy')" class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center text-white text-2xl">
                📋
              </div>
              <span class="text-xs text-center">Copy</span>
            </button>
          </div>

          <button
            @click="showSheet = false"
            class="w-full px-4 py-3 border-2 border-gray-300 text-content-primary rounded-lg hover:bg-background-elevated font-medium"
          >
            Cancel
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

// Without Close Button
export const WithoutCloseButton = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
      }
    },
    template: `
      <div>
        <button
          @click="showSheet = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Open (No Close Button)
        </button>

        <BottomSheet :show="showSheet" :show-close="false" @close="showSheet = false">
          <h2 class="text-xl font-semibold mb-4">Action Required</h2>
          <p class="text-content-secondary mb-6">
            You must complete this action to continue.
          </p>

          <button
            @click="showSheet = false"
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Complete action
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

// Mobile Transaction List Example
export const TransactionList = {
  render: () => ({
    components: { BottomSheet },
    data() {
      return {
        showSheet: false,
        selectedTransaction: null,
        transactions: [
          { id: 1, name: "Sainsbury's", amount: '£8.90', date: '26 July' },
          { id: 2, name: 'Tesco', amount: '£24.50', date: '25 July' },
          { id: 3, name: 'Amazon', amount: '£45.00', date: '24 July' },
        ],
      }
    },
    methods: {
      viewTransaction(transaction) {
        this.selectedTransaction = transaction
        this.showSheet = true
      },
    },
    template: `
      <div class="max-w-4xl mx-auto p-6">
        <h2 class="text-xl font-semibold mb-4">Recent transactions</h2>

        <div class="space-y-3">
          <button
            v-for="transaction in transactions"
            :key="transaction.id"
            @click="viewTransaction(transaction)"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-background-elevated"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{{ transaction.name }}</p>
                <p class="text-sm text-content-secondary">{{ transaction.date }}</p>
              </div>
              <p class="font-bold">{{ transaction.amount }}</p>
            </div>
          </button>
        </div>

        <BottomSheet :show="showSheet" @close="showSheet = false">
          <div v-if="selectedTransaction">
            <h2 class="text-xl font-semibold mb-6">Transaction details</h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-content-secondary">Merchant</span>
                <span class="font-medium">{{ selectedTransaction.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-content-secondary">Amount</span>
                <span class="font-medium">{{ selectedTransaction.amount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-content-secondary">Date</span>
                <span class="font-medium">{{ selectedTransaction.date }}</span>
              </div>
            </div>

            <button
              @click="showSheet = false"
              class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
            >
              Done
            </button>
          </div>
        </BottomSheet>
      </div>
    `,
  }),
}
