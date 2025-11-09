import QuoteHighlight from './QuoteHighlight.vue'

export default {
  title: 'Editorial/QuoteHighlight',
  component: QuoteHighlight,
  tags: ['autodocs'],
}

// Default Example (like the screenshot)
export const Default = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="I find using the Wise service so convenient and taking my Wise Card means I have resource just about anywhere I ever go in the world."
        author="John Smith, Customer – United Kingdom"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop"
        :overlayOpacity="0.3"
      />
    `,
  }),
}

// Customer Testimonial - Travel
export const TravelTestimonial = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="Wise saved me hundreds of pounds on my trip to Japan. The exchange rates are transparent and fair."
        author="Sarah Johnson, Traveler – Australia"
        backgroundImage="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&h=600&fit=crop"
        :overlayOpacity="0.4"
      />
    `,
  }),
}

// Business Customer
export const BusinessCustomer = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="Managing international payments for our business has never been easier. Wise is an essential tool for our global operations."
        author="Michael Chen, CEO – Singapore"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop"
        :overlayOpacity="0.35"
      />
    `,
  }),
}

// Short Quote
export const ShortQuote = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="Fast, reliable, and affordable. Everything I need in a money transfer service."
        author="Emma Williams, Freelancer – Canada"
        backgroundImage="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=600&fit=crop"
        :overlayOpacity="0.3"
      />
    `,
  }),
}

// Student Experience
export const StudentExperience = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="As a student studying abroad, Wise helps me manage my finances without worrying about hidden fees."
        author="Lucas Silva, Student – Brazil"
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=600&fit=crop"
        :overlayOpacity="0.4"
      />
    `,
  }),
}

// Expat Story
export const ExpatStory = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="Living between two countries means constant transfers. Wise makes it seamless and stress-free."
        author="Aisha Patel, Digital Nomad – India"
        backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=600&fit=crop"
        :overlayOpacity="0.35"
      />
    `,
  }),
}

// Nature Background
export const NatureBackground = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="The transparency and honesty of Wise's pricing is refreshing in the financial services industry."
        author="David Martinez, Entrepreneur – Spain"
        backgroundImage="https://images.unsplash.com/photo-1511497584788-876760111969?w=1600&h=600&fit=crop"
        :overlayOpacity="0.3"
      />
    `,
  }),
}

// Urban Background
export const UrbanBackground = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="Wise transformed how we handle cross-border payments for our remote team across 15 countries."
        author="Jennifer Lee, HR Director – United States"
        backgroundImage="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=600&fit=crop"
        :overlayOpacity="0.4"
      />
    `,
  }),
}

// Darker Overlay
export const DarkerOverlay = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="I've recommended Wise to all my friends and colleagues. It's simply the best way to send money internationally."
        author="Robert Brown, Software Engineer – Germany"
        backgroundImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=600&fit=crop"
        :overlayOpacity="0.5"
      />
    `,
  }),
}

// Light Overlay
export const LightOverlay = {
  render: () => ({
    components: { QuoteHighlight },
    template: `
      <QuoteHighlight
        quote="The app is intuitive, the rates are great, and customer support is always helpful when I need them."
        author="Sophie Dubois, Teacher – France"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop"
        :overlayOpacity="0.2"
      />
    `,
  }),
}
