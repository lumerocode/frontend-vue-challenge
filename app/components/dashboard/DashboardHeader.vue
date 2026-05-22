<template>
  <header class="bg-neutral-white lg:bg-kambista-appBg border-b border-neutral-grayLight shrink-0">
    <!-- Mobile -->
    <div class="lg:hidden flex items-center justify-between h-[70px] px-4">
      <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="h-7 object-contain" />
      <button
        type="button"
        class="p-1 rounded-md hover:bg-neutral-grayBg transition-colors"
        aria-label="Abrir menú"
        @click="emit('open-menu')"
      >
        <img :src="iconHamburger" alt="" class="w-8 h-8" />
      </button>
    </div>

    <!-- Desktop: 3 columns — title | time + koinks | profile -->
    <div
      class="hidden lg:grid lg:grid-cols-[minmax(140px,1fr)_543px_minmax(180px,1fr)] lg:items-center lg:gap-4 lg:min-h-[66px] lg:py-[16px] lg:pr-[22px]"
    >
      <!-- Column 1: page title -->
      <h1 class="font-sans font-bold text-2xl text-kambista-navy">
        {{ pageTitle }}
      </h1>

      <!-- Column 2: schedule + koinks balance -->
      <div class="flex flex-row items-center justify-between gap-1.5 text-center">
        <div class="font-sans text-sm text-kambista-navy font-medium text-left leading-relaxed">
          <p>
            Horario: Lunes a viernes 9:00 am a 7:00 pm
          </p>
          <p>
            Sábados de 09:00 am a 2:00 pm
          </p>
        </div>
        <p class="font-sans text-sm font-semibold text-neutral-darkText flex items-center justify-center gap-1.5 flex-wrap">
          <span>Tienes</span>
          <span class="font-bold text-kambista-navy">2500</span>
          <span>Koinks</span>
          <img :src="iconCoin" alt="" class="w-5 h-5 shrink-0" />
        </p>
      </div>

      <!-- Column 3: user profile -->
      <div class="flex justify-end">
        <UserMenuDropdown :user-name="userName" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import UserMenuDropdown from '@/components/dashboard/UserMenuDropdown.vue'
import iconHamburger from '@/assets/img/icons/icon-hamburguer-menu.svg'
import iconCoin from '@/assets/img/illustrations/business-coin.svg'

defineProps<{
  pageTitle?: string
  userName: string
}>()

const emit = defineEmits<{
  'open-menu': []
}>()
</script>