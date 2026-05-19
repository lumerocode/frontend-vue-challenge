<template>
  <div class="min-h-screen bg-kambista-appBg flex flex-col">
    <header class="shrink-0">
      <div class="md:hidden px-6 py-5">
        <h1 class="font-sans font-bold text-base text-kambista-navy text-center">
          Perfil creado con éxito
        </h1>
      </div>
      <div class="hidden md:flex max-w-[1300px] mx-auto px-10 h-[72px] items-center">
        <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="h-8 object-contain" />
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center px-6 md:px-10 py-8 md:py-12">
      <slot />
    </main>

    <WhatsAppButton />
  </div>
</template>

<script setup lang="ts">
import WhatsAppButton from '@/components/ui/WhatsAppButton.vue'
</script>
