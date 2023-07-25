import { useState, useContext, SyntheticEvent, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { TextField, Button, Paper, Grid } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import {
  SelectPatient,
  SelectSpecialist,
  SelectUpcomingAppointment,
  SelectUser,
} from '../fetched-form-components'
import { AlertCtx } from '../../components/context-providers/alert'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateTask, useUpdateTaskById } from './actions'
import { TaskDetail } from '../../types'

interface FormProps {
  handleEditIdxs?: () => void
  task?: TaskDetail
}

const TaskForm = ({ task, handleEditIdxs }: FormProps) => {
  const [taskId, setTaskId] = useState<number>()
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [specialistId, setSpecialistId] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [appointmentId, setAppointmentId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')

  const alertCtx = useContext(AlertCtx)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (task) {
      setTaskId(task.taskId)
      setDescription(task.description)
      setDueDate(dayjs(task.dueDate))
      setSpecialistId(task.specialistId ? '' + task.specialistId : '')
      setAppointmentId(task.appointmentId ? '' + task.appointmentId : '')
      setPatientId(task.patientId ? '' + task.patientId : '')
    }
  }, [])

  const { mutate: addTask } = useCreateTask(
    queryClient,
    alertCtx?.setAlertPayload,
  )

  const { mutate: updateTaskById } = useUpdateTaskById(
    queryClient,
    alertCtx?.setAlertPayload,
  )

  const fieldsFilled = !description || !dueDate || !userId

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault()
    if (dueDate) {
      const taskValues = {
        description,
        userId: +userId,
        dueDate: dueDate.format('YYYY-MM-DD'),
        specialistId: +specialistId || null,
        patientId: +patientId || null,
        appointmentId: +appointmentId || null,
      }

      if (taskId && handleEditIdxs) {
        updateTaskById({ taskId, values: taskValues })
        handleEditIdxs()
      } else addTask(taskValues)

      setDescription('')
      setUserId('')
      setDueDate(null)
      setSpecialistId('')
      setAppointmentId('')
      setPatientId('')
    }
  }

  return (
    <form>
      <Grid container component={Paper} sx={{ marginTop: '10px' }}>
        <Grid item xs={12} sx={{ height: '100px' }}>
          <TextField
            label="Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="due date"
              value={dueDate}
              onChange={(value) => setDueDate(value)}
            />
          </LocalizationProvider>
          <SelectUser userId={userId} setUserId={setUserId} />
        </Grid>
        <Grid container xs={12} sx={{ height: '80px' }}>
          <Grid xs={10}>
            {' '}
            <SelectSpecialist
              specialistId={specialistId}
              setSpecialistId={setSpecialistId}
            />
            <SelectPatient patientId={patientId} setPatientId={setPatientId} />
            {patientId && (
              <SelectUpcomingAppointment
                patientId={patientId}
                appointmentId={appointmentId}
                setAppointmentId={setAppointmentId}
              />
            )}
          </Grid>
          <Grid xs={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={fieldsFilled}
              onClick={submitForm}
            >
              {taskId ? 'Save' : 'Add'} Task
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default TaskForm
