import ListItem from './ListItem.vue'
import Avatar from '../Avatar/Avatar.vue'
import Radio from '../Radio/Radio.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import Switch from '../Switch/Switch.vue'

export default {
  title: 'UI/ListItem',
  component: ListItem,
  tags: ['autodocs'],
}

// Navigation Item
export const NavigationItem = {
  render: () => ({
    components: { ListItem, Avatar },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Help"
          clickable
          show-chevron
          @click="() => alert('Navigate to Help')"
        >
          <template #avatar>
            <Avatar icon="?" size="md" />
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Radio
export const WithRadio = {
  render: () => ({
    components: { ListItem, Avatar },
    data() {
      return {
        selected: 'eur',
      }
    },
    template: `
      <div class="max-w-4xl space-y-3">
        <ListItem
          title="EUR"
          description="Euro"
          @click="selected = 'eur'"
        >
          <template #avatar>
            🇪🇺
          </template>
          <template #action>
            <input
              type="radio"
              :checked="selected === 'eur'"
              @change="selected = 'eur'"
              class="w-5 h-5"
            />
          </template>
        </ListItem>

        <ListItem
          title="GBP"
          description="British Pound"
          @click="selected = 'gbp'"
        >
          <template #avatar>
            🇬🇧
          </template>
          <template #action>
            <input
              type="radio"
              :checked="selected === 'gbp'"
              @change="selected = 'gbp'"
              class="w-5 h-5"
            />
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Checkbox
export const WithCheckbox = {
  render: () => ({
    components: { ListItem },
    data() {
      return {
        selected: [],
      }
    },
    methods: {
      toggle(value) {
        const index = this.selected.indexOf(value)
        if (index > -1) {
          this.selected.splice(index, 1)
        } else {
          this.selected.push(value)
        }
      },
    },
    template: `
      <div class="max-w-4xl space-y-3">
        <ListItem
          title="Option"
          @click="toggle('option1')"
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-green-500" />
          </template>
          <template #action>
            <input
              type="checkbox"
              :checked="selected.includes('option1')"
              @change="toggle('option1')"
              class="w-5 h-5"
            />
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Switch
export const WithSwitch = {
  render: () => ({
    components: { ListItem, Switch },
    data() {
      return {
        darkMode: false,
      }
    },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Theme"
          description="Dark"
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              🌙
            </div>
          </template>
          <template #action>
            <Switch v-model="darkMode" />
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Button
export const WithButton = {
  render: () => ({
    components: { ListItem, Avatar },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Joe Smith"
        >
          <template #avatar>
            <Avatar initials="JS" size="md" />
          </template>
          <template #action>
            <button class="px-4 py-2 bg-content-positive text-white rounded-full hover:opacity-90 font-medium">
              Send
            </button>
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Icon Button
export const WithIconButton = {
  render: () => ({
    components: { ListItem },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Account number"
          description="12345"
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              🏦
            </div>
          </template>
          <template #action>
            <button
              @click="() => alert('Copied!')"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Copy"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// Non-Interactive (Info Only)
export const NonInteractive = {
  render: () => ({
    components: { ListItem },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Spent this month"
          description="20.45 GBP"
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              💳
            </div>
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Value
export const WithValue = {
  render: () => ({
    components: { ListItem },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Total fees"
          description="Included in GBP amount"
          value="2.91 GBP"
          clickable
          show-chevron
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              📋
            </div>
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// With Prompt (Warning)
export const WithPrompt = {
  render: () => ({
    components: { ListItem },
    template: `
      <div class="max-w-4xl">
        <ListItem
          title="Arrives by"
          description="Today - in seconds"
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              🕐
            </div>
          </template>
          <template #action>
            <button class="px-4 py-2 bg-background-elevated text-content-primary rounded-full hover:bg-gray-200 font-medium">
              Schedule
            </button>
          </template>
          <template #prompt>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-content-warning/10 border border-content-warning/30 rounded-full text-xs text-content-warning">
              ⚠️ Might be delayed
            </div>
          </template>
        </ListItem>
      </div>
    `,
  }),
}

// Payment Method Example (Wise Style!)
export const PaymentMethod = {
  render: () => ({
    components: { ListItem },
    template: `
      <div class="max-w-4xl space-y-3">
        <ListItem
          title="Payment method"
          description="Wise GBP balance"
        >
          <template #avatar>
            🇬🇧
          </template>
          <template #action>
            <button class="px-4 py-2 bg-background-elevated text-content-primary rounded-full hover:bg-gray-200 font-medium">
              Change
            </button>
          </template>
        </ListItem>

        <ListItem
          title="Arrives by"
          description="Today - in seconds"
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              🕐
            </div>
          </template>
          <template #action>
            <button class="px-4 py-2 bg-background-elevated text-content-primary rounded-full hover:bg-gray-200 font-medium">
              Schedule
            </button>
          </template>
          <template #prompt>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-content-warning/10 border border-content-warning/30 rounded-full text-xs text-content-warning">
              ⚠️ Might be delayed
            </div>
          </template>
        </ListItem>

        <ListItem
          title="Total fees"
          description="Included in GBP amount"
          value="2.91 GBP"
          clickable
          show-chevron
        >
          <template #avatar>
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              📋
            </div>
          </template>
        </ListItem>
      </div>
    `,
  }),
}
