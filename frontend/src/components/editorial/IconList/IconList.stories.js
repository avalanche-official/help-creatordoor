import IconList from './IconList.vue'

export default {
  title: 'Editorial/IconList',
  component: IconList,
  tags: ['autodocs'],
}

// Light Theme - Min State (3 items)
export const LightThemeMinState = {
  render: () => ({
    components: { IconList },
    template: `
      <IconList
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

// Neutral Theme - Max State (6 items)
export const NeutralThemeMaxState = {
  render: () => ({
    components: { IconList },
    template: `
      <IconList
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
          {
            icon: '🌎',
            title: 'Global reach',
            description: 'Send money to 80+ countries worldwide.',
          },
          {
            icon: '🔐',
            title: 'Secure payments',
            description: 'Bank-level security for all transactions.',
          },
          {
            icon: '📱',
            title: 'Mobile app',
            description: 'Manage money on the go with our app.',
          },
          {
            icon: '💳',
            title: 'Wise card',
            description: 'Spend in 40+ currencies at real rates.',
          },
        ]"
      />
    `,
  }),
}

// Forest Green Theme - Middle State (4 items)
export const ForestGreenMiddleState = {
  render: () => ({
    components: { IconList },
    template: `
      <IconList
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
          {
            icon: '🏦',
            title: 'Segregated accounts',
            description: 'Your money is held separately from our operating funds.',
          },
        ]"
      />
    `,
  }),
}

// With Show More (9 items)
export const WithShowMore = {
  render: () => ({
    components: { IconList },
    template: `
      <IconList
        theme="light"
        :show-more-enabled="true"
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
          {
            icon: '⚡',
            title: 'Fast transfers',
            description: 'Most transfers arrive within hours.',
          },
          {
            icon: '💰',
            title: 'Save money',
            description: 'Up to 6x cheaper than banks.',
          },
          {
            icon: '🌎',
            title: 'Global reach',
            description: 'Send to 80+ countries.',
          },
          {
            icon: '🔐',
            title: 'Secure payments',
            description: 'Bank-level security.',
          },
          {
            icon: '📱',
            title: 'Mobile app',
            description: 'Manage on the go.',
          },
          {
            icon: '💳',
            title: 'Wise card',
            description: 'Spend at real rates.',
          },
        ]"
      />
    `,
  }),
}
