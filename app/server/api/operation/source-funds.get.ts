import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

interface SourceFundOption {
  _id: string
  name: string
}

export default defineEventHandler(async () => {
  const filePath = resolve(process.cwd(), 'mocks', 'sourceFunds.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as SourceFundOption[]
})