import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import patientService from '../../services/patients'
import { PatientDetail } from '../../types'

export const useFetchPatients = () =>
  useQuery({
    queryKey: ['PATIENTS'],
    queryFn: patientService.getAll,
  })

export const useDeletePatientById = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (patientId: number) => patientService.deleteById(patientId),
    onSuccess: (_, patientId) => {
      queryClient.setQueryData<PatientDetail[]>(
        ['PATIENTS'],
        (oldPatients = []) =>
          oldPatients.filter((patient) => patient.patientId !== patientId),
      )
    },
  })

export const usePrefetchPatientById = async (
  queryClient: QueryClient,
  patientId: number,
) =>
  queryClient.prefetchQuery({
    queryKey: ['PATIENT', patientId],
    queryFn: () => patientService.getOneById(patientId),
  })
