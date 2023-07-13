import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Container,
} from '@mui/material'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppointmentForm from './appointment-form'
import { BaseAppointmentModalProps } from '../../types'
import Status from '../status'
const AppointmentModal = (props: BaseAppointmentModalProps) => {
  const { modalOpen, setModalOpen, serviceType, formValues } = props

  const location = useLocation()

  useEffect(() => {
    if (location.state?.openModalOnLoad) {
      openModal()
    }
  }, [location.state])

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => setModalOpen(true)

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} sx={{ paddingLeft: 0 }}>
            <DialogTitle>{serviceType} an appointment</DialogTitle>
          </Grid>
          <Grid item xs={6}>
            <Status location="modal" />
          </Grid>
        </Grid>
      </Container>

      <Divider />
      <DialogContent>
        <AppointmentForm
          serviceType={serviceType}
          formValues={formValues}
          closeModal={closeModal}
        ></AppointmentForm>
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentModal
