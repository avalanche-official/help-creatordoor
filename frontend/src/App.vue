<script setup>
import HelpHeader from '@/components/organisms/HelpHeader/HelpHeader.vue'
import Footer from './components/templates/Footer/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Dark header matching the main website -->
    <HelpHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>