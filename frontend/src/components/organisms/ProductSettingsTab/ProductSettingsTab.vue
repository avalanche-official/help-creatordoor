<!-- components/organisms/ProductSettingsTab/ProductSettingsTab.vue -->
<script setup>
import { ref } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Toggle from '@/components/atoms/Toggle/Toggle.vue'
import EditableField from '@/components/molecules/EditableField/EditableField.vue'
import AffiliateSettingsSection from '@/components/molecules/AffiliateSettingsSection/AffiliateSettingsSection.vue'
import CheckoutSettingsSection from '@/components/molecules/CheckoutSettingsSection/CheckoutSettingsSection.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
  saveError: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['save-field'])

// Language options
const languages = [
  { value: 'de', label: 'Deutsch', icon: 'globe' },
  { value: 'en', label: 'English', icon: 'globe' },
  { value: 'fr', label: 'Français', icon: 'globe' },
  { value: 'es', label: 'Español', icon: 'globe' },
]

// Price type options
const priceTypes = [
  { value: 'gross', label: 'Brutto (inkl. MwSt.)', icon: 'dollar-sign' },
  { value: 'net', label: 'Netto (zzgl. MwSt.)', icon: 'dollar-sign' },
]

// Handle save events
const handleSave = (field, value) => {
  emit('save-field', field, value)
}

const handleMarketplaceToggle = (value) => {
  emit('save-field', 'showOnMarketplace', value)
}

const handleAffiliateEnabledToggle = (value) => {
  emit('save-field', 'affiliateSettings.enabled', value)
}

const handleAffiliateCommissionSave = (value) => {
  emit('save-field', 'affiliateSettings.defaultCommission', value)
}

const handleAffiliateAutoApproveSave = (value) => {
  emit('save-field', 'affiliateSettings.autoApprove', value)
}

const handleAffiliateCookieDurationSave = (value) => {
  emit('save-field', 'affiliateSettings.cookieDuration', value)
}
const handleOrderConfirmationSave = (value) => {
  emit('save-field', 'checkoutSettings.orderConfirmationDescription', value)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Save Error -->
    <div
      v-if="saveError"
      class="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
    >
      <Icon name="alert-circle" :size="20" color="var(--color-red-500)" />
      <Text variant="body-default" color="content-primary">{{ saveError }}</Text>
    </div>

    <!-- Basic Settings -->
    <div class="space-y-2">
      <div>
        <Text variant="body-default-bold" color="content-secondary">Grundeinstellungen</Text>
      </div>
      <div class="border-b border-stone-300"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <!-- Internal Name -->
        <EditableField
          label="Interner Name"
          :value="product.productNameInternal || ''"
          type="text"
          placeholder="Interner Name"
          :disabled="isSaving"
          @save="(value) => handleSave('productNameInternal', value)"
        />

        <!-- Slug - Read Only -->
        <div class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Slug</Text>
          <Text variant="body-default">{{ product.slug }}</Text>
        </div>

        <!-- Language -->
        <EditableField
          label="Sprache"
          :value="product.language || 'de'"
          type="dropdown"
          :dropdown-options="languages"
          placeholder="Wähle Sprache"
          :disabled="isSaving"
          :format-value="(val) => val?.toUpperCase() || 'DE'"
          @save="(value) => handleSave('language', value)"
        />

        <!-- Account Type - Read Only -->
        <div class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Account Type</Text>
          <Text variant="body-default">{{ product.accountType }}</Text>
        </div>

        <!-- Price Type -->
        <EditableField
          label="Preistyp"
          :value="product.priceType"
          type="dropdown"
          :dropdown-options="priceTypes"
          placeholder="Wähle Preistyp"
          :disabled="isSaving"
          :format-value="
            (val) => (val === 'gross' ? 'Brutto (inkl. MwSt.)' : 'Netto (zzgl. MwSt.)')
          "
          @save="(value) => handleSave('priceType', value)"
        />

        <!-- Tags - Read Only for now -->
        <div v-if="product.tags && product.tags.length > 0" class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Tags</Text>
          <div class="flex flex-wrap gap-2 mt-1">
            <span
              v-for="tag in product.tags"
              :key="tag"
              class="px-2 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-xs"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Marketplace Settings -->
    <div class="space-y-2">
      <div>
        <Text variant="body-default-bold" color="content-secondary">Marketplace-Einstellungen</Text>
      </div>
      <div class="border-b border-stone-300"></div>

      <div class="py-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <Text variant="body-default-bold" color="content-primary">
              Im Marketplace anzeigen
            </Text>
            <Text variant="body-default" color="content-secondary" class="mt-1">
              Mache dein Produkt öffentlich sichtbar, damit andere es finden und bewerben können
            </Text>
          </div>
          <Toggle
            :model-value="product.showOnMarketplace ?? true"
            :disabled="isSaving"
            @update:model-value="handleMarketplaceToggle"
          />
        </div>
      </div>
    </div>

    <!-- Checkout Settings -->
    <CheckoutSettingsSection
      v-if="product.checkoutSettings && Object.keys(product.checkoutSettings).length > 0"
      :checkout-settings="product.checkoutSettings"
      :disabled="isSaving"
      @update:orderConfirmation="handleOrderConfirmationSave"
    />

    <!-- Affiliate Settings -->
    <AffiliateSettingsSection
      v-if="product.affiliateSettings && Object.keys(product.affiliateSettings).length > 0"
      :affiliate-settings="product.affiliateSettings"
      :disabled="isSaving"
      @update:enabled="handleAffiliateEnabledToggle"
      @update:commission="handleAffiliateCommissionSave"
      @update:autoApprove="handleAffiliateAutoApproveSave"
      @update:cookieDuration="handleAffiliateCookieDurationSave"
    />

    <!-- Images -->
    <div v-if="product.images && product.images.length > 0" class="space-y-2">
      <div>
        <Text variant="body-default-bold" color="content-secondary">Produktbilder</Text>
      </div>
      <div class="border-b border-stone-300"></div>

      <div class="grid grid-cols-3 md:grid-cols-5 gap-3 py-4">
        <div v-if="product.thumbnailUrl" class="relative aspect-square">
          <img
            :src="product.thumbnailUrl"
            alt="Thumbnail"
            class="w-full h-full object-cover rounded-xl border-2 border-primary-purple"
          />
          <div
            class="absolute bottom-1 left-1 px-2 py-0.5 bg-primary-purple text-white text-xs rounded"
          >
            Thumbnail
          </div>
        </div>
        <div v-for="(image, index) in product.images" :key="index" class="relative aspect-square">
          <img :src="image" alt="Product image" class="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </div>

    <!-- Metadata -->
    <div class="space-y-2">
      <div>
        <Text variant="body-default-bold" color="content-secondary">Metadaten</Text>
      </div>
      <div class="border-b border-stone-300"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Produkt-ID</Text>
          <Text variant="body-default" class="font-mono">{{ product.$id }}</Text>
        </div>

        <div class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Erstellt am</Text>
          <Text variant="body-default">
            {{ new Date(product.$createdAt).toLocaleString('de-DE') }}
          </Text>
        </div>

        <div class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Zuletzt aktualisiert</Text>
          <Text variant="body-default">
            {{ new Date(product.$updatedAt).toLocaleString('de-DE') }}
          </Text>
        </div>

        <div class="flex flex-col">
          <Text color="content-secondary" variant="body-default">Benutzer-ID</Text>
          <Text variant="body-default" class="font-mono">{{ product.userId }}</Text>
        </div>
      </div>
    </div>
  </div>
</template>
