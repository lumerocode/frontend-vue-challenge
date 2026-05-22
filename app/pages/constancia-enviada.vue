<template>
  <div class="w-full flex flex-col justify-start lg:justify-center mx-auto lg:h-[calc(100vh-172px)]">
    <section class="mx-auto max-w-[480px]">
      <div class="rounded-md border border-neutral-grayBorder bg-white p-5 lg:p-8 sm:p-10">
        <div class="text-center mb-5">
          <div class="flex justify-center">
            <img :src="transactionSuccess" alt="¡Constancia enviada!" />
          </div>
          <h2 class="font-sans font-bold text-2xl text-kambista-navy my-5">¡Constancia enviada!</h2>
        </div>
        <div class="font-sans text-sm lg:text-base flex flex-col gap-3">
          <div class="flex flex-col lg:flex-row justify-between text-kambista-navy font-bold">
            <span class="text-neutral-darkText">Código Kambista</span>
            <span class="text-base ml-3 lg:ml-0">km20ttfff</span>
          </div>
          <div class="text-neutral-darkText text-sm lg:text-xs font-medium">
            <p>*Usa tu código para dar seguimiento a tu operación.</p>
          </div>
          <div class="flex flex-col lg:flex-row justify-between text-kambista-navy font-bold">
            <span class="text-neutral-darkText">Monto a recibir</span>
            <span class="text-base ml-3 lg:ml-0">S/ 343.00</span>
          </div>
          <div class="flex flex-col lg:flex-row justify-between text-kambista-navy font-bold">
            <span class="text-neutral-darkText">Tiempo estimado de espera</span>
            <span class="text-base ml-3 lg:ml-0">20h 15min</span>
          </div>
        </div>
      </div>
      <div class="bg-gradient-kambista h-[84px] relative mt-5 rounded-md">
        <img :src="piggyBank" alt="Sorpresa" class="absolute left-0 bottom-0" />
        <img :src="giftReward" alt="Regalo" class="absolute right-0 top-0" />
        <div class="flex flex-col justify-center items-center h-[84px] text-kambista-navy text-sm font-bold gap-0.5">
          <p>Disfruta de <button class="bg-kambista-warningGold px-[6px] py-1 rounded-[20px] ml-0.5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">descuentos</button></p>
          <p>en los <span class="text-neutral-white">mejores comercios</span></p>
        </div>
      </div>  
      <div>
        <p class="my-8 text-center text-sm leading-relaxed text-neutral-grayText">  
           Verificaremos tu operación. Puedes ver su estado en “Mis operaciones”.
        </p>
      </div>
      <div>
        <BaseButton type="button" class="w-full" :loading="isLoading" @click="goHome">
          VOLVER A INICIO
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ROUTES } from '~/constants/routes'
import transactionSuccess from '@/assets/img/illustrations/transaction-success.svg'
import giftReward from '@/assets/img/illustrations/gift-rewards.svg'
import piggyBank from '@/assets/img/illustrations/piggy-bank-coins.svg'

const isLoading = ref(false)
const router = useRouter()

async function navigateWithFallback(to: string) {
  try {
    await navigateTo(to)
  } catch (e) {
    
  }
  setTimeout(() => {
    if (router.currentRoute.value.fullPath !== to) {
      window.location.href = to
    }
  }, 700)
}

const goHome = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    await navigateWithFallback(ROUTES.dashboard)
  } finally {
    isLoading.value = false
  }
}

definePageMeta({
  layout: 'basic-success'
})
</script>