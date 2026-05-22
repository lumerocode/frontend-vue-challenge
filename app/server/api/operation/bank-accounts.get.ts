import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

interface BankAccountOption {
  id: string
  name: string
  alias: string
}

export default defineEventHandler(async () => {
  const filePath = resolve(process.cwd(), 'mocks', 'bankAccounts.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as BankAccountOption[]
})