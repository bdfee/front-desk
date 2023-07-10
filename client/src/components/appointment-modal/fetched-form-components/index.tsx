import SelectPatient from './select-patient'
import SelectSpecialist from './select-specialist'
import SelectType from './select-type'

import { FetchedFormComponentsProps } from '../../../types'

const FetchedFormComponents = ({
  patientId,
  setPatientId,
  specialistId,
  setSpecialistId,
  type,
  setType,
}: FetchedFormComponentsProps) => {
  return (
    <div style={{ minHeight: '71px' }}>
      <SelectPatient patientId={patientId} setPatientId={setPatientId} />
      <SelectSpecialist
        specialistId={specialistId}
        setSpecialistId={setSpecialistId}
      />
      <SelectType type={type} setType={setType} />
    </div>
  )
}

export default FetchedFormComponents
