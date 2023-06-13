import specialistService from './specialist'
import { createTestSpecialist } from './testHelpers'

test('test DB is active', async () => {
  //
})

describe('axios servive returned shape', () => {
  test('getAll()', async () => {
    await createTestSpecialist()
    await specialistService.getAll()
  })

  test('create()', async () => {
    //
  })
})

describe('getAll()', () => {
  //
  test('returns all specialists', async () => {
    //
  })

  test('returns empty array if no specialists', async () => {
    //
  })
})

describe('create()', () => {
  //
  test('creates specialist', async () => {
    //
  })

  test('returns expected error message if input error', async () => {
    //
  })
})

describe('deleteById()', () => {
  //
  test('deletes specialists', async () => {
    //
  })

  test('returns expected message if no specialist found', async () => {
    //
  })
})
