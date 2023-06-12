import { isTestDb } from './db'

test('returns true if in test or dev', async () => {
  expect(await isTestDb()).toBe(true)
})
