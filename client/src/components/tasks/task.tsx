import { Typography, Chip, Grid, Box } from '@mui/material'
import { TaskDetail } from '../../types'
import { useNavigate } from 'react-router-dom'

interface TaskProps {
  task: TaskDetail
}

const Task = ({ task }: TaskProps) => {
  const navigate = useNavigate()
  return (
    <Grid container key={task.taskId}>
      <Grid xs={6}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Description: {task.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Due Date: {task.dueDate}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={6}>
        {task.user && (
          <Chip
            label={`User: ${task.user?.name}`}
            variant="outlined"
            style={{ marginRight: '8px', marginBottom: '8px' }}
            onClick={() => navigate('/users/' + task.user?.userId)}
          />
        )}
        {task.patient && (
          <Chip
            label={`Patient: ${task.patient.name}`}
            variant="outlined"
            style={{ marginRight: '8px', marginBottom: '8px' }}
            onClick={() => navigate('/patients/' + task.patient?.patientId)}
          />
        )}
        {task.specialist && (
          <Chip
            label={`Specialist: ${task.specialist.name}`}
            variant="outlined"
            style={{ marginRight: '8px', marginBottom: '8px' }}
            onClick={() =>
              navigate('/specialists/' + task.specialist?.specialistId)
            }
          />
        )}
        {task.appointment && (
          <Chip
            label={`Appointment: ${task.appointment?.date}`}
            variant="outlined"
            style={{ marginRight: '8px', marginBottom: '8px' }}
            onClick={() =>
              navigate('/calendar/' + task.appointment?.appointmentId)
            }
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Task
