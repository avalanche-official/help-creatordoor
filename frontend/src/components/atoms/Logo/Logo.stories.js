// components/atoms/Logo.stories.js
import Logo from './Logo.vue'

export default {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    href: {
      control: 'text',
    },
  },
}

export const Default = {
  args: {
    size: 'default',
    href: '/',
  },
}

export const Small = {
  args: {
    size: 'small',
    href: '/',
  },
}

export const Large = {
  args: {
    size: 'large',
    href: '/',
  },
}

export const AllSizes = {
  render: () => ({
    components: { Logo },
    template: `
      <div class="flex items-center gap-8">
        <div>
          <p class="text-body-3 mb-2">Small</p>
          <Logo size="small" />
        </div>
        <div>
          <p class="text-body-3 mb-2">Default</p>
          <Logo size="default" />
        </div>
        <div>
          <p class="text-body-3 mb-2">Large</p>
          <Logo size="large" />
        </div>
      </div>
    `,
  }),
}
