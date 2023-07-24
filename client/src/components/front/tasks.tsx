import { useContext } from 'react'
import { Typography, Divider } from '@mui/material'
import { useFetchTasks } from '../tasks/actions'
import { AlertCtx } from '../../components/context-providers/alert'
import Task from '../tasks/task'
import dayjs from 'dayjs'

const Tasks = () => {
  const alertCtx = useContext(AlertCtx)
  const { data: taskList, status } = useFetchTasks(alertCtx?.setAlertPayload)

  if (status === 'loading' || status === 'error') {
    return <Typography>{status}: tasks</Typography>
  }

  const todaysTaskList = taskList.filter(
    (task) => task.dueDate === dayjs(new Date()).format('YYYY-MM-DD'),
  )

  return (
    <>
      <Typography>todays tasks</Typography>
      <Divider />
      {todaysTaskList.map((task) => (
        <Task key={task.taskId} task={task} />
      ))}
    </>
  )
}

export default Tasks
