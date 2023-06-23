import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentDetail } from '../../types'

interface AppointmentListProps {
  appointment: AppointmentDetail
}

const InformationList = ({ appointment }: AppointmentListProps) => {
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
