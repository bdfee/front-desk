import { AppointmentDetail } from '../../types'
import { useQuery } from '@tanstack/react-query'
import appointmentService from '../../services/appointment'
import { SetAlertPayload } from '../../types'

export const useFetchAppointments = (setAlertPayload?: SetAlertPayload) =>
  useQuery<AppointmentDetail[], Error>({
    queryKey: ['APPOINTMENTS'],
    queryFn: () => appointmentService.getAll(),
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching appointments', 'page'),
  })
