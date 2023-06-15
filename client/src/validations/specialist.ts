export const validateTextInput = (input: unknown): boolean => {
  if (typeof input !== 'string' || input.length === 0) {
    return false
  }
  return nameRegex.test(input)
}

export const sanitizeTextInput = (input: string): string =>
  input.trim().toString()

const nameRegex = /^[A-Za-z\s]+$/
