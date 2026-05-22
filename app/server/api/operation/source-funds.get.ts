import sourceFunds from '../../../../mocks/sourceFunds.json'

interface SourceFundOption {
  _id: string
  name: string
}

export default defineEventHandler(() => {
  return sourceFunds as SourceFundOption[]
})