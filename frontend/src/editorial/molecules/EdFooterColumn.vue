<!-- ═══════════════════════════════════════════════════════════════════════
     EdFooterColumn — one column of the footer's link grid: a bone eyebrow
     and a list of links. A link is `{ label, to }` for an in-app route or
     `{ label, href }` for an external page; each is at least 24px tall so
     the list stays tappable.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
defineProps({
  title: { type: String, required: true },
  links: { type: Array, required: true },
})
</script>

<template>
  <div class="ed-footer-col">
    <div class="ed-eyebrow ed-footer-col__title">{{ title }}</div>
    <template v-for="link in links" :key="link.label">
      <RouterLink v-if="link.to" :to="link.to" class="ed-footer-col__link ed-focusable">{{ link.label }}</RouterLink>
      <a v-else :href="link.href" class="ed-footer-col__link ed-focusable" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
    </template>
  </div>
</template>

<style scoped>
.ed-footer-col { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.ed-footer-col__title { color: var(--ed-bone-3); }
.ed-footer-col__link { font-size: 15px; line-height: 22px; font-weight: 500; text-decoration: none; color: var(--ed-bone); min-height: 24px; border-radius: 4px; }
.ed-footer-col__link:hover { opacity: 0.82; }
</style>
