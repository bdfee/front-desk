import { useMutation, QueryClient } from '@tanstack/react-query'
import specialistService from '../../services/specialist'
import { TableData, Specialist } from '../../types'
import { SetAlertPayload } from '../../types'

export const useCreateSpecialist = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation({
    mutationFn: specialistService.create,
    onSuccess: (newSpecialist) => {
      const updatedRow: TableData = {
        specialist: newSpecialist,
        appointmentCount: 0,
        patientCount: 0,
      }

      queryClient.setQueryData<TableData[]>(
        ['SPECIALISTS_TABLE'],
        (oldTableData = []) => oldTableData.concat(updatedRow),
      )

      queryClient.setQueryData<Specialist[]>(
        ['SPECIALISTS'],
        (oldSpecialistsData = []) => oldSpecialistsData.concat(newSpecialist),
      )

      queryClient.setQueryData<Specialist>(
        ['SPECIALIST', newSpecialist.specialistId],
        newSpecialist,
      )

      setAlertPayload &&
        setAlertPayload('success', 'specialist created', 'page')
    },
  })
