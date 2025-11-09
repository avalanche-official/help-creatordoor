import QuoteText from './QuoteText.vue'

export default {
  title: 'Editorial/QuoteText',
  component: QuoteText,
  tags: ['autodocs'],
}

// Light Theme (default)
export const LightTheme = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="We live in a unique time, where people like you and me can take on the huge problems of the world – and fix them."
        author="Kristo Käärmann, co-founder"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
        imageAlt="Kristo Käärmann, Wise co-founder"
        :cta="{ label: 'Primary Button', href: '#' }"
        theme="light"
        imagePosition="left"
      />
    `,
  }),
}

// Bright Green Theme
export const BrightGreenTheme = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="We live in a unique time, where people like you and me can take on the huge problems of the world – and fix them."
        author="Kristo Käärmann, co-founder"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
        imageAlt="Kristo Käärmann, Wise co-founder"
        :cta="{ label: 'Primary Button', href: '#' }"
        theme="bright-green"
        imagePosition="left"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="We live in a unique time, where people like you and me can take on the huge problems of the world – and fix them."
        author="Kristo Käärmann, co-founder"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
        imageAlt="Kristo Käärmann, Wise co-founder"
        :cta="{ label: 'Primary Button', href: '#' }"
        theme="forest-green"
        imagePosition="left"
      />
    `,
  }),
}

// Image on Right
export const ImageOnRight = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="Building a company that changes lives starts with believing that it's possible."
        author="Taavet Hinrikus, co-founder"
        image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80"
        imageAlt="Taavet Hinrikus, Wise co-founder"
        :cta="{ label: 'Learn more', href: '#' }"
        theme="light"
        imagePosition="right"
      />
    `,
  }),
}

// Without CTA Button
export const WithoutCTA = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="Our mission is to make money move around the world as cheap, fair, and simple as possible."
        author="Kristo Käärmann, co-founder"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
        imageAlt="Kristo Käärmann, Wise co-founder"
        theme="light"
        imagePosition="left"
      />
    `,
  }),
}

// Leadership Quote - Light
export const LeadershipQuote = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="Transparency isn't just a value, it's the foundation of everything we do at Wise."
        author="Sarah Thompson, Chief Product Officer"
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
        imageAlt="Sarah Thompson, Chief Product Officer"
        :cta="{ label: 'Meet the team', href: '#' }"
        theme="light"
        imagePosition="left"
      />
    `,
  }),
}

// Vision Statement - Bright Green
export const VisionStatement = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="We're not just building a product, we're building a movement for financial fairness worldwide."
        author="David Martinez, Head of Global Expansion"
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80"
        imageAlt="David Martinez, Head of Global Expansion"
        :cta="{ label: 'Join our mission', href: '#' }"
        theme="bright-green"
        imagePosition="right"
      />
    `,
  }),
}

// Company Values - Forest Green
export const CompanyValues = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="Every person on the planet deserves access to fair and affordable financial services."
        author="Emma Chen, Chief Technology Officer"
        image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80"
        imageAlt="Emma Chen, Chief Technology Officer"
        :cta="{ label: 'Our values', href: '#' }"
        theme="forest-green"
        imagePosition="left"
      />
    `,
  }),
}

// Team Member Quote
export const TeamMemberQuote = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="Working at Wise means being part of something bigger than yourself, solving real problems for millions of people."
        author="Michael Brown, Engineering Lead"
        image="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&q=80"
        imageAlt="Michael Brown, Engineering Lead"
        :cta="{ label: 'Join the team', href: '#' }"
        theme="light"
        imagePosition="right"
      />
    `,
  }),
}

// Short Quote
export const ShortQuote = {
  render: () => ({
    components: { QuoteText },
    template: `
      <QuoteText
        quote="Money without borders. That's what we're building."
        author="Kristo Käärmann, co-founder"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
        imageAlt="Kristo Käärmann, Wise co-founder"
        :cta="{ label: 'Get started', href: '#' }"
        theme="bright-green"
        imagePosition="left"
      />
    `,
  }),
}
