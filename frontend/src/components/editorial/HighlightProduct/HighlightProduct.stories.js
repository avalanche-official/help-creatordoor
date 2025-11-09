import HighlightProduct from './HighlightProduct.vue'

export default {
  title: 'Editorial/HighlightProduct',
  component: HighlightProduct,
  tags: ['autodocs'],
}

// Default (like the screenshot)
export const BusinessCard = {
  render: () => ({
    components: { HighlightProduct },
    template: `
      <HighlightProduct
        headline="Trusted by businesses small and large"
        description="Go global with the international business account. Pay employees, get paid and manage your cash flow in multiple currencies. Join over 300,000 businesses thriving with Wise."
        :cta="{
          primary: { label: 'Primary Button', href: '/business' },
          secondary: { label: 'Learn more', href: '/business/features' },
        }"
        image-position="left"
      >
        <template #image>
          <div class="relative max-w-lg">
            <!-- Wise Business Card Mockup -->
            <svg viewBox="0 0 600 400" class="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Back card (slightly offset) -->
              <g transform="translate(40, 20)">
                <rect x="0" y="0" width="400" height="250" rx="20" fill="#1A4D2E" />
                <text x="50" y="140" font-size="60" font-weight="900" fill="#9CDB7C" style="font-family: var(--font-heading)">WISE</text>
              </g>

              <!-- Front card -->
              <g>
                <rect x="100" y="80" width="400" height="250" rx="20" fill="#0D2818" />

                <!-- Chip -->
                <rect x="140" y="170" width="50" height="40" rx="6" fill="#E0E0E0" />
                <line x1="155" y1="175" x2="155" y2="205" stroke="#999" stroke-width="2" />
                <line x1="175" y1="175" x2="175" y2="205" stroke="#999" stroke-width="2" />

                <!-- Contactless symbol -->
                <g transform="translate(140, 230)">
                  <path d="M5 0 Q5 10, 10 10" stroke="#9CDB7C" stroke-width="2" fill="none" />
                  <path d="M10 0 Q10 15, 15 15" stroke="#9CDB7C" stroke-width="2" fill="none" />
                  <path d="M15 0 Q15 20, 20 20" stroke="#9CDB7C" stroke-width="2" fill="none" />
                </g>

                <!-- Wise logo -->
                <text x="340" y="240" font-size="80" font-weight="900" fill="#9CDB7C" style="font-family: var(--font-heading)">WISE</text>
              </g>
            </svg>
          </div>
        </template>
      </HighlightProduct>
    `,
  }),
}

// Image on Right
export const CardOnRight = {
  render: () => ({
    components: { HighlightProduct },
    template: `
      <HighlightProduct
        headline="The Wise debit card"
        description="Spend in 40+ currencies at the real exchange rate. Free ATM withdrawals, no hidden fees, and instant notifications."
        :cta="{
          primary: { label: 'Order your card', href: '/card' },
          secondary: { label: 'See features', href: '/card/features' },
        }"
        image-position="right"
      >
        <template #image>
          <div class="relative max-w-md">
            <svg viewBox="0 0 400 300" class="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect x="50" y="50" width="300" height="190" rx="16" fill="#9CDB7C" />
                <rect x="60" y="60" width="280" height="170" rx="12" fill="#B5E89A" />

                <!-- Chip -->
                <rect x="90" y="110" width="40" height="32" rx="4" fill="#E0E0E0" />

                <!-- Contactless -->
                <g transform="translate(90, 160)">
                  <path d="M5 0 Q5 8, 8 8" stroke="#1A4D2E" stroke-width="2" fill="none" />
                  <path d="M10 0 Q10 12, 12 12" stroke="#1A4D2E" stroke-width="2" fill="none" />
                  <path d="M15 0 Q15 16, 16 16" stroke="#1A4D2E" stroke-width="2" fill="none" />
                </g>

                <!-- Wise logo -->
                <text x="240" y="200" font-size="48" font-weight="900" fill="#1A4D2E" style="font-family: var(--font-heading)">WISE</text>
              </g>
            </svg>
          </div>
        </template>
      </HighlightProduct>
    `,
  }),
}

// Simple Version
export const SimpleVersion = {
  render: () => ({
    components: { HighlightProduct },
    template: `
      <HighlightProduct
        headline="Premium metal card"
        description="Upgrade to the Wise metal card for added durability and style. All the same great features, with a premium feel."
        :cta="{
          primary: { label: 'Upgrade now', href: '/card/metal' },
        }"
        image-position="left"
      >
        <template #image>
          <div class="max-w-sm mx-auto">
            <svg viewBox="0 0 300 200" class="w-full" fill="none">
              <rect x="50" y="25" width="200" height="130" rx="12" fill="#2B2B2B" />
              <rect x="55" y="30" width="190" height="120" rx="10" fill="#3A3A3A" />
              <rect x="75" y="70" width="35" height="28" rx="4" fill="#C0C0C0" />
              <text x="170" y="130" font-size="32" font-weight="900" fill="#9CDB7C" style="font-family: var(--font-heading)">WISE</text>
            </svg>
          </div>
        </template>
      </HighlightProduct>
    `,
  }),
}
