import CardCluster from './CardCluster.vue'

export default {
  title: 'Editorial/CardCluster',
  component: CardCluster,
  tags: ['autodocs'],
}

// Rates Variant (like the screenshot)
export const RatesVariant = {
  render: () => ({
    components: { CardCluster },
    template: `
      <CardCluster
        headline="The rates you'll get with us"
        description="The rate we show is how much your money could grow over a year. It's based on the fund's rate of return in the last 7 days and tracks the rate set by the central bank, which can vary throughout the year. The rate was last updated 19/03/2024."
        variant="rates"
        theme="light"
        :items="[
          {
            icon: '🇬🇧',
            title: '4.66% on GBP',
            subtitle: 'Includes 0.56% annual fee',
          },
          {
            icon: '🇪🇺',
            title: '3.67% on EUR',
            subtitle: 'Includes 0.27% annual fee',
          },
          {
            icon: '🇺🇸',
            title: '5.05% on USD',
            subtitle: 'Includes 0.29% annual fee',
          },
        ]"
      />
    `,
  }),
}

// Stepper Variant (Neutral Theme)
export const StepperVariant = {
  render: () => ({
    components: { CardCluster },
    template: `
      <CardCluster
        headline="How to get started"
        description="Setting up your Wise account is quick and easy. Follow these simple steps."
        variant="stepper"
        theme="neutral"
        :items="[
          {
            title: 'Sign up',
            subtitle: 'Create your account in minutes with just your email address.',
          },
          {
            title: 'Verify your identity',
            subtitle: 'Upload a photo ID to verify your account and unlock all features.',
          },
          {
            title: 'Start sending',
            subtitle: 'Add money to your account and send it anywhere in the world.',
          },
        ]"
        :cta="{ label: 'Create account', href: '/signup' }"
      />
    `,
  }),
}

// Icons Variant (Forest Theme)
export const IconsForestTheme = {
  render: () => ({
    components: { CardCluster },
    template: `
      <CardCluster
        headline="Why choose Wise"
        description="Join millions of people who save money with transparent, fair pricing."
        variant="icons"
        theme="forest"
        :items="[
          {
            icon: '⚡',
            title: 'Lightning fast',
            subtitle: 'Most transfers arrive within hours, not days.',
          },
          {
            icon: '🔒',
            title: 'Secure & regulated',
            subtitle: 'Your money is protected by financial authorities worldwide.',
          },
          {
            icon: '💰',
            title: 'Save money',
            subtitle: 'Up to 6x cheaper than traditional banks.',
          },
        ]"
        :cta="{ label: 'Learn more', href: '/about' }"
      />
    `,
  }),
}
