import bankReceiverAccounts from '../../../../mocks/bankReceiverAccounts.json'

interface ReceiverAccount {
  id: string
  accountType: string
  name: string
  alias: string
  accountNumber: string
  currency: 'PEN' | 'USD'
}

const accounts: ReceiverAccount[] = (bankReceiverAccounts as ReceiverAccount[])

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<ReceiverAccount, 'id'>>(event)

  if (!body?.accountType || !body?.name || !body?.alias || !body?.accountNumber || !body?.currency) {
    throw createError({ statusCode: 400, statusMessage: 'Missing account data' })
  }

  const newAccount: ReceiverAccount = {
    id: `${Date.now()}`,
    accountType: body.accountType,
    name: body.name,
    alias: body.alias,
    accountNumber: body.accountNumber,
    currency: body.currency
  }

  accounts.unshift(newAccount)

  return newAccount
})