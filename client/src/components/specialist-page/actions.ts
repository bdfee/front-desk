import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import specialistService from '../../services/specialist'
import {
  TableData,
  Specialist,
  SpecialistInput,
  SetAlertPayload,
} from '../../types'

export const useGetTableData = (setAlertPayload: SetAlertPayload) =>
  useQuery<TableData[], Error>({
    queryKey: ['SPECIALISTS_TABLE'],
    queryFn: specialistService.getTableData,
    onError: () =>
      setAlertPayload('error', 'error fetching specialists', 'page'),
  })

export const useDeleteSpecialistById = (
  queryClient: QueryClient,
  setAlertPayload: SetAlertPayload,
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
    onError: () =>
      setAlertPayload('error', 'error deleting specialist', 'page'),
  })

export const useUpdateSpecialistById = (
  queryClient: QueryClient,
  setAlertPayload: SetAlertPayload,
) =>
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
      setAlertPayload('success', 'specialist updated', 'page')
    },
    onError: () =>
      setAlertPayload('error', 'error updating specialist', 'page'),
  })
