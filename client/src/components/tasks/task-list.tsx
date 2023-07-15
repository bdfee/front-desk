import { useContext } from 'react'
import { Grid, Typography, Button, Paper, Chip } from '@mui/material'
import { AlertCtx } from '../../App'
import { useDeleteTaskById, useFetchTasks } from './actions'
import { useQueryClient } from '@tanstack/react-query'

export const TaskList = () => {
  const queryClient = useQueryClient()
  const alertCtx = useContext(AlertCtx)

  const { data: taskList, status: taskListStatus } = useFetchTasks(
    alertCtx?.setAlertPayload,
  )

  const { mutate: deleteTaskById } = useDeleteTaskById(
    queryClient,
    alertCtx?.setAlertPayload,
  )

  if (taskListStatus === 'loading' || taskListStatus === 'error') {
    return <Typography>{taskListStatus}: tasks</Typography>
  }

  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>
      {taskList.map(
        ({
          taskId,
          description,
          dueDate,
          patient,
          specialist,
          appointmentId,
        }) => (
          <Paper
            key={taskId}
            elevation={2}
            style={{ padding: '16px', marginBottom: '16px' }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Description: {description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Due Date: {dueDate}
            </Typography>
            {patient && (
              <Chip
                label={`Patient: ${patient.name}`}
                variant="outlined"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
            )}
            {specialist && (
              <Chip
                label={`Specialist: ${specialist.name}`}
                variant="outlined"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
            )}
            {appointmentId && (
              <Chip
                label={`Appointment: ${appointmentId}`}
                variant="outlined"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteTaskById(+taskId)}
            >
              Delete
            </Button>
          </Paper>
        ),
      )}
    </Grid>
  )
}
