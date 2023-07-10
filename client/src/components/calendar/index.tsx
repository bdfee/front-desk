import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import RBC from './rbc'
import { RBCEventPropsForForm } from '../../types'

import AppointmentModal from '../appointment-modal'

const Calendar = () => {
  const [formValues, setFormValues] = useState<
    RBCEventPropsForForm | undefined
  >()
  const [modalOpen, setModalOpen] = useState(false)

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
