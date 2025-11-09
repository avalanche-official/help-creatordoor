<!-- components/molecules/EditableField/EditableField.vue -->
<script setup>
import { ref, watch } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import TextInput from '@/components/organisms/TextInput/TextInput.vue'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  type: {
    type: String,
    default: 'text', // 'text', 'number', 'dropdown'
    validator: (v) => ['text', 'number', 'dropdown'].includes(v),
  },
  dropdownOptions: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
  // Format function for display value
  formatValue: {
    type: Function,
    default: (val) => val || '-',
  },
})

const emit = defineEmits(['save', 'cancel'])

const isEditing = ref(false)
const editValue = ref(props.value)
const isSaving = ref(false)

// Watch for external value changes
watch(
  () => props.value,
  (newValue) => {
    if (!isEditing.value) {
      editValue.value = newValue
    }
  },
)

const startEditing = () => {
  editValue.value = props.value
  isEditing.value = true
}

const cancelEditing = () => {
  editValue.value = props.value
  isEditing.value = false
  emit('cancel')
}

const handleSave = async () => {
  isSaving.value = true
  try {
    await emit('save', editValue.value)
    isEditing.value = false
  } catch (error) {
    console.error('Error saving field:', error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="flex flex-col">
    <!-- Label with Edit Button -->
    <div class="flex items-center justify-between mb-1">
      <Text color="content-secondary" variant="body-default">{{ label }}</Text>
      <button
        v-if="!isEditing && !disabled"
        @click="startEditing"
        class="text-primary-purple hover:text-primary-purple/80 transition-colors"
      >
        <Icon name="edit" :size="16" />
      </button>
    </div>

    <!-- Edit Mode -->
    <div v-if="isEditing">
      <!-- Text Input -->
      <TextInput
        v-if="type === 'text'"
        v-model="editValue"
        :placeholder="placeholder"
        :disabled="isSaving"
      />

      <!-- Number Input -->
      <TextInput
        v-else-if="type === 'number'"
        v-model="editValue"
        type="number"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :disabled="isSaving"
      />

      <!-- Dropdown -->
      <Dropdown
        v-else-if="type === 'dropdown'"
        v-model="editValue"
        :options="dropdownOptions"
        :placeholder="placeholder"
        :disabled="isSaving"
      />

      <!-- Action Buttons -->
      <div class="flex gap-2 mt-2">
        <Button variant="primary" size="small" :disabled="isSaving" @click="handleSave">
          {{ isSaving ? 'Speichern...' : 'Speichern' }}
        </Button>
        <Button variant="secondary" size="small" :disabled="isSaving" @click="cancelEditing">
          Abbrechen
        </Button>
      </div>
    </div>

    <!-- Display Mode -->
    <Text v-else variant="body-default">{{ formatValue(value) }}</Text>
  </div>
</template>
