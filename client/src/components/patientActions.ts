import { SetStateAction, Dispatch } from 'react'
import { useQuery } from 'react-query'
import { PatientDetail } from '../types'
import patientService from '../services/patients'

export const useFetchPatientByIdQuery = (
  setPatient: Dispatch<SetStateAction<PatientDetail | undefined>>,
  patientId: number,
) => {
  return useQuery<PatientDetail, Error>({
    queryKey: [`GET_PATIENT_${patientId}`] as [string],
    queryFn: () => patientService.getOneById(patientId),
    onSuccess: (data) => setPatient(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}
