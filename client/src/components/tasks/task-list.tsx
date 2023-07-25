import { useContext, useState, Dispatch, SetStateAction } from 'react'
import { Grid, Typography, Button, Paper } from '@mui/material'
import { AlertCtx } from '../../components/context-providers/alert'

import { useDeleteTaskById, useFetchTasks } from './actions'
import { useQueryClient } from '@tanstack/react-query'
import TaskForm from './task-form'
import Task from './task'

export const TaskList = ({
  setCollapsed,
  collapsed,
}: {
  setCollapsed: Dispatch<SetStateAction<boolean>>
  collapsed: boolean
}) => {
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
    if (action === 'edit') {
      return setEditIdxs(editIdxs.concat(index))
    }

    if (action === 'remove') {
      return setEditIdxs(editIdxs.filter((idx) => idx !== index))
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h5" gutterBottom>
            Task List
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? 'show' : 'hide'} task form
          </Button>
        </Grid>
      </Grid>

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
            sx={{
              '&:hover': {
                color: 'red',
              },
            }}
            onClick={() => deleteTaskById(+task.taskId)}
          >
            Delete
          </Button>
          {editIdxs.includes(index) ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditIdxs(index, 'remove')}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditIdxs(index, 'edit')}
            >
              Edit
            </Button>
          )}
        </Paper>
      ))}
    </Grid>
  )
}
