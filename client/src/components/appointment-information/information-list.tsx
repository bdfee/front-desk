import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentDetail, AppointmentListProps } from '../../types'
import { useQuery } from '@tanstack/react-query'
import appointmentService from '../../services/appointment'

const InformationList = ({ id }: AppointmentListProps) => {
  const { data: appointment, status: appointmentStatus } =
    useQuery<AppointmentDetail>({
      queryKey: ['APPOINTMENT', id],
      queryFn: () => appointmentService.getOneById(id),
    })

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
