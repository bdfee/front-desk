import { Calendar as ReactBigCalendar } from 'react-big-calendar'
import {
  RBCDefaultProps,
  formatEvents,
  eventPropGetter,
} from '../calendar/utils'
import { useFetchAppointments } from '../calendar/actions'
import { useNavigate } from 'react-router-dom'
import { NewEvent, RBCEventProps, RBCEventPropsForForm } from '../../types'
import AppointmentModal from '../appointment-modal'
import { useState } from 'react'
import { dayjs } from '../calendar/dayjs'

const RBCDayView = () => {
  const [formValues, setFormValues] = useState<
    RBCEventPropsForForm | undefined
  >()
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const onSelectEvent = (event: RBCEventProps) => {
    const navigateToAppointmentEditor = (appointmentId: number) => {
      navigate(`/calendar/${appointmentId}`, {
        state: { openModalOnLoad: false },
      })
    }

    navigateToAppointmentEditor(event.appointmentId)
  }

  const { data: appointmentsData, status: appointmentsStatus } =
    useFetchAppointments()

  if (appointmentsStatus === 'error' || appointmentsStatus === 'loading') {
    return <div>{appointmentsStatus}: fetching appointments</div>
  }

  const handleSelectSlot = (event: NewEvent) => {
    const { start, end } = event
    const values = {
      start: dayjs(start).format('HH:mm:ss'),
      end: dayjs(end).format('HH:mm:ss'),
      date: dayjs(start).format('YYYY-MM-DD'),
    }
    setFormValues(values)
    setModalOpen(true)
  }
  const { defaultDate, localizer, min, max } = RBCDefaultProps
  const events = formatEvents(appointmentsData)

  return (
    <>
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
          onSelectEvent={onSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          endAccessor="end"
          step={60}
          eventPropGetter={eventPropGetter}
        />
      </div>
      {modalOpen && (
        <AppointmentModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          serviceType="addFromCalendar"
          formValues={formValues}
        />
      )}
    </>
  )
}

export default RBCDayView
