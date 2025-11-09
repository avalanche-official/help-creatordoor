import BannerInfo from './BannerInfo.vue'

export default {
  title: 'Editorial/BannerInfo',
  component: BannerInfo,
  tags: ['autodocs'],
}

// Trustpilot Example (like the screenshot)
export const Trustpilot = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="star"
        headline="4.3 / 5 on Trustpilot from 254,970 reviews"
        :cta="{ label: 'Read more reviews on Trustpilot', href: 'https://trustpilot.com/wise' }"
      />
    `,
  }),
}

// Minimum State (just headline and CTA)
export const MinimumState = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        headline="Join 16 million customers worldwide"
        :cta="{ label: 'Get started', href: '/signup' }"
      />
    `,
  }),
}

// Maximum State (icon + headline + description + two CTAs)
export const MaximumState = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="trophy"
        headline="Trusted by millions worldwide"
        description="Over 16 million people use Wise to save money on international transfers. Join them today and see the difference."
        :cta="{ label: 'Create an account', href: '/signup' }"
        :secondary-cta="{ label: 'Learn more', href: '/about' }"
      />
    `,
  }),
}

// With Description Only
export const WithDescription = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        headline="Money without borders"
        description="Send, receive, and manage your money across 50+ currencies with transparent fees."
        :cta="{ label: 'See how it works', href: '/how-it-works' }"
      />
    `,
  }),
}

// With Check Icon
export const WithCheckIcon = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="check"
        headline="Regulated and secure"
        description="Wise is authorized by financial regulators worldwide. Your money is protected."
        :cta="{ label: 'Learn about security', href: '/security' }"
      />
    `,
  }),
}

// With Shield Icon
export const WithShieldIcon = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="shield"
        headline="Bank-level security"
        description="We use 256-bit encryption and two-factor authentication to keep your money safe."
        :cta="{ label: 'Security features', href: '/security' }"
      />
    `,
  }),
}

// With Info Icon
export const WithInfoIcon = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="info"
        headline="Fast international transfers"
        description="Most transfers arrive within 24 hours. Some arrive instantly."
        :cta="{ label: 'Check transfer times', href: '/speed' }"
      />
    `,
  }),
}

// Short Headline
export const ShortHeadline = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        headline="Save up to 6x"
        description="Compared to traditional banks, you could save thousands on international transfers."
        :cta="{ label: 'Calculate savings', href: '/calculator' }"
      />
    `,
  }),
}

// Long Headline (Two Lines)
export const LongHeadline = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="star"
        headline="Rated excellent by our customers across the globe"
        description="See what people are saying about Wise on Trustpilot, with thousands of 5-star reviews."
        :cta="{ label: 'Read reviews', href: '/reviews' }"
      />
    `,
  }),
}

// Two CTAs
export const TwoCTAs = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="trophy"
        headline="Award-winning service"
        description="Wise has won multiple awards for innovation and customer service."
        :cta="{ label: 'Get started', href: '/signup' }"
        :secondary-cta="{ label: 'See awards', href: '/awards' }"
      />
    `,
  }),
}

// No Icon
export const NoIcon = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        headline="Transfer money in minutes"
        description="Set up your transfer in just a few clicks. Most transfers are completed within 24 hours."
        :cta="{ label: 'Send money now', href: '/send' }"
      />
    `,
  }),
}

// Custom Min Height
export const CustomHeight = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        headline="Compact banner"
        :cta="{ label: 'Learn more', href: '/about' }"
        min-height="200px"
      />
    `,
  }),
}

// Stats Banner
export const StatsBanner = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        headline="£100 billion+ moved"
        description="Since 2011, our customers have saved over £1.5 billion in fees."
        :cta="{ label: 'Join them', href: '/signup' }"
      />
    `,
  }),
}

// Customer Count
export const CustomerCount = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo
        icon="trophy"
        headline="16 million+ customers"
        description="People and businesses worldwide trust Wise for their international payments."
        :cta="{ label: 'Create account', href: '/signup' }"
      />
    `,
  }),
}

// Mobile Preview
export const Mobile = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <div class="max-w-4xl">
        <BannerInfo
          icon="star"
          headline="4.3 / 5 on Trustpilot from 254,970 reviews"
          :cta="{ label: 'Read more reviews', href: '/reviews' }"
        />
      </div>
    `,
  }),
}

// Tablet Preview
export const Tablet = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <div class="max-w-4xl">
        <BannerInfo
          icon="star"
          headline="4.3 / 5 on Trustpilot from 254,970 reviews"
          :cta="{ label: 'Read more reviews on Trustpilot', href: '/reviews' }"
        />
      </div>
    `,
  }),
}

// In Page Context
export const InPageContext = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <div class="bg-lightbeige min-h-screen py-12 px-4">
        <!-- Page Content -->
        <div class="max-w-4xl mx-auto mb-12">
          <h1 class="text-4xl font-bold text-content-primary mb-6">
            Why choose Wise?
          </h1>
          <div class="space-y-4 text-content-secondary mb-8">
            <p>
              Wise is built on transparency and trust. We use the real exchange rate
              and show you exactly what you'll pay before you confirm your transfer.
            </p>
            <p>
              No hidden fees, no surprises. Just fast, secure international transfers
              at a fraction of the cost of traditional banks.
            </p>
          </div>
        </div>

        <!-- Banner Info -->
        <BannerInfo
          icon="star"
          headline="Don't just take our word for it"
          description="See what our customers have to say about Wise on Trustpilot."
          :cta="{ label: 'Read reviews', href: '/reviews' }"
          :secondary-cta="{ label: 'Get started', href: '/signup' }"
        />

        <!-- More Content -->
        <div class="max-w-4xl mx-auto mt-12">
          <h2 class="text-3xl font-bold text-content-primary mb-6">
            How Wise works
          </h2>
          <p class="text-content-secondary">
            Setting up a transfer is quick and easy...
          </p>
        </div>
      </div>
    `,
  }),
}

// Custom Slot Example
export const CustomSlot = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <BannerInfo headline="Excellent customer support">
        <template #description>
          <div class="text-content-primary/80 mb-6">
            <p class="mb-2">Available 24/7 via:</p>
            <div class="flex gap-4 justify-center">
              <span>📧 Email</span>
              <span>💬 Chat</span>
              <span>📞 Phone</span>
            </div>
          </div>
        </template>
        <template #cta>
          <a
            href="/contact"
            class="inline-flex items-center justify-center px-8 py-3.5 bg-content-primary text-white rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 shadow-lg"
          >
            Contact us
          </a>
        </template>
      </BannerInfo>
    `,
  }),
}

// Multiple Banners on Page
export const MultipleBanners = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <div class="space-y-8 p-4 bg-lightbeige">
        <BannerInfo
          icon="star"
          headline="4.3 / 5 on Trustpilot"
          :cta="{ label: 'Read reviews', href: '/reviews' }"
        />

        <BannerInfo
          icon="shield"
          headline="Regulated and secure"
          :cta="{ label: 'Learn more', href: '/security' }"
        />

        <BannerInfo
          icon="trophy"
          headline="Award-winning service"
          :cta="{ label: 'See awards', href: '/awards' }"
        />
      </div>
    `,
  }),
}

// All Icons Showcase
export const AllIcons = {
  render: () => ({
    components: { BannerInfo },
    template: `
      <div class="space-y-8 p-4 bg-lightbeige">
        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Star Icon</h3>
          <BannerInfo
            icon="star"
            headline="Customer Reviews"
            :cta="{ label: 'Read more', href: '#' }"
            min-height="240px"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Check Icon</h3>
          <BannerInfo
            icon="check"
            headline="Verified & Trusted"
            :cta="{ label: 'Learn more', href: '#' }"
            min-height="240px"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Shield Icon</h3>
          <BannerInfo
            icon="shield"
            headline="Secure Transfers"
            :cta="{ label: 'Security info', href: '#' }"
            min-height="240px"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Trophy Icon</h3>
          <BannerInfo
            icon="trophy"
            headline="Award Winning"
            :cta="{ label: 'See awards', href: '#' }"
            min-height="240px"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Info Icon</h3>
          <BannerInfo
            icon="info"
            headline="Important Information"
            :cta="{ label: 'Read more', href: '#' }"
            min-height="240px"
          />
        </div>
      </div>
    `,
  }),
}
