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

export interface PreFormData {
  start: string
  end: string
  date: string
}

const RBC = () => {
  const nav = useNavigate()
  const [appointments, setAppointments] = useState<AppointmentDetail[]>()
  const [preFormData, setPreformData] = useState<PreFormData | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  const navigateToAppointmentEditor = (appointmentId: number) => {
    nav(`/calendar/${appointmentId}`, {
      state: { openModalOnLoad: false },
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
    const startData = dayjs(event.start)
    const endData = dayjs(event.end)

    const start = startData.format('HH:mm:ss')
    const end = endData.format('HH:mm:ss')
    const date = startData.format('YYYY-MM-DD')
    const preFormData = {
      start,
      end,
      date,
    }
    setPreformData(preFormData)
    setModalOpen(true)
  }

  const defaultDate = new Date()

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
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type={preFormData ? 'addFromCalendar' : 'add'}
        preFormData={preFormData}
        state={appointments}
        stateSetter={setAppointments}
      />
    </>
  )
}

export default RBC
