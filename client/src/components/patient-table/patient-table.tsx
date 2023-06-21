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
} from '@mui/material'
import { Link } from 'react-router-dom'
import { PatientDetail } from '../../types'
import { formatPhone } from '../../validations/inputs'

interface PatientTableProps {
  patients: PatientDetail[]
}

const PatientTable = ({ patients }: PatientTableProps) => (
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
                <Link to={`/patients/${patient.patientId}`}>
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{formatPhone(patient.phone)}</TableCell>
              <TableCell>{patient.specialist.name}</TableCell>
              <TableCell>todo</TableCell>
              <TableCell>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </TableContainer>
)

export default PatientTable
