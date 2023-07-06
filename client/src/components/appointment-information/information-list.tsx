import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { useState } from 'react'
import { AppointmentDetail } from '../../types'
import { useFetchAppointmentById } from '../appointmentActions'

interface AppointmentListProps {
  id: number
}

const InformationList = ({ id }: AppointmentListProps) => {
  const [appointment, setAppointment] = useState<AppointmentDetail>()

  const { error } = useFetchAppointmentById(setAppointment, +id)

  if (error) {
    return <div>error fetching appointment</div>
  }

  if (!appointment) {
    return <div>fetching appointment</div>
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
