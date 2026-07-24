<!-- components/organisms/HelpHeader/HelpHeader.vue
     Dark header matching the creatordoor.com marketing header: black bar,
     white logo left, ghost "Anmelden" + white pill "Registrieren" right. -->
<script setup>
import Logo from '@/components/atoms/Logo/Logo.vue'
</script>

<template>
  <header class="w-full bg-black">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left: white wordmark (same asset as the webapp header) → help home -->
        <Logo variant="wordmark-white" size="x-mini" href="/" />

        <!-- Right: auth buttons (same look as the main site header) -->
        <div class="flex items-center gap-1.5">
          <a
            href="https://creatordoor.com/login"
            class="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Anmelden
          </a>
          <a
            href="https://creatordoor.com/register"
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-[#141414] hover:opacity-90 active:opacity-80 transition-opacity"
          >
            Registrieren
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
