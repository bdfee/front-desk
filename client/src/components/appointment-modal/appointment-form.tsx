import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import specialistService from '../../services/specialist'
import patientService from '../../services/patients'

import { SyntheticEvent, useEffect, useState, useContext } from 'react'
import {
  AppointmentDetail,
  AppointmentInput,
  Patient,
  Specialist,
} from '../../types'

import { ErrorCtx } from '../../App'
import { validateTextInput } from '../../validations/inputs'

type UpdateAppointment = (id: number, values: AppointmentInput) => Promise<void>
type AddAppointment = (values: AppointmentInput) => Promise<void>

interface AppointmentFormProps {
  type: string
  onCancel: () => void
  state: AppointmentDetail | AppointmentDetail[] | undefined
  service: UpdateAppointment | AddAppointment | undefined
}

const AppointmentForm = (props: AppointmentFormProps) => {
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [patients, setPatients] = useState<Patient[]>([])

  const [specialistId, setSpecialistId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')
  const [appointmentId, setAppointmentId] = useState<number | undefined>()

  const [type, setType] = useState<string>('')
  const [start, setStart] = useState<Dayjs | null>(null)
  const [end, setEnd] = useState<Dayjs | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [description, setDescription] = useState<string>('')

  const errorCtx = useContext(ErrorCtx)

  // improve this fetch
  useEffect(() => {
    const fetchSpecialists = async () => {
      const specialists = await specialistService.getAll()
      setSpecialists(specialists)
    }
    fetchSpecialists()

    const fetchPatients = async () => {
      const patients = await patientService.getAll()
      setPatients(patients)
    }
    fetchPatients()
  }, [])

  useEffect(() => {
    if (props.type === 'edit') {
      const {
        appointmentId,
        start,
        end,
        date,
        description,
        patientId,
        type,
        specialistId,
      } = props.state as AppointmentDetail
      const d = dayjs(date)
      const s = dayjs(start, 'HH:mm:ss')
      const e = dayjs(end, 'HH:mm:ss')
      setAppointmentId(appointmentId)
      setStart(s)
      setEnd(e)
      setDate(d)
      setType(type)
      setDescription(description)
      setSpecialistId(specialistId.toString())
      setPatientId(patientId.toString())
    }
  }, [])

  const fieldsFilled =
    !start ||
    !end ||
    !date ||
    !type.trim() ||
    !description.trim() ||
    !specialistId ||
    !patientId

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!date || !start || !end) {
      errorCtx?.setError('please enter scheduling details')
      return
    }

    if (!validateTextInput(description)) {
      errorCtx?.setError('please enter a text description')
      setDescription('')
      return
    }
    const appointmentValues = {
      start: start.format('HH:mm:ss'),
      end: end.format('HH:mm:ss'),
      date: date.format('YYYY-MM-DD'),
      type,
      description,
      specialistId: +specialistId,
      patientId: +patientId,
    }
    switch (props.type) {
      case 'edit': {
        if (props.service && appointmentId) {
          const updateAppointment = props.service as UpdateAppointment
          updateAppointment(appointmentId, appointmentValues)
        }
        break
      }
      case 'add': {
        if (props.service && date) {
          const addAppointment = props.service as AddAppointment
          addAppointment(appointmentValues)
        }
        break
      }
      default: {
        console.log('error with service switch in patient form')
        return
      }
    }
    setAppointmentId(undefined)
    setStart(null)
    setEnd(null)
    setDate(null)
    setDescription('')
    setSpecialistId('')
    setPatientId('')
  }

  return (
    <form onSubmit={submitForm}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="appointment date"
          value={date}
          onChange={(value) => setDate(value)}
        />
        <TimeField
          label="start time"
          value={start}
          onChange={(value) => setStart(value)}
        />
        <TimeField
          label="end time"
          value={end}
          onChange={(value) => setEnd(value)}
        />
      </LocalizationProvider>

      <TextField
        label="description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel id="type">Appointment type</InputLabel>
      <Select
        labelId="type"
        value={type}
        onChange={({ target }) => setType(target.value)}
      >
        <MenuItem value="intake">Intake</MenuItem>
        <MenuItem value="physicalTherapy">Physical Therapy</MenuItem>
        <MenuItem value="nutrition">Nutrition</MenuItem>
      </Select>
      {!specialists.length ? (
        <div>fetching specialists</div>
      ) : (
        <>
          <InputLabel id="specialist">Assign Specialist</InputLabel>
          <Select
            labelId="specialist"
            value={specialistId}
            onChange={({ target }) => setSpecialistId(target.value)}
          >
            {specialists?.map((specialist) => {
              return (
                <MenuItem
                  key={specialist.specialistId}
                  value={specialist.specialistId.toString()}
                >
                  {specialist.name}
                </MenuItem>
              )
            })}
          </Select>
        </>
      )}
      {!patients.length ? (
        <div>fetching patients</div>
      ) : (
        <>
          <InputLabel id="patients">Assign Patient</InputLabel>
          <Select
            labelId="patient"
            value={patientId}
            onChange={({ target }) => setPatientId(target.value)}
          >
            {patients?.map((patient) => {
              return (
                <MenuItem
                  key={patient.patientId}
                  value={patient.patientId.toString()}
                >
                  {patient.name}
                </MenuItem>
              )
            })}
          </Select>
        </>
      )}
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: 'right' }}
            type="button"
            onClick={props.onCancel}
            aria-label="Cancel button"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: 'right',
            }}
            type="submit"
            variant="contained"
            aria-label="Add button"
            disabled={fieldsFilled}
          >
            {props.type}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AppointmentForm
