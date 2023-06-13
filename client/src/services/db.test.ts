import { isTestDb } from './db'

test('returns true if NODE_ENV test or dev', async () => {
  expect(await isTestDb()).toBe(true)
})
