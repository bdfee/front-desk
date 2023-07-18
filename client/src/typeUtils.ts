import { Appointment, Patient, Specialist, Task, User } from './types'

export const isSpecialist = (object: unknown): object is Specialist => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed specialist object')
  }
  const { specialistId, name, speciality } = object as Specialist
  return (
    typeof specialistId === 'number' &&
    typeof name === 'string' &&
    typeof speciality === 'string'
  )
}

export const isPatient = (object: unknown): object is Patient => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed patient object')
  }
  const {
    patientId,
    name,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    specialistId,
  } = object as Patient
  return (
    typeof patientId === 'number' &&
    typeof name === 'string' &&
    typeof email === 'string' &&
    typeof phone === 'string' &&
    typeof dateOfBirth === 'string' &&
    typeof gender === 'string' &&
    typeof address === 'string' &&
    typeof specialistId === 'number'
  )
}

export const isTask = (object: unknown): object is Task => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed task object')
  }

  const {
    taskId,
    dueDate,
    description,
    userId,
    specialistId,
    patientId,
    appointmentId,
  } = object as Task

  return (
    (typeof taskId === 'number' &&
      typeof dueDate === 'string' &&
      typeof description === 'string' &&
      typeof userId === 'number' &&
      (typeof patientId === 'number' || patientId === null) &&
      (typeof specialistId === 'number' || specialistId === null) &&
      typeof appointmentId === 'number') ||
    appointmentId === null
  )
}

export const isAppointment = (object: unknown): object is Appointment => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed appointment object')
  }

  const { patientId, specialistId, date, start, end, type, description } =
    object as Appointment
  return (
    typeof patientId === 'number' &&
    typeof specialistId === 'number' &&
    typeof date === 'string' &&
    typeof start === 'string' &&
    typeof end === 'string' &&
    typeof type === 'string' &&
    typeof description === 'string'
  )
}

export const isUser = (object: unknown): object is User => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed user object')
  }

  const { username, name, password, userId } = object as User

  return (
    typeof username === 'string' &&
    typeof name === 'string' &&
    typeof password === 'string' &&
    typeof userId === 'number'
  )
}
