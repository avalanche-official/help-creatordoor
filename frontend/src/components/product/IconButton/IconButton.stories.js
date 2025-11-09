import IconButton from './IconButton.vue'

export default {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
}

// All Sizes
export const Sizes = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex items-end gap-4">
        <IconButton icon="→" :size="16" aria-label="16px" />
        <IconButton icon="→" :size="24" aria-label="24px" />
        <IconButton icon="→" :size="32" aria-label="32px" />
        <IconButton icon="→" :size="40" aria-label="40px (default)" />
        <IconButton icon="→" :size="48" aria-label="48px" />
        <IconButton icon="→" :size="56" aria-label="56px" />
        <IconButton icon="→" :size="72" aria-label="72px" />
      </div>
    `,
  }),
}

// All Priorities (Default Type)
export const PrioritiesDefault = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex items-center gap-4">
        <div class="text-center">
          <IconButton icon="→" priority="primary" aria-label="Primary" />
          <p class="mt-2 text-xs text-content-secondary">Primary</p>
        </div>

        <div class="text-center">
          <IconButton icon="→" priority="secondary" aria-label="Secondary" />
          <p class="mt-2 text-xs text-content-secondary">Secondary</p>
        </div>

        <div class="text-center">
          <IconButton icon="→" priority="tertiary" aria-label="Tertiary" />
          <p class="mt-2 text-xs text-content-secondary">Tertiary</p>
        </div>

        <div class="text-center">
          <IconButton icon="→" priority="minimal" aria-label="Minimal" />
          <p class="mt-2 text-xs text-content-secondary">Minimal</p>
        </div>
      </div>
    `,
  }),
}

// All Priorities (Negative Type)
export const PrioritiesNegative = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex items-center gap-4">
        <div class="text-center">
          <IconButton icon="✕" priority="primary" type="negative" aria-label="Primary negative" />
          <p class="mt-2 text-xs text-content-secondary">Primary</p>
        </div>

        <div class="text-center">
          <IconButton icon="✕" priority="secondary" type="negative" aria-label="Secondary negative" />
          <p class="mt-2 text-xs text-content-secondary">Secondary</p>
        </div>

        <div class="text-center">
          <IconButton icon="✕" priority="tertiary" type="negative" aria-label="Tertiary negative" />
          <p class="mt-2 text-xs text-content-secondary">Tertiary</p>
        </div>

        <div class="text-center">
          <IconButton icon="✕" priority="minimal" type="negative" aria-label="Minimal negative" />
          <p class="mt-2 text-xs text-content-secondary">Minimal</p>
        </div>
      </div>
    `,
  }),
}

// Common Use Cases
export const CommonUseCases = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="grid grid-cols-4 gap-6">
        <div class="text-center">
          <IconButton icon="→" priority="primary" aria-label="Send" />
          <p class="mt-2 text-xs text-content-secondary">Send</p>
        </div>

        <div class="text-center">
          <IconButton icon="+" priority="primary" aria-label="Add" />
          <p class="mt-2 text-xs text-content-secondary">Add</p>
        </div>

        <div class="text-center">
          <IconButton icon="↔" priority="secondary" aria-label="Convert" />
          <p class="mt-2 text-xs text-content-secondary">Convert</p>
        </div>

        <div class="text-center">
          <IconButton icon="↓" priority="secondary" aria-label="Receive" />
          <p class="mt-2 text-xs text-content-secondary">Receive</p>
        </div>

        <div class="text-center">
          <IconButton icon="⇄" priority="tertiary" aria-label="Move" />
          <p class="mt-2 text-xs text-content-secondary">Move</p>
        </div>

        <div class="text-center">
          <IconButton icon="↑" priority="tertiary" aria-label="Upload" />
          <p class="mt-2 text-xs text-content-secondary">Upload</p>
        </div>

        <div class="text-center">
          <IconButton icon="←" priority="tertiary" aria-label="Back" />
          <p class="mt-2 text-xs text-content-secondary">Back</p>
        </div>

        <div class="text-center">
          <IconButton icon="✕" priority="minimal" aria-label="Close" />
          <p class="mt-2 text-xs text-content-secondary">Close</p>
        </div>

        <div class="text-center">
          <IconButton icon="📋" priority="minimal" aria-label="Copy" />
          <p class="mt-2 text-xs text-content-secondary">Copy</p>
        </div>

        <div class="text-center">
          <IconButton icon="🗑" priority="minimal" type="negative" aria-label="Delete" />
          <p class="mt-2 text-xs text-content-secondary">Delete</p>
        </div>

        <div class="text-center">
          <IconButton icon="?" priority="minimal" aria-label="Tooltip" />
          <p class="mt-2 text-xs text-content-secondary">Tooltip</p>
        </div>

        <div class="text-center">
          <IconButton icon="📅" priority="minimal" aria-label="Schedule" />
          <p class="mt-2 text-xs text-content-secondary">Schedule</p>
        </div>
      </div>
    `,
  }),
}

// In Context - Card Actions
export const InContextCard = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="max-w-4xl p-6 bg-white border border-border-default rounded-2xl">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-content-primary">DIGITAL</h3>
            <p class="text-sm text-content-secondary mt-1">
              A card that lives online and works anywhere.
            </p>
          </div>
          <IconButton icon="?" priority="minimal" aria-label="More info" />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-content-positive">Free</span>
          <IconButton icon="→" priority="primary" aria-label="Get digital card" />
        </div>
      </div>
    `,
  }),
}

// In Context - List Item
export const InContextListItem = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="max-w-4xl space-y-3">
        <div class="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200">
          <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            🏦
          </div>
          <div class="flex-1">
            <div class="font-semibold">Account number</div>
            <div class="text-sm text-content-secondary">12345</div>
          </div>
          <IconButton icon="📋" priority="minimal" aria-label="Copy account number" />
        </div>

        <div class="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200">
          <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            📍
          </div>
          <div class="flex-1">
            <div class="font-semibold">Address</div>
            <div class="text-sm text-content-secondary">123 Main St</div>
          </div>
          <IconButton icon="✎" priority="minimal" aria-label="Edit address" />
        </div>
      </div>
    `,
  }),
}

// Disabled States
export const DisabledStates = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex items-center gap-4">
        <IconButton icon="→" priority="primary" disabled aria-label="Disabled primary" />
        <IconButton icon="→" priority="secondary" disabled aria-label="Disabled secondary" />
        <IconButton icon="→" priority="tertiary" disabled aria-label="Disabled tertiary" />
        <IconButton icon="→" priority="minimal" disabled aria-label="Disabled minimal" />
      </div>
    `,
  }),
}

// With SVG Icons
export const WithSVGIcons = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex items-center gap-4">
        <!-- Send -->
        <IconButton priority="primary" aria-label="Send">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </IconButton>

        <!-- Add -->
        <IconButton priority="primary" aria-label="Add">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </IconButton>

        <!-- Close -->
        <IconButton priority="minimal" aria-label="Close">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </IconButton>

        <!-- Delete -->
        <IconButton priority="minimal" type="negative" aria-label="Delete">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </IconButton>
      </div>
    `,
  }),
}

// All Combinations Matrix
export const AllCombinations = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Default Type</h3>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <IconButton icon="→" priority="primary" aria-label="Primary" />
              <p class="mt-2 text-xs">Primary</p>
            </div>
            <div class="text-center">
              <IconButton icon="→" priority="secondary" aria-label="Secondary" />
              <p class="mt-2 text-xs">Secondary</p>
            </div>
            <div class="text-center">
              <IconButton icon="→" priority="tertiary" aria-label="Tertiary" />
              <p class="mt-2 text-xs">Tertiary</p>
            </div>
            <div class="text-center">
              <IconButton icon="→" priority="minimal" aria-label="Minimal" />
              <p class="mt-2 text-xs">Minimal</p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-4 text-content-secondary">Negative Type</h3>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <IconButton icon="✕" priority="primary" type="negative" aria-label="Primary negative" />
              <p class="mt-2 text-xs">Primary</p>
            </div>
            <div class="text-center">
              <IconButton icon="✕" priority="secondary" type="negative" aria-label="Secondary negative" />
              <p class="mt-2 text-xs">Secondary</p>
            </div>
            <div class="text-center">
              <IconButton icon="✕" priority="tertiary" type="negative" aria-label="Tertiary negative" />
              <p class="mt-2 text-xs">Tertiary</p>
            </div>
            <div class="text-center">
              <IconButton icon="✕" priority="minimal" type="negative" aria-label="Minimal negative" />
              <p class="mt-2 text-xs">Minimal</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
