import { useState, useContext, SyntheticEvent } from 'react'
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Typography, TextField, Button, Grid, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import SelectPatient from '../appointment-modal/fetched-form-components/select-patient'
import SelectSpecialist from '../appointment-modal/fetched-form-components/select-specialist'
import { AlertCtx } from '../../App'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateTask } from './actions'

const TaskForm = () => {
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [specialistId, setSpecialistId] = useState<string>('')
  // add appointments to fetched components
  const [appointmentId, setAppointmentId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')
  const alertCtx = useContext(AlertCtx)
  const queryClient = useQueryClient()

  const { mutate: addTask } = useCreateTask(
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
      console.log(taskValues)
      addTask(taskValues)
      setDescription('')
      setDueDate(null)
      setSpecialistId('')
      setAppointmentId('')
      setPatientId('')
    }
  }

  return (
    <form>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={2} style={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Add Task
          </Typography>
          <TextField
            label="Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            fullWidth
            margin="normal"
          />
          <SelectPatient patientId={patientId} setPatientId={setPatientId} />
          <SelectSpecialist
            specialistId={specialistId}
            setSpecialistId={setSpecialistId}
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
            startIcon={<>+</>}
            disabled={fieldsFilled}
            onClick={submitForm}
          >
            Add Task
          </Button>
        </Paper>
      </Grid>
    </form>
  )
}

export default TaskForm
