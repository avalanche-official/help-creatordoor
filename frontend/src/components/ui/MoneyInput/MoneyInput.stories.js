import MoneyInput from './MoneyInput.vue'

export default {
  title: 'UI/MoneyInput',
  component: MoneyInput,
  tags: ['autodocs'],
}

const currencies = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
]

// Basic Money Input
export const Basic = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        amount: '',
        currency: 'EUR',
        currencies,
      }
    },
    template: `
      <div class="max-w-4xl">
        <MoneyInput
          v-model="amount"
          :currency="currency"
          :currencies="currencies"
          @update:currency="currency = $event"
        />

        <p v-if="amount" class="mt-4 text-sm text-content-secondary">
          You're sending: <strong>{{ amount }} {{ currency }}</strong>
        </p>
      </div>
    `,
  }),
}

// Transfer Flow (Wise Style!)
export const TransferFlow = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        sendAmount: '',
        sendCurrency: 'EUR',
        receiveAmount: '',
        receiveCurrency: 'USD',
        exchangeRate: 1.08,
        currencies,
      }
    },
    watch: {
      sendAmount(val) {
        if (val) {
          this.receiveAmount = (parseFloat(val) * this.exchangeRate).toFixed(2)
        } else {
          this.receiveAmount = ''
        }
      },
    },
    template: `
      <div class="max-w-4xl">
        <div class="space-y-4">
          <!-- You Send -->
          <MoneyInput
            v-model="sendAmount"
            :currency="sendCurrency"
            :currencies="currencies"
            label="You send"
            @update:currency="sendCurrency = $event"
          />

          <!-- Exchange Rate -->
          <div class="flex items-center justify-between px-4 py-2 bg-background-elevated rounded-lg">
            <span class="text-sm text-content-secondary">Exchange rate</span>
            <span class="font-medium">1 {{ sendCurrency }} = {{ exchangeRate }} {{ receiveCurrency }}</span>
          </div>

          <!-- They Receive -->
          <MoneyInput
            v-model="receiveAmount"
            :currency="receiveCurrency"
            :currencies="currencies"
            label="They receive"
            @update:currency="receiveCurrency = $event"
          />

          <!-- Continue Button -->
          <button
            :disabled="!sendAmount"
            :class="[
              'w-full px-4 py-3 rounded-lg font-medium transition-opacity',
              sendAmount
                ? 'bg-content-accent text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Continue
          </button>
        </div>
      </div>
    `,
  }),
}

// With Disabled Currency Selector
export const WithDisabledCurrencySelector = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        amount: '1000',
        currency: 'GBP',
        currencies,
      }
    },
    template: `
      <div class="max-w-4xl">
        <MoneyInput
          v-model="amount"
          :currency="currency"
          :currencies="currencies"
          label="From your GBP balance"
          disable-currency-selector
        />
        <p class="mt-2 text-sm text-content-secondary">
          You can only send from your GBP balance
        </p>
      </div>
    `,
  }),
}

// Read-Only Amount
export const ReadOnlyAmount = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        amount: '250.00',
        currency: 'EUR',
        currencies,
      }
    },
    template: `
      <div class="max-w-4xl">
        <MoneyInput
          v-model="amount"
          :currency="currency"
          :currencies="currencies"
          label="Amount to convert"
          read-only
        />
        <p class="mt-2 text-sm text-content-secondary">
          This amount is fixed and cannot be changed
        </p>
      </div>
    `,
  }),
}

// With Info Icon
export const WithInfoIcon = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        amount: '',
        currency: 'EUR',
        currencies,
        showPopover: false,
      }
    },
    template: `
      <div class="max-w-4xl">
        <MoneyInput
          v-model="amount"
          :currency="currency"
          :currencies="currencies"
          label="You send"
          show-info
          @info-click="showPopover = !showPopover"
        />

        <div v-if="showPopover" class="mt-4 p-4 bg-content-accent/10 border border-content-accent/30 rounded-lg text-sm">
          <strong>Guaranteed rate</strong><br>
          You'll get this rate as long as we receive your money within the next 48 hours.
        </div>
      </div>
    `,
  }),
}

// Convert Money
export const ConvertMoney = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        fromAmount: '',
        fromCurrency: 'GBP',
        toAmount: '',
        toCurrency: 'EUR',
        rate: 1.17,
        currencies,
      }
    },
    watch: {
      fromAmount(val) {
        if (val) {
          this.toAmount = (parseFloat(val) * this.rate).toFixed(2)
        } else {
          this.toAmount = ''
        }
      },
    },
    template: `
      <div class="max-w-4xl">
        <div class="p-6 bg-white border border-border-default rounded-lg">
          <h2 class="text-xl font-semibold mb-6">Convert your balance</h2>

          <div class="space-y-4">
            <MoneyInput
              v-model="fromAmount"
              :currency="fromCurrency"
              :currencies="currencies"
              label="From"
              @update:currency="fromCurrency = $event"
            />

            <div class="flex justify-center">
              <button class="p-2 rounded-full bg-background-elevated hover:bg-gray-200">
                <svg class="w-6 h-6 text-content-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            <MoneyInput
              v-model="toAmount"
              :currency="toCurrency"
              :currencies="currencies"
              label="To"
              read-only
              @update:currency="toCurrency = $event"
            />

            <div class="p-3 bg-background-elevated rounded-lg text-sm">
              <div class="flex justify-between mb-1">
                <span class="text-content-secondary">Rate</span>
                <span class="font-medium">1 {{ fromCurrency }} = {{ rate }} {{ toCurrency }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-content-secondary">Fee</span>
                <span class="font-medium text-content-positive">Free</span>
              </div>
            </div>

            <button class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
              Convert
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}

// Disabled State
export const DisabledState = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        amount: '500',
        currency: 'USD',
        currencies,
      }
    },
    template: `
      <div class="max-w-4xl">
        <MoneyInput
          v-model="amount"
          :currency="currency"
          :currencies="currencies"
          disabled
        />
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { MoneyInput },
    data() {
      return {
        empty: '',
        withValue: '1000',
        readOnly: '500',
        disabled: '750',
        disabledCurrency: '250',
        currency: 'EUR',
        currencies,
      }
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Empty</h3>
          <MoneyInput
            v-model="empty"
            :currency="currency"
            :currencies="currencies"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">With Value</h3>
          <MoneyInput
            v-model="withValue"
            :currency="currency"
            :currencies="currencies"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Read-Only Amount</h3>
          <MoneyInput
            v-model="readOnly"
            :currency="currency"
            :currencies="currencies"
            read-only
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Disabled Currency Selector</h3>
          <MoneyInput
            v-model="disabledCurrency"
            :currency="currency"
            :currencies="currencies"
            disable-currency-selector
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Disabled</h3>
          <MoneyInput
            v-model="disabled"
            :currency="currency"
            :currencies="currencies"
            disabled
          />
        </div>
      </div>
    `,
  }),
}
