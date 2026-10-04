<!-- ═══════════════════════════════════════════════════════════════════════
     HelpClosing — the violet sheet a help page ends on, the main site's
     EdClosingSheet with the help center's own question: "Noch mehr
     Hilfe?", one line, the xl lime button that writes to support, the
     address as the note, and the blaze + night arch pair on the footer's
     edge.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import EdSection from '../templates/EdSection.vue'
import EdButton from '../atoms/EdButton.vue'
import EdArches from '../atoms/EdArches.vue'

const SUPPORT = 'support@creatordoor.com'
</script>

<template>
  <EdSection id="kontakt" tone="violet" pad="none" clip>
    <div class="ed-closing">
      <div class="ed-closing__copy">
        <h2 class="ed-display-1 ed-closing__title">Noch mehr Hilfe?</h2>
        <p class="ed-lead ed-closing__text">Nichts Passendes gefunden? Schreib uns – wir helfen dir persönlich weiter.</p>
        <EdButton label="Kontaktiere uns" :href="`mailto:${SUPPORT}`" tone="lime" size="xl" class="ed-closing__cta" />
        <div class="ed-closing__note">{{ SUPPORT }}</div>
      </div>
      <div class="ed-closing__art"><EdArches :width="340" outer="night" inner="lime" side="blaze" class="ed-closing__arches" /></div>
    </div>
  </EdSection>
</template>

<style scoped>
.ed-closing { display: flex; flex-direction: column; gap: 16px; padding-top: 72px; }
.ed-closing__copy { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; }
.ed-closing__title { font-size: clamp(42px, 2.8vw + 32px, 92px); line-height: 0.9; }
.ed-closing__text { max-width: 620px; color: var(--ed-on-violet-soft); }
.ed-closing__cta { width: 100%; }
.ed-closing__note { font-size: 15px; line-height: 22px; color: var(--ed-on-violet-muted); }
.ed-closing__art { display: flex; justify-content: center; align-items: flex-end; height: 330px; }
.ed-closing__arches { transform: scale(0.6); transform-origin: bottom center; }
@media (min-width: 600px) { .ed-closing__cta { width: auto; } }
@media (min-width: 1024px) {
  .ed-closing { flex-direction: row; align-items: flex-end; gap: 48px; padding-top: 140px; }
  .ed-closing__copy { flex: 1 1 0; gap: 32px; padding-bottom: 176px; }
  .ed-closing__art { flex: 0 0 auto; height: auto; }
  .ed-closing__arches { transform: none; }
}
</style>
