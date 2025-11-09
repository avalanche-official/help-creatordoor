import Switch from './Switch.vue'

export default {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
}

// Basic Switch
export const Basic = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        enabled: false,
      }
    },
    template: `
      <div class="space-y-2">
        <Switch v-model="enabled" />
        <p class="text-sm text-content-secondary">
          Switch is: <strong>{{ enabled ? 'ON' : 'OFF' }}</strong>
        </p>
      </div>
    `,
  }),
}

// With Label
export const WithLabel = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        notifications: true,
      }
    },
    template: `
      <Switch
        v-model="notifications"
        label="Enable notifications"
      />
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        marketing: false,
      }
    },
    template: `
      <Switch
        v-model="marketing"
        label="Marketing emails"
        description="Receive emails about new products and features"
      />
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { Switch },
    template: `
      <div class="space-y-4">
        <Switch
          :model-value="false"
          disabled
          label="Disabled (Off)"
        />
        <Switch
          :model-value="true"
          disabled
          label="Disabled (On)"
        />
      </div>
    `,
  }),
}

// Settings Panel
export const SettingsPanel = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        notifications: true,
        marketing: false,
        twoFactor: true,
        darkMode: false,
      }
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-semibold mb-4 text-content-primary">Notification Settings</h3>
        <div class="space-y-6">
          <Switch
            v-model="notifications"
            label="Push notifications"
            description="Receive notifications about your account activity"
          />
          <Switch
            v-model="marketing"
            label="Marketing emails"
            description="Get emails about new features and special offers"
          />
        </div>

        <h3 class="text-lg font-semibold mb-4 mt-8 text-content-primary">Security Settings</h3>
        <div class="space-y-6">
          <Switch
            v-model="twoFactor"
            label="Two-factor authentication"
            description="Add an extra layer of security to your account"
          />
        </div>

        <h3 class="text-lg font-semibold mb-4 mt-8 text-content-primary">Preferences</h3>
        <div class="space-y-6">
          <Switch
            v-model="darkMode"
            label="Dark mode"
            description="Use dark theme across the application"
          />
        </div>
      </div>
    `,
  }),
}

// Account Settings (Wise Style!)
export const AccountSettings = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        emailAlerts: true,
        smsAlerts: false,
        autoConvert: true,
        lowBalanceAlert: true,
      }
    },
    template: `
      <div class="max-w-lg">
        <div class="bg-white rounded-lg border border-border-default p-6">
          <h3 class="text-lg font-semibold mb-6 text-content-primary">Account preferences</h3>

          <div class="space-y-6">
            <Switch
              v-model="emailAlerts"
              label="Email alerts"
              description="Get notified by email when you receive money"
            />

            <div class="border-t border-border-default pt-6">
              <Switch
                v-model="smsAlerts"
                label="SMS alerts"
                description="Get notified by text when you send or receive money"
              />
            </div>

            <div class="border-t border-border-default pt-6">
              <Switch
                v-model="autoConvert"
                label="Auto-convert currency"
                description="Automatically convert currencies at the best available rate"
              />
            </div>

            <div class="border-t border-border-default pt-6">
              <Switch
                v-model="lowBalanceAlert"
                label="Low balance alerts"
                description="Get notified when your balance falls below a certain amount"
              />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        off: false,
        on: true,
      }
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <div>
          <h4 class="text-sm font-semibold mb-3 text-content-primary">Interactive</h4>
          <div class="space-y-4">
            <Switch
              v-model="off"
              label="Switch (Off)"
              description="Click to toggle on"
            />
            <Switch
              v-model="on"
              label="Switch (On)"
              description="Click to toggle off"
            />
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3 text-content-primary">Disabled</h4>
          <div class="space-y-4">
            <Switch
              :model-value="false"
              disabled
              label="Disabled (Off)"
              description="Cannot be toggled"
            />
            <Switch
              :model-value="true"
              disabled
              label="Disabled (On)"
              description="Cannot be toggled"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Privacy Settings
export const PrivacySettings = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        publicProfile: false,
        shareActivity: false,
        allowMessages: true,
      }
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-semibold mb-4 text-content-primary">Privacy & Sharing</h3>
        <div class="space-y-6">
          <Switch
            v-model="publicProfile"
            label="Public profile"
            description="Allow others to view your profile information"
          />
          <Switch
            v-model="shareActivity"
            label="Share activity"
            description="Show your recent activity on your profile"
          />
          <Switch
            v-model="allowMessages"
            label="Allow messages"
            description="Let other users send you direct messages"
          />
        </div>

        <div class="mt-6 p-4 bg-content-warning/10 border border-content-warning/30 rounded-lg">
          <p class="text-sm text-content-warning">
            <strong>Note:</strong> These settings affect your privacy and what others can see about you.
          </p>
        </div>
      </div>
    `,
  }),
}

// Without Label
export const WithoutLabel = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        toggle1: false,
        toggle2: true,
        toggle3: false,
      }
    },
    template: `
      <div class="flex items-center gap-4">
        <Switch v-model="toggle1" />
        <Switch v-model="toggle2" />
        <Switch v-model="toggle3" />
      </div>
    `,
  }),
}

// In a Form
export const InForm = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        agreeTerms: false,
        subscribeNewsletter: true,
        rememberMe: false,
      }
    },
    template: `
      <div class="max-w-4xl">
        <div class="bg-white rounded-lg border border-border-default p-6">
          <h3 class="text-lg font-semibold mb-6 text-content-primary">Create Account</h3>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Email address *
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-[#25ccbf] transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Password *
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-[#25ccbf] transition-colors"
              />
            </div>

            <div class="border-t border-border-default pt-6">
              <Switch
                v-model="agreeTerms"
                label="I agree to the Terms and Conditions"
                description="Required to create an account"
              />
            </div>

            <Switch
              v-model="subscribeNewsletter"
              label="Subscribe to newsletter"
              description="Receive updates about new features and tips"
            />

            <Switch
              v-model="rememberMe"
              label="Remember me"
              description="Stay logged in on this device"
            />

            <button
              :disabled="!agreeTerms"
              :class="[
                'w-full px-4 py-3 rounded-lg font-medium transition-opacity',
                agreeTerms
                  ? 'bg-content-accent text-white hover:opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}
