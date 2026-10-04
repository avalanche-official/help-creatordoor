<!-- ═══════════════════════════════════════════════════════════════════════
     EdSection — one full-bleed sheet of a marketing page.
     ═══════════════════════════════════════════════════════════════════════
     The page rhythm lives HERE, not in views: every sheet after the hero
     pulls up over the one above it by `--ed-sheet-overlap` and rounds its
     top corners by `--ed-sheet-radius`, so the sheets read as stacked
     paper. Later siblings paint over earlier ones by document order
     (position: relative), so no z-index bookkeeping is needed.

       tone      violet | cream | night | lime | paper — the sheet and its ink
       overlap   pull up over the previous sheet (default). Set false for a
                 sheet that CONTINUES the previous one's colour (stats →
                 services on cream, steps → features on night): it then has
                 no rounded top and no overlap, and its top padding is the
                 tighter step.
       pad       default | tight | none — vertical padding; `none` for a
                 sheet that lays its own (the hero, the closing CTA).
       clip      overflow: hidden, for a sheet whose arches run off its edge.

     Its content reveals (rises and fades in) as the sheet scrolls into
     view — see templates/useReveal.js; that is the page's only motion
     besides the route transition.

     Content sits in a centred column of `--ed-max-width` with the page
     gutter; a section that needs the full bleed (a scrolling chip row on
     the phone) opts out with `bleed`.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { vEdReveal } from './useReveal'

defineProps({
  tone: { type: String, default: 'cream', validator: (v) => ['violet', 'cream', 'night', 'lime', 'paper'].includes(v) },
  overlap: { type: Boolean, default: true },
  pad: { type: String, default: 'default', validator: (v) => ['default', 'tight', 'none'].includes(v) },
  clip: { type: Boolean, default: false },
  bleed: { type: Boolean, default: false },
  as: { type: String, default: 'section' },
  id: { type: String, default: undefined },
})
</script>

<template>
  <component :is="as" :id="id" :class="['ed-section', `is-${tone}`, `pad-${pad}`, { 'is-overlap': overlap, 'is-clip': clip }]">
    <div v-ed-reveal :class="['ed-section__inner', { 'is-bleed': bleed }]">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.ed-section {
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.is-overlap {
  margin-top: calc(-1 * var(--ed-sheet-overlap));
  border-radius: var(--ed-sheet-radius) var(--ed-sheet-radius) 0 0;
}
.is-clip { overflow: hidden; }

.pad-default { padding-top: var(--ed-section-pad); padding-bottom: var(--ed-section-pad); }
.pad-tight { padding-top: var(--ed-section-pad-tight); padding-bottom: var(--ed-section-pad-tight); }
.pad-none { padding-top: 0; padding-bottom: 0; }
/* A continuing sheet starts closer to what came before it. */
.ed-section:not(.is-overlap).pad-default { padding-top: var(--ed-section-pad-tight); }

.ed-section__inner {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--ed-max-width);
  margin: 0 auto;
  padding-left: var(--ed-gutter);
  padding-right: var(--ed-gutter);
}
.ed-section__inner.is-bleed { padding-left: 0; padding-right: 0; }

.is-violet { background: var(--ed-violet); color: var(--ed-on-violet); }
.is-cream { background: var(--ed-cream); color: var(--ed-ink); }
.is-paper { background: var(--ed-paper); color: var(--ed-ink); }
.is-night { background: var(--ed-night); color: var(--ed-bone); }
.is-lime { background: var(--ed-lime); color: var(--ed-on-lime); }
</style>
