import CardSize from './CardSize.vue'

export default {
  title: 'UI/CardSize (Wise)',
  component: CardSize,
  tags: ['autodocs'],
}

// Small CardSize (88px-300px)
export const SmallCardSize = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <CardSize size="small">
          <h3 class="text-lg font-semibold mb-2">Balance</h3>
          <p class="text-3xl font-bold">£1,234.56</p>
          <p class="text-sm text-content-secondary mt-1">British Pound</p>
        </CardSize>
      </div>
    `,
  }),
}

// Large CardSize (300px min)
export const LargeCardSize = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <CardSize size="large">
          <h2 class="text-2xl font-bold mb-4">Get your Wise CardSize</h2>
          <p class="text-content-secondary mb-6">
            Spend in 150+ countries at the real exchange rate with no hidden fees.
          </p>
          <button class="px-6 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
            Order now
          </button>
        </CardSize>
      </div>
    `,
  }),
}

// Clickable CardSize
export const ClickableCardSize = {
  render: () => ({
    components: { CardSize },
    data() {
      return {
        clicked: false,
      }
    },
    template: `
      <div>
        <div class="max-w-4xl">
          <CardSize size="small" clickable @click="clicked = true">
            <h3 class="text-lg font-semibold mb-2">GBP Balance</h3>
            <p class="text-3xl font-bold">£1,234.56</p>
            <p class="text-sm text-content-secondary mt-1">Click to view details</p>
          </CardSize>
        </div>

        <p v-if="clicked" class="mt-4 p-3 bg-content-positive/10 rounded-lg text-sm">
          CardSize clicked! ✓
        </p>
      </div>
    `,
  }),
}

// Dismissible CardSize
export const DismissibleCardSize = {
  render: () => ({
    components: { CardSize },
    data() {
      return {
        showCardSize: true,
      }
    },
    template: `
      <div class="max-w-4xl">
        <CardSize v-if="showCardSize" size="small" dismissible @dismiss="showCardSize = false">
          <h3 class="text-lg font-semibold mb-2">New feature!</h3>
          <p class="text-sm text-content-secondary">
            Check out our new currency converter feature.
          </p>
        </CardSize>

        <p v-if="!showCardSize" class="p-4 bg-gray-100 rounded-lg text-sm">
          CardSize dismissed ✓
        </p>
      </div>
    `,
  }),
}

// Balance CardSizes Grid (Wise Style!)
export const BalanceCardSizes = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6">Your balances</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardSize size="small" clickable>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-3xl">🇬🇧</span>
              <span class="font-medium">GBP</span>
            </div>
            <p class="text-2xl font-bold">£1,234.56</p>
          </CardSize>

          <CardSize size="small" clickable>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-3xl">🇪🇺</span>
              <span class="font-medium">EUR</span>
            </div>
            <p class="text-2xl font-bold">€987.65</p>
          </CardSize>

          <CardSize size="small" clickable>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-3xl">🇺🇸</span>
              <span class="font-medium">USD</span>
            </div>
            <p class="text-2xl font-bold">$543.21</p>
          </CardSize>
        </div>
      </div>
    `,
  }),
}

// Alert CardSize (Small with Dismiss)
export const AlertCardSize = {
  render: () => ({
    components: { CardSize },
    data() {
      return {
        show: true,
      }
    },
    template: `
      <div class="max-w-4xl">
        <CardSize v-if="show" size="small" dismissible @dismiss="show = false">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold mb-1">Verify your email</h3>
              <p class="text-sm text-content-secondary mb-3">
                We sent you an email. Click the link to verify your account.
              </p>
              <button class="text-sm font-medium text-content-accent hover:underline">
                Resend email
              </button>
            </div>
          </div>
        </CardSize>
      </div>
    `,
  }),
}

// Nudge CardSize (Small with Link)
export const NudgeCardSize = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <CardSize size="small">
          <div class="flex items-start gap-3">
            <div class="text-3xl">💡</div>
            <div class="flex-1">
              <h3 class="font-semibold mb-1">Save on fees</h3>
              <p class="text-sm text-content-secondary">
                Set up a Direct Debit to save 50% on transfer fees.
                <a href="#" class="text-content-accent hover:underline">Learn more</a>
              </p>
            </div>
          </div>
        </CardSize>
      </div>
    `,
  }),
}

// Promo CardSize (Large)
export const PromoCardSize = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <CardSize size="large">
          <div class="mb-6">
            <span class="inline-block px-3 py-1 bg-content-positive/10 text-content-positive rounded-full text-sm font-medium mb-4">
              Free
            </span>
            <h2 class="text-3xl font-bold mb-3">Digital CardSize</h2>
            <p class="text-lg text-content-secondary">
              A CardSize that lives online and works anywhere. Easy, secure, and always on hand.
            </p>
          </div>

          <div class="flex items-center justify-between">
            <button class="px-6 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium">
              Get started
            </button>
            <button class="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </CardSize>
      </div>
    `,
  }),
}

// Feature CardSizes (Small)
export const FeatureCardSizes = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6">Why choose Wise?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSize size="small">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-lg font-semibold mb-2">Fast transfers</h3>
            <p class="text-sm text-content-secondary">
              Most transfers arrive within 1-2 business days.
            </p>
          </CardSize>

          <CardSize size="small">
            <div class="text-4xl mb-4">💰</div>
            <h3 class="text-lg font-semibold mb-2">Low fees</h3>
            <p class="text-sm text-content-secondary">
              Save up to 8x compared to traditional banks.
            </p>
          </CardSize>

          <CardSize size="small">
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-lg font-semibold mb-2">Secure</h3>
            <p class="text-sm text-content-secondary">
              Your money is protected with bank-level security.
            </p>
          </CardSize>
        </div>
      </div>
    `,
  }),
}

// Carousel CardSizes (Mobile)
export const CarouselCardSizes = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-4">Your CardSizes</h2>
        <div class="flex gap-4 overflow-x-auto pb-4">
          <CardSize size="small" clickable class="min-w-[280px]">
            <h3 class="text-sm font-medium text-content-secondary mb-2">Digital CardSize</h3>
            <p class="text-2xl font-bold mb-4">•••• 1234</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-content-secondary">Active</span>
              <span class="text-sm font-medium text-content-positive">Free</span>
            </div>
          </CardSize>

          <CardSize size="small" clickable class="min-w-[280px]">
            <h3 class="text-sm font-medium text-content-secondary mb-2">Physical CardSize</h3>
            <p class="text-2xl font-bold mb-4">•••• 5678</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-content-secondary">Active</span>
              <span class="text-sm font-medium">£5 one-time</span>
            </div>
          </CardSize>

          <CardSize size="small" clickable class="min-w-[280px]">
            <h3 class="text-sm font-medium text-content-secondary mb-2">Business CardSize</h3>
            <p class="text-2xl font-bold mb-4">•••• 9012</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-content-secondary">Inactive</span>
              <span class="text-sm font-medium">Contact us</span>
            </div>
          </CardSize>
        </div>
      </div>
    `,
  }),
}

// Different Padding Sizes
export const PaddingSizes = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="space-y-6 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">No Padding</h3>
          <CardSize size="small" padding="none">
            <div class="p-4 bg-gray-100">Custom content with no padding</div>
          </CardSize>
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Small Padding</h3>
          <CardSize size="small" padding="sm">
            <p>Small padding (16px)</p>
          </CardSize>
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Medium Padding (Default)</h3>
          <CardSize size="small" padding="md">
            <p>Medium padding (24px)</p>
          </CardSize>
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Large Padding</h3>
          <CardSize size="small" padding="lg">
            <p>Large padding (32px)</p>
          </CardSize>
        </div>
      </div>
    `,
  }),
}

// Size Comparison
export const SizeComparison = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="space-y-8 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Small CardSize (88px-300px)</h3>
          <CardSize size="small">
            <h3 class="text-lg font-semibold mb-2">Small CardSize</h3>
            <p class="text-sm text-content-secondary">
              Minimum height: 88px, Maximum height: 300px. Smaller border radius (16px).
            </p>
          </CardSize>
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Large CardSize (300px min)</h3>
          <CardSize size="large">
            <h2 class="text-2xl font-bold mb-4">Large CardSize</h2>
            <p class="text-content-secondary mb-6">
              Minimum height: 300px. Larger border radius (24px). Used for promotions and important content.
            </p>
            <button class="px-6 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
              Take action
            </button>
          </CardSize>
        </div>
      </div>
    `,
  }),
}

// Real-World Example - Dashboard
export const Dashboard = {
  render: () => ({
    components: { CardSize },
    template: `
      <div class="max-w-6xl p-6 bg-background-default min-h-screen">
        <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

        <!-- Balances Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <CardSize size="small" clickable>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-content-secondary">GBP Balance</span>
              <span class="text-3xl">🇬🇧</span>
            </div>
            <p class="text-2xl font-bold">£1,234.56</p>
          </CardSize>

          <CardSize size="small" clickable>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-content-secondary">EUR Balance</span>
              <span class="text-3xl">🇪🇺</span>
            </div>
            <p class="text-2xl font-bold">€987.65</p>
          </CardSize>

          <CardSize size="small" clickable>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-content-secondary">USD Balance</span>
              <span class="text-3xl">🇺🇸</span>
            </div>
            <p class="text-2xl font-bold">$543.21</p>
          </CardSize>
        </div>

        <!-- Alert -->
        <div class="mb-8">
          <CardSize size="small" dismissible>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                ℹ️
              </div>
              <div class="flex-1">
                <h3 class="font-semibold mb-1">Complete your profile</h3>
                <p class="text-sm text-content-secondary">
                  Add your phone number to increase security and unlock features.
                </p>
              </div>
            </div>
          </CardSize>
        </div>

        <!-- Large Promo CardSize -->
        <CardSize size="large">
          <span class="inline-block px-3 py-1 bg-content-positive/10 text-content-positive rounded-full text-sm font-medium mb-4">
            New
          </span>
          <h2 class="text-3xl font-bold mb-3">Invite friends, get £50</h2>
          <p class="text-lg text-content-secondary mb-6">
            Share Wise with friends and you'll both get £50 when they transfer £200 or more.
          </p>
          <button class="px-6 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium">
            Invite friends
          </button>
        </CardSize>
      </div>
    `,
  }),
}
