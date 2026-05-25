<!-- AddBankAccountDrawer: Side sheet for adding a new bank account. -->
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex justify-end bg-kambista-navy/50" @click="$emit('update:modelValue', false)">
      <div class="relative h-full w-full max-w-[1058px] bg-white shadow-2xl overflow-y-auto lg:rounded-tl-md lg:rounded-bl-md" @click.stop>
        <div class="flex items-center justify-between px-11 py-6 border-b border-neutral-grayLight">
          <div>
            <h2 class="font-sans font-bold text-xl text-kambista-navy">Agregar cuenta - {{ currencyLabel }}</h2>
          </div>
          <button type="button" @click="$emit('update:modelValue', false)" class="text-neutral-grayText hover:text-kambista-navy">
            <img :src="iconClose" alt="Close" class="w-4 h-4" />
          </button>
        </div>

        <div class="px-11 py-6 space-y-6">
          <div class="text-lg text-kambista-navy grid grid-cols-1 lg:gap-x-[142px] lg:gap-y-6 lg:grid-cols-2">
            <p class="font-medium">
              La cuenta que registres <span class="font-bold">debe estar a tu nombre</span> (titular de este perfil en Kambista)
            </p>
          </div>
          <div class="grid grid-cols-1 lg:gap-x-[142px] lg:gap-y-6 lg:grid-cols-2 space-y-5">
            <BaseSelect
              v-model="accountType"
              label="Tipo de cuenta"
              placeholder="Selecciona"
              :options="accountTypeOptions"
            />
            <BaseInput
              v-model="accountNumber"
              type="tel"
              label="Número de cuenta"
              placeholder="Escribe tu cuenta destino"
              :error="accountNumberError"
              @input="onAccountNumberInput"
            />
            <BaseSelect
              v-model="bank"
              label="Banco"
              placeholder="Selecciona"
              :options="bankOptions"
            />
            <BaseInput
              v-model="alias"
              label="Ponle nombre a tu cuenta"
              placeholder="Escribe un alias"
            />
            <InfoAlert
              v-if="showInfoSection"
              :icon-src="iconInfo"
              @close="showInfoSection = false"
            >
              Operamos en Lima con todos los bancos. Y en <br> provincia con el BCP y cuentas digitales Interbank.
            </InfoAlert>
            <BaseCheckbox v-model="isOwnAccount">
              <p class="font-bold text-kambista-navy text-sm">Declaro que esta cuenta es mía y NO de un tercero</p>
              <p class="block text-xs text-kambista-navy mt-1">*Es obligatorio que la cuenta esté a tu nombre para que el cambio sea exitoso</p>
            </BaseCheckbox>
            <div class="">
              <p class="font-sans text-sm text-neutral-mutedText mb-2">Moneda</p>
              <div class="grid grid-cols-2 gap-11">
                <button
                  type="button"
                  class="rounded-md border py-3 font-sans text-sm font-semibold transition-colors"
                  :class="currency === 'soles' ? 'bg-kambista-navy text-neutral-white border-kambista-navy' : 'bg-neutral-white text-neutral-darkText border-neutral-grayBorder hover:border-kambista-mint'"
                  @click="currency = 'soles'"
                >
                  SOLES
                </button>
                <button
                  type="button"
                  class="rounded-md border py-3 font-sans text-sm font-semibold transition-colors"
                  :class="currency === 'dolares' ? 'bg-kambista-navy text-neutral-white border-kambista-navy' : 'bg-neutral-white text-neutral-darkText border-neutral-grayBorder hover:border-kambista-mint'"
                  @click="currency = 'dolares'"
                >
                  DÓLARES
                </button>
              </div>
            </div>
            <div class="lg:mt-[22px]">
              <BaseButton type="button" :disabled="!canSubmit" @click="submit">
                AGREGAR Y USAR
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption } from '@/types/components'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import InfoAlert from '@/components/ui/InfoAlert.vue'
import iconClose from '@/assets/img/icons/icon-close-v4.svg'
import iconInfo from '@/assets/img/icons/icon-info-circle.svg'

type AddAccountPayload = {
  accountType: string
  name: string
  alias: string
  accountNumber: string
  currency: 'PEN' | 'USD'
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'add-account', account: AddAccountPayload): void
}>()

const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false
})

const accountType = ref('')
const bank = ref('')
const accountNumber = ref('')
const accountNumberError = ref('')
const alias = ref('')
const isOwnAccount = ref(false)
const currency = ref<'soles' | 'dolares'>('soles')
const showInfoSection = ref(true)

const currencyLabel = computed(() => currency.value === 'soles' ? 'Soles' : 'Dólares')

const accountTypeOptions: SelectOption[] = [
  { value: 'savings', label: 'Cuenta de ahorros' },
  { value: 'current', label: 'Cuenta corriente' }
]

const bankOptions: SelectOption[] = [
  { value: 'bcp', label: 'BCP' },
  { value: 'interbank', label: 'Interbank' },
  { value: 'scotiabank', label: 'Scotiabank' },
  { value: 'bbva', label: 'BBVA' },
  { value: 'pichincha', label: 'Pichincha' }
]

const canSubmit = computed(
  () => accountType.value && bank.value && accountNumber.value && alias.value && isOwnAccount.value && !accountNumberError.value
)

function onAccountNumberInput(value: string) {
  const digitsOnly = value.replace(/\D+/g, '')
  if (digitsOnly !== value) {
    accountNumberError.value = 'No está permitido letras.'
    accountNumber.value = digitsOnly
  } else {
    accountNumberError.value = ''
  }
}

const submit = () => {
  if (!canSubmit.value) return

  const bankName = bankOptions.find((option) => option.value === bank.value)?.label ?? bank.value
  const accountTypeLabel = accountType.value === 'savings' ? 'Savings Account' : 'Checking Account'

  const newAccount: AddAccountPayload = {
    accountType: accountTypeLabel,
    name: bankName,
    alias: alias.value,
    accountNumber: accountNumber.value,
    currency: currency.value === 'soles' ? 'PEN' : 'USD'
  }

  emit('add-account', newAccount)
  emit('update:modelValue', false)
}
</script>