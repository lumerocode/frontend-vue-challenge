<template>
  <div
    ref="rootRef"
    class="relative shrink-0 w-[112px] lg:w-[160px] self-stretch"
  >
    <button
      type="button"
      class="flex items-center justify-center gap-2 w-full h-full min-h-[76px] px-3 bg-kambista-navy text-neutral-white font-sans font-superbold text-base rounded-tr-[8px] rounded-br-[8px] hover:brightness-110 transition-all lg:text-xl"
      :class="isOpen ? 'brightness-110 ring-2 ring-inset ring-kambista-mint/60' : ''"
      :aria-label="ariaLabel"
      :aria-expanded="isOpen"
      @click.stop="isOpen = !isOpen"
    >
      {{ currentLabel }}
      <img
        :src="iconArrowDown"
        alt=""
        class="w-[14px] lg:w-[20px] brightness-0 invert shrink-0 transition-transform duration-200 mt-[6px]"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ul
        v-if="isOpen"
        class="absolute left-0 right-0 z-50 min-w-[112px] overflow-hidden border-2 border-kambista-deepBlue bg-neutral-white shadow-[0_8px_24px_rgba(7,23,62,0.18)] lg:min-w-[160px]"
        :class="placement === 'up' ? 'bottom-[-93px] mb-1.5' : 'top-full'"
      >
        <li
          v-for="option in menuOptions"
          :key="option.value"
        >
          <button
            type="button"
            class="w-full px-3 py-3 text-left font-sans text-sm font-semibold transition-colors"
            :class="option.isCurrent
              ? 'bg-kambista-blueLight/50 text-kambista-deepBlue cursor-default'
              : 'text-kambista-navy hover:bg-kambista-mint/20'"
            :disabled="option.isCurrent"
            @click="selectOption(option.value)"
          >
            {{ option.label }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { CurrencyCode } from '~/types/exchange'
import iconArrowDown from '@/assets/img/icons/icon-arrow-down-v2.svg'

const CURRENCY_LABEL: Record<CurrencyCode, string> = {
  USD: 'Dólares',
  PEN: 'Soles'
}

const props = withDefaults(defineProps<{
  modelValue: CurrencyCode
  ariaLabel?: string
  placement?: 'up' | 'down'
}>(), {
  placement: 'down'
})

const emit = defineEmits<{
  'update:modelValue': [value: CurrencyCode]
}>()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const currentLabel = computed(() => CURRENCY_LABEL[props.modelValue])

const menuOptions = computed(() =>
  (['USD', 'PEN'] as CurrencyCode[]).map((code) => ({
    value: code,
    label: CURRENCY_LABEL[code],
    isCurrent: code === props.modelValue
  }))
)

function selectOption(code: CurrencyCode) {
  isOpen.value = false
  if (code !== props.modelValue) {
    emit('update:modelValue', code)
  }
}

function onClickOutside(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>