<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
})

const auth = useAuthStore()
const route = useRoute()

// Redirigir si ya está logueado
if (process.client && auth.isAuthenticated) {
  navigateTo('/')
}

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const touched = reactive({
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
})

/* VALIDACIONES */
const validateName = (v: string) => {
  if (!v) return 'El nombre es requerido'
  return ''
}

const validateEmail = (v: string) => {
  if (!v) return 'El email es requerido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Email inválido'
  return ''
}

const validatePassword = (v: string) => {
  if (!v) return 'La contraseña es requerida'
  if (v.length < 6) return 'Mínimo 6 caracteres'
  return ''
}

const validateConfirmPassword = (v: string) => {
  if (!v) return 'Confirma tu contraseña'
  if (v !== password.value) return 'Las contraseñas no coinciden'
  return ''
}

/* WATCH */
watch(name, v => touched.name && (errors.name = validateName(v)))
watch(email, v => touched.email && (errors.email = validateEmail(v)))
watch(password, v => {
  if (touched.password) errors.password = validatePassword(v)
  if (touched.confirmPassword) errors.confirmPassword = validateConfirmPassword(confirmPassword.value)
})
watch(confirmPassword, v => touched.confirmPassword && (errors.confirmPassword = validateConfirmPassword(v)))

const onBlur = (field: keyof typeof touched) => {
  touched[field] = true

  if (field === 'name') errors.name = validateName(name.value)
  if (field === 'email') errors.email = validateEmail(email.value)
  if (field === 'password') errors.password = validatePassword(password.value)
  if (field === 'confirmPassword') errors.confirmPassword = validateConfirmPassword(confirmPassword.value)
}

/* SUBMIT */
const handleRegister = async () => {
  touched.name = true
  touched.email = true
  touched.password = true
  touched.confirmPassword = true

  errors.name = validateName(name.value)
  errors.email = validateEmail(email.value)
  errors.password = validatePassword(password.value)
  errors.confirmPassword = validateConfirmPassword(confirmPassword.value)

  if (errors.name || errors.email || errors.password || errors.confirmPassword) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value
    })

    const redirect = route.query.redirect as string | undefined
    await navigateTo(redirect ?? '/dashboard')
  } catch (err: any) {
    const status = err?.response?.status

    if (status === 409) {
      errorMessage.value = 'El email ya está registrado.'
    } else {
      errorMessage.value = 'Error al crear la cuenta.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">

      <h1>Crear cuenta</h1>
      <p>Regístrate para continuar</p>

      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleRegister">

        <!-- Nombre -->
        <input
          v-model="name"
          placeholder="Nombre"
          @blur="onBlur('name')"
        />
        <span v-if="errors.name">{{ errors.name }}</span>

        <!-- Email -->
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          @blur="onBlur('email')"
        />
        <span v-if="errors.email">{{ errors.email }}</span>

        <!-- Password -->
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Contraseña"
          @blur="onBlur('password')"
        />
        <span v-if="errors.password">{{ errors.password }}</span>

        <!-- Confirm -->
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Confirmar contraseña"
          @blur="onBlur('confirmPassword')"
        />
        <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Creando...' : 'Crear cuenta' }}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta?
        <NuxtLink to="/login">Inicia sesión</NuxtLink>
      </p>

    </div>
  </div>
</template>