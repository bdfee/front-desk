import InformationList from './patient-information'
import PatientModal from '../patient-modal'
import { useParams } from 'react-router-dom'

const PatientInformation = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div></div>
  }
  return (
    <>
      <InformationList patientId={+id} />
      <PatientModal type="update" />
    </>
  )
}

export default PatientInformation
