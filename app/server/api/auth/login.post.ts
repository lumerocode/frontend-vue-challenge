/* Mock login endpoint for local development and returns a JWT-like token on success or a structured APIError on failure. */
import {
  DEMO_CREDENTIALS,
  emailRegex,
  passwordRegex,
  normalizeLoginCredentials
} from '~/utils/auth-validation'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)

  const email = typeof body?.email === 'string' ? body.email : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  const credentials = normalizeLoginCredentials(email, password)

  if (!credentials.email || !password) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        data: {
          name: 'INVALID_CREDENTIALS',
          title: 'Datos inválidos',
          message: 'Correo y contraseña son requeridos.'
        }
      }
    })
  }

  if (!emailRegex.test(credentials.email)) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        data: {
          name: 'INVALID_CREDENTIALS',
          title: 'Correo inválido',
          message: 'Ingresa un formato de correo válido.'
        }
      }
    })
  }

  if (!passwordRegex.test(password)) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        data: {
          name: 'INVALID_CREDENTIALS',
          title: 'Contraseña inválida',
          message: 'Debe tener mínimo 8 caracteres, incluyendo una letra y un número.'
        }
      }
    })
  }

  const isValid =
    credentials.email === DEMO_CREDENTIALS.email
    && password === DEMO_CREDENTIALS.password

  if (!isValid) {
    throw createError({
      statusCode: 401,
      data: {
        success: false,
        data: {
          name: 'INVALID_CREDENTIALS',
          title: 'Credenciales incorrectas',
          message: 'El correo o la contraseña no son correctos.'
        }
      }
    })
  }

  return {
    token: 'mock-jwt-token',
    email: credentials.email
  }
})