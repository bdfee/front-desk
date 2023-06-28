import { useEffect, useState } from 'react'
import appointmentService from '../../services/appointment'
import { isAxiosError } from 'axios'
import { Button } from '@mui/material'
import RBC from './rbc'

export interface RBCEventProps {
  title: string
  appointmentId: number
  type: string
  start: Date
  end: Date
}

export interface RBCEventPropsForForm {
  start: string
  end: string
  date: string
}

export type NewEvent = Omit<RBCEventProps, 'title' | 'appointmentId' | 'type'>

import { AppointmentDetail } from '../../types'
import AppointmentModal from '../appointment-modal'

const Calendar = () => {
  const [appointments, setAppointments] = useState<AppointmentDetail[]>()
  const [formValues, setFormValues] = useState<
    RBCEventPropsForForm | undefined
  >()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchAppointments = async () => {
      console.log('calendar/index/fetchAppointments')
      try {
        const fetchedAppointments = await appointmentService.getAll()
        setAppointments(fetchedAppointments)
      } catch (error) {
        if (isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patient')
        }
      }
    }
    void fetchAppointments()
  }, [])

  if (!appointments) {
    return <div>fetching appointments</div>
  }

  const openModal = (values: RBCEventPropsForForm) => {
    setModalOpen(true)
    setFormValues(values)
  }

  const clearForm = () => {
    setFormValues(undefined)
  }

  return (
    <>
      <RBC appointments={appointments} openModal={openModal} />
      <Button onClick={() => setModalOpen(true)}>add appointment</Button>
      <AppointmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        serviceType={formValues ? 'addFromCalendar' : 'add'}
        clearFormValues={clearForm}
        formValues={formValues}
        state={appointments}
        stateSetter={setAppointments}
      />
    </>
  )
}

export default Calendar
