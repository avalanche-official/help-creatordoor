<!-- ═══════════════════════════════════════════════════════════════════════
     HelpNav — the help center's top bar, on the hero's violet. The main
     site's EdNav without its menus: the brand (→ help home), from 1024px
     the links back to the website, an outlined Login and the lime
     "Kostenlos starten". On a phone only the brand and the lime button
     remain. Like EdNav it is part of the hero sheet, not fixed, so it
     scrolls away with the hero and nothing overlays content.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import EdBrandMark from '../atoms/EdBrandMark.vue'
import EdButton from '../atoms/EdButton.vue'

const SITE = 'https://creatordoor.com'
const links = [
  { label: 'Website', href: SITE },
  { label: 'Blog', href: `${SITE}/blog` },
  { label: 'Kontakt', href: `${SITE}/contact` },
  { label: 'Status', href: 'https://creatordoorstatus.statuspage.io/' },
]
</script>

<template>
  <nav class="ed-nav" aria-label="Hauptnavigation">
    <div class="ed-nav__inner">
      <RouterLink to="/" class="ed-nav__brand ed-focusable" aria-label="Creatordoor Hilfe-Center">
        <EdBrandMark :size="28" />
        <span class="ed-nav__tag">Hilfe</span>
      </RouterLink>
      <div class="ed-nav__spacer" />
      <div class="ed-nav__links">
        <a v-for="l in links" :key="l.label" :href="l.href" class="ed-nav__link ed-focusable">{{ l.label }}</a>
      </div>
      <EdButton label="Login" :href="`${SITE}/login`" tone="outline-light" size="md" class="ed-nav__login" />
      <EdButton label="Kostenlos starten" :href="`${SITE}/register`" tone="lime" size="md" class="ed-nav__cta is-wide" />
      <EdButton label="Registrieren" :href="`${SITE}/register`" tone="lime" size="md" class="ed-nav__cta is-phone" />
    </div>
  </nav>
</template>

<style scoped>
.ed-nav { position: relative; width: 100%; background: var(--ed-violet); color: var(--ed-on-violet); }
.ed-nav__inner {
  box-sizing: border-box;
  max-width: var(--ed-max-width);
  margin: 0 auto;
  padding: 20px var(--ed-gutter);
  display: flex;
  align-items: center;
  gap: 12px;
}
.ed-nav__brand { display: inline-flex; align-items: center; gap: 12px; min-width: 0; color: inherit; text-decoration: none; border-radius: 8px; }
.ed-nav__tag { display: none; padding: 5px 12px; border-radius: var(--ed-pill); background: var(--ed-violet-glass); font-size: 13px; line-height: 18px; font-weight: 700; }
.ed-nav__spacer { flex: 1 1 auto; }
.ed-nav__links { display: none; align-items: center; gap: 36px; }
.ed-nav__link { font-size: 16px; font-weight: 600; text-decoration: none; color: inherit; border-radius: 6px; }
.ed-nav__link:hover { opacity: 0.82; }
.ed-nav__login, .ed-nav__cta.is-wide { display: none; }
/* The narrowest phones: the mark alone, so the button never wraps. */
@media (max-width: 359px) { .ed-nav__brand :deep(.nd-brand__word) { display: none; } }

@media (min-width: 600px) {
  .ed-nav__tag { display: inline-flex; }
  .ed-nav__login, .ed-nav__cta.is-wide { display: inline-flex; }
  .ed-nav__cta.is-phone { display: none; }
}
@media (min-width: 1024px) {
  .ed-nav__inner { padding-top: 28px; padding-bottom: 28px; gap: 36px; }
  .ed-nav__links { display: flex; }
  .ed-nav__login { margin-right: -24px; }
}
</style>
