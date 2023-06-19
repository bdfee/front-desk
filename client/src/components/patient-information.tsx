import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { PatientDetail } from '../types'
import patientService from '../services/patients'

const PatientInformation = () => {
  const [patient, setPatient] = useState<PatientDetail>()
  const { id } = useParams()

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getOneById(+id)
          setPatient(patient)
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patient')
        }
      }
    }
    void fetchPatient()
  }, [])

  if (!patient) {
    return <div>fetching patient information</div>
  }

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
      </Box>
    </Container>
  )
}

export default PatientInformation
