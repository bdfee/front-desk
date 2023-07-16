import { Typography, Chip, Container } from '@mui/material'
import { TaskDetail } from '../../types'

interface TaskProps {
  task: TaskDetail
}

const Task = ({ task }: TaskProps) => {
  console.log(task)
  return (
    <Container
      key={task.taskId}
      style={{ padding: '16px', marginBottom: '16px' }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Description: {task.description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Due Date: {task.dueDate}
      </Typography>
      {task.patient !== null && (
        <Chip
          label={`Patient: ${task.patient.name}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
        />
      )}
      {task.specialist !== null && (
        <Chip
          label={`Specialist: ${task.specialist.name}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
        />
      )}
      {task.appointmentId !== null && (
        <Chip
          label={`Appointment: ${task.appointmentId}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
        />
      )}
    </Container>
  )
}

export default Task
