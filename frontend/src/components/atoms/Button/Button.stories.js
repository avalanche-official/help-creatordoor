// components/atoms/Button.stories.js
import Button from './Button.vue'

export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary-reversed',
        'primary-negative',
        'secondary',
        'secondary-negative',
        'secondary-neutral',
        'tertiary',
        'tertiary-negative',
        'outline',
        'link',
        'link-white',
      ],
      description: 'Button style variant from design system',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type (only for buttons, not links)',
    },
    href: {
      control: 'text',
      description: 'URL for link buttons (renders as <a> tag)',
    },
    target: {
      control: 'select',
      options: [null, '_blank', '_self', '_parent', '_top'],
      description: 'Link target attribute',
    },
  },
}

// ===== BASIC VARIANTS =====

export const Primary = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Jetzt Registrieren</Button>',
  }),
}

export const PrimaryReversed = {
  args: {
    variant: 'primary-reversed',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Jetzt Registrieren</Button>',
  }),
}

export const PrimaryNegative = {
  args: {
    variant: 'primary-negative',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Löschen</Button>',
  }),
}

export const Secondary = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Mehr erfahren</Button>',
  }),
}

export const SecondaryNegative = {
  args: {
    variant: 'secondary-negative',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Abbrechen</Button>',
  }),
}

export const SecondaryNeutral = {
  args: {
    variant: 'secondary-neutral',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Neutral Action</Button>',
  }),
}

export const Tertiary = {
  args: {
    variant: 'tertiary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Abbrechen</Button>',
  }),
}

export const TertiaryNegative = {
  args: {
    variant: 'tertiary-negative',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Entfernen</Button>',
  }),
}

export const Outline = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Outlined Button</Button>',
  }),
}

export const Link = {
  args: {
    variant: 'link',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Jetzt Registrieren</Button>',
  }),
}

export const LinkWhite = {
  args: {
    variant: 'link-white',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-deep-purple p-8 rounded-lg">
        <Button v-bind="args">White Link</Button>
      </div>
    `,
  }),
}

// ===== STATES =====

export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
}

export const DisabledStates = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div class="flex gap-4 flex-wrap">
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="tertiary" disabled>Tertiary Disabled</Button>
        </div>
        <div class="flex gap-4 flex-wrap">
          <Button variant="outline" disabled>Outline Disabled</Button>
          <Button variant="link" disabled>Link Disabled</Button>
        </div>
      </div>
    `,
  }),
}

// ===== SIZES =====

export const Sizes = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-body-3 mb-2">Small (32px height)</p>
          <div class="flex items-center gap-4">
            <Button variant="primary" size="small">Primary Small</Button>
            <Button variant="secondary" size="small">Secondary Small</Button>
            <Button variant="tertiary" size="small">Tertiary Small</Button>
          </div>
        </div>

        <div>
          <p class="text-body-3 mb-2">Medium (40px height)</p>
          <div class="flex items-center gap-4">
            <Button variant="primary" size="medium">Primary Medium</Button>
            <Button variant="secondary" size="medium">Secondary Medium</Button>
            <Button variant="tertiary" size="medium">Tertiary Medium</Button>
          </div>
        </div>

        <div>
          <p class="text-body-3 mb-2">Large (48px height - Default)</p>
          <div class="flex items-center gap-4">
            <Button variant="primary" size="large">Primary Large</Button>
            <Button variant="secondary" size="large">Secondary Large</Button>
            <Button variant="tertiary" size="large">Tertiary Large</Button>
          </div>
        </div>
      </div>
    `,
  }),
}

// ===== AS LINK (ANCHOR TAG) =====

export const AsLink = {
  args: {
    variant: 'primary',
    href: '/register',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Jetzt Registrieren (Link)</Button>',
  }),
}

export const AsExternalLink = {
  args: {
    variant: 'secondary',
    href: 'https://wise.com',
    target: '_blank',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Externe Website →</Button>',
  }),
}

// ===== ALL VARIANTS SHOWCASE =====

export const AllVariants = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-body-3-semibold mb-3">Primary Variants</p>
          <div class="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="primary-reversed">Primary Reversed</Button>
            <Button variant="primary-negative">Primary Negative</Button>
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Secondary Variants</p>
          <div class="flex gap-4 flex-wrap">
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary-negative">Secondary Negative</Button>
            <Button variant="secondary-neutral">Secondary Neutral</Button>
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Tertiary & Outline</p>
          <div class="flex gap-4 flex-wrap">
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="tertiary-negative">Tertiary Negative</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Link Variants</p>
          <div class="flex gap-4 flex-wrap items-center">
            <Button variant="link">Link Button</Button>
            <div class="bg-deep-purple px-6 py-4 rounded-lg">
              <Button variant="link-white">Link White</Button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ===== REAL-WORLD EXAMPLES =====

export const SignupPrompt = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <span class="text-body-3 text-content-secondary">Neu bei Creatorhub?</span>
        <Button variant="link" size="medium">Jetzt Registrieren</Button>
      </div>
    `,
  }),
}

export const CTASection = {
  render: () => ({
    components: { Button },
    template: `
      <div class="bg-background-neutral p-8 rounded-lg text-center">
        <h2 class="text-heading-2 mb-4">Bereit loszulegen?</h2>
        <p class="text-body-2 text-content-secondary mb-6">
          Erstelle dein kostenloses Konto in weniger als 2 Minuten.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <Button variant="primary" size="large">Jetzt starten</Button>
          <Button variant="secondary" size="large">Mehr erfahren</Button>
        </div>
      </div>
    `,
  }),
}

export const FormActions = {
  render: () => ({
    components: { Button },
    template: `
      <div class="max-w-4xl">
        <div class="card">
          <h3 class="text-heading-3 mb-6">Account löschen</h3>
          <p class="text-body-2 text-content-secondary mb-6">
            Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Daten werden permanent gelöscht.
          </p>
          <div class="flex gap-3 justify-end">
            <Button variant="tertiary" size="medium">Abbrechen</Button>
            <Button variant="primary-negative" size="medium">Löschen</Button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ButtonGroup = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-body-3-semibold mb-3">Horizontal Button Group</p>
          <div class="flex gap-3">
            <Button variant="secondary" size="medium">Zurück</Button>
            <Button variant="secondary" size="medium">Speichern</Button>
            <Button variant="primary" size="medium">Weiter</Button>
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Vertical Button Group (Mobile)</p>
          <div class="flex flex-col gap-3 max-w-4xl">
            <Button variant="primary">Hauptaktion</Button>
            <Button variant="secondary">Sekundäre Aktion</Button>
            <Button variant="tertiary">Abbrechen</Button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const LoadingState = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4">
        <Button variant="primary" disabled>
          <span class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Laden...
          </span>
        </Button>
        <Button variant="secondary" disabled>
          <span class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Wird verarbeitet
          </span>
        </Button>
      </div>
    `,
  }),
}
