<!-- components/organisms/PanelHeader/PanelHeader.vue -->
<!-- ✅ UPDATED: Uses Chip component for VIP badge -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import ChipDropdown from '@/components/molecules/ChipDropdown/ChipDropdown.vue'
import Chip from '@/components/molecules/Chip/Chip.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'

const props = defineProps({
  chipLabel: {
    type: String,
    default: 'Vendor',
  },
  chipOptions: {
    type: Array,
    default: () => [
      { value: 'vendor', label: 'Vendor', icon: 'shield-user' },
      { value: 'affiliate', label: 'Affiliate', icon: 'user' },
    ],
  },
  selectedAccountType: {
    type: String,
    default: 'vendor',
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  backRoute: {
    type: String,
    default: '/dashboard',
  },
})

const emit = defineEmits(['account-type-change'])

const router = useRouter()
const authStore = useAuthStore()

// ✅ State
const showVipModal = ref(false)

// ✅ Real user data from auth store
const userName = computed(() => authStore.user?.name || 'User')
const userAvatar = computed(() => authStore.user?.prefs?.avatarUrl || null)

// ✅ Check if user is Motomation VIP
const isMotomationVIP = computed(() => authStore.user?.prefs?.motomationVIP === true)

// ✅ Generate initials from name
const userInitials = computed(() => {
  const name = userName.value
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const handleUserClick = () => {
  router.push('/dashboard/settings')
}

const handleBack = () => {
  router.push(props.backRoute)
}

const handleChipAction = (option) => {
  console.log('💫 Account type selected:', option.value)
  emit('account-type-change', option)
}

const handleVipBadgeClick = () => {
  showVipModal.value = true
}

const handleVipModalClose = () => {
  showVipModal.value = false
}
</script>

<template>
  <header class="flex items-center justify-between gap-3 mb-10 pb-3">
    <!-- Left: Back Button (optional) -->
    <div>
      <IconButton
        v-if="showBack"
        icon="arrow-left"
        variant="neutral"
        size="large"
        aria-label="Back"
        @click="handleBack"
      />
    </div>

    <!-- Right: Motomation VIP Badge + Chip + User -->
    <div class="flex items-center gap-3">
      <!-- ✅ Day One Motomation VIP Badge using Chip component -->
      <div v-if="isMotomationVIP" class="relative">
        <Chip
          label="Day One VIP"
          icon="star"
          icon-position="left"
          variant="outlined"
          custom-color="linear-gradient(135deg, #9333ea 0%, #db2777 100%)"
          size="small"
          @click="handleVipBadgeClick"
        />

        <!-- Sparkle effect overlay -->
        <div
          class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping pointer-events-none"
        ></div>
      </div>

      <!-- ChipDropdown with animated chevron -->
      <ChipDropdown
        :model-value="selectedAccountType"
        icon="chevron-down"
        icon-position="right"
        :label="chipLabel"
        variant="primary"
        size="small"
        :options="chipOptions"
        dropdown-position="center"
        dropdown-width="200px"
        @select="handleChipAction"
      />

      <!-- User item (compact) with group hover -->
      <button
        type="button"
        class="group flex items-center gap-2 px-1 py-1 pr-2 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
        @click="handleUserClick"
      >
        <!-- ✅ Avatar with src if available, otherwise initials -->
        <Avatar
          :initials="userInitials"
          :src="userAvatar"
          size="medium"
          backgroundColor="bg-stone-100"
          group-hover="true"
        />

        <div class="text-left hidden md:block">
          <Text variant="body-default" color="content-primary" class="block leading-tight">
            {{ userName }}
          </Text>
        </div>

        <Icon
          name="chevron-right"
          :size="20"
          color="var(--color-content-tertiary)"
          class="hidden md:block"
        />
      </button>
    </div>
  </header>

  <!-- ✅ VIP Features Modal -->
  <Modal
    :show="showVipModal"
    title="🌟 Day One Motomation VIP"
    :show-close-button="true"
    :show-back-button="false"
    :show-primary-button="false"
    max-width="lg"
    @close="handleVipModalClose"
  >
    <div class="space-y-6">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div class="flex items-center gap-3 mb-3">
          <Icon name="star" :size="32" color="white" />
          <Text variant="title-subsection" class="text-white"> Exklusiver VIP-Zugang </Text>
        </div>
        <Text variant="body-default" class="text-white/90">
          Du bist Teil der exklusiven Day One Motomation Community! 🎉
        </Text>
      </div>

      <!-- Features List -->
      <div class="space-y-4">
        <Text variant="body-default-bold" color="content-primary"> Deine VIP-Vorteile: </Text>

        <!-- Feature 1 -->
        <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
          <Icon name="zap" :size="20" color="var(--color-primary-purple)" class="mt-0.5" />
          <div>
            <Text variant="body-default-bold" color="content-primary"> Prioritäts-Support </Text>
            <Text variant="body-default" color="content-secondary">
              Deine Anfragen werden bevorzugt bearbeitet
            </Text>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="flex items-start gap-3 p-4 bg-pink-50 rounded-xl">
          <Icon name="gift" :size="20" color="var(--color-primary-purple)" class="mt-0.5" />
          <div>
            <Text variant="body-default-bold" color="content-primary"> Exklusive Features </Text>
            <Text variant="body-default" color="content-secondary">
              Frühzeitiger Zugang zu neuen Funktionen
            </Text>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
          <Icon name="users" :size="20" color="var(--color-primary-purple)" class="mt-0.5" />
          <div>
            <Text variant="body-default-bold" color="content-primary"> VIP-Community </Text>
            <Text variant="body-default" color="content-secondary">
              Zugang zur exklusiven Motomation Discord-Community
            </Text>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="flex items-start gap-3 p-4 bg-pink-50 rounded-xl">
          <Icon name="trophy" :size="20" color="var(--color-primary-purple)" class="mt-0.5" />
          <div>
            <Text variant="body-default-bold" color="content-primary"> Day One Badge </Text>
            <Text variant="body-default" color="content-secondary">
              Zeige allen, dass du von Anfang an dabei warst! 🚀
            </Text>
          </div>
        </div>
      </div>

      <!-- Thank You Message -->
      <div class="bg-stone-50 rounded-xl p-4 text-center">
        <Text variant="body-default" color="content-secondary">
          Danke, dass du Teil unserer Reise bist! 💜
        </Text>
      </div>
    </div>
  </Modal>
</template>
