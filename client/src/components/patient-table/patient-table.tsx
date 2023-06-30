import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PatientDetail } from '../../types'
import { formatPhone } from '../../validations/inputs'

import { useDeletePatientById, useFetchPatients } from '../patientActions'

const PatientTable = () => {
  const [patients, setPatients] = useState<PatientDetail[]>([])
  const navigate = useNavigate()

  const { error: fetchPatientsError } = useFetchPatients(setPatients)

  const deletePatient = useDeletePatientById(setPatients, patients)

  const navigateToPatient = (patientId: number) => {
    navigate(`/patients/${patientId}`)
  }

  const navigateToPatientEditor = (patientId: number) => {
    navigate(`/patients/${patientId}`, {
      state: { openModalOnLoad: true },
    })
  }

  if (fetchPatientsError) {
    console.log(fetchPatientsError.message)
  }

  if (deletePatient.isError) {
    console.log(deletePatient.error.message)
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h3">Patients</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Specialist</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(({ patientId, name, email, phone, specialist }) => {
            return (
              <TableRow key={patientId}>
                <TableCell>
                  <Link
                    onClick={() => navigateToPatient(patientId)}
                    component="button"
                  >
                    <Typography>{name}</Typography>
                  </Link>
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{formatPhone(phone)}</TableCell>
                <TableCell>{specialist.name}</TableCell>

                <TableCell>
                  <Button onClick={() => navigateToPatientEditor(patientId)}>
                    Edit
                  </Button>
                  <Button onClick={() => deletePatient.mutate(+patientId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PatientTable
