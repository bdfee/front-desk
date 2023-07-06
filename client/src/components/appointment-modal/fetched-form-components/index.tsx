import SelectPatient from './select-patient'
import SelectSpecialist from './select-specialist'
import SelectType from './select-type'

import { Dispatch, SetStateAction } from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../../App'

interface FetchedFormComponentsProps {
  patientId: string
  setPatientId: Dispatch<SetStateAction<string>>
  specialistId: string
  setSpecialistId: Dispatch<SetStateAction<string>>
  type: string
  setType: Dispatch<SetStateAction<string>>
}

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
      <div style={{ minHeight: '71px' }}>
        <SelectPatient patientId={patientId} setPatientId={setPatientId} />
        <SelectSpecialist
          specialistId={specialistId}
          setSpecialistId={setSpecialistId}
        />
        <SelectType type={type} setType={setType} />
      </div>
    </QueryClientProvider>
  )
}

export default FetchedFormComponents
