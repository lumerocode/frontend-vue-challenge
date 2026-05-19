/* Route guard that enforces authentication and onboarding completion. */
import { ROUTES } from '~/constants/routes'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/api/')) {
    return
  }

  const authToken = useCookie<string | null>('auth_token')
  const profileCompleted = useCookie<string>('profile_completed', { default: () => 'false' })
  const userDisplayName = useCookie<string | null>('user_display_name')

  const isAuthenticated = Boolean(authToken.value)
  const hasCompletedProfile = profileCompleted.value === 'true'
  const needsOnboarding = isAuthenticated && !hasCompletedProfile
  const isPublicRoute = to.path === ROUTES.login || to.path === ROUTES.home
  const isOnboardingRoute = to.path === ROUTES.onboarding
  const isProfileSuccessRoute = to.path === ROUTES.profileSuccess
  const isDashboardRoute = to.path === ROUTES.dashboard

  if (!isAuthenticated && !isPublicRoute) {
    return navigateTo(ROUTES.login)
  }

  if (!isAuthenticated) {
    return
  }

  if (to.path === ROUTES.login) {
    return navigateTo(needsOnboarding ? ROUTES.onboarding : ROUTES.dashboard)
  }

  if (needsOnboarding && !isOnboardingRoute && !isProfileSuccessRoute) {
    return navigateTo(ROUTES.onboarding)
  }

  // Direct access to the success screen without completing the form first
  if (needsOnboarding && isProfileSuccessRoute && !userDisplayName.value) {
    return navigateTo(ROUTES.onboarding)
  }

  if (hasCompletedProfile && (isOnboardingRoute || isProfileSuccessRoute)) {
    return navigateTo(ROUTES.dashboard)
  }

  if (isDashboardRoute && needsOnboarding) {
    return navigateTo(ROUTES.onboarding)
  }
})