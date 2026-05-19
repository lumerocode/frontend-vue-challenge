<template>
  <div class="w-full flex flex-col">
    <h1 class="font-sans font-bold text-xl md:text-2xl text-kambista-navy text-center mb-6 md:mb-8">
      Completa tus datos
    </h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <BaseInput
        v-model="fullName"
        label="Nombres completos"
        placeholder="Escribe tus nombres y apellidos"
        autocomplete="name"
        :error="errors.fullName"
        @blur="touchField('fullName')"
        @input="touchField('fullName')"
      />

      <div class="flex flex-col gap-1.5">
        <span class="font-sans font-medium text-sm text-neutral-darkText tracking-wider">
          Documento
        </span>
        <div class="flex gap-3">
          <div class="w-[40%] min-w-0 md:w-1/2">
            <BaseSelect
              v-model="documentType"
              placeholder="Tipo"
              :options="documentTypeOptions"
              wrapper-class="shrink-0 md:shrink"
              :error="errors.documentType"
              @blur="touchField('documentType')"
              @change="touchField('documentType')"
            />
          </div>
          <div class="w-[60%] shrink-0 min-w-0 md:w-1/2">
            <BaseInput
              v-model="documentNumber"
              placeholder="N° de documento"
              :error="errors.documentNumber"
              @blur="touchField('documentNumber')"
              @input="touchField('documentNumber')"
            />
          </div>
        </div>
      </div>

      <InfoAlert>
        Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación.
      </InfoAlert>

      <div class="flex flex-row gap-3 md:flex-col md:gap-5">
        <div class="w-1/2 min-w-0 md:w-full">
          <BaseInput
            v-model="phone"
            label="Celular"
            placeholder="N° de celular"
            type="tel"
            autocomplete="tel"
            :error="errors.phone"
            @blur="touchField('phone')"
            @input="touchField('phone')"
          />
        </div>
        <div class="w-1/2 min-w-0 md:w-full">
          <BaseInput
            v-model="birthDate"
            label="Fecha de nacimiento"
            placeholder="DD/MM/AAAA"
            autocomplete="bday"
            :error="errors.birthDate"
            @blur="touchField('birthDate')"
            @input="touchField('birthDate')"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-1">
        <BaseCheckbox
          v-model="acceptedTerms"
          :error="errors.acceptedTerms"
          @blur="touchField('acceptedTerms')"
          @update:model-value="touchField('acceptedTerms')"
        >
          He leído y acepto los
          <a href="#" class="font-semibold text-kambista-navy underline" @click.prevent>Términos y condiciones</a>
        </BaseCheckbox>

        <BaseCheckbox
          v-model="acceptedPrivacy"
          :error="errors.acceptedPrivacy"
          @blur="touchField('acceptedPrivacy')"
          @update:model-value="touchField('acceptedPrivacy')"
        >
          Acepto de manera expresa e informada la
          <a href="#" class="font-semibold text-kambista-navy underline" @click.prevent>Política de Tratamiento de datos personales de Kambista</a>
        </BaseCheckbox>
      </div>

      <div class="mt-2 md:mt-4">
        <BaseButton type="submit" :loading="isLoading" :disabled="isSubmitDisabled">
          <span class="md:inline">REGISTRARME</span>
        </BaseButton>
      </div>
    </form>

    <ApiErrorModal
      v-model="showApiErrorModal"
      :title="apiErrorPayload.title"
      :message="apiErrorPayload.message"
      @close="showApiErrorModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { ROUTES } from '~/constants/routes'
import { getApiErrorPayload } from '~/utils/api-error'
import {
  validateProfileFullName,
  validateDocumentType,
  validateDocumentNumber,
  validatePhone,
  validateBirthDate
} from '~/utils/profile-validation'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InfoAlert from '@/components/ui/InfoAlert.vue'
import ApiErrorModal from '@/components/ui/ApiErrorModal.vue'
import type { SelectOption } from '@/types/components'
import type { APIErrorName, ProfileFormData } from '~/types/api'

definePageMeta({
  layout: 'onboarding'
})

const authStore = useAuthStore()
const { completeProfile: apiCompleteProfile } = useProfileApi()
const isLoading = ref(false)
const showApiErrorModal = ref(false)
const apiErrorPayload = ref({
  title: 'Error del servicio',
  message: 'Ocurrió un error inesperado en el servidor.'
})

type FormField =
  | 'fullName'
  | 'documentType'
  | 'documentNumber'
  | 'phone'
  | 'birthDate'
  | 'acceptedTerms'
  | 'acceptedPrivacy'

/* Server-side validation messages mapped to specific form fields. */
const serverFieldErrors = ref<Partial<Record<FormField, string>>>({})

/* Maps API error codes to the input that should display the inline message. */
const API_FIELD_ERROR_MAP: Partial<Record<APIErrorName, FormField>> = {
  DUPLICATE_DNI: 'documentNumber',
  DUPLICATE_PHONE: 'phone',
  INVALID_PHONE: 'phone'
}

const fullName = ref('')
const documentType = ref('')
const documentNumber = ref('')
const phone = ref('')
const birthDate = ref('')
const acceptedTerms = ref(false)
const acceptedPrivacy = ref(false)

const documentTypeOptions: SelectOption[] = [
  { label: 'DNI', value: 'DNI' },
  { label: 'CE', value: 'CE' },
  { label: 'Pasaporte', value: 'PAS' }
]

const touched = ref<Record<FormField, boolean>>({
  fullName: false,
  documentType: false,
  documentNumber: false,
  phone: false,
  birthDate: false,
  acceptedTerms: false,
  acceptedPrivacy: false
})

const touchField = (field: FormField) => {
  touched.value[field] = true
}

const touchAllFields = () => {
  (Object.keys(touched.value) as FormField[]).forEach((field) => {
    touched.value[field] = true
  })
}

const validateCheckbox = (value: boolean, message: string) => {
  if (!value) return message
  return ''
}

const getFieldError = (field: FormField, validate: () => string) => {
  if (serverFieldErrors.value[field]) {
    return serverFieldErrors.value[field]!
  }

  return touched.value[field] ? validate() : ''
}

const errors = computed(() => ({
  fullName: getFieldError('fullName', () => validateProfileFullName(fullName.value)),
  documentType: getFieldError('documentType', () => validateDocumentType(documentType.value)),
  documentNumber: getFieldError('documentNumber', () =>
    validateDocumentNumber(documentNumber.value, documentType.value)),
  phone: getFieldError('phone', () => validatePhone(phone.value)),
  birthDate: getFieldError('birthDate', () => validateBirthDate(birthDate.value)),
  acceptedTerms: getFieldError('acceptedTerms', () =>
    validateCheckbox(acceptedTerms.value, 'Debes aceptar los términos y condiciones.')),
  acceptedPrivacy: getFieldError('acceptedPrivacy', () =>
    validateCheckbox(acceptedPrivacy.value, 'Debes aceptar la política de privacidad.'))
}))

const isFormInvalid = computed(() => {
  return !!validateProfileFullName(fullName.value)
    || !!validateDocumentType(documentType.value)
    || !!validateDocumentNumber(documentNumber.value, documentType.value)
    || !!validatePhone(phone.value)
    || !!validateBirthDate(birthDate.value)
    || !acceptedTerms.value
    || !acceptedPrivacy.value
})

const isFormComplete = computed(() => {
  return Boolean(fullName.value.trim())
    && Boolean(documentType.value)
    && Boolean(documentNumber.value.trim())
    && Boolean(phone.value.trim())
    && Boolean(birthDate.value.trim())
    && acceptedTerms.value
    && acceptedPrivacy.value
})

const isSubmitDisabled = computed(() => isLoading.value || !isFormComplete.value)

const clearServerFieldError = (field: FormField) => {
  if (serverFieldErrors.value[field]) {
    const { [field]: _, ...rest } = serverFieldErrors.value
    serverFieldErrors.value = rest
  }
}

watch(fullName, () => clearServerFieldError('fullName'))
watch(documentType, () => {
  touchField('documentType')
  clearServerFieldError('documentType')
  clearServerFieldError('documentNumber')
  if (documentNumber.value) {
    touchField('documentNumber')
  }
})
watch(documentNumber, () => clearServerFieldError('documentNumber'))
watch(phone, () => clearServerFieldError('phone'))
watch(birthDate, () => clearServerFieldError('birthDate'))

const applyApiFieldError = (errorName: APIErrorName, message: string) => {
  const field = API_FIELD_ERROR_MAP[errorName]

  if (!field) {
    return
  }

  serverFieldErrors.value = {
    ...serverFieldErrors.value,
    [field]: message
  }
  touched.value[field] = true
}

/** Displays the API error modal and optionally maps the error to a form field. */
const showApiError = (payload: { title: string; message: string; name?: APIErrorName }) => {
  apiErrorPayload.value = {
    title: payload.title,
    message: payload.message
  }

  if (payload.name) {
    applyApiFieldError(payload.name, payload.message)
  }

  showApiErrorModal.value = true
}

const buildPayload = (): ProfileFormData => ({
  fullName: fullName.value,
  documentType: documentType.value,
  documentNumber: documentNumber.value,
  phone: phone.value,
  birthDate: birthDate.value,
  acceptedTerms: acceptedTerms.value,
  acceptedPrivacy: acceptedPrivacy.value
})

const handleSubmit = async () => {
  touchAllFields()
  if (isFormInvalid.value) return

  isLoading.value = true
  serverFieldErrors.value = {}

  try {
    const response = await apiCompleteProfile(buildPayload())
    authStore.setDisplayName(response.displayName)
    await navigateTo(ROUTES.profileSuccess, { replace: true })
  } catch (error: unknown) {
    const payload = getApiErrorPayload(error)
    showApiError({
      title: payload.title,
      message: payload.message,
      name: payload.name
    })
  } finally {
    isLoading.value = false
  }
}
</script>