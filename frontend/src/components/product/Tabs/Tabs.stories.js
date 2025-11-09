import Tabs from './Tabs.vue'
import Tab from './Tab.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

// Basic Tabs
export const Basic = {
  render: () => ({
    components: { Tabs, Tab },
    data() {
      return {
        activeTab: 'tab1',
      }
    },
    template: `
      <div class="p-8">
        <Tabs v-model="activeTab">
          <Tab value="tab1" label="Tab 1" />
          <Tab value="tab2" label="Tab 2" />
          <Tab value="tab3" label="Tab 3" />
        </Tabs>

        <div class="mt-6 p-4 bg-background-elevated rounded-lg">
          <div v-if="activeTab === 'tab1'">
            <h3 class="text-lg font-semibold text-content-primary mb-2">Tab 1 Content</h3>
            <p class="text-content-secondary">This is the content for the first tab.</p>
          </div>
          <div v-if="activeTab === 'tab2'">
            <h3 class="text-lg font-semibold text-content-primary mb-2">Tab 2 Content</h3>
            <p class="text-content-secondary">This is the content for the second tab.</p>
          </div>
          <div v-if="activeTab === 'tab3'">
            <h3 class="text-lg font-semibold text-content-primary mb-2">Tab 3 Content</h3>
            <p class="text-content-secondary">This is the content for the third tab.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// Transaction Tabs
export const TransactionTabs = {
  render: () => ({
    components: { Tabs, Tab, Card },
    data() {
      return {
        activeTab: 'all',
        transactions: {
          all: [
            { id: 1, name: 'Coffee Shop', amount: '-$4.50', date: 'Today' },
            { id: 2, name: 'Salary', amount: '+$3,500', date: 'Yesterday' },
            { id: 3, name: 'Rent Payment', amount: '-$1,200', date: '2 days ago' },
          ],
          sent: [
            { id: 1, name: 'Coffee Shop', amount: '-$4.50', date: 'Today' },
            { id: 3, name: 'Rent Payment', amount: '-$1,200', date: '2 days ago' },
          ],
          received: [{ id: 2, name: 'Salary', amount: '+$3,500', date: 'Yesterday' }],
        },
      }
    },
    computed: {
      currentTransactions() {
        return this.transactions[this.activeTab]
      },
    },
    template: `
      <div class="p-8 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Transactions</h2>

        <Tabs v-model="activeTab">
          <Tab value="all" label="All" />
          <Tab value="sent" label="Sent" />
          <Tab value="received" label="Received" />
        </Tabs>

        <div class="mt-6 space-y-3">
          <Card v-for="transaction in currentTransactions" :key="transaction.id">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-content-primary">{{ transaction.name }}</p>
                <p class="text-sm text-content-secondary">{{ transaction.date }}</p>
              </div>
              <p class="text-lg font-semibold" :class="transaction.amount.startsWith('+') ? 'text-content-positive' : 'text-content-primary'">
                {{ transaction.amount }}
              </p>
            </div>
          </Card>
        </div>
      </div>
    `,
  }),
}

// Account Tabs
export const AccountTabs = {
  render: () => ({
    components: { Tabs, Tab },
    data() {
      return {
        activeTab: 'overview',
      }
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-content-primary mb-2">John Doe</h1>
          <p class="text-content-secondary">Account #12345</p>
        </div>

        <Tabs v-model="activeTab">
          <Tab value="overview" label="Overview" />
          <Tab value="activity" label="Activity" />
          <Tab value="settings" label="Settings" />
        </Tabs>

        <div class="mt-6 p-6 bg-white rounded-lg border border-border-default">
          <div v-if="activeTab === 'overview'">
            <h3 class="text-xl font-semibold text-content-primary mb-4">Account Overview</h3>
            <div class="space-y-3">
              <div class="flex justify-between py-2">
                <span class="text-content-secondary">Balance</span>
                <span class="font-semibold text-content-primary">$12,450.00</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-content-secondary">Available</span>
                <span class="font-semibold text-content-primary">$11,200.00</span>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'activity'">
            <h3 class="text-xl font-semibold text-content-primary mb-4">Recent Activity</h3>
            <div class="space-y-3">
              <div class="py-2">
                <p class="text-content-primary">Last login: Today at 10:30 AM</p>
              </div>
              <div class="py-2">
                <p class="text-content-primary">Password changed: 2 days ago</p>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'settings'">
            <h3 class="text-xl font-semibold text-content-primary mb-4">Account Settings</h3>
            <div class="space-y-3">
              <button class="text-content-accent hover:underline">Change password</button>
              <button class="block text-content-accent hover:underline">Update email</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Many Tabs (Scrollable)
export const ManyTabs = {
  render: () => ({
    components: { Tabs, Tab },
    data() {
      return {
        activeTab: 'jan',
      }
    },
    template: `
      <div class="p-8">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Monthly Reports</h2>

        <Tabs v-model="activeTab">
          <Tab value="jan" label="January" />
          <Tab value="feb" label="February" />
          <Tab value="mar" label="March" />
          <Tab value="apr" label="April" />
          <Tab value="may" label="May" />
          <Tab value="jun" label="June" />
          <Tab value="jul" label="July" />
          <Tab value="aug" label="August" />
          <Tab value="sep" label="September" />
          <Tab value="oct" label="October" />
          <Tab value="nov" label="November" />
          <Tab value="dec" label="December" />
        </Tabs>

        <div class="mt-6 p-4 bg-background-elevated rounded-lg">
          <p class="text-content-secondary">
            👉 Try scrolling the tabs horizontally to see all months
          </p>
        </div>
      </div>
    `,
  }),
}

// With Disabled Tab
export const WithDisabled = {
  render: () => ({
    components: { Tabs, Tab },
    data() {
      return {
        activeTab: 'home',
      }
    },
    template: `
      <div class="p-8">
        <Tabs v-model="activeTab">
          <Tab value="home" label="Home" />
          <Tab value="profile" label="Profile" />
          <Tab value="premium" label="Premium" disabled />
          <Tab value="settings" label="Settings" />
        </Tabs>

        <div class="mt-6 p-4 bg-background-elevated rounded-lg">
          <p class="text-content-secondary">
            The "Premium" tab is disabled and cannot be selected
          </p>
        </div>
      </div>
    `,
  }),
}

// Dashboard Example
export const Dashboard = {
  render: () => ({
    components: { Tabs, Tab, Card },
    data() {
      return {
        activeView: 'balances',
      }
    },
    template: `
      <div class="p-8 max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-content-primary mb-8">Dashboard</h1>

        <Tabs v-model="activeView">
          <Tab value="balances" label="Balances" />
          <Tab value="transactions" label="Transactions" />
          <Tab value="cards" label="Cards" />
          <Tab value="recipients" label="Recipients" />
        </Tabs>

        <div class="mt-8">
          <!-- Balances View -->
          <div v-if="activeView === 'balances'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div class="text-center">
                <p class="text-sm text-content-secondary mb-2">USD Balance</p>
                <p class="text-3xl font-bold text-content-primary">$5,240.50</p>
              </div>
            </Card>
            <Card>
              <div class="text-center">
                <p class="text-sm text-content-secondary mb-2">EUR Balance</p>
                <p class="text-3xl font-bold text-content-primary">€3,120.00</p>
              </div>
            </Card>
            <Card>
              <div class="text-center">
                <p class="text-sm text-content-secondary mb-2">GBP Balance</p>
                <p class="text-3xl font-bold text-content-primary">£1,850.25</p>
              </div>
            </Card>
          </div>

          <!-- Transactions View -->
          <div v-if="activeView === 'transactions'">
            <Card>
              <h3 class="text-lg font-semibold text-content-primary mb-4">Recent Transactions</h3>
              <div class="space-y-3">
                <div class="flex justify-between py-2 border-b border-border-default">
                  <span class="text-content-primary">Coffee Shop</span>
                  <span class="text-content-primary">-$4.50</span>
                </div>
                <div class="flex justify-between py-2 border-b border-border-default">
                  <span class="text-content-primary">Salary</span>
                  <span class="text-content-positive">+$3,500</span>
                </div>
              </div>
            </Card>
          </div>

          <!-- Cards View -->
          <div v-if="activeView === 'cards'">
            <Card>
              <h3 class="text-lg font-semibold text-content-primary mb-4">Your Cards</h3>
              <p class="text-content-secondary">Manage your debit and credit cards</p>
            </Card>
          </div>

          <!-- Recipients View -->
          <div v-if="activeView === 'recipients'">
            <Card>
              <h3 class="text-lg font-semibold text-content-primary mb-4">Recipients</h3>
              <p class="text-content-secondary">Manage your saved recipients</p>
            </Card>
          </div>
        </div>
      </div>
    `,
  }),
}

// Best Practices
export const BestPractices = {
  render: () => ({
    components: { Tabs, Tab, Card },
    template: `
      <div class="p-8 max-w-4xl">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Tabs Best Practices</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Good Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">Good examples</h3>
            </div>

            <div class="space-y-6">
              <div>
                <Tabs model-value="overview">
                  <Tab value="overview" label="Overview" />
                  <Tab value="details" label="Details" />
                </Tabs>
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Short labels (1-3 words)
                </p>
              </div>

              <div>
                <Tabs model-value="all">
                  <Tab value="all" label="All transactions" />
                  <Tab value="sent" label="Sent" />
                  <Tab value="received" label="Received" />
                </Tabs>
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Related groups of content
                </p>
              </div>

              <div class="text-xs text-content-secondary space-y-1">
                <p>✓ Use for navigation between content groups</p>
                <p>✓ Capitalize first letter only</p>
                <p>✓ Place at top of page/section</p>
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
              <div class="text-sm text-content-secondary space-y-3">
                <p>✗ Using for filtering (use Chips instead)</p>
                <p>✗ Using for form options (use SegmentedControl)</p>
                <p>✗ Sequential content (1, 2, 3)</p>
                <p>✗ Labels with punctuation</p>
                <p>✗ ALL CAPS labels</p>
                <p>✗ More than 3 words per label</p>
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Use for <strong>navigating between related content groups</strong></li>
            <li>NOT for filtering, changing views, or form selection</li>
            <li>Labels should be <strong>1-3 words, capitalize first letter only</strong></li>
            <li>No punctuation in labels</li>
            <li>Horizontally scrollable if tabs overflow</li>
            <li>Place at top of page or section</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
