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
import { PatientDetail } from '../../types'
import { formatPhone } from '../../validations/inputs'

interface PatientTableProps {
  patients: PatientDetail[]
  deletePatient: (id: number) => void
}

const PatientTable = ({ patients, deletePatient }: PatientTableProps) => {
  const nav = useNavigate()

  const navigateToPatient = (patientId: number) => {
    nav(`/patients/${patientId}`)
  }

  const navigateToPatientEditor = (patientId: number) => {
    nav(`/patients/${patientId}`, {
      state: { openModalOnLoad: true },
    })
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
            <TableCell>Next Appointment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => {
            return (
              <TableRow key={patient.patientId}>
                <TableCell>
                  <Link
                    onClick={() => navigateToPatient(patient.patientId)}
                    component="button"
                  >
                    <Typography>{patient.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{formatPhone(patient.phone)}</TableCell>
                <TableCell>{patient.specialist.name}</TableCell>
                <TableCell>todo</TableCell>
                <TableCell>
                  <Button
                    onClick={() => navigateToPatientEditor(patient.patientId)}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => deletePatient(+patient.patientId)}>
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
