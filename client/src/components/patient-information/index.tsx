import InformationList from './patient-information'
import PatientModal from '../patient-modal'
import { useParams } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ErrorCtx, queryClient } from '../../App'
import { Alert, DialogContent } from '@mui/material'
import { useContext } from 'react'

const PatientInformation = () => {
  const { id } = useParams<{ id: string }>()
  const errorCtx = useContext(ErrorCtx)
  if (!id) {
    return <div></div>
  }
  return (
    <QueryClientProvider client={queryClient}>
      <DialogContent>
        {errorCtx?.error && (
          <Alert severity="error" role="alert">
            {errorCtx?.error}
          </Alert>
        )}
      </DialogContent>
      <InformationList patientId={+id} />
      <PatientModal type="update" />
    </QueryClientProvider>
  )
}

export default PatientInformation
