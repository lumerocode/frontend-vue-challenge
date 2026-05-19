<template>
  <div class="w-full flex flex-col gap-1.5" :class="wrapperClass">
    <label v-if="label" class="font-sans font-medium text-sm text-neutral-darkText tracking-wider">
      {{ label }}
    </label>
    <div class="relative w-full">
      <select
        v-model="model"
        class="w-full h-[44px] appearance-none font-sans font-medium text-sm bg-neutral-white border rounded-md py-3 pl-4 pr-10 focus:outline-none transition-colors"
        :class="[
          model ? 'text-kambista-navy' : 'text-neutral-grayPlaceholder',
          error
            ? 'border-kambista-errorRed focus:border-kambista-errorRed'
            : 'border-neutral-grayBorder focus:border-kambista-mint'
        ]"
        @blur="emit('blur', $event)"
        @change="onChange"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <img
        :src="iconArrowDown"
        alt=""
        class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
      />
    </div>
    <p v-if="error" class="text-kambista-errorRed text-xs font-medium mt-0.5 pl-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { BaseSelectProps } from '@/types/components'
import iconArrowDown from '@/assets/img/icons/icon-arrow-down.svg'

const emit = defineEmits<{
  blur: [event: FocusEvent]
  change: [value: string]
}>()

withDefaults(defineProps<BaseSelectProps & { wrapperClass?: string }>(), {
  label: '',
  placeholder: '',
  error: '',
  wrapperClass: ''
})

const model = defineModel<string>({ default: '' })

const onChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('change', value)
}
</script>