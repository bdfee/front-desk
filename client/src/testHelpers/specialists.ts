import specialistService from '../services/specialist'
import { Specialist } from '../types'

export const createTestSpecialist = async () => {
  return specialistService.create({
    name: 'test specialist',
    speciality: 'test speciality',
  })
}

export const createLocalSpecialistList = (number: number): Specialist[] => {
  const list = []
  for (let i = 0; i < number; i++) {
    list.push({
      specialistId: i,
      name: `test specialist`,
      speciality: 'test speciality',
    })
  }
  return list
}

export const expectSpecialist = (specialist: object) => {
  const { specialistId, name, speciality } = specialist as Specialist
  expect(typeof specialistId).toBe('number')
  expect(typeof name).toBe('string')
  expect(typeof speciality).toBe('string')
}
