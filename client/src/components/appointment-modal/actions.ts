import appointmentService from '../../services/appointment'
import { AppointmentDetail, AppointmentInput } from '../../types'
import { QueryClient, useMutation } from '@tanstack/react-query'

export const useUpdateAppointmentById = (queryClient: QueryClient) =>
  useMutation<
    AppointmentDetail,
    Error,
    { appointmentId: number; values: AppointmentInput }
  >({
    mutationFn: ({ appointmentId, values }) =>
      appointmentService.updateById(appointmentId, values),
    onSuccess: (data) => {
      queryClient.setQueryData<AppointmentDetail>(
        ['APPOINTMENT', data.appointmentId],
        data,
      )
      queryClient.setQueryData<AppointmentDetail[]>(
        ['APPOINTMENTS'],
        (oldAppointments = []) =>
          oldAppointments.map((appointment) =>
            appointment.appointmentId === data.appointmentId
              ? data
              : appointment,
          ),
      )
    },
  })

export const useAddAppointment = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: appointmentService.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['APPOINTMENTS'] }),
  })
