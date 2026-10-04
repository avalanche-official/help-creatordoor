<!-- ═══════════════════════════════════════════════════════════════════════
     HelpFooter — the night sheet that closes every help page, the main
     site's EdFooter with the help center's content: the "Create. Connect.
     Earn." tagline, the app (store badges) and the socials where the site
     has its newsletter, the same five link columns (pointing at
     creatordoor.com, the help home staying in-app) and the legal line. It
     is itself an EdSection so it overlaps the last sheet like every other.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import EdSection from '../templates/EdSection.vue'
import EdBrandMark from '../atoms/EdBrandMark.vue'
import EdFooterColumn from '../molecules/EdFooterColumn.vue'
import EdSocialGlyph from '../atoms/EdSocialGlyph.vue'
import appStoreBadge from '@/assets/mobileApp/appstore.svg'
import googlePlayBadge from '@/assets/mobileApp/google-play.svg'

const SITE = 'https://creatordoor.com'

const socials = [
  { label: 'Twitter', href: 'https://twitter.com/creatordoor_de', icon: 'x' },
  { label: 'Instagram', href: 'https://instagram.com/creatordoor_de', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/creatordoor_de', icon: 'tiktok' },
]
const stores = [
  { label: 'Download on the App Store', href: 'https://apps.apple.com/app/creatordoor', badge: appStoreBadge },
  { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.creatordoor', badge: googlePlayBadge },
]
const columns = [
  { title: 'Schnellzugriff', links: [
    { label: 'Startseite', href: SITE },
    { label: 'Dashboard', href: `${SITE}/dashboard` },
    { label: 'Registrieren', href: `${SITE}/register` },
    { label: 'Login', href: `${SITE}/login` },
  ] },
  { title: 'Plattform', links: [
    { label: 'Preise', href: `${SITE}/preise` },
    { label: 'Marktplatz', href: `${SITE}/marketplace` },
    { label: 'Wechsel zu Creatordoor', href: `${SITE}/migration-service` },
    { label: 'Zahlungsmethoden', href: `${SITE}/payment-methods` },
    { label: 'Alle Features', href: `${SITE}/features` },
  ] },
  { title: 'Tools', links: [
    { label: 'Link Shortener', href: `${SITE}/tools/link-shortener` },
    { label: 'Kompressor', href: `${SITE}/tools/compressor` },
    { label: 'Passwort teilen', href: `${SITE}/tools/password-share` },
  ] },
  { title: 'Support', links: [
    { label: 'Hilfe-Center', to: '/' },
    { label: 'Statusseite', href: 'https://creatordoorstatus.statuspage.io/' },
    { label: 'Kontakt', href: `${SITE}/contact` },
    { label: 'Blog', href: `${SITE}/blog` },
  ] },
  { title: 'Legal', links: [
    { label: 'AGB', href: `${SITE}/agb` },
    { label: 'Datenschutz', href: `${SITE}/datenschutz` },
    { label: 'Impressum', href: `${SITE}/impressum` },
  ] },
]
const year = new Date().getFullYear()
</script>

<template>
  <EdSection as="footer" tone="night" pad="none" clip>
    <div class="ed-footer">
      <div class="ed-footer__top">
        <div class="ed-display-3 ed-footer__tagline">Create.<br>Connect.<br>Earn.</div>
        <div class="ed-footer__app">
          <div class="ed-footer__app-title">Hol dir unsere App</div>
          <div class="ed-footer__stores">
            <a v-for="s in stores" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer" :aria-label="s.label" class="ed-footer__store ed-focusable">
              <img :src="s.badge" :alt="s.label">
            </a>
          </div>
          <div class="ed-footer__socials">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer" :aria-label="s.label" class="ed-footer__social ed-focusable">
              <EdSocialGlyph :name="s.icon" :size="44" />
            </a>
          </div>
        </div>
      </div>
      <div class="ed-footer__columns">
        <EdFooterColumn v-for="c in columns" :key="c.title" :title="c.title" :links="c.links" />
      </div>
      <div class="ed-footer__legal">
        <EdBrandMark :size="30" class="ed-footer__brand" />
        <span class="ed-footer__copy">© {{ year }} Creatordoor. Alle Rechte vorbehalten.</span>
      </div>
    </div>
  </EdSection>
</template>

<style scoped>
.ed-footer { display: flex; flex-direction: column; gap: 40px; padding-top: 64px; padding-bottom: 32px; }
.ed-footer__top { display: flex; flex-direction: column; gap: 40px; }
.ed-footer__tagline { font-size: clamp(40px, 1.1vw + 32px, 58px); }
.ed-footer__app { display: flex; flex-direction: column; gap: 14px; }
.ed-footer__app-title { font-family: var(--ed-font-display); font-weight: 700; font-size: 24px; line-height: 28px; letter-spacing: -0.02em; }
.ed-footer__stores { display: flex; flex-wrap: wrap; gap: 12px; }
.ed-footer__store { display: inline-flex; border-radius: 10px; }
.ed-footer__store img { display: block; height: 44px; width: auto; }
.ed-footer__store:hover { opacity: 0.86; }
.ed-footer__socials { display: flex; gap: 12px; margin-top: 8px; }
.ed-footer__social { width: 48px; height: 48px; border-radius: var(--ed-pill); background: var(--ed-night-chip); color: var(--ed-bone); display: flex; align-items: center; justify-content: center; }
.ed-footer__social:hover { opacity: 0.82; }

.ed-footer__columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 12px; border-top: 1px solid var(--ed-line-night); padding-top: 36px; }
.ed-footer__legal { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--ed-line-night); padding-top: 24px; }
.ed-footer__brand { color: var(--ed-bone); }
.ed-footer__copy { font-family: var(--ed-font-mono); font-size: 12px; line-height: 18px; color: var(--ed-bone-3); }

@media (min-width: 600px) {
  .ed-footer__columns { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .ed-footer { gap: 72px; padding-top: 112px; padding-bottom: 48px; }
  .ed-footer__top { flex-direction: row; align-items: flex-start; gap: 64px; }
  .ed-footer__tagline { flex: 1 1 0; }
  .ed-footer__app { width: 520px; flex: 0 0 auto; gap: 16px; }
  .ed-footer__app-title { font-size: 30px; line-height: 32px; }
  .ed-footer__socials { margin-top: 12px; }
  .ed-footer__columns { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 40px; padding-top: 48px; }
  .ed-footer__legal { flex-direction: row; align-items: flex-end; justify-content: space-between; gap: 24px; padding-top: 32px; }
  .ed-footer__copy { font-size: 13px; line-height: 20px; }
}
</style>
