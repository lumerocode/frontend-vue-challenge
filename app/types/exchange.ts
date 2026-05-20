export interface ExchangeCurrentResponse {
  bid: number
  bidChange: number
  ask: number
  askChange: number
  date: string
  author: string
  created: string
}

export interface ExchangeCalculateResponse {
  rate: number
  exchange: number
  tc: {
    bid: number
    ask: number
  }
  data: {
    operate: boolean
    msg: string
  }
  savings: {
    amount: string
    currency: string
  }
}

export type ExchangeTab = 'buy' | 'sell'
export type ExchangeActive = 'S'
export type CurrencyCode = 'USD' | 'PEN'