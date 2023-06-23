import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import appointmentService from '../../services/appointment'
import { isAxiosError } from 'axios'

interface EventProps {
  title: string
  start: Date
  end: Date
}

type NewEvent = Omit<EventProps, 'title'>

const formatEvents = (appointments: AppointmentDetail[]) => {
  return appointments.map((appointment) => {
    const event: EventProps = {
      title: appointment.specialist.name.toString(),
      start: new Date(appointment.date + 'T' + appointment.start),
      end: new Date(appointment.date + 'T' + appointment.end),
    }
    return event
  })
}

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { AppointmentDetail } from '../../types'

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
  const [myEvents, setMyEvents] = useState<EventProps[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = formatEvents(await appointmentService.getAll())
        setMyEvents(myEvents.concat(appointments))
      } catch (error) {
        if (isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patient')
        }
      }
    }
    void fetchAppointments()
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
