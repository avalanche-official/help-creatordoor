import TextFact from './TextFact.vue'

export default {
  title: 'Editorial/TextFact',
  component: TextFact,
  tags: ['autodocs'],
}

// Forest Green Theme with Image (like the screenshot)
export const ForestGreenWithImage = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Give your business a boost"
        fact="520k"
        description="Active business customers in 2023"
        factImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=80"
        theme="forest-green"
      />
    `,
  }),
}

// Forest Green Theme (without image)
export const ForestGreenTheme = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Give your business a boost"
        fact="520k"
        description="Active business customers in 2023"
        theme="forest-green"
      />
    `,
  }),
}

// Dark Charcoal Theme
export const DarkCharcoalTheme = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Trusted by millions worldwide"
        fact="16M+"
        description="People use Wise every month"
        theme="dark-charcoal"
      />
    `,
  }),
}

// Dark Gold Theme
export const DarkGoldTheme = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Moving money globally"
        fact="$10B"
        description="Transferred by customers every month"
        theme="dark-gold"
      />
    `,
  }),
}

// Without Headline
export const WithoutHeadline = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        fact="140+"
        description="Countries supported worldwide"
        theme="forest-green"
      />
    `,
  }),
}

// Customer Growth
export const CustomerGrowth = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Growing every day"
        fact="50k+"
        description="New customers join Wise every week"
        factImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80"
        theme="forest-green"
      />
    `,
  }),
}

// Money Saved
export const MoneySaved = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Saving customers money"
        fact="$1.5B"
        description="Saved in bank fees since 2011"
        theme="dark-charcoal"
      />
    `,
  }),
}

// Team Size
export const TeamSize = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Built by a global team"
        fact="5,000+"
        description="Employees across 17 offices worldwide"
        theme="dark-gold"
      />
    `,
  }),
}

// Currency Support
export const CurrencySupport = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="True multi-currency support"
        fact="50+"
        description="Currencies available in your Wise account"
        factImage="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=800&fit=crop&q=80"
        theme="forest-green"
      />
    `,
  }),
}

// Transaction Speed
export const TransactionSpeed = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Fast international transfers"
        fact="50%"
        description="Of transfers arrive within 1 hour"
        theme="dark-charcoal"
      />
    `,
  }),
}

// Rating Score
export const RatingScore = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Trusted by our customers"
        fact="4.5★"
        description="Average rating on Trustpilot from 200k+ reviews"
        theme="dark-gold"
      />
    `,
  }),
}

// Percentage Stat
export const PercentageStat = {
  render: () => ({
    components: { TextFact },
    template: `
      <TextFact
        headline="Transparent pricing"
        fact="8x"
        description="Cheaper than traditional banks on average"
        factImage="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop&q=80"
        theme="forest-green"
      />
    `,
  }),
}
