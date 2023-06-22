import { Appointment, Patient, Specialist } from './types'

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
