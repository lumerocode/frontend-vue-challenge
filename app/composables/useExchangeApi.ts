import type {
  CurrencyCode,
  ExchangeActive,
  ExchangeCalculateResponse,
  ExchangeCurrentResponse
} from '~/types/exchange'

export function useExchangeApi() {
  function fetchCurrentRates() {
    return $fetch<ExchangeCurrentResponse>('/api/exchange/current')
  }

  function calculateExchange(params: {
    originCurrency: CurrencyCode
    destinationCurrency: CurrencyCode
    amount: number
    active: ExchangeActive
  }) {
    return $fetch<ExchangeCalculateResponse>('/api/exchange/calculate', {
      query: {
        originCurrency: params.originCurrency,
        destinationCurrency: params.destinationCurrency,
        amount: String(params.amount),
        active: params.active
      }
    })
  }

  return { fetchCurrentRates, calculateExchange }
}