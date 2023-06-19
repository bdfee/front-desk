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

export const formatPhone = (input: string) => {
  const digitsOnly = input.replace(/\D/g, '')

  let formattedPhone = ''
  for (let i = 0; i < digitsOnly.length && i < 10; i++) {
    if (i === 3 || i === 6) {
      formattedPhone += '-'
    }
    formattedPhone += digitsOnly[i]
  }

  return sanitizeTextInput(formattedPhone)
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeEmail = (email: unknown): string => {
  if (typeof email !== 'string') {
    throw new Error('Invalid input. Expected a string.')
  }

  const trimmedEmail = email.trim()
  const sanitizedEmail = trimmedEmail.toLowerCase()
  const sanitizedEmailWithoutSpaces = sanitizedEmail.replace(/\s/g, '')

  return sanitizedEmailWithoutSpaces
}
