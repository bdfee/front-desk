import appointmentService from '../../services/appointment'
import { useMutation, QueryClient, useQuery } from '@tanstack/react-query'
import { AppointmentDetail } from '../../types'

export const useDeleteAppointmentById = (queryClient: QueryClient) =>
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
    },
  })

export const useGetAppointmentById = (id: number) =>
  useQuery<AppointmentDetail>({
    queryKey: ['APPOINTMENT', id],
    queryFn: () => appointmentService.getOneById(id),
  })
