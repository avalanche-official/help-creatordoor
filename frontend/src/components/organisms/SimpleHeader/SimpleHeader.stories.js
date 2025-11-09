// components/organisms/SimpleHeader.stories.js
import SimpleHeader from './SimpleHeader.vue'

export default {
  title: 'Organisms/SimpleHeader',
  component: SimpleHeader,
  tags: ['autodocs'],
  argTypes: {
    showCloseButton: {
      control: 'boolean',
      description: 'Show or hide the close button',
    },
    logoSize: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Logo size variant',
    },
    closeIcon: {
      control: 'text',
      description: 'Lucide icon name for close button',
    },
  },
}

export const Default = {
  args: {
    showCloseButton: true,
    logoSize: 'default',
    closeIcon: 'x',
  },
}

export const WithoutCloseButton = {
  args: {
    showCloseButton: false,
    logoSize: 'default',
  },
}

export const SmallLogo = {
  args: {
    showCloseButton: true,
    logoSize: 'small',
    closeIcon: 'x',
  },
}

export const LargeLogo = {
  args: {
    showCloseButton: true,
    logoSize: 'large',
    closeIcon: 'x',
  },
}

export const WithBackArrow = {
  args: {
    showCloseButton: true,
    logoSize: 'default',
    closeIcon: 'arrow-left',
  },
}

export const WithChevronLeft = {
  args: {
    showCloseButton: true,
    logoSize: 'default',
    closeIcon: 'chevron-left',
  },
}

export const InContext = {
  render: () => ({
    components: { SimpleHeader },
    template: `
      <div class="min-h-screen bg-background-screen">
        <SimpleHeader @close="handleClose" />
        <div class="grid-container py-12">
          <h1 class="text-heading-1 mb-4">Login Page</h1>
          <p class="text-body-2 text-content-secondary">
            This is how the SimpleHeader looks in a real page context.
          </p>
        </div>
      </div>
    `,
    methods: {
      handleClose() {
        console.log('Close button clicked')
      },
    },
  }),
}

export const LoginPageExample = {
  render: () => ({
    components: { SimpleHeader },
    template: `
      <div class="min-h-screen bg-background-screen flex flex-col">
        <SimpleHeader @close="handleClose" />

        <main class="flex-1 flex items-center justify-center px-4">
          <div class="card max-w-md w-full">
            <h2 class="text-heading-2 text-center mb-2">Willkommen zurück</h2>

            <div class="flex items-center justify-center gap-2 mb-8">
              <span class="text-body-3 text-content-secondary">Neu bei CreatorHub?</span>
              <a href="/register" class="btn-link btn-small">Jetzt Registrieren</a>
            </div>

            <form class="space-y-6">
              <div>
                <label class="text-body-3-semibold text-content-primary mb-2 block">E-Mail*</label>
                <input
                  type="email"
                  class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
                  placeholder="deine@email.com"
                />
              </div>

              <div>
                <label class="text-body-3-semibold text-content-primary mb-2 block">Passwort*</label>
                <input
                  type="password"
                  class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
                />
              </div>

              <div class="text-right">
                <a href="/forgot-password" class="btn-link btn-small">Passwort vergessen?</a>
              </div>

              <button type="submit" class="btn-primary w-full">Anmelden</button>
            </form>
          </div>
        </main>
      </div>
    `,
    methods: {
      handleClose() {
        console.log('Navigate to home')
      },
    },
  }),
}

export const RegisterPageExample = {
  render: () => ({
    components: { SimpleHeader },
    template: `
      <div class="min-h-screen bg-background-screen flex flex-col">
        <SimpleHeader closeIcon="arrow-left" @close="handleClose" />

        <main class="flex-1 flex items-center justify-center px-4">
          <div class="card max-w-md w-full">
            <h2 class="text-heading-2 text-center mb-2">Konto erstellen</h2>

            <div class="flex items-center justify-center gap-2 mb-8">
              <span class="text-body-3 text-content-secondary">Bereits registriert?</span>
              <a href="/login" class="btn-link btn-small">Jetzt anmelden</a>
            </div>

            <form class="space-y-6">
              <div>
                <label class="text-body-3-semibold text-content-primary mb-2 block">Name*</label>
                <input
                  type="text"
                  class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
                  placeholder="Max Mustermann"
                />
              </div>

              <div>
                <label class="text-body-3-semibold text-content-primary mb-2 block">E-Mail*</label>
                <input
                  type="email"
                  class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
                  placeholder="deine@email.com"
                />
              </div>

              <div>
                <label class="text-body-3-semibold text-content-primary mb-2 block">Passwort*</label>
                <input
                  type="password"
                  class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
                />
                <p class="text-body-3 text-content-tertiary mt-1">
                  Mindestens 8 Zeichen
                </p>
              </div>

              <button type="submit" class="btn-primary w-full">Kostenlos registrieren</button>
            </form>
          </div>
        </main>
      </div>
    `,
    methods: {
      handleClose() {
        console.log('Go back to previous page')
      },
    },
  }),
}
