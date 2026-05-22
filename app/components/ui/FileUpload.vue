<template>
  <div class="w-full flex flex-col gap-3">
    <label v-if="label" class="font-sans font-normal text-sm text-kambista-navy tracking-wider">
      {{ label }}
    </label>

    <label
      class="w-full flex items-center justify-between rounded-2xl border border-neutral-grayBorder px-4 py-3 text-sm text-neutral-darkText cursor-pointer transition-colors hover:border-kambista-navy"
    >
      <span class="truncate">{{ fileName || placeholder }}</span>
      <img :src="iconUploadPicture" alt="Upload" class="w-5 h-5" />
      <input
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileChange"
      />
    </label>

    <p v-if="helperText" class="text-xs text-neutral-darkText">
      {{ helperText }}
    </p>

    <p v-if="error" class="text-kambista-errorRed text-xs">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import iconUploadPicture from '@/assets/img/icons/icon-upload-picture-v2.svg'

const props = withDefaults(defineProps<{
  label?: string
  placeholder?: string
  accept?: string
  maxSizeMb?: number
  helperText?: string
}>(), {
  label: 'Sube el archivo de tu constancia',
  placeholder: 'Selecciona archivo',
  accept: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  maxSizeMb: 10,
  helperText: '*Tamaño máximo permitido del archivo 10 Mb'
})

const file = defineModel<File | null>({ default: null })
const error = ref('')

const fileName = computed(() => file.value?.name ?? '')

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const selectedFile = input.files?.[0] ?? null

  if (!selectedFile) {
    file.value = null
    error.value = ''
    return
  }

  if (selectedFile.size > (props.maxSizeMb ?? 10) * 1024 * 1024) {
    file.value = null
    error.value = `El tamaño máximo es ${props.maxSizeMb}MB.`
    return
  }

  file.value = selectedFile
  error.value = ''
}
</script>
