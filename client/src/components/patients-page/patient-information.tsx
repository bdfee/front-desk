import { useContext } from 'react'
import {
  Container,
  Typography,
  Box,
  List,
  ListItemText,
  Button,
} from '@mui/material'
import { PatientFormActionCtx } from './info-index'

const PatientInformation = () => {
  const context = useContext(PatientFormActionCtx)
  return (
    <>
      <Container>
        <Typography>{context?.patient?.name}</Typography>
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Box>
          <List>
            <ListItemText
              primary="gender"
              secondary={context?.patient?.gender}
            />
            <ListItemText
              primary="date of birth"
              secondary={context?.patient?.dateOfBirth}
            />
            <ListItemText primary="email" secondary={context?.patient?.email} />
            <ListItemText
              primary="dateOfBirth"
              secondary={context?.patient?.dateOfBirth}
            />
            <ListItemText
              primary="address"
              secondary={context?.patient?.address}
            />
            <ListItemText
              primary="specialist"
              secondary={context?.patient?.specialistId}
            />
          </List>
        </Box>
      </Container>
    </>
  )
}

export default PatientInformation
