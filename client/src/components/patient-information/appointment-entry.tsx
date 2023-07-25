import { ListItemText } from '@mui/material'
import { AppointmentDetail } from '../../types'

const AppointmentEntry = ({
  appointment: {
    date,
    type,
    specialist: { name },
    description,
  },
}: {
  appointment: AppointmentDetail
}) => (
  <ListItemText
    primary={`${date} - ${type} - ${name}`}
    secondary={description}
  />
)

export default AppointmentEntry
