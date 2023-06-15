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
