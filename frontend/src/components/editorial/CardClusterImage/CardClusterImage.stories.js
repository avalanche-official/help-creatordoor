import CardClusterImage from './CardClusterImage.vue'

export default {
  title: 'Editorial/CardClusterImage',
  component: CardClusterImage,
  tags: ['autodocs'],
}

// How Interest Works (like the screenshot)
export const HowInterestWorks = {
  render: () => ({
    components: { CardClusterImage },
    template: `
      <CardClusterImage
        headline="How interest works"
        theme="light"
        :items="[
          {
            title: 'Turn on interest',
            description: 'Your money is invested in an interest-earning fund that holds government guaranteed assets.',
            imageAlt: 'Wise app UI showing savings balance of £1,289.09',
          },
          {
            title: 'Get gains daily',
            description: 'Returns are added to your money every working day — and you can use them right away.',
            imageAlt: 'Wise app UI showing daily interest gains',
          },
          {
            title: 'Spend any time',
            description: 'Continue to send and spend your money. With Interest, there's no need to lock your money away.',
            imageAlt: 'Wise card illustration',
          },
        ]"
        :cta="{ label: 'Learn more about Interest', href: '/interest' }"
      >
        <!-- Custom SVG illustrations for each card -->
        <template #image-0>
          <div class="max-w-sm w-full">
            <!-- Savings balance card mockup -->
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-gray-600">My savings</span>
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                  🇬🇧
                </div>
              </div>
              <div class="text-4xl font-black text-gray-900 mb-2">
                £1,289<span class="text-2xl">.09</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <span class="w-4 h-4 rounded bg-green-500"></span>
                <span>Cash</span>
              </div>
            </div>
          </div>
        </template>

        <template #image-1>
          <div class="max-w-sm w-full">
            <!-- Daily gains list mockup -->
            <div class="bg-white rounded-2xl p-6 shadow-lg space-y-3">
              <div class="flex items-center justify-between py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span class="text-green-600 text-sm">$</span>
                  </div>
                  <span class="text-sm font-medium">Nov 10th</span>
                </div>
                <span class="text-sm font-bold text-green-600">+3.56 GBP</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span class="text-green-600 text-sm">$</span>
                  </div>
                  <span class="text-sm font-medium">Nov 9th</span>
                </div>
                <span class="text-sm font-bold text-green-600">+2.45 GBP</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span class="text-green-600 text-sm">$</span>
                  </div>
                  <span class="text-sm font-medium">Nov 8th</span>
                </div>
                <span class="text-sm font-bold text-green-600">+1.66 GBP</span>
              </div>
            </div>
          </div>
        </template>

        <template #image-2>
          <div class="max-w-sm w-full">
            <!-- Wise card mockup -->
            <div class="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-8 shadow-xl aspect-[1.586/1] flex flex-col justify-between">
              <div class="flex justify-end">
                <span class="text-2xl font-black text-green-900" style="font-family: var(--font-heading);">WISE</span>
              </div>
              <div class="flex items-center gap-3 text-green-900">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </div>
            </div>
          </div>
        </template>
      </CardClusterImage>
    `,
  }),
}

// Neutral Theme Example
export const NeutralTheme = {
  render: () => ({
    components: { CardClusterImage },
    template: `
      <CardClusterImage
        headline="Manage money globally"
        description="Everything you need to handle money across borders, all in one place."
        theme="neutral"
        :items="[
          {
            title: 'Send internationally',
            description: 'Transfer money to 80+ countries at the real exchange rate.',
            imageAlt: 'Money transfer interface',
          },
          {
            title: 'Hold multiple currencies',
            description: 'Store and manage money in 40+ currencies in one account.',
            imageAlt: 'Multi-currency balance view',
          },
          {
            title: 'Spend worldwide',
            description: 'Use your Wise card in 160+ countries with no hidden fees.',
            imageAlt: 'Wise debit card',
          },
        ]"
      >
        <template #image-0>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-48 h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="60" fill="#9CDB7C" opacity="0.3" />
              <path d="M80 100 L120 100 M120 100 L110 90 M120 100 L110 110" stroke="#9CDB7C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
              <text x="75" y="145" font-size="24" fill="#9CDB7C" font-weight="bold">Send</text>
            </svg>
          </div>
        </template>

        <template #image-1>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-48 h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="60" y="70" width="80" height="60" rx="8" fill="#9CDB7C" opacity="0.3" />
              <text x="85" y="110" font-size="32" fill="#9CDB7C" font-weight="bold">$€£</text>
            </svg>
          </div>
        </template>

        <template #image-2>
          <div class="flex items-center justify-center">
            <svg viewBox="0 0 200 200" class="w-48 h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="80" width="100" height="65" rx="8" fill="#9CDB7C" />
              <circle cx="75" cy="105" r="8" fill="#1A4D2E" />
              <rect x="90" y="125" width="40" height="4" rx="2" fill="#1A4D2E" />
            </svg>
          </div>
        </template>
      </CardClusterImage>
    `,
  }),
}

// Simple Example
export const SimpleFeatures = {
  render: () => ({
    components: { CardClusterImage },
    template: `
      <CardClusterImage
        headline="Simple and transparent"
        theme="light"
        :items="[
          {
            title: 'Real exchange rate',
            description: 'We use the mid-market rate. No markup, no hidden fees.',
            imageAlt: 'Exchange rate display',
          },
          {
            title: 'Instant notifications',
            description: 'Get updates at every stage of your transfer via push, email, or SMS.',
            imageAlt: 'Notification interface',
          },
          {
            title: '24/7 support',
            description: 'Our team is here to help whenever you need us.',
            imageAlt: 'Customer support',
          },
        ]"
        :cta="{ label: 'Get started', href: '/signup' }"
      >
        <template #image-0>
          <div class="bg-white rounded-2xl p-6 shadow-lg max-w-xs">
            <div class="text-center">
              <div class="text-4xl font-black text-gray-900 mb-2">1.00</div>
              <div class="text-sm text-gray-600">Real exchange rate</div>
            </div>
          </div>
        </template>

        <template #image-1>
          <div class="bg-white rounded-2xl p-6 shadow-lg max-w-xs space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-100"></div>
              <div class="flex-1 h-3 bg-gray-200 rounded"></div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100"></div>
              <div class="flex-1 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </template>

        <template #image-2>
          <div class="bg-white rounded-2xl p-6 shadow-lg max-w-xs">
            <div class="text-center">
              <div class="text-5xl mb-3">💬</div>
              <div class="text-sm text-gray-600">24/7 Available</div>
            </div>
          </div>
        </template>
      </CardClusterImage>
    `,
  }),
}
