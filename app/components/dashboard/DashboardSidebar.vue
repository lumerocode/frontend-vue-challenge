<template>
  <aside
    class="relative flex flex-col bg-neutral-white h-screen shrink-0 transition-[width] duration-300 ease-in-out"
    :class="mobile ? 'w-[290px]' : collapsed ? 'w-[72px]' : 'w-[320px]'"
  >
    <div
      class="flex items-center justify-center shrink-0 py-4"
      :class="collapsed && !mobile ? 'justify-center h-[72px] px-2' : 'h-auto px-5'"
    >
      <img
        :src="logoSrc"
        alt="Kambista"
        :class="logoClass"
      />
    </div>

    <nav class="flex-1 overflow-y-auto py-4 px-2 min-h-0">
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in navItems" :key="item.id">
          <component
            :is="item.href ? 'NuxtLink' : 'button'"
            :to="item.href"
            type="button"
            class="w-full flex items-center gap-4 rounded-r-lg py-3 font-sans text-sm transition-colors relative"
            :class="[
              item.active
                ? 'bg-kambista-blueLight/40 text-neutral-black font-semibold border-l-[3px] border-l-kambista-mint'
                : 'text-neutral-darkText hover:bg-neutral-grayBg border-l-[3px] border-l-transparent pl-[calc(0.75rem+3px)]',
              collapsed && !mobile
                ? 'justify-center px-2 border-l-0'
                : item.active
                  ? 'pl-3 pr-3'
                  : 'pl-3 pr-3'
            ]"
            :title="collapsed && !mobile ? item.label : undefined"
            @click="!item.href && handlePlaceholderClick()"
          >
            <img :src="item.icon" alt="" class="w-100% shrink-0" />
            <span v-if="!collapsed || mobile" class=" font-medium">
              {{ item.label }}
            </span>
            <span
              v-if="item.badge && (!collapsed || mobile)"
              class="shrink-0 rounded-[15px] px-2 py-1 font-sans text-sm font-bold uppercase bg-kambista-deepBlue text-neutral-white"
            >
              {{ item.badge }}
            </span>
          </component>
        </li>
      </ul>
    </nav>

    <div v-if="mobile" class="border-t border-neutral-grayBorder p-4 shrink-0">
      <p class="font-sans font-semibold text-sm text-kambista-navy uppercase mb-3">
        {{ userName }}
      </p>
      <button
        type="button"
        class="w-full text-left py-2 font-sans text-sm text-neutral-darkText"
        @click="handleProfile"
      >
        Perfil
      </button>
      <button
        type="button"
        class="w-full text-left py-2 font-sans text-sm text-kambista-errorRed"
        @click="handleLogout"
      >
        Cerrar sesión
      </button>
    </div>

    <button
      v-if="!mobile"
      type="button"
      class="absolute -right-4 top-[16px] z-10 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-white border border-neutral-grayBorder shadow-sm hover:border-kambista-mint transition-colors"
      :aria-label="collapsed ? 'Expandir menú' : 'Colapsar menú'"
      @click="emit('toggle-collapse')"
    >
      <img
        :src="iconArrowLeft"
        alt=""
        class="w-3 h-3 transition-transform"
        :class="collapsed ? 'rotate-180' : ''"
      />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { DASHBOARD_NAV_ITEMS } from '~/constants/dashboard-nav'
import { useAuthStore } from '~/stores/auth'
import logoMain from '@/assets/img/brand/logo-main.svg'
import isotipo from '@/assets/img/brand/isotipo.svg'
import iconArrowLeft from '@/assets/img/icons/icon-arrow-left.svg'

const props = withDefaults(defineProps<{
  collapsed?: boolean
  mobile?: boolean
  userName?: string
}>(), {
  collapsed: false,
  mobile: false,
  userName: 'Usuario'
})

const emit = defineEmits<{
  'toggle-collapse': []
  close: []
}>()

const authStore = useAuthStore()
const navItems = DASHBOARD_NAV_ITEMS

const showIsotipo = computed(() => props.collapsed && !props.mobile)

const logoSrc = computed(() => (showIsotipo.value ? isotipo : logoMain))

const logoClass = computed(() =>
  showIsotipo.value
    ? 'h-8 w-8 object-contain'
    : 'w-[120px] lg:w-[160px] object-contain'
)

const handlePlaceholderClick = () => {
  if (props.mobile) emit('close')
}

const handleProfile = () => emit('close')
const handleLogout = () => {
  emit('close')
  authStore.logout()
}
</script>