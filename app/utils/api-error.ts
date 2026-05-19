import type { APIError } from '~/types/api'

function isApiErrorDetail(value: unknown): value is APIError['data'] {
  if (!value || typeof value !== 'object') {
    return false
  }

  const detail = value as Record<string, unknown>
  return typeof detail.name === 'string'
    && typeof detail.title === 'string'
    && typeof detail.message === 'string'
}

/* Recursively unwraps nested `{ success, data }` envelopes until the error detail is found. */
function unwrapApiErrorBody(value: unknown, depth = 0): APIError['data'] | null {
  if (!value || typeof value !== 'object' || depth > 4) {
    return null
  }

  if (isApiErrorDetail(value)) {
    return value
  }

  const record = value as Record<string, unknown>

  if (record.success === false && record.data) {
    const nested = unwrapApiErrorBody(record.data, depth + 1)
    if (nested) {
      return nested
    }
  }

  if (record.data) {
    const nested = unwrapApiErrorBody(record.data, depth + 1)
    if (nested) {
      return nested
    }
  }

  if (record._data) {
    return unwrapApiErrorBody(record._data, depth + 1)
  }

  return null
}

function collectErrorCandidates(error: unknown): unknown[] {
  if (!error || typeof error !== 'object') {
    return []
  }

  const fetchError = error as Record<string, unknown>
  const candidates: unknown[] = []

  if (fetchError.data !== undefined) {
    candidates.push(fetchError.data)
  }

  if (fetchError.response && typeof fetchError.response === 'object') {
    const response = fetchError.response as Record<string, unknown>
    if (response._data !== undefined) {
      candidates.push(response._data)
    }
  }

  if (fetchError.cause !== undefined) {
    candidates.push(fetchError.cause)
  }

  return candidates
}

/* Extracts the structured error detail from a failed `$fetch` call. */
export function getApiErrorData(error: unknown): APIError['data'] | null {
  for (const candidate of collectErrorCandidates(error)) {
    const parsed = unwrapApiErrorBody(candidate)
    if (parsed) {
      return parsed
    }
  }

  return null
}

export function getApiErrorMessage(error: unknown): string {
  const apiError = getApiErrorData(error)

  if (apiError?.message) {
    return apiError.message
  }

  if (error && typeof error === 'object') {
    const fetchError = error as { statusMessage?: string }
    if (fetchError.statusMessage && fetchError.statusMessage !== 'Server Error') {
      return fetchError.statusMessage
    }
  }

  return 'Ocurrió un error inesperado en el servidor.'
}

/* Returns the API error detail or a safe fallback for modal display. */
export function getApiErrorPayload(error: unknown): APIError['data'] {
  return getApiErrorData(error) ?? {
    name: 'SERVER_ERROR',
    title: 'Error del servicio',
    message: getApiErrorMessage(error)
  }
}