import { Grid, Typography, Button, Paper, Chip } from '@mui/material'
import { TaskDetail } from '../../types'

export const TaskList = () => {
  const tasks: TaskDetail[] = [
    {
      taskId: 1,
      dueDate: '2020-02-02',
      patient: {
        name: 'test patient',
      },
      appointmentId: 1,
      user: {
        username: 'test-username',
        userId: 1,
        name: 'user name',
      },
      specialist: {
        name: 'test specialist',
      },
      description: 'test',
    },
  ]

  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>
      {tasks.map((task, index) => (
        <Paper
          key={index}
          elevation={2}
          style={{ padding: '16px', marginBottom: '16px' }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Description: {task.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Due Date: {task.dueDate}
          </Typography>
          {task.patient && (
            <Chip
              key={index}
              label={`Patient: ${task.patient.name}`}
              variant="outlined"
              style={{ marginRight: '8px', marginBottom: '8px' }}
            />
          )}
          {task.specialist && (
            <Chip
              key={index}
              label={`Specialist: ${task.specialist.name}`}
              variant="outlined"
              style={{ marginRight: '8px', marginBottom: '8px' }}
            />
          )}
          {task.appointmentId && (
            <Chip
              key={index}
              label={`Appointment: ${task.appointmentId}`}
              variant="outlined"
              style={{ marginRight: '8px', marginBottom: '8px' }}
            />
          )}
          <Button
            variant="outlined"
            color="secondary"
            // onClick={() => handleDeleteTask(index)}
          >
            Delete
          </Button>
        </Paper>
      ))}
    </Grid>
  )
}
