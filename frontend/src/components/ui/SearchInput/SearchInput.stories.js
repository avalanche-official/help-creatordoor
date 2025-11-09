import SearchInput from './SearchInput.vue'

export default {
  title: 'UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
}

// Basic Search Input
export const Basic = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
      }
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput v-model="query" />

        <p v-if="query" class="mt-4 text-sm text-content-secondary">
          Searching for: <strong>{{ query }}</strong>
        </p>
      </div>
    `,
  }),
}

// With Label
export const WithLabel = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
      }
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Search"
        />
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
      }
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Search transactions"
          description="Search by recipient name, amount, or date"
        />
      </div>
    `,
  }),
}

// Different Sizes
export const Sizes = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        small: '',
        medium: '',
        large: '',
      }
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <div>
          <p class="text-sm font-semibold mb-3 text-content-secondary">Small</p>
          <SearchInput v-model="small" size="small" placeholder="Small search" />
        </div>

        <div>
          <p class="text-sm font-semibold mb-3 text-content-secondary">Medium (Default)</p>
          <SearchInput v-model="medium" size="medium" placeholder="Medium search" />
        </div>

        <div>
          <p class="text-sm font-semibold mb-3 text-content-secondary">Large</p>
          <SearchInput v-model="large" size="large" placeholder="Large search" />
        </div>
      </div>
    `,
  }),
}

// With Search Event
export const WithSearchEvent = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
        searches: [],
      }
    },
    methods: {
      handleSearch(value) {
        this.searches.unshift({
          query: value,
          time: new Date().toLocaleTimeString(),
        })
      },
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Search"
          placeholder="Type and press Enter"
          @search="handleSearch"
        />

        <div v-if="searches.length" class="mt-6">
          <h3 class="text-sm font-semibold mb-3 text-content-primary">Search History</h3>
          <div class="space-y-2">
            <div
              v-for="(search, index) in searches.slice(0, 5)"
              :key="index"
              class="p-3 bg-background-elevated rounded-lg text-sm"
            >
              <span class="font-medium">{{ search.query }}</span>
              <span class="text-content-secondary ml-2">at {{ search.time }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Transaction Search (Wise Style!)
export const TransactionSearch = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
        transactions: [
          { id: 1, recipient: 'Jane Smith', amount: '$250.00', date: '10 Jan 2025' },
          { id: 2, recipient: 'John Doe', amount: '$1,500.00', date: '8 Jan 2025' },
          { id: 3, recipient: 'Acme Corp', amount: '$750.00', date: '5 Jan 2025' },
          { id: 4, recipient: 'Tech Solutions Ltd', amount: '$420.00', date: '3 Jan 2025' },
          { id: 5, recipient: 'Jane Smith', amount: '$100.00', date: '1 Jan 2025' },
        ],
      }
    },
    computed: {
      filteredTransactions() {
        if (!this.query) return this.transactions
        const q = this.query.toLowerCase()
        return this.transactions.filter(
          (t) =>
            t.recipient.toLowerCase().includes(q) ||
            t.amount.includes(q) ||
            t.date.toLowerCase().includes(q),
        )
      },
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Search transactions"
          placeholder="Search by recipient, amount, or date"
        />

        <div class="mt-6">
          <p class="text-sm text-content-secondary mb-3">
            {{ filteredTransactions.length }} results
          </p>
          <div class="space-y-3">
            <div
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              class="p-4 bg-white border border-border-default rounded-lg flex justify-between"
            >
              <div>
                <div class="font-medium">{{ transaction.recipient }}</div>
                <div class="text-sm text-content-secondary">{{ transaction.date }}</div>
              </div>
              <div class="font-medium">{{ transaction.amount }}</div>
            </div>
          </div>

          <div v-if="!filteredTransactions.length" class="text-center py-8 text-content-secondary">
            No transactions found
          </div>
        </div>
      </div>
    `,
  }),
}

// Help Center Search
export const HelpCenterSearch = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
        articles: [
          { title: 'How to send money', category: 'Transfers' },
          { title: 'How to verify your account', category: 'Account' },
          { title: 'How to add a recipient', category: 'Transfers' },
          { title: 'How to change your password', category: 'Security' },
          { title: 'How to convert currency', category: 'Currency' },
          { title: 'How to request money', category: 'Transfers' },
        ],
      }
    },
    computed: {
      filteredArticles() {
        if (!this.query) return []
        const q = this.query.toLowerCase()
        return this.articles.filter(
          (a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q),
        )
      },
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">How can we help?</h2>

        <SearchInput
          v-model="query"
          placeholder="Search help articles"
          size="large"
        />

        <div v-if="query" class="mt-6">
          <div v-if="filteredArticles.length" class="space-y-3">
            <button
              v-for="article in filteredArticles"
              :key="article.title"
              class="w-full p-4 bg-white border border-border-default rounded-lg text-left hover:bg-background-elevated transition-colors"
            >
              <div class="font-medium">{{ article.title }}</div>
              <div class="text-sm text-content-secondary mt-1">{{ article.category }}</div>
            </button>
          </div>

          <div v-else class="text-center py-8 text-content-secondary">
            No help articles found for "{{ query }}"
          </div>
        </div>
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: 'Cannot edit this',
      }
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Search"
          disabled
        />
      </div>
    `,
  }),
}

// Live Search with Debounce
export const LiveSearch = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
        isSearching: false,
        results: [],
        debounceTimer: null,
      }
    },
    watch: {
      query(newVal) {
        clearTimeout(this.debounceTimer)
        if (!newVal) {
          this.results = []
          return
        }

        this.isSearching = true
        this.debounceTimer = setTimeout(() => {
          this.performSearch(newVal)
        }, 500)
      },
    },
    methods: {
      performSearch(query) {
        // Simulate API call
        setTimeout(() => {
          this.results = [
            `Result 1 for "${query}"`,
            `Result 2 for "${query}"`,
            `Result 3 for "${query}"`,
          ]
          this.isSearching = false
        }, 300)
      },
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Live search"
          placeholder="Start typing to search..."
        />

        <div v-if="isSearching" class="mt-4 text-sm text-content-secondary">
          Searching...
        </div>

        <div v-else-if="results.length" class="mt-4 space-y-2">
          <div
            v-for="(result, index) in results"
            :key="index"
            class="p-3 bg-background-elevated rounded-lg text-sm"
          >
            {{ result }}
          </div>
        </div>
      </div>
    `,
  }),
}

// Recipient Search
export const RecipientSearch = {
  render: () => ({
    components: { SearchInput },
    data() {
      return {
        query: '',
        recipients: [
          { name: 'Jane Smith', email: 'jane@example.com', avatar: '👩' },
          { name: 'John Doe', email: 'john@example.com', avatar: '👨' },
          { name: 'Acme Corp', email: 'contact@acme.com', avatar: '🏢' },
          { name: 'Tech Solutions', email: 'info@techsolutions.com', avatar: '💻' },
        ],
      }
    },
    computed: {
      filteredRecipients() {
        if (!this.query) return []
        const q = this.query.toLowerCase()
        return this.recipients.filter(
          (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q),
        )
      },
    },
    template: `
      <div class="max-w-4xl">
        <SearchInput
          v-model="query"
          label="Search recipients"
          placeholder="Name or email"
        />

        <div v-if="query && filteredRecipients.length" class="mt-4 space-y-2">
          <button
            v-for="recipient in filteredRecipients"
            :key="recipient.email"
            class="w-full flex items-center gap-3 p-3 bg-white border border-border-default rounded-lg text-left hover:bg-background-elevated transition-colors"
          >
            <div class="text-2xl">{{ recipient.avatar }}</div>
            <div class="flex-1">
              <div class="font-medium">{{ recipient.name }}</div>
              <div class="text-sm text-content-secondary">{{ recipient.email }}</div>
            </div>
          </button>
        </div>
      </div>
    `,
  }),
}
