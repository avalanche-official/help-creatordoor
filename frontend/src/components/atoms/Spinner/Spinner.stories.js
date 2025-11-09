// components/atoms/Spinner/Spinner.stories.js
import Spinner from './Spinner.vue'

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Spinner size (based on design system)',
    },
    color: {
      control: 'color',
      description: 'Spinner color (CSS color value)',
    },
    thickness: {
      control: 'number',
      description: 'Border thickness in pixels',
    },
  },
}

// ===== BASIC SIZES =====

export const ExtraSmall = {
  args: {
    size: 'xs',
  },
}

export const Small = {
  args: {
    size: 'sm',
  },
}

export const Medium = {
  args: {
    size: 'md',
  },
}

export const Large = {
  args: {
    size: 'lg',
  },
}

export const ExtraLarge = {
  args: {
    size: 'xl',
  },
}

export const DoubleExtraLarge = {
  args: {
    size: '2xl',
  },
}

// ===== ALL SIZES SHOWCASE (WITH CORRECT SIZES FROM DESIGN SYSTEM) =====

export const AllSizes = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="space-y-6">
        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold mb-1">Extra Small (xs)</p>
            <p class="text-body-3 text-content-tertiary">24px</p>
          </div>
          <Spinner size="xs" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold mb-1">Small (sm)</p>
            <p class="text-body-3 text-content-tertiary">32px</p>
          </div>
          <Spinner size="sm" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold mb-1">Medium (md)</p>
            <p class="text-body-3 text-content-tertiary">40px - Default</p>
          </div>
          <Spinner size="md" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold mb-1">Large (lg)</p>
            <p class="text-body-3 text-content-tertiary">48px</p>
          </div>
          <Spinner size="lg" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold mb-1">Extra Large (xl)</p>
            <p class="text-body-3 text-content-tertiary">56px</p>
          </div>
          <Spinner size="xl" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold mb-1">2X Large (2xl)</p>
            <p class="text-body-3 text-content-tertiary">72px</p>
          </div>
          <Spinner size="2xl" />
        </div>
      </div>
    `,
  }),
}

// ===== COLOR VARIANTS =====

export const PrimaryColor = {
  args: {
    size: 'lg',
    color: 'var(--color-interactive-primary)',
  },
}

export const AccentColor = {
  args: {
    size: 'lg',
    color: 'var(--color-interactive-accent)',
  },
}

export const SuccessColor = {
  args: {
    size: 'lg',
    color: 'var(--color-sentiment-positive)',
  },
}

export const ErrorColor = {
  args: {
    size: 'lg',
    color: 'var(--color-sentiment-negative)',
  },
}

export const WarningColor = {
  args: {
    size: 'lg',
    color: 'var(--color-sentiment-warning)',
  },
}

export const WhiteColor = {
  args: {
    size: 'lg',
    color: 'white',
  },
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-deep-purple p-8 rounded-lg inline-block">
        <Spinner v-bind="args" />
      </div>
    `,
  }),
}

// ===== ALL COLORS SHOWCASE =====

export const AllColors = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="space-y-6">
        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold">Primary</p>
          </div>
          <Spinner size="lg" color="var(--color-interactive-primary)" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold">Accent</p>
          </div>
          <Spinner size="lg" color="var(--color-interactive-accent)" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold">Success</p>
          </div>
          <Spinner size="lg" color="var(--color-sentiment-positive)" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold">Error</p>
          </div>
          <Spinner size="lg" color="var(--color-sentiment-negative)" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold">Warning</p>
          </div>
          <Spinner size="lg" color="var(--color-sentiment-warning)" />
        </div>

        <div class="flex items-center gap-6">
          <div class="w-32">
            <p class="text-body-3-semibold">White</p>
          </div>
          <div class="bg-deep-purple p-4 rounded-lg inline-block">
            <Spinner size="lg" color="white" />
          </div>
        </div>
      </div>
    `,
  }),
}

// ===== THICKNESS VARIANTS =====

export const ThinBorder = {
  args: {
    size: 'lg',
    thickness: '2',
  },
}

export const MediumBorder = {
  args: {
    size: 'lg',
    thickness: '3',
  },
}

export const ThickBorder = {
  args: {
    size: 'lg',
    thickness: '4',
  },
}

export const ExtraThickBorder = {
  args: {
    size: 'lg',
    thickness: '6',
  },
}

export const AllThickness = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="flex items-center gap-8">
        <div class="text-center">
          <Spinner size="lg" thickness="2" />
          <p class="text-body-3 mt-2">2px</p>
        </div>
        <div class="text-center">
          <Spinner size="lg" thickness="3" />
          <p class="text-body-3 mt-2">3px (default)</p>
        </div>
        <div class="text-center">
          <Spinner size="lg" thickness="4" />
          <p class="text-body-3 mt-2">4px</p>
        </div>
        <div class="text-center">
          <Spinner size="lg" thickness="6" />
          <p class="text-body-3 mt-2">6px</p>
        </div>
      </div>
    `,
  }),
}

// ===== REAL-WORLD USE CASES =====

export const InButton = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="space-y-4">
        <button class="btn-primary" disabled>
          <span class="flex items-center justify-center gap-2">
            <Spinner size="xs" color="currentColor" thickness="2" />
            Wird geladen...
          </span>
        </button>

        <button class="btn-secondary" disabled>
          <span class="flex items-center justify-center gap-2">
            <Spinner size="xs" color="currentColor" thickness="2" />
            Wird verarbeitet...
          </span>
        </button>

        <button class="btn-primary-negative" disabled>
          <span class="flex items-center justify-center gap-2">
            <Spinner size="xs" color="currentColor" thickness="2" />
            Wird gelöscht...
          </span>
        </button>
      </div>
    `,
  }),
}

export const CenteredLoading = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="min-h-[400px] flex items-center justify-center">
        <div class="text-center space-y-4">
          <Spinner size="xl" />
          <p class="text-body-2 text-content-secondary">Wird geladen...</p>
        </div>
      </div>
    `,
  }),
}

export const InCard = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="card max-w-md">
        <div class="flex items-center gap-4">
          <Spinner size="md" />
          <div class="flex-1">
            <p class="text-body-2-semibold">Daten werden synchronisiert</p>
            <p class="text-body-3 text-content-secondary">Bitte warte einen Moment...</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const FullscreenLoading = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="fixed inset-0 bg-white flex items-center justify-center">
        <div class="text-center space-y-6">
          <Spinner size="2xl" />
          <div>
            <p class="text-heading-4 mb-2">Konto wird erstellt...</p>
            <p class="text-body-2 text-content-secondary">Wir richten alles für dich ein.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// ===== INTERACTIVE PLAYGROUND =====

export const Playground = {
  args: {
    size: 'lg',
    color: 'var(--color-interactive-primary)',
    thickness: '3',
  },
}
