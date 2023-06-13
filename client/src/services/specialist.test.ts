/* eslint-disable @typescript-eslint/no-unused-vars */
import { isTestDb, dropAllTables } from './db'
import specialistService from './specialist'
import { createTestSpecialist, expectSpecialist } from './testHelpers'

beforeAll(async () => expect(await isTestDb()).toBe(true))

beforeEach(async () => expect(await dropAllTables()).toBe(true))

describe('axios servive returned shape', () => {
  test('getAll()', async () => {
    await createTestSpecialist()
    const response = await specialistService.getAll()
    expectSpecialist(response[0])
  })

  test('create()', async () => {
    expectSpecialist(
      await specialistService.create({
        name: 'test specialist',
        speciality: 'testing',
      }),
    )
  })
})

describe('getAll()', () => {
  test('returns all specialists', async () => {
    await createTestSpecialist()
    expect(await specialistService.getAll()).toHaveLength(1)
  })

  test('returns empty array if no specialists', async () => {
    expect(await specialistService.getAll()).toHaveLength(0)
  })
})

describe('create()', () => {
  test('creates specialist', async () => {
    await specialistService.create({
      name: 'test specialist',
      speciality: 'testing',
    })
    expect(await specialistService.getAll()).toHaveLength(1)
  })

  test('returns expected error message if input error', async () => {
    try {
      await await specialistService.create({
        name: 'test specialist',
        speciality: '',
      })
    } catch (error) {
      error instanceof Error &&
        expect(error.message).toBe(
          'Error posting specialist: SequelizeValidationError: Validation error: Validation notEmpty on speciality failed',
        )
    }

    try {
      await await specialistService.create({
        name: '',
        speciality: 'test speciality',
      })
    } catch (error) {
      error instanceof Error &&
        expect(error.message).toBe(
          'Error posting specialist: SequelizeValidationError: Validation error: Validation notEmpty on name failed',
        )
    }

    expect(await specialistService.getAll()).toHaveLength(0)
  })
})

describe('deleteById()', () => {
  test('deletes specialists', async () => {
    const { specialistId } = await createTestSpecialist()
    expect(await specialistService.getAll()).toHaveLength(1)
    await specialistService.deleteById(specialistId)
    expect(await specialistService.getAll()).toHaveLength(0)
  })

  test('returns expected message if no specialist found', async () => {
    await createTestSpecialist()
    try {
      await specialistService.deleteById(3)
    } catch (error) {
      error instanceof Error &&
        expect(error.message).toBe(
          'Error deleting specialist: Error: no matching specialist id found',
        )
    }
  })
})
