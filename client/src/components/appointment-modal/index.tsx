import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import { ErrorCtx } from '../../App'
import AppointmentForm from './appointment-form'
import { BaseAppointmentModalProps } from '../../types'

const AppointmentModal = (props: BaseAppointmentModalProps) => {
  const { modalOpen, setModalOpen, serviceType, formValues } = props

  // const errorCtx = useContext(ErrorCtx)

  const location = useLocation()

  useEffect(() => {
    if (location.state?.openModalOnLoad) {
      openModal()
    }
  }, [location.state])

  const closeModal = () => {
    setModalOpen(false)
    // errorCtx.setError(undefined)
  }

  const openModal = () => setModalOpen(true)

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
      <DialogTitle>{serviceType} an appointment</DialogTitle>
      <Divider />
      <DialogContent>
        {/* {errorCtx.error && (
          <Alert severity="error" role="alert">
            {errorCtx.error}
          </Alert>
        )} */}
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
