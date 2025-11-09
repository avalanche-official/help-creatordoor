import LogoGrid from './LogoGrid.vue'

export default {
  title: 'Editorial/LogoGrid',
  component: LogoGrid,
  tags: ['autodocs'],
}

// Light Theme (default)
export const LightTheme = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Seamlessly integrates with banks, fintechs and enterprises"
        :logos="[
          { name: 'Monzo', image: 'https://logo.clearbit.com/monzo.com', alt: 'Monzo logo' },
          { name: 'N26', image: 'https://logo.clearbit.com/n26.com', alt: 'N26 logo' },
          { name: 'Mandiri', image: 'https://logo.clearbit.com/bankmandiri.co.id', alt: 'Mandiri Bank logo' },
          { name: 'Shinhan Bank', image: 'https://logo.clearbit.com/shinhan.com', alt: 'Shinhan Bank logo' },
          { name: 'Google Pay', image: 'https://logo.clearbit.com/pay.google.com', alt: 'Google Pay logo' },
          { name: 'Ramp', image: 'https://logo.clearbit.com/ramp.com', alt: 'Ramp logo' },
          { name: 'Deel', image: 'https://logo.clearbit.com/deel.com', alt: 'Deel logo' },
          { name: 'Bolt', image: 'https://logo.clearbit.com/bolt.eu', alt: 'Bolt logo' },
        ]"
        theme="light"
      />
    `,
  }),
}

// Neutral Theme
export const NeutralTheme = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Trusted by leading financial institutions"
        description="We partner with innovative companies across the globe to deliver seamless payment solutions."
        :logos="[
          { name: 'Monzo', image: 'https://logo.clearbit.com/monzo.com', alt: 'Monzo logo' },
          { name: 'N26', image: 'https://logo.clearbit.com/n26.com', alt: 'N26 logo' },
          { name: 'Revolut', image: 'https://logo.clearbit.com/revolut.com', alt: 'Revolut logo' },
          { name: 'Starling', image: 'https://logo.clearbit.com/starlingbank.com', alt: 'Starling Bank logo' },
          { name: 'Stripe', image: 'https://logo.clearbit.com/stripe.com', alt: 'Stripe logo' },
          { name: 'Square', image: 'https://logo.clearbit.com/squareup.com', alt: 'Square logo' },
          { name: 'PayPal', image: 'https://logo.clearbit.com/paypal.com', alt: 'PayPal logo' },
          { name: 'Adyen', image: 'https://logo.clearbit.com/adyen.com', alt: 'Adyen logo' },
        ]"
        theme="neutral"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Powering payments for global leaders"
        description="Join thousands of businesses using our platform for international money transfers."
        :logos="[
          { name: 'Google Pay', image: 'https://logo.clearbit.com/pay.google.com', alt: 'Google Pay logo' },
          { name: 'Amazon', image: 'https://logo.clearbit.com/amazon.com', alt: 'Amazon logo' },
          { name: 'Microsoft', image: 'https://logo.clearbit.com/microsoft.com', alt: 'Microsoft logo' },
          { name: 'Apple', image: 'https://logo.clearbit.com/apple.com', alt: 'Apple logo' },
          { name: 'Uber', image: 'https://logo.clearbit.com/uber.com', alt: 'Uber logo' },
          { name: 'Airbnb', image: 'https://logo.clearbit.com/airbnb.com', alt: 'Airbnb logo' },
          { name: 'Spotify', image: 'https://logo.clearbit.com/spotify.com', alt: 'Spotify logo' },
          { name: 'Netflix', image: 'https://logo.clearbit.com/netflix.com', alt: 'Netflix logo' },
        ]"
        theme="forest-green"
      />
    `,
  }),
}

// Minimum 4 Logos
export const MinimumLogos = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Our banking partners"
        :logos="[
          { name: 'HSBC', image: 'https://logo.clearbit.com/hsbc.com', alt: 'HSBC logo' },
          { name: 'Barclays', image: 'https://logo.clearbit.com/barclays.com', alt: 'Barclays logo' },
          { name: 'Santander', image: 'https://logo.clearbit.com/santander.com', alt: 'Santander logo' },
          { name: 'Lloyds', image: 'https://logo.clearbit.com/lloydsbank.com', alt: 'Lloyds Bank logo' },
        ]"
        theme="light"
      />
    `,
  }),
}

// Six Logos
export const SixLogos = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Fintech partners we work with"
        description="Building the future of finance together."
        :logos="[
          { name: 'Wise', image: 'https://logo.clearbit.com/wise.com', alt: 'Wise logo' },
          { name: 'Revolut', image: 'https://logo.clearbit.com/revolut.com', alt: 'Revolut logo' },
          { name: 'Monzo', image: 'https://logo.clearbit.com/monzo.com', alt: 'Monzo logo' },
          { name: 'N26', image: 'https://logo.clearbit.com/n26.com', alt: 'N26 logo' },
          { name: 'Chime', image: 'https://logo.clearbit.com/chime.com', alt: 'Chime logo' },
          { name: 'SoFi', image: 'https://logo.clearbit.com/sofi.com', alt: 'SoFi logo' },
        ]"
        theme="neutral"
      />
    `,
  }),
}

// Enterprise Clients
export const EnterpriseClients = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Trusted by enterprise clients worldwide"
        :logos="[
          { name: 'Shopify', image: 'https://logo.clearbit.com/shopify.com', alt: 'Shopify logo' },
          { name: 'Salesforce', image: 'https://logo.clearbit.com/salesforce.com', alt: 'Salesforce logo' },
          { name: 'Slack', image: 'https://logo.clearbit.com/slack.com', alt: 'Slack logo' },
          { name: 'Zoom', image: 'https://logo.clearbit.com/zoom.us', alt: 'Zoom logo' },
          { name: 'Dropbox', image: 'https://logo.clearbit.com/dropbox.com', alt: 'Dropbox logo' },
          { name: 'HubSpot', image: 'https://logo.clearbit.com/hubspot.com', alt: 'HubSpot logo' },
          { name: 'Atlassian', image: 'https://logo.clearbit.com/atlassian.com', alt: 'Atlassian logo' },
          { name: 'DocuSign', image: 'https://logo.clearbit.com/docusign.com', alt: 'DocuSign logo' },
        ]"
        theme="forest-green"
      />
    `,
  }),
}

// Without Description
export const WithoutDescription = {
  render: () => ({
    components: { LogoGrid },
    template: `
      <LogoGrid
        headline="Our payment partners"
        :logos="[
          { name: 'Visa', image: 'https://logo.clearbit.com/visa.com', alt: 'Visa logo' },
          { name: 'Mastercard', image: 'https://logo.clearbit.com/mastercard.com', alt: 'Mastercard logo' },
          { name: 'American Express', image: 'https://logo.clearbit.com/americanexpress.com', alt: 'American Express logo' },
          { name: 'Discover', image: 'https://logo.clearbit.com/discover.com', alt: 'Discover logo' },
          { name: 'PayPal', image: 'https://logo.clearbit.com/paypal.com', alt: 'PayPal logo' },
          { name: 'Venmo', image: 'https://logo.clearbit.com/venmo.com', alt: 'Venmo logo' },
        ]"
        theme="light"
      />
    `,
  }),
}
