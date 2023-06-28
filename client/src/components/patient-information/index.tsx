import InformationList from './patient-information'
import PatientModal from '../patient-modal'
import { useState, useEffect } from 'react'
import { AppointmentDetail, PatientDetail } from '../../types'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import patientService from '../../services/patients'

const PatientInformation = () => {
  const [patient, setPatient] = useState<PatientDetail>()
  const [appointments, setAppointments] = useState<AppointmentDetail[]>([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getOneById(+id)
          const appointments = await patientService.getAppointmentsByPatient(
            patient.patientId,
          )
          setPatient(patient)
          setAppointments(appointments)
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patient')
        }
      }
    }
    void fetchPatient()
  }, [])

  if (!patient) {
    return <div>fetching patient info</div>
  }

  if (!appointments) {
    return <div>fetching appointments info</div>
  }
  return (
    <>
      <InformationList patient={patient} appointments={appointments} />
      <PatientModal type="update" state={patient} stateSetter={setPatient} />
    </>
  )
}

export default PatientInformation
