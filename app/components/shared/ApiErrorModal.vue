<!-- Modal for displaying structured API errors (title + message). -->
<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="alertdialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="messageId"
    >
      <div class="absolute inset-0 bg-kambista-navy/50" aria-hidden="true" />

      <div class="relative w-full max-w-[400px] bg-neutral-white rounded-xl shadow-lg px-6 py-8 lg:px-8 lg:py-10">
        <h2
          :id="titleId"
          class="font-sans font-semibold text-base lg:text-lg text-kambista-navy text-center leading-snug"
        >
          {{ title }}
        </h2>

        <p
          :id="messageId"
          class="mt-4 font-sans text-sm text-neutral-darkText text-center leading-relaxed"
        >
          {{ message }}
        </p>

        <div class="mt-8">
          <button
            type="button"
            class="w-full h-[52px] rounded-md font-sans font-medium text-sm bg-kambista-mint text-neutral-black transition-all hover:brightness-95"
            @click="handleClose"
          >
            {{ buttonLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ApiErrorModalProps } from '@/types/components'

withDefaults(defineProps<ApiErrorModalProps>(), {
  buttonLabel: 'ENTENDIDO'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const titleId = 'api-error-modal-title'
const messageId = 'api-error-modal-message'

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>