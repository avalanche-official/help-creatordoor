import IconDivider from './FeatureHighlight.vue'

export default {
  title: 'Editorial/IconDivider',
  component: IconDivider,
  tags: ['autodocs'],
}

// Light Theme - Max State (3 items)
export const LightThemeMaxState = {
  render: () => ({
    components: { IconDivider },
    template: `
      <IconDivider
        theme="light"
        :items="[
          {
            icon: '🔒',
            title: 'Privacy and data',
            description: 'We protect your details through strict standards and 2FA.',
          },
          {
            icon: '🎧',
            title: 'Dedicated support',
            description: 'Questions? Get 24/7 help in 14 languages.',
          },
          {
            icon: '🌍',
            title: 'International safeguarding',
            description: 'We're regulated by national authorities around the globe.',
          },
        ]"
      />
    `,
  }),
}

// Neutral Theme - Min State (2 items)
export const NeutralThemeMinState = {
  render: () => ({
    components: { IconDivider },
    template: `
      <IconDivider
        theme="neutral"
        :items="[
          {
            icon: '⚡',
            title: 'Fast transfers',
            description: 'Most transfers arrive within hours, not days.',
          },
          {
            icon: '💰',
            title: 'Save money',
            description: 'Up to 6x cheaper than traditional banks.',
          },
        ]"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { IconDivider },
    template: `
      <IconDivider
        theme="forest-green"
        :items="[
          {
            icon: '🛡️',
            title: 'Bank-level security',
            description: 'We use 256-bit encryption to protect your data.',
          },
          {
            icon: '✓',
            title: 'Regulated globally',
            description: 'Licensed by financial authorities worldwide.',
          },
          {
            icon: '🔐',
            title: 'Two-factor authentication',
            description: 'Add an extra layer of security to your account.',
          },
        ]"
      />
    `,
  }),
}
