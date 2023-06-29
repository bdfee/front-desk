import PatientTable from './patient-table'
import PatientModal from '../patient-modal'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../App'

const PatientPage = () => (
  <QueryClientProvider client={queryClient}>
    <PatientTable />
    <PatientModal type="add" />
  </QueryClientProvider>
)

export default PatientPage
