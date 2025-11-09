<template>
  <!-- FIXED: Ensure modal is always on top with proper mobile handling -->
  <teleport to="body">
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-2">
      <div
        class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        style="touch-action: manipulation"
        @click.stop
      >
        <!-- Header -->
        <div class="p-6 border-b border-neutral-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-neutral-900">
              {{
                currentStep === 1
                  ? $t('checkout.customer_information')
                  : $t('checkout.complete_purchase')
              }}
            </h2>
            <button
              @click="$emit('close')"
              class="p-2 hover:bg-neutral-100 rounded-full transition-colors z-10"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Progress Indicator with Dynamic Colors -->
          <div class="mt-4 flex items-center">
            <div class="flex items-center">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  currentStep >= 1 ? 'text-white' : 'bg-neutral-200 text-neutral-600',
                ]"
                :style="currentStep >= 1 ? { backgroundColor: themeColor } : {}"
              >
                1
              </div>
              <span class="ml-2 text-sm">{{ $t('checkout.contact_info') }}</span>
            </div>
            <div
              class="flex-1 h-px mx-4"
              :class="currentStep >= 2 ? '' : 'bg-neutral-200'"
              :style="currentStep >= 2 ? { backgroundColor: themeColor } : {}"
            ></div>
            <div class="flex items-center">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  currentStep >= 2 ? 'text-white' : 'bg-neutral-200 text-neutral-600',
                ]"
                :style="currentStep >= 2 ? { backgroundColor: themeColor } : {}"
              >
                2
              </div>
              <span class="ml-2 text-sm">{{ $t('checkout.payment') }}</span>
            </div>
          </div>
        </div>

        <!-- Step 1: Customer Information -->
        <div v-if="currentStep === 1" class="p-6">
          <div class="space-y-4">
            <!-- Email Input -->
            <div>
              <label for="customer-email" class="block text-sm font-medium text-neutral-700 mb-2">
                {{ $t('checkout.email_address') }} *
              </label>
              <input
                id="customer-email"
                v-model="customerInfo.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                :placeholder="$t('checkout.email_placeholder')"
              />
              <p class="text-xs text-neutral-500 mt-1">
                {{ $t('checkout.download_link_note') }}
              </p>
            </div>

            <!-- First Name -->
            <div>
              <label for="first-name" class="block text-sm font-medium text-neutral-700 mb-2">
                {{ $t('checkout.first_name') }} *
              </label>
              <input
                id="first-name"
                v-model="customerInfo.firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                :placeholder="$t('checkout.first_name_placeholder')"
              />
            </div>

            <!-- Last Name -->
            <div>
              <label for="last-name" class="block text-sm font-medium text-neutral-700 mb-2">
                {{ $t('checkout.last_name') }} *
              </label>
              <input
                id="last-name"
                v-model="customerInfo.lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                :placeholder="$t('checkout.last_name_placeholder')"
              />
            </div>

            <!-- Company (Optional) -->
            <div>
              <label for="company" class="block text-sm font-medium text-neutral-700 mb-2">
                {{ $t('checkout.company_optional') }}
              </label>
              <input
                id="company"
                v-model="customerInfo.company"
                type="text"
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                :placeholder="$t('checkout.company_placeholder')"
              />
            </div>

            <!-- Address -->
            <div>
              <label for="address" class="block text-sm font-medium text-neutral-700 mb-2">
                {{ $t('checkout.address') }}
              </label>
              <input
                id="address"
                v-model="customerInfo.address"
                type="text"
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                :placeholder="$t('checkout.address_placeholder')"
              />
            </div>

            <!-- City, State, ZIP Row -->
            <div class="grid grid-cols-2 gap-4">
              <!-- City -->
              <div>
                <label for="city" class="block text-sm font-medium text-neutral-700 mb-2">
                  {{ $t('checkout.city') }}
                </label>
                <input
                  id="city"
                  v-model="customerInfo.city"
                  type="text"
                  class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                  :placeholder="$t('checkout.city_placeholder')"
                />
              </div>

              <!-- ZIP -->
              <div>
                <label for="zip" class="block text-sm font-medium text-neutral-700 mb-2">
                  {{ $t('checkout.zip_code') }}
                </label>
                <input
                  id="zip"
                  v-model="customerInfo.zip"
                  type="text"
                  class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                  :placeholder="$t('checkout.zip_placeholder')"
                />
              </div>
            </div>

            <!-- State -->
            <div>
              <label for="state" class="block text-sm font-medium text-neutral-700 mb-2">
                {{ $t('checkout.state_province') }}
              </label>
              <input
                id="state"
                v-model="customerInfo.state"
                type="text"
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent input-focus"
                :placeholder="$t('checkout.state_placeholder')"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <!-- Continue Button -->
          <div class="mt-6">
            <button
              @click="proceedToPayment"
              :disabled="!isStep1Valid"
              class="w-full text-white font-bold py-4 px-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              :style="{ backgroundColor: themeColor }"
            >
              {{ $t('checkout.continue_to_payment') }}
            </button>
          </div>
        </div>

        <!-- Step 2: Payment -->
        <div v-if="currentStep === 2">
          <!-- Customer Summary -->
          <div class="p-6 border-b border-neutral-200 bg-neutral-50">
            <div class="flex items-center justify-between text-sm">
              <div>
                <p class="font-medium">{{ customerInfo.firstName }} {{ customerInfo.lastName }}</p>
                <p class="text-neutral-600">{{ customerInfo.email }}</p>
                <p v-if="customerInfo.company" class="text-neutral-600">
                  {{ customerInfo.company }}
                </p>
                <div v-if="customerInfo.address" class="text-neutral-600 text-xs mt-1">
                  <p>{{ customerInfo.address }}</p>
                  <p v-if="customerInfo.city || customerInfo.state || customerInfo.zip">
                    {{ customerInfo.city
                    }}{{ customerInfo.city && (customerInfo.state || customerInfo.zip) ? ', ' : ''
                    }}{{ customerInfo.state }} {{ customerInfo.zip }}
                  </p>
                </div>
              </div>
              <button @click="goBackToStep1" class="text-neutral-900 hover:text-blue-800 text-sm">
                {{ $t('checkout.edit') }}
              </button>
            </div>
          </div>

          <!-- Product Summary -->
          <div class="p-6 border-b border-neutral-200">
            <div class="flex items-center space-x-4">
              <img
                :src="product.image || '/api/placeholder/80/80'"
                :alt="product.title"
                class="w-16 h-16 rounded-xl object-cover"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-neutral-900">{{ product.title }}</h3>
                <p class="text-sm text-neutral-600">
                  {{ $t('checkout.by_creator', { name: user.name }) }}
                </p>
              </div>
              <div class="text-right">
                <!-- Show original price if fees are covered -->
                <div v-if="sellerSettings?.coverCardFees && finalPrice > product.price">
                  <p class="text-sm text-neutral-500 line-through">
                    {{ currencySymbol }} {{ product.price.toFixed(2) }}
                  </p>
                  <p class="text-2xl font-bold" :style="{ color: themeColor }">
                    {{ currencySymbol }} {{ finalPrice.toFixed(2) }}
                  </p>
                  <p class="text-xs text-neutral-600">
                    {{ $t('checkout.includes_processing_fees') }}
                  </p>
                </div>
                <!-- Show regular price -->
                <div v-else>
                  <p class="text-2xl font-bold" :style="{ color: themeColor }">
                    {{ currencySymbol }} {{ finalPrice.toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <div class="p-6">
            <div v-if="!isLoading && stripe && elements" class="space-y-6">
              <!-- Payment Element -->
              <div ref="cardElement" class="p-4 border border-neutral-300 rounded-lg"></div>
            </div>

            <!-- Loading State -->
            <div v-else class="flex items-center justify-center py-12">
              <div class="text-center">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
                  :style="{ borderColor: themeColor }"
                ></div>
                <p class="text-neutral-600">{{ $t('checkout.loading_payment_form') }}</p>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <!-- Success Message -->
            <div
              v-if="successMessage"
              class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p class="text-sm text-green-600">{{ successMessage }}</p>
            </div>
          </div>

          <!-- Footer with Pay Button -->
          <div class="p-6 border-t border-neutral-200">
            <button
              @click="handlePayment"
              :disabled="isProcessing || !canPay"
              class="w-full text-white font-bold py-4 px-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              :style="{ backgroundColor: themeColor }"
            >
              <svg
                v-if="isProcessing"
                class="animate-spin w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>
                {{
                  isProcessing
                    ? $t('checkout.processing')
                    : $t('checkout.pay_amount', {
                        symbol: currencySymbol,
                        price: finalPrice.toFixed(2),
                      })
                }}
              </span>
            </button>

            <!-- Security Info -->
            <div class="mt-4 text-center">
              <p class="text-xs text-neutral-500">
                {{ $t('checkout.security_info') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { stripeService } from '@/lib/stripe.js'
import { settingsService } from '@/lib/settingsService.js'

const { t } = useI18n()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: String,
    default: '#000000',
  },
  currency: {
    type: String,
    default: 'CHF',
  },
  currencySymbol: {
    type: String,
    default: 'CHF',
  },
})

const emit = defineEmits(['close', 'payment-success', 'payment-error'])

// Step management
const currentStep = ref(1)

// NEW: Seller settings and pricing
const sellerSettings = ref(null)
const originalPrice = ref(0)
const finalPrice = ref(0)

// Customer Information - Updated with new fields
const customerInfo = ref({
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  address: '',
  city: '',
  state: '',
  zip: '',
})

// Stripe variables
const stripe = ref(null)
const elements = ref(null)
const paymentElement = ref(null)
const cardElement = ref(null)

// Component state
const isLoading = ref(true)
const isProcessing = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// NEW: Calculate price with fees covered
const calculatePriceWithFees = (basePrice, applicationFeeRate = 0.029) => {
  const stripeFeeFixed = props.currency.toLowerCase() === 'chf' ? 0.3 : 0.3 // Adjust per currency
  const stripeFeePercent = 0.029 // 2.9%

  // Calculate total price needed to cover all fees
  const totalPrice =
    (basePrice + stripeFeeFixed + basePrice * applicationFeeRate) / (1 - stripeFeePercent)

  return Math.round(totalPrice * 100) / 100 // Round to 2 decimals
}

// NEW: Load seller settings
const loadSellerSettings = async () => {
  try {
    console.log('Loading seller settings for userId:', props.product.userId)
    const settings = await settingsService.getPaymentSettings(props.product.userId)
    sellerSettings.value = settings

    console.log('Seller settings loaded:', settings)
    console.log('Cover card fees enabled:', settings.coverCardFees)

    // Set original and final prices
    originalPrice.value = props.product.price

    if (settings.coverCardFees) {
      finalPrice.value = calculatePriceWithFees(props.product.price)
      console.log('Price adjusted for fees:', {
        original: originalPrice.value,
        adjusted: finalPrice.value,
        increase: finalPrice.value - originalPrice.value,
      })
    } else {
      finalPrice.value = props.product.price
      console.log('No fee adjustment needed, using original price:', finalPrice.value)
    }
  } catch (error) {
    console.error('Error loading seller settings:', error)
    // Fallback to original price if settings can't be loaded
    sellerSettings.value = { coverCardFees: false }
    originalPrice.value = props.product.price
    finalPrice.value = props.product.price
  }
}

// Computed
const isStep1Valid = computed(() => {
  return (
    customerInfo.value.email &&
    customerInfo.value.email.includes('@') &&
    customerInfo.value.firstName.trim() &&
    customerInfo.value.lastName.trim()
  )
})

const canPay = computed(() => {
  return !isProcessing.value && stripe.value && elements.value && paymentElement.value
})

// Step navigation
const proceedToPayment = async () => {
  if (!isStep1Valid.value) {
    errorMessage.value = t('checkout.fill_required_fields')
    return
  }

  errorMessage.value = ''
  currentStep.value = 2
  await initializeStripe()
}

const goBackToStep1 = () => {
  currentStep.value = 1
  errorMessage.value = ''
}

// Initialize Stripe (only when moving to step 2)
const initializeStripe = async () => {
  try {
    console.log('Initializing Stripe with currency:', props.currency)
    console.log('Using final price for payment:', finalPrice.value)

    // Load Stripe.js if not already loaded
    if (!window.Stripe) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.async = true
      document.head.appendChild(script)

      await new Promise((resolve) => {
        script.onload = resolve
      })
    }

    // Initialize Stripe with your publishable key
    stripe.value = window.Stripe(
      'pk_live_51NAssRHv9PKFXa7kJnGHocdnbE5RZ3ZuUKNpixKaiI8nKTchw1eMufNWgUojJGmlTFesb9c7DTSW4yy7YYiYrXT6004kJyAWwd',
    )

    // UPDATED: Create payment intent with final price (includes fees if enabled)
    const paymentIntent = await stripeService.createPaymentIntent(
      props.product.id,
      props.product.userId, // Use the product's userId (seller)
      finalPrice.value, // Use calculated final price
      finalPrice.value * 0.029, // 2.9% platform fee on final amount
      props.currency, // Pass the user's preferred currency
    )

    console.log('Payment intent created with adjusted pricing:', {
      paymentIntent,
      currency: props.currency,
      originalAmount: originalPrice.value,
      finalAmount: finalPrice.value,
      coverCardFees: sellerSettings.value?.coverCardFees,
    })

    // Create elements instance with dynamic theme color
    elements.value = stripe.value.elements({
      clientSecret: paymentIntent.clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: props.themeColor,
          colorBackground: '#ffffff',
          colorText: '#262626',
          colorDanger: '#dc2626',
          fontFamily: 'system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '8px',
        },
      },
    })

    // CRITICAL FIX: Set isLoading to false BEFORE mounting
    isLoading.value = false

    await nextTick()

    // Now mount payment element
    console.log('🎯 Checking cardElement.value:', cardElement.value)
    console.log('🎯 cardElement DOM element exists:', !!cardElement.value)

    if (cardElement.value) {
      console.log('🎯 Creating payment element...')
      console.log('🎯 Elements instance:', elements.value)
      console.log('🎯 Client secret available:', !!paymentIntent.clientSecret)

      paymentElement.value = elements.value.create('payment', {
        layout: 'tabs',
      })

      console.log('🎯 Payment element created:', paymentElement.value)
      console.log('🎯 About to mount to:', cardElement.value)

      paymentElement.value.mount(cardElement.value)
      console.log('✅ Payment element mounted successfully')

      // Listen for changes
      paymentElement.value.on('change', (event) => {
        console.log('💳 Payment element change event:', event)
        if (event.error) {
          errorMessage.value = event.error.message
        } else {
          errorMessage.value = ''
        }
      })

      // Listen for ready event
      paymentElement.value.on('ready', () => {
        console.log('✅ Payment element is ready!')
      })
    } else {
      console.error('❌ cardElement.value is still null after isLoading = false')
      console.error('❌ Check your v-if condition in template')
    }

    console.log('Stripe initialized successfully with currency:', props.currency)
  } catch (error) {
    console.error('Error initializing Stripe:', error)
    errorMessage.value = t('checkout.failed_load_payment')
    emit('payment-error', error)
    isLoading.value = false
  }
}

// Handle payment submission
const handlePayment = async () => {
  if (!canPay.value || !stripe.value || !elements.value) return

  isProcessing.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    console.log('Processing payment in currency:', props.currency)
    console.log('Final price being charged:', finalPrice.value)
    console.log('Customer info:', customerInfo.value)

    // Confirm payment with customer information
    const { error, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        receipt_email: customerInfo.value.email, // This is crucial for webhook
        payment_method_data: {
          billing_details: {
            name: `${customerInfo.value.firstName} ${customerInfo.value.lastName}`,
            email: customerInfo.value.email,
            address: {
              line1: customerInfo.value.address,
              postal_code: customerInfo.value.zip,
              state: customerInfo.value.state,
              city: customerInfo.value.city,
            },
          },
        },
      },
      redirect: 'if_required',
    })

    if (error) {
      console.error('Payment failed:', error)
      errorMessage.value = error.message
      emit('payment-error', error)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent)
      successMessage.value = t('checkout.payment_success_message', {
        email: customerInfo.value.email,
      })

      // Emit success event with customer info
      emit('payment-success', {
        paymentIntent,
        customerInfo: customerInfo.value,
        currency: props.currency,
        amount: finalPrice.value, // Use final price, not original
        originalAmount: originalPrice.value,
        currencySymbol: props.currencySymbol,
        feesCovered: sellerSettings.value?.coverCardFees || false,
      })
    }
  } catch (error) {
    console.error('Payment error:', error)
    errorMessage.value = t('checkout.unexpected_error')
    emit('payment-error', error)
  } finally {
    isProcessing.value = false
  }
}

// Handle escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && !isProcessing.value) {
    emit('close')
  }
}

// Pre-fill customer info if user is logged in
onMounted(async () => {
  // Store original body styles
  const originalOverflow = document.body.style.overflow
  const originalPosition = document.body.style.position
  const originalWidth = document.body.style.width
  const originalHeight = document.body.style.height

  // Pre-fill customer info if available
  if (props.user?.email) {
    customerInfo.value.email = props.user.email
  }
  if (props.user?.name) {
    const nameParts = props.user.name.split(' ')
    customerInfo.value.firstName = nameParts[0] || ''
    customerInfo.value.lastName = nameParts.slice(1).join(' ') || ''
  }

  // NEW: Load seller settings to determine pricing
  await loadSellerSettings()

  // Prevent body scroll on mobile and desktop - better approach
  document.body.style.overflow = 'hidden'
  document.body.style.height = '100vh'

  // Store cleanup function
  window.__stripeModalCleanup = () => {
    document.body.style.overflow = originalOverflow
    document.body.style.position = originalPosition
    document.body.style.width = originalWidth
    document.body.style.height = originalHeight
  }

  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  // Restore body scroll using stored cleanup
  if (window.__stripeModalCleanup) {
    window.__stripeModalCleanup()
    delete window.__stripeModalCleanup
  }

  document.removeEventListener('keydown', handleKeydown)
  if (paymentElement.value) {
    paymentElement.value.destroy()
  }
})
</script>

<style scoped>
/* Custom focus styles for inputs using theme color */
.input-focus:focus {
  ring-color: v-bind(themeColor);
  --tw-ring-color: v-bind(themeColor);
}

/* Override Stripe element styling */
.StripeElement {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px;
  background-color: white;
}

.StripeElement--focus {
  border-color: v-bind(themeColor);
  box-shadow: 0 0 0 2px rgba(var(--tw-ring-color), 0.2);
}

/* ADDED: Ensure modal is always visible on mobile */
@media (max-width: 768px) {
  .fixed {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
  }
}
</style>
