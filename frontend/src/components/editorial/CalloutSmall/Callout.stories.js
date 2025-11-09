import CalloutSmall from './CalloutSmall.vue'

export default {
  title: 'Editorial/CalloutSmall',
  component: CalloutSmall,
  tags: ['autodocs'],
}

// Default Example (like the screenshot - Safeguarded)
export const Safeguarded = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Your money is safeguarded"
        description="We're licensed to hold your money and follow strict rules to keep it safe. As we're not a bank, your money isn't FSCS protected – we safeguard it instead. That means we hold it with established institutions, separate from our own accounts."
        :cta="{ label: 'Learn more about safeguarding', href: '/safeguarding' }"
        variant="teal"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Lock illustration -->
              <g filter="url(#shadow)">
                <!-- Lock body -->
                <rect x="60" y="90" width="80" height="70" rx="8" fill="#2B8C8C" />
                <rect x="65" y="95" width="70" height="60" rx="6" fill="#3AA8A8" />

                <!-- Lock shackle -->
                <path d="M75 90 C75 65, 125 65, 125 90" stroke="#2B8C8C" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M77 90 C77 67, 123 67, 123 90" stroke="#3AA8A8" stroke-width="10" fill="none" stroke-linecap="round"/>

                <!-- Keyhole -->
                <circle cx="100" cy="120" r="8" fill="#1A5555" />
                <rect x="96" y="120" width="8" height="20" rx="2" fill="#1A5555" />
              </g>

              <!-- Shadow filter -->
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
                </filter>
              </defs>
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Fast Transfers
export const FastTransfers = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Lightning-fast transfers"
        description="Most transfers arrive in minutes or hours, not days. We use local banking systems to move your money quickly and securely."
        :cta="{ label: 'Check transfer times', href: '/speed' }"
        variant="blue"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Lightning bolt -->
              <path d="M110 20 L70 100 L100 100 L90 180 L130 100 L100 100 Z" fill="#1976D2" />
              <path d="M110 25 L75 100 L100 100 L92 170 L125 100 L100 100 Z" fill="#42A5F5" />
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Real Exchange Rate
export const RealExchangeRate = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Always the real exchange rate"
        description="We use the mid-market rate – the one you see on Google. No markup, no hidden fees. What you see is what you get, every time."
        :cta="{ label: 'See our pricing', href: '/pricing' }"
        variant="green"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Dollar and Pound symbols -->
              <text x="50" y="120" font-size="80" font-weight="bold" fill="#558B2F">$</text>
              <text x="100" y="120" font-size="80" font-weight="bold" fill="#7CB342">£</text>
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Multi-Currency Account
export const MultiCurrency = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Hold money in 40+ currencies"
        description="Get account details for 10+ currencies and hold money in 40+. Receive payments like a local and avoid conversion fees when you can."
        :cta="{ label: 'Get account details', href: '/account' }"
        variant="purple"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Globe with currency symbols -->
              <circle cx="100" cy="100" r="60" fill="#7B1FA2" opacity="0.2" />
              <circle cx="100" cy="100" r="50" fill="#9C27B0" opacity="0.3" />
              <circle cx="100" cy="100" r="40" fill="#AB47BC" />
              <text x="85" y="115" font-size="40" font-weight="bold" fill="white">¤</text>
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Business Features
export const BusinessFeatures = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Built for businesses"
        description="Manage international payments, pay invoices, and get paid by customers worldwide. Save time and money on cross-border transactions."
        :cta="{ label: 'Try Wise Business', href: '/business' }"
        variant="coral"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Briefcase icon -->
              <rect x="50" y="80" width="100" height="80" rx="8" fill="#E64A19" />
              <rect x="55" y="85" width="90" height="70" rx="6" fill="#FF7043" />
              <rect x="85" y="60" width="30" height="25" rx="4" fill="#D84315" />
              <circle cx="100" cy="120" r="6" fill="#BF360C" />
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Card Benefits
export const CardBenefits = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Spend like a local, anywhere"
        description="Get the Wise debit card and spend in 160+ countries at the real exchange rate. Free ATM withdrawals up to £200 per month."
        :cta="{ label: 'Order your card', href: '/card' }"
        variant="pink"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Card icon -->
              <rect x="40" y="70" width="120" height="75" rx="8" fill="#C2185B" />
              <rect x="45" y="75" width="110" height="65" rx="6" fill="#E91E63" />
              <rect x="55" y="110" width="40" height="6" rx="3" fill="white" opacity="0.8" />
              <rect x="55" y="125" width="60" height="4" rx="2" fill="white" opacity="0.6" />
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Image on Left
export const ImageLeft = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Transparent pricing"
        description="No hidden fees, no surprises. We show you exactly what you'll pay upfront. Compare us to your bank and see how much you save."
        :cta="{ label: 'Calculate savings', href: '/calculator' }"
        variant="teal"
        image-position="left"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Receipt/document icon -->
              <rect x="60" y="30" width="80" height="140" rx="4" fill="#2B8C8C" />
              <rect x="65" y="35" width="70" height="130" rx="3" fill="#3AA8A8" />
              <line x1="75" y1="55" x2="125" y2="55" stroke="white" stroke-width="3" opacity="0.6" />
              <line x1="75" y1="75" x2="125" y2="75" stroke="white" stroke-width="3" opacity="0.6" />
              <line x1="75" y1="95" x2="100" y2="95" stroke="white" stroke-width="3" opacity="0.6" />
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// No Image (Text Only)
export const TextOnly = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Join 16 million customers"
        description="People and businesses around the world trust Wise to move their money. We've processed over £100 billion in transfers since 2011."
        :cta="{ label: 'Get started', href: '/signup' }"
        variant="blue"
      />
    `,
  }),
}

// Short Content
export const ShortContent = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <CalloutSmall
        headline="Save up to 6x"
        description="Compared to traditional banks, Wise customers save an average of 6x on international transfers."
        :cta="{ label: 'See comparison', href: '/compare' }"
        variant="green"
      >
        <template #image>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Piggy bank -->
              <ellipse cx="100" cy="110" rx="50" ry="40" fill="#558B2F" />
              <ellipse cx="100" cy="105" rx="48" ry="38" fill="#7CB342" />
              <circle cx="90" cy="100" r="4" fill="#33691E" />
              <rect x="55" y="130" width="10" height="20" rx="3" fill="#558B2F" />
              <rect x="135" y="130" width="10" height="20" rx="3" fill="#558B2F" />
              <ellipse cx="100" cy="80" rx="15" ry="8" fill="#33691E" opacity="0.3" />
            </svg>
          </div>
        </template>
      </CalloutSmall>
    `,
  }),
}

// Mobile Preview
export const Mobile = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <div class="max-w-4xl">
        <CalloutSmall
          headline="Your money is safeguarded"
          description="We're licensed to hold your money and follow strict rules to keep it safe."
          :cta="{ label: 'Learn more', href: '/safeguarding' }"
          variant="teal"
        >
          <template #image>
            <div class="flex items-center justify-center">
              <svg viewBox="0 0 200 200" class="w-48 h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#shadow)">
                  <rect x="60" y="90" width="80" height="70" rx="8" fill="#2B8C8C" />
                  <rect x="65" y="95" width="70" height="60" rx="6" fill="#3AA8A8" />
                  <path d="M75 90 C75 65, 125 65, 125 90" stroke="#2B8C8C" stroke-width="12" fill="none" stroke-linecap="round"/>
                  <path d="M77 90 C77 67, 123 67, 123 90" stroke="#3AA8A8" stroke-width="10" fill="none" stroke-linecap="round"/>
                  <circle cx="100" cy="120" r="8" fill="#1A5555" />
                  <rect x="96" y="120" width="8" height="20" rx="2" fill="#1A5555" />
                </g>
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </template>
        </CalloutSmall>
      </div>
    `,
  }),
}

// All Color Variants
export const AllColorVariants = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <div class="space-y-8 p-4 bg-lightbeige">
        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Teal Variant</h3>
          <CalloutSmall
            headline="Teal background"
            description="Perfect for security, trust, and safeguarding messages."
            :cta="{ label: 'Learn more', href: '#' }"
            variant="teal"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Blue Variant</h3>
          <CalloutSmall
            headline="Blue background"
            description="Great for technology, speed, and efficiency topics."
            :cta="{ label: 'Learn more', href: '#' }"
            variant="blue"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Green Variant</h3>
          <CalloutSmall
            headline="Green background"
            description="Ideal for savings, money, and financial benefits."
            :cta="{ label: 'Learn more', href: '#' }"
            variant="green"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Purple Variant</h3>
          <CalloutSmall
            headline="Purple background"
            description="Works well for premium features and unique offerings."
            :cta="{ label: 'Learn more', href: '#' }"
            variant="purple"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Pink Variant</h3>
          <CalloutSmall
            headline="Pink background"
            description="Perfect for card features and consumer benefits."
            :cta="{ label: 'Learn more', href: '#' }"
            variant="pink"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-content-primary">Coral Variant</h3>
          <CalloutSmall
            headline="Coral background"
            description="Great for business features and enterprise solutions."
            :cta="{ label: 'Learn more', href: '#' }"
            variant="coral"
          />
        </div>
      </div>
    `,
  }),
}

// In Page Context
export const InPageContext = {
  render: () => ({
    components: { CalloutSmall },
    template: `
      <div class="bg-lightbeige min-h-screen py-12 px-4">
        <div class="max-w-6xl mx-auto space-y-12">
          <div class="text-center mb-12">
            <h1 class="text-5xl font-bold text-content-primary mb-4">
              Why choose Wise?
            </h1>
            <p class="text-xl text-content-secondary">
              Here's what makes us different
            </p>
          </div>

          <CalloutSmall
            headline="Your money is safeguarded"
            description="We're licensed to hold your money and follow strict rules to keep it safe. As we're not a bank, your money isn't FSCS protected – we safeguard it instead."
            :cta="{ label: 'Learn more about safeguarding', href: '/safeguarding' }"
            variant="teal"
          >
            <template #image>
              <div class="flex items-center justify-center">
                <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#shadow)">
                    <rect x="60" y="90" width="80" height="70" rx="8" fill="#2B8C8C" />
                    <rect x="65" y="95" width="70" height="60" rx="6" fill="#3AA8A8" />
                    <path d="M75 90 C75 65, 125 65, 125 90" stroke="#2B8C8C" stroke-width="12" fill="none" stroke-linecap="round"/>
                    <circle cx="100" cy="120" r="8" fill="#1A5555" />
                    <rect x="96" y="120" width="8" height="20" rx="2" fill="#1A5555" />
                  </g>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
                    </filter>
                  </defs>
                </svg>
              </div>
            </template>
          </CalloutSmall>

          <CalloutSmall
            headline="Always the real exchange rate"
            description="We use the mid-market rate – the one you see on Google. No markup, no hidden fees."
            :cta="{ label: 'See our pricing', href: '/pricing' }"
            variant="green"
            image-position="left"
          >
            <template #image>
              <div class="flex items-center justify-center">
                <svg viewBox="0 0 200 200" class="w-64 h-64" fill="none">
                  <text x="50" y="120" font-size="80" font-weight="bold" fill="#558B2F">$</text>
                  <text x="100" y="120" font-size="80" font-weight="bold" fill="#7CB342">£</text>
                </svg>
              </div>
            </template>
          </CalloutSmall>
        </div>
      </div>
    `,
  }),
}
