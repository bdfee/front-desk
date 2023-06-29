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
import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from 'react-query'
import { queryClient } from '../../App'
import patientService from '../../services/patients'

const PatientTable = () => {
  const [patients, setPatients] = useState<PatientDetail[]>([])
  const navigate = useNavigate()

  const { data }: UseQueryResult<PatientDetail[]> = useQuery({
    queryKey: 'GET_PATIENTS',
    queryFn: patientService.getAll,
    onSuccess: (data) => setPatients(data),
  })

  const deletePatient: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => patientService.deleteById(id),
    onSuccess: (_data, id: number) => {
      queryClient.invalidateQueries('GET_PATIENTS')
      setPatients(patients?.filter(({ patientId }) => patientId !== id))
    },
  })

  const handleDelete = (id: number) => deletePatient.mutate(id)

  if (!data) {
    return <div>fetching patients list</div>
  }

  const navigateToPatient = (patientId: number) => {
    navigate(`/patients/${patientId}`)
  }

  const navigateToPatientEditor = (patientId: number) => {
    navigate(`/patients/${patientId}`, {
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
                  <Button onClick={() => handleDelete(+patientId)}>
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
