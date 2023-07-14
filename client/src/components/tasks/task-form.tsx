import { useState } from 'react'
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Typography, TextField, Button, Grid, Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import { TaskDetail } from '../../types'
import SelectPatient from '../appointment-modal/fetched-form-components/select-patient'
import SelectSpecialist from '../appointment-modal/fetched-form-components/select-specialist'

const TaskForm = () => {
  // const [tasks, setTasks] = useState<TaskDetail[]>([])
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [specialistId, setSpecialistId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')

  const handleAddTask = () => {
    const newTask = {
      userId: 1,
      description,
      dueDate,
      specialistId,
      patientId,
    }
    // setTasks([...tasks, newTask])
  }

  const handleDeleteTask = () => {
    // const updatedTasks = [...tasks]
    // updatedTasks.splice(index, 1)
    // setTasks(updatedTasks)
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
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Paper>
      </Grid>
    </form>
  )
}

export default TaskForm
