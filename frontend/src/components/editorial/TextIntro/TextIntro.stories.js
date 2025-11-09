import TextIntro from './TextIntro.vue'

export default {
  title: 'Editorial/TextIntro',
  component: TextIntro,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Spend abroad and at home. In over 200 countries, and with more than 50 currencies. You'll never have to worry about exchange rate markups, or high transaction fees"
        theme="light"
      />
    `,
  }),
}

// Neutral Theme
export const NeutralTheme = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Spend abroad and at home. In over 200 countries, and with more than 50 currencies. You'll never have to worry about exchange rate markups, or high transaction fees"
        theme="neutral"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Spend abroad and at home. In over 200 countries, and with more than 50 currencies. You'll never have to worry about exchange rate markups, or high transaction fees"
        theme="forest-green"
      />
    `,
  }),
}

// Short Introduction
export const ShortIntroduction = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Send money internationally with the real exchange rate. Fast, secure, and transparent."
        theme="light"
      />
    `,
  }),
}

// Product Description
export const ProductDescription = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="The Wise debit card lets you spend money abroad at the real exchange rate, with no hidden fees. Available in over 150 countries."
        theme="neutral"
      />
    `,
  }),
}

// Value Proposition
export const ValueProposition = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="We're up to 8x cheaper than traditional banks. That's because we use the same rate you see on Google, and charge a small, transparent fee."
        theme="light"
      />
    `,
  }),
}

// Service Introduction
export const ServiceIntroduction = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Hold, send, and receive money in 50+ currencies. Get local account details for 10 currencies. All in one account."
        theme="forest-green"
      />
    `,
  }),
}

// Trust Statement
export const TrustStatement = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Trusted by over 16 million customers worldwide. We move £8 billion every month, saving people and businesses money."
        theme="neutral"
      />
    `,
  }),
}

// Business Solution
export const BusinessSolution = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Pay employees, contractors, and suppliers in their local currency. Manage your international business finances all in one place."
        theme="light"
      />
    `,
  }),
}

// Speed Message
export const SpeedMessage = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Most transfers arrive within 24 hours. Some arrive in seconds. Track your money in real-time with our app."
        theme="forest-green"
      />
    `,
  }),
}

// Feature Highlight
export const FeatureHighlight = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Convert money between currencies instantly. Set up rate alerts. Automate recurring payments. Everything you need to manage money internationally."
        theme="neutral"
      />
    `,
  }),
}

// Mission Statement
export const MissionStatement = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Money without borders. We believe everyone deserves access to fair, affordable, and transparent financial services, no matter where they are."
        theme="light"
      />
    `,
  }),
}

// Security Message
export const SecurityMessage = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Your money is protected. We're regulated by the FCA, and your funds are safeguarded in accordance with regulations."
        theme="forest-green"
      />
    `,
  }),
}

// Global Reach
export const GlobalReach = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="Send money to over 80 countries. Receive money from anywhere in the world. All with one simple, powerful account."
        theme="neutral"
      />
    `,
  }),
}

// Simple Promise
export const SimplePromise = {
  render: () => ({
    components: { TextIntro },
    template: `
      <TextIntro
        text="No hidden fees. No markups. Just the real exchange rate, and a small, transparent fee. That's our promise."
        theme="light"
      />
    `,
  }),
}
