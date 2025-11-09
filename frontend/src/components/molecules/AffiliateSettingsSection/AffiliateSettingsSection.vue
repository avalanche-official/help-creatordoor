<!-- components/molecules/AffiliateSettingsSection/AffiliateSettingsSection.vue -->
<script setup>
import { ref } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Toggle from '@/components/atoms/Toggle/Toggle.vue'
import EditableField from '@/components/molecules/EditableField/EditableField.vue'

const props = defineProps({
  affiliateSettings: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:enabled',
  'update:commission',
  'update:autoApprove',
  'update:cookieDuration',
])

const handleEnabledChange = (value) => {
  emit('update:enabled', value)
}

const handleCommissionSave = (value) => {
  emit('update:commission', value)
}

const handleAutoApproveSave = (value) => {
  emit('update:autoApprove', value)
}

const handleCookieDurationSave = (value) => {
  emit('update:cookieDuration', value)
}
</script>

<template>
  <div class="space-y-2">
    <div>
      <Text variant="body-default-bold" color="content-secondary">Affiliate-Einstellungen</Text>
    </div>
    <div class="border-b border-stone-300"></div>

    <div class="space-y-4 py-4">
      <!-- Enable Affiliate Program Toggle -->
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <Text variant="body-default-bold" color="content-primary">
            Affiliate-Programm aktiv
          </Text>
          <Text variant="body-default" color="content-secondary" class="mt-1">
            Erlaube anderen, dein Produkt zu bewerben und Provisionen zu verdienen
          </Text>
        </div>
        <Toggle
          :model-value="affiliateSettings.enabled ?? true"
          :disabled="disabled"
          @update:model-value="handleEnabledChange"
        />
      </div>

      <!-- Affiliate Details (shown when enabled) -->
      <div
        v-if="affiliateSettings.enabled"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-2 border-primary-purple/30 ml-2"
      >
        <!-- Default Commission -->
        <EditableField
          label="Standard-Provision (%)"
          :value="affiliateSettings.defaultCommission || 0"
          type="number"
          :min="0"
          :max="100"
          placeholder="80"
          :disabled="disabled"
          :format-value="(val) => `${val}%`"
          @save="handleCommissionSave"
        />

        <!-- Auto-Approve Toggle -->
        <div class="flex flex-col justify-between">
          <Text color="content-secondary" variant="body-default" class="mb-2">
            Auto-Genehmigung
          </Text>
          <div class="flex items-center gap-3">
            <Text variant="body-default">
              {{ affiliateSettings.autoApprove ? 'Ja' : 'Nein' }}
            </Text>
            <Toggle
              :model-value="affiliateSettings.autoApprove ?? false"
              :disabled="disabled"
              @update:model-value="handleAutoApproveSave"
            />
          </div>
        </div>

        <!-- Cookie Duration -->
        <EditableField
          v-if="affiliateSettings.cookieDuration"
          label="Cookie-Laufzeit (Tage)"
          :value="affiliateSettings.cookieDuration || 30"
          type="number"
          :min="1"
          :max="365"
          placeholder="30"
          :disabled="disabled"
          :format-value="(val) => `${val} Tage`"
          @save="handleCookieDurationSave"
        />
      </div>
    </div>
  </div>
</template>
