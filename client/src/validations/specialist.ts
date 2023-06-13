export const validateTextInput = (input: unknown): boolean => {
  if (typeof input !== 'string' || input.length === 0) {
    return false
  }
  return true
}

export const sanitizeTextInput = (input: string): string =>
  input.trim().toString()
