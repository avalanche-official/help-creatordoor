import Chip from './Chip.vue'
import ChipGroup from './ChipGroup.vue'

export default {
  title: 'UI/Chip',
  component: Chip,
  tags: ['autodocs'],
}

// Basic Chips
export const Basic = {
  render: () => ({
    components: { Chip },
    template: `
      <div class="flex items-center gap-2 p-8">
        <Chip>All</Chip>
        <Chip selected>Active</Chip>
        <Chip>Completed</Chip>
        <Chip>Pending</Chip>
      </div>
    `,
  }),
}

// Choice Chips (Single Selection)
export const ChoiceChips = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        selected: 'all',
      }
    },
    template: `
      <div class="p-8">
        <p class="text-sm text-content-secondary mb-4">
          Selected: <strong class="text-content-primary">{{ selected }}</strong>
        </p>
        <ChipGroup type="choice" v-model="selected">
          <Chip
            :selected="selected === 'all'"
            @click="selected = 'all'"
          >
            All
          </Chip>
          <Chip
            :selected="selected === 'active'"
            @click="selected = 'active'"
          >
            Active
          </Chip>
          <Chip
            :selected="selected === 'completed'"
            @click="selected = 'completed'"
          >
            Completed
          </Chip>
          <Chip
            :selected="selected === 'pending'"
            @click="selected = 'pending'"
          >
            Pending
          </Chip>
          <Chip
            :selected="selected === 'cancelled'"
            @click="selected = 'cancelled'"
          >
            Cancelled
          </Chip>
        </ChipGroup>
      </div>
    `,
  }),
}

// Filter Chips (Multiple Selection)
export const FilterChips = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        selectedFilters: [],
      }
    },
    computed: {
      displayFilters() {
        return this.selectedFilters.length > 0 ? this.selectedFilters.join(', ') : 'None'
      },
    },
    methods: {
      toggleFilter(filter) {
        if (this.selectedFilters.includes(filter)) {
          this.selectedFilters = this.selectedFilters.filter((f) => f !== filter)
        } else {
          this.selectedFilters = [...this.selectedFilters, filter]
        }
      },
      clearFilter(filter) {
        this.selectedFilters = this.selectedFilters.filter((f) => f !== filter)
      },
    },
    template: `
      <div class="p-8">
        <p class="text-sm text-content-secondary mb-4">
          Active filters: <strong class="text-content-primary">{{ displayFilters }}</strong>
        </p>
        <ChipGroup type="filter">
          <Chip
            :selected="selectedFilters.includes('money')"
            @click="toggleFilter('money')"
            @clear="clearFilter('money')"
            clearable
          >
            💰 Money
          </Chip>
          <Chip
            :selected="selectedFilters.includes('home')"
            @click="toggleFilter('home')"
            @clear="clearFilter('home')"
            clearable
          >
            🏠 Home
          </Chip>
          <Chip
            :selected="selectedFilters.includes('food')"
            @click="toggleFilter('food')"
            @clear="clearFilter('food')"
            clearable
          >
            🍕 Food
          </Chip>
          <Chip
            :selected="selectedFilters.includes('travel')"
            @click="toggleFilter('travel')"
            @clear="clearFilter('travel')"
            clearable
          >
            ✈️ Travel
          </Chip>
          <Chip
            :selected="selectedFilters.includes('shopping')"
            @click="toggleFilter('shopping')"
            @clear="clearFilter('shopping')"
            clearable
          >
            🛍️ Shopping
          </Chip>
        </ChipGroup>
      </div>
    `,
  }),
}

// Transaction Categories (Wise Style!)
export const TransactionCategories = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        selectedCategory: 'all',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-content-primary mb-2">Filter Transactions</h3>
          <p class="text-sm text-content-secondary">
            Selected: <strong class="text-content-primary">{{ selectedCategory }}</strong>
          </p>
        </div>

        <ChipGroup type="choice">
          <Chip
            :selected="selectedCategory === 'all'"
            @click="selectedCategory = 'all'"
          >
            All
          </Chip>
          <Chip
            :selected="selectedCategory === 'received'"
            @click="selectedCategory = 'received'"
          >
            Money received
          </Chip>
          <Chip
            :selected="selectedCategory === 'sent'"
            @click="selectedCategory = 'sent'"
          >
            Money sent
          </Chip>
          <Chip
            :selected="selectedCategory === 'converted'"
            @click="selectedCategory = 'converted'"
          >
            Converted
          </Chip>
          <Chip
            :selected="selectedCategory === 'pending'"
            @click="selectedCategory = 'pending'"
          >
            Pending
          </Chip>
        </ChipGroup>
      </div>
    `,
  }),
}

// Currency Filters
export const CurrencyFilters = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        selectedCurrencies: [],
      }
    },
    computed: {
      displayCurrencies() {
        return this.selectedCurrencies.length > 0
          ? this.selectedCurrencies.join(', ')
          : 'All currencies'
      },
    },
    methods: {
      toggleCurrency(currency) {
        if (this.selectedCurrencies.includes(currency)) {
          this.selectedCurrencies = this.selectedCurrencies.filter((c) => c !== currency)
        } else {
          this.selectedCurrencies = [...this.selectedCurrencies, currency]
        }
      },
      clearCurrency(currency) {
        this.selectedCurrencies = this.selectedCurrencies.filter((c) => c !== currency)
      },
    },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-content-primary mb-2">Filter by Currency</h3>
          <p class="text-sm text-content-secondary">
            Showing: <strong class="text-content-primary">{{ displayCurrencies }}</strong>
          </p>
        </div>

        <ChipGroup type="filter">
          <Chip
            :selected="selectedCurrencies.includes('USD')"
            @click="toggleCurrency('USD')"
            @clear="clearCurrency('USD')"
            clearable
          >
            🇺🇸 USD
          </Chip>
          <Chip
            :selected="selectedCurrencies.includes('EUR')"
            @click="toggleCurrency('EUR')"
            @clear="clearCurrency('EUR')"
            clearable
          >
            🇪🇺 EUR
          </Chip>
          <Chip
            :selected="selectedCurrencies.includes('GBP')"
            @click="toggleCurrency('GBP')"
            @clear="clearCurrency('GBP')"
            clearable
          >
            🇬🇧 GBP
          </Chip>
          <Chip
            :selected="selectedCurrencies.includes('JPY')"
            @click="toggleCurrency('JPY')"
            @clear="clearCurrency('JPY')"
            clearable
          >
            🇯🇵 JPY
          </Chip>
          <Chip
            :selected="selectedCurrencies.includes('CAD')"
            @click="toggleCurrency('CAD')"
            @clear="clearCurrency('CAD')"
            clearable
          >
            🇨🇦 CAD
          </Chip>
          <Chip
            :selected="selectedCurrencies.includes('AUD')"
            @click="toggleCurrency('AUD')"
            @clear="clearCurrency('AUD')"
            clearable
          >
            🇦🇺 AUD
          </Chip>
        </ChipGroup>
      </div>
    `,
  }),
}

// Time Period Selection
export const TimePeriod = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        selectedPeriod: 'month',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-content-primary mb-2">Select Time Period</h3>
          <p class="text-sm text-content-secondary">
            Viewing: <strong class="text-content-primary">{{ selectedPeriod }}</strong>
          </p>
        </div>

        <ChipGroup type="choice">
          <Chip
            :selected="selectedPeriod === 'today'"
            @click="selectedPeriod = 'today'"
          >
            Today
          </Chip>
          <Chip
            :selected="selectedPeriod === 'week'"
            @click="selectedPeriod = 'week'"
          >
            This week
          </Chip>
          <Chip
            :selected="selectedPeriod === 'month'"
            @click="selectedPeriod = 'month'"
          >
            This month
          </Chip>
          <Chip
            :selected="selectedPeriod === 'quarter'"
            @click="selectedPeriod = 'quarter'"
          >
            This quarter
          </Chip>
          <Chip
            :selected="selectedPeriod === 'year'"
            @click="selectedPeriod = 'year'"
          >
            This year
          </Chip>
          <Chip
            :selected="selectedPeriod === 'all'"
            @click="selectedPeriod = 'all'"
          >
            All time
          </Chip>
        </ChipGroup>
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { Chip },
    template: `
      <div class="flex items-center gap-2 p-8">
        <Chip>Enabled</Chip>
        <Chip disabled>Disabled</Chip>
        <Chip selected>Selected enabled</Chip>
        <Chip selected disabled>Selected disabled</Chip>
      </div>
    `,
  }),
}

// Scrollable Chip Group
export const ScrollableChips = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        selected: 'all',
      }
    },
    template: `
      <div class="p-8" style="max-width: 600px;">
        <p class="text-sm text-content-secondary mb-4">
          Selected: <strong class="text-content-primary">{{ selected }}</strong>
        </p>
        <p class="text-xs text-content-tertiary mb-4">
          👉 Scroll horizontally to see all chips
        </p>
        <ChipGroup type="choice">
          <Chip :selected="selected === 'all'" @click="selected = 'all'">All</Chip>
          <Chip :selected="selected === 'groceries'" @click="selected = 'groceries'">Groceries</Chip>
          <Chip :selected="selected === 'restaurants'" @click="selected = 'restaurants'">Restaurants</Chip>
          <Chip :selected="selected === 'transport'" @click="selected = 'transport'">Transport</Chip>
          <Chip :selected="selected === 'entertainment'" @click="selected = 'entertainment'">Entertainment</Chip>
          <Chip :selected="selected === 'shopping'" @click="selected = 'shopping'">Shopping</Chip>
          <Chip :selected="selected === 'bills'" @click="selected = 'bills'">Bills & utilities</Chip>
          <Chip :selected="selected === 'health'" @click="selected = 'health'">Health</Chip>
          <Chip :selected="selected === 'education'" @click="selected = 'education'">Education</Chip>
          <Chip :selected="selected === 'travel'" @click="selected = 'travel'">Travel</Chip>
        </ChipGroup>
      </div>
    `,
  }),
}

// Complete Example - Transaction Dashboard
export const TransactionDashboard = {
  render: () => ({
    components: { Chip, ChipGroup },
    data() {
      return {
        timeFilter: 'month',
        categoryFilters: [],
        currencyFilters: [],
      }
    },
    computed: {
      activeFiltersCount() {
        return this.categoryFilters.length + this.currencyFilters.length
      },
    },
    methods: {
      toggleCategory(category) {
        if (this.categoryFilters.includes(category)) {
          this.categoryFilters = this.categoryFilters.filter((c) => c !== category)
        } else {
          this.categoryFilters = [...this.categoryFilters, category]
        }
      },
      toggleCurrency(currency) {
        if (this.currencyFilters.includes(currency)) {
          this.currencyFilters = this.currencyFilters.filter((c) => c !== currency)
        } else {
          this.currencyFilters = [...this.currencyFilters, currency]
        }
      },
      clearAll() {
        this.categoryFilters = []
        this.currencyFilters = []
        this.timeFilter = 'month'
      },
    },
    template: `
      <div class="p-8 max-w-4xl space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-content-primary">Transactions</h2>
          <button
            v-if="activeFiltersCount > 0"
            @click="clearAll"
            class="text-sm text-content-accent hover:text-accent-hover font-medium"
          >
            Clear all filters ({{ activeFiltersCount }})
          </button>
        </div>

        <!-- Time Period -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Time period</p>
          <ChipGroup type="choice">
            <Chip :selected="timeFilter === 'today'" @click="timeFilter = 'today'">Today</Chip>
            <Chip :selected="timeFilter === 'week'" @click="timeFilter = 'week'">This week</Chip>
            <Chip :selected="timeFilter === 'month'" @click="timeFilter = 'month'">This month</Chip>
            <Chip :selected="timeFilter === 'year'" @click="timeFilter = 'year'">This year</Chip>
            <Chip :selected="timeFilter === 'all'" @click="timeFilter = 'all'">All time</Chip>
          </ChipGroup>
        </div>

        <!-- Categories -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Categories</p>
          <ChipGroup type="filter">
            <Chip
              :selected="categoryFilters.includes('money')"
              @click="toggleCategory('money')"
              @clear="categoryFilters = categoryFilters.filter(c => c !== 'money')"
              clearable
            >
              💰 Money
            </Chip>
            <Chip
              :selected="categoryFilters.includes('food')"
              @click="toggleCategory('food')"
              @clear="categoryFilters = categoryFilters.filter(c => c !== 'food')"
              clearable
            >
              🍕 Food
            </Chip>
            <Chip
              :selected="categoryFilters.includes('transport')"
              @click="toggleCategory('transport')"
              @clear="categoryFilters = categoryFilters.filter(c => c !== 'transport')"
              clearable
            >
              🚗 Transport
            </Chip>
            <Chip
              :selected="categoryFilters.includes('shopping')"
              @click="toggleCategory('shopping')"
              @clear="categoryFilters = categoryFilters.filter(c => c !== 'shopping')"
              clearable
            >
              🛍️ Shopping
            </Chip>
          </ChipGroup>
        </div>

        <!-- Currencies -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Currencies</p>
          <ChipGroup type="filter">
            <Chip
              :selected="currencyFilters.includes('USD')"
              @click="toggleCurrency('USD')"
              @clear="currencyFilters = currencyFilters.filter(c => c !== 'USD')"
              clearable
            >
              🇺🇸 USD
            </Chip>
            <Chip
              :selected="currencyFilters.includes('EUR')"
              @click="toggleCurrency('EUR')"
              @clear="currencyFilters = currencyFilters.filter(c => c !== 'EUR')"
              clearable
            >
              🇪🇺 EUR
            </Chip>
            <Chip
              :selected="currencyFilters.includes('GBP')"
              @click="toggleCurrency('GBP')"
              @clear="currencyFilters = currencyFilters.filter(c => c !== 'GBP')"
              clearable
            >
              🇬🇧 GBP
            </Chip>
          </ChipGroup>
        </div>

        <!-- Results Summary -->
        <div class="pt-4 border-t border-border-default">
          <p class="text-sm text-content-secondary">
            Showing transactions for
            <strong class="text-content-primary">{{ timeFilter }}</strong>
            <template v-if="categoryFilters.length > 0">
              in categories: <strong class="text-content-primary">{{ categoryFilters.join(', ') }}</strong>
            </template>
            <template v-if="currencyFilters.length > 0">
              with currencies: <strong class="text-content-primary">{{ currencyFilters.join(', ') }}</strong>
            </template>
          </p>
        </div>
      </div>
    `,
  }),
}
