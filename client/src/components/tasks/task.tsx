import { Typography, Chip, Container } from '@mui/material'
import { TaskDetail } from '../../types'
import { useNavigate } from 'react-router-dom'

interface TaskProps {
  task: TaskDetail
}

const Task = ({ task }: TaskProps) => {
  const navigate = useNavigate()

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
      {task.user && (
        <Chip
          label={`User: ${task.user.name}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
        />
      )}
      {task.patient && (
        <Chip
          label={`Patient: ${task.patient.name}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
          onClick={() => navigate('/patients/' + task.patientId)}
        />
      )}
      {task.specialist && (
        <Chip
          label={`Specialist: ${task.specialist.name}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
          onClick={() => navigate('/specialists/' + task.specialistId)}
        />
      )}
      {task.appointmentId && (
        <Chip
          label={`Appointment: ${task.appointmentId}`}
          variant="outlined"
          style={{ marginRight: '8px', marginBottom: '8px' }}
          onClick={() => navigate('/appointments/' + task.appointmentId)}
        />
      )}
    </Container>
  )
}

export default Task
