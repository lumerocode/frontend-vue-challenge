<template>
  <div class="min-h-screen bg-kambista-appBg flex flex-col">
    <header class="bg-neutral-white border-b border-neutral-grayBorder shrink-0">
      <div class="max-w-[1300px] mx-auto px-6 lg:px-8 h-[50px] lg:h-[91px] flex items-center justify-between">
        <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="object-contain w-[90px] lg:w-[160px]" />

        <button
          type="button"
          class="hidden lg:flex items-center gap-2 font-sans font-medium text-base text-kambista-navy hover:opacity-80 transition-opacity"
          @click="handleBack"
        >
          <img :src="iconArrowLeft" alt="" class="w-5 h-5" />
          Volver
        </button>

        <button
          type="button"
          class="lg:hidden flex items-center gap-2 font-sans font-semibold text-sm text-kambista-navy hover:opacity-80 transition-opacity"
          @click="handleBack"
        >
          Cerrar sesión
          <img :src="iconExit" alt="" class="w-[18px] h-[18px]" aria-hidden="true" />
        </button>
      </div>
    </header>

    <main class="flex-1 flex justify-center px-6 lg:px-10 py-8 lg:py-10">
      <div class="w-full max-w-100% lg:max-w-[525px]">
        <div class="lg:bg-neutral-white lg:rounded-xl lg:shadow-sm lg:px-10 lg:py-10 lg:border lg:border-neutral-grayBg">
          <slot />
        </div>
      </div>
    </main>

    <WhatsAppButton
      phone="51999999999"
      message="Hola, necesito ayuda completando mi registro en Kambista."
    />

    <ConfirmExitModal
      v-model="showExitModal"
      @confirm="handleExitConfirm"
      @cancel="showExitModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import iconArrowLeft from '@/assets/img/icons/icon-arrow-left.svg'
import iconExit from '@/assets/img/icons/icon-exit.svg'
import WhatsAppButton from '@/components/ui/WhatsAppButton.vue'
import ConfirmExitModal from '@/components/ui/ConfirmExitModal.vue'

const authStore = useAuthStore()

const showExitModal = ref(false)

/* Opens the exit confirmation modal (desktop "Volver" and mobile "Cerrar sesión"). */
const handleBack = () => {
  showExitModal.value = true
}

const handleExitConfirm = () => {
  showExitModal.value = false
  authStore.logout()
}
</script>