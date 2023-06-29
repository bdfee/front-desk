import { useState, useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentDetail, PatientDetail } from '../../types'
import patientService from '../../services/patients'
import { ErrorCtx } from '../../App'

interface InformationListProps {
  patientId: number
}

const InformationList = ({ patientId }: InformationListProps) => {
  const [patient, setPatient] = useState<PatientDetail>()
  const [appointments, setAppointments] = useState<AppointmentDetail[]>([])
  const errorCtx = useContext(ErrorCtx)

  useQuery({
    queryKey: [`GET_PATIENT_${patientId}`] as [string],
    queryFn: () => patientService.getOneById(patientId),
    onSuccess: (data) => setPatient(data),
    onError: (error: Error) =>
      errorCtx?.setError('error fetching patient ' + error.message),
  })

  const { data: appointmentData }: UseQueryResult<AppointmentDetail[]> =
    useQuery({
      queryKey: [`GET_APPOINTMENTS_BY_PATIENTS_${patientId}`] as [string],
      queryFn: () => patientService.getAppointmentsByPatient(patientId),
      onSuccess: (data) => setAppointments(data),
      onError: (error: Error) =>
        errorCtx?.setError('error fetching appointments ' + error.message),
    })

  const sortAppointments = (appointments: AppointmentDetail[]) => {
    const history: AppointmentDetail[] = []
    const upcoming: AppointmentDetail[] = []

    appointments.forEach((appointment) => {
      new Date() > new Date(appointment.date)
        ? history.push(appointment)
        : upcoming.push(appointment)
    })

    return { history, upcoming }
  }

  if (!patient) {
    return <div>fetching patient</div>
  }

  const { history, upcoming } = sortAppointments(appointments)

  return (
    <Container>
      <Typography>{patient.name}</Typography>
      <Box>
        <List>
          <ListItemText primary="gender" secondary={patient.gender} />
          <ListItemText
            primary="date of birth"
            secondary={patient.dateOfBirth}
          />
          <ListItemText primary="email" secondary={patient.email} />
          <ListItemText primary="dateOfBirth" secondary={patient.dateOfBirth} />
          <ListItemText primary="address" secondary={patient.address} />
          <ListItemText
            primary="specialist"
            secondary={patient.specialist.name}
          />
        </List>
        <Typography>Appointment History</Typography>
        <List>
          {appointmentData &&
            history.map((appointment) => {
              return (
                <ListItemText
                  key={appointment.appointmentId}
                  primary={appointment.date + ' ' + appointment.specialist.name}
                />
              )
            })}
        </List>
        <Typography>Upcoming Appointments</Typography>
        <List>
          {upcoming.map((appointment) => {
            return (
              <ListItemText
                key={appointment.appointmentId}
                primary={appointment.date + ' ' + appointment.specialist.name}
              />
            )
          })}
        </List>
      </Box>
    </Container>
  )
}

export default InformationList
