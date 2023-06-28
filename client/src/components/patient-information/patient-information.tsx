import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentDetail, PatientDetail } from '../../types'

interface InformationListProps {
  patient: PatientDetail
  appointments: AppointmentDetail[]
}

const InformationList = ({ patient, appointments }: InformationListProps) => {
  const history: AppointmentDetail[] = []
  const upcoming: AppointmentDetail[] = []

  appointments.forEach((appointment) => {
    new Date() > new Date(appointment.date)
      ? history.push(appointment)
      : upcoming.push(appointment)
  })

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
