<!-- components/molecules/LanguageSelector/LanguageSelector.vue -->
<script setup>
import { ref } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'

import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Sidebar from '@/components/atoms/Sidebar/Sidebar.vue'

const props = defineProps({
  currentLanguage: {
    type: Object,
    required: true,
    // Example: { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
  },
  languages: {
    type: Array,
    required: true,
    // Example: [{ code: 'de', label: 'Deutsch', flag: '🇩🇪' }, ...]
  },
})

const emit = defineEmits(['language-change'])

const isSidebarOpen = ref(false)

const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const selectLanguage = (language) => {
  emit('language-change', language)
  closeSidebar()
}
</script>

<template>
  <div>
    <!-- Language Button -->
    <Button variant="ghost" size="small" @click="openSidebar" class="flex items-center gap-2">
      <span class="text-xl">{{ currentLanguage.flag }}</span>
      <Text variant="body-default-bold" color="content-primary">
        {{ currentLanguage.label }}
      </Text>
      <Icon name="chevron-down" :size="16" />
    </Button>

    <!-- Language Sidebar -->
    <Sidebar :is-open="isSidebarOpen" title="Sprache wählen" position="right" @close="closeSidebar">
      <ul class="space-y-2">
        <li v-for="language in languages" :key="language.code">
          <button
            @click="selectLanguage(language)"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-lg transition-colors',
              'hover:bg-stone-100',
              currentLanguage.code === language.code
                ? 'bg-purple-50 border-2 border-purple-600'
                : 'border-2 border-transparent',
            ]"
          >
            <span class="text-3xl">{{ language.flag }}</span>
            <div class="flex-1 text-left">
              <Text
                variant="body-large-bold"
                :color="
                  currentLanguage.code === language.code ? 'content-primary' : 'content-secondary'
                "
              >
                {{ language.label }}
              </Text>
              <Text variant="body-default" color="content-tertiary">
                {{ language.nativeName || language.label }}
              </Text>
            </div>
            <Icon
              v-if="currentLanguage.code === language.code"
              name="check"
              :size="20"
              color="text-purple-600"
            />
          </button>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>
