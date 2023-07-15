import appointmentService from '../../services/appointment'
import { AppointmentDetail, AppointmentInput } from '../../types'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { SetAlertPayload } from '../../types'

export const useUpdateAppointmentById = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
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

      setAlertPayload &&
        setAlertPayload('success', 'appointment updated', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error updating appointment', 'page'),
  })

export const useAddAppointment = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation({
    mutationFn: appointmentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['APPOINTMENTS'] })
      setAlertPayload && setAlertPayload('success', 'appointment added', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error creating appointment', 'page'),
  })
