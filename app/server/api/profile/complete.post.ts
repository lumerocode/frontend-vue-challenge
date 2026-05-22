/* Simulates duplicate-document, duplicate-phone, and server error scenarios. */
import type { ProfileFormData } from '~/types/api'
import { validateProfileForm } from '~/utils/profile-validation'

/* Test values: document `11111111` | phone `911111111` | full name containing `servidor` */
const MOCK_DUPLICATE_DNI = '11111111'
const MOCK_DUPLICATE_PHONE = '911111111'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ProfileFormData>>(event)

  const payload: ProfileFormData = {
    fullName: typeof body?.fullName === 'string' ? body.fullName : '',
    documentType: typeof body?.documentType === 'string' ? body.documentType : '',
    documentNumber: typeof body?.documentNumber === 'string' ? body.documentNumber : '',
    phone: typeof body?.phone === 'string' ? body.phone : '',
    birthDate: typeof body?.birthDate === 'string' ? body.birthDate : '',
    acceptedTerms: Boolean(body?.acceptedTerms),
    acceptedPrivacy: Boolean(body?.acceptedPrivacy)
  }

  if (!validateProfileForm(payload)) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        data: {
          name: 'SERVER_ERROR',
          title: 'Datos inválidos',
          message: 'Revisa los campos del formulario e intenta nuevamente.'
        }
      }
    })
  }

  if (payload.documentNumber.trim() === MOCK_DUPLICATE_DNI) {
    throw createError({
      statusCode: 409,
      data: {
        success: false,
        data: {
          name: 'DUPLICATE_DNI',
          title: 'DNI en uso',
          message: 'Número de documento ya está en uso.'
        }
      }
    })
  }

  if (payload.phone.trim() === MOCK_DUPLICATE_PHONE) {
    throw createError({
      statusCode: 409,
      data: {
        success: false,
        data: {
          name: 'DUPLICATE_PHONE',
          title: 'Celular en uso',
          message: 'El número de celular registrado ya está en uso.'
        }
      }
    })
  }

  if (payload.fullName.toLowerCase().includes('servidor')) {
    throw createError({
      statusCode: 500,
      data: {
        success: false,
        data: {
          name: 'SERVER_ERROR',
          title: 'Error del servicio',
          message: 'No pudimos completar tu registro. Intenta nuevamente en unos minutos.'
        }
      }
    })
  }

  return {
    success: true,
    displayName: payload.fullName.trim().split(/\s+/)[0] ?? 'Usuario'
  }
})