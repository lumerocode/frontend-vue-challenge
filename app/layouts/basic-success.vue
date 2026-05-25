<template>
  <div class="min-h-screen bg-kambista-appBg flex flex-col">
    <header class="bg-neutral-white border-b border-neutral-grayBorder shrink-0">
      <div class="max-w-[1300px] mx-auto px-6 lg:px-8 h-[70px] lg:h-[91px] flex items-center justify-between">
        <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="object-contain w-[90px] lg:w-[160px]" />
      </div>
    </header>

    <main class="px-6 lg:px-10 py-8 lg:py-10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
