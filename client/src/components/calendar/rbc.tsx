import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import FetchedFormComponents from '../appointment-modal/fetched-form-components'
import { useQuery } from '@tanstack/react-query'
import appointmentService from '../../services/appointment'
import { RBCEventProps, NewEvent, RBCProps } from '../../types'
import { AppointmentDetail } from '../../types'

dayjs.extend(timezone)
dayjs.extend(utc)

const RBC = ({ openModal }: RBCProps) => {
  const [specialistIdFilter, setSpecialistIdFilter] = useState<string>('')
  const [patientIdFilter, setPatientIdFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')

  const navigate = useNavigate()

  let appointments: AppointmentDetail[]

  const { data: appointmentsData, status: appointmentsStatus } = useQuery<
    AppointmentDetail[],
    Error
  >({
    queryKey: ['APPOINTMENTS'],
    queryFn: () => appointmentService.getAll(),
  })

  if (appointmentsStatus === 'error') {
    return <div>error fetching appointments</div>
  }

  if (appointmentsStatus === 'loading') {
    appointments = []
  } else appointments = appointmentsData

  const formatEvents = (filteredEvents: AppointmentDetail[]) => {
    return filteredEvents.map((appointment) => {
      const event: RBCEventProps = {
        title: appointment.specialist.name.toString(),
        appointmentId: appointment.appointmentId,
        type: appointment.type,
        start: new Date(appointment.date + 'T' + appointment.start),
        end: new Date(appointment.date + 'T' + appointment.end),
      }
      return event
    })
  }

  const filterEvents = useMemo(() => {
    const filteredList = appointments.filter((appointment) => {
      const bySpecialist =
        !specialistIdFilter || appointment.specialistId === +specialistIdFilter
      const byPatient =
        !patientIdFilter || appointment.patientId === +patientIdFilter
      const byType = !typeFilter || appointment.type === typeFilter

      return bySpecialist && byPatient && byType
    })
    return formatEvents(filteredList)
  }, [appointments, specialistIdFilter, patientIdFilter, typeFilter])

  const { localizer, defaultDate, max, views, events, min } = useMemo(
    () => ({
      defaultDate: new Date(),
      localizer: dayjsLocalizer(dayjs),
      min: new Date(1972, 0, 0, 7, 0, 0, 0),
      max: new Date(1972, 0, 0, 18, 0, 0, 0),
      views: { month: true, week: true, day: true, agenda: true },
      events: filterEvents,
    }),
    [filterEvents],
  )

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
    let backgroundColor

    if (event.type === 'intake') {
      backgroundColor = 'gray'
    }

    if (event.type === 'nutrition') {
      backgroundColor = 'green'
    }

    if (event.type === 'physicalTherapy') {
      backgroundColor = 'red'
    }

    return {
      style: {
        backgroundColor,
      },
    }
  }, [])

  return (
    <>
      <FetchedFormComponents
        specialistId={specialistIdFilter}
        setSpecialistId={setSpecialistIdFilter}
        patientId={patientIdFilter}
        setPatientId={setPatientIdFilter}
        type={typeFilter}
        setType={setTypeFilter}
      />
      <div style={{ height: '600px' }}>
        <ReactBigCalendar
          defaultDate={defaultDate}
          defaultView="week"
          events={events}
          localizer={localizer}
          startAccessor="start"
          selectable
          endAccessor="end"
          step={60}
          min={min}
          max={max}
          views={views}
          eventPropGetter={getEventProps}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={onSelectEvent}
        />
      </div>
    </>
  )
}

export default RBC
