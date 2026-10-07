<!-- ═══════════════════════════════════════════════════════════════════════
     ArticleView — one help article, laid out like the main site's blog
     post: the violet hero with the breadcrumb, the title and the excerpt
     as the lead; a cream sheet with the article in a white card at a
     720px reading measure (the "War dieser Artikel hilfreich?" vote at its
     foot) and, beside it from 1024px, the related articles and the night
     contact card. Loading, load-failed (retry) and not-found states sit in
     the hero.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ThumbsDown, ThumbsUp } from 'lucide-vue-next'
import { helpArticlesService } from '@/services/helpArticles'
import { articlePath, byOrder } from '@/editorial/helpContent'
import EdSection from '@/editorial/templates/EdSection.vue'
import EdButton from '@/editorial/atoms/EdButton.vue'
import HelpBlocks from '@/editorial/organisms/HelpBlocks.vue'

const SUPPORT = 'support@creatordoor.com'

const route = useRoute()
const article = ref(null)
const relatedArticles = ref([])
const loading = ref(true)
const notFound = ref(false)
const loadError = ref(false)
const feedbackGiven = ref(false)
const feedbackBusy = ref(false)

const load = async () => {
  loading.value = true
  notFound.value = false
  loadError.value = false
  article.value = null
  relatedArticles.value = []
  feedbackGiven.value = false
  try {
    const response = await helpArticlesService.getBySlug(route.params.articleSlug)
    article.value = response.data
    document.title = `${article.value.attributes.title} - Creatordoor Help`
  } catch (error) {
    console.error('Error loading article:', error)
    if (/^Article not found/.test(error?.message || '')) notFound.value = true
    else loadError.value = true
    loading.value = false
    return
  }
  loading.value = false

  // Related articles: the others of the same category
  if (article.value.attributes.category?.documentId) {
    try {
      const allArticles = await helpArticlesService.getAll()
      relatedArticles.value = byOrder(allArticles.data)
        .filter((a) =>
          a.attributes.documentId !== article.value.documentId &&
          a.attributes.category?.documentId === article.value.attributes.category.documentId,
        )
        .slice(0, 3)
    } catch (error) {
      console.error('Error loading related articles:', error)
    }
  }
}
onMounted(load)
// Moving between articles reuses this component, so onMounted alone would leave the previous one on screen.
watch(
  () => route.params.articleSlug,
  (slug, previous) => {
    if (slug && slug !== previous) load()
  },
)

const category = computed(() => article.value?.attributes.category || null)
const related = computed(() => relatedArticles.value.map((a) => ({ id: a.id, title: a.attributes.title, to: articlePath(a, category.value?.slug) })))

const handleFeedback = (isHelpful) => {
  if (feedbackBusy.value) return
  feedbackBusy.value = true
  // Content ships as static JSON, so there is no backend to count the vote; acknowledge it locally.
  console.info(`Article feedback: ${article.value?.attributes.slug} -> ${isHelpful ? 'helpful' : 'not helpful'}`)
  feedbackGiven.value = true
  feedbackBusy.value = false
}
</script>

<template>
  <div class="help-view">
    <!-- hero -->
    <EdSection id="top" tone="violet" :overlap="false" pad="none" as="header">
      <div class="help-ahero">
        <nav class="help-crumbs" aria-label="Brotkrumen">
          <RouterLink to="/" class="help-crumbs__link ed-focusable">Hilfe-Center</RouterLink>
          <template v-if="category">
            <span class="help-crumbs__sep" aria-hidden="true">/</span>
            <RouterLink :to="`/${category.slug}`" class="help-crumbs__link ed-focusable">{{ category.name }}</RouterLink>
          </template>
        </nav>
        <template v-if="article">
          <h1 class="ed-display-2 help-ahero__title">{{ article.attributes.title }}</h1>
          <p v-if="article.attributes.excerpt" class="ed-lead help-ahero__lead">{{ article.attributes.excerpt }}</p>
        </template>
        <template v-else-if="loading">
          <div class="help-skel is-title" /><div class="help-skel is-lead" />
        </template>
        <template v-else>
          <h1 class="ed-display-2 help-ahero__title">{{ loadError ? 'Das hat nicht geklappt.' : 'Artikel nicht gefunden.' }}</h1>
          <p class="ed-lead help-ahero__lead">{{ loadError ? 'Der Artikel konnte nicht geladen werden. Prüfe deine Verbindung und versuch es noch einmal.' : 'Diesen Artikel gibt es nicht (mehr). Im Hilfe-Center findest du alle Themen.' }}</p>
          <div class="help-ahero__actions">
            <EdButton v-if="loadError" label="Erneut versuchen" tone="lime" size="lg" @click="load" />
            <EdButton v-else label="Zum Hilfe-Center" to="/" tone="lime" size="lg" />
          </div>
        </template>
      </div>
    </EdSection>

    <!-- article -->
    <EdSection tone="cream">
      <div class="help-sheet">
        <article v-if="article" class="help-article">
          <div class="help-article__body">
            <HelpBlocks :blocks="article.attributes.content || []" />

            <!-- helpful? -->
            <div class="help-vote">
              <template v-if="!feedbackGiven">
                <div class="help-vote__title">War dieser Artikel hilfreich?</div>
                <div class="help-vote__actions">
                  <button type="button" class="help-vote__btn" :disabled="feedbackBusy" @click="handleFeedback(true)"><ThumbsUp :size="18" :stroke-width="2.2" aria-hidden="true" />Ja</button>
                  <button type="button" class="help-vote__btn" :disabled="feedbackBusy" @click="handleFeedback(false)"><ThumbsDown :size="18" :stroke-width="2.2" aria-hidden="true" />Nein</button>
                </div>
              </template>
              <div v-else class="help-vote__title" role="status">Vielen Dank für dein Feedback!</div>
            </div>
          </div>
        </article>
        <div v-else-if="loading" class="help-article is-skel" aria-busy="true"><div class="help-skel is-line" /><div class="help-skel is-line" /><div class="help-skel is-line is-short" /></div>
        <div v-else class="help-article is-skel">
          <p class="help-article__gone">{{ loadError ? 'Der Artikel konnte nicht geladen werden.' : 'Hier gibt es nichts zu lesen.' }}</p>
        </div>

        <aside class="help-side">
          <div v-if="related.length" class="help-related">
            <h2 class="help-related__title">Ähnliche Artikel</h2>
            <RouterLink v-for="r in related" :key="r.id" :to="r.to" class="help-related__link ed-focusable">
              <span>{{ r.title }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </RouterLink>
          </div>
          <div class="help-contact">
            <div class="ed-display-4">Noch mehr Hilfe?</div>
            <p class="help-contact__text">Nichts Passendes gefunden? Schreib uns – wir helfen dir persönlich weiter.</p>
            <EdButton label="Kontaktiere uns" :href="`mailto:${SUPPORT}`" tone="lime" size="lg" />
          </div>
        </aside>
      </div>
    </EdSection>
  </div>
</template>

<style scoped>
.help-ahero { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; max-width: 900px; padding-top: 20px; padding-bottom: calc(var(--ed-sheet-overlap) + 40px); }
.help-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; font-size: 15px; line-height: 22px; font-weight: 700; color: var(--ed-on-violet-muted); }
.help-crumbs__link { color: inherit; text-decoration: none; border-radius: 6px; overflow-wrap: anywhere; }
.help-crumbs__link:hover { color: var(--ed-on-violet); }
.help-crumbs__sep { opacity: 0.6; }
.help-ahero__title { font-size: clamp(34px, 1.9vw + 26px, 68px); line-height: 0.94; overflow-wrap: break-word; max-width: 100%; }
.help-ahero__lead { color: var(--ed-on-violet-soft); max-width: 720px; }
.help-ahero__actions { display: flex; gap: 12px; }
.help-skel { border-radius: 10px; background: var(--ed-violet-glass); width: 100%; }
.help-skel.is-title { height: 64px; width: min(560px, 80%); }
.help-skel.is-lead { height: 24px; width: min(400px, 60%); }
.help-skel.is-line { height: 18px; background: var(--ed-field); border-radius: 7px; }
.help-skel.is-short { width: 55%; }

.help-sheet { display: flex; flex-direction: column; gap: 24px; }
.help-article { box-sizing: border-box; width: 100%; max-width: 820px; min-width: 0; background: var(--ed-paper); color: var(--ed-ink); border-radius: var(--ed-card-radius); overflow: hidden; box-shadow: var(--ed-shadow-card); }
.help-article.is-skel { padding: 32px; display: flex; flex-direction: column; gap: 16px; }
.help-article__gone { margin: 0; font-size: 17px; line-height: 26px; color: var(--ed-ink-2); }
.help-article__body { display: flex; flex-direction: column; gap: 32px; padding: 28px 24px 32px; max-width: 720px; }

.help-vote { display: flex; flex-direction: column; gap: 16px; padding-top: 28px; border-top: 1px solid var(--ed-line-cream); }
.help-vote__title { font-family: var(--ed-font-display); font-weight: 700; font-size: 22px; line-height: 26px; letter-spacing: -0.02em; }
.help-vote__actions { display: flex; gap: 10px; }
.help-vote__btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 20px;
  border: 2px solid var(--ed-ink); border-radius: var(--ed-pill); background: transparent; color: var(--ed-ink);
  font-family: var(--ed-font-sans); font-size: 15px; font-weight: 700; cursor: pointer;
  transition: background-color 140ms ease, color 140ms ease;
}
.help-vote__btn:hover:not(:disabled) { background: var(--ed-ink); color: var(--ed-lime); }
.help-vote__btn:disabled { opacity: 0.6; cursor: default; }
.help-vote__btn:focus-visible { outline: 3px solid var(--ed-violet); outline-offset: 3px; }

.help-side { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 820px; }
.help-related { box-sizing: border-box; padding: 24px 28px; border-radius: var(--ed-card-radius); background: var(--ed-paper); border: 1px solid var(--ed-line-cream); display: flex; flex-direction: column; }
.help-related__title { margin: 0 0 8px; font-family: var(--ed-font-sans); font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ed-ink-3); }
.help-related__link { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; font-size: 16px; line-height: 22px; font-weight: 700; color: var(--ed-ink); text-decoration: none; border-radius: 6px; }
.help-related__link + .help-related__link { border-top: 1px solid var(--ed-line-cream); }
.help-related__link span { min-width: 0; overflow-wrap: break-word; }
.help-related__link svg { flex: 0 0 auto; color: var(--ed-ink-3); }
.help-related__link:hover { color: var(--nd-violet-mark, #5b21b6); }
.help-related__link:hover svg { color: inherit; }
.help-related__link.ed-focusable:focus-visible { outline-color: var(--ed-violet); }
.help-contact { box-sizing: border-box; padding: 28px; border-radius: var(--ed-card-radius); background: var(--ed-night); color: var(--ed-bone); display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.help-contact__text { margin: 0; font-size: 16px; line-height: 24px; color: var(--ed-bone-2); }

@media (min-width: 600px) {
  .help-article__body { padding: 40px 48px 48px; }
  .help-side { flex-direction: row; align-items: stretch; }
  .help-related, .help-contact { flex: 1 1 0; min-width: 0; }
}
@media (min-width: 1024px) {
  .help-ahero { gap: 28px; padding-top: 48px; padding-bottom: calc(var(--ed-sheet-overlap) + 64px); }
  .help-sheet { flex-direction: row; align-items: flex-start; gap: 32px; }
  .help-article { flex: 1 1 0; }
  .help-side { width: 360px; flex: 0 0 auto; flex-direction: column; position: sticky; top: 24px; }
  .help-related, .help-contact { flex: 0 0 auto; }
}
</style>
