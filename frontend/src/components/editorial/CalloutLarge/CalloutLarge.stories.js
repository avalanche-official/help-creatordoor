import CalloutLarge from './CalloutLarge.vue'

export default {
  title: 'Editorial/CalloutLarge',
  component: CalloutLarge,
  tags: ['autodocs'],
}

// Default Example (like the screenshot - Money Without Borders)
export const MoneyWithoutBorders = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="Meet money without borders"
        description="We're building the best way to move and manage the world's money. Min fees. Max ease. Full speed."
        :cta="{ label: 'Learn about our mission', href: '/mission' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Globe with coins illustration -->
              <defs>
                <radialGradient id="globeGradient" cx="50%" cy="50%">
                  <stop offset="0%" style="stop-color:#4DD4D4;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#2B8C8C;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1A5555;stop-opacity:1" />
                </radialGradient>
                <radialGradient id="coinGradient" cx="50%" cy="30%">
                  <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#DAA520;stop-opacity:1" />
                </radialGradient>
              </defs>

              <!-- Globe -->
              <circle cx="150" cy="100" r="60" fill="url(#globeGradient)" />

              <!-- Globe details (continents) -->
              <path d="M130 80 Q140 75, 150 80 T170 80" stroke="#1A5555" stroke-width="3" fill="none" opacity="0.6" />
              <path d="M120 100 Q135 95, 150 100 T180 100" stroke="#1A5555" stroke-width="4" fill="none" opacity="0.6" />
              <path d="M125 120 Q140 115, 155 120 T175 120" stroke="#1A5555" stroke-width="3" fill="none" opacity="0.6" />

              <!-- Coins -->
              <!-- Left coin -->
              <ellipse cx="90" cy="90" rx="20" ry="22" fill="url(#coinGradient)" />
              <ellipse cx="90" cy="88" rx="18" ry="20" fill="#FFD700" />
              <text x="85" y="95" font-size="16" font-weight="bold" fill="#DAA520">¥</text>

              <!-- Top-right coin -->
              <ellipse cx="190" cy="70" rx="18" ry="20" fill="url(#coinGradient)" />
              <ellipse cx="190" cy="68" rx="16" ry="18" fill="#FFD700" />
              <text x="186" y="74" font-size="14" font-weight="bold" fill="#DAA520">£</text>

              <!-- Right coin -->
              <ellipse cx="210" cy="100" rx="22" ry="24" fill="url(#coinGradient)" />
              <ellipse cx="210" cy="98" rx="20" ry="22" fill="#FFD700" />
              <text x="204" y="105" font-size="18" font-weight="bold" fill="#DAA520">€</text>

              <!-- Bottom-left coin -->
              <ellipse cx="100" cy="130" rx="16" ry="18" fill="url(#coinGradient)" />
              <ellipse cx="100" cy="128" rx="14" ry="16" fill="#FFD700" />
              <text x="96" y="134" font-size="12" font-weight="bold" fill="#DAA520">$</text>
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// Our Mission
export const OurMission = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="Building money without borders"
        description="Our mission is to make money move around the world as fast, easy, and transparent as the internet."
        :cta="{ label: 'Read our story', href: '/about' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Connected nodes representing global network -->
              <circle cx="150" cy="100" r="50" fill="#4DD4D4" opacity="0.3" />
              <circle cx="150" cy="100" r="40" fill="#2B8C8C" opacity="0.4" />
              <circle cx="150" cy="100" r="30" fill="#9CDB7C" />

              <!-- Orbiting elements -->
              <circle cx="100" cy="80" r="12" fill="#FFD700" />
              <circle cx="200" cy="80" r="12" fill="#FFD700" />
              <circle cx="100" cy="120" r="12" fill="#FFD700" />
              <circle cx="200" cy="120" r="12" fill="#FFD700" />

              <!-- Connection lines -->
              <line x1="150" y1="100" x2="100" y2="80" stroke="#9CDB7C" stroke-width="2" opacity="0.5" />
              <line x1="150" y1="100" x2="200" y2="80" stroke="#9CDB7C" stroke-width="2" opacity="0.5" />
              <line x1="150" y1="100" x2="100" y2="120" stroke="#9CDB7C" stroke-width="2" opacity="0.5" />
              <line x1="150" y1="100" x2="200" y2="120" stroke="#9CDB7C" stroke-width="2" opacity="0.5" />
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// Global Scale
export const GlobalScale = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="16 million customers worldwide"
        description="Join people and businesses in 160+ countries who trust Wise to move their money."
        :cta="{ label: 'Get started', href: '/signup' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- World map abstract -->
              <circle cx="150" cy="100" r="70" fill="#2B8C8C" opacity="0.2" />
              <circle cx="150" cy="100" r="60" fill="#4DD4D4" opacity="0.3" />

              <!-- People icons around the globe -->
              <g opacity="0.8">
                <circle cx="100" cy="70" r="8" fill="#9CDB7C" />
                <rect x="95" y="78" width="10" height="15" rx="2" fill="#9CDB7C" />

                <circle cx="200" cy="70" r="8" fill="#9CDB7C" />
                <rect x="195" y="78" width="10" height="15" rx="2" fill="#9CDB7C" />

                <circle cx="100" cy="130" r="8" fill="#9CDB7C" />
                <rect x="95" y="138" width="10" height="15" rx="2" fill="#9CDB7C" />

                <circle cx="200" cy="130" r="8" fill="#9CDB7C" />
                <rect x="195" y="138" width="10" height="15" rx="2" fill="#9CDB7C" />
              </g>
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// Transparent Pricing
export const TransparentPricing = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="No hidden fees, ever"
        description="We show you exactly what you'll pay before you confirm. The real exchange rate, plus a small, fair fee."
        :cta="{ label: 'See our pricing', href: '/pricing' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Magnifying glass over price tag -->
              <rect x="110" y="90" width="80" height="60" rx="8" fill="#4DD4D4" />
              <rect x="115" y="95" width="70" height="50" rx="6" fill="#2B8C8C" />
              <text x="135" y="128" font-size="24" font-weight="bold" fill="#9CDB7C">£0</text>

              <!-- Magnifying glass -->
              <circle cx="180" cy="80" r="30" fill="none" stroke="#9CDB7C" stroke-width="6" opacity="0.7" />
              <circle cx="180" cy="80" r="25" fill="none" stroke="#9CDB7C" stroke-width="4" />
              <line x1="202" y1="102" x2="225" y2="125" stroke="#9CDB7C" stroke-width="8" stroke-linecap="round" />
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// Fast and Secure
export const FastSecure = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="Fast, secure, regulated"
        description="Trusted by financial authorities worldwide. Your money is protected and transfers arrive in hours, not days."
        :cta="{ label: 'Learn about security', href: '/security' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Shield with checkmark -->
              <path d="M150 40 L180 55 L180 100 Q180 130, 150 150 Q120 130, 120 100 L120 55 Z" fill="#2B8C8C" />
              <path d="M150 45 L175 58 L175 100 Q175 125, 150 142 Q125 125, 125 100 L125 58 Z" fill="#4DD4D4" />

              <!-- Checkmark -->
              <path d="M135 100 L145 110 L165 85" stroke="#9CDB7C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// Short Headline
export const ShortHeadline = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="Money for everyone"
        description="Send, spend, and manage money worldwide without the hassle of traditional banks."
        :cta="{ label: 'Join Wise', href: '/signup' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="150" cy="100" r="50" fill="#4DD4D4" />
              <circle cx="150" cy="100" r="40" fill="#2B8C8C" />
              <text x="135" y="115" font-size="40" font-weight="bold" fill="#9CDB7C">W</text>
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// No Description
export const NoDescription = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="Join the revolution"
        :cta="{ label: 'Get started', href: '/signup' }"
      >
        <template #image>
          <div class="flex items-center justify-center mb-8">
            <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Rocket ship -->
              <path d="M150 50 L140 100 L150 140 L160 100 Z" fill="#2B8C8C" />
              <path d="M150 55 L143 100 L150 135 L157 100 Z" fill="#4DD4D4" />
              <circle cx="150" cy="80" r="8" fill="#9CDB7C" />

              <!-- Flames -->
              <ellipse cx="143" cy="140" rx="8" ry="12" fill="#FFD700" opacity="0.7" />
              <ellipse cx="150" cy="145" rx="6" ry="10" fill="#FFA500" opacity="0.7" />
              <ellipse cx="157" cy="140" rx="8" ry="12" fill="#FFD700" opacity="0.7" />
            </svg>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}

// Text Only (No Image)
export const TextOnly = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="The future of finance"
        description="We're reimagining how money moves around the world. Fair, transparent, and built for everyone."
        :cta="{ label: 'Learn more', href: '/about' }"
      />
    `,
  }),
}

// Mobile Preview
export const Mobile = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <div class="max-w-sm">
        <CalloutLarge
          headline="Meet money without borders"
          description="We're building the best way to move and manage the world's money."
          :cta="{ label: 'Learn more', href: '/mission' }"
        >
          <template #image>
            <div class="flex items-center justify-center mb-6">
              <svg viewBox="0 0 300 200" class="w-full max-w-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="100" r="50" fill="#4DD4D4" opacity="0.3" />
                <circle cx="150" cy="100" r="40" fill="#2B8C8C" />
                <text x="135" y="115" font-size="40" font-weight="bold" fill="#9CDB7C">W</text>
              </svg>
            </div>
          </template>
        </CalloutLarge>
      </div>
    `,
  }),
}

// In Page Context
export const InPageContext = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <div class="bg-lightbeige min-h-screen py-12 px-4">
        <!-- Page Content -->
        <div class="max-w-4xl mx-auto mb-12">
          <h1 class="text-4xl font-bold text-content-primary mb-6">
            About Wise
          </h1>
          <div class="space-y-4 text-content-secondary">
            <p>
              Wise was founded in 2011 with the simple idea that moving money around
              the world should be as easy as sending an email.
            </p>
            <p>
              Today, over 16 million people and businesses use Wise to send money to
              80+ countries, save money on international payments, and manage their
              money across multiple currencies.
            </p>
          </div>
        </div>

        <!-- Callout Large -->
        <div class="mb-12">
          <CalloutLarge
            headline="Meet money without borders"
            description="We're building the best way to move and manage the world's money. Min fees. Max ease. Full speed."
            :cta="{ label: 'Learn about our mission', href: '/mission' }"
          >
            <template #image>
              <div class="flex items-center justify-center mb-8">
                <svg viewBox="0 0 300 200" class="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="globeGrad" cx="50%" cy="50%">
                      <stop offset="0%" style="stop-color:#4DD4D4" />
                      <stop offset="100%" style="stop-color:#1A5555" />
                    </radialGradient>
                  </defs>
                  <circle cx="150" cy="100" r="60" fill="url(#globeGrad)" />
                  <ellipse cx="90" cy="90" rx="20" ry="22" fill="#FFD700" />
                  <ellipse cx="210" cy="100" rx="22" ry="24" fill="#FFD700" />
                </svg>
              </div>
            </template>
          </CalloutLarge>
        </div>

        <!-- More Content -->
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-content-primary mb-6">
            Our values
          </h2>
          <p class="text-content-secondary">
            We're guided by our mission to make money move around the world...
          </p>
        </div>
      </div>
    `,
  }),
}

// Multiple Callouts on Page
export const MultipleSections = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <div class="space-y-12 p-4 bg-lightbeige">
        <CalloutLarge
          headline="Meet money without borders"
          description="We're building the best way to move and manage the world's money."
          :cta="{ label: 'Learn our mission', href: '/mission' }"
        >
          <template #image>
            <svg viewBox="0 0 200 150" class="w-full max-w-xs mx-auto" fill="none">
              <circle cx="100" cy="75" r="50" fill="#4DD4D4" />
              <circle cx="70" cy="60" rx="15" ry="17" fill="#FFD700" />
              <circle cx="130" cy="60" rx="15" ry="17" fill="#FFD700" />
            </svg>
          </template>
        </CalloutLarge>

        <CalloutLarge
          headline="Join 16 million customers"
          description="People and businesses worldwide trust Wise to move their money."
          :cta="{ label: 'Get started', href: '/signup' }"
        >
          <template #image>
            <svg viewBox="0 0 200 150" class="w-full max-w-xs mx-auto" fill="none">
              <circle cx="100" cy="75" r="40" fill="#2B8C8C" />
              <text x="80" y="90" font-size="35" font-weight="bold" fill="#9CDB7C">16M</text>
            </svg>
          </template>
        </CalloutLarge>
      </div>
    `,
  }),
}

// Custom CTA Styling
export const CustomCTA = {
  render: () => ({
    components: { CalloutLarge },
    template: `
      <CalloutLarge
        headline="Ready to get started?"
        description="Open your account in minutes and start saving on international transfers."
      >
        <template #image>
          <svg viewBox="0 0 200 150" class="w-full max-w-xs mx-auto" fill="none">
            <circle cx="100" cy="75" r="45" fill="#4DD4D4" />
            <path d="M85 75 L95 85 L115 65" stroke="#9CDB7C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </svg>
        </template>
        <template #cta>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="/signup"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-[#9CDB7C] text-[#1A4D2E] rounded-full font-semibold text-base transition-all hover:bg-[#B5E89A] hover:scale-105 shadow-lg"
            >
              Create account
            </a>
            <a
              href="/compare"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white border-2 border-white/30 rounded-full font-semibold text-base transition-all hover:bg-white/20 hover:scale-105"
            >
              Compare pricing
            </a>
          </div>
        </template>
      </CalloutLarge>
    `,
  }),
}
