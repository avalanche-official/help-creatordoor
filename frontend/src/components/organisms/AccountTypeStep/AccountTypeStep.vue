<!-- src/components/organisms/auth/AccountTypeStep.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useAuthStore } from '@/stores/authStore'
import { userProfileService } from '@/services/database/userProfileService'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import SelectableCard from '@/components/molecules/SelectableCard/SelectableCard.vue'
import List from '@/components/organisms/List/List.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Text from '@/components/atoms/Text/Text.vue'

import boardWritingRoseGold from '@/assets/images/board-writing-rose-gold.png'
import cube from '@/assets/images/cube.png'
import webClick from '@/assets/images/web-click.png'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const authStore = useAuthStore()

const accountTypes = [
  {
    value: 'vendor',
    label: 'Vendor',
    image: cube,
    icon: 'store',
    iconBgColor: '#E3F2FD',
    description: 'Verkaufe eigene Produkte und verdiene Geld.',
  },
  {
    value: 'affiliate',
    label: 'Affiliate',
    image: webClick,
    icon: 'user',
    iconBgColor: '#F3E5F5',
    description: 'Empfehle Produkte und erhalte Provision.',
  },
  {
    value: 'creator',
    label: 'Creator',
    image: boardWritingRoseGold,
    icon: 'download',
    iconBgColor: '#FFF3E0',
    description: 'Teile Produkte flexibel – gratis, mit Code oder gegen Bezahlung.',
  },
]

const selectType = async (type) => {
  console.log('📝 Account type selected:', type)

  // Save to Pinia store
  onboardingStore.formData.accountType = type

  // ✅ Save to database
  if (authStore.user) {
    await userProfileService.updateUserProfile(authStore.user.$id, {
      accountType: type,
    })
  }

  // ✅ NEW: Mark step as complete
  onboardingStore.markStepComplete(1)

  setTimeout(() => {
    onboardingStore.nextStep()
  }, 150)
}

const goBack = () => {
  router.push('/register')
}
</script>

<template>
  <div class="md:hidden flex flex-col h-full">
    <div class="flex-shrink-0 px-4 pt-6 pb-4">
      <CopyBlock
        title="Welche Art von Konto möchtest du eröffnen?"
        description="Du kannst auch später noch dein Konto-Typ ändern."
      />
    </div>

    <div class="flex-1 overflow-y-auto px-4 pb-4">
      <List spacing="0" :items="accountTypes" @select="selectType" />
    </div>

    <div class="flex-shrink-0 border-t border-neutral-400 px-0 pt-2">
      <div class="text-center">
        <Text variant="body-3" color="content-secondary">
          Du musst Creatorhub entsprechend unserer
          <Button variant="link" size="small" fontSize="body-3" href="/terms">
            Nutzungsrichtlinien
          </Button>
          nutzen.
        </Text>
      </div>
    </div>
  </div>

  <div class="hidden md:block w-full max-w-2xl mx-auto space-y-8">
    <div class="relative">
      <CopyBlock
        title="Welche Art von Konto möchtest du eröffnen?"
        description="Du kannst auch später noch dein Konto-Typ ändern."
      />
    </div>

    <div class="space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <SelectableCard
          v-for="type in accountTypes.slice(0, 2)"
          :key="type.value"
          :title="type.label"
          :description="type.description"
          :image="type.image"
          :image-size="64"
          :image-rounded="true"
          @select="selectType(type.value)"
        />
      </div>

      <div class="flex justify-center">
        <div class="w-1/2 pr-1.5">
          <SelectableCard
            :title="accountTypes[2].label"
            :description="accountTypes[2].description"
            :image="accountTypes[2].image"
            :image-size="64"
            :image-rounded="true"
            @select="selectType(accountTypes[2].value)"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center px-4">
      <div class="max-w-form text-center mt-4">
        <Text variant="body-default" color="content-secondary">
          Du musst Creatorhub entsprechend unserer
          <Button variant="link" size="small" fontSize="body-default-bold" href="/terms">
            Nutzungsrichtlinien
          </Button>
          nutzen.
        </Text>
      </div>
    </div>
  </div>
</template>
