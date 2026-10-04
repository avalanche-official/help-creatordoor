<!-- The help center's page shell, the main site's EdPage: the nav on the
     hero's violet, the stack of sheets (each view), the night footer. The
     route change fades the old page out and the new one up (`ed-page`,
     tokens/editorial.css); the page is keyed by path so moving from one
     article to another loads the new one. -->
<script setup>
import { useRoute } from 'vue-router'
import HelpNav from '@/editorial/organisms/HelpNav.vue'
import HelpFooter from '@/editorial/organisms/HelpFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="ed-page">
    <HelpNav />
    <main class="ed-page__main">
      <router-view v-slot="{ Component }">
        <Transition name="ed-page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>
    <HelpFooter />
  </div>
</template>

<style scoped>
.ed-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--ed-font-sans);
  -webkit-font-smoothing: antialiased;
  background: var(--ed-night);
}
/* The first sheet's violet, so nothing flashes behind the hero; tall enough
   that the footer does not jump while one page hands over to the next. */
.ed-page__main { display: flex; flex-direction: column; min-height: 100vh; background: var(--ed-violet); }
</style>
