import CircularButton from './CircularButton.vue'

export default {
  title: 'UI/CircularButton',
  component: CircularButton,
  tags: ['autodocs'],
}

// All Types and Priorities
export const AllVariants = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8 space-y-8">
        <!-- Default Type -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-4">Default Type</p>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <CircularButton
                icon="✏️"
                label="Edit"
                type="default"
                priority="primary"
              />
              <p class="text-xs text-content-secondary mt-2">Primary</p>
            </div>
            <div class="text-center">
              <CircularButton
                icon="✏️"
                label="Edit"
                type="default"
                priority="secondary"
              />
              <p class="text-xs text-content-secondary mt-2">Secondary</p>
            </div>
          </div>
        </div>

        <!-- Negative Type -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-4">Negative Type</p>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <CircularButton
                icon="🗑️"
                label="Delete"
                type="negative"
                priority="primary"
              />
              <p class="text-xs text-content-secondary mt-2">Primary</p>
            </div>
            <div class="text-center">
              <CircularButton
                icon="🗑️"
                label="Delete"
                type="negative"
                priority="secondary"
              />
              <p class="text-xs text-content-secondary mt-2">Secondary</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Sizes
export const Sizes = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8">
        <div class="flex items-end gap-4">
          <div class="text-center">
            <CircularButton icon="✏️" label="Edit" size="sm" />
            <p class="text-xs text-content-secondary mt-2">Small</p>
          </div>
          <div class="text-center">
            <CircularButton icon="✏️" label="Edit" size="md" />
            <p class="text-xs text-content-secondary mt-2">Medium</p>
          </div>
          <div class="text-center">
            <CircularButton icon="✏️" label="Edit" size="lg" />
            <p class="text-xs text-content-secondary mt-2">Large</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// Common Actions
export const CommonActions = {
  render: () => ({
    components: { CircularButton },
    data() {
      return {
        lastAction: '',
      }
    },
    template: `
      <div class="p-8">
        <p class="text-sm text-content-secondary mb-4">
          Last action: <strong class="text-content-primary">{{ lastAction || 'None' }}</strong>
        </p>
        <div class="flex items-center gap-3">
          <CircularButton
            icon="✏️"
            label="Edit"
            @click="lastAction = 'Edit'"
          />
          <CircularButton
            icon="📋"
            label="Copy"
            @click="lastAction = 'Copy'"
          />
          <CircularButton
            icon="📤"
            label="Share"
            @click="lastAction = 'Share'"
          />
          <CircularButton
            icon="⭐"
            label="Favorite"
            @click="lastAction = 'Favorite'"
          />
          <CircularButton
            icon="🗑️"
            label="Delete"
            type="negative"
            @click="lastAction = 'Delete'"
          />
        </div>
      </div>
    `,
  }),
}

// Transaction Actions (Wise Style!)
export const TransactionActions = {
  render: () => ({
    components: { CircularButton },
    data() {
      return {
        action: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="border border-border-default rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="font-medium text-content-primary">Money sent</p>
              <p class="text-sm text-content-secondary">To Jane Smith</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-content-negative">-$250.00</p>
              <p class="text-xs text-content-tertiary">Today, 2:30 PM</p>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-3 border-t border-border-default">
            <CircularButton
              icon="📋"
              label="Copy transaction ID"
              priority="secondary"
              size="sm"
              @click="action = 'Copied'"
            />
            <CircularButton
              icon="📤"
              label="Share receipt"
              priority="secondary"
              size="sm"
              @click="action = 'Shared'"
            />
            <CircularButton
              icon="🔄"
              label="Repeat transfer"
              priority="secondary"
              size="sm"
              @click="action = 'Repeated'"
            />
            <CircularButton
              icon="⚠️"
              label="Report issue"
              type="negative"
              priority="secondary"
              size="sm"
              @click="action = 'Reported'"
            />
          </div>
        </div>

        <p v-if="action" class="text-sm text-content-secondary">
          Action: <strong class="text-content-primary">{{ action }}</strong>
        </p>
      </div>
    `,
  }),
}

// Recipient Card Actions
export const RecipientActions = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="border border-border-default rounded-lg p-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-content-accent to-content-positive rounded-full flex items-center justify-center text-white font-bold">
              JS
            </div>
            <div class="flex-1">
              <p class="font-medium text-content-primary">Jane Smith</p>
              <p class="text-sm text-content-secondary">jane@example.com</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <CircularButton
              icon="💰"
              label="Send money"
              priority="primary"
            />
            <CircularButton
              icon="✏️"
              label="Edit recipient"
              priority="secondary"
            />
            <CircularButton
              icon="⭐"
              label="Add to favorites"
              priority="secondary"
            />
            <CircularButton
              icon="🗑️"
              label="Delete recipient"
              type="negative"
              priority="secondary"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Balance Card Actions
export const BalanceActions = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8 max-w-4xl space-y-4">
        <div class="border border-border-default rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-content-secondary">USD Balance</span>
            <span class="text-sm text-content-positive">🇺🇸</span>
          </div>
          <p class="text-3xl font-bold text-content-primary mb-4">$12,450.00</p>

          <div class="flex items-center gap-2">
            <CircularButton
              icon="💸"
              label="Send"
            />
            <CircularButton
              icon="📥"
              label="Add money"
              priority="secondary"
            />
            <CircularButton
              icon="🔄"
              label="Convert"
              priority="secondary"
            />
            <CircularButton
              icon="📊"
              label="View details"
              priority="secondary"
            />
          </div>
        </div>

        <div class="border border-border-default rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-content-secondary">EUR Balance</span>
            <span class="text-sm text-content-positive">🇪🇺</span>
          </div>
          <p class="text-3xl font-bold text-content-primary mb-4">€8,320.50</p>

          <div class="flex items-center gap-2">
            <CircularButton
              icon="💸"
              label="Send"
            />
            <CircularButton
              icon="📥"
              label="Add money"
              priority="secondary"
            />
            <CircularButton
              icon="🔄"
              label="Convert"
              priority="secondary"
            />
            <CircularButton
              icon="📊"
              label="View details"
              priority="secondary"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8">
        <div class="flex items-center gap-4">
          <div class="text-center">
            <CircularButton icon="✏️" label="Edit" />
            <p class="text-xs text-content-secondary mt-2">Enabled</p>
          </div>
          <div class="text-center">
            <CircularButton icon="✏️" label="Edit" disabled />
            <p class="text-xs text-content-secondary mt-2">Disabled</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// Grouped Actions (Best Practice)
export const GroupedActions = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8 space-y-8">
        <!-- Good: Multiple buttons together -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-4">
            ✅ Good: Circular buttons in a group
          </p>
          <div class="flex items-center gap-2">
            <CircularButton icon="✏️" label="Edit" />
            <CircularButton icon="📋" label="Copy" priority="secondary" />
            <CircularButton icon="📤" label="Share" priority="secondary" />
            <CircularButton icon="🗑️" label="Delete" type="negative" priority="secondary" />
          </div>
        </div>

        <!-- Bad: Single button alone -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-4">
            ❌ Bad: Single circular button (use regular button instead)
          </p>
          <CircularButton icon="✏️" label="Edit" />
        </div>
      </div>
    `,
  }),
}

// Media Actions
export const MediaActions = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="border border-border-default rounded-lg overflow-hidden">
          <!-- Image placeholder -->
          <div class="bg-gradient-to-br from-content-accent to-content-positive h-48 flex items-center justify-center text-white text-4xl">
            🖼️
          </div>

          <!-- Actions -->
          <div class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <CircularButton
                icon="⭐"
                label="Favorite"
                priority="secondary"
                size="sm"
              />
              <CircularButton
                icon="📤"
                label="Share"
                priority="secondary"
                size="sm"
              />
              <CircularButton
                icon="📥"
                label="Download"
                priority="secondary"
                size="sm"
              />
            </div>
            <CircularButton
              icon="🗑️"
              label="Delete"
              type="negative"
              priority="secondary"
              size="sm"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Floating Actions (Mobile Pattern)
export const FloatingActions = {
  render: () => ({
    components: { CircularButton },
    template: `
      <div class="p-8 bg-beige rounded-lg" style="height: 400px; position: relative;">
        <p class="text-sm text-content-secondary mb-4">
          Mobile-style floating action buttons
        </p>

        <!-- Content area -->
        <div class="h-full overflow-auto">
          <div class="space-y-3">
            <div class="bg-white p-4 rounded-lg">Transaction 1</div>
            <div class="bg-white p-4 rounded-lg">Transaction 2</div>
            <div class="bg-white p-4 rounded-lg">Transaction 3</div>
            <div class="bg-white p-4 rounded-lg">Transaction 4</div>
            <div class="bg-white p-4 rounded-lg">Transaction 5</div>
          </div>
        </div>

        <!-- Floating buttons -->
        <div class="absolute bottom-4 right-4 flex flex-col gap-2">
          <CircularButton
            icon="🔍"
            label="Search"
            priority="secondary"
            size="lg"
          />
          <CircularButton
            icon="➕"
            label="Add new"
            size="lg"
          />
        </div>
      </div>
    `,
  }),
}

// Interactive Demo
export const InteractiveDemo = {
  render: () => ({
    components: { CircularButton },
    data() {
      return {
        likes: 0,
        favorited: false,
        shared: false,
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <div class="border border-border-default rounded-lg p-6">
          <h3 class="text-lg font-semibold text-content-primary mb-2">
            Amazing Feature Update
          </h3>
          <p class="text-sm text-content-secondary mb-4">
            We've added new capabilities to help you manage your money better.
          </p>

          <div class="flex items-center gap-2 pt-4 border-t border-border-default">
            <CircularButton
              :icon="favorited ? '⭐' : '☆'"
              :label="favorited ? 'Unfavorite' : 'Favorite'"
              :priority="favorited ? 'primary' : 'secondary'"
              @click="favorited = !favorited"
            />
            <CircularButton
              icon="👍"
              :label="'Like (' + likes + ')'"
              priority="secondary"
              @click="likes++"
            />
            <CircularButton
              :icon="shared ? '✓' : '📤'"
              :label="shared ? 'Shared' : 'Share'"
              :priority="shared ? 'primary' : 'secondary'"
              @click="shared = true"
            />
          </div>

          <div class="mt-4 text-sm text-content-secondary">
            <p v-if="favorited">⭐ Added to favorites</p>
            <p v-if="likes > 0">👍 {{ likes }} {{ likes === 1 ? 'like' : 'likes' }}</p>
            <p v-if="shared">✓ Shared successfully</p>
          </div>
        </div>
      </div>
    `,
  }),
}
