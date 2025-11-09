import Divider from './Divider.vue'

export default {
  title: 'UI/Divider',
  component: Divider,
  tags: ['autodocs'],
}

// Section Divider
export const SectionDivider = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl">
        <div class="p-6 bg-white">
          <h2 class="text-xl font-semibold mb-2">Personal Information</h2>
          <p class="text-content-secondary">Your name, email, and phone number</p>
        </div>

        <Divider type="section" />

        <div class="p-6 bg-white">
          <h2 class="text-xl font-semibold mb-2">Security Settings</h2>
          <p class="text-content-secondary">Password and two-factor authentication</p>
        </div>

        <Divider type="section" />

        <div class="p-6 bg-white">
          <h2 class="text-xl font-semibold mb-2">Notifications</h2>
          <p class="text-content-secondary">Manage your notification preferences</p>
        </div>
      </div>
    `,
  }),
}

// Subsection Divider
export const SubsectionDivider = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Account Settings</h2>

        <div>
          <h3 class="font-medium mb-2">Profile Information</h3>
          <p class="text-sm text-content-secondary mb-2">Name: John Doe</p>
          <p class="text-sm text-content-secondary">Email: john@example.com</p>
        </div>

        <Divider type="subsection" />

        <div>
          <h3 class="font-medium mb-2">Contact Details</h3>
          <p class="text-sm text-content-secondary mb-2">Phone: +44 20 1234 5678</p>
          <p class="text-sm text-content-secondary">Address: 123 Main Street</p>
        </div>

        <Divider type="subsection" />

        <div>
          <h3 class="font-medium mb-2">Preferences</h3>
          <p class="text-sm text-content-secondary mb-2">Language: English</p>
          <p class="text-sm text-content-secondary">Currency: GBP</p>
        </div>
      </div>
    `,
  }),
}

// Content Divider
export const ContentDivider = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Transaction Summary</h2>

        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-content-secondary">Amount</span>
            <span class="font-medium">500.00 GBP</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-content-secondary">Fee</span>
            <span class="font-medium">2.50 GBP</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-content-secondary">Exchange rate</span>
            <span class="font-medium">1.2456</span>
          </div>
        </div>

        <Divider type="content" />

        <div class="flex justify-between">
          <span class="font-semibold">Total</span>
          <span class="text-xl font-bold">502.50 GBP</span>
        </div>
      </div>
    `,
  }),
}

// Transaction Details Example (Wise Style!)
export const TransactionDetails = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl bg-white rounded-lg overflow-hidden">
        <!-- Transaction Header -->
        <div class="p-6 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
            🍎
          </div>
          <p class="text-sm text-content-secondary mb-2">Spent</p>
          <h2 class="text-3xl font-bold mb-2">8.90 GBP</h2>
          <p class="text-content-secondary">Sainsbury's</p>
          <div class="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-gray-100 rounded-full text-sm">
            🛒 Groceries
          </div>
        </div>

        <Divider type="section" />

        <!-- Transaction Details -->
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-4">Transaction details</h3>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-content-secondary">When</span>
              <span>26 July 2022, 19:11</span>
            </div>
            <div class="flex justify-between">
              <span class="text-content-secondary">Where</span>
              <span>LONDON, United Kingdom</span>
            </div>
            <div class="flex justify-between">
              <span class="text-content-secondary">Which card</span>
              <span>'Shopping', 1304 🟩</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Settings Page Example
export const SettingsPage = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl">
        <!-- Personal Information Section -->
        <div class="bg-white p-6">
          <h2 class="text-2xl font-semibold mb-6">Personal Information</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Full name</label>
              <input class="w-full px-4 py-2 border border-gray-300 rounded-lg" value="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input class="w-full px-4 py-2 border border-gray-300 rounded-lg" value="john@example.com" />
            </div>
          </div>
        </div>

        <Divider type="section" />

        <!-- Security Section -->
        <div class="bg-white p-6">
          <h2 class="text-2xl font-semibold mb-6">Security</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Password</label>
              <button class="px-4 py-2 bg-background-elevated rounded-lg hover:bg-gray-200">
                Change password
              </button>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Two-factor authentication</label>
              <button class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        <Divider type="section" />

        <!-- Preferences Section -->
        <div class="bg-white p-6">
          <h2 class="text-2xl font-semibold mb-6">Preferences</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Language</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Currency</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>GBP</option>
                <option>EUR</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Card with Subsections
export const CardWithSubsections = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Transfer Summary</h2>

        <div>
          <h3 class="text-sm font-medium text-content-secondary mb-2">You send</h3>
          <p class="text-2xl font-bold">500.00 GBP</p>
        </div>

        <Divider type="subsection" />

        <div>
          <h3 class="text-sm font-medium text-content-secondary mb-2">They receive</h3>
          <p class="text-2xl font-bold">540.00 EUR</p>
        </div>

        <Divider type="subsection" />

        <div>
          <h3 class="text-sm font-medium text-content-secondary mb-2">Arrives by</h3>
          <p class="font-medium">Tomorrow, 10:00 AM</p>
        </div>
      </div>
    `,
  }),
}

// Payment Breakdown
export const PaymentBreakdown = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Payment breakdown</h2>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-content-secondary">Transfer amount</span>
            <span>500.00 GBP</span>
          </div>
          <div class="flex justify-between">
            <span class="text-content-secondary">Our fee</span>
            <span>2.50 GBP</span>
          </div>
          <div class="flex justify-between">
            <span class="text-content-secondary">Exchange rate</span>
            <span>1.08 EUR</span>
          </div>
        </div>

        <Divider type="content" />

        <div class="flex justify-between items-center">
          <span class="font-semibold">Total to pay</span>
          <span class="text-2xl font-bold">502.50 GBP</span>
        </div>

        <Divider type="content" />

        <div class="flex justify-between text-sm">
          <span class="text-content-secondary">Recipient gets</span>
          <span class="font-medium">540.00 EUR</span>
        </div>
      </div>
    `,
  }),
}

// All Types Comparison
export const AllTypes = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="space-y-8 max-w-4xl">
        <!-- Section -->
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Section Divider</h3>
          <div class="bg-white p-4 border border-gray-200 rounded-lg">
            <p>Content above section divider</p>
          </div>
          <Divider type="section" />
          <div class="bg-white p-4 border border-gray-200 rounded-lg">
            <p>Content below section divider</p>
          </div>
        </div>

        <!-- Subsection -->
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Subsection Divider</h3>
          <div class="bg-white p-6 border border-gray-200 rounded-lg">
            <p>Content above subsection divider</p>
            <Divider type="subsection" />
            <p>Content below subsection divider</p>
          </div>
        </div>

        <!-- Content -->
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Content Divider</h3>
          <div class="bg-white p-6 border border-gray-200 rounded-lg">
            <p class="mb-2">Amount: 500.00 GBP</p>
            <Divider type="content" />
            <p class="font-bold">Total: 502.50 GBP</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// Help Article Example
export const HelpArticle = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-4xl bg-white">
        <!-- Article Header -->
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-4">How do I send money with Wise?</h1>
        </div>

        <Divider type="section" />

        <!-- Step 1 -->
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-3">1. Sign up with Wise.</h2>
          <p class="text-content-secondary mb-4">
            We'll ask for your email address, and you'll create a password. You can also
            <strong>sign up</strong> by connecting to your Google or Facebook account.
          </p>
          <div class="p-4 bg-blue-50 border-l-4 border-blue-500 text-sm">
            <strong>Tip:</strong> If you already have a Wise account, go to <strong>Home</strong>
            on the website and choose <strong>Send money</strong>, or tap <strong>Send</strong>
            on the app, to set up a transfer.
          </div>
        </div>

        <Divider type="section" />

        <!-- Step 2 -->
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-3">2. Type in how much you'd like to transfer.</h2>
          <p class="text-content-secondary">
            You can start with the amount you'd like to send, or the amount you'd like your
            recipient to receive.
          </p>
        </div>
      </div>
    `,
  }),
}
