import type { ExchangeCalculateResponse, CurrencyCode, ExchangeActive } from '~/types/exchange'

const KAMBISTA_CALCULATE_URL = 'https://api.kambista.com/v1/exchange/calculates'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const originCurrency = query.originCurrency as CurrencyCode
  const destinationCurrency = query.destinationCurrency as CurrencyCode
  const amount = query.amount as string
  const active = query.active as ExchangeActive

  if (!originCurrency || !destinationCurrency || !amount || !active) {
    throw createError({
      statusCode: 400,
      message: 'Parámetros de cálculo incompletos'
    })
  }

  return await $fetch<ExchangeCalculateResponse>(KAMBISTA_CALCULATE_URL, {
    query: { originCurrency, destinationCurrency, amount, active }
  })
})