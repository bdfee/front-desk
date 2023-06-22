import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface EventProps {
  title: string
  start: Date
  end: Date
}

// type NewEvent = Omit<EventProps, 'title'>

type NewEvent = Omit<EventProps, 'title'>

//add cal buttons to toggle between specialists and appointment type
// add appointment setting by drag

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
      start: new Date(event.date + 'T' + event.start),
      end: new Date(event.date + 'T' + event.end),
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
  const [myEvents, setMyEvents] = useState<EventProps[]>()

  useEffect(() => {
    const eventsList = formatEvents()
    setMyEvents(eventsList)
  }, [])

  const handleCreateEvent = (event: NewEvent) => {
    const title = window.prompt('new event name')
    if (title) {
      const newEvent: EventProps = {
        title,
        start: new Date(event.start),
        end: new Date(event.end),
      }
      setMyEvents(myEvents?.concat(newEvent))
    }
  }

  const defaultDate = new Date(2020, 2, 2)
  return (
    <div style={{ height: '500px' }}>
      <Calendar
        defaultDate={defaultDate}
        events={myEvents}
        localizer={localizer}
        startAccessor="start"
        selectable
        endAccessor="end"
        step={60}
        views={{ month: true, week: true, day: true }}
        eventPropGetter={(event) => getEventProps(event)}
        onSelectSlot={(object: NewEvent) => handleCreateEvent(object)}
      />
    </div>
  )
}

export default RBC
