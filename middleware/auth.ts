import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth.token')

  if (token.value && to?.name === 'login') {
    return navigateTo('/manage')
  }

  if (!token.value && to?.name !== 'login') {
    abortNavigation()
    return navigateTo('/auth/login')
  }
})
