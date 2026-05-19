/* Validation rules for the onboarding (profile completion) form. */
import { validateEmail } from '~/utils/auth-validation'

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
const phoneRegex = /^\d{9}$/
const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
const bankAccountRegex = /^\d+$/

export function extractFirstName(fullName: string): string {
  const trimmed = fullName.trim()
  if (!trimmed) return 'Usuario'
  return trimmed.split(/\s+/)[0] ?? 'Usuario'
}

export function validateProfileFullName(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return 'Los nombres completos son requeridos.'
  if (/\d/.test(trimmed)) return 'El nombre no debe contener números.'
  if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(trimmed)) {
    return 'El nombre no debe contener caracteres especiales.'
  }
  if (!nameRegex.test(trimmed) || trimmed.length < 3) {
    return 'Ingresa un nombre válido (mínimo 3 letras).'
  }
  return ''
}

export function validateProfileEmail(value: string): string {
  return validateEmail(value)
}

export function validateDocumentType(value: string): string {
  if (!value) return 'Selecciona el tipo de documento.'
  return ''
}

export function validateDocumentNumber(value: string, type: string): string {
  const trimmed = value.trim()
  if (!trimmed) return 'El número de documento es requerido.'

  if (type === 'DNI' && !/^\d{8}$/.test(trimmed)) {
    return 'El DNI debe tener 8 dígitos.'
  }

  if (type === 'CE' && !/^\d{9}$/.test(trimmed)) {
    return 'El CE debe tener 9 dígitos.'
  }

  if (type === 'PAS' && !/^[A-Za-z0-9]{8,15}$/.test(trimmed)) {
    return 'El PAS debe tener entre 8 y 15 caracteres alfanuméricos.'
  }

  if (!type) return 'Selecciona el tipo de documento.'

  return ''
}

export function validatePhone(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return 'El celular es requerido.'
  if (!phoneRegex.test(trimmed)) return 'Ingresa un celular válido de 9 dígitos.'
  return ''
}

/* Parses DD/MM/YYYY and rejects invalid dates. */
function parseBirthDate(value: string): Date | null {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null

  const day = Number(match[1])
  const month = Number(match[2]) - 1
  const year = Number(match[3])
  const date = new Date(year, month, day)

  if (
    date.getFullYear() !== year
    || date.getMonth() !== month
    || date.getDate() !== day
  ) {
    return null
  }

  return date
}

/* Ensures the user is at least 18 years old. */
function isAdult(birthDate: Date): boolean {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return age >= 18
}

export function validateBirthDate(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return 'La fecha de nacimiento es requerida.'
  if (!dateRegex.test(trimmed)) return 'Usa el formato DD/MM/AAAA.'

  const parsed = parseBirthDate(trimmed)
  if (!parsed) return 'Ingresa una fecha válida.'

  if (parsed > new Date()) return 'La fecha de nacimiento no puede ser futura.'

  if (!isAdult(parsed)) {
    return 'Debes ser mayor de edad para registrarte.'
  }

  return ''
}

export function validateBankAccount(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return 'El número de cuenta bancaria es requerido.'
  if (!bankAccountRegex.test(trimmed)) {
    return 'El número de cuenta bancaria solo debe contener dígitos.'
  }
  if (trimmed.length < 10 || trimmed.length > 20) {
    return 'Ingresa un número de cuenta válido.'
  }
  return ''
}

/* Aggregates all profile validators; used by the mock API before persisting data. */
export function validateProfileForm(data: {
  fullName: string
  documentType: string
  documentNumber: string
  phone: string
  birthDate: string
  acceptedTerms: boolean
  acceptedPrivacy: boolean
}): boolean {
  return !validateProfileFullName(data.fullName)
    && !validateDocumentType(data.documentType)
    && !validateDocumentNumber(data.documentNumber, data.documentType)
    && !validatePhone(data.phone)
    && !validateBirthDate(data.birthDate)
    && data.acceptedTerms
    && data.acceptedPrivacy
}