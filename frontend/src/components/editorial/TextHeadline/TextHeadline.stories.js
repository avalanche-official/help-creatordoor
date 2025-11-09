import TextHeadline from './TextHeadline.vue'

export default {
  title: 'Editorial/TextHeadline',
  component: TextHeadline,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="SPEND ABROAD AND AT HOME"
        body="In over 200 countries, and with more than 50 currencies. You'll never have to worry about exchange rate markups, or high transaction fees."
        theme="light"
      />
    `,
  }),
}

// Neutral Theme
export const NeutralTheme = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="SPEND ABROAD AND AT HOME"
        body="In over 200 countries, and with more than 50 currencies. You'll never have to worry about exchange rate markups, or high transaction fees."
        theme="neutral"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="SPEND ABROAD AND AT HOME"
        body="In over 200 countries, and with more than 50 currencies. You'll never have to worry about exchange rate markups, or high transaction fees."
        theme="forest-green"
      />
    `,
  }),
}

// Without Body Text
export const WithoutBody = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="MONEY WITHOUT BORDERS"
        theme="light"
      />
    `,
  }),
}

// Short Headline
export const ShortHeadline = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="SEND MONEY GLOBALLY"
        body="Fast, secure, and affordable international transfers to over 80 countries."
        theme="light"
      />
    `,
  }),
}

// Product Introduction
export const ProductIntroduction = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="THE WISE DEBIT CARD"
        body="Spend money abroad with the real exchange rate. No hidden fees, no surprises. Just honest, transparent pricing."
        theme="neutral"
      />
    `,
  }),
}

// Business Solution
export const BusinessSolution = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="BUILT FOR BUSINESS"
        body="Manage international payments, payroll, and expenses all in one place. Trusted by over 500,000 businesses worldwide."
        theme="forest-green"
      />
    `,
  }),
}

// Value Proposition
export const ValueProposition = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="REAL EXCHANGE RATES"
        body="We use the same rate you see on Google. Always transparent, always fair. That's the Wise promise."
        theme="light"
      />
    `,
  }),
}

// Feature Highlight
export const FeatureHighlight = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="HOLD 50+ CURRENCIES"
        body="Your multi-currency account lets you hold, receive, and send money in dozens of currencies. All with one account."
        theme="neutral"
      />
    `,
  }),
}

// Trust Statement
export const TrustStatement = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="TRUSTED BY MILLIONS"
        body="Over 16 million people and businesses use Wise to save money on international transfers every month."
        theme="forest-green"
      />
    `,
  }),
}

// Call to Action Style
export const CallToAction = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="START SAVING TODAY"
        body="Join millions of people who are already saving money with Wise. Sign up in minutes and make your first transfer."
        theme="light"
      />
    `,
  }),
}

// Two-line Headline
export const TwoLineHeadline = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="THE FAST AND EASY WAY TO SEND MONEY"
        body="No more waiting days for your transfer to arrive. Most transfers with Wise are completed in under 24 hours."
        theme="neutral"
      />
    `,
  }),
}

// Mission Statement
export const MissionStatement = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="MONEY FOR THE INTERNET AGE"
        body="Built on cutting-edge technology, designed for people who live, work, and travel internationally."
        theme="forest-green"
      />
    `,
  }),
}

// Simple Message
export const SimpleMessage = {
  render: () => ({
    components: { TextHeadline },
    template: `
      <TextHeadline
        headline="NO HIDDEN FEES"
        theme="light"
      />
    `,
  }),
}
