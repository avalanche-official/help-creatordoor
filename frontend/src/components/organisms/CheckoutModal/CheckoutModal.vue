<script setup>
import { ref, computed, watch } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Image from '@/components/atoms/Image/Image.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'
import TextInput from '@/components/molecules/TextInput/TextInput.vue'
import CountrySelector from '@/components/molecules/CountrySelector/CountrySelector.vue'
import { stripePaymentService } from '@/services/stripe/stripePaymentService'
import { getAffiliateCookie } from '@/utils/affiliateTracking'
import { convertCurrency } from '@/utils/currencyConverter'
import { CONFIG, functions } from '@/lib/appwrite'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  show: Boolean,
  product: Object,
  seller: Object,
})

const emit = defineEmits(['close', 'success', 'error'])

// State
const currentStep = ref(1)
const isLoading = ref(false)
const isProcessing = ref(false)
const errorMessage = ref('')
const isCalculatingTax = ref(false)
const taxInfo = ref(null)
const agbAccepted = ref(false)

// ✅ Currency conversion state
const isConvertingCurrency = ref(false)
const convertedPrice = ref(null)
const targetCurrency = ref(null)
const conversionRate = ref(1)

// Customer Information
const customerInfo = ref({
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'ch',
})

// Stripe
const stripe = ref(null)
const elements = ref(null)
const cardElement = ref(null)
const paymentElement = ref(null)

let taxCalculationTimeout = null

// ✅ Map country code to currency
const countryCurrencyMap = {
  ch: 'CHF',
  de: 'EUR',
  at: 'EUR',
  fr: 'EUR',
  it: 'EUR',
  es: 'EUR',
  nl: 'EUR',
  be: 'EUR',
  pt: 'EUR',
  ie: 'EUR',
  fi: 'EUR',
  ee: 'EUR',
  lv: 'EUR',
  lt: 'EUR',
  sk: 'EUR',
  si: 'EUR',
  gr: 'EUR',
  cy: 'EUR',
  mt: 'EUR',
  lu: 'EUR',
  us: 'USD',
  ca: 'CAD',
  gb: 'GBP',
  jp: 'JPY',
  au: 'AUD',
  nz: 'NZD',
  se: 'SEK',
  no: 'NOK',
  dk: 'DKK',
  pl: 'PLN',
  cz: 'CZK',
  hu: 'HUF',
  ro: 'RON',
  bg: 'BGN',
  hr: 'HRK',
  is: 'ISK',
  mx: 'MXN',
  br: 'BRL',
  sg: 'SGD',
  hk: 'HKD',
  tw: 'TWD',
  kr: 'KRW',
  th: 'THB',
  my: 'MYR',
  id: 'IDR',
  ph: 'PHP',
  vn: 'VND',
  in: 'INR',
  ae: 'AED',
  sa: 'SAR',
  za: 'ZAR',
  tr: 'TRY',
  il: 'ILS',
}

// ✅ Get currency for selected country
const getCurrencyForCountry = (countryCode) => {
  return countryCurrencyMap[countryCode.toLowerCase()] || 'EUR'
}

// ✅ Watch country changes and convert currency
watch(
  () => customerInfo.value.country,
  async (newCountry) => {
    if (!newCountry) return

    const newCurrency = getCurrencyForCountry(newCountry)
    const productCurrency = props.product.currency || 'EUR'

    console.log('🌍 Country changed:', newCountry)
    console.log('💱 Target currency:', newCurrency)

    // If same currency, no conversion needed
    if (productCurrency.toUpperCase() === newCurrency.toUpperCase()) {
      console.log('✅ Same currency, no conversion needed')
      convertedPrice.value = props.product.price
      targetCurrency.value = productCurrency
      conversionRate.value = 1
      return
    }

    // Convert currency
    isConvertingCurrency.value = true
    try {
      const conversion = await convertCurrency(props.product.price, productCurrency, newCurrency)

      convertedPrice.value = conversion.convertedAmount
      targetCurrency.value = newCurrency
      conversionRate.value = conversion.rate

      console.log('✅ Currency converted:', {
        from: `${productCurrency} ${props.product.price}`,
        to: `${newCurrency} ${conversion.convertedAmount.toFixed(2)}`,
        rate: conversion.rate.toFixed(4),
      })
    } catch (error) {
      console.error('❌ Currency conversion failed:', error)
      // Fallback to original
      convertedPrice.value = props.product.price
      targetCurrency.value = productCurrency
      conversionRate.value = 1
    } finally {
      isConvertingCurrency.value = false
    }
  },
  { immediate: true }, // Run on mount
)

// ✅ AUTO-DETECT COUNTRY FROM ZIP CODE
watch(
  () => customerInfo.value.zip,
  (newZip) => {
    if (!newZip) return

    if (/^\d{4}$/.test(newZip)) {
      customerInfo.value.country = 'ch'
      console.log('🇨🇭 Auto-detected Switzerland from ZIP:', newZip)
    } else if (/^\d{5}$/.test(newZip)) {
      customerInfo.value.country = 'de'
      console.log('🇩🇪 Auto-detected Germany from ZIP:', newZip)
    } else if (/^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/i.test(newZip)) {
      customerInfo.value.country = 'gb'
      console.log('🇬🇧 Auto-detected UK from postcode:', newZip)
    } else if (/^\d{5}(-\d{4})?$/.test(newZip)) {
      customerInfo.value.country = 'us'
      console.log('🇺🇸 Auto-detected USA from ZIP:', newZip)
    } else if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(newZip)) {
      customerInfo.value.country = 'ca'
      console.log('🇨🇦 Auto-detected Canada from postal code:', newZip)
    }
  },
)

// ✅ Calculate tax when address changes (ONLY for NET pricing)
const calculateTax = async () => {
  if (props.product.priceType !== 'net') {
    console.log('⏭️ Skipping tax calculation - GROSS pricing (tax included)')
    taxInfo.value = null
    return
  }

  if (
    !customerInfo.value.address ||
    !customerInfo.value.city ||
    !customerInfo.value.zip ||
    !customerInfo.value.country
  ) {
    taxInfo.value = null
    return
  }

  isCalculatingTax.value = true

  try {
    console.log('🧾 Calculating tax for NET pricing:', {
      city: customerInfo.value.city,
      zip: customerInfo.value.zip,
      country: customerInfo.value.country.toUpperCase(),
    })

    // ✅ Use converted price for tax calculation
    const finalPrice = convertedPrice.value || props.product.price
    const finalCurrency = targetCurrency.value || props.product.currency || 'CHF'
    const amount = Math.round(finalPrice * 100)

    const response = await functions.createExecution(
      CONFIG.stripeFunctionId,
      JSON.stringify({
        action: 'calculate_tax',
        amount: amount,
        currency: finalCurrency,
        productId: props.product.$id,
        customerAddress: {
          line1: customerInfo.value.address,
          city: customerInfo.value.city,
          state: customerInfo.value.state,
          postal_code: customerInfo.value.zip,
          country: customerInfo.value.country.toUpperCase(),
        },
      }),
      false,
    )

    const result = JSON.parse(response.responseBody)

    if (result.success && result.taxCalculation) {
      taxInfo.value = result.taxCalculation
      console.log('✅ Tax calculated:', {
        tax: taxInfo.value.taxAmount,
        rate: taxInfo.value.taxRate + '%',
        total: taxInfo.value.totalAmount,
      })
    } else {
      console.error('❌ Tax calculation failed:', result.message)
      taxInfo.value = null
    }
  } catch (error) {
    console.error('❌ Tax calculation error:', error)
    taxInfo.value = null
  } finally {
    isCalculatingTax.value = false
  }
}

// ✅ Watch address changes and recalculate tax (ONLY for NET)
watch(
  () => [
    customerInfo.value.address,
    customerInfo.value.city,
    customerInfo.value.zip,
    customerInfo.value.country,
  ],
  () => {
    if (props.product.priceType !== 'net') return

    clearTimeout(taxCalculationTimeout)
    taxCalculationTimeout = setTimeout(() => {
      calculateTax()
    }, 800)
  },
  { deep: true },
)

// ✅ Price display with converted currency
const priceDisplay = computed(() => {
  const basePrice = convertedPrice.value || props.product.price
  const currency = targetCurrency.value || props.product.currency || 'CHF'
  const priceType = props.product.priceType || 'gross'

  // ✅ GROSS pricing (tax already included)
  if (priceType === 'gross') {
    return {
      amount: basePrice,
      baseAmount: basePrice,
      currency: currency,
      type: 'gross',
      label: 'inkl. MwSt.',
      showTaxLine: false,
    }
  }

  // ✅ NET pricing WITH calculated tax
  if (taxInfo.value) {
    return {
      amount: taxInfo.value.totalAmount,
      baseAmount: basePrice,
      taxAmount: taxInfo.value.taxAmount,
      taxRate: parseFloat(taxInfo.value.taxRate) || 0,
      currency: currency,
      type: 'net',
      label: `+ ${taxInfo.value.taxAmount.toFixed(2)} ${currency} MwSt.`,
      showTaxLine: true,
    }
  }

  // ✅ NET pricing BEFORE address entered
  return {
    amount: basePrice,
    baseAmount: basePrice,
    currency: currency,
    type: 'net',
    label: 'zzgl. MwSt.',
    disclaimer: 'MwSt. wird nach Adresseingabe berechnet',
    showTaxLine: false,
  }
})

// ✅ Validation
const isStep1Valid = computed(() => {
  const hasBasicInfo =
    customerInfo.value.email &&
    customerInfo.value.email.includes('@') &&
    customerInfo.value.firstName.trim() &&
    customerInfo.value.lastName.trim() &&
    agbAccepted.value

  if (props.product.priceType === 'net') {
    return (
      hasBasicInfo &&
      customerInfo.value.address.trim() &&
      customerInfo.value.city.trim() &&
      customerInfo.value.zip.trim() &&
      customerInfo.value.country &&
      !isConvertingCurrency.value // ✅ Wait for conversion to finish
    )
  }

  return hasBasicInfo && !isConvertingCurrency.value
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceDisplay.value.amount)
})

const formattedBasePrice = computed(() => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceDisplay.value.baseAmount)
})

const modalTitle = computed(() => {
  if (currentStep.value === 1) {
    return 'Kundendaten'
  }
  return 'Zahlung abschliessen'
})

// Methods
const handleClose = () => {
  if (!isProcessing.value) {
    emit('close')
    resetForm()
  }
}

const handleBack = () => {
  if (currentStep.value === 2) {
    currentStep.value = 1
    errorMessage.value = ''
  } else {
    handleClose()
  }
}

const handlePrimary = async () => {
  if (currentStep.value === 1) {
    await proceedToPayment()
  } else if (currentStep.value === 2) {
    await handlePayment()
  }
}

const proceedToPayment = async () => {
  if (!isStep1Valid.value) {
    errorMessage.value = 'Bitte fülle alle Pflichtfelder aus'
    return
  }

  errorMessage.value = ''
  isLoading.value = true

  try {
    if (!stripe.value || !elements.value) {
      await initializeStripe()
    }
    currentStep.value = 2
  } catch (error) {
    console.error('Error proceeding to payment:', error)
    errorMessage.value = 'Fehler beim Laden des Zahlungsformulars'
  } finally {
    isLoading.value = false
  }
}

const initializeStripe = async () => {
  try {
    console.log('🎯 Initializing Stripe...')

    stripe.value = await loadStripe(CONFIG.stripePublishableKey)

    if (!stripe.value) {
      throw new Error('Failed to load Stripe')
    }

    let affiliateLinkId = localStorage.getItem('affiliate_ref') || getAffiliateCookie()

    if (affiliateLinkId) {
      const timestamp = localStorage.getItem('affiliate_timestamp')
      if (timestamp) {
        const age = Date.now() - parseInt(timestamp)
        const maxAge = 30 * 24 * 60 * 60 * 1000

        if (age > maxAge) {
          console.log('⚠️ Affiliate ref expired, clearing...')
          localStorage.removeItem('affiliate_ref')
          localStorage.removeItem('affiliate_timestamp')
          affiliateLinkId = null
        }
      }
    }

    // ✅ Use converted price and target currency
    const finalPrice = convertedPrice.value || props.product.price
    const finalCurrency = targetCurrency.value || props.product.currency || 'CHF'
    const amount = Math.round(finalPrice * 100)

    console.log('💳 Creating payment intent...')
    console.log('💰 Currency:', finalCurrency)
    console.log('💰 Price:', finalPrice)
    console.log('💰 Amount (cents):', amount)

    const paymentIntentData = await stripePaymentService.createPaymentIntent({
      productId: props.product.$id,
      productName: props.product.productName,
      productPrice: finalPrice,
      productCategory: props.product.category || '',
      sellerId: props.seller.$id,
      sellerName: props.seller.username || props.seller.email,
      sellerEmail: props.seller.email,
      sellerStripeAccountId: props.seller.stripeAccountId,
      amount: amount,
      currency: finalCurrency.toUpperCase(),
      returnUrl: `${window.location.origin}/payment/success`,
      affiliateLinkId: affiliateLinkId || null,
      customerAddress: {
        line1: customerInfo.value.address || '',
        line2: null,
        city: customerInfo.value.city || '',
        state: customerInfo.value.state || '',
        postal_code: customerInfo.value.zip || '',
        country: customerInfo.value.country.toUpperCase() || 'CH',
      },
      taxCalculationId: props.product.priceType === 'net' ? taxInfo.value?.id || null : null,
    })

    if (!paymentIntentData.success) {
      throw new Error(paymentIntentData.error)
    }

    console.log('✅ Payment intent created:', paymentIntentData.paymentIntentId)
    console.log('💵 Payment will be charged in:', finalCurrency)

    if (paymentIntentData.taxCalculation) {
      taxInfo.value = paymentIntentData.taxCalculation
    }

    elements.value = stripe.value.elements({
      clientSecret: paymentIntentData.clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#8B5CF6',
          colorBackground: '#ffffff',
          colorText: '#1c1917',
          colorDanger: '#ef4444',
          fontFamily: 'system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '12px',
        },
      },
    })

    console.log('✅ Stripe Elements initialized')
  } catch (error) {
    console.error('❌ Stripe initialization error:', error)
    throw error
  }
}

const mountPaymentElement = () => {
  if (!cardElement.value || !elements.value) {
    console.error('Cannot mount: cardElement or elements not ready')
    return
  }

  if (paymentElement.value) {
    console.log('✅ Payment element already mounted')
    return
  }

  try {
    paymentElement.value = elements.value.create('payment', {
      layout: 'tabs',
    })

    paymentElement.value.mount(cardElement.value)
    console.log('✅ Payment element mounted')

    paymentElement.value.on('change', (event) => {
      if (event.error) {
        errorMessage.value = event.error.message
      } else {
        errorMessage.value = ''
      }
    })
  } catch (error) {
    console.error('Error mounting payment element:', error)
    errorMessage.value = 'Fehler beim Laden des Zahlungsformulars'
  }
}

const handlePayment = async () => {
  if (!stripe.value || !elements.value) {
    errorMessage.value = 'Zahlungssystem nicht bereit'
    return
  }

  if (!paymentElement.value) {
    errorMessage.value = 'Zahlungsformular noch nicht geladen'
    return
  }

  isProcessing.value = true
  errorMessage.value = ''

  try {
    console.log('💳 Processing payment...')

    const productSlug = props.product.slug || props.product.$id

    const { error, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?product_slug=${productSlug}`,
        receipt_email: customerInfo.value.email,
        payment_method_data: {
          billing_details: {
            name: `${customerInfo.value.firstName} ${customerInfo.value.lastName}`,
            email: customerInfo.value.email,
            address: {
              line1: customerInfo.value.address || '',
              city: customerInfo.value.city || '',
              state: customerInfo.value.state || '',
              postal_code: customerInfo.value.zip || '',
              country: customerInfo.value.country.toUpperCase() || 'CH',
            },
          },
        },
      },
      redirect: 'if_required',
    })

    if (error) {
      console.error('❌ Payment failed:', error)

      let statusParam = 'error'

      if (error.code === 'card_declined') {
        statusParam = 'card_declined'
        if (error.decline_code === 'insufficient_funds') {
          statusParam = 'insufficient_funds'
        }
      } else if (error.type === 'validation_error') {
        statusParam = 'cancelled'
      } else if (error.code === 'payment_intent_authentication_failure') {
        statusParam = 'authentication_failed'
      }

      window.location.href = `/payment/success?payment_intent=${error.payment_intent?.id || 'unknown'}&redirect_status=failed&error_type=${statusParam}&product_slug=${productSlug}`

      errorMessage.value = error.message
      emit('error', error)
      return
    }

    if (paymentIntent) {
      console.log('💳 Payment Intent Status:', paymentIntent.status)

      switch (paymentIntent.status) {
        case 'succeeded':
          console.log('✅ Payment succeeded:', paymentIntent)
          window.location.href = `/payment/success?payment_intent=${paymentIntent.id}&redirect_status=succeeded&product_slug=${productSlug}`
          emit('success', { paymentIntent })
          break

        case 'processing':
          console.log('⏳ Payment processing:', paymentIntent)
          window.location.href = `/payment/success?payment_intent=${paymentIntent.id}&redirect_status=processing&product_slug=${productSlug}`
          break

        case 'canceled':
          console.log('❌ Payment was cancelled by user')
          window.location.href = `/payment/success?payment_intent=${paymentIntent.id}&redirect_status=failed&error_type=cancelled&product_slug=${productSlug}`
          break

        case 'requires_action':
          console.log('🔄 Payment requires action')
          errorMessage.value = 'Bitte schließe die Zahlung ab'
          isProcessing.value = false
          break

        case 'requires_payment_method':
          console.log('💳 Payment requires payment method')
          errorMessage.value = 'Bitte gib deine Zahlungsdaten ein'
          isProcessing.value = false
          break

        default:
          console.log('⚠️ Unexpected payment status:', paymentIntent.status)
          errorMessage.value = 'Zahlung konnte nicht abgeschlossen werden'
          isProcessing.value = false
      }
    }
  } catch (error) {
    console.error('❌ Payment processing error:', error)
    errorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten'
    emit('error', error)
  }
}

const resetForm = () => {
  if (paymentElement.value) {
    paymentElement.value.unmount()
    paymentElement.value = null
  }

  currentStep.value = 1
  customerInfo.value = {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'ch',
  }
  agbAccepted.value = false
  errorMessage.value = ''
  taxInfo.value = null
  convertedPrice.value = null
  targetCurrency.value = null
  conversionRate.value = 1
  stripe.value = null
  elements.value = null
}

watch(
  () => currentStep.value,
  async (newStep) => {
    if (newStep === 2) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      mountPaymentElement()
    }
  },
)
</script>

<template>
  <Modal
    :show="show"
    :title="modalTitle"
    :show-close-button="!isProcessing"
    :show-back-button="true"
    :back-button-text="currentStep === 2 ? 'Zurück' : 'Abbrechen'"
    :show-primary-button="true"
    :primary-button-text="currentStep === 1 ? 'Weiter zur Zahlung' : 'Jetzt bezahlen'"
    :primary-button-disabled="(currentStep === 1 && !isStep1Valid) || isProcessing"
    :primary-button-loading="isProcessing"
    max-width="lg"
    @close="handleClose"
    @back="handleBack"
    @primary="handlePrimary"
  >
    <!-- Step 1: Customer Information -->
    <div v-if="currentStep === 1" class="space-y-6">
      <!-- ✅ Price Summary with currency conversion -->
      <div class="bg-stone-50 rounded-2xl p-4">
        <div class="space-y-3">
          <!-- Product Info -->
          <div class="flex items-start gap-4">
            <div v-if="product.thumbnailUrl" class="flex-shrink-0">
              <Image
                :src="product.thumbnailUrl"
                :alt="product.productName"
                width="60px"
                height="60px"
                object-fit="cover"
                class="rounded-xl"
              />
            </div>
            <div class="flex-1">
              <Text variant="body-default-bold" color="content-primary">
                {{ product.productName }}
              </Text>
              <Text variant="body-default" color="content-secondary">
                Von {{ seller.username || seller.email }}
              </Text>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-stone-200"></div>

          <!-- ✅ Price Breakdown -->
          <div class="space-y-2">
            <!-- ✅ Currency converting indicator -->
            <div v-if="isConvertingCurrency" class="flex justify-between items-center">
              <Text variant="body-default" color="content-secondary">
                Preis wird umgerechnet...
              </Text>
              <Spinner size="sm" />
            </div>

            <!-- ✅ Price after conversion -->
            <div v-else>
              <!-- Base Price -->
              <div class="flex justify-between">
                <Text variant="body-default" color="content-secondary"> Preis </Text>
                <Text variant="body-default-bold" color="content-primary">
                  {{ priceDisplay.currency }} {{ formattedBasePrice }}
                </Text>
              </div>

              <!-- ✅ Show original price if converted -->
              <div
                v-if="targetCurrency && targetCurrency !== product.currency"
                class="flex justify-between"
              >
                <Text variant="body-default" color="content-tertiary"> Original </Text>
                <Text variant="body-default" color="content-tertiary">
                  {{ product.currency }} {{ product.price.toFixed(2) }}
                </Text>
              </div>

              <!-- Tax Line (calculated or calculating) -->
              <div v-if="priceDisplay.showTaxLine" class="flex justify-between">
                <Text variant="body-default" color="content-secondary">
                  MwSt. ({{ priceDisplay.taxRate.toFixed(1) }}%)
                </Text>
                <Text variant="body-default-bold" color="content-primary">
                  + {{ priceDisplay.currency }} {{ priceDisplay.taxAmount.toFixed(2) }}
                </Text>
              </div>

              <!-- Tax Calculating -->
              <div
                v-else-if="isCalculatingTax && priceDisplay.type === 'net'"
                class="flex justify-between items-center"
              >
                <Text variant="body-default" color="content-secondary">
                  MwSt. wird berechnet...
                </Text>
                <Spinner size="sm" />
              </div>

              <!-- Tax Note -->
              <div v-else-if="priceDisplay.disclaimer" class="flex justify-between">
                <Text variant="body-default" color="content-tertiary">
                  {{ priceDisplay.disclaimer }}
                </Text>
              </div>

              <!-- Divider -->
              <div class="border-t border-stone-200 pt-2">
                <div class="flex justify-between items-center">
                  <Text variant="body-default-bold" color="content-primary"> Total </Text>
                  <Text variant="title-body" color="primary-purple">
                    {{ priceDisplay.currency }} {{ formattedPrice }}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Form -->
      <div class="space-y-4">
        <TextInput
          v-model="customerInfo.email"
          type="email"
          label="E-Mail-Adresse"
          placeholder="deine@email.com"
          description="Kaufbestätigung wird an diese Adresse gesendet"
          required
        />

        <div class="grid grid-cols-2 gap-4">
          <TextInput
            v-model="customerInfo.firstName"
            type="text"
            label="Vorname"
            placeholder="Max"
            required
          />
          <TextInput
            v-model="customerInfo.lastName"
            type="text"
            label="Nachname"
            placeholder="Mustermann"
            required
          />
        </div>

        <TextInput
          v-model="customerInfo.company"
          type="text"
          label="Firma (optional)"
          placeholder="Musterfirma AG"
        />

        <TextInput
          v-model="customerInfo.address"
          type="text"
          label="Adresse*"
          placeholder="Musterstrasse 1"
          required
        />

        <div class="grid grid-cols-2 gap-4">
          <TextInput
            v-model="customerInfo.zip"
            type="text"
            label="PLZ*"
            placeholder="8001"
            required
          />
          <TextInput
            v-model="customerInfo.city"
            type="text"
            label="Stadt*"
            placeholder="Zürich"
            required
          />
        </div>

        <!-- ✅ Country Selector - triggers currency conversion -->
        <div class="grid grid-cols-1 gap-4">
          <CountrySelector
            v-model="customerInfo.country"
            label="Land*"
            placeholder="Land wählen"
            description="Der Preis wird automatisch in die Landeswährung umgerechnet"
          />
        </div>
      </div>

      <!-- AGB Checkbox -->
      <div class="flex items-start gap-3 p-4 bg-stone-50 rounded-xl">
        <input
          id="agb-checkbox"
          v-model="agbAccepted"
          type="checkbox"
          class="mt-1 h-4 w-4 text-violet-600 focus:ring-violet-500 border-stone-300 rounded cursor-pointer"
        />
        <label for="agb-checkbox" class="cursor-pointer">
          <Text variant="body-default" color="content-primary">
            Ich habe die
            <a
              href="/agb"
              target="_blank"
              class="text-violet-600 hover:text-violet-700 underline font-medium"
            >
              Allgemeinen Geschäftsbedingungen (AGB)
            </a>
            gelesen und akzeptiere diese.*
          </Text>
        </label>
      </div>
    </div>

    <!-- Step 2: Payment -->
    <div v-else-if="currentStep === 2" class="space-y-6">
      <!-- Customer Summary -->
      <div class="bg-stone-50 rounded-2xl p-4">
        <div class="space-y-2">
          <div>
            <Text variant="body-default-bold" color="content-primary">
              {{ customerInfo.firstName }} {{ customerInfo.lastName }}
            </Text>
            <Text variant="body-default" color="content-secondary">
              {{ customerInfo.email }}
            </Text>
            <Text v-if="customerInfo.company" variant="body-default" color="content-secondary">
              {{ customerInfo.company }}
            </Text>
          </div>

          <div class="border-t border-stone-200 pt-2">
            <div class="flex justify-between items-center">
              <Text variant="body-default-bold" color="content-primary"> Gesamtbetrag </Text>
              <div class="text-right">
                <Text variant="title-body" color="primary-purple">
                  {{ priceDisplay.currency }} {{ formattedPrice }}
                </Text>
                <Text
                  v-if="taxInfo && priceDisplay.showTaxLine"
                  variant="body-default"
                  color="content-tertiary"
                >
                  inkl. {{ priceDisplay.currency }} {{ taxInfo.taxAmount.toFixed(2) }} MwSt. ({{
                    parseFloat(taxInfo.taxRate).toFixed(1)
                  }}%)
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3">
          Zahlungsinformationen
        </Text>

        <div v-if="isLoading" class="flex justify-center py-12">
          <Spinner />
        </div>

        <div v-else ref="cardElement" class="p-4 border border-stone-300 rounded-xl"></div>
      </div>

      <!-- Security Info -->
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Icon name="shield-check" color="text-green-700" />
          <Text variant="body-default" color="content-secondary">
            Sichere Zahlung über Stripe
          </Text>
        </div>

        <div class="flex items-center gap-2">
          <Icon name="lock" color="text-green-700" />
          <Text variant="body-default" color="content-secondary"> SSL Verschlüsselung </Text>
        </div>

        <div v-if="priceDisplay.type === 'net'" class="flex items-center gap-2">
          <Icon name="info" color="text-blue-700" />
          <Text variant="body-default" color="content-secondary">
            MwSt. automatisch berechnet für {{ customerInfo.country.toUpperCase() }}
          </Text>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
      <Text variant="body-default" color="sentiment-negative">
        {{ errorMessage }}
      </Text>
    </div>
  </Modal>
</template>
