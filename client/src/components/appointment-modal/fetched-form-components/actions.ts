import { useQuery } from '@tanstack/react-query'
import { Specialist, PatientDetail } from '../../../types'
import specialistService from '../../../services/specialist'
import patientService from '../../../services/patients'
import { SetAlertPayload } from '../../../types'

export const useFetchSpecialists = (setAlertPayload?: SetAlertPayload) =>
  useQuery<Specialist[]>({
    queryKey: ['SPECIALISTS'],
    queryFn: specialistService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching specialists', 'modal'),
  })

export const useFetchPatients = (setAlertPayload?: SetAlertPayload) =>
  useQuery<PatientDetail[]>({
    queryKey: ['PATIENTS'],
    queryFn: patientService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching patients', 'modal'),
  })
