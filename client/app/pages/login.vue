
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
})

const auth = useAuthStore()
const route = useRoute()

if (auth.isAuthenticated) {
  await navigateTo('/')
}

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const errors = reactive({
  email: '',
  password: '',
})

const validateEmail = (value: string) => {
  if (!value) return 'El email es requerido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido'
  return ''
}

const validatePassword = (value: string) => {
  if (!value) return 'La contraseña es requerida'
  if (value.length < 6) return 'Mínimo 6 caracteres'
  return ''
}

const touched = reactive({ email: false, password: false })

watch(email, (val) => {
  if (touched.email) errors.email = validateEmail(val)
})

watch(password, (val) => {
  if (touched.password) errors.password = validatePassword(val)
})

const onBlur = (field: 'email' | 'password') => {
  touched[field] = true
  if (field === 'email') errors.email = validateEmail(email.value)
  if (field === 'password') errors.password = validatePassword(password.value)
}

const handleLogin = async () => {
  touched.email = true
  touched.password = true
  errors.email = validateEmail(email.value)
  errors.password = validatePassword(password.value)

  if (errors.email || errors.password) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    await auth.login(email.value, password.value)
    const redirect = route.query.redirect as string | undefined
    await navigateTo(redirect ?? '/')                  //CHANGE THIS FOR OTHER ROUTES
  } catch (err: any) {
    const status = err?.response?.status




    

    if (status === 401) {
      errorMessage.value = 'Credenciales incorrectas.'
    } else if (status === 429) {
      errorMessage.value = 'Demasiados intentos.'
    } else {
      errorMessage.value = 'Error inesperado.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>












<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Header -->
      <div class="login-header">
        <div class="login-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <path d="M8 16L14 22L24 10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h1 class="login-title">Bienvenido</h1>
        <p class="login-subtitle">Ingresa tus credenciales para continuar</p>
      </div>

      <!-- Error Banner -->
      <Transition name="slide-down">
        <div v-if="errorMessage" class="error-banner" role="alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 5v3.5M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </Transition>

      <!-- Form -->
      <form class="login-form" novalidate @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="field-group" :class="{ 'has-error': errors.email }">
          <label for="email" class="field-label">Email</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5" />
              <path d="M1 6l7 4 7-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              id="email"
              v-model="email"
              type="email"
              class="field-input"
              placeholder="tu@email.com"
              autocomplete="email"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : undefined"
              :disabled="isLoading"
              @blur="onBlur('email')"
            />
          </div>
          <Transition name="fade">
            <span v-if="errors.email" id="email-error" class="field-error" role="alert">
              {{ errors.email }}
            </span>
          </Transition>
        </div>

        <!-- Password -->
        <div class="field-group" :class="{ 'has-error': errors.password }">
          <label for="password" class="field-label">Contraseña</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="7" width="12" height="8" rx="2" stroke="currentColor" stroke-width="1.5" />
              <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="field-input"
              placeholder="••••••••"
              autocomplete="current-password"
              :aria-invalid="!!errors.password"
              :aria-describedby="errors.password ? 'password-error' : undefined"
              :disabled="isLoading"
              @blur="onBlur('password')"
            />
            <button
              type="button"
              class="toggle-password"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5" />
                <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5" />
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M6.5 6.6A2 2 0 0010 10M4.5 4.4C2.8 5.5 1.5 7.5 1.5 8s2.5 5 6.5 5c1.2 0 2.3-.3 3.2-.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M9 3.2C12.2 4.1 14.5 7 14.5 8c0 .4-.3 1-.8 1.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <Transition name="fade">
            <span v-if="errors.password" id="password-error" class="field-error" role="alert">
              {{ errors.password }}
            </span>
          </Transition>
        </div>

        <!-- Forgot password -->
        <div class="form-extras">
          <NuxtLink to="/forgot-password" class="forgot-link">
            ¿Olvidaste tu contraseña?
          </NuxtLink>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="submit-btn"
          :disabled="isLoading"
          :aria-busy="isLoading"
        >
          <span v-if="!isLoading">Iniciar sesión</span>
          <span v-else class="loading-spinner" aria-hidden="true" />
        </button>
      </form>

      <!-- Register link -->
      <p class="register-link">
        ¿No tienes cuenta?
        <NuxtLink to="/register">Regístrate gratis</NuxtLink>
      </p>
    </div>
  </div>
</template>









