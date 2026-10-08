<!-- ═══════════════════════════════════════════════════════════════════════
     HelpSearch — the hero's article search: a compact field styled like
     the app design's TextInput (ui/TextInput: white, 1px border, 8px
     radius, 48px tall, accent border + soft ring on focus) on the violet
     and, while there is a query, a white card of matches under it
     (title and excerpt match, as before). One layout for phone and
     desktop. A combobox: ↑ ↓ move, Enter opens the marked (or first)
     match, Escape or a click outside closes. The parent navigates on
     `select`.

     The card must paint over the cream sheet that overlaps the hero, so
     the hero sheet is NOT clipped and nothing above the card creates a
     stacking context; the card's z-index then counts on the page.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { Search, X } from 'lucide-vue-next'

const props = defineProps({
  articles: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Nach Artikel suchen …' },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(['select'])

const root = ref(null)
const input = ref(null)
const query = ref('')
const open = ref(false)
const active = ref(-1)

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return props.articles
    .filter((a) => a.attributes.title?.toLowerCase().includes(q) || a.attributes.excerpt?.toLowerCase().includes(q))
    .slice(0, 20)
})
const showPanel = computed(() => open.value && query.value.trim().length > 0)

watch(query, () => { open.value = true; active.value = -1 })

const select = (article) => {
  emit('select', article)
  open.value = false
  query.value = ''
}
const clear = () => { query.value = ''; input.value?.focus() }

const move = (step) => {
  if (!results.value.length) return
  open.value = true
  active.value = (active.value + step + results.value.length) % results.value.length
  root.value?.querySelector(`#help-search-option-${active.value}`)?.scrollIntoView({ block: 'nearest' })
}
const onEnter = () => {
  const hit = results.value[active.value] || results.value[0]
  if (hit && showPanel.value) select(hit)
}

const onDocPointer = (e) => { if (root.value && !root.value.contains(e.target)) open.value = false }
watch(showPanel, (v) => {
  if (v) document.addEventListener('pointerdown', onDocPointer)
  else document.removeEventListener('pointerdown', onDocPointer)
})
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocPointer))
</script>

<template>
  <div ref="root" class="help-search">
    <div class="help-search__field">
      <Search class="help-search__icon" :size="20" :stroke-width="2" aria-hidden="true" />
      <input
        ref="input"
        v-model="query"
        type="search"
        class="help-search__input"
        role="combobox"
        autocomplete="off"
        enterkeyhint="search"
        aria-label="Hilfeartikel durchsuchen"
        aria-controls="help-search-list"
        :aria-expanded="showPanel ? 'true' : 'false'"
        :aria-activedescendant="active >= 0 ? `help-search-option-${active}` : undefined"
        :placeholder="placeholder"
        @focus="open = true"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="onEnter"
        @keydown.esc="open = false"
      >
      <button v-if="query" type="button" class="help-search__clear" aria-label="Suche leeren" @click="clear">
        <X :size="16" :stroke-width="2.4" aria-hidden="true" />
      </button>
    </div>

    <Transition name="help-search">
      <div v-if="showPanel" class="help-search__panel">
        <ul v-if="results.length" id="help-search-list" class="help-search__list" role="listbox" aria-label="Suchergebnisse">
          <li
            v-for="(article, i) in results"
            :id="`help-search-option-${i}`"
            :key="article.id"
            role="option"
            :aria-selected="i === active ? 'true' : 'false'"
            :class="['help-search__option', { 'is-active': i === active }]"
            @pointermove="active = i"
            @click="select(article)"
          >
            <span v-if="article.attributes.category?.name" class="ed-eyebrow help-search__cat">{{ article.attributes.category.name }}</span>
            <span class="help-search__title">{{ article.attributes.title }}</span>
            <span v-if="article.attributes.excerpt" class="help-search__excerpt">{{ article.attributes.excerpt }}</span>
          </li>
        </ul>
        <p v-else class="help-search__empty" role="status">
          {{ loading ? 'Artikel werden geladen …' : `Keine Artikel gefunden für „${query.trim()}“` }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.help-search { position: relative; width: 100%; max-width: 560px; }
.help-search__field { position: relative; display: flex; align-items: center; }
.help-search__icon { position: absolute; left: 14px; color: var(--color-content-tertiary); pointer-events: none; }
/* mirrors ui/TextInput: bg-white, border, rounded-lg, px-4 py-3, text-base */
.help-search__input {
  box-sizing: border-box; width: 100%; height: 48px; padding: 0 44px 0 44px;
  border: 1px solid var(--color-interactive-border); border-radius: 8px;
  background: var(--color-white); color: var(--color-content-primary);
  font-family: var(--ed-font-sans); font-size: 16px; line-height: 24px; font-weight: 400;
  appearance: none; transition: border-color 200ms ease, box-shadow 200ms ease;
}
.help-search__input::placeholder { color: var(--color-content-tertiary); opacity: 1; }
.help-search__input::-webkit-search-cancel-button { display: none; }
.help-search__input:hover { border-color: color-mix(in srgb, var(--color-border-focus) 50%, var(--color-interactive-border)); }
.help-search__input:focus { outline: none; border-color: var(--color-border-focus); box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-border-focus) 20%, transparent); }
.help-search__clear {
  position: absolute; right: 10px; width: 28px; height: 28px; padding: 0; border: 0; border-radius: var(--ed-pill); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; background: var(--ed-field); color: var(--ed-ink);
}
.help-search__clear:hover { background: var(--ed-sunken); }
.help-search__clear:focus-visible { outline: 2px solid var(--color-border-focus); outline-offset: 2px; }

.help-search__panel {
  position: absolute; top: calc(100% + 10px); left: 0; right: 0; z-index: 30;
  box-sizing: border-box; max-height: min(440px, 60vh); overflow-y: auto; overscroll-behavior: contain;
  padding: 8px; border-radius: 24px; background: var(--ed-paper); color: var(--ed-ink);
  box-shadow: var(--ed-shadow-float);
}
.help-search__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.help-search__option { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border-radius: 16px; cursor: pointer; }
.help-search__option.is-active { background: var(--ed-cream); }
.help-search__cat { color: var(--ed-ink-3); font-size: 11px; }
.help-search__title { font-size: 16px; line-height: 22px; font-weight: 700; }
.help-search__excerpt { font-size: 14px; line-height: 20px; color: var(--ed-ink-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.help-search__empty { margin: 0; padding: 18px 14px; font-size: 15px; line-height: 22px; color: var(--ed-ink-2); overflow-wrap: anywhere; }

.help-search-enter-active, .help-search-leave-active { transition: opacity 160ms ease, transform 200ms var(--ed-ease-out); }
.help-search-enter-from, .help-search-leave-to { opacity: 0; transform: translateY(-6px); }

@media (prefers-reduced-motion: reduce) {
  .help-search-enter-active, .help-search-leave-active { transition: none; }
}
</style>
