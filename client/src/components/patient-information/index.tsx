import InformationList from './patient-information'
import PatientModal from '../patient-modal'
import { useParams } from 'react-router-dom'

import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../App'
const PatientInformation = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div></div>
  }
  return (
    <QueryClientProvider client={queryClient}>
      <InformationList patientId={+id} />
      <PatientModal type="update" />
    </QueryClientProvider>
  )
}

export default PatientInformation
