import bankAccounts from '../../../../mocks/bankAccounts.json'

interface BankAccountOption {
  id: string
  name: string
  alias: string
}

export default defineEventHandler(() => {
  return bankAccounts as BankAccountOption[]
})