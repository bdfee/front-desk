import { TextField, Grid, Button, InputLabel } from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

import FetchedFormComponents from './fetched-form-components'

import { SyntheticEvent, useEffect, useState, useContext } from 'react'
import { AppointmentDetail, AppointmentInput } from '../../types'

import { ErrorCtx } from '../../App'
import { validateTextInput } from '../../validations/inputs'
import { AppointmentFormValues } from '../calendar'

type UpdateAppointment = (id: number, values: AppointmentInput) => Promise<void>
type AddAppointment = (values: AppointmentInput) => Promise<void>

interface AppointmentFormProps {
  type: string
  onCancel: () => void
  formValues?: AppointmentFormValues
  clearFormValues?: () => void
  state: AppointmentDetail | AppointmentDetail[] | undefined
  service: UpdateAppointment | AddAppointment | undefined
}

const AppointmentForm = (props: AppointmentFormProps) => {
  const [specialistId, setSpecialistId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')
  const [appointmentId, setAppointmentId] = useState<number | undefined>()

  const [type, setType] = useState<string>('')
  const [start, setStart] = useState<Dayjs | null>(null)
  const [end, setEnd] = useState<Dayjs | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [description, setDescription] = useState<string>('')

  const errorCtx = useContext(ErrorCtx)

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

    if (props.type === 'addWithValues' && props.formValues) {
      const d = dayjs(props.formValues.date)
      const s = dayjs(props.formValues.start, 'HH:mm:ss')
      const e = dayjs(props.formValues.end, 'HH:mm:ss')
      setDate(d)
      setStart(s)
      setEnd(e)
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
        if (props.service) {
          const addAppointment = props.service as AddAppointment
          addAppointment(appointmentValues)
        }
        break
      }
      case 'addWithValues': {
        if (props.service) {
          const addAppointment = props.service as AddAppointment
          addAppointment(appointmentValues)
        }
        break
      }
      default: {
        console.log('error with service switch in appointment form')
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

      <FetchedFormComponents
        patientId={patientId}
        setPatientId={setPatientId}
        specialistId={specialistId}
        setSpecialistId={setSpecialistId}
        type={type}
        setType={setType}
      />
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
