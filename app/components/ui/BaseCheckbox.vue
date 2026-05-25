<template>
  <div class="w-full flex flex-col gap-1">
    <label class="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        v-model="model"
        class="sr-only peer"
        @blur="emit('blur', $event)"
      />
      <span
        class="mt-0.5 w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-colors"
        :class="[
          model
            ? 'bg-kambista-navy border-kambista-navy'
            : 'bg-neutral-white border-neutral-grayBorder group-hover:border-kambista-mint',
          error ? 'border-kambista-errorRed' : ''
        ]"
      >
        <img
          v-if="model"
          :src="iconChecked"
          alt=""
          class="w-100%"
        />
      </span>
      <span class="font-sans text-xs lg:text-sm text-neutral-darkText leading-snug">
        <slot />
      </span>
    </label>
    <p v-if="error" class="text-kambista-errorRed text-xs font-medium pl-8">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { BaseCheckboxProps } from '@/types/components'
import iconChecked from '@/assets/img/icons/icon-checkbox-checked.svg'

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

withDefaults(defineProps<BaseCheckboxProps>(), {
  error: ''
})

const model = defineModel<boolean>({ default: false })
</script>