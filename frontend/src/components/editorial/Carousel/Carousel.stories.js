import Carousel from './Carousel.vue'

export default {
  title: 'Editorial/Carousel',
  component: Carousel,
  tags: ['autodocs'],
}

// Quotes Variant (like the screenshot)
export const QuotesVariant = {
  render: () => ({
    components: { Carousel },
    template: `
      <Carousel
        headline="For people going places"
        variant="quotes"
        :items="[
          {
            quote1: {
              flag: '🇮🇹',
              text: 'They make our life split between two continents possible. Transfers are simple and very, very fast.',
              author: 'Stuart on Trustpilot',
            },
            quote2: {
              flag: '🇬🇧',
              text: 'Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.',
              author: 'Megan on Trustpilot',
            },
          },
          {
            quote1: {
              flag: '🇺🇸',
              text: 'Best rates, super fast transfers, and excellent customer service. Wise has made international payments so much easier.',
              author: 'James on Trustpilot',
            },
            quote2: {
              flag: '🇦🇺',
              text: 'I use Wise for all my international transfers. The app is intuitive and the fees are transparent. Highly recommend!',
              author: 'Sarah on Trustpilot',
            },
          },
          {
            quote1: {
              flag: '🇨🇦',
              text: 'Wise has saved me thousands compared to my bank. The real exchange rate makes all the difference.',
              author: 'Michael on Trustpilot',
            },
            quote2: {
              flag: '🇩🇪',
              text: 'Perfect for digital nomads and expats. I can hold multiple currencies and spend anywhere without worrying about fees.',
              author: 'Anna on Trustpilot',
            },
          },
        ]"
      />
    `,
  }),
}

// Stepper Variant
export const StepperVariant = {
  render: () => ({
    components: { Carousel },
    template: `
      <Carousel
        headline="How to send money"
        variant="stepper"
        :items="[
          {
            steps: [
              {
                title: 'Create your account',
                description: 'Sign up with your email address. It takes just a few minutes to get started.',
              },
              {
                title: 'Choose your amount',
                description: 'Enter how much you want to send. We'll show you the exact fee and exchange rate upfront.',
              },
              {
                title: 'Add recipient details',
                description: 'Enter your recipient's bank details. We'll save them for next time to make it even faster.',
              },
            ],
          },
          {
            steps: [
              {
                title: 'Verify your identity',
                description: 'Upload a photo ID to verify your account. This usually takes 1-2 business days.',
              },
              {
                title: 'Choose payment method',
                description: 'Pay with bank transfer, debit card, or credit card. Each has different fees and speeds.',
              },
              {
                title: 'Track your transfer',
                description: 'Monitor your transfer in real-time through the app or website. We'll notify you at every step.',
              },
            ],
          },
        ]"
      />
    `,
  }),
}

// Images Variant
export const ImagesVariant = {
  render: () => ({
    components: { Carousel },
    template: `
      <Carousel
        headline="Wise around the world"
        variant="images"
        :items="[
          {
            images: [
              {
                src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
                alt: 'Person using Wise card in a cafe',
                caption: 'Use your Wise card anywhere',
              },
              {
                src: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600',
                alt: 'Mobile phone showing Wise app',
                caption: 'Manage money on the go',
              },
              {
                src: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600',
                alt: 'Traveler with luggage',
                caption: 'Perfect for travelers',
              },
            ],
          },
          {
            images: [
              {
                src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600',
                alt: 'Team working together',
                caption: 'Great for businesses',
              },
              {
                src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
                alt: 'Digital nomad working',
                caption: 'For digital nomads',
              },
              {
                src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
                alt: 'Financial dashboard',
                caption: 'Track your money',
              },
            ],
          },
        ]"
      />
    `,
  }),
}
