export const validateTextInput = (
  input: unknown | undefined,
): input is string => {
  if (typeof input !== 'string' || input.length === 0 || input === undefined) {
    return false
  }
  return nameRegex.test(input)
}

export const sanitizeTextInput = (input: string): string =>
  input.trim().toString()

const nameRegex = /^[A-Za-z\s]+$/
