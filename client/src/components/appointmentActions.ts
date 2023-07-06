import { useMutation, useQuery } from 'react-query'
import { AppointmentInput } from '../types'
import appointmentService from '../services/appointment'
import { queryClient } from '../App'
import { AppointmentDetail } from '../types'

type HandleSetAppointmentFormState = ({
  start,
  end,
  date,
  description,
  patientId,
  type,
  specialistId,
}: AppointmentDetail) => void

export const useUpdateAppointmentById = () => {
  return useMutation<AppointmentInput, Error, [number, AppointmentInput]>(
    (variables) => {
      const [id, values] = variables
      return appointmentService.updateById(id, values)
    },
    {
      onSuccess: (_, variables: [number, AppointmentInput]) => {
        const [id] = variables
        queryClient.invalidateQueries({
          queryKey: ['GET_APPOINTMENTS'],
        }),
          queryClient.invalidateQueries({
            queryKey: [`GET_APPOINTMENT_${id}`],
          })
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}

export const useAddAppointment = () => {
  return useMutation<AppointmentInput, Error, [AppointmentInput]>(
    (variables) => {
      const [values] = variables
      return appointmentService.create(values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['GET_APPOINTMENTS'],
        })
      },
      onError: (error: Error) => console.error('Error: ', error),
    },
  )
}

export const useFetchAppointmentById = (
  stateSetter: HandleSetAppointmentFormState,
  id: number,
) => {
  return useQuery<AppointmentDetail, Error>({
    queryKey: [`GET_APPOINTMENT_${id}`],
    queryFn: () => appointmentService.getOneById(id),
    onSuccess: (data) => stateSetter(data),
    onError: (error: Error) => 'error ' + error.message,
  })
}
