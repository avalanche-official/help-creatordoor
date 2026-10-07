<script setup>
import { ref, onMounted, computed } from 'vue'
import { categoriesService } from '@/services/categories'
import { helpArticlesService } from '@/services/helpArticles'
import { useRouter } from 'vue-router'
import SearchSelector from '../components/molecules/SearchSelector/SearchSelector.vue'
import Card from '../components/atoms/Card/Card.vue'
import Icon from '../components/atoms/Icon/Icon.vue'
import CopyBlock from '../components/molecules/CopyBlock/CopyBlock.vue'
import Text from '../components/atoms/Text/Text.vue'
import List from '../components/organisms/List/List.vue'

// Hero background: palette-knife oil texture (Unsplash, Steve A Johnson).
// The photo is near-white; the .hero-tint layer is what makes it beige.
import heroCanvasWebp from '@/assets/hero/oil-canvas.webp'
import heroCanvasJpg from '@/assets/hero/oil-canvas.jpg'


const router = useRouter()
const categories = ref([])
const allArticles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [categoriesRes, articlesRes] = await Promise.all([
      categoriesService.getAll(),
      helpArticlesService.getAll()
    ])
    categories.value = categoriesRes.data
    allArticles.value = articlesRes.data
    
    console.log('Categories loaded:', categories.value)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})

const handleArticleSelect = (article) => {
  const slug = article.attributes.slug || article.id
  router.push(`/article/${slug}`)
}

const goToCategory = (category) => {
  const slug = category.attributes.slug || category.id
  router.push(`/${slug}`)
}

// For List component (mobile)
const handleCategorySelect = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  if (category) {
    goToCategory(category)
  }
}

const getIconName = (iconFromStrapi) => {
  if (!iconFromStrapi || iconFromStrapi.trim() === '') {
    return 'folder'
  }
  return iconFromStrapi.trim()
}

// Transform categories for List component
const categoriesForList = computed(() => {
  return categories.value.slice(0, 6).map(category => ({
    value: category.id,
    label: category.attributes.name,
    description: category.attributes.description,
    icon: getIconName(category.attributes.icon),
    iconBgColor: 'bg-stone-100', // You can customize this
    iconColor: 'text-stone-500',
  }))
})
</script>

<template>
  <div>
    <!-- ── Hero: beige oil-painting canvas + search ── -->
    <div class="relative w-full overflow-hidden bg-[#e9dcc6]">
      <picture>
        <source :srcset="heroCanvasWebp" type="image/webp" />
        <img
          :src="heroCanvasJpg"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 h-full w-full object-cover hero-canvas"
        />
      </picture>
      <!-- Warm wash over the photo: turns the white canvas beige and keeps the
           headline readable wherever the brush strokes fall. -->
      <div class="hero-tint" aria-hidden="true" />

      <div
        class="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28 flex flex-col items-center text-center"
      >
        <Text variant="title-section" as="h1" custom-color="#2b2419" class="mb-8">
          Wie können wir behilflich sein?
        </Text>

        <!-- Search Selector -->
        <div class="w-full max-w-2xl mx-auto text-left">
          <SearchSelector
            :articles="allArticles"
            @select="handleArticleSelect"
          />
        </div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-12">

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      <p class="text-neutral-600 mt-4">Hilfeartikel laden...</p>
    </div>

    <!-- Categories Section -->
    <div v-else class="max-w-6xl mx-auto">
      <Text variant="title-subsection" as="h2" class="mb-6 text-left">
        Themen entdecken
      </Text>
      
      <!-- Empty State -->
      <div v-if="categories.length === 0" class="text-center py-12 flex flex-col">
        <Icon name="folder-open" :size="64" color="text-neutral-300" class="mx-auto mb-4" />
        <Text variant="title-subsection" color="content-secondary" class="mb-2">
          Keine Kategorien gefunden
        </Text>

      </div>

      <!-- Categories Display -->
      <template v-else>
        <!-- Mobile: List View -->
        <div class="md:hidden">
          <List
            :items="categoriesForList"
            spacing="3"
            @select="handleCategorySelect"
          />
        </div>

        <!-- Desktop: Grid View -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card
            v-for="category in categories.slice(0, 6)"
            :key="category.id"
            variant="card"
            clickable
            rounded="rounded-2xl"
            class="p-4 flex flex-col items-center text-center space-y-4 transition-shadow duration-300"
            @click="goToCategory(category)"
          >
            <!-- Icon at top -->
            <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <Icon 
                :name="getIconName(category.attributes.icon)" 
                :size="24" 
                color="white"
              />
            </div>

            <!-- CopyBlock at bottom -->
            <CopyBlock
              :title="category.attributes.name"
              :description="category.attributes.description"
              title-variant="title-body"
              description-variant="body-default"
              align="center"
              spacing="2"
              description-clamp="2"
            />
          </Card>
        </div>
      </template>

      <!-- Still Need Help Section: light, with a dark pill button -->
      <div class="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
        <Text variant="title-subsection" as="h2">
          Noch mehr Hilfe?
        </Text>
        <a
          href="mailto:support@creatordoor.com"
          class="inline-flex items-center px-5 py-2.5 rounded-full bg-[#141414] text-white text-sm font-semibold hover:opacity-90 active:opacity-80 transition-opacity"
        >
          Kontaktiere uns
        </a>
      </div>

      <!-- Show message if more than 6 categories -->
      <div v-if="categories.length > 6" class="text-center mt-8">
        <Text variant="body-small" color="content-secondary">
          Showing {{ Math.min(6, categories.length) }} of {{ categories.length }} categories
        </Text>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Hero: the source photo is a near-white oil canvas, so the warmth comes
   from CSS rather than from the image itself ── */
.hero-canvas {
  /* sepia turns the white paint beige; the rest keeps the strokes crisp */
  filter: sepia(0.5) saturate(1.35) brightness(0.99) contrast(1.04);
}

.hero-tint {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 50% 42%, rgba(255, 250, 240, 0.62), transparent 68%),
    linear-gradient(to bottom, rgba(233, 220, 198, 0.45), rgba(214, 196, 168, 0.6));
}

/* Soften the seam into the page below the hero */
.hero-tint::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 96px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.55));
}
</style>