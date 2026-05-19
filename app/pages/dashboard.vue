<template>
  <div class="min-h-screen bg-kambista-appBg flex flex-col">
    <header class="bg-neutral-white border-b border-neutral-grayBorder">
      <div class="max-w-[1300px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="h-8 object-contain" />
        <button
          type="button"
          class="font-sans font-medium text-sm text-kambista-navy underline hover:opacity-80"
          @click="authStore.logout()"
        >
          Cerrar sesión
        </button>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-[480px] text-center">
        <h1 class="font-sans font-bold text-2xl text-kambista-navy mb-3">
          Hola, {{ displayName }}
        </h1>
        <p class="font-sans text-sm text-neutral-darkText mb-8">
          Este es tu panel principal. Desde aquí podrás gestionar tus operaciones de cambio.
        </p>
        <NuxtLink
          :to="ROUTES.home"
          class="font-sans font-medium text-sm text-kambista-navy underline hover:opacity-80"
        >
          Volver al inicio
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
/* Authenticated dashboard shown after onboarding is completed. */
import { useAuthStore } from '~/stores/auth'
import { ROUTES } from '~/constants/routes'

const authStore = useAuthStore()

const displayName = computed(
  () => authStore.userDisplayName ?? authStore.userEmail ?? 'Usuario'
)
</script>