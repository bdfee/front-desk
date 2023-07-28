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
      <Grid item xs={9}>
        <Box>
          <Typography variant="subtitle1">
            <strong>Description:</strong> {task.description}
          </Typography>
          <Typography>
            <strong>Assigned to:</strong> {task.user?.name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Due Date:</strong> {task.dueDate}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={3} sx={{ marginTop: '5px' }}>
        {task.patient && (
          <Chip
            label={task.patient.name}
            variant="outlined"
            style={{ marginRight: '8px', marginBottom: '8px' }}
            onClick={() => navigate('/patients/' + task.patient?.patientId)}
          />
        )}
        {task.specialist && (
          <Chip
            label={task.specialist.name}
            variant="outlined"
            style={{ marginRight: '8px', marginBottom: '8px' }}
            onClick={() =>
              navigate('/specialists/' + task.specialist?.specialistId)
            }
          />
        )}
        {task.appointment && (
          <Chip
            label={task.appointment?.date}
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
