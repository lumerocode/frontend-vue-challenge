<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-kambista-mint focus:ring-offset-2"
    aria-label="Contactar por WhatsApp"
  >
    <img
      :src="whatsappIcon"
      alt="WhatsApp"
      class="w-full h-full object-contain"
    />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WhatsAppButtonProps } from '@/types/components'
import whatsappIcon from '@/assets/img/illustrations/whatsapp-chat-button.svg'

const props = withDefaults(defineProps<WhatsAppButtonProps>(), {
  phone: '51999999999',
  message: ''
})

const whatsappUrl = computed(() => {
  const phone = props.phone.replace(/\D/g, '')
  const baseUrl = `https://wa.me/${phone}`

  if (!props.message.trim()) {
    return baseUrl
  }

  return `${baseUrl}?text=${encodeURIComponent(props.message.trim())}`
})
</script>