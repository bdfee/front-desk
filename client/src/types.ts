export interface Specialist {
  specialistId: number
  name: string
  speciality: string
  [key: string]: string | number
}

export type SpecialistInput = Omit<Specialist, 'specialistId'>

export interface SpecialistFormProps {
  onSubmit: (values: SpecialistInput) => void
  onCancel: () => void
  setError: (errorMessage: string) => void
}

export interface Patient {
  patientId: number
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  specialistId: number
}

export type PatientInput = Omit<Patient, 'patientId'>

export type PatientDetail = Patient & {
  specialist: Omit<Specialist, 'specialistId | speciality'>
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary',
  Transgender = 'transgender',
}

export interface Appointment {
  patientId: number
  specialistId: number
  date: string
  start: string
  end: string
  type: string
  description: string
}

export type AppointmentDetail = Omit<
  Appointment,
  'specialistId' | 'patientId'
> & {
  specialist: Omit<Specialist, 'specialistId' | 'speciality'>
  patient: Omit<
    Patient,
    | 'patientId'
    | 'email'
    | 'phone'
    | 'dateOfBirth'
    | 'gender'
    | 'address'
    | 'specialistId'
  >
}

export type AppointmentInput = Omit<Appointment, 'appointmentId'>
