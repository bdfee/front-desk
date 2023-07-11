import { AppointmentDetail } from '../../types'
import { useQuery } from '@tanstack/react-query'
import appointmentService from '../../services/appointment'

export const useFetchAppointments = () =>
  useQuery<AppointmentDetail[], Error>({
    queryKey: ['APPOINTMENTS'],
    queryFn: () => appointmentService.getAll(),
  })
