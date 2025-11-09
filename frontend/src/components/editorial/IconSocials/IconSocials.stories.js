import IconSocials from './IconSocials.vue'

export default {
  title: 'Editorial/IconSocials',
  component: IconSocials,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { IconSocials },
    template: `
      <IconSocials
        headline="Customer support"
        description="When questions come up, there's a team ready to help you."
        :options="[
          { icon: 'email', label: 'E-Mail' },
          { icon: 'chat', label: 'Live Chat' },
          { icon: 'phone', label: 'Phone' },
        ]"
        :cta="{ label: 'Get in touch', href: '/contact' }"
        theme="light"
      />
    `,
  }),
}

// Neutral Theme
export const NeutralTheme = {
  render: () => ({
    components: { IconSocials },
    template: `
      <IconSocials
        headline="We're here to help"
        description="Get support 24/7 in 14 languages. Our team is ready to answer your questions."
        :options="[
          { icon: 'email', label: 'E-Mail' },
          { icon: 'chat', label: 'Live Chat' },
          { icon: 'phone', label: 'Phone' },
        ]"
        :cta="{ label: 'Contact us', href: '/support' }"
        theme="neutral"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { IconSocials },
    template: `
      <IconSocials
        headline="Need help?"
        description="Our support team is available around the clock to assist you."
        :options="[
          { icon: 'email', label: 'E-Mail' },
          { icon: 'chat', label: 'Live Chat' },
          { icon: 'phone', label: 'Phone' },
        ]"
        :cta="{ label: 'Get support', href: '/help' }"
        theme="forest-green"
      />
    `,
  }),
}
