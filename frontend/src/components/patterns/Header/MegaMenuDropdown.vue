<script setup>
import FeaturedCard from '@/components/product/FeaturedCard/FeaturedCard.vue'
import LinkSection from '@/components/product/LinkSection/LinkSection.vue'

defineProps({
  activeMenuId: {
    type: String,
    default: null,
  },
  menuItems: {
    type: Array,
    required: true,
  },
  iconComponents: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['mouseenter', 'mouseleave'])
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="activeMenuId"
      class="absolute left-0 right-0 top-20 z-50 hidden lg:block"
      @mouseenter="emit('mouseenter')"
      @mouseleave="emit('mouseleave')"
    >
      <div class="bg-white shadow-lg">
        <div class="xl:max-w-7xl lg:max-w-[1440px] mx-auto px-4 py-12">
          <div v-for="item in menuItems" :key="item.id" v-show="activeMenuId === item.id">
            <div class="grid grid-cols-12 gap-12">
              <!-- Featured Card (4 columns) -->
              <div class="col-span-3">
                <FeaturedCard
                  :image="item.image"
                  :title="item.card.title"
                  :description="item.card.description"
                  :link="item.card.link"
                />
              </div>

              <!-- Link Sections (8 columns) -->
              <div class="col-span-8 flex gap-0">
                <LinkSection
                  v-for="(section, idx) in item.sections"
                  :key="idx"
                  :title="section.title"
                  :links="section.links"
                  :icon-components="iconComponents"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
