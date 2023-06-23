import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  Button,
} from '@mui/material'
import AppointmentForm from './appointment-form'
import { AppointmentDetail, AppointmentInput } from '../../types'
import {
  Dispatch,
  useContext,
  useState,
  SetStateAction,
  useEffect,
} from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorCtx } from '../../App'
import appointmentService from '../../services/appointment'
import axios from 'axios'

interface UpdateAppointmentModalProps {
  type: string
  state: AppointmentDetail | undefined
  stateSetter: Dispatch<SetStateAction<AppointmentDetail | undefined>>
}

interface AddAppointmentModalProps {
  type: string
  state: AppointmentDetail[] | undefined
  stateSetter: Dispatch<SetStateAction<AppointmentDetail[] | undefined>>
}

type AppointmentModalProps =
  | UpdateAppointmentModalProps
  | AddAppointmentModalProps

const AppointmentModal = (props: AppointmentModalProps) => {
  const [modalOpen, setModalOpen] = useState(false)
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

  const updateAppointment = async (id: string, values: AppointmentInput) => {
    if (props.type === 'edit') {
      const { stateSetter } = props as UpdateAppointmentModalProps
      try {
        const { appointmentId } = await appointmentService.updateById(
          +id,
          values,
        )
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
  }

  const addAppointment = async (values: AppointmentInput) => {
    if (props.type === 'add') {
      const { stateSetter, state } = props as AddAppointmentModalProps
      try {
        const { appointmentId } = await appointmentService.create(values)
        const appointment = await appointmentService.getOneById(appointmentId)
        stateSetter(state?.concat(appointment))
        closeModal()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorCtx.setError('axios error' + error.message)
        } else {
          errorCtx.setError('unknown error submitting appointment')
        }
      }
    }
  }

  const closeModal = (): void => {
    setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <>
      <Button onClick={() => openModal()}>{props.type} appointment</Button>
      <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
        <DialogTitle>{props.type} an appointment</DialogTitle>
        <Divider />
        <DialogContent>
          {errorCtx.error && (
            <Alert severity="error" role="alert">
              {errorCtx.error}
            </Alert>
          )}
          <AppointmentForm
            type={props.type}
            state={props.state}
            service={props.type === 'edit' ? updateAppointment : addAppointment}
            onCancel={closeModal}
          ></AppointmentForm>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AppointmentModal
