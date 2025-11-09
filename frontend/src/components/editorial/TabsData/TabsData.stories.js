import TabsData from './TabsData.vue'

export default {
  title: 'Editorial/TabsData',
  component: TabsData,
  tags: ['autodocs'],
}

// Fund Performance Example (like the Wise Neptune screenshot)
export const FundPerformance = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Fund performance"
        :tabs="[
          {
            value: 'gbp',
            label: 'GBP',
            image: 'https://placehold.co/1000x600/f6f5f4/333333/png?text=Fund+Rate+vs+Bank+of+England+Base+Rate+Chart',
            alt: 'A graphic showing the performance of the BlackRock ICS Sterling Government Liquidity Fund',
            description: 'The graph shows past performance of the BlackRock ICS Sterling Government Liquidity Fund. The fund has returned an 0.93% annual average over the last 5 years, excluding Wise fees. The current rates do not guarantee future growth. For more on the fund\\'s past performance, visit the BlackRock fund page.'
          },
          {
            value: 'eur',
            label: 'EUR',
            image: 'https://placehold.co/1000x600/f6f5f4/333333/png?text=EUR+Fund+Performance+2018-2023',
            alt: 'A graphic showing the performance of the EUR fund compared to ECB base rate',
            description: 'Historical performance data for the EUR-denominated fund showing annual returns over the last 5 years.'
          },
          {
            value: 'usd',
            label: 'USD',
            image: 'https://placehold.co/1000x600/f6f5f4/333333/png?text=USD+Fund+Performance+2018-2023',
            alt: 'A graphic showing the performance of the USD fund compared to Federal Reserve rate',
            description: 'Historical performance data for the USD-denominated fund showing annual returns over the last 5 years.'
          }
        ]"
        defaultTab="gbp"
      />
    `,
  }),
}

// Market Data Example
export const MarketData = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Global market trends"
        :tabs="[
          {
            value: 'europe',
            label: 'Europe',
            image: 'https://placehold.co/1000x600/e8f5e9/2e7d32/png?text=European+Markets+Performance',
            alt: 'Market trends visualization for European markets showing quarterly growth',
            description: 'Analysis of European market performance across major indices including FTSE 100, DAX, and CAC 40.'
          },
          {
            value: 'asia',
            label: 'Asia',
            image: 'https://placehold.co/1000x600/e3f2fd/1565c0/png?text=Asian+Markets+Performance',
            alt: 'Market trends visualization for Asian markets showing quarterly growth',
            description: 'Overview of Asian market dynamics including Nikkei, Hang Seng, and Shanghai Composite indices.'
          },
          {
            value: 'americas',
            label: 'Americas',
            image: 'https://placehold.co/1000x600/fff3e0/ef6c00/png?text=Americas+Markets+Performance',
            alt: 'Market trends visualization for American markets showing quarterly growth',
            description: 'Comprehensive view of North and South American market performance including S&P 500 and BOVESPA.'
          }
        ]"
      />
    `,
  }),
}

// Investment Strategy Comparison
export const InvestmentStrategy = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Investment portfolio strategies"
        :tabs="[
          {
            value: 'conservative',
            label: 'Conservative',
            image: 'https://placehold.co/1000x600/f3e5f5/7b1fa2/png?text=Conservative+Portfolio+Allocation',
            alt: 'Chart showing conservative investment strategy with 70% bonds and 30% stocks',
            description: 'Low-risk portfolio with stable returns, ideal for risk-averse investors seeking capital preservation.'
          },
          {
            value: 'balanced',
            label: 'Balanced',
            image: 'https://placehold.co/1000x600/e0f2f1/00796b/png?text=Balanced+Portfolio+Allocation',
            alt: 'Chart showing balanced investment strategy with 50% bonds and 50% stocks',
            description: 'Diversified approach balancing growth potential with risk management through mixed asset allocation.'
          },
          {
            value: 'growth',
            label: 'Growth',
            image: 'https://placehold.co/1000x600/fce4ec/c2185b/png?text=Growth+Portfolio+Allocation',
            alt: 'Chart showing growth investment strategy with 70% stocks and 30% bonds',
            description: 'Higher-risk portfolio targeting maximum long-term capital appreciation with equity focus.'
          },
          {
            value: 'aggressive',
            label: 'Aggressive',
            image: 'https://placehold.co/1000x600/fff9c4/f57f17/png?text=Aggressive+Portfolio+Allocation',
            alt: 'Chart showing aggressive investment strategy with 90% stocks and 10% bonds',
            description: 'High-risk, high-reward approach for experienced investors seeking substantial gains through concentrated equity positions.'
          }
        ]"
      />
    `,
  }),
}

// Annual Reports
export const AnnualReports = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Annual performance reports"
        :tabs="[
          {
            value: '2024',
            label: '2024',
            image: 'https://placehold.co/1000x600/e8eaf6/3f51b5/png?text=2024+Annual+Report+Summary',
            alt: 'Visual summary of 2024 annual performance report with key metrics and growth indicators',
            description: 'Our strongest year yet with 23% growth and expanded market presence across Europe and Asia.'
          },
          {
            value: '2023',
            label: '2023',
            image: 'https://placehold.co/1000x600/ede7f6/673ab7/png?text=2023+Annual+Report+Summary',
            alt: 'Visual summary of 2023 annual performance report with key metrics and growth indicators',
            description: 'Steady growth with 18% increase in customer base and launch of new product lines.'
          },
          {
            value: '2022',
            label: '2022',
            image: 'https://placehold.co/1000x600/f3e5f5/8e24aa/png?text=2022+Annual+Report+Summary',
            alt: 'Visual summary of 2022 annual performance report with key metrics and growth indicators',
            description: 'Foundation year with strategic investments in infrastructure and technology platform upgrades.'
          }
        ]"
      />
    `,
  }),
}

// Currency Exchange Rates
export const ExchangeRates = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Exchange rate trends"
        :tabs="[
          {
            value: 'gbp-eur',
            label: 'GBP/EUR',
            image: 'https://placehold.co/1000x600/e8f5e9/388e3c/png?text=GBP+to+EUR+Exchange+Rate',
            alt: 'Chart showing GBP to EUR exchange rate trends over 12 months',
            description: 'British Pound to Euro exchange rate showing monthly fluctuations and trend analysis.'
          },
          {
            value: 'usd-gbp',
            label: 'USD/GBP',
            image: 'https://placehold.co/1000x600/e3f2fd/1976d2/png?text=USD+to+GBP+Exchange+Rate',
            alt: 'Chart showing USD to GBP exchange rate trends over 12 months',
            description: 'US Dollar to British Pound exchange rate with historical comparison and projections.'
          },
          {
            value: 'eur-usd',
            label: 'EUR/USD',
            image: 'https://placehold.co/1000x600/fff3e0/f57c00/png?text=EUR+to+USD+Exchange+Rate',
            alt: 'Chart showing EUR to USD exchange rate trends over 12 months',
            description: 'Euro to US Dollar exchange rate trends with key economic event markers.'
          }
        ]"
      />
    `,
  }),
}

// With Disabled Tab
export const WithDisabled = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Product availability by currency"
        :tabs="[
          {
            value: 'gbp',
            label: 'GBP',
            image: 'https://placehold.co/1000x600/c8e6c9/2e7d32/png?text=GBP+Products+Available',
            alt: 'Chart showing available GBP products and features',
            description: 'Full suite of products available for British Pound accounts including savings, investments, and cards.'
          },
          {
            value: 'eur',
            label: 'EUR',
            image: 'https://placehold.co/1000x600/c8e6c9/2e7d32/png?text=EUR+Products+Available',
            alt: 'Chart showing available EUR products and features',
            description: 'Complete range of Euro-denominated products including multi-currency accounts and business solutions.'
          },
          {
            value: 'jpy',
            label: 'JPY',
            image: 'https://placehold.co/1000x600/ffccbc/e64a19/png?text=JPY+Coming+Soon',
            alt: 'JPY products coming soon notification',
            description: 'Japanese Yen products launching Q3 2025. Sign up for early access notifications.',
            disabled: true
          },
          {
            value: 'usd',
            label: 'USD',
            image: 'https://placehold.co/1000x600/c8e6c9/2e7d32/png?text=USD+Products+Available',
            alt: 'Chart showing available USD products and features',
            description: 'Comprehensive US Dollar product lineup including international transfers and investment options.'
          }
        ]"
      />
    `,
  }),
}

// Simple Data Visualization
export const SimpleVisualization = {
  render: () => ({
    components: { TabsData },
    template: `
      <TabsData
        headline="Customer satisfaction scores"
        :tabs="[
          {
            value: 'q1',
            label: 'Q1 2024',
            image: 'https://placehold.co/1000x600/f6f5f4/333333/png?text=Q1+Customer+Satisfaction+87%25',
            alt: 'Customer satisfaction score for Q1 2024 showing 87% positive rating'
          },
          {
            value: 'q2',
            label: 'Q2 2024',
            image: 'https://placehold.co/1000x600/f6f5f4/333333/png?text=Q2+Customer+Satisfaction+91%25',
            alt: 'Customer satisfaction score for Q2 2024 showing 91% positive rating'
          },
          {
            value: 'q3',
            label: 'Q3 2024',
            image: 'https://placehold.co/1000x600/f6f5f4/333333/png?text=Q3+Customer+Satisfaction+89%25',
            alt: 'Customer satisfaction score for Q3 2024 showing 89% positive rating'
          }
        ]"
      />
    `,
  }),
}
