import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Container,
  Grid,
} from '@mui/material'
import SpecialistForm from './specialist-form'
import { SpecialistModalProps } from '../../types'
import Status from '../status'

const SpecialistModal = ({ closeModal, modalOpen }: SpecialistModalProps) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => closeModal()}>
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} sx={{ paddingLeft: 0 }}>
            <DialogTitle id="dialog-title">Add a new specialist</DialogTitle>
          </Grid>
          <Grid item xs={6}>
            <Status location="modal" />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <DialogContent id="dialog-description">
        <SpecialistForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  )
}

export default SpecialistModal
