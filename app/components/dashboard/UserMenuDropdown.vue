<template>
  <div class="relative" ref="rootRef">
    <button
      type="button"
      class="flex items-center gap-2 rounded-md transition-colors"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="isOpen = !isOpen"
    >
      <img :src="iconUserProfile" alt="" class="w-100% shrink-0" />
      <span class="hidden sm:inline font-sans font-semibold text-sm text-neutral-darkText uppercase tracking-wide">
        {{ userName }}
      </span>
      <img
        :src="iconArrowDown"
        alt=""
        class="w-4 h-4 transition-transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-48 bg-neutral-white border border-neutral-grayBorder rounded-lg shadow-lg py-1 z-50"
      role="menu"
    >
      <button
        type="button"
        class="w-full text-left px-4 py-2.5 font-sans text-sm text-neutral-darkText hover:bg-neutral-grayBg transition-colors"
        role="menuitem"
        @click="handleProfile"
      >
        Perfil
      </button>
      <button
        type="button"
        class="w-full text-left px-4 py-2.5 font-sans text-sm text-kambista-errorRed hover:bg-kambista-errorRed/5 transition-colors"
        role="menuitem"
        @click="handleLogout"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import iconUserProfile from '@/assets/img/icons/icon-user-profile.svg'
import iconArrowDown from '@/assets/img/icons/icon-arrow-down.svg'

defineProps<{
  userName: string
}>()

const authStore = useAuthStore()
const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const close = () => {
  isOpen.value = false
}

const handleProfile = () => {
  close()
}

const handleLogout = () => {
  close()
  authStore.logout()
}

const onClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', onClickOutside)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', onClickOutside)
  }
})
</script>