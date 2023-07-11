import { useQuery } from '@tanstack/react-query'
import { Specialist, PatientDetail } from '../../../types'
import specialistService from '../../../services/specialist'
import patientService from '../../../services/patients'

export const useFetchSpecialists = () =>
  useQuery<Specialist[]>({
    queryKey: ['SPECIALISTS'],
    queryFn: specialistService.getAll,
  })

export const useFetchPatients = () =>
  useQuery<PatientDetail[]>({
    queryKey: ['PATIENTS'],
    queryFn: patientService.getAll,
  })
