import { AppointmentDetail } from '../types'

export const sortAppointments = (appointments: AppointmentDetail[]) => {
  const history: AppointmentDetail[] = []
  const upcoming: AppointmentDetail[] = []

  appointments.forEach((appointment) => {
    new Date() > new Date(appointment.date)
      ? history.push(appointment)
      : upcoming.push(appointment)
  })

  return { history, upcoming }
}
