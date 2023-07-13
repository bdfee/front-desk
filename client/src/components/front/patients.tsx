import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Divider,
  Box,
} from '@mui/material'
import { dayjs } from '../calendar/dayjs'
import { useFetchAppointments } from '../calendar/actions'
import { RBCDefaultProps } from '../calendar/utils'

const Patients = () => {
  // appointments today patients detail
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
      <Typography>todays patients</Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Specialist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments?.map((appointment) => {
            return (
              <TableRow key={appointment.appointmentId}>
                <TableCell>{appointment.patient.name}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>{appointment.specialist.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Patients
