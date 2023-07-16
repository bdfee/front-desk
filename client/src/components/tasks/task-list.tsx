import { useContext, useState } from 'react'
import { Grid, Typography, Button, Paper } from '@mui/material'
import { AlertCtx } from '../../App'
import { useDeleteTaskById, useFetchTasks } from './actions'
import { useQueryClient } from '@tanstack/react-query'
import TaskForm from './task-form'
import Task from './task'

export const TaskList = () => {
  const [editIdxs, setEditIdxs] = useState<number[]>([])
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

  const handleEditIdxs = (index: number, action: string) => {
    if (action === 'add') {
      return setEditIdxs(editIdxs.concat(index))
    }

    if (action === 'remove') {
      return setEditIdxs(editIdxs.filter((idx) => idx !== index))
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>
      {taskList.map((task, index) => (
        <Paper key={task.taskId}>
          {editIdxs.includes(index) ? (
            <TaskForm
              task={task}
              handleEditIdxs={() => handleEditIdxs(index, 'remove')}
            />
          ) : (
            <Task task={task} />
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deleteTaskById(+task.taskId)}
          >
            Delete
          </Button>
          {editIdxs.includes(index) ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleEditIdxs(index, 'remove')}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleEditIdxs(index, 'add')}
            >
              Edit
            </Button>
          )}
        </Paper>
      ))}
    </Grid>
  )
}
