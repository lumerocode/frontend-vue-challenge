<template>
  <div class="relative flex items-center gap-3 p-3 pr-8 lg:pr-5 rounded-md bg-kambista-blueLight">
    <button
      v-if="props.closable"
      type="button"
      class="absolute right-3 top-3"
      @click="emit('close')"
    > 
      <img :src="iconClose" alt="Close" class="w-4 h-4" />
    </button>

    <img :src="props.iconSrc" alt="" class="w-5 h-5 shrink-0 mt-0.5" />

    <p class="font-sans font-medium text-xs leading-[16px] text-kambista-blueInfo">
      <slot>{{ props.message }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import iconInfoDefault from '@/assets/img/icons/icon-info-circle.svg'
import iconClose from '@/assets/img/icons/icon-close.svg'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = withDefaults(defineProps<{
  message?: string
  iconSrc?: string
  closable?: boolean
}>(), {
  message: '',
  iconSrc: iconInfoDefault,
  closable: false
})
</script>