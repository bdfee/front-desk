import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
} from '@mui/material'
import SpecialistForm from './specialist-form'
import { SpecialistInput } from '../../../types'
import { SetStateAction } from 'react'

interface ModalProps {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: SpecialistInput) => void
  error?: string
  setError: React.Dispatch<SetStateAction<string | undefined>>
}

const AddSpecialistModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  setError,
}: ModalProps) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new specialist</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <SpecialistForm
        onSubmit={onSubmit}
        onCancel={onClose}
        setError={setError}
      />
    </DialogContent>
  </Dialog>
)

export default AddSpecialistModal
