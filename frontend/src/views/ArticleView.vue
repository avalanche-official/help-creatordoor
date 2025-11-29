<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { helpArticlesService } from '../services/helpArticles'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Card from '@/components/atoms/Card/Card.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const relatedArticles = ref([])
const loading = ref(true)
const feedbackGiven = ref(false)

// ✅ Strapi Base URL (ohne /api für Medien)
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL.replace('/api', '')

onMounted(async () => {
  try {
    const articleSlug = route.params.articleSlug
    
    const response = await helpArticlesService.getBySlug(articleSlug)
    article.value = response.data
    
    console.log('📄 Article content blocks:', article.value.attributes.content) // Debug
    
    if (!article.value) {
      console.error('Article not found')
      return
    }
    
    // Fetch related articles
    if (article.value?.attributes?.category?.documentId) {
      const allArticles = await helpArticlesService.getAll()
      relatedArticles.value = allArticles.data
        .filter(a => 
          a.documentId !== article.value.documentId && 
          a.attributes.category?.documentId === article.value.attributes.category?.documentId
        )
        .slice(0, 3)
    }
  } catch (error) {
    console.error('Error loading article:', error)
  } finally {
    loading.value = false
  }
})

// ✅ Helper function for text formatting classes
const getTextClasses = (child) => {
  const classes = []
  if (child.bold) classes.push('font-bold')
  if (child.italic) classes.push('italic')
  if (child.underline) classes.push('underline')
  if (child.strikethrough) classes.push('line-through')
  if (child.code) classes.push('bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono text-orange-600')
  return classes.join(' ')
}

const handleFeedback = async (isHelpful) => {
  try {
    const field = isHelpful ? 'helpful_yes' : 'helpful_no'
    const currentCount = article.value.attributes[field] || 0
    
    await helpArticlesService.update(article.value.id, {
      [field]: currentCount + 1
    })
    
    feedbackGiven.value = true
  } catch (error) {
    console.error('Error submitting feedback:', error)
  }
}

const goToArticle = (relatedArticle) => {
  const articleSlug = relatedArticle.attributes.slug || relatedArticle.id
  const categorySlug = relatedArticle.attributes.category?.slug || article.value.attributes.category?.slug
  
  router.push(`/${categorySlug}/${articleSlug}`)
  window.scrollTo(0, 0)
}

const goToCategory = () => {
  if (article.value?.attributes?.category?.slug) {
    router.push(`/${article.value.attributes.category.slug}`)
  }
}

// ✅ Helper function to get media URL
const getMediaUrl = (file) => {
  if (!file?.url) return ''
  return file.url.startsWith('http') ? file.url : `${STRAPI_BASE_URL}${file.url}`
}
</script>

<template>
  <div class="max-w-5xl mx-auto py-4 px-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>

    <article v-else-if="article">
      <!-- Breadcrumb -->
      <nav class="mb-12">
        <ol class="flex items-center gap-2 text-sm overflow-hidden">
          <li class="flex-shrink-0">
            <Button variant="link" fontSize="body-default-bold text-secondary-purple" @click="router.push('/')">
              Home
            </Button>
          </li>
          <li class="flex-shrink-0">
            <Text variant="body-default" color="content-secondary">/</Text>
          </li>
          <li v-if="article.attributes.category" class="min-w-0 flex-shrink">
            <Button 
              variant="link" 
              fontSize="body-default-bold text-secondary-purple" 
              @click="goToCategory"
              class="truncate block w-full"
            >
              {{ article.attributes.category.name }}
            </Button>
          </li>
          <li class="flex-shrink-0">
            <Text variant="body-default-bold" color="content-secondary">/</Text>
          </li>
          <li class="min-w-0 flex-1">
            <Text 
              variant="body-default-bold" 
              color="content-primary"
              class="truncate block"
            >
              {{ article.attributes.title }}
            </Text>
          </li>
        </ol>
      </nav>

      <div class="max-w-xl mx-auto">
        <!-- Article Header -->
        <div class="mb-8 text-center">
          <Text variant="title-screen" as="h1" class="mb-4">
            {{ article.attributes.title }}
          </Text>
          <Text v-if="article.attributes.excerpt" variant="body-large" color="content-secondary">
            {{ article.attributes.excerpt }}
          </Text>
        </div>

<!-- Article Content -->
<div class="prose prose-lg max-w-none mb-12">
  <div v-for="(block, index) in article.attributes.content" :key="index">
    
    <!-- ✅ IMAGE BLOCK - besseres Spacing -->
    <figure v-if="block.type === 'image'" class="pt-2 pb-8">
      <img 
        :src="getMediaUrl(block.image)"
        :alt="block.image?.alternativeText || block.image?.name || 'Article image'"
        class="w-full rounded-lg border border-1 border-stone-200"
      />
      <figcaption 
        v-if="block.image?.caption" 
        class="text-sm text-stone-500 mt-2 text-center italic"
      >
        {{ block.image.caption }}
      </figcaption>
    </figure>

    <!-- ✅ VIDEO/MEDIA BLOCK -->
    <div v-else-if="block.type === 'media'" class="pt-2 pb-8">
      <video 
        v-if="block.file?.mime?.startsWith('video')"
        controls 
        class="w-full rounded-lg border border-1 border-stone-200"
        :src="getMediaUrl(block.file)"
      >
        Your browser does not support the video tag.
      </video>
      <img 
        v-else
        :src="getMediaUrl(block.file)"
        :alt="block.file?.alternativeText || 'Media'"
        class="w-full rounded-lg border border-1 border-stone-200"
      />
    </div>

    <!-- ✅ PARAGRAPH mit allen Text-Formaten -->
    <p v-else-if="block.type === 'paragraph'" class="mb-4 body-default text-stone-700 leading-relaxed">
      <template v-for="(child, childIndex) in block.children" :key="childIndex">
        <!-- Link -->
        <a 
          v-if="child.type === 'link'" 
          :href="child.url" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-secondary-purple underline hover:text-primary-purple"
        >
          <template v-for="(linkChild, linkIndex) in child.children" :key="linkIndex">
            <span :class="getTextClasses(linkChild)">{{ linkChild.text }}</span>
          </template>
        </a>
        <!-- Regular text with formatting -->
        <span v-else :class="getTextClasses(child)">{{ child.text }}</span>
      </template>
    </p>

    <!-- ✅ ALL HEADINGS h1-h6 -->
    <Text 
      v-else-if="block.type === 'heading' && block.level === 1" 
      variant="title-screen" 
      as="h1" 
      class="mt-10 mb-6"
    >
      {{ block.children?.[0]?.text }}
    </Text>

    <Text 
      v-else-if="block.type === 'heading' && block.level === 2" 
      variant="title-subsection" 
      as="h2" 
      class="mt-8 mb-4"
    >
      {{ block.children?.[0]?.text }}
    </Text>

    <Text 
      v-else-if="block.type === 'heading' && block.level === 3" 
      variant="title-body" 
      as="h3" 
      class="mt-6 mb-3"
    >
      {{ block.children?.[0]?.text }}
    </Text>

    <h4 
      v-else-if="block.type === 'heading' && block.level === 4" 
      class="mt-5 mb-2 text-lg font-semibold text-stone-800"
    >
      {{ block.children?.[0]?.text }}
    </h4>

    <h5 
      v-else-if="block.type === 'heading' && block.level === 5" 
      class="mt-4 mb-2 text-base font-semibold text-stone-800"
    >
      {{ block.children?.[0]?.text }}
    </h5>

    <h6 
      v-else-if="block.type === 'heading' && block.level === 6" 
      class="mt-4 mb-2 text-sm font-semibold text-stone-700 uppercase tracking-wide"
    >
      {{ block.children?.[0]?.text }}
    </h6>

    <!-- ✅ HORIZONTAL RULE / DIVIDER -->
    <hr v-else-if="block.type === 'horizontalRule' || block.type === 'thematicBreak'" class="my-8 border-t border-stone-300" />

    <!-- ✅ Lists mit Text-Formatting Support -->
    <ul v-else-if="block.type === 'list' && block.format === 'unordered'" class="list-disc pl-6 mb-4 space-y-2">
      <li v-for="(item, itemIndex) in block.children" :key="itemIndex" class="text-stone-700">
        <template v-for="(child, childIndex) in item.children" :key="childIndex">
          <span :class="getTextClasses(child)">{{ child.text }}</span>
        </template>
      </li>
    </ul>

    <ol v-else-if="block.type === 'list' && block.format === 'ordered'" class="list-decimal pl-6 mb-4 space-y-2">
      <li v-for="(item, itemIndex) in block.children" :key="itemIndex" class="text-stone-700">
        <template v-for="(child, childIndex) in item.children" :key="childIndex">
          <span :class="getTextClasses(child)">{{ child.text }}</span>
        </template>
      </li>
    </ol>

    <!-- ✅ CODE BLOCK -->
    <pre v-else-if="block.type === 'code'" class="bg-stone-100 rounded-lg p-4 overflow-x-auto my-6">
      <code class="text-sm font-mono text-stone-800">{{ block.children?.[0]?.text }}</code>
    </pre>

    <!-- ✅ QUOTE BLOCK -->
    <blockquote v-else-if="block.type === 'quote'" class="border-l-4 border-orange-500 pl-4 italic my-6 text-stone-600">
      <template v-for="(child, childIndex) in block.children" :key="childIndex">
        <p v-if="child.type === 'paragraph'" class="mb-2 last:mb-0">
          <template v-for="(textChild, textIndex) in child.children" :key="textIndex">
            <span :class="getTextClasses(textChild)">{{ textChild.text }}</span>
          </template>
        </p>
        <span v-else>{{ child.text }}</span>
      </template>
    </blockquote>

  </div>
</div>

        <!-- Helpful Feedback Section -->
        <div class="border-t border-b border-stone-200 py-8 mb-12">
          <div class="text-center">
            <Text variant="title-body" class="mb-4">
              War dieser Artikel hilfreich?
            </Text>
            
            <div v-if="!feedbackGiven" class="flex items-center justify-center gap-4 mt-2">
              <Button 
                variant="outline" 
                fontSize="body-default-bold text-secondary-purple"
                @click="handleFeedback(true)"
              >
                <Icon name="thumbs-up" :size="20" class="mr-2" />
                Ja
              </Button>
              <Button 
                variant="outline" 
                fontSize="body-default-bold text-secondary-purple"
                @click="handleFeedback(false)"
              >
                <Icon name="thumbs-down" :size="20" class="mr-2" />
                Nein
              </Button>
            </div>

            <div v-else>
              <Text variant="body-large" color="content-secondary">
                Vielen Dank für dein Feedback!
              </Text>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <div v-if="relatedArticles.length > 0" class="mb-12">
          <Text variant="title-subsection" class="mb-6">
            Ähnliche Artikel
          </Text>
          
          <div class="space-y-2">
            <Button
              v-for="relatedArticle in relatedArticles"
              :key="relatedArticle.id"
              variant="link"
              fontSize="body-default"
              class="w-full justify-start text-left text-secondary-purple"
              @click="goToArticle(relatedArticle)"
            >
              {{ relatedArticle.attributes.title }}
            </Button>
          </div>
        </div>

      </div>
    </article>
  </div>
</template>