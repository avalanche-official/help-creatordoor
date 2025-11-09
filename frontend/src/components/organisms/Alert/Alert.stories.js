// components/organisms/Alert.stories.js
import Alert from './Alert.vue'

export default {
  title: 'Organisms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warning', 'success', 'info'],
      description: 'Alert variant type (changes icon color)',
    },
    message: {
      control: 'text',
      description: 'Alert message text',
    },
    linkText: {
      control: 'text',
      description: 'Optional link text',
    },
    linkHref: {
      control: 'text',
      description: 'Link URL',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button',
    },
    icon: {
      control: 'text',
      description: 'Custom icon name (Lucide)',
    },
  },
}

export const Error = {
  args: {
    variant: 'error',
    message: 'E-Mail oder Passwort leider ungültig.',
    linkText: 'Passwort zurücksetzen',
    showCloseButton: true,
  },
}

export const ErrorWithoutLink = {
  args: {
    variant: 'error',
    message: 'E-Mail oder Passwort leider ungültig.',
    showCloseButton: true,
  },
}

export const ErrorWithoutCloseButton = {
  args: {
    variant: 'error',
    message: 'E-Mail oder Passwort leider ungültig.',
    linkText: 'Passwort zurücksetzen',
    showCloseButton: false,
  },
}

export const Warning = {
  args: {
    variant: 'warning',
    message: 'Dein Konto läuft in 7 Tagen ab.',
    linkText: 'Jetzt verlängern',
    showCloseButton: true,
  },
}

export const Success = {
  args: {
    variant: 'success',
    message: 'Dein Konto wurde erfolgreich erstellt!',
    showCloseButton: true,
  },
}

export const Info = {
  args: {
    variant: 'info',
    message: 'Wir haben unser Design aktualisiert.',
    linkText: 'Mehr erfahren',
    showCloseButton: true,
  },
}

export const CustomIcon = {
  args: {
    variant: 'error',
    message: 'E-Mail oder Passwort leider ungültig.',
    linkText: 'Passwort zurücksetzen',
    icon: 'help-circle',
    showCloseButton: true,
  },
}

export const LongMessage = {
  args: {
    variant: 'warning',
    message:
      'Dies ist eine sehr lange Nachricht, die möglicherweise über mehrere Zeilen geht und zeigt, wie das Alert-Komponente mit längeren Texten umgeht.',
    linkText: 'Mehr Details anzeigen',
    showCloseButton: true,
  },
}

export const AllVariants = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 max-w-md-grid">
        <div>
          <p class="text-body-3-semibold mb-2">Error (Red Icon)</p>
          <Alert
            variant="error"
            message="E-Mail oder Passwort leider ungültig."
            linkText="Passwort zurücksetzen"
          />
        </div>

        <div>
          <p class="text-body-3-semibold mb-2">Warning (Orange Icon)</p>
          <Alert
            variant="warning"
            message="Dein Konto läuft in 7 Tagen ab."
            linkText="Jetzt verlängern"
          />
        </div>

        <div>
          <p class="text-body-3-semibold mb-2">Success (Green Icon)</p>
          <Alert
            variant="success"
            message="Dein Konto wurde erfolgreich erstellt!"
          />
        </div>

        <div>
          <p class="text-body-3-semibold mb-2">Info (Blue Icon)</p>
          <Alert
            variant="info"
            message="Wir haben unser Design aktualisiert."
            linkText="Mehr erfahren"
          />
        </div>
      </div>
    `,
  }),
}

export const WithoutLinks = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 max-w-md-grid">
        <Alert
          variant="error"
          message="E-Mail oder Passwort leider ungültig."
        />

        <Alert
          variant="warning"
          message="Dein Konto läuft in 7 Tagen ab."
        />

        <Alert
          variant="success"
          message="Dein Konto wurde erfolgreich erstellt!"
        />

        <Alert
          variant="info"
          message="Wir haben unser Design aktualisiert."
        />
      </div>
    `,
  }),
}

export const WithoutCloseButtons = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 max-w-md-grid">
        <Alert
          variant="error"
          message="E-Mail oder Passwort leider ungültig."
          linkText="Passwort zurücksetzen"
          :showCloseButton="false"
        />

        <Alert
          variant="warning"
          message="Dein Konto läuft in 7 Tagen ab."
          linkText="Jetzt verlängern"
          :showCloseButton="false"
        />

        <Alert
          variant="success"
          message="Dein Konto wurde erfolgreich erstellt!"
          :showCloseButton="false"
        />
      </div>
    `,
  }),
}

export const CustomIcons = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 max-w-md-grid">
        <Alert
          variant="error"
          message="E-Mail oder Passwort leider ungültig."
          icon="help-circle"
          linkText="Hilfe anfordern"
        />

        <Alert
          variant="warning"
          message="Möchtest du wirklich fortfahren?"
          icon="alert-circle"
        />

        <Alert
          variant="info"
          message="Du hast eine neue Nachricht erhalten."
          icon="mail"
          linkText="Nachricht öffnen"
        />

        <Alert
          variant="success"
          message="Zahlung erfolgreich durchgeführt!"
          icon="credit-card"
        />
      </div>
    `,
  }),
}

export const InLoginPage = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="min-h-screen flex items-center justify-center bg-background-screen p-4">
        <div class="w-full max-w-md-grid space-y-6">

          <!-- Alert at top of login form -->
          <Alert
            variant="error"
            message="E-Mail oder Passwort leider ungültig."
            linkText="Passwort zurücksetzen"
          />

          <!-- Mock login form -->
          <div class="card space-y-4">
            <h2 class="text-heading-3 text-center mb-4">Anmelden</h2>

            <input
              type="email"
              placeholder="E-Mail"
              class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
            />

            <input
              type="password"
              placeholder="Passwort"
              class="w-full px-4 py-2.5 border border-border-neutral rounded-lg"
            />

            <button class="btn-primary w-full">
              Anmelden
            </button>
          </div>

        </div>
      </div>
    `,
  }),
}

export const Interactive = {
  render: () => ({
    components: { Alert },
    data() {
      return {
        showAlert: true,
      }
    },
    template: `
      <div class="space-y-4 max-w-md-grid">
        <button
          v-if="!showAlert"
          @click="showAlert = true"
          class="btn-primary"
        >
          Alert anzeigen
        </button>

        <Alert
          v-if="showAlert"
          variant="error"
          message="E-Mail oder Passwort leider ungültig."
          linkText="Passwort zurücksetzen"
          @close="showAlert = false"
          @linkClick="alert('Link geklickt!')"
        />
      </div>
    `,
  }),
}
