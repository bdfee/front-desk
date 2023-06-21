import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { PatientDetail } from '../../types'

interface InformationListProps {
  patient: PatientDetail
}

const InformationList = ({ patient }: InformationListProps) => {
  return (
    <Container>
      <Typography>{patient.name}</Typography>
      <Box>
        <List>
          <ListItemText primary="gender" secondary={patient.gender} />
          <ListItemText
            primary="date of birth"
            secondary={patient?.dateOfBirth}
          />
          <ListItemText primary="email" secondary={patient?.email} />
          <ListItemText primary="dateOfBirth" secondary={patient.dateOfBirth} />
          <ListItemText primary="address" secondary={patient.address} />
          <ListItemText
            primary="specialist"
            secondary={patient.specialist.name}
          />
        </List>
      </Box>
    </Container>
  )
}

export default InformationList
