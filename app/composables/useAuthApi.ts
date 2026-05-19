/* Client wrapper for authentication API calls. */
import type { LoginCredentials } from '~/types/api'

export function useAuthApi() {
  function login(credentials: LoginCredentials) {
    return $fetch<{ token: string; email: string }>('/api/auth/login', {
      method: 'POST',
      body: credentials
    })
  }

  return { login }
}