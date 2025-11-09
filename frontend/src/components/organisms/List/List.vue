<!-- src/components/organisms/List/List.vue -->
<script setup>
import ListItem from '@/components/molecules/ListItem/ListItem.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // Expected format: [{ value, label, description, descriptionIsHtml?, descriptionColor?, icon, iconImage, iconBgColor?, iconColor?, amount?, bgColor?, actionButton? }]
  },
  spacing: {
    type: String,
    default: '3',
  },
  iconHoverEffect: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

const handleItemClick = (value) => {
  emit('select', value)
}
</script>

<template>
  <div :class="`space-y-${spacing}`">
    <ListItem
      v-for="item in items"
      :key="item.value"
      :title="item.label"
      :description="item.description"
      :description-is-html="item.descriptionIsHtml || false"
      :description-color="item.descriptionColor || 'content-secondary'"
      :icon="item.icon"
      :icon-image="item.iconImage"
      :icon-size="item.iconSize || 22"
      :icon-color="item.iconColor || '#0e0e11'"
      :icon-bg-color="item.iconBgColor || 'bg-stone-100'"
      :icon-hover-effect="iconHoverEffect"
      :amount="item.amount"
      :bg-color="item.bgColor"
      :hover-bg-color="item.hoverBgColor"
      :action-button="item.actionButton"
      :disabled="item.disabled"
      @click="handleItemClick(item.value)"
    />
  </div>
</template>
