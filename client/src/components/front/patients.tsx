import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Divider,
  Box,
  Collapse,
  Link,
} from '@mui/material'
import { useState } from 'react'
import { dayjs } from '../calendar/dayjs'
import { useFetchAppointments } from '../calendar/actions'
import { RBCDefaultProps } from '../calendar/utils'
import { useNavigate } from 'react-router-dom'
import Expand from './expand'

const Patients = () => {
  // appointments today patients detail
  const [collapse, setCollapse] = useState(false)
  const navigate = useNavigate()
  const { data: appointmentsData, status: appointmentsStatus } =
    useFetchAppointments()

  if (appointmentsStatus === 'error' || appointmentsStatus === 'loading') {
    return <div>{appointmentsStatus}: fetching appointments</div>
  }
  const appointments = appointmentsData.filter(
    (appointment) =>
      appointment.date ===
      dayjs(RBCDefaultProps.defaultDate).format('YYYY-MM-DD'),
  )

  return (
    <Box>
      <Typography
        sx={{ cursor: 'pointer', paddingTop: '31px' }}
        variant="button"
        onClick={() => setCollapse(!collapse)}
      >
        Patients arriving today
        <Expand collapse={collapse} />
      </Typography>
      <Divider />
      <Collapse in={collapse}>
        <Table>
          <TableHead sx={{ position: 'sticky' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Specialist</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: 100 }}>
            {appointments?.map(
              ({ appointmentId, patient, type, specialist, patientId }) => {
                return (
                  <TableRow key={appointmentId}>
                    <TableCell>
                      <Link
                        onClick={() => navigate(`/patients/${patientId}`)}
                        variant="button"
                      >
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{specialist.name}</TableCell>
                  </TableRow>
                )
              },
            )}
          </TableBody>
        </Table>
      </Collapse>
    </Box>
  )
}

export default Patients
