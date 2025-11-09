import FeatureSectionSingle from './FeatureSectionSingle.vue'

export default {
  title: 'Editorial/FeatureSectionSingle',
  component: FeatureSectionSingle,
  tags: ['autodocs'],
}

// Light Theme - Layout 1 (like the screenshot)
export const LightThemeLayout1 = {
  render: () => ({
    components: { FeatureSectionSingle },
    template: `
      <FeatureSectionSingle
        image="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800"
        imageAlt="Person holding phone showing Wise app with multi-currency account"
        headline="Manage your money worldwide"
        description="Save money when you send, spend and get paid in over 40+ currencies. All you need, in one account, whenever you need it."
        :has-video="true"
        :cta="{
          primary: { label: 'Open an account', href: '/signup' },
          secondary: { label: 'Compare savings', href: '/compare' },
        }"
        theme="light"
        layout="layout-1"
      />
    `,
  }),
}

// Bright Green Theme - Layout 2
export const BrightGreenLayout2 = {
  render: () => ({
    components: { FeatureSectionSingle },
    template: `
      <FeatureSectionSingle
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"
        imageAlt="Person using Wise card for payment"
        headline="Spend like a local anywhere"
        description="Get the Wise debit card and spend in 160+ countries at the real exchange rate. No hidden fees, no surprises."
        :cta="{
          primary: { label: 'Order your card', href: '/card' },
          secondary: { label: 'Learn more', href: '/card/features' },
        }"
        theme="bright-green"
        layout="layout-2"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { FeatureSectionSingle },
    template: `
      <FeatureSectionSingle
        image="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800"
        imageAlt="Traveler with luggage at airport"
        headline="Perfect for travelers"
        description="Hold money in multiple currencies, spend anywhere, and never worry about poor exchange rates again."
        :cta="{
          primary: { label: 'Get started', href: '/signup' },
        }"
        theme="forest-green"
        layout="layout-1"
      />
    `,
  }),
}
