import { SetStateAction, Dispatch } from 'react'
import { useQuery, useMutation, QueryKey } from 'react-query'
import { AppointmentDetail, PatientDetail } from '../types'
import patientService from '../services/patients'
import { queryClient } from '../App'

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

export const useFetchAppointmentsByPatientId = (
  setAppointments: Dispatch<SetStateAction<AppointmentDetail[]>>,
  patientId: number,
) => {
  return useQuery<AppointmentDetail[], Error>({
    queryKey: [`GET_APPOINTMENTS_BY_PATIENT_${patientId}`] as [string],
    queryFn: () => patientService.getAppointmentsByPatient(patientId),
    onSuccess: (data) => setAppointments(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}

export const useFetchPatients = (
  setPatients: Dispatch<SetStateAction<PatientDetail[]>>,
) => {
  return useQuery<PatientDetail[], Error>({
    queryKey: 'GET_PATIENTS',
    queryFn: patientService.getAll,
    onSuccess: (data) => setPatients(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}

export const useDeletePatientById = (
  setPatients: Dispatch<SetStateAction<PatientDetail[]>>,
  patients: PatientDetail[],
) => {
  return useMutation<void, Error, number>(
    (id: number) => patientService.deleteById(id),
    {
      onSuccess: (_data, id: number) => {
        queryClient.invalidateQueries('GET_PATIENTS')
        setPatients(patients?.filter(({ patientId }) => patientId !== id))
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}
