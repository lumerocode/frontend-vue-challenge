<template>
  <div class="min-h-screen bg-kambista-appBg">
    <header class="bg-neutral-white border-b border-neutral-grayBorder shrink-0">
      <div class="max-w-[1300px] mx-auto px-6 lg:grid lg:grid-cols-[minmax(140px,1fr)_652px_minmax(180px,1fr)] lg:items-center lg:px-8 h-[140px] lg:h-[91px]">
        <!-- Mobile header: logo and text -->
        <div class="w-full lg:hidden flex flex-col">
          <div class="flex items-center justify-between py-3 h-[70px]">
            <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="object-contain w-[90px]" />
            <button
              type="button"
              class="flex items-center gap-2 font-sans font-medium text-base text-kambista-navy hover:opacity-80 transition-opacity"
              @click="handleBack"
            >
              <img :src="iconArrowLeft" alt="" class="w-5 h-5" />
              <div class="mt-[2px]">Volver</div>
            </button>
          </div>

          <div class="px-4 pb-3 pt-4">
            <div class="w-full flex items-center justify-between relative">
              <div class="absolute inset-x-0 top-[5px] z-0 flex items-center px-6">
                <div :class="['h-0.5 w-1/2 rounded-full transition-colors', currentStep >= 2 ? 'bg-kambista-navy' : 'bg-neutral-grayBorder']"></div>
                <div :class="['h-0.5 w-1/2 rounded-full transition-colors', currentStep >= 3 ? 'bg-kambista-navy' : 'bg-neutral-grayBorder']"></div>
              </div>

              <div class="flex flex-col items-center z-10">
                <div :class="['w-3 h-3 rounded-full border-2', currentStep >= 1 ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-grayBorder border-neutral-grayBorder']"></div>
                <span class="mt-1 text-[11px]" :class="currentStep >= 1 ? 'text-kambista-navy' : 'text-neutral-grayText'">Completa</span>
              </div>

              <div class="flex flex-col items-center z-10">
                <div :class="['w-3 h-3 rounded-full border-2', currentStep >= 2 ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-grayBorder border-neutral-grayBorder']"></div>
                <span class="mt-1 text-[11px]" :class="currentStep >= 2 ? 'text-kambista-navy' : 'text-neutral-grayText'">Transfiere</span>
              </div>

              <div class="flex flex-col items-center z-10">
                <div :class="['w-3 h-3 rounded-full border-2', currentStep >= 3 ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-grayBorder border-neutral-grayBorder']"></div>
                <span class="mt-1 text-[11px]" :class="currentStep >= 3 ? 'text-kambista-navy' : 'text-neutral-grayText'">Constancia</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop header: original layout (visible on lg+) -->
        <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="hidden lg:block object-contain w-[90px] lg:w-[160px]" />

        <!-- Steps -->
        <div class="hidden lg:flex-1 lg:flex lg:flex-col lg:items-center lg:w-full">
          <div class="w-full flex items-center justify-between relative">
            <div class="absolute inset-x-0 top-2 z-0 flex items-center px-12 lg:pl-[23px] lg:pr-12">
              <div :class="['h-0.5 w-1/2 rounded-full transition-colors', currentStep >= 2 ? 'bg-kambista-navy' : 'bg-neutral-grayBorder']"></div>
              
              <div :class="['h-0.5 w-1/2 rounded-full transition-colors', currentStep >= 3 ? 'bg-kambista-navy' : 'bg-neutral-grayBorder']"></div>
            </div>

            <div class="flex flex-col items-center z-10">
              <div :class="['w-4 h-4 rounded-full border-2', currentStep >= 1 ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-grayBorder border-neutral-grayBorder']"></div>
              <span class="mt-2 text-xs font-sans font-semibold" :class="currentStep >= 1 ? 'text-kambista-navy' : 'text-neutral-grayText'">Completa</span>
            </div>

            <div class="flex flex-col items-center z-10">
              <div :class="['w-4 h-4 rounded-full border-2', currentStep >= 2 ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-grayBorder border-neutral-grayBorder']"></div>
              <span class="mt-2 text-xs font-sans" :class="currentStep >= 2 ? 'text-kambista-navy' : 'text-neutral-grayText'">Transfiere</span>
            </div>

            <div class="flex flex-col items-center z-10">
              <div :class="['w-4 h-4 rounded-full border-2', currentStep >= 3 ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-grayBorder border-neutral-grayBorder']"></div>
              <span class="mt-2 text-xs font-sans" :class="currentStep >= 3 ? 'text-kambista-navy' : 'text-neutral-grayText'">Envía constancia</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="hidden lg:flex items-center gap-2 font-sans font-medium text-base lg:text-xl text-kambista-navy hover:opacity-80 lg:justify-end transition-opacity"
          @click="handleBack"
        >
          <img :src="iconArrowLeft" alt="" class="w-5 h-5" />
          <div class="mt-[2px]">Volver</div>
        </button>
      </div>
    </header>

    <main class="px-6 lg:px-10 py-8 lg:py-10">

      <div class="w-full flex flex-col justify-start lg:justify-center mx-auto lg:h-[calc(100vh-172px)]">
        <h1 v-if="currentStep === 1" 
            class="font-sans font-bold text-kambista-navy text-xl lg:text-2xl leading-tight text-center mb-6">
          Completa los datos de tu operación
        </h1>

        <!-- Step 1: Complete operation details -->
        <div v-if="currentStep === 1" class="max-w-100% lg:w-[410px] flex flex-col mx-auto">
          <section class="bg-neutral-white rounded-md py-4 px-6">
            <div class="font-sans text-sm lg:text-base flex flex-col gap-3">
              <div class="flex justify-between text-kambista-navy">
                <span>Tú envías</span>
                <span class="font-bold">{{ amountSendText }}</span>
              </div>
              <div class="flex justify-between text-kambista-navy">
                <span>Tú recibes</span>
                <span class="font-bold">{{ amountReceiveText }}</span>
              </div>
              <div class="flex justify-between text-kambista-navy">
                <span>Cupón aplicado</span>
                <span class="font-bold">{{ couponAppliedText }}</span>
              </div>
            </div>

            <div class="border-t border-neutral-grayLight mt-3 pt-3 flex items-center justify-between">
              <span class="font-sans font-bold text-sm lg:text-base text-kambista-navy">Tipo de cambio utilizado</span>
              <div class="flex items-center gap-2 font-sans font-bold text-sm lg:text-base">
                <span class="text-kambista-errorRed line-through">{{ oldRateText }}</span>
                <span class="text-kambista-navy">{{ currentRateText }}</span>
              </div>
            </div>
          </section>

          <InfoAlert
            v-if="showInfoSection"
            :icon-src="iconInfo"
            :closable="true"
            class="mt-3"
            @close="showInfoSection = false"
          >
            Tiempo estimado de espera <b>BCP, Interbank, BanBif y Pichincha: 15 minutos</b> (Aplica para cualquier monto). Otros bancos 1 día útil.
          </InfoAlert>

          <form class="mt-3 space-y-3" @submit.prevent="handleContinue">
            <div>
              <p class="font-sans text-[14px] text-neutral-darkText mb-1.5">¿Desde qué banco nos envías tu dinero?</p>
              <BaseSelect v-model="senderBank" placeholder="Selecciona" :options="bankOptions" />
            </div>

            <div>
              <p class="font-sans text-[14px] text-neutral-darkText mb-1.5">¿En qué cuenta deseas recibir tu dinero?</p>
              <div class="relative">
                <BaseSelect
                  v-model="receiverBank"
                  placeholder="Selecciona"
                  :options="selectedReceiverOption"
                  @mousedown.prevent="openReceiverBankModal"
                />
              </div>
            </div>
            <!-- BankAccountsModal modal -->
            <BankAccountsModal v-model="showAccountsModal" @select="selectReceiverBank" />

            <section v-if="showRewardSection" class="rounded-md bg-kambista-rewardBg p-3 relative">
              <button type="button" class="absolute right-3 top-3" @click="showRewardSection = false">
                <img :src="iconCloseV2" alt="" class="w-4 h-4" />
              </button>
              <div class="flex items-center gap-2">
                <img :src="iconShieldAlert" alt="" class="w-[24px] shrink-0" />
                <p class="font-sans text-xs font-medium text-kambista-rewardText leading-snug">
                  Recuerda que las cuentas deben estar a <b>tu nombre</b>. Kambista no <b>transfiere a cuentas de terceros</b>
                </p>
              </div>
            </section>

            <div>
              <p class="font-sans text-[14px] text-neutral-darkText mb-1.5">Origen de fondos</p>
              <BaseSelect v-model="sourceFund" placeholder="Selecciona" :options="sourceFundsOptions" />
            </div>

            <div class="pt-2">
              <BaseButton type="submit" :disabled="isContinueDisabled">
                CONTINUAR
              </BaseButton>
            </div>
          </form>
        </div>

        <!-- Step 2: Transfer to Kambista -->
        <div v-else-if="currentStep === 2" class="mx-auto w-full max-w-[536px] lg:px-0">
          <div class="text-neutral-darkText font-medium text-base">
            <p class="text-center">
              El tipo de cambio podría actualizarse a las: <span class="font-semibold text-lg lg:text-xl">{{ updateTime }}</span>
            </p>
          </div>
          <div class="bg-neutral-white rounded-md border border-neutral-grayBorder p-6 lg:p-8 shadow-sm mt-4 lg:mt-8">
            <div class="text-center mb-5">
              <div class="flex justify-center">
                <img :src="TransferToKambista" alt="Transfiere a Kambista" />
              </div>
              <h2 class="font-sans font-bold text-2xl text-kambista-navy my-5">Transfiere a Kambista</h2>
              <p class="font-sans text-base font-light text-kambista-navy mx-auto">
                Transfiere desde tu app bancaria y guarda el número o <span class="font-semibold text-neutral-darkText underline">código de operación</span> para el siguiente paso.
              </p>
            </div>

            <div class="border border-neutral-grayLight rounded-3xl py-5 lg:py-[14px] px-8 lg:px-3 space-y-[14px] text-sm text-neutral-darkText">
              <div class="flex flex-col md:grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 font-bold">
                <span>Banco</span>
                <span class="text-left lg:text-right ml-3 lg:ml-0 text-kambista-navy">{{ selectedReceiverAccount?.name ?? 'Interbank' }}</span>
              </div>
              <div class="flex flex-col md:grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 font-bold">
                <span>Monto</span>
                <span class="text-left lg:text-right ml-3 lg:ml-0 text-kambista-navy">S/ 10,000.00</span>
              </div>
              <div class="flex flex-col md:grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 font-bold">
                <span>Número de cuenta</span>
                <div class="flex items-center justify-start lg:justify-end gap-2">
                  <span class="text-left lg:text-right ml-3 lg:ml-0 text-kambista-navy">{{ selectedReceiverAccount?.accountNumber ?? '2010100000000000' }}</span>
                  <button>
                    <img src="/assets/img/icons/icon-copy.svg" alt="Copiar" class="inline-block mb-1" />
                  </button>

                </div>
              </div>
              <div class="flex flex-col md:grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 font-bold">
                <span>RUC</span>
                <span class="text-left lg:text-right ml-3 lg:ml-0 text-kambista-navy">20601708141</span>
              </div>
              <div class="flex flex-col md:grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 font-bold">
                <span>Titular de la cuenta</span>
                <span class="text-left lg:text-right ml-3 lg:ml-0 text-kambista-navy">Kambista SAC</span>
              </div>
              <div class="flex flex-col md:grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 font-bold">
                <span>Tipo de cuenta</span>
                <span class="text-left lg:text-right ml-3 lg:ml-0 text-kambista-navy">
                  {{ selectedReceiverAccount?.accountType === 'Checking Account' ? 'Corriente' : 'Ahorros' }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton type="button" class="w-full" @click="goToStep3">
              YA HICE MI TRANSFERENCIA
            </BaseButton>
          </div>
        </div>

        <!-- Step 3: Submit receipt -->
        <div v-else class="mx-auto w-full max-w-[536px]">
          <div class="bg-neutral-white rounded-md border border-neutral-grayBorder p-6 lg:p-8 shadow-sm">
            <div class="text-center mb-5">
              <div class="flex justify-center">
                <img :src="sendReceipt" alt="Envía tu constancia" />
              </div>
              <h2 class="font-sans font-bold text-2xl text-kambista-navy my-5">Envía tu constancia</h2>
              <p class="font-sans text-base font-light text-kambista-navy mx-auto">
                Adjunta la constancia de tu transferencia para poder verificar tu operación.
              </p>
            </div>

            <div class="space-y-5">
              <div class="border border-neutral-grayBorder rounded-md py-3 lg:py-3 px-4 lg:px-5">
                <FileUpload 
                  v-model="selectedReceiptFile"
                  label="Sube el archivo de tu constancia"
                  placeholder="Selecciona archivo"
                  helperText="*Tamaño máximo permitido del archivo 10 Mb"
                  :error="isReceiptUploadDisabled ? 'Debes subir tu constancia para continuar' : ''"
                />
              </div>
              <div class="text-sm text-neutral-mutedText">
                <p class="font-medium">Recuerda:</p>
                <ul class="list-disc list-inside space-y-1 px-4 font-medium">
                  <li>El voucher enviado debe tener el <span class="font-bold">monto, datos del beneficiario, fecha y hora.</span></li>
                  <li>El voucher debe ser legible.</li>
                  <li>Archivos permitidos: imágenes, Word y PDF.</li>
                </ul>
              </div>
            </div>
          </div>

        <div class="mt-6">
          <BaseButton type="button" class="w-full" :loading="isSubmitting" :disabled="isReceiptUploadDisabled || isSubmitting" @click="submitReceipt">
            ENVIAR CONSTANCIA
          </BaseButton>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BankAccountsModal from '@/components/shared/BankAccountsModal.vue'
import { ref, computed, watch } from 'vue'
import type { SelectOption } from '~/types/components'
import { ROUTES } from '~/constants/routes'
import { useRouter } from 'vue-router'
import iconArrowLeft from '@/assets/img/icons/icon-arrow-left.svg'
import iconCloseV2 from '@/assets/img/icons/icon-close-v2.svg'
import iconInfo from '@/assets/img/icons/icon-info-circle.svg'
import iconShieldAlert from '@/assets/img/icons/icon-info-circle-v2.svg'
import TransferToKambista from '@/assets/img/illustrations/transfer-funds.svg'
import sendReceipt from '@/assets/img/illustrations/send-receipt.svg'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import InfoAlert from '@/components/ui/InfoAlert.vue'


definePageMeta({
  layout: false
})

const router = useRouter()
function handleBack() {
  if (currentStep.value === 1) {
    router.push(ROUTES.dashboard)
    return
  }
  currentStep.value -= 1
}

function openReceiverBankModal() {
  showAccountsModal.value = true
}

function handleContinue() {
  if (isContinueDisabled.value) return
  currentStep.value = 2
}

interface ReceiverAccount {
  id: string
  name: string
  alias: string
  accountType: string
  accountNumber: string
}

function selectReceiverBank(account: ReceiverAccount) {
  receiverBank.value = account.id
  selectedReceiverAccount.value = account
}

interface BankApiItem {
  id: string
  name: string
  alias: string
}

interface SourceFundApiItem {
  _id: string
  name: string
}

const senderBank = ref('')
const receiverBank = ref('')
const sourceFund = ref('')
const selectedReceiverAccount = ref<ReceiverAccount | null>(null)
const currentStep = ref(1)
const selectedReceiptFile = ref<File | null>(null)
const isSubmitting = ref(false)
const updateTime = ref<string>('13:15')

const showAccountsModal = ref(false)
const showInfoSection = ref(true)
const showRewardSection = ref(true)

const amountSendText = '$ 100.00'
const amountReceiveText = 'S/ 353.00'
const couponAppliedText = 'RETOKAMBISTA'
const oldRateText = '3.43'
const currentRateText = '3.53'

function goToStep3() {
  currentStep.value = 3
}

watch(currentStep, (newStep) => {
  if (newStep === 2) {
    const now = new Date()
    const futureTime = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    const hours = String(futureTime.getHours()).padStart(2, '0')
    const minutes = String(futureTime.getMinutes()).padStart(2, '0')
    updateTime.value = `${hours}:${minutes}`
  }
})

const isReceiptUploadDisabled = computed(() => !selectedReceiptFile.value)

async function submitReceipt() {
  if (isSubmitting.value || !selectedReceiptFile.value) return

  isSubmitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    await navigateTo(ROUTES.receiptSent)
  } finally {
    isSubmitting.value = false
  }
}

const selectedReceiverOption = computed<SelectOption[]>(() => {
  if (selectedReceiverAccount.value) {
    return [{
      value: selectedReceiverAccount.value.id,
      label: `${selectedReceiverAccount.value.alias} - ${selectedReceiverAccount.value.name}`
    }]
  }

  if (!receiverBank.value) return []
  const selected = (banksData.value ?? []).find((bank) => bank.id === receiverBank.value)
  return selected ? [{ value: selected.id, label: `${selected.alias} - ${selected.name}` }] : []
})

const { data: banksData } = await useFetch<BankApiItem[]>('/api/operation/bank-accounts')
const { data: sourceFundsData } = await useFetch<SourceFundApiItem[]>('/api/operation/source-funds')

const bankOptions = computed<SelectOption[]>(() =>
  (banksData.value ?? []).map((bank) => ({
    value: bank.id,
    label: bank.name
  }))
)

const sourceFundsOptions = computed<SelectOption[]>(() =>
  (sourceFundsData.value ?? []).map((item) => ({
    value: item._id,
    label: item.name
  }))
)

const isContinueDisabled = computed(() =>
  !senderBank.value || !receiverBank.value || !sourceFund.value
)
</script>