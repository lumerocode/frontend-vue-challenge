/* Shared validation rules and helpers for the login flow. */

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

/* Mock credentials accepted by `/api/auth/login`. */
export const DEMO_CREDENTIALS = {
  email: 'usuario@kambista.com',
  password: 'Password1'
} as const

export function validateEmail(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return 'El correo electrónico es requerido.'
  if (!emailRegex.test(trimmed)) return 'Ingresa un formato de correo válido.'
  return ''
}

export function validatePassword(value: string) {
  if (!value) return 'La contraseña es requerida.'
  if (!passwordRegex.test(value)) {
    return 'Debe tener mínimo 8 caracteres, incluyendo una letra y un número.'
  }
  return ''
}

/** Normalizes email before sending it to the API. */
export function normalizeLoginCredentials(email: string, password: string) {
  return {
    email: email.trim().toLowerCase(),
    password
  }
}