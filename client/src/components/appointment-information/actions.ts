import appointmentService from '../../services/appointment'
import { useMutation, QueryClient, useQuery } from '@tanstack/react-query'
import { AppointmentDetail } from '../../types'
import { SetAlertPayload } from '../../types'

export const useDeleteAppointmentById = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation<void, Error, number>({
    mutationFn: (appointmentId: number) =>
      appointmentService.deleteById(appointmentId),
    onSuccess: (_, appointmentId: number) => {
      queryClient.setQueryData<AppointmentDetail[]>(
        ['APPOINTMENTS'],
        (oldAppointments = []) =>
          oldAppointments.filter(
            (appointment) => appointment.appointmentId !== appointmentId,
          ),
      )
      queryClient.invalidateQueries(['SPECIALISTS_TABLE'])
      queryClient.removeQueries(['APPOINTMENT', appointmentId])

      setAlertPayload &&
        setAlertPayload('success', 'appointment deleted', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error deleting appointment', 'page'),
  })

export const useGetAppointmentById = (
  id: number,
  setAlertPayload?: SetAlertPayload,
) =>
  useQuery<AppointmentDetail>({
    queryKey: ['APPOINTMENT', id],
    queryFn: () => appointmentService.getOneById(id),
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching appointment', 'page'),
  })
