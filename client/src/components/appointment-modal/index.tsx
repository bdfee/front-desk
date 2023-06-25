import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
} from '@mui/material'
import AppointmentForm from './appointment-form'
import { AppointmentDetail, AppointmentInput } from '../../types'
import { AppointmentFormValues } from '../calendar'
import { Dispatch, useContext, SetStateAction, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorCtx } from '../../App'
import appointmentService from '../../services/appointment'
import axios from 'axios'

interface UpdateAppointmentModalProps {
  type: string
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  formValues: AppointmentFormValues | undefined
  clearFormValues: () => void
  state: AppointmentDetail | undefined
  stateSetter: Dispatch<SetStateAction<AppointmentDetail | undefined>>
}

interface AddAppointmentModalProps {
  type: string
  modalOpen: boolean
  formValues: AppointmentFormValues | undefined
  clearFormValues: () => void | undefined
  setModalOpen: Dispatch<SetStateAction<boolean>>
  state: AppointmentDetail[] | undefined
  stateSetter: Dispatch<SetStateAction<AppointmentDetail[] | undefined>>
}

type AppointmentModalProps =
  | UpdateAppointmentModalProps
  | AddAppointmentModalProps

const AppointmentModal = (props: AppointmentModalProps) => {
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
    if (props.type !== 'edit') {
      const { stateSetter, state } = props as AddAppointmentModalProps
      try {
        const { appointmentId } = await appointmentService.create(values)
        const appointment = await appointmentService.getOneById(appointmentId)
        console.log(appointment)
        stateSetter(state?.concat(appointment))
        props.clearFormValues()
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
    props.setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = (): void => props.setModalOpen(true)

  return (
    <>
      <Dialog fullWidth={true} open={props.modalOpen} onClose={closeModal}>
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
            formValues={props.formValues}
            service={props.type === 'edit' ? updateAppointment : addAppointment}
            onCancel={closeModal}
          ></AppointmentForm>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AppointmentModal
