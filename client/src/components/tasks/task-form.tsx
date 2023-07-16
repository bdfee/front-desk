import { useState, useContext, SyntheticEvent, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import {
  TextField,
  Button,
  Grid,
  Paper,
  Container,
  // Collapse,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import SelectPatient from '../appointment-modal/fetched-form-components/select-patient'
import SelectSpecialist from '../appointment-modal/fetched-form-components/select-specialist'
import SelectUpcomingAppointmentsByPatient from '../appointment-modal/fetched-form-components/select-upcoming-appointment-by-patient'
import { AlertCtx } from '../../App'
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
  // add appointments to fetched components
  const [appointmentId, setAppointmentId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')
  const alertCtx = useContext(AlertCtx)
  const queryClient = useQueryClient()
  // const [collapsed, setCollapsed] = useState(false)

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

  const fieldsFilled = !description || !dueDate

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault()
    if (dueDate) {
      const taskValues = {
        description,
        userId: 1,
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
      setDueDate(null)
      setSpecialistId('')
      setAppointmentId('')
      setPatientId('')
    }
  }

  return (
    <form>
      <Grid item xs={12} sm={6}>
        <Container>
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
          <Button
            variant="contained"
            color="primary"
            disabled={fieldsFilled}
            onClick={submitForm}
          >
            {taskId ? 'Save' : 'Add'} Task
          </Button>
        </Container>
        <Paper elevation={1}>
          {/* <Select>
            //assigned to user
          </Select> */}
          <SelectSpecialist
            specialistId={specialistId}
            setSpecialistId={setSpecialistId}
          />
          <SelectPatient patientId={patientId} setPatientId={setPatientId} />
          {patientId && (
            <SelectUpcomingAppointmentsByPatient
              patientId={patientId}
              appointmentId={appointmentId}
              setAppointmentId={setAppointmentId}
            />
          )}
        </Paper>
      </Grid>
    </form>
  )
}

export default TaskForm
