<template>
  <div class="min-h-screen bg-kambista-appBg flex items-center justify-center px-6">
    <div class="w-full max-w-[420px] text-center">
      <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="h-10 mx-auto mb-6" />

      <h1 class="font-sans font-bold text-2xl text-kambista-navy mb-2">
        Bienvenido a Kambista
      </h1>

      <p class="font-sans text-sm text-neutral-darkText mb-8">
        La mejor tasa del mercado para tus operaciones de cambio.
      </p>

      <div class="flex flex-col gap-3">
        <NuxtLink
          v-if="!authStore.isAuthenticated"
          :to="ROUTES.login"
          class="w-full h-[52px] flex items-center justify-center font-sans font-medium text-sm bg-kambista-mint text-neutral-black rounded-md hover:brightness-95 transition-all"
        >
          INICIAR SESIÓN
        </NuxtLink>

        <NuxtLink
          v-else-if="authStore.needsOnboarding"
          :to="ROUTES.onboarding"
          class="w-full h-[52px] flex items-center justify-center font-sans font-medium text-sm bg-kambista-mint text-neutral-black rounded-md hover:brightness-95 transition-all"
        >
          COMPLETAR MIS DATOS
        </NuxtLink>

        <NuxtLink
          v-else
          :to="ROUTES.dashboard"
          class="w-full h-[52px] flex items-center justify-center font-sans font-medium text-sm bg-kambista-mint text-neutral-black rounded-md hover:brightness-95 transition-all"
        >
          IR AL PANEL
        </NuxtLink>

        <button
          v-if="authStore.isAuthenticated"
          type="button"
          class="font-sans font-medium text-sm text-kambista-navy underline"
          @click="authStore.logout()"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Public landing page — accessible with or without authentication. */
import { useAuthStore } from '~/stores/auth'
import { ROUTES } from '~/constants/routes'

const authStore = useAuthStore()
</script>