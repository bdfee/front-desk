import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
} from '@mui/material'
import SpecialistForm from './specialist-form'

interface SpecialistModalProps {
  closeModal: () => void
  modalOpen: boolean
  setError: (errorMessage: string) => () => void
  error: string | undefined
}

const SpecialistModal = ({
  closeModal,
  setError,
  modalOpen,
  error,
}: SpecialistModalProps) => {
  return (
    <>
      <Dialog
        fullWidth={true}
        open={modalOpen}
        onClose={() => closeModal()}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Add a new specialist</DialogTitle>
        <Divider />
        <DialogContent id="dialog-description">
          {error && (
            <Alert severity="error" role="alert">
              {error}
            </Alert>
          )}
          <SpecialistForm closeModal={closeModal} setError={setError} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SpecialistModal
