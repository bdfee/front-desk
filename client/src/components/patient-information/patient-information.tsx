import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentDetail, InformationListProps } from '../../types'
import { useFetchAppointmentsByPatientId, useFetchPatientById } from './actions'

const InformationList = ({ patientId }: InformationListProps) => {
  const {
    data: appointmentsByPatientIdData,
    status: appointmentsByPatientIdStatus,
  } = useFetchAppointmentsByPatientId(patientId)

  const { data: patientData, status: patientStatus } =
    useFetchPatientById(patientId)

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

  if (patientStatus === 'error' || appointmentsByPatientIdStatus === 'error') {
    return <div>Error fetching data</div>
  }

  if (
    patientStatus === 'loading' ||
    appointmentsByPatientIdStatus === 'loading'
  ) {
    return <div>Loading...</div>
  }

  const { history, upcoming } = sortAppointments(appointmentsByPatientIdData)

  return (
    <Container>
      <Typography>{patientData.name}</Typography>
      <Box>
        <List>
          <ListItemText primary="gender" secondary={patientData.gender} />
          <ListItemText
            primary="date of birth"
            secondary={patientData.dateOfBirth}
          />
          <ListItemText primary="email" secondary={patientData.email} />
          <ListItemText
            primary="dateOfBirth"
            secondary={patientData.dateOfBirth}
          />
          <ListItemText primary="address" secondary={patientData.address} />
          <ListItemText
            primary="specialist"
            secondary={patientData.specialist.name}
          />
        </List>
        <Typography>Appointment History</Typography>
        <List>
          {history.map((appointment) => {
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
