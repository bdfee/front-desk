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

import patientService from '../../services/patients'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const PatientTable = () => {
  const navigate = useNavigate()

  let patients: PatientDetail[]

  const queryClient = useQueryClient()

  const { data: patientsData, status: patientsStatus } = useQuery({
    queryKey: ['PATIENTS'],
    queryFn: patientService.getAll,
  })

  const { mutate: deletePatientById } = useMutation({
    mutationFn: (patientId: number) => patientService.deleteById(patientId),
    onSuccess: (_, patientId) => {
      queryClient.setQueryData<PatientDetail[]>(['PATIENTS'], (oldPatients) => {
        return (oldPatients || []).filter(
          (patient) => patient.patientId !== patientId,
        )
      })
    },
  })

  const navigateToPatient = (patientId: number) => {
    navigate(`/patients/${patientId}`)
  }

  const navigateToPatientEditor = async (patientId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['PATIENT', patientId],
      queryFn: () => patientService.getOneById(patientId),
    })
    navigate(`/patients/${patientId}`, {
      state: { openModalOnLoad: true },
    })
  }

  if (patientsStatus === 'error') {
    return <div>error fetching patients</div>
  }

  if (patientsStatus === 'loading') {
    patients = []
  } else patients = patientsData

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
