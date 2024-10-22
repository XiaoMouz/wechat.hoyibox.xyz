import { defineStore } from 'pinia'

interface UserPayloadInterface {
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, status } = await useFetch<{
        token: string
        expiresIn: number
        user: { username: string; picture: string }
      }>('/api/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          password,
        },
      })
      this.loading = status.value === 'pending'

      if (data.value) {
        const token = useCookie('auth.token')
        token.value = data?.value?.token
        this.authenticated = true
      }
    },
    logUserOut() {
      const token = useCookie('auth.token')
      this.authenticated = false
      token.value = null
    },
  },
})
