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

export type PatientDetail = Omit<Patient, 'specialistId'> & {
  specialist: Omit<Specialist, 'specialistId | speciality'>
}
