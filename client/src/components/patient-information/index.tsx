import { useParams } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { useFetchAppointmentsByPatientId, useFetchPatientById } from './actions'
import AppointmentEntries from './appointment-entries'
import PatientDetails from './patient-details'
import PatientHeader from './patient-header'

const PatientInformation = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>Error in ID param</div>
  }

  const {
    data: appointmentsByPatientIdData,
    status: appointmentsByPatientIdStatus,
  } = useFetchAppointmentsByPatientId(+id)

  const { data: patientData, status: patientStatus } = useFetchPatientById(+id)

  if (patientStatus === 'error' || patientStatus === 'loading') {
    return <Typography>{patientStatus}: patients</Typography>
  }

  if (
    appointmentsByPatientIdStatus === 'error' ||
    appointmentsByPatientIdStatus === 'loading'
  ) {
    return (
      <Typography>
        {appointmentsByPatientIdStatus}: patient appointments
      </Typography>
    )
  }

  const { name, specialist } = patientData
  return (
    <Container>
      <PatientHeader name={name} specialistName={'' + specialist.name} />
      <PatientDetails patient={patientData} />
      <AppointmentEntries appointments={appointmentsByPatientIdData} />
    </Container>
  )
}

export default PatientInformation
