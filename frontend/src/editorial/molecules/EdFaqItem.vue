<!-- ═══════════════════════════════════════════════════════════════════════
     EdFaqItem — one fold in a cream list, a native <details>/<summary> so
     it is keyboard- and screen-reader-complete without script: the summary
     is the title with a chevron in a round button, the body sits under it.
     Ported from the main site; the one difference is the default SLOT, so
     a help category can put its article links in the body (`content` still
     works for a plain answer).

     Motion, kept quiet: the summary click is taken over so the body opens
     and closes with a short height animation only — no fade, no slide —
     and `open` is dropped once it has shut. The chevron's disc fills dark
     and turns. Reduced motion toggles instantly.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, default: undefined },
  /** A quiet mono note beside the title (the number of articles). */
  note: { type: String, default: undefined },
  open: { type: Boolean, default: false },
})

const details = ref(null)
const body = ref(null)
const expanded = ref(props.open)
let running = null

const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)'

const toggle = (event) => {
  event.preventDefault()
  const d = details.value
  const b = body.value
  if (!d || !b) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const from = running ? b.getBoundingClientRect().height : null
  running?.cancel()
  running = null

  if (!expanded.value) {
    expanded.value = true
    d.open = true
    if (reduce || !b.animate) return
    const to = b.scrollHeight
    running = b.animate([{ height: `${from ?? 0}px` }, { height: `${to}px` }], { duration: 260, easing: EASE })
    running.onfinish = () => { running = null }
  } else {
    expanded.value = false
    if (reduce || !b.animate) { d.open = false; return }
    running = b.animate([{ height: `${from ?? b.offsetHeight}px` }, { height: '0px' }], { duration: 220, easing: EASE })
    running.onfinish = () => { d.open = false; running = null }
  }
}
</script>

<template>
  <details ref="details" :class="['ed-faq', { 'is-open': expanded }]" :open="open || undefined">
    <summary class="ed-faq__summary ed-focusable" @click="toggle">
      <span class="ed-faq__title">{{ title }}</span>
      <span v-if="note" class="ed-faq__note">{{ note }}</span>
      <span class="ed-faq__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </span>
    </summary>
    <div ref="body" class="ed-faq__body">
      <div class="ed-faq__content">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </details>
</template>

<style scoped>
.ed-faq { border-bottom: 1px solid var(--ed-line-cream); }
.ed-faq__summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  min-height: 44px;
  cursor: pointer;
  list-style: none;
  border-radius: 8px;
}
.ed-faq__summary::-webkit-details-marker { display: none; }
.ed-faq__title {
  flex: 1 1 0;
  font-family: var(--ed-font-display); font-weight: 700; font-size: clamp(20px, 0.6vw + 16px, 28px); line-height: 1.15; letter-spacing: -0.02em;
}
.ed-faq__note { flex: 0 0 auto; font-family: var(--ed-font-mono); font-size: 13px; line-height: 18px; color: var(--ed-ink-3); }

.ed-faq__icon {
  flex: 0 0 auto;
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--ed-sunken); color: var(--ed-ink);
  transition: background-color 200ms ease, color 200ms ease, transform 260ms var(--ed-ease-out);
}
.ed-faq__summary:hover .ed-faq__icon { background: var(--ed-line-cream); }
.ed-faq.is-open .ed-faq__icon { background: var(--ed-ink); color: var(--ed-lime); transform: rotate(180deg); }

.ed-faq__body { overflow: hidden; }
.ed-faq__content { padding: 0 0 28px; font-size: 17px; line-height: 1.6; color: var(--ed-ink-2); }

@media (min-width: 1024px) {
  .ed-faq__summary { gap: 24px; padding: 28px 0; }
  .ed-faq__icon { width: 48px; height: 48px; }
}
@media (prefers-reduced-motion: reduce) {
  .ed-faq__icon { transition: none; }
}
</style>
