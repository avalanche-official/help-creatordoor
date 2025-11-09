import BannerCard from './BannerCard.vue'

export default {
  title: 'Editorial/BannerCard',
  component: BannerCard,
  tags: ['autodocs'],
}

// Default Example (like the screenshot)
export const Default = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Your money, your way"
        description="Manage your international money in a single place with a Wise account."
        :cta="{ label: 'Create an account', href: '/signup' }"
        tapestry="sunset"
      />
    `,
  }),
}

// Ocean Tapestry
export const OceanTheme = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Send money abroad"
        description="Send money to 80+ countries at the real exchange rate. Fast, secure, and transparent."
        :cta="{ label: 'Send money now', href: '/send' }"
        tapestry="ocean"
      />
    `,
  }),
}

// Forest Tapestry
export const ForestTheme = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Get paid like a local"
        description="Receive money in 10+ currencies with your own account details. No hidden fees."
        :cta="{ label: 'Get account details', href: '/account-details' }"
        tapestry="forest"
      />
    `,
  }),
}

// Purple Tapestry
export const PurpleTheme = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Business without borders"
        description="Take your business global with Wise Business. Save time and money on international payments."
        :cta="{ label: 'Try Wise Business', href: '/business' }"
        tapestry="purple"
      />
    `,
  }),
}

// Pink Tapestry
export const PinkTheme = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Spend worldwide"
        description="Get the Wise debit card and spend in 160+ countries at the real exchange rate."
        :cta="{ label: 'Order your card', href: '/card' }"
        tapestry="pink"
      />
    `,
  }),
}

// Short Headline (One Line)
export const ShortHeadline = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Join 16 million customers"
        description="People around the world trust Wise to move their money. Join them today."
        :cta="{ label: 'Get started', href: '/signup' }"
        tapestry="sunset"
      />
    `,
  }),
}

// No Description
export const NoDescription = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Ready to send money?"
        :cta="{ label: 'Create an account', href: '/signup' }"
        tapestry="ocean"
      />
    `,
  }),
}

// No CTA (Just informational)
export const NoCTA = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Available in 160+ countries"
        description="Wise is trusted by millions of people and businesses worldwide."
        tapestry="forest"
      />
    `,
  }),
}

// Left Aligned
export const LeftAligned = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Money for here, there, and everywhere"
        description="Hold, send, and spend money in 40+ currencies with your Wise account."
        :cta="{ label: 'Open an account', href: '/signup' }"
        tapestry="purple"
        align="left"
      />
    `,
  }),
}

// Right Aligned
export const RightAligned = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Fair, transparent pricing"
        description="We use the real exchange rate and show you our fees upfront. No surprises."
        :cta="{ label: 'See our pricing', href: '/pricing' }"
        tapestry="pink"
        align="right"
      />
    `,
  }),
}

// In Page Context (After Content)
export const InPageContext = {
  render: () => ({
    components: { BannerCard },
    template: `
      <div class="bg-lightbeige min-h-screen py-12 px-4">
        <!-- Page Content -->
        <div class="max-w-4xl mx-auto mb-12">
          <h1 class="text-4xl font-bold text-content-primary mb-6">
            How Wise works
          </h1>
          <div class="space-y-4 text-content-secondary">
            <p>
              Wise is a new way to move money around the world. We use real exchange rates
              to help people and businesses save money.
            </p>
            <p>
              Traditional banks and money transfer services often add hidden fees by marking
              up the exchange rate. With Wise, you always get the real rate — the one you see
              on Google — and a small, transparent fee.
            </p>
            <p>
              Since 2011, we've helped over 16 million customers send money to 80+ countries.
              We've processed over £100 billion in transfers, saving our customers millions
              in hidden fees.
            </p>
          </div>
        </div>

        <!-- Banner Card CTA -->
        <BannerCard
          headline="Ready to try Wise?"
          description="Join millions of people who are already saving money on international transfers."
          :cta="{ label: 'Create an account', href: '/signup' }"
          tapestry="sunset"
        />
      </div>
    `,
  }),
}

// Multiple Banners on Page (Different Tapestries)
export const MultipleBanners = {
  render: () => ({
    components: { BannerCard },
    template: `
      <div class="space-y-8 p-4 bg-lightbeige">
        <BannerCard
          headline="Send money abroad"
          description="Fast, secure international transfers at the real exchange rate."
          :cta="{ label: 'Send money', href: '/send' }"
          tapestry="sunset"
        />

        <BannerCard
          headline="Get the Wise card"
          description="Spend in 40+ currencies around the world."
          :cta="{ label: 'Order card', href: '/card' }"
          tapestry="ocean"
        />

        <BannerCard
          headline="Wise for Business"
          description="Save time and money on international business payments."
          :cta="{ label: 'Learn more', href: '/business' }"
          tapestry="forest"
        />
      </div>
    `,
  }),
}

// Mobile Preview
export const Mobile = {
  render: () => ({
    components: { BannerCard },
    template: `
      <div class="max-w-4xl">
        <BannerCard
          headline="Your money, your way"
          description="Manage your international money in a single place with a Wise account."
          :cta="{ label: 'Create an account', href: '/signup' }"
          tapestry="sunset"
        />
      </div>
    `,
  }),
}

// Tablet Preview
export const Tablet = {
  render: () => ({
    components: { BannerCard },
    template: `
      <div class="max-w-4xl">
        <BannerCard
          headline="Your money, your way"
          description="Manage your international money in a single place with a Wise account."
          :cta="{ label: 'Create an account', href: '/signup' }"
          tapestry="sunset"
        />
      </div>
    `,
  }),
}

// All Tapestries Showcase
export const AllTapestries = {
  render: () => ({
    components: { BannerCard },
    template: `
      <div class="space-y-8 p-4 bg-lightbeige">
        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Sunset Tapestry</h3>
          <BannerCard
            headline="Sunset Theme"
            description="Warm and inviting color palette perfect for account creation CTAs."
            :cta="{ label: 'Get started', href: '#' }"
            tapestry="sunset"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Ocean Tapestry</h3>
          <BannerCard
            headline="Ocean Theme"
            description="Cool and trustworthy colors ideal for money transfer CTAs."
            :cta="{ label: 'Send money', href: '#' }"
            tapestry="ocean"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Forest Tapestry</h3>
          <BannerCard
            headline="Forest Theme"
            description="Fresh and natural palette for growth and savings messaging."
            :cta="{ label: 'Save money', href: '#' }"
            tapestry="forest"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Purple Tapestry</h3>
          <BannerCard
            headline="Purple Theme"
            description="Bold and premium colors for business and enterprise offerings."
            :cta="{ label: 'Try Business', href: '#' }"
            tapestry="purple"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Pink Tapestry</h3>
          <BannerCard
            headline="Pink Theme"
            description="Vibrant and energetic palette for card and spending features."
            :cta="{ label: 'Order card', href: '#' }"
            tapestry="pink"
          />
        </div>
      </div>
    `,
  }),
}

// Custom Slot Content
export const CustomSlot = {
  render: () => ({
    components: { BannerCard },
    template: `
      <BannerCard
        headline="Questions? We're here to help"
        tapestry="ocean"
      >
        <div class="flex flex-col sm:flex-row gap-3">
          <a
            href="/help"
            class="inline-flex items-center justify-center px-6 py-3 bg-content-positive text-white rounded-full font-semibold text-base transition-all hover:opacity-90 shadow-md"
          >
            Visit help center
          </a>
          <a
            href="/contact"
            class="inline-flex items-center justify-center px-6 py-3 bg-white text-content-primary border-2 border-content-primary rounded-full font-semibold text-base transition-all hover:bg-content-primary hover:text-white"
          >
            Contact us
          </a>
        </div>
      </BannerCard>
    `,
  }),
}
