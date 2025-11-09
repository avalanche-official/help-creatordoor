// components/molecules/ButtonWithTimer/ButtonWithTimer.stories.js
import ButtonWithTimer from './ButtonWithTimer.vue'

export default {
  title: 'Molecules/ButtonWithTimer',
  component: ButtonWithTimer,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Button variant',
    },
    initialText: {
      control: 'text',
      description: 'Button text when ready',
    },
    timerText: {
      control: 'text',
      description: 'Button text during countdown (use {seconds} placeholder)',
    },
    countdownSeconds: {
      control: 'number',
      description: 'Countdown duration in seconds',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    autoStart: {
      control: 'boolean',
      description: 'Start countdown automatically on mount',
    },
  },
}

// ===== BASIC EXAMPLE =====

export const Default = {
  args: {
    initialText: 'E-Mail erneut senden',
    timerText: 'Erneut senden in {seconds}s',
    countdownSeconds: 60,
  },
}

// ===== SHORT COUNTDOWN =====

export const ShortCountdown = {
  args: {
    initialText: 'E-Mail erneut senden',
    timerText: 'Warte {seconds}s...',
    countdownSeconds: 10,
  },
}

// ===== AUTO START =====

export const AutoStart = {
  args: {
    initialText: 'E-Mail erneut senden',
    timerText: 'Erneut senden in {seconds}s',
    countdownSeconds: 30,
    autoStart: true,
  },
}

// ===== WITH DIFFERENT VARIANTS =====

export const AllVariants = {
  render: () => ({
    components: { ButtonWithTimer },
    template: `
      <div class="space-y-4 max-w-md">
        <ButtonWithTimer
          variant="primary"
          initial-text="Primary Button"
          timer-text="Warte {seconds}s"
          :countdown-seconds="60"
        />

        <ButtonWithTimer
          variant="secondary"
          initial-text="Secondary Button"
          timer-text="Warte {seconds}s"
          :countdown-seconds="60"
        />

        <ButtonWithTimer
          variant="outline"
          initial-text="Outline Button"
          timer-text="Warte {seconds}s"
          :countdown-seconds="60"
        />
      </div>
    `,
  }),
}

// ===== INTERACTIVE DEMO =====

export const InteractiveDemo = {
  render: () => ({
    components: { ButtonWithTimer },
    setup() {
      const handleClick = () => {
        console.log('Button clicked!')
      }

      const handleCountdownComplete = () => {
        console.log('Countdown complete!')
        alert('Du kannst jetzt erneut senden!')
      }

      return { handleClick, handleCountdownComplete }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div class="card">
          <p class="text-body-2 text-content-secondary mb-4">
            Klicke auf den Button, um den Countdown zu starten.
            Nach 10 Sekunden kannst du erneut klicken.
          </p>

          <ButtonWithTimer
            initial-text="E-Mail erneut senden"
            timer-text="Erneut senden in {seconds}s"
            :countdown-seconds="10"
            @click="handleClick"
            @countdown-complete="handleCountdownComplete"
          />
        </div>
      </div>
    `,
  }),
}
