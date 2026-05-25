<template>
  <div class="h-screen flex overflow-hidden bg-kambista-appBg">
    <!-- Desktop sidebar -->
    <DashboardSidebar
      class="hidden lg:flex h-screen shrink-0"
      :collapsed="sidebarCollapsed"
      :user-name="userName"
      @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
    />

    <!-- Mobile drawer -->
    <ClientOnly>
      <Teleport to="body">
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed inset-0 z-50"
      >
        <div
          class="absolute inset-0 bg-kambista-navy/50"
          aria-hidden="true"
          @click="mobileMenuOpen = false"
        />
        <DashboardSidebar
          mobile
          :user-name="userName"
          class="absolute left-0 top-0 h-full z-10 shadow-xl"
          @close="mobileMenuOpen = false"
        />
      </div>
      </Teleport>
    </ClientOnly>

    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden lg:px-[28px]">
      <DashboardHeader
        page-title="Inicio"
        :user-name="userName"
        @open-menu="mobileMenuOpen = true"
      />

      <main class="px-4 py-6 lg:px-8 lg:py-10">
        <slot />
      </main>
    </div>

    <WhatsAppButton
      phone="51999999999"
      message="Hola, necesito ayuda con mi operación en Kambista."
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import WhatsAppButton from '~/components/shared/WhatsAppButton.vue'

const authStore = useAuthStore()

const sidebarCollapsed = ref(false)
const mobileMenuOpen = ref(false)

const userName = computed(() => {
  const name = authStore.userDisplayName ?? authStore.userEmail?.split('@')[0] ?? 'Usuario'
  return name.toUpperCase()
})
</script>