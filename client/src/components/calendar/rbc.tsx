import dayjs from 'dayjs'
import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { RBCEventProps, NewEvent, AppointmentFormValues } from './index'
import { useNavigate } from 'react-router-dom'
import { useMemo, useCallback } from 'react'
import { AppointmentDetail } from '../../types'
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface RBCProps {
  appointments: AppointmentDetail[]
  openModal: (values: AppointmentFormValues) => void
}

dayjs.extend(timezone)
dayjs.extend(utc)

interface RBCProps {
  appointments: AppointmentDetail[]
  openModal: (values: AppointmentFormValues) => void
}

const RBC = ({ appointments, openModal }: RBCProps) => {
  const { localizer, defaultDate, max, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      localizer: dayjsLocalizer(dayjs),
      max: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      views: { month: true, week: true, day: true, agenda: true },
    }),
    [],
  )

  const formatEvents = useMemo(() => {
    return appointments.map((appointment) => {
      const event: RBCEventProps = {
        title: appointment.specialist.name.toString(),
        appointmentId: appointment.appointmentId,
        start: new Date(appointment.date + 'T' + appointment.start),
        end: new Date(appointment.date + 'T' + appointment.end),
      }
      return event
    })
  }, [appointments])

  const handleSelectSlot = useCallback((event: NewEvent) => {
    const { start, end } = event

    const values = {
      start: dayjs(start).format('HH:mm:ss'),
      end: dayjs(end).format('HH:mm:ss'),
      date: dayjs(start).format('YYYY-MM-DD'),
    }

    openModal(values)
  }, [])

  const onSelectEvent = useCallback((object: RBCEventProps) => {
    const navigateToAppointmentEditor = (appointmentId: number) => {
      navigate(`/calendar/${appointmentId}`, {
        state: { openModalOnLoad: false },
      })
    }

    navigateToAppointmentEditor(object.appointmentId)
  }, [])

  const getEventProps = useCallback((event: RBCEventProps) => {
    const style = {
      backgroundColor: 'lightgrey',
    }

    if (event.title === 'test specialist corrections') {
      style.backgroundColor = 'lightgreen'
    }

    return {
      style: style,
    }
  }, [])

  const navigate = useNavigate()

  return (
    <div style={{ height: '600px' }}>
      <ReactBigCalendar
        defaultDate={defaultDate}
        defaultView="week"
        events={formatEvents}
        localizer={localizer}
        startAccessor="start"
        selectable
        endAccessor="end"
        step={60}
        max={max}
        views={views}
        eventPropGetter={getEventProps}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={onSelectEvent}
      />
    </div>
  )
}

export default RBC
