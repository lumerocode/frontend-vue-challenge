<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="label" class="font-sans font-medium text-sm text-neutral-darkText tracking-wider">
      {{ label }}
    </label>
    <div class="relative w-full">
      <input
        :type="computedType"
        :value="model"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full h-[44px] box-border font-sans font-medium text-sm bg-neutral-white border rounded-md py-3 px-4 text-kambista-navy placeholder:text-neutral-grayPlaceholder focus:outline-none transition-colors"
        :class="[
          error 
            ? 'border-kambista-errorRed focus:border-kambista-errorRed' 
            : 'border-neutral-grayBorder focus:border-kambista-mint'
        ]"
        @input="onInput"
        @blur="emit('blur', $event)"
      />
      
      <button 
        v-if="type === 'password'" 
        type="button"
        @click="togglePassword"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center focus:outline-none"
      >
        <img 
          :src="isPasswordVisible ? iconEyeOff : iconEye" 
          alt="Toggle Visibility" 
          class="w-full h-full object-contain"
        />
      </button>
    </div>
    <p v-if="error" class="text-kambista-errorRed text-xs font-medium mt-0.5 pl-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BaseInputProps } from '@/types/components'
import iconEye from '@/assets/img/icons/icon-eye.svg'
import iconEyeOff from '@/assets/img/icons/icon-eye-off.svg'

const emit = defineEmits<{
  blur: [event: FocusEvent]
  input: [value: string]
}>()

const props = withDefaults(defineProps<Omit<BaseInputProps, 'modelValue'>>(), {
  label: '',
  placeholder: '',
  type: 'text',
  autocomplete: 'off',
  error: ''
})

const model = defineModel<string>({ default: '' })

const isPasswordVisible = ref(false)

const computedType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  model.value = value
  emit('input', value)
}
</script>