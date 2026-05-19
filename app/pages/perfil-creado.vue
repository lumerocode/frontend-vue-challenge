<template>
  <div class="w-full max-w-[397px] flex flex-col items-center text-center">
    <img
      src="/assets/img/illustrations/hand-holding-phone.svg"
      alt=""
      class="w-[200px] md:w-100% h-auto mb-[28px]"
    />

    <h2 class="font-sans font-bold text-xl md:text-2xl text-kambista-navy leading-snug mb-[28px]">
      ¡Felicitaciones {{ displayName }}, tu perfil ha sido creado!
    </h2>

    <p class="font-sans text-sm md:text-base text-neutral-darkText leading-relaxed mb-10 md:mb-16 max-w-[360px]">
      Ya puedes empezar a <em class="italic">Kambiar</em> con la mejor tasa del mercado
    </p>

    <div class="w-full max-w-[400px]">
      <BaseButton type="button" @click="handleContinue">
        CONTINUAR
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Post-onboarding success screen shown before redirecting to the dashboard. */
import { useAuthStore } from '~/stores/auth'
import { ROUTES } from '~/constants/routes'
import BaseButton from '@/components/ui/BaseButton.vue'

definePageMeta({
  layout: 'profile-success'
})

const authStore = useAuthStore()

const displayName = computed(() => authStore.userDisplayName ?? 'Usuario')

/* Marks the profile as completed and navigates to the dashboard. */
const handleContinue = async () => {
  authStore.completeProfile()
  await navigateTo(ROUTES.dashboard, { replace: true })
}
</script>