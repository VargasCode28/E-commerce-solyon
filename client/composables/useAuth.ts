export const useAuth = () => {
    const user = useState<any>('user', () => null)



    const fetchUser = async () => {
        try {
            user.value = await $fetch('/api/auth/me')
        } catch {
            user.value = null
        }
    }



    const login = async (data: { email: string; password: string }) => {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: data
    })
    await fetchUser()
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
  }

  return { user, login, logout, fetchUser }
}
