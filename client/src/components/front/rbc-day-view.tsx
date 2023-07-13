import { Calendar as ReactBigCalendar } from 'react-big-calendar'
import {
  RBCDefaultProps,
  formatEvents,
  eventPropGetter,
} from '../calendar/utils'
import { useFetchAppointments } from '../calendar/actions'

const RBCDayView = () => {
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

export default RBCDayView
