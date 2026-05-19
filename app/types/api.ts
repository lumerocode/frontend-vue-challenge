export type APIErrorName =
  | 'INVALID_CREDENTIALS'
  | 'SERVER_ERROR'
  | 'DUPLICATE_DNI'
  | 'INVALID_PHONE'
  | 'DUPLICATE_PHONE'

export interface APIError {
  success: false
  data: {
    name: APIErrorName
    title: string
    message: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ProfileFormData {
  fullName: string
  documentType: string
  documentNumber: string
  phone: string
  birthDate: string
  acceptedTerms: boolean
  acceptedPrivacy: boolean
}