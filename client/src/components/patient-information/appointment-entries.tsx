import { Grid, Typography, List } from '@mui/material'
import AppointmentEntry from './appointment-entry'
import { sortAppointments } from '../utils'
import { AppointmentDetail } from '../../types'

const AppointmentEntries = ({
  appointments,
}: {
  appointments: AppointmentDetail[]
}) => {
  const { history, upcoming } = sortAppointments(appointments)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Appointment History</Typography>
        <List>
          {history.map((appointment) => (
            <AppointmentEntry
              key={appointment.appointmentId}
              appointment={appointment}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Upcoming Appointments</Typography>
        <List>
          {upcoming.map((appointment) => (
            <AppointmentEntry
              key={appointment.appointmentId}
              appointment={appointment}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default AppointmentEntries
