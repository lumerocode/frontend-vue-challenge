<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-exit-title"
    >
      <div class="absolute inset-0 bg-kambista-navy/50" aria-hidden="true" />

      <div class="relative w-full max-w-[400px] bg-neutral-white rounded-xl shadow-lg px-6 py-8 md:px-8 md:py-10">
        <p
          id="confirm-exit-title"
          class="font-sans font-semibold text-base md:text-lg text-kambista-navy text-center leading-snug"
        >
          ¿Deseas salir sin completar tus datos?
        </p>

        <div class="mt-8 flex flex-col md:flex-row gap-3 w-full">
          <button
            type="button"
            class="order-1 md:order-2 w-full md:w-1/2 h-[52px] rounded-md font-sans font-medium text-sm bg-kambista-mint text-neutral-black transition-all hover:brightness-95"
            @click="emit('confirm')"
          >
            ACEPTAR
          </button>
          <button
            type="button"
            class="order-2 md:order-1 w-full md:w-1/2 h-[52px] rounded-md font-sans font-medium text-sm bg-neutral-white text-kambista-navy border border-neutral-grayBorder transition-all hover:border-kambista-mint"
            @click="emit('cancel')"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()
</script>