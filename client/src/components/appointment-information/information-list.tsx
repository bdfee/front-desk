import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentListProps } from '../../types'
import { useGetAppointmentById } from './actions'

const InformationList = ({ id }: AppointmentListProps) => {
  const { data: appointment, status: appointmentStatus } =
    useGetAppointmentById(id)

  if (appointmentStatus === 'error') {
    return <div>error fetching appointment</div>
  }

  if (appointmentStatus === 'loading') {
    return <div>loading appointment</div>
  }

  return (
    <Container>
      <Typography>{appointment.patient.name}</Typography>
      <Typography>{appointment.specialist.name}</Typography>
      <Typography>{appointment.type}</Typography>
      <Box>
        <List>
          <ListItemText
            primary="Scheduled for:"
            secondary={`${appointment.date} from ${appointment.start} to ${appointment.end}`}
          />
        </List>
      </Box>
    </Container>
  )
}

export default InformationList
