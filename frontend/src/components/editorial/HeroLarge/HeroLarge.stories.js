import HeroLarge from './HeroLarge.vue'

export default {
  title: 'Editorial/HeroLarge',
  component: HeroLarge,
  tags: ['autodocs'],
}

// Light Theme with Badges (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { HeroLarge },
    template: `
      <HeroLarge
        headline="One account, for all the money in the world"
        description="160 countries. 40 currencies. Take on the world with Wise — the international account for sending, spending and converting money like a local."
        :badges="[
          { icon: '🍎', rating: '4.3★', source: 'on App Store', reviews: '(57k reviews)' },
          { icon: '🤖', rating: '4.6★', source: 'on Google Play', reviews: '(1.5m reviews)' },
        ]"
        image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200"
        imageAlt="Person using Wise app on phone with colorful objects"
        :has-video="true"
        :cta="{
          primary: { label: 'Open an account', href: '/signup' },
          secondary: { label: 'Send money', href: '/send' },
        }"
        theme="light"
        background-style="half"
      />
    `,
  }),
}

// Bright Green Theme
export const BrightGreenTheme = {
  render: () => ({
    components: { HeroLarge },
    template: `
      <HeroLarge
        headline="Money without borders"
        description="Join millions of people who save money on international transfers. Fast, transparent, and built for you."
        image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200"
        imageAlt="Customer using Wise card to make payment"
        :cta="{
          primary: { label: 'Get started', href: '/signup' },
          secondary: { label: 'Learn more', href: '/about' },
        }"
        theme="bright-green"
        background-style="half"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { HeroLarge },
    template: `
      <HeroLarge
        headline="The world is your home"
        description="Send, spend, and receive money worldwide. All in one account, with transparent fees and the real exchange rate."
        image="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200"
        imageAlt="Traveler with luggage at airport"
        :cta="{
          primary: { label: 'Create account', href: '/signup' },
        }"
        theme="forest-green"
        background-style="full"
      />
    `,
  }),
}
