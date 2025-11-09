import FeatureSectionInteractive from './FeatureSectionInteractive.vue'

export default {
  title: 'Editorial/FeatureSectionInteractive',
  component: FeatureSectionInteractive,
  tags: ['autodocs'],
}

// Bright Green Theme - Layout 1 (like the screenshot)
export const BrightGreenLayout1 = {
  render: () => ({
    components: { FeatureSectionInteractive },
    template: `
      <FeatureSectionInteractive
        headline="Send money globally for less"
        description="Use Wise to send money abroad, or spend at the real exchange rate when you travel or shop online. Join over 12.8 million people sending money everywhere — with fees as low as 0.1%."
        :cta="{ label: 'Learn how to send money', href: '/send' }"
        theme="bright-green"
        layout="layout-1"
      >
        <template #decoration>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
            alt="People collaborating"
            class="w-full h-full object-cover opacity-80"
          />
        </template>
      </FeatureSectionInteractive>
    `,
  }),
}

// Neutral Theme - Layout 2
export const NeutralLayout2 = {
  render: () => ({
    components: { FeatureSectionInteractive },
    template: `
      <FeatureSectionInteractive
        headline="Calculate your savings"
        description="See how much you could save compared to your bank. We use the real exchange rate with transparent fees — no hidden charges."
        :cta="{ label: 'Compare to your bank', href: '/compare' }"
        theme="neutral"
        layout="layout-2"
      />
    `,
  }),
}

// Custom Interactive Content
export const CustomCalculator = {
  render: () => ({
    components: { FeatureSectionInteractive },
    template: `
      <FeatureSectionInteractive
        headline="Try our currency converter"
        description="Get the real exchange rate for any currency pair. No markup, no surprises — just the rate you see on Google."
        :cta="{ label: 'Get started', href: '/signup' }"
        theme="bright-green"
        layout="layout-1"
      >
        <template #interactive>
          <div class="space-y-6">
            <!-- Custom calculator interface -->
            <div class="text-center py-4 bg-gray-50 rounded-lg">
              <div class="text-4xl font-black mb-2">1.178</div>
              <div class="text-sm text-gray-600">GBP to EUR</div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 border-2 border-gray-200 rounded-lg">
                <div class="text-3xl mb-2">🇬🇧</div>
                <div class="font-semibold">British Pound</div>
              </div>
              <div class="text-center p-4 border-2 border-gray-200 rounded-lg">
                <div class="text-3xl mb-2">🇪🇺</div>
                <div class="font-semibold">Euro</div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Mid-market rate</span>
                <span class="font-semibold">1.178</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Our fee</span>
                <span class="font-semibold text-green-600">0.41%</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Bank fee (typical)</span>
                <span class="font-semibold text-red-600">3-5%</span>
              </div>
            </div>

            <button class="w-full px-6 py-4 bg-content-positive text-content-primary rounded-full font-semibold hover:opacity-90 transition-opacity text-lg">
              Start transfer
            </button>
          </div>
        </template>
      </FeatureSectionInteractive>
    `,
  }),
}
