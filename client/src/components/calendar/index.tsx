import { useState, useEffect } from 'react'
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

import AppointmentModal from '../appointment-modal'

const Calendar = () => {
  const [formValues, setFormValues] = useState<
    RBCEventPropsForForm | undefined
  >()
  const [modalOpen, setModalOpen] = useState(false)

  // in lieu of element blur, clear form if modal closed by clicking away
  useEffect(() => {
    if (!modalOpen) {
      clearForm()
    }
  }, [modalOpen])

  const openModal = (values: RBCEventPropsForForm) => {
    setModalOpen(true)
    setFormValues(values)
  }

  const clearForm = () => {
    setFormValues(undefined)
  }

  return (
    <>
      <RBC openModal={openModal} />
      <Button onClick={() => setModalOpen(true)}>add appointment</Button>
      <AppointmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        serviceType={formValues ? 'addFromCalendar' : 'add'}
        clearFormValues={clearForm}
        formValues={formValues}
      />
    </>
  )
}

export default Calendar
