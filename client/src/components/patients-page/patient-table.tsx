import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { PatientDetail, PatientInput } from '../../types'
import { formatPhone } from '../../validations/inputs'

interface PatientListProps {
  patientList: PatientDetail[]
  updatePatient: (id: number, object: PatientInput) => void
  deletePatient: (id: number) => void
}

const PatientTable = (props: PatientListProps) => {
  console.log(props.patientList)
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
          </TableRow>
        </TableHead>
        <TableBody>
          {props.patientList.map((patient) => {
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
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatientTable
