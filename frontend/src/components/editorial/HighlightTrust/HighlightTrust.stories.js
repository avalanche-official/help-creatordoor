import HighlightTrust from './HighlightTrust.vue'

export default {
  title: 'Editorial/HighlightTrust',
  component: HighlightTrust,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { HighlightTrust },
    template: `
      <HighlightTrust
        headline="Trust us to look after your money"
        description="We help over 12.8 million people move 30 billion every quarter — here's how we make sure it's safe."
        :cta="{ label: 'How we keep your money safe', href: '/security' }"
        theme="light"
        :features="[
          {
            icon: '🔒',
            title: 'Privacy and data',
            description: 'We protect your details through strict standards and 2FA.',
            link: { label: 'Learn more about 2FA', href: '/security/2fa' },
          },
          {
            icon: '🔄',
            title: 'Dedicated support',
            description: 'Questions? Get 24/7 help in 14 languages.',
          },
          {
            icon: '🏛️',
            title: 'International safeguarding',
            description: 'We're regulated by national authorities around the globe.',
            link: { label: 'Learn more about safeguarding', href: '/security/safeguarding' },
          },
        ]"
      >
        <template #image>
          <svg viewBox="0 0 300 300" class="w-full max-w-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Lock illustration -->
            <defs>
              <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4DD4D4;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#2B8C8C;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1A5555;stop-opacity:1" />
              </linearGradient>
            </defs>

            <!-- Lock body -->
            <rect x="90" y="140" width="120" height="110" rx="12" fill="url(#lockGradient)" />
            <rect x="95" y="145" width="110" height="100" rx="10" fill="#3AA8A8" />

            <!-- Lock shackle -->
            <path d="M110 140 C110 90, 190 90, 190 140" stroke="#2B8C8C" stroke-width="18" fill="none" stroke-linecap="round"/>
            <path d="M112 140 C112 95, 188 95, 188 140" stroke="#3AA8A8" stroke-width="14" fill="none" stroke-linecap="round"/>

            <!-- Keyhole -->
            <circle cx="150" cy="185" r="12" fill="#1A5555" />
            <rect x="144" y="185" width="12" height="30" rx="3" fill="#1A5555" />
          </svg>
        </template>
      </HighlightTrust>
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { HighlightTrust },
    template: `
      <HighlightTrust
        headline="Your money is protected"
        description="We're authorized and regulated by financial authorities worldwide. Your money is held in segregated accounts with top-tier banks."
        :cta="{ label: 'Learn about security', href: '/security' }"
        theme="forest-green"
        :features="[
          {
            icon: '🛡️',
            title: 'Bank-level security',
            description: 'We use 256-bit encryption to protect your data.',
            link: { label: 'Security features', href: '/security/features' },
          },
          {
            icon: '✓',
            title: 'Regulated globally',
            description: 'Licensed by financial authorities in every market we operate.',
          },
          {
            icon: '🔐',
            title: 'Two-factor authentication',
            description: 'Add an extra layer of security to your account.',
            link: { label: 'Enable 2FA', href: '/security/2fa' },
          },
        ]"
      >
        <template #image>
          <svg viewBox="0 0 300 300" class="w-full max-w-md" fill="none">
            <defs>
              <radialGradient id="shieldGrad">
                <stop offset="0%" style="stop-color:#9CDB7C" />
                <stop offset="100%" style="stop-color:#7CB342" />
              </radialGradient>
            </defs>
            <path d="M150 50 L200 80 L200 150 Q200 200, 150 230 Q100 200, 100 150 L100 80 Z" fill="url(#shieldGrad)" />
            <path d="M150 55 L195 82 L195 150 Q195 195, 150 222 Q105 195, 105 150 L105 82 Z" fill="#B5E89A" />
            <path d="M130 150 L145 165 L175 120" stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </svg>
        </template>
      </HighlightTrust>
    `,
  }),
}
