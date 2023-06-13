import specialistService from '../services/specialist'
import { Specialist } from '../types'

export const createTestSpecialist = async () => {
  return specialistService.create({
    name: 'test specialist',
    speciality: 'test speciality',
  })
}

export const expectSpecialist = (specialist: object) => {
  const { specialistId, name, speciality } = specialist as Specialist
  expect(typeof specialistId).toBe('number')
  expect(typeof name).toBe('string')
  expect(typeof speciality).toBe('string')
}
