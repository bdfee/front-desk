import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar as ReactBigCalendar } from 'react-big-calendar'
import { dayjs } from './dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {
  SelectPatient,
  SelectSpecialist,
  SelectType,
} from '../fetched-form-components/index'
import { RBCEventProps, NewEvent, RBCProps } from '../../types'
import { useFetchAppointments } from './actions'
import { AlertCtx } from '../../components/context-providers/alert'
import { formatEvents, eventPropGetter, RBCDefaultProps } from './utils'

const RBC = ({ openModal }: RBCProps) => {
  const [specialistIdFilter, setSpecialistIdFilter] = useState<string>('')
  const [patientIdFilter, setPatientIdFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const alertCtx = useContext(AlertCtx)
  const navigate = useNavigate()

  const { data: appointmentsData, status: appointmentsStatus } =
    useFetchAppointments(alertCtx?.setAlertPayload)

  if (appointmentsStatus === 'error' || appointmentsStatus === 'loading') {
    return <div>{appointmentsStatus}: fetching appointments</div>
  }

  const filterEvents = () => {
    const filteredList = appointmentsData.filter((appointment) => {
      const bySpecialist =
        !specialistIdFilter || appointment.specialistId === +specialistIdFilter
      const byPatient =
        !patientIdFilter || appointment.patientId === +patientIdFilter
      const byType = !typeFilter || appointment.type === typeFilter

      return bySpecialist && byPatient && byType
    })
    return formatEvents(filteredList)
  }

  const { defaultDate, localizer, min, max } = RBCDefaultProps

  const { views, events } = (() => ({
    views: { month: true, week: true, day: true, agenda: true },
    events: filterEvents(),
  }))()

  const handleSelectSlot = (event: NewEvent) => {
    const { start, end } = event

    const values = {
      start: dayjs(start).format('HH:mm:ss'),
      end: dayjs(end).format('HH:mm:ss'),
      date: dayjs(start).format('YYYY-MM-DD'),
    }

    openModal(values)
  }

  const onSelectEvent = (event: RBCEventProps) => {
    const navigateToAppointmentEditor = (appointmentId: number) => {
      navigate(`/calendar/${appointmentId}`, {
        state: { openModalOnLoad: false },
      })
    }

    navigateToAppointmentEditor(event.appointmentId)
  }

  return (
    <>
      <SelectPatient
        patientId={patientIdFilter}
        setPatientId={setPatientIdFilter}
      />
      <SelectSpecialist
        specialistId={specialistIdFilter}
        setSpecialistId={setSpecialistIdFilter}
      />
      <SelectType type={typeFilter} setType={setTypeFilter} />
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
          eventPropGetter={eventPropGetter}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={onSelectEvent}
        />
      </div>
    </>
  )
}

export default RBC
