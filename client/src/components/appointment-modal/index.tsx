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
import appointmentService from '../../services/appointment'
import axios from 'axios'
import AppointmentForm from './appointment-form'
import { AppointmentDetail, AppointmentInput } from '../../types'
import { RBCEventPropsForForm } from '../calendar'

interface BaseAppointmentModalProps {
  serviceType: string
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  formValues?: RBCEventPropsForForm
  clearFormValues?: () => void
}

interface UpdateAppointmentModalProps extends BaseAppointmentModalProps {
  state: AppointmentDetail | undefined
  stateSetter: Dispatch<SetStateAction<AppointmentDetail | undefined>>
}

interface AddAppointmentModalProps extends BaseAppointmentModalProps {
  state: AppointmentDetail[] | undefined
  stateSetter: Dispatch<SetStateAction<AppointmentDetail[] | undefined>>
}

type AppointmentModalProps =
  | UpdateAppointmentModalProps
  | AddAppointmentModalProps

const AppointmentModal = (props: AppointmentModalProps) => {
  const { modalOpen, setModalOpen, serviceType, clearFormValues, formValues } =
    props

  const errorCtx = useContext(ErrorCtx)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.openModalOnLoad) {
      openModal()
    }
  })

  if (!errorCtx) {
    return <div>no context here</div>
  }

  const updateAppointment = async (id: number, values: AppointmentInput) => {
    const { stateSetter } = props as UpdateAppointmentModalProps
    try {
      // improve this fetch
      const { appointmentId } = await appointmentService.updateById(+id, values)
      const updatedAppointment = await appointmentService.getOneById(
        appointmentId,
      )
      stateSetter(updatedAppointment)
      closeModal()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorCtx.setError('axios error' + error.message)
      } else {
        errorCtx.setError('unknown error updating appointment')
      }
    }
  }

  const addAppointment = async (values: AppointmentInput) => {
    const { stateSetter, state } = props as AddAppointmentModalProps
    try {
      // improve this fetch
      const { appointmentId } = await appointmentService.create(values)
      const appointment = await appointmentService.getOneById(appointmentId)
      stateSetter(state?.concat(appointment))
      if (clearFormValues) {
        clearFormValues()
      }

      closeModal()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorCtx.setError('axios error' + error.message)
      } else {
        errorCtx.setError('unknown error submitting appointment')
      }
    }
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
          state={props.state}
          formValues={formValues}
          service={
            serviceType === 'update' ? updateAppointment : addAppointment
          }
          onCancel={closeModal}
        ></AppointmentForm>
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentModal
