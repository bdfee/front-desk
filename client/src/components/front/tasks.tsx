import { useContext } from 'react'
import {
  List,
  ListItemText,
  Typography,
  Divider,
  Paper,
  Chip,
} from '@mui/material'
import { useFetchTasks } from '../tasks/actions'
import { AlertCtx } from '../../components/context-providers/alert'
// import { TaskList } from '../tasks/task-list'
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

      <List>
        {todaysTaskList.map((task) => (
          <Paper key={task.taskId}>
            <ListItemText
              primary={task.description}
              secondary={'task description'}
            />
            {task.patient && (
              <Chip
                label={`Patient: ${task.patient.name}`}
                variant="outlined"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
            )}
            {task.specialist && (
              <Chip
                label={`Specialist: ${task.specialist.name}`}
                variant="outlined"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
            )}
            {task.appointmentId && (
              <Chip
                label={`Appointment: ${task.appointmentId}`}
                variant="outlined"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
            )}
          </Paper>
        ))}
      </List>
    </>
  )
}

export default Tasks
