<template>
  <div class="w-full flex flex-col">
    <div class="flex justify-center items-center mb-[44px] md:hidden">
      <img src="/assets/img/brand/logo-main.svg" alt="Kambista" class="w-[136px] object-contain" />
    </div>

    <h1 class="font-sans font-normal text-2xl md:text-3xl text-black text-center md:text-left md:font-bold">
      Inicia sesión
    </h1>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-5 mt-[70px] md:mt-6 " novalidate>
      <BaseInput
        v-model="email"
        label="Correo electrónico"
        placeholder="Escribe tu correo"
        type="email"
        autocomplete="username"
        :error="errors.email"
        @blur="touchField('email')"
      />

      <div class="flex flex-col gap-5">
        <BaseInput
          v-model="password"
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          type="password"
          autocomplete="current-password"
          :error="errors.password"
          @blur="touchField('password')"
        />

        <div class="flex justify-center mt-1">
          <NuxtLink
            to="/#"
            class="font-sans font-medium text-xs text-neutral-darkText underline hover:text-kambista-navy"
          >
            ¿Olvidaste tu contraseña?
          </NuxtLink>
        </div>
      </div>

      <div class="mt-[72px] md:mt-5">
        <BaseButton type="submit" :loading="isLoading" :disabled="isSubmitDisabled">
          INICIA SESIÓN
        </BaseButton>
      </div>
    </form>

    <div class="flex justify-center items-center gap-1.5 mt-6 font-sans text-sm text-neutral-darkText">
      <span>¿No tienes cuenta?</span>
      <NuxtLink to="/#" class="underline hover:text-kambista-navy">Regístrate aquí</NuxtLink>
    </div>

    <ApiErrorModal
      v-model="showApiErrorModal"
      :title="apiErrorPayload.title"
      :message="apiErrorPayload.message"
      @close="showApiErrorModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { ROUTES } from '~/constants/routes'
import { validateEmail, validatePassword, normalizeLoginCredentials } from '~/utils/auth-validation'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ApiErrorModal from '@/components/ui/ApiErrorModal.vue'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const { login: apiLogin } = useAuthApi()
const isLoading = ref(false)
const showApiErrorModal = ref(false)
const apiErrorPayload = ref({
  title: 'Credenciales incorrectas',
  message: 'El correo o la contraseña no son correctos.'
})

const email = ref('')
const password = ref('')

const touched = ref({
  email: false,
  password: false
})

const touchField = (field: 'email' | 'password') => {
  touched.value[field] = true
}

const touchAllFields = () => {
  touched.value.email = true
  touched.value.password = true
}

const formValues = computed(() => ({
  email: email.value,
  password: password.value
}))

const errors = computed(() => ({
  email: touched.value.email ? validateEmail(formValues.value.email) : '',
  password: touched.value.password ? validatePassword(formValues.value.password) : ''
}))

const isFormInvalid = computed(() => {
  return !!validateEmail(formValues.value.email) || !!validatePassword(formValues.value.password)
})

const isFormComplete = computed(() => {
  return Boolean(formValues.value.email.trim()) && Boolean(formValues.value.password)
})

const isSubmitDisabled = computed(() => isLoading.value || !isFormComplete.value)

const MIN_LOGIN_LOADING_MS = 800

const waitForMinimumLoading = async (startedAt: number) => {
  const elapsed = Date.now() - startedAt
  const remaining = MIN_LOGIN_LOADING_MS - elapsed

  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining))
  }
}

watch([email, password], () => {
  authStore.errorFeedback = null
  showApiErrorModal.value = false
})

const handleLogin = async () => {
  touchAllFields()

  if (isFormInvalid.value) {
    return
  }

  const credentials = normalizeLoginCredentials(email.value, password.value)

  isLoading.value = true
  const startedAt = Date.now()

  try {
    const result = await authStore.login(credentials, apiLogin)

    if (!result.success) {
      apiErrorPayload.value = {
        title: result.error.title,
        message: result.error.message
      }
      showApiErrorModal.value = true
      return
    }

    await waitForMinimumLoading(startedAt)
    await navigateTo(ROUTES.onboarding, { replace: true })
  } finally {
    isLoading.value = false
  }
}
</script>