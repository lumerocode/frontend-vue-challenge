<template>
  <div class="flex items-center gap-3 p-3 rounded-md bg-kambista-blueLight">
    <img :src="iconInfo" alt="" class="w-5 h-5 shrink-0 mt-0.5" />
    <p class="font-sans font-medium text-xs leading-[16px] text-kambista-blueInfo">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
import iconInfo from '@/assets/img/icons/icon-info-circle.svg'
</script>