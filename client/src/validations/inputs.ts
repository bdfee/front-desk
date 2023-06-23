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

export const validateTimeString = (timeString: string) => {
  const regex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/
  return regex.test(timeString)
}

export const isStartTimeBeforeEndTime = (
  startTime: string,
  endTime: string,
) => {
  const [startHours, startMins, startSeconds] = startTime.split(':')
  const [endHours, endMins, endSeconds] = endTime.split(':')

  // prettier-ignore
  const timeDifference = 
    (+startHours * 3600 + +startMins * 60 + +startSeconds) -
    (+endHours * 3600 + +endMins * 60 + +endSeconds)

  return timeDifference > 0
}

export const validDateString = (date: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const parsedDate = Date.parse(date)
  return dateRegex.test(date) && !isNaN(parsedDate)
}
