/* Strip formatting and return a finite number (0 if invalid). */
export function parseCurrencyValue(value: string): number {
  const normalized = value.replace(/,/g, '').trim()
  if (!normalized || normalized === '.') return 0
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

/** Format with thousands separators and two decimal places. */
export function formatCurrencyAmount(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

/* Keep only digits and a single decimal point while typing. */
export function sanitizeCurrencyInput(raw: string): string {
  let cleaned = raw.replace(/[^\d.]/g, '')
  const dotIndex = cleaned.indexOf('.')
  if (dotIndex !== -1) {
    const intPart = cleaned.slice(0, dotIndex)
    const decPart = cleaned.slice(dotIndex + 1).replace(/\./g, '').slice(0, 2)
    cleaned = `${intPart}.${decPart}`
  }
  return cleaned
}

/* Display value for an input: formatted when blurred. */
export function formatInputDisplay(raw: string, focused: boolean): string {
  if (focused) {
    return raw === '' ? '' : sanitizeCurrencyInput(raw)
  }
  return formatCurrencyAmount(parseCurrencyValue(raw))
}