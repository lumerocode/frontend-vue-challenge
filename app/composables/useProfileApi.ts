/* Client wrapper for onboarding / profile API calls. */
import type { ProfileFormData } from '~/types/api'

export function useProfileApi() {
  function completeProfile(data: ProfileFormData) {
    return $fetch<{ success: true; displayName: string }>('/api/profile/complete', {
      method: 'POST',
      body: data
    })
  }

  return { completeProfile }
}