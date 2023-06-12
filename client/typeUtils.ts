import { Specialist } from './types'

export const isSpecialist = (object: unknown): object is Specialist => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed specialist object')
  }
  const { specialistId, name, speciality } = object as Specialist
  return (
    typeof specialistId === 'number' &&
    typeof name === 'string' &&
    typeof speciality === 'string'
  )
}
