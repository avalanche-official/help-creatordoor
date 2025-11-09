<script setup>
import SimpleHeader from '@/components/organisms/SimpleHeader/SimpleHeader.vue'
import Footer from './components/templates/Footer/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header with Auth Buttons -->
    <SimpleHeader 
      py="4" 
      :showCloseButton="false"
      :showButtons="true"
      :primaryButton="{
        text: 'Registrieren',
        variant: 'primary',
        size: 'small',
        show: true,
        href: 'https://creatordoor.com/register'
      }"
      :secondaryButton="{
        text: 'Anmelden',
        variant: 'outline',
        size: 'small',
        show: false,
        href: '/login'
      }"
    />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>