/* Shared prop for reusable UI components. */
export interface BaseInputProps {
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
  autocomplete?: string
  error?: string
}

export interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

export interface SelectOption {
  label: string
  value: string
}

export interface BaseSelectProps {
  label?: string
  placeholder?: string
  options: SelectOption[]
  error?: string
}

export interface BaseCheckboxProps {
  label?: string
  error?: string
}

export interface WhatsAppButtonProps {
  phone?: string
  message?: string
}

export interface ApiErrorModalProps {
  modelValue: boolean
  title: string
  message: string
  buttonLabel?: string
}