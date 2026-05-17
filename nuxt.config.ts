export default defineNuxtConfig({
  compatibilityDate: '2026-05-17',

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/tailwind.css'
  ],

  typescript: {
    strict: true,
    typeCheck: false
  }
})