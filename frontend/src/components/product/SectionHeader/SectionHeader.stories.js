import SectionHeader from './SectionHeader.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
}

// Section Type (with line)
export const Section = {
  render: () => ({
    components: { SectionHeader },
    template: `
      <div class="max-w-4xl">
        <SectionHeader text="Account services" type="section" />
        <p class="text-content-secondary">Content goes here...</p>
      </div>
    `,
  }),
}

// Group Type (no line)
export const Group = {
  render: () => ({
    components: { SectionHeader },
    template: `
      <div class="max-w-4xl">
        <SectionHeader text="Explore all topics" type="group" />
        <div class="space-y-3">
          <div class="p-4 bg-white border border-border-default rounded-lg">
            Sending money
          </div>
          <div class="p-4 bg-white border border-border-default rounded-lg">
            Holding money
          </div>
          <div class="p-4 bg-white border border-border-default rounded-lg">
            Receiving money
          </div>
        </div>
      </div>
    `,
  }),
}

// With Action Link
export const WithAction = {
  render: () => ({
    components: { SectionHeader },
    data() {
      return {
        clicked: false,
      }
    },
    template: `
      <div class="max-w-4xl">
        <SectionHeader
          text="Exchange rates"
          type="section"
          action="Edit"
          @action-click="clicked = true"
        />

        <p v-if="clicked" class="p-3 bg-content-accent/10 rounded-lg text-sm">
          Edit clicked!
        </p>

        <div v-else class="space-y-3">
          <div class="p-4 bg-white border border-border-default rounded-lg">
            GBP → USD: 1,245.44
          </div>
        </div>
      </div>
    `,
  }),
}

// Multiple Sections (Wise Style!)
export const MultipleSections = {
  render: () => ({
    components: { SectionHeader },
    template: `
      <div class="max-w-4xl space-y-8">
        <!-- Account Services Section -->
        <div>
          <SectionHeader text="Account services" type="section" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Personal details
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Security settings
            </div>
          </div>
        </div>

        <!-- Payment Methods Section -->
        <div>
          <SectionHeader text="Payment methods" type="section" action="Add new" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Visa ending in 1234
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Bank account •••• 5678
            </div>
          </div>
        </div>

        <!-- Recent Activity Section -->
        <div>
          <SectionHeader text="Recent activity" type="section" action="View all" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Money sent - $250.00
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Money received - $1,500.00
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Help Topics (Group Type)
export const HelpTopics = {
  render: () => ({
    components: { SectionHeader },
    template: `
      <div class="max-w-4xl">
        <SectionHeader text="Explore all topics" type="group" />
        <div class="space-y-4">
          <button class="w-full flex items-center gap-4 p-4 bg-white border border-border-default rounded-lg hover:bg-background-elevated transition-colors text-left">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">↑</span>
            </div>
            <span class="flex-1 text-lg font-medium">Sending money</span>
            <span class="text-content-secondary">›</span>
          </button>

          <button class="w-full flex items-center gap-4 p-4 bg-white border border-border-default rounded-lg hover:bg-background-elevated transition-colors text-left">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">💳</span>
            </div>
            <span class="flex-1 text-lg font-medium">Holding money</span>
            <span class="text-content-secondary">›</span>
          </button>

          <button class="w-full flex items-center gap-4 p-4 bg-white border border-border-default rounded-lg hover:bg-background-elevated transition-colors text-left">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">↓</span>
            </div>
            <span class="flex-1 text-lg font-medium">Receiving money</span>
            <span class="text-content-secondary">›</span>
          </button>

          <button class="w-full flex items-center gap-4 p-4 bg-white border border-border-default rounded-lg hover:bg-background-elevated transition-colors text-left">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">👤</span>
            </div>
            <span class="flex-1 text-lg font-medium">Managing your account</span>
            <span class="text-content-secondary">›</span>
          </button>
        </div>
      </div>
    `,
  }),
}

// Dashboard Layout
export const DashboardLayout = {
  render: () => ({
    components: { SectionHeader, Card },
    template: `
      <div class="max-w-6xl space-y-8">
        <!-- Balances -->
        <div>
          <SectionHeader text="Your balances" type="section" action="Manage" />
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <div class="text-3xl font-bold">£2,450.00</div>
              <div class="text-sm text-content-secondary mt-1">GBP Balance</div>
            </Card>
            <Card>
              <div class="text-3xl font-bold">$3,200.00</div>
              <div class="text-sm text-content-secondary mt-1">USD Balance</div>
            </Card>
            <Card>
              <div class="text-3xl font-bold">€1,850.00</div>
              <div class="text-sm text-content-secondary mt-1">EUR Balance</div>
            </Card>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div>
          <SectionHeader text="Recent transactions" type="section" action="View all" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg flex justify-between">
              <div>
                <div class="font-medium">Sent to Jane Smith</div>
                <div class="text-sm text-content-secondary">10 Jan 2025</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-content-negative">-£250.00</div>
                <div class="text-sm text-content-positive">Completed</div>
              </div>
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg flex justify-between">
              <div>
                <div class="font-medium">Received from John Doe</div>
                <div class="text-sm text-content-secondary">8 Jan 2025</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-content-positive">+£1,500.00</div>
                <div class="text-sm text-content-positive">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Both Types Comparison
export const BothTypes = {
  render: () => ({
    components: { SectionHeader },
    template: `
      <div class="max-w-4xl space-y-12">
        <!-- Section Type (with line) -->
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Section Type (with divider line)</h3>
          <SectionHeader text="Account services" type="section" />
          <p class="text-content-secondary">
            Used to divide different sections of content on a screen.
          </p>
        </div>

        <!-- Group Type (no line) -->
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Group Type (no divider)</h3>
          <SectionHeader text="Explore all topics" type="group" />
          <p class="text-content-secondary">
            Used to introduce a list of items.
          </p>
        </div>
      </div>
    `,
  }),
}

// With See More Action
export const WithSeeMore = {
  render: () => ({
    components: { SectionHeader },
    data() {
      return {
        showAll: false,
      }
    },
    template: `
      <div class="max-w-4xl">
        <SectionHeader
          text="Notifications"
          type="section"
          :action="showAll ? 'Show less' : 'See more'"
          @action-click="showAll = !showAll"
        />

        <div class="space-y-3">
          <div class="p-4 bg-white border border-border-default rounded-lg">
            Your transfer was successful
          </div>
          <div class="p-4 bg-white border border-border-default rounded-lg">
            New security update available
          </div>
          <div v-if="showAll" class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              You received money from Jane
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Monthly statement ready
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              ID verification complete
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Settings Page
export const SettingsPage = {
  render: () => ({
    components: { SectionHeader },
    template: `
      <div class="max-w-4xl space-y-8">
        <!-- Profile Section -->
        <div>
          <SectionHeader text="Profile" type="section" action="Edit" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              <div class="text-sm text-content-secondary">Full name</div>
              <div class="font-medium">John Smith</div>
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              <div class="text-sm text-content-secondary">Email</div>
              <div class="font-medium">john.smith@example.com</div>
            </div>
          </div>
        </div>

        <!-- Security Section -->
        <div>
          <SectionHeader text="Security" type="section" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Two-factor authentication
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Change password
            </div>
          </div>
        </div>

        <!-- Notifications Section -->
        <div>
          <SectionHeader text="Notifications" type="section" />
          <div class="space-y-3">
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Email notifications
            </div>
            <div class="p-4 bg-white border border-border-default rounded-lg">
              Push notifications
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
