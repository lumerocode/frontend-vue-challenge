<template>
  <div class="w-full flex flex-col justify-center items-center lg:h-[calc(100vh-172px)]">
    <div class="w-full max-w-[520px] mx-auto flex flex-col gap-5 lg:gap-6">
      <div class="rounded-xl shadow-sm">
        <!-- Exchange rate tabs -->
        <div class="flex">
          <button
            type="button"
            class="flex-1 py-[14px] font-sans font-bold text-sm transition-colors rounded-tl-[6px] rounded-tr-[6px] border border-neutral-grayBg height-[52px] lg:font-extrabold lg:text-lg"
            :class="activeTab === 'buy'
              ? 'bg-kambista-navy text-neutral-white'
              : 'bg-neutral-white text-neutral-grayChangeMoney border-b border-neutral-grayBorder'"
            @click="setActiveTab('buy')"
          >
            Compra: {{ compraRate }}
          </button>
          <button
            type="button"
            class="flex-1 py-[14px] font-sans font-extrabold text-sm transition-colors border-l border-neutral-grayBg rounded-tl-[6px] rounded-tr-[6px] lg:font-extrabold lg:text-lg"
            :class="activeTab === 'sell'
              ? 'bg-kambista-deepBlue text-neutral-white'
              : 'bg-neutral-white text-neutral-grayChangeMoney border border-neutral-grayBg'"
            @click="setActiveTab('sell')"
          >
            Venta: {{ ventaRate }}
          </button>
        </div>

        <div class="p-5 lg:pt-8 lg:pb-6 lg:px-[52px] bg-neutral-white overflow-visible rounded-bl-[16px] rounded-br-[16px]">
          <!-- Amount inputs -->
          <div class="relative overflow-visible">
            <div class="relative z-20 flex rounded-[8px] rounded-[8px] border border-neutral-grayBorder mb-4 overflow-visible">
              <div class="flex flex-col justify-center flex-1 min-w-0 bg-neutral-grayBorder px-6 rounded-tl-[8px] rounded-bl-[8px]">
                <p class="font-sans text-sm font-semibold text-kambista-navy mb-1">
                  ¿Cuánto envías?
                </p>
                <input
                  :value="sendDisplay"
                  type="text"
                  inputmode="decimal"
                  autocomplete="off"
                  class="w-full bg-transparent font-sans font-bold text-xl lg:text-xl text-kambista-navy focus:outline-none p-0"
                  :disabled="isCalculating"
                  @focus="onSendFocus"
                  @blur="onSendBlur"
                  @input="onSendInput"
                />
                <p v-if="minAmountError" class="mt-1 font-sans text-xs text-kambista-errorRed">
                  {{ minAmountError }}
                </p>
              </div>
              <ExchangeCurrencySelect
                :model-value="sendCurrency"
                placement="down"
                aria-label="Moneda que envías"
                @update:model-value="onSendCurrencyChange"
              />
            </div>

            <!-- Swap -->
            <button
              type="button"
              class="absolute right-[78px] lg:right-[126px] top-1/2 -translate-y-1/2 z-30 size-14 lg:size-16 overflow-hidden rounded-full border-0 bg-transparent p-0"
              aria-label="Intercambiar monedas"
              :disabled="isCalculating"
              @click="swapCurrencies"
            >
              <span
                ref="switchIconRef"
                class="flex size-12 lg:size-[62px] items-center justify-center will-change-transform"
              >
                <img
                  :src="iconSwitch"
                  alt=""
                  class="size-full object-contain pointer-events-none select-none"
                />
              </span>
            </button>

            <!-- Receive -->
            <div class="relative z-10 flex rounded-[8px] rounded-[8px] border border-neutral-grayBorder overflow-visible">
              <div class="flex flex-col justify-center flex-1 min-w-0 bg-neutral-grayBorder px-6 rounded-tl-[8px] rounded-bl-[8px]">
                <p class="font-sans text-sm font-semibold text-kambista-navy mb-1">
                  Entonces recibes
                </p>
                <input
                  :value="receiveDisplay"
                  type="text"
                  inputmode="decimal"
                  autocomplete="off"
                  class="w-full bg-transparent font-sans font-bold text-xl lg:text-xl text-kambista-navy focus:outline-none p-0"
                  :disabled="isCalculating"
                  @focus="onReceiveFocus"
                  @blur="onReceiveBlur"
                  @input="onReceiveInput"
                />
              </div>
              <ExchangeCurrencySelect
                :model-value="receiveCurrency"
                placement="up"
                aria-label="Moneda que recibes"
                @update:model-value="onReceiveCurrencyChange"
              />
            </div>
          </div>

          <!-- Savings & Koinks -->
          <div class="flex flex-wrap items-center justify-between gap-3 mt-4 mb-6 font-sans text-sm">
            <div>
              <p class="text-kambista-navy">
                Ahorro estimado:
              </p>
              <p class="font-bold text-kambista-navy">
                {{ savingsDisplay }}
              </p>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-kambista-navy">Koinks:</span>
              <div class="flex flex-row items-center gap-1">
                <img :src="iconInfo" alt="Información sobre Koinks" class="w-5 h-5 shrink-0" />
                <span class="font-bold text-kambista-navy">{{ koinksDisplay }}</span>
                <img :src="iconCoin" alt="" class="w-5 h-5 shrink-0" />
              </div>
            </div>
          </div>

          <!-- Coupon -->
          <div
            class="flex rounded-lg overflow-hidden border bg-neutral-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            :class="couponMessageType === 'error'
              ? 'border-kambista-errorRed'
              : couponMessageType === 'success'
                ? 'border-kambista-mint'
                : 'border-neutral-grayBorder'"
          >
            <div class="flex items-center flex-1 min-w-0 pl-2 gap-2">
              <img :src="iconTag" alt="" class="hidden lg:block w-[38px] shrink-0 mb-[6px]" />
              <input
                v-model="couponCode"
                type="text"
                placeholder="Ingresa el cupón"
                class="flex-1 min-w-0 h-[46px] font-sans text-sm bg-transparent placeholder:text-neutral-grayPlaceholder focus:outline-none placeholder:text-center"
                @keyup.enter="applyCoupon"
              />
            </div>
            <button
              type="button"
              class="h-[47px] px-6 bg-kambista-navy text-neutral-white font-sans font-normal text-xs uppercase shrink-0 hover:brightness-110 transition-all disabled:opacity-60"
              :disabled="!couponCode.trim()"
              @click="applyCoupon"
            >
              APLICAR
            </button>
          </div>
          <p
            v-if="couponMessage"
            class="mt-1.5 font-sans text-xs"
            :class="couponMessageType === 'success' ? 'text-kambista-navy' : 'text-kambista-errorRed'"
          >
            {{ couponMessage }}
          </p>

          <!-- Promo -->
          <div class="flex justify-center">
            <div class="flex items-center gap-4 mt-5 pt-4 lg:w-[295px]">
              <img :src="iconStar" alt="" class="w-[26px] shrink-0 mt-0.5" />
              <div class="flex flex-col justify-center text-xs">
                <p class="font-sans text-sm text-kambista-navy leading-relaxed">
                  ¿Monto mayor a $5.000 o S/18.000?
                </p>
                <p class="font-bold text-kambista-navy underline cursor-pointer">
                  ¡Obtén un Tipo de Cambio Preferencial!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BaseButton type="button" :disabled="isStartDisabled" :loading="isLoadingOperation" @click="handleStartOperation">
        INICIAR OPERACIÓN
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CurrencyCode, ExchangeTab } from '~/types/exchange'
import { useExchangeApi } from '~/composables/useExchangeApi'
import { ROUTES } from '~/constants/routes'
import {
  formatCurrencyAmount,
  parseCurrencyValue,
  sanitizeCurrencyInput
} from '~/utils/currency-format'
import BaseButton from '@/components/ui/BaseButton.vue'
import ExchangeCurrencySelect from '@/components/dashboard/ExchangeCurrencySelect.vue'
import iconSwitch from '@/assets/img/icons/icon-switch.svg'
import iconCoin from '@/assets/img/illustrations/business-coin.svg'
import iconInfo from '@/assets/img/icons/icon-shield-alert.svg'
import iconStar from '@/assets/img/illustrations/star-badge.svg'
import iconTag from '@/assets/img/illustrations/discount-percentage.svg'

const VALID_COUPON = 'RETOKAMBISTA'
const COUPON_RATE_ADJUSTMENT = 0.10
const DEFAULT_SEND_AMOUNT = 10000
const MIN_AMOUNT = 1

const { fetchCurrentRates, calculateExchange } = useExchangeApi()

const activeTab = ref<ExchangeTab>('buy')
const sendCurrency = ref<CurrencyCode>('USD')
const receiveCurrency = ref<CurrencyCode>('PEN')
const lastEdited = ref<'send' | 'receive'>('send')

const sendRaw = ref(String(DEFAULT_SEND_AMOUNT))
const receiveRaw = ref('')
const sendFocused = ref(false)
const receiveFocused = ref(false)

const bidRate = ref(0)
const askRate = ref(0)
const savingsAmount = ref('0.00')
const savingsCurrency = ref('S/')
const isCalculating = ref(false)
const switchIconRef = ref<HTMLElement | null>(null)

const couponCode = ref('')
const couponApplied = ref(false)
const couponMessage = ref('')
const couponMessageType = ref<'success' | 'error' | ''>('')
const isLoadingOperation = ref(false)

let calculateTimer: ReturnType<typeof setTimeout> | null = null
let calculateRequestId = 0

const sendAmountValue = computed(() => parseCurrencyValue(sendRaw.value))

const isStartDisabled = computed(() => sendAmountValue.value <= 0)

const minAmountError = computed(() => {
  const amount = sendAmountValue.value
  if (amount <= 0 || amount >= MIN_AMOUNT) return ''
  return sendCurrency.value === 'USD'
    ? 'El valor mínimo a ingresar es de 1 dólar.'
    : 'El valor mínimo a ingresar es de 1 sol.'
})

const compraRate = computed(() =>
  bidRate.value ? bidRate.value.toFixed(3) : '—'
)
const ventaRate = computed(() =>
  askRate.value ? askRate.value.toFixed(3) : '—'
)

const sendDisplay = computed(() =>
  sendFocused.value ? sendRaw.value : formatCurrencyAmount(parseCurrencyValue(sendRaw.value))
)

const receiveDisplay = computed(() => {
  const raw = receiveRaw.value
  if (receiveFocused.value) return raw
  if (raw) return formatCurrencyAmount(parseCurrencyValue(raw))
  return formatCurrencyAmount(0)
})

const savingsDisplay = computed(() => `${savingsCurrency.value} ${savingsAmount.value}`)

const koinksDisplay = computed(() => {
  const amount = sendAmountValue.value
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})

function oppositeCurrency(code: CurrencyCode): CurrencyCode {
  return code === 'USD' ? 'PEN' : 'USD'
}

function scheduleCalculate() {
  if (calculateTimer) clearTimeout(calculateTimer)
  calculateTimer = setTimeout(() => {
    void runCalculate()
  }, 350)
}

function setActiveTab(tab: ExchangeTab) {
  if (activeTab.value === tab) return
  activeTab.value = tab
  scheduleCalculate()
}

function onSendCurrencyChange(code: CurrencyCode) {
  sendCurrency.value = code
  receiveCurrency.value = oppositeCurrency(code)
  lastEdited.value = 'send'
  scheduleCalculate()
}

function onReceiveCurrencyChange(code: CurrencyCode) {
  receiveCurrency.value = code
  sendCurrency.value = oppositeCurrency(code)
  lastEdited.value = 'send'
  scheduleCalculate()
}

function onSendFocus() {
  sendFocused.value = true
  lastEdited.value = 'send'
  sendRaw.value = sanitizeCurrencyInput(sendRaw.value.replace(/,/g, ''))
}

function onSendBlur() {
  sendFocused.value = false
  if (!sendRaw.value.trim()) sendRaw.value = '0'
  sendRaw.value = String(parseCurrencyValue(sendRaw.value))
  scheduleCalculate()
}

function onSendInput(event: Event) {
  lastEdited.value = 'send'
  const target = event.target as HTMLInputElement
  sendRaw.value = sanitizeCurrencyInput(target.value)
  scheduleCalculate()
}

function onReceiveFocus() {
  receiveFocused.value = true
  lastEdited.value = 'receive'
  receiveRaw.value = sanitizeCurrencyInput(receiveRaw.value.replace(/,/g, ''))
}

function onReceiveBlur() {
  receiveFocused.value = false
  if (!receiveRaw.value.trim()) receiveRaw.value = '0'
  receiveRaw.value = String(parseCurrencyValue(receiveRaw.value))
  scheduleCalculate()
}

function onReceiveInput(event: Event) {
  lastEdited.value = 'receive'
  const target = event.target as HTMLInputElement
  receiveRaw.value = sanitizeCurrencyInput(target.value)
  scheduleCalculate()
}

function applyCoupon() {
  const code = couponCode.value.trim().toUpperCase()
  if (code === VALID_COUPON) {
    couponApplied.value = true
    couponMessageType.value = 'success'
    couponMessage.value = 'Cupón aplicado: beneficio de S/ 0.10 en el tipo de cambio.'
    scheduleCalculate()
    return
  }
  couponApplied.value = false
  couponMessageType.value = 'error'
  couponMessage.value = 'Cupón no válido. Intenta con RETOKAMBISTA.'
}

function getBaseRate(origin: CurrencyCode, destination: CurrencyCode): number {
  if (origin === 'USD' && destination === 'PEN') {
    return activeTab.value === 'sell' ? askRate.value : bidRate.value
  }
  if (origin === 'PEN' && destination === 'USD') {
    return activeTab.value === 'buy' ? bidRate.value : askRate.value
  }
  return activeTab.value === 'sell' ? askRate.value : bidRate.value
}

function getCouponAdjustedRate(
  baseRate: number,
  origin: CurrencyCode,
  destination: CurrencyCode
): number {
  if (!couponApplied.value) return baseRate

  // SELLING: sends USD, receives PEN → adds 0.10 to the exchange rate
  if (activeTab.value === 'sell' && origin === 'USD' && destination === 'PEN') {
    return baseRate + COUPON_RATE_ADJUSTMENT
  }

  // BUYING: sends PEN, receives USD → subtracts 0.10 from the exchange rate
  if (activeTab.value === 'buy' && origin === 'PEN' && destination === 'USD') {
    return baseRate - COUPON_RATE_ADJUSTMENT
  }

  return baseRate
}

function calculateExchangeAmount(
  amount: number,
  origin: CurrencyCode,
  destination: CurrencyCode,
  rate?: number
): number {
  if (!amount) return 0

  const baseRate = rate ?? getBaseRate(origin, destination)
  if (!baseRate) return 0

  const effectiveRate = getCouponAdjustedRate(baseRate, origin, destination)

  if (origin === 'USD' && destination === 'PEN') {
    return amount * effectiveRate
  }
  if (origin === 'PEN' && destination === 'USD') {
    return amount / effectiveRate
  }
  return 0
}

function applyCalculationResult(
  _exchanged: number,
  editingReceive: boolean,
  savings?: { amount: string; currency: string },
  rateFromApi?: number
) {
  const origin = editingReceive ? receiveCurrency.value : sendCurrency.value
  const destination = editingReceive ? sendCurrency.value : receiveCurrency.value
  const amount = editingReceive
    ? parseCurrencyValue(receiveRaw.value)
    : sendAmountValue.value

  const value = rateFromApi !== undefined
    ? calculateExchangeAmount(amount, origin, destination, rateFromApi)
    : calculateExchangeAmount(amount, origin, destination)

  if (editingReceive) {
    sendRaw.value = String(value)
  } else {
    receiveRaw.value = String(value)
  }

  if (savings) {
    savingsAmount.value = savings.amount
    savingsCurrency.value = savings.currency
  }
}

function getFallbackExchange(
  amount: number,
  origin: CurrencyCode,
  destination: CurrencyCode
): number {
  return calculateExchangeAmount(amount, origin, destination)
}

async function loadRates() {
  try {
    const data = await fetchCurrentRates()
    bidRate.value = data.bid
    askRate.value = data.ask
  } catch {
    bidRate.value = 3.411
    askRate.value = 3.44
  }
}

async function runCalculate() {
  const requestId = ++calculateRequestId
  isCalculating.value = true

  const editingReceive = lastEdited.value === 'receive'
  const origin = editingReceive ? receiveCurrency.value : sendCurrency.value
  const destination = editingReceive ? sendCurrency.value : receiveCurrency.value
  const amount = editingReceive
    ? parseCurrencyValue(receiveRaw.value)
    : sendAmountValue.value

  if (amount < MIN_AMOUNT) {
    const fallback = amount > 0 ? getFallbackExchange(amount, origin, destination) : 0
    applyCalculationResult(fallback, editingReceive)
    isCalculating.value = false
    return
  }

  try {
    const result = await calculateExchange({
      originCurrency: origin,
      destinationCurrency: destination,
      amount,
      active: 'S'
    })

    if (requestId !== calculateRequestId) return

    applyCalculationResult(result.exchange, editingReceive, result.savings, result.rate)
  } catch {
    if (requestId !== calculateRequestId) return

    const fallback = getFallbackExchange(amount, origin, destination)
    applyCalculationResult(fallback, editingReceive)
  } finally {
    if (requestId === calculateRequestId) {
      isCalculating.value = false
    }
  }
}

function playSwitchSpin() {
  const el = switchIconRef.value
  if (!el) return

  el.removeEventListener('transitionend', onSwitchSpinEnd)
  el.style.transition = 'transform 0.35s ease-in-out'
  el.style.transform = 'rotate(180deg)'
  el.addEventListener('transitionend', onSwitchSpinEnd)
}

function onSwitchSpinEnd(event: TransitionEvent) {
  if (event.propertyName !== 'transform') return
  const el = switchIconRef.value
  if (!el) return

  el.removeEventListener('transitionend', onSwitchSpinEnd)
  el.style.transition = 'none'
  el.style.transform = 'rotate(0deg)'
}

function swapCurrencies() {
  playSwitchSpin()

  const prevSend = sendCurrency.value
  sendCurrency.value = receiveCurrency.value
  receiveCurrency.value = prevSend

  lastEdited.value = 'send'
  scheduleCalculate()
}

async function handleStartOperation() {
  if (isStartDisabled.value || isLoadingOperation.value) return
  isLoadingOperation.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    await navigateTo(ROUTES.operationSteps)
  } finally {
    isLoadingOperation.value = false
  }
}

onMounted(async () => {
  sendRaw.value = String(DEFAULT_SEND_AMOUNT)
  await loadRates()
  await runCalculate()
})
</script>