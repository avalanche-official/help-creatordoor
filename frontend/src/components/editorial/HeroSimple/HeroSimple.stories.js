import HeroSimple from './HeroSimple.vue'

export default {
  title: 'Editorial/HeroSimple',
  component: HeroSimple,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { HeroSimple },
    template: `
      <HeroSimple
        headline="One account, for all the money in the world"
        description="160 countries. 40 currencies. Take on the world with Wise — the international account for sending, spending and converting money like a local."
        :cta="{
          primary: { label: 'Open an account', href: '/signup' },
          secondary: { label: 'Send money', href: '/send' },
        }"
        theme="light"
      />
    `,
  }),
}

// Bright Green Theme
export const BrightGreenTheme = {
  render: () => ({
    components: { HeroSimple },
    template: `
      <HeroSimple
        headline="Send money worldwide"
        description="Fast, transparent transfers with the real exchange rate. Join millions of people who save money with Wise."
        :cta="{
          primary: { label: 'Get started', href: '/signup' },
          secondary: { label: 'Learn more', href: '/about' },
        }"
        theme="bright-green"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { HeroSimple },
    template: `
      <HeroSimple
        headline="Money without borders"
        description="The international account built for people going places. Send, spend, and receive money globally."
        :cta="{
          primary: { label: 'Create account', href: '/signup' },
        }"
        theme="forest-green"
      />
    `,
  }),
}
