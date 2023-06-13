import specialistService from '../services/specialist'

export const createTestSpecialist = async () => {
  return specialistService.create({
    name: 'test specialist',
    speciality: 'test speciality',
  })
}
