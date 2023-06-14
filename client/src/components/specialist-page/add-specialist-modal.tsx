import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
} from '@mui/material'
import SpecialistForm from './specialist-form'
import { SpecialistInput } from '../../types'

interface ModalProps {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: SpecialistInput) => void
  error?: string
  setError: (errorMessage: string) => void
}

const AddSpecialistModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  setError,
}: ModalProps) => (
  <Dialog
    fullWidth={true}
    open={modalOpen}
    onClose={() => onClose()}
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogTitle id="dialog-title">Add a new specialist</DialogTitle>
    <Divider />
    <DialogContent id="dialog-description">
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
