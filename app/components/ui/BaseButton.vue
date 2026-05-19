<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="w-full h-[52px] flex items-center justify-center font-sans font-medium text-sm py-3 px-6 rounded-md transition-all duration-200 disabled:cursor-not-allowed"
    :class="[
      disabled || loading
        ? 'bg-kambista-mintDisabled text-neutral-black'
        : 'bg-kambista-mint text-neutral-black hover:brightness-95',
      disabled && !loading ? 'opacity-50' : ''
    ]"
  >
    <span 
      v-if="loading" 
      class="animate-spin inline-block w-5 h-5 border-2 border-kambista-navy border-t-transparent rounded-full mr-2"
    ></span>
    
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import type { BaseButtonProps } from '@/types/components'

withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  disabled: false,
  loading: false
})
</script>