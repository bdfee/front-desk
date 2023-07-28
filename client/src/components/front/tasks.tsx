import { useContext, useState } from 'react'
import { Typography, Divider, Paper, Box, Collapse } from '@mui/material'
import { useFetchUserTasksById } from '../tasks/actions'
import { AlertCtx } from '../../components/context-providers/alert'
import { getSecureLocalStorageId } from '../user-admin/actions'
import Expand from './expand'
import Task from '../tasks/task'
import dayjs from 'dayjs'

const Tasks = () => {
  const [collapse, setCollapse] = useState(false)
  const alertCtx = useContext(AlertCtx)
  const userId = getSecureLocalStorageId()

  if (!userId) {
    return (
      <Typography>
        Authentication error, please log out and try again
      </Typography>
    )
  }

  const { data: taskList, status } = useFetchUserTasksById(
    userId,
    alertCtx?.setAlertPayload,
  )

  if (status === 'loading' || status === 'error') {
    return <Typography>{status}: tasks</Typography>
  }

  const todaysTaskList = taskList.filter(
    (task) => task.dueDate === dayjs(new Date()).format('YYYY-MM-DD'),
  )

  return (
    <Box>
      <Typography
        sx={{ cursor: 'pointer' }}
        variant="button"
        onClick={() => setCollapse(!collapse)}
      >
        My tasks
        <Expand collapse={collapse} />
      </Typography>
      <Divider />
      <Collapse in={collapse}>
        {todaysTaskList.map((task) => (
          <Box key={task.taskId} component={Paper}>
            <Task task={task} />
          </Box>
        ))}
      </Collapse>
    </Box>
  )
}

export default Tasks
