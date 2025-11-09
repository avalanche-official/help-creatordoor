import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'
import CardContent from './CardContent.vue'

export default {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
}

// Simple Card
export const Simple = {
  render: () => ({
    components: { Card },
    template: `
      <Card>
        <p class="text-content-primary">This is a simple card with default styling.</p>
      </Card>
    `,
  }),
}

// Card with Header
export const WithHeader = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardContent },
    template: `
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          This is a card with a header and structured content using Wise Neptune design tokens.
        </CardContent>
      </Card>
    `,
  }),
}

// Card with Hover Effect
export const Hoverable = {
  render: () => ({
    components: { Card, CardTitle, CardContent },
    template: `
      <Card hover>
        <CardTitle>Hover Me!</CardTitle>
        <CardContent>
          This card has a hover effect that adds shadow.
        </CardContent>
      </Card>
    `,
  }),
}

// Different Padding Sizes
export const PaddingSizes = {
  render: () => ({
    components: { Card, CardTitle },
    template: `
      <div class="flex flex-col gap-4">
        <Card padding="sm">
          <CardTitle>Small Padding</CardTitle>
        </Card>
        <Card padding="md">
          <CardTitle>Medium Padding (Default)</CardTitle>
        </Card>
        <Card padding="lg">
          <CardTitle>Large Padding</CardTitle>
        </Card>
      </div>
    `,
  }),
}

// Full Example - Profile Card (FIXED VERSION)
export const ProfileCard = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardContent },
    template: `
      <div class="w-96">
        <Card hover>
          <CardHeader>
            <div class="flex items-start gap-4">
              <div class="w-16 h-16 bg-content-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                JD
              </div>
              <div class="flex-1 min-w-0">
                <CardTitle>John Doe</CardTitle>
                <p class="text-sm text-content-secondary mt-1">Product Designer</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p class="mb-4 leading-relaxed">
              Passionate about creating beautiful and functional user interfaces.
              Based in San Francisco.
            </p>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="inline-flex items-center text-sm text-content-positive">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Verified
              </span>
              <span class="text-content-tertiary">•</span>
              <span class="text-sm text-content-secondary">Joined 2023</span>
            </div>
          </CardContent>
        </Card>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
}

// Stats Card Example
export const StatsCard = {
  render: () => ({
    components: { Card, CardTitle },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <Card hover>
          <p class="text-sm text-content-secondary mb-2">Total Balance</p>
          <p class="text-2xl font-bold text-content-primary">$12,450</p>
          <p class="text-xs text-content-positive mt-1">↑ 12.5%</p>
        </Card>
        <Card hover>
          <p class="text-sm text-content-secondary mb-2">Pending</p>
          <p class="text-2xl font-bold text-content-primary">$340</p>
          <p class="text-xs text-content-warning mt-1">↔ 0%</p>
        </Card>
        <Card hover>
          <p class="text-sm text-content-secondary mb-2">This Month</p>
          <p class="text-2xl font-bold text-content-primary">$5,230</p>
          <p class="text-xs text-content-negative mt-1">↓ 3.2%</p>
        </Card>
      </div>
    `,
  }),
}
