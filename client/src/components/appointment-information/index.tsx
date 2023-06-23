import InformationList from './information-list'
import AppointmentModal from '../appointment-modal'
import { useState, useEffect } from 'react'
import { AppointmentDetail } from '../../types'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import appointmentService from '../../services/appointment'

const AppointmentInformation = () => {
  const [appointment, setAppointment] = useState<AppointmentDetail>()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        if (id) {
          const appointment = await appointmentService.getOneById(+id)
          setAppointment(appointment)
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching appointment')
        }
      }
    }
    void fetchAppointment()
  }, [id])

  if (!appointment) {
    return <div>fetching patient info</div>
  }

  return (
    <>
      <InformationList appointment={appointment} />
      <AppointmentModal
        type="edit"
        state={appointment}
        stateSetter={setAppointment}
      />
    </>
  )
}

export default AppointmentInformation