import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import appointmentService from '../../services/appointment'
import { isAxiosError } from 'axios'

interface EventProps {
  title: string
  appointmentId: number
  start: Date
  end: Date
}

type NewEvent = Omit<EventProps, 'title' | 'appointmentId'>

const formatEvents = (appointments: AppointmentDetail[]) => {
  return appointments.map((appointment) => {
    const event: EventProps = {
      title: appointment.specialist.name.toString(),
      appointmentId: appointment.appointmentId,
      start: new Date(appointment.date + 'T' + appointment.start),
      end: new Date(appointment.date + 'T' + appointment.end),
    }
    return event
  })
}

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { AppointmentDetail } from '../../types'
import AppointmentModal from '../appointment-modal'
import { useNavigate } from 'react-router-dom'

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
  const nav = useNavigate()
  const [appointments, setAppointments] = useState<AppointmentDetail[]>()

  const navigateToAppointmentEditor = (appointmentId: number) => {
    nav(`/calendar/${appointmentId}`, {
      state: { openModalOnLoad: true },
    })
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await appointmentService.getAll()
        setAppointments(appointments.concat(appointments))
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
        appointmentId: 10,
        start: new Date(event.start),
        end: new Date(event.end),
      }
      console.log(newEvent)
      // setAppointments(appointments.concat(newEvent))
    }
  }

  const defaultDate = new Date(2020, 2, 2)

  if (!appointments) {
    return <div>fetching appointments</div>
  }

  return (
    <>
      <div style={{ height: '500px' }}>
        <Calendar
          defaultDate={defaultDate}
          events={formatEvents(appointments)}
          localizer={localizer}
          startAccessor="start"
          selectable
          endAccessor="end"
          step={60}
          views={{ month: true, week: true, day: true }}
          eventPropGetter={(event) => getEventProps(event)}
          onSelectSlot={(object: NewEvent) => handleCreateEvent(object)}
          onSelectEvent={(object: EventProps) =>
            navigateToAppointmentEditor(object.appointmentId)
          }
        />
      </div>
      <AppointmentModal
        type="add"
        state={appointments}
        stateSetter={setAppointments}
      />
    </>
  )
}

export default RBC
