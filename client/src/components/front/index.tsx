import {
  Container,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  List,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material'
import { Calendar as ReactBigCalendar } from 'react-big-calendar'
import {
  RBCDefaultProps,
  formatEvents,
  eventPropGetter,
} from '../calendar/utils'
import { useFetchAppointments } from '../calendar/actions'

const RBCDay = () => {
  const { data: appointmentsData, status: appointmentsStatus } =
    useFetchAppointments()

  if (appointmentsStatus === 'error' || appointmentsStatus === 'loading') {
    return <div>{appointmentsStatus}: fetching appointments</div>
  }

  const { defaultDate, localizer, min, max } = RBCDefaultProps
  const events = formatEvents(appointmentsData)
  if (events) {
    return (
      <div style={{ height: '600px' }}>
        <ReactBigCalendar
          defaultDate={defaultDate}
          defaultView="day"
          localizer={localizer}
          min={min}
          max={max}
          views={{ day: true }}
          events={events}
          startAccessor="start"
          selectable
          endAccessor="end"
          step={60}
          eventPropGetter={eventPropGetter}
        />
      </div>
    )
  } else return null
}

const Patients = () => {
  return (
    <>
      <Typography>todays patients</Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Specialist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>patient name</TableCell>
            <TableCell>appointment type</TableCell>
            <TableCell>specialist</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

const Tasks = () => {
  return (
    <>
      <Typography>todays tasks</Typography>
      <Divider />
      <List>
        <ListItemText primary="task title" secondary={'task description'} />
      </List>
    </>
  )
}

export const Front = () => {
  return (
    <Container>
      <Grid container spacing={2} alignItems="stretch" justifyContent="center">
        <Grid item xs={6} sx={{ paddingLeft: 0 }}>
          <Grid item xs={12} sx={{ height: '40%' }}>
            <Patients />
          </Grid>
          <Grid item xs={12}>
            <Tasks />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <RBCDay />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Front
