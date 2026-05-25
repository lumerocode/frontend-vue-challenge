<template>
  <div class="w-full flex flex-col justify-center items-center lg:h-[calc(100vh-172px)]">
    <div class="w-full max-w-[397px] flex flex-col items-center text-center">
      <img
        src="/assets/img/illustrations/hand-holding-phone.svg"
        alt=""
        class="w-[200px] lg:w-100% h-auto mb-[28px]"
      />

      <h2 class="font-sans font-bold text-xl lg:text-2xl text-kambista-navy leading-snug mb-[28px]">
        ¡Felicitaciones {{ displayName }}, tu perfil ha sido creado!
      </h2>

      <p class="font-sans text-sm lg:text-base text-neutral-darkText leading-relaxed mb-10 lg:mb-16 max-w-[360px]">
        Ya puedes empezar a <em class="italic">Kambiar</em> con la mejor tasa del mercado
      </p>

      <div class="w-full max-w-[400px]">
        <BaseButton type="button" :loading="isLoading" @click="handleContinue">
          CONTINUAR
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { ROUTES } from '~/constants/routes'
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'basic-success'
})

const authStore = useAuthStore()
const isLoading = ref(false)
const router = useRouter()

const displayName = computed(() => authStore.userDisplayName ?? 'Usuario')

async function navigateWithFallback(to: string) {
  try {
    await navigateTo(to, { replace: true })
  } catch (e) {

  }
  setTimeout(() => {
    if (router.currentRoute.value.fullPath !== to) {
      window.location.href = to
    }
  }, 800)
}

/* Marks the profile as completed and navigates to the dashboard. */
const handleContinue = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    authStore.completeProfile()
    await new Promise(resolve => setTimeout(resolve, 800))
    await navigateWithFallback(ROUTES.dashboard)
  } finally {
    isLoading.value = false
  }
}
</script>