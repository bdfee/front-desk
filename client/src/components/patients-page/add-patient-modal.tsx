import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
} from '@mui/material'

import PatientForm from './patient-form'
import { PatientInput } from '../../types'
import { useContext } from 'react'
import { PatientCtx } from './index'

interface ModalProps {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: PatientInput) => void
  error?: string
  setError?: (errorMessage: string) => void
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  setError,
}: ModalProps) => {
  const contextValue = useContext(PatientCtx)
  console.log(contextValue)
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && (
          <Alert severity="error" role="alert">
            {error}
          </Alert>
        )}
        <PatientForm
          onSubmit={onSubmit}
          onCancel={onClose}
          setError={setError}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddPatientModal
