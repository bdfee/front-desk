import { AppointmentDetail, RBCEventProps } from '../../types'
import { localizer } from './dayjs'

export const formatEvents = (filteredEvents: AppointmentDetail[]) =>
  filteredEvents.map(
    ({ specialist, appointmentId, type, date, start, end }): RBCEventProps => ({
      title: specialist.name.toString(),
      appointmentId: appointmentId,
      type: type,
      start: new Date(date + 'T' + start),
      end: new Date(date + 'T' + end),
    }),
  )

export const eventPropGetter = (event: RBCEventProps) => {
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
}

export const RBCDefaultProps = {
  defaultDate: new Date(),
  localizer: localizer,
  min: new Date(1972, 0, 0, 7, 0, 0, 0),
  max: new Date(1972, 0, 0, 18, 0, 0, 0),
}
