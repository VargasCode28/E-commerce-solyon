import { defineStore } from 'pinia'
import { useApiService } from '~/services/api'

interface User {
  id: string
  email: string
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const tokenCookie = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
  })

  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!tokenCookie.value)

  const login = async (email: string, password: string) => {
    const api = useApiService()

    const data = await api.auth.login(email, password)

    tokenCookie.value = data.token
    user.value = data.user
  }

  const register = async (payload: { name: string; email: string; password: string }) => {
    const api = useApiService()

    const data = await api.auth.register(payload)

    tokenCookie.value = data.token
    user.value = data.user
  }

  const logout = async () => {
    tokenCookie.value = null
    user.value = null
    await navigateTo('/login')
  }

const fetchUser = async () => {
  if (!tokenCookie.value) return

  const api = useApiService()

  try {
    user.value = await api.auth.me()
  } catch {
    await logout()
  }
}



  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
  }
})