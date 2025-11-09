import HeroSmall from './HeroSmall.vue'

export default {
  title: 'Editorial/HeroSmall',
  component: HeroSmall,
  tags: ['autodocs'],
}

// Light Theme - Layout 1 (like the screenshot)
export const LightThemeLayout1 = {
  render: () => ({
    components: { HeroSmall },
    template: `
      <HeroSmall
        headline="One account, for all the money in the world"
        description="160 countries. 40 currencies. Take on the world with Wise — the international account for sending, spending and converting money like a local."
        image="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600"
        imageAlt="Person holding Wise card"
        :has-video="true"
        :cta="{
          primary: { label: 'Open an account', href: '/signup' },
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
    components: { HeroSmall },
    template: `
      <HeroSmall
        headline="Your money, simplified"
        description="Send, spend, and receive money in 40+ currencies. All in one account, with transparent fees."
        image="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600"
        imageAlt="Wise app on phone"
        :cta="{
          primary: { label: 'Get started', href: '/signup' },
          secondary: { label: 'Learn more', href: '/about' },
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
    components: { HeroSmall },
    template: `
      <HeroSmall
        headline="Money without borders"
        description="Join millions of people who save money with Wise. Fast, transparent, and built for you."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600"
        imageAlt="Wise card in hand"
        :cta="{
          primary: { label: 'Create account', href: '/signup' },
        }"
        theme="forest-green"
        layout="layout-1"
      />
    `,
  }),
}
