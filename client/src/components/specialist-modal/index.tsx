import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import SpecialistForm from './specialist-form'
import { SpecialistModalProps } from '../../types'

const SpecialistModal = ({ closeModal, modalOpen }: SpecialistModalProps) => {
  return (
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
        {/* {error && (
            <Alert severity="error" role="alert">
              {error}
            </Alert>
          )} */}
        <SpecialistForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  )
}

export default SpecialistModal
