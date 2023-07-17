import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { useContext } from 'react'
import { AppointmentListProps } from '../../types'
import { useGetAppointmentById } from './actions'
import { AlertCtx } from '../../components/context-providers/alert'

const InformationList = ({ id }: AppointmentListProps) => {
  const alertCtx = useContext(AlertCtx)
  const { data: appointment, status: appointmentStatus } =
    useGetAppointmentById(id, alertCtx?.setAlertPayload)

  if (appointmentStatus === 'error' || appointmentStatus === 'loading') {
    return <Typography>{appointmentStatus} fetching appointment</Typography>
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
