import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('auth.token')

  // fetch seesion check from server

  const res = await fetch('/api/auth/session')
  if (res.status !== 200) {
    return navigateTo('/auth/login')
  }

  if (token.value && to?.name === 'login') {
    return navigateTo('/manage')
  }

  if (!token.value && to?.name !== 'login') {
    abortNavigation()
    return navigateTo('/auth/login')
  }
})
