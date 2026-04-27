interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

interface User {
  id: string
  email: string
  name: string
}

export const useApiService = () => {
  const tokenCookie = useCookie<string | null>('auth_token')

  const apiFetch = <T>(url: string, options: any = {}) => {
    return $fetch<T>(url, {
      baseURL: '/api',
      ...options,
      headers: {
        ...(tokenCookie.value
          ? { Authorization: `Bearer ${tokenCookie.value}` }
          : {}),
        ...(options.headers || {}),
      },
    })
  }

  return {
    auth: {
      login: (email: string, password: string) =>
        apiFetch<LoginResponse>('/auth/login', {
          method: 'POST',
          body: { email, password },
        }),

      register: (payload: { name: string; email: string; password: string }) =>
        apiFetch<LoginResponse>('/auth/register', {
          method: 'POST',
          body: payload,
        }),

      logout: () =>
        apiFetch<void>('/auth/logout', {
          method: 'POST',
        }),

      me: () => apiFetch<User>('/auth/me'),
    },
  }
}