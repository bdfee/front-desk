import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useFetchAppointmentsByPatientId } from './actions'
import { AlertCtx } from '../../../components/context-providers/alert'
import { useContext } from 'react'
import { sortAppointments } from '../../utils'

interface SelectUpcomingAppointmentByPatientProps {
  patientId: string
  appointmentId: string
  setAppointmentId: Dispatch<SetStateAction<string>>
}

const SelectUpcomingAppointmentsByPatient = ({
  patientId,
  appointmentId,
  setAppointmentId,
}: SelectUpcomingAppointmentByPatientProps) => {
  const alertCtx = useContext(AlertCtx)

  // this should be a diff route props
  const { data: appointmentsData, status } = useFetchAppointmentsByPatientId(
    +patientId,
    alertCtx?.setAlertPayload,
  )

  if (status === 'loading' || status === 'error') {
    return <div>{status}: fetching patient appointments</div>
  }

  const { upcoming } = sortAppointments(appointmentsData)
  console.log(upcoming)
  return (
    <FormControl sx={{ width: 175 }}>
      <InputLabel id="select-appointments" size="small">
        Upcoming Appointments
      </InputLabel>
      <Select
        labelId="select-appointments"
        value={appointmentId}
        size="small"
        onChange={({ target }) => setAppointmentId(target.value)}
        input={<OutlinedInput label="Appointments" />}
      >
        {upcoming.map((appointment) => {
          return (
            <MenuItem
              key={appointment.appointmentId}
              value={appointment.appointmentId}
            >
              {appointment.date} - {appointment.type}
            </MenuItem>
          )
        })}
      </Select>
      {appointmentId && (
        <Button
          style={{
            color: 'blue',
          }}
          size="small"
          onClick={() => setAppointmentId('')}
        >
          clear
        </Button>
      )}
    </FormControl>
  )
}

export default SelectUpcomingAppointmentsByPatient
