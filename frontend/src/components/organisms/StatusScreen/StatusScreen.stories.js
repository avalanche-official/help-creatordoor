// components/organisms/StatusScreen/StatusScreen.stories.js
import { ref } from 'vue'
import StatusScreen from './StatusScreen.vue'
import Button from '@/components/atoms/Button/Button.vue'
import checkRose from '@/assets/images/check-rose.png'

export default {
  title: 'Organisms/StatusScreen',
  component: StatusScreen,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'error', 'warning', 'loading'],
      description: 'Visual variant of the status screen',
    },
    background: {
      control: 'select',
      options: ['default', 'celebration'],
      description: 'Background style - default (white) or celebration (colored)',
    },
    mediaType: {
      control: 'select',
      options: ['icon', 'image', 'spinner', 'none'],
      description: 'Type of media to display',
    },
    icon: {
      control: 'text',
      description: 'Icon name (auto-selects based on variant if not provided)',
    },
    titleVariant: {
      control: 'select',
      options: [
        'display-1',
        'display-2',
        'display-3',
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
      ],
      description: 'Typography variant for title (bold display fonts or headings)',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    description: {
      control: 'text',
      description: 'Subtext below title',
    },
    showAlert: {
      control: 'boolean',
      description: 'Show alert component',
    },
    alertMessage: {
      control: 'text',
      description: 'Alert message text',
    },
    primaryButtonText: {
      control: 'text',
      description: 'Primary button text',
    },
    primaryButtonLoading: {
      control: 'boolean',
      description: 'Show loading spinner on primary button',
    },
    primaryButtonDisabled: {
      control: 'boolean',
      description: 'Disable primary button',
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Secondary button text (optional)',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

// ===== EXAMPLE 1: BOLD DISPLAY TITLE + NORMAL SUBTEXT =====

export const BoldTitleWithSubtext = {
  name: '1️⃣ Bold Display Title + Subtext + Button',
  render: () => ({
    components: { StatusScreen },
    template: `
      <StatusScreen
        variant="success"
        background="celebration"
        primaryButtonVariant="secondary"
        media-type="image"
        :imageSrc="checkRose"
:imageSize="200"
        title="E-MAIL BESTÄTIGT!"
        title-variant="display-small"
        description="Deine E-Mail-Adresse wurde erfolgreich bestätigt. Lass uns jetzt dein Konto einrichten."
        primary-button-text="Weiter zur Einrichtung"
      />
    `,
  }),
}

// ===== EXAMPLE 2: WITH ALERT COMPONENT =====

export const WithAlertComponent = {
  name: '2️⃣ Title + Alert Component + Buttons',
  render: () => ({
    components: { StatusScreen },
    template: `
      <StatusScreen
        variant="error"
        media-type="icon"
        icon="alert-circle"
        title="Bestätigung fehlgeschlagen"
        title-variant="heading-3"
        description="Der Bestätigungslink ist ungültig oder abgelaufen."
        :show-alert="true"
        alert-variant="error"
        alert-message="Bitte fordere einen neuen Bestätigungslink an, um fortzufahren."
        alert-link-text="Mehr erfahren"
        alert-link-href="/help"
        primary-button-text="Neuen Link anfordern"
        secondary-button-text="Zurück zur Registrierung"
      />
    `,
  }),
}

// ===== EXAMPLE 3: BUTTON WITH LOADING SPINNER =====

export const ButtonWithLoadingSpinner = {
  name: '3️⃣ Button with Loading Spinner (Interactive)',
  render: () => ({
    components: { StatusScreen },
    setup() {
      const isResending = ref(false)

      const resendEmail = () => {
        isResending.value = true
        setTimeout(() => {
          isResending.value = false
          alert('E-Mail wurde erneut gesendet!')
        }, 2000)
      }

      return { isResending, resendEmail }
    },
    template: `
      <StatusScreen
        variant="info"
        media-type="icon"
        icon="mail"
        title="Überprüfe deine E-Mails"
        title-variant="heading-3"
        description="Wir haben einen Bestätigungslink an deine@email.com gesendet. Klicke auf den Link, um deine E-Mail-Adresse zu bestätigen."
        primary-button-text="E-Mail erneut senden"
        :primary-button-loading="isResending"
        secondary-button-text="Zurück"
        @primary-action="resendEmail"
      />
    `,
  }),
}

// ===== EXAMPLE 4: LOADING STATE WITH SPINNER =====

export const LoadingState = {
  name: '4️⃣ Loading State (Spinner Media)',
  render: () => ({
    components: { StatusScreen },
    template: `
      <StatusScreen
        variant="loading"
        media-type="spinner"
        title="Konto wird erstellt..."
        title-variant="heading-3"
        description="Wir richten alles für dich ein. Bitte warte einen Moment."
      />
    `,
  }),
}

// ===== EXAMPLE 5: DISABLED BUTTON =====

export const DisabledButton = {
  name: '5️⃣ Disabled Button (No Spinner)',
  render: () => ({
    components: { StatusScreen },
    template: `
      <StatusScreen
        variant="info"
        media-type="icon"
        icon="clock"
        title="Warte auf Genehmigung"
        title-variant="heading-3"
        description="Deine Anfrage wird derzeit überprüft. Wir benachrichtigen dich per E-Mail, sobald sie genehmigt wurde."
        primary-button-text="Verstanden"
        :primary-button-disabled="true"
      />
    `,
  }),
}

// ===== BONUS: ALL FEATURES COMBINED =====

export const AllFeaturesCombined = {
  name: '🎯 All Features Combined',
  render: () => ({
    components: { StatusScreen, Button },
    setup() {
      const isLoading = ref(false)

      const handleAction = () => {
        isLoading.value = true
        setTimeout(() => {
          isLoading.value = false
          alert('Aktion abgeschlossen!')
        }, 2000)
      }

      return { isLoading, handleAction }
    },
    template: `
      <StatusScreen
        variant="success"
        background="celebration"
        media-type="icon"
        icon="check-circle"
        title="WILLKOMMEN BEI CREATORHUB!"
        title-variant="display-2"
        description="Dein Konto wurde erfolgreich erstellt."
        :show-alert="true"
        alert-variant="info"
        alert-message="Vervollständige dein Profil, um alle Features zu nutzen."
        alert-link-text="Jetzt vervollständigen"
        alert-link-href="/profile/setup"
        primary-button-text="Zum Dashboard"
        :primary-button-loading="isLoading"
        secondary-button-text="Später"
        @primary-action="handleAction"
      >
        <!-- Custom actions slot -->
        <template #actions>
          <div class="pt-4">
            <Button variant="link" size="small" fontSize="body-3">
              Hilfe anzeigen
            </Button>
          </div>
        </template>
      </StatusScreen>
    `,
  }),
}

// ===== REAL-WORLD EXAMPLES =====

export const EmailVerificationFlow = {
  name: '🎬 Real: Email Verification',
  render: () => ({
    components: { StatusScreen, Button },
    template: `
      <StatusScreen
        variant="info"
        media-type="icon"
        icon="mail"
        title="Überprüfe deine E-Mails"
        title-variant="heading-3"
        description="Folge dem Link in der E-Mail, die wir an david.vrhovac@hotmail.com gesendet haben – es kann bis zu 1 Minute dauern, bis die E-Mail eingetroffen ist."
      >
        <template #actions>
          <div class="space-y-4">
            <Button variant="secondary" class="w-full">
              E-Mail erneut senden
            </Button>
            <Button variant="link" size="small" fontSize="body-3">
              Zurück zur Registrierung
            </Button>
          </div>
        </template>
      </StatusScreen>
    `,
  }),
}

export const PaymentSuccess = {
  name: '🎬 Real: Payment Success',
  render: () => ({
    components: { StatusScreen },
    template: `
      <StatusScreen
        variant="success"
        background="celebration"
        media-type="icon"
        icon="check-circle"
        title="ZAHLUNG ERFOLGREICH!"
        title-variant="display-2"
        description="Deine Zahlung von €149.99 wurde erfolgreich verarbeitet. Eine Bestätigung wurde an deine E-Mail gesendet."
        primary-button-text="Zum Dashboard"
        secondary-button-text="Beleg herunterladen"
      />
    `,
  }),
}

export const ErrorWithRecovery = {
  name: '🎬 Real: Error with Recovery',
  render: () => ({
    components: { StatusScreen },
    template: `
      <StatusScreen
        variant="error"
        media-type="icon"
        icon="alert-circle"
        title="Verbindung fehlgeschlagen"
        title-variant="heading-3"
        description="Wir konnten keine Verbindung zum Server herstellen. Bitte überprüfe deine Internetverbindung und versuche es erneut."
        :show-alert="true"
        alert-variant="error"
        alert-message="Wenn das Problem weiterhin besteht, kontaktiere unseren Support."
        alert-link-text="Support kontaktieren"
        alert-link-href="/support"
        primary-button-text="Erneut versuchen"
        secondary-button-text="Zurück"
      />
    `,
  }),
}

// ===== INTERACTIVE PLAYGROUND =====

export const Playground = {
  args: {
    variant: 'success',
    background: 'celebration',
    mediaType: 'icon',
    icon: 'check-circle',
    title: 'Erfolgreich abgeschlossen!',
    titleVariant: 'heading-3',
    description: 'Deine Aktion wurde erfolgreich durchgeführt.',
    showAlert: false,
    alertVariant: 'info',
    alertMessage: '',
    alertLinkText: '',
    alertLinkHref: '#',
    primaryButtonText: 'Weiter',
    primaryButtonLoading: false,
    primaryButtonDisabled: false,
    secondaryButtonText: 'Zurück',
  },
}
