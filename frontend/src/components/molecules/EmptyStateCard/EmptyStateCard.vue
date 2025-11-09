<!-- components/molecules/EmptyStateCard/EmptyStateCard.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountTypeStore } from '@/stores/accountTypeStore'
import { useProductCreationStore } from '@/stores/productCreationStore'
import Card from '@/components/atoms/Card/Card.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

const props = defineProps({
  // Allow manual override of content
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  // ✅ NEW: Accept loading prop from parent
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const router = useRouter()
const accountTypeStore = useAccountTypeStore()
const productStore = useProductCreationStore()

// ✅ Internal loading state
const internalLoading = ref(false)

// ✅ Combined loading state (external OR internal)
const isLoading = computed(() => props.loading || internalLoading.value)

// Dynamic content based on account type
const content = computed(() => {
  // If props are provided, use them (manual override)
  if (props.title && props.description) {
    return {
      title: props.title,
      description: props.description,
      icon: props.icon || 'plus',
    }
  }

  // Otherwise, use account type specific content
  const accountType = accountTypeStore.selectedAccountType

  const contentMap = {
    vendor: {
      title: 'Neu',
      description: 'Erstelle jetzt ein neues Produkt um Geld zu verdienen',
      icon: 'plus',
      route: '/products/create',
    },
    creator: {
      title: 'Neu',
      description: 'Erstelle ein digitales Produkt oder Download',
      icon: 'plus',
      route: '/products/create',
    },
    affiliate: {
      title: 'Marktplatz',
      description: 'Entdecke Produkte zum Bewerben und verdiene Provisionen',
      icon: 'store',
      route: '/dashboard/marketplace',
    },
  }

  return contentMap[accountType] || contentMap.vendor
})

const handleClick = async () => {
  // Prevent double clicks
  if (isLoading.value) return

  internalLoading.value = true

  // ✅ Add delay so spinner is visible
  await new Promise((resolve) => setTimeout(resolve, 300))

  try {
    // If custom click handler provided via prop override, use it
    if (props.title && props.description) {
      emit('click')
      return
    }

    // ✅ Reset product store before navigating to create
    if (content.value.route === '/products/create') {
      productStore.resetStore()
    }

    // Navigate based on account type
    if (content.value.route) {
      await router.push(content.value.route)
    } else {
      emit('click')
    }
  } catch (error) {
    console.error('Navigation error:', error)
    internalLoading.value = false
  }
}
</script>

<template>
  <Card
    variant="dashed"
    :clickable="!isLoading"
    class="h-50 p-4 flex flex-col justify-between relative"
    :class="{ 'opacity-75 cursor-not-allowed': isLoading }"
    @click="handleClick"
  >
    <!-- ✅ Loading Overlay -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl z-10"
    >
      <Spinner size="medium" />
    </div>

    <!-- Top: Icon + Title -->
    <div class="flex items-center gap-2">
      <IconButton
        :icon="content.icon"
        variant="darkNeutral"
        size="large"
        aria-label="Add new"
        :group-hover="true"
        :disabled="isLoading"
        @click.stop="handleClick"
      />
      <Text variant="body-large-bold" color="content-secondary">
        {{ content.title }}
      </Text>
    </div>

    <!-- Bottom: Description -->
    <Text variant="body-default" color="content-secondary" class="mt-auto">
      {{ content.description }}
    </Text>
  </Card>
</template>
