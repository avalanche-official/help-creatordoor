import FeatureSectionWide from './FeatureSectionWide.vue'

export default {
  title: 'Editorial/FeatureSectionWide',
  component: FeatureSectionWide,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { FeatureSectionWide },
    template: `
      <FeatureSectionWide
        image="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200"
        imageAlt="Customer using Wise card to pay for electric scooter rental"
        :image-badge="{
          icon: '↑',
          label: 'Electric City',
          value: '150 USD',
        }"
        headline="The card that's always got the right currency"
        description="Get a debit card to spend online, at the checkout, and to withdraw cash in the currency you need right away."
        :cta="{
          primary: { label: 'Order your card', href: '/card' },
          secondary: { label: 'Learn more', href: '/card/features' },
        }"
        theme="light"
        layout="layout-1"
      />
    `,
  }),
}

// Bright Green Theme
export const BrightGreenTheme = {
  render: () => ({
    components: { FeatureSectionWide },
    template: `
      <FeatureSectionWide
        image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200"
        imageAlt="Person using contactless payment with Wise card at cafe"
        headline="Spend anywhere, save everywhere"
        description="Use your Wise card in 160+ countries at the real exchange rate. No hidden fees, no surprises."
        :cta="{
          primary: { label: 'Get your card', href: '/card' },
          secondary: { label: 'Compare to banks', href: '/compare' },
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
    components: { FeatureSectionWide },
    template: `
      <FeatureSectionWide
        image="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200"
        imageAlt="Wise card on wooden table with phone"
        headline="Money that works like you do"
        description="Send, spend, and receive money worldwide with one account. No hidden fees, just fair pricing."
        :cta="{
          primary: { label: 'Open an account', href: '/signup' },
        }"
        theme="forest-green"
        layout="layout-3"
      />
    `,
  }),
}
