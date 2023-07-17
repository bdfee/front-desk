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
import { useContext } from 'react'
import { formatPhone } from '../../validations/inputs'
import { useQueryClient } from '@tanstack/react-query'
import {
  useFetchPatients,
  useDeletePatientById,
  usePrefetchPatientById,
} from './actions'
import { AlertCtx } from '../../components/context-providers/alert'

const PatientTable = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const alertCtx = useContext(AlertCtx)

  const { data: patientsData, status: patientsStatus } = useFetchPatients(
    alertCtx?.setAlertPayload,
  )

  const { mutate: deletePatientById } = useDeletePatientById(
    queryClient,
    alertCtx?.setAlertPayload,
  )

  const navigateToPatient = (patientId: number) => {
    navigate(`/patients/${patientId}`)
  }

  const navigateToPatientEditor = async (patientId: number) => {
    await usePrefetchPatientById(queryClient, patientId)
    navigate(`/patients/${patientId}`, {
      state: { openModalOnLoad: true },
    })
  }

  if (patientsStatus === 'error' || patientsStatus === 'loading') {
    return <Typography>{patientsStatus}: fetching patients</Typography>
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
          {patientsData.map(({ patientId, name, email, phone, specialist }) => {
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
                  <Button onClick={() => deletePatientById(+patientId)}>
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
