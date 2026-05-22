<!-- BankAccountsModal: Modal for selecting or adding a bank account. -->
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed bottom-0 left-0 right-0 inset-0 z-50 flex items-end lg:items-center justify-center bg-kambista-navy/50" @click="$emit('update:modelValue', false)">
      <div class="bg-white w-full lg:max-w-[406px] relative shadow-lg pb-3 rounded-t-lg lg:rounded-lg" @click.stop>
        <button type="button" class="absolute right-4 top-4 lg:top-4" @click="$emit('update:modelValue', false)">
          <img :src="iconClose" alt="Close" class="w-4 h-4 hidden lg:block" />
        </button>
        <div class="bg-neutral-white lg:bg-kambista-navy px-6 p-4 text-neutral-darkText lg:text-neutral-white rounded-tl-[20px] rounded-tr-[20px] lg:rounded-tl-lg lg:rounded-tr-lg border-b border-neutral-grayBorder lg:border-none">
          <h2 class="hidden font-sans font-medium text-2xl mb-1 lg:block">Cuentas bancarias</h2>
          <p class="font-sans text-sm font-semibold lg:text-base lg:font-medium">Selecciona tu cuenta de destino</p>
        </div>
        <div class="bg-neutral-white">
          <div class="max-h-[218px] overflow-y-auto">
            <div class="divide-y divide-neutral-grayBorder">
              <div
                v-for="account in receiverAccounts"
                :key="account.id"
                class="py-4 cursor-pointer hover:bg-neutral-grayBorder rounded px-8"
                @click="selectAccount(account)"
              >
                <div class="font-sans font-medium text-base text-neutral-darkText">
                  {{ account.alias }} - {{ account.name }}
                </div>
                <div class="text-xs text-neutral-grayText tracking-widest">
                  {{ maskAccountNumber(account.accountNumber) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 cursor-pointer py-4 px-8 hover:opacity-60 border-t border-neutral-grayBorder" @click="openCreateAccountDrawer">
          <div class="w-10 h-10 border-2 border-kambista-navy rounded flex items-center justify-center shrink-0">
            <span class="text-xl font-bold text-kambista-navy">+</span>
          </div>
          <span class="font-sans text-base text-kambista-navy font-medium">Agregar cuenta</span>
        </div>
      </div>
    </div>
    <AddBankAccountDrawer v-model="showCreateAccountDrawer" @add-account="addAccount" />
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AddBankAccountDrawer from '@/components/shared/AddBankAccountDrawer.vue'
import iconClose from '@/assets/img/icons/icon-close-v3.svg'
import bankReceiverAccounts from '../../../mocks/bankReceiverAccounts.json'

type ReceiverAccount = {
  id: string
  accountType: string
  name: string
  alias: string
  accountNumber: string
  currency: 'PEN' | 'USD'
}

const emit = defineEmits<{
  'update:modelValue': [boolean]
  select: [ReceiverAccount]
}>()

const props = defineProps<{
  modelValue: boolean
  accounts?: ReceiverAccount[]
}>()

const receiverAccounts = ref<ReceiverAccount[]>(
  props.accounts?.length ? props.accounts : (bankReceiverAccounts as ReceiverAccount[])
)
const showCreateAccountDrawer = ref(false)

const openCreateAccountDrawer = () => {
  showCreateAccountDrawer.value = true
  emit('update:modelValue', false)
}

const selectAccount = (account: ReceiverAccount) => {
  emit('select', account)
  emit('update:modelValue', false)
}

const addAccount = async (account: Omit<ReceiverAccount, 'id'>) => {
  const created = await $fetch<ReceiverAccount>('/api/operation/bank-receiver-accounts', {
    method: 'POST',
    body: account
  })
  receiverAccounts.value.unshift(created)
  emit('select', created)
  showCreateAccountDrawer.value = false
  emit('update:modelValue', false)
}

const maskAccountNumber = (accountNumber: string) => {
  return `****${accountNumber.slice(-4)}`
}
</script>