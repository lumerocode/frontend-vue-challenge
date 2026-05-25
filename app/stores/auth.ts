/**
 * Global authentication state backed by HTTP-only-style cookies.
 * Persists session across reloads and coordinates login / onboarding.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { APIError, LoginCredentials } from '~/types/api'
import { ROUTES } from '~/constants/routes'
import { normalizeLoginCredentials } from '~/utils/auth-validation'
import { getApiErrorPayload } from '~/utils/api-error'

export type LoginResult =
  | { success: true }
  | { success: false; error: APIError['data'] }

/* Shared cookie settings for all auth-related session values. */
const cookieOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
  sameSite: 'lax' as const
}

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>('auth_token', {
    default: () => null,
    ...cookieOptions
  })
  const userEmail = useCookie<string | null>('user_email', {
    default: () => null,
    ...cookieOptions
  })
  const profileCompletedCookie = useCookie<string>('profile_completed', {
    default: () => 'false',
    ...cookieOptions
  })
  const userDisplayName = useCookie<string | null>('user_display_name', {
    default: () => null,
    ...cookieOptions
  })

  const profileCompleted = computed({
    get: () => profileCompletedCookie.value === 'true',
    set: (value: boolean) => {
      profileCompletedCookie.value = value ? 'true' : 'false'
    }
  })

  const errorFeedback = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(token.value))
  const needsOnboarding = computed(() => isAuthenticated.value && !profileCompleted.value)

  /* On success, stores the token and resets the onboarding flag. */
  async function login(
    credentials: LoginCredentials,
    apiLogin: (credentials: LoginCredentials) => Promise<{ token: string; email: string }>
  ): Promise<LoginResult> {
    errorFeedback.value = null

    const payload = normalizeLoginCredentials(credentials.email, credentials.password)

    try {
      const response = await apiLogin(payload)

      token.value = response.token
      userEmail.value = response.email
      profileCompleted.value = false

      return { success: true }
    } catch (error: unknown) {
      const apiError = getApiErrorPayload(error)
      errorFeedback.value = apiError.message
      return { success: false, error: apiError }
    }
  }

  function setDisplayName(name: string) {
    userDisplayName.value = name
  }

  function completeProfile() {
    profileCompleted.value = true
  }

  function logout() {
    token.value = null
    userEmail.value = null
    userDisplayName.value = null
    profileCompleted.value = false
    errorFeedback.value = null
    navigateTo(ROUTES.login)
  }

  return {
    token,
    userEmail,
    userDisplayName,
    profileCompleted,
    errorFeedback,
    isAuthenticated,
    needsOnboarding,
    login,
    setDisplayName,
    completeProfile,
    logout
  }
})