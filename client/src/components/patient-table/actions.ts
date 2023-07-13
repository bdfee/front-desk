import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import patientService from '../../services/patients'
import { PatientDetail } from '../../types'
import { SetAlertPayload } from '../../types'

export const useFetchPatients = (setAlertPayload?: SetAlertPayload) =>
  useQuery({
    queryKey: ['PATIENTS'],
    queryFn: patientService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching patients', 'page'),
  })

export const useDeletePatientById = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation({
    mutationFn: (patientId: number) => patientService.deleteById(patientId),
    onSuccess: (_, patientId) => {
      queryClient.setQueryData<PatientDetail[]>(
        ['PATIENTS'],
        (oldPatients = []) =>
          oldPatients.filter((patient) => patient.patientId !== patientId),
      )

      setAlertPayload && setAlertPayload('success', 'patient deleted', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error deleting patient', 'page'),
  })

export const usePrefetchPatientById = async (
  queryClient: QueryClient,
  patientId: number,
) =>
  queryClient.prefetchQuery({
    queryKey: ['PATIENT', patientId],
    queryFn: () => patientService.getOneById(patientId),
  })
