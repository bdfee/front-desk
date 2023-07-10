import dayjs, { Dayjs } from 'dayjs'
import { useState, useContext, useEffect, SyntheticEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TextField, Grid, Button, Divider } from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import {
  AppointmentDetail,
  AppointmentInput,
  RBCEventPropsForForm,
  AppointmentFormProps,
} from '../../types'
import { ErrorCtx } from '../../App'
import { validateTextInput } from '../../validations/inputs'
import appointmentService from '../../services/appointment'
import FetchedFormComponents from './fetched-form-components'

const AppointmentForm = ({
  serviceType,
  closeModal,
  formValues,
}: AppointmentFormProps) => {
  const [specialistId, setSpecialistId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [start, setStart] = useState<Dayjs | null>(null)
  const [end, setEnd] = useState<Dayjs | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [description, setDescription] = useState<string>('')

  const errorCtx = useContext(ErrorCtx)
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (formValues) {
      const handleCalendarFormValues = ({
        date,
        start,
        end,
      }: RBCEventPropsForForm) => {
        setDate(() => dayjs(date))
        setStart(() => dayjs(start, 'HH:mm:ss'))
        setEnd(() => dayjs(end, 'HH:mm:ss'))
      }
      handleCalendarFormValues(formValues)
    }
  }, [formValues])

  useEffect(() => {
    if (id) {
      const handleSetFormState = ({
        start,
        end,
        date,
        description,
        patientId,
        type,
        specialistId,
      }: AppointmentDetail) => {
        setStart(() => dayjs(start, 'HH:mm:ss'))
        setEnd(() => dayjs(end, 'HH:mm:ss'))
        setDate(() => dayjs(date))
        setType(type)
        setDescription(description)
        setSpecialistId(specialistId.toString())
        setPatientId(patientId.toString())
      }
      const formData = queryClient.getQueryData<AppointmentDetail>([
        'APPOINTMENT',
        +id,
      ])
      if (formData) handleSetFormState(formData)
    }
  }, [id])

  const { mutate: updateAppointmentById } = useMutation<
    AppointmentDetail,
    Error,
    { appointmentId: number; values: AppointmentInput }
  >({
    mutationFn: ({ appointmentId, values }) =>
      appointmentService.updateById(appointmentId, values),
    onSuccess: (data) => {
      queryClient.setQueryData<AppointmentDetail>(
        ['APPOINTMENT', data.appointmentId],
        data,
      )
      queryClient.setQueryData<AppointmentDetail[]>(
        ['APPOINTMENTS'],
        (oldAppointments = []) =>
          oldAppointments.map((appointment) =>
            appointment.appointmentId === data.appointmentId
              ? data
              : appointment,
          ),
      )
    },
  })

  const { mutate: addAppointment } = useMutation({
    mutationFn: appointmentService.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['APPOINTMENTS'] }),
  })

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

    switch (serviceType) {
      case 'update': {
        if (id) {
          updateAppointmentById({
            appointmentId: +id,
            values: appointmentValues,
          })
        }
        break
      }
      case 'add': {
        addAppointment(appointmentValues)
        break
      }
      case 'addFromCalendar': {
        addAppointment(appointmentValues)
        break
      }
      default: {
        console.log('error with service switch in appointment form')
        return
      }
    }
    setStart(null)
    setEnd(null)
    setDate(null)
    setDescription('')
    setSpecialistId('')
    setPatientId('')
    closeModal()
  }

  console.log(serviceType)

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
      <Divider />
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
            onClick={closeModal}
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
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AppointmentForm
