import HeroInteractive from './HeroInteractive.vue'

export default {
  title: 'Editorial/HeroInteractive',
  component: HeroInteractive,
  tags: ['autodocs'],
}

// Bright Green - Half Background - Horizontal
export const BrightGreenHorizontal = {
  render: () => ({
    components: { HeroInteractive },
    template: `
      <HeroInteractive
        headline="Send money abroad"
        description="Fast, transparent transfers with the real exchange rate. No hidden fees, no surprises."
        theme="bright-green"
        background-style="half"
        layout="horizontal"
      />
    `,
  }),
}

// Forest Green - Half Background - Vertical
export const ForestGreenVertical = {
  render: () => ({
    components: { HeroInteractive },
    template: `
      <HeroInteractive
        headline="Calculate your savings"
        description="See how much you could save compared to your bank. We use the real exchange rate."
        theme="forest-green"
        background-style="half"
        layout="vertical"
      />
    `,
  }),
}

// Bright Green - Full Background
export const BrightGreenFull = {
  render: () => ({
    components: { HeroInteractive },
    template: `
      <HeroInteractive
        headline="Money without borders"
        description="Join millions of people who save money on international transfers with Wise."
        theme="bright-green"
        background-style="full"
        layout="horizontal"
      />
    `,
  }),
}
