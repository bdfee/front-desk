import SelectPatient from './select-patient'
import SelectSpecialist from './select-specialist'
import SelectType from './select-type'

import { Dispatch, SetStateAction } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

interface FetchedFormComponentsProps {
  patientId: string
  setPatientId: Dispatch<SetStateAction<string>>
  specialistId: string
  setSpecialistId: Dispatch<SetStateAction<string>>
  type: string
  setType: Dispatch<SetStateAction<string>>
}

const queryClient = new QueryClient()

const FetchedFormComponents = ({
  patientId,
  setPatientId,
  specialistId,
  setSpecialistId,
  type,
  setType,
}: FetchedFormComponentsProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectPatient patientId={patientId} setPatientId={setPatientId} />
      <SelectSpecialist
        specialistId={specialistId}
        setSpecialistId={setSpecialistId}
      />
      <SelectType type={type} setType={setType} />
    </QueryClientProvider>
  )
}

export default FetchedFormComponents
