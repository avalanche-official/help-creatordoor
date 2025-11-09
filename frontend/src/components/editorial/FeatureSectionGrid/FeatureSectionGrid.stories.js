import FeatureSectionGrid from './FeatureSectionGrid.vue'

export default {
  title: 'Editorial/FeatureSectionGrid',
  component: FeatureSectionGrid,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { FeatureSectionGrid },
    template: `
      <FeatureSectionGrid
        theme="light"
        :items="[
          {
            image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800',
            imageAlt: 'Person holding phone showing Wise app with multi-currency balances',
            title: 'Manage your money worldwide',
            description: 'Save money when you send, spend and get paid in over 40+ currencies. All you need, in one account, whenever you need it.',
            hasVideo: true,
            cta: {
              primary: { label: 'Open an account', href: '/signup' },
              secondary: { label: 'Compare savings', href: '/compare' },
            },
          },
          {
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
            imageAlt: 'Person holding phone showing interest gains',
            title: 'Boost your balances day by day',
            description: 'Start from a penny, cent or dime. Enjoy a 4.2% variable rate return on your GBP balance, and get leading rates on EUR and USD too. Capital at risk — growth not guaranteed.',
            cta: {
              primary: { label: 'Learn about Interest', href: '/interest' },
            },
          },
        ]"
      />
    `,
  }),
}

// Bright Green Theme
export const BrightGreenTheme = {
  render: () => ({
    components: { FeatureSectionGrid },
    template: `
      <FeatureSectionGrid
        theme="bright-green"
        :items="[
          {
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
            imageAlt: 'Customer using Wise card at cafe',
            title: 'Spend like a local, anywhere',
            description: 'Get the Wise debit card and spend in 160+ countries at the real exchange rate. Free ATM withdrawals up to £200 per month.',
            cta: {
              primary: { label: 'Order your card', href: '/card' },
              secondary: { label: 'Learn more', href: '/card/features' },
            },
          },
          {
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
            imageAlt: 'Business team collaborating',
            title: 'Built for businesses',
            description: 'Save time and money on international payments. Integrate with your accounting software and pay invoices in bulk.',
            cta: {
              primary: { label: 'Try Wise Business', href: '/business' },
            },
          },
        ]"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { FeatureSectionGrid },
    template: `
      <FeatureSectionGrid
        theme="forest-green"
        :items="[
          {
            image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800',
            imageAlt: 'Person traveling with luggage',
            title: 'Money for travelers',
            description: 'Hold money in 40+ currencies, spend with your Wise card, and never worry about exchange rates again. Perfect for digital nomads and frequent travelers.',
            cta: {
              primary: { label: 'Get started', href: '/signup' },
              secondary: { label: 'See all features', href: '/features' },
            },
          },
          {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            imageAlt: 'Financial dashboard on laptop',
            title: 'Track everything in one place',
            description: 'See all your balances, transactions, and transfers in one dashboard. Get real-time notifications and stay in control of your money.',
            cta: {
              primary: { label: 'Open account', href: '/signup' },
            },
          },
        ]"
      />
    `,
  }),
}
