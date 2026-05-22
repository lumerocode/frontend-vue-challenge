<template>
  <div class="min-h-screen bg-kambista-appBg flex flex-col">
    <header class="bg-neutral-white border-b border-neutral-grayBorder shrink-0">
      <div class="max-w-[1300px] mx-auto px-6 lg:px-8 h-[70px] lg:h-[91px] flex items-center justify-between">
        <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="object-contain w-[90px] lg:w-[160px]" />

        <button
          type="button"
          class="flex items-center gap-2 font-sans font-semibold text-sm text-kambista-navy hover:opacity-80 transition-opacity"
          @click="handleBack"
        >
          Cerrar sesión
          <img :src="iconExit" alt="" class="w-[18px] h-[18px]" aria-hidden="true" />
        </button>
      </div>
    </header>

    <main class="px-6 lg:px-10 py-8 lg:py-10">
      <slot />
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
import iconExit from '@/assets/img/icons/icon-exit.svg'
import WhatsAppButton from '~/components/shared/WhatsAppButton.vue'
import ConfirmExitModal from '@/components/shared/ConfirmExitModal.vue'

const authStore = useAuthStore()

const showExitModal = ref(false)

/* Opens the exit confirmation modal */
const handleBack = () => {
  showExitModal.value = true
}

const handleExitConfirm = () => {
  showExitModal.value = false
  authStore.logout()
}
</script>