import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
} from '@mui/material'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorCtx } from '../../App'
import AppointmentForm from './appointment-form'
import { RBCEventPropsForForm } from '../calendar'

interface BaseAppointmentModalProps {
  serviceType: string
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  formValues?: RBCEventPropsForForm
  clearFormValues?: () => void
}

const AppointmentModal = (props: BaseAppointmentModalProps) => {
  const { modalOpen, setModalOpen, serviceType, formValues } = props

  const errorCtx = useContext(ErrorCtx)

  const location = useLocation()

  useEffect(() => {
    if (location.state?.openModalOnLoad) {
      openModal()
    }
  }, [location.state])

  if (!errorCtx) {
    return <div>no context here</div>
  }

  const closeModal = () => {
    setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = () => setModalOpen(true)

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
      <DialogTitle>{serviceType} an appointment</DialogTitle>
      <Divider />
      <DialogContent>
        {errorCtx.error && (
          <Alert severity="error" role="alert">
            {errorCtx.error}
          </Alert>
        )}
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
