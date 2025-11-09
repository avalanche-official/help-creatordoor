import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
}

// Basic Dropdown
export const Basic = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="Select Option">
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Dropdown with Icons
export const WithIcons = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="Actions">
          <DropdownItem icon="✏️">Edit</DropdownItem>
          <DropdownItem icon="📋">Copy</DropdownItem>
          <DropdownItem icon="📤">Share</DropdownItem>
          <DropdownItem icon="🗑️" danger>Delete</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Account Menu (Wise Style!)
export const AccountMenu = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="John Doe">
          <div class="px-4 py-3 border-b border-border-default">
            <p class="text-sm font-medium text-content-primary">John Doe</p>
            <p class="text-xs text-content-secondary">john@example.com</p>
          </div>
          <DropdownItem icon="👤">Profile</DropdownItem>
          <DropdownItem icon="⚙️">Settings</DropdownItem>
          <DropdownItem icon="💳">Billing</DropdownItem>
          <div class="border-t border-border-default my-1"></div>
          <DropdownItem icon="🚪">Sign out</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Transfer Actions Dropdown
export const TransferActions = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="Quick Actions">
          <DropdownItem icon="💰">
            <div>
              <p class="font-medium">Send Money</p>
              <p class="text-xs text-content-secondary">Transfer to anyone</p>
            </div>
          </DropdownItem>
          <DropdownItem icon="🔄">
            <div>
              <p class="font-medium">Currency Exchange</p>
              <p class="text-xs text-content-secondary">Convert your balance</p>
            </div>
          </DropdownItem>
          <DropdownItem icon="📊">
            <div>
              <p class="font-medium">View Balance</p>
              <p class="text-xs text-content-secondary">Check your account</p>
            </div>
          </DropdownItem>
          <div class="border-t border-border-default my-1"></div>
          <DropdownItem icon="🔔">
            <div>
              <p class="font-medium">Notifications</p>
              <p class="text-xs text-content-secondary">Manage alerts</p>
            </div>
          </DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Language Selector
export const LanguageSelector = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="🇺🇸 English">
          <DropdownItem icon="🇺🇸">English</DropdownItem>
          <DropdownItem icon="🇪🇸">Español</DropdownItem>
          <DropdownItem icon="🇫🇷">Français</DropdownItem>
          <DropdownItem icon="🇩🇪">Deutsch</DropdownItem>
          <DropdownItem icon="🇯🇵">日本語</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Right Aligned
export const RightAligned = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8 flex justify-end">
        <Dropdown label="Menu" align="right">
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem danger>Logout</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8 flex gap-4">
        <Dropdown label="Enabled">
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </Dropdown>
        <Dropdown label="Disabled" disabled>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// With Disabled Items
export const DisabledItems = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="Options">
          <DropdownItem>Available Option</DropdownItem>
          <DropdownItem disabled>Disabled Option</DropdownItem>
          <DropdownItem>Another Available</DropdownItem>
          <DropdownItem disabled>Another Disabled</DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}

// Interactive Example - Click Handler
export const InteractiveExample = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    data() {
      return {
        selectedOption: 'None selected',
      }
    },
    template: `
      <div class="p-8">
        <div class="mb-4">
          <p class="text-sm text-content-secondary">Selected:
            <span class="font-medium text-content-primary">{{ selectedOption }}</span>
          </p>
        </div>
        <Dropdown label="Choose One" ref="dropdown">
          <template #default="{ close }">
            <DropdownItem @click="selectedOption = 'Option 1'; close();">
              Option 1
            </DropdownItem>
            <DropdownItem @click="selectedOption = 'Option 2'; close();">
              Option 2
            </DropdownItem>
            <DropdownItem @click="selectedOption = 'Option 3'; close();">
              Option 3
            </DropdownItem>
          </template>
        </Dropdown>
      </div>
    `,
  }),
}

// Currency Selector (Wise Style!)
export const CurrencySelector = {
  render: () => ({
    components: { Dropdown, DropdownItem },
    template: `
      <div class="p-8">
        <Dropdown label="💵 USD - US Dollar">
          <DropdownItem icon="💵">
            <div>
              <p class="font-medium">USD - US Dollar</p>
              <p class="text-xs text-content-secondary">United States</p>
            </div>
          </DropdownItem>
          <DropdownItem icon="💶">
            <div>
              <p class="font-medium">EUR - Euro</p>
              <p class="text-xs text-content-secondary">European Union</p>
            </div>
          </DropdownItem>
          <DropdownItem icon="💷">
            <div>
              <p class="font-medium">GBP - British Pound</p>
              <p class="text-xs text-content-secondary">United Kingdom</p>
            </div>
          </DropdownItem>
          <DropdownItem icon="💴">
            <div>
              <p class="font-medium">JPY - Japanese Yen</p>
              <p class="text-xs text-content-secondary">Japan</p>
            </div>
          </DropdownItem>
        </Dropdown>
      </div>
    `,
  }),
}
