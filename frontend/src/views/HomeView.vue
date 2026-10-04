<!-- ═══════════════════════════════════════════════════════════════════════
     HomeView — the help center's start page in the main site's editorial
     design: the violet hero with the question and the article search, the
     cream sheet with one card per topic, and the violet "Noch mehr Hilfe?"
     closing. Nav and footer come from App.vue.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { categoriesService } from '@/services/categories'
import { helpArticlesService } from '@/services/helpArticles'
import { articleCount, articlePath, byOrder, categoryPath } from '@/editorial/helpContent'
import EdSection from '@/editorial/templates/EdSection.vue'
import EdChip from '@/editorial/atoms/EdChip.vue'
import EdButton from '@/editorial/atoms/EdButton.vue'
import EdArches from '@/editorial/atoms/EdArches.vue'
import HelpSearch from '@/editorial/organisms/HelpSearch.vue'
import HelpClosing from '@/editorial/organisms/HelpClosing.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const router = useRouter()
const categories = ref([])
const allArticles = ref([])
const loading = ref(true)
const loadError = ref(false)

const load = async () => {
  loading.value = true
  loadError.value = false
  try {
    const [categoriesRes, articlesRes] = await Promise.all([
      categoriesService.getAll(),
      helpArticlesService.getAll(),
    ])
    categories.value = byOrder(categoriesRes.data)
    allArticles.value = articlesRes.data
  } catch (error) {
    console.error('Error loading data:', error)
    loadError.value = true
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  document.title = 'Creatordoor - Help'
  load()
})

const handleArticleSelect = (article) => router.push(articlePath(article))

const getIconName = (iconFromStrapi) => {
  if (!iconFromStrapi || iconFromStrapi.trim() === '') return 'folder'
  return iconFromStrapi.trim()
}

// One brand accent per card, in the order the main site's bento uses them.
const TONES = ['lime', 'lilac', 'blaze', 'mint', 'sand', 'violet']
const cards = computed(() =>
  categories.value.map((category, i) => ({
    id: category.id,
    to: categoryPath(category),
    name: category.attributes.name,
    description: category.attributes.description,
    icon: getIconName(category.attributes.icon),
    tone: TONES[i % TONES.length],
    count: allArticles.value.filter((a) => a.attributes.category?.documentId === category.attributes.documentId).length,
  })),
)
</script>

<template>
  <div class="help-view">
    <!-- hero -->
    <EdSection id="top" tone="violet" :overlap="false" pad="none" as="header">
      <div class="help-hero">
        <div class="help-hero__copy">
          <EdChip label="Hilfe-Center" tone="glass" />
          <h1 class="ed-display-2 help-hero__title">Wie können wir behilflich sein?</h1>
          <p class="ed-lead help-hero__lead">Antworten, Anleitungen und Tipps rund um Creatordoor – such nach deiner Frage oder wähle ein Thema.</p>
          <HelpSearch :articles="allArticles" :loading="loading" @select="handleArticleSelect" />
        </div>
        <div class="help-hero__scene" aria-hidden="true">
          <EdArches :width="220" outer="night" inner="lime" side="blaze" />
        </div>
      </div>
    </EdSection>

    <!-- topics -->
    <EdSection id="themen" tone="cream">
      <div class="help-topics">
        <div class="help-topics__head">
          <h2 class="ed-display-2">Themen entdecken</h2>
          <p v-if="cards.length" class="ed-body help-topics__aside">{{ cards.length === 1 ? '1 Thema' : `${cards.length} Themen` }}, {{ articleCount(allArticles.length) }} – alles, was du für den Start und den Alltag mit Creatordoor brauchst.</p>
        </div>

        <!-- loading -->
        <div v-if="loading" class="help-topics__grid" aria-busy="true" aria-label="Hilfeartikel laden …">
          <div v-for="n in 6" :key="n" class="help-topic is-skel"><div class="help-skel is-disc" /><div class="help-skel is-title" /><div class="help-skel" /><div class="help-skel is-short" /></div>
        </div>

        <!-- load failed -->
        <div v-else-if="loadError" class="help-state">
          <h3 class="ed-display-5">Die Hilfeartikel konnten nicht geladen werden.</h3>
          <p class="help-state__text">Prüfe deine Verbindung und versuch es noch einmal.</p>
          <EdButton label="Erneut versuchen" tone="night" size="lg" @click="load" />
        </div>

        <!-- empty -->
        <div v-else-if="cards.length === 0" class="help-state">
          <h3 class="ed-display-5">Keine Kategorien gefunden</h3>
        </div>

        <div v-else class="help-topics__grid">
          <RouterLink v-for="card in cards" :key="card.id" :to="card.to" class="help-topic ed-focusable">
            <span :class="['help-topic__disc', `is-${card.tone}`]" aria-hidden="true"><Icon :name="card.icon" :size="26" /></span>
            <span class="ed-display-5 help-topic__title">{{ card.name }}</span>
            <span v-if="card.description" class="help-topic__text">{{ card.description }}</span>
            <span class="help-topic__foot">
              <span class="help-topic__count">{{ articleCount(card.count) }}</span>
              <svg class="help-topic__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
            </span>
          </RouterLink>
        </div>
      </div>
    </EdSection>

    <HelpClosing />
  </div>
</template>

<style scoped>
.help-hero { display: flex; flex-direction: column; padding-top: 20px; padding-bottom: calc(var(--ed-sheet-overlap) + 48px); }
.help-hero__copy { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; min-width: 0; }
.help-hero__title { font-size: clamp(42px, 2.6vw + 32px, 84px); line-height: 0.9; letter-spacing: -0.045em; max-width: 900px; }
.help-hero__lead { max-width: 560px; color: var(--ed-on-violet-soft); }
.help-hero__scene { display: none; }

.help-topics { display: flex; flex-direction: column; gap: 32px; }
.help-topics__head { display: flex; flex-direction: column; gap: 16px; }
.help-topics__aside { color: var(--ed-ink-2); max-width: 460px; }
.help-topics__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }

.help-topic {
  box-sizing: border-box; min-width: 0; display: flex; flex-direction: column; gap: 12px;
  padding: 28px; border-radius: var(--ed-tile-radius); background: var(--ed-paper); color: var(--ed-ink);
  text-decoration: none; box-shadow: var(--ed-shadow-card);
  transition: transform 200ms var(--ed-ease-out), box-shadow 200ms ease;
}
.help-topic:not(.is-skel):hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(20, 20, 18, 0.1); }
.help-topic__disc { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: var(--ed-pill); margin-bottom: 12px; }
.help-topic__disc.is-lime { background: var(--ed-lime); color: var(--ed-on-lime); }
.help-topic__disc.is-lilac { background: var(--ed-lilac); color: var(--ed-on-lilac); }
.help-topic__disc.is-blaze { background: var(--ed-blaze); color: var(--ed-on-blaze); }
.help-topic__disc.is-mint { background: var(--ed-mint); color: var(--ed-on-mint); }
.help-topic__disc.is-sand { background: var(--ed-sand); color: var(--ed-on-sand); }
.help-topic__disc.is-violet { background: var(--ed-violet); color: var(--ed-on-violet); }
.help-topic__title { overflow-wrap: break-word; }
.help-topic__text { font-size: 16px; line-height: 24px; color: var(--ed-ink-2); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.help-topic__foot { margin-top: auto; padding-top: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.help-topic__count { font-family: var(--ed-font-mono); font-size: 13px; line-height: 18px; color: var(--ed-ink-3); }
.help-topic__arrow { flex: 0 0 auto; transition: transform 200ms var(--ed-ease-out); }
.help-topic:hover .help-topic__arrow { transform: translate(2px, -2px); }

.help-skel { height: 14px; width: 100%; border-radius: 7px; background: var(--ed-field); }
.help-skel.is-disc { width: 56px; height: 56px; border-radius: var(--ed-pill); margin-bottom: 12px; }
.help-skel.is-title { height: 26px; width: 70%; }
.help-skel.is-short { width: 55%; }

.help-state { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding: 28px; border-radius: var(--ed-tile-radius); background: var(--ed-paper); }
.help-state__text { margin: 0; font-size: 16px; line-height: 24px; color: var(--ed-ink-2); }

@media (min-width: 600px) {
  .help-topics__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
}
@media (min-width: 1024px) {
  .help-hero { flex-direction: row; align-items: flex-end; gap: 40px; padding-top: 48px; padding-bottom: 0; }
  .help-hero__copy { flex: 1 1 0; gap: 32px; padding-bottom: calc(var(--ed-sheet-overlap) + 84px); }
  .help-hero__scene { display: flex; flex: 0 0 auto; align-items: flex-end; justify-content: flex-end; padding-right: 20px; }
  .help-topics { gap: 56px; }
  .help-topics__head { flex-direction: row; align-items: flex-end; justify-content: space-between; gap: 48px; }
  .help-topics__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
  .help-topic { padding: 36px; gap: 14px; min-height: 300px; }
}
@media (prefers-reduced-motion: reduce) {
  .help-topic, .help-topic__arrow { transition: none; }
  .help-topic:not(.is-skel):hover { transform: none; }
}
</style>
