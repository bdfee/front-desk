import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import specialistService from '../../services/specialist'
import { TableData, Specialist, SpecialistInput } from '../../types'

type AlertType = 'error' | 'success'
type AlertLocation = 'modal' | 'page'
type AlertMessage = string
export const useGetTableData = () =>
  useQuery<TableData[], Error>({
    queryKey: ['SPECIALISTS_TABLE'],
    queryFn: specialistService.getTableData,
  })

export const useDeleteSpecialistById = (
  queryClient: QueryClient,
  setAlertPayload: (
    type: AlertType,
    message: AlertMessage,
    location: AlertLocation,
  ) => () => void,
) =>
  useMutation({
    mutationFn: specialistService.deleteById,
    onSuccess: (_, specialistId: number) => {
      queryClient.setQueryData<Specialist[]>(
        ['SPECIALISTS'],
        (oldSpecialists = []) =>
          oldSpecialists.filter(
            (specialist) => specialist.specialistId !== specialistId,
          ),
      )

      queryClient.setQueryData<TableData[]>(
        ['SPECIALISTS_TABLE'],
        (oldTableData = []) =>
          oldTableData.filter(
            (row) => row.specialist.specialistId !== specialistId,
          ),
      )

      setAlertPayload('success', 'specialist deleted', 'page')
    },
    onError: () => {
      setAlertPayload('error', 'error deleting specialist', 'page')
    },
  })

export const useUpdateSpecialistById = (queryClient: QueryClient) =>
  useMutation<
    Specialist,
    Error,
    { specialistId: number; values: SpecialistInput }
  >({
    mutationFn: ({ specialistId, values }) =>
      specialistService.updateById(specialistId, values),
    onSuccess: (_, { specialistId, values }) => {
      queryClient.setQueryData<TableData[]>(
        ['SPECIALISTS_TABLE'],
        (oldTableData = []) =>
          oldTableData.map((row) =>
            row.specialist.specialistId === specialistId
              ? {
                  specialist: {
                    specialistId: specialistId,
                    name: String(values.name),
                    speciality: String(values.speciality),
                  },
                  appointmentCount: +row.appointmentCount,
                  patientCount: +row.patientCount,
                }
              : row,
          ),
      )

      queryClient.setQueryData<Specialist[]>(
        ['SPECIALISTS'],
        (oldSpecialistsData = []) =>
          oldSpecialistsData.map((specialist) =>
            specialist.specialistId === specialistId
              ? {
                  specialistId,
                  name: String(values.name),
                  speciality: String(values.speciality),
                }
              : specialist,
          ),
      )
    },
  })
