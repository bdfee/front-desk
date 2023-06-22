import dayjs, { Dayjs } from 'dayjs'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface EventProps {
  title: string
  start: Dayjs
  end: Dayjs
}

const events = [
  {
    appointmentId: 5,
    date: '2020-02-02',
    start: '10:00:00',
    end: '13:00:00',
    type: 'intake',
    description: 'test',
    patientId: 12,
    specialistId: 7,
    specialist: {
      name: 'test specialist corrections',
    },
    patient: {
      name: 'test test jr',
    },
  },
  {
    appointmentId: 6,
    date: '2020-04-02',
    start: '10:00:00',
    end: '13:00:00',
    type: 'intake',
    description: 'test',
    patientId: 12,
    specialistId: 7,
    specialist: {
      name: 'test specialist corrections',
    },
    patient: {
      name: 'test test jr',
    },
  },
  {
    appointmentId: 7,
    date: '2020-04-04',
    start: '10:00:00',
    end: '13:00:00',
    type: 'intake',
    description: 'test',
    patientId: 12,
    specialistId: 7,
    specialist: {
      name: 'test specialist corrections',
    },
    patient: {
      name: 'test test jr',
    },
  },
]

const formatEvents = () => {
  return events.map((event) => {
    const f = {
      title: event.specialist.name,
      start: dayjs(new Date(event.date + 'T' + event.start)),
      end: dayjs(new Date(event.date + 'T' + event.end)),
    }
    return f
  })
}

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

const localizer = dayjsLocalizer(dayjs)

const getEventProps = (event: EventProps) => {
  const style = {
    backgroundColor: 'lightgrey',
  }

  if (event.title === 'test specialist corrections') {
    style.backgroundColor = 'lightgreen'
  }

  return {
    className: '',
    style: style,
  }
}

const RBC = () => {
  const defaultDate = new Date(2020, 2, 2)
  const eventsList = formatEvents()
  return (
    <div style={{ height: '500px' }}>
      <Calendar
        defaultDate={defaultDate}
        events={eventsList}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        step={60}
        views={{ month: true, week: true, day: true }}
        eventPropGetter={(event) => getEventProps(event)}
      />
    </div>
  )
}

export default RBC
