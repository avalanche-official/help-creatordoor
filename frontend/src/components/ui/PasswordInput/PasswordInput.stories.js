import PasswordInput from './PasswordInput.vue'

export default {
  title: 'UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
}

// Basic Password Input
export const Basic = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        password: '',
      }
    },
    template: `
      <div class="max-w-lg">
        <PasswordInput v-model="password" />
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        password: '',
      }
    },
    template: `
      <div class="max-w-4xl">
        <PasswordInput
          v-model="password"
          description="Must be at least 8 characters"
        />
      </div>
    `,
  }),
}

// Required Field
export const Required = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        password: '',
      }
    },
    template: `
      <div class="max-w-4xl">
        <PasswordInput v-model="password" required />
      </div>
    `,
  }),
}

// Success State
export const Success = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        password: 'MySecurePassword123!',
      }
    },
    template: `
      <div class="max-w-4xl">
        <PasswordInput v-model="password" state="success" />
      </div>
    `,
  }),
}

// Error State
export const Error = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        password: '123',
      }
    },
    template: `
      <div class="max-w-4xl">
        <PasswordInput
          v-model="password"
          state="error"
          error-message="Password must be at least 8 characters"
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        password: 'DisabledPassword',
      }
    },
    template: `
      <div class="max-w-4xl">
        <PasswordInput v-model="password" disabled />
      </div>
    `,
  }),
}

// Login Form (Wise Style!)
export const LoginForm = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        email: '',
        password: '',
        errors: {
          email: false,
          password: false,
        },
      }
    },
    methods: {
      login() {
        this.errors.email = !this.email
        this.errors.password = !this.password

        if (!this.errors.email && !this.errors.password) {
          alert('Login successful!')
        }
      },
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">Log in to Wise</h2>

        <div class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-content-primary mb-2">
              Email address *
            </label>
            <input
              v-model="email"
              type="email"
              :class="[
                'w-full px-4 py-3 border rounded-lg transition-all',
                errors.email
                  ? 'border-2 border-red-500'
                  : 'border-gray-300 hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:outline-none'
              ]"
            />
            <p v-if="errors.email" class="mt-2 text-sm text-red-500">
              Please enter your email
            </p>
          </div>

          <!-- Password -->
          <PasswordInput
            v-model="password"
            :state="errors.password ? 'error' : 'default'"
            :error-message="errors.password ? 'Please enter your password' : ''"
            required
          />

          <!-- Forgot Password Link -->
          <div class="text-right">
            <a href="#" class="text-sm font-medium text-content-accent hover:underline">
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            @click="login"
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Log in
          </button>

          <!-- Sign Up Link -->
          <p class="text-center text-sm text-content-secondary">
            Don't have an account?
            <a href="#" class="font-medium text-content-accent hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    `,
  }),
}

// Registration Form
export const RegistrationForm = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        passwordStrength: '',
      }
    },
    watch: {
      password(newVal) {
        if (!newVal) {
          this.passwordStrength = ''
        } else if (newVal.length < 6) {
          this.passwordStrength = 'weak'
        } else if (newVal.length < 10) {
          this.passwordStrength = 'medium'
        } else {
          this.passwordStrength = 'strong'
        }
      },
    },
    computed: {
      passwordsMatch() {
        return this.password && this.confirmPassword && this.password === this.confirmPassword
      },
      passwordsDontMatch() {
        return this.confirmPassword && this.password !== this.confirmPassword
      },
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">Create your account</h2>

        <div class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-content-primary mb-2">
              Email address *
            </label>
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:outline-none transition-all"
            />
          </div>

          <!-- Password -->
          <div>
            <PasswordInput
              v-model="password"
              description="Must be at least 8 characters"
              required
            />

            <!-- Password Strength -->
            <div v-if="passwordStrength" class="mt-2 flex gap-1">
              <div :class="['h-1 flex-1 rounded', passwordStrength ? 'bg-red-500' : 'bg-gray-200']" />
              <div :class="['h-1 flex-1 rounded', passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-yellow-500' : 'bg-gray-200']" />
              <div :class="['h-1 flex-1 rounded', passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200']" />
            </div>
            <p v-if="passwordStrength" class="mt-1 text-xs text-content-secondary capitalize">
              Password strength: {{ passwordStrength }}
            </p>
          </div>

          <!-- Confirm Password -->
          <PasswordInput
            v-model="confirmPassword"
            label="Confirm password"
            :state="passwordsMatch ? 'success' : passwordsDontMatch ? 'error' : 'default'"
            :error-message="passwordsDontMatch ? 'Passwords do not match' : ''"
            required
          />

          <!-- Submit -->
          <button
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Create account
          </button>
        </div>
      </div>
    `,
  }),
}

// Change Password Form
export const ChangePasswordForm = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">Change password</h2>

        <div class="space-y-6">
          <PasswordInput
            v-model="currentPassword"
            label="Current password"
            required
          />

          <PasswordInput
            v-model="newPassword"
            label="New password"
            description="Must be at least 8 characters"
            required
          />

          <PasswordInput
            v-model="confirmNewPassword"
            label="Confirm new password"
            required
          />

          <div class="flex gap-3">
            <button class="flex-1 px-4 py-3 border border-gray-300 text-content-primary rounded-lg hover:bg-background-elevated font-medium">
              Cancel
            </button>
            <button class="flex-1 px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium">
              Update password
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { PasswordInput },
    data() {
      return {
        default: '',
        withValue: 'MyPassword123',
        success: 'StrongPassword!',
        error: '123',
        disabled: 'DisabledPassword',
      }
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <PasswordInput
          v-model="default"
          label="Default (empty)"
        />

        <PasswordInput
          v-model="withValue"
          label="With value (hidden)"
        />

        <PasswordInput
          v-model="success"
          label="Success"
          state="success"
        />

        <PasswordInput
          v-model="error"
          label="Error"
          state="error"
          error-message="Password is too short"
        />

        <PasswordInput
          v-model="disabled"
          label="Disabled"
          disabled
        />
      </div>
    `,
  }),
}
