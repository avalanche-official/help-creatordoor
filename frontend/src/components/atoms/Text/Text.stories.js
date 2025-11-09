// components/atoms/Text.stories.js
import Text from './Text.vue'

export default {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-hero',
        'display-1',
        'display-2',
        'display-3',
        'display-4',
        'heading-hero',
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'body-1',
        'body-1-semibold',
        'body-2',
        'body-2-semibold',
        'body-3',
        'body-3-semibold',
        'link-1',
        'link-2',
        'link-3',
      ],
      description: 'Typography variant from design system',
    },
    weight: {
      control: 'select',
      options: [null, 'normal', 'medium', 'semibold', 'bold', 'black'],
      description: 'Font weight override',
    },
    color: {
      control: 'select',
      options: [
        null,
        'content-primary',
        'content-secondary',
        'content-tertiary',
        'content-link',
        'interactive-primary',
        'interactive-accent',
        'sentiment-negative',
        'sentiment-positive',
        'sentiment-warning',
        'bright-purple',
        'deep-purple',
      ],
      description: 'Color from design system (CSS variable name)',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
      description: 'HTML element to render',
    },
  },
}

// Default story
export const Default = {
  args: {
    variant: 'body-2',
    as: 'span',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">The quick brown fox jumps over the lazy dog</Text>',
  }),
}

// Display variants
export const DisplayHero = {
  args: {
    variant: 'display-hero',
    as: 'h1',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">SEND MONEY ABROAD</Text>',
  }),
}

export const Display1 = {
  args: {
    variant: 'display-1',
    as: 'h1',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">BIG HEADLINE TEXT</Text>',
  }),
}

export const Display2 = {
  args: {
    variant: 'display-2',
    as: 'h2',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">MEDIUM DISPLAY</Text>',
  }),
}

// Heading variants
export const HeadingHero = {
  args: {
    variant: 'heading-hero',
    as: 'h1',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Hero Heading Text</Text>',
  }),
}

export const Heading1 = {
  args: {
    variant: 'heading-1',
    as: 'h1',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Large Heading</Text>',
  }),
}

export const Heading2 = {
  args: {
    variant: 'heading-2',
    as: 'h2',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Medium Heading</Text>',
  }),
}

export const Heading3 = {
  args: {
    variant: 'heading-3',
    as: 'h3',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Small Heading</Text>',
  }),
}

// Body variants
export const Body1 = {
  args: {
    variant: 'body-1',
    as: 'p',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template:
      '<Text v-bind="args">This is body 1 text. It\'s larger and used for important paragraphs.</Text>',
  }),
}

export const Body2 = {
  args: {
    variant: 'body-2',
    as: 'p',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template:
      '<Text v-bind="args">This is body 2 text. It\'s the default body text size for most content.</Text>',
  }),
}

export const Body3 = {
  args: {
    variant: 'body-3',
    as: 'p',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template:
      '<Text v-bind="args">This is body 3 text. It\'s smaller and used for captions or helper text.</Text>',
  }),
}

// Semibold variants
export const Body1Semibold = {
  args: {
    variant: 'body-1-semibold',
    as: 'p',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">This is semibold body 1 text for emphasis.</Text>',
  }),
}

export const Body2Semibold = {
  args: {
    variant: 'body-2-semibold',
    as: 'p',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">This is semibold body 2 text for emphasis.</Text>',
  }),
}

// Link variants
export const Link1 = {
  args: {
    variant: 'link-1',
    as: 'a',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Large Link Text</Text>',
  }),
}

export const Link2 = {
  args: {
    variant: 'link-2',
    as: 'a',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Medium Link Text</Text>',
  }),
}

export const Link3 = {
  args: {
    variant: 'link-3',
    as: 'a',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Small Link Text</Text>',
  }),
}

// Color examples
export const WithColors = {
  render: () => ({
    components: { Text },
    template: `
      <div class="space-y-4">
        <Text variant="body-2" color="content-primary">Primary content color</Text>
        <Text variant="body-2" color="content-secondary">Secondary content color</Text>
        <Text variant="body-2" color="content-tertiary">Tertiary content color</Text>
        <Text variant="body-2" color="interactive-primary">Interactive primary color</Text>
        <Text variant="body-2" color="interactive-accent">Interactive accent color</Text>
        <Text variant="body-2" color="sentiment-negative">Negative sentiment (error)</Text>
        <Text variant="body-2" color="sentiment-positive">Positive sentiment</Text>
        <Text variant="body-2" color="sentiment-warning">Warning sentiment</Text>
        <Text variant="body-2" color="bright-purple">Bright purple</Text>
        <Text variant="body-2" color="deep-purple">Deep purple</Text>
      </div>
    `,
  }),
}

// Weight override examples
export const WithWeights = {
  render: () => ({
    components: { Text },
    template: `
      <div class="space-y-4">
        <Text variant="body-2" weight="normal">Normal weight text</Text>
        <Text variant="body-2" weight="medium">Medium weight text</Text>
        <Text variant="body-2" weight="semibold">Semibold weight text</Text>
        <Text variant="body-2" weight="bold">Bold weight text</Text>
        <Text variant="body-2" weight="black">Black weight text</Text>
      </div>
    `,
  }),
}

// All display variants showcase
export const AllDisplayVariants = {
  render: () => ({
    components: { Text },
    template: `
      <div class="space-y-8">
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">display-hero</Text>
          <Text variant="display-hero" as="h1">DISPLAY HERO</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">display-1</Text>
          <Text variant="display-1" as="h1">DISPLAY 1</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">display-2</Text>
          <Text variant="display-2" as="h2">DISPLAY 2</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">display-3</Text>
          <Text variant="display-3" as="h3">DISPLAY 3</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">display-4</Text>
          <Text variant="display-4" as="h4">Display 4</Text>
        </div>
      </div>
    `,
  }),
}

// All heading variants showcase
export const AllHeadingVariants = {
  render: () => ({
    components: { Text },
    template: `
      <div class="space-y-6">
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">heading-hero</Text>
          <Text variant="heading-hero" as="h1">Heading Hero</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">heading-1</Text>
          <Text variant="heading-1" as="h1">Heading 1</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">heading-2</Text>
          <Text variant="heading-2" as="h2">Heading 2</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">heading-3</Text>
          <Text variant="heading-3" as="h3">Heading 3</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">heading-4</Text>
          <Text variant="heading-4" as="h4">Heading 4</Text>
        </div>
        <div>
          <Text variant="body-3" color="content-tertiary" as="p" class="mb-2">heading-5</Text>
          <Text variant="heading-5" as="h5">Heading 5</Text>
        </div>
      </div>
    `,
  }),
}

// Real-world example: Card
export const RealWorldCard = {
  render: () => ({
    components: { Text },
    template: `
      <div class="card max-w-4xl">
        <Text variant="heading-3" as="h3" class="mb-4">Premium Plan</Text>
        <Text variant="display-3" color="interactive-primary" class="mb-4">$29</Text>
        <Text variant="body-2" color="content-secondary" class="mb-6">
          Perfect for individuals and small teams who need advanced features.
        </Text>
        <ul class="space-y-2">
          <li><Text variant="body-3">✓ Unlimited transfers</Text></li>
          <li><Text variant="body-3">✓ Priority support</Text></li>
          <li><Text variant="body-3">✓ Advanced analytics</Text></li>
        </ul>
      </div>
    `,
  }),
}

// Real-world example: Form
export const RealWorldForm = {
  render: () => ({
    components: { Text },
    template: `
      <div class="max-w-4xl space-y-6">
        <div>
          <Text variant="body-3-semibold" as="label" color="content-primary" class="mb-2 block">
            Email Address
          </Text>
          <input type="email" class="w-full px-4 py-2 border rounded-lg" placeholder="you@example.com" />
          <Text variant="body-3" color="content-tertiary" class="mt-1 block">
            We'll never share your email with anyone else.
          </Text>
        </div>

        <div>
          <Text variant="body-3-semibold" as="label" color="content-primary" class="mb-2 block">
            Password
          </Text>
          <input type="password" class="w-full px-4 py-2 border rounded-lg" />
          <Text variant="body-3" color="sentiment-negative" class="mt-1 block">
            Password must be at least 8 characters
          </Text>
        </div>

        <button class="btn-primary w-full">
          <Text variant="body-2-semibold">Sign Up</Text>
        </button>
      </div>
    `,
  }),
}
