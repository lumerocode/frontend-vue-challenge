import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

interface ReceiverAccount {
  id: string
  accountType: string
  name: string
  alias: string
  accountNumber: string
  currency: 'PEN' | 'USD'
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<ReceiverAccount, 'id'>>(event)

  if (!body?.accountType || !body?.name || !body?.alias || !body?.accountNumber || !body?.currency) {
    throw createError({ statusCode: 400, statusMessage: 'Missing account data' })
  }

  const filePath = resolve(process.cwd(), 'mocks', 'bankReceiverAccounts.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  const accounts = (JSON.parse(raw) as ReceiverAccount[])

  const newAccount: ReceiverAccount = {
    id: `${Date.now()}`,
    accountType: body.accountType,
    name: body.name,
    alias: body.alias,
    accountNumber: body.accountNumber,
    currency: body.currency
  }

  accounts.unshift(newAccount)
  await fs.writeFile(filePath, JSON.stringify(accounts, null, 2), 'utf-8')

  return newAccount
})