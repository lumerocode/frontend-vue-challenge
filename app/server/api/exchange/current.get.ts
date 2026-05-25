import type { ExchangeCurrentResponse } from '~/types/exchange'

const KAMBISTA_CURRENT_URL = 'https://api.kambista.com/v1/exchange/kambista/current'

export default defineEventHandler(async () => {
  return await $fetch<ExchangeCurrentResponse>(KAMBISTA_CURRENT_URL)
})